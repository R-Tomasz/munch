import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {GET_GAME, WEBSOCKET, WEBSOCKET_GAME_SUBSCRIBE, WEBSOCKET_SEND_JOIN, WEBSOCKET_SEND_MOVE} from "../api/urls";
import SockJS from 'sockjs-client';
import {DragDropContext} from "react-beautiful-dnd";
import PlayerArea from "./PlayerArea";
import TableArea from "./TableArea";
import "../styles/Game.css"
import initialData from "../data/initialData";
import VoiceChat from "./VoiceChat";

let Stomp = require('stompjs');


let stompClient = null;
const Game = () => {
    const [state, setState] = useState({
        columns: initialData
    });
    const [playerAreas, setPlayerAreas] = useState({})
    const [playersOrder, setPlayersOrder] = useState(['column-1', 'column-2', 'column-3', 'column-4'])
    const [cardObjects, setCardObjects] = useState([])

    const params = useParams();
    const userState = useSelector(state => state.auth);
    const previousStateRef = useRef({});

    useEffect(() => {
        previousStateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (!userState.username) return
        getGameData();
        connectStomp();
    }, [userState.username]);

    const getGameData = async () => {
        try {
            const data = await axios.get(GET_GAME + '/' + params.gameUuid)
            setCardObjects(data.data.initialCards)
            setPlayerAreas(data.data.playerAreas)
        } catch (error) {

        }
    }

    useEffect(() => {
        let initialDoors = []
        let initialTreasures = []
        cardObjects.map(card => {
            card.type === 'TREASURE'
                ? initialTreasures.push(card.id)
                : initialDoors.push(card.id)
        })
        state.columns.stolik.areas['stack-treasures'].itemIds = initialTreasures
        state.columns.stolik.areas['stack-doors'].itemIds = initialDoors
    }, [cardObjects])

    const connectStomp = () => {
        let sockJs = new SockJS(WEBSOCKET)
        stompClient = Stomp.over(sockJs);
        stompClient.connect({},
            onConnected,
            onConnectingError
        );
    }

    const onConnected = () => {
        stompClient.subscribe(WEBSOCKET_GAME_SUBSCRIBE + params.gameUuid, onMessageReceived)
    }

    const onConnectingError = () => {
        console.log('error')
    }

    const onMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.type) {
            case "USER_JOIN":
                handleUserJoin(payloadData.playerAreas)
                break;
            case "MOVE":
                handleDropWs(previousStateRef.current,
                    payloadData.source,
                    payloadData.destination,
                    payloadData.draggableId);
                break;
        }
    }

    useEffect(() => {
        if (stompClient?.connected) {
            userJoin()
        }
    }, [stompClient?.connected])


    useEffect(() => {
        handleUserJoin(playerAreas)
    }, [playerAreas])

    const handleUserJoin = (payload) => {
        if (!payload) return;

        setState(prevState => {
            const updatedColumns = {...prevState.columns};

            for (const key in payload) {
                if (payload.hasOwnProperty(key) && updatedColumns.hasOwnProperty(key)) {
                    updatedColumns[key].username = payload[key];
                }
            }

            return {
                ...prevState,
                columns: updatedColumns
            };
        });
        const currentUserIndex = Object.values(payload).indexOf(userState.username);

        if (currentUserIndex >= 0) {
            const positions = [];
            Object.keys(payload).forEach((it, index) => {
                const position = (index + currentUserIndex) % Object.keys(payload).length;
                positions.push(Object.keys(payload)[position]);
            })
            setPlayersOrder(positions)
        }
    }

    const userJoin = () => {
        if (!userState.username) return;

        let emptyColumn;
        for (const key in state.columns) {
            if (key !== 'stolik' && state.columns[key].username === '') {
                emptyColumn = state.columns[key];
                break;
            }
        }

        if (!emptyColumn) return;

        stompClient.send(WEBSOCKET_SEND_JOIN + params.gameUuid, {}, JSON.stringify({
            username: userState.username,
            type: 'USER_JOIN'
        }));
    }

    const handleStateChange = (prevState, source, destination, draggableId) => {
        const startDroppable = Object.values(prevState.columns)
            .map(column => Object.values(column.areas)
                .find(area => area.id === source.droppableId))
            .find(it => it);

        const finishDroppable = Object.values(prevState.columns)
            .map(column => Object.values(column.areas)
                .find(area => area.id === destination.droppableId))
            .find(it => it);

        const startColumn = Object.values(prevState.columns).find(column => Object.values(column.areas).includes(startDroppable));
        const startItemIds = Array.from(startDroppable.itemIds);
        startItemIds.splice(source.index, 1);

        if (startDroppable === finishDroppable) {
            startItemIds.splice(destination.index, 0, draggableId);

            const newArea = {
                ...startDroppable,
                itemIds: startItemIds
            };

            return {
                ...prevState,
                columns: {
                    ...prevState.columns,
                    [startColumn.id]: {
                        ...startColumn,
                        areas: {
                            ...startColumn.areas,
                            [startDroppable.id]: newArea
                        }
                    }
                }
            };
        }

        const finishColumn = Object.values(prevState.columns).find(column =>
            Object.values(column.areas).includes(finishDroppable)
        );

        if (startColumn === finishColumn) {
            const newItemIds = Array.from(startDroppable.itemIds);
            const finishItemIds = Array.from(finishDroppable.itemIds);
            newItemIds.splice(source.index, 1);
            finishItemIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...startColumn,
                areas: {
                    ...startColumn.areas,
                    [startDroppable.id]: {
                        ...startDroppable,
                        itemIds: startItemIds
                    },
                    [finishDroppable.id]: {
                        ...finishDroppable,
                        itemIds: finishItemIds
                    },
                }
            };
            return {
                ...prevState,
                columns: {
                    ...prevState.columns,
                    [startColumn.id]: newColumn
                }
            }
        }

        const newStartColumn = {
            ...startColumn,
            areas: {
                ...startColumn.areas,
                [startDroppable.id]: {
                    ...startDroppable,
                    itemIds: startItemIds
                }
            }
        };

        const finishItemIds = Array.from(finishDroppable.itemIds);
        finishItemIds.splice(destination.index, 0, draggableId);

        const newFinishColumn = {
            ...finishColumn,
            areas: {
                ...finishColumn.areas,
                [finishDroppable.id]: {
                    ...finishDroppable,
                    itemIds: finishItemIds
                }
            }
        };

        return {
            ...prevState,
            columns: {
                ...prevState.columns,
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn
            }
        };
    };

    const handleDrop = (result) => {
        const {destination, source, draggableId} = result;
        if (!destination
            || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        stompClient.send(WEBSOCKET_SEND_MOVE + params.gameUuid, {},
            JSON.stringify({
                source: {index: source.index, droppableId: source.droppableId},
                destination: {index: destination.index, droppableId: destination.droppableId},
                draggableId: draggableId,
                type: 'MOVE'
            }));
    };

    const handleDropWs = (prevState, source, destination, draggableId) => {
        let newState = handleStateChange(prevState, source, destination, draggableId);
        setState(newState);
    };

    const getCards = (col, name) => {
        const areaName = `${col.id}-${name}`;
        return col.areas[areaName].itemIds.map(it => (
            cardObjects.find(item => item.id === it)
        ));
    }

    const getTableCards = () => {
        let cardsForAllAreas = {};
        Object.keys(state.columns['stolik'].areas).map((key) => {
            let area = state.columns['stolik'].areas[key];
            let cardsPerArea = []
            area.itemIds.map(id => (
                cardsPerArea.push(cardObjects.find(item => item.id === id))
            ))

            cardsForAllAreas = {
                ...cardsForAllAreas,
                [key]: {
                    id: key,
                    items: cardsPerArea
                }
            }
        })
        return cardsForAllAreas;
    }

    return userState.username ? (
        <div className={'game-container'}>
            <VoiceChat/>
            <DragDropContext onDragEnd={handleDrop}>

                <TableArea key='stolik'
                           areas={state.columns['stolik'].areas}
                           cards={getTableCards()}/>

                {playersOrder.map((columnId, index) => {
                        const col = state.columns[columnId];

                        let cardsRevealed = getCards(col, 'revealed');
                        let cardsHidden = getCards(col, 'hidden');
                        {
                            return <PlayerArea key={col.id}
                                               column={col}
                                               username={userState.username}
                                               areas={col.areas}
                                               cardsRevealed={cardsRevealed}
                                               cardsHidden={cardsHidden}
                                               playerIndex={index}/>
                        }
                    }
                )}
            </DragDropContext>
        </div>
    ) : 'ładowanie'
}

export default Game;
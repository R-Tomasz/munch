import {Droppable} from "react-beautiful-dnd";
import React from 'react';
import GameCard from "./GameCard";
import "../styles/PlayerArea.css"

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#ffffffa0' : '#ffffff78',
    display: 'flex',
    padding: 5,
});

const PlayerArea = ({column, areas, cardsRevealed, cardsHidden, username, playerIndex}) => {

    const assignAreaClass = (id) => {
        return id.replace(/[0-9]/g, playerIndex + 1)
    }

    return (
        Object.keys(areas).map((key) => {
            let area = areas[key];
            return <div key={area.id} className={assignAreaClass(area.id)}>
                <Droppable droppableId={area.id}
                           direction={column.id.endsWith('1') || column.id.endsWith('3') ? "horizontal" : "vertical"}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            {...provided.dragHandleProps}
                        >
                            {key.endsWith('revealed')
                                ? cardsRevealed.map((card, index) => (
                                    <GameCard key={card.id}
                                              card={card}
                                              index={index}
                                              revealed={true}
                                              dragDisabled={column.username !== username}d/>
                                ))
                                : cardsHidden.map((card, index) => (
                                    <GameCard key={card.id}
                                              card={card}
                                              index={index}
                                              revealed={column.username === username}
                                              dragDisabled={column.username !== username}/>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        }))
}
export default PlayerArea;
import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {Card, CardImg} from "reactstrap";
import reverse from '../assets/rewers.png';
import "../styles/GameCard.css"

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0 8px 0 0`,
    background: isDragging ? 'lightgreen' : '#b1f2e3',
    ...draggableStyle,
});

const GameCard = ({card, index, stackable, revealed, dragDisabled}) => {

    return (
            <Draggable draggableId={card.id}
                       index={index}
                       isDragDisabled={dragDisabled}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={'draggable-card'}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <Card style={{width: "70px",
                                      position: stackable ? 'absolute' : ''}}>
                            {/*<CardImg src={`data:image/jpg;base64,${card.graphic}`}/>*/}
                            <CardImg src={revealed
                                ? `data:image/jpg;base64,${card.graphic}`
                                : reverse}/>
                        </Card>
                    </div>
                )}
            </Draggable>
    )
}

export default GameCard;
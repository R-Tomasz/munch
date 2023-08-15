import {Droppable} from "react-beautiful-dnd";
// import React from 'react';
import GameCard from "./GameCard";
import "../styles/TableArea.css"

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#ffffffa0' : '#ffffff78',
    display: 'flex',
    padding: 5,
});

const TableArea = ({areas, cards}) => {

    return (
        <div className='table-area-container'>
            <div className='table-area-grid'>
                {Object.keys(areas).map((key) => {
                    let area = areas[key];

                    return <Droppable key={area.id} droppableId={area.id} direction="vertical">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                                {...provided.dragHandleProps}
                                className={area.id}
                            >
                                {cards[area.id].items.filter((item) => item).map((item, index) => (
                                    <GameCard key={item.id}
                                              index={index}
                                              card={item}
                                              stackable={area.stack}
                                              revealed={area.hidden}/> //todo co to
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                })}
            </div>
        </div>
    )
}

export default TableArea;

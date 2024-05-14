import React, {useState} from 'react';
import {Draggable} from "react-beautiful-dnd";
import {Card, CardImg} from "reactstrap";
import doorsBack from '../assets/doors-back.png';
import treasureBack from '../assets/treasure-back.png';
import "../styles/GameCard.css"

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0 8px 0 0`,
    background: isDragging ? 'lightgreen' : '#b1f2e3',
    ...draggableStyle,
});

const GameCard = ({card, index, stackable, revealed, dragDisabled}) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleCardClick = () => {
        if (!revealed) return;
        setIsHovered(!isHovered);
    };

    const getCardGraphic = () => {
        if (revealed) {
            return `data:image/jpg;base64,${card.graphic}`
        }
        if (card.type === 'DOORS') {
            return doorsBack
        } else {
            return treasureBack
        }
    }

    return (<>
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
                        <Card style={{
                            width: "70px",
                            position: stackable ? 'absolute' : ''
                        }}
                              onClick={handleCardClick}>
                            <CardImg src={getCardGraphic()}/>
                        </Card>
                    </div>
                )}
            </Draggable>
            {isHovered && (
                <div className={'hovered-card'}>
                    <div onClick={handleCardClick} >
                        <img src={getCardGraphic()} alt={'grafika karty'}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default GameCard;
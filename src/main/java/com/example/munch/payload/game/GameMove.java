package com.example.munch.payload.game;

public record GameMove(CardLocation source, CardLocation destination, String draggableId, String type) {
}

package com.example.munch.payload.response;

import com.example.munch.model.Card;

import java.util.List;
import java.util.Map;

public record JoinGameResponse(List<String> players, Map<String, String> playerAreas, List<Card> initialCards) {
}

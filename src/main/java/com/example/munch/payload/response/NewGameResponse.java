package com.example.munch.payload.response;

import com.example.munch.model.Card;

import java.util.List;

public record NewGameResponse(String gameUuid, List<Card> cards) {
}

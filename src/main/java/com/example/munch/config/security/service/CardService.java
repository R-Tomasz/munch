package com.example.munch.config.security.service;

import com.example.munch.model.Card;
import com.example.munch.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    public List<Card> findAllCards() {
        return cardRepository.findAll();
    }

    public List<Card> getShuffledCards() {
        List<Card> cards = findAllCards();
        Collections.shuffle(cards);
        return cards;
    }
}

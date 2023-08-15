package com.example.munch.model;

import com.example.munch.enums.CardType;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cards")
@Data
public class Card {

    @Id
    private String id;
    private byte[] graphic;
    private CardType type;
}

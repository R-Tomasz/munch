package com.example.munch.model;


import com.example.munch.enums.GameStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "games_state")
@Data
public class GameState {

    @Id
    private String id;
    @Indexed
    private User host;
    @Indexed
    private List<User> players = new ArrayList<>();
    private List<Card> initialCards = new ArrayList<>();
    private String gameUuid;
    private GameStatus gameStatus;

}

package com.example.munch.model;

import com.example.munch.enums.GameStatus;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

import static com.example.munch.enums.GameArea.*;

@Document(collection = "games")
@Data
public class Game {

    @Id
    private String id;
    @Indexed
    private User host;
    @Indexed
    private List<User> players = new ArrayList<>();
    private List<Card> initialCards = new ArrayList<>();
    private Map<String, String> playerAreas = new LinkedHashMap<>();
    private String gameUuid;
    private GameStatus gameStatus;

    public Game() {
        this.gameUuid = UUID.randomUUID().toString();
    }

    public void initializePlayerAreas() {
        this.playerAreas.put(AREA_1.getValue(), "");
        this.playerAreas.put(AREA_2.getValue(), "");
        this.playerAreas.put(AREA_3.getValue(), "");
        this.playerAreas.put(AREA_4.getValue(), "");
    }
}

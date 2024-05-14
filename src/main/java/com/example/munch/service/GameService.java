package com.example.munch.service;

import com.example.munch.config.security.service.CardService;
import com.example.munch.enums.GameStatus;
import com.example.munch.model.Game;
import com.example.munch.model.User;
import com.example.munch.payload.game.UserJoin;
import com.example.munch.repository.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final CardService cardService;

    public Game createNewGame(User user) {
        Game game = new Game();
        game.setHostUsername(user.getUsername());
        game.getPlayers().add(user.getUsername());
        game.setGameStatus(GameStatus.IN_PROGRESS);
        game.setInitialCards(cardService.getShuffledCards());
        game.initializePlayerAreas();
        return gameRepository.save(game);
    }

    public Game joinGame(String gameUuid, User user) {
        Optional<Game> game = gameRepository.findGameByGameUuidAndGameStatus(gameUuid, GameStatus.IN_PROGRESS);
        if (game.isPresent()) {
            addPlayerIfNotPresent(game.get().getPlayers(), user.getUsername());
            return game.get();
        } else {
            throw new EntityNotFoundException("Game not found");
        }
    }

    private void addPlayerIfNotPresent(List<String> users, String username) {
        if (!users.contains(username)) {
            users.add(username);
        }
    }

    public Map<String, String> assignPlayerArea(String gameUuid, UserJoin userJoin) {
        Optional<Game> game = gameRepository.findGameByGameUuidAndGameStatus(gameUuid, GameStatus.IN_PROGRESS);
        if (game.isPresent()) {
            assignPlayer(game.get(), userJoin);
            return game.get().getPlayerAreas();
        }
        return Collections.emptyMap();
    }

    private void assignPlayer(Game game, UserJoin userJoin) {
        Map<String, String> areas = game.getPlayerAreas();

        for (Map.Entry<String, String> entry : areas.entrySet()) {
            if (entry.getValue().equals(userJoin.username())) {
                return;
            }
            if (entry.getValue().isEmpty()) {
                entry.setValue(userJoin.username());
                break;
            }
        }
        gameRepository.save(game);
    }
}

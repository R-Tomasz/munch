package com.example.munch.service;

import com.example.munch.config.security.service.CardService;
import com.example.munch.enums.GameStatus;
import com.example.munch.model.User;
import com.example.munch.model.Game;
import com.example.munch.payload.game.UserJoin;
import com.example.munch.repository.GameRepository;
import com.example.munch.config.security.jwt.JwtService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final JwtService jwtService;
    private final CardService cardService;

    public Game createNewGame(User user) {
        Game game = new Game();
        game.setHost(user);
        game.getPlayers().add(user);
        game.setGameStatus(GameStatus.IN_PROGRESS);
        game.setInitialCards(cardService.getShuffledCards());
        game.initializePlayerAreas();
        return gameRepository.save(game);
    }

    public Game joinGame(String gameUuid, User user) {
        Optional<Game> game = gameRepository.findGameByGameUuidAndGameStatus(gameUuid, GameStatus.IN_PROGRESS);
        if (game.isPresent()) {
            addPlayerIfNotPresent(game.get().getPlayers(), user);
            return game.get();
        } else {
            throw new EntityNotFoundException("Nie znaleziono gry");
        }
    }

    private void addPlayerIfNotPresent(List<User> users, User user) {
        if (!users.contains(user)) {
            users.add(user);
        }
    }

//    public boolean assignPlayerArea(String gameUuid, UserJoin userJoin) {
//        Optional<Game> game = gameRepository.findGameByGameUuidAndGameStatus(gameUuid, GameStatus.IN_PROGRESS);
//        if (game.isPresent()) {
//            return assignPlayer(game.get(), userJoin);
//        }
//        return false;
//    }
//
//    private boolean assignPlayer(Game game, UserJoin userJoin) {
//        String area = game.getPlayerAreas().get(userJoin.gameArea());
//        if (!game.getPlayerAreas().containsValue(userJoin.username()) && (area == null || area.isEmpty())) {
//            game.getPlayerAreas().put(userJoin.gameArea(), userJoin.username());
//            gameRepository.save(game);
//            return true;
//        }
//        return false;
//    }
//}

    public Map<String, String> assignPlayerArea(String gameUuid, UserJoin userJoin) {
        Optional<Game> game = gameRepository.findGameByGameUuidAndGameStatus(gameUuid, GameStatus.IN_PROGRESS);
        String playerAssignedArea = null;
        if (game.isPresent()) {
            playerAssignedArea = assignPlayer(game.get(), userJoin);
            return game.get().getPlayerAreas();
        }
        return null;
    }

    private String assignPlayer(Game game, UserJoin userJoin) {
        Map<String, String> areas = game.getPlayerAreas();
//        if (areas.size() == 0) {
//            game.initializePlayerAreas();
//        }

        String a = null;
        for (Map.Entry<String, String> entry : areas.entrySet()) {
            if (entry.getValue().equals(userJoin.username())) {
                return entry.getKey();
            }
            if (entry.getValue().isEmpty()) {
                entry.setValue(userJoin.username());
                a = entry.getKey();
                break;
            }
        }

        gameRepository.save(game);
        return a;
    }
}

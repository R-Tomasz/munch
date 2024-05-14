package com.example.munch.controller;

import com.example.munch.config.security.jwt.JwtService;
import com.example.munch.model.Game;
import com.example.munch.model.User;
import com.example.munch.payload.game.GameMove;
import com.example.munch.payload.game.PlayerAreas;
import com.example.munch.payload.game.UserJoin;
import com.example.munch.payload.response.JoinGameResponse;
import com.example.munch.payload.response.NewGameResponse;
import com.example.munch.service.GameService;
import com.example.munch.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "false")
public class GameController {

    private final GameService gameService;
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/create")
    public ResponseEntity<NewGameResponse> createNewGame(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String token) {
        String parsedToken = jwtService.parseJwt(token);
        jwtService.validateJwtToken(parsedToken);
        String username = jwtService.extractUsername(parsedToken);
        User user = userService.getUserByUsername(username);
        Game game = gameService.createNewGame(user);
        return ResponseEntity.ok(new NewGameResponse(game.getGameUuid()));
    }

    @GetMapping("/game/{gameUuid}")
    public ResponseEntity<?> joinGame(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String gameUuid
    ) {
        String parsedToken = jwtService.parseJwt(token);
        jwtService.validateJwtToken(parsedToken);
        String username = jwtService.extractUsername(parsedToken);
        User user = userService.getUserByUsername(username);
        Game game;
        try {
            game = gameService.joinGame(gameUuid, user);
            return ResponseEntity.ok(new JoinGameResponse(game.getPlayers(), game.getPlayerAreas(), game.getInitialCards()));
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @MessageMapping("/move/{gameUuid}")
    @SendTo("/game/{gameUuid}")
    public GameMove handleGameMoveMessage(@DestinationVariable String gameUuid, @Payload GameMove gameMove) {
        return gameMove;
    }

    @MessageMapping("/join/{gameUuid}")
    @SendTo("/game/{gameUuid}")
    public PlayerAreas handleUserJoinMessage(@DestinationVariable String gameUuid, @Payload UserJoin userJoin) {
        return new PlayerAreas(gameService.assignPlayerArea(gameUuid, userJoin), "USER_JOIN");
    }
}

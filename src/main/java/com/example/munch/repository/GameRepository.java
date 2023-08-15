package com.example.munch.repository;

import com.example.munch.enums.GameStatus;
import com.example.munch.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {

    Optional<Game> findGameByGameUuidAndGameStatus(String gameUUID, GameStatus gameStatus);
}

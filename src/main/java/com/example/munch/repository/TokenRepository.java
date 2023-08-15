package com.example.munch.repository;

import com.example.munch.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {

  List<Token> findAllValidTokenByUser(String id);

  Optional<Token> findByToken(String token);
}

package com.example.munch;

import com.example.munch.enums.ERole;
import com.example.munch.model.Card;
import com.example.munch.model.User;
import com.example.munch.model.Role;
import com.example.munch.repository.CardRepository;
import com.example.munch.repository.GameRepository;
import com.example.munch.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;

@SpringBootApplication
@EnableMongoRepositories
public class MunchApplication {

    public static void main(String[] args) {
        SpringApplication.run(MunchApplication.class, args);
    }
//    docker run -p 27017:27017 -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -e MONGO_INITDB_DATABASE=munch mongo:latest

    @Bean
    static CommandLineRunner runner(UserRepository repository, GameRepository gameRepository, CardRepository cardRepository) {
        return args -> {
            User user = new User("su",
                    "test@test.pl",
                    new BCryptPasswordEncoder().encode("test"),
                    "nick",
                    Collections.singletonList(new Role(ERole.USER)));
            User user2 = new User("su2",
                    "test@test.pl2",
                    new BCryptPasswordEncoder().encode("test"),
                    "nickname2",
                    Collections.singletonList(new Role(ERole.USER)));
            Card card = new Card();
//            File file = new File("assets/img.png");
//            Files.readAllBytes(file.toPath());

//            String filename="img.png";
//            Path pathToFile = Paths.get(filename);
//            byte[] bytes = Files.readAllBytes(Path.of("C:/Users/Tomek/IdeaProjects/munch/src/main/resources/assets/rewers.png"));


//            card.setGraphic(bytes);
//            cardRepository.deleteAll();
//            cardRepository.save(card);
//            repository.deleteAll();
//            gameRepository.deleteAll();
//            repository.insert(user);
//            repository.insert(user2);
        };
    }
}
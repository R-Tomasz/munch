package com.example.munch.controller;

import com.example.munch.model.User;
import com.example.munch.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/loggedUsers")
    public String getLoggedUsers(Locale locale, Model model) {
        return "users";
    }

    @GetMapping
    public List<User> getAllUsers() {
//        userService.addUser(new User("123", "d","d","d"));
        return userService.getAllUsers();
    }

    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}

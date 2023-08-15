package com.example.munch.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(exclude = {"roles"})
public class User {

    @Id
    @GeneratedValue
    private String id;

    @Indexed(unique = true)
    @Field
    private String username;

    @Indexed(unique = true)
    @Field
    @NonNull
    @Email
    private String email;

    @Field
    @NonNull
    private String password;

    @Indexed(unique = false)
    @Field
    @NonNull
    private String nick;

    @Field
    private List<Role> roles;

    public User(String username, String password, String nick) {
        this.username = username;
        this.password = password;
        this.nick = nick;
    }

    public User(String username, String email, String password, String nick, List<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nick = nick;
        this.roles = roles;
    }
}

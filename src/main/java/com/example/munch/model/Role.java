package com.example.munch.model;

import com.example.munch.enums.ERole;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role {

    @Id
    private String id;

    @Getter
    private final ERole name;

    public Role(ERole name) {
        this.name = name;
    }
}

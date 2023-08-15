package com.example.munch.dto;

import com.example.munch.enums.Gender;
import lombok.Data;

@Data
public class Player {
    private String nickname;
    private Gender gender;

}

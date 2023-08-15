package com.example.munch.enums;

import lombok.Getter;

public enum GameArea {
    AREA_1("column-1"),
    AREA_2("column-2"),
    AREA_3("column-3"),
    AREA_4("column-4");

    @Getter
    private String value;

    GameArea(String value) {
        this.value = value;
    }
}

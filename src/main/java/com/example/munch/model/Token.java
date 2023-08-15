package com.example.munch.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tokens")
public class Token {

  @Id
  @GeneratedValue
  public String id;

  @NonNull
  public String token;

  public Date expirationDate;
  public Boolean expired;

  public User user;

  public boolean isExpired() {
    return expirationDate.before(new Date());
  }

}

package com.medical.app.models;

import jakarta.persistence.*;
import lombok.*;


@Data
@Inheritance(strategy = InheritanceType.JOINED)
@MappedSuperclass
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(unique=true,name = "dni")
    private Integer dni;
    private String name;
    private String email;
    private String address;
    private String phoneNumber;

}

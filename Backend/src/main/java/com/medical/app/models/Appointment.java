package com.medical.app.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
@Table(name="medical_visit")
public class Appointment {
    //Cita
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medical_visit_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "doctor_id") // columna  la FK en la tabla Cita
    private Doctor doctor;

    private LocalDate date;
    private LocalTime time; // cambiar en la modelo DER
    private Boolean reminder;
    private Boolean status;
    private String description;

}

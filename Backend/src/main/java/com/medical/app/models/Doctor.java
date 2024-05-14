package com.medical.app.models;

import jakarta.persistence.*;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Data
@AttributeOverride(name = "id", column = @Column(name = "doctor_id"))
@Table(name="doctor")
@Entity
public class Doctor extends User {

    private String speciality;
    private String office;
    //especialid- consultorio - horario
    private String schedule;
    /*
    @OneToMany(mappedBy = "doctor")
    private List<Patient> patients;*/
    private String licenseNumber;

    @JoinColumn(name = "secretary_id")
    @Column(name="secretary_id")
    private Long secretary;
    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;

}

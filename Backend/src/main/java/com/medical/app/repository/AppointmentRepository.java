package com.medical.app.repository;

import com.medical.app.models.Appointment;
import com.medical.app.models.Doctor;
import com.medical.app.models.response.AppointmentResponse;
import com.medical.app.models.response.DoctorAppointmentResponse;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment,Long> {

    List<Appointment> findAll();

    boolean existsByPatientIdAndDateAndTime(Long patientId, LocalDate date, LocalTime time);

    Appointment findByPatientIdAndDateAndTime(Long patientId, LocalDate date, LocalTime time);

    List<Appointment> findByDoctorIdAndDate(Long doctorId, LocalDate date);
    @Query("SELECT new com.medical.app.models.response.DoctorAppointmentResponse(d.id, d.name) FROM Doctor d " +
            "WHERE d.speciality = :specialty " +
            "AND NOT EXISTS (" +
            "    SELECT 1 FROM Appointment a " +
            "    WHERE a.doctor.id = d.id " +
            "    AND a.date = :appointmentDate " +
            "    AND a.time = :appointmentTime" +
            ")")
    List<DoctorAppointmentResponse> findAvailableDoctorsBySpecialtyAndDateTime(@Param("specialty") String specialty,
                                                                               @Param("appointmentDate") LocalDate appointmentDate,
                                                                               @Param("appointmentTime") LocalTime appointmentTime);

    List<Appointment> findByPatientId(Long id);

    List<Appointment> findByDoctorId(Long id);
}

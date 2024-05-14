package com.medical.app.services;

import com.medical.app.models.Appointment;
import com.medical.app.models.Doctor;
import com.medical.app.models.Patient;
import com.medical.app.models.request.AppointmentCancelRequest;
import com.medical.app.models.response.*;
import com.medical.app.repository.AppointmentRepository;
import com.medical.app.repository.DoctorRepository;
import com.medical.app.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.medical.app.models.response.AppointmentResponse;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private DoctorRepository      doctorRepository;
    @Autowired
    private PatientRepository     patientRepository;
    @Autowired
    private DoctorService    doctorService;
    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();

    }

    public List<AppointmentResponseDetails> getAllAppointmentsDetails() {
        List<Appointment> appointmentBd = appointmentRepository.findAll();
        List<AppointmentResponseDetails> appointmentResponseList = new ArrayList<>();

        appointmentBd.forEach((ap) -> {
            AppointmentResponseDetails appointmentResponseDetails = new AppointmentResponseDetails();

            appointmentResponseDetails.setId(ap.getId());
            appointmentResponseDetails.setAppointmentDate(ap.getDate());
            appointmentResponseDetails.setAppointmentTime(ap.getTime());
            appointmentResponseDetails.setDoctor(ap.getDoctor().getName());
            appointmentResponseDetails.setPatient(ap.getPatient().getName());
            appointmentResponseDetails.setReminder(ap.getReminder());
            appointmentResponseDetails.setStatus(ap.getStatus());

            appointmentResponseList.add(appointmentResponseDetails);

            System.out.println(appointmentResponseDetails.toString());

        });



        return appointmentResponseList;

    }

    public void createAppointment(Appointment appointment) {
        // Aquí puedes realizar validaciones adicionales antes de guardar la cita
        appointmentRepository.save(appointment);
    }

    public boolean isDailyAppointmentLimitReached(Long doctorId, LocalDate appointmentDate, int limit) {
        // Obtener todas las citas del médico en la fecha dada
        List<Appointment> appointmentsOnDate = appointmentRepository.findByDoctorIdAndDate(doctorId, appointmentDate);

        // Verificar si el límite diario se ha alcanzado
        return appointmentsOnDate.size() >= limit;
    }
    /*
    public LocalDate getNextAvailableDate(Long doctorId, LocalDate currentDate) {
        LocalDate nextDate = currentDate.plusDays(1);

        return nextDate;
    }*/


    public boolean isAppointmentExist(Long doctorId, LocalDate appointmentDate, LocalTime adjustedTime) {
        //  todas las citas del médico en la fecha dada
        List<Appointment> appointmentsOnDate = appointmentRepository.findByDoctorIdAndDate(doctorId, appointmentDate);
        // Verificar si ya existe una cita para el médico en la fecha y hora dadas
        return appointmentsOnDate.stream()
          .anyMatch(appointment -> appointment.getTime().equals(adjustedTime));
    }
/*
    public boolean isDateTimeAvailable(Long doctorId, LocalDate date, LocalTime time) {
        return !isAppointmentExist(doctorId, date, time) &&
                !isDailyAppointmentLimitReached(doctorId, date, 5);
    }
*/


    public List<DoctorAppointmentResponse> findAvailableDoctorsBySpecialtyAndDateTime(String specialty,
                                                                                      LocalDate appointmentDate,
                                                                                      LocalTime appointmentTime) {
        return appointmentRepository.findAvailableDoctorsBySpecialtyAndDateTime(specialty, appointmentDate, appointmentTime);
    }

    public void cancelAppointment(AppointmentCancelRequest cancelRequest) {

        int patientDni = cancelRequest.getPatientDni();
        LocalDate appointmentDate = cancelRequest.getAppointmentDate();
        LocalTime appointmentTime = cancelRequest.getAppointmentTime();

        Patient patient = patientRepository.findByDni(patientDni);

        if (patient != null) {
            Appointment appointment = appointmentRepository.findByPatientIdAndDateAndTime(
              patient.getId(), appointmentDate, appointmentTime);

            if (appointment != null) {
                // Establecer el estado de la cita como cancelada
                appointment.setStatus(false);

                // Guardar la cita actualizada en la base de datos
                appointmentRepository.save(appointment);
            } else {
                throw new EntityNotFoundException("No se encontró una cita para el paciente con DNI: " + patientDni +
                  " en la fecha y hora especificadas.");
            }
        } else {
            throw new EntityNotFoundException("No se encontró al paciente con DNI: " + patientDni);
        }
    }

    public boolean isPatientAlreadyBooked(Long patientId, LocalDate appointmentDate, LocalTime requestedTime) {
        return appointmentRepository.existsByPatientIdAndDateAndTime(patientId, appointmentDate, requestedTime);

    }


    public void deleteAppointment(Long appointmentId) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);

        if (appointmentOptional.isPresent()) {
            appointmentRepository.deleteById(appointmentId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la cita con ID: " + appointmentId);
        }
    }


    public List<AppointmentResponseDetails> getAppointmentResponsesByPatientDni(int patientDni) {
        Patient patient = patientRepository.findByDni(patientDni);

        if (patient != null) {
            List<Appointment> appointments = appointmentRepository.findByPatientId(patient.getId());
            List<AppointmentResponseDetails> appointmentResponses = new ArrayList<>();

            for (Appointment appointment : appointments) {
                Doctor doctor = appointment.getDoctor();
                AppointmentResponseDetails response = AppointmentResponseDetails.builder()
                        .id(appointment.getId())
                        .appointmentDate(appointment.getDate())
                        .appointmentTime(appointment.getTime())
                        .doctor(doctor.getName())  // Usa el nombre del médico en lugar del ID
                        .patient(patient.getName()) // Usa el nombre del paciente en lugar del ID
                        .reminder(appointment.getReminder())
                        .status(appointment.getStatus())
                        .build();

                appointmentResponses.add(response);
            }
            return appointmentResponses;
        } else {
            throw new EntityNotFoundException("No se encontró al paciente con DNI: " + patientDni);
        }
    }

    public List<AppointmentResponseDetails> getAppointmentsByDoctorDni(int doctorDni) {
        DoctorResponseCompleto doctor = doctorService.getDoctorByDni(doctorDni);

        if (doctor != null) {
            List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());
            List<AppointmentResponseDetails> appointmentResponses = new ArrayList<>();

            for (Appointment appointment : appointments) {
                AppointmentResponseDetails response = AppointmentResponseDetails.builder()
                        .id(appointment.getId())
                        .appointmentDate(appointment.getDate())
                        .appointmentTime(appointment.getTime())
                        .doctor(doctor.getName())
                        .patient(appointment.getPatient().getName())
                        .reminder(appointment.getReminder())
                        .status(appointment.getStatus())
                        .build();

                appointmentResponses.add(response);
            }

            return appointmentResponses;
        } else {
            throw new EntityNotFoundException("No se encontró al médico con DNI: " + doctorDni);
        }
    }
}

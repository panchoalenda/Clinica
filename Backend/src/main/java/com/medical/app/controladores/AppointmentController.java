package com.medical.app.controladores;

import com.medical.app.models.Appointment;
import com.medical.app.models.Doctor;
import com.medical.app.models.Patient;
import com.medical.app.models.request.AppointmentAvailabilityRequest;
import com.medical.app.models.request.AppointmentCancelRequest;
import com.medical.app.models.request.AppointmentRequest;
import com.medical.app.models.response.AppointmentResponse;
import com.medical.app.models.response.AppointmentResponseDetails;
import com.medical.app.models.response.DoctorAppointmentResponse;
import com.medical.app.models.response.PatientResponseComplete;
import com.medical.app.services.AppointmentService;
import com.medical.app.services.DoctorService;
import com.medical.app.services.PatientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
    @RequestMapping("/appointments")
@CrossOrigin ("http://localhost:5173")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @GetMapping("/details") //Devuelve la lista pero con detalle
    public ResponseEntity<?> getAllAppointmentsDetails() {
        return ResponseEntity.ok(appointmentService.getAllAppointmentsDetails());
    }

    @PostMapping
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        System.out.println("Datos del turno (front): " + appointmentRequest.toString() );

        Long doctorId = appointmentRequest.getDoctorId();
        Long patientId = appointmentRequest.getPatientId();
        LocalDate appointmentDate = appointmentRequest.getAppointmentDate();

        LocalTime requestedTime = appointmentRequest.getAppointmentTime();
        LocalTime adjustedTime = requestedTime;
        // Verificar si el paciente ya tiene una cita en el mismo horario
        if (appointmentService.isPatientAlreadyBooked(patientId, appointmentDate, requestedTime)) {
            return ResponseEntity.badRequest().body("El paciente ya tiene una cita en el mismo horario.");
        }

        while (true) {
            // Verificar si la hora solicitada ya está ocupada
            while (appointmentService.isAppointmentExist(doctorId, appointmentDate, adjustedTime)) {
                adjustedTime = adjustedTime.plusMinutes(30);
            }

            // Verificar si se ha alcanzado el límite diario
            boolean isDailyLimitReached = appointmentService.isDailyAppointmentLimitReached(doctorId, appointmentDate, 5);

            if (!isDailyLimitReached) {
                // Crear y guardar la cita
                Doctor doctor = doctorService.findById(doctorId);
                Patient patient = patientService.findById(patientId);
                if (doctor == null || patient == null) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró al médico o al paciente con el ID proporcionado");
                }

                Appointment appointment = new Appointment();
                appointment.setDoctor(doctor);
                appointment.setPatient(patient);
                appointment.setDate(appointmentDate);
                appointment.setTime(adjustedTime);
                appointment.setReminder(true);
                appointment.setStatus(true);
                appointment.setDescription(appointmentRequest.getDescription());

                appointmentService.createAppointment(appointment);

                return ResponseEntity.ok("Cita creada exitosamente para el día: " + appointmentDate + " a las " + adjustedTime);
            }

            // Avanzar al siguiente día
            appointmentDate = appointmentDate.plusDays(1);
            adjustedTime = requestedTime;  // Reiniciar la hora a la original
        }
    }


    @PostMapping("/check-availability")
    public ResponseEntity<List<DoctorAppointmentResponse>> checkAvailability(@RequestBody AppointmentAvailabilityRequest request) {
        String specialty = request.getSpeciality();
        LocalDate date = request.getDate();
        LocalTime time = request.getTime();

        List<DoctorAppointmentResponse> availableDoctors = appointmentService.findAvailableDoctorsBySpecialtyAndDateTime(specialty, date, time);

        if (!availableDoctors.isEmpty()) {
            return ResponseEntity.ok(availableDoctors);
        } else {
            return ResponseEntity.badRequest().body(Collections.emptyList());  // Puedes personalizar el cuerpo según tus necesidades
        }
    }

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelAppointment(@RequestBody AppointmentCancelRequest cancelRequest) {
        System.out.println(" En el endpoint cancel es :" + cancelRequest.toString());
        try {
            appointmentService.cancelAppointment(cancelRequest);
            return ResponseEntity.ok("La cita se ha cancelado exitosamente.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        List<Appointment> allAppointments = appointmentService.getAllAppointments();

        List<AppointmentResponse> appointmentResponses = allAppointments.stream()
                .map(appointment -> AppointmentResponse.builder()
                        .id(appointment.getId())
                        .appointmentDate(appointment.getDate())
                        .appointmentTime(appointment.getTime())
                        .doctorId(appointment.getDoctor().getId())
                        .patientId(appointment.getPatient().getId())
                        .reminder(appointment.getReminder())
                        .status(appointment.getStatus())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointmentResponses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Cita eliminada exitosamente.");
    }

    @GetMapping("/dni/{dniString}")
    public ResponseEntity<List<AppointmentResponseDetails>> getAppointmentsPorDni(@PathVariable String dniString) {
        System.err.println("*************El dni del paciente es: " + dniString + " ***************** ");

        try {
            int dni = Integer.parseInt(dniString);
            List<AppointmentResponseDetails> appointmentResponses = appointmentService.getAppointmentResponsesByPatientDni(dni);

            if (!appointmentResponses.isEmpty()) {
                return ResponseEntity.ok().body(appointmentResponses);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/dni-doctor/{dniString}")
    public ResponseEntity<List<AppointmentResponseDetails>> getAppointmentsByDoctorDni(@PathVariable String dniString) {
        try {
            int dni = Integer.parseInt(dniString);
            List<AppointmentResponseDetails> appointmentResponses = appointmentService.getAppointmentsByDoctorDni(dni);

            if (!appointmentResponses.isEmpty()) {
                return ResponseEntity.ok().body(appointmentResponses);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}


package com.medical.app.services;

import com.medical.app.models.Doctor;
import com.medical.app.models.Patient;
import com.medical.app.models.Secretary;
import com.medical.app.models.request.DoctorRequest;
import com.medical.app.models.request.PatientRequest;
import com.medical.app.models.request.SecretaryRequest;
import com.medical.app.models.response.*;
import com.medical.app.repository.PatientRepository;
import com.medical.app.repository.SecretaryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private SecretaryRepository secretaryRepository;


    public List<PatientResponse> getPatients() {
        // SELECT * FROM Patient
        //List<Patient> medicos = patientRepository.findAll();

        List<Patient> patients = (List<Patient>) patientRepository.findAll();
        if (patients.isEmpty()) {
            return Collections.emptyList();  // Devolver lista vacía si no hay pacientes
        }

        return patients.stream()
                .map(p -> PatientResponse.builder()
                        .Id(p.getId())
                        .dni(p.getDni())
                        .name(p.getName())
                        .email(p.getEmail())
                        .address(p.getAddress())
                        .phoneNumber(p.getPhoneNumber())
                        .birthDate(p.getBirthDate())
                        .emergencyNumber(p.getEmergencyNumber())
                        .secretaryId(p.getSecretary())
                        .build())
                .toList();
    }
    public PatientResponse createPatient(PatientRequest patientRequest) {
        Patient newPatient  = new Patient();
        newPatient.setDni(patientRequest.getDni());
        newPatient.setAddress(patientRequest.getAddress());
        newPatient.setEmail(patientRequest.getEmail());
        newPatient.setName(patientRequest.getName());
        newPatient.setPhoneNumber(patientRequest.getPhoneNumber());
        newPatient.setBirthDate(patientRequest.getBirthDate());
        newPatient.setEmergencyNumber(patientRequest.getEmergencyNumber());

        //busco secretario id

        Optional<Secretary> optionalSecretary = secretaryRepository.findByDni(Math.toIntExact(patientRequest.getSecretaryId()));

        if (!optionalSecretary.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el secretario con ID: " + patientRequest.getSecretaryId());
        }

        Secretary savedSecretary = optionalSecretary.get();
        newPatient.setSecretary(savedSecretary.getId());

        Patient savedPatient = patientRepository.save(newPatient);
        return PatientResponse.builder()
                .Id(savedPatient.getId())
                .dni(savedPatient.getDni())
                .address(savedPatient.getAddress())
                .email(savedPatient.getEmail())
                .name(savedPatient.getName())
                .phoneNumber(savedPatient.getPhoneNumber())
                .birthDate(savedPatient.getBirthDate())
                .emergencyNumber(savedPatient.getEmergencyNumber())
                .secretaryId(savedPatient.getId())
                .build();

    }

    public PatientResponseComplete getPatient(Long id) {
        //SELECT * FROM paciente WHERE ID=ID
        Optional<Patient> patientOptional = patientRepository.findById(id);

        if (patientOptional.isPresent()) {
            Patient patient = patientOptional.get();

            return PatientResponseComplete.builder()
                    .Id(patient.getId())
                    .dni(patient.getDni())
                    .name(patient.getName())
                    .email(patient.getEmail())
                    .address(patient.getAddress())
                    .phoneNumber(patient.getPhoneNumber())
                    .birthDate(patient.getBirthDate())
                    .emergencyNumber(patient.getEmergencyNumber())
                    .secretaryId(patient.getSecretary())
                    .build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el médico con ID: " + id);
        }

    }

    public void deletePatient(Long id) {
        Optional<Patient> optionalPatient = patientRepository.findById(id);

        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();
            patientRepository.delete(patient);
        } else {
            // Aquí puedes manejar el caso en el que el doctor no existe
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el paciente con ID: " + id);
        }
    }
    public PatientResponse modifyPatient(Long id, PatientRequest patientRequest) {
        Patient patient = patientRepository.getReferenceById(id);

        if (patientRequest.getName() != null && !patientRequest.getName().isEmpty()) {
            patient.setName(patientRequest.getName());
        }

        if (patientRequest.getPhoneNumber() != null && !patientRequest.getPhoneNumber().isEmpty()) {
            patient.setPhoneNumber(patientRequest.getPhoneNumber());
        }

        if (patientRequest.getBirthDate() != null) {
            patient.setBirthDate(patientRequest.getBirthDate());
        }

        if (patientRequest.getEmergencyNumber() != null) {
            patient.setEmergencyNumber(patientRequest.getEmergencyNumber());
        }

        Optional<Secretary> optionalSecretary = secretaryRepository.findById(patientRequest.getSecretaryId());

        if (!optionalSecretary.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el secretario con ID: " + patientRequest.getSecretaryId());
        }


        Secretary savedSecretary = optionalSecretary.get();
        patient.setSecretary(savedSecretary.getId());

        Patient savedPatient = patientRepository.save(patient);
        return PatientResponse.builder()
                .Id(savedPatient.getId())
                .dni(savedPatient.getDni())
                .name(savedPatient.getName())
                .email(savedPatient.getEmail())
                .address(savedPatient.getAddress())
                .phoneNumber(savedPatient.getPhoneNumber())
                .birthDate(savedPatient.getBirthDate())
                .emergencyNumber(savedPatient.getEmergencyNumber())
                .secretaryId(savedPatient.getSecretary())
                .build();
    }

    public Patient findById(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró al paciente con ID: " + patientId));
    }


    public PatientResponseComplete getPatientByDni(int dni) {
        // SELECT * FROM paciente WHERE DNI=DNI
        Optional<Patient> patientOptional = Optional.ofNullable(patientRepository.findByDni(dni));

        if (patientOptional.isPresent()) {
            Patient patient = patientOptional.get();

            return PatientResponseComplete.builder()
                    .Id(patient.getId())
                    .dni(patient.getDni())
                    .name(patient.getName())
                    .email(patient.getEmail())
                    .address(patient.getAddress())
                    .phoneNumber(patient.getPhoneNumber())
                    .birthDate(patient.getBirthDate())
                    .emergencyNumber(patient.getEmergencyNumber())
                    .secretaryId(patient.getSecretary())
                    .build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el paciente con DNI: " + dni);
        }
    }
}

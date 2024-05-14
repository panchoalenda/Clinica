package com.medical.app.services;

import com.medical.app.models.Doctor;
import com.medical.app.models.Secretary;
import com.medical.app.models.request.DoctorRequest;
import com.medical.app.models.response.DoctorResponse;
import com.medical.app.models.response.DoctorResponseCompleto;
import com.medical.app.repository.DoctorRepository;
import com.medical.app.repository.SecretaryRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private SecretaryRepository secretaryRepository;

//------------crear medicos
    public DoctorResponse createDoctor(DoctorRequest doctorRequest) {
        Doctor newDoctor = new Doctor();
        newDoctor.setDni(doctorRequest.getDni());
        newDoctor.setName(doctorRequest.getName());
        newDoctor.setEmail(doctorRequest.getEmail());
        newDoctor.setAddress(doctorRequest.getAddress());
        newDoctor.setPhoneNumber(doctorRequest.getPhoneNumber());
        newDoctor.setSpeciality(doctorRequest.getSpeciality());
        newDoctor.setOffice(doctorRequest.getOffice());
        newDoctor.setSchedule(doctorRequest.getSchedule());
        newDoctor.setLicenseNumber(doctorRequest.getLicenseNumber());

        Optional<Secretary> optionalSecretary = secretaryRepository.findByDni(Math.toIntExact(doctorRequest.getSecretaryId()));

        if (!optionalSecretary.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el secretario con ID: " + doctorRequest.getSecretaryId());
        }

        Secretary savedSecretary = optionalSecretary.get();
        newDoctor.setSecretary(savedSecretary.getId());
        Doctor savedDoctor = doctorRepository.save(newDoctor);

        return DoctorResponse.builder()
                .id(savedDoctor.getId())
                .dni(savedDoctor.getDni())
                .name(savedDoctor.getName())
                .email(savedDoctor.getEmail())
                .address(savedDoctor.getAddress())
                .phoneNumber(savedDoctor.getPhoneNumber())
                .speciality(savedDoctor.getSpeciality())
                .office(savedDoctor.getOffice())
                .schedule(savedDoctor.getSchedule())
                .licenseNumber(savedDoctor.getLicenseNumber())
                .secretaryId(savedDoctor.getSecretary())
                .build();
    }

    //----------- ver medicos


    public List<DoctorResponse> getDoctors() {
        // SELECT * FROM MEDICOS
        List<Doctor> doctors = (List<Doctor>) doctorRepository.findAll();

        // se mapea la lista que recibimos de la base y la retornamos como tipo List
        return doctors.stream()
                .map(m -> DoctorResponse.builder()
                        .id(m.getId())
                        .dni(m.getDni())
                        .name(m.getName())
                        .email(m.getEmail())
                        .address(m.getAddress())
                        .phoneNumber(m.getPhoneNumber())
                        .speciality(m.getSpeciality())
                        .office(m.getOffice())
                        .schedule(m.getSchedule())
                        .licenseNumber(m.getLicenseNumber())
                        .secretaryId(m.getSecretary())
                        .build())
                .toList();
    }

    public DoctorResponseCompleto getDoctor(Long id) {
        //SELECT * FROM MEDICOS WHERE ID=ID
        Optional<Doctor> doctorOptional = doctorRepository.findById(id);

        if (doctorOptional.isPresent()) {
            Doctor doctor = doctorOptional.get();

            return DoctorResponseCompleto.builder()
                    .id(doctor.getId())
                    .dni(doctor.getDni())
                    .name(doctor.getName())
                    .email(doctor.getEmail())
                    .address(doctor.getAddress())
                    .phoneNumber(doctor.getPhoneNumber())
                    .specialty(doctor.getSpeciality())
                    .office(doctor.getOffice())
                    .schedule(doctor.getSchedule())
                    .licenseNumber(doctor.getLicenseNumber())
                    .secretaryId(doctor.getSecretary())
                    .build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el médico con ID: " + id);
        }
    }


    //---- modificar

    public DoctorResponse modifyDoctor(Long id, DoctorRequest doctorRequest) {
        Doctor doctor = doctorRepository.getReferenceById(id);
        if (doctorRequest.getName() != null && !doctorRequest.getName().isEmpty()) {
            doctor.setName(doctorRequest.getName());
        }

        // Supongamos que no existe getRol() y quieres omitirlo

        if (doctorRequest.getDni() != null) {
            doctor.setDni(doctorRequest.getDni());
        }

        if (doctorRequest.getPhoneNumber() != null && !doctorRequest.getPhoneNumber().isEmpty()) {
            doctor.setPhoneNumber(doctorRequest.getPhoneNumber());
        }

        if (doctorRequest.getLicenseNumber() != null && !doctorRequest.getLicenseNumber().isEmpty()) {
            doctor.setLicenseNumber(doctorRequest.getLicenseNumber());
        }
        if (doctorRequest.getOffice() != null && !doctorRequest.getOffice().isEmpty()) {
            doctor.setOffice(doctorRequest.getOffice());
        }

        if (doctorRequest.getSchedule() != null && !doctorRequest.getSchedule().isEmpty()) {
            doctor.setSchedule(doctorRequest.getSchedule());
        }

        Optional<Secretary> optionalSecretary = secretaryRepository.findById(doctorRequest.getSecretaryId());

        if (!optionalSecretary.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el secretario con ID: " + doctorRequest.getSecretaryId());
        }


        Secretary savedSecretary = optionalSecretary.get();
        doctor.setSecretary(savedSecretary.getId());

        Doctor savedDoctor = doctorRepository.save(doctor);
        return DoctorResponse.builder()
                .id(savedDoctor.getId())
                .dni(savedDoctor.getDni())
                .name(savedDoctor.getName())
                .email(savedDoctor.getEmail())
                .address(savedDoctor.getAddress())
                .phoneNumber(savedDoctor.getPhoneNumber())
                .speciality(savedDoctor.getSpeciality())
                .office(savedDoctor.getOffice())
                .schedule(savedDoctor.getSchedule())
                .licenseNumber(savedDoctor.getLicenseNumber())
                .secretaryId(savedDoctor.getSecretary())
                .build();
    }
    //---- borrar
    public void deleteDoctor(Long id) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);

        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            doctorRepository.delete(doctor);
        } else {
            // Aquí puedes manejar el caso en el que el doctor no existe
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el doctor con ID: " + id);
        }
    }

    public Doctor findById(Long doctorId) {
        return doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró al paciente con ID: " + doctorId));

    }

    public DoctorResponseCompleto getDoctorByDni(Integer dni) {
        // SELECT * FROM MEDICOS WHERE DNI=DNI
        Optional<Doctor> doctorOptional = doctorRepository.findByDni(dni);

        if (doctorOptional.isPresent()) {
            Doctor doctor = doctorOptional.get();

            return DoctorResponseCompleto.builder()
                    .id(doctor.getId())
                    .dni(doctor.getDni())
                    .name(doctor.getName())
                    .email(doctor.getEmail())
                    .address(doctor.getAddress())
                    .phoneNumber(doctor.getPhoneNumber())
                    .specialty(doctor.getSpeciality())
                    .office(doctor.getOffice())
                    .schedule(doctor.getSchedule())
                    .licenseNumber(doctor.getLicenseNumber())
                    .secretaryId(doctor.getSecretary())
                    .build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el médico con DNI: " + dni);
        }
    }
}

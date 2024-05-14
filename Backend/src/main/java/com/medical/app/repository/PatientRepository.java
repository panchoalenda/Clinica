package com.medical.app.repository;

import com.medical.app.models.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends CrudRepository<Patient,Long> {


    Patient getReferenceById(Long id);
    //Optional<Patient> findByDni(int patientDni);
    Patient findByDni(int patientDni);
}

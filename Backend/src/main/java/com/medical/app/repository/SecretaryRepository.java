package com.medical.app.repository;

import com.medical.app.models.Secretary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecretaryRepository extends CrudRepository<Secretary,Long> {

    @Query("SELECT f FROM Secretary f WHERE f.dni = :dni")
    Optional<Secretary> findByDni(@Param("dni") Integer dni);

    Secretary getReferenceByid(Long id);
}

package com.medical.app.repository;

import com.medical.app.models.Admin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {

    @Query("SELECT f FROM Admin f WHERE f.username = :username AND f.password = :password")
    Optional<Admin> findAdmin(@Param("username") String username, @Param("password") String password);


}

package com.medical.app.models.util;

import com.medical.app.models.Rol;
import com.medical.app.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CargadorDeDatos implements CommandLineRunner {

    @Autowired
    private RolRepository rolRepository;

    @Override
    public void run(String... args) throws Exception {
        // Cargar roles si la tabla está vacía
        if (rolRepository.count() == 0) {
            rolRepository.save(new Rol("ADMINISTRADOR"));
            rolRepository.save(new Rol("SECRETARIO"));
            rolRepository.save(new Rol("DOCTOR"));
        }
    }
}
package com.medical.app.services;

import com.medical.app.models.Admin;

public interface AdminService {

    Admin findAdmin(Admin admin);
    Admin saveAdmin(Admin admin);
}

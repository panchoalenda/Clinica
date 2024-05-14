const API = "http://localhost:8080/admin";
const API_ROLES = "http://localhost:8080/roles";
const API_SECRETARY = "http://localhost:8080/secretaries";
const API_PATIENT = "http://localhost:8080/patients";
const API_DOCTOR = "http://localhost:8080/doctor";
const API_APPOINTMENTS = "http://localhost:8080/appointments";

export const Get = async () => {
  const result = await fetch(API, {
    headers: {
      // Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzUzN2ZmMTlmMzgxZGQ3YjY3ZWVlMWVhOGI4MTY0YSIsInN1YiI6IjVlM2ExNMU1MGMyNzEwMDAxODc1NTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOpZ_nBtA93tbzr6-rxD0760tssAAaSppyjRv9anArs",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

export const createUser = async (userData) => {
  try {
    const result = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(userData), // Convertimos el objeto de usuario a JSON
    });
    if (!result.ok) {
      throw new Error("Error al crear el usuario");
    }
    // console.log("Estoy se envia al servidor " + JSON.stringify(await result.json()));
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

export const loginUser = async (userData) => {
  try {
    const result = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(userData), // Convertimos el objeto de usuario a JSON
    });

    if (!result.ok) {
      throw new Error("Error al crear el usuario");
    }
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al crear el usuario:");
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

export const getRoles = async () => {
  const result = await fetch(API_ROLES, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

/*SECRETARIO */
export const createSecretary = async (secretaryData) => {
  try {
    const result = await fetch(API_SECRETARY + "/create-secretary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(secretaryData), // Convertimos el objeto de usuario a JSON
    });
    if (!result.ok) {
      throw new Error("Error al crear el usuario");
    }
    // console.log("Estoy se envia al servidor " + JSON.stringify(await result.json()));
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

export const getSecretary = async () => {
  const result = await fetch(API_SECRETARY + "/get-secretaries", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

/*PACIENTE */
export const createPatient = async (patientData) => {
  try {
    const result = await fetch(API_PATIENT + "/create-patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(patientData), // Convertimos el objeto de usuario a JSON
    });
    if (!result.ok) {
      throw new Error("Error al crear el usuario");
    }
    // console.log("Estoy se envia al servidor " + JSON.stringify(await result.json()));
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

export const getPatient = async () => {
  const result = await fetch(API_PATIENT, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

export const getPatientDni = async (dni) => {
  const result = await fetch(API_APPOINTMENTS +"/dni/"+  dni, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

/*DOCTOR */
export const createDoctor = async (doctorData) => {
  try {
    const result = await fetch(API_DOCTOR + "/create-doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(doctorData), // Convertimos el objeto de usuario a JSON
    });
    if (!result.ok) {
      throw new Error("Error al crear el DOCTOR");
    }
    // console.log("Estoy se envia al servidor " + JSON.stringify(await result.json()));
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al crear el DOCTOR:", error);
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

export const getDoctorDni = async (dni) => {
  console.log("El dni del doctor desde http es: " + dni);

  const result = await fetch(API_APPOINTMENTS + "/dni-doctor/" + dni, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};


export const getDoctor = async () => {
  const result = await fetch(API_DOCTOR + "/get-doctor", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

/* APPOINTMENTS */
export const createAppointments = async (appointmentsData) => {
  try {
    const result = await fetch(API_APPOINTMENTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(appointmentsData), // Convertimos el objeto de usuario a JSON
    });
    if (!result.ok) {
      throw new Error("Error al crear el TURNO");
    }
    // console.log("Estoy se envia al servidor " + JSON.stringify(await result.json()));
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al crear el TURNO:", error);
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

export const getAppointmentsListDetails = async () => {
  const result = await fetch(API_APPOINTMENTS + "/details", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

export const turnoCancel = async (detailsTurnoCancel) => {
  console.log(detailsTurnoCancel)
  try {
    const result = await fetch(API_APPOINTMENTS + "/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(detailsTurnoCancel), // Convertimos el objeto de usuario a JSON
    });
    if (!result.ok) {
      throw new Error("Error al cancelar el TURNO");
    }
    return await result.json(); // Devolvemos los datos obtenidos del servidor
  } catch (error) {
    console.error("Error al cancelar el TURNO:", error);
    throw error; // Lanzamos el error para que sea manejado por el código que llama a esta función
  }
};

/* BUSCAR */

export const getPatientDniSearch = async (dni) => {
  console.log("El dni del paciente es: " + dni);
  const result = await fetch(API_PATIENT +"/dni/"+  dni, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

export const getDoctorDniSearch = async (dni) => {
  const result = await fetch(API_DOCTOR +"/dni/"+  dni, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

export const getSecretaryDniSearch = async (dni) => {
  const result = await fetch(API_SECRETARY +"/dni/"+  dni, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return await result.json();
};

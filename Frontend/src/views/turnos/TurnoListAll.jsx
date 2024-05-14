import { Navbar } from "../../components/navbar/NavBar";
import styles from "./turno.module.css";
import { TurnoFindAll } from "../../components/turnoSearch/TurnoFindAll";
import { TurnoFindDoctor } from "../../components/turnoSearch/TurnoFindDoctor";
import { TurnoFindPatient } from "../../components/turnoSearch/TurnoFindPatient";
import { UserHook } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { getDoctorDni, getPatientDni } from "../../data/HttpClient";

const initialStatusFind = {
  isFindAll: true,
  isFindDoctor: false,
  isFindPatient: false,
};

export default function TurnoListAll() {
  const [statusFind, setStatusFind] = useState(initialStatusFind);
  const { isFindAll, isFindDoctor, isFindPatient } = statusFind;

  const { doctorFindDni, setDoctorFindDni } = UserHook();
  const { doctorDni, setDoctorDni } = UserHook();

  const { patientFindDni, setPatientFindDni } = UserHook();
  const { patientDni, setPatientDni } = UserHook();

  const enviarDoctor = (event) => {
    getDoctorDni(doctorDni)
      .then((data) => {
        setDoctorFindDni(data);
        showDoctor();
        console.log("El doctor es: ", data);

        // Maneja la respuesta del servidor aquí
      })
      .catch((error) => {
        // setDoctorFindDni(userInitial);
        // setMessage("Usuario o Contraseña inválidos");
        // console.error("Error al crear el usuario en login:", error);
        // Maneja el error aquí
      });

    event.preventDefault();
    setDoctorFindDni([]);
    console.log("El doctorFindDni: :" + doctorFindDni);
    // setUser(userInitial);
  };

  const enviarPatient = (event) => {
    getPatientDni(patientDni)
      .then((data) => {
        setPatientFindDni(data);
        showPatient();
        // console.log("Que valor tiene" + isFindPatient);
        // console.log("El paciente es: ", data);

        // Maneja la respuesta del servidor aquí
      })
      .catch((error) => {
        // setDoctorFindDni(userInitial);
        // setMessage("Usuario o Contraseña inválidos");
        // console.error("Error al crear el usuario en login:", error);
        // Maneja el error aquí
      });

    event.preventDefault();
    setPatientFindDni([]);
    // console.log("El patiendFindDni: :" + patientFindDni);
    // setUser(userInitial);
  };

  //Doctor
  const handleDoctorOnChange = (event) => {
    setDoctorDni(event.target.value);
    // console.log("El doctor en el handler es: ", doctorDni);
  };

  // useEffect(
  //   () => console.log("El doctor en el handler es: ", doctorDni),
  //   [doctorDni]
  // );

  //Paciente
  const handlePatientOnChange = (event) => {
    setPatientDni(event.target.value);
    // console.log("El paciente en el handler es: ", patientDni);
  };

  // useEffect(
  //   () => console.log("El paciente en el handler es: ", patientDni),
  //   [patientDni]
  // );

  //status para ocultar
  const showDoctor = () => {
    setStatusFind((prevStatus) => ({
      ...prevStatus,
      isFindAll: false,
      isFindDoctor: true,
      isFindPatient: false,
    }));
  };

  const showPatient = () => {
    setStatusFind((prevStatus) => ({
      ...prevStatus,
      isFindAll: false,
      isFindDoctor: false,
      isFindPatient: true,
    }));
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.sContainer}>
          <div className={`${styles.form} "row g-3"`}>
            <div className={styles.tittle}>
              <h1>LISTA DE TURNOS ASIGNADOS</h1>
            </div>
            <div className="row">
              <div className="col">
                <form className={styles["form-list"]} onSubmit={enviarPatient}>
                  <div className={styles["form-search"]}>
                    Buscar por Paciente
                  </div>
                  <div className={`${styles.input} m-0`}>
                    <input
                      type="number"
                      placeholder="Ingrese DNI (sin puntos)"
                      id="patientDni"
                      name="patientDni"
                      value={patientDni}
                      onChange={handlePatientOnChange}
                    />
                    <button type="submit">
                      <img src="/public/img/search.png" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="col">
                <form className={styles["form-list"]} onSubmit={enviarDoctor}>
                  <div className={styles["form-search"]}>Buscar por Doctor</div>
                  <div className={`${styles.input} m-0`}>
                    <input
                      type="number"
                      placeholder="Ingrese DNI (sin puntos)"
                      id="doctorDni"
                      name="doctorDni"
                      value={doctorDni}
                      onChange={handleDoctorOnChange}
                    />
                    <button>
                      <img src="/public/img/search.png" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {isFindAll == true &&
            isFindDoctor == false &&
            isFindPatient == false ? (
              <TurnoFindAll />
            ) : (
              ""
            )}
            {isFindAll == false &&
            isFindDoctor == true &&
            isFindPatient == false ? (
              <TurnoFindDoctor />
            ) : (
              ""
            )}
            {isFindAll == false &&
            isFindDoctor == false &&
            isFindPatient == true ? (
              <TurnoFindPatient />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

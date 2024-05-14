import { Navbar } from "../../components/navbar/NavBar";
import styles from "./search.module.css";
import { UserHook } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { getDoctorDni, getDoctorDniSearch, getPatientDni, getPatientDniSearch, getSecretaryDniSearch } from "../../data/HttpClient";
import { FindDoctor } from "../../components/search/FindDoctor";
import { FindSecretary } from "../../components/search/FindSecretary";
import { FindPatient } from "../../components/search/FindPatient";

const initialStatusFind = {
  isFindSecretary: false,
  isFindDoctor: false,
  isFindPatient: false,
};

export default function Search() {
  const [statusFind, setStatusFind] = useState(initialStatusFind);
  const { isFindSecretary, isFindDoctor, isFindPatient } = statusFind;

  const [doctorFindDni, setDoctorFindDni] = useState();
  const { doctorDni, setDoctorDni } = UserHook();

  const [patientFindDni, setPatientFindDni] = useState();
  const { patientDni, setPatientDni } = UserHook();

  const [secretaryFindDni, setSecretaryFindDni] = useState();
  const { secretaryDni, setSecretaryDni } = UserHook();

  const enviarDoctor = (event) => {
    getDoctorDniSearch(doctorFindDni)
      .then((data) => {
        setDoctorDni(data);
        // setDoctorFindDni(data);
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
    setDoctorFindDni("");
    console.log("El doctorFindDni: :" + doctorFindDni);
    // setUser(userInitial);
  };

  const enviarPatient = (event) => {
    getPatientDniSearch(patientFindDni)
      .then((data) => {
        setPatientDni(data);

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
    setPatientFindDni("");
    // console.log("El patiendFindDni: :" + patientFindDni);
    // setUser(userInitial);
  };

  const enviarSecretary = (event) => {
    getSecretaryDniSearch(secretaryFindDni)
      .then((data) => {
        setSecretaryDni(data);
        showSecretary();
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
    setSecretaryFindDni([]);
    // console.log("El patiendFindDni: :" + patientFindDni);
    // setUser(userInitial);
  };

  //Secretary
  const handleSecretaryOnChange = (event) => {
    setSecretaryFindDni(event.target.value);
    // console.log("El doctor en el handler es: ", doctorDni);
  };

  // useEffect(
  //   () => console.log("El doctor en el handler es: ", doctorDni),
  //   [doctorDni]
  // );
  //Doctor
  const handleDoctorOnChange = (event) => {
    setDoctorFindDni(event.target.value);
    console.log("El doctor en el handler es: ", doctorDni);
  };

  // useEffect(
  //   () => console.log("El doctor en el handler es: ", doctorDni),
  //   [doctorDni]
  // );

  //Paciente
  const handlePatientOnChange = (event) => {
    setPatientFindDni(event.target.value);
    // console.log("El paciente en el handler es: ", patientDni);
  };

  // useEffect(
  //   () => console.log("El paciente en el handler es: ", patientDni),
  //   [patientDni]
  // );

  //status para ocultar
  const showSecretary = () => {
    setStatusFind((prevStatus) => ({
      ...prevStatus,
      isFindSecretary: true,
      isFindDoctor: false,
      isFindPatient: false,
    }));
  };
  const showDoctor = () => {
    setStatusFind((prevStatus) => ({
      ...prevStatus,
      isFindSecretary: false,
      isFindDoctor: true,
      isFindPatient: false,
    }));
  };

  const showPatient = () => {
    setStatusFind((prevStatus) => ({
      ...prevStatus,
      isFindSecretary: false,
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
              <h1>OBTENER DATOS</h1>
            </div>
            <div className="row">
              <div className="col">
                <form className={styles["form-list"]} onSubmit={enviarPatient}>
                  <div className={styles["form-search"]}>Buscar Paciente</div>
                  <div className={`${styles.input} m-0`}>
                    <input
                      type="number"
                      placeholder="Ingrese DNI (sin puntos)"
                      id="patientFindDni"
                      name="patientFindDni"
                      value={patientFindDni}
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
                  <div className={styles["form-search"]}>Buscar Doctor</div>
                  <div className={`${styles.input} m-0`}>
                    <input
                      type="number"
                      placeholder="Ingrese DNI (sin puntos)"
                      id="doctorFindDni"
                      name="doctorFindDni"
                      value={doctorFindDni}
                      onChange={handleDoctorOnChange}
                    />
                    <button>
                      <img src="/public/img/search.png" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="col">
                <form className={styles["form-list"]} onSubmit={enviarSecretary}>
                  <div className={styles["form-search"]}>Buscar Secretario</div>
                  <div className={`${styles.input} m-0`}>
                    <input
                      type="number"
                      placeholder="Ingrese DNI (sin puntos)"
                      id="secretaryFindDni"
                      name="secretaryFindDni"
                      value={secretaryFindDni}
                      onChange={handleSecretaryOnChange}
                    />
                    <button>
                      <img src="/public/img/search.png" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {isFindSecretary == false &&
            isFindDoctor == true &&
            isFindPatient == false ? (
              <FindDoctor />
            ) : (
              ""
            )}
            {isFindSecretary == true &&
            isFindDoctor == false &&
            isFindPatient == false ? (
              <FindSecretary />
            ) : (
              ""
            )}
            {isFindSecretary == false &&
            isFindDoctor == false &&
            isFindPatient == true ? (
              <FindPatient />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

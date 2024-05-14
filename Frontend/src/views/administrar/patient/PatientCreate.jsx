import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/navbar/NavBar";
import { UserHook } from "../../../context/UserContext";
import styles from "./patient.module.css";
import { createPatient, getSecretary } from "../../../data/HttpClient";
import { useEffect, useState } from "react";

const patientInitial = {
  dni: 0,
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  birthDate: "000-00-00",
  emergencyNumber: "",
  secretaryId: 0,
};

export default function Create() {
  const { patient, setPatient } = UserHook(); //Utilizo el hook personalizado
  const {
    dni,
    name,
    email,
    address,
    phoneNumber,
    emergencyNumber,
    
  } = patient;

  const [birthDate, setBirthDate] = useState("");

  const [secretary, setSecretary] = useState([]); //Cargo la lista de Secretarios

  const [secretaryId, setSecretaryId] = useState(); //Guardo el Secretario Seleccionado

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecretary = () => {
      getSecretary()
        .then((data) => {
          // Maneja la respuesta del servidor aquí
          setSecretary(data);
          console.log("Lista de Secretarios:", secretary);
        })
        .catch((error) => {
          console.error("Error al Listar los roles:", error);
          // Maneja el error aquí
        });
    };

    // Llama a la función que obtiene los roles
    fetchSecretary();
  }, []);


  const create = (event) => {
    event.preventDefault();
    patient.birthDate = birthDate;
    patient.secretaryId = secretaryId
    createPatient(patient)
      .then((data) => {
        console.log("Patient create:", data);
        navigate("/info");
        window.location.reload();
      })
      .catch((error) => {
        setPatient(patientInitial);
        console.error("Error al crear el paciente:", error);
        // Maneja el error aquí
      });

    const {
      target: { name, value },
    } = event;

    setPatient({
      [name]: value,
    });
    // setUser(userInitial);
  };

  
  const patientOnchange = ({ target: { name, value } }) => {
    setPatient({
      ...patient,
      [name]: value,
      //
    });
  };

  const handleSecretaryChange = (event) => {
    const selectedSecretaryId = event.target.value;
    setSecretaryId(selectedSecretaryId);
  };


  console.log("El id del secretario elegido es :" + secretaryId)

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.sContainer}>
          <form onSubmit={create} className="row g-3">
            <div className={styles.tittle}>
              <h1>CREAR PACIENTE</h1>
            </div>
            <div className="col-md-6">
              <label htmlFor="dni" className="form-label">
                DNI
              </label>
              <input
                type="number"
                className="form-control"
                id="dni"
                name="dni"
                value={dni}
                required
                placeholder="22222222"
                onChange={patientOnchange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Nombre y Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Francisco Alenda"
                onChange={patientOnchange}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="nombre@nombre.com"
                onChange={patientOnchange}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={address}
                placeholder="Calle Siempre Viva - 2200 - Prov. de San Juan - Argentina"
                onChange={patientOnchange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phoneNumber" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="2644123833"
                onChange={patientOnchange}
                required
              />
              <div className={styles.help}>
                * Télefono con Cod. de área sin 0 ni 15
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="birthDate" className="form-label">
                Fecha Nacimiento
              </label>
              <input
                type="Date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                value={birthDate}
                required
                onChange={(e) => setBirthDate(e.target.value)} // Actualiza el estado de birthDate
              />
              <div className={styles.help}>
                * Se debe colocar de la siguiente forma 0000-00-00 (Año-Mes-Día)
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="emergencyNumber" className="form-label">
                Teléfono de Emergencia
              </label>
              <input
                type="text"
                className="form-control"
                id="emergencyNumber"
                name="emergencyNumber"
                value={emergencyNumber}
                placeholder="2644123833"
                required
                onChange={patientOnchange}
              />
              <div className={styles.help}>
                * Télefono con Cod. de área sin 0 ni 15
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="secretaryId" className="form-label">
                Secretario
              </label>
              <select
                onChange={handleSecretaryChange}
                value={secretaryId}
                required
                className="form-select"
              >
                <option value="">Seleccionar ...</option>
                {Array.isArray(secretary) &&
                  secretary.map((r) => (
                    <option key={r.dni} value={r.dni}>
                      {r.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* <div className="col-md-4">
              <label htmlFor="area" className="form-label">
                Area
              </label>
              <select id="area" name="area" value={area} className="form-select">
                <option selected>Choose...</option>
                {}
                <option>...</option>
              </select>
            </div> */}
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

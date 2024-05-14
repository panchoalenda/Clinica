import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/navbar/NavBar";
import { UserHook } from "../../../context/UserContext";
import styles from "./patient.module.css";
import { createSecretary } from "../../../data/HttpClient";

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

export default function Delete() {
  const { patient, setPatient } = UserHook(); //Utilizo el hook personalizado
  const { dni, name, email, address, phoneNumber, birthDate, emergencyNumber, secretaryId } = patient;

  const navigate = useNavigate();

  const create = (event) => {
    createSecretary(patient)
      .then((data) => {
        console.log("Patinet create:", data);
        // window.location.reload();
      })
      .catch((error) => {
        setPatient(patientInitial);
        console.error("Error al crear el paciente:", error);
        // Maneja el error aquí
      });

    const {
      target: { name, value },
    } = event;
    event.preventDefault();
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
              />
              <div className={styles.helpPhone}>
                Télefono con Cod. de área sin 0 ni 15
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
                placeholder="0000-00-00  Año-Mes-Día"
                onChange={patientOnchange}
              />
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
                onChange={patientOnchange}
              />
              <div className={styles.helpPhone}>
                Télefono con Cod. de área sin 0 ni 15
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="secretaryId" className="form-label">
                Secretario
              </label>
              <select id="secretaryId" name="secretaryId" value={secretaryId} className="form-select">
                <option selected>Choose...</option>
                {}
                <option>...</option>
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

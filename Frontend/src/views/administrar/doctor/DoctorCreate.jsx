import { Navbar } from "../../../components/navbar/NavBar";
import { UserHook } from "../../../context/UserContext";
import styles from "./doctor.module.css";
import { createDoctor, getSecretary } from "../../../data/HttpClient";
import { useEffect, useState } from "react";

const doctorInitial = {
  dni: 0,
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  speciality: "",
  office: "",
  schedule: "",
  licenseNumber: "",
  secretaryId: 0,
};

export default function Create() {
  const { doctor, setDoctor } = UserHook(); //Utilizo el hook personalizado
  const { dni, name, email, address, phoneNumber, licenseNumber } = doctor;

  const [secretary, setSecretary] = useState([]); //Cargo la lista de Secretarios

  const [secretaryId, setSecretaryId] = useState(); //Guardo el Secretario Seleccionado
  const [scheduleId, setScheduleId] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [specialityId, setSpecialityId] = useState("");

  useEffect(() => {
    const fetchSecretary = () => {
      getSecretary()
        .then((data) => {
          // Maneja la respuesta del servidor aquí
          setSecretary(data);
          console.log("Lista de Secretarios:", secretary);
        })
        .catch((error) => {
          console.error("Error al Listar los secretarios:", error);
          // Maneja el error aquí
        });
    };

    // Llama a la función que obtiene los roles
    fetchSecretary();
  }, []);

  const create = (event) => {
    event.preventDefault();
    doctor.secretaryId = secretaryId;
    doctor.office = officeId;
    doctor.schedule = scheduleId;
    doctor.speciality = specialityId;
    createDoctor(doctor)
      .then((data) => {
        if (!data.ok) {
          throw new Error('Error al crear el doctor');
        }
        console.log("Doctor create:", data);
        window.location.reload();
      })
      .catch((error) => {
        setDoctor(doctorInitial);
        console.error("Error al crear el doctor:", error);
        // Maneja el error aquí
      });

    const {
      target: { name, value },
    } = event;

    setDoctor({
      [name]: value,
    });
    // setUser(userInitial);
  };

  const doctorOnchange = ({ target: { name, value } }) => {
    setDoctor({
      ...doctor,
      [name]: value,
      //
    });
  };

  const handleSecretaryChange = (event) => {
    setSecretaryId(event.target.value);
  };

  const handleOfficeChange = (event) => {
    setOfficeId(event.target.value);
  };

  const handleScheduleChange = (event) => {
    setScheduleId(event.target.value);
  };

  const handleSpecialityChange = (event) => {
    setSpecialityId(event.target.value);
  };

  console.log("El id del secretario elegido es :" + secretaryId);

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.sContainer}>
          <form onSubmit={create} className="row g-3">
            <div className={styles.tittle}>
              <h1>CREAR DOCTOR</h1>
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
                value={dni ? dni : ""}
                required
                placeholder="22222222"
                onChange={doctorOnchange}
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
                onChange={doctorOnchange}
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
                onChange={doctorOnchange}
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
                onChange={doctorOnchange}
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
                onChange={doctorOnchange}
              />
              <div className={styles.help}>
                * Télefono con Cod. de área sin 0 ni 15
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="speciality" className="form-label">
                Especialidad
              </label>
              <select
                onChange={handleSpecialityChange}
                value={specialityId}
                required
                className="form-select"
              >
                <option value="">Seleccionar ...</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Endocrinología">Endocrinología</option>
                <option value="Gastroenterología">Gastroenterología</option>
                <option value="Ginecología">Ginecología</option>
                <option value="Neurología">Neurología</option>
                <option value="Oftalmología">Oftalmología</option>
                <option value="Ortopedia">Ortopedia</option>
                <option value="Otorrinolaringología">
                  Otorrinolaringología
                </option>
                <option value="Pediatría">Pediatría</option>
                <option value="Psiquiatría">Psiquiatría</option>
                <option value="Urología">Urología</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="office" className="form-label">
                Consultorio
              </label>
              <select
                onChange={handleOfficeChange}
                value={officeId}
                required
                className="form-select"
              >
                <option value="">Seleccionar ...</option>
                {[...Array(8)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="schedule" className="form-label">
                Turno
              </label>
              <select
                onChange={handleScheduleChange}
                value={scheduleId}
                required
                className="form-select"
              >
                <option value="">Seleccionar ...</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="licenseNumber" className="form-label">
                Matrícula
              </label>
              <input
                type="text"
                className="form-control"
                id="licenseNumber"
                name="licenseNumber"
                value={licenseNumber}
                placeholder="1234"
                onChange={doctorOnchange}
              />
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

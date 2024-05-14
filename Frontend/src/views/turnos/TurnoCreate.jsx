import { Navbar } from "../../components/navbar/NavBar";
import { UserHook } from "../../context/UserContext";
import styles from "./turno.module.css";
import {
  createAppointments,
  getDoctor,
  getPatient,
} from "../../data/HttpClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const appointmentsInitial = {
  appointmentDate: "",
  appointmentTime: "",
  doctorId: 0,
  patientId: 0,
  description: "",
};

export default function Create() {
  const { appointments, setAppointments } = UserHook(); //Utilizo el hook personalizado
  const {
    appointmentDate,
    appointmentTime,
    doctorId: doc,
    patientId: pat,
    description,
  } = appointments;

  const [doctor, setDoctor] = useState([]); //Cargo la lista de doctores
  const [patient, setPatient] = useState([]); //Cargo la lista de pacientes

  const [doctorId, setDoctorId] = useState(); //Guardo el doctor Seleccionado
  const [patientId, setPatientId] = useState(); //Guardo el paciente Seleccionado

  // const [appointmentTimeId, setAppointmentTimeId] = useState("");

  // const [officeId, setOfficeId] = useState("");
  // const [specialityId, setSpecialityId] = useState("");

  const [time, setTime] = useState("");

  // Horas que deseas deshabilitar
  const horasHabilitadas = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = () => {
      getPatient()
        .then((data) => {
          // Maneja la respuesta del servidor aquí
          setPatient(data);
          console.log("Lista de Pacientes:", patient);
        })
        .catch((error) => {
          console.error("Error al Listar los pacientes:", error);
          // Maneja el error aquí
        });
    };

    // Llama a la función que obtiene los roles
    fetchPatient();
  }, []);

  useEffect(() => {
    const fetchDoctor = () => {
      getDoctor()
        .then((data) => {
          // Maneja la respuesta del servidor aquí
          setDoctor(data);
          console.log("Lista de Pacientes:", doctor);
        })
        .catch((error) => {
          console.error("Error al Listar los pacientes:", error);
          // Maneja el error aquí
        });
    };

    // Llama a la función que obtiene los roles
    fetchDoctor();
  }, []);

  const create = (event) => {
    event.preventDefault();
    appointments.doctorId = doctorId;
    appointments.patientId = patientId;
    appointments.appointmentTime = time;

    // appointments.schedule = scheduleId;
    // appointments.speciality = specialityId;
    createAppointments(appointments)
      .then((data) => {
        console.log("Turno create:", data);
        navigate("/info");
        // window.location.reload();
      })
      .catch((error) => {
        setAppointments(appointmentsInitial);
        console.error("Error al crear el Turno:", error);
        navigate("/info");
        // Maneja el error aquí
      });

    const {
      target: { name, value },
    } = event;

    setAppointments({
      [name]: value,
    });
    // setUser(userInitial);
  };

  const appointmentsOnchange = ({ target: { name, value } }) => {
    setAppointments({
      ...appointments,
      [name]: value,
      //
    });
  };

  const handleDoctorChange = (event) => {
    setDoctorId(event.target.value);
  };

  const handlePatientChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  // const handleOfficeChange = (event) => {
  //   setOfficeId(event.target.value);
  // };

  // const handleScheduleChange = (event) => {
  //   setScheduleId(event.target.value);
  // };

  // const handleSpecialityChange = (event) => {
  //   setSpecialityId(event.target.value);
  // };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.sContainer}>
          <form onSubmit={create} className="row g-3">
            <div className={styles.tittle}>
              <h1>SOLICITAR TURNO</h1>
            </div>
            <div className="col-md-6">
              <label htmlFor="appointmentDate" className="form-label">
                Fecha
              </label>
              <input
                type="Date"
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                value={appointmentDate}
                required
                placeholder="2024-01-01"
                onChange={appointmentsOnchange}
              />
            </div>
            <div>
              <label htmlFor="time">Hora:</label>
              <select
                id="time"
                name="time"
                value={time}
                onChange={handleTimeChange}
                required
              >
                <option value="">Hora</option>
                {horasHabilitadas.map((horaHabilitada, index) => (
                  <option key={index} value={horaHabilitada}>
                    {horaHabilitada}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="secretaryId" className="form-label">
                Doctor
              </label>
              <select
                onChange={handleDoctorChange}
                value={doctorId}
                required
                className="form-select"
              >
                <option value="">Seleccionar ...</option>
                {Array.isArray(doctor) &&
                  doctor.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="secretaryId" className="form-label">
                Paciente
              </label>
              <select
                onChange={handlePatientChange}
                value={patientId}
                required
                className="form-select"
              >
                <option value="">Seleccionar ...</option>
                {Array.isArray(patient) &&
                  patient.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                rows="5"
                cols="50"
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                placeholder="Descripción ..."
                onChange={appointmentsOnchange}
              ></textarea>
            </div>
            {/* <div className="col-6">
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
                onChange={appointmentsOnchange}
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
                onChange={appointmentsOnchange}
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
                onChange={appointmentsOnchange}
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
                onChange={appointmentsOnchange}
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

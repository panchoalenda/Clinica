import { Navbar } from "../../components/navbar/NavBar";
import { UserHook } from "../../context/UserContext";
import styles from "./turno.module.css";
import { createDoctor, getSecretary } from "../../data/HttpClient";
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

export default function Search() {
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
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td className={styles.finAll}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
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

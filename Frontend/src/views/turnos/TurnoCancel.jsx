import { Navbar } from "../../components/navbar/NavBar";
import styles from "./turno.module.css";
import { turnoCancel } from "../../data/HttpClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const detailCancelTurnoInitial = {
  patientDni: 0,
  appointmentDate: "",
  appointmentTime: "",
};

export default function TurnoCancel() {
  const [detailCancelTurno, setDetailCancelTurno] = useState(
    detailCancelTurnoInitial
  );

  const { patientDni, appointmentDate, appointmentTime } = detailCancelTurno;
  const navigate = useNavigate();
  /* patientDni;
     appointmentDate;
   appointmentTime; */

  const sendCancelTurno = (event) => {
    turnoCancel(detailCancelTurno)
      .then((data) => {
        // Maneja la respuesta del servidor aquí
        console.log(data);
      })
      .catch((error) => {
        console.log("LA cancelacion del turno no es posible ", error);
        // Maneja el error aquí
      });
    navigate("/turnos/ver-todos");
    event.preventDefault();
  };

  const cancelTurnoOnChange = ({ target: { name, value } }) => {
    setDetailCancelTurno({
      ...detailCancelTurno,
      [name]: value,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.sContainer}>
          <div className={`${styles["form-cancel"]} "row g-3"`}>
            <div className={styles.tittle}>
              <h1>CANCELAR TURNO</h1>
            </div>
            <div className="row">
              <div className="col">
                <form
                  className={styles["form-list"]}
                  onSubmit={sendCancelTurno}
                >
                  <div>
                    <div className={styles["form-search"]}>
                      Ingrese DNI del Paciente
                    </div>
                    <div className={`${styles.input} m-0`}>
                      <input
                        type="number"
                        placeholder="Ingrese DNI (sin puntos)"
                        id="patientDni"
                        name="patientDni"
                        value={patientDni}
                        onChange={cancelTurnoOnChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles["form-search"]}>
                      Ingrese fecha del turno
                    </div>
                    <div className={`${styles.input} m-0`}>
                      <input
                        type="text"
                        placeholder="Ingrese DNI (sin puntos)"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={appointmentDate}
                        onChange={cancelTurnoOnChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles["form-search"]}>
                      Ingrese hora del turno
                    </div>
                    <div className={`${styles.input} m-0`}>
                      <input
                        type="text"
                        placeholder="Ingrese hora del turno (Formato 09:00:00)"
                        id="appointmentTime"
                        name="appointmentTime"
                        value={appointmentTime}
                        onChange={cancelTurnoOnChange}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import {  useNavigate } from "react-router-dom";
import styles from "./landing.module.css";

import { NavBarLanding } from "../../components/navbar/NavBarLanding";

export default function Landing() {
  const navigate = useNavigate();

  const callLogin = () => {
    console.log("sessionStorage.getItem(st):" + sessionStorage.getItem("st"))
    
      navigate("/login");
      window.location.reload();

    
  };

  return (
    <>
      <NavBarLanding />
      <div className="container">
        <div className="section section--header">
          <h1 className="section__title">Turnos Online</h1>
        </div>
        <div className="section section--md">
          <div className="section__body">
            <div className="row row--gap">
              <div className="col--gap col-xs-12 col-lg-7">
                <h3>Nuevo Sistema de Turnos</h3>
                <p>
                  Conocé cómo funciona el nuevo sistema de{" "}
                  <strong>
                    reserva de turnos, es más ágil, simple y rápido
                  </strong>
                  .
                </p>
                <ul>
                  <li>Elegí la Especialidad</li>
                  <li>Elegí Médico y Turno</li>
                  <li>Completá tus datos</li>
                  <li>Confirmá el Turno</li>
                  <button className="btn btn-primary" onClick={callLogin}>
                    {" "}
                    Reservar Turno
                  </button>
                </ul>
              </div>
              <div className="col--gap col-xs-12 col-lg-5">
                <img
                  className={styles.photo}
                  alt="Reservar Turno"
                  src="/img/photo.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

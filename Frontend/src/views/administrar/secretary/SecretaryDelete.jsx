import styles from "./secretary.module.css";

import { Navbar } from "../../../components/navbar/NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { UserHook } from "../../../context/UserContext.jsx";
import { createSecretary } from "../../../data/HttpClient.jsx";

const secretaryInitial = {
  dni: 0,
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  area: "",
};

export default function Delete() {
  const { secretary, setSecretary } = UserHook(); //Utilizo el hook personalizado
  const { dni, name, email, address, phoneNumber, area } = secretary;

  const navigate = useNavigate();

  const create = (event) => {
    createSecretary(secretary)
      .then((data) => {
        console.log("Secretary create:", data);
        navigate("/info")
        window.location.reload();
      })
      .catch((error) => {
        setSecretary(secretaryInitial);
        console.error("Error al crear el usuario en login:", error);
        // Maneja el error aquí
      });

    const {
      target: { name, value },
    } = event;
    event.preventDefault();
    setSecretary({
      [name]: value,
    });
    // setUser(userInitial);
  };


  const secretaryOnchange = ({ target: { name, value } }) => {
    setSecretary({
      ...secretary,
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
              <h1>ELIMINAR SECRETARIO</h1>
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
                onChange={secretaryOnchange}
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
                onChange={secretaryOnchange}
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
                onChange={secretaryOnchange}
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
                onChange={secretaryOnchange}
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
                onChange={secretaryOnchange}
              />
              <div className={styles.helpPhone}>
                Télefono con Cod. de área sin 0 ni 15
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="area" className="form-label">
                Area
              </label>
              <input
                type="text"
                className="form-control"
                id="area"
                name="area"
                value={area}
                placeholder="Traumatología, Fonodiología, ..."
                onChange={secretaryOnchange}
              />
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

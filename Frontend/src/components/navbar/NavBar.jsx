import { useNavigate } from "react-router-dom";
import { UserHook } from "../../context/UserContext";
import "./NavBar.css";
import styles from "./NavBar.module.css";

const userInitial = {
  name: "",
  lastname: "",
  username: "",
  password: "",
  rol: "",
};

export const Navbar = () => {
  const { status, setStatus, user, setUser } = UserHook();
  const { rol } = user;

  console.log("El rol rol  del NavBar es: " + user.rol);

  const navigate = useNavigate();

  console.log("Estoy en navbar " + status);

  const changeStatus = () => {
    if (status) {
      // sessionStorage.setItem("st", "false");
      sessionStorage.clear();
      setUser(userInitial);
      setStatus(false);
      navigate("/login");
      console.log("Estoy en changeStatus " + status);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img className={styles.imgLogout} src="/public/img/logo2.svg" />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Inicio
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Turnos
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/turnos/solicitar">
                      Solicitar
                    </a>
                  </li>

                  <li>
                  <a className="dropdown-item" href="/turnos/solicitar">
                      Reprogramar
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/turnos/cancelar">
                      Cancelar
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/turnos/ver-todos">
                      VER ASIGNADOS
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/buscar">
                  Buscar
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Administrar
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Secretario
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/secretaria/crear"
                        >
                          Crear Secretario
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/secretaria/actualizar"
                        >
                          Modificar Secretario
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/secretaria/eliminar"
                        >
                          Eliminar Secretario
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Doctor
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/doctor/crear"
                        >
                          Crear Doctor
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/doctor/actualizar"
                        >
                          Modificar Doctor
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/doctor/eliminar"
                        >
                          Eliminar Doctor
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Paciente
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/paciente/crear"
                        >
                          Crear Paciente
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/paciente/actualizar"
                        >
                          Modificar Paciente
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/administrar/paciente/eliminar"
                        >
                          Eliminar Paciente
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Administrador
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Crear Administrador
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Modificar Administrador
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Eliminar Administrador
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <button
            className="nav-link"
            aria-disabled="true"
            onClick={changeStatus}
          >
            {" "}
            <img className="iconLogout" src="/img/logout.png" />
          </button>
        </div>
      </nav>
    </>
  );
};

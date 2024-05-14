import { useNavigate } from "react-router-dom";
import "./login.css";
// import "./login.css";
import { useEffect, useState } from "react";
import { createUser, getRoles, loginUser } from "../../data/HttpClient";
import { UserHook } from "../../context/UserContext";

const userInitial = {
  name: "",
  lastname: "",
  username: "",
  password: "",
  rol: "",
};

export default function Login() {
  const { status, setStatus, user, setUser } = UserHook(); //Utilizo el hook personalizado

  const { name, lastname, username, password, rol } = user;
  
  const [roles, setRoles] = useState([]);


  const [message, setMessage] = useState("");

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(true);

  const navigate = useNavigate();

  const enviar = (event) => {
    loginUser(user)
      .then((data) => {
        console.log("Usuario creado:", data);
        sessionStorage.setItem("st", "true");
        sessionStorage.setItem("user", JSON.stringify(data));

        setStatus(JSON.parse(sessionStorage.getItem("st")));
        setUser(JSON.parse(sessionStorage.getItem("user")));

        navigate("/info");
        // Maneja la respuesta del servidor aquí
      })
      .catch((error) => {
        setUser(userInitial);
        setMessage("Usuario o Contraseña inválidos");
        console.error("Error al crear el usuario en login:", error);
        // Maneja el error aquí
      });
    const {
      target: { name, value },
    } = event;
    event.preventDefault();
    setUser({
      [name]: value,
    });
    // setUser(userInitial);
  };

  const create = (event) => {
    createUser(user)
      .then((data) => {
        sessionStorage.clear();
        console.log("Usuario creado:", data);
        navigate("/login");
        window.location.reload();

        // Maneja la respuesta del servidor aquí
      })
      .catch((error) => {
        //setUser(userInitial);
        setMessage("El nombre de usuario ya existe. Elije uno nuevo");
        console.error("Error al crear el usuario en login:", error);
        sessionStorage.clear();
        // Maneja el error aquí
        setUser(userInitial);
      });

    const {
      target: { name, value },
    } = event;
    event.preventDefault();
    setUser({
      [name]: value,
    });
    // setUser(userInitial);
  };

  const userOnchange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
      //
    });
  };

  const handleLoginClick = () => {
    setIsLoginVisible(true);
    setIsSignupVisible(false);
  };

  const handleSignupClick = () => {
    setIsLoginVisible(false);
    setIsSignupVisible(true);
  };

  useEffect(() => {
    const fetchRoles = () => {
      getRoles()
        .then((data) => {
          // Maneja la respuesta del servidor aquí
          setRoles(data);
          console.log("Lista de Roles:", roles);
        })
        .catch((error) => {
          console.error("Error al Listar los roles:", error);
          // Maneja el error aquí
        });
    };

    // Llama a la función que obtiene los roles
    fetchRoles();
  }, []);

  const handleRolChange = (event) => {
    const selectedRol = event.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      rol: selectedRol,
    }));
    // Almacena el valor del rol actualizado en sessionStorage
    sessionStorage.setItem("rol", selectedRol);
  };

  return (
    <>
      <div className="form-structor">
        <form onSubmit={create}>
          <div className={`signup ${isSignupVisible ? "slide-up" : ""}`}>
            <h2 className="form-title" id="signup" onClick={handleLoginClick}>
              ¿Deseas registrarte?
            </h2>
            <div className="form-holder">
              <input
                type="text"
                className="input"
                onChange={userOnchange}
                placeholder="Nombre"
                id="name"
                name="name"
                value={name}
                required
              />
              <input
                type="text"
                className="input"
                onChange={userOnchange}
                placeholder="Apellido"
                id="lastname"
                name="lastname"
                value={lastname}
                required
              />
              <input
                type="text"
                className="input"
                onChange={userOnchange}
                placeholder="Usuario"
                id="username"
                name="username"
                value={username}
                required
              />
              <input
                type="password"
                className="input"
                onChange={userOnchange}
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                required
              />
              <div className="input">
                <label htmlFor="rol">Seleccionar Rol:</label>
                <select onChange={handleRolChange} value={rol} required>
                  <option value="">Seleccionar ...</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.rolName}>
                      {r.rolName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="submit-btn">Registrate</button>
            <div className="msgErrorCreate">{message}</div>
          </div>
        </form>

        <form onSubmit={enviar}>
          <div className={`login ${isLoginVisible ? "slide-up" : ""}`}>
            <div className="center" onClick={handleSignupClick}>
              <h1 className="form-title" id="login">
                BIENVENIDOS
              </h1>
              <h2 className="form-title" id="login">
                ¿Estás registrado?
              </h2>
              <div className="form-holder">
                <input
                  type="text"
                  className="input"
                  onChange={userOnchange}
                  placeholder="Usuario"
                  id="username"
                  name="username"
                  value={username}
                  required
                />
                <input
                  type="password"
                  className="input"
                  onChange={userOnchange}
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  required
                />
              </div>
              <button className="submit-btn">Loguearse</button>
              <div className="msgErrorLogin">{message}</div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

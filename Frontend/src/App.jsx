import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login/login";
import { UserHook } from "./context/UserContext";
import { UserRoute } from "./routes/UserRoute";
import Landing from "./views/landing/landing";

export default function App() {
  const { status } = UserHook(); //Utilizo el hook personalizado
  
  
  console.log("estoy en route " + status)

  return (
    <div className="app">
      <Routes>
        {status ? (
          <Route path="/*" element={<UserRoute />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Landing />} />
          </>
        )}
      </Routes>
    </div>
  );
}

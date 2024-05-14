import { UserHook } from "../../context/UserContext";

export const TurnoFindPatient = () => {
  const { patientFindDni } = UserHook();
  console.log("Estoy en turnofindpatient:", patientFindDni);

  const filteredPatients = patientFindDni.filter(p => p.status === true);  //Filtro par que solo me muestre lo que estan con estado = true

  return (
    <>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Doctor</th>
            <th scope="col">Paciente</th>
            <th scope="col">Recordatorio</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((p, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{p.appointmentDate}</td>
              <td>{p.appointmentTime}</td>
              <td>{p.doctor}</td>
              <td>{p.patient}</td>
              {p.reminder ? <td>Activo</td> : <td>Cancelado</td>}
              {p.status ? <td>Activo</td> : <td>Cancelado</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

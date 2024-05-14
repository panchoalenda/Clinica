import { UserHook } from "../../context/UserContext";

export const FindDoctor = () => {
  const { doctorDni } = UserHook();
  const {
    dni,
    name,
    email,
    address,
    phoneNumber,
    specialty,
    office,
    schedule,
    licenseNumber,
    secretaryId,
  } = doctorDni;


  console.log("Estoy en turnofinddoctor:", doctorDni);

  return (
    <>
      <table className="table table-striped ">
         <thead>
          <tr>
             <th className="text text-center" scope="col">Matrícula</th>
             <th className="text text-center" scope="col">Nombre</th>
             <th className="text text-center" scope="col">dni</th>
             <th className="text text-center" scope="col">email</th>
             <th className="text text-center" scope="col">Teléfono</th>
             <th className="text text-center" scope="col">Dirección</th>
             <th className="text text-center" scope="col">Especialidad</th>
             <th className="text text-center" scope="col">Consultorio</th>
             <th className="text text-center" scope="col">Horario</th>
          </tr>
        </thead>
        <tbody>
          <tr>
             <th className="text text-center" scope="row">{licenseNumber}</th>
             <td className="text text-center">{name}</td>
             <td className="text text-center">{dni}</td>
             <td className="text text-center">{email}</td>
             <td className="text text-center">{phoneNumber}</td>
             <td className="text text-center">{address}</td>
             <td className="text text-center">{specialty}</td>
             <td className="text text-center">{office}</td>
             <td className="text text-center">{schedule}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};


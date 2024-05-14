import { UserHook } from "../../context/UserContext";

export const FindPatient = () => {
  const { patientDni } = UserHook();
  const { dni, name, email, address, phoneNumber, birthDate, emergencyNumber } =
    patientDni;

  return (
    <>
      <table className="table table-striped ">
        <thead>
          <tr>
             <th className="text text-center" scope="col">Nombre</th>
             <th className="text text-center" scope="col">dni</th>
             <th className="text text-center" scope="col">email</th>
             <th className="text text-center" scope="col">Dirección</th>
             <th className="text text-center" scope="col">Teléfono</th>
             <th className="text text-center" scope="col">Fecha de Nac.</th>
             <th className="text text-center" scope="col">Teléfono de Emergencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
             <td className="text text-center">{name}</td>
             <td className="text text-center">{dni}</td>
             <td className="text text-center">{email}</td>
             <td className="text text-center">{address}</td>
             <td className="text text-center">{phoneNumber}</td>
             <td className="text text-center">{birthDate}</td>
             <td className="text text-center">{emergencyNumber}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

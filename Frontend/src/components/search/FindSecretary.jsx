import { UserHook } from "../../context/UserContext";

export const FindSecretary = () => {

  const { secretaryDni } = UserHook();
  const { dni, name, email, address, phoneNumber } =
  secretaryDni;

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
          </tr>
        </thead>
        <tbody>
          <tr>
             <td className="text text-center">{name}</td>
             <td className="text text-center">{dni}</td>
             <td className="text text-center">{email}</td>
             <td className="text text-center">{address}</td>
             <td className="text text-center">{phoneNumber}</td>
          </tr>
        </tbody>
      </table>
    </>)
}

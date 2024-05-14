import { UserHook } from "../../context/UserContext";

export const TurnoFindDoctor = () => {

    const {doctorFindDni} = UserHook();

     return (
  <>
     <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">dni</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">address</th>
                  <th scope="col">phoneNumber</th>
                  <th scope="col">speciality</th>
                  <th scope="col">office</th>
                  <th scope="col">schedule</th>
                  <th scope="col">licenseNumber</th>
                </tr>
              </thead>
              <tbody>
                {/* {doctorFindDni.map((d) => (
                  <tr key={d.id}>
                    <th scope="row">{d.id}</th>
                    <td>{d.id}</td>
                    <td>{d.dni}</td>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.address}</td>
                    <td>{d.phoneNumber}</td>
                    <td>{d.speciality}</td>
                    <td>{d.office}</td>
                    <td>{d.schedule}</td>
                    <td>{d.licenseNumber}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
  </>
   )
}
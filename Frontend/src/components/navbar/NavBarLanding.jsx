import styles from "./NavBarLanding.module.css";

export const NavBarLanding = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={{justifyContent:"flex-start"}}>
          <div>
            <img className={`${styles["imgLogo"]}`} src="./img/logo22.svg" />
          </div>
          <div className={`${styles["company"]}`}>
            <h1>CLINICA MEDICA</h1>
          </div>
        </div>
      </nav>
    </>
  );
};

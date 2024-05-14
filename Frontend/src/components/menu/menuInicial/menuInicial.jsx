import React from "react";
import { Link } from "react-router-dom";
import styles from "./menuInicial.module.css";




export default function Menu(){


    return(
        <div>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    
                </div>
                <div className={styles.Clinks}>
                    <Link to={"/"} className={styles.links}>Inicio</Link>
                    <Link to={"/info"} className={styles.links}>Info</Link>
                    <Link to={"/about"} className={styles.links}>Equipo</Link>
                    <Link to={"/contact"} className={styles.links}>Contacto</Link>
                </div>
            </nav>



        </div>
    )
}

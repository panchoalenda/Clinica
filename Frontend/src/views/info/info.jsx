import styles from "./info.module.css";
import "../../styles/ihover.css";
import "../../styles/ihover.min.css";

import { Navbar } from "../../components/navbar/NavBar.jsx";

export default function Info() {
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div>
            <div className="container">
            <h1 className={`${styles.sombra} text-center`}>TODO EN UN SOLO LUGAR</h1>
          <div className={styles.rowPersonal} >
            <div className={styles.colPersonal} >
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/cardiologia.jpg" alt="cardiologia" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Cardiología</h3>
                    <p className="m-0">Salud cardíaca de primer nivel: En nuestra clínica de cardiología, proporcionamos diagnósticos precisos y tratamientos personalizados para mantener su corazón en óptimas condiciones. Confíe en nuestro equipo dedicado para cuidar de su bienestar cardiovascular.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/dermatología.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Dermatología</h3>
                    <p className="m-0">Descubre una piel saludable: Nuestra clínica dermatológica ofrece tratamientos especializados para afecciones cutáneas y procedimientos estéticos. Confía en nuestro equipo para cuidar y embellecer tu piel.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/endocrinología.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Endocrinología</h3>
                    <p className="m-0">Equilibrio hormonal para una vida plena: En nuestra clínica de endocrinología, ofrecemos diagnósticos precisos y tratamientos especializados para trastornos hormonales. Confíe en nuestro equipo para restablecer su equilibrio hormonal y mejorar su calidad de vida.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/gastroenterología.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Gastroenterología</h3>
                    <p className="m-0">Salud digestiva de calidad: En nuestra clínica de gastroenterología, brindamos diagnósticos avanzados y tratamientos especializados para trastornos gastrointestinales. Confíe en nuestro equipo experto para cuidar de su sistema digestivo y promover su bienestar.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/ginecología.webp" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Ginecología</h3>
                    <p className="m-0">Atención ginecológica compasiva: En nuestra clínica, ofrecemos servicios completos de ginecología, desde exámenes de rutina hasta tratamientos especializados. Confíe en nuestro equipo para cuidar de su salud femenina con comprensión y profesionalismo.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/neurología.jpeg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Neurología</h3>
                    <p className="m-0">Expertos en salud cerebral: En nuestra clínica de neurología, proporcionamos evaluaciones precisas y tratamientos especializados para trastornos neurológicos. Confíe en nuestro equipo para cuidar de su bienestar cerebral y calidad de vida.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/oftalmología.webp" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Oftalmología</h3>
                    <p className="m-0">Visión clara, cuidado especializado: En nuestra clínica oftalmológica, ofrecemos diagnósticos precisos y tratamientos avanzados para mantener la salud visual. Confíe en nuestro equipo para proteger y mejorar su visión con atención experta y compasiva.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/ortopedia.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Ortopedia</h3>
                    <p className="m-0">Salud ósea y movilidad restaurada: En nuestra clínica de ortopedia, ofrecemos diagnósticos precisos y tratamientos especializados para lesiones y afecciones musculoesqueléticas. Confíe en nuestro equipo para ayudarlo a recuperar su movilidad y calidad de vida.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/otorrinolaringología.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Otorrinolaringología</h3>
                    <p className="m-0">Atención integral para su oído, nariz y garganta: En nuestra clínica de otorrinolaringología, ofrecemos diagnósticos precisos y tratamientos especializados para una variedad de problemas auditivos, respiratorios y de garganta. Confíe en nuestro equipo para cuidar de su salud auditiva y respiratoria con experiencia y dedicación.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/pediatria1.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Pediatría</h3>
                    <p className="m-0">Cuidado infantil de confianza: En nuestra clínica pediátrica, brindamos atención especializada y compasiva para los más pequeños. Desde exámenes de salud hasta tratamientos pediátricos, confíe en nuestro equipo para cuidar de la salud y el bienestar de sus hijos.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className="ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/psiquiatría.webp" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Psiquiatría</h3>
                    <p className="m-0">Salud mental en buenas manos: En nuestra clínica de psiquiatría, proporcionamos evaluaciones y tratamientos especializados para trastornos mentales. Confíe en nuestro equipo para ofrecer apoyo compasivo y soluciones efectivas para su bienestar emocional.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className={styles.colPersonal}>
              <div className= "ih-item square colored effect10 left_to_right">
                <a href="#">
                  <div className="img">
                   <img className={styles.imgPersonal} src="/public/img/urología.jpg" alt="img" />
                  </div>
                  <div className="info">
                    <h3 className="mt-2">Urología</h3>
                    <p className="m-0">Atención integral para la salud urológica: En nuestra clínica de urología, ofrecemos diagnósticos precisos y tratamientos especializados para trastornos del tracto urinario y el sistema reproductivo. Confíe en nuestro equipo para brindarle cuidado experto y mejorar su calidad de vida.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <div className="row m-5">
          <div className="col col-3">
            <div className="card">
              <img src="/public/img/login.jpg" className="card-img-top" alt="..." />
              
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-3">
            <div className="card">
              <img src="/public/img/login.jpg" className="card-img-top" alt="..." />
              
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-3">

            <div className="card">
              <img src="/public/img/login.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-3">

            <div className="card">
              <img src="/public/img/login.jpg" className="card-img-top" alt="..." />
              
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          </div>
        </div> */
}

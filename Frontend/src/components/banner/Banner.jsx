
import { Navbar } from '../navbar/NavBar';
import './Banner.css'

export const Banner = () => {

  return (
    <>
      <section className="hero">
        <div className="mascara ">
          <div className="container ">
              <img src="./img/logo2.svg" alt="" />
              <Navbar />
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner;

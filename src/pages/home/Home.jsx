import React from 'react'
import "./home.scss";
import {Link} from 'react-router-dom'
import heroImg from '../../assets/inv-img.png'
import {RiProductHuntLine} from 'react-icons/ri'
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLinks';

const Home = () => {
  return (
    <div className='home'>
        <nav className='container --flex-between'>
            <div className="logo"><RiProductHuntLine size={35}/></div>
            <ul className="home-links">
                <ShowOnLogout>
                <li><Link to='/register'>Register</Link></li>
                </ShowOnLogout>
                <ShowOnLogout>
                <li>
                <button className="--btn --btn-primary">
                    <Link to='/login'>Login</Link>
                    </button>
              </li>
                </ShowOnLogout>
                <ShowOnLogin>
                <li>
                <button className="--btn --btn-primary">
                    <Link to='/dashboard'>Dashboard</Link>
                    </button>
              </li>
                </ShowOnLogin>
            </ul>
        </nav>
        <section className="container hero">
            <div className="hero-text">
                <h2>Inventory & Stock Managment Solutions</h2>
                <p>Inventory system to control and managa products 
                    in the warehouse in real time and integrated to make
                    it easier to develop your bussiness
                </p>
             <div className="hero-buttons">
                <button className='--btn --btn-secondary'>Free Trial 1 Month</button>
             </div>
             <div className="--flex-start">
                <NumberText num="14K" text="Brand Owners"/>
                <NumberText num="23K" text="Active Users"/>
                <NumberText num="500+" text="Partners"/>
             </div>
            </div>
            <div className="hero-image">
                <img src={heroImg} alt="Inventory" />
            </div>
        </section>
    </div>
  )
}

const NumberText = ({num,text})=> {
return(
    <div className="--mr">
        <h3 className='--color-white'>{num}</h3>
        <p className='--color-white'>{text}</p>
    </div>
)
}

export default Home
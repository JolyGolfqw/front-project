import React from "react";
import logo from "../../images/logo.png";
import location from '../../images/город.png'
import styles from './header.module.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function Headers() {
  const token = useSelector((state:RootState) => state.application.token)
  console.log(token);
  
  return (
    <div className={styles.rod}>
      <div className={styles.img}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.category}>
        <Link to='office'>ЛИЧНЫЙ КАБИНЕТ</Link>
        <Link to='/about' >О НАС</Link>
        <Link to='/news'>НОВОСТИ И АКЦИИ</Link>
        <Link to='/contacts'>КОНТАКТЫ</Link>
        <Link to='/blog' >БЛОГ</Link>
      </div>
      <div className={styles.location}>
        <img src={location} alt="" />
      </div>
    </div>
  );
}

export default Headers;

import React from "react";
import appstore from "../../images/Group 5 Copy.png";
import google from "../../images/google-play-badge copy.png";
import styles from "./index.module.css";
import subtract from "../../images/Subtract.png";

const Footer = () => {
  return (
    <>
      <div className={styles.rod}>
        <div className={styles.rod1}>
          <div className={styles.logo}>
            <div className={styles.logotip}>
              <img src={subtract} alt="" />
            </div>
            <div className={styles.text}>
              <h2>Айболит</h2>
              <p>ветеринарная клиника</p>
            </div>
          </div>
          <div className={styles.img}>
            <img src={appstore} alt="" />
            <img src={google} alt="" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.discription}>
            <p>
              Политика конфиденциальности в отношении обработки персональных
              данных
            </p>
            <p>
              <a href="">Главная</a> <a href="">Услуги и цены</a>{" "}
              <a href="">История компании</a> <a href="">Наши специалисты</a>{" "}
              <a href="">Вакансии</a>
              <a href="">Реквизиты</a> <a href="">Онлайн-оплата</a>
            </p>
            <p>
              <a href="">Отзывы </a> <a href="">Контакты </a>{" "}
              <a href="">Груминг-салон</a> <a href="">Косметика</a>{" "}
              <a href="">Новости и акции</a> <a href="">Блог</a>
            </p>
          </div>
          <div className={styles.text2}>
            <p>aibolit34.ru aibolit34@gmail.com</p>
            <p>Made with from UnitBean</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

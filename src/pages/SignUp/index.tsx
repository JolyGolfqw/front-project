import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, setSignUp } from "../../features/applicationSlice";
import { AppDispatch, RootState } from "../../app/store";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { signingUp, error } = useSelector(
    (state: RootState) => state.application
  );
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    dispatch(authSignUp({ name, subName, email, password }));
  };
  useEffect(() => {
    if (signingUp) {
      navigate("/sign-in");
      dispatch(setSignUp(false));
    }
  }, [signingUp]);

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.inputDiv}>
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error &&
          error.map((item) =>
            item.path === "name" ? (
              <span key={item.path} className={styles.errorMsg}>
                {item.msg}
              </span>
            ) : (
              ""
            )
          )}
      </div>
      <div>
        <div className={styles.inputDiv}>
          <label htmlFor="subName">Фамилия:</label>
          <input
            id="subName"
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
          />
        </div>
        {error &&
          error.map((item) =>
            item.path === "subName" ? (
              <span key={item.path} className={styles.errorMsg}>
                {item.msg}
              </span>
            ) : (
              ""
            )
          )}
      </div>
      <div>
        <div className={styles.inputDiv}>
          <label htmlFor="email">Почта:</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error &&
          error.map((item) =>
            item.path === "login" || item.error ? (
              <span key={item.path} className={styles.errorMsg}>
                {item.msg || item.error}
              </span>
            ) : (
              ""
            )
          )}
      </div>
      <div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error &&
          error.map((item) =>
            item.path === "password" ? (
              <span key={item.path} className={styles.errorMsg}>
                {item.msg}
              </span>
            ) : (
              ""
            )
          )}
      </div>
      <button className={styles.regButton} onClick={handleSignUp}>
        Зарегистрироваться
      </button>
    </div>
  );
};

export default SignUp;

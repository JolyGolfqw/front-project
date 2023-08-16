import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../../features/applicationSlice";
import { AppDispatch, RootState } from "../../app/store";
import styles from "./signIn.module.css";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.application.error);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    dispatch(authSignIn({ login, password }));
  };

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.inputDiv}>
          <label htmlFor="login">Логин:</label>
          <input
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        {error &&
          error.map((item) =>
            item.path === "login" ? (
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
      <button onClick={handleSignIn}>Войти</button>
    </div>
  );
};

export default SignIn;

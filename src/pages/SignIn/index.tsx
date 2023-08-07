import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignIn } from "../../features/applicationSlice";
import { AppDispatch } from "../../app/store";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    dispatch(authSignIn({ login, password }));
  };

  return (
    <div>
      <label htmlFor="login">Логин:</label>
      <input
        id="login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <label htmlFor="password">Пароль:</label>
      <input
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Войти</button>
    </div>
  );
};

export default SignIn;

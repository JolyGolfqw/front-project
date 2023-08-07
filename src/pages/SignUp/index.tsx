import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../features/applicationSlice";
import { AppDispatch } from "../../app/store";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = () => {
    dispatch(authSignUp({ name, subName, login, password, phone }));
  };

  return (
    <div>
      <label htmlFor="name">Имя:</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="subName">Фамилия:</label>
      <input
        id="subName"
        value={subName}
        onChange={(e) => setSubName(e.target.value)}
      />

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

      <label htmlFor="phone">Номер:</label>
      <input
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handleSignUp}>Зарегистрироваться</button>
    </div>
  );
};

export default SignUp;

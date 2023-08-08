import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { io } from "socket.io-client";
import { setUsersOnline } from "./features/userSlice";
function App() {
  const token = useSelector((state: RootState) => state.application.token);
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: RootState) => state.application.id);
  const [socket, setSocket] = useState(null);
  const online = useSelector((state: RootState) => state.user.onlineUsers);
  console.log(online);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (socket === null) return;
    if (id === null) return;
    socket.emit("addNewUser", id);
    socket.on("getOnlineUsers", (res) => {
      dispatch(setUsersOnline(res));
    });
  }, [socket]);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          {token ? (
            <>
              <Route path="/sign-up" element={<Navigate to={"/"} />} />
              <Route path="/sign-in" element={<Navigate to={"/"} />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          ) : (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/chat" element={<Navigate to={"/"} />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;

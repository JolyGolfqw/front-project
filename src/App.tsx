import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Footer from "./Components/Footer";

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  return (
    <>
      <Header />
      <Container>
        <Routes>
          {token ? (
            <>
              <Route path="/sign-up" element={<Navigate to={"/"} />} />
              <Route path="/sign-in" element={<Navigate to={"/"} />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          ) : (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          )}
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

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
import Headers from "./Components/Header/Headers";
import Footer from "./Components/Footer";
import About from "./Components/Personal/About";
import Office from "./Components/Personal/Office";
import News from "./Components/Personal/News";
import Contacts from "./Components/Personal/Contacts";
import Blog from "./Components/Personal/Blog";

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  return (
    <>
      <Header />
      <Headers />
      <Container>
        <Routes>
          {token ? (
            <>
              <Route path="/sign-up" element={<Navigate to={"/"} />} />
              <Route path="/sign-in" element={<Navigate to={"/"} />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
              <Route path="/office" element={<Office />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/blog" element={<Blog />} />
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
      <Footer />
    </>
  );
}

export default App;

import React from "react";
import Chat from "../Chat";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Home = () => {
  const token = useSelector((state:RootState) => state.application.token)
  return (
    <div>
      {token && <Chat />}
    </div>
  );
};

export default Home;

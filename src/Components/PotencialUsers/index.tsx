import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { createChat } from "../../features/chatSlice";

const PotencialUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const userId = useSelector((state: RootState) => state.application.id);
  const handleCreateChat = (firstId, secondId) => {
    dispatch(createChat({ firstId, secondId }));
  };

  return (
    <div className="d-flex">
      {users.map((item) => (
        <div
          key={item._id}
          className="m-2"
          role="button"
          onClick={() => handleCreateChat(userId, item._id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default PotencialUsers;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getUser } from "../../features/userSlice";
import { Stack } from "react-bootstrap";
import "../../index.css";
const UserChat = ({ chat, user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const recipient = useSelector((state: RootState) => state.user.recipient);
  const recipientId = chat.members.find((item) => item !== user.id);

  useEffect(() => {
    dispatch(getUser(recipientId));
  }, []);

  console.log(recipient);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center m-4 p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">A</div>
        <div className="text-content">
          <div className="name text-black">{recipient?.name}</div>
          <div className="text">Text</div>
        </div>
      </div>
      <div className="d-flex fkex-column align-items-end">
        <div className="date">11/11/1111</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;

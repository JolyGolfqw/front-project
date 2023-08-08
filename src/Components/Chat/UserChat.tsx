import React from "react";
import { Stack } from "react-bootstrap";
import "../../index.css";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
  const recipient = useFetchRecipientUser(chat, user);

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

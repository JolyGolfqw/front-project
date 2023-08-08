import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getChat, getMessages, setCurrentChat } from "../../features/chatSlice";

import { Container, Stack } from "react-bootstrap";
import UserChat from "../../Components/Chat/UserChat";
import { getUsers } from "../../features/userSlice";
import PotencialUsers from "../../Components/PotencialUsers";
import ChatBox from "../../Components/Chat/ChatBox";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userChats, currentChat } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, login, token } = useSelector(
    (state: RootState) => state.application
  );

  useEffect(() => {
    dispatch(getChat(id));
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getMessages(currentChat._id));
  }, [currentChat]);

  return (
    <Container>
      <PotencialUsers />
      {!userChats ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="message-box flex-grow-0 pe-3">
            {userChats.map((item, index) => (
              <div onClick={() => dispatch(setCurrentChat(item))} key={index}>
                <UserChat chat={item} user={{ id, login, token }} />
              </div>
            ))}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;

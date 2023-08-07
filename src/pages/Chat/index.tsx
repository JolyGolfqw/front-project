import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getChat } from "../../features/chatSlice";

import { Container, Stack } from "react-bootstrap";
import UserChat from "../../Components/Chat/UserChat";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userChats, loading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, login, token } = useSelector(
    (state: RootState) => state.application
  );

  useEffect(() => {
    dispatch(getChat(id));
    dispatch()
  }, []);

  console.log(userChats);

  return (
    <Container>
      {!userChats ? null : (
        <Stack>
          {userChats.map((item, index) => (
            <div key={index}>
              <UserChat chat={item} user={{ id, login, token }} />
            </div>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Chat;

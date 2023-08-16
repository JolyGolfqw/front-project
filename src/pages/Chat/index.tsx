import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  getChat,
  getMessages,
  setCurrentChat,
  setNewMessage,
} from "../../features/chatSlice";

import { Container, Stack } from "react-bootstrap";
import UserChat from "../../Components/Chat/UserChat";
import { getUser, getUsers, setUsersOnline } from "../../features/userSlice";

import PotencialUsers from "../../Components/PotencialUsers";
import ChatBox from "../../Components/Chat/ChatBox";
import { io } from "socket.io-client";
import styles from './Chat.module.css'
import Sidebar from "../../Components/Sidebar";
import Profile from "../../Components/Profile";

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userChats, currentChat, newMessage } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, login, token } = useSelector(
    (state: RootState) => state.application
  );
  const user = useSelector((state) => state.user.user);

  const [socket, setSocket] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getChat(id));
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getMessages(currentChat._id));
  }, [currentChat]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (socket === null) return;
    if (id === null) return;

    socket.emit("authenticate", id);
    socket.on("privateMessage", ({ message }) => {
      dispatch(setNewMessage(message));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    if (id === null) return;

    const recipientId = currentChat.members
      ? currentChat.members.find((item) => item !== id)
      : null;

    if (recipientId === null) return;

    if (newMessage) {
      socket.emit("sendPrivateMessage", {
        senderId: id,
        recipientId,
        message: newMessage,
      });
    }
  }, [newMessage]);

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  if(!user) {
    return ''
  }

  return (
    <Container>
      <PotencialUsers />
      <Sidebar show={show} handleClose={handleClose} title={'Профиль'} children={<Profile/>}/>
      <div onClick={handleShow} className={styles.user_avatar}><img className={styles.user_avatar_img} src={`http://localhost:4000/${user?.avatar}`} alt="cat" /></div>
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

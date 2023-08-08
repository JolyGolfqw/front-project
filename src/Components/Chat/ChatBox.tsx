import React, { useState } from "react";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import { sendMessage } from "../../features/chatSlice";

const ChatBox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentChat, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const { id, login, token } = useSelector(
    (state: RootState) => state.application
  );
  const [messageText, setTextMessage] = useState("");
  const recipient = useFetchRecipientUser(currentChat, {
    id,
    login,
    token,
  });
  if (!recipient) return <div>HUOOSHHOOOON</div>;
  const handleSendMessage = (chatId, senderId, text) => {
    if (!text) return;
    dispatch(sendMessage({ chatId, senderId, text }));
    setTextMessage("")
  };
  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <span>{recipient?.login}</span>
      </div>
      <Stack gap={4} className="messages">
        {messages &&
          messages.map((item, index) => (
            <Stack
              key={index}
              className={`${
                item.senderId === id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{item.text}</span>
              <span className="message-footer">
                {moment(item.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <input
          value={messageText}
          onChange={(e) => setTextMessage(e.target.value)}
        />
        <button
          onClick={() => handleSendMessage(currentChat._id, id, messageText)}
        >
          Отправить
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;

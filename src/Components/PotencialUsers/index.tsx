import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { createChat } from "../../features/chatSlice";
import styles from "./PotencialUsers.module.css";

const PotencialUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const userId = useSelector((state: RootState) => state.application.id);

  const [popUp, setPopUp] = useState(false);
  const [value, setValue] = useState("");

  const handleCreateChat = (firstId, secondId) => {
    dispatch(createChat({ firstId, secondId }));
  };

  const handleChangeInput = (text) => {
    if (text === " ") return;

    if (text.length < 1) {
      setPopUp(false);
      setValue(text);
      return;
    }
    setPopUp(true);
    setValue(text);
  };

  const newUsers = users.filter(
    (item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) &
      (item._id !== userId)
  );

  return (
    <div className={styles.main}>
      <div className={styles.inputBlock}>
        <label htmlFor="findUser">Поиск друзей:</label>
        <input
          type="text"
          id="findUser"
          value={value}
          onChange={(e) => handleChangeInput(e.target.value)}
        />
        {popUp && (
          <div className={styles.popUp}>
            {newUsers.length !== 0 ? (
              newUsers.map((item) => (
                <div key={item._id} className={styles.user} role="button">
                  <div>{item.name}</div>
                  <div onClick={() => handleCreateChat(userId, item._id)}>
                    написать
                  </div>
                  <div>добавить в друзья</div>
                </div>
              ))
            ) : (
              <span>Пользователь не найден</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PotencialUsers;

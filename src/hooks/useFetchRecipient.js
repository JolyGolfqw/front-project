import { useEffect, useState } from "react";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const recipientId = chat.members
    ? chat.members.find((item) => item !== user.id)
    : null;

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const res = await fetch(
        `http://localhost:4000/find-user/${recipientId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await res.json();
      setRecipientUser(json);
    };
    getUser();
  }, [recipientId]);
  return recipientUser;
};

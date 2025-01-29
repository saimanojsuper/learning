import React, { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      console.log("new user", data);
      setActiveUsers(data);
    });
  }, [socket, activeUsers]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {activeUsers.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;

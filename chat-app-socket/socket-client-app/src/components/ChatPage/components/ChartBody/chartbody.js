import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages, socket }) => {
  const navigate = useNavigate();
  const [typingUsers, setTypingUsers] = useState([]);
  const lastMessageRef = useRef(null);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    socket.disconnect();
    window.location.reload();
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingUsers", (data) => {
      console.log("new typing user", data);
      setTypingUsers(data);
    });
  }, [socket, typingUsers]);

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message, index) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          {typingUsers.map((user) => (
            <p key={user.socketID}> {user.userName} is typing...</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatBody;

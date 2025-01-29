import React, { useEffect, useState } from "react";
import ChatBar from "./components/ChartBar/chartbar";
import ChatBody from "./components/ChartBody/chartbody";
import ChatFooter from "./components/ChartFooter/chartfooter";
import "./chatpage.css";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("message sent");

    const setResponse = (data) => {
      console.log("data", data, "messages", messages);
      setMessages((prev) => [...prev, data]);
    };
    socket.on("messageResponse", setResponse);

    return () => {
      socket.off("messageResponse", setResponse);
    };
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} socket={socket} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;

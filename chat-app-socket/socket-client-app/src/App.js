import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import socketIO from "socket.io-client";
import Home from "./components/Home/home";
import ChatPage from "./components/ChatPage/chatpage";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

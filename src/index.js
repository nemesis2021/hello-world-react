import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('https://hello-world-react-tvnd8.kinsta.app/');

    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data); // Assuming messages are JSON-formatted
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket connection closed.');
    };

    return () => ws.close(); // Cleanup function to close the WebSocket on component unmount
  }, []);

  return (
    <div>
      {isConnected ? (
        <div>
          <h2>Connected to WebSocket</h2>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>{message.content}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Connecting to WebSocket...</div>
      )}
    </div>
  );
}

export default TodoApp;

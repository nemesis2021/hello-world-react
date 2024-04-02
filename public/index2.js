import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://https://deployed-todo-app-fork-kpn5t.kinsta.app/ws');

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

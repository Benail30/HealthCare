import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios'; 
import '../css/UserList.css'; 
import DataUsers from '../dataUsers.json';
import Footer from './footer/Footer';
import Navbar from './Navbar';
import DefaultSidebar from './SideBarr';
const ENDPOINT = 'http://localhost:3000';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(ENDPOINT);
    setSocket(socket);
    axios.get('http://localhost:3000/api/messages')
    .then(response => {
      setMessages(response.data);
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
    socket.on('new_message', receiveMessage);
    socket.on('new_message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  const receiveMessage = (data) => {
    setMessages(prevMessages => [...prevMessages, data]);
  };
  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: messageInput,
      timestamp: new Date().toLocaleString(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageInput('');
    axios.post('http://localhost:3000/api/messages', newMessage)
    .then(response => {
      console.log('Message saved successfully:', response.data);
    })
    .catch(error => {
      console.error('Error saving message:', error);
    });
    if (socket) {
      socket.emit('send_message', newMessage);
    }
  };

  return (
    <div>
    <Navbar />
    {/* <DefaultSidebar /> */}
    <div className="chat-container">
      <div className="sidebar">
        {/* Sidebar content */}
      </div>
      <div className="chat-area">
        <div className="message-history">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
              <div className="message-info">
                <span className="d" >{message.sender}</span>
                <span className="timestamp">{message.timestamp}</span>
              </div>
              <p className="e" style={{color:'Black', textAlign:'center',fontSize:'16px'}}>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="message-input-area">
          <input type="text" placeholder="Type a message..." value={messageInput} onChange={handleMessageChange} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
}

export default Chat;

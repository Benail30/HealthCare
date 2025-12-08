'use client'


import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import styles from "../styles/Chat.module.css";
import { useAppDispatch } from "../lib/hooks";
import { fetchCurrentUser } from '../lib/CurrentUserSlice';
import Navbar from '../components/Navbar';
import { Message } from '../types/types'; 

const SOCKET_ENDPOINT = 'http://localhost:3001';
const API_ENDPOINT = 'http://localhost:3002';

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [userId, setUserId] = useState<number | null>(null); 
  const [rooms, setRooms] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const socket = io(SOCKET_ENDPOINT); 
    setSocket(socket);
    
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
    
        const response = await axios.get(`${API_ENDPOINT}/api/auth/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        dispatch(fetchCurrentUser(response.data.token));
        
        setUserId(response.data.userId);
    
        const roomsResponse = await axios.get(`${API_ENDPOINT}/api/chat/1`);
        setRooms(roomsResponse.data); 
        console.log("Rooms fetched:", roomsResponse.data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    socket.on('receive_message', receiveMessage);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [dispatch]);

  const receiveMessage = (data: Message) => {
    setMessages(prevMessages => [...prevMessages, data]);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    const newMessage: Message = {
      content: messageInput,
      roomId: 1, // Modify this as needed
      timestamp: new Date().toLocaleString(), 
    };

    axios.post(`${API_ENDPOINT}/api/chat/createmsg`,{
      roomId: 3, 
      userId: userId, 
      content: newMessage.content,
    })
      .then(response => {
        console.log('Message saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving message:', error);
      });

    if (socket) {
      socket.emit('send_message', newMessage);
    }

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageInput('');
  };

  return (
    <div>
      <Navbar />
      <div className={styles.ccontainer}>
        <div className={styles.carea}>
          <div className={styles.rooms}>
            {rooms && rooms.length > 0 ? (
              rooms.map(room => (
                <div key={room.id} className={styles.room}>
                  <h3>User: {room.user?.firstName} {room.user?.lastName}</h3>
                  <div className={styles.messages}>
                    {room.messages && room.messages.length > 0 ? (
                      room.messages.map((message: Message) => (
                        <div key={message.id} className={styles.message}>
                          <p>Content: {message.content}</p>
                          <p>Sender: {message.user?.firstName} {message.user?.lastName}</p>
                        </div>
                      ))
                    ) : (
                      <p>No messages available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No rooms available</p>
            )}
          </div>

          <div className={styles.mhistory}>
            {messages && messages.map((message, index) => (
              <div key={index} className={`message ${message}`}>
                <div className={styles.minfo}>
                  <span className={styles.sender}>{message?.user?.firstName}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <p className="content">{message.content}</p>
              </div>
            ))}
          </div>
          <div className="message-input-area">
            <input type="text" placeholder="Type a message..." value={messageInput} onChange={handleMessageChange} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

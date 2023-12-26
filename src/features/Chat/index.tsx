import React, { useState, useRef, useEffect } from 'react';
import './index.scss'; // Import your SCSS file
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';

interface Message {
  id: number;
  user: {
    user_name: string;
    user_avatar: string;
  };
  message: string;
  created_at: string;
  // Add any other properties present in your actual message object
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [userName, setUserName] = useState<any>();
  

  useEffect(() => {
    const data = new FormData();
    const tokenUser = localStorage.getItem('tokenUser');

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://huionline.vn/api/auth/profile',
        headers: {
            'Authorization': `Bearer ${tokenUser}`,
        },
        data: data
    };

    axios.request(config)
        .then((response: { data: any; }) => {
            localStorage.setItem('responseUser', JSON.stringify(response.data.data.id));
            
            setUserName(response.data.data.name);
        })
        .catch((error: any) => {
            console.log(error);
        });
}, []);

  const currentUser = { user_name: userName, user_avatar: userName };

  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get('roomId') || '';

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`https://huionline.vn/api/message/room/${roomId}`);
      const { data } = response.data;
      console.log(data);
      
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: currentUser,
        message: inputMessage,
        created_at: new Date().toLocaleString(),
      };

      try {
        // Send the message to the API
        await apiDSendMessage(newMessage);

        // Update the local state with the new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  
  const storedResponseUser  = localStorage.getItem('responseUser') || '';
  const responseUser = storedResponseUser.slice(1, -1);
  
  const apiDSendMessage = async (newMessage: Message) => {
    const data = new FormData();
    data.append('room_id', roomId);
    data.append('user_id', responseUser);
    data.append('message', newMessage.message);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://huionline.vn/api/message/postMess',
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      throw new Error('Failed to send message');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatPageStyled>
      {/* ... Your styled components and HTML structure */}
      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 && (
            <div className="no-messages">Bạn chưa có tin nhắn nào.</div>
          )}
          <div className='title-chat'>
            <h1>Phòng Chat: {roomId}</h1>
          </div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.user.user_name === currentUser.user_name ? 'sent-by-me' : 'received'}`}
            >
              {msg.user.user_name !== currentUser.user_name && (
                <div className="avatar">
                  <img src={msg.user.user_avatar} alt={msg.user.user_name} />
                </div>
              )}
              <div className="message-info">
                {msg.user.user_name !== currentUser.user_name && (
                  <div className="user-name">{msg.user.user_name}</div>
                )}
                <div className="text">{msg.message}</div>
                {/* <div className="timestamp">{new Date(msg.created_at).toLocaleString()}</div> */}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập một tin nhắn..."
          />
          <button onClick={sendMessage}>
            <SendOutlined />
          </button>
        </div>
      </div>
    </ChatPageStyled>
  );
};

export default ChatPage;

const ChatPageStyled = styled.div`
position: relative;

.avatar {
  img {
    max-width: 40px;
    max-height: 40px;
  }
}
.title-chat {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  position: fixed;
  right: 0;
  left: 0;
  h1 {
    font-size: 56px;
    font-weight: 700;
  }
}
input {
  font-size: 16px;
  padding: 0 24px;
  &:focus-visible {
    border: 1px solid transparent;
  }
}
button {
  transition: all 0.3s ease;
    &:hover {
        color: black !important;
        border-color: #FFF0E2 !important;
        background-color: #FFF0E2;
        opacity: 0.5;
    }
}
`;
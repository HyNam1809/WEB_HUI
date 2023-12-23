import React, { useState, useRef, useEffect } from 'react';
import './index.scss'; // Import your SCSS file
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';

const ChatPage = () => {
  const currentUser = { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }; // Thay đổi thông tin người dùng hiện tại tại đây
  const [messages, setMessages] = useState([
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Chào Con chó review!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Chào lại con người!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
    { user: { name: 'Con người', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56eYhIKXNoVJBAFLf3NUdmloipjj6YYbCOQ&usqp=CAU' }, text: 'Hello!', timestamp: new Date() },
    { user: { name: 'Con chó', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6xo3BnpcGjxt40VQDiB-DdRM_3DtP4n1_FQ&usqp=CAU' }, text: 'Hi there!', timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const search = useLocation().search;
  const roomId = new URLSearchParams(search).get('roomId') || '';

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        user: currentUser,
        text: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatPageStyled>
      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 && (
            <div className="no-messages">Bạn chưa có tin nhắn nào.</div>
          )}
          <div className='title-chat'>
            <h1>Phòng Chat: {roomId}</h1>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.user.name === currentUser.name ? 'sent-by-me' : 'received'}`}
            >
              {msg.user.name !== currentUser.name && (
                <div className="avatar">
                  <img src={msg.user.avatar} alt={msg.user.name} />
                </div>
              )}
              <div className="message-info">
                {msg.user.name !== currentUser.name && (
                  <div className="user-name">{msg.user.name}</div>
                )}
                <div className="text">{msg.text}</div>
                <div className="timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
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
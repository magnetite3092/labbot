import React from 'react';
import './Message.css';

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`message ${isUser ? 'user-message' : 'ai-message'}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;

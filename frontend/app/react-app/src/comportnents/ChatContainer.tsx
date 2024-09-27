import React from 'react';
import Message from './Message';

interface ChatContainerProps {
  messages: { text: string; isUser: boolean }[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} isUser={msg.isUser} />
      ))}
    </div>
  );
};

export default ChatContainer;

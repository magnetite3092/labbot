import React from 'react';
import './ChatContainer.css'; // 新しいスタイルシートを追加

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatContainerProps {
  messages: Message[];
  highlightedIndices: number[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, highlightedIndices }) => {
  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
          <div className="message-text">{msg.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;










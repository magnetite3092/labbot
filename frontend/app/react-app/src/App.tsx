// App.tsx
import React, { useState } from 'react';
import ChatContainer from './comportnents/ChatContainer';
import ChatInput from './comportnents/ChatInput';
//import UrlInput from './comportnents/UrlInput';
import './App.css';
import WavInput from './comportnents/WavInput';
const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleMessageSend = (text: string, isUser: boolean) => {
    setMessages(prevMessages => [...prevMessages, { text, isUser }]);
  };

  return (
    <div className="App">
      <h2>対話型アプリ</h2>
      <ChatContainer messages={messages} />
      <ChatInput onMessageSend={handleMessageSend} />
      
      <WavInput></WavInput>
    </div>
  );
};

export default App;

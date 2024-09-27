import React, { useState } from 'react';
import axios from 'axios';
import './ChatInput.css';

interface ChatInputProps {
  onMessageSend: (text: string, isUser: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onMessageSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onMessageSend(inputValue, true); // ユーザーのメッセージを送信

      try {
        const response = await axios.post('http://localhost:8001', {
          message: inputValue,
        });
        // レスポンスからテキストを取り出す
        const responseText = response.data.response || response.data; // 必要に応じて修正
        onMessageSend(responseText, false); // AIからのメッセージを送信
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }

      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="メッセージを入力..."
        className="chat-input"
      />
      <button type="submit" className="send-button">
        送信
      </button>
    </form>
  );
};

export default ChatInput;

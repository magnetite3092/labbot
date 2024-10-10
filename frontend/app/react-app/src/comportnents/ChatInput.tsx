import React, { useState } from 'react';
import axios from 'axios';
import './ChatInput.css';
import './FormStyle.css';

interface ChatInputProps {
  onMessageSend: (text: string, isUser: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onMessageSend }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onMessageSend(inputValue, true);
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.post('http://localhost:8001/message/', {
          message: inputValue
        });

        const responseText = response.data.response || response.data; // 必要に応じて修正
        onMessageSend(responseText, false);
      } catch (error) {
        console.error("エラーが発生しました:", error);
        
        // エラーハンドリングを強化
        if (axios.isAxiosError(error)) {
          // エラーがAxiosによるものである場合
          if (error.response && error.response.data) {
            // エラーメッセージを適切に取得
            const message = error.response.data.message || "メッセージの送信に失敗しました。";
            setErrorMessage(typeof message === 'string' ? message : JSON.stringify(message)); // 文字列に変換
          } else {
            setErrorMessage("メッセージの送信に失敗しました。");
          }
        } else {
          setErrorMessage("予期しないエラーが発生しました。");
        }
      } finally {
        setIsLoading(false);
      }

      setInputValue("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="メッセージを入力..."
          className="form-input"
          disabled={isLoading}
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? '送信中...' : '送信'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* エラーメッセージ */}
    </div>
  );
};

export default ChatInput;















import React, { useState } from 'react';
import axios from 'axios';
import './UrlInput.css'; 
import './FormStyle.css';

interface UrlInputProps {
  onUrlSend: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onUrlSend }) => {
  const [urlValue, setUrlValue] = useState("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (urlValue.trim()) {
      onUrlSend(urlValue); 

      try {
        await axios.post('http://localhost:8001/knowledge/', {
          url: urlValue,
        });
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }

      setUrlValue(""); // 入力フィールドをクリア
    }
  };

  return (
    <div className="knowledge-container">
      <h3 className="knowledge-title">チャットボットに知識を与える！！</h3>
      <form onSubmit={handleUrlSubmit} className="url-input-form">
        <input
          type="text"
          value={urlValue}
          onChange={handleUrlChange}
          placeholder="学習させたいURLを入力..."
          className="form-input url-input"
        />
        <button type="submit" className="submit-button knowledge-submit">
          知識を送信
        </button>
      </form>
    </div>
  );
};

export default UrlInput;











import React, { useState, useRef } from 'react';
import ChatContainer from './comportnents/ChatContainer';
import ChatInput from './comportnents/ChatInput';
import UrlInput from './comportnents/UrlInput';
import './App.css';
import WavInput from './comportnents/WavInput';
import ImageUpload from './comportnents/ImageUpload';
import RobotImage from './comportnents/RobotImage';
import RobotScene from './comportnents/RobotScene';

const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isLearning, setIsLearning] = useState(false); // 勉強中の状態を管理
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  // 経験値とレベルアップのロジック
  const addExperience = (amount: number) => {
    setExperience(prev => {
      const newExperience = prev + amount;
      if (newExperience >= 5) { // レベルアップの条件
        setLevel(prev => prev + 1);
        return 0; // 経験値をリセット
      }
      return newExperience;
    });
  };

  const handleMessageSend = (text: string, isUser: boolean) => {
    setMessages(prevMessages => [...prevMessages, { text, isUser }]);
  };

  const handleHighlight = (indices: number[]) => {
    setHighlightedIndices(indices);
  };

  const handleUrlSend = (url: string) => {
    console.log("送信されたURL:", url);
    addExperience(2); // URL送信時に経験値を追加
    setIsLearning(true); // 勉強中の状態にする
    setTimeout(() => setIsLearning(false), 2000); // 2秒後に勉強完了にする
  };

  const handleImageUpload = () => {
    addExperience(3); // 画像アップロード時に経験値を追加
    setIsLearning(true); // 勉強中の状態にする
    setTimeout(() => setIsLearning(false), 2000); // 2秒後に勉強完了にする
  };

  return (
    <div className="container">
      <h2>対話型アプリ</h2>
      <h1>ロボット育成画面</h1>
      <RobotScene />
      <ChatContainer messages={messages} highlightedIndices={highlightedIndices} />
      <ChatInput onMessageSend={handleMessageSend} />
      
      {/* URL入力エリア */}
      <div className="knowledge-section">
        <h3>チャットボットに知識を与える</h3>
        <UrlInput onUrlSend={handleUrlSend} />
        <ImageUpload onUpload={handleImageUpload} setIsLearning={setIsLearning} />

      </div>

      <RobotImage isLearning={isLearning} level={level} experience={experience} />
      <div style={{ height: 20 }} />
      <button onClick={() => {}}>キャンセル</button>
    </div>
  );
};

export default App;

// src/RobotDisplay.tsx
import React from 'react';
import './RobotDisplay.css'; // スタイルシートを追加

interface RobotDisplayProps {
  isLearning: boolean; // 勉強中かどうかの状態
}

const RobotDisplay: React.FC<RobotDisplayProps> = ({ isLearning }) => {
  return (
    <div className="robot-image-container">
      <img src="./robotImage/robotStudy.jpg" alt="Robot" className="robot-image" />
      {isLearning && <p className="learning-message">ロボットが勉強中...</p>}
    </div>
  );
};

export default RobotDisplay;

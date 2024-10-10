import React from 'react';
import './RobotImage.css';

interface RobotImageProps {
  isLearning: boolean;
  level: number;
  experience: number;
}

const RobotImage: React.FC<RobotImageProps> = ({ isLearning, level, experience }) => {
  const experiencePercentage = (experience / 5) * 100; // 最大経験値に応じた割合

  return (
    <div className="robot-image-container">
      <div className="status-bar">
        <div className="experience-fill" style={{ width: `${experiencePercentage}%` }}></div>
      </div>
      <img 
        src="./robotImage/robot.jpg"
        alt="ロボット"
        className={`robot-image ${isLearning ? 'learning' : ''}`}
      />
      <div className="level-display">レベル: {level}</div>
      {isLearning && <p>ロボットが勉強中です...</p>}
    </div>
  );
};

export default RobotImage;








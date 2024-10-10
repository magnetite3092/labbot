import React from 'react';
import './Cracker.css';

interface CrackerProps {
  isVisible: boolean;
}

const Cracker: React.FC<CrackerProps> = ({ isVisible }) => {
  return (
    <div className={`cracker-container ${isVisible ? 'visible' : ''}`}>
      <div className="cracker">🎉</div> {/* クラッカーの表現 */}
    </div>
  );
};

export default Cracker;


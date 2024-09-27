import React from 'react';

interface ResponseDisplayProps {
  responseData: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ responseData }) => {
  return (
    <div className="response-display">
      {responseData ? (
        <p>サーバーからのレスポンス: {responseData}</p>
      ) : (
        <p>まだレスポンスはありません。</p>
      )}
    </div>
  );
};

export default ResponseDisplay;

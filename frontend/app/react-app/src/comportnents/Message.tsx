import React from 'react';

interface MessageProps {
  text: string;
  isUser: boolean;
  isHighlighted: boolean;
  id: string;
}

const Message: React.FC<MessageProps> = ({ text, isUser, isHighlighted, id }) => {
  return (
    <div
      id={id}
      style={{
        backgroundColor: isUser ? '#e0f7fa' : '#f1f1f1', // ユーザーのメッセージとボットのメッセージの背景色を変更
        color: isUser ? '#000' : '#555',
        border: isHighlighted ? '2px solid #2196F3' : 'none',
        padding: '10px',
        borderRadius: '5px',
        margin: '5px 0',
        alignSelf: isUser ? 'flex-end' : 'flex-start', // ユーザーのメッセージを右揃え、ボットのメッセージを左揃え
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start', // 配置を調整
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export default Message;





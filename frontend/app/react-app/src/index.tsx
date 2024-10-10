// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18以降の新しいエントリーポイント
import App from './App'; // Appコンポーネントのインポート

// React 18以降の新しいルートAPIを使用している場合
const rootElement = document.getElementById('root') as HTMLElement; // root要素を取得
const root = ReactDOM.createRoot(rootElement); // 新しいrootを作成

// Appコンポーネントをレンダリング
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 空のエクスポートを追加してモジュールとして定義
export {};



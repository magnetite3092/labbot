import React, { useRef } from "react";
import InputImage from "./InputImage";
import './ImageUpload.css';

interface ImageUploadProps {
  onUpload: () => void;
  setIsLearning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, setIsLearning }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsLearning(true); // 勉強中の状態を設定
        const response = await fetch("http://localhost:8001/upload_image/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Success:", data);
        onUpload(); // アップロード成功時に呼び出し
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLearning(false); // 勉強中の状態を解除
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload-container">
      <h3 className="image-upload-title">チャットボットに画像を学習させよう！</h3>
      <InputImage onChange={handleImageChange} id="image-upload" ref={fileInputRef} />
      <button type="button" className="upload-button" onClick={handleButtonClick}>
        画像をアップロード
      </button>
      <p className="image-upload-message">画像をアップロードして、チャットボットに新たな知識を与えましょう！</p>
    </div>
  );
};

export default ImageUpload;




















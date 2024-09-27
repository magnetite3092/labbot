import React, { useState } from "react";

type WavProps = {
  wav?: (file: File) => void; // オプションのWAVファイルを処理するコールバック関数
};

const WavInput: React.FC<WavProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      // ファイルの形式がWAVかどうか確認
      if (file.type === "audio/wav") {
        setSelectedFile(file);
      } else {
        alert("Please select a valid WAV file.");
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // FormDataを作成し、ファイルを追加
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // fetchでPOSTリクエストをlocalhost:8001に送信
        const response = await fetch("http://localhost:8001/upload_wav/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("File uploaded successfully:", data);
        } else {
          console.error("File upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    } else {
      alert("No file selected.");
    }
  };

  return (
    <div>
      <input type="file" accept="audio/wav" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload WAV</button>
    </div>
  );
};

export default WavInput;
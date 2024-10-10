from fastapi import APIRouter, UploadFile, File
import shutil
import whisper
import os
import json
from datetime import datetime

router = APIRouter()

# Whisperの初期設定
whisper_model = whisper.load_model("large")

@router.post("/upload_wav/")
async def upload_wav(file: UploadFile = File(...)):
    file_location = f"uploaded_audios/{file.filename}"
    
    # アップロードされたファイルを保存
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 音声ファイルを文字起こし
    result = whisper_model.transcribe(file_location)
    transcription = result['text']  # 文字起こし結果を取得
    print(transcription)
    
    # 一時ファイルを削除
    os.remove(file_location)

    # 文字起こしの情報をJSON形式でまとめる
    transcription_info = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),  # 現在の日付
        "context": "研究室で会話されてたもの",  # 会話の内容のコンテキスト
        "transcription": transcription  # 文字起こしの内容
    }

    # knowledge.pyに追記
    with open("knowledge.txt", "a") as knowledge_file:
        knowledge_file.write(json.dumps(transcription_info, ensure_ascii=False) + "\n")

    return {"info": f"file '{file.filename}' saved at '{file_location}'", "transcription": transcription_info}

@router.get("/transcribe_audio/")
def transcribe_audio():
    result = whisper_model.transcribe("audio.wav")
    return {"transcription": result}

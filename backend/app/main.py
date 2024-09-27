from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import requests
import whisper

import os
import google.generativeai as genai
 
 
# API-KEYの設定
GOOGLE_API_KEY="AIzaSyD6XZscoMcZYGeQPCcpg5s4Z6CIuuJhoyE"
genai.configure(api_key=GOOGLE_API_KEY)
gemini_pro = genai.GenerativeModel("gemini-pro")
 
# サーバー起動時にテキストファイルを読み込み
def load_knowledge(file_path: str) -> str:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    return ""
#whisperの初期設定
whisper_model = whisper.load_model("large")

# 前提知識を読み込む
knowledge_base = load_knowledge("knowledge.txt")

class Message(BaseModel):
    message: str
app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def Hello():
    result = whisper_model.transcribe("audio.wav")
    print(result)
    return {"Hello": "nitanikoutarou"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# POSTエンドポイント
@app.post("/")
async def receive_message(msg: Message):
    prompt = f"前提知識: {knowledge_base}\nユーザーの質問: {msg.message}"
    response = gemini_pro.generate_content(prompt)
    return {"response": response.text}


#音声処理
@app.post("/upload_wav/")
async def upload_wav(file: UploadFile = File(...)):
    # 保存するファイルパスを指定
    file_location = f"uploaded_files/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"info": f"file '{file.filename}' saved at '{file_location}'"}
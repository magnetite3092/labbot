from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

def load_knowledge(file_path: str) -> str:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    return ""
# API-KEYの設定
genai.configure(api_key="AIzaSyD6XZscoMcZYGeQPCcpg5s4Z6CIuuJhoyE")

class Message(BaseModel):
    message: str

@router.post("/message/")
async def receive_message(msg: Message):
    try:
        gemini_pro = genai.GenerativeModel("gemini-1.5-flash")
        knowledge_base = load_knowledge("knowledge.txt")
        prompt = f"前提知識: {knowledge_base}\nユーザーの質問: {msg.message}\nあなたは大阪工業大学研究室のチャットぼっとです。ユーザの質問に対してjsonで書かれている前提知識を参考にしチャットボットのように簡潔に答えてください。"
        
        response = gemini_pro.generate_content(prompt)
        print(response.text)
        return {"response": response.text}
    except Exception as e:
        return {"message": "応答生成中にエラーが発生しました。"}

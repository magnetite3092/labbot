from fastapi import APIRouter
from pydantic import BaseModel
from bs4 import BeautifulSoup
import requests
import os
import google.generativeai as genai


router = APIRouter()

# 知識ベースファイルの読み込み
def load_knowledge(file_path: str) -> str:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    return ""

class Url(BaseModel):
    url: str
gemini_pro = genai.GenerativeModel("gemini-pro")
@router.post("/knowledge/")
def getKnowledge(url: Url):
    # URLから内容を取得
    response = requests.get(url.url)
    soup = BeautifulSoup(response.content, "html.parser")
    prompt = f"{url}\n このURLページについてかなり詳しくまとめjson形式で出力してください。一番上の要素はタイトルにしてください"
    response = gemini_pro.generate_content(prompt)

    # # タイトルを取得
    # title = soup.title.string if soup.title else "No Title"
    
    # # コンテンツを整形
    # structured_content = soup.get_text()
    # cleaned_content = clean_content(structured_content)
    
    # # knowledge.txtに内容を書き込む
    with open("knowledge.txt", 'a', encoding='utf-8') as file:
        file.write(response.text)
    
    # return {"title": title, "content": cleaned_content}

def clean_content(content: str) -> str:
    # 不要な空白や改行を削除してきれいにする
    # ここでは、2つ以上の連続する改行を1つにし、文の区切りに改行を追加します
    paragraphs = content.splitlines()  # 行ごとに分割
    cleaned_paragraphs = []
    
    for paragraph in paragraphs:
        # 余分な空白を削除
        cleaned_paragraph = ' '.join(paragraph.split())
        if cleaned_paragraph:  # 空でない場合のみ追加
            cleaned_paragraphs.append(cleaned_paragraph)
    
    # 段落を改行で結合して返す
    return '\n\n'.join(cleaned_paragraphs)  # 各段落の間に2つの改行を追加



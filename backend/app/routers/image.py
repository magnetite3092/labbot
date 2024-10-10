from fastapi import APIRouter, File, UploadFile
import shutil
import google.generativeai as genai
from PIL import Image
from pathlib import Path
import os
router = APIRouter()
#Geminiの設定
model = genai.GenerativeModel('gemini-1.5-flash')

@router.post("/upload_image/")
async def upload_image(file: UploadFile = File(...)):
    file_location = f"uploaded_images/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # # 変換する画像のパス
    output_image_path = 'uploaded_images/tmp.jpg'  # 出力先のJPEG画像

    # 画像を開く
    with Image.open(file_location) as img:
        # 画像をJPEG形式で保存
        img.convert('RGB').save(output_image_path, 'JPEG')
    picture = [{
        'mime_type': 'image/png',
        'data': Path(output_image_path).read_bytes()
    }]
    prompt = "ここに書かれている内容を詳しくまとめてjson形式で出力して下さい"

    response = model.generate_content(
        contents=[prompt, picture[0]]
    )
    print(response.text)
    with open("knowledge.txt", 'a', encoding='utf-8') as file:
        file.write(response.text)
    #使用したファイルの削除
    os.remove(file_location)
    os.remove(output_image_path)
    return {"info":"完了！"}

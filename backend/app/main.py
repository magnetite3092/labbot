from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import audio, knowledge, message, items,image

app = FastAPI()

# CORSの設定
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターを追加
app.include_router(audio.router)
app.include_router(image.router)
app.include_router(knowledge.router)
app.include_router(message.router)
app.include_router(items.router)

@app.get("/")
def Hello():
    return {"Hello": "sakanakusyon"}


FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
COPY ./app/ /app/
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


# CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8001"]
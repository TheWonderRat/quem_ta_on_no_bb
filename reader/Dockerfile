FROM python:3 as py

WORKDIR /app

COPY requirements.txt .

RUN ["python3", "-m", "pip", "install", "--no-cache-dir", "-r", "requirements.txt"]

COPY . .

ENV SEED_ID=${SEED_ID}

ENV HOST=${HOST}

ENV PORT=${PORT}

RUN ["python3", "-m", "src.main"]
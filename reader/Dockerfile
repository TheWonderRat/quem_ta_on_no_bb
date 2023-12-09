FROM python:3 as py

WORKDIR /app

COPY requirements.txt .

RUN ["python3", "-m", "pip", "install", "--no-cache-dir", "-r", "requirements.txt"]

COPY . .

ENV SEED_ID=${SEED_ID}

ENV HOST_BACK=${HOST_BACK}

ENV PORT_BACK=${HOST_BACK}

ENTRYPOINT [ "python3", "-m" ]

CMD [ "src.main" ]
FROM python:3 as py

WORKDIR /app

VOLUME [ "/docker-data" ]

COPY requirements.txt .

RUN ["python3", "-m", "pip", "install", "--no-cache-dir", "-r", "requirements.txt"]

COPY . .

ENV SEED_ID=${SEED_ID}

ENV HOST=${HOST}

ENV PORT=${PORT}

RUN ["python3", "src/seeder.py"]

ENTRYPOINT [ "python3" ]

CMD [ ".src/api_request.py" ]
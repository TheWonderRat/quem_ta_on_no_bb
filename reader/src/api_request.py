# Library
import requests
import os


# Modules
from utils.read_file import file_reader

# Environment variables 
HOST = os.environ.get('HOST', 'localhost')
PORT = os.environ.get('PORT', 3001)
SEED_ID = os.environ.get('SEED_ID', '158')
URL = f'http://{HOST}:{PORT}/user'


def read_users():
    reader = file_reader(SEED_ID)
    stream_users = reader.find_file_by_id.stream()

    for user in stream_users:
        yield user


def menage_buffers():
    buffer: list = []

    users = read_users()
    for user in users:
        buffer.append(user)

        if len(buffer) >= 50:
            request_to_api(buffer)
            buffer = []
    request_to_api(buffer)


def request_to_api(buffer):
    response = requests.post(URL, json=buffer)

    if response.status_code != 201:
        print(response.text)
    else:
        print(response.status_code)


if __name__ == '__main__':
    menage_buffers()

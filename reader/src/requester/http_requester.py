#!/usr/bin/env python3

# Library
import os
import requests


# Modules
from src.requester.seed_reader.read_file import file_reader


class http_requester:
    def __init__(self) -> None:
        # Environment variables to connect with API
        self.__host: str = os.environ.get("HOST_BACK", "localhost")
        self.__port: str = os.environ.get("PORT_BACK", "3001")
        self.__seed_id = os.environ.get("SEED_ID", "158")

    # getters
    @property
    def host(self) -> str:
        return self.__host

    @property
    def port(self) -> str:
        return self.__port

    @property
    def seed_id(self) -> str:
        return self.__seed_id

    @property
    def url(self) -> str:
        return f"http://{self.host}:{self.port}/user"

    # methods
    def create_requests(self):
        self.menage_buffers()

    def menage_buffers(self):
        buffer: list = []

        for user in self.read_users():
            buffer.append(user)

            if len(buffer) >= 50:
                self.request_to_api(buffer)
                buffer = []

        self.request_to_api(buffer)

    def read_users(self):
        reader = file_reader(self.seed_id)
        stream_users = reader.find_file_by_id.stream()

        for user in stream_users:
            yield user

    def request_to_api(self, buffer):
        response = requests.post(self.url, json=buffer)

        if response.status_code != 201:
            print("Erro ao criar usuários. Corpo da resposta:")
            print(response.text)
        else:
            success_message = "Usuários criados com sucesso, status code:"
            print(f"{success_message} {response.status_code}")

#!/usr/bin/env python3

from src.seeder.seeder import read_file_stream
from src.requester.api_request import request_to_api


def generate_seeders():
    read_file_stream()


if __name__ == "__main__":
    generate_seeders()

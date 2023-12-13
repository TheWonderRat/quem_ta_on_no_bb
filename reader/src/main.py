#!/usr/bin/env python3

from src.seeder.seeder import seeder
from src.requester.http_requester import http_requester


def generate_seeders():
    seeder().create_seeds()


def create_requests():
    http_requester().create_requests()


if __name__ == "__main__":
    generate_seeders()
    create_requests()

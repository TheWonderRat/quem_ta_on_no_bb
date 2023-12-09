#!/usr/bin/env python3

# Libraries
from io import BytesIO

# Utils
from src.utils.regex_helper import regex
from src.seeder.pdf.pdf_reader import reader_pdf_file

# Seeder
from src.seeder.seeders_generator.page_manager import page_manager


class seeder:
    def __init__(self) -> None:
        self.__last_record: str = None
        self.__index: int = 1
        self.__file_path: str = "./data/dou_bb.pdf"

    # getters
    @property
    def last_record(self) -> str:
        return self.__last_record

    @property
    def index(self) -> int:
        return self.__index

    @property
    def file_path(self) -> str:
        return self.__file_path

    # setters
    @last_record.setter
    def last_record(self, new_last_record) -> None:
        self.__last_record = new_last_record

    @index.setter
    def index(self, new_index) -> None:
        self.__index = new_index

    def create_seeds(self) -> None:
        self.read_file_stream()

    def read_file_stream(self):
        with open("./data/dou_bb.pdf", "rb") as file:
            bytes_stream = BytesIO(file.read())

        reader = reader_pdf_file(bytes_stream)

        last_record: str = None

        index: int = 1

        while index < len(reader):
            content = reader.content_at_index(index)
            raw = regex.trim(content)
            last_record = page_manager(raw, last_record).read_page()
            index += 1

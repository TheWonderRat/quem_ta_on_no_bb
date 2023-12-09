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

    # methods
    def create_seeds(self) -> None:
        for content in self.read_file_stream():
            raw = regex.trim(content)
            self.last_record = page_manager(raw, self.last_record).read_page()

    def read_file_stream(self):
        with open(self.file_path, "rb") as file:
            bytes_stream = BytesIO(file.read())

        reader = reader_pdf_file(bytes_stream)

        while self.index < len(reader):
            yield reader.content_at_index(self.index)
            self.index += 1

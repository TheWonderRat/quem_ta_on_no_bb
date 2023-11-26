# Libraries
from io import BytesIO

# Utils
from utils.regex_helper import regex
from utils.pdf_reader import reader_pdf_file

# Seeder
from seeders_generator.page_manager import page_manager


def read_file_stream():
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


if __name__ == "__main__":
    read_file_stream()

# Library
from PyPDF2 import PdfReader


class reader_pdf_file:
    def __init__(self, bytes_to_read) -> None:
        self.__reader = PdfReader(bytes_to_read)

    # Magic methods
    def __len__(self):
        return len(self.pages)

    # getters
    @property
    def pages(self):
        return self.__reader.pages

    def content_at_index(self, index: int):
        return self.pages[index].extract_text()

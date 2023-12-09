#!/usr/bin/env python3

# Library
import os


class file_manager:
    def __init__(self) -> None:
        self.__file_name: str = ''
        self.__relative_path: str = 'data/regions/'
        self.__full_path: str = ''

    # getters
    @property
    def file_name(self) -> str:
        return self.__file_name

    @property
    def path(self) -> str:
        return self.__relative_path

    @property
    def full_path(self) -> str:
        return self.__full_path

    # setters
    @file_name.setter
    def set_file_name(self, file_name: str):
        self.__file_name = file_name
        self.set_full_path()

    def set_full_path(self):
        self.__full_path = f'{self.path}{self.file_name}'

    # methods
    def registre(self, string_list: list):
        if os.path.exists(self.full_path):
            return self.amend_to_file(string_list)
        return self.create_new_file(string_list)

    def create_new_file(self, strings_list: list):
        with open(self.full_path, 'w') as new_file:
            new_file.writelines(strings_list)

    def amend_to_file(self, string_list: list):
        with open(self.full_path, 'a') as amend_file:
            amend_file.writelines(string_list)

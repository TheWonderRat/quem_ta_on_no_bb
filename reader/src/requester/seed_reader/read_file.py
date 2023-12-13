#!/usr/bin/env python3

# Library
import os

# utils
from src.utils.regex_helper import regex


class file_reader:
    def __init__(self, file_id) -> None:
        self.__path: str = "./data/regions"
        self.__file_id: int | str = file_id
        self.__file_name: str = None
        self.__file_matches: list = []

    # getters
    @property
    def path(self) -> str:
        return self.__path

    @property
    def file_id(self) -> int | str:
        return self.__file_id

    @property
    def file_matches(self) -> list:
        return self.__file_matches

    @property
    def file_name(self) -> str:
        return self.__file_name

    @property
    def full_path(self):
        return f"{self.path}/{self.file_name}"

    # setters
    @file_name.setter
    def set_file_name(self, file_name: str):
        self.__file_name = file_name

    @file_matches.setter
    def add_file_match(self, file_name: str):
        self.file_matches.append(file_name)

    # methods
    @property
    def find_file_by_id(self):
        for files in os.walk(self.path):
            for file in files[2]:
                if regex.find_file_by_id(self.file_id, file):
                    self.add_file_match = file
        return self

    def stream(self):
        if not len(self.file_matches):
            return print("Nenhum arquivo encontrado")

        for each_file in self.file_matches:
            self.set_file_name = each_file

            backup_register = regex.is_backup_register(each_file)

            with open(self.full_path, "r") as file_info:
                for line in file_info:
                    yield self.format_user(line, backup_register)

    def format_user(self, user_info: str, backup_register: bool) -> dict:
        user_list_info = regex.split_user_info(user_info)

        pcd, pcd_position = self.check_ppp_and_pcd(user_list_info[4])
        ppp, ppp_position = self.check_ppp_and_pcd(user_list_info[5])

        registry = regex.sub_by_pattern("[-_]", "", user_list_info[1])

        name = regex.subs_to_whitespaces(user_list_info[0])

        global_position = regex.subs_remove_underscored(user_list_info[3])

        return {
            "name": name,
            "pcd": pcd,
            "ppp": ppp,
            "registry": int(registry),
            "globalPosition": int(global_position),
            "pppPosition": ppp_position,
            "pcdPosition": pcd_position,
            "backupRegister": backup_register,
        }

    def check_ppp_and_pcd(self, data_to_check: str) -> tuple:
        remove_underscored = regex.subs_remove_underscored(data_to_check)
        result = regex.find_numbers(remove_underscored)

        return (True, int(result)) if result else (result, None)

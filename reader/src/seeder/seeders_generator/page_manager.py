#!/usr/bin/env python3

# Utils
from src.utils.regex_helper import regex

# Module
from src.seeder.seeders_generator.file_manager import file_manager


class page_manager:
    def __init__(self, page_text: str, last_record=None) -> None:
        self.__page: str = page_text
        self.__region: str = None
        self.__prev_users: str = None
        self.__file_manager: file_manager = file_manager()
        self.__last_record: str = last_record

    # getters
    @property
    def page(self) -> str:
        return self.__page

    @property
    def region(self) -> str:
        return self.__region

    @property
    def prev_users(self) -> str:
        return self.__prev_users

    @property
    def last_record(self) -> str:
        return self.__last_record

    @property
    def get_file_manager(self):
        return self.__file_manager

    # setters
    @region.setter
    def set_region(self, region: str):
        self.__region = region

    @prev_users.setter
    def set_prev_users(self, prev_users: str):
        self.__prev_users = prev_users

    @page.setter
    def set_page(self, rest_of_page: str):
        self.__page = rest_of_page

    @last_record.setter
    def set_last_record(self, new_last_record):
        self.__last_record = new_last_record

    # Methods
    def read_page(self):
        region = regex.find_region_pattern(self.page)
        if region:
            self.set_region = region
            self.separate_region()
            self.read_page()
        else:
            self.set_prev_users = self.page
            self.separate_users()
        return self.last_record

    def separate_region(self):
        prev_users, rest_page = regex.split_regions(self.page)
        self.set_prev_users = prev_users

        self.separate_users()

        self.set_page = rest_page
        self.set_last_record = self.region

    def separate_users(self):
        if regex.find_pattern('WhatsApp', self.prev_users):
            return

        if not len(self.prev_users):
            return

        if regex.find_pattern('_VICE_-PRESIDÊNCIA_', self.prev_users):
            self.remove_end()

        users_with_new_line = regex.insert_new_line(self.prev_users)
        users_to_record = users_with_new_line.split('/')
        self.registre_users(users_to_record)

    def remove_end(self):
        users = regex.split_by_pattern('_VICE_', self.prev_users, 1)
        self.set_prev_users = users[0]

    def registre_users(self, user_to_record):
        self.get_file_manager.set_file_name = self.format_file_name()
        self.get_file_manager.registre(user_to_record)

    def format_file_name(self) -> str:
        remove_backslash = regex.sub_by_pattern('/', '-', self.last_record)

        return f'{regex.sub_by_pattern("[:_]", "", remove_backslash)}.txt'

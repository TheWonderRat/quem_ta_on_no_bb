# Library
import re


class regex:
    # getters
    def region_pattern() -> str:
        return r'[\d\w+]+/_\w{2}_/[A-zÃ0-9]+-[A-zÃ0-9]+/[A-Z-_]+:_'

    def whitespace_pattern() -> str:
        return r'\s+'

    def file_id_pattern(id: str | int) -> str:
        return fr'{id}-[\w-]*.txt'

    def maintain_match_letter_pattern() -> str:
        return r" \1"

    def numbers_pattern() -> str:
        return r"\d+"

    # generic methods
    def find_pattern(rgx: str, text: str) -> str | bool:
        result = re.search(rgx, text)
        return result.group() if result is not None else False

    def sub_by_pattern(rgx: str, subs: str, text: str) -> str:
        return re.sub(rgx, subs, text)

    def split_by_pattern(rgx: str, text: str, stop=0) -> list:
        return re.split(rgx, text, stop)

    # finders
    def find_region_pattern(text: str) -> str | bool:
        return regex.find_pattern(regex.region_pattern(), text)

    def find_file_by_id(id: int | str, file_name: str) -> str | bool:
        return regex.find_pattern(regex.file_id_pattern(id), file_name)

    def is_backup_register(text: str) -> bool:
        result = regex.find_pattern('CADASTRO-RESERVA', text)
        return True if result else False

    def find_numbers(text: str | int) -> str | bool:
        return regex.find_pattern(regex.numbers_pattern(), text)

    # splits
    def split_regions(text: str) -> list:
        return regex.split_by_pattern(regex.region_pattern(), text, 1)

    def split_user_info(text: str) -> list:
        return regex.split_by_pattern(';', text)

    # formatters and substitutions
    def subs_to_whitespaces(text: str) -> str:
        return regex.sub_by_pattern('_', ' ', text)

    def subs_remove_underscored(text: str) -> str:
        return regex.sub_by_pattern('_', '', text)

    def insert_new_line(text: str) -> str:
        return regex.sub_by_pattern('[/.]', '\n/', text)

    def trim(content: str) -> str:
        return regex.sub_by_pattern(regex.whitespace_pattern(), '_', content)

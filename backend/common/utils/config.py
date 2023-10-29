from decouple import Csv, config


class Config:
    @staticmethod
    def get(key: str):
        return config(key)

    @staticmethod
    def get_csv(key: str):
        return config(key, cast=Csv())

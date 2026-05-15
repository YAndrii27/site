from typing import Annotated
from urllib.parse import quote_plus

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict, NoDecode
from datetime import timedelta


class Config(BaseSettings):
    """Base configuration."""
    MONGO_DATABASE_USERNAME: str = quote_plus('user')
    MONGO_DATABASE_PASSWORD: str = quote_plus('password')
    MONGO_DATABASE_HOST: str = 'localhost'
    MONGO_DATABASE_PORT: int = 27017
    MONGO_DATABASE_NAME: str = 'blog'

    SQLALCHEMY_DATABASE_URI: str = 'sqlite:///./admin.db'

    VERSION: str = '0.1.0'

    # CORS
    CORS_ORIGINS: Annotated[list[str], NoDecode] = ['http://localhost:3000']

    # Session
    PERMANENT_SESSION_LIFETIME: timedelta = timedelta(days=7)
    SESSION_COOKIE_SECURE: bool = False
    SESSION_COOKIE_HTTPONLY: bool = True

    # JWT
    JWT_SECRET_KEY: str = 'your-secret-key-change-in-production'
    JWT_ALGORITHM: str = 'HS256'
    JWT_EXPIRATION_HOURS: int = 24

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors(cls, v):
        if isinstance(v, str):
            return [x.strip() for x in v.split(",") if x.strip()]
        return v

    @field_validator(
            "MONGO_DATABASE_USERNAME",
            "MONGO_DATABASE_PASSWORD",
            mode="before"
    )
    @classmethod
    def quote_database_credentials(cls, v):
        return quote_plus(v)


config = Config()

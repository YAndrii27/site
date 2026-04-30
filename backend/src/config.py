import os
from datetime import timedelta


class Config:
    """Base configuration."""
    MONGO_DATABASE_URL: str = os.getenv(
        key='MONGO_DATABASE_URL',
        default='mongodb://localhost:27017/myblog'
    )

    VERSION: str = '0.1.0'

    # CORS
    CORS_ORIGINS: list[str] = os.getenv(
        key='CORS_ORIGINS',
        default='http://localhost:3000'
    ).split(',')

    # Session
    PERMANENT_SESSION_LIFETIME: timedelta = timedelta(days=7)
    SESSION_COOKIE_SECURE: bool = os.getenv(
        key='SESSION_COOKIE_SECURE',
        default='False'
    ).lower() == 'true'
    SESSION_COOKIE_HTTPONLY: bool = True


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG: bool = True
    TESTING: bool = False


class TestingConfig(Config):
    """Testing configuration."""
    DEBUG: bool = True
    TESTING: bool = True
    SQLALCHEMY_DATABASE_URI: str = 'sqlite:///:memory:'


class ProductionConfig(Config):
    """Production configuration."""
    DEBUG: bool = False
    TESTING: bool = False
    SESSION_COOKIE_SECURE: bool = True

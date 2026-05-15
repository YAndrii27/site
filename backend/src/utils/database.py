from pymongo import AsyncMongoClient
from beanie import init_beanie

from src.config import config as Config
from src.models import Category, Post
from src.utils.sqlalchemy_db import engine, Base


async def init_db() -> None:
    """Initialize the beanie connection and SQLAlchemy models."""

    # Initialize SQLAlchemy tables
    Base.metadata.create_all(bind=engine)

    url = f"mongodb://{Config.MONGO_DATABASE_USERNAME}:\
        {Config.MONGO_DATABASE_PASSWORD}"f"@{Config.MONGO_DATABASE_HOST}:\
            {Config.MONGO_DATABASE_PORT}/{Config.MONGO_DATABASE_NAME}?authSource=admin"\
                .replace(" ", "")

    # Initialize MongoDB with Beanie
    client = AsyncMongoClient(host=url)

    await init_beanie(
        database=client.get_database("blog"),
        document_models=[Category, Post]
    )

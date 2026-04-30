from pymongo import AsyncMongoClient
from beanie import init_beanie

from src.config import Config
from src.models import Category, Post

async def init_db() -> None:
    """Initialize the beanie connection."""
    
    client = AsyncMongoClient(host=Config.MONGO_DATABASE_URL)
    
    await init_beanie(
        database=client.get_database("blog"),
        document_models=[Category, Post]
    )

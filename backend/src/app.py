import dotenv
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import Config
from src.database import init_db
from src.routes import register_routes

def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    dotenv.load_dotenv()

    app: FastAPI = FastAPI(
        title="Blog API",
        description="Backend API for my blog",
        version=Config.VERSION,
    )
    
    # Since init_db is an async function, we need to run it in the event loop
    asyncio.get_running_loop().create_task(init_db())

    app.add_middleware(
        CORSMiddleware,
        allow_origins=Config.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_routes(app)

    return app

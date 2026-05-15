import asyncio
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.utils.database import init_db
from src.config import config as Config
from src.routes import register_routes
from src.routes.middlewares.auth import AuthMiddleware

logger = logging.getLogger(__name__)
logger.basicConfig(level=logging.WARN)


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""

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

    app.add_middleware(AuthMiddleware)

    register_routes(app)

    return app

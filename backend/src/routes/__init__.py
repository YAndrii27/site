from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from fastapi import FastAPI

from src.routes.posts import router as posts_router
from src.routes.categories import router as categories_router
from src.routes.admin import router as admin_router


def register_routes(app: 'FastAPI'):
    """Register all routers"""
    app.include_router(
        posts_router,
        prefix='/api/posts',
        tags=['posts']
    )

    app.include_router(
        categories_router,
        prefix='/api/categories',
        tags=['categories']
    )

    app.include_router(
        admin_router,
        prefix='/api/admin',
        tags=['admin']
    )

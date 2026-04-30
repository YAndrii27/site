from src.routes.posts import router as posts_router
from src.routes.categories import router as categories_router


def register_routes(app):
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

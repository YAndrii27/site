from fastapi import HTTPException, Request, status
from starlette.middleware.base import BaseHTTPMiddleware

from src.utils.sqlalchemy_db import get_db
from src.utils.auth import verify_token
from src.models.admin import Admin


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        self.app = app

    def is_required(self, request: Request) -> bool:
        if request.method == "GET"\
              or request.url.path.startswith("/api/admin"):
            return False
        return True

    def check_authorization_header(self, request: Request) -> bool:
        auth_header = request.headers.get("Authorization")
        if auth_header is None:
            return False
        return True

    def check_token_scheme(self, request: Request) -> bool:
        try:
            scheme, _ = request.headers.get("Authorization").split(maxsplit=1)
            if scheme.lower() != "bearer":
                return False
            return True
        except (ValueError, AttributeError):
            return False

    def get_token(self, request: Request) -> str:
        auth_header = request.headers.get("Authorization")
        if auth_header:
            _, token = auth_header.split(maxsplit=1)
            return token
        return None

    async def dispatch_func(self, request: Request, call_next):
        if not self.is_required(request):
            return await call_next(request)

        if not self.check_authorization_header(request):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authorized",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not self.check_token_scheme(request):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authorized",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = self.get_token(request)
        token_data = verify_token(token)
        if token_data is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authorized",
                headers={"WWW-Authenticate": "Bearer"},
            )

        async for db in get_db():
            admin = db.query(Admin).filter(
                Admin.username == token_data.get("username")
            ).first()
            db.close()
            if not admin:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authorized",
                    headers={"WWW-Authenticate": "Bearer"},
                )

        return await call_next(request)

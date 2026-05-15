import os

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.schemas.admin import AdminCredentials, TokenResponse
from src.models.admin import Admin
from src.utils.sqlalchemy_db import get_db
from src.utils.auth import verify_password, hash_password, create_access_token

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(credentials: AdminCredentials, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == credentials.username)\
        .first()
    if not admin or not verify_password(
        credentials.password,
        admin.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_admin(
    admin: AdminCredentials,
    db: Session = Depends(get_db)
):
    existing_admin = db.query(Admin).filter(
        Admin.username == admin.username
    ).first()
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin user already exists"
        )

    new_admin = Admin(
        username=admin.username,
        password_hash=hash_password(admin.password)
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    initial_admin = db.query(Admin).filter(
        Admin.username == os.getenv("INITIAL_ADMIN_USERNAME")
    ).first()
    db.delete(initial_admin)
    db.commit()

    return {
        "message": "Admin user created successfully",
        "admin_id": new_admin.id
    }

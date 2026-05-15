import os

from sqlalchemy import select, func

from src.config import config as Config
from src.models import Admin
from src.utils.auth import hash_password
from src.utils.sqlalchemy_db import get_db


def ask_username() -> str:
    while True:
        username = input("Enter a username for the admin account: ").strip()
        if username:
            return username
        print("Username cannot be empty. Please try again.")


def ask_password() -> str:
    while True:
        password = input("Enter a password for the admin account: ").strip()
        if len(password) >= 8:
            return password
        print("Password must be at least 8 characters long. Please try again.")


def setup() -> None:
    if Config.INTERACTIVE_MODE:
        print("Welcome to the first-time admin setup!")
        username = ask_username()
        password = ask_password()    
        print(f"Admin account created successfully with username: {username}")
    else:
        username = os.getenv("INITIAL_ADMIN_USERNAME", "admin")
        password = os.getenv("INITIAL_ADMIN_PASSWORD", "admin123")

    for db in get_db():
        admin = Admin(username=username, password_hash=hash_password(password))
        db.add(admin)
        db.commit()


def check_if_admin_exists() -> bool:
    for db in get_db():
        admin_count = select(func.count()).select_from(Admin)
        admin_count = db.scalar(admin_count)
        return admin_count > 0


def setup_if_needed() -> None:
    if not check_if_admin_exists():
        setup()

from __future__ import annotations
from typing import TYPE_CHECKING
from pydantic import Field
from beanie import Document, Indexed, Link

if TYPE_CHECKING:
    from .post import Post


class Category(Document):
    """Blog category document"""
    
    name: Indexed(str, unique=True) = Field(max_length=100)
    slug: Indexed(str, unique=True) = Field(max_length=100)
    description: str = Field(max_length=500)

    # Reference to posts in the category
    posts: list[Link['Post']]
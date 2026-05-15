from typing import TYPE_CHECKING
from datetime import datetime
from beanie import Document, Indexed, Link
from pydantic import Field

if TYPE_CHECKING:
    from .category import Category


class Post(Document):
    """Blog post document"""

    title: Indexed(
        str,
        unique=True
    ) = Field(..., max_length=255)  # type: ignore
    slug: Indexed(
        str,
        unique=True
    ) = Field(..., max_length=255)  # type: ignore
    excerpt: str = Field(..., max_length=500)
    published: bool = Field(default=False)
    created_at: datetime = Field(default=datetime.now())
    updated_at: datetime = Field(
        default=datetime.now(),
        onupdate=datetime.now()
    )

    # Reference to category
    category: Link['Category']

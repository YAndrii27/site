from pydantic import BaseModel


class Category(BaseModel):
    """Schema for creating a category."""
    name: str
    slug: str
    description: str = None

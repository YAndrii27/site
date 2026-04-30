from pydantic import BaseModel


class Post(BaseModel):
    """Schema for creating a post."""
    title: str
    slug: str
    content: str
    excerpt: str = None
    published: bool = False
    category_id: int = None
    created_at: str = None
    updated_at: str = None

from fastapi import APIRouter, HTTPException, Query

from src.models.post import Post
from src.schemas import Post as PostSchema

router = APIRouter()


@router.get('')
async def get_posts(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    category_id: int = Query(None)
):
    """Get all published posts with pagination."""
    posts: list[Post] = []
    if category_id:
        posts = await Post.find(
            Post.published == True,  # noqa: E712
            Post.category.id == category_id,
        )\
            .skip((page - 1) * per_page)\
            .limit(per_page)\
            .to_list()
    else:
        posts = await Post.find(
            Post.published == True  # noqa: E712
        )\
            .skip((page - 1) * per_page)\
            .limit(per_page)\
            .to_list()

    return {
        'posts': posts,
        'current_page': page,
    }


@router.get('/{slug}')
async def get_post(slug: str):
    """Get a single post by slug."""
    post = await Post.find_one(
        Post.slug == slug,
        Post.published == True  # noqa: E712
    )

    if not post:
        raise HTTPException(status_code=404, detail='Post not found')

    return post


@router.post('')
async def create_post(
    post: PostSchema,
):
    """Create a new post"""

    # Check if post already exists
    if await Post.find_one(Post.slug == post.slug):
        raise HTTPException(
            status_code=409,
            detail='Post with this slug already exists'
        )

    created_post = Post(
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt,
        published=post.published,
        category=post.category,
        created_at=post.created_at,
        updated_at=post.updated_at
    )

    await created_post.insert()

    return created_post.model_dump_json()


@router.put('/{post_id}')
async def update_post(
    post_id: int,
    title: str | None = None,
    slug: str | None = None,
    excerpt: str | None = None,
    published: bool | None = None,
    category: int | None = None,
):
    """Update a post"""

    post = await Post.find_one(Post.id == post_id)

    if not post:
        raise HTTPException(status_code=404, detail='Post not found')

    # Update fields
    if title is not None:
        post.title = title
    if slug is not None:
        post.slug = slug
    if excerpt is not None:
        post.excerpt = excerpt
    if published is not None:
        post.published = published
    if category is not None:
        post.category = category

    await post.save()

    return post.model_dump_json()


@router.delete('/{post_id}')
async def delete_post(
    post_id: int,
):
    """Delete a post"""

    post = await Post.find_one(Post.id == post_id)

    if not post:
        raise HTTPException(status_code=404, detail='Post not found')

    await post.delete()

    return {'detail': 'Post deleted'}

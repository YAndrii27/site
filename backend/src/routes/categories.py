from fastapi import APIRouter, HTTPException
from src.models import Category
from src.schemas import Category as CategorySchema

router = APIRouter()


@router.get('')
async def get_categories() -> list[str]:
    """Get all categories."""
    categories: list[Category] = await Category.find_all().to_list()
    return categories


@router.get('/{slug}')
async def get_category(slug: str) -> str:
    """Get a single category by slug."""
    category = await Category.find_one(Category.slug == slug)

    if not category:
        raise HTTPException(status_code=404, detail='Category not found')

    return category


@router.post('')
async def create_category(
    category: CategorySchema
):
    """Create a new category"""
    if await Category.find_one(Category.slug == category.slug):
        raise HTTPException(
            status_code=409,
            detail='Category with this slug already exists'
        )

    created_category = Category(
        name=category.name,
        slug=category.slug,
        description=category.description
    )

    await created_category.save()

    return created_category.to_json()


@router.put('/{category_id}')
async def update_category(
    category_id: int,
    name: str | None = None,
    slug: str | None = None,
    description: str | None = None
):
    """Update a category"""
    category = await Category.find_one(Category.id == category_id)

    if not category:
        raise HTTPException(status_code=404, detail='Category not found')

    if name is not None:
        category.name = name
    if slug is not None:
        category.slug = slug
    if description is not None:
        category.description = description

    await category.save()

    return category.to_json()


@router.delete('/{category_id}')
async def delete_category(category_id: int):
    """Delete a category"""
    category = await Category.find_one(Category.id == category_id)

    if not category:
        raise HTTPException(status_code=404, detail='Category not found')

    await category.delete()

    return {'detail': 'Category deleted'}

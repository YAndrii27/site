import uvicorn

from src.app import create_app


if __name__ == '__main__':
    uvicorn.run(app=create_app(), host='0.0.0.0', port=5000)

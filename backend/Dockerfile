FROM python:3.12-alpine

WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry

# Copy project files
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry install --no-root

# Copy application code
COPY . .

# Install the application
RUN poetry install --only main

# Expose port
EXPOSE 5000

# Run the application
CMD ["poetry", "run", "python", "-m", "uvicorn", "src.app:create_app", "--host", "0.0.0.0", "--port", "5000", "--factory"]

FROM python:3.12.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN groupadd --gid 10001 qubesight \
    && useradd --uid 10001 --gid 10001 --no-create-home --shell /usr/sbin/nologin qubesight

WORKDIR /app
COPY pyproject.toml uv.lock ./
COPY src ./src
RUN pip install uv \
    && uv sync --frozen --no-dev \
    && chown -R 10001:10001 /app

USER 10001:10001
CMD [".venv/bin/python", "-m", "qubesight_livekit_agent.main", "start"]

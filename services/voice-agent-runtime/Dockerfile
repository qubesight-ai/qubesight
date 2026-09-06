FROM python:3.12.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN groupadd --gid 10001 qubesight \
    && useradd --uid 10001 --gid 10001 --no-create-home --shell /usr/sbin/nologin qubesight

WORKDIR /app
COPY requirements.txt requirements.lock ./
RUN pip install -r requirements.lock
COPY runtime ./runtime

USER 10001:10001
EXPOSE 8080
CMD ["python", "-m", "runtime"]

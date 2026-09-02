import os

import uvicorn


def main() -> None:
    port = int(os.environ.get("PORT", "8080"))
    if port < 1024 or port > 65535:
        raise RuntimeError("PORT is outside the allowed range")
    uvicorn.run(
        "runtime.main:app",
        host="0.0.0.0",
        port=port,
        proxy_headers=True,
        forwarded_allow_ips="127.0.0.1",
    )


if __name__ == "__main__":
    main()


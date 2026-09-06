import os

import uvicorn


def main() -> None:
    port = int(os.environ.get("PORT", "8080"))
    if port < 1024 or port > 65535:
        raise RuntimeError("PORT is outside the allowed range")
    uvicorn.run(
        "runtime.main:app",
        # Containers use the host network so Caddy can proxy without exposing
        # a Docker bridge. Binding to loopback keeps every allocated agent port
        # private even when the host firewall is permissive.
        host="127.0.0.1",
        port=port,
        proxy_headers=True,
        forwarded_allow_ips="127.0.0.1",
    )


if __name__ == "__main__":
    main()

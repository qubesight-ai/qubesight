from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator


class CallStore:
    def __init__(self, path: Path):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._initialize()

    @contextmanager
    def connection(self) -> Iterator[sqlite3.Connection]:
        connection = sqlite3.connect(self.path, timeout=10)
        connection.row_factory = sqlite3.Row
        try:
            yield connection
            connection.commit()
        finally:
            connection.close()

    def _initialize(self) -> None:
        with self.connection() as connection:
            connection.executescript(
                """
                pragma journal_mode = WAL;
                create table if not exists calls (
                  call_sid text primary key,
                  caller_phone text not null default '',
                  started_at text not null,
                  ended_at text,
                  transcript text not null default '[]',
                  turn_count integer not null default 0,
                  finalized integer not null default 0,
                  ingested_at text
                );
                """
            )

    def start(self, call_sid: str, caller_phone: str, greeting: str) -> None:
        with self.connection() as connection:
            connection.execute(
                """
                insert into calls(call_sid, caller_phone, started_at, transcript)
                values (?, ?, ?, ?)
                on conflict(call_sid) do nothing
                """,
                (
                    call_sid,
                    caller_phone,
                    datetime.now(timezone.utc).isoformat(),
                    json.dumps([{"role": "assistant", "content": greeting}], ensure_ascii=False),
                ),
            )

    def get(self, call_sid: str) -> dict[str, Any] | None:
        with self.connection() as connection:
            row = connection.execute("select * from calls where call_sid = ?", (call_sid,)).fetchone()
        if not row:
            return None
        result = dict(row)
        result["transcript"] = json.loads(result["transcript"])
        return result

    def append_turn(self, call_sid: str, user_text: str, assistant_text: str) -> dict[str, Any]:
        call = self.get(call_sid)
        if not call:
            raise KeyError(call_sid)
        transcript = call["transcript"]
        transcript.extend(
            [
                {"role": "user", "content": user_text},
                {"role": "assistant", "content": assistant_text},
            ]
        )
        with self.connection() as connection:
            connection.execute(
                "update calls set transcript = ?, turn_count = turn_count + 1 where call_sid = ?",
                (json.dumps(transcript, ensure_ascii=False), call_sid),
            )
        updated = self.get(call_sid)
        if not updated:
            raise KeyError(call_sid)
        return updated

    def finalize(self, call_sid: str) -> dict[str, Any] | None:
        with self.connection() as connection:
            connection.execute(
                "update calls set finalized = 1, ended_at = coalesce(ended_at, ?) where call_sid = ?",
                (datetime.now(timezone.utc).isoformat(), call_sid),
            )
        return self.get(call_sid)

    def mark_ingested(self, call_sid: str) -> None:
        with self.connection() as connection:
            connection.execute(
                "update calls set ingested_at = ? where call_sid = ?",
                (datetime.now(timezone.utc).isoformat(), call_sid),
            )


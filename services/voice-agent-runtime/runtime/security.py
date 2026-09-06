from __future__ import annotations

import re
from urllib.parse import urlsplit


class UnsafeRecordingUrl(ValueError):
    pass


def validate_twilio_recording_url(url: str, account_sid: str) -> str:
    if len(url) > 1_000:
        raise UnsafeRecordingUrl("recording URL is too long")
    parsed = urlsplit(url)
    if parsed.scheme != "https" or parsed.hostname != "api.twilio.com":
        raise UnsafeRecordingUrl("recording URL host is not allowed")
    if parsed.username or parsed.password or parsed.port not in (None, 443):
        raise UnsafeRecordingUrl("recording URL authority is invalid")
    expected = rf"/2010-04-01/Accounts/{re.escape(account_sid)}/Recordings/RE[0-9A-Fa-f]{{32}}(?:\.(?:mp3|wav))?"
    if not re.fullmatch(expected, parsed.path):
        raise UnsafeRecordingUrl("recording URL path is invalid")
    if parsed.query or parsed.fragment:
        raise UnsafeRecordingUrl("recording URL must not include query or fragment")
    return url


def clean_transcript_text(value: str, maximum: int = 4_000) -> str:
    value = " ".join(value.replace("\x00", "").split())
    return value[:maximum]


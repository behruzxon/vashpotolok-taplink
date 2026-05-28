"""
VashPotolok - Telegram bot /start payload parser (referans implementatsiya).

Bu fayl `docs/TELEGRAM_BOT_INTEGRATION.md` shartnomasiga muvofiq yozilgan.
Frontend qism: `src/lib/pro-price-estimate.ts` (`buildProTelegramPayload`).

Joriy format (Phase Calc-3):
    pro_<room>_<area>_<ceiling>

Eski formatlar:
    pro_..._<district>      (Phase Calc-2 - DEPRECATED)
    pro_..._<district>_<N>a (Phase 3.5 - DEPRECATED)
    price_*                 (Phase 3 - DEPRECATED)

Ishlatish:
    from telegram_payload_parser import parse_start_payload
    parsed = parse_start_payload("pro_zal_24_gulli")
    # -> {"kind": "pro", "source": "pro", "room_type_id": "zal", ...}

Testlar:
    python telegram_payload_parser.py
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Union

# ---------------------------------------------------------------------------
# Stable kontrakt - `data/price-options.ts` bilan SYNCHRONIZED bo'lishi shart.
# Bu identifikatorlar har qanday o'zgarishi - breaking change.
# ---------------------------------------------------------------------------

ROOM_IDS = ("zal", "yotoqxona", "oshxona", "koridor")
CEILING_IDS = ("odnotonniy", "gulli", "naqsh", "mramor", "uv-pechat")
SOURCE_IDS = ("hero", "sticky", "footer", "portfolio", "price", "services", "trust")

# Telegram cheklovi
MAX_PAYLOAD_LEN = 64
ALLOWED_CHARS = re.compile(r"^[A-Za-z0-9_-]+$")

# Area uchun - frontend AREA_MIN_M2..AREA_MAX_M2 (6..80) bilan teng.
AREA_MIN = 6
AREA_MAX = 80

ParsedResult = Dict[str, Union[str, int, List[str], None]]


def parse_start_payload(payload: Optional[str]) -> ParsedResult:
    """Telegram `/start <payload>` ni parsing qiladi.

    Qaytaradi:
        {"kind": "pro",     "source": "pro",       ...}
        {"kind": "source",  "source": "hero"|...,  "raw": ...}
        {"kind": "unknown", "source": "unknown",   "raw": ...}
    """
    raw = payload or ""
    raw = raw.strip()

    if not raw or len(raw) > MAX_PAYLOAD_LEN or not ALLOWED_CHARS.match(raw):
        return _unknown(raw)

    if raw in SOURCE_IDS:
        return {"kind": "source", "source": raw, "raw": raw}

    if raw.startswith("pro_"):
        return _parse_pro(raw)

    return _unknown(raw)


def _unknown(raw: str) -> ParsedResult:
    return {"kind": "unknown", "source": "unknown", "raw": raw}


def _parse_pro(raw: str) -> ParsedResult:
    parts = raw.split("_")
    # ['pro', room, area, ceiling]
    if len(parts) != 4:
        return _unknown(raw)

    _, room, area_str, ceiling = parts

    if room not in ROOM_IDS:
        return _unknown(raw)
    if ceiling not in CEILING_IDS:
        return _unknown(raw)

    try:
        area = int(area_str)
    except (TypeError, ValueError):
        return _unknown(raw)

    if not (AREA_MIN <= area <= AREA_MAX):
        return _unknown(raw)

    return {
        "kind": "pro",
        "source": "pro",
        "room_type_id": room,
        "area_m2": area,
        "ceiling_type_id": ceiling,
        "raw": raw,
    }


# ---------------------------------------------------------------------------
# Bonus: bot tomonida taxminiy narx hisoblash (Phase Calc-3).
# Tablitsa qiymatlari `src/data/price-options.ts` bilan birxil bo'lishi shart.
# ---------------------------------------------------------------------------

ROOM_MULTIPLIER = {
    "zal": 1.05,
    "yotoqxona": 1.0,
    "oshxona": 1.0,
    "koridor": 0.95,
}

CEILING_PRICE_PER_M2 = {
    # id -> (min, max)
    "odnotonniy": (80_000, 90_000),
    "gulli":      (120_000, 135_000),
    "naqsh":      (120_000, 135_000),
    "mramor":     (120_000, 135_000),
    "uv-pechat":  (140_000, 160_000),
}


def calculate_estimate(
    room_type_id: str,
    area_m2: int,
    ceiling_type_id: str,
) -> Dict[str, int]:
    """Frontend `calculateProEstimate` bilan binmuvofiq taxminiy range."""
    multiplier = ROOM_MULTIPLIER.get(room_type_id)
    ceiling = CEILING_PRICE_PER_M2.get(ceiling_type_id)
    if multiplier is None or ceiling is None:
        return {"min": 0, "max": 0}

    p_min, p_max = ceiling
    base_min = p_min * area_m2 * multiplier
    base_max = p_max * area_m2 * multiplier

    return {
        "min": _round_to_thousand(base_min),
        "max": _round_to_thousand(base_max),
    }


def _round_to_thousand(v: float) -> int:
    return int(round(v / 1000) * 1000)


def format_uz_number(n: int) -> str:
    s = f"{n:,}".replace(",", " ")
    return s


def format_price_range(p_min: int, p_max: int) -> str:
    if p_min <= 0 and p_max <= 0:
        return "-"
    if p_min == p_max:
        return f"{format_uz_number(p_min)} so'm"
    return f"{format_uz_number(p_min)} - {format_uz_number(p_max)} so'm"


# ---------------------------------------------------------------------------
# Test cases
# ---------------------------------------------------------------------------

def _expect(actual, expected, label: str) -> bool:
    ok = actual == expected
    sign = "OK " if ok else "FAIL"
    print(f"  [{sign}] {label}")
    if not ok:
        print(f"        expected: {expected}")
        print(f"        actual:   {actual}")
    return ok


def _run_tests() -> int:
    print("=== parse_start_payload ===")
    cases = [
        # Generic source
        (
            "hero",
            {"kind": "source", "source": "hero", "raw": "hero"},
            "generic source: hero",
        ),
        (
            "portfolio",
            {"kind": "source", "source": "portfolio", "raw": "portfolio"},
            "generic source: portfolio",
        ),
        (
            "trust",
            {"kind": "source", "source": "trust", "raw": "trust"},
            "generic source: trust",
        ),
        # Pro calculator - Phase Calc-3 typical examples
        (
            "pro_zal_24_gulli",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "zal",
                "area_m2": 24,
                "ceiling_type_id": "gulli",
                "raw": "pro_zal_24_gulli",
            },
            "pro: zal . 24 . gulli",
        ),
        (
            "pro_yotoqxona_18_odnotonniy",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "yotoqxona",
                "area_m2": 18,
                "ceiling_type_id": "odnotonniy",
                "raw": "pro_yotoqxona_18_odnotonniy",
            },
            "pro: yotoqxona . 18 . odnotonniy",
        ),
        (
            "pro_oshxona_14_mramor",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "oshxona",
                "area_m2": 14,
                "ceiling_type_id": "mramor",
                "raw": "pro_oshxona_14_mramor",
            },
            "pro: oshxona . 14 . mramor",
        ),
        (
            "pro_koridor_10_uv-pechat",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "koridor",
                "area_m2": 10,
                "ceiling_type_id": "uv-pechat",
                "raw": "pro_koridor_10_uv-pechat",
            },
            "pro: koridor . 10 . uv-pechat (hyphenated ceiling id)",
        ),
        (
            "pro_zal_80_mramor",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "zal",
                "area_m2": 80,
                "ceiling_type_id": "mramor",
                "raw": "pro_zal_80_mramor",
            },
            "pro: max area (80)",
        ),
        # Unknown - invalid format
        ("", {"kind": "unknown", "source": "unknown", "raw": ""}, "empty payload"),
        (
            None,
            {"kind": "unknown", "source": "unknown", "raw": ""},
            "None payload",
        ),
        (
            "a" * 65,
            {"kind": "unknown", "source": "unknown", "raw": "a" * 65},
            "too long (>64 chars)",
        ),
        (
            "pro_zal_24_gulli$",
            {"kind": "unknown", "source": "unknown", "raw": "pro_zal_24_gulli$"},
            "illegal char ($)",
        ),
        (
            "pro_unknownroom_24_gulli",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_unknownroom_24_gulli",
            },
            "unknown room id",
        ),
        (
            "pro_zal_abc_gulli",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_abc_gulli",
            },
            "non-numeric area",
        ),
        (
            "pro_zal_24_unknownceiling",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_unknownceiling",
            },
            "unknown ceiling id",
        ),
        (
            "pro_zal_24_gulli_kitob",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_gulli_kitob",
            },
            "legacy Phase Calc-2 format (with district) -> unknown",
        ),
        (
            "pro_zal_24_gulli_kitob_3a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_gulli_kitob_3a",
            },
            "legacy Phase 3.5 format (with addon count) -> unknown",
        ),
        (
            "pro_zal_5_gulli",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_5_gulli",
            },
            "area below AREA_MIN (5 < 6)",
        ),
        (
            "pro_zal_100_gulli",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_100_gulli",
            },
            "area above AREA_MAX (100 > 80)",
        ),
        (
            "pro_zal_24",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24",
            },
            "pro_ prefix but missing ceiling (3 parts)",
        ),
        (
            "completelyrandomstring",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "completelyrandomstring",
            },
            "random non-prefixed string",
        ),
        (
            "price_zal_24_led_led-line-karniz",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "price_zal_24_led_led-line-karniz",
            },
            "legacy Phase 3 price_* payload -> unknown",
        ),
    ]
    fails = 0
    for raw, expected, label in cases:
        actual = parse_start_payload(raw)
        if not _expect(actual, expected, label):
            fails += 1

    print()
    print("=== calculate_estimate ===")
    e1 = calculate_estimate("zal", 24, "gulli")
    print(f"  zal . 24m2 . gulli -> {e1}")
    print(f"    formatted: {format_price_range(e1['min'], e1['max'])}")

    e2 = calculate_estimate("yotoqxona", 18, "odnotonniy")
    print(f"  yotoqxona . 18m2 . odnotonniy -> {e2}")
    print(f"    formatted: {format_price_range(e2['min'], e2['max'])}")

    e3 = calculate_estimate("oshxona", 14, "mramor")
    print(f"  oshxona . 14m2 . mramor -> {e3}")
    print(f"    formatted: {format_price_range(e3['min'], e3['max'])}")

    e4 = calculate_estimate("koridor", 10, "uv-pechat")
    print(f"  koridor . 10m2 . uv-pechat -> {e4}")
    print(f"    formatted: {format_price_range(e4['min'], e4['max'])}")

    print()
    if fails == 0:
        print(f"All parser tests passed.")
        return 0
    print(f"{fails} parser tests FAILED.")
    return 1


if __name__ == "__main__":
    import sys
    sys.exit(_run_tests())

"""
VashPotolok — Telegram bot /start payload parser (referans implementatsiya).

Bu fayl `docs/TELEGRAM_BOT_INTEGRATION.md` shartnomasiga muvofiq yozilgan.
Frontend qism: `src/lib/pro-price-estimate.ts` (`buildProTelegramPayload`).

Holat: bot loyihasi alohida repoda. Bu fayl — kontrakt referansi va sinov uchun.
Productionga ko'chirish: faylni o'sha repoga bemalol ko'chiring; standart kutubxonadan
boshqa hech narsa kerak emas.

Joriy format: pro_<room>_<area>_<ceiling>_<district>_<N>a (Phase 3.5+).
Eski price_* format Phase 3'da ishlatilgan va olib tashlangan.

Ishlatish:
    from telegram_payload_parser import parse_start_payload
    parsed = parse_start_payload("pro_zal_24_led_qarshi_3a")
    # → {"kind": "pro", "source": "pro", "room_type_id": "zal", ...}

Testlar:
    python telegram_payload_parser.py
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional, Union

# ---------------------------------------------------------------------------
# Stable kontrakt — `data/price-options.ts` bilan SYNCHRONIZED bo'lishi shart.
# Bu identifikatorlar har qanday o'zgarishi — breaking change.
# ---------------------------------------------------------------------------

ROOM_IDS = ("zal", "yotoqxona", "oshxona", "koridor")
CEILING_IDS = ("matoviy", "glyans", "satin", "led", "premium")
ADDON_IDS = ("led-line", "karniz", "lyustra", "spot", "pipe", "complex-corner")
DISTRICT_IDS = ("qarshi", "qashqadaryo", "far")
SOURCE_IDS = ("hero", "sticky", "footer", "portfolio", "price", "services", "trust")

# Telegram cheklovi
MAX_PAYLOAD_LEN = 64
ALLOWED_CHARS = re.compile(r"^[A-Za-z0-9_-]+$")
ADDON_COUNT_RE = re.compile(r"^(\d+)a$")

# Area uchun — frontend AREA_MIN_M2..AREA_MAX_M2 (6..80) bilan teng.
AREA_MIN = 6
AREA_MAX = 80

# Addon count chegarasi — kalkulyatordagi 6 ta addonga teng.
ADDON_COUNT_MAX = len(ADDON_IDS)

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
    # ['pro', room, area, ceiling, district, '<N>a']
    if len(parts) != 6:
        return _unknown(raw)

    _, room, area_str, ceiling, district, addons_seg = parts

    if room not in ROOM_IDS:
        return _unknown(raw)
    if ceiling not in CEILING_IDS:
        return _unknown(raw)
    if district not in DISTRICT_IDS:
        return _unknown(raw)

    try:
        area = int(area_str)
    except (TypeError, ValueError):
        return _unknown(raw)

    if not (AREA_MIN <= area <= AREA_MAX):
        return _unknown(raw)

    m = ADDON_COUNT_RE.match(addons_seg)
    if not m:
        return _unknown(raw)

    try:
        addon_count = int(m.group(1))
    except (TypeError, ValueError):
        return _unknown(raw)

    if not (0 <= addon_count <= ADDON_COUNT_MAX):
        return _unknown(raw)

    return {
        "kind": "pro",
        "source": "pro",
        "room_type_id": room,
        "area_m2": area,
        "ceiling_type_id": ceiling,
        "district_id": district,
        "addon_count": addon_count,
        "raw": raw,
    }


# ---------------------------------------------------------------------------
# Bonus: bot tomonida taxminiy narx hisoblash uchun (frontend
# pro-price-estimate.ts misli). Tablitsa qiymatlari
# `src/data/price-options.ts` bilan birxil bo'lishi shart.
#
# Addonlar payloadda yo'q — bu yerda faqat base + travel partial hisob.
# Aniq addon quantitylarni mijozdan bot welcome flow ichida olib, keyin
# to'liq hisob chiqarish kerak.
# ---------------------------------------------------------------------------

ROOM_MULTIPLIER = {
    "zal": 1.05,
    "yotoqxona": 1.0,
    "oshxona": 1.0,
    "koridor": 0.95,
}

CEILING_PRICE_PER_M2 = {
    # id → (min, max)
    "matoviy": (28_000, 38_000),
    "glyans":  (35_000, 48_000),
    "satin":   (42_000, 58_000),
    "led":     (60_000, 90_000),
    "premium": (80_000, 120_000),
}

ADDON_PRICE = {
    # id → (min, max). Payloadda yuborilmaydi — bot welcome'da
    # qaysi addonlar tanlangani aniqlangach ishlatiladi.
    "led-line":       (65_000, 95_000),
    "karniz":         (35_000, 60_000),
    "lyustra":        (50_000, 90_000),
    "spot":           (25_000, 45_000),
    "pipe":           (80_000, 140_000),
    "complex-corner": (60_000, 110_000),
}

DISTRICT_TRAVEL = {
    # id → (min, max)
    "qarshi":      (0, 0),
    "qashqadaryo": (80_000, 180_000),
    "far":         (200_000, 400_000),
}


def calculate_partial_estimate(
    room_type_id: str,
    area_m2: int,
    ceiling_type_id: str,
    district_id: str,
) -> Dict[str, int]:
    """Pro payloaddan derive bo'ladigan partial hisob (addonlarsiz).

    Frontend `calculateProEstimate` bilan **base + travel** qismi mos
    keladi. Aniq jami narx — addonlar mijozdan qayta tasdiqlangach.
    """
    multiplier = ROOM_MULTIPLIER.get(room_type_id)
    ceiling = CEILING_PRICE_PER_M2.get(ceiling_type_id)
    travel = DISTRICT_TRAVEL.get(district_id)
    if multiplier is None or ceiling is None or travel is None:
        return {"min": 0, "max": 0}

    p_min, p_max = ceiling
    t_min, t_max = travel
    base_min = p_min * area_m2 * multiplier
    base_max = p_max * area_m2 * multiplier

    return {
        "min": _round_to_thousand(base_min + t_min),
        "max": _round_to_thousand(base_max + t_max),
    }


def calculate_full_estimate(
    room_type_id: str,
    area_m2: int,
    ceiling_type_id: str,
    district_id: str,
    addon_quantities: Dict[str, int],
) -> Dict[str, int]:
    """Bot welcome flow yakunida — addonlar tasdiqlangach to'liq hisob.

    `addon_quantities`: `{"led-line": 6, "karniz": 4, "lyustra": 1}` shaklida.
    `pipe` va `complex-corner` `piece` unit'da, qolganlar ko'rsatilgan tartibga
    qarab. Frontend va bu yerdagi tablitsalar mos.
    """
    multiplier = ROOM_MULTIPLIER.get(room_type_id)
    ceiling = CEILING_PRICE_PER_M2.get(ceiling_type_id)
    travel = DISTRICT_TRAVEL.get(district_id)
    if multiplier is None or ceiling is None or travel is None:
        return {"min": 0, "max": 0}

    p_min, p_max = ceiling
    t_min, t_max = travel
    base_min = p_min * area_m2 * multiplier
    base_max = p_max * area_m2 * multiplier

    addon_min = 0
    addon_max = 0
    for aid, qty in addon_quantities.items():
        if qty <= 0:
            continue
        price = ADDON_PRICE.get(aid)
        if price is None:
            continue
        a_min, a_max = price
        addon_min += a_min * qty
        addon_max += a_max * qty

    return {
        "min": _round_to_thousand(base_min + addon_min + t_min),
        "max": _round_to_thousand(base_max + addon_max + t_max),
    }


def _round_to_thousand(v: float) -> int:
    return int(round(v / 1000) * 1000)


def format_uz_number(n: int) -> str:
    """Intl.NumberFormat('uz-UZ') ekvivalenti — guruh ajratuvchi sifatida space."""
    s = f"{n:,}".replace(",", " ")
    return s


def format_price_range(p_min: int, p_max: int) -> str:
    if p_min <= 0 and p_max <= 0:
        return "—"
    if p_min == p_max:
        return f"{format_uz_number(p_min)} so'm"
    return f"{format_uz_number(p_min)} — {format_uz_number(p_max)} so'm"


# ---------------------------------------------------------------------------
# Test cases — `python telegram_payload_parser.py` bilan yuriladi.
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
            "sticky",
            {"kind": "source", "source": "sticky", "raw": "sticky"},
            "generic source: sticky",
        ),
        (
            "price",
            {"kind": "source", "source": "price", "raw": "price"},
            "generic source: price (Phase 2 attribution)",
        ),
        # Pro calculator — typical examples
        (
            "pro_zal_24_led_qarshi_3a",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "zal",
                "area_m2": 24,
                "ceiling_type_id": "led",
                "district_id": "qarshi",
                "addon_count": 3,
                "raw": "pro_zal_24_led_qarshi_3a",
            },
            "pro: zal · 24 · led · qarshi · 3 addons",
        ),
        (
            "pro_yotoqxona_18_glyans_qarshi_0a",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "yotoqxona",
                "area_m2": 18,
                "ceiling_type_id": "glyans",
                "district_id": "qarshi",
                "addon_count": 0,
                "raw": "pro_yotoqxona_18_glyans_qarshi_0a",
            },
            "pro: yotoqxona · 18 · glyans · qarshi · 0 addons",
        ),
        (
            "pro_oshxona_14_satin_qashqadaryo_2a",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "oshxona",
                "area_m2": 14,
                "ceiling_type_id": "satin",
                "district_id": "qashqadaryo",
                "addon_count": 2,
                "raw": "pro_oshxona_14_satin_qashqadaryo_2a",
            },
            "pro: oshxona · 14 · satin · qashqadaryo · 2 addons (new ceiling: satin)",
        ),
        (
            "pro_koridor_10_premium_far_6a",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "koridor",
                "area_m2": 10,
                "ceiling_type_id": "premium",
                "district_id": "far",
                "addon_count": 6,
                "raw": "pro_koridor_10_premium_far_6a",
            },
            "pro: koridor · 10 · premium · far · 6 addons (all)",
        ),
        (
            "pro_zal_24_matoviy_qarshi_0a",
            {
                "kind": "pro",
                "source": "pro",
                "room_type_id": "zal",
                "area_m2": 24,
                "ceiling_type_id": "matoviy",
                "district_id": "qarshi",
                "addon_count": 0,
                "raw": "pro_zal_24_matoviy_qarshi_0a",
            },
            "pro: minimal (0 addons)",
        ),
        # Unknown — invalid format
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
            "pro_zal_24_led_qarshi_3a$",
            {"kind": "unknown", "source": "unknown", "raw": "pro_zal_24_led_qarshi_3a$"},
            "illegal char ($)",
        ),
        (
            "pro_unknownroom_24_led_qarshi_3a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_unknownroom_24_led_qarshi_3a",
            },
            "unknown room id",
        ),
        (
            "pro_zal_abc_led_qarshi_3a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_abc_led_qarshi_3a",
            },
            "non-numeric area",
        ),
        (
            "pro_zal_24_unknownceiling_qarshi_3a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_unknownceiling_qarshi_3a",
            },
            "unknown ceiling id",
        ),
        (
            "pro_zal_24_led_unknowndistrict_3a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_led_unknowndistrict_3a",
            },
            "unknown district id",
        ),
        (
            "pro_zal_24_led_qarshi_3",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_led_qarshi_3",
            },
            "addon segment missing 'a' suffix",
        ),
        (
            "pro_zal_24_led_qarshi_9a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_led_qarshi_9a",
            },
            "addon count > max (9 > 6)",
        ),
        (
            "pro_zal_5_led_qarshi_0a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_5_led_qarshi_0a",
            },
            "area below AREA_MIN (5 < 6)",
        ),
        (
            "pro_zal_100_led_qarshi_0a",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_100_led_qarshi_0a",
            },
            "area above AREA_MAX (100 > 80)",
        ),
        (
            "pro_zal_24_led_qarshi",
            {
                "kind": "unknown",
                "source": "unknown",
                "raw": "pro_zal_24_led_qarshi",
            },
            "pro_ prefix but missing addon segment (5 parts)",
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
            "legacy price_* payload (Phase 3) → unknown",
        ),
    ]
    fails = 0
    for raw, expected, label in cases:
        actual = parse_start_payload(raw)
        if not _expect(actual, expected, label):
            fails += 1

    print()
    print("=== calculate_partial_estimate (base + travel) ===")
    p1 = calculate_partial_estimate("zal", 24, "led", "qarshi")
    print(f"  zal · 24m² · led · qarshi -> {p1}")
    print(f"    formatted: {format_price_range(p1['min'], p1['max'])}")

    p2 = calculate_partial_estimate("yotoqxona", 18, "glyans", "qarshi")
    print(f"  yotoqxona · 18m² · glyans · qarshi -> {p2}")
    print(f"    formatted: {format_price_range(p2['min'], p2['max'])}")

    p3 = calculate_partial_estimate("koridor", 10, "premium", "far")
    print(f"  koridor · 10m² · premium · far -> {p3}")
    print(f"    formatted: {format_price_range(p3['min'], p3['max'])}")

    print()
    print("=== calculate_full_estimate (addonlar tasdiqlangach) ===")
    full1 = calculate_full_estimate(
        "zal", 24, "led", "qarshi",
        {"led-line": 6, "karniz": 4, "lyustra": 1},
    )
    print(f"  zal · 24 · led · qarshi · LED 6m + karniz 4m + lyustra 1 -> {full1}")
    print(f"    formatted: {format_price_range(full1['min'], full1['max'])}")

    print()
    if fails == 0:
        print(f"All parser tests passed.")
        return 0
    print(f"{fails} parser tests FAILED.")
    return 1


if __name__ == "__main__":
    import sys
    sys.exit(_run_tests())

"""Convert a downloaded product photo to public/products/<slug>.webp (800x800, white background)
and verify it. Usage:

    python -I scripts/process_image.py <input-file> <slug>

Exits non-zero and prints the reason if the input is not a usable product photo.
"""
import sys
from pathlib import Path

from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "products"
SIZE = 800
MIN_BYTES = 5 * 1024


def fail(msg: str) -> None:
    print(f"FAIL: {msg}")
    sys.exit(1)


def main() -> None:
    if len(sys.argv) != 3:
        fail("usage: process_image.py <input> <slug>")
    src, slug = Path(sys.argv[1]), sys.argv[2]

    if not src.exists() or src.stat().st_size < 2048:
        fail("input missing or too small")
    head = src.read_bytes()[:512].lstrip().lower()
    if head.startswith(b"<!doctype") or head.startswith(b"<html") or b"<html" in head:
        fail("input is an HTML page, not an image")

    try:
        img = Image.open(src)
        img.load()
    except Exception as e:  # noqa: BLE001
        fail(f"cannot open as image: {e}")

    w, h = img.size
    if min(w, h) < 300:
        fail(f"too small ({w}x{h})")
    ratio = max(w, h) / min(w, h)
    if ratio > 2.2:
        fail(f"aspect ratio {ratio:.2f} looks like a banner")

    # Flatten transparency onto white
    img = img.convert("RGBA")
    bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    bg.alpha_composite(img)
    img = bg.convert("RGB")

    # Pad to square on white, then resize
    side = max(img.size)
    canvas = Image.new("RGB", (side, side), (255, 255, 255))
    canvas.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    canvas = canvas.resize((SIZE, SIZE), Image.LANCZOS)

    # Reject near-blank images (placeholders)
    stat = ImageStat.Stat(canvas.convert("L"))
    if stat.stddev[0] < 6:
        fail("image is almost uniform (placeholder?)")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slug}.webp"
    canvas.save(out, "WEBP", quality=86, method=6)

    size = out.stat().st_size
    if size < MIN_BYTES:
        out.unlink()
        fail(f"output only {size} bytes")
    print(f"OK {out.name} {size // 1024}KB (source {w}x{h})")


if __name__ == "__main__":
    main()

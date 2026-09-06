"""Prepare Spai-Hub brand asset variants from the approved hex mark + lockup."""
from pathlib import Path
from PIL import Image

SRC_ICON = Path(r"C:\Users\Spaitrace\.cursor\projects\c-Users-Spaitrace-Desktop-SpaiHub\assets\spaihub-logo-2-hex.png")
SRC_LOCKUP = Path(r"C:\Users\Spaitrace\Desktop\SpaiHub\assets\logos\spaihub-logo-lockup-hex.png")
SRC_LOCKUP_DARK = Path(r"C:\Users\Spaitrace\.cursor\projects\c-Users-Spaitrace-Desktop-SpaiHub\assets\spaihub-logo-lockup-hex-dark.png")

OUT_PUBLIC = Path(r"C:\Users\Spaitrace\Desktop\SpaiHub\frontend\public\brand")
OUT_LOCAL = Path(r"C:\Users\Spaitrace\Desktop\SpaiHub\assets\logos")
OUT_PUBLIC.mkdir(parents=True, exist_ok=True)
OUT_LOCAL.mkdir(parents=True, exist_ok=True)


def make_transparent(img: Image.Image, threshold: int = 245) -> Image.Image:
    """Remove near-white background to alpha."""
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
    return rgba


def trim_transparent(img: Image.Image, pad: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(img.width, r + pad)
    b = min(img.height, b + pad)
    return img.crop((l, t, r, b))


def fit_square(img: Image.Image, size: int) -> Image.Image:
    """Contain image in a transparent square canvas."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    copy = img.copy()
    copy.thumbnail((size, size), Image.Resampling.LANCZOS)
    x = (size - copy.width) // 2
    y = (size - copy.height) // 2
    canvas.paste(copy, (x, y), copy)
    return canvas


def save(img: Image.Image, name: str):
    for folder in (OUT_PUBLIC, OUT_LOCAL):
        path = folder / name
        img.save(path, optimize=True)
        print(f"wrote {path}")


def main():
    icon_raw = Image.open(SRC_ICON)
    icon = trim_transparent(make_transparent(icon_raw), pad=12)
    save(icon, "icon.png")

    for size in (512, 256, 192, 128, 64, 48, 32):
        save(fit_square(icon, size), f"icon-{size}.png")

    # Apple touch prefers opaque background
    apple = Image.new("RGBA", (180, 180), (14, 20, 27, 255))
    mark = icon.copy()
    mark.thumbnail((148, 148), Image.Resampling.LANCZOS)
    apple.paste(mark, ((180 - mark.width) // 2, (180 - mark.height) // 2), mark)
    save(apple.convert("RGB").convert("RGBA"), "apple-touch-icon.png")
    # re-save as RGB PNG is fine
    apple_rgb = Image.new("RGB", (180, 180), (14, 20, 27))
    apple_rgb.paste(mark.convert("RGBA"), ((180 - mark.width) // 2, (180 - mark.height) // 2), mark)
    for folder in (OUT_PUBLIC, OUT_LOCAL):
        apple_rgb.save(folder / "apple-touch-icon.png", optimize=True)

    # Favicon multi-size ICO
    ico_sizes = [16, 32, 48]
    ico_images = [fit_square(icon, s) for s in ico_sizes]
    for folder in (OUT_PUBLIC, OUT_LOCAL):
        ico_path = folder / "favicon.ico"
        ico_images[-1].save(
            ico_path,
            format="ICO",
            sizes=[(s, s) for s in ico_sizes],
            append_images=ico_images[:-1],
        )
        print(f"wrote {ico_path}")

    # Lockups — keep original light; process dark if available
    lockup = make_transparent(Image.open(SRC_LOCKUP), threshold=250)
    lockup = trim_transparent(lockup, pad=16)
    save(lockup, "logo-lockup-light.png")

    if SRC_LOCKUP_DARK.exists():
        dark = Image.open(SRC_LOCKUP_DARK).convert("RGBA")
        # keep dark navy plate or strip near-white only
        pixels = dark.load()
        w, h = dark.size
        for y in range(h):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                # remove pure white / light gray canvas only
                if r > 230 and g > 230 and b > 230:
                    pixels[x, y] = (r, g, b, 0)
                # also treat very dark full-bleed plate as opaque brand plate — keep it
        dark = trim_transparent(dark, pad=16)
        save(dark, "logo-lockup-dark.png")

    # Monochrome teal-on-transparent icon for special uses: desaturate to teal-ish
    mono = icon.copy()
    # Keep as-is navy+teal — export alias
    save(fit_square(icon, 512), "icon-mark.png")

    print("done")


if __name__ == "__main__":
    main()

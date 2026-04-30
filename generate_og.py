from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
ASSETS = os.path.join(os.path.dirname(__file__), "assets")
OUT = os.path.dirname(__file__)

BG      = (10, 10, 12)
WHITE   = (255, 255, 255)
MUTED   = (160, 160, 175)

COLORS = {
    "red":    (255, 49, 49),
    "green":  (0, 191, 99),
    "blue":   (56, 182, 255),
    "yellow": (255, 222, 89),
}

BASE_URL = "diaknap.bankitatabanya.hu"

def load_font(size, bold=False):
    for p in [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/Arial Bold.ttf" if bold else "C:/Windows/Fonts/Arial.ttf",
    ]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def make_og(title, subtitle, label, accent_name, out_name):
    accent = COLORS[accent_name]
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # subtle gradient
    for i in range(H):
        t = i / H
        r = int(BG[0] + (accent[0] - BG[0]) * t * 0.10)
        g = int(BG[1] + (accent[1] - BG[1]) * t * 0.10)
        b = int(BG[2] + (accent[2] - BG[2]) * t * 0.10)
        draw.line([(0, i), (W, i)], fill=(r, g, b))

    # glow circle top-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = W - 60, -80
    for rad in range(320, 0, -1):
        a = int(35 * (rad / 320))
        gd.ellipse([cx - rad, cy - rad, cx + rad, cy + rad],
                   fill=(*accent, a))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    draw = ImageDraw.Draw(img)

    # bottom accent bar
    draw.rectangle([0, H - 5, W, H], fill=accent)

    # left accent bar
    draw.rectangle([0, 0, 5, H], fill=accent)

    # logo
    logo_path = os.path.join(ASSETS, "logo-dark.png")
    if os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA")
            lh = 50
            lw = int(logo.width * lh / logo.height)
            logo = logo.resize((lw, lh), Image.LANCZOS)
            img.paste(logo, (72, 58), logo)
            draw = ImageDraw.Draw(img)
        except Exception:
            pass

    # label pill
    f_label = load_font(14, bold=True)
    pill_x, pill_y = 72, 148
    lb = draw.textbbox((0, 0), label, font=f_label)
    pw = lb[2] - lb[0] + 28
    ph = lb[3] - lb[1] + 14
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pw, pill_y + ph],
                            radius=8, fill=accent)
    text_color = (10, 10, 12) if accent_name == "yellow" else WHITE
    draw.text((pill_x + 14, pill_y + 7), label, font=f_label, fill=text_color)

    # title (wrap at ~950px)
    f_title = load_font(76, bold=True)
    words = title.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        bb = draw.textbbox((0, 0), test, font=f_title)
        if bb[2] - bb[0] > 950 and cur:
            lines.append(cur)
            cur = w
        else:
            cur = test
    if cur:
        lines.append(cur)

    title_y = pill_y + ph + 26
    line_h = 88
    for i, line in enumerate(lines):
        draw.text((72, title_y + i * line_h), line, font=f_title, fill=WHITE)

    # subtitle
    f_sub = load_font(22)
    sub_y = title_y + len(lines) * line_h + 18
    draw.text((72, sub_y), subtitle, font=f_sub, fill=MUTED)

    # domain tag bottom-right
    f_tag = load_font(15, bold=True)
    tag_bb = draw.textbbox((0, 0), BASE_URL, font=f_tag)
    draw.text((W - (tag_bb[2] - tag_bb[0]) - 44, H - 34), BASE_URL, font=f_tag, fill=MUTED)

    out_path = os.path.join(OUT, "assets", out_name)
    img.save(out_path, "PNG", optimize=True)
    print(f"Saved: {out_path}")


# Main page — 4 variants
make_og(
    title="Bánki Diáknap 2026",
    subtitle="2026. május 15.  •  TSZC Bánki Donát – Péch Antal Technikum",
    label="DIÁKNAP",
    accent_name="red",
    out_name="og-index-red.png",
)
make_og(
    title="Bánki Diáknap 2026",
    subtitle="2026. május 15.  •  TSZC Bánki Donát – Péch Antal Technikum",
    label="DIÁKNAP",
    accent_name="green",
    out_name="og-index-green.png",
)
make_og(
    title="Bánki Diáknap 2026",
    subtitle="2026. május 15.  •  TSZC Bánki Donát – Péch Antal Technikum",
    label="DIÁKNAP",
    accent_name="blue",
    out_name="og-index-blue.png",
)
make_og(
    title="Bánki Diáknap 2026",
    subtitle="2026. május 15.  •  TSZC Bánki Donát – Péch Antal Technikum",
    label="DIÁKNAP",
    accent_name="yellow",
    out_name="og-index-yellow.png",
)

# Hozzaferes page — 4 variants
make_og(
    title="Részvételi feltételek",
    subtitle="Bánki Diáknap 2026  •  2026. május 15.",
    label="TÁJÉKOZTATÓ",
    accent_name="red",
    out_name="og-hozzaferes-red.png",
)
make_og(
    title="Részvételi feltételek",
    subtitle="Bánki Diáknap 2026  •  2026. május 15.",
    label="TÁJÉKOZTATÓ",
    accent_name="green",
    out_name="og-hozzaferes-green.png",
)
make_og(
    title="Részvételi feltételek",
    subtitle="Bánki Diáknap 2026  •  2026. május 15.",
    label="TÁJÉKOZTATÓ",
    accent_name="blue",
    out_name="og-hozzaferes-blue.png",
)
make_og(
    title="Részvételi feltételek",
    subtitle="Bánki Diáknap 2026  •  2026. május 15.",
    label="TÁJÉKOZTATÓ",
    accent_name="yellow",
    out_name="og-hozzaferes-yellow.png",
)

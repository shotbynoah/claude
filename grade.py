#!/usr/bin/env python3
"""Moody film-emulation color grade to match the reference engagement/wedding aesthetic.
Faithful color grade only (no regeneration) — subjects/details untouched, only tone & color."""
import numpy as np
from PIL import Image, ImageFilter
import sys, os

def srgb_to_linear(c):
    a = 0.055
    return np.where(c <= 0.04045, c / 12.92, ((c + a) / (1 + a)) ** 2.4)

def linear_to_srgb(c):
    a = 0.055
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, (1 + a) * (c ** (1/2.4)) - a)

def curve(x, xs, ys):
    """Piecewise tone curve via interpolation on control points."""
    return np.interp(x, xs, ys)

def rgb_to_hsv(rgb):
    r, g, b = rgb[...,0], rgb[...,1], rgb[...,2]
    mx = np.max(rgb, axis=-1); mn = np.min(rgb, axis=-1)
    df = mx - mn + 1e-8
    h = np.zeros_like(mx)
    mask = mx == r
    h[mask] = (60 * ((g[mask]-b[mask])/df[mask]) + 360) % 360
    mask = mx == g
    h[mask] = (60 * ((b[mask]-r[mask])/df[mask]) + 120) % 360
    mask = mx == b
    h[mask] = (60 * ((r[mask]-g[mask])/df[mask]) + 240) % 360
    s = np.where(mx == 0, 0, df/(mx+1e-8))
    v = mx
    return h, s, v

def hsv_to_rgb(h, s, v):
    c = v * s
    x = c * (1 - np.abs((h/60) % 2 - 1))
    m = v - c
    z = np.zeros_like(h)
    conds = [(h<60),(h<120),(h<180),(h<240),(h<300),(h<=360)]
    rs = [c,x,z,z,x,c]; gs=[x,c,c,x,z,z]; bs=[z,z,x,c,c,x]
    r = np.select(conds, rs); g = np.select(conds, gs); b = np.select(conds, bs)
    return np.stack([r+m, g+m, b+m], axis=-1)

def grade(path, out):
    img = Image.open(path).convert('RGB')
    arr = np.asarray(img).astype(np.float32) / 255.0
    orig_size = img.size

    # luminance (for split-tone masks) in perceptual space
    lum = 0.2126*arr[...,0] + 0.7152*arr[...,1] + 0.0722*arr[...,2]

    # --- 1. Tame highlights, lift blacks: matte film tone curve per-channel base ---
    xs = np.array([0.0, 0.12, 0.30, 0.55, 0.80, 1.0])
    # lifted toe (faded blacks ~0.075), gently compressed highlights (~0.93), soft contrast
    ys = np.array([0.075, 0.16, 0.32, 0.55, 0.78, 0.93])
    for ch in range(3):
        arr[...,ch] = curve(arr[...,ch], xs, ys)

    # --- 2. White balance / channel tint: cool-neutral with green-olive lean ---
    # slightly pull red in shadows, add green, keep blue soft
    arr[...,0] *= 0.985   # red down a hair (removes sunny warmth)
    arr[...,1] *= 1.010   # green up (olive/garden cast)
    arr[...,2] *= 0.995

    # --- 3. Split toning: olive-green shadows, warm cream highlights ---
    shadow_mask = np.clip(1.0 - lum*1.6, 0, 1)[...,None]      # strongest in darks
    highlight_mask = np.clip((lum-0.55)/0.45, 0, 1)[...,None] # strongest in brights
    shadow_tint = np.array([0.86, 0.98, 0.84])   # green-olive
    highlight_tint = np.array([1.03, 1.00, 0.94])# warm cream
    arr = arr * (1 - shadow_mask*0.16) + (arr*shadow_tint) * (shadow_mask*0.16)
    arr = arr * (1 - highlight_mask*0.12) + (arr*highlight_tint) * (highlight_mask*0.12)

    # --- 4. Desaturate + selective HSL (mute, but keep foliage alive) ---
    arr = np.clip(arr, 0, 1)
    h, s, v = rgb_to_hsv(arr)
    s *= 0.72                     # global desaturation ~28%
    # push greens slightly toward olive/yellow, keep them a touch more saturated
    green = (h>70)&(h<170)
    h[green] = h[green] - 8       # toward yellow-olive
    s[green] *= 1.08
    # calm skin/orange so faces read natural, not sunburnt
    skin = (h>=15)&(h<=45)
    s[skin] *= 0.90
    arr = hsv_to_rgb(h, np.clip(s,0,1), v)

    # --- 5. Gentle overall contrast pull toward matte (S-curve, mild) ---
    arr = np.clip(arr, 0, 1)
    xs2 = np.array([0.0, 0.25, 0.5, 0.75, 1.0])
    ys2 = np.array([0.02, 0.24, 0.5, 0.76, 0.965])
    arr = curve(arr, xs2, ys2)

    # --- 6. Fine film grain ---
    rng = np.random.default_rng(42)
    grain = rng.normal(0, 0.012, arr.shape[:2])[...,None]
    arr = np.clip(arr + grain, 0, 1)

    # --- 7. Subtle vignette for cinematic focus ---
    hh, ww = arr.shape[:2]
    yy, xx = np.mgrid[0:hh, 0:ww]
    cy, cx = hh/2, ww/2
    d = np.sqrt(((xx-cx)/(ww/2))**2 + ((yy-cy)/(hh/2))**2)
    vig = np.clip(1 - (d-0.7)*0.18, 0.86, 1.0)[...,None]
    arr = arr * vig

    out_img = Image.fromarray((np.clip(arr,0,1)*255).astype(np.uint8))
    out_img.save(out, quality=94, subsampling=0)
    print(f"  saved {out}  ({orig_size[0]}x{orig_size[1]})")

if __name__ == '__main__':
    files = sys.argv[1:]
    for f in files:
        base = os.path.basename(f).rsplit('.',1)[0]
        out = f"/home/user/claude/graded/{base}_graded.jpg"
        os.makedirs('/home/user/claude/graded', exist_ok=True)
        print(f"Grading {base}...")
        grade(f, out)
    print("Done.")

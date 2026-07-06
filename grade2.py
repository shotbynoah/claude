#!/usr/bin/env python3
"""v2 — MUCH moodier grade to match the dark, crushed-olive, overcast film reference.
Aggressive: pull exposure down, heavy desaturation, strong olive/green cast, matte blacks."""
import numpy as np
from PIL import Image
import sys, os

def curve(x, xs, ys):
    return np.interp(x, xs, ys)

def rgb_to_hsv(rgb):
    r, g, b = rgb[...,0], rgb[...,1], rgb[...,2]
    mx = np.max(rgb, axis=-1); mn = np.min(rgb, axis=-1)
    df = mx - mn + 1e-8
    h = np.zeros_like(mx)
    m = mx == r; h[m] = (60*((g[m]-b[m])/df[m])+360) % 360
    m = mx == g; h[m] = (60*((b[m]-r[m])/df[m])+120) % 360
    m = mx == b; h[m] = (60*((r[m]-g[m])/df[m])+240) % 360
    s = np.where(mx==0, 0, df/(mx+1e-8)); v = mx
    return h, s, v

def hsv_to_rgb(h, s, v):
    c = v*s; x = c*(1-np.abs((h/60)%2-1)); m = v-c; z = np.zeros_like(h)
    conds=[(h<60),(h<120),(h<180),(h<240),(h<300),(h<=360)]
    r=np.select(conds,[c,x,z,z,x,c]); g=np.select(conds,[x,c,c,x,z,z]); b=np.select(conds,[z,z,x,c,c,x])
    return np.stack([r+m,g+m,b+m],axis=-1)

def grade(path, out):
    img = Image.open(path).convert('RGB')
    arr = np.asarray(img).astype(np.float32)/255.0
    sz = img.size
    lum = 0.2126*arr[...,0]+0.7152*arr[...,1]+0.0722*arr[...,2]

    # --- 1. Pull exposure DOWN hard + matte lifted blacks (moody overcast) ---
    xs = np.array([0.0, 0.15, 0.35, 0.60, 0.82, 1.0])
    ys = np.array([0.055, 0.13, 0.26, 0.42, 0.60, 0.80])  # highlights crushed 1.0->0.80, mids way down
    for ch in range(3):
        arr[...,ch] = curve(arr[...,ch], xs, ys)

    # --- 2. White balance: kill sunny warmth, push olive/green-gray ---
    arr[...,0] *= 0.94    # red down (removes golden/skin warmth)
    arr[...,1] *= 1.015   # green up
    arr[...,2] *= 0.97    # blue down slightly -> greenish, not blue

    # --- 3. Heavy split-tone: deep olive shadows, muted khaki highlights ---
    lum2 = 0.2126*arr[...,0]+0.7152*arr[...,1]+0.0722*arr[...,2]
    sh = np.clip(1.0 - lum2*1.5, 0, 1)[...,None]
    hi = np.clip((lum2-0.5)/0.5, 0, 1)[...,None]
    shadow_tint = np.array([0.80, 0.96, 0.82])   # deep olive/green
    hi_tint     = np.array([0.98, 0.99, 0.86])   # muted khaki (NOT bright cream)
    arr = arr*(1-sh*0.28) + (arr*shadow_tint)*(sh*0.28)
    arr = arr*(1-hi*0.22) + (arr*hi_tint)*(hi*0.22)

    # --- 4. Heavy desaturation + olive HSL ---
    arr = np.clip(arr,0,1)
    h,s,v = rgb_to_hsv(arr)
    s *= 0.55                      # ~45% desaturation
    green=(h>65)&(h<175); h[green]-=12; s[green]*=1.05   # greens -> olive
    skin=(h>=15)&(h<=45); s[skin]*=0.80                  # calm skin
    blue=(h>=180)&(h<=260); s[blue]*=0.6                 # kill blue sky pop
    arr = hsv_to_rgb(h, np.clip(s,0,1), v)

    # --- 5. Lower contrast, keep matte + slight overall darkening ---
    arr = np.clip(arr,0,1)
    xs2=np.array([0.0,0.25,0.5,0.75,1.0]); ys2=np.array([0.03,0.21,0.44,0.66,0.86])
    arr = curve(arr, xs2, ys2)

    # --- 6. Grain + vignette ---
    rng = np.random.default_rng(7)
    arr = np.clip(arr + rng.normal(0,0.014,arr.shape[:2])[...,None], 0, 1)
    hh,ww=arr.shape[:2]; yy,xx=np.mgrid[0:hh,0:ww]
    d=np.sqrt(((xx-ww/2)/(ww/2))**2+((yy-hh/2)/(hh/2))**2)
    vig=np.clip(1-(d-0.6)*0.26,0.78,1.0)[...,None]
    arr = arr*vig

    Image.fromarray((np.clip(arr,0,1)*255).astype(np.uint8)).save(out, quality=94, subsampling=0)
    print(f"  {out}  ({sz[0]}x{sz[1]})")

if __name__=='__main__':
    os.makedirs('/home/user/claude/graded_v2', exist_ok=True)
    for f in sys.argv[1:]:
        base=os.path.basename(f).rsplit('.',1)[0]
        grade(f, f"/home/user/claude/graded_v2/{base}_v2.jpg")
    print("Done.")

#!/usr/bin/env python3
"""v4 — FADED FILM MATTE. The classic wedding-film look: hazy lifted blacks,
muted pastel tones, soft low contrast, gentle warmth. Tasteful, NOT overcooked."""
import numpy as np
from PIL import Image
import sys, os

def curve(x, xs, ys): return np.interp(x, xs, ys)

def rgb_to_hsv(rgb):
    r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
    mx=np.max(rgb,axis=-1); mn=np.min(rgb,axis=-1); df=mx-mn+1e-8
    h=np.zeros_like(mx)
    m=mx==r; h[m]=(60*((g[m]-b[m])/df[m])+360)%360
    m=mx==g; h[m]=(60*((b[m]-r[m])/df[m])+120)%360
    m=mx==b; h[m]=(60*((r[m]-g[m])/df[m])+240)%360
    s=np.where(mx==0,0,df/(mx+1e-8)); v=mx
    return h,s,v

def hsv_to_rgb(h,s,v):
    c=v*s; x=c*(1-np.abs((h/60)%2-1)); m=v-c; z=np.zeros_like(h)
    cn=[(h<60),(h<120),(h<180),(h<240),(h<300),(h<=360)]
    r=np.select(cn,[c,x,z,z,x,c]); g=np.select(cn,[x,c,c,x,z,z]); b=np.select(cn,[z,z,x,c,c,x])
    return np.stack([r+m,g+m,b+m],axis=-1)

def grade(path, out):
    img=Image.open(path).convert('RGB')
    arr=np.asarray(img).astype(np.float32)/255.0
    sz=img.size
    lum=0.2126*arr[...,0]+0.7152*arr[...,1]+0.0722*arr[...,2]

    # --- 1. Faded matte curve: notably lifted blacks (haze), soft highlight rolloff, low contrast ---
    xs=np.array([0.0, 0.20, 0.45, 0.70, 1.0])
    ys=np.array([0.085, 0.24, 0.46, 0.68, 0.90])   # blacks->0.085 (faded), whites->0.90 (soft)
    for ch in range(3):
        arr[...,ch]=curve(arr[...,ch], xs, ys)

    # --- 2. Gentle, tasteful split: warm cream highlights, faintly cool shadows (subtle!) ---
    lum2=0.2126*arr[...,0]+0.7152*arr[...,1]+0.0722*arr[...,2]
    sh=np.clip(1.0-lum2*1.5,0,1)[...,None]
    hi=np.clip((lum2-0.5)/0.5,0,1)[...,None]
    shadow_tint=np.array([0.99,1.00,1.02])   # barely cool
    hi_tint=np.array([1.02,1.00,0.975])      # warm cream
    arr=arr*(1-sh*0.10)+(arr*shadow_tint)*(sh*0.10)
    arr=arr*(1-hi*0.10)+(arr*hi_tint)*(hi*0.10)

    # --- 3. Muted pastel: desaturate ~20% ---
    arr=np.clip(arr,0,1)
    h,s,v=rgb_to_hsv(arr)
    s*=0.80
    arr=hsv_to_rgb(h,np.clip(s,0,1),v)

    # --- 4. Fine grain ---
    rng=np.random.default_rng(21)
    arr=np.clip(arr+rng.normal(0,0.009,arr.shape[:2])[...,None],0,1)

    Image.fromarray((np.clip(arr,0,1)*255).astype(np.uint8)).save(out,quality=95,subsampling=0)
    print(f"  {out}  ({sz[0]}x{sz[1]})")

if __name__=='__main__':
    os.makedirs('/home/user/claude/graded_v4',exist_ok=True)
    for f in sys.argv[1:]:
        base=os.path.basename(f).rsplit('.',1)[0]
        grade(f, f"/home/user/claude/graded_v4/{base}_v4.jpg")
    print("Done.")

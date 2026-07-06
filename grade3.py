#!/usr/bin/env python3
"""v3 — RESTRAINED natural film look. Subtle. No heavy tinting, no olive, no crush.
The reference mood = soft overcast light + gentle film character, not aggressive color."""
import numpy as np
from PIL import Image
import sys, os

def curve(x, xs, ys):
    return np.interp(x, xs, ys)

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

    # --- 1. Very gentle matte: lift blacks a touch, soft highlight rolloff. Keep brightness. ---
    xs=np.array([0.0, 0.25, 0.5, 0.75, 1.0])
    ys=np.array([0.025, 0.25, 0.50, 0.74, 0.965])   # barely-there; keeps natural exposure
    for ch in range(3):
        arr[...,ch]=curve(arr[...,ch], xs, ys)

    # --- 2. Tiny warm-neutral balance (NO green). Keeps skin healthy. ---
    arr[...,0]*=1.008   # hair of warmth
    arr[...,2]*=0.992   # pull blue slightly for warmth

    # --- 3. Mild desaturation only (~12%). ---
    arr=np.clip(arr,0,1)
    h,s,v=rgb_to_hsv(arr)
    s*=0.88
    arr=hsv_to_rgb(h,np.clip(s,0,1),v)

    # --- 4. Fine subtle grain. ---
    rng=np.random.default_rng(11)
    arr=np.clip(arr+rng.normal(0,0.008,arr.shape[:2])[...,None],0,1)

    Image.fromarray((np.clip(arr,0,1)*255).astype(np.uint8)).save(out,quality=95,subsampling=0)
    print(f"  {out}  ({sz[0]}x{sz[1]})")

if __name__=='__main__':
    os.makedirs('/home/user/claude/graded_v3',exist_ok=True)
    for f in sys.argv[1:]:
        base=os.path.basename(f).rsplit('.',1)[0]
        grade(f, f"/home/user/claude/graded_v3/{base}_v3.jpg")
    print("Done.")

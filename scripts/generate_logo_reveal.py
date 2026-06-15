import json
import math

W, H = 1008, 400
FR = 30
OP = 150

GREEN = [0.455, 0.690, 0.149, 1]
CREAM = [0.953, 1.0, 0.906, 1]
MOUNTAIN_1 = [0.176, 0.302, 0.098, 1]
MOUNTAIN_2 = [0.290, 0.451, 0.176, 1]
GOLD = [1.0, 0.722, 0.302, 1]
GOLD_SOFT = [1.0, 0.835, 0.502, 1]
TRUNK = [0.357, 0.235, 0.157, 1]
COCONUT = [0.302, 0.196, 0.122, 1]

EASE_O = {"x": [0.42], "y": [0]}
EASE_I = {"x": [0.58], "y": [1]}
LIN_O = {"x": [0], "y": [0]}
LIN_I = {"x": [1], "y": [1]}


def static(v):
    return {"a": 0, "k": v}


def _kf(points, o, i):
    k = []
    for idx, (t, v) in enumerate(points):
        kf = {"t": t, "s": v if isinstance(v, list) else [v]}
        if idx < len(points) - 1:
            kf["i"] = dict(i)
            kf["o"] = dict(o)
        k.append(kf)
    return {"a": 1, "k": k}


def anim(points):
    return _kf(points, EASE_O, EASE_I)


def lin(points):
    return _kf(points, LIN_O, LIN_I)


def circle_path(cx, cy, r):
    k = 0.5523 * r
    return {
        "i": [[-k, 0], [0, -k], [k, 0], [0, k]],
        "o": [[k, 0], [0, k], [-k, 0], [0, -k]],
        "v": [[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]],
        "c": True,
    }


def transform(p=None, a=None, s=None, r=None, o=None):
    return {
        "ty": "tr",
        "p": p if p is not None else static([0, 0]),
        "a": a if a is not None else static([0, 0]),
        "s": s if s is not None else static([100, 100]),
        "r": r if r is not None else static(0),
        "o": o if o is not None else static(100),
    }


def fill(color, opacity=None):
    return {"ty": "fl", "nm": "fill", "c": static(color), "o": opacity if opacity is not None else static(100)}


def stroke(color, width, opacity=None):
    return {
        "ty": "st", "nm": "stroke", "c": static(color),
        "o": opacity if opacity is not None else static(100),
        "w": width if isinstance(width, dict) else static(width),
        "lc": 2, "lj": 2,
    }


def ellipse_shape(size):
    return {"ty": "el", "nm": "ellipse", "p": static([0, 0]), "s": size if isinstance(size, dict) else static(size)}


def rect_shape(size, radius=0):
    return {"ty": "rc", "nm": "rect", "p": static([0, 0]), "s": static(size), "r": static(radius)}


def path_shape(verts, in_t, out_t, closed=False):
    return {"ty": "sh", "nm": "path", "ks": static({"i": in_t, "o": out_t, "v": verts, "c": closed})}


def trim(e_points, s_val=0):
    return {"ty": "tm", "nm": "trim", "s": static(s_val), "e": lin(e_points), "o": static(0), "m": 1}


FADE_ENV = anim([(0, 0), (8, 100), (142, 100), (150, 0)])


def shape_layer(ind, nm, shapes, opacity=None, masks=None):
    layer = {
        "ddd": 0, "ind": ind, "ty": 4, "nm": nm, "sr": 1,
        "ks": {
            "o": opacity if opacity is not None else static(100),
            "r": static(0),
            "p": static([0, 0, 0]),
            "a": static([0, 0, 0]),
            "s": static([100, 100, 100]),
        },
        "ao": 0,
        "shapes": shapes,
        "ip": 0, "op": OP, "st": 0, "bm": 0,
    }
    if masks:
        layer["masksProperties"] = masks
    return layer


# ---------------------------------------------------------------------------
# Layer 8 (back-most): Icon scene — sunrise behind mountains, masked to circle
# ---------------------------------------------------------------------------
ICON_CX, ICON_CY, ICON_R = 760, 160, 70

mountain1 = {
    "ty": "gr", "nm": "mountain-1", "bm": 0,
    "it": [
        path_shape([[725, 108], [682, 236], [770, 236]], [[0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0]], True),
        fill(MOUNTAIN_1),
        transform(),
    ],
}
mountain2 = {
    "ty": "gr", "nm": "mountain-2", "bm": 0,
    "it": [
        path_shape([[798, 124], [752, 236], [848, 236]], [[0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0]], True),
        fill(MOUNTAIN_2),
        transform(),
    ],
}
horizon = {
    "ty": "gr", "nm": "horizon", "bm": 0,
    "it": [
        rect_shape([170, 2]),
        fill(CREAM, static(30)),
        transform(p=static([ICON_CX, 184])),
    ],
}
glow = {
    "ty": "gr", "nm": "glow", "bm": 0,
    "it": [
        ellipse_shape(anim([(0, [40, 40]), (30, [240, 240]), (140, [240, 240]), (150, [120, 120])])),
        fill(GOLD_SOFT, anim([(0, 0), (30, 38), (138, 38), (145, 55), (150, 0)])),
        transform(p=static([ICON_CX, 128])),
    ],
}
sun = {
    "ty": "gr", "nm": "sun", "bm": 0,
    "it": [
        ellipse_shape(static([48, 48])),
        fill(GOLD, anim([(0, 0), (10, 100), (140, 100), (150, 0)])),
        transform(p=anim([(0, [ICON_CX, 250]), (28, [ICON_CX, 132]), (140, [ICON_CX, 116]), (150, [ICON_CX, 116])])),
    ],
}

icon_mask = [{
    "inv": False, "mode": "a",
    "pt": static(circle_path(ICON_CX, ICON_CY, ICON_R)),
    "o": static(100),
    "x": static(0),
}]

icon_scene = shape_layer(8, "IconScene", [mountain1, mountain2, horizon, glow, sun], opacity=FADE_ENV, masks=icon_mask)

# ---------------------------------------------------------------------------
# Layer 7: Coconut tree — trunk draws, fronds unfurl + sway
# ---------------------------------------------------------------------------
TREE_X, TREE_Y = 800, 65

trunk = {
    "ty": "gr", "nm": "trunk", "bm": 0,
    "it": [
        path_shape([[815, 236], [800, 65]], [[0, 0], [-8, -90]], [[8, 70], [0, 0]], False),
        stroke(TRUNK, static(11)),
        trim([(18, 0), (34, 100)]),
        transform(),
    ],
}

LEAF_ANGLES = [-150, -115, -90, -65, -30]


def leaf_rotation_kf(angle, unfurl_start):
    settle = unfurl_start + 12
    pts = [(unfurl_start, angle - 30), (settle, angle)]
    t = settle
    sign = 1
    while t < 139:
        t = min(t + 14, 140)
        pts.append((t, angle + sign * 5))
        sign *= -1
        if t >= 140:
            break
    return pts


leaves = []
for idx, ang in enumerate(LEAF_ANGLES):
    rad = math.radians(ang)
    pos = [TREE_X + math.cos(rad) * 48, TREE_Y + math.sin(rad) * 48]
    unfurl_start = 32 + idx * 6
    leaves.append({
        "ty": "gr", "nm": f"leaf-{idx}", "bm": 0,
        "it": [
            ellipse_shape(static([140, 20])),
            fill(GREEN),
            transform(
                p=static(pos),
                s=anim([(unfurl_start, [0, 0]), (unfurl_start + 12, [100, 100])]),
                r=anim(leaf_rotation_kf(ang, unfurl_start)),
            ),
        ],
    })

tree = shape_layer(7, "Tree", leaves + [trunk], opacity=FADE_ENV)

# ---------------------------------------------------------------------------
# Layer 6: Falling coconut + glow trail, arcs into the writing pen
# ---------------------------------------------------------------------------
coconut_pos = anim([
    (55, [805, 75]),
    (72, [805, 210]),
    (80, [35, 255]),
    (96, [300, 236]),
    (108, [560, 266]),
    (120, [975, 246]),
])

coconut_body = {
    "ty": "gr", "nm": "coconut-body", "bm": 0,
    "it": [
        ellipse_shape(static([30, 30])),
        fill(COCONUT, anim([(0, 0), (55, 0), (58, 100), (118, 100), (124, 0), (150, 0)])),
        transform(p=coconut_pos),
    ],
}

coconut_trail = {
    "ty": "gr", "nm": "coconut-trail", "bm": 0,
    "it": [
        path_shape([[805, 75], [805, 210]], [[0, 0], [0, 0]], [[0, 0], [0, 0]], False),
        stroke(GOLD_SOFT, static(6), anim([(55, 80), (72, 80), (80, 0), (150, 0)])),
        trim([(55, 0), (72, 100)]),
        transform(),
    ],
}

coconut = shape_layer(6, "Coconut", [coconut_body, coconut_trail])

# ---------------------------------------------------------------------------
# Layer 5: Writing — pen-stroke swoosh + icon outline trace
# ---------------------------------------------------------------------------
underline = {
    "ty": "gr", "nm": "underline", "bm": 0,
    "it": [
        path_shape(
            [[35, 255], [300, 236], [560, 266], [975, 246]],
            [[-80, 0], [-80, 0], [-80, 0], [-80, 0]],
            [[80, 0], [80, 0], [80, 0], [80, 0]],
            False,
        ),
        stroke(GREEN, static(5)),
        trim([(80, 0), (118, 100)]),
        transform(),
    ],
}

icon_outline = {
    "ty": "gr", "nm": "icon-outline", "bm": 0,
    "it": [
        ellipse_shape(static([150, 150])),
        stroke(GOLD, static(4)),
        trim([(98, 0), (116, 100)]),
        transform(p=static([ICON_CX, ICON_CY])),
    ],
}

writing_env = anim([(0, 0), (80, 0), (83, 100), (118, 100), (130, 0), (150, 0)])
writing = shape_layer(5, "Writing", [underline, icon_outline], opacity=writing_env)

# ---------------------------------------------------------------------------
# Layer 4: Logo PNG reveal
# ---------------------------------------------------------------------------
logo_png = {
    "ddd": 0, "ind": 4, "ty": 2, "nm": "Logo", "refId": "image_0", "sr": 1,
    "ks": {
        "o": anim([(0, 0), (108, 0), (128, 100), (140, 100), (150, 0)]),
        "r": static(0),
        "p": static([W / 2, H / 2, 0]),
        "a": static([2016, 800.5, 0]),
        "s": static([25, 25, 100]),
    },
    "ao": 0,
    "ip": 0, "op": OP, "st": 0, "bm": 0,
}

# ---------------------------------------------------------------------------
# Layer 3: Particles — dissolve / converge toward the sun for the loop
# ---------------------------------------------------------------------------
particles = []
for idx in range(6):
    ang = math.radians(idx * 60)
    outer = [ICON_CX + math.cos(ang) * 90, ICON_CY + math.sin(ang) * 90]
    inner = [ICON_CX + math.cos(ang) * 18, ICON_CY + math.sin(ang) * 18]
    color = GOLD if idx % 2 == 0 else CREAM
    t0, t1, t2 = 140 + idx * 1.2, 144 + idx * 1.2, 150
    particles.append({
        "ty": "gr", "nm": f"particle-{idx}", "bm": 0,
        "it": [
            ellipse_shape(static([12, 12])),
            fill(color, anim([(t0, 0), (t1, 75), (t2, 0)])),
            transform(p=anim([(t0, outer), (t2, inner)])),
        ],
    })

particles_layer = shape_layer(3, "Particles", particles)

# ---------------------------------------------------------------------------
# Layer 2: Light sweep across the finished logo (screen blend)
# ---------------------------------------------------------------------------
sweep = {
    "ty": "gr", "nm": "sweep", "bm": 0,
    "it": [
        rect_shape([300, 700]),
        fill(CREAM),
        transform(p=anim([(130, [-250, 200]), (148, [1300, 200])]), r=static(18)),
    ],
}
sweep_layer = shape_layer(2, "LightSweep", [sweep], opacity=anim([(0, 0), (130, 0), (136, 40), (148, 0), (150, 0)]))
sweep_layer["bm"] = 2

# ---------------------------------------------------------------------------
# Note: the tagline is rendered as an HTML overlay (see LogoRevealLoader),
# not as a Lottie text layer — lottie-web's SVG text-measurement path throws
# during buildAllItems for hand-authored text layers, which aborts the
# entire render and leaves the whole composition blank.
# ---------------------------------------------------------------------------
data = {
    "v": "5.9.0",
    "fr": FR,
    "ip": 0,
    "op": OP,
    "w": W,
    "h": H,
    "nm": "logo-reveal",
    "ddd": 0,
    "assets": [
        {"id": "image_0", "w": 4032, "h": 1601, "u": "", "p": "/gonomadigologo.png", "e": 0},
    ],
    "layers": [sweep_layer, particles_layer, logo_png, coconut, writing, tree, icon_scene],
}

with open("public/logo-reveal.json", "w") as f:
    json.dump(data, f)

print("wrote public/logo-reveal.json")

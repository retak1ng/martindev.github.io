function Jt(t, e) {
    t.indexOf(e) === -1 && t.push(e)
}
function Qt(t, e) {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
}
const Dt = (t,e,n)=>Math.min(Math.max(n, t), e)
  , w = {
    duration: .3,
    delay: 0,
    endDelay: 0,
    repeat: 0,
    easing: "ease"
}
  , P = t=>typeof t == "number"
  , x = t=>Array.isArray(t) && !P(t[0])
  , Zt = (t,e,n)=>{
    const i = e - t;
    return ((n - t) % i + i) % i + t
}
;
function Pt(t, e) {
    return x(t) ? t[Zt(0, t.length, e)] : t
}
const lt = (t,e,n)=>-n * t + n * e + t
  , kt = ()=>{}
  , M = t=>t
  , Q = (t,e,n)=>e - t === 0 ? 1 : (n - t) / (e - t);
function ut(t, e) {
    const n = t[t.length - 1];
    for (let i = 1; i <= e; i++) {
        const s = Q(0, e, i);
        t.push(lt(n, 1, s))
    }
}
function Ct(t) {
    const e = [0];
    return ut(e, t - 1),
    e
}
function Yt(t, e=Ct(t.length), n=M) {
    const i = t.length
      , s = i - e.length;
    return s > 0 && ut(e, s),
    a=>{
        let o = 0;
        for (; o < i - 2 && !(a < e[o + 1]); o++)
            ;
        let r = Dt(0, 1, Q(e[o], e[o + 1], a));
        return r = Pt(n, o)(r),
        lt(t[o], t[o + 1], r)
    }
}
const qt = t=>Array.isArray(t) && P(t[0])
  , H = t=>typeof t == "object" && !!t.createAnimation
  , $ = t=>typeof t == "function"
  , dt = t=>typeof t == "string"
  , B = {
    ms: t=>t * 1e3,
    s: t=>t / 1e3
};
function te(t, e) {
    return e ? t * (1e3 / e) : 0
}
const xt = (t,e,n)=>(((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t
  , ee = 1e-7
  , ne = 12;
function ie(t, e, n, i, s) {
    let a, o, r = 0;
    do
        o = e + (n - e) / 2,
        a = xt(o, i, s) - t,
        a > 0 ? n = o : e = o;
    while (Math.abs(a) > ee && ++r < ne);
    return o
}
function N(t, e, n, i) {
    if (t === e && n === i)
        return M;
    const s = a=>ie(a, 0, 1, t, n);
    return a=>a === 0 || a === 1 ? a : xt(s(a), e, i)
}
const se = (t,e="end")=>n=>{
    n = e === "end" ? Math.min(n, .999) : Math.max(n, .001);
    const i = n * t
      , s = e === "end" ? Math.floor(i) : Math.ceil(i);
    return Dt(0, 1, s / t)
}
  , vt = {
    ease: N(.25, .1, .25, 1),
    "ease-in": N(.42, 0, 1, 1),
    "ease-in-out": N(.42, 0, .58, 1),
    "ease-out": N(0, 0, .58, 1)
}
  , ae = /\((.*?)\)/;
function at(t) {
    if ($(t))
        return t;
    if (qt(t))
        return N(...t);
    if (vt[t])
        return vt[t];
    if (t.startsWith("steps")) {
        const e = ae.exec(t);
        if (e) {
            const n = e[1].split(",");
            return se(parseFloat(n[0]), n[1].trim())
        }
    }
    return M
}
class ft {
    constructor(e, n=[0, 1], {easing: i, duration: s=w.duration, delay: a=w.delay, endDelay: o=w.endDelay, repeat: r=w.repeat, offset: c, direction: l="normal"}={}) {
        if (this.startTime = null,
        this.rate = 1,
        this.t = 0,
        this.cancelTimestamp = null,
        this.easing = M,
        this.duration = 0,
        this.totalDuration = 0,
        this.repeat = 0,
        this.playState = "idle",
        this.finished = new Promise((f,u)=>{
            this.resolve = f,
            this.reject = u
        }
        ),
        i = i || w.easing,
        H(i)) {
            const f = i.createAnimation(n);
            i = f.easing,
            n = f.keyframes || n,
            s = f.duration || s
        }
        this.repeat = r,
        this.easing = x(i) ? M : at(i),
        this.updateDuration(s);
        const d = Yt(n, c, x(i) ? i.map(at) : M);
        this.tick = f=>{
            var u;
            a = a;
            let m = 0;
            this.pauseTime !== void 0 ? m = this.pauseTime : m = (f - this.startTime) * this.rate,
            this.t = m,
            m /= 1e3,
            m = Math.max(m - a, 0),
            this.playState === "finished" && this.pauseTime === void 0 && (m = this.totalDuration);
            const p = m / this.duration;
            let g = Math.floor(p)
              , y = p % 1;
            !y && p >= 1 && (y = 1),
            y === 1 && g--;
            const S = g % 2;
            (l === "reverse" || l === "alternate" && S || l === "alternate-reverse" && !S) && (y = 1 - y);
            const A = m >= this.totalDuration ? 1 : Math.min(y, 1)
              , b = d(this.easing(A));
            e(b),
            this.pauseTime === void 0 && (this.playState === "finished" || m >= this.totalDuration + o) ? (this.playState = "finished",
            (u = this.resolve) === null || u === void 0 || u.call(this, b)) : this.playState !== "idle" && (this.frameRequestId = requestAnimationFrame(this.tick))
        }
        ,
        this.play()
    }
    play() {
        const e = performance.now();
        this.playState = "running",
        this.pauseTime !== void 0 ? this.startTime = e - this.pauseTime : this.startTime || (this.startTime = e),
        this.cancelTimestamp = this.startTime,
        this.pauseTime = void 0,
        this.frameRequestId = requestAnimationFrame(this.tick)
    }
    pause() {
        this.playState = "paused",
        this.pauseTime = this.t
    }
    finish() {
        this.playState = "finished",
        this.tick(0)
    }
    stop() {
        var e;
        this.playState = "idle",
        this.frameRequestId !== void 0 && cancelAnimationFrame(this.frameRequestId),
        (e = this.reject) === null || e === void 0 || e.call(this, !1)
    }
    cancel() {
        this.stop(),
        this.tick(this.cancelTimestamp)
    }
    reverse() {
        this.rate *= -1
    }
    commitStyles() {}
    updateDuration(e) {
        this.duration = e,
        this.totalDuration = e * (this.repeat + 1)
    }
    get currentTime() {
        return this.t
    }
    set currentTime(e) {
        this.pauseTime !== void 0 || this.rate === 0 ? this.pauseTime = e : this.startTime = performance.now() - e / this.rate
    }
    get playbackRate() {
        return this.rate
    }
    set playbackRate(e) {
        this.rate = e
    }
}
var oe = function() {};
class re {
    setAnimation(e) {
        this.animation = e,
        e?.finished.then(()=>this.clearAnimation()).catch(()=>{}
        )
    }
    clearAnimation() {
        this.animation = this.generator = void 0
    }
}
const Y = new WeakMap;
function Bt(t) {
    return Y.has(t) || Y.set(t, {
        transforms: [],
        values: new Map
    }),
    Y.get(t)
}
function ce(t, e) {
    return t.has(e) || t.set(e, new re),
    t.get(e)
}
const le = ["", "X", "Y", "Z"]
  , ue = ["translate", "scale", "rotate", "skew"]
  , K = {
    x: "translateX",
    y: "translateY",
    z: "translateZ"
}
  , bt = {
    syntax: "<angle>",
    initialValue: "0deg",
    toDefaultUnit: t=>t + "deg"
}
  , de = {
    translate: {
        syntax: "<length-percentage>",
        initialValue: "0px",
        toDefaultUnit: t=>t + "px"
    },
    rotate: bt,
    scale: {
        syntax: "<number>",
        initialValue: 1,
        toDefaultUnit: M
    },
    skew: bt
}
  , j = new Map
  , ht = t=>`--motion-${t}`
  , X = ["x", "y", "z"];
ue.forEach(t=>{
    le.forEach(e=>{
        X.push(t + e),
        j.set(ht(t + e), de[t])
    }
    )
}
);
const fe = (t,e)=>X.indexOf(t) - X.indexOf(e)
  , he = new Set(X)
  , Ut = t=>he.has(t)
  , me = (t,e)=>{
    K[e] && (e = K[e]);
    const {transforms: n} = Bt(t);
    Jt(n, e),
    t.style.transform = pe(n)
}
  , pe = t=>t.sort(fe).reduce(ge, "").trim()
  , ge = (t,e)=>`${t} ${e}(var(${ht(e)}))`
  , ot = t=>t.startsWith("--")
  , St = new Set;
function ye(t) {
    if (!St.has(t)) {
        St.add(t);
        try {
            const {syntax: e, initialValue: n} = j.has(t) ? j.get(t) : {};
            CSS.registerProperty({
                name: t,
                inherits: !1,
                syntax: e,
                initialValue: n
            })
        } catch {}
    }
}
const tt = (t,e)=>document.createElement("div").animate(t, e)
  , Et = {
    cssRegisterProperty: ()=>typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: ()=>Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: ()=>{
        try {
            tt({
                opacity: [1]
            })
        } catch {
            return !1
        }
        return !0
    }
    ,
    finished: ()=>!!tt({
        opacity: [0, 1]
    }, {
        duration: .001
    }).finished,
    linearEasing: ()=>{
        try {
            tt({
                opacity: 0
            }, {
                easing: "linear(0, 1)"
            })
        } catch {
            return !1
        }
        return !0
    }
}
  , et = {}
  , q = {};
for (const t in Et)
    q[t] = ()=>(et[t] === void 0 && (et[t] = Et[t]()),
    et[t]);
const ve = .015
  , be = (t,e)=>{
    let n = "";
    const i = Math.round(e / ve);
    for (let s = 0; s < i; s++)
        n += t(Q(0, i - 1, s)) + ", ";
    return n.substring(0, n.length - 2)
}
  , Tt = (t,e)=>$(t) ? q.linearEasing() ? `linear(${be(t, e)})` : w.easing : qt(t) ? Se(t) : t
  , Se = ([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;
function Ee(t, e) {
    for (let n = 0; n < t.length; n++)
        t[n] === null && (t[n] = n ? t[n - 1] : e());
    return t
}
const $t = t=>Array.isArray(t) ? t : [t];
function J(t) {
    return K[t] && (t = K[t]),
    Ut(t) ? ht(t) : t
}
const W = {
    get: (t,e)=>{
        e = J(e);
        let n = ot(e) ? t.style.getPropertyValue(e) : getComputedStyle(t)[e];
        if (!n && n !== 0) {
            const i = j.get(e);
            i && (n = i.initialValue)
        }
        return n
    }
    ,
    set: (t,e,n)=>{
        e = J(e),
        ot(e) ? t.style.setProperty(e, n) : t.style[e] = n
    }
};
function jt(t, e=!0) {
    if (!(!t || t.playState === "finished"))
        try {
            t.stop ? t.stop() : (e && t.commitStyles(),
            t.cancel())
        } catch {}
}
function Vt(t, e) {
    var n;
    let i = e?.toDefaultUnit || M;
    const s = t[t.length - 1];
    if (dt(s)) {
        const a = ((n = s.match(/(-?[\d.]+)([a-z%]*)/)) === null || n === void 0 ? void 0 : n[2]) || "";
        a && (i = o=>o + a)
    }
    return i
}
function Te() {
    return window.__MOTION_DEV_TOOLS_RECORD
}
function Nt(t, e, n, i={}, s) {
    const a = Te()
      , o = i.record !== !1 && a;
    let r, {duration: c=w.duration, delay: l=w.delay, endDelay: d=w.endDelay, repeat: f=w.repeat, easing: u=w.easing, persist: m=!1, direction: p, offset: g, allowWebkitAcceleration: y=!1} = i;
    const S = Bt(t)
      , A = Ut(e);
    let b = q.waapi();
    A && me(t, e);
    const T = J(e)
      , L = ce(S.values, T)
      , E = j.get(T);
    return jt(L.animation, !(H(u) && L.generator) && i.record !== !1),
    ()=>{
        const R = ()=>{
            var v, I;
            return (I = (v = W.get(t, T)) !== null && v !== void 0 ? v : E?.initialValue) !== null && I !== void 0 ? I : 0
        }
        ;
        let h = Ee($t(n), R);
        const V = Vt(h, E);
        if (H(u)) {
            const v = u.createAnimation(h, e !== "opacity", R, T, L);
            u = v.easing,
            h = v.keyframes || h,
            c = v.duration || c
        }
        if (ot(T) && (q.cssRegisterProperty() ? ye(T) : b = !1),
        A && !q.linearEasing() && ($(u) || x(u) && u.some($)) && (b = !1),
        b) {
            E && (h = h.map(O=>P(O) ? E.toDefaultUnit(O) : O)),
            h.length === 1 && (!q.partialKeyframes() || o) && h.unshift(R());
            const v = {
                delay: B.ms(l),
                duration: B.ms(c),
                endDelay: B.ms(d),
                easing: x(u) ? void 0 : Tt(u, c),
                direction: p,
                iterations: f + 1,
                fill: "both"
            };
            r = t.animate({
                [T]: h,
                offset: g,
                easing: x(u) ? u.map(O=>Tt(O, c)) : void 0
            }, v),
            r.finished || (r.finished = new Promise((O,G)=>{
                r.onfinish = O,
                r.oncancel = G
            }
            ));
            const I = h[h.length - 1];
            r.finished.then(()=>{
                m || (W.set(t, T, I),
                r.cancel())
            }
            ).catch(kt),
            y || (r.playbackRate = 1.000001)
        } else if (s && A)
            h = h.map(v=>typeof v == "string" ? parseFloat(v) : v),
            h.length === 1 && h.unshift(parseFloat(R())),
            r = new s(v=>{
                W.set(t, T, V ? V(v) : v)
            }
            ,h,Object.assign(Object.assign({}, i), {
                duration: c,
                easing: u
            }));
        else {
            const v = h[h.length - 1];
            W.set(t, T, E && P(v) ? E.toDefaultUnit(v) : v)
        }
        return o && a(t, e, h, {
            duration: c,
            delay: l,
            easing: u,
            repeat: f,
            offset: g
        }, "motion-one"),
        L.setAnimation(r),
        r
    }
}
const Ft = (t,e)=>t[e] ? Object.assign(Object.assign({}, t), t[e]) : Object.assign({}, t);
function Gt(t, e) {
    var n;
    return typeof t == "string" ? e ? ((n = e[t]) !== null && n !== void 0 || (e[t] = document.querySelectorAll(t)),
    t = e[t]) : t = document.querySelectorAll(t) : t instanceof Element && (t = [t]),
    Array.from(t || [])
}
const Ae = t=>t()
  , mt = (t,e,n=w.duration)=>new Proxy({
    animations: t.map(Ae).filter(Boolean),
    duration: n,
    options: e
},Le)
  , we = t=>t.animations[0]
  , Le = {
    get: (t,e)=>{
        const n = we(t);
        switch (e) {
        case "duration":
            return t.duration;
        case "currentTime":
            return B.s(n?.[e] || 0);
        case "playbackRate":
        case "playState":
            return n?.[e];
        case "finished":
            return t.finished || (t.finished = Promise.all(t.animations.map(Ie)).catch(kt)),
            t.finished;
        case "stop":
            return ()=>{
                t.animations.forEach(i=>jt(i))
            }
            ;
        case "forEachNative":
            return i=>{
                t.animations.forEach(s=>i(s, t))
            }
            ;
        default:
            return typeof n?.[e] > "u" ? void 0 : ()=>t.animations.forEach(i=>i[e]())
        }
    }
    ,
    set: (t,e,n)=>{
        switch (e) {
        case "currentTime":
            n = B.ms(n);
        case "playbackRate":
            for (let i = 0; i < t.animations.length; i++)
                t.animations[i][e] = n;
            return !0
        }
        return !1
    }
}
  , Ie = t=>t.finished;
function _(t=.1, {start: e=0, from: n=0, easing: i}={}) {
    return (s,a)=>{
        const o = P(n) ? n : Oe(n, a)
          , r = Math.abs(o - s);
        let c = t * r;
        if (i) {
            const l = a * t;
            c = at(i)(c / l) * l
        }
        return e + c
    }
}
function Oe(t, e) {
    if (t === "first")
        return 0;
    {
        const n = e - 1;
        return t === "last" ? n : n / 2
    }
}
function Wt(t, e, n) {
    return $(t) ? t(e, n) : t
}
function _e(t) {
    return function(n, i, s={}) {
        n = Gt(n);
        const a = n.length
          , o = [];
        for (let r = 0; r < a; r++) {
            const c = n[r];
            for (const l in i) {
                const d = Ft(s, l);
                d.delay = Wt(d.delay, r, a);
                const f = Nt(c, l, i[l], d, t);
                o.push(f)
            }
        }
        return mt(o, s, s.duration)
    }
}
const Me = _e(ft);
function Re(t, e) {
    var n = {};
    for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
    if (t != null && typeof Object.getOwnPropertySymbols == "function")
        for (var s = 0, i = Object.getOwnPropertySymbols(t); s < i.length; s++)
            e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[s]) && (n[i[s]] = t[i[s]]);
    return n
}
function At(t, e, n, i) {
    var s;
    return P(e) ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (s = i.get(e)) !== null && s !== void 0 ? s : t
}
function De(t, e, n) {
    for (let i = 0; i < t.length; i++) {
        const s = t[i];
        s.at > e && s.at < n && (Qt(t, s),
        i--)
    }
}
function Pe(t, e, n, i, s, a) {
    De(t, s, a);
    for (let o = 0; o < e.length; o++)
        t.push({
            value: e[o],
            at: lt(s, a, i[o]),
            easing: Pt(n, o)
        })
}
function ke(t, e) {
    return t.at === e.at ? t.value === null ? 1 : -1 : t.at - e.at
}
function Ce(t, e={}) {
    var n;
    const i = qe(t, e)
      , s = i.map(a=>Nt(...a, ft)).filter(Boolean);
    return mt(s, e, (n = i[0]) === null || n === void 0 ? void 0 : n[3].duration)
}
function qe(t, e={}) {
    var {defaultOptions: n={}} = e
      , i = Re(e, ["defaultOptions"]);
    const s = []
      , a = new Map
      , o = {}
      , r = new Map;
    let c = 0
      , l = 0
      , d = 0;
    for (let f = 0; f < t.length; f++) {
        const u = t[f];
        if (dt(u)) {
            r.set(u, l);
            continue
        } else if (!Array.isArray(u)) {
            r.set(u.name, At(l, u.at, c, r));
            continue
        }
        const [m,p,g={}] = u;
        g.at !== void 0 && (l = At(l, g.at, c, r));
        let y = 0;
        const S = Gt(m, o)
          , A = S.length;
        for (let b = 0; b < A; b++) {
            const T = S[b]
              , L = xe(T, a);
            for (const E in p) {
                const R = Be(E, L);
                let h = $t(p[E]);
                const V = Ft(g, E);
                let {duration: v=n.duration || w.duration, easing: I=n.easing || w.easing} = V;
                if (H(I)) {
                    oe(E === "opacity" || h.length > 1);
                    const Z = I.createAnimation(h, E !== "opacity", ()=>0, E);
                    I = Z.easing,
                    h = Z.keyframes || h,
                    v = Z.duration || v
                }
                const O = Wt(g.delay, b, A) || 0
                  , G = l + O
                  , gt = G + v;
                let {offset: C=Ct(h.length)} = V;
                C.length === 1 && C[0] === 0 && (C[1] = 1);
                const yt = C.length - h.length;
                yt > 0 && ut(C, yt),
                h.length === 1 && h.unshift(null),
                Pe(R, h, I, C, G, gt),
                y = Math.max(O + v, y),
                d = Math.max(gt, d)
            }
        }
        c = l,
        l += y
    }
    return a.forEach((f,u)=>{
        for (const m in f) {
            const p = f[m];
            p.sort(ke);
            const g = []
              , y = []
              , S = [];
            for (let A = 0; A < p.length; A++) {
                const {at: b, value: T, easing: L} = p[A];
                g.push(T),
                y.push(Q(0, d, b)),
                S.push(L || w.easing)
            }
            y[0] !== 0 && (y.unshift(0),
            g.unshift(g[0]),
            S.unshift("linear")),
            y[y.length - 1] !== 1 && (y.push(1),
            g.push(null)),
            s.push([u, m, g, Object.assign(Object.assign(Object.assign({}, n), {
                duration: d,
                easing: S,
                offset: y
            }), i)])
        }
    }
    ),
    s
}
function xe(t, e) {
    return !e.has(t) && e.set(t, {}),
    e.get(t)
}
function Be(t, e) {
    return e[t] || (e[t] = []),
    e[t]
}
const Ue = 5;
function zt(t, e, n) {
    const i = Math.max(e - Ue, 0);
    return te(n - t(i), e - i)
}
const U = {
    stiffness: 100,
    damping: 10,
    mass: 1
}
  , $e = (t=U.stiffness,e=U.damping,n=U.mass)=>e / (2 * Math.sqrt(t * n));
function je(t, e, n) {
    return t < e && n >= e || t > e && n <= e
}
const Ve = ({stiffness: t=U.stiffness, damping: e=U.damping, mass: n=U.mass, from: i=0, to: s=1, velocity: a=0, restSpeed: o, restDistance: r}={})=>{
    a = a ? B.s(a) : 0;
    const c = {
        done: !1,
        hasReachedTarget: !1,
        current: i,
        target: s
    }
      , l = s - i
      , d = Math.sqrt(t / n) / 1e3
      , f = $e(t, e, n)
      , u = Math.abs(l) < 5;
    o || (o = u ? .01 : 2),
    r || (r = u ? .005 : .5);
    let m;
    if (f < 1) {
        const p = d * Math.sqrt(1 - f * f);
        m = g=>s - Math.exp(-f * d * g) * ((-a + f * d * l) / p * Math.sin(p * g) + l * Math.cos(p * g))
    } else
        m = p=>s - Math.exp(-d * p) * (l + (-a + d * l) * p);
    return p=>{
        c.current = m(p);
        const g = p === 0 ? a : zt(m, p, c.current)
          , y = Math.abs(g) <= o
          , S = Math.abs(s - c.current) <= r;
        return c.done = y && S,
        c.hasReachedTarget = je(i, s, c.current),
        c
    }
}
  , nt = 10
  , Ne = 1e4;
function Fe(t, e=M) {
    let n, i = nt, s = t(0);
    const a = [e(s.current)];
    for (; !s.done && i < Ne; )
        s = t(i),
        a.push(e(s.done ? s.target : s.current)),
        n === void 0 && s.hasReachedTarget && (n = i),
        i += nt;
    const o = i - nt;
    return a.length === 1 && a.push(s.current),
    {
        keyframes: a,
        duration: o / 1e3,
        overshootDuration: (n ?? o) / 1e3
    }
}
function wt(t) {
    return P(t) && !isNaN(t)
}
function it(t) {
    return dt(t) ? parseFloat(t) : t
}
function Ge(t) {
    const e = new WeakMap;
    return (n={})=>{
        const i = new Map
          , s = (o=0,r=100,c=0,l=!1)=>{
            const d = `${o}-${r}-${c}-${l}`;
            return i.has(d) || i.set(d, t(Object.assign({
                from: o,
                to: r,
                velocity: c
            }, n))),
            i.get(d)
        }
          , a = (o,r)=>(e.has(o) || e.set(o, Fe(o, r)),
        e.get(o));
        return {
            createAnimation: (o,r=!0,c,l,d)=>{
                let f, u, m, p = 0, g = M;
                const y = o.length;
                if (r) {
                    g = Vt(o, l ? j.get(J(l)) : void 0);
                    const S = o[y - 1];
                    if (m = it(S),
                    y > 1 && o[0] !== null)
                        u = it(o[0]);
                    else {
                        const A = d?.generator;
                        if (A) {
                            const {animation: b, generatorStartTime: T} = d
                              , L = b?.startTime || T || 0
                              , E = b?.currentTime || performance.now() - L
                              , R = A(E).current;
                            u = R,
                            p = zt(h=>A(h).current, E, R)
                        } else
                            c && (u = it(c()))
                    }
                }
                if (wt(u) && wt(m)) {
                    const S = s(u, m, p, l?.includes("scale"));
                    f = Object.assign(Object.assign({}, a(S, g)), {
                        easing: "linear"
                    }),
                    d && (d.generator = S,
                    d.generatorStartTime = performance.now())
                }
                return f || (f = {
                    easing: "ease",
                    duration: a(s(0, 100)).overshootDuration
                }),
                f
            }
        }
    }
}
const D = Ge(Ve);
function We(t, e={}) {
    return mt([()=>{
        const n = new ft(t,[0, 1],e);
        return n.finished.catch(()=>{}
        ),
        n
    }
    ], e, e.duration)
}
function Lt(t, e, n) {
    return ($(t) ? We : Me)(t, e, n)
}
const ze = {
    overlay: ()=>[["svg.logo path", {
        y: [-400, 0],
        opacity: [0, 1]
    }, {
        delay: _(.1, {
            from: "last"
        }),
        easing: D({
            stiffness: 200,
            damping: 21
        }),
        at: .3
    }], [".nav-container", {
        y: [-100, 0],
        opacity: [0, 1]
    }, {
        easing: D({
            stiffness: 200,
            damping: 21
        }),
        at: 0
    }], [".right-container", {
        y: [-100, 0],
        opacity: [0, 1]
    }, {
        easing: D({
            stiffness: 200,
            damping: 21
        }),
        at: .3
    }], ["div.socials", {
        opacity: [0, 1]
    }], ["div.email", {
        opacity: [0, 1]
    }, {
        at: "<"
    }], ["div.socials ul li", {
        y: [-40, 0],
        opacity: [0, 1]
    }, {
        delay: _(.1, {
            from: "last"
        }),
        easing: D({
            stiffness: 200,
            damping: 21
        })
    }], ["div.email a", {
        y: [-40, 0],
        opacity: [0, 1]
    }, {
        easing: D({
            stiffness: 200,
            damping: 21
        }),
        at: "<"
    }]],
    home: ()=>[["#home .fadein-up", {
        y: [30, 0],
        opacity: [0, 1]
    }, {
        delay: _(.15)
    }], ["#home svg g", {
        y: [-40, 0],
        opacity: [0, 1]
    }, {
        delay: _(.1),
        at: 0
    }], ["#home svg.hero-logo path", {
        y: [-80, 0],
        opacity: [0, 1]
    }, {
        delay: _(.1, {
            from: "last"
        }),
        easing: D({
            stiffness: 200,
            damping: 21
        }),
        at: "+0.1"
    }]],
    about: t=>[[t.querySelectorAll("div:not(.show-ref) .show-on-enter, #about > .show-on-enter"), {
        y: [40, 0],
        opacity: [0, 1]
    }, {
        delay: _(.4)
    }], [t.querySelectorAll("#about > .show-on-enter svg"), {
        strokeDashoffset: 0
    }, {
        at: .5,
        duration: 1,
        easing: "ease-out"
    }]],
    aboutSecond: t=>[[t.querySelectorAll(".show-on-enter"), {
        y: [40, 0],
        opacity: [0, 1]
    }, {
        delay: _(.2)
    }], [t.querySelectorAll(".show-on-enter span"), {
        transform: ["scaleX(0)", "scaleX(1)"],
        opacity: [0, 1]
    }, {
        at: .2
    }], [t.querySelectorAll("ol"), {
        opacity: [0, 1]
    }, {
        at: "<"
    }], [t.querySelectorAll("ul li .tooltip-anchor g:first-child"), {
        y: [-40, 0],
        opacity: [0, 1]
    }], [t.querySelectorAll("ul li .tooltip-anchor g:last-child"), {
        y: [-40, 0],
        opacity: [0, 1]
    }, {
        at: "-0.1"
    }], [t.querySelectorAll("ul li svg:not(.tooltip-anchor)"), {
        y: [-40, 0],
        opacity: [0, 1]
    }]],
    projects: t=>[[t.querySelectorAll("#projects > .show-on-enter, .project-card"), {
        y: [40, 0],
        opacity: [0, 1]
    }, {
        delay: _(.15)
    }], [t.querySelectorAll("#projects > .show-on-enter svg"), {
        strokeDashoffset: 0
    }, {
        at: .5,
        duration: 1,
        easing: "ease-out"
    }]],
    contact: t=>[[t.querySelectorAll("#contact > .show-on-enter"), {
        y: [40, 0],
        opacity: [0, 1]
    }], [t.querySelectorAll(".show-on-enter:not(div:first-child)"), {
        y: [40, 0],
        opacity: [0, 1]
    }, {
        delay: _(.15)
    }], [t.querySelectorAll("#contact > .show-on-enter svg"), {
        strokeDashoffset: 0
    }, {
        at: .5,
        duration: 1,
        easing: "ease-out"
    }]],
    notFound: ()=>[[".not-found-art", {
        y: [30, 0],
        opacity: [0, 1]
    }, {
        at: .3
    }], ["footer", {
        y: [-30, 0],
        opacity: [0, 1]
    }, {
        at: .3
    }], [".not-found-art svg:not(.this-is-fine) g", {
        transform: ["scale(0)", "scale(1)"]
    }], [".not-found-art .this-is-fine .dialogue-bubble", {
        opacity: [0, 1]
    }], [".not-found :is(h1, p, .home-btn)", {
        y: [30, 0],
        opacity: [0, 1]
    }, {
        delay: _(.15),
        at: .4
    }]]
}
  , He = {
    email: "dannymantigar@hotmail.com",
    links: [{
        name: "Home",
        hash: "/#home"
    }, {
        name: "About",
        hash: "/#about"
    }, {
        name: "Projects",
        hash: "/#projects"
    }, {
        name: "Contact",
        hash: "/#contact"
    }],
    socialMedia: [{
        name: "Resume",
        iconName: "file-cv",
        url: "/resume.pdf"
    }, {
        name: "GitHub",
        iconName: "github",
        url: "https://github.com/DManti15"
    }, {
        name: "LinkedIn",
        iconName: "linkedin",
        url: "https://www.linkedin.com/in/danny-mantilla"
    }, {
        name: "Codepen",
        iconName: "codepen",
        url: "https://codepen.io/DManti15"
    }],
    skills: [{
        name: "HTML",
        iconName: "html-brand",
        label: "html-logo"
    }, {
        name: "CSS",
        iconName: "css-brand",
        label: "css-logo"
    }, {
        name: "JavaScript",
        iconName: "js-brand",
        label: "js-logo"
    }, {
        name: "React",
        iconName: "react-brand",
        label: "react-logo"
    }, {
        name: "TailwindCSS",
        iconName: "tailwind-brand",
        label: "tailwind-logo"
    }, {
        name: "Git",
        iconName: "git-brand",
        label: "git-logo"
    }, {
        name: "GitHub",
        iconName: "github-brand",
        label: "github-logo"
    }, {
        name: "Figma",
        iconName: "figma-brand",
        label: "figma-logo"
    }]
};
let rt = window.innerWidth > 1024;
const Ke = document.querySelector("span.indicator-dt")
  , Xe = document.querySelector("span.indicator-mb");
function Je(t) {
    const {desktop: e, mobile: n, options: i} = t
      , s = Lt(e.element, e.animation, i)
      , a = Lt(n.element, n.animation, i);
    s.pause(),
    a.pause(),
    rt ? (a.finish(),
    s.play()) : (s.finish(),
    a.play())
}
function Ht() {
    const t = document.querySelector(".active");
    if (t) {
        const e = parseInt(t.getAttribute("data-index") || "1")
          , n = t.offsetWidth * e
          , i = t.offsetHeight * e
          , s = {
            desktop: {
                animation: {
                    x: n
                },
                element: Ke
            },
            mobile: {
                animation: {
                    y: i
                },
                element: Xe
            },
            options: {
                easing: D({
                    stiffness: 400,
                    damping: 35
                })
            }
        };
        Je(s)
    }
}
window.addEventListener("resize", ()=>{
    rt = window.innerWidth > 1024,
    rt || Ht()
}
);
const Qe = He.links.map(({hash: t})=>document.getElementById(t.slice(2)))
  , Ze = {
    root: null,
    rootMargin: "-60% 0% -40% 0%",
    threshold: 0
}
  , Ye = new IntersectionObserver(t=>{
    t.forEach(e=>{
        const n = e.target.id
          , i = document.querySelector(`[href="/#${n}"]`);
        e.isIntersecting && i ? (i.classList.add("active"),
        Ht()) : i?.classList.remove("active")
    }
    )
}
,Ze);
Qe.forEach(t=>{
    t != null && Ye.observe(t)
}
);
Ce(ze.overlay()).finished.then(()=>{
    document.querySelectorAll("#header .logo path, div.email a").forEach(e=>e.style.removeProperty("transform"))
}
);
const tn = document.querySelectorAll(".button");
let It;
tn.forEach(t=>{
    const e = t.querySelector(".slide-item")
      , n = t.querySelector(".spin-item");
    t.addEventListener("mouseenter", ()=>{
        e?.classList.add("animation-running"),
        n?.classList.add("animation-running"),
        clearTimeout(It)
    }
    ),
    t.addEventListener("mouseleave", ()=>{
        It = setTimeout(()=>{
            e?.classList.remove("animation-running"),
            n?.classList.remove("animation-running")
        }
        , 200)
    }
    )
}
);
const Ot = t=>{
    let e;
    const n = new Set
      , i = (c,l)=>{
        const d = typeof c == "function" ? c(e) : c;
        if (!Object.is(d, e)) {
            const f = e;
            e = l ?? (typeof d != "object" || d === null) ? d : Object.assign({}, e, d),
            n.forEach(u=>u(e, f))
        }
    }
      , s = ()=>e
      , r = {
        setState: i,
        getState: s,
        subscribe: c=>(n.add(c),
        ()=>n.delete(c)),
        destroy: ()=>{
            n.clear()
        }
    };
    return e = t(i, s, r),
    r
}
  , en = t=>t ? Ot(t) : Ot
  , k = en(()=>({
    theme: "dark"
}))
  , pt = document.getElementById("animated-background")
  , {lightColors: nn, darkColors: sn} = pt?.dataset
  , _t = {
    light: JSON.parse(nn || ""),
    dark: JSON.parse(sn || "")
};
function Mt({primary: t, secondary: e}) {
    const n = {
        primary: `${t};${e};${t};${t};${e};${t};${t}`,
        secondary: `${e};${t};${t};${t};${t};${t};${e}`
    };
    pt?.querySelectorAll("radialGradient")?.forEach((s,a)=>{
        const o = s.querySelectorAll("stop")
          , r = s.querySelector("animate")
          , [c,l] = o;
        a === 0 || a === 2 ? (c.setAttribute("stop-color", t),
        r?.setAttribute("values", n.primary),
        l.setAttribute("stop-color", e)) : (c.setAttribute("stop-color", e),
        r?.setAttribute("values", n.secondary),
        l.setAttribute("stop-color", e))
    }
    )
}
function Kt(t) {
    t.theme === "light" ? Mt(_t.light) : Mt(_t.dark)
}
k.subscribe(t=>{
    Kt(t)
}
);
Kt(k.getState());
pt.style.opacity = "1";
const Rt = document.getElementById("header")
  , z = document.getElementById("mobile-menu")
  , F = document.getElementById("nav-links");
function ct(t) {
    F && !F.contains(t.target) && t.target !== F && (F.classList.remove("menu-show"),
    z?.classList.toggle("menu-open"),
    document.removeEventListener("click", ct))
}
z?.addEventListener("click", t=>{
    t.stopPropagation(),
    F?.classList.toggle("menu-show"),
    z.classList.toggle("menu-open"),
    z.classList.contains("menu-open") ? document.addEventListener("click", ct) : document.removeEventListener("click", ct)
}
);
window.addEventListener("scroll", ()=>{
    const t = window.scrollY
      , e = window.innerWidth > 1024;
    t > 0 && !e ? Rt?.classList.add("header-sticky") : Rt?.classList.remove("header-sticky")
}
);
const Xt = document.querySelectorAll(".theme-button")
  , an = window.matchMedia("(prefers-color-scheme: light)")
  , st = localStorage.getItem("page-theme");
function on() {
    const t = k.getState().theme === "light" ? "dark" : "light";
    k.setState({
        theme: t
    }),
    localStorage.setItem("page-theme", t),
    console.log(t)
}
function rn(t) {
    document.documentElement.classList.remove(t === "dark" ? "light" : "dark"),
    document.documentElement.classList.add(t === "dark" ? "dark" : "light"),
    Xt.forEach(e=>{
        e?.classList.remove(t === "dark" ? "light-active" : "dark-active"),
        e?.classList.add(t === "dark" ? "dark-active" : "light-active")
    }
    )
}
Xt.forEach(t=>{
    t.addEventListener("click", on)
}
);
k.subscribe(t=>{
    rn(t.theme)
}
);
!st && an.matches ? k.setState({
    theme: "light"
}) : st === "light" && k.setState({
    theme: st
});
export {$ as i, Gt as r, ze as s, Ce as t};

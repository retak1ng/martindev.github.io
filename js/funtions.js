import { r as xt, i as bt, t as Y, s as _ } from "./theme-button.js";
const Et = {
    any: 0,
    all: 1
};
function vt(t, e, { root: o, margin: n, amount: i = "any" } = {}) {
    if (typeof IntersectionObserver > "u")
        return () => { }
            ;
    const r = xt(t)
        , s = new WeakMap
        , c = f => {
            f.forEach(u => {
                const d = s.get(u.target);
                if (u.isIntersecting !== !!d)
                    if (u.isIntersecting) {
                        const p = e(u);
                        bt(p) ? s.set(u.target, p) : l.unobserve(u.target)
                    } else
                        d && (d(u),
                            s.delete(u.target))
            }
            )
        }
        , l = new IntersectionObserver(c, {
            root: o,
            rootMargin: n,
            threshold: typeof i == "number" ? i : Et[i]
        });
    return r.forEach(f => l.observe(f)),
        () => l.disconnect()
}
Y(_.home(), {
    delay: 2
});
function Ct(t, e) {
    const o = t.id
        , n = _[o];
    n && e ? Y(n(t)) : Y(_.aboutSecond(t)).finished.then(() => {
        t.querySelectorAll("ul li svg:not(.tooltip-anchor), ul li .tooltip-anchor g").forEach(r => r.style.removeProperty("transform"))
    }
    )
}
vt("section:not(#home), .show-ref", ({ target: t, isIntersecting: e }) => {
    Ct(t, e)
}
    , {
        margin: "0% 0% -40% 0%"
    });
const W = Math.min
    , A = Math.max
    , F = Math.round
    , v = t => ({
        x: t,
        y: t
    });
function Ot(t, e, o) {
    return A(t, W(e, o))
}
function Tt(t, e) {
    return typeof t == "function" ? t(e) : t
}
function it(t) {
    return t.split("-")[0]
}
function st(t) {
    return t.split("-")[1]
}
function Lt(t) {
    return t === "x" ? "y" : "x"
}
function rt(t) {
    return t === "y" ? "height" : "width"
}
function ct(t) {
    return ["top", "bottom"].includes(it(t)) ? "y" : "x"
}
function lt(t) {
    return Lt(ct(t))
}
function Rt(t) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...t
    }
}
function St(t) {
    return typeof t != "number" ? Rt(t) : {
        top: t,
        right: t,
        bottom: t,
        left: t
    }
}
function ft(t) {
    return {
        ...t,
        top: t.y,
        left: t.x,
        right: t.x + t.width,
        bottom: t.y + t.height
    }
}
function tt(t, e, o) {
    let { reference: n, floating: i } = t;
    const r = ct(e)
        , s = lt(e)
        , c = rt(s)
        , l = it(e)
        , f = r === "y"
        , u = n.x + n.width / 2 - i.width / 2
        , d = n.y + n.height / 2 - i.height / 2
        , p = n[c] / 2 - i[c] / 2;
    let a;
    switch (l) {
        case "top":
            a = {
                x: u,
                y: n.y - i.height
            };
            break;
        case "bottom":
            a = {
                x: u,
                y: n.y + n.height
            };
            break;
        case "right":
            a = {
                x: n.x + n.width,
                y: d
            };
            break;
        case "left":
            a = {
                x: n.x - i.width,
                y: d
            };
            break;
        default:
            a = {
                x: n.x,
                y: n.y
            }
    }
    switch (st(e)) {
        case "start":
            a[s] -= p * (o && f ? -1 : 1);
            break;
        case "end":
            a[s] += p * (o && f ? -1 : 1);
            break
    }
    return a
}
const At = async (t, e, o) => {
    const { placement: n = "bottom", strategy: i = "absolute", middleware: r = [], platform: s } = o
        , c = r.filter(Boolean)
        , l = await (s.isRTL == null ? void 0 : s.isRTL(e));
    let f = await s.getElementRects({
        reference: t,
        floating: e,
        strategy: i
    })
        , { x: u, y: d } = tt(f, n, l)
        , p = n
        , a = {}
        , h = 0;
    for (let g = 0; g < c.length; g++) {
        const { name: x, fn: R } = c[g]
            , { x: S, y: T, data: q, reset: b } = await R({
                x: u,
                y: d,
                initialPlacement: n,
                placement: p,
                strategy: i,
                middlewareData: a,
                rects: f,
                platform: s,
                elements: {
                    reference: t,
                    floating: e
                }
            });
        if (u = S ?? u,
            d = T ?? d,
            a = {
                ...a,
                [x]: {
                    ...a[x],
                    ...q
                }
            },
            b && h <= 50) {
            h++,
                typeof b == "object" && (b.placement && (p = b.placement),
                    b.rects && (f = b.rects === !0 ? await s.getElementRects({
                        reference: t,
                        floating: e,
                        strategy: i
                    }) : b.rects),
                    { x: u, y: d } = tt(f, p, l)),
                g = -1;
            continue
        }
    }
    return {
        x: u,
        y: d,
        placement: p,
        strategy: i,
        middlewareData: a
    }
}
    , Dt = t => ({
        name: "arrow",
        options: t,
        async fn(e) {
            const { x: o, y: n, placement: i, rects: r, platform: s, elements: c, middlewareData: l } = e
                , { element: f, padding: u = 0 } = Tt(t, e) || {};
            if (f == null)
                return {};
            const d = St(u)
                , p = {
                    x: o,
                    y: n
                }
                , a = lt(i)
                , h = rt(a)
                , g = await s.getDimensions(f)
                , x = a === "y"
                , R = x ? "top" : "left"
                , S = x ? "bottom" : "right"
                , T = x ? "clientHeight" : "clientWidth"
                , q = r.reference[h] + r.reference[a] - p[a] - r.floating[h]
                , b = p[a] - r.reference[a]
                , M = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(f));
            let k = M ? M[T] : 0;
            (!k || !await (s.isElement == null ? void 0 : s.isElement(M))) && (k = c.floating[T] || r.floating[h]);
            const yt = q / 2 - b / 2
                , J = k / 2 - g[h] / 2 - 1
                , Q = W(d[R], J)
                , U = W(d[S], J)
                , B = Q
                , Z = k - g[h] - U
                , L = k / 2 - g[h] / 2 + yt
                , j = Ot(B, L, Z)
                , I = !l.arrow && st(i) != null && L != j && r.reference[h] / 2 - (L < B ? Q : U) - g[h] / 2 < 0
                , X = I ? L < B ? L - B : L - Z : 0;
            return {
                [a]: p[a] + X,
                data: {
                    [a]: j,
                    centerOffset: L - j - X,
                    ...I && {
                        alignmentOffset: X
                    }
                },
                reset: I
            }
        }
    });
function C(t) {
    return ut(t) ? (t.nodeName || "").toLowerCase() : "#document"
}
function m(t) {
    var e;
    return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window
}
function O(t) {
    var e;
    return (e = (ut(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement
}
function ut(t) {
    return t instanceof Node || t instanceof m(t).Node
}
function E(t) {
    return t instanceof Element || t instanceof m(t).Element
}
function y(t) {
    return t instanceof HTMLElement || t instanceof m(t).HTMLElement
}
function et(t) {
    return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof m(t).ShadowRoot
}
function V(t) {
    const { overflow: e, overflowX: o, overflowY: n, display: i } = w(t);
    return /auto|scroll|overlay|hidden|clip/.test(e + n + o) && !["inline", "contents"].includes(i)
}
function Nt(t) {
    return ["table", "td", "th"].includes(C(t))
}
function K(t) {
    const e = G()
        , o = w(t);
    return o.transform !== "none" || o.perspective !== "none" || (o.containerType ? o.containerType !== "normal" : !1) || !e && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !e && (o.filter ? o.filter !== "none" : !1) || ["transform", "perspective", "filter"].some(n => (o.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some(n => (o.contain || "").includes(n))
}
function kt(t) {
    let e = N(t);
    for (; y(e) && !H(e);) {
        if (K(e))
            return e;
        e = N(e)
    }
    return null
}
function G() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
function H(t) {
    return ["html", "body", "#document"].includes(C(t))
}
function w(t) {
    return m(t).getComputedStyle(t)
}
function $(t) {
    return E(t) ? {
        scrollLeft: t.scrollLeft,
        scrollTop: t.scrollTop
    } : {
        scrollLeft: t.pageXOffset,
        scrollTop: t.pageYOffset
    }
}
function N(t) {
    if (C(t) === "html")
        return t;
    const e = t.assignedSlot || t.parentNode || et(t) && t.host || O(t);
    return et(e) ? e.host : e
}
function at(t) {
    const e = N(t);
    return H(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : y(e) && V(e) ? e : at(e)
}
function z(t, e, o) {
    var n;
    e === void 0 && (e = []),
        o === void 0 && (o = !0);
    const i = at(t)
        , r = i === ((n = t.ownerDocument) == null ? void 0 : n.body)
        , s = m(i);
    return r ? e.concat(s, s.visualViewport || [], V(i) ? i : [], s.frameElement && o ? z(s.frameElement) : []) : e.concat(i, z(i, [], o))
}
function dt(t) {
    const e = w(t);
    let o = parseFloat(e.width) || 0
        , n = parseFloat(e.height) || 0;
    const i = y(t)
        , r = i ? t.offsetWidth : o
        , s = i ? t.offsetHeight : n
        , c = F(o) !== r || F(n) !== s;
    return c && (o = r,
        n = s),
    {
        width: o,
        height: n,
        $: c
    }
}
function ht(t) {
    return E(t) ? t : t.contextElement
}
function D(t) {
    const e = ht(t);
    if (!y(e))
        return v(1);
    const o = e.getBoundingClientRect()
        , { width: n, height: i, $: r } = dt(e);
    let s = (r ? F(o.width) : o.width) / n
        , c = (r ? F(o.height) : o.height) / i;
    return (!s || !Number.isFinite(s)) && (s = 1),
        (!c || !Number.isFinite(c)) && (c = 1),
    {
        x: s,
        y: c
    }
}
const Wt = v(0);
function pt(t) {
    const e = m(t);
    return !G() || !e.visualViewport ? Wt : {
        x: e.visualViewport.offsetLeft,
        y: e.visualViewport.offsetTop
    }
}
function Pt(t, e, o) {
    return e === void 0 && (e = !1),
        !o || e && o !== m(t) ? !1 : e
}
function P(t, e, o, n) {
    e === void 0 && (e = !1),
        o === void 0 && (o = !1);
    const i = t.getBoundingClientRect()
        , r = ht(t);
    let s = v(1);
    e && (n ? E(n) && (s = D(n)) : s = D(t));
    const c = Pt(r, o, n) ? pt(r) : v(0);
    let l = (i.left + c.x) / s.x
        , f = (i.top + c.y) / s.y
        , u = i.width / s.x
        , d = i.height / s.y;
    if (r) {
        const p = m(r)
            , a = n && E(n) ? m(n) : n;
        let h = p.frameElement;
        for (; h && n && a !== p;) {
            const g = D(h)
                , x = h.getBoundingClientRect()
                , R = w(h)
                , S = x.left + (h.clientLeft + parseFloat(R.paddingLeft)) * g.x
                , T = x.top + (h.clientTop + parseFloat(R.paddingTop)) * g.y;
            l *= g.x,
                f *= g.y,
                u *= g.x,
                d *= g.y,
                l += S,
                f += T,
                h = m(h).frameElement
        }
    }
    return ft({
        width: u,
        height: d,
        x: l,
        y: f
    })
}
function Vt(t) {
    let { rect: e, offsetParent: o, strategy: n } = t;
    const i = y(o)
        , r = O(o);
    if (o === r)
        return e;
    let s = {
        scrollLeft: 0,
        scrollTop: 0
    }
        , c = v(1);
    const l = v(0);
    if ((i || !i && n !== "fixed") && ((C(o) !== "body" || V(r)) && (s = $(o)),
        y(o))) {
        const f = P(o);
        c = D(o),
            l.x = f.x + o.clientLeft,
            l.y = f.y + o.clientTop
    }
    return {
        width: e.width * c.x,
        height: e.height * c.y,
        x: e.x * c.x - s.scrollLeft * c.x + l.x,
        y: e.y * c.y - s.scrollTop * c.y + l.y
    }
}
function Bt(t) {
    return Array.from(t.getClientRects())
}
function gt(t) {
    return P(O(t)).left + $(t).scrollLeft
}
function Ft(t) {
    const e = O(t)
        , o = $(t)
        , n = t.ownerDocument.body
        , i = A(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth)
        , r = A(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
    let s = -o.scrollLeft + gt(t);
    const c = -o.scrollTop;
    return w(n).direction === "rtl" && (s += A(e.clientWidth, n.clientWidth) - i),
    {
        width: i,
        height: r,
        x: s,
        y: c
    }
}
function Ht(t, e) {
    const o = m(t)
        , n = O(t)
        , i = o.visualViewport;
    let r = n.clientWidth
        , s = n.clientHeight
        , c = 0
        , l = 0;
    if (i) {
        r = i.width,
            s = i.height;
        const f = G();
        (!f || f && e === "fixed") && (c = i.offsetLeft,
            l = i.offsetTop)
    }
    return {
        width: r,
        height: s,
        x: c,
        y: l
    }
}
function $t(t, e) {
    const o = P(t, !0, e === "fixed")
        , n = o.top + t.clientTop
        , i = o.left + t.clientLeft
        , r = y(t) ? D(t) : v(1)
        , s = t.clientWidth * r.x
        , c = t.clientHeight * r.y
        , l = i * r.x
        , f = n * r.y;
    return {
        width: s,
        height: c,
        x: l,
        y: f
    }
}
function nt(t, e, o) {
    let n;
    if (e === "viewport")
        n = Ht(t, o);
    else if (e === "document")
        n = Ft(O(t));
    else if (E(e))
        n = $t(e, o);
    else {
        const i = pt(t);
        n = {
            ...e,
            x: e.x - i.x,
            y: e.y - i.y
        }
    }
    return ft(n)
}
function mt(t, e) {
    const o = N(t);
    return o === e || !E(o) || H(o) ? !1 : w(o).position === "fixed" || mt(o, e)
}
function qt(t, e) {
    const o = e.get(t);
    if (o)
        return o;
    let n = z(t, [], !1).filter(c => E(c) && C(c) !== "body")
        , i = null;
    const r = w(t).position === "fixed";
    let s = r ? N(t) : t;
    for (; E(s) && !H(s);) {
        const c = w(s)
            , l = K(s);
        !l && c.position === "fixed" && (i = null),
            (r ? !l && !i : !l && c.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || V(s) && !l && mt(t, s)) ? n = n.filter(u => u !== s) : i = c,
            s = N(s)
    }
    return e.set(t, n),
        n
}
function Mt(t) {
    let { element: e, boundary: o, rootBoundary: n, strategy: i } = t;
    const s = [...o === "clippingAncestors" ? qt(e, this._c) : [].concat(o), n]
        , c = s[0]
        , l = s.reduce((f, u) => {
            const d = nt(e, u, i);
            return f.top = A(d.top, f.top),
                f.right = W(d.right, f.right),
                f.bottom = W(d.bottom, f.bottom),
                f.left = A(d.left, f.left),
                f
        }
            , nt(e, c, i));
    return {
        width: l.right - l.left,
        height: l.bottom - l.top,
        x: l.left,
        y: l.top
    }
}
function jt(t) {
    return dt(t)
}
function It(t, e, o) {
    const n = y(e)
        , i = O(e)
        , r = o === "fixed"
        , s = P(t, !0, r, e);
    let c = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const l = v(0);
    if (n || !n && !r)
        if ((C(e) !== "body" || V(i)) && (c = $(e)),
            n) {
            const f = P(e, !0, r, e);
            l.x = f.x + e.clientLeft,
                l.y = f.y + e.clientTop
        } else
            i && (l.x = gt(i));
    return {
        x: s.left + c.scrollLeft - l.x,
        y: s.top + c.scrollTop - l.y,
        width: s.width,
        height: s.height
    }
}
function ot(t, e) {
    return !y(t) || w(t).position === "fixed" ? null : e ? e(t) : t.offsetParent
}
function wt(t, e) {
    const o = m(t);
    if (!y(t))
        return o;
    let n = ot(t, e);
    for (; n && Nt(n) && w(n).position === "static";)
        n = ot(n, e);
    return n && (C(n) === "html" || C(n) === "body" && w(n).position === "static" && !K(n)) ? o : n || kt(t) || o
}
const Xt = async function (t) {
    let { reference: e, floating: o, strategy: n } = t;
    const i = this.getOffsetParent || wt
        , r = this.getDimensions;
    return {
        reference: It(e, await i(o), n),
        floating: {
            x: 0,
            y: 0,
            ...await r(o)
        }
    }
};
function Yt(t) {
    return w(t).direction === "rtl"
}
const _t = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Vt,
    getDocumentElement: O,
    getClippingRect: Mt,
    getOffsetParent: wt,
    getElementRects: Xt,
    getClientRects: Bt,
    getDimensions: jt,
    getScale: D,
    isElement: E,
    isRTL: Yt
}
    , zt = (t, e, o) => {
        const n = new Map
            , i = {
                platform: _t,
                ...o
            }
            , r = {
                ...i.platform,
                _c: n
            };
        return At(t, e, {
            ...i,
            platform: r
        })
    }
    , Kt = document.querySelectorAll(".skill");
Kt.forEach(t => {
    const e = t.querySelector(".tooltip-anchor")
        , o = t.querySelector(".skill-tooltip")
        , n = t.querySelector(".tooltip-arrow");
    function i() {
        !e || !o || !n || zt(e, o, {
            middleware: [Dt({
                element: n
            })]
        }).then(({ x: c, y: l, placement: f, middlewareData: u }) => {
            Object.assign(o.style, {
                left: `${c}px`,
                top: `${l - 5}px`
            });
            const { x: d, y: p } = u.arrow ?? {
                x: null,
                y: null
            }
                , a = f.split("-")
                , h = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right"
                }[a[0]];
            h && Object.assign(n.style, {
                left: d != null ? `${d}px` : "",
                top: p != null ? `${p}px` : "",
                right: "",
                bottom: "",
                [h]: "-4px"
            })
        }
        )
    }
    function r() {
        o?.classList.add("tooltip-visible"),
            i()
    }
    function s() {
        o?.classList.remove("tooltip-visible")
    }
    [["mouseenter", r], ["mouseleave", s]].forEach(([c, l]) => {
        t.addEventListener(c, l)
    }
    )
}
);
const Gt = document.querySelectorAll(".project-card");
function Jt(t) {
    t.muted = !0,
        t.playbackRate = 2,
        t.play(),
        t.setAttribute("loop", "")
}
function Qt(t) {
    t.playbackRate = 1,
        t.pause(),
        t.currentTime = 0
}
Gt.forEach(t => {
    const e = t.querySelector(".project-video");
    t?.addEventListener("mouseenter", () => Jt(e)),
        t?.addEventListener("mouseleave", () => Qt(e))
}
);

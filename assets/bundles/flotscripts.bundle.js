!(function (r) {
    (r.color = {}),
        (r.color.make = function (e, t, i, o) {
            var n = {};
            return (
                (n.r = e || 0),
                (n.g = t || 0),
                (n.b = i || 0),
                (n.a = null != o ? o : 1),
                (n.add = function (e, t) {
                    for (var i = 0; i < e.length; ++i) n[e.charAt(i)] += t;
                    return n.normalize();
                }),
                (n.scale = function (e, t) {
                    for (var i = 0; i < e.length; ++i) n[e.charAt(i)] *= t;
                    return n.normalize();
                }),
                (n.toString = function () {
                    return 1 <= n.a ? "rgb(" + [n.r, n.g, n.b].join(",") + ")" : "rgba(" + [n.r, n.g, n.b, n.a].join(",") + ")";
                }),
                (n.normalize = function () {
                    function e(e, t, i) {
                        return t < e ? e : i < t ? i : t;
                    }
                    return (n.r = e(0, parseInt(n.r), 255)), (n.g = e(0, parseInt(n.g), 255)), (n.b = e(0, parseInt(n.b), 255)), (n.a = e(0, n.a, 1)), n;
                }),
                (n.clone = function () {
                    return r.color.make(n.r, n.b, n.g, n.a);
                }),
                n.normalize()
            );
        }),
        (r.color.extract = function (e, t) {
            for (var i; ("" == (i = e.css(t).toLowerCase()) || "transparent" == i) && (e = e.parent()).length && !r.nodeName(e.get(0), "body"); );
            return r.color.parse((i = "rgba(0, 0, 0, 0)" == i ? "transparent" : i));
        }),
        (r.color.parse = function (e) {
            var t,
                i = r.color.make;
            if ((t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e))) return i(parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10));
            if ((t = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(e))) return i(parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10), parseFloat(t[4]));
            if ((t = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e))) return i(2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3]));
            if ((t = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(e)))
                return i(2.55 * parseFloat(t[1]), 2.55 * parseFloat(t[2]), 2.55 * parseFloat(t[3]), parseFloat(t[4]));
            if ((t = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e))) return i(parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16));
            if ((t = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e))) return i(parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16));
            e = r.trim(e).toLowerCase();
            return "transparent" == e ? i(255, 255, 255, 0) : i((t = o[e] || [0, 0, 0])[0], t[1], t[2]);
        });
    var o = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
    };
})(jQuery),
    (function (B) {
        var f = Object.prototype.hasOwnProperty;
        function G(e, t) {
            var i = t.children("." + e)[0];
            if (null == i && (((i = document.createElement("canvas")).className = e), B(i).css({ direction: "ltr", position: "absolute", left: 0, top: 0 }).appendTo(t), !i.getContext)) {
                if (!window.G_vmlCanvasManager)
                    throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
                i = window.G_vmlCanvasManager.initElement(i);
            }
            this.element = i;
            (e = this.context = i.getContext("2d")),
                (i = window.devicePixelRatio || 1),
                (e = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1);
            (this.pixelRatio = i / e), this.resize(t.width(), t.height()), (this.textContainer = null), (this.text = {}), (this._textCache = {});
        }
        function o(f, e, t, o) {
            var S = [],
                M = {
                    colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                    legend: { show: !0, noColumns: 1, labelFormatter: null, labelBoxBorderColor: "#ccc", container: null, position: "ne", margin: 5, backgroundColor: null, backgroundOpacity: 0.85, sorted: null },
                    xaxis: {
                        show: null,
                        position: "bottom",
                        mode: null,
                        font: null,
                        color: null,
                        tickColor: null,
                        transform: null,
                        inverseTransform: null,
                        min: null,
                        max: null,
                        autoscaleMargin: null,
                        ticks: null,
                        tickFormatter: null,
                        labelWidth: null,
                        labelHeight: null,
                        reserveSpace: null,
                        tickLength: null,
                        alignTicksWithAxis: null,
                        tickDecimals: null,
                        tickSize: null,
                        minTickSize: null,
                    },
                    yaxis: { autoscaleMargin: 0.02, position: "left" },
                    xaxes: [],
                    yaxes: [],
                    series: {
                        points: { show: !1, radius: 3, lineWidth: 2, fill: !0, fillColor: "#ffffff", symbol: "circle" },
                        lines: { lineWidth: 2, fill: !1, fillColor: null, steps: !1 },
                        bars: { show: !1, lineWidth: 2, barWidth: 1, fill: !0, fillColor: null, align: "left", horizontal: !1, zero: !0 },
                        shadowSize: 3,
                        highlightColor: null,
                    },
                    grid: {
                        show: !0,
                        aboveData: !1,
                        color: "#545454",
                        backgroundColor: null,
                        borderColor: null,
                        tickColor: null,
                        margin: 0,
                        labelMargin: 5,
                        axisMargin: 8,
                        borderWidth: 2,
                        minBorderMargin: null,
                        markings: null,
                        markingsColor: "#f4f4f4",
                        markingsLineWidth: 2,
                        clickable: !1,
                        hoverable: !1,
                        autoHighlight: !0,
                        mouseActiveRadius: 10,
                    },
                    interaction: { redrawOverlayInterval: 1e3 / 60 },
                    hooks: {},
                },
                d = null,
                l = null,
                u = null,
                k = null,
                c = null,
                p = [],
                g = [],
                y = { left: 0, right: 0, top: 0, bottom: 0 },
                w = 0,
                T = 0,
                z = { processOptions: [], processRawData: [], processDatapoints: [], processOffset: [], drawBackground: [], drawSeries: [], draw: [], bindEvents: [], drawOverlay: [], shutdown: [] },
                C = this;
            function A(e, t) {
                t = [C].concat(t);
                for (var i = 0; i < e.length; ++i) e[i].apply(this, t);
            }
            function i(e) {
                (S = (function (e) {
                    for (var t = [], i = 0; i < e.length; ++i) {
                        var o = B.extend(!0, {}, M.series);
                        null != e[i].data ? ((o.data = e[i].data), delete e[i].data, B.extend(!0, o, e[i]), (e[i].data = o.data)) : (o.data = e[i]), t.push(o);
                    }
                    return t;
                })(e)),
                    (function () {
                        var e,
                            t = S.length,
                            i = -1;
                        for (e = 0; e < S.length; ++e) {
                            var o = S[e].color;
                            null != o && (t--, "number" == typeof o && i < o && (i = o));
                        }
                        t <= i && (t = i + 1);
                        var n,
                            r = [],
                            a = M.colors,
                            s = a.length,
                            l = 0;
                        for (e = 0; e < t; e++) (n = B.color.parse(a[e % s] || "#666")), e % s == 0 && e && (l = 0 <= l ? (l < 0.5 ? -l - 0.2 : 0) : -l), (r[e] = n.scale("rgb", 1 + l));
                        var c,
                            u = 0;
                        for (e = 0; e < S.length; ++e) {
                            if ((null == (c = S[e]).color ? ((c.color = r[u].toString()), ++u) : "number" == typeof c.color && (c.color = r[c.color].toString()), null == c.lines.show)) {
                                var h,
                                    d = !0;
                                for (h in c)
                                    if (c[h] && c[h].show) {
                                        d = !1;
                                        break;
                                    }
                                d && (c.lines.show = !0);
                            }
                            null == c.lines.zero && (c.lines.zero = !!c.lines.fill), (c.xaxis = x(p, m(c, "x"))), (c.yaxis = x(g, m(c, "y")));
                        }
                    })(),
                    (function () {
                        var e,
                            t,
                            i,
                            o,
                            n,
                            r,
                            a,
                            s,
                            l,
                            c,
                            u,
                            h,
                            d,
                            f = Number.POSITIVE_INFINITY,
                            p = Number.NEGATIVE_INFINITY,
                            g = Number.MAX_VALUE;
                        function m(e, t, i) {
                            t < e.datamin && t != -g && (e.datamin = t), i > e.datamax && i != g && (e.datamax = i);
                        }
                        for (
                            B.each(P(), function (e, t) {
                                (t.datamin = f), (t.datamax = p), (t.used = !1);
                            }),
                                e = 0;
                            e < S.length;
                            ++e
                        )
                            ((n = S[e]).datapoints = { points: [] }), A(z.processRawData, [n, n.data, n.datapoints]);
                        for (e = 0; e < S.length; ++e) {
                            var x;
                            if (
                                ((n = S[e]),
                                (u = n.data),
                                (h = n.datapoints.format) ||
                                    ((h = []).push({ x: !0, number: !0, required: !0 }),
                                    h.push({ y: !0, number: !0, required: !0 }),
                                    (n.bars.show || (n.lines.show && n.lines.fill)) &&
                                        ((x = !!((n.bars.show && n.bars.zero) || (n.lines.show && n.lines.zero))),
                                        h.push({ y: !0, number: !0, required: !1, defaultValue: 0, autoscale: x }),
                                        n.bars.horizontal && (delete h[h.length - 1].y, (h[h.length - 1].x = !0))),
                                    (n.datapoints.format = h)),
                                null == n.datapoints.pointsize)
                            ) {
                                (n.datapoints.pointsize = h.length), (a = n.datapoints.pointsize), (r = n.datapoints.points);
                                var b = n.lines.show && n.lines.steps;
                                for (n.xaxis.used = n.yaxis.used = !0, t = i = 0; t < u.length; ++t, i += a) {
                                    var v = null == (c = u[t]);
                                    if (!v)
                                        for (o = 0; o < a; ++o)
                                            (s = c[o]),
                                                (l = h[o]) &&
                                                    (l.number && null != s && ((s = +s), isNaN(s) ? (s = null) : s == 1 / 0 ? (s = g) : s == -1 / 0 && (s = -g)),
                                                    null == s && (l.required && (v = !0), null != l.defaultValue && (s = l.defaultValue))),
                                                (r[i + o] = s);
                                    if (v) for (o = 0; o < a; ++o) null != (s = r[i + o]) && !1 !== (l = h[o]).autoscale && (l.x && m(n.xaxis, s, s), l.y && m(n.yaxis, s, s)), (r[i + o] = null);
                                    else if (b && 0 < i && null != r[i - a] && r[i - a] != r[i] && r[i - a + 1] != r[i + 1]) {
                                        for (o = 0; o < a; ++o) r[i + a + o] = r[i + o];
                                        (r[i + 1] = r[i - a + 1]), (i += a);
                                    }
                                }
                            }
                        }
                        for (e = 0; e < S.length; ++e) (n = S[e]), A(z.processDatapoints, [n, n.datapoints]);
                        for (e = 0; e < S.length; ++e) {
                            (n = S[e]), (r = n.datapoints.points), (a = n.datapoints.pointsize), (h = n.datapoints.format);
                            var k = f,
                                y = f,
                                w = p,
                                M = p;
                            for (t = 0; t < r.length; t += a)
                                if (null != r[t]) for (o = 0; o < a; ++o) (s = r[t + o]), (l = h[o]) && !1 !== l.autoscale && s != g && s != -g && (l.x && (s < k && (k = s), w < s && (w = s)), l.y && (s < y && (y = s), M < s && (M = s)));
                            if (n.bars.show) {
                                switch (n.bars.align) {
                                    case "left":
                                        d = 0;
                                        break;
                                    case "right":
                                        d = -n.bars.barWidth;
                                        break;
                                    default:
                                        d = -n.bars.barWidth / 2;
                                }
                                n.bars.horizontal ? ((y += d), (M += d + n.bars.barWidth)) : ((k += d), (w += d + n.bars.barWidth));
                            }
                            m(n.xaxis, k, w), m(n.yaxis, y, M);
                        }
                        B.each(P(), function (e, t) {
                            t.datamin == f && (t.datamin = null), t.datamax == p && (t.datamax = null);
                        });
                    })();
            }
            function m(e, t) {
                t = e[t + "axis"];
                return (t = "number" != typeof (t = "object" == typeof t ? t.n : t) ? 1 : t);
            }
            function P() {
                return B.grep(p.concat(g), function (e) {
                    return e;
                });
            }
            function h(e) {
                for (var t, i = {}, o = 0; o < p.length; ++o) (t = p[o]) && t.used && (i["x" + t.n] = t.c2p(e.left));
                for (o = 0; o < g.length; ++o) (t = g[o]) && t.used && (i["y" + t.n] = t.c2p(e.top));
                return void 0 !== i.x1 && (i.x = i.x1), void 0 !== i.y1 && (i.y = i.y1), i;
            }
            function x(e, t) {
                return e[t - 1] || (e[t - 1] = { n: t, direction: e == p ? "x" : "y", options: B.extend(!0, {}, e == p ? M.xaxis : M.yaxis) }), e[t - 1];
            }
            function n() {
                F && clearTimeout(F), u.unbind("mousemove", D), u.unbind("mouseleave", O), u.unbind("click", N), A(z.shutdown, [u]);
            }
            function r() {
                var e,
                    t,
                    i = P(),
                    o = M.grid.show;
                for (t in y) {
                    var n = M.grid.margin || 0;
                    y[t] = "number" == typeof n ? n : n[t] || 0;
                }
                for (t in (A(z.processOffset, [y]), y)) "object" == typeof M.grid.borderWidth ? (y[t] += o ? M.grid.borderWidth[t] : 0) : (y[t] += o ? M.grid.borderWidth : 0);
                if (
                    (B.each(i, function (e, t) {
                        var i = t.options;
                        (t.show = null == i.show ? t.used : i.show),
                            (t.reserveSpace = null == i.reserveSpace ? t.show : i.reserveSpace),
                            (function (e) {
                                var t = e.options,
                                    i = +(null != t.min ? t.min : e.datamin),
                                    o = +(null != t.max ? t.max : e.datamax),
                                    n = o - i;
                                {
                                    var r;
                                    0 == n
                                        ? ((r = 0 == o ? 1 : 0.01), null == t.min && (i -= r), (null != t.max && null == t.min) || (o += r))
                                        : null != (r = t.autoscaleMargin) &&
                                          (null == t.min && (i -= n * r) < 0 && null != e.datamin && 0 <= e.datamin && (i = 0), null == t.max && 0 < (o += n * r) && null != e.datamax && e.datamax <= 0 && (o = 0));
                                }
                                (e.min = i), (e.max = o);
                            })(t);
                    }),
                    o)
                ) {
                    var r = B.grep(i, function (e) {
                        return e.show || e.reserveSpace;
                    });
                    for (
                        B.each(r, function (e, t) {
                            var i, o;
                            !(function (e) {
                                var i = e.options;
                                a = "number" == typeof i.ticks && 0 < i.ticks ? i.ticks : 0.3 * Math.sqrt("x" == e.direction ? d.width : d.height);
                                var t = (e.max - e.min) / a,
                                    o = -Math.floor(Math.log(t) / Math.LN10),
                                    n = i.tickDecimals;
                                null != n && n < o && (o = n);
                                var r = Math.pow(10, -o),
                                    a = t / r;
                                a < 1.5 ? (l = 1) : a < 3 ? ((l = 2), 2.25 < a && (null == n || o + 1 <= n) && ((l = 2.5), ++o)) : (l = a < 7.5 ? 5 : 10);
                                (l *= r), null != i.minTickSize && l < i.minTickSize && (l = i.minTickSize);
                                if (((e.delta = t), (e.tickDecimals = Math.max(0, null != n ? n : o)), (e.tickSize = i.tickSize || l), "time" == i.mode && !e.tickGenerator)) throw new Error("Time mode requires the flot.time plugin.");
                                e.tickGenerator ||
                                    ((e.tickGenerator = function (e) {
                                        for (var t, i, o, n = [], r = ((i = e.min), (o = e.tickSize) * Math.floor(i / o)), a = 0, s = Number.NaN; (t = s), (s = r + a * e.tickSize), n.push(s), ++a, s < e.max && s != t; );
                                        return n;
                                    }),
                                    (e.tickFormatter = function (e, t) {
                                        var i = t.tickDecimals ? Math.pow(10, t.tickDecimals) : 1,
                                            o = "" + Math.round(e * i) / i;
                                        if (null != t.tickDecimals) {
                                            (e = o.indexOf(".")), (e = -1 == e ? 0 : o.length - e - 1);
                                            if (e < t.tickDecimals) return (e ? o : o + ".") + ("" + i).substr(1, t.tickDecimals - e);
                                        }
                                        return o;
                                    }));
                                B.isFunction(i.tickFormatter) &&
                                    (e.tickFormatter = function (e, t) {
                                        return "" + i.tickFormatter(e, t);
                                    });
                                {
                                    var s, l;
                                    null == i.alignTicksWithAxis ||
                                        ((s = ("x" == e.direction ? p : g)[i.alignTicksWithAxis - 1]) &&
                                            s.used &&
                                            s != e &&
                                            (0 < (o = e.tickGenerator(e)).length && (null == i.min && (e.min = Math.min(e.min, o[0])), null == i.max && 1 < o.length && (e.max = Math.max(e.max, o[o.length - 1]))),
                                            (e.tickGenerator = function (e) {
                                                for (var t, i = [], o = 0; o < s.ticks.length; ++o) (t = (s.ticks[o].v - s.min) / (s.max - s.min)), (t = e.min + t * (e.max - e.min)), i.push(t);
                                                return i;
                                            }),
                                            e.mode ||
                                                null != i.tickDecimals ||
                                                ((l = Math.max(0, 1 - Math.floor(Math.log(e.delta) / Math.LN10))), (1 < (o = e.tickGenerator(e)).length && /\..*0$/.test((o[1] - o[0]).toFixed(l))) || (e.tickDecimals = l))));
                                }
                            })(t),
                                (function (e) {
                                    var t,
                                        i,
                                        o = e.options.ticks,
                                        n = [];
                                    null == o || ("number" == typeof o && 0 < o) ? (n = e.tickGenerator(e)) : o && (n = B.isFunction(o) ? o(e) : o);
                                    for (e.ticks = [], t = 0; t < n.length; ++t) {
                                        var r = null,
                                            a = n[t];
                                        "object" == typeof a ? ((i = +a[0]), 1 < a.length && (r = a[1])) : (i = +a), null == r && (r = e.tickFormatter(i, e)), isNaN(i) || e.ticks.push({ v: i, label: r });
                                    }
                                })(t),
                                (o = (i = t).ticks),
                                i.options.autoscaleMargin && 0 < o.length && (null == i.options.min && (i.min = Math.min(i.min, o[0].v)), null == i.options.max && 1 < o.length && (i.max = Math.max(i.max, o[o.length - 1].v))),
                                (function (e) {
                                    for (
                                        var t = e.options,
                                            i = e.ticks || [],
                                            o = t.labelWidth || 0,
                                            n = t.labelHeight || 0,
                                            r = o || ("x" == e.direction ? Math.floor(d.width / (i.length || 1)) : null),
                                            a = e.direction + "Axis " + e.direction + e.n + "Axis",
                                            s = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + a,
                                            l = t.font || "flot-tick-label tickLabel",
                                            c = 0;
                                        c < i.length;
                                        ++c
                                    ) {
                                        var u = i[c];
                                        u.label && ((u = d.getTextInfo(s, u.label, l, null, r)), (o = Math.max(o, u.width)), (n = Math.max(n, u.height)));
                                    }
                                    (e.labelWidth = t.labelWidth || o), (e.labelHeight = t.labelHeight || n);
                                })(t);
                        }),
                            e = r.length - 1;
                        0 <= e;
                        --e
                    )
                        !(function (i) {
                            var e = i.labelWidth,
                                t = i.labelHeight,
                                o = i.options.position,
                                n = "x" === i.direction,
                                r = i.options.tickLength,
                                a = M.grid.axisMargin,
                                s = M.grid.labelMargin,
                                l = !0,
                                c = !0,
                                u = !0,
                                h = !1;
                            B.each(n ? p : g, function (e, t) {
                                t && (t.show || t.reserveSpace) && (t === i ? (h = !0) : t.options.position === o && (h ? (c = !1) : (l = !1)), h || (u = !1));
                            }),
                                c && (a = 0),
                                null == r && (r = u ? "full" : 5),
                                isNaN(+r) || (s += +r),
                                n
                                    ? ((t += s), "bottom" == o ? ((y.bottom += t + a), (i.box = { top: d.height - y.bottom, height: t })) : ((i.box = { top: y.top + a, height: t }), (y.top += t + a)))
                                    : ((e += s), "left" == o ? ((i.box = { left: y.left + a, width: e }), (y.left += e + a)) : ((y.right += e + a), (i.box = { left: d.width - y.right, width: e }))),
                                (i.position = o),
                                (i.tickLength = r),
                                (i.box.padding = s),
                                (i.innermost = l);
                        })(r[e]);
                    !(function () {
                        var e,
                            t = M.grid.minBorderMargin;
                        if (null == t) for (e = t = 0; e < S.length; ++e) t = Math.max(t, 2 * (S[e].points.radius + S[e].points.lineWidth / 2));
                        var i = { left: t, right: t, top: t, bottom: t };
                        B.each(P(), function (e, t) {
                            t.reserveSpace &&
                                t.ticks &&
                                t.ticks.length &&
                                ("x" === t.direction
                                    ? ((i.left = Math.max(i.left, t.labelWidth / 2)), (i.right = Math.max(i.right, t.labelWidth / 2)))
                                    : ((i.bottom = Math.max(i.bottom, t.labelHeight / 2)), (i.top = Math.max(i.top, t.labelHeight / 2))));
                        }),
                            (y.left = Math.ceil(Math.max(i.left, y.left))),
                            (y.right = Math.ceil(Math.max(i.right, y.right))),
                            (y.top = Math.ceil(Math.max(i.top, y.top))),
                            (y.bottom = Math.ceil(Math.max(i.bottom, y.bottom)));
                    })(),
                        B.each(r, function (e, t) {
                            "x" == (t = t).direction
                                ? ((t.box.left = y.left - t.labelWidth / 2), (t.box.width = d.width - y.left - y.right + t.labelWidth))
                                : ((t.box.top = y.top - t.labelHeight / 2), (t.box.height = d.height - y.bottom - y.top + t.labelHeight));
                        });
                }
                (w = d.width - y.left - y.right),
                    (T = d.height - y.bottom - y.top),
                    B.each(i, function (e, t) {
                        function i(e) {
                            return e;
                        }
                        var o, n, r, a;
                        (n = (t = t).options.transform || i),
                            (r = t.options.inverseTransform),
                            (a = "x" == t.direction ? ((o = t.scale = w / Math.abs(n(t.max) - n(t.min))), Math.min(n(t.max), n(t.min))) : ((o = -(o = t.scale = T / Math.abs(n(t.max) - n(t.min)))), Math.max(n(t.max), n(t.min)))),
                            (t.p2c =
                                n == i
                                    ? function (e) {
                                          return (e - a) * o;
                                      }
                                    : function (e) {
                                          return (n(e) - a) * o;
                                      }),
                            (t.c2p = r
                                ? function (e) {
                                      return r(a + e / o);
                                  }
                                : function (e) {
                                      return a + e / o;
                                  });
                    }),
                    o &&
                        B.each(P(), function (e, t) {
                            var i,
                                o,
                                n,
                                r,
                                a,
                                s = t.box,
                                l = t.direction + "Axis " + t.direction + t.n + "Axis",
                                c = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + l,
                                u = t.options.font || "flot-tick-label tickLabel";
                            if ((d.removeText(c), t.show && 0 != t.ticks.length))
                                for (var h = 0; h < t.ticks.length; ++h)
                                    !(i = t.ticks[h]).label ||
                                        i.v < t.min ||
                                        i.v > t.max ||
                                        ("x" == t.direction
                                            ? ((r = "center"), (o = y.left + t.p2c(i.v)), "bottom" == t.position ? (n = s.top + s.padding) : ((n = s.top + s.height - s.padding), (a = "bottom")))
                                            : ((a = "middle"), (n = y.top + t.p2c(i.v)), "left" == t.position ? ((o = s.left + s.width - s.padding), (r = "right")) : (o = s.left + s.padding)),
                                        d.addText(c, o, n, i.label, u, null, null, r, a));
                        }),
                    (function () {
                        null != M.legend.container ? B(M.legend.container).html("") : f.find(".legend").remove();
                        if (M.legend.show) {
                            for (var e, t, i, o = [], n = [], r = !1, a = M.legend.labelFormatter, s = 0; s < S.length; ++s) (e = S[s]).label && (t = a ? a(e.label, e) : e.label) && n.push({ label: t, color: e.color });
                            M.legend.sorted &&
                                (B.isFunction(M.legend.sorted)
                                    ? n.sort(M.legend.sorted)
                                    : "reverse" == M.legend.sorted
                                    ? n.reverse()
                                    : ((i = "descending" != M.legend.sorted),
                                      n.sort(function (e, t) {
                                          return e.label == t.label ? 0 : e.label < t.label != i ? 1 : -1;
                                      })));
                            for (var l, c, u, h, s = 0; s < n.length; ++s) {
                                var d = n[s];
                                s % M.legend.noColumns == 0 && (r && o.push("</tr>"), o.push("<tr>"), (r = !0)),
                                    o.push(
                                        '<td class="legendColorBox"><div style="border:1px solid ' +
                                            M.legend.labelBoxBorderColor +
                                            ';padding:1px"><div style="width:4px;height:0;border:5px solid ' +
                                            d.color +
                                            ';overflow:hidden"></div></div></td><td class="legendLabel">' +
                                            d.label +
                                            "</td>"
                                    );
                            }
                            r && o.push("</tr>"),
                                0 != o.length &&
                                    ((h = '<table style="font-size:smaller;color:' + M.grid.color + '">' + o.join("") + "</table>"),
                                    null != M.legend.container
                                        ? B(M.legend.container).html(h)
                                        : ((l = ""),
                                          (c = M.legend.position),
                                          null == (u = M.legend.margin)[0] && (u = [u, u]),
                                          "n" == c.charAt(0) ? (l += "top:" + (u[1] + y.top) + "px;") : "s" == c.charAt(0) && (l += "bottom:" + (u[1] + y.bottom) + "px;"),
                                          "e" == c.charAt(1) ? (l += "right:" + (u[0] + y.right) + "px;") : "w" == c.charAt(1) && (l += "left:" + (u[0] + y.left) + "px;"),
                                          (c = B('<div class="legend">' + h.replace('style="', 'style="position:absolute;' + l + ";") + "</div>").appendTo(f)),
                                          0 != M.legend.backgroundOpacity &&
                                              (null == (u = M.legend.backgroundColor) && (((u = (u = M.grid.backgroundColor) && "string" == typeof u ? B.color.parse(u) : B.color.extract(c, "background-color")).a = 1), (u = u.toString())),
                                              (h = c.children()),
                                              B('<div style="position:absolute;width:' + h.width() + "px;height:" + h.height() + "px;" + l + "background-color:" + u + ';"> </div>')
                                                  .prependTo(c)
                                                  .css("opacity", M.legend.backgroundOpacity))));
                        }
                    })();
            }
            function a() {
                d.clear(), A(z.drawBackground, [k]);
                var e = M.grid;
                e.show && e.backgroundColor && (k.save(), k.translate(y.left, y.top), (k.fillStyle = E(M.grid.backgroundColor, T, 0, "rgba(255, 255, 255, 0)")), k.fillRect(0, 0, w, T), k.restore()), e.show && !e.aboveData && s();
                for (var t = 0; t < S.length; ++t)
                    A(z.drawSeries, [k, S[t]]),
                        (function (e) {
                            e.lines.show &&
                                (function (e) {
                                    function t(e, t, i, o, n) {
                                        var r = e.points,
                                            a = e.pointsize,
                                            s = null,
                                            l = null;
                                        k.beginPath();
                                        for (var c = a; c < r.length; c += a) {
                                            var u = r[c - a],
                                                h = r[c - a + 1],
                                                d = r[c],
                                                f = r[c + 1];
                                            if (null != u && null != d) {
                                                if (h <= f && h < n.min) {
                                                    if (f < n.min) continue;
                                                    (u = ((n.min - h) / (f - h)) * (d - u) + u), (h = n.min);
                                                } else if (f <= h && f < n.min) {
                                                    if (h < n.min) continue;
                                                    (d = ((n.min - h) / (f - h)) * (d - u) + u), (f = n.min);
                                                }
                                                if (f <= h && h > n.max) {
                                                    if (f > n.max) continue;
                                                    (u = ((n.max - h) / (f - h)) * (d - u) + u), (h = n.max);
                                                } else if (h <= f && f > n.max) {
                                                    if (h > n.max) continue;
                                                    (d = ((n.max - h) / (f - h)) * (d - u) + u), (f = n.max);
                                                }
                                                if (u <= d && u < o.min) {
                                                    if (d < o.min) continue;
                                                    (h = ((o.min - u) / (d - u)) * (f - h) + h), (u = o.min);
                                                } else if (d <= u && d < o.min) {
                                                    if (u < o.min) continue;
                                                    (f = ((o.min - u) / (d - u)) * (f - h) + h), (d = o.min);
                                                }
                                                if (d <= u && u > o.max) {
                                                    if (d > o.max) continue;
                                                    (h = ((o.max - u) / (d - u)) * (f - h) + h), (u = o.max);
                                                } else if (u <= d && d > o.max) {
                                                    if (u > o.max) continue;
                                                    (f = ((o.max - u) / (d - u)) * (f - h) + h), (d = o.max);
                                                }
                                                (u == s && h == l) || k.moveTo(o.p2c(u) + t, n.p2c(h) + i), (s = d), (l = f), k.lineTo(o.p2c(d) + t, n.p2c(f) + i);
                                            }
                                        }
                                        k.stroke();
                                    }
                                    k.save(), k.translate(y.left, y.top), (k.lineJoin = "round");
                                    var i = e.lines.lineWidth,
                                        o = e.shadowSize;
                                    {
                                        var n;
                                        0 < i &&
                                            0 < o &&
                                            ((k.lineWidth = o),
                                            (k.strokeStyle = "rgba(0,0,0,0.1)"),
                                            (n = Math.PI / 18),
                                            t(e.datapoints, Math.sin(n) * (i / 2 + o / 2), Math.cos(n) * (i / 2 + o / 2), e.xaxis, e.yaxis),
                                            (k.lineWidth = o / 2),
                                            t(e.datapoints, Math.sin(n) * (i / 2 + o / 4), Math.cos(n) * (i / 2 + o / 4), e.xaxis, e.yaxis));
                                    }
                                    (k.lineWidth = i), (k.strokeStyle = e.color);
                                    o = v(e.lines, e.color, 0, T);
                                    o &&
                                        ((k.fillStyle = o),
                                        (function (e, t, i) {
                                            for (var o = e.points, n = e.pointsize, r = Math.min(Math.max(0, i.min), i.max), a = 0, s = !1, l = 1, c = 0, u = 0; ; ) {
                                                if (0 < n && a > o.length + n) break;
                                                var h,
                                                    d,
                                                    f = o[(a += n) - n],
                                                    p = o[a - n + l],
                                                    g = o[a],
                                                    m = o[a + l];
                                                if (s) {
                                                    if (0 < n && null != f && null == g) {
                                                        (u = a), (n = -n), (l = 2);
                                                        continue;
                                                    }
                                                    if (n < 0 && a == c + n) {
                                                        k.fill(), (s = !1), (l = 1), (a = c = u + (n = -n));
                                                        continue;
                                                    }
                                                }
                                                if (null != f && null != g) {
                                                    if (f <= g && f < t.min) {
                                                        if (g < t.min) continue;
                                                        (p = ((t.min - f) / (g - f)) * (m - p) + p), (f = t.min);
                                                    } else if (g <= f && g < t.min) {
                                                        if (f < t.min) continue;
                                                        (m = ((t.min - f) / (g - f)) * (m - p) + p), (g = t.min);
                                                    }
                                                    if (g <= f && f > t.max) {
                                                        if (g > t.max) continue;
                                                        (p = ((t.max - f) / (g - f)) * (m - p) + p), (f = t.max);
                                                    } else if (f <= g && g > t.max) {
                                                        if (f > t.max) continue;
                                                        (m = ((t.max - f) / (g - f)) * (m - p) + p), (g = t.max);
                                                    }
                                                    s || (k.beginPath(), k.moveTo(t.p2c(f), i.p2c(r)), (s = !0)),
                                                        p >= i.max && m >= i.max
                                                            ? (k.lineTo(t.p2c(f), i.p2c(i.max)), k.lineTo(t.p2c(g), i.p2c(i.max)))
                                                            : p <= i.min && m <= i.min
                                                            ? (k.lineTo(t.p2c(f), i.p2c(i.min)), k.lineTo(t.p2c(g), i.p2c(i.min)))
                                                            : ((h = f),
                                                              (d = g),
                                                              p <= m && p < i.min && m >= i.min
                                                                  ? ((f = ((i.min - p) / (m - p)) * (g - f) + f), (p = i.min))
                                                                  : m <= p && m < i.min && p >= i.min && ((g = ((i.min - p) / (m - p)) * (g - f) + f), (m = i.min)),
                                                              m <= p && p > i.max && m <= i.max
                                                                  ? ((f = ((i.max - p) / (m - p)) * (g - f) + f), (p = i.max))
                                                                  : p <= m && m > i.max && p <= i.max && ((g = ((i.max - p) / (m - p)) * (g - f) + f), (m = i.max)),
                                                              f != h && k.lineTo(t.p2c(h), i.p2c(p)),
                                                              k.lineTo(t.p2c(f), i.p2c(p)),
                                                              k.lineTo(t.p2c(g), i.p2c(m)),
                                                              g != d && (k.lineTo(t.p2c(g), i.p2c(m)), k.lineTo(t.p2c(d), i.p2c(m))));
                                                }
                                            }
                                        })(e.datapoints, e.xaxis, e.yaxis));
                                    0 < i && t(e.datapoints, 0, 0, e.xaxis, e.yaxis);
                                    k.restore();
                                })(e);
                            e.bars.show &&
                                (function (c) {
                                    var e;
                                    switch ((k.save(), k.translate(y.left, y.top), (k.lineWidth = c.bars.lineWidth), (k.strokeStyle = c.color), c.bars.align)) {
                                        case "left":
                                            e = 0;
                                            break;
                                        case "right":
                                            e = -c.bars.barWidth;
                                            break;
                                        default:
                                            e = -c.bars.barWidth / 2;
                                    }
                                    var t = c.bars.fill
                                        ? function (e, t) {
                                              return v(c.bars, c.color, e, t);
                                          }
                                        : null;
                                    (function (e, t, i, o, n, r) {
                                        for (var a = e.points, s = e.pointsize, l = 0; l < a.length; l += s) null != a[l] && b(a[l], a[l + 1], a[l + 2], t, i, o, n, r, k, c.bars.horizontal, c.bars.lineWidth);
                                    })(c.datapoints, e, e + c.bars.barWidth, t, c.xaxis, c.yaxis),
                                        k.restore();
                                })(e);
                            e.points.show &&
                                (function (e) {
                                    function t(e, t, i, o, n, r, a, s) {
                                        for (var l = e.points, c = e.pointsize, u = 0; u < l.length; u += c) {
                                            var h = l[u],
                                                d = l[u + 1];
                                            null == h ||
                                                h < r.min ||
                                                h > r.max ||
                                                d < a.min ||
                                                d > a.max ||
                                                (k.beginPath(),
                                                (h = r.p2c(h)),
                                                (d = a.p2c(d) + o),
                                                "circle" == s ? k.arc(h, d, t, 0, n ? Math.PI : 2 * Math.PI, !1) : s(k, h, d, t, n),
                                                k.closePath(),
                                                i && ((k.fillStyle = i), k.fill()),
                                                k.stroke());
                                        }
                                    }
                                    k.save(), k.translate(y.left, y.top);
                                    var i = e.points.lineWidth,
                                        o = e.shadowSize,
                                        n = e.points.radius,
                                        r = e.points.symbol;
                                    0 == i && (i = 1e-4);
                                    0 < i &&
                                        0 < o &&
                                        ((o = o / 2),
                                        (k.lineWidth = o),
                                        (k.strokeStyle = "rgba(0,0,0,0.1)"),
                                        t(e.datapoints, n, null, o + o / 2, !0, e.xaxis, e.yaxis, r),
                                        (k.strokeStyle = "rgba(0,0,0,0.2)"),
                                        t(e.datapoints, n, null, o / 2, !0, e.xaxis, e.yaxis, r));
                                    (k.lineWidth = i), (k.strokeStyle = e.color), t(e.datapoints, n, v(e.points, e.color), 0, !1, e.xaxis, e.yaxis, r), k.restore();
                                })(e);
                        })(S[t]);
                A(z.draw, [k]), e.show && e.aboveData && s(), d.render(), q();
            }
            function W(e, t) {
                for (var i, o, n, r, a, s = P(), l = 0; l < s.length; ++l)
                    if ((i = s[l]).direction == t && e[(o = !e[(o = t + i.n + "axis")] && 1 == i.n ? t + "axis" : o)]) {
                        (r = e[o].from), (a = e[o].to);
                        break;
                    }
                return e[o] || ((i = ("x" == t ? p : g)[0]), (r = e[t + "1"]), (a = e[t + "2"])), null != r && null != a && a < r && ((n = r), (r = a), (a = n)), { from: r, to: a, axis: i };
            }
            function s() {
                var e, t;
                k.save(), k.translate(y.left, y.top);
                var i = M.grid.markings;
                if (i)
                    for (B.isFunction(i) && (((c = C.getAxes()).xmin = c.xaxis.min), (c.xmax = c.xaxis.max), (c.ymin = c.yaxis.min), (c.ymax = c.yaxis.max), (i = i(c))), e = 0; e < i.length; ++e) {
                        var o,
                            n,
                            r,
                            a = i[e],
                            s = W(a, "x"),
                            l = W(a, "y");
                        null == s.from && (s.from = s.axis.min),
                            null == s.to && (s.to = s.axis.max),
                            null == l.from && (l.from = l.axis.min),
                            null == l.to && (l.to = l.axis.max),
                            s.to < s.axis.min ||
                                s.from > s.axis.max ||
                                l.to < l.axis.min ||
                                l.from > l.axis.max ||
                                ((s.from = Math.max(s.from, s.axis.min)),
                                (s.to = Math.min(s.to, s.axis.max)),
                                (l.from = Math.max(l.from, l.axis.min)),
                                (l.to = Math.min(l.to, l.axis.max)),
                                (o = s.from === s.to),
                                (r = l.from === l.to),
                                (o && r) ||
                                    ((s.from = Math.floor(s.axis.p2c(s.from))),
                                    (s.to = Math.floor(s.axis.p2c(s.to))),
                                    (l.from = Math.floor(l.axis.p2c(l.from))),
                                    (l.to = Math.floor(l.axis.p2c(l.to))),
                                    o || r
                                        ? ((r = (n = a.lineWidth || M.grid.markingsLineWidth) % 2 ? 0.5 : 0),
                                          k.beginPath(),
                                          (k.strokeStyle = a.color || M.grid.markingsColor),
                                          (k.lineWidth = n),
                                          o ? (k.moveTo(s.to + r, l.from), k.lineTo(s.to + r, l.to)) : (k.moveTo(s.from, l.to + r), k.lineTo(s.to, l.to + r)),
                                          k.stroke())
                                        : ((k.fillStyle = a.color || M.grid.markingsColor), k.fillRect(s.from, l.to, s.to - s.from, l.from - l.to))));
                    }
                for (var c = P(), u = M.grid.borderWidth, h = 0; h < c.length; ++h) {
                    var d,
                        f,
                        p,
                        g = c[h],
                        m = g.box,
                        x = g.tickLength;
                    if (g.show && 0 != g.ticks.length) {
                        for (
                            k.lineWidth = 1,
                                "x" == g.direction
                                    ? ((d = 0), (f = "full" == x ? ("top" == g.position ? 0 : T) : m.top - y.top + ("top" == g.position ? m.height : 0)))
                                    : ((f = 0), (d = "full" == x ? ("left" == g.position ? 0 : w) : m.left - y.left + ("left" == g.position ? m.width : 0))),
                                g.innermost ||
                                    ((k.strokeStyle = g.options.color),
                                    k.beginPath(),
                                    (v = p = 0),
                                    "x" == g.direction ? (v = w + 1) : (p = T + 1),
                                    1 == k.lineWidth && ("x" == g.direction ? (f = Math.floor(f) + 0.5) : (d = Math.floor(d) + 0.5)),
                                    k.moveTo(d, f),
                                    k.lineTo(d + v, f + p),
                                    k.stroke()),
                                k.strokeStyle = g.options.tickColor,
                                k.beginPath(),
                                e = 0;
                            e < g.ticks.length;
                            ++e
                        ) {
                            var b = g.ticks[e].v,
                                v = (p = 0);
                            isNaN(b) ||
                                b < g.min ||
                                b > g.max ||
                                ("full" == x && (("object" == typeof u && 0 < u[g.position]) || 0 < u) && (b == g.min || b == g.max)) ||
                                ("x" == g.direction ? ((d = g.p2c(b)), (p = "full" == x ? -T : x), "top" == g.position && (p = -p)) : ((f = g.p2c(b)), (v = "full" == x ? -w : x), "left" == g.position && (v = -v)),
                                1 == k.lineWidth && ("x" == g.direction ? (d = Math.floor(d) + 0.5) : (f = Math.floor(f) + 0.5)),
                                k.moveTo(d, f),
                                k.lineTo(d + v, f + p));
                        }
                        k.stroke();
                    }
                }
                u &&
                    ((t = M.grid.borderColor),
                    "object" == typeof u || "object" == typeof t
                        ? ("object" != typeof t && (t = { top: t, right: t, bottom: t, left: t }),
                          0 < (u = "object" != typeof u ? { top: u, right: u, bottom: u, left: u } : u).top &&
                              ((k.strokeStyle = t.top), (k.lineWidth = u.top), k.beginPath(), k.moveTo(0 - u.left, 0 - u.top / 2), k.lineTo(w, 0 - u.top / 2), k.stroke()),
                          0 < u.right && ((k.strokeStyle = t.right), (k.lineWidth = u.right), k.beginPath(), k.moveTo(w + u.right / 2, 0 - u.top), k.lineTo(w + u.right / 2, T), k.stroke()),
                          0 < u.bottom && ((k.strokeStyle = t.bottom), (k.lineWidth = u.bottom), k.beginPath(), k.moveTo(w + u.right, T + u.bottom / 2), k.lineTo(0, T + u.bottom / 2), k.stroke()),
                          0 < u.left && ((k.strokeStyle = t.left), (k.lineWidth = u.left), k.beginPath(), k.moveTo(0 - u.left / 2, T + u.bottom), k.lineTo(0 - u.left / 2, 0), k.stroke()))
                        : ((k.lineWidth = u), (k.strokeStyle = M.grid.borderColor), k.strokeRect(-u / 2, -u / 2, w + u, T + u))),
                    k.restore();
            }
            function b(e, t, i, o, n, r, a, s, l, c, u) {
                var h, d, f, p, g, m, x, b, v;
                c
                    ? ((g = !(b = m = x = !0)), (p = t + o), (f = t + n), (d = e) < (h = i) && ((v = d), (d = h), (h = v), (m = !(g = !0))))
                    : ((b = !(g = m = x = !0)), (h = e + o), (d = e + n), (p = t) < (f = i) && ((v = p), (p = f), (f = v), (x = !(b = !0)))),
                    d < a.min ||
                        h > a.max ||
                        p < s.min ||
                        f > s.max ||
                        (h < a.min && ((h = a.min), (g = !1)),
                        d > a.max && ((d = a.max), (m = !1)),
                        f < s.min && ((f = s.min), (b = !1)),
                        p > s.max && ((p = s.max), (x = !1)),
                        (h = a.p2c(h)),
                        (f = s.p2c(f)),
                        (d = a.p2c(d)),
                        (p = s.p2c(p)),
                        r && ((l.fillStyle = r(f, p)), l.fillRect(h, p, d - h, f - p)),
                        0 < u &&
                            (g || m || x || b) &&
                            (l.beginPath(), l.moveTo(h, f), g ? l.lineTo(h, p) : l.moveTo(h, p), x ? l.lineTo(d, p) : l.moveTo(d, p), m ? l.lineTo(d, f) : l.moveTo(d, f), b ? l.lineTo(h, f) : l.moveTo(h, f), l.stroke()));
            }
            function v(e, t, i, o) {
                var n = e.fill;
                if (!n) return null;
                if (e.fillColor) return E(e.fillColor, i, o, t);
                t = B.color.parse(t);
                return (t.a = "number" == typeof n ? n : 0.4), t.normalize(), t.toString();
            }
            (C.setData = i),
                (C.setupGrid = r),
                (C.draw = a),
                (C.getPlaceholder = function () {
                    return f;
                }),
                (C.getCanvas = function () {
                    return d.element;
                }),
                (C.getPlotOffset = function () {
                    return y;
                }),
                (C.width = function () {
                    return w;
                }),
                (C.height = function () {
                    return T;
                }),
                (C.offset = function () {
                    var e = u.offset();
                    return (e.left += y.left), (e.top += y.top), e;
                }),
                (C.getData = function () {
                    return S;
                }),
                (C.getAxes = function () {
                    var i = {};
                    return (
                        B.each(p.concat(g), function (e, t) {
                            t && (i[t.direction + (1 != t.n ? t.n : "") + "axis"] = t);
                        }),
                        i
                    );
                }),
                (C.getXAxes = function () {
                    return p;
                }),
                (C.getYAxes = function () {
                    return g;
                }),
                (C.c2p = h),
                (C.p2c = function (e) {
                    var t,
                        i,
                        o,
                        n = {};
                    for (t = 0; t < p.length; ++t)
                        if ((i = p[t]) && i.used && ((o = "x" + i.n), null == e[o] && 1 == i.n && (o = "x"), null != e[o])) {
                            n.left = i.p2c(e[o]);
                            break;
                        }
                    for (t = 0; t < g.length; ++t)
                        if ((i = g[t]) && i.used && ((o = "y" + i.n), null == e[o] && 1 == i.n && (o = "y"), null != e[o])) {
                            n.top = i.p2c(e[o]);
                            break;
                        }
                    return n;
                }),
                (C.getOptions = function () {
                    return M;
                }),
                (C.highlight = L),
                (C.unhighlight = Y),
                (C.triggerRedrawOverlay = q),
                (C.pointOffset = function (e) {
                    return { left: parseInt(p[m(e, "x") - 1].p2c(+e.x) + y.left, 10), top: parseInt(g[m(e, "y") - 1].p2c(+e.y) + y.top, 10) };
                }),
                (C.shutdown = n),
                (C.destroy = function () {
                    n(), f.removeData("plot").empty(), (S = []), (p = []), (g = []), (I = []), (C = z = c = k = u = l = d = M = null);
                }),
                (C.resize = function () {
                    var e = f.width(),
                        t = f.height();
                    d.resize(e, t), l.resize(e, t);
                }),
                (C.hooks = z),
                (function () {
                    for (var e = { Canvas: G }, t = 0; t < o.length; ++t) {
                        var i = o[t];
                        i.init(C, e), i.options && B.extend(!0, M, i.options);
                    }
                })(),
                (function (e) {
                    B.extend(!0, M, e), e && e.colors && (M.colors = e.colors);
                    null == M.xaxis.color && (M.xaxis.color = B.color.parse(M.grid.color).scale("a", 0.22).toString());
                    null == M.yaxis.color && (M.yaxis.color = B.color.parse(M.grid.color).scale("a", 0.22).toString());
                    null == M.xaxis.tickColor && (M.xaxis.tickColor = M.grid.tickColor || M.xaxis.color);
                    null == M.yaxis.tickColor && (M.yaxis.tickColor = M.grid.tickColor || M.yaxis.color);
                    null == M.grid.borderColor && (M.grid.borderColor = M.grid.color);
                    null == M.grid.tickColor && (M.grid.tickColor = B.color.parse(M.grid.color).scale("a", 0.22).toString());
                    var t,
                        i,
                        o,
                        n,
                        e = f.css("font-size"),
                        e = e ? +e.replace("px", "") : 13,
                        r = { style: f.css("font-style"), size: Math.round(0.8 * e), variant: f.css("font-variant"), weight: f.css("font-weight"), family: f.css("font-family") };
                    for (o = M.xaxes.length || 1, t = 0; t < o; ++t)
                        (i = M.xaxes[t]) && !i.tickColor && (i.tickColor = i.color),
                            (i = B.extend(!0, {}, M.xaxis, i)),
                            (M.xaxes[t] = i).font && ((i.font = B.extend({}, r, i.font)), i.font.color || (i.font.color = i.color), i.font.lineHeight || (i.font.lineHeight = Math.round(1.15 * i.font.size)));
                    for (o = M.yaxes.length || 1, t = 0; t < o; ++t)
                        (i = M.yaxes[t]) && !i.tickColor && (i.tickColor = i.color),
                            (i = B.extend(!0, {}, M.yaxis, i)),
                            (M.yaxes[t] = i).font && ((i.font = B.extend({}, r, i.font)), i.font.color || (i.font.color = i.color), i.font.lineHeight || (i.font.lineHeight = Math.round(1.15 * i.font.size)));
                    M.xaxis.noTicks && null == M.xaxis.ticks && (M.xaxis.ticks = M.xaxis.noTicks);
                    M.yaxis.noTicks && null == M.yaxis.ticks && (M.yaxis.ticks = M.yaxis.noTicks);
                    M.x2axis && ((M.xaxes[1] = B.extend(!0, {}, M.xaxis, M.x2axis)), (M.xaxes[1].position = "top"), null == M.x2axis.min && (M.xaxes[1].min = null), null == M.x2axis.max && (M.xaxes[1].max = null));
                    M.y2axis && ((M.yaxes[1] = B.extend(!0, {}, M.yaxis, M.y2axis)), (M.yaxes[1].position = "right"), null == M.y2axis.min && (M.yaxes[1].min = null), null == M.y2axis.max && (M.yaxes[1].max = null));
                    M.grid.coloredAreas && (M.grid.markings = M.grid.coloredAreas);
                    M.grid.coloredAreasColor && (M.grid.markingsColor = M.grid.coloredAreasColor);
                    M.lines && B.extend(!0, M.series.lines, M.lines);
                    M.points && B.extend(!0, M.series.points, M.points);
                    M.bars && B.extend(!0, M.series.bars, M.bars);
                    null != M.shadowSize && (M.series.shadowSize = M.shadowSize);
                    null != M.highlightColor && (M.series.highlightColor = M.highlightColor);
                    for (t = 0; t < M.xaxes.length; ++t) x(p, t + 1).options = M.xaxes[t];
                    for (t = 0; t < M.yaxes.length; ++t) x(g, t + 1).options = M.yaxes[t];
                    for (n in z) M.hooks[n] && M.hooks[n].length && (z[n] = z[n].concat(M.hooks[n]));
                    A(z.processOptions, [M]);
                })(t),
                (function () {
                    f
                        .css("padding", 0)
                        .children()
                        .filter(function () {
                            return !B(this).hasClass("flot-overlay") && !B(this).hasClass("flot-base");
                        })
                        .remove(),
                        "static" == f.css("position") && f.css("position", "relative");
                    (d = new G("flot-base", f)), (l = new G("flot-overlay", f)), (k = d.context), (c = l.context), (u = B(l.element).unbind());
                    var e = f.data("plot");
                    e && (e.shutdown(), l.clear());
                    f.data("plot", C);
                })(),
                i(e),
                r(),
                a(),
                (function () {
                    M.grid.hoverable && (u.mousemove(D), u.bind("mouseleave", O));
                    M.grid.clickable && u.click(N);
                    A(z.bindEvents, [u]);
                })();
            var I = [],
                F = null;
            function D(e) {
                M.grid.hoverable &&
                    R("plothover", e, function (e) {
                        return 0 != e.hoverable;
                    });
            }
            function O(e) {
                M.grid.hoverable &&
                    R("plothover", e, function (e) {
                        return !1;
                    });
            }
            function N(e) {
                R("plotclick", e, function (e) {
                    return 0 != e.clickable;
                });
            }
            function R(e, t, i) {
                var o = u.offset(),
                    n = t.pageX - o.left - y.left,
                    r = t.pageY - o.top - y.top,
                    a = h({ left: n, top: r });
                (a.pageX = t.pageX), (a.pageY = t.pageY);
                var s = (function (e, t, i) {
                    for (var o, n = M.grid.mouseActiveRadius, r = n * n + 1, a = null, s = S.length - 1; 0 <= s; --s)
                        if (i(S[s])) {
                            var l,
                                c,
                                u = S[s],
                                h = u.xaxis,
                                d = u.yaxis,
                                f = u.datapoints.points,
                                p = h.c2p(e),
                                g = d.c2p(t),
                                m = n / h.scale,
                                x = n / d.scale,
                                b = u.datapoints.pointsize;
                            if ((h.options.inverseTransform && (m = Number.MAX_VALUE), d.options.inverseTransform && (x = Number.MAX_VALUE), u.lines.show || u.points.show))
                                for (o = 0; o < f.length; o += b) {
                                    var v,
                                        k = f[o],
                                        y = f[o + 1];
                                    null != k && (m < k - p || k - p < -m || x < y - g || y - g < -x || ((v = (v = Math.abs(h.p2c(k) - e)) * v + (v = Math.abs(d.p2c(y) - t)) * v) < r && ((r = v), (a = [s, o / b]))));
                                }
                            if (u.bars.show && !a) {
                                switch (u.bars.align) {
                                    case "left":
                                        l = 0;
                                        break;
                                    case "right":
                                        l = -u.bars.barWidth;
                                        break;
                                    default:
                                        l = -u.bars.barWidth / 2;
                                }
                                for (c = l + u.bars.barWidth, o = 0; o < f.length; o += b) {
                                    var k = f[o],
                                        y = f[o + 1],
                                        w = f[o + 2];
                                    null != k && (S[s].bars.horizontal ? p <= Math.max(w, k) && p >= Math.min(w, k) && y + l <= g && g <= y + c : k + l <= p && p <= k + c && g >= Math.min(w, y) && g <= Math.max(w, y)) && (a = [s, o / b]);
                                }
                            }
                        }
                    return a ? ((s = a[0]), (o = a[1]), (b = S[s].datapoints.pointsize), { datapoint: S[s].datapoints.points.slice(o * b, (o + 1) * b), dataIndex: o, series: S[s], seriesIndex: s }) : null;
                })(n, r, i);
                if ((s && ((s.pageX = parseInt(s.series.xaxis.p2c(s.datapoint[0]) + o.left + y.left, 10)), (s.pageY = parseInt(s.series.yaxis.p2c(s.datapoint[1]) + o.top + y.top, 10))), M.grid.autoHighlight)) {
                    for (var l = 0; l < I.length; ++l) {
                        var c = I[l];
                        c.auto != e || (s && c.series == s.series && c.point[0] == s.datapoint[0] && c.point[1] == s.datapoint[1]) || Y(c.series, c.point);
                    }
                    s && L(s.series, s.datapoint, e);
                }
                f.trigger(e, [a, s]);
            }
            function q() {
                var e = M.interaction.redrawOverlayInterval;
                -1 != e ? (F = F || setTimeout(H, e)) : H();
            }
            function H() {
                var e, t, i, o, n, r, a, s;
                for (F = null, c.save(), l.clear(), c.translate(y.left, y.top), e = 0; e < I.length; ++e)
                    (s = I[e]).series.bars.show
                        ? (function (e, t) {
                              var i,
                                  o = "string" == typeof e.highlightColor ? e.highlightColor : B.color.parse(e.color).scale("a", 0.5).toString(),
                                  n = o;
                              switch (e.bars.align) {
                                  case "left":
                                      i = 0;
                                      break;
                                  case "right":
                                      i = -e.bars.barWidth;
                                      break;
                                  default:
                                      i = -e.bars.barWidth / 2;
                              }
                              (c.lineWidth = e.bars.lineWidth),
                                  (c.strokeStyle = o),
                                  b(
                                      t[0],
                                      t[1],
                                      t[2] || 0,
                                      i,
                                      i + e.bars.barWidth,
                                      function () {
                                          return n;
                                      },
                                      e.xaxis,
                                      e.yaxis,
                                      c,
                                      e.bars.horizontal,
                                      e.bars.lineWidth
                                  );
                          })(s.series, s.point)
                        : ((t = s.series),
                          (i = s.point),
                          (s = a = r = n = o = void 0),
                          (o = i[0]),
                          (n = i[1]),
                          (r = t.xaxis),
                          (a = t.yaxis),
                          (s = "string" == typeof t.highlightColor ? t.highlightColor : B.color.parse(t.color).scale("a", 0.5).toString()),
                          o < r.min ||
                              o > r.max ||
                              n < a.min ||
                              n > a.max ||
                              ((i = t.points.radius + t.points.lineWidth / 2),
                              (c.lineWidth = i),
                              (c.strokeStyle = s),
                              (i = 1.5 * i),
                              (o = r.p2c(o)),
                              (n = a.p2c(n)),
                              c.beginPath(),
                              "circle" == t.points.symbol ? c.arc(o, n, i, 0, 2 * Math.PI, !1) : t.points.symbol(c, o, n, i, !1),
                              c.closePath(),
                              c.stroke()));
                c.restore(), A(z.drawOverlay, [c]);
            }
            function L(e, t, i) {
                "number" == typeof e && (e = S[e]), "number" == typeof t && ((o = e.datapoints.pointsize), (t = e.datapoints.points.slice(o * t, o * (t + 1))));
                var o = j(e, t);
                -1 == o ? (I.push({ series: e, point: t, auto: i }), q()) : i || (I[o].auto = !1);
            }
            function Y(e, t) {
                if (null == e && null == t) return (I = []), void q();
                var i;
                "number" == typeof e && (e = S[e]), "number" == typeof t && ((i = e.datapoints.pointsize), (t = e.datapoints.points.slice(i * t, i * (t + 1))));
                t = j(e, t);
                -1 != t && (I.splice(t, 1), q());
            }
            function j(e, t) {
                for (var i = 0; i < I.length; ++i) {
                    var o = I[i];
                    if (o.series == e && o.point[0] == t[0] && o.point[1] == t[1]) return i;
                }
                return -1;
            }
            function E(e, t, i, o) {
                if ("string" == typeof e) return e;
                for (var n = k.createLinearGradient(0, i, 0, t), r = 0, a = e.colors.length; r < a; ++r) {
                    var s,
                        l = e.colors[r];
                    "string" != typeof l && ((s = B.color.parse(o)), null != l.brightness && (s = s.scale("rgb", l.brightness)), null != l.opacity && (s.a *= l.opacity), (l = s.toString())), n.addColorStop(r / (a - 1), l);
                }
                return n;
            }
        }
        B.fn.detach ||
            (B.fn.detach = function () {
                return this.each(function () {
                    this.parentNode && this.parentNode.removeChild(this);
                });
            }),
            (G.prototype.resize = function (e, t) {
                if (e <= 0 || t <= 0) throw new Error("Invalid dimensions for plot, width = " + e + ", height = " + t);
                var i = this.element,
                    o = this.context,
                    n = this.pixelRatio;
                this.width != e && ((i.width = e * n), (i.style.width = e + "px"), (this.width = e)), this.height != t && ((i.height = t * n), (i.style.height = t + "px"), (this.height = t)), o.restore(), o.save(), o.scale(n, n);
            }),
            (G.prototype.clear = function () {
                this.context.clearRect(0, 0, this.width, this.height);
            }),
            (G.prototype.render = function () {
                var e,
                    t = this._textCache;
                for (e in t)
                    if (f.call(t, e)) {
                        var i,
                            o = this.getTextLayer(e),
                            n = t[e];
                        for (i in (o.hide(), n))
                            if (f.call(n, i)) {
                                var r,
                                    a = n[i];
                                for (r in a)
                                    if (f.call(a, r)) {
                                        for (var s, l = a[r].positions, c = 0; (s = l[c]); c++) s.active ? s.rendered || (o.append(s.element), (s.rendered = !0)) : (l.splice(c--, 1), s.rendered && s.element.detach());
                                        0 == l.length && delete a[r];
                                    }
                            }
                        o.show();
                    }
            }),
            (G.prototype.getTextLayer = function (e) {
                var t = this.text[e];
                return (
                    null == t &&
                        (null == this.textContainer &&
                            (this.textContainer = B("<div class='flot-text'></div>").css({ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, "font-size": "smaller", color: "#545454" }).insertAfter(this.element)),
                        (t = this.text[e] = B("<div></div>").addClass(e).css({ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }).appendTo(this.textContainer))),
                    t
                );
            }),
            (G.prototype.getTextInfo = function (e, t, i, o, n) {
                var r, a, s;
                return (
                    (t = "" + t),
                    (r = "object" == typeof i ? i.style + " " + i.variant + " " + i.weight + " " + i.size + "px/" + i.lineHeight + "px " + i.family : i),
                    null == (s = (a = null == (a = (s = null == (s = this._textCache[e]) ? (this._textCache[e] = {}) : s)[r]) ? (s[r] = {}) : a)[t]) &&
                        ((e = B("<div></div>").html(t).css({ position: "absolute", "max-width": n, top: -9999 }).appendTo(this.getTextLayer(e))),
                        "object" == typeof i ? e.css({ font: r, color: i.color }) : "string" == typeof i && e.addClass(i),
                        (s = a[t] = { width: e.outerWidth(!0), height: e.outerHeight(!0), element: e, positions: [] }),
                        e.detach()),
                    s
                );
            }),
            (G.prototype.addText = function (e, t, i, o, n, r, a, s, l) {
                var a = this.getTextInfo(e, o, n, r, a),
                    c = a.positions;
                "center" == s ? (t -= a.width / 2) : "right" == s && (t -= a.width), "middle" == l ? (i -= a.height / 2) : "bottom" == l && (i -= a.height);
                for (var u, h = 0; (u = c[h]); h++) if (u.x == t && u.y == i) return void (u.active = !0);
                (u = { active: !0, rendered: !1, element: c.length ? a.element.clone() : a.element, x: t, y: i }), c.push(u), u.element.css({ top: Math.round(i), left: Math.round(t), "text-align": s });
            }),
            (G.prototype.removeText = function (e, t, i, o, n, r) {
                if (null == o) {
                    var a = this._textCache[e];
                    if (null != a)
                        for (var s in a)
                            if (f.call(a, s)) {
                                var l,
                                    c = a[s];
                                for (l in c) if (f.call(c, l)) for (var u = c[l].positions, h = 0; (d = u[h]); h++) d.active = !1;
                            }
                } else for (var d, u = this.getTextInfo(e, o, n, r).positions, h = 0; (d = u[h]); h++) d.x == t && d.y == i && (d.active = !1);
            }),
            (B.plot = function (e, t, i) {
                return new o(B(e), t, i, B.plot.plugins);
            }),
            (B.plot.version = "0.8.3"),
            (B.plot.plugins = []),
            (B.fn.plot = function (e, t) {
                return this.each(function () {
                    B.plot(this, e, t);
                });
            });
    })(jQuery),
    (function (a, s, l) {
        var c,
            u = [],
            h = (a.resize = a.extend(a.resize, {})),
            d = !1,
            i = "setTimeout",
            f = "resize",
            p = f + "-special-event",
            g = "pendingDelay",
            o = "activeDelay",
            n = "throttleWindow";
        function m(e) {
            !0 === d && (d = e || 1);
            for (var t = u.length - 1; 0 <= t; t--) {
                var i,
                    o,
                    n,
                    r = a(u[t]);
                r[0] == s || r.is(":visible") ? ((i = r.width()), (o = r.height()), !(n = r.data(p)) || (i === n.w && o === n.h) || (r.trigger(f, [(n.w = i), (n.h = o)]), (d = e || !0))) : (((n = r.data(p)).w = 0), (n.h = 0));
            }
            null !== c && (d && (null == e || e - d < 1e3) ? (c = s.requestAnimationFrame(m)) : ((c = setTimeout(m, h[g])), (d = !1)));
        }
        (h[g] = 200),
            (h[o] = 20),
            (h[n] = !0),
            (a.event.special[f] = {
                setup: function () {
                    if (!h[n] && this[i]) return !1;
                    var e = a(this);
                    u.push(this), e.data(p, { w: e.width(), h: e.height() }), 1 === u.length && ((c = l), m());
                },
                teardown: function () {
                    if (!h[n] && this[i]) return !1;
                    for (var e = a(this), t = u.length - 1; 0 <= t; t--)
                        if (u[t] == this) {
                            u.splice(t, 1);
                            break;
                        }
                    e.removeData(p), u.length || ((d ? cancelAnimationFrame : clearTimeout)(c), (c = null));
                },
                add: function (e) {
                    return !(!h[n] && this[i]) && (a.isFunction(e) ? ((r = e), t) : ((r = e.handler), void (e.handler = t)));
                    var r;
                    function t(e, t, i) {
                        var o = a(this),
                            n = o.data(p) || {};
                        (n.w = t !== l ? t : o.width()), (n.h = i !== l ? i : o.height()), r.apply(this, arguments);
                    }
                },
            }),
            s.requestAnimationFrame ||
                (s.requestAnimationFrame =
                    s.webkitRequestAnimationFrame ||
                    s.mozRequestAnimationFrame ||
                    s.oRequestAnimationFrame ||
                    s.msRequestAnimationFrame ||
                    function (e, t) {
                        return s.setTimeout(function () {
                            e(new Date().getTime());
                        }, h[o]);
                    }),
            s.cancelAnimationFrame || (s.cancelAnimationFrame = s.webkitCancelRequestAnimationFrame || s.mozCancelRequestAnimationFrame || s.oCancelRequestAnimationFrame || s.msCancelRequestAnimationFrame || clearTimeout);
    })(jQuery, this),
    jQuery.plot.plugins.push({
        init: function (t) {
            function i() {
                var e = t.getPlaceholder();
                0 != e.width() && 0 != e.height() && (t.resize(), t.setupGrid(), t.draw());
            }
            t.hooks.bindEvents.push(function (e, t) {
                e.getPlaceholder().resize(i);
            }),
                t.hooks.shutdown.push(function (e, t) {
                    e.getPlaceholder().unbind("resize", i);
                });
        },
        options: {},
        name: "resize",
        version: "1.0",
    }),
    (function (v) {
        v.plot.plugins.push({
            init: function (c) {
                var n,
                    u = null,
                    h = null,
                    d = null,
                    f = null,
                    p = null,
                    r = !1,
                    g = null,
                    l = [];
                function m(e) {
                    var t;
                    0 < h.series.pie.innerRadius &&
                        (e.save(),
                        (t = 1 < h.series.pie.innerRadius ? h.series.pie.innerRadius : d * h.series.pie.innerRadius),
                        (e.globalCompositeOperation = "destination-out"),
                        e.beginPath(),
                        (e.fillStyle = h.series.pie.stroke.color),
                        e.arc(0, 0, t, 0, 2 * Math.PI, !1),
                        e.fill(),
                        e.closePath(),
                        e.restore(),
                        e.save(),
                        e.beginPath(),
                        (e.strokeStyle = h.series.pie.stroke.color),
                        e.arc(0, 0, t, 0, 2 * Math.PI, !1),
                        e.stroke(),
                        e.closePath(),
                        e.restore());
                }
                function x(e, t) {
                    for (var i, o, n = c.getData(), r = c.getOptions(), a = 1 < r.series.pie.radius ? r.series.pie.radius : d * r.series.pie.radius, s = 0; s < n.length; ++s) {
                        var l = n[s];
                        if (l.pie.show) {
                            if (
                                (g.save(),
                                g.beginPath(),
                                g.moveTo(0, 0),
                                g.arc(0, 0, a, l.startAngle, l.startAngle + l.angle / 2, !1),
                                g.arc(0, 0, a, l.startAngle + l.angle / 2, l.startAngle + l.angle, !1),
                                g.closePath(),
                                (i = e - f),
                                (o = t - p),
                                g.isPointInPath)
                            ) {
                                if (g.isPointInPath(e - f, t - p)) return g.restore(), { datapoint: [l.percent, l.data], dataIndex: 0, series: l, seriesIndex: s };
                            } else if (
                                (function (e, t) {
                                    for (var i = !1, o = -1, n = e.length, r = n - 1; ++o < n; r = o)
                                        ((e[o][1] <= t[1] && t[1] < e[r][1]) || (e[r][1] <= t[1] && t[1] < e[o][1])) && t[0] < ((e[r][0] - e[o][0]) * (t[1] - e[o][1])) / (e[r][1] - e[o][1]) + e[o][0] && (i = !i);
                                    return i;
                                })(
                                    [
                                        [0, 0],
                                        [a * Math.cos(l.startAngle), a * Math.sin(l.startAngle)],
                                        [a * Math.cos(l.startAngle + l.angle / 4), a * Math.sin(l.startAngle + l.angle / 4)],
                                        [a * Math.cos(l.startAngle + l.angle / 2), a * Math.sin(l.startAngle + l.angle / 2)],
                                        [a * Math.cos(l.startAngle + l.angle / 1.5), a * Math.sin(l.startAngle + l.angle / 1.5)],
                                        [a * Math.cos(l.startAngle + l.angle), a * Math.sin(l.startAngle + l.angle)],
                                    ],
                                    [i, o]
                                )
                            )
                                return g.restore(), { datapoint: [l.percent, l.data], dataIndex: 0, series: l, seriesIndex: s };
                            g.restore();
                        }
                    }
                    return null;
                }
                function i(e) {
                    t("plothover", e);
                }
                function o(e) {
                    t("plotclick", e);
                }
                function t(e, t) {
                    var i,
                        o,
                        n = c.offset(),
                        r = x(parseInt(t.pageX - n.left), parseInt(t.pageY - n.top));
                    if (h.grid.autoHighlight)
                        for (var a = 0; a < l.length; ++a) {
                            var s = l[a];
                            s.auto != e ||
                                (r && s.series == r.series) ||
                                (function (e) {
                                    null == e && ((l = []), c.triggerRedrawOverlay());
                                    e = b(e);
                                    -1 != e && (l.splice(e, 1), c.triggerRedrawOverlay());
                                })(s.series);
                        }
                    r && ((i = r.series), (o = e), -1 == (n = b(i)) ? (l.push({ series: i, auto: o }), c.triggerRedrawOverlay()) : o || (l[n].auto = !1));
                    t = { pageX: t.pageX, pageY: t.pageY };
                    u.trigger(e, [t, r]);
                }
                function b(e) {
                    for (var t = 0; t < l.length; ++t) if (l[t].series == e) return t;
                    return -1;
                }
                c.hooks.processOptions.push(function (e, t) {
                    t.series.pie.show &&
                        ((t.grid.show = !1),
                        "auto" == t.series.pie.label.show && (t.legend.show ? (t.series.pie.label.show = !1) : (t.series.pie.label.show = !0)),
                        "auto" == t.series.pie.radius && (t.series.pie.label.show ? (t.series.pie.radius = 0.75) : (t.series.pie.radius = 1)),
                        1 < t.series.pie.tilt ? (t.series.pie.tilt = 1) : t.series.pie.tilt < 0 && (t.series.pie.tilt = 0));
                }),
                    c.hooks.bindEvents.push(function (e, t) {
                        e = e.getOptions();
                        e.series.pie.show && (e.grid.hoverable && t.unbind("mousemove").mousemove(i), e.grid.clickable && t.unbind("click").click(o));
                    }),
                    c.hooks.processDatapoints.push(function (e, t, i, o) {
                        e.getOptions().series.pie.show &&
                            ((e = e),
                            r ||
                                ((r = !0),
                                (n = e.getCanvas()),
                                (u = v(n).parent()),
                                (h = e.getOptions()),
                                e.setData(
                                    (function (e) {
                                        for (var t = 0, i = 0, o = 0, n = h.series.pie.combine.color, r = [], a = 0; a < e.length; ++a) {
                                            var s = e[a].data;
                                            v.isArray(s) && 1 == s.length && (s = s[0]),
                                                v.isArray(s) ? (!isNaN(parseFloat(s[1])) && isFinite(s[1]) ? (s[1] = +s[1]) : (s[1] = 0)) : (s = !isNaN(parseFloat(s)) && isFinite(s) ? [1, +s] : [1, 0]),
                                                (e[a].data = [s]);
                                        }
                                        for (a = 0; a < e.length; ++a) t += e[a].data[0][1];
                                        for (a = 0; a < e.length; ++a) (s = e[a].data[0][1]) / t <= h.series.pie.combine.threshold && ((i += s), o++, (n = n || e[a].color));
                                        for (a = 0; a < e.length; ++a) {
                                            s = e[a].data[0][1];
                                            (o < 2 || s / t > h.series.pie.combine.threshold) && r.push(v.extend(e[a], { data: [[1, s]], color: e[a].color, label: e[a].label, angle: (s * Math.PI * 2) / t, percent: s / (t / 100) }));
                                        }
                                        1 < o && r.push({ data: [[1, i]], color: n, label: h.series.pie.combine.label, angle: (i * Math.PI * 2) / t, percent: i / (t / 100) });
                                        return r;
                                    })(e.getData())
                                )));
                    }),
                    c.hooks.drawOverlay.push(function (e, t) {
                        e.getOptions().series.pie.show &&
                            (function (e, t) {
                                var i = e.getOptions(),
                                    o = 1 < i.series.pie.radius ? i.series.pie.radius : d * i.series.pie.radius;
                                t.save(), t.translate(f, p), t.scale(1, i.series.pie.tilt);
                                for (var n = 0; n < l.length; ++n)
                                    !(function (e) {
                                        e.angle <= 0 ||
                                            isNaN(e.angle) ||
                                            ((t.fillStyle = "rgba(255, 255, 255, " + i.series.pie.highlight.opacity + ")"),
                                            t.beginPath(),
                                            1e-9 < Math.abs(e.angle - 2 * Math.PI) && t.moveTo(0, 0),
                                            t.arc(0, 0, o, e.startAngle, e.startAngle + e.angle / 2, !1),
                                            t.arc(0, 0, o, e.startAngle + e.angle / 2, e.startAngle + e.angle, !1),
                                            t.closePath(),
                                            t.fill());
                                    })(l[n].series);
                                m(t), t.restore();
                            })(e, t);
                    }),
                    c.hooks.draw.push(function (e, t) {
                        e.getOptions().series.pie.show &&
                            (function (e, t) {
                                if (u) {
                                    var a = e.getPlaceholder().width(),
                                        s = e.getPlaceholder().height(),
                                        i = u.children().filter(".legend").children().width() || 0;
                                    (g = t),
                                        (r = !1),
                                        (d = Math.min(a, s / h.series.pie.tilt) / 2),
                                        (p = s / 2 + h.series.pie.offset.top),
                                        (f = a / 2),
                                        "auto" == h.series.pie.offset.left ? (h.legend.position.match("w") ? (f += i / 2) : (f -= i / 2), f < d ? (f = d) : a - d < f && (f = a - d)) : (f += h.series.pie.offset.left);
                                    for (
                                        var l = e.getData(), o = 0;
                                        0 < o && (d *= 0.95),
                                            (o += 1),
                                            n(),
                                            h.series.pie.tilt <= 0.8 &&
                                                (function () {
                                                    var e = h.series.pie.shadow.left,
                                                        t = h.series.pie.shadow.top,
                                                        i = h.series.pie.shadow.alpha,
                                                        o = 1 < h.series.pie.radius ? h.series.pie.radius : d * h.series.pie.radius;
                                                    if (!(a / 2 - e <= o || o * h.series.pie.tilt >= s / 2 - t || o <= 10)) {
                                                        g.save(), g.translate(e, t), (g.globalAlpha = i), (g.fillStyle = "#000"), g.translate(f, p), g.scale(1, h.series.pie.tilt);
                                                        for (var n = 1; n <= 10; n++) g.beginPath(), g.arc(0, 0, o, 0, 2 * Math.PI, !1), g.fill(), (o -= n);
                                                        g.restore();
                                                    }
                                                })(),
                                            !(function () {
                                                var i = Math.PI * h.series.pie.startAngle,
                                                    o = 1 < h.series.pie.radius ? h.series.pie.radius : d * h.series.pie.radius;
                                                g.save(), g.translate(f, p), g.scale(1, h.series.pie.tilt), g.save();
                                                for (var n = i, e = 0; e < l.length; ++e) (l[e].startAngle = n), t(l[e].angle, l[e].color, !0);
                                                if ((g.restore(), 0 < h.series.pie.stroke.width)) {
                                                    g.save(), (g.lineWidth = h.series.pie.stroke.width), (n = i);
                                                    for (e = 0; e < l.length; ++e) t(l[e].angle, h.series.pie.stroke.color, !1);
                                                    g.restore();
                                                }
                                                return (
                                                    m(g),
                                                    g.restore(),
                                                    !h.series.pie.label.show ||
                                                        (function () {
                                                            for (var e = i, r = 1 < h.series.pie.label.radius ? h.series.pie.label.radius : d * h.series.pie.label.radius, t = 0; t < l.length; ++t) {
                                                                if (
                                                                    l[t].percent >= 100 * h.series.pie.label.threshold &&
                                                                    !(function (e, t, i) {
                                                                        if (0 == e.data[0][1]) return !0;
                                                                        var o = h.legend.labelFormatter,
                                                                            n = h.series.pie.label.formatter;
                                                                        o = o ? o(e.label, e) : e.label;
                                                                        n && (o = n(o, e));
                                                                        (n = (t + e.angle + t) / 2),
                                                                            (t = f + Math.round(Math.cos(n) * r)),
                                                                            (n = p + Math.round(Math.sin(n) * r) * h.series.pie.tilt),
                                                                            (o = "<span class='pieLabel' id='pieLabel" + i + "' style='position:absolute;top:" + n + "px;left:" + t + "px;'>" + o + "</span>");
                                                                        u.append(o);
                                                                        (o = u.children("#pieLabel" + i)), (i = n - o.height() / 2), (n = t - o.width() / 2);
                                                                        if ((o.css("top", i), o.css("left", n), 0 < 0 - i || 0 < 0 - n || s - (i + o.height()) < 0 || a - (n + o.width()) < 0)) return !1;
                                                                        0 != h.series.pie.label.background.opacity &&
                                                                            (null == (t = h.series.pie.label.background.color) && (t = e.color),
                                                                            (n = "top:" + i + "px;left:" + n + "px;"),
                                                                            v("<div class='pieLabelBackground' style='position:absolute;width:" + o.width() + "px;height:" + o.height() + "px;" + n + "background-color:" + t + ";'></div>")
                                                                                .css("opacity", h.series.pie.label.background.opacity)
                                                                                .insertBefore(o));
                                                                        return !0;
                                                                    })(l[t], e, t)
                                                                )
                                                                    return !1;
                                                                e += l[t].angle;
                                                            }
                                                            return !0;
                                                        })()
                                                );
                                                function t(e, t, i) {
                                                    e <= 0 ||
                                                        isNaN(e) ||
                                                        (i ? (g.fillStyle = t) : ((g.strokeStyle = t), (g.lineJoin = "round")),
                                                        g.beginPath(),
                                                        1e-9 < Math.abs(e - 2 * Math.PI) && g.moveTo(0, 0),
                                                        g.arc(0, 0, o, n, n + e / 2, !1),
                                                        g.arc(0, 0, o, n + e / 2, n + e, !1),
                                                        g.closePath(),
                                                        (n += e),
                                                        i ? g.fill() : g.stroke());
                                                }
                                            })() && o < 10;

                                    );
                                    10 <= o && (n(), u.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")), e.setSeries && e.insertLegend && (e.setSeries(l), e.insertLegend());
                                }
                                function n() {
                                    g.clearRect(0, 0, a, s), u.children().filter(".pieLabel, .pieLabelBackground").remove();
                                }
                            })(e, t);
                    });
            },
            options: {
                series: {
                    pie: {
                        show: !1,
                        radius: "auto",
                        innerRadius: 0,
                        startAngle: 1.5,
                        tilt: 1,
                        shadow: { left: 5, top: 15, alpha: 0.02 },
                        offset: { top: 0, left: "auto" },
                        stroke: { color: "#fff", width: 1 },
                        label: {
                            show: "auto",
                            formatter: function (e, t) {
                                return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + t.color + ";'>" + e + "<br/>" + Math.round(t.percent) + "%</div>";
                            },
                            radius: 1,
                            background: { color: null, opacity: 0 },
                            threshold: 0,
                        },
                        combine: { threshold: -1, color: null, label: "Other" },
                        highlight: { opacity: 0.5 },
                    },
                },
            },
            name: "pie",
            version: "1.1",
        });
    })(jQuery),
    (function (s) {
        function t(e, t, i, o) {
            var n = "categories" == t.xaxis.options.mode,
                r = "categories" == t.yaxis.options.mode;
            if (n || r) {
                var a,
                    s = o.format;
                s ||
                    ((a = t),
                    (s = []).push({ x: !0, number: !0, required: !0 }),
                    s.push({ y: !0, number: !0, required: !0 }),
                    (a.bars.show || (a.lines.show && a.lines.fill)) &&
                        ((t = !!((a.bars.show && a.bars.zero) || (a.lines.show && a.lines.zero))),
                        s.push({ y: !0, number: !0, required: !1, defaultValue: 0, autoscale: t }),
                        a.bars.horizontal && (delete s[s.length - 1].y, (s[s.length - 1].x = !0))),
                    (o.format = s));
                for (var l = 0; l < s.length; ++l) s[l].x && n && (s[l].number = !1), s[l].y && r && (s[l].number = !1);
            }
        }
        function l(e) {
            var t,
                i = [];
            for (t in e.categories) {
                var o = e.categories[t];
                o >= e.min && o <= e.max && i.push([o, t]);
            }
            return (
                i.sort(function (e, t) {
                    return e[0] - t[0];
                }),
                i
            );
        }
        function o(e, t, i) {
            if ("categories" == e[t].options.mode) {
                if (!e[t].categories) {
                    var o = {},
                        n = e[t].options.categories || {};
                    if (s.isArray(n)) for (var r = 0; r < n.length; ++r) o[n[r]] = r;
                    else for (var a in n) o[a] = n[a];
                    e[t].categories = o;
                }
                e[t].options.ticks || (e[t].options.ticks = l),
                    (function (e, t, i) {
                        for (
                            var o = e.points,
                                n = e.pointsize,
                                r = e.format,
                                a = t.charAt(0),
                                s = (function (e) {
                                    var t,
                                        i = -1;
                                    for (t in e) e[t] > i && (i = e[t]);
                                    return i + 1;
                                })(i),
                                l = 0;
                            l < o.length;
                            l += n
                        )
                            if (null != o[l])
                                for (var c = 0; c < n; ++c) {
                                    var u = o[l + c];
                                    null != u && r[c][a] && (u in i || ((i[u] = s), ++s), (o[l + c] = i[u]));
                                }
                    })(i, t, e[t].categories);
            }
        }
        function i(e, t, i) {
            o(t, "xaxis", i), o(t, "yaxis", i);
        }
        s.plot.plugins.push({
            init: function (e) {
                e.hooks.processRawData.push(t), e.hooks.processDatapoints.push(i);
            },
            options: { xaxis: { categories: null }, yaxis: { categories: null } },
            name: "categories",
            version: "1.0",
        });
    })(jQuery),
    (function (i) {
        function b(e, t) {
            return t * Math.floor(e / t);
        }
        function a(e, t, i, o) {
            if ("function" == typeof e.strftime) return e.strftime(t);
            function n(e, t) {
                return (t = "" + (null == t ? "0" : t)), 1 == (e = "" + e).length ? t + e : e;
            }
            var r = [],
                a = !1,
                s = e.getHours(),
                l = s < 12;
            null == i && (i = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]), null == o && (o = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
            for (var c = 12 < s ? s - 12 : 0 == s ? 12 : s, u = 0; u < t.length; ++u) {
                var h = t.charAt(u);
                if (a) {
                    switch (h) {
                        case "a":
                            h = "" + o[e.getDay()];
                            break;
                        case "b":
                            h = "" + i[e.getMonth()];
                            break;
                        case "d":
                            h = n(e.getDate());
                            break;
                        case "e":
                            h = n(e.getDate(), " ");
                            break;
                        case "h":
                        case "H":
                            h = n(s);
                            break;
                        case "I":
                            h = n(c);
                            break;
                        case "l":
                            h = n(c, " ");
                            break;
                        case "m":
                            h = n(e.getMonth() + 1);
                            break;
                        case "M":
                            h = n(e.getMinutes());
                            break;
                        case "q":
                            h = "" + (Math.floor(e.getMonth() / 3) + 1);
                            break;
                        case "S":
                            h = n(e.getSeconds());
                            break;
                        case "y":
                            h = n(e.getFullYear() % 100);
                            break;
                        case "Y":
                            h = "" + e.getFullYear();
                            break;
                        case "p":
                            h = l ? "am" : "pm";
                            break;
                        case "P":
                            h = l ? "AM" : "PM";
                            break;
                        case "w":
                            h = "" + e.getDay();
                    }
                    r.push(h), (a = !1);
                } else "%" == h ? (a = !0) : r.push(h);
            }
            return r.join("");
        }
        function o(e) {
            function t(e, t, i, o) {
                e[t] = function () {
                    return i[o].apply(i, arguments);
                };
            }
            var i = { date: e };
            null != e.strftime && t(i, "strftime", e, "strftime"), t(i, "getTime", e, "getTime"), t(i, "setTime", e, "setTime");
            for (var o = ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"], n = 0; n < o.length; n++) t(i, "get" + o[n], e, "getUTC" + o[n]), t(i, "set" + o[n], e, "setUTC" + o[n]);
            return i;
        }
        function v(e, t) {
            if ("browser" == t.timezone) return new Date(e);
            if (t.timezone && "utc" != t.timezone) {
                if ("undefined" == typeof timezoneJS || void 0 === timezoneJS.Date) return o(new Date(e));
                var i = new timezoneJS.Date();
                return i.setTimezone(t.timezone), i.setTime(e), i;
            }
            return o(new Date(e));
        }
        var k = { second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, month: 2592e6, quarter: 7776e6, year: 525949.2 * 60 * 1e3 },
            e = [
                [1, "second"],
                [2, "second"],
                [5, "second"],
                [10, "second"],
                [30, "second"],
                [1, "minute"],
                [2, "minute"],
                [5, "minute"],
                [10, "minute"],
                [30, "minute"],
                [1, "hour"],
                [2, "hour"],
                [4, "hour"],
                [8, "hour"],
                [12, "hour"],
                [1, "day"],
                [2, "day"],
                [3, "day"],
                [0.25, "month"],
                [0.5, "month"],
                [1, "month"],
                [2, "month"],
            ],
            y = e.concat([
                [3, "month"],
                [6, "month"],
                [1, "year"],
            ]),
            w = e.concat([
                [1, "quarter"],
                [2, "quarter"],
                [1, "year"],
            ]);
        i.plot.plugins.push({
            init: function (e) {
                e.hooks.processOptions.push(function (e, t) {
                    i.each(e.getAxes(), function (e, t) {
                        var x = t.options;
                        "time" == x.mode &&
                            ((t.tickGenerator = function (e) {
                                var t = [],
                                    i = v(e.min, x),
                                    o = 0,
                                    n = (x.tickSize && "quarter" === x.tickSize[1]) || (x.minTickSize && "quarter" === x.minTickSize[1]) ? w : y;
                                null != x.minTickSize && (o = "number" == typeof x.tickSize ? x.tickSize : x.minTickSize[0] * k[x.minTickSize[1]]);
                                for (var r = 0; r < n.length - 1 && !(e.delta < (n[r][0] * k[n[r][1]] + n[r + 1][0] * k[n[r + 1][1]]) / 2 && n[r][0] * k[n[r][1]] >= o); ++r);
                                var a,
                                    s,
                                    l = n[r][0];
                                "year" == (u = n[r][1]) &&
                                    (null != x.minTickSize && "year" == x.minTickSize[1]
                                        ? (l = Math.floor(x.minTickSize[0]))
                                        : ((a = Math.pow(10, Math.floor(Math.log(e.delta / k.year) / Math.LN10))), (l = (s = e.delta / k.year / a) < 1.5 ? 1 : s < 3 ? 2 : s < 7.5 ? 5 : 10), (l *= a)),
                                    l < 1 && (l = 1)),
                                    (e.tickSize = x.tickSize || [l, u]);
                                var c = e.tickSize[0],
                                    u = e.tickSize[1],
                                    h = c * k[u];
                                "second" == u
                                    ? i.setSeconds(b(i.getSeconds(), c))
                                    : "minute" == u
                                    ? i.setMinutes(b(i.getMinutes(), c))
                                    : "hour" == u
                                    ? i.setHours(b(i.getHours(), c))
                                    : "month" == u
                                    ? i.setMonth(b(i.getMonth(), c))
                                    : "quarter" == u
                                    ? i.setMonth(3 * b(i.getMonth() / 3, c))
                                    : "year" == u && i.setFullYear(b(i.getFullYear(), c)),
                                    i.setMilliseconds(0),
                                    k.minute <= h && i.setSeconds(0),
                                    k.hour <= h && i.setMinutes(0),
                                    k.day <= h && i.setHours(0),
                                    4 * k.day <= h && i.setDate(1),
                                    2 * k.month <= h && i.setMonth(b(i.getMonth(), 3)),
                                    2 * k.quarter <= h && i.setMonth(b(i.getMonth(), 6)),
                                    k.year <= h && i.setMonth(0);
                                var d = 0,
                                    f = Number.NaN;
                                do {
                                    var p,
                                        g,
                                        m = f,
                                        f = i.getTime();
                                } while (
                                    (t.push(f),
                                    "month" == u || "quarter" == u
                                        ? c < 1
                                            ? (i.setDate(1), (p = i.getTime()), i.setMonth(i.getMonth() + ("quarter" == u ? 3 : 1)), (g = i.getTime()), i.setTime(f + d * k.hour + (g - p) * c), (d = i.getHours()), i.setHours(0))
                                            : i.setMonth(i.getMonth() + c * ("quarter" == u ? 3 : 1))
                                        : "year" == u
                                        ? i.setFullYear(i.getFullYear() + c)
                                        : i.setTime(f + h),
                                    f < e.max && f != m)
                                );
                                return t;
                            }),
                            (t.tickFormatter = function (e, t) {
                                var i = v(e, t.options);
                                if (null != x.timeformat) return a(i, x.timeformat, x.monthNames, x.dayNames);
                                var o = (t.options.tickSize && "quarter" == t.options.tickSize[1]) || (t.options.minTickSize && "quarter" == t.options.minTickSize[1]),
                                    n = t.tickSize[0] * k[t.tickSize[1]],
                                    r = t.max - t.min,
                                    e = x.twelveHourClock ? " %p" : "",
                                    t = x.twelveHourClock ? "%I" : "%H",
                                    r =
                                        n < k.minute
                                            ? t + ":%M:%S" + e
                                            : n < k.day
                                            ? r < 2 * k.day
                                                ? t + ":%M" + e
                                                : "%b %d " + t + ":%M" + e
                                            : n < k.month
                                            ? "%b %d"
                                            : (o && n < k.quarter) || (!o && n < k.year)
                                            ? r < k.year
                                                ? "%b"
                                                : "%b %Y"
                                            : o && n < k.year
                                            ? r < k.year
                                                ? "Q%q"
                                                : "Q%q %Y"
                                            : "%Y";
                                return a(i, r, x.monthNames, x.dayNames);
                            }));
                    });
                });
            },
            options: { xaxis: { timezone: null, timeformat: null, twelveHourClock: !1, monthNames: null } },
            name: "time",
            version: "1.0",
        }),
            (i.plot.formatDate = a),
            (i.plot.dateGenerator = v);
    })(jQuery),
    (function (g) {
        g.plot.plugins.push({
            init: function (c) {
                var a = { first: { x: -1, y: -1 }, second: { x: -1, y: -1 }, show: !1, active: !1 },
                    t = {},
                    i = null;
                function o(e) {
                    a.active && (h(e), c.getPlaceholder().trigger("plotselecting", [r()]));
                }
                function n(e) {
                    1 == e.which &&
                        (document.body.focus(),
                        void 0 !== document.onselectstart &&
                            null == t.onselectstart &&
                            ((t.onselectstart = document.onselectstart),
                            (document.onselectstart = function () {
                                return !1;
                            })),
                        void 0 !== document.ondrag &&
                            null == t.ondrag &&
                            ((t.ondrag = document.ondrag),
                            (document.ondrag = function () {
                                return !1;
                            })),
                        u(a.first, e),
                        (a.active = !0),
                        (i = function (e) {
                            !(function (e) {
                                (i = null), void 0 !== document.onselectstart && (document.onselectstart = t.onselectstart);
                                void 0 !== document.ondrag && (document.ondrag = t.ondrag);
                                (a.active = !1), h(e), p() ? s() : (c.getPlaceholder().trigger("plotunselected", []), c.getPlaceholder().trigger("plotselecting", [null]));
                            })(e);
                        }),
                        g(document).one("mouseup", i));
                }
                function r() {
                    if (!p()) return null;
                    if (!a.show) return null;
                    var o = {},
                        n = a.first,
                        r = a.second;
                    return (
                        g.each(c.getAxes(), function (e, t) {
                            var i;
                            t.used && ((i = t.c2p(n[t.direction])), (t = t.c2p(r[t.direction])), (o[e] = { from: Math.min(i, t), to: Math.max(i, t) }));
                        }),
                        o
                    );
                }
                function s() {
                    var e = r();
                    c.getPlaceholder().trigger("plotselected", [e]), e.xaxis && e.yaxis && c.getPlaceholder().trigger("selected", [{ x1: e.xaxis.from, y1: e.yaxis.from, x2: e.xaxis.to, y2: e.yaxis.to }]);
                }
                function l(e, t, i) {
                    return t < e ? e : i < t ? i : t;
                }
                function u(e, t) {
                    var i = c.getOptions(),
                        o = c.getPlaceholder().offset(),
                        n = c.getPlotOffset();
                    (e.x = l(0, t.pageX - o.left - n.left, c.width())),
                        (e.y = l(0, t.pageY - o.top - n.top, c.height())),
                        "y" == i.selection.mode && (e.x = e == a.first ? 0 : c.width()),
                        "x" == i.selection.mode && (e.y = e == a.first ? 0 : c.height());
                }
                function h(e) {
                    null != e.pageX && (u(a.second, e), p() ? ((a.show = !0), c.triggerRedrawOverlay()) : d(!0));
                }
                function d(e) {
                    a.show && ((a.show = !1), c.triggerRedrawOverlay(), e || c.getPlaceholder().trigger("plotunselected", []));
                }
                function f(e, t) {
                    var i,
                        o,
                        n,
                        r,
                        a,
                        s,
                        l = c.getAxes();
                    for (n in l)
                        if ((i = l[n]).direction == t && e[(o = !e[(o = t + i.n + "axis")] && 1 == i.n ? t + "axis" : o)]) {
                            (a = e[o].from), (s = e[o].to);
                            break;
                        }
                    return e[o] || ((i = ("x" == t ? c.getXAxes() : c.getYAxes())[0]), (a = e[t + "1"]), (s = e[t + "2"])), null != a && null != s && s < a && ((r = a), (a = s), (s = r)), { from: a, to: s, axis: i };
                }
                function p() {
                    var e = c.getOptions().selection.minSize;
                    return Math.abs(a.second.x - a.first.x) >= e && Math.abs(a.second.y - a.first.y) >= e;
                }
                (c.clearSelection = d),
                    (c.setSelection = function (e, t) {
                        var i,
                            o = c.getOptions();
                        "y" == o.selection.mode ? ((a.first.x = 0), (a.second.x = c.width())) : ((i = f(e, "x")), (a.first.x = i.axis.p2c(i.from)), (a.second.x = i.axis.p2c(i.to))),
                            "x" == o.selection.mode ? ((a.first.y = 0), (a.second.y = c.height())) : ((i = f(e, "y")), (a.first.y = i.axis.p2c(i.from)), (a.second.y = i.axis.p2c(i.to))),
                            (a.show = !0),
                            c.triggerRedrawOverlay(),
                            !t && p() && s();
                    }),
                    (c.getSelection = r),
                    c.hooks.bindEvents.push(function (e, t) {
                        null != e.getOptions().selection.mode && (t.mousemove(o), t.mousedown(n));
                    }),
                    c.hooks.drawOverlay.push(function (e, t) {
                        var i, o, n;
                        a.show &&
                            p() &&
                            ((i = e.getPlotOffset()),
                            (o = e.getOptions()),
                            t.save(),
                            t.translate(i.left, i.top),
                            (n = g.color.parse(o.selection.color)),
                            (t.strokeStyle = n.scale("a", 0.8).toString()),
                            (t.lineWidth = 1),
                            (t.lineJoin = o.selection.shape),
                            (t.fillStyle = n.scale("a", 0.4).toString()),
                            (e = Math.min(a.first.x, a.second.x) + 0.5),
                            (i = Math.min(a.first.y, a.second.y) + 0.5),
                            (o = Math.abs(a.second.x - a.first.x) - 1),
                            (n = Math.abs(a.second.y - a.first.y) - 1),
                            t.fillRect(e, i, o, n),
                            t.strokeRect(e, i, o, n),
                            t.restore());
                    }),
                    c.hooks.shutdown.push(function (e, t) {
                        t.unbind("mousemove", o), t.unbind("mousedown", n), i && g(document).unbind("mouseup", i);
                    });
            },
            options: { selection: { mode: null, color: "#e8cfac", shape: "round", minSize: 5 } },
            name: "selection",
            version: "1.1",
        });
    })(jQuery);

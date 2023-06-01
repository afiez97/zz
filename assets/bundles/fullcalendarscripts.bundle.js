var FullCalendar = (function (e) {
    "use strict";
    var r = function (e, t) {
        return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                    e.__proto__ = t;
                }) ||
            function (e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            })(e, t);
    };
    function t(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function n() {
            this.constructor = e;
        }
        r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
    }
    var I = function () {
        return (I =
            Object.assign ||
            function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
            }).apply(this, arguments);
    };
    function h(e, t, n) {
        if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++) (!r && o in t) || ((r = r || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
        return e.concat(r || t);
    }
    var b,
        n,
        D = {},
        C = [],
        o = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    function w(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function R(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
    }
    function a(e, t, n) {
        var r,
            o,
            i,
            a = arguments,
            s = {};
        for (i in t) "key" == i ? (r = t[i]) : "ref" == i ? (o = t[i]) : (s[i] = t[i]);
        if (3 < arguments.length) for (n = [n], i = 3; i < arguments.length; i++) n.push(a[i]);
        if ((null != n && (s.children = n), "function" == typeof e && null != e.defaultProps)) for (i in e.defaultProps) void 0 === s[i] && (s[i] = e.defaultProps[i]);
        return E(e, s, r, o, null);
    }
    function E(e, t, n, r, o) {
        o = { type: e, props: t, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o ? ++b.__v : o };
        return null != b.vnode && b.vnode(o), o;
    }
    function T(e) {
        return e.children;
    }
    function _(e, t) {
        (this.props = e), (this.context = t);
    }
    function S(e, t) {
        if (null == t) return e.__ ? S(e.__, e.__.__k.indexOf(e) + 1) : null;
        for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? S(e) : null;
    }
    function i(e) {
        ((!e.__d && (e.__d = !0) && v.push(e) && !s.__r++) || n !== b.debounceRendering) && ((n = b.debounceRendering) || m)(s);
    }
    function s() {
        for (var e; (s.__r = v.length); )
            (e = v.sort(function (e, t) {
                return e.__v.__b - t.__v.__b;
            })),
                (v = []),
                e.some(function (e) {
                    var t, n, r, o, i;
                    e.__d &&
                        ((o = (r = (t = e).__v).__e),
                        (i = t.__P) &&
                            ((n = []),
                            ((e = w({}, r)).__v = r.__v + 1),
                            P(i, r, e, t.__n, void 0 !== i.ownerSVGElement, null != r.__h ? [o] : null, n, null == o ? S(r) : o, r.__h),
                            p(n, r),
                            r.__e != o &&
                                (function e(t) {
                                    var n, r;
                                    if (null != (t = t.__) && null != t.__c) {
                                        for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++)
                                            if (null != (r = t.__k[n]) && null != r.__e) {
                                                t.__e = t.__c.base = r.__e;
                                                break;
                                            }
                                        return e(t);
                                    }
                                })(r)));
                });
    }
    function k(e, t, n, r, o, i, a, s, l, u) {
        var c,
            d,
            p,
            f,
            h,
            g,
            v,
            m = (r && r.__k) || C,
            y = m.length;
        for (n.__k = [], c = 0; c < t.length; c++)
            if (
                null !=
                (f = n.__k[c] =
                    null == (f = t[c]) || "boolean" == typeof f
                        ? null
                        : "string" == typeof f || "number" == typeof f || "bigint" == typeof f
                        ? E(null, f, null, null, f)
                        : Array.isArray(f)
                        ? E(T, { children: f }, null, null, null)
                        : 0 < f.__b
                        ? E(f.type, f.props, f.key, null, f.__v)
                        : f)
            ) {
                if (((f.__ = n), (f.__b = n.__b + 1), null === (p = m[c]) || (p && f.key == p.key && f.type === p.type))) m[c] = void 0;
                else
                    for (d = 0; d < y; d++) {
                        if ((p = m[d]) && f.key == p.key && f.type === p.type) {
                            m[d] = void 0;
                            break;
                        }
                        p = null;
                    }
                P(e, f, (p = p || D), o, i, a, s, l, u),
                    (h = f.__e),
                    (d = f.ref) && p.ref != d && ((v = v || []), p.ref && v.push(p.ref, null, f), v.push(d, f.__c || h, f)),
                    null != h
                        ? (null == g && (g = h),
                          "function" == typeof f.type && null != f.__k && f.__k === p.__k
                              ? (f.__d = l = (function e(t, n, r) {
                                    var o, i;
                                    for (o = 0; o < t.__k.length; o++) (i = t.__k[o]) && ((i.__ = t), (n = "function" == typeof i.type ? e(i, n, r) : x(r, i, i, t.__k, i.__e, n)));
                                    return n;
                                })(f, l, e))
                              : (l = x(e, f, p, m, h, l)),
                          u || "option" !== n.type ? "function" == typeof n.type && (n.__d = l) : (e.value = ""))
                        : l && p.__e == l && l.parentNode != e && (l = S(p));
            }
        for (n.__e = g, c = y; c--; )
            null != m[c] &&
                ("function" == typeof n.type && null != m[c].__e && m[c].__e == n.__d && (n.__d = S(r, c + 1)),
                (function e(t, n, r) {
                    var o, i, a;
                    if ((b.unmount && b.unmount(t), (o = t.ref) && ((o.current && o.current !== t.__e) || N(o, null, n)), r || "function" == typeof t.type || (r = null != (i = t.__e)), (t.__e = t.__d = void 0), null != (o = t.__c))) {
                        if (o.componentWillUnmount)
                            try {
                                o.componentWillUnmount();
                            } catch (t) {
                                b.__e(t, n);
                            }
                        o.base = o.__P = null;
                    }
                    if ((o = t.__k)) for (a = 0; a < o.length; a++) o[a] && e(o[a], n, r);
                    null != i && R(i);
                })(m[c], m[c]));
        if (v) for (c = 0; c < v.length; c++) N(v[c], v[++c], v[++c]);
    }
    function l(e, t) {
        return (
            (t = t || []),
            null == e ||
                "boolean" == typeof e ||
                (Array.isArray(e)
                    ? e.some(function (e) {
                          l(e, t);
                      })
                    : t.push(e)),
            t
        );
    }
    function x(e, t, n, r, o, i) {
        var a, s, l;
        if (void 0 !== t.__d) (a = t.__d), (t.__d = void 0);
        else if (null == n || o != i || null == o.parentNode)
            e: if (null == i || i.parentNode !== e) e.appendChild(o), (a = null);
            else {
                for (s = i, l = 0; (s = s.nextSibling) && l < r.length; l += 2) if (s == o) break e;
                e.insertBefore(o, i), (a = i);
            }
        return void 0 !== a ? a : o.nextSibling;
    }
    function u(e, t, n) {
        "-" === t[0] ? e.setProperty(t, n) : (e[t] = null == n ? "" : "number" != typeof n || o.test(t) ? n : n + "px");
    }
    function M(e, t, n, r, o) {
        var i;
        e: if ("style" === t)
            if ("string" == typeof n) e.style.cssText = n;
            else {
                if (("string" == typeof r && (e.style.cssText = r = ""), r)) for (t in r) (n && t in n) || u(e.style, t, "");
                if (n) for (t in n) (r && n[t] === r[t]) || u(e.style, t, n[t]);
            }
        else if ("o" === t[0] && "n" === t[1])
            (i = t !== (t = t.replace(/Capture$/, ""))),
                (t = (t.toLowerCase() in e ? t.toLowerCase() : t).slice(2)),
                e.l || (e.l = {}),
                (e.l[t + i] = n),
                n ? r || e.addEventListener(t, i ? d : c, i) : e.removeEventListener(t, i ? d : c, i);
        else if ("dangerouslySetInnerHTML" !== t) {
            if (o) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
            else if ("href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e)
                try {
                    e[t] = null == n ? "" : n;
                    break e;
                } catch (e) {}
            "function" == typeof n || (null != n && (!1 !== n || ("a" === t[0] && "r" === t[1])) ? e.setAttribute(t, n) : e.removeAttribute(t));
        }
    }
    function c(e) {
        this.l[e.type + !1](b.event ? b.event(e) : e);
    }
    function d(e) {
        this.l[e.type + !0](b.event ? b.event(e) : e);
    }
    function P(e, t, n, r, o, i, a, s, l) {
        var u,
            c,
            d,
            p,
            f,
            h,
            g,
            v,
            m,
            y,
            E,
            S = t.type;
        if (void 0 === t.constructor) {
            null != n.__h && ((l = n.__h), (s = t.__e = n.__e), (t.__h = null), (i = [s])), (u = b.__b) && u(t);
            try {
                e: if ("function" == typeof S) {
                    if (
                        ((v = t.props),
                        (m = (u = S.contextType) && r[u.__c]),
                        (y = u ? (m ? m.props.value : u.__) : r),
                        n.__c
                            ? (g = (c = t.__c = n.__c).__ = c.__E)
                            : ("prototype" in S && S.prototype.render ? (t.__c = c = new S(v, y)) : ((t.__c = c = new _(v, y)), (c.constructor = S), (c.render = H)),
                              m && m.sub(c),
                              (c.props = v),
                              c.state || (c.state = {}),
                              (c.context = y),
                              (c.__n = r),
                              (d = c.__d = !0),
                              (c.__h = [])),
                        null == c.__s && (c.__s = c.state),
                        null != S.getDerivedStateFromProps && (c.__s == c.state && (c.__s = w({}, c.__s)), w(c.__s, S.getDerivedStateFromProps(v, c.__s))),
                        (p = c.props),
                        (f = c.state),
                        d)
                    )
                        null == S.getDerivedStateFromProps && null != c.componentWillMount && c.componentWillMount(), null != c.componentDidMount && c.__h.push(c.componentDidMount);
                    else {
                        if (
                            (null == S.getDerivedStateFromProps && v !== p && null != c.componentWillReceiveProps && c.componentWillReceiveProps(v, y),
                            (!c.__e && null != c.shouldComponentUpdate && !1 === c.shouldComponentUpdate(v, c.__s, y)) || t.__v === n.__v)
                        ) {
                            (c.props = v),
                                (c.state = c.__s),
                                t.__v !== n.__v && (c.__d = !1),
                                ((c.__v = t).__e = n.__e),
                                (t.__k = n.__k),
                                t.__k.forEach(function (e) {
                                    e && (e.__ = t);
                                }),
                                c.__h.length && a.push(c);
                            break e;
                        }
                        null != c.componentWillUpdate && c.componentWillUpdate(v, c.__s, y),
                            null != c.componentDidUpdate &&
                                c.__h.push(function () {
                                    c.componentDidUpdate(p, f, h);
                                });
                    }
                    (c.context = y),
                        (c.props = v),
                        (c.state = c.__s),
                        (u = b.__r) && u(t),
                        (c.__d = !1),
                        (c.__v = t),
                        (c.__P = e),
                        (u = c.render(c.props, c.state, c.context)),
                        (c.state = c.__s),
                        null != c.getChildContext && (r = w(w({}, r), c.getChildContext())),
                        d || null == c.getSnapshotBeforeUpdate || (h = c.getSnapshotBeforeUpdate(p, f)),
                        (E = null != u && u.type === T && null == u.key ? u.props.children : u),
                        k(e, Array.isArray(E) ? E : [E], t, n, r, o, i, a, s, l),
                        (c.base = t.__e),
                        (t.__h = null),
                        c.__h.length && a.push(c),
                        g && (c.__E = c.__ = null),
                        (c.__e = !1);
                } else
                    null == i && t.__v === n.__v
                        ? ((t.__k = n.__k), (t.__e = n.__e))
                        : (t.__e = (function (e, t, n, r, o, i, a, s) {
                              var l,
                                  u,
                                  c,
                                  d,
                                  p = n.props,
                                  f = t.props,
                                  h = t.type,
                                  g = 0;
                              if (("svg" === h && (o = !0), null != i))
                                  for (; g < i.length; g++)
                                      if ((l = i[g]) && (l === e || (h ? l.localName == h : 3 == l.nodeType))) {
                                          (e = l), (i[g] = null);
                                          break;
                                      }
                              if (null == e) {
                                  if (null === h) return document.createTextNode(f);
                                  (e = o ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h, f.is && f)), (i = null), (s = !1);
                              }
                              if (null === h) p === f || (s && e.data === f) || (e.data = f);
                              else {
                                  if (((i = i && C.slice.call(e.childNodes)), (u = (p = n.props || D).dangerouslySetInnerHTML), (c = f.dangerouslySetInnerHTML), !s)) {
                                      if (null != i) for (p = {}, d = 0; d < e.attributes.length; d++) p[e.attributes[d].name] = e.attributes[d].value;
                                      (c || u) && ((c && ((u && c.__html == u.__html) || c.__html === e.innerHTML)) || (e.innerHTML = (c && c.__html) || ""));
                                  }
                                  if (
                                      ((function (e, t, n, r, o) {
                                          for (var i in n) "children" === i || "key" === i || i in t || M(e, i, null, n[i], r);
                                          for (i in t) (o && "function" != typeof t[i]) || "children" === i || "key" === i || "value" === i || "checked" === i || n[i] === t[i] || M(e, i, t[i], n[i], r);
                                      })(e, f, p, o, s),
                                      c)
                                  )
                                      t.__k = [];
                                  else if (((g = t.props.children), k(e, Array.isArray(g) ? g : [g], t, n, r, o && "foreignObject" !== h, i, a, e.firstChild, s), null != i)) for (g = i.length; g--; ) null != i[g] && R(i[g]);
                                  s ||
                                      ("value" in f && void 0 !== (g = f.value) && (g !== e.value || ("progress" === h && !g)) && M(e, "value", g, p.value, !1),
                                      "checked" in f && void 0 !== (g = f.checked) && g !== e.checked && M(e, "checked", g, p.checked, !1));
                              }
                              return e;
                          })(n.__e, t, n, r, o, i, a, l));
                (u = b.diffed) && u(t);
            } catch (e) {
                (t.__v = null), (!l && null == i) || ((t.__e = s), (t.__h = !!l), (i[i.indexOf(s)] = null)), b.__e(e, t, n);
            }
        }
    }
    function p(e, t) {
        b.__c && b.__c(t, e),
            e.some(function (t) {
                try {
                    (e = t.__h),
                        (t.__h = []),
                        e.some(function (e) {
                            e.call(t);
                        });
                } catch (e) {
                    b.__e(e, t.__v);
                }
            });
    }
    function N(e, t, n) {
        try {
            "function" == typeof e ? e(t) : (e.current = t);
        } catch (e) {
            b.__e(e, n);
        }
    }
    function H(e, t, n) {
        return this.constructor(e, n);
    }
    function f(e, t, n) {
        var r, o, i;
        b.__ && b.__(e, t),
            (o = (r = "function" == typeof n) ? null : (n && n.__k) || t.__k),
            (i = []),
            P(t, (e = ((!r && n) || t).__k = a(T, null, [e])), o || D, D, void 0 !== t.ownerSVGElement, !r && n ? [n] : !o && t.firstChild ? C.slice.call(t.childNodes) : null, i, !r && n ? n : o ? o.__e : t.firstChild, r),
            p(i, e);
    }
    (b = {
        __e: function (e, t) {
            for (var n, r, o; (t = t.__); )
                if ((n = t.__c) && !n.__)
                    try {
                        if (((r = n.constructor) && null != r.getDerivedStateFromError && (n.setState(r.getDerivedStateFromError(e)), (o = n.__d)), null != n.componentDidCatch && (n.componentDidCatch(e), (o = n.__d)), o))
                            return (n.__E = n);
                    } catch (t) {
                        e = t;
                    }
            throw e;
        },
        __v: 0,
    }),
        (_.prototype.setState = function (e, t) {
            var n = null != this.__s && this.__s !== this.state ? this.__s : (this.__s = w({}, this.state));
            (e = "function" == typeof e ? e(w({}, n), this.props) : e) && w(n, e), null != e && this.__v && (t && this.__h.push(t), i(this));
        }),
        (_.prototype.forceUpdate = function (e) {
            this.__v && ((this.__e = !0), e && this.__h.push(e), i(this));
        }),
        (_.prototype.render = T);
    var g,
        v = [],
        m = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout,
        y = (s.__r = 0),
        O = [],
        A = b.__b,
        L = b.__r,
        U = b.diffed,
        W = b.__c,
        V = b.unmount;
    function F() {
        O.forEach(function (t) {
            if (t.__P)
                try {
                    t.__H.__h.forEach(z), t.__H.__h.forEach(j), (t.__H.__h = []);
                } catch (e) {
                    (t.__H.__h = []), b.__e(e, t.__v);
                }
        }),
            (O = []);
    }
    (b.__b = function (e) {
        A && A(e);
    }),
        (b.__r = function (e) {
            L && L(e);
            e = e.__c.__H;
            e && (e.__h.forEach(z), e.__h.forEach(j), (e.__h = []));
        }),
        (b.diffed = function (e) {
            U && U(e);
            e = e.__c;
            e &&
                e.__H &&
                e.__H.__h.length &&
                ((1 !== O.push(e) && g === b.requestAnimationFrame) ||
                    (
                        (g = b.requestAnimationFrame) ||
                        function (e) {
                            function t() {
                                clearTimeout(r), B && cancelAnimationFrame(n), setTimeout(e);
                            }
                            var n,
                                r = setTimeout(t, 100);
                            B && (n = requestAnimationFrame(t));
                        }
                    )(F));
        }),
        (b.__c = function (e, n) {
            n.some(function (t) {
                try {
                    t.__h.forEach(z),
                        (t.__h = t.__h.filter(function (e) {
                            return !e.__ || j(e);
                        }));
                } catch (e) {
                    n.some(function (e) {
                        e.__h && (e.__h = []);
                    }),
                        (n = []),
                        b.__e(e, t.__v);
                }
            }),
                W && W(e, n);
        }),
        (b.unmount = function (e) {
            V && V(e);
            var t = e.__c;
            if (t && t.__H)
                try {
                    t.__H.__.forEach(z);
                } catch (e) {
                    b.__e(e, t.__v);
                }
        });
    var B = "function" == typeof requestAnimationFrame;
    function z(e) {
        "function" == typeof e.__c && e.__c();
    }
    function j(e) {
        e.__c = e.__();
    }
    new _().isPureReactComponent = !0;
    var G = b.__b;
    b.__b = function (e) {
        e.type && e.type.__f && e.ref && ((e.props.ref = e.ref), (e.ref = null)), G && G(e);
    };
    var q = b.__e;
    b.__e = function (e, t, n) {
        if (e.then) for (var r, o = t; (o = o.__); ) if ((r = o.__c) && r.__c) return null == t.__e && ((t.__e = n.__e), (t.__k = n.__k)), r.__c(e, t);
        q(e, t, n);
    };
    var Y = b.unmount;
    function Z(e) {
        var t = e.__.__c;
        return t && t.__e && t.__e(e);
    }
    (b.unmount = function (e) {
        var t = e.__c;
        t && t.__R && t.__R(), t && !0 === e.__h && (e.type = null), Y && Y(e);
    }),
        (new _().__c = function (e, t) {
            var n = t.__c,
                r = this;
            null == r.t && (r.t = []), r.t.push(n);
            function o() {
                a || ((a = !0), (n.__R = null), i ? i(s) : s());
            }
            var i = Z(r.__v),
                a = !1;
            n.__R = o;
            var s = function () {
                    var e, t;
                    if (!--r.__u)
                        for (
                            r.state.__e &&
                                ((e = r.state.__e),
                                (r.__v.__k[0] = (function t(e, n, r) {
                                    return (
                                        e &&
                                            ((e.__v = null),
                                            (e.__k =
                                                e.__k &&
                                                e.__k.map(function (e) {
                                                    return t(e, n, r);
                                                })),
                                            e.__c && e.__c.__P === n && (e.__e && r.insertBefore(e.__e, e.__d), (e.__c.__e = !0), (e.__c.__P = r))),
                                        e
                                    );
                                })(e, e.__c.__P, e.__c.__O))),
                                r.setState({ __e: (r.__b = null) });
                            (t = r.t.pop());

                        )
                            t.forceUpdate();
                },
                t = !0 === t.__h;
            r.__u++ || t || r.setState({ __e: (r.__b = r.__v.__k[0]) }), e.then(o, o);
        });
    function X(e, t, n) {
        if ((++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)))
            for (n = e.u; n; ) {
                for (; 3 < n.length; ) n.pop()();
                if (n[1] < n[0]) break;
                e.u = n = n[2];
            }
    }
    function K(e) {
        return (
            (this.getChildContext = function () {
                return e.context;
            }),
            e.children
        );
    }
    function $(e) {
        var n = this,
            t = e.i;
        (n.componentWillUnmount = function () {
            f(null, n.l), (n.l = null), (n.i = null);
        }),
            n.i && n.i !== t && n.componentWillUnmount(),
            e.__v
                ? (n.l ||
                      ((n.i = t),
                      (n.l = {
                          nodeType: 1,
                          parentNode: t,
                          childNodes: [],
                          appendChild: function (e) {
                              this.childNodes.push(e), n.i.appendChild(e);
                          },
                          insertBefore: function (e, t) {
                              this.childNodes.push(e), n.i.appendChild(e);
                          },
                          removeChild: function (e) {
                              this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), n.i.removeChild(e);
                          },
                      })),
                  f(a(K, { context: n.context }, e.__v), n.l))
                : n.l && n.componentWillUnmount();
    }
    new _().__e = function (n) {
        var r = this,
            o = Z(r.__v),
            i = r.o.get(n);
        return (
            i[0]++,
            function (e) {
                function t() {
                    r.props.revealOrder ? (i.push(e), X(r, n, i)) : e();
                }
                o ? o(t) : t();
            }
        );
    };
    var J = ("undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element")) || 60103,
        Q = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    (_.prototype.isReactComponent = {}),
        ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (t) {
            Object.defineProperty(_.prototype, t, {
                configurable: !0,
                get: function () {
                    return this["UNSAFE_" + t];
                },
                set: function (e) {
                    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
                },
            });
        });
    var ee = b.event;
    function te() {}
    function ne() {
        return this.cancelBubble;
    }
    function re() {
        return this.defaultPrevented;
    }
    b.event = function (e) {
        return ((e = ee ? ee(e) : e).persist = te), (e.isPropagationStopped = ne), (e.isDefaultPrevented = re), (e.nativeEvent = e);
    };
    var oe = {
            configurable: !0,
            get: function () {
                return this.class;
            },
        },
        ie = b.vnode;
    b.vnode = function (e) {
        var t,
            n = e.type,
            r = e.props,
            o = r;
        if ("string" == typeof n) {
            for (var i in ((o = {}), r)) {
                var a = r[i];
                ("value" === i && "defaultValue" in r && null == a) ||
                    ("defaultValue" === i && "value" in r && null == r.value
                        ? (i = "value")
                        : "download" === i && !0 === a
                        ? (a = "")
                        : /ondoubleclick/i.test(i)
                        ? (i = "ondblclick")
                        : /^onchange(textarea|input)/i.test(i + n) && ((t = r.type), !("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(t))
                        ? (i = "oninput")
                        : /^on(Ani|Tra|Tou|BeforeInp)/.test(i)
                        ? (i = i.toLowerCase())
                        : Q.test(i)
                        ? (i = i.replace(/[A-Z0-9]/, "-$&").toLowerCase())
                        : null === a && (a = void 0),
                    (o[i] = a));
            }
            "select" == n &&
                o.multiple &&
                Array.isArray(o.value) &&
                (o.value = l(r.children).forEach(function (e) {
                    e.props.selected = -1 != o.value.indexOf(e.props.value);
                })),
                "select" == n &&
                    null != o.defaultValue &&
                    (o.value = l(r.children).forEach(function (e) {
                        e.props.selected = o.multiple ? -1 != o.defaultValue.indexOf(e.props.value) : o.defaultValue == e.props.value;
                    })),
                (e.props = o);
        }
        n && r.class != r.className && ((oe.enumerable = "className" in r), null != r.className && (o.class = r.className), Object.defineProperty(o, "className", oe)), (e.$$typeof = J), ie && ie(e);
    };
    var ae = b.__r;
    (b.__r = function (e) {
        ae && ae(e);
    }),
        "object" == typeof performance && "function" == typeof performance.now && performance.now.bind(performance);
    var se = "undefined" != typeof globalThis ? globalThis : window;
    se.FullCalendarVDom
        ? console.warn("FullCalendar VDOM already loaded")
        : (se.FullCalendarVDom = {
              Component: _,
              createElement: a,
              render: f,
              createRef: function () {
                  return { current: null };
              },
              Fragment: T,
              createContext: function (e) {
                  var r,
                      e = ((e = {
                          __c: (r = "__cC" + y++),
                          __: e,
                          Consumer: function (e, t) {
                              return e.children(t);
                          },
                          Provider: function (e) {
                              var n, t;
                              return (
                                  this.getChildContext ||
                                      ((n = []),
                                      (((t = {})[r] = this).getChildContext = function () {
                                          return t;
                                      }),
                                      (this.shouldComponentUpdate = function (e) {
                                          this.props.value !== e.value && n.some(i);
                                      }),
                                      (this.sub = function (e) {
                                          n.push(e);
                                          var t = e.componentWillUnmount;
                                          e.componentWillUnmount = function () {
                                              n.splice(n.indexOf(e), 1), t && t.call(e);
                                          };
                                      })),
                                  e.children
                              );
                          },
                      }).Provider.__ = e.Consumer.contextType = e),
                      o = e.Provider;
                  return (
                      (e.Provider = function () {
                          var n,
                              e = this,
                              t = !this.getChildContext,
                              r = o.apply(this, arguments);
                          return (
                              t &&
                                  ((n = []),
                                  (this.shouldComponentUpdate = function (t) {
                                      e.props.value !== t.value &&
                                          n.forEach(function (e) {
                                              (e.context = t.value), e.forceUpdate();
                                          });
                                  }),
                                  (this.sub = function (e) {
                                      n.push(e);
                                      var t = e.componentWillUnmount;
                                      e.componentWillUnmount = function () {
                                          n.splice(n.indexOf(e), 1), t && t.call(e);
                                      };
                                  })),
                              r
                          );
                      }),
                      e
                  );
              },
              createPortal: function (e, t) {
                  return a($, { __v: e, i: t });
              },
              flushToDom: function () {
                  var e = b.debounceRendering,
                      t = [];
                  for (
                      b.debounceRendering = function (e) {
                          t.push(e);
                      },
                          f(a(ue, {}), document.createElement("div"));
                      t.length;

                  )
                      t.shift()();
                  b.debounceRendering = e;
              },
              unmountComponentAtNode: function (e) {
                  f(null, e);
              },
          });
    var le,
        ue =
            (t(ce, (le = _)),
            (ce.prototype.render = function () {
                return a("div", {});
            }),
            (ce.prototype.componentDidMount = function () {
                this.setState({});
            }),
            ce);
    function ce() {
        return (null !== le && le.apply(this, arguments)) || this;
    }
    var de =
        ((pe.prototype.remove = function () {
            this.context.dispatch({ type: "REMOVE_EVENT_SOURCE", sourceId: this.internalEventSource.sourceId });
        }),
        (pe.prototype.refetch = function () {
            this.context.dispatch({ type: "FETCH_EVENT_SOURCES", sourceIds: [this.internalEventSource.sourceId], isRefetch: !0 });
        }),
        Object.defineProperty(pe.prototype, "id", {
            get: function () {
                return this.internalEventSource.publicId;
            },
            enumerable: !1,
            configurable: !0,
        }),
        Object.defineProperty(pe.prototype, "url", {
            get: function () {
                return this.internalEventSource.meta.url;
            },
            enumerable: !1,
            configurable: !0,
        }),
        Object.defineProperty(pe.prototype, "format", {
            get: function () {
                return this.internalEventSource.meta.format;
            },
            enumerable: !1,
            configurable: !0,
        }),
        pe);
    function pe(e, t) {
        (this.context = e), (this.internalEventSource = t);
    }
    function fe(e) {
        e.parentNode && e.parentNode.removeChild(e);
    }
    function he(e, t) {
        if (e.closest) return e.closest(t);
        if (!document.documentElement.contains(e)) return null;
        do {
            if (ge(e, t)) return e;
        } while (null !== (e = e.parentElement || e.parentNode) && 1 === e.nodeType);
        return null;
    }
    function ge(e, t) {
        return (e.matches || e.matchesSelector || e.msMatchesSelector).call(e, t);
    }
    function ve(e, t) {
        for (var n = e instanceof HTMLElement ? [e] : e, r = [], o = 0; o < n.length; o += 1) for (var i = n[o].querySelectorAll(t), a = 0; a < i.length; a += 1) r.push(i[a]);
        return r;
    }
    var me = /(top|left|right|bottom|width|height)$/i;
    function ye(e, t) {
        for (var n in t) Ee(e, n, t[n]);
    }
    function Ee(e, t, n) {
        null == n ? (e.style[t] = "") : "number" == typeof n && me.test(t) ? (e.style[t] = n + "px") : (e.style[t] = n);
    }
    function Se(e) {
        var t;
        return null !== (t = null === (t = e.composedPath) || void 0 === t ? void 0 : t.call(e)[0]) && void 0 !== t ? t : e.target;
    }
    function be(e) {
        return e.getRootNode ? e.getRootNode() : document;
    }
    var De = 0;
    function Ce() {
        return "fc-dom-" + (De += 1);
    }
    function we(e) {
        e.preventDefault();
    }
    function Re(e, t, n, r) {
        var o,
            i,
            a =
                ((o = n),
                (i = r),
                function (e) {
                    var t = he(e.target, o);
                    t && i.call(t, e, t);
                });
        return (
            e.addEventListener(t, a),
            function () {
                e.removeEventListener(t, a);
            }
        );
    }
    var Te = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"];
    function _e(t, n) {
        function r(e) {
            n(e),
                Te.forEach(function (e) {
                    t.removeEventListener(e, r);
                });
        }
        Te.forEach(function (e) {
            t.addEventListener(e, r);
        });
    }
    function ke(e) {
        return I({ onClick: e }, xe(e));
    }
    function xe(t) {
        return {
            tabIndex: 0,
            onKeyDown: function (e) {
                ("Enter" !== e.key && " " !== e.key) || (t(e), e.preventDefault());
            },
        };
    }
    var Me = 0;
    function Ie() {
        return String((Me += 1));
    }
    function Pe() {
        document.body.classList.add("fc-not-allowed");
    }
    function Ne() {
        document.body.classList.remove("fc-not-allowed");
    }
    function He(e) {
        e.classList.add("fc-unselectable"), e.addEventListener("selectstart", we);
    }
    function Oe(e) {
        e.classList.remove("fc-unselectable"), e.removeEventListener("selectstart", we);
    }
    function Ae(e) {
        e.addEventListener("contextmenu", we);
    }
    function Le(e) {
        e.removeEventListener("contextmenu", we);
    }
    function Ue(e) {
        var t,
            n,
            r = [],
            o = [];
        for ("string" == typeof e ? (o = e.split(/\s*,\s*/)) : "function" == typeof e ? (o = [e]) : Array.isArray(e) && (o = e), t = 0; t < o.length; t += 1)
            "string" == typeof (n = o[t]) ? r.push("-" === n.charAt(0) ? { field: n.substring(1), order: -1 } : { field: n, order: 1 }) : "function" == typeof n && r.push({ func: n });
        return r;
    }
    function We(e, t, n) {
        for (var r, o = 0; o < n.length; o += 1) if ((r = Ve(e, t, n[o]))) return r;
        return 0;
    }
    function Ve(e, t, n) {
        return n.func ? n.func(e, t) : Fe(e[n.field], t[n.field]) * (n.order || 1);
    }
    function Fe(e, t) {
        return e || t ? (null == t ? -1 : null == e ? 1 : "string" == typeof e || "string" == typeof t ? String(e).localeCompare(String(t)) : e - t) : 0;
    }
    function Be(e, t) {
        e = String(e);
        return "000".substr(0, t - e.length) + e;
    }
    function ze(e, t, n) {
        return "function" == typeof e
            ? e.apply(void 0, t)
            : "string" == typeof e
            ? t.reduce(function (e, t, n) {
                  return e.replace("$" + n, t || "");
              }, e)
            : n;
    }
    function je(e, t) {
        return e - t;
    }
    function Ge(e) {
        return e % 1 == 0;
    }
    function qe(e) {
        var t = e.querySelector(".fc-scrollgrid-shrink-frame"),
            n = e.querySelector(".fc-scrollgrid-shrink-cushion");
        if (!t) throw new Error("needs fc-scrollgrid-shrink-frame className");
        if (!n) throw new Error("needs fc-scrollgrid-shrink-cushion className");
        return e.getBoundingClientRect().width - t.getBoundingClientRect().width + n.getBoundingClientRect().width;
    }
    var Ye = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    function Ze(e, t) {
        e = at(e);
        return (e[2] += 7 * t), st(e);
    }
    function Xe(e, t) {
        e = at(e);
        return (e[2] += t), st(e);
    }
    function Ke(e, t) {
        e = at(e);
        return (e[6] += t), st(e);
    }
    function $e(e, t) {
        return Je(e, t) / 7;
    }
    function Je(e, t) {
        return (t.valueOf() - e.valueOf()) / 864e5;
    }
    function Qe(e, t) {
        var n = nt(e),
            r = nt(t);
        return { years: 0, months: 0, days: Math.round(Je(n, r)), milliseconds: t.valueOf() - r.valueOf() - (e.valueOf() - n.valueOf()) };
    }
    function et(e, t) {
        t = tt(e, t);
        return null !== t && t % 7 == 0 ? t / 7 : null;
    }
    function tt(e, t) {
        return ut(e) === ut(t) ? Math.round(Je(e, t)) : null;
    }
    function nt(e) {
        return st([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]);
    }
    function rt(e, t, n, r) {
        (r = st([
            t,
            0,
            1 +
                (function (e, t, n) {
                    n = 7 + t - n;
                    return (-(7 + st([e, 0, n]).getUTCDay() - t) % 7) + n - 1;
                })(t, n, r),
        ])),
            (e = nt(e)),
            (e = Math.round(Je(r, e)));
        return Math.floor(e / 7) + 1;
    }
    function ot(e) {
        return [e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()];
    }
    function it(e) {
        return new Date(e[0], e[1] || 0, null == e[2] ? 1 : e[2], e[3] || 0, e[4] || 0, e[5] || 0);
    }
    function at(e) {
        return [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()];
    }
    function st(e) {
        return 1 === e.length && (e = e.concat([0])), new Date(Date.UTC.apply(Date, e));
    }
    function lt(e) {
        return !isNaN(e.valueOf());
    }
    function ut(e) {
        return 1e3 * e.getUTCHours() * 60 * 60 + 1e3 * e.getUTCMinutes() * 60 + 1e3 * e.getUTCSeconds() + e.getUTCMilliseconds();
    }
    function ct(e, t, n, r) {
        return { instanceId: Ie(), defId: e, range: t, forcedStartTzo: null == n ? null : n, forcedEndTzo: null == r ? null : r };
    }
    var dt = Object.prototype.hasOwnProperty;
    function pt(e, t) {
        var n = {};
        if (t)
            for (var r in t) {
                for (var o = [], i = e.length - 1; 0 <= i; --i) {
                    var a = e[i][r];
                    if ("object" == typeof a && a) o.unshift(a);
                    else if (void 0 !== a) {
                        n[r] = a;
                        break;
                    }
                }
                o.length && (n[r] = pt(o));
            }
        for (i = e.length - 1; 0 <= i; --i) {
            var s,
                l = e[i];
            for (s in l) s in n || (n[s] = l[s]);
        }
        return n;
    }
    function ft(e, t) {
        var n,
            r = {};
        for (n in e) t(e[n], n) && (r[n] = e[n]);
        return r;
    }
    function ht(e, t) {
        var n,
            r = {};
        for (n in e) r[n] = t(e[n], n);
        return r;
    }
    function gt(e) {
        for (var t = {}, n = 0, r = e; n < r.length; n++) t[r[n]] = !0;
        return t;
    }
    function vt(e) {
        var t,
            n = [];
        for (t in e) n.push(e[t]);
        return n;
    }
    function mt(e, t) {
        if (e === t) return !0;
        for (var n in e) if (dt.call(e, n) && !(n in t)) return !1;
        for (var n in t) if (dt.call(t, n) && e[n] !== t[n]) return !1;
        return !0;
    }
    function yt(e, t) {
        var n,
            r = [];
        for (n in e) dt.call(e, n) && (n in t || r.push(n));
        for (n in t) dt.call(t, n) && e[n] !== t[n] && r.push(n);
        return r;
    }
    function Et(e, t, n) {
        if ((void 0 === n && (n = {}), e === t)) return !0;
        for (var r in t) if (!(r in e && ((o = e[r]), (i = t[r]), (a = n[r]), o === i || !0 === a || (a && a(o, i))))) return !1;
        var o, i, a;
        for (r in e) if (!(r in t)) return !1;
        return !0;
    }
    function St(e, t, n, r) {
        void 0 === t && (t = 0), void 0 === r && (r = 1);
        var o = [];
        null == n && (n = Object.keys(e).length);
        for (var i = t; i < n; i += r) {
            var a = e[i];
            void 0 !== a && o.push(a);
        }
        return o;
    }
    function bt(e, t, n) {
        var r,
            o = n.dateEnv,
            i = n.pluginHooks,
            a = n.options,
            s = e.defs,
            l = ft((l = e.instances), function (e) {
                return !s[e.defId].recurringDef;
            });
        for (r in s) {
            var u = s[r];
            if (u.recurringDef)
                for (
                    var c = u.recurringDef.duration,
                        d = 0,
                        p = (function (e, t, n, r, o) {
                            r = o[e.recurringDef.typeId].expand(e.recurringDef.typeData, { start: r.subtract(n.start, t), end: n.end }, r);
                            return (r = e.allDay ? r.map(nt) : r);
                        })(u, (c = c || (u.allDay ? a.defaultAllDayEventDuration : a.defaultTimedEventDuration)), t, o, i.recurringTypes);
                    d < p.length;
                    d++
                ) {
                    var f = p[d],
                        f = ct(r, { start: f, end: o.add(f, c) });
                    l[f.instanceId] = f;
                }
        }
        return { defs: s, instances: l };
    }
    var Dt = ["years", "months", "days", "milliseconds"],
        Ct = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
    function wt(n, e) {
        var t;
        return "string" == typeof n
            ? (function () {
                  var e = Ct.exec(n);
                  if (e) {
                      var t = e[1] ? -1 : 1;
                      return {
                          years: 0,
                          months: 0,
                          days: t * (e[2] ? parseInt(e[2], 10) : 0),
                          milliseconds: t * (60 * (e[3] ? parseInt(e[3], 10) : 0) * 60 * 1e3 + 60 * (e[4] ? parseInt(e[4], 10) : 0) * 1e3 + 1e3 * (e[5] ? parseInt(e[5], 10) : 0) + (e[6] ? parseInt(e[6], 10) : 0)),
                      };
                  }
                  return null;
              })()
            : "object" == typeof n && n
            ? Rt(n)
            : "number" == typeof n
            ? Rt((((t = {})[e || "milliseconds"] = n), t))
            : null;
    }
    function Rt(e) {
        var t = {
                years: e.years || e.year || 0,
                months: e.months || e.month || 0,
                days: e.days || e.day || 0,
                milliseconds: 60 * (e.hours || e.hour || 0) * 60 * 1e3 + 60 * (e.minutes || e.minute || 0) * 1e3 + 1e3 * (e.seconds || e.second || 0) + (e.milliseconds || e.millisecond || e.ms || 0),
            },
            e = e.weeks || e.week;
        return e && ((t.days += 7 * e), (t.specifiedWeeks = !0)), t;
    }
    function Tt(e, t) {
        return { years: e.years + t.years, months: e.months + t.months, days: e.days + t.days, milliseconds: e.milliseconds + t.milliseconds };
    }
    function _t(e, t) {
        return { years: e.years * t, months: e.months * t, days: e.days * t, milliseconds: e.milliseconds * t };
    }
    function kt(e) {
        return xt(e) / 864e5;
    }
    function xt(e) {
        return 31536e6 * e.years + 2592e6 * e.months + 864e5 * e.days + e.milliseconds;
    }
    function Mt(e, t) {
        for (var n = null, r = 0; r < Dt.length; r += 1) {
            var o = Dt[r];
            if (t[o]) {
                var i = e[o] / t[o];
                if (!Ge(i) || (null !== n && n !== i)) return null;
                n = i;
            } else if (e[o]) return null;
        }
        return n;
    }
    function It(e) {
        var t = e.milliseconds;
        if (t) {
            if (t % 1e3 != 0) return { unit: "millisecond", value: t };
            if (t % 6e4 != 0) return { unit: "second", value: t / 1e3 };
            if (t % 36e5 != 0) return { unit: "minute", value: t / 6e4 };
            if (t) return { unit: "hour", value: t / 36e5 };
        }
        return e.days
            ? e.specifiedWeeks && e.days % 7 == 0
                ? { unit: "week", value: e.days / 7 }
                : { unit: "day", value: e.days }
            : e.months
            ? { unit: "month", value: e.months }
            : e.years
            ? { unit: "year", value: e.years }
            : { unit: "millisecond", value: 0 };
    }
    function Pt(e, t, n) {
        void 0 === n && (n = !1);
        e = (e = e.toISOString()).replace(".000", "");
        return 10 < (e = n ? e.replace("T00:00:00Z", "") : e).length && (null == t ? (e = e.replace("Z", "")) : 0 !== t && (e = e.replace("Z", Ot(t, !0)))), e;
    }
    function Nt(e) {
        return e.toISOString().replace(/T.*$/, "");
    }
    function Ht(e) {
        return Be(e.getUTCHours(), 2) + ":" + Be(e.getUTCMinutes(), 2) + ":" + Be(e.getUTCSeconds(), 2);
    }
    function Ot(e, t) {
        void 0 === t && (t = !1);
        var n = e < 0 ? "-" : "+",
            r = Math.abs(e),
            e = Math.floor(r / 60),
            r = Math.round(r % 60);
        return t ? n + Be(e, 2) + ":" + Be(r, 2) : "GMT" + n + e + (r ? ":" + Be(r, 2) : "");
    }
    function At(e, t, n) {
        if (e === t) return !0;
        var r,
            o = e.length;
        if (o !== t.length) return !1;
        for (r = 0; r < o; r += 1) if (!(n ? n(e[r], t[r]) : e[r] === t[r])) return !1;
        return !0;
    }
    function Lt(r, o, i) {
        var a, s;
        return function () {
            for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
            return a ? At(a, t) || (i && i(s), (e = r.apply(this, t)), (o && o(e, s)) || (s = e)) : (s = r.apply(this, t)), (a = t), s;
        };
    }
    function Ut(n, r, o) {
        var i,
            a,
            s = this;
        return function (e) {
            var t;
            return i ? mt(i, e) || (o && o(a), (t = n.call(s, e)), (r && r(t, a)) || (a = t)) : (a = n.call(s, e)), (i = e), a;
        };
    }
    var Wt = { week: 3, separator: 0, omitZeroMinute: 0, meridiem: 0, omitCommas: 0 },
        Vt = { timeZoneName: 7, era: 6, year: 5, month: 4, day: 2, weekday: 2, hour: 1, minute: 1, second: 1 },
        Ft = /\s*([ap])\.?m\.?/i,
        Bt = /,/g,
        zt = /\s+/g,
        jt = /\u200e/g,
        Gt = /UTC|GMT/,
        qt =
            ((Yt.prototype.format = function (e, t) {
                return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, t)(e);
            }),
            (Yt.prototype.formatRange = function (e, t, n, r) {
                var o = this.standardDateProps,
                    i = this.extendedSettings,
                    a =
                        ((s = e.marker),
                        (l = t.marker),
                        (a = n.calendarSystem).getMarkerYear(s) !== a.getMarkerYear(l) ? 5 : a.getMarkerMonth(s) !== a.getMarkerMonth(l) ? 4 : a.getMarkerDay(s) !== a.getMarkerDay(l) ? 2 : ut(s) !== ut(l) ? 1 : 0);
                if (!a) return this.format(e, n);
                var s = a;
                !(1 < s) || ("numeric" !== o.year && "2-digit" !== o.year) || ("numeric" !== o.month && "2-digit" !== o.month) || ("numeric" !== o.day && "2-digit" !== o.day) || (s = 1);
                var l = this.format(e, n),
                    a = this.format(t, n);
                if (l === a) return l;
                (s = Zt(
                    (function (e, t) {
                        var n,
                            r = {};
                        for (n in e) (n in Vt && !(Vt[n] <= t)) || (r[n] = e[n]);
                        return r;
                    })(o, s),
                    i,
                    n
                )),
                    (e = s(e)),
                    (s = s(t)),
                    (t = (function (e, t, n, r) {
                        for (var o = 0; o < e.length; ) {
                            var i = e.indexOf(t, o);
                            if (-1 === i) break;
                            for (var a = e.substr(0, i), o = i + t.length, s = e.substr(o), l = 0; l < n.length; ) {
                                var u = n.indexOf(r, l);
                                if (-1 === u) break;
                                var c = n.substr(0, u),
                                    l = u + r.length,
                                    u = n.substr(l);
                                if (a === c && s === u) return { before: a, after: s };
                            }
                        }
                        return null;
                    })(l, e, a, s)),
                    (n = i.separator || r || n.defaultSeparator || "");
                return t ? t.before + e + n + s + t.after : l + n + a;
            }),
            (Yt.prototype.getLargestUnit = function () {
                switch (this.severity) {
                    case 7:
                    case 6:
                    case 5:
                        return "year";
                    case 4:
                        return "month";
                    case 3:
                        return "week";
                    case 2:
                        return "day";
                    default:
                        return "time";
                }
            }),
            Yt);
    function Yt(e) {
        var t,
            n = {},
            r = {},
            o = 0;
        for (t in e) t in Wt ? ((r[t] = e[t]), (o = Math.max(Wt[t], o))) : ((n[t] = e[t]), t in Vt && (o = Math.max(Vt[t], o)));
        (this.standardDateProps = n), (this.extendedSettings = r), (this.severity = o), (this.buildFormattingFunc = Lt(Zt));
    }
    function Zt(e, a, s) {
        var t = Object.keys(e).length;
        return 1 === t && "short" === e.timeZoneName
            ? function (e) {
                  return Ot(e.timeZoneOffset);
              }
            : 0 === t && a.week
            ? function (e) {
                  return (
                      (t = s.computeWeekNumber(e.marker)),
                      (n = s.weekText),
                      (r = s.weekTextLong),
                      (o = s.locale),
                      (i = a.week),
                      (e = []),
                      "long" === i ? e.push(r) : ("short" !== i && "narrow" !== i) || e.push(n),
                      ("long" !== i && "short" !== i) || e.push(" "),
                      e.push(o.simpleNumberFormat.format(t)),
                      "rtl" === o.options.direction && e.reverse(),
                      e.join("")
                  );
                  var t, n, r, o, i;
              }
            : (function (s, l, u) {
                  var e;
                  (s = I({}, s)),
                      (l = I({}, l)),
                      (t = l),
                      (e = s).timeZoneName && (e.hour || (e.hour = "2-digit"), e.minute || (e.minute = "2-digit")),
                      "long" === e.timeZoneName && (e.timeZoneName = "short"),
                      t.omitZeroMinute && (e.second || e.millisecond) && delete t.omitZeroMinute,
                      (s.timeZone = "UTC");
                  var c,
                      t,
                      d = new Intl.DateTimeFormat(u.locale.codes, s);
                  return (
                      l.omitZeroMinute && (delete (t = I({}, s)).minute, (c = new Intl.DateTimeFormat(u.locale.codes, t))),
                      function (e) {
                          var t,
                              n,
                              r,
                              o,
                              i,
                              a = e.marker;
                          return (
                              (t = (c && !a.getUTCMinutes() ? c : d).format(a)),
                              (n = e),
                              (r = s),
                              (a = l),
                              (e = u),
                              (t = t.replace(jt, "")),
                              "short" === r.timeZoneName &&
                                  ((r = t),
                                  (o = "UTC" === e.timeZone || null == n.timeZoneOffset ? "UTC" : Ot(n.timeZoneOffset)),
                                  (i = !1),
                                  (r = r.replace(Gt, function () {
                                      return (i = !0), o;
                                  })),
                                  i || (r += " " + o),
                                  (t = r)),
                              a.omitCommas && (t = t.replace(Bt, "").trim()),
                              a.omitZeroMinute && (t = t.replace(":00", "")),
                              !1 === a.meridiem
                                  ? (t = t.replace(Ft, "").trim())
                                  : "narrow" === a.meridiem
                                  ? (t = t.replace(Ft, function (e, t) {
                                        return t.toLocaleLowerCase();
                                    }))
                                  : "short" === a.meridiem
                                  ? (t = t.replace(Ft, function (e, t) {
                                        return t.toLocaleLowerCase() + "m";
                                    }))
                                  : "lowercase" === a.meridiem &&
                                    (t = t.replace(Ft, function (e) {
                                        return e.toLocaleLowerCase();
                                    })),
                              (t = t.replace(zt, " ")).trim()
                          );
                      }
                  );
              })(e, a, s);
    }
    function Xt(e, t) {
        t = t.markerToArray(e.marker);
        return { marker: e.marker, timeZoneOffset: e.timeZoneOffset, array: t, year: t[0], month: t[1], day: t[2], hour: t[3], minute: t[4], second: t[5], millisecond: t[6] };
    }
    function Kt(e, t, n, r) {
        e = Xt(e, n.calendarSystem);
        return { date: e, start: e, end: t ? Xt(t, n.calendarSystem) : null, timeZone: n.timeZone, localeCodes: n.locale.codes, defaultSeparator: r || n.defaultSeparator };
    }
    var $t =
            ((en.prototype.format = function (e, t, n) {
                return t.cmdFormatter(this.cmdStr, Kt(e, null, t, n));
            }),
            (en.prototype.formatRange = function (e, t, n, r) {
                return n.cmdFormatter(this.cmdStr, Kt(e, t, n, r));
            }),
            en),
        Jt =
            ((Qt.prototype.format = function (e, t, n) {
                return this.func(Kt(e, null, t, n));
            }),
            (Qt.prototype.formatRange = function (e, t, n, r) {
                return this.func(Kt(e, t, n, r));
            }),
            Qt);
    function Qt(e) {
        this.func = e;
    }
    function en(e) {
        this.cmdStr = e;
    }
    function tn(e) {
        return "object" == typeof e && e ? new qt(e) : "string" == typeof e ? new $t(e) : "function" == typeof e ? new Jt(e) : null;
    }
    var nn = {
            navLinkDayClick: pn,
            navLinkWeekClick: pn,
            duration: wt,
            bootstrapFontAwesome: pn,
            buttonIcons: pn,
            customButtons: pn,
            defaultAllDayEventDuration: wt,
            defaultTimedEventDuration: wt,
            nextDayThreshold: wt,
            scrollTime: wt,
            scrollTimeReset: Boolean,
            slotMinTime: wt,
            slotMaxTime: wt,
            dayPopoverFormat: tn,
            slotDuration: wt,
            snapDuration: wt,
            headerToolbar: pn,
            footerToolbar: pn,
            defaultRangeSeparator: String,
            titleRangeSeparator: String,
            forceEventDuration: Boolean,
            dayHeaders: Boolean,
            dayHeaderFormat: tn,
            dayHeaderClassNames: pn,
            dayHeaderContent: pn,
            dayHeaderDidMount: pn,
            dayHeaderWillUnmount: pn,
            dayCellClassNames: pn,
            dayCellContent: pn,
            dayCellDidMount: pn,
            dayCellWillUnmount: pn,
            initialView: String,
            aspectRatio: Number,
            weekends: Boolean,
            weekNumberCalculation: pn,
            weekNumbers: Boolean,
            weekNumberClassNames: pn,
            weekNumberContent: pn,
            weekNumberDidMount: pn,
            weekNumberWillUnmount: pn,
            editable: Boolean,
            viewClassNames: pn,
            viewDidMount: pn,
            viewWillUnmount: pn,
            nowIndicator: Boolean,
            nowIndicatorClassNames: pn,
            nowIndicatorContent: pn,
            nowIndicatorDidMount: pn,
            nowIndicatorWillUnmount: pn,
            showNonCurrentDates: Boolean,
            lazyFetching: Boolean,
            startParam: String,
            endParam: String,
            timeZoneParam: String,
            timeZone: String,
            locales: pn,
            locale: pn,
            themeSystem: String,
            dragRevertDuration: Number,
            dragScroll: Boolean,
            allDayMaintainDuration: Boolean,
            unselectAuto: Boolean,
            dropAccept: pn,
            eventOrder: Ue,
            eventOrderStrict: Boolean,
            handleWindowResize: Boolean,
            windowResizeDelay: Number,
            longPressDelay: Number,
            eventDragMinDistance: Number,
            expandRows: Boolean,
            height: pn,
            contentHeight: pn,
            direction: String,
            weekNumberFormat: tn,
            eventResizableFromStart: Boolean,
            displayEventTime: Boolean,
            displayEventEnd: Boolean,
            weekText: String,
            weekTextLong: String,
            progressiveEventRendering: Boolean,
            businessHours: pn,
            initialDate: pn,
            now: pn,
            eventDataTransform: pn,
            stickyHeaderDates: pn,
            stickyFooterScrollbar: pn,
            viewHeight: pn,
            defaultAllDay: Boolean,
            eventSourceFailure: pn,
            eventSourceSuccess: pn,
            eventDisplay: String,
            eventStartEditable: Boolean,
            eventDurationEditable: Boolean,
            eventOverlap: pn,
            eventConstraint: pn,
            eventAllow: pn,
            eventBackgroundColor: String,
            eventBorderColor: String,
            eventTextColor: String,
            eventColor: String,
            eventClassNames: pn,
            eventContent: pn,
            eventDidMount: pn,
            eventWillUnmount: pn,
            selectConstraint: pn,
            selectOverlap: pn,
            selectAllow: pn,
            droppable: Boolean,
            unselectCancel: String,
            slotLabelFormat: pn,
            slotLaneClassNames: pn,
            slotLaneContent: pn,
            slotLaneDidMount: pn,
            slotLaneWillUnmount: pn,
            slotLabelClassNames: pn,
            slotLabelContent: pn,
            slotLabelDidMount: pn,
            slotLabelWillUnmount: pn,
            dayMaxEvents: pn,
            dayMaxEventRows: pn,
            dayMinWidth: Number,
            slotLabelInterval: wt,
            allDayText: String,
            allDayClassNames: pn,
            allDayContent: pn,
            allDayDidMount: pn,
            allDayWillUnmount: pn,
            slotMinWidth: Number,
            navLinks: Boolean,
            eventTimeFormat: tn,
            rerenderDelay: Number,
            moreLinkText: pn,
            moreLinkHint: pn,
            selectMinDistance: Number,
            selectable: Boolean,
            selectLongPressDelay: Number,
            eventLongPressDelay: Number,
            selectMirror: Boolean,
            eventMaxStack: Number,
            eventMinHeight: Number,
            eventMinWidth: Number,
            eventShortHeight: Number,
            slotEventOverlap: Boolean,
            plugins: pn,
            firstDay: Number,
            dayCount: Number,
            dateAlignment: String,
            dateIncrement: wt,
            hiddenDays: pn,
            monthMode: Boolean,
            fixedWeekCount: Boolean,
            validRange: pn,
            visibleRange: pn,
            titleFormat: pn,
            eventInteractive: Boolean,
            noEventsText: String,
            viewHint: pn,
            navLinkHint: pn,
            closeHint: String,
            timeHint: String,
            eventHint: String,
            moreLinkClick: pn,
            moreLinkClassNames: pn,
            moreLinkContent: pn,
            moreLinkDidMount: pn,
            moreLinkWillUnmount: pn,
        },
        rn = {
            eventDisplay: "auto",
            defaultRangeSeparator: " - ",
            titleRangeSeparator: " – ",
            defaultTimedEventDuration: "01:00:00",
            defaultAllDayEventDuration: { day: 1 },
            forceEventDuration: !1,
            nextDayThreshold: "00:00:00",
            dayHeaders: !0,
            initialView: "",
            aspectRatio: 1.35,
            headerToolbar: { start: "title", center: "", end: "today prev,next" },
            weekends: !0,
            weekNumbers: !1,
            weekNumberCalculation: "local",
            editable: !1,
            nowIndicator: !1,
            scrollTime: "06:00:00",
            scrollTimeReset: !0,
            slotMinTime: "00:00:00",
            slotMaxTime: "24:00:00",
            showNonCurrentDates: !0,
            lazyFetching: !0,
            startParam: "start",
            endParam: "end",
            timeZoneParam: "timeZone",
            timeZone: "local",
            locales: [],
            locale: "",
            themeSystem: "standard",
            dragRevertDuration: 500,
            dragScroll: !0,
            allDayMaintainDuration: !1,
            unselectAuto: !0,
            dropAccept: "*",
            eventOrder: "start,-duration,allDay,title",
            dayPopoverFormat: { month: "long", day: "numeric", year: "numeric" },
            handleWindowResize: !0,
            windowResizeDelay: 100,
            longPressDelay: 1e3,
            eventDragMinDistance: 5,
            expandRows: !1,
            navLinks: !1,
            selectable: !1,
            eventMinHeight: 15,
            eventMinWidth: 30,
            eventShortHeight: 30,
        },
        on = {
            datesSet: pn,
            eventsSet: pn,
            eventAdd: pn,
            eventChange: pn,
            eventRemove: pn,
            windowResize: pn,
            eventClick: pn,
            eventMouseEnter: pn,
            eventMouseLeave: pn,
            select: pn,
            unselect: pn,
            loading: pn,
            _unmount: pn,
            _beforeprint: pn,
            _afterprint: pn,
            _noEventDrop: pn,
            _noEventResize: pn,
            _resize: pn,
            _scrollRequest: pn,
        },
        an = { buttonText: pn, buttonHints: pn, views: pn, plugins: pn, initialEvents: pn, events: pn, eventSources: pn },
        sn = { headerToolbar: ln, footerToolbar: ln, buttonText: ln, buttonHints: ln, buttonIcons: ln };
    function ln(e, t) {
        return "object" == typeof e && "object" == typeof t && e && t ? mt(e, t) : e === t;
    }
    var un = { type: String, component: pn, buttonText: String, buttonTextKey: String, dateProfileGeneratorClass: pn, usesMinMaxTime: Boolean, classNames: pn, content: pn, didMount: pn, willUnmount: pn };
    function cn(e) {
        return pt(e, sn);
    }
    function dn(e, t) {
        var n,
            r = {},
            o = {};
        for (n in t) n in e && (r[n] = t[n](e[n]));
        for (n in e) n in t || (o[n] = e[n]);
        return { refined: r, extra: o };
    }
    function pn(e) {
        return e;
    }
    function fn(e, t, n, r) {
        for (var o = { defs: {}, instances: {} }, i = xn(n), a = 0, s = e; a < s.length; a++) {
            var l = _n(s[a], t, n, r, i);
            l && hn(l, o);
        }
        return o;
    }
    function hn(e, t) {
        return ((t = void 0 === t ? { defs: {}, instances: {} } : t).defs[e.def.defId] = e.def), e.instance && (t.instances[e.instance.instanceId] = e.instance), t;
    }
    function gn(e, t) {
        t = e.instances[t];
        if (t) {
            var n = e.defs[t.defId],
                e = mn(e, function (e) {
                    return Boolean(n.groupId && n.groupId === e.groupId);
                });
            return (e.defs[n.defId] = n), (e.instances[t.instanceId] = t), e;
        }
        return { defs: {}, instances: {} };
    }
    function vn(e, t) {
        return { defs: I(I({}, e.defs), t.defs), instances: I(I({}, e.instances), t.instances) };
    }
    function mn(e, t) {
        var n = ft(e.defs, t),
            e = ft(e.instances, function (e) {
                return n[e.defId];
            });
        return { defs: n, instances: e };
    }
    function yn(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.split(/\s+/) : [];
    }
    var En = {
            display: String,
            editable: Boolean,
            startEditable: Boolean,
            durationEditable: Boolean,
            constraint: pn,
            overlap: pn,
            allow: pn,
            className: yn,
            classNames: yn,
            color: String,
            backgroundColor: String,
            borderColor: String,
            textColor: String,
        },
        Sn = { display: null, startEditable: null, durationEditable: null, constraints: [], overlap: null, allows: [], backgroundColor: "", borderColor: "", textColor: "", classNames: [] };
    function bn(e, t) {
        var n = ((n = e.constraint), (t = t), Array.isArray(n) ? fn(n, null, t, !0) : "object" == typeof n && n ? fn([n], null, t, !0) : null != n ? String(n) : null);
        return {
            display: e.display || null,
            startEditable: null != e.startEditable ? e.startEditable : e.editable,
            durationEditable: null != e.durationEditable ? e.durationEditable : e.editable,
            constraints: null != n ? [n] : [],
            overlap: null != e.overlap ? e.overlap : null,
            allows: null != e.allow ? [e.allow] : [],
            backgroundColor: e.backgroundColor || e.color || "",
            borderColor: e.borderColor || e.color || "",
            textColor: e.textColor || "",
            classNames: (e.className || []).concat(e.classNames || []),
        };
    }
    function Dn(e) {
        return e.reduce(Cn, Sn);
    }
    function Cn(e, t) {
        return {
            display: (null != t.display ? t : e).display,
            startEditable: (null != t.startEditable ? t : e).startEditable,
            durationEditable: (null != t.durationEditable ? t : e).durationEditable,
            constraints: e.constraints.concat(t.constraints),
            overlap: ("boolean" == typeof t.overlap ? t : e).overlap,
            allows: e.allows.concat(t.allows),
            backgroundColor: t.backgroundColor || e.backgroundColor,
            borderColor: t.borderColor || e.borderColor,
            textColor: t.textColor || e.textColor,
            classNames: e.classNames.concat(t.classNames),
        };
    }
    var wn = { id: String, groupId: String, title: String, url: String, interactive: Boolean },
        Rn = { start: pn, end: pn, date: pn, allDay: Boolean },
        Tn = I(I(I({}, wn), Rn), { extendedProps: pn });
    function _n(e, t, n, r, o) {
        void 0 === o && (o = xn(n));
        var i = kn(e, n, o),
            a = i.refined,
            e = i.extra,
            i = (o = (o = null) == (o = t ? t.defaultAllDay : o) ? n.options.defaultAllDay : o),
            o = (function (e, t, n, r) {
                for (var o = 0; o < r.length; o += 1) {
                    var i = r[o].parse(e, n);
                    if (i) {
                        var a = e.allDay;
                        return { allDay: (a = null == a && null == (a = t) && null == (a = i.allDayGuess) ? !1 : a), duration: i.duration, typeData: i.typeData, typeId: o };
                    }
                }
                return null;
            })(a, i, n.dateEnv, n.pluginHooks.recurringTypes);
        if (o) return ((s = Mn(a, e, t ? t.sourceId : "", o.allDay, Boolean(o.duration), n)).recurringDef = { typeId: o.typeId, typeData: o.typeData, duration: o.duration }), { def: s, instance: null };
        var s,
            r = (function (e, t, n, r) {
                var o,
                    i = e.allDay,
                    a = null,
                    s = !1,
                    l = null,
                    u = null != e.start ? e.start : e.date;
                if ((u = n.dateEnv.createMarkerMeta(u))) a = u.marker;
                else if (!r) return null;
                return (
                    null != e.end && (o = n.dateEnv.createMarkerMeta(e.end)),
                    (i = null == i ? (null != t ? t : (!u || u.isTimeUnspecified) && (!o || o.isTimeUnspecified)) : i) && a && (a = nt(a)),
                    o && ((l = o.marker), i && (l = nt(l)), a && l <= a && (l = null)),
                    l ? (s = !0) : r || ((s = n.options.forceEventDuration || !1), (l = n.dateEnv.add(a, i ? n.options.defaultAllDayEventDuration : n.options.defaultTimedEventDuration))),
                    { allDay: i, hasEnd: s, range: { start: a, end: l }, forcedStartTzo: u ? u.forcedTzo : null, forcedEndTzo: o ? o.forcedTzo : null }
                );
            })(a, i, n, r);
        return r ? { def: (s = Mn(a, e, t ? t.sourceId : "", r.allDay, r.hasEnd, n)), instance: ct(s.defId, r.range, r.forcedStartTzo, r.forcedEndTzo) } : null;
    }
    function kn(e, t, n) {
        return dn(e, (n = void 0 === n ? xn(t) : n));
    }
    function xn(e) {
        return I(I(I({}, En), Tn), e.pluginHooks.eventRefiners);
    }
    function Mn(e, t, n, r, o, i) {
        for (
            var a = {
                    title: e.title || "",
                    groupId: e.groupId || "",
                    publicId: e.id || "",
                    url: e.url || "",
                    recurringDef: null,
                    defId: Ie(),
                    sourceId: n,
                    allDay: r,
                    hasEnd: o,
                    interactive: e.interactive,
                    ui: bn(e, i),
                    extendedProps: I(I({}, e.extendedProps || {}), t),
                },
                s = 0,
                l = i.pluginHooks.eventDefMemberAdders;
            s < l.length;
            s++
        ) {
            var u = l[s];
            I(a, u(e));
        }
        return Object.freeze(a.ui.classNames), Object.freeze(a.extendedProps), a;
    }
    function In(e) {
        var t = Math.floor(Je(e.start, e.end)) || 1,
            e = nt(e.start);
        return { start: e, end: Xe(e, t) };
    }
    function Pn(e, t) {
        void 0 === t && (t = wt(0));
        var n,
            r = null,
            o = null;
        return e.end && ((o = nt(e.end)), (n = e.end.valueOf() - o.valueOf()) && n >= xt(t) && (o = Xe(o, 1))), e.start && ((r = nt(e.start)), o && o <= r && (o = Xe(r, 1))), { start: r, end: o };
    }
    function Nn(e) {
        e = Pn(e);
        return 1 < Je(e.start, e.end);
    }
    function Hn(e, t, n, r) {
        return "year" === r ? wt(n.diffWholeYears(e, t), "year") : "month" === r ? wt(n.diffWholeMonths(e, t), "month") : Qe(e, t);
    }
    function On(e, t) {
        var n,
            r,
            o = [],
            i = t.start;
        for (e.sort(An), n = 0; n < e.length; n += 1) (r = e[n]).start > i && o.push({ start: i, end: r.start }), r.end > i && (i = r.end);
        return i < t.end && o.push({ start: i, end: t.end }), o;
    }
    function An(e, t) {
        return e.start.valueOf() - t.start.valueOf();
    }
    function Ln(e, t) {
        var n = e.start,
            r = e.end,
            e = null;
        return (
            null !== t.start && (n = null === n ? t.start : new Date(Math.max(n.valueOf(), t.start.valueOf()))),
            null != t.end && (r = null === r ? t.end : new Date(Math.min(r.valueOf(), t.end.valueOf()))),
            (e = null === n || null === r || n < r ? { start: n, end: r } : e)
        );
    }
    function Un(e, t) {
        return (null === e.start ? null : e.start.valueOf()) === (null === t.start ? null : t.start.valueOf()) && (null === e.end ? null : e.end.valueOf()) === (null === t.end ? null : t.end.valueOf());
    }
    function Wn(e, t) {
        return (null === e.end || null === t.start || e.end > t.start) && (null === e.start || null === t.end || e.start < t.end);
    }
    function Vn(e, t) {
        return (null === e.start || (null !== t.start && t.start >= e.start)) && (null === e.end || (null !== t.end && t.end <= e.end));
    }
    function Fn(e, t) {
        return (null === e.start || t >= e.start) && (null === e.end || t < e.end);
    }
    function Bn(e, t, n, r) {
        var o,
            i,
            a,
            s = {},
            l = {},
            u = {},
            c = [],
            d = [],
            p = qn(e.defs, t);
        for (a in e.defs) "inverse-background" === (h = p[(E = e.defs[a]).defId]).display && (E.groupId ? ((s[E.groupId] = []), u[E.groupId] || (u[E.groupId] = E)) : (l[a] = []));
        for (o in e.instances) {
            var f = e.instances[o],
                h = p[(E = e.defs[f.defId]).defId],
                g = f.range,
                v = !E.allDay && r ? Pn(g, r) : g,
                g = Ln(v, n);
            g &&
                ("inverse-background" === h.display
                    ? (E.groupId ? s[E.groupId] : l[f.defId]).push(g)
                    : "none" !== h.display &&
                      ("background" === h.display ? c : d).push({ def: E, ui: h, instance: f, range: g, isStart: v.start && v.start.valueOf() === g.start.valueOf(), isEnd: v.end && v.end.valueOf() === g.end.valueOf() }));
        }
        for (i in s)
            for (var m = 0, y = On(s[i], n); m < y.length; m++) {
                var E,
                    S = y[m],
                    h = p[(E = u[i]).defId];
                c.push({ def: E, ui: h, instance: null, range: S, isStart: !1, isEnd: !1 });
            }
        for (a in l) for (var b = 0, D = On(l[a], n); b < D.length; b++) (S = D[b]), c.push({ def: e.defs[a], ui: p[a], instance: null, range: S, isStart: !1, isEnd: !1 });
        return { bg: c, fg: d };
    }
    function zn(e) {
        return "background" === e.ui.display || "inverse-background" === e.ui.display;
    }
    function jn(e, t) {
        e.fcSeg = t;
    }
    function Gn(e) {
        return e.fcSeg || e.parentNode.fcSeg || null;
    }
    function qn(e, t) {
        return ht(e, function (e) {
            return Yn(e, t);
        });
    }
    function Yn(e, t) {
        var n = [];
        return t[""] && n.push(t[""]), t[e.defId] && n.push(t[e.defId]), n.push(e.ui), Dn(n);
    }
    function Zn(e, n) {
        e = e.map(Xn);
        return (
            e.sort(function (e, t) {
                return We(e, t, n);
            }),
            e.map(function (e) {
                return e._seg;
            })
        );
    }
    function Xn(e) {
        var t = e.eventRange,
            n = t.def,
            r = (t.instance || t).range,
            t = r.start ? r.start.valueOf() : 0,
            r = r.end ? r.end.valueOf() : 0;
        return I(I(I({}, n.extendedProps), n), { id: n.publicId, start: t, end: r, duration: r - t, allDay: Number(n.allDay), _seg: e });
    }
    function Kn(e, t) {
        for (var n = t.pluginHooks.isDraggableTransformers, e = e.eventRange, r = e.def, o = e.ui, i = o.startEditable, a = 0, s = n; a < s.length; a++) i = (0, s[a])(i, r, o, t);
        return i;
    }
    function $n(e, t) {
        return e.isStart && e.eventRange.ui.durationEditable && t.options.eventResizableFromStart;
    }
    function Jn(e, t) {
        return e.isEnd && e.eventRange.ui.durationEditable;
    }
    function Qn(e, t, n, r, o, i, a) {
        var s = n.dateEnv,
            l = n.options,
            u = l.displayEventTime,
            c = l.displayEventEnd,
            d = e.eventRange.def,
            p = e.eventRange.instance;
        null == u && (u = !1 !== r), null == c && (c = !1 !== o);
        var f = p.range.start,
            n = p.range.end,
            l = i || e.start || e.eventRange.range.start,
            r = a || e.end || e.eventRange.range.end,
            o = nt(f).valueOf() === nt(l).valueOf(),
            e = nt(Ke(n, -1)).valueOf() === nt(Ke(r, -1)).valueOf();
        return u && !d.allDay && (o || e)
            ? ((l = o ? f : l), (r = e ? n : r), c && d.hasEnd ? s.formatRange(l, r, t, { forcedStartTzo: i ? null : p.forcedStartTzo, forcedEndTzo: a ? null : p.forcedEndTzo }) : s.format(l, t, { forcedTzo: i ? null : p.forcedStartTzo }))
            : "";
    }
    function er(e, t, n) {
        e = e.eventRange.range;
        return { isPast: e.end < (n || t.start), isFuture: e.start >= (n || t.end), isToday: t && Fn(t, e.start) };
    }
    function tr(e) {
        var t = ["fc-event"];
        return (
            e.isMirror && t.push("fc-event-mirror"),
            e.isDraggable && t.push("fc-event-draggable"),
            (e.isStartResizable || e.isEndResizable) && t.push("fc-event-resizable"),
            e.isDragging && t.push("fc-event-dragging"),
            e.isResizing && t.push("fc-event-resizing"),
            e.isSelected && t.push("fc-event-selected"),
            e.isStart && t.push("fc-event-start"),
            e.isEnd && t.push("fc-event-end"),
            e.isPast && t.push("fc-event-past"),
            e.isToday && t.push("fc-event-today"),
            e.isFuture && t.push("fc-event-future"),
            t
        );
    }
    function nr(e) {
        return e.instance ? e.instance.instanceId : e.def.defId + ":" + e.range.start.toISOString();
    }
    function rr(e, t) {
        var e = e.eventRange,
            n = e.def,
            r = e.instance,
            e = n.url;
        if (e) return { href: e };
        var o = t.emitter,
            e = t.options.eventInteractive;
        return (e = null == e && null == (e = n.interactive) ? Boolean(o.hasHandlers("eventClick")) : e)
            ? xe(function (e) {
                  o.trigger("eventClick", { el: e.target, event: new Er(t, n, r), jsEvent: e, view: t.viewApi });
              })
            : {};
    }
    var or = { start: pn, end: pn, allDay: Boolean };
    function ir(e, t) {
        return (
            Un(e.range, t.range) &&
            e.allDay === t.allDay &&
            (function (e, t) {
                for (var n in t) if ("range" !== n && "allDay" !== n && e[n] !== t[n]) return !1;
                for (var n in e) if (!(n in t)) return !1;
                return !0;
            })(e, t)
        );
    }
    function ar(e, t, n) {
        return I(I({}, sr(e, t, n)), { timeZone: t.timeZone });
    }
    function sr(e, t, n) {
        return { start: t.toDate(e.start), end: t.toDate(e.end), startStr: t.formatIso(e.start, { omitTime: n }), endStr: t.formatIso(e.end, { omitTime: n }) };
    }
    function lr(e, t, n) {
        n.emitter.trigger("select", I(I({}, ur(e, n)), { jsEvent: t ? t.origEvent : null, view: n.viewApi || n.calendarApi.view }));
    }
    function ur(e, t) {
        for (var n, r, o = {}, i = 0, a = t.pluginHooks.dateSpanTransforms; i < a.length; i++) {
            var s = a[i];
            I(o, s(e, t));
        }
        return I(o, ((r = t.dateEnv), I(I({}, sr((n = e).range, r, n.allDay)), { allDay: n.allDay }))), o;
    }
    function cr(e, t, n) {
        var r = n.dateEnv,
            n = n.options,
            t = t;
        return (t = e ? ((t = nt(t)), r.add(t, n.defaultAllDayEventDuration)) : r.add(t, n.defaultTimedEventDuration));
    }
    function dr(e, t, n, r) {
        var o,
            i,
            a,
            s,
            l,
            u,
            c,
            d,
            p,
            f = qn(e.defs, t),
            h = { defs: {}, instances: {} };
        for (o in e.defs) {
            var g = e.defs[o];
            h.defs[o] = (function (e, t, n, r) {
                var o = n.standardProps || {};
                null == o.hasEnd && t.durationEditable && (n.startDelta || n.endDelta) && (o.hasEnd = !0);
                var i = I(I(I({}, e), o), { ui: I(I({}, e.ui), o.ui) });
                n.extendedProps && (i.extendedProps = I(I({}, i.extendedProps), n.extendedProps));
                for (var a = 0, s = r.pluginHooks.eventDefMutationAppliers; a < s.length; a++) (0, s[a])(i, n, r);
                return !i.hasEnd && r.options.forceEventDuration && (i.hasEnd = !0), i;
            })(g, f[o], n, r);
        }
        for (i in e.instances) {
            var v = e.instances[i],
                g = h.defs[v.defId];
            h.instances[i] =
                ((s = g),
                (l = f[(a = v).defId]),
                (u = n),
                (p = d = c = void 0),
                (c = (v = r).dateEnv),
                (d = u.standardProps && !0 === u.standardProps.allDay),
                (p = u.standardProps && !1 === u.standardProps.hasEnd),
                (a = I({}, a)),
                d && (a.range = In(a.range)),
                u.datesDelta && l.startEditable && (a.range = { start: c.add(a.range.start, u.datesDelta), end: c.add(a.range.end, u.datesDelta) }),
                u.startDelta && l.durationEditable && (a.range = { start: c.add(a.range.start, u.startDelta), end: a.range.end }),
                u.endDelta && l.durationEditable && (a.range = { start: a.range.start, end: c.add(a.range.end, u.endDelta) }),
                p && (a.range = { start: a.range.start, end: cr(s.allDay, a.range.start, v) }),
                s.allDay && (a.range = { start: nt(a.range.start), end: nt(a.range.end) }),
                a.range.end < a.range.start && (a.range.end = cr(s.allDay, a.range.start, v)),
                a);
        }
        return h;
    }
    var pr =
            (Object.defineProperty(hr.prototype, "calendar", {
                get: function () {
                    return this.getCurrentData().calendarApi;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(hr.prototype, "title", {
                get: function () {
                    return this.getCurrentData().viewTitle;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(hr.prototype, "activeStart", {
                get: function () {
                    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start);
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(hr.prototype, "activeEnd", {
                get: function () {
                    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end);
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(hr.prototype, "currentStart", {
                get: function () {
                    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start);
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(hr.prototype, "currentEnd", {
                get: function () {
                    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end);
                },
                enumerable: !1,
                configurable: !0,
            }),
            (hr.prototype.getOption = function (e) {
                return this.getCurrentData().options[e];
            }),
            hr),
        fr = { id: String, defaultAllDay: Boolean, url: String, format: String, events: pn, eventDataTransform: pn, success: pn, failure: pn };
    function hr(e, t, n) {
        (this.type = e), (this.getCurrentData = t), (this.dateEnv = n);
    }
    function gr(e, o, t) {
        if ((void 0 === t && (t = vr(o)), "string" == typeof e ? (r = { url: e }) : "function" == typeof e || Array.isArray(e) ? (r = { events: e }) : "object" == typeof e && e && (r = e), r)) {
            var n = dn(r, t),
                r = n.refined,
                t = n.extra,
                n = (function (e) {
                    for (var t = o.pluginHooks.eventSourceDefs, n = t.length - 1; 0 <= n; --n) {
                        var r = t[n].parseMeta(e);
                        if (r) return { sourceDefId: n, meta: r };
                    }
                    return null;
                })(r);
            if (n)
                return {
                    _raw: e,
                    isFetching: !1,
                    latestFetchId: "",
                    fetchRange: null,
                    defaultAllDay: r.defaultAllDay,
                    eventDataTransform: r.eventDataTransform,
                    success: r.success,
                    failure: r.failure,
                    publicId: r.id || "",
                    sourceId: Ie(),
                    sourceDefId: n.sourceDefId,
                    meta: n.meta,
                    ui: bn(r, o),
                    extendedProps: t,
                };
        }
        return null;
    }
    function vr(e) {
        return I(I(I({}, En), fr), e.pluginHooks.eventSourceRefiners);
    }
    function mr(e, t) {
        return null == (e = "function" == typeof e ? e() : e) ? t.createNowMarker() : t.createMarker(e);
    }
    var yr =
            ((br.prototype.getCurrentData = function () {
                return this.currentDataManager.getCurrentData();
            }),
            (br.prototype.dispatch = function (e) {
                return this.currentDataManager.dispatch(e);
            }),
            Object.defineProperty(br.prototype, "view", {
                get: function () {
                    return this.getCurrentData().viewApi;
                },
                enumerable: !1,
                configurable: !0,
            }),
            (br.prototype.batchRendering = function (e) {
                e();
            }),
            (br.prototype.updateSize = function () {
                this.trigger("_resize", !0);
            }),
            (br.prototype.setOption = function (e, t) {
                this.dispatch({ type: "SET_OPTION", optionName: e, rawOptionValue: t });
            }),
            (br.prototype.getOption = function (e) {
                return this.currentDataManager.currentCalendarOptionsInput[e];
            }),
            (br.prototype.getAvailableLocaleCodes = function () {
                return Object.keys(this.getCurrentData().availableRawLocales);
            }),
            (br.prototype.on = function (e, t) {
                var n = this.currentDataManager;
                n.currentCalendarOptionsRefiners[e] ? n.emitter.on(e, t) : console.warn("Unknown listener name '" + e + "'");
            }),
            (br.prototype.off = function (e, t) {
                this.currentDataManager.emitter.off(e, t);
            }),
            (br.prototype.trigger = function (e) {
                for (var t, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                (t = this.currentDataManager.emitter).trigger.apply(t, h([e], n));
            }),
            (br.prototype.changeView = function (t, n) {
                var r = this;
                this.batchRendering(function () {
                    var e;
                    r.unselect(),
                        n
                            ? n.start && n.end
                                ? (r.dispatch({ type: "CHANGE_VIEW_TYPE", viewType: t }), r.dispatch({ type: "SET_OPTION", optionName: "visibleRange", rawOptionValue: n }))
                                : ((e = r.getCurrentData().dateEnv), r.dispatch({ type: "CHANGE_VIEW_TYPE", viewType: t, dateMarker: e.createMarker(n) }))
                            : r.dispatch({ type: "CHANGE_VIEW_TYPE", viewType: t });
                });
            }),
            (br.prototype.zoomTo = function (e, t) {
                (t = t || "day"),
                    (t = this.getCurrentData().viewSpecs[t] || this.getUnitViewSpec(t)),
                    this.unselect(),
                    t ? this.dispatch({ type: "CHANGE_VIEW_TYPE", viewType: t.type, dateMarker: e }) : this.dispatch({ type: "CHANGE_DATE", dateMarker: e });
            }),
            (br.prototype.getUnitViewSpec = function (e) {
                var t,
                    n,
                    r,
                    o = this.getCurrentData(),
                    i = o.viewSpecs,
                    o = o.toolbarConfig,
                    a = [].concat(o.header ? o.header.viewsWithButtons : [], o.footer ? o.footer.viewsWithButtons : []);
                for (r in i) a.push(r);
                for (t = 0; t < a.length; t += 1) if ((n = i[a[t]]) && n.singleUnit === e) return n;
                return null;
            }),
            (br.prototype.prev = function () {
                this.unselect(), this.dispatch({ type: "PREV" });
            }),
            (br.prototype.next = function () {
                this.unselect(), this.dispatch({ type: "NEXT" });
            }),
            (br.prototype.prevYear = function () {
                var e = this.getCurrentData();
                this.unselect(), this.dispatch({ type: "CHANGE_DATE", dateMarker: e.dateEnv.addYears(e.currentDate, -1) });
            }),
            (br.prototype.nextYear = function () {
                var e = this.getCurrentData();
                this.unselect(), this.dispatch({ type: "CHANGE_DATE", dateMarker: e.dateEnv.addYears(e.currentDate, 1) });
            }),
            (br.prototype.today = function () {
                var e = this.getCurrentData();
                this.unselect(), this.dispatch({ type: "CHANGE_DATE", dateMarker: mr(e.calendarOptions.now, e.dateEnv) });
            }),
            (br.prototype.gotoDate = function (e) {
                var t = this.getCurrentData();
                this.unselect(), this.dispatch({ type: "CHANGE_DATE", dateMarker: t.dateEnv.createMarker(e) });
            }),
            (br.prototype.incrementDate = function (e) {
                var t = this.getCurrentData(),
                    e = wt(e);
                e && (this.unselect(), this.dispatch({ type: "CHANGE_DATE", dateMarker: t.dateEnv.add(t.currentDate, e) }));
            }),
            (br.prototype.getDate = function () {
                var e = this.getCurrentData();
                return e.dateEnv.toDate(e.currentDate);
            }),
            (br.prototype.formatDate = function (e, t) {
                var n = this.getCurrentData().dateEnv;
                return n.format(n.createMarker(e), tn(t));
            }),
            (br.prototype.formatRange = function (e, t, n) {
                var r = this.getCurrentData().dateEnv;
                return r.formatRange(r.createMarker(e), r.createMarker(t), tn(n), n);
            }),
            (br.prototype.formatIso = function (e, t) {
                var n = this.getCurrentData().dateEnv;
                return n.formatIso(n.createMarker(e), { omitTime: t });
            }),
            (br.prototype.select = function (e, t) {
                (e = null == t ? (null != e.start ? e : { start: e, end: null }) : { start: e, end: t }),
                    (t = this.getCurrentData()),
                    (e = (function (e, t, n) {
                        var r,
                            o,
                            i =
                                ((r = t),
                                (o = dn(e, or)),
                                (i = o.refined),
                                (e = o.extra),
                                (o = i.start ? r.createMarkerMeta(i.start) : null),
                                (r = i.end ? r.createMarkerMeta(i.end) : null),
                                null == (i = i.allDay) && (i = o && o.isTimeUnspecified && (!r || r.isTimeUnspecified)),
                                I({ range: { start: o ? o.marker : null, end: r ? r.marker : null }, allDay: i }, e));
                        if (!(e = i.range).start) return null;
                        if (!e.end) {
                            if (null == n) return null;
                            e.end = t.add(e.start, n);
                        }
                        return i;
                    })(e, t.dateEnv, wt({ days: 1 })));
                e && (this.dispatch({ type: "SELECT_DATES", selection: e }), lr(e, null, t));
            }),
            (br.prototype.unselect = function (e) {
                var t = this.getCurrentData();
                t.dateSelection && (this.dispatch({ type: "UNSELECT_DATES" }), (t = t).emitter.trigger("unselect", { jsEvent: e ? e.origEvent : null, view: t.viewApi || t.calendarApi.view }));
            }),
            (br.prototype.addEvent = function (e, t) {
                if (e instanceof Er) {
                    var n = e._def,
                        r = e._instance;
                    return this.getCurrentData().eventStore.defs[n.defId] || (this.dispatch({ type: "ADD_EVENTS", eventStore: hn({ def: n, instance: r }) }), this.triggerEventAdd(e)), e;
                }
                n = this.getCurrentData();
                if (t instanceof de) o = t.internalEventSource;
                else if ("boolean" == typeof t) t && (o = vt(n.eventSources)[0]);
                else if (null != t) {
                    r = this.getEventSourceById(t);
                    if (!r) return console.warn('Could not find an event source with ID "' + t + '"'), null;
                    o = r.internalEventSource;
                }
                var o = _n(e, o, n, !1);
                if (o) {
                    n = new Er(n, o.def, o.def.recurringDef ? null : o.instance);
                    return this.dispatch({ type: "ADD_EVENTS", eventStore: hn(o) }), this.triggerEventAdd(n), n;
                }
                return null;
            }),
            (br.prototype.triggerEventAdd = function (e) {
                var t = this;
                this.getCurrentData().emitter.trigger("eventAdd", {
                    event: e,
                    relatedEvents: [],
                    revert: function () {
                        t.dispatch({ type: "REMOVE_EVENTS", eventStore: Dr(e) });
                    },
                });
            }),
            (br.prototype.getEventById = function (e) {
                var t,
                    n = this.getCurrentData(),
                    r = n.eventStore,
                    o = r.defs,
                    i = r.instances;
                for (t in ((e = String(e)), o)) {
                    var a = o[t];
                    if (a.publicId === e) {
                        if (a.recurringDef) return new Er(n, a, null);
                        for (var s in i) {
                            s = i[s];
                            if (s.defId === a.defId) return new Er(n, a, s);
                        }
                    }
                }
                return null;
            }),
            (br.prototype.getEvents = function () {
                var e = this.getCurrentData();
                return Cr(e.eventStore, e);
            }),
            (br.prototype.removeAllEvents = function () {
                this.dispatch({ type: "REMOVE_ALL_EVENTS" });
            }),
            (br.prototype.getEventSources = function () {
                var e,
                    t = this.getCurrentData(),
                    n = t.eventSources,
                    r = [];
                for (e in n) r.push(new de(t, n[e]));
                return r;
            }),
            (br.prototype.getEventSourceById = function (e) {
                var t,
                    n = this.getCurrentData(),
                    r = n.eventSources;
                for (t in ((e = String(e)), r)) if (r[t].publicId === e) return new de(n, r[t]);
                return null;
            }),
            (br.prototype.addEventSource = function (e) {
                var t = this.getCurrentData();
                if (e instanceof de) return t.eventSources[e.internalEventSource.sourceId] || this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [e.internalEventSource] }), e;
                e = gr(e, t);
                return e ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [e] }), new de(t, e)) : null;
            }),
            (br.prototype.removeAllEventSources = function () {
                this.dispatch({ type: "REMOVE_ALL_EVENT_SOURCES" });
            }),
            (br.prototype.refetchEvents = function () {
                this.dispatch({ type: "FETCH_EVENT_SOURCES", isRefetch: !0 });
            }),
            (br.prototype.scrollToTime = function (e) {
                e = wt(e);
                e && this.trigger("_scrollRequest", { time: e });
            }),
            br),
        Er =
            ((Sr.prototype.setProp = function (e, t) {
                var n, r;
                e in Rn
                    ? console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.")
                    : "id" === e
                    ? ((t = wn[e](t)), this.mutate({ standardProps: { publicId: t } }))
                    : e in wn
                    ? ((t = wn[e](t)), this.mutate({ standardProps: (((n = {})[e] = t), n) }))
                    : e in En
                    ? ((r = En[e](t)), (r = "color" === e ? { backgroundColor: t, borderColor: t } : "editable" === e ? { startEditable: t, durationEditable: t } : (((n = {})[e] = t), n)), this.mutate({ standardProps: { ui: r } }))
                    : console.warn("Could not set prop '" + e + "'. Use setExtendedProp instead.");
            }),
            (Sr.prototype.setExtendedProp = function (e, t) {
                var n;
                this.mutate({ extendedProps: (((n = {})[e] = t), n) });
            }),
            (Sr.prototype.setStart = function (e, t) {
                void 0 === t && (t = {});
                var n = this._context.dateEnv,
                    e = n.createMarker(e);
                e && this._instance && ((n = Hn(this._instance.range.start, e, n, t.granularity)), t.maintainDuration ? this.mutate({ datesDelta: n }) : this.mutate({ startDelta: n }));
            }),
            (Sr.prototype.setEnd = function (e, t) {
                void 0 === t && (t = {});
                var n,
                    r = this._context.dateEnv;
                (null == e || (n = r.createMarker(e))) && this._instance && (n ? ((t = Hn(this._instance.range.end, n, r, t.granularity)), this.mutate({ endDelta: t })) : this.mutate({ standardProps: { hasEnd: !1 } }));
            }),
            (Sr.prototype.setDates = function (e, t, n) {
                var r,
                    o = this._context.dateEnv,
                    i = { allDay: (n = void 0 === n ? {} : n).allDay },
                    e = o.createMarker(e);
                e &&
                    (null == t || (r = o.createMarker(t))) &&
                    this._instance &&
                    ((t = this._instance.range),
                    (e = Hn((t = !0 === n.allDay ? In(t) : t).start, e, o, n.granularity)),
                    r
                        ? ((n = Hn(t.end, r, o, n.granularity)),
                          e.years === n.years && e.months === n.months && e.days === n.days && e.milliseconds === n.milliseconds
                              ? this.mutate({ datesDelta: e, standardProps: i })
                              : this.mutate({ startDelta: e, endDelta: n, standardProps: i }))
                        : ((i.hasEnd = !1), this.mutate({ datesDelta: e, standardProps: i })));
            }),
            (Sr.prototype.moveStart = function (e) {
                e = wt(e);
                e && this.mutate({ startDelta: e });
            }),
            (Sr.prototype.moveEnd = function (e) {
                e = wt(e);
                e && this.mutate({ endDelta: e });
            }),
            (Sr.prototype.moveDates = function (e) {
                e = wt(e);
                e && this.mutate({ datesDelta: e });
            }),
            (Sr.prototype.setAllDay = function (e, t) {
                var n = { allDay: e },
                    t = (t = void 0 === t ? {} : t).maintainDuration;
                null == t && (t = this._context.options.allDayMaintainDuration), this._def.allDay !== e && (n.hasEnd = t), this.mutate({ standardProps: n });
            }),
            (Sr.prototype.formatRange = function (e) {
                var t = this._context.dateEnv,
                    n = this._instance,
                    e = tn(e);
                return this._def.hasEnd ? t.formatRange(n.range.start, n.range.end, e, { forcedStartTzo: n.forcedStartTzo, forcedEndTzo: n.forcedEndTzo }) : t.format(n.range.start, e, { forcedTzo: n.forcedStartTzo });
            }),
            (Sr.prototype.mutate = function (e) {
                var t,
                    n,
                    r,
                    o,
                    i = this._instance;
                i &&
                    ((t = this._def),
                    (n = this._context),
                    (o = dr(
                        (o = gn((r = n.getCurrentData().eventStore), i.instanceId)),
                        { "": { display: "", startEditable: !0, durationEditable: !0, constraints: [], overlap: null, allows: [], backgroundColor: "", borderColor: "", textColor: "", classNames: [] } },
                        e,
                        n
                    )),
                    (e = new Sr(n, t, i)),
                    (this._def = o.defs[t.defId]),
                    (this._instance = o.instances[i.instanceId]),
                    n.dispatch({ type: "MERGE_EVENTS", eventStore: o }),
                    n.emitter.trigger("eventChange", {
                        oldEvent: e,
                        event: this,
                        relatedEvents: Cr(o, n, i),
                        revert: function () {
                            n.dispatch({ type: "RESET_EVENTS", eventStore: r });
                        },
                    }));
            }),
            (Sr.prototype.remove = function () {
                var e = this._context,
                    t = Dr(this);
                e.dispatch({ type: "REMOVE_EVENTS", eventStore: t }),
                    e.emitter.trigger("eventRemove", {
                        event: this,
                        relatedEvents: [],
                        revert: function () {
                            e.dispatch({ type: "MERGE_EVENTS", eventStore: t });
                        },
                    });
            }),
            Object.defineProperty(Sr.prototype, "source", {
                get: function () {
                    var e = this._def.sourceId;
                    return e ? new de(this._context, this._context.getCurrentData().eventSources[e]) : null;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "start", {
                get: function () {
                    return this._instance ? this._context.dateEnv.toDate(this._instance.range.start) : null;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "end", {
                get: function () {
                    return this._instance && this._def.hasEnd ? this._context.dateEnv.toDate(this._instance.range.end) : null;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "startStr", {
                get: function () {
                    var e = this._instance;
                    return e ? this._context.dateEnv.formatIso(e.range.start, { omitTime: this._def.allDay, forcedTzo: e.forcedStartTzo }) : "";
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "endStr", {
                get: function () {
                    var e = this._instance;
                    return e && this._def.hasEnd ? this._context.dateEnv.formatIso(e.range.end, { omitTime: this._def.allDay, forcedTzo: e.forcedEndTzo }) : "";
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "id", {
                get: function () {
                    return this._def.publicId;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "groupId", {
                get: function () {
                    return this._def.groupId;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "allDay", {
                get: function () {
                    return this._def.allDay;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "title", {
                get: function () {
                    return this._def.title;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "url", {
                get: function () {
                    return this._def.url;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "display", {
                get: function () {
                    return this._def.ui.display || "auto";
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "startEditable", {
                get: function () {
                    return this._def.ui.startEditable;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "durationEditable", {
                get: function () {
                    return this._def.ui.durationEditable;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "constraint", {
                get: function () {
                    return this._def.ui.constraints[0] || null;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "overlap", {
                get: function () {
                    return this._def.ui.overlap;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "allow", {
                get: function () {
                    return this._def.ui.allows[0] || null;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "backgroundColor", {
                get: function () {
                    return this._def.ui.backgroundColor;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "borderColor", {
                get: function () {
                    return this._def.ui.borderColor;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "textColor", {
                get: function () {
                    return this._def.ui.textColor;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "classNames", {
                get: function () {
                    return this._def.ui.classNames;
                },
                enumerable: !1,
                configurable: !0,
            }),
            Object.defineProperty(Sr.prototype, "extendedProps", {
                get: function () {
                    return this._def.extendedProps;
                },
                enumerable: !1,
                configurable: !0,
            }),
            (Sr.prototype.toPlainObject = function (e) {
                void 0 === e && (e = {});
                var t = this._def,
                    n = t.ui,
                    r = this.startStr,
                    o = this.endStr,
                    i = {};
                return (
                    t.title && (i.title = t.title),
                    r && (i.start = r),
                    o && (i.end = o),
                    t.publicId && (i.id = t.publicId),
                    t.groupId && (i.groupId = t.groupId),
                    t.url && (i.url = t.url),
                    n.display && "auto" !== n.display && (i.display = n.display),
                    e.collapseColor && n.backgroundColor && n.backgroundColor === n.borderColor
                        ? (i.color = n.backgroundColor)
                        : (n.backgroundColor && (i.backgroundColor = n.backgroundColor), n.borderColor && (i.borderColor = n.borderColor)),
                    n.textColor && (i.textColor = n.textColor),
                    n.classNames.length && (i.classNames = n.classNames),
                    Object.keys(t.extendedProps).length && (e.collapseExtendedProps ? I(i, t.extendedProps) : (i.extendedProps = t.extendedProps)),
                    i
                );
            }),
            (Sr.prototype.toJSON = function () {
                return this.toPlainObject();
            }),
            Sr);
    function Sr(e, t, n) {
        (this._context = e), (this._def = t), (this._instance = n || null);
    }
    function br() {}
    function Dr(e) {
        var t = e._def,
            n = e._instance;
        return { defs: (((e = {})[t.defId] = t), e), instances: n ? (((e = {})[n.instanceId] = n), e) : {} };
    }
    function Cr(e, t, n) {
        var r,
            o = e.defs,
            i = e.instances,
            a = [],
            s = n ? n.instanceId : "";
        for (r in i) {
            var l = i[r],
                u = o[l.defId];
            l.instanceId !== s && a.push(new Er(t, u, l));
        }
        return a;
    }
    var wr = {},
        Rr =
            ((Tr.prototype.getMarkerYear = function (e) {
                return e.getUTCFullYear();
            }),
            (Tr.prototype.getMarkerMonth = function (e) {
                return e.getUTCMonth();
            }),
            (Tr.prototype.getMarkerDay = function (e) {
                return e.getUTCDate();
            }),
            (Tr.prototype.arrayToMarker = st),
            (Tr.prototype.markerToArray = at),
            Tr);
    function Tr() {}
    wr.gregory = Rr;
    var _r = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
    function kr(e) {
        var t = _r.exec(e);
        if (t) {
            var n = new Date(Date.UTC(Number(t[1]), t[3] ? Number(t[3]) - 1 : 0, Number(t[5] || 1), Number(t[7] || 0), Number(t[8] || 0), Number(t[10] || 0), t[12] ? 1e3 * Number("0." + t[12]) : 0));
            if (lt(n)) {
                e = null;
                return t[13] && (e = ("-" === t[15] ? -1 : 1) * (60 * Number(t[16] || 0) + Number(t[18] || 0))), { marker: n, isTimeUnspecified: !t[6], timeZoneOffset: e };
            }
        }
        return null;
    }
    var xr =
            ((Nr.prototype.createMarker = function (e) {
                e = this.createMarkerMeta(e);
                return null === e ? null : e.marker;
            }),
            (Nr.prototype.createNowMarker = function () {
                return this.canComputeOffset ? this.timestampToMarker(new Date().valueOf()) : st(ot(new Date()));
            }),
            (Nr.prototype.createMarkerMeta = function (e) {
                if ("string" == typeof e) return this.parse(e);
                var t = null;
                return (
                    "number" == typeof e ? (t = this.timestampToMarker(e)) : e instanceof Date ? ((e = e.valueOf()), isNaN(e) || (t = this.timestampToMarker(e))) : Array.isArray(e) && (t = st(e)),
                    null !== t && lt(t) ? { marker: t, isTimeUnspecified: !1, forcedTzo: null } : null
                );
            }),
            (Nr.prototype.parse = function (e) {
                var t = kr(e);
                if (null === t) return null;
                var n = t.marker,
                    e = null;
                return (
                    null !== t.timeZoneOffset && (this.canComputeOffset ? (n = this.timestampToMarker(n.valueOf() - 60 * t.timeZoneOffset * 1e3)) : (e = t.timeZoneOffset)), { marker: n, isTimeUnspecified: t.isTimeUnspecified, forcedTzo: e }
                );
            }),
            (Nr.prototype.getYear = function (e) {
                return this.calendarSystem.getMarkerYear(e);
            }),
            (Nr.prototype.getMonth = function (e) {
                return this.calendarSystem.getMarkerMonth(e);
            }),
            (Nr.prototype.add = function (e, t) {
                e = this.calendarSystem.markerToArray(e);
                return (e[0] += t.years), (e[1] += t.months), (e[2] += t.days), (e[6] += t.milliseconds), this.calendarSystem.arrayToMarker(e);
            }),
            (Nr.prototype.subtract = function (e, t) {
                e = this.calendarSystem.markerToArray(e);
                return (e[0] -= t.years), (e[1] -= t.months), (e[2] -= t.days), (e[6] -= t.milliseconds), this.calendarSystem.arrayToMarker(e);
            }),
            (Nr.prototype.addYears = function (e, t) {
                e = this.calendarSystem.markerToArray(e);
                return (e[0] += t), this.calendarSystem.arrayToMarker(e);
            }),
            (Nr.prototype.addMonths = function (e, t) {
                e = this.calendarSystem.markerToArray(e);
                return (e[1] += t), this.calendarSystem.arrayToMarker(e);
            }),
            (Nr.prototype.diffWholeYears = function (e, t) {
                var n = this.calendarSystem;
                return ut(e) === ut(t) && n.getMarkerDay(e) === n.getMarkerDay(t) && n.getMarkerMonth(e) === n.getMarkerMonth(t) ? n.getMarkerYear(t) - n.getMarkerYear(e) : null;
            }),
            (Nr.prototype.diffWholeMonths = function (e, t) {
                var n = this.calendarSystem;
                return ut(e) === ut(t) && n.getMarkerDay(e) === n.getMarkerDay(t) ? n.getMarkerMonth(t) - n.getMarkerMonth(e) + 12 * (n.getMarkerYear(t) - n.getMarkerYear(e)) : null;
            }),
            (Nr.prototype.greatestWholeUnit = function (e, t) {
                var n,
                    r = this.diffWholeYears(e, t);
                return null !== r
                    ? { unit: "year", value: r }
                    : null !== (r = this.diffWholeMonths(e, t))
                    ? { unit: "month", value: r }
                    : null !== (r = et(e, t))
                    ? { unit: "week", value: r }
                    : null !== (r = tt(e, t))
                    ? { unit: "day", value: r }
                    : Ge(((n = e), (r = (t.valueOf() - n.valueOf()) / 36e5)))
                    ? { unit: "hour", value: r }
                    : Ge(((n = e), (r = (t.valueOf() - n.valueOf()) / 6e4)))
                    ? { unit: "minute", value: r }
                    : Ge(((n = e), (r = (t.valueOf() - n.valueOf()) / 1e3)))
                    ? { unit: "second", value: r }
                    : { unit: "millisecond", value: t.valueOf() - e.valueOf() };
            }),
            (Nr.prototype.countDurationsBetween = function (e, t, n) {
                var r;
                return n.years && null !== (r = this.diffWholeYears(e, t))
                    ? r / (kt(n) / 365)
                    : n.months && null !== (r = this.diffWholeMonths(e, t))
                    ? r / (kt(n) / 30)
                    : n.days && null !== (r = tt(e, t))
                    ? r / kt(n)
                    : (t.valueOf() - e.valueOf()) / xt(n);
            }),
            (Nr.prototype.startOf = function (e, t) {
                return "year" === t
                    ? this.startOfYear(e)
                    : "month" === t
                    ? this.startOfMonth(e)
                    : "week" === t
                    ? this.startOfWeek(e)
                    : "day" === t
                    ? nt(e)
                    : "hour" === t
                    ? st([(n = e).getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours()])
                    : "minute" === t
                    ? st([(n = e).getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes()])
                    : "second" === t
                    ? st([(e = e).getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds()])
                    : null;
                var n;
            }),
            (Nr.prototype.startOfYear = function (e) {
                return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e)]);
            }),
            (Nr.prototype.startOfMonth = function (e) {
                return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e), this.calendarSystem.getMarkerMonth(e)]);
            }),
            (Nr.prototype.startOfWeek = function (e) {
                return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e), this.calendarSystem.getMarkerMonth(e), e.getUTCDate() - ((e.getUTCDay() - this.weekDow + 7) % 7)]);
            }),
            (Nr.prototype.computeWeekNumber = function (e) {
                return this.weekNumberFunc
                    ? this.weekNumberFunc(this.toDate(e))
                    : (function (e, t, n) {
                          var r = e.getUTCFullYear(),
                              o = rt(e, r, t, n);
                          if (o < 1) return rt(e, r - 1, t, n);
                          n = rt(e, r + 1, t, n);
                          return 1 <= n ? Math.min(o, n) : o;
                      })(e, this.weekDow, this.weekDoy);
            }),
            (Nr.prototype.format = function (e, t, n) {
                return t.format({ marker: e, timeZoneOffset: null != (n = void 0 === n ? {} : n).forcedTzo ? n.forcedTzo : this.offsetForMarker(e) }, this);
            }),
            (Nr.prototype.formatRange = function (e, t, n, r) {
                return (
                    (r = void 0 === r ? {} : r).isEndExclusive && (t = Ke(t, -1)),
                    n.formatRange(
                        { marker: e, timeZoneOffset: null != r.forcedStartTzo ? r.forcedStartTzo : this.offsetForMarker(e) },
                        { marker: t, timeZoneOffset: null != r.forcedEndTzo ? r.forcedEndTzo : this.offsetForMarker(t) },
                        this,
                        r.defaultSeparator
                    )
                );
            }),
            (Nr.prototype.formatIso = function (e, t) {
                var n = null;
                return Pt(e, (n = !(t = void 0 === t ? {} : t).omitTimeZoneOffset ? (null != t.forcedTzo ? t.forcedTzo : this.offsetForMarker(e)) : n), t.omitTime);
            }),
            (Nr.prototype.timestampToMarker = function (e) {
                return "local" === this.timeZone ? st(ot(new Date(e))) : "UTC" !== this.timeZone && this.namedTimeZoneImpl ? st(this.namedTimeZoneImpl.timestampToArray(e)) : new Date(e);
            }),
            (Nr.prototype.offsetForMarker = function (e) {
                return "local" === this.timeZone ? -it(at(e)).getTimezoneOffset() : "UTC" === this.timeZone ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(at(e)) : null;
            }),
            (Nr.prototype.toDate = function (e, t) {
                return "local" === this.timeZone
                    ? it(at(e))
                    : "UTC" === this.timeZone
                    ? new Date(e.valueOf())
                    : this.namedTimeZoneImpl
                    ? new Date(e.valueOf() - 1e3 * this.namedTimeZoneImpl.offsetForArray(at(e)) * 60)
                    : new Date(e.valueOf() - (t || 0));
            }),
            Nr),
        Mr = [],
        Ir = {
            code: "en",
            week: { dow: 0, doy: 4 },
            direction: "ltr",
            buttonText: { prev: "prev", next: "next", prevYear: "prev year", nextYear: "next year", year: "year", today: "today", month: "month", week: "week", day: "day", list: "list" },
            weekText: "W",
            weekTextLong: "Week",
            closeHint: "Close",
            timeHint: "Time",
            eventHint: "Event",
            allDayText: "all-day",
            moreLinkText: "more",
            noEventsText: "No events to display",
        },
        Pr = I(I({}, Ir), {
            buttonHints: {
                prev: "Previous $0",
                next: "Next $0",
                today: function (e, t) {
                    return "day" === t ? "Today" : "This " + e;
                },
            },
            viewHint: "$0 view",
            navLinkHint: "Go to $0",
            moreLinkHint: function (e) {
                return "Show " + e + " more event" + (1 === e ? "" : "s");
            },
        });
    function Nr(e) {
        var t = (this.timeZone = e.timeZone),
            n = "local" !== t && "UTC" !== t;
        e.namedTimeZoneImpl && n && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(t)),
            (this.canComputeOffset = Boolean(!n || this.namedTimeZoneImpl)),
            (this.calendarSystem = ((n = e.calendarSystem), new wr[n]())),
            (this.locale = e.locale),
            (this.weekDow = e.locale.week.dow),
            (this.weekDoy = e.locale.week.doy),
            "ISO" === e.weekNumberCalculation && ((this.weekDow = 1), (this.weekDoy = 4)),
            "number" == typeof e.firstDay && (this.weekDow = e.firstDay),
            "function" == typeof e.weekNumberCalculation && (this.weekNumberFunc = e.weekNumberCalculation),
            (this.weekText = (null != e.weekText ? e : e.locale.options).weekText),
            (this.weekTextLong = (null != e.weekTextLong ? e : e.locale.options).weekTextLong || this.weekText),
            (this.cmdFormatter = e.cmdFormatter),
            (this.defaultSeparator = e.defaultSeparator);
    }
    function Hr(e) {
        for (var t = 0 < e.length ? e[0].code : "en", e = Mr.concat(e), n = { en: Pr }, r = 0, o = e; r < o.length; r++) {
            var i = o[r];
            n[i.code] = i;
        }
        return { map: n, defaultCode: t };
    }
    function Or(e, t) {
        return "object" != typeof e || Array.isArray(e)
            ? ((r = t),
              (t = [].concat((n = e) || [])),
              Ar(
                  n,
                  t,
                  (function (e, t) {
                      for (var n = 0; n < e.length; n += 1)
                          for (var r = e[n].toLocaleLowerCase().split("-"), o = r.length; 0 < o; --o) {
                              var i = r.slice(0, o).join("-");
                              if (t[i]) return t[i];
                          }
                      return null;
                  })(t, r) || Pr
              ))
            : Ar(e.code, [e.code], e);
        var n, r;
    }
    function Ar(e, t, n) {
        var r = pt([Ir, n], ["buttonText"]);
        delete r.code;
        n = r.week;
        return delete r.week, { codeArg: e, codes: t, week: n, simpleNumberFormat: new Intl.NumberFormat(e), options: r };
    }
    function Lr(e) {
        var t = Or(e.locale || "en", Hr([]).map);
        return new xr(I(I({ timeZone: rn.timeZone, calendarSystem: "gregory" }, e), { locale: t }));
    }
    var Ur,
        Wr = { startTime: "09:00", endTime: "17:00", daysOfWeek: [1, 2, 3, 4, 5], display: "inverse-background", classNames: "fc-non-business", groupId: "_businessHours" };
    function Vr(e, t) {
        return fn(
            (function (e) {
                e =
                    !0 === e
                        ? [{}]
                        : Array.isArray(e)
                        ? e.filter(function (e) {
                              return e.daysOfWeek;
                          })
                        : "object" == typeof e && e
                        ? [e]
                        : [];
                return e.map(function (e) {
                    return I(I({}, Wr), e);
                });
            })(e),
            null,
            t
        );
    }
    function Fr(e, t) {
        return e.left >= t.left && e.left < t.right && e.top >= t.top && e.top < t.bottom;
    }
    function Br(e, t) {
        t = { left: Math.max(e.left, t.left), right: Math.min(e.right, t.right), top: Math.max(e.top, t.top), bottom: Math.min(e.bottom, t.bottom) };
        return t.left < t.right && t.top < t.bottom && t;
    }
    function zr(e, t) {
        return { left: Math.min(Math.max(e.left, t.left), t.right), top: Math.min(Math.max(e.top, t.top), t.bottom) };
    }
    function jr(e) {
        return { left: (e.left + e.right) / 2, top: (e.top + e.bottom) / 2 };
    }
    function Gr(e, t) {
        return { left: e.left - t.left, top: e.top - t.top };
    }
    function qr() {
        return (Ur =
            null == Ur
                ? (function () {
                      if ("undefined" == typeof document) return !0;
                      var e = document.createElement("div");
                      (e.style.position = "absolute"),
                          (e.style.top = "0px"),
                          (e.style.left = "0px"),
                          (e.innerHTML = "<table><tr><td><div></div></td></tr></table>"),
                          (e.querySelector("table").style.height = "100px"),
                          (e.querySelector("div").style.height = "100%"),
                          document.body.appendChild(e);
                      var t = 0 < e.querySelector("div").offsetHeight;
                      return document.body.removeChild(e), t;
                  })()
                : Ur);
    }
    var Yr = { defs: {}, instances: {} },
        Zr =
            ((Xr.prototype.splitProps = function (e) {
                var t,
                    n = this,
                    r = this.getKeyInfo(e),
                    o = this.getKeysForEventDefs(e.eventStore),
                    i = this.splitDateSelection(e.dateSelection),
                    a = this.splitIndividualUi(e.eventUiBases, o),
                    s = this.splitEventStore(e.eventStore, o),
                    l = this.splitEventDrag(e.eventDrag),
                    u = this.splitEventResize(e.eventResize),
                    c = {};
                for (t in ((this.eventUiBuilders = ht(r, function (e, t) {
                    return n.eventUiBuilders[t] || Lt(Kr);
                })),
                r)) {
                    var d = r[t],
                        p = s[t] || Yr,
                        f = this.eventUiBuilders[t];
                    c[t] = {
                        businessHours: d.businessHours || e.businessHours,
                        dateSelection: i[t] || null,
                        eventStore: p,
                        eventUiBases: f(e.eventUiBases[""], d.ui, a[t]),
                        eventSelection: p.instances[e.eventSelection] ? e.eventSelection : "",
                        eventDrag: l[t] || null,
                        eventResize: u[t] || null,
                    };
                }
                return c;
            }),
            (Xr.prototype._splitDateSpan = function (e) {
                var t = {};
                if (e) for (var n = 0, r = this.getKeysForDateSpan(e); n < r.length; n++) t[r[n]] = e;
                return t;
            }),
            (Xr.prototype._getKeysForEventDefs = function (e) {
                var t = this;
                return ht(e.defs, function (e) {
                    return t.getKeysForEventDef(e);
                });
            }),
            (Xr.prototype._splitEventStore = function (e, t) {
                var n,
                    r,
                    o,
                    i = e.defs,
                    a = e.instances,
                    s = {};
                for (n in i) for (var l = 0, u = t[n]; l < u.length; l++) s[(o = u[l])] || (s[o] = { defs: {}, instances: {} }), (s[o].defs[n] = i[n]);
                for (r in a) for (var c = a[r], d = 0, p = t[c.defId]; d < p.length; d++) s[(o = p[d])] && (s[o].instances[r] = c);
                return s;
            }),
            (Xr.prototype._splitIndividualUi = function (e, t) {
                var n,
                    r = {};
                for (n in e)
                    if (n)
                        for (var o = 0, i = t[n]; o < i.length; o++) {
                            var a = i[o];
                            r[a] || (r[a] = {}), (r[a][n] = e[n]);
                        }
                return r;
            }),
            (Xr.prototype._splitInteraction = function (t) {
                var n = {};
                if (t) {
                    var e,
                        r = this._splitEventStore(t.affectedEvents, this._getKeysForEventDefs(t.affectedEvents)),
                        o = this._getKeysForEventDefs(t.mutatedEvents),
                        i = this._splitEventStore(t.mutatedEvents, o),
                        a = function (e) {
                            n[e] || (n[e] = { affectedEvents: r[e] || Yr, mutatedEvents: i[e] || Yr, isEvent: t.isEvent });
                        };
                    for (e in r) a(e);
                    for (e in i) a(e);
                }
                return n;
            }),
            Xr);
    function Xr() {
        (this.getKeysForEventDefs = Lt(this._getKeysForEventDefs)),
            (this.splitDateSelection = Lt(this._splitDateSpan)),
            (this.splitEventStore = Lt(this._splitEventStore)),
            (this.splitIndividualUi = Lt(this._splitIndividualUi)),
            (this.splitEventDrag = Lt(this._splitInteraction)),
            (this.splitEventResize = Lt(this._splitInteraction)),
            (this.eventUiBuilders = {});
    }
    function Kr(e, t, n) {
        var r = [];
        e && r.push(e), t && r.push(t);
        r = { "": Dn(r) };
        return n && I(r, n), r;
    }
    function $r(e, t, n, r) {
        return {
            dow: e.getUTCDay(),
            isDisabled: Boolean(r && !Fn(r.activeRange, e)),
            isOther: Boolean(r && !Fn(r.currentRange, e)),
            isToday: Boolean(t && Fn(t, e)),
            isPast: Boolean(n ? e < n : !!t && e < t.start),
            isFuture: Boolean(n ? n < e : !!t && e >= t.end),
        };
    }
    function Jr(e, t) {
        var n = ["fc-day", "fc-day-" + Ye[e.dow]];
        return (
            e.isDisabled ? n.push("fc-day-disabled") : (e.isToday && (n.push("fc-day-today"), n.push(t.getClass("today"))), e.isPast && n.push("fc-day-past"), e.isFuture && n.push("fc-day-future"), e.isOther && n.push("fc-day-other")), n
        );
    }
    var Qr = tn({ year: "numeric", month: "long", day: "numeric" }),
        eo = tn({ week: "long" });
    function to(e, n, r, t) {
        void 0 === r && (r = "day"), void 0 === t && (t = !0);
        var o = e.dateEnv,
            i = e.options,
            a = e.calendarApi,
            s = o.format(n, "week" === r ? eo : Qr);
        if (i.navLinks) {
            var l = o.toDate(n),
                e = function (e) {
                    var t = "day" === r ? i.navLinkDayClick : "week" === r ? i.navLinkWeekClick : null;
                    "function" == typeof t ? t.call(a, o.toDate(n), e) : ("string" == typeof t && (r = t), a.zoomTo(n, r));
                };
            return I({ title: ze(i.navLinkHint, [s, l], s), "data-navlink": "" }, t ? ke(e) : { onClick: e });
        }
        return { "aria-label": s };
    }
    var no,
        ro = null;
    function oo() {
        return (ro =
            null === ro
                ? (function () {
                      var e = document.createElement("div");
                      ye(e, { position: "absolute", top: -1e3, left: 0, border: 0, padding: 0, overflow: "scroll", direction: "rtl" }), (e.innerHTML = "<div></div>"), document.body.appendChild(e);
                      var t = e.firstChild.getBoundingClientRect().left > e.getBoundingClientRect().left;
                      return fe(e), t;
                  })()
                : ro);
    }
    function io() {
        return (no =
            no ||
            (function () {
                var e = document.createElement("div");
                (e.style.overflow = "scroll"), (e.style.position = "absolute"), (e.style.top = "-9999px"), (e.style.left = "-9999px"), document.body.appendChild(e);
                var t = ao(e);
                return document.body.removeChild(e), t;
            })());
    }
    function ao(e) {
        return { x: e.offsetHeight - e.clientHeight, y: e.offsetWidth - e.clientWidth };
    }
    function so(e, t) {
        void 0 === t && (t = !1);
        var n = window.getComputedStyle(e),
            r = parseInt(n.borderLeftWidth, 10) || 0,
            o = parseInt(n.borderRightWidth, 10) || 0,
            i = parseInt(n.borderTopWidth, 10) || 0,
            a = parseInt(n.borderBottomWidth, 10) || 0,
            s = ao(e),
            e = s.y - r - o,
            a = { borderLeft: r, borderRight: o, borderTop: i, borderBottom: a, scrollbarBottom: s.x - i - a, scrollbarLeft: 0, scrollbarRight: 0 };
        return (
            oo() && "rtl" === n.direction ? (a.scrollbarLeft = e) : (a.scrollbarRight = e),
            t && ((a.paddingLeft = parseInt(n.paddingLeft, 10) || 0), (a.paddingRight = parseInt(n.paddingRight, 10) || 0), (a.paddingTop = parseInt(n.paddingTop, 10) || 0), (a.paddingBottom = parseInt(n.paddingBottom, 10) || 0)),
            a
        );
    }
    function lo(e, t, n) {
        void 0 === t && (t = !1);
        (n = n ? e.getBoundingClientRect() : uo(e)),
            (e = so(e, t)),
            (n = { left: n.left + e.borderLeft + e.scrollbarLeft, right: n.right - e.borderRight - e.scrollbarRight, top: n.top + e.borderTop, bottom: n.bottom - e.borderBottom - e.scrollbarBottom });
        return t && ((n.left += e.paddingLeft), (n.right -= e.paddingRight), (n.top += e.paddingTop), (n.bottom -= e.paddingBottom)), n;
    }
    function uo(e) {
        e = e.getBoundingClientRect();
        return { left: e.left + window.pageXOffset, top: e.top + window.pageYOffset, right: e.right + window.pageXOffset, bottom: e.bottom + window.pageYOffset };
    }
    function co(e) {
        for (var t = []; e instanceof HTMLElement; ) {
            var n = window.getComputedStyle(e);
            if ("fixed" === n.position) break;
            /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && t.push(e), (e = e.parentNode);
        }
        return t;
    }
    function po(e, t, n) {
        function r() {
            i || ((i = !0), t.apply(this, arguments));
        }
        function o() {
            i || ((i = !0), n && n.apply(this, arguments));
        }
        var i = !1,
            e = e(r, o);
        e && "function" == typeof e.then && e.then(r, o);
    }
    var fo =
        ((ho.prototype.setThisContext = function (e) {
            this.thisContext = e;
        }),
        (ho.prototype.setOptions = function (e) {
            this.options = e;
        }),
        (ho.prototype.on = function (e, t) {
            var n;
            (n = this.handlers), (t = t), (n[e] || (n[e] = [])).push(t);
        }),
        (ho.prototype.off = function (e, t) {
            var n, r;
            (n = this.handlers),
                (e = e),
                (r = t)
                    ? n[e] &&
                      (n[e] = n[e].filter(function (e) {
                          return e !== r;
                      }))
                    : delete n[e];
        }),
        (ho.prototype.trigger = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            for (var r = this.handlers[e] || [], e = this.options && this.options[e], o = 0, i = [].concat(e || [], r); o < i.length; o++) i[o].apply(this.thisContext, t);
        }),
        (ho.prototype.hasHandlers = function (e) {
            return Boolean((this.handlers[e] && this.handlers[e].length) || (this.options && this.options[e]));
        }),
        ho);
    function ho() {
        (this.handlers = {}), (this.thisContext = null);
    }
    var go,
        vo,
        mo =
            ((To.prototype.buildElHorizontals = function (e) {
                for (var t = [], n = [], r = 0, o = this.els; r < o.length; r++) {
                    var i = o[r].getBoundingClientRect();
                    t.push(i.left - e), n.push(i.right - e);
                }
                (this.lefts = t), (this.rights = n);
            }),
            (To.prototype.buildElVerticals = function (e) {
                for (var t = [], n = [], r = 0, o = this.els; r < o.length; r++) {
                    var i = o[r].getBoundingClientRect();
                    t.push(i.top - e), n.push(i.bottom - e);
                }
                (this.tops = t), (this.bottoms = n);
            }),
            (To.prototype.leftToIndex = function (e) {
                for (var t = this.lefts, n = this.rights, r = t.length, o = 0; o < r; o += 1) if (e >= t[o] && e < n[o]) return o;
            }),
            (To.prototype.topToIndex = function (e) {
                for (var t = this.tops, n = this.bottoms, r = t.length, o = 0; o < r; o += 1) if (e >= t[o] && e < n[o]) return o;
            }),
            (To.prototype.getWidth = function (e) {
                return this.rights[e] - this.lefts[e];
            }),
            (To.prototype.getHeight = function (e) {
                return this.bottoms[e] - this.tops[e];
            }),
            To),
        yo =
            ((Ro.prototype.getMaxScrollTop = function () {
                return this.getScrollHeight() - this.getClientHeight();
            }),
            (Ro.prototype.getMaxScrollLeft = function () {
                return this.getScrollWidth() - this.getClientWidth();
            }),
            (Ro.prototype.canScrollVertically = function () {
                return 0 < this.getMaxScrollTop();
            }),
            (Ro.prototype.canScrollHorizontally = function () {
                return 0 < this.getMaxScrollLeft();
            }),
            (Ro.prototype.canScrollUp = function () {
                return 0 < this.getScrollTop();
            }),
            (Ro.prototype.canScrollDown = function () {
                return this.getScrollTop() < this.getMaxScrollTop();
            }),
            (Ro.prototype.canScrollLeft = function () {
                return 0 < this.getScrollLeft();
            }),
            (Ro.prototype.canScrollRight = function () {
                return this.getScrollLeft() < this.getMaxScrollLeft();
            }),
            Ro),
        Eo =
            (t(wo, (vo = yo)),
            (wo.prototype.getScrollTop = function () {
                return this.el.scrollTop;
            }),
            (wo.prototype.getScrollLeft = function () {
                return this.el.scrollLeft;
            }),
            (wo.prototype.setScrollTop = function (e) {
                this.el.scrollTop = e;
            }),
            (wo.prototype.setScrollLeft = function (e) {
                this.el.scrollLeft = e;
            }),
            (wo.prototype.getScrollWidth = function () {
                return this.el.scrollWidth;
            }),
            (wo.prototype.getScrollHeight = function () {
                return this.el.scrollHeight;
            }),
            (wo.prototype.getClientHeight = function () {
                return this.el.clientHeight;
            }),
            (wo.prototype.getClientWidth = function () {
                return this.el.clientWidth;
            }),
            wo),
        So =
            (t(Co, (go = yo)),
            (Co.prototype.getScrollTop = function () {
                return window.pageYOffset;
            }),
            (Co.prototype.getScrollLeft = function () {
                return window.pageXOffset;
            }),
            (Co.prototype.setScrollTop = function (e) {
                window.scroll(window.pageXOffset, e);
            }),
            (Co.prototype.setScrollLeft = function (e) {
                window.scroll(e, window.pageYOffset);
            }),
            (Co.prototype.getScrollWidth = function () {
                return document.documentElement.scrollWidth;
            }),
            (Co.prototype.getScrollHeight = function () {
                return document.documentElement.scrollHeight;
            }),
            (Co.prototype.getClientHeight = function () {
                return document.documentElement.clientHeight;
            }),
            (Co.prototype.getClientWidth = function () {
                return document.documentElement.clientWidth;
            }),
            Co),
        bo =
            ((Do.prototype.setIconOverride = function (e) {
                var t, n;
                if ("object" == typeof e && e) {
                    for (n in ((t = I({}, this.iconClasses)), e)) t[n] = this.applyIconOverridePrefix(e[n]);
                    this.iconClasses = t;
                } else !1 === e && (this.iconClasses = {});
            }),
            (Do.prototype.applyIconOverridePrefix = function (e) {
                var t = this.iconOverridePrefix;
                return (e = t && 0 !== e.indexOf(t) ? t + e : e);
            }),
            (Do.prototype.getClass = function (e) {
                return this.classes[e] || "";
            }),
            (Do.prototype.getIconClass = function (e, t) {
                return (e = (t && this.rtlIconClasses && this.rtlIconClasses[e]) || this.iconClasses[e]) ? this.baseIconClass + " " + e : "";
            }),
            (Do.prototype.getCustomButtonIconClass = function (e) {
                var t;
                return this.iconOverrideCustomButtonOption && (t = e[this.iconOverrideCustomButtonOption]) ? this.baseIconClass + " " + this.applyIconOverridePrefix(t) : "";
            }),
            Do);
    function Do(e) {
        this.iconOverrideOption && this.setIconOverride(e[this.iconOverrideOption]);
    }
    function Co() {
        return (null !== go && go.apply(this, arguments)) || this;
    }
    function wo(e) {
        var t = vo.call(this) || this;
        return (t.el = e), t;
    }
    function Ro() {}
    function To(e, t, n, r) {
        this.els = t;
        e = this.originClientRect = e.getBoundingClientRect();
        n && this.buildElHorizontals(e.left), r && this.buildElVerticals(e.top);
    }
    if (((bo.prototype.classes = {}), (bo.prototype.iconClasses = {}), (bo.prototype.baseIconClass = ""), (bo.prototype.iconOverridePrefix = ""), "undefined" == typeof FullCalendarVDom))
        throw new Error("Please import the top-level fullcalendar lib before attempting to import a plugin.");
    var _o = FullCalendarVDom.Component,
        ko = FullCalendarVDom.createElement,
        xo = FullCalendarVDom.render,
        Mo = FullCalendarVDom.createRef,
        Io = FullCalendarVDom.Fragment,
        Po = FullCalendarVDom.createContext,
        No = FullCalendarVDom.createPortal,
        Ho = FullCalendarVDom.flushToDom,
        Oo = FullCalendarVDom.unmountComponentAtNode,
        Ao =
            ((Uo.prototype.detach = function () {
                this.emitter.off("_scrollRequest", this.handleScrollRequest);
            }),
            (Uo.prototype.update = function (e) {
                e && this.scrollTimeReset ? this.fireInitialScroll() : this.drain();
            }),
            (Uo.prototype.fireInitialScroll = function () {
                this.handleScrollRequest({ time: this.scrollTime });
            }),
            (Uo.prototype.drain = function () {
                this.queuedRequest && this.execFunc(this.queuedRequest) && (this.queuedRequest = null);
            }),
            Uo),
        Lo = Po({});
    function Uo(e, t, n, r) {
        var o = this;
        (this.execFunc = e),
            (this.emitter = t),
            (this.scrollTime = n),
            (this.scrollTimeReset = r),
            (this.handleScrollRequest = function (e) {
                (o.queuedRequest = I({}, o.queuedRequest || {}, e)), o.drain();
            }),
            t.on("_scrollRequest", this.handleScrollRequest),
            this.fireInitialScroll();
    }
    function Wo(e, t, n, r, o, i, a, s, l, u, c, d, p) {
        return {
            dateEnv: o,
            options: n,
            pluginHooks: a,
            emitter: u,
            dispatch: s,
            getCurrentData: l,
            calendarApi: c,
            viewSpec: e,
            viewApi: t,
            dateProfileGenerator: r,
            theme: i,
            isRtl: "rtl" === n.direction,
            addResizeHandler: function (e) {
                u.on("_resize", e);
            },
            removeResizeHandler: function (e) {
                u.off("_resize", e);
            },
            createScrollResponder: function (e) {
                return new Ao(e, u, wt(n.scrollTime), n.scrollTimeReset);
            },
            registerInteractiveComponent: d,
            unregisterInteractiveComponent: p,
        };
    }
    var Vo,
        Fo =
            (t(Bo, (Vo = _o)),
            (Bo.prototype.shouldComponentUpdate = function (e, t) {
                return this.debug && console.log(yt(e, this.props), yt(t, this.state)), !Et(this.props, e, this.propEquality) || !Et(this.state, t, this.stateEquality);
            }),
            (Bo.addPropsEquality = qo),
            (Bo.addStateEquality = Yo),
            (Bo.contextType = Lo),
            Bo);
    function Bo() {
        return (null !== Vo && Vo.apply(this, arguments)) || this;
    }
    (Fo.prototype.propEquality = {}), (Fo.prototype.stateEquality = {});
    var zo,
        jo = (t(Go, (zo = Fo)), (Go.contextType = Lo), Go);
    function Go() {
        return (null !== zo && zo.apply(this, arguments)) || this;
    }
    function qo(e) {
        var t = Object.create(this.prototype.propEquality);
        I(t, e), (this.prototype.propEquality = t);
    }
    function Yo(e) {
        var t = Object.create(this.prototype.stateEquality);
        I(t, e), (this.prototype.stateEquality = t);
    }
    function Zo(e, t) {
        "function" == typeof e ? e(t) : e && (e.current = t);
    }
    var Xo,
        Ko =
            (t($o, (Xo = jo)),
            ($o.prototype.prepareHits = function () {}),
            ($o.prototype.queryHit = function (e, t, n, r) {
                return null;
            }),
            ($o.prototype.isValidSegDownEl = function (e) {
                return !this.props.eventDrag && !this.props.eventResize && !he(e, ".fc-event-mirror");
            }),
            ($o.prototype.isValidDateDownEl = function (e) {
                return !(he(e, ".fc-event:not(.fc-bg-event)") || he(e, ".fc-more-link") || he(e, "a[data-navlink]") || he(e, ".fc-popover"));
            }),
            $o);
    function $o() {
        var e = (null !== Xo && Xo.apply(this, arguments)) || this;
        return (e.uid = Ie()), e;
    }
    function Jo(e) {
        return {
            id: Ie(),
            deps: e.deps || [],
            reducers: e.reducers || [],
            isLoadingFuncs: e.isLoadingFuncs || [],
            contextInit: [].concat(e.contextInit || []),
            eventRefiners: e.eventRefiners || {},
            eventDefMemberAdders: e.eventDefMemberAdders || [],
            eventSourceRefiners: e.eventSourceRefiners || {},
            isDraggableTransformers: e.isDraggableTransformers || [],
            eventDragMutationMassagers: e.eventDragMutationMassagers || [],
            eventDefMutationAppliers: e.eventDefMutationAppliers || [],
            dateSelectionTransformers: e.dateSelectionTransformers || [],
            datePointTransforms: e.datePointTransforms || [],
            dateSpanTransforms: e.dateSpanTransforms || [],
            views: e.views || {},
            viewPropsTransformers: e.viewPropsTransformers || [],
            isPropsValid: e.isPropsValid || null,
            externalDefTransforms: e.externalDefTransforms || [],
            viewContainerAppends: e.viewContainerAppends || [],
            eventDropTransformers: e.eventDropTransformers || [],
            componentInteractions: e.componentInteractions || [],
            calendarInteractions: e.calendarInteractions || [],
            themeClasses: e.themeClasses || {},
            eventSourceDefs: e.eventSourceDefs || [],
            cmdFormatter: e.cmdFormatter,
            recurringTypes: e.recurringTypes || [],
            namedTimeZonedImpl: e.namedTimeZonedImpl,
            initialView: e.initialView || "",
            elementDraggingImpl: e.elementDraggingImpl,
            optionChangeHandlers: e.optionChangeHandlers || {},
            scrollGridImpl: e.scrollGridImpl || null,
            contentTypeHandlers: e.contentTypeHandlers || {},
            listenerRefiners: e.listenerRefiners || {},
            optionRefiners: e.optionRefiners || {},
            propSetHandlers: e.propSetHandlers || {},
        };
    }
    function Qo() {
        var r,
            o = [],
            l = [];
        return function (e, t) {
            return (
                (r && At(e, o) && At(t, l)) ||
                    ((n = t),
                    (a = {}),
                    (s = {
                        reducers: [],
                        isLoadingFuncs: [],
                        contextInit: [],
                        eventRefiners: {},
                        eventDefMemberAdders: [],
                        eventSourceRefiners: {},
                        isDraggableTransformers: [],
                        eventDragMutationMassagers: [],
                        eventDefMutationAppliers: [],
                        dateSelectionTransformers: [],
                        datePointTransforms: [],
                        dateSpanTransforms: [],
                        views: {},
                        viewPropsTransformers: [],
                        isPropsValid: null,
                        externalDefTransforms: [],
                        viewContainerAppends: [],
                        eventDropTransformers: [],
                        componentInteractions: [],
                        calendarInteractions: [],
                        themeClasses: {},
                        eventSourceDefs: [],
                        cmdFormatter: null,
                        recurringTypes: [],
                        namedTimeZonedImpl: null,
                        initialView: "",
                        elementDraggingImpl: null,
                        optionChangeHandlers: {},
                        scrollGridImpl: null,
                        contentTypeHandlers: {},
                        listenerRefiners: {},
                        optionRefiners: {},
                        propSetHandlers: {},
                    }),
                    e && i(e),
                    i(n),
                    (r = s)),
                (o = e),
                (l = t),
                r
            );
            function i(e) {
                for (var t, n = 0, r = e; n < r.length; n++) {
                    var o = r[n];
                    a[o.id] ||
                        ((a[o.id] = !0),
                        i(o.deps),
                        (s = {
                            reducers: (t = s).reducers.concat((o = o).reducers),
                            isLoadingFuncs: t.isLoadingFuncs.concat(o.isLoadingFuncs),
                            contextInit: t.contextInit.concat(o.contextInit),
                            eventRefiners: I(I({}, t.eventRefiners), o.eventRefiners),
                            eventDefMemberAdders: t.eventDefMemberAdders.concat(o.eventDefMemberAdders),
                            eventSourceRefiners: I(I({}, t.eventSourceRefiners), o.eventSourceRefiners),
                            isDraggableTransformers: t.isDraggableTransformers.concat(o.isDraggableTransformers),
                            eventDragMutationMassagers: t.eventDragMutationMassagers.concat(o.eventDragMutationMassagers),
                            eventDefMutationAppliers: t.eventDefMutationAppliers.concat(o.eventDefMutationAppliers),
                            dateSelectionTransformers: t.dateSelectionTransformers.concat(o.dateSelectionTransformers),
                            datePointTransforms: t.datePointTransforms.concat(o.datePointTransforms),
                            dateSpanTransforms: t.dateSpanTransforms.concat(o.dateSpanTransforms),
                            views: I(I({}, t.views), o.views),
                            viewPropsTransformers: t.viewPropsTransformers.concat(o.viewPropsTransformers),
                            isPropsValid: o.isPropsValid || t.isPropsValid,
                            externalDefTransforms: t.externalDefTransforms.concat(o.externalDefTransforms),
                            viewContainerAppends: t.viewContainerAppends.concat(o.viewContainerAppends),
                            eventDropTransformers: t.eventDropTransformers.concat(o.eventDropTransformers),
                            calendarInteractions: t.calendarInteractions.concat(o.calendarInteractions),
                            componentInteractions: t.componentInteractions.concat(o.componentInteractions),
                            themeClasses: I(I({}, t.themeClasses), o.themeClasses),
                            eventSourceDefs: t.eventSourceDefs.concat(o.eventSourceDefs),
                            cmdFormatter: o.cmdFormatter || t.cmdFormatter,
                            recurringTypes: t.recurringTypes.concat(o.recurringTypes),
                            namedTimeZonedImpl: o.namedTimeZonedImpl || t.namedTimeZonedImpl,
                            initialView: t.initialView || o.initialView,
                            elementDraggingImpl: t.elementDraggingImpl || o.elementDraggingImpl,
                            optionChangeHandlers: I(I({}, t.optionChangeHandlers), o.optionChangeHandlers),
                            scrollGridImpl: o.scrollGridImpl || t.scrollGridImpl,
                            contentTypeHandlers: I(I({}, t.contentTypeHandlers), o.contentTypeHandlers),
                            listenerRefiners: I(I({}, t.listenerRefiners), o.listenerRefiners),
                            optionRefiners: I(I({}, t.optionRefiners), o.optionRefiners),
                            propSetHandlers: I(I({}, t.propSetHandlers), o.propSetHandlers),
                        }));
                }
            }
            var n, a, s;
        };
    }
    var ei,
        ti = (t(ni, (ei = bo)), ni);
    function ni() {
        return (null !== ei && ei.apply(this, arguments)) || this;
    }
    function ri(e, t, n, r) {
        if (t[e]) return t[e];
        r = (function (e, t, n, r) {
            function o(e) {
                return i && null !== i[e] ? i[e] : a && null !== a[e] ? a[e] : null;
            }
            var i = n[e],
                a = r[e],
                s = o("component"),
                l = o("superType"),
                u = null;
            if (l) {
                if (l === e) throw new Error("Can't have a custom view type that references itself");
                u = ri(l, t, n, r);
            }
            return (s = !s && u ? u.component : s) ? { type: e, component: s, defaults: I(I({}, u ? u.defaults : {}), i ? i.rawOptions : {}), overrides: I(I({}, u ? u.overrides : {}), a ? a.rawOptions : {}) } : null;
        })(e, t, n, r);
        return r && (t[e] = r), r;
    }
    (ti.prototype.classes = { root: "fc-theme-standard", tableCellShaded: "fc-cell-shaded", buttonGroup: "fc-button-group", button: "fc-button fc-button-primary", buttonActive: "fc-button-active" }),
        (ti.prototype.baseIconClass = "fc-icon"),
        (ti.prototype.iconClasses = { close: "fc-icon-x", prev: "fc-icon-chevron-left", next: "fc-icon-chevron-right", prevYear: "fc-icon-chevrons-left", nextYear: "fc-icon-chevrons-right" }),
        (ti.prototype.rtlIconClasses = { prev: "fc-icon-chevron-right", next: "fc-icon-chevron-left", prevYear: "fc-icon-chevrons-right", nextYear: "fc-icon-chevrons-left" }),
        (ti.prototype.iconOverrideOption = "buttonIcons"),
        (ti.prototype.iconOverrideCustomButtonOption = "icon"),
        (ti.prototype.iconOverridePrefix = "fc-icon-");
    var oi,
        ii =
            (t(si, (oi = jo)),
            (si.prototype.render = function () {
                var e = this,
                    r = this.props,
                    o = r.hookProps;
                return ko(pi, { hookProps: o, didMount: r.didMount, willUnmount: r.willUnmount, elRef: this.handleRootEl }, function (n) {
                    return ko(li, { hookProps: o, content: r.content, defaultContent: r.defaultContent, backupElRef: e.rootElRef }, function (e, t) {
                        return r.children(n, vi(r.classNames, o), e, t);
                    });
                });
            }),
            si),
        ai = Po(0);
    function si() {
        var t = (null !== oi && oi.apply(this, arguments)) || this;
        return (
            (t.rootElRef = Mo()),
            (t.handleRootEl = function (e) {
                Zo(t.rootElRef, e), t.props.elRef && Zo(t.props.elRef, e);
            }),
            t
        );
    }
    function li(t) {
        return ko(ai.Consumer, null, function (e) {
            return ko(di, I({ renderId: e }, t));
        });
    }
    var ui,
        ci,
        di =
            (t(hi, (ci = jo)),
            (hi.prototype.render = function () {
                return this.props.children(this.innerElRef, this.renderInnerContent());
            }),
            (hi.prototype.componentDidMount = function () {
                this.updateCustomContent();
            }),
            (hi.prototype.componentDidUpdate = function () {
                this.updateCustomContent();
            }),
            (hi.prototype.componentWillUnmount = function () {
                this.customContentInfo && this.customContentInfo.destroy && this.customContentInfo.destroy();
            }),
            (hi.prototype.renderInnerContent = function () {
                var e = this.customContentInfo,
                    t = this.getInnerContent(),
                    n = this.getContentMeta(t);
                return (
                    e && e.contentKey === n.contentKey
                        ? e && (e.contentVal = t[n.contentKey])
                        : (e && (e.destroy && e.destroy(), (e = this.customContentInfo = null)), n.contentKey && (e = this.customContentInfo = I({ contentKey: n.contentKey, contentVal: t[n.contentKey] }, n.buildLifecycleFuncs()))),
                    e ? [] : t
                );
            }),
            (hi.prototype.getInnerContent = function () {
                var e = this.props,
                    t = mi(e.content, e.hookProps);
                return null == (t = void 0 === t ? mi(e.defaultContent, e.hookProps) : t) ? null : t;
            }),
            (hi.prototype.getContentMeta = function (e) {
                var t = this.context.pluginHooks.contentTypeHandlers,
                    n = "",
                    r = null;
                if (e)
                    for (var o in t)
                        if (void 0 !== e[o]) {
                            r = t[(n = o)];
                            break;
                        }
                return { contentKey: n, buildLifecycleFuncs: r };
            }),
            (hi.prototype.updateCustomContent = function () {
                this.customContentInfo && this.customContentInfo.render(this.innerElRef.current || this.props.backupElRef.current, this.customContentInfo.contentVal);
            }),
            hi),
        pi =
            (t(fi, (ui = jo)),
            (fi.prototype.render = function () {
                return this.props.children(this.handleRootEl);
            }),
            (fi.prototype.componentDidMount = function () {
                var e = this.props.didMount;
                e && e(I(I({}, this.props.hookProps), { el: this.rootEl }));
            }),
            (fi.prototype.componentWillUnmount = function () {
                var e = this.props.willUnmount;
                e && e(I(I({}, this.props.hookProps), { el: this.rootEl }));
            }),
            fi);
    function fi() {
        var t = (null !== ui && ui.apply(this, arguments)) || this;
        return (
            (t.handleRootEl = function (e) {
                (t.rootEl = e), t.props.elRef && Zo(t.props.elRef, e);
            }),
            t
        );
    }
    function hi() {
        var e = (null !== ci && ci.apply(this, arguments)) || this;
        return (e.innerElRef = Mo()), e;
    }
    function gi() {
        var n,
            r,
            o = [];
        return function (e, t) {
            return (o = !r || !mt(r, t) || e !== n ? vi((n = e), (r = t)) : o);
        };
    }
    function vi(e, t) {
        return yn((e = "function" == typeof e ? e(t) : e));
    }
    function mi(e, t) {
        return "function" == typeof e ? e(t, ko) : e;
    }
    var yi,
        Ei =
            (t(Si, (yi = jo)),
            (Si.prototype.render = function () {
                var t = this.props,
                    e = this.context,
                    n = e.options,
                    e = { view: e.viewApi },
                    r = this.normalizeClassNames(n.viewClassNames, e);
                return ko(pi, { hookProps: e, didMount: n.viewDidMount, willUnmount: n.viewWillUnmount, elRef: t.elRef }, function (e) {
                    return t.children(e, ["fc-" + t.viewSpec.type + "-view", "fc-view"].concat(r));
                });
            }),
            Si);
    function Si() {
        var e = (null !== yi && yi.apply(this, arguments)) || this;
        return (e.normalizeClassNames = gi()), e;
    }
    function bi(e) {
        return ht(e, Di);
    }
    function Di(e) {
        var i,
            t = "function" == typeof e ? { component: e } : e,
            e = t.component;
        return (
            t.content &&
                ((i = t),
                (e = function (r) {
                    return ko(Lo.Consumer, null, function (n) {
                        return ko(Ei, { viewSpec: n.viewSpec }, function (e, o) {
                            var t = I(I({}, r), { nextDayThreshold: n.options.nextDayThreshold });
                            return ko(ii, { hookProps: t, classNames: i.classNames, content: i.content, didMount: i.didMount, willUnmount: i.willUnmount, elRef: e }, function (e, t, n, r) {
                                return ko("div", { className: o.concat(t).join(" "), ref: e }, r);
                            });
                        });
                    });
                })),
            { superType: t.type, component: e, rawOptions: t }
        );
    }
    function Ci(e, t, n, r) {
        var e = bi(e),
            o = bi(t.views);
        return ht(
            (function (e, t) {
                var n,
                    r = {};
                for (n in e) ri(n, r, e, t);
                for (n in t) ri(n, r, e, t);
                return r;
            })(e, o),
            function (e) {
                return (function (n, e, t, r, o) {
                    var i,
                        a,
                        s = n.overrides.duration || n.defaults.duration || r.duration || t.duration,
                        l = null,
                        u = "",
                        c = "",
                        d = {};
                    s && ((i = s), (s = JSON.stringify(i)), void 0 === (a = wi[s]) && ((a = wt(i)), (wi[s] = a)), (l = a)) && ((u = (a = It(l)).unit), 1 === a.value && (d = e[(c = u)] ? e[u].rawOptions : {}));
                    function p(e) {
                        var t = e.buttonText || {};
                        return null != (e = n.defaults.buttonTextKey) && null != t[e] ? t[e] : null != t[n.type] ? t[n.type] : null != t[c] ? t[c] : null;
                    }
                    function f(e) {
                        var t = e.buttonHints || {};
                        return null != (e = n.defaults.buttonTextKey) && null != t[e] ? t[e] : null != t[n.type] ? t[n.type] : null != t[c] ? t[c] : null;
                    }
                    return {
                        type: n.type,
                        component: n.component,
                        duration: l,
                        durationUnit: u,
                        singleUnit: c,
                        optionDefaults: n.defaults,
                        optionOverrides: I(I({}, d), n.overrides),
                        buttonTextOverride: p(r) || p(t) || n.overrides.buttonText,
                        buttonTextDefault: p(o) || n.defaults.buttonText || p(rn) || n.type,
                        buttonTitleOverride: f(r) || f(t) || n.overrides.buttonHint,
                        buttonTitleDefault: f(o) || n.defaults.buttonHint || f(rn),
                    };
                })(e, o, t, n, r);
            }
        );
    }
    var wi = {},
        Ri =
            ((Ti.prototype.buildPrev = function (e, t, n) {
                var r = this.props.dateEnv,
                    e = r.subtract(r.startOf(t, e.currentRangeUnit), e.dateIncrement);
                return this.build(e, -1, n);
            }),
            (Ti.prototype.buildNext = function (e, t, n) {
                var r = this.props.dateEnv,
                    e = r.add(r.startOf(t, e.currentRangeUnit), e.dateIncrement);
                return this.build(e, 1, n);
            }),
            (Ti.prototype.build = function (e, t, n) {
                void 0 === n && (n = !0);
                var r,
                    o,
                    i = this.props,
                    a = this.buildValidRange();
                return (
                    (a = this.trimHiddenDays(a)),
                    n && ((o = e), (e = null != a.start && o < a.start ? a.start : null != a.end && o >= a.end ? new Date(a.end.valueOf() - 1) : o)),
                    (r = this.buildCurrentRangeInfo(e, t)),
                    (n = /^(year|month|week|day)$/.test(r.unit)),
                    (o = this.buildRenderRange(this.trimHiddenDays(r.range), r.unit, n)),
                    (e = o = this.trimHiddenDays(o)),
                    i.showNonCurrentDates || (e = Ln(e, r.range)),
                    (e = Ln((e = this.adjustActiveRange(e)), a)),
                    (t = Wn(r.range, a)),
                    {
                        validRange: a,
                        currentRange: r.range,
                        currentRangeUnit: r.unit,
                        isRangeAllDay: n,
                        activeRange: e,
                        renderRange: o,
                        slotMinTime: i.slotMinTime,
                        slotMaxTime: i.slotMaxTime,
                        isValid: t,
                        dateIncrement: this.buildDateIncrement(r.duration),
                    }
                );
            }),
            (Ti.prototype.buildValidRange = function () {
                var e = this.props.validRangeInput,
                    e = "function" == typeof e ? e.call(this.props.calendarApi, this.nowDate) : e;
                return this.refineRange(e) || { start: null, end: null };
            }),
            (Ti.prototype.buildCurrentRangeInfo = function (e, t) {
                var n,
                    r = this.props,
                    o = null,
                    i = null,
                    a = null;
                return (
                    r.duration
                        ? ((o = r.duration), (i = r.durationUnit), (a = this.buildRangeFromDuration(e, t, o, i)))
                        : (n = this.props.dayCount)
                        ? ((i = "day"), (a = this.buildRangeFromDayCount(e, t, n)))
                        : (a = this.buildCustomVisibleRange(e))
                        ? (i = r.dateEnv.greatestWholeUnit(a.start, a.end).unit)
                        : ((i = It((o = this.getFallbackDuration())).unit), (a = this.buildRangeFromDuration(e, t, o, i))),
                    { duration: o, unit: i, range: a }
                );
            }),
            (Ti.prototype.getFallbackDuration = function () {
                return wt({ day: 1 });
            }),
            (Ti.prototype.adjustActiveRange = function (e) {
                var t = this.props,
                    n = t.dateEnv,
                    r = t.usesMinMaxTime,
                    o = t.slotMinTime,
                    i = t.slotMaxTime,
                    t = e.start,
                    e = e.end;
                return r && (kt(o) < 0 && ((t = nt(t)), (t = n.add(t, o))), 1 < kt(i) && ((e = Xe((e = nt(e)), -1)), (e = n.add(e, i)))), { start: t, end: e };
            }),
            (Ti.prototype.buildRangeFromDuration = function (e, t, n, r) {
                var o,
                    i,
                    a,
                    s = this.props,
                    l = s.dateEnv,
                    u = s.dateAlignment;
                function c() {
                    (o = l.startOf(e, u)), (i = l.add(o, n)), (a = { start: o, end: i });
                }
                return (
                    u || ((s = this.props.dateIncrement), (u = s && xt(s) < xt(n) ? It(s).unit : r)),
                    kt(n) <= 1 && this.isHiddenDay(o) && (o = nt((o = this.skipHiddenDays(o, t)))),
                    c(),
                    this.trimHiddenDays(a) || ((e = this.skipHiddenDays(e, t)), c()),
                    a
                );
            }),
            (Ti.prototype.buildRangeFromDayCount = function (e, t, n) {
                for (var r = this.props, o = r.dateEnv, r = r.dateAlignment, i = 0, e = e, e = nt((e = r ? o.startOf(e, r) : e)), a = (e = this.skipHiddenDays(e, t)); (a = Xe(a, 1)), this.isHiddenDay(a) || (i += 1), i < n; );
                return { start: e, end: a };
            }),
            (Ti.prototype.buildCustomVisibleRange = function (e) {
                var t = this.props,
                    n = t.visibleRangeInput,
                    n = "function" == typeof n ? n.call(t.calendarApi, t.dateEnv.toDate(e)) : n,
                    n = this.refineRange(n);
                return !n || (null != n.start && null != n.end) ? n : null;
            }),
            (Ti.prototype.buildRenderRange = function (e, t, n) {
                return e;
            }),
            (Ti.prototype.buildDateIncrement = function (e) {
                var t;
                return this.props.dateIncrement || ((t = this.props.dateAlignment) ? wt(1, t) : e || wt({ days: 1 }));
            }),
            (Ti.prototype.refineRange = function (e) {
                if (e) {
                    var t = ((n = this.props.dateEnv), (t = r = null), (e = e).start && (r = n.createMarker(e.start)), e.end && (t = n.createMarker(e.end)), (!r && !t) || (r && t && t < r) ? null : { start: r, end: t });
                    return (t = t && Pn(t));
                }
                var n, r;
                return null;
            }),
            (Ti.prototype.initHiddenDays = function () {
                var e,
                    t = this.props.hiddenDays || [],
                    n = [],
                    r = 0;
                for (!1 === this.props.weekends && t.push(0, 6), e = 0; e < 7; e += 1) (n[e] = -1 !== t.indexOf(e)) || (r += 1);
                if (!r) throw new Error("invalid hiddenDays");
                this.isHiddenDayHash = n;
            }),
            (Ti.prototype.trimHiddenDays = function (e) {
                var t = e.start,
                    e = e.end,
                    t = t && this.skipHiddenDays(t),
                    e = e && this.skipHiddenDays(e, -1, !0);
                return null == t || null == e || t < e ? { start: t, end: e } : null;
            }),
            (Ti.prototype.isHiddenDay = function (e) {
                return e instanceof Date && (e = e.getUTCDay()), this.isHiddenDayHash[e];
            }),
            (Ti.prototype.skipHiddenDays = function (e, t, n) {
                for (void 0 === t && (t = 1), void 0 === n && (n = !1); this.isHiddenDayHash[(e.getUTCDay() + (n ? t : 0) + 7) % 7]; ) e = Xe(e, t);
                return e;
            }),
            Ti);
    function Ti(e) {
        (this.props = e), (this.nowDate = mr(e.nowInput, e.dateEnv)), this.initHiddenDays();
    }
    function _i(e) {
        for (var t in e) if (e[t].isFetching) return !0;
        return !1;
    }
    function ki(e, t, n, r) {
        for (var o = {}, i = 0, a = t; i < a.length; i++) {
            var s = a[i];
            o[s.sourceId] = s;
        }
        return n && (o = xi(o, n, r)), I(I({}, e), o);
    }
    function xi(e, t, n) {
        return Mi(
            e,
            ft(e, function (e) {
                return Pi(e, n) ? !n.options.lazyFetching || !e.fetchRange || e.isFetching || t.start < e.fetchRange.start || t.end > e.fetchRange.end : !e.latestFetchId;
            }),
            t,
            !1,
            n
        );
    }
    function Mi(e, t, n, r, o) {
        var i,
            a = {};
        for (i in e) {
            var s = e[i];
            t[i]
                ? (a[i] = (function (n, r, e, o) {
                      var i = o.options,
                          a = o.calendarApi,
                          t = o.pluginHooks.eventSourceDefs[n.sourceDefId],
                          s = Ie();
                      return (
                          t.fetch(
                              { eventSource: n, range: r, isRefetch: e, context: o },
                              function (e) {
                                  var t = e.rawEvents;
                                  i.eventSourceSuccess && (t = i.eventSourceSuccess.call(a, t, e.xhr) || t),
                                      n.success && (t = n.success.call(a, t, e.xhr) || t),
                                      o.dispatch({ type: "RECEIVE_EVENTS", sourceId: n.sourceId, fetchId: s, fetchRange: r, rawEvents: t });
                              },
                              function (e) {
                                  console.warn(e.message, e),
                                      i.eventSourceFailure && i.eventSourceFailure.call(a, e),
                                      n.failure && n.failure(e),
                                      o.dispatch({ type: "RECEIVE_EVENT_ERROR", sourceId: n.sourceId, fetchId: s, fetchRange: r, error: e });
                              }
                          ),
                          I(I({}, n), { isFetching: !0, latestFetchId: s })
                      );
                  })(s, n, r, o))
                : (a[i] = s);
        }
        return a;
    }
    function Ii(e, t) {
        return ft(e, function (e) {
            return Pi(e, t);
        });
    }
    function Pi(e, t) {
        return !t.pluginHooks.eventSourceDefs[e.sourceDefId].ignoreRange;
    }
    function Ni(s, e, t, n, r) {
        switch (e.type) {
            case "RECEIVE_EVENTS":
                return (function (e, t, n, r, o, i) {
                    if (t && n === t.latestFetchId) {
                        a = fn(((a = o), (n = i.options.eventDataTransform), (o = t ? t.eventDataTransform : null) && (a = Hi(a, o)), (a = n ? Hi(a, n) : a)), t, i);
                        return r && (a = bt(a, r, i)), vn(Oi(e, t.sourceId), a);
                    }
                    var a;
                    return e;
                })(s, t[e.sourceId], e.fetchId, e.fetchRange, e.rawEvents, r);
            case "ADD_EVENTS":
                return (o = e.eventStore), (i = n ? n.activeRange : null), vn(s, (o = i ? bt(o, i, r) : o));
            case "RESET_EVENTS":
                return e.eventStore;
            case "MERGE_EVENTS":
                return vn(s, e.eventStore);
            case "PREV":
            case "NEXT":
            case "CHANGE_DATE":
            case "CHANGE_VIEW_TYPE":
                return n ? bt(s, n.activeRange, r) : s;
            case "REMOVE_EVENTS":
                return (function (e) {
                    var t,
                        n,
                        r = s.defs,
                        o = s.instances,
                        i = {},
                        a = {};
                    for (t in r) e.defs[t] || (i[t] = r[t]);
                    for (n in o) !e.instances[n] && i[o[n].defId] && (a[n] = o[n]);
                    return { defs: i, instances: a };
                })(e.eventStore);
            case "REMOVE_EVENT_SOURCE":
                return Oi(s, e.sourceId);
            case "REMOVE_ALL_EVENT_SOURCES":
                return mn(s, function (e) {
                    return !e.sourceId;
                });
            case "REMOVE_ALL_EVENTS":
                return { defs: {}, instances: {} };
            default:
                return s;
        }
        var o, i;
    }
    function Hi(e, t) {
        if (t)
            for (var n = [], r = 0, o = e; r < o.length; r++) {
                var i = o[r],
                    a = t(i);
                a ? n.push(a) : null == a && n.push(i);
            }
        else n = e;
        return n;
    }
    function Oi(e, t) {
        return mn(e, function (e) {
            return e.sourceId !== t;
        });
    }
    function Ai(e, t, n, r, o) {
        return { header: e.headerToolbar ? Li(e.headerToolbar, e, t, n, r, o) : null, footer: e.footerToolbar ? Li(e.footerToolbar, e, t, n, r, o) : null };
    }
    function Li(e, t, n, r, o, i) {
        var a,
            s = {},
            l = [],
            u = !1;
        for (a in e) {
            var c = (function (e, l, t, u, c, d) {
                var p = "rtl" === l.direction,
                    f = l.customButtons || {},
                    h = t.buttonText || {},
                    g = l.buttonText || {},
                    v = t.buttonHints || {},
                    m = l.buttonHints || {},
                    e = e ? e.split(" ") : [],
                    y = [],
                    E = !1;
                return {
                    widgets: e.map(function (e) {
                        return e.split(",").map(function (t) {
                            return "title" === t
                                ? ((E = !0), { buttonName: t })
                                : ((n = f[t])
                                      ? ((r = function (e) {
                                            n.click && n.click.call(e.target, e, e.target);
                                        }),
                                        (o = u.getCustomButtonIconClass(n)) || (o = u.getIconClass(t, p)) || (i = n.text),
                                        (a = n.hint || n.text))
                                      : (e = c[t])
                                      ? (y.push(t),
                                        (r = function () {
                                            d.changeView(t);
                                        }),
                                        (i = e.buttonTextOverride) || (o = u.getIconClass(t, p)) || (i = e.buttonTextDefault),
                                        (s = e.buttonTextOverride || e.buttonTextDefault),
                                        (a = ze(e.buttonTitleOverride || e.buttonTitleDefault || l.viewHint, [s, t], s)))
                                      : d[t] &&
                                        ((r = function () {
                                            d[t]();
                                        }),
                                        (i = h[t]) || (o = u.getIconClass(t, p)) || (i = g[t]),
                                        (a =
                                            "prevYear" === t || "nextYear" === t
                                                ? ze(v[(s = "prevYear" === t ? "prev" : "next")] || m[s], [g.year || "year", "year"], g[t])
                                                : function (e) {
                                                      return ze(v[t] || m[t], [g[e] || e, e], g[t]);
                                                  })),
                                  { buttonName: t, buttonClick: r, buttonIcon: o, buttonText: i, buttonHint: a });
                            var n, e, r, o, i, a, s;
                        });
                    }),
                    viewsWithButtons: y,
                    hasTitle: E,
                };
            })(e[a], t, n, r, o, i);
            (s[a] = c.widgets), l.push.apply(l, c.viewsWithButtons), (u = u || c.hasTitle);
        }
        return { sectionWidgets: s, viewsWithButtons: l, hasTitle: u };
    }
    function Ui(e, t, n, r, o) {
        var i,
            a = null;
        "GET" === (e = e.toUpperCase()) ? ((i = n), (t = t + (-1 === t.indexOf("?") ? "?" : "&") + Wi(i))) : (a = Wi(n));
        var s = new XMLHttpRequest();
        s.open(e, t, !0),
            "GET" !== e && s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            (s.onload = function () {
                if (200 <= s.status && s.status < 400) {
                    var e = !1,
                        t = void 0;
                    try {
                        (t = JSON.parse(s.responseText)), (e = !0);
                    } catch (e) {}
                    e ? r(t, s) : o("Failure parsing JSON", s);
                } else o("Request failed", s);
            }),
            (s.onerror = function () {
                o("Request failed", s);
            }),
            s.send(a);
    }
    function Wi(e) {
        var t,
            n = [];
        for (t in e) n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
        return n.join("&");
    }
    function Vi(e, t) {
        for (var n = vt(t.getCurrentData().eventSources), r = [], o = 0, i = e; o < i.length; o++) {
            for (var a = i[o], s = !1, l = 0; l < n.length; l += 1)
                if (n[l]._raw === a) {
                    n.splice(l, 1), (s = !0);
                    break;
                }
            s || r.push(a);
        }
        for (var u = 0, c = n; u < c.length; u++) {
            var d = c[u];
            t.dispatch({ type: "REMOVE_EVENT_SOURCE", sourceId: d.sourceId });
        }
        for (var p = 0, f = r; p < f.length; p++) {
            var h = f[p];
            t.calendarApi.addEventSource(h);
        }
    }
    var Fi = [
            Jo({
                eventSourceDefs: [
                    {
                        ignoreRange: !0,
                        parseMeta: function (e) {
                            return Array.isArray(e.events) ? e.events : null;
                        },
                        fetch: function (e, t) {
                            t({ rawEvents: e.eventSource.meta });
                        },
                    },
                ],
            }),
            Jo({
                eventSourceDefs: [
                    {
                        parseMeta: function (e) {
                            return "function" == typeof e.events ? e.events : null;
                        },
                        fetch: function (e, t, n) {
                            var r = e.context.dateEnv;
                            po(
                                e.eventSource.meta.bind(null, ar(e.range, r)),
                                function (e) {
                                    t({ rawEvents: e });
                                },
                                n
                            );
                        },
                    },
                ],
            }),
            Jo({
                eventSourceRefiners: { method: String, extraParams: pn, startParam: String, endParam: String, timeZoneParam: String },
                eventSourceDefs: [
                    {
                        parseMeta: function (e) {
                            return !e.url || ("json" !== e.format && e.format)
                                ? null
                                : { url: e.url, format: "json", method: (e.method || "GET").toUpperCase(), extraParams: e.extraParams, startParam: e.startParam, endParam: e.endParam, timeZoneParam: e.timeZoneParam };
                        },
                        fetch: function (e, n, r) {
                            var t,
                                o,
                                i,
                                a,
                                s,
                                l,
                                u = e.eventSource.meta,
                                c =
                                    ((t = u),
                                    (o = e.range),
                                    (i = e.context),
                                    (s = i.dateEnv),
                                    (l = i.options),
                                    (c = {}),
                                    null == (a = t.startParam) && (a = l.startParam),
                                    null == (e = t.endParam) && (e = l.endParam),
                                    null == (i = t.timeZoneParam) && (i = l.timeZoneParam),
                                    (t = "function" == typeof t.extraParams ? t.extraParams() : t.extraParams || {}),
                                    I(c, t),
                                    (c[a] = s.formatIso(o.start)),
                                    (c[e] = s.formatIso(o.end)),
                                    "local" !== s.timeZone && (c[i] = s.timeZone),
                                    c);
                            Ui(
                                u.method,
                                u.url,
                                c,
                                function (e, t) {
                                    n({ rawEvents: e, xhr: t });
                                },
                                function (e, t) {
                                    r({ message: e, xhr: t });
                                }
                            );
                        },
                    },
                ],
            }),
            Jo({
                recurringTypes: [
                    {
                        parse: function (e, t) {
                            if (e.daysOfWeek || e.startTime || e.endTime || e.startRecur || e.endRecur) {
                                var n = {
                                        daysOfWeek: e.daysOfWeek || null,
                                        startTime: e.startTime || null,
                                        endTime: e.endTime || null,
                                        startRecur: e.startRecur ? t.createMarker(e.startRecur) : null,
                                        endRecur: e.endRecur ? t.createMarker(e.endRecur) : null,
                                    },
                                    r = void 0;
                                return (
                                    !(r = e.duration ? e.duration : r) &&
                                        e.startTime &&
                                        e.endTime &&
                                        ((o = e.endTime), (t = e.startTime), (r = { years: o.years - t.years, months: o.months - t.months, days: o.days - t.days, milliseconds: o.milliseconds - t.milliseconds })),
                                    { allDayGuess: Boolean(!e.startTime && !e.endTime), duration: r, typeData: n }
                                );
                            }
                            var o;
                            return null;
                        },
                        expand: function (e, t, n) {
                            t = Ln(t, { start: e.startRecur, end: e.endRecur });
                            return t
                                ? (function (e, t, n, r) {
                                      for (var o = e ? gt(e) : null, i = nt(n.start), a = n.end, s = []; i < a; ) {
                                          var l;
                                          (o && !o[i.getUTCDay()]) || ((l = t ? r.add(i, t) : i), s.push(l)), (i = Xe(i, 1));
                                      }
                                      return s;
                                  })(e.daysOfWeek, e.startTime, t, n)
                                : [];
                        },
                    },
                ],
                eventRefiners: { daysOfWeek: pn, startTime: wt, endTime: wt, duration: wt, startRecur: pn, endRecur: pn },
            }),
            Jo({
                optionChangeHandlers: {
                    events: function (e, t) {
                        Vi([e], t);
                    },
                    eventSources: Vi,
                },
            }),
            Jo({
                isLoadingFuncs: [
                    function (e) {
                        return _i(e.eventSources);
                    },
                ],
                contentTypeHandlers: {
                    html: function () {
                        var n = null,
                            r = "";
                        return {
                            render: function (e, t) {
                                (e === n && t === r) || (e.innerHTML = t), (n = e), (r = t);
                            },
                            destroy: function () {
                                (n.innerHTML = ""), (n = null), (r = "");
                            },
                        };
                    },
                    domNodes: function () {
                        var i = null,
                            a = [];
                        function s() {
                            a.forEach(fe), (a = []), (i = null);
                        }
                        return {
                            render: function (e, t) {
                                t = Array.prototype.slice.call(t);
                                if (e !== i || !At(a, t)) {
                                    for (var n = 0, r = t; n < r.length; n++) {
                                        var o = r[n];
                                        e.appendChild(o);
                                    }
                                    s();
                                }
                                (i = e), (a = t);
                            },
                            destroy: s,
                        };
                    },
                },
                propSetHandlers: {
                    dateProfile: function (e, t) {
                        t.emitter.trigger("datesSet", I(I({}, ar(e.activeRange, t.dateEnv)), { view: t.viewApi }));
                    },
                    eventStore: function (e, t) {
                        var n = t.emitter;
                        n.hasHandlers("eventsSet") && n.trigger("eventsSet", Cr(e, t));
                    },
                },
            }),
        ],
        Bi =
            ((Gi.prototype.request = function (e) {
                (this.isDirty = !0), this.isPaused() || (this.clearTimeout(), null == e ? this.tryDrain() : (this.timeoutId = setTimeout(this.tryDrain.bind(this), e)));
            }),
            (Gi.prototype.pause = function (e) {
                var t = this.pauseDepths;
                (t[(e = void 0 === e ? "" : e)] = (t[e] || 0) + 1), this.clearTimeout();
            }),
            (Gi.prototype.resume = function (e, t) {
                var n = this.pauseDepths;
                (e = void 0 === e ? "" : e) in n && (t ? delete n[e] : (--n[e], n[e] <= 0 && delete n[e]), this.tryDrain());
            }),
            (Gi.prototype.isPaused = function () {
                return Object.keys(this.pauseDepths).length;
            }),
            (Gi.prototype.tryDrain = function () {
                if (!this.isRunning && !this.isPaused()) {
                    for (this.isRunning = !0; this.isDirty; ) (this.isDirty = !1), this.drained();
                    this.isRunning = !1;
                }
            }),
            (Gi.prototype.clear = function () {
                this.clearTimeout(), (this.isDirty = !1), (this.pauseDepths = {});
            }),
            (Gi.prototype.clearTimeout = function () {
                this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = 0));
            }),
            (Gi.prototype.drained = function () {
                this.drainedOption && this.drainedOption();
            }),
            Gi),
        zi =
            ((ji.prototype.request = function (e, t) {
                this.queue.push(e), this.delayedRunner.request(t);
            }),
            (ji.prototype.pause = function (e) {
                this.delayedRunner.pause(e);
            }),
            (ji.prototype.resume = function (e, t) {
                this.delayedRunner.resume(e, t);
            }),
            (ji.prototype.drain = function () {
                for (var e = this.queue; e.length; ) {
                    for (var t, n = []; (t = e.shift()); ) this.runTask(t), n.push(t);
                    this.drained(n);
                }
            }),
            (ji.prototype.runTask = function (e) {
                this.runTaskOption && this.runTaskOption(e);
            }),
            (ji.prototype.drained = function (e) {
                this.drainedOption && this.drainedOption(e);
            }),
            ji);
    function ji(e, t) {
        (this.runTaskOption = e), (this.drainedOption = t), (this.queue = []), (this.delayedRunner = new Bi(this.drain.bind(this)));
    }
    function Gi(e) {
        (this.drainedOption = e), (this.isRunning = !1), (this.isDirty = !1), (this.pauseDepths = {}), (this.timeoutId = 0);
    }
    function qi(t, e, n) {
        var r = /^(year|month)$/.test(t.currentRangeUnit) ? t.currentRange : t.activeRange;
        return n.formatRange(
            r.start,
            r.end,
            tn(
                e.titleFormat ||
                    (function () {
                        var e = t.currentRangeUnit;
                        if ("year" === e) return { year: "numeric" };
                        if ("month" === e) return { year: "numeric", month: "long" };
                        e = tt(t.currentRange.start, t.currentRange.end);
                        return null !== e && 1 < e ? { year: "numeric", month: "short", day: "numeric" } : { year: "numeric", month: "long", day: "numeric" };
                    })()
            ),
            { isEndExclusive: t.isRangeAllDay, defaultSeparator: e.titleRangeSeparator }
        );
    }
    var Yi =
        ((Zi.prototype.resetOptions = function (e, t) {
            var n = this.props;
            (n.optionOverrides = t ? I(I({}, n.optionOverrides), e) : e), this.actionRunner.request({ type: "NOTHING" });
        }),
        (Zi.prototype._handleAction = function (e) {
            var t = this.props,
                n = this.state,
                r = this.emitter,
                o = ((f = n.dynamicOptionOverrides), "SET_OPTION" !== (p = e).type ? f : I(I({}, f), (((f = {})[p.optionName] = p.rawOptionValue), f))),
                i = this.computeOptionsData(t.optionOverrides, o, t.calendarApi),
                a = ((h = n.currentViewType), (h = "CHANGE_VIEW_TYPE" === e.type ? e.viewType : h)),
                s = this.computeCurrentViewData(a, i, t.optionOverrides, o);
            (t.calendarApi.currentDataManager = this), r.setThisContext(t.calendarApi), r.setOptions(s.options);
            var l = { dateEnv: i.dateEnv, options: i.calendarOptions, pluginHooks: i.pluginHooks, calendarApi: t.calendarApi, dispatch: this.dispatch, emitter: r, getCurrentData: this.getCurrentData },
                u = n.currentDate,
                c = n.dateProfile,
                c = (function (e, t, n, r) {
                    var o;
                    switch (t.type) {
                        case "CHANGE_VIEW_TYPE":
                            return r.build(t.dateMarker || n);
                        case "CHANGE_DATE":
                            return r.build(t.dateMarker);
                        case "PREV":
                            if ((o = r.buildPrev(e, n)).isValid) return o;
                            break;
                        case "NEXT":
                            if ((o = r.buildNext(e, n)).isValid) return o;
                    }
                    return e;
                })((c = this.data && this.data.dateProfileGenerator !== s.dateProfileGenerator ? s.dateProfileGenerator.build(u) : c), e, ((g = u), (u = "CHANGE_DATE" !== e.type ? g : e.dateMarker)), s.dateProfileGenerator);
            ("PREV" !== e.type && "NEXT" !== e.type && Fn(c.currentRange, u)) || (u = c.currentRange.start);
            for (
                var d = (function (e, t, n, r) {
                        var o,
                            i,
                            a,
                            s,
                            l,
                            u,
                            c = n ? n.activeRange : null;
                        switch (t.type) {
                            case "ADD_EVENT_SOURCES":
                                return ki(e, t.sources, c, r);
                            case "REMOVE_EVENT_SOURCE":
                                return (
                                    (o = t.sourceId),
                                    ft(e, function (e) {
                                        return e.sourceId !== o;
                                    })
                                );
                            case "PREV":
                            case "NEXT":
                            case "CHANGE_DATE":
                            case "CHANGE_VIEW_TYPE":
                                return n ? xi(e, c, r) : e;
                            case "FETCH_EVENT_SOURCES":
                                return Mi(e, t.sourceIds ? gt(t.sourceIds) : Ii(e, r), c, t.isRefetch || !1, r);
                            case "RECEIVE_EVENTS":
                            case "RECEIVE_EVENT_ERROR":
                                return (i = e), (a = t.sourceId), (s = t.fetchId), (l = t.fetchRange), (u = i[a]) && s === u.latestFetchId ? I(I({}, i), (((s = {})[a] = I(I({}, u), { isFetching: !1, fetchRange: l })), s)) : i;
                            case "REMOVE_ALL_EVENT_SOURCES":
                                return {};
                            default:
                                return e;
                        }
                    })(n.eventSources, e, c, l),
                    p = Ni(n.eventStore, e, d, c, l),
                    f = (_i(d) && !s.options.progressiveEventRendering && n.renderableEventStore) || p,
                    h = this.buildViewUiProps(l),
                    g = h.eventUiSingleBase,
                    s = h.selectionConfig,
                    h = this.buildEventUiBySource(d),
                    v = {
                        dynamicOptionOverrides: o,
                        currentViewType: a,
                        currentDate: u,
                        dateProfile: c,
                        eventSources: d,
                        eventStore: p,
                        renderableEventStore: f,
                        selectionConfig: s,
                        eventUiBases: this.buildEventUiBases(f.defs, g, h),
                        businessHours: this.parseContextBusinessHours(l),
                        dateSelection: (function (e, t) {
                            switch (t.type) {
                                case "UNSELECT_DATES":
                                    return null;
                                case "SELECT_DATES":
                                    return t.selection;
                                default:
                                    return e;
                            }
                        })(n.dateSelection, e),
                        eventSelection: (function (e, t) {
                            switch (t.type) {
                                case "UNSELECT_EVENT":
                                    return "";
                                case "SELECT_EVENT":
                                    return t.eventInstanceId;
                                default:
                                    return e;
                            }
                        })(n.eventSelection, e),
                        eventDrag: (function (e, t) {
                            var n;
                            switch (t.type) {
                                case "UNSET_EVENT_DRAG":
                                    return null;
                                case "SET_EVENT_DRAG":
                                    return { affectedEvents: (n = t.state).affectedEvents, mutatedEvents: n.mutatedEvents, isEvent: n.isEvent };
                                default:
                                    return e;
                            }
                        })(n.eventDrag, e),
                        eventResize: (function (e, t) {
                            var n;
                            switch (t.type) {
                                case "UNSET_EVENT_RESIZE":
                                    return null;
                                case "SET_EVENT_RESIZE":
                                    return { affectedEvents: (n = t.state).affectedEvents, mutatedEvents: n.mutatedEvents, isEvent: n.isEvent };
                                default:
                                    return e;
                            }
                        })(n.eventResize, e),
                    },
                    m = I(I({}, l), v),
                    y = 0,
                    E = i.pluginHooks.reducers;
                y < E.length;
                y++
            ) {
                var S = E[y];
                I(v, S(n, e, m));
            }
            (i = na(n, l)), (l = na(v, l));
            !i && l ? r.trigger("loading", !0) : i && !l && r.trigger("loading", !1), (this.state = v), t.onAction && t.onAction(e);
        }),
        (Zi.prototype.updateData = function () {
            var n,
                r,
                o,
                e = this.props,
                t = this.state,
                i = this.data,
                a = this.computeOptionsData(e.optionOverrides, t.dynamicOptionOverrides, e.calendarApi),
                s = this.computeCurrentViewData(t.currentViewType, a, e.optionOverrides, t.dynamicOptionOverrides),
                l = (this.data = I(I(I({ viewTitle: this.buildTitle(t.dateProfile, s.options, a.dateEnv), calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData }, a), s), t)),
                u = a.pluginHooks.optionChangeHandlers,
                c = i && i.calendarOptions,
                d = a.calendarOptions;
            if (c && c !== d)
                for (var p in (c.timeZone !== d.timeZone &&
                    ((t.eventSources = l.eventSources = ((s = l.eventSources), (a = (a = t.dateProfile) ? a.activeRange : null), Mi(s, Ii(s, (s = l)), a, !0, s))),
                    (t.eventStore = l.eventStore =
                        ((t = l.eventStore),
                        (n = i.dateEnv),
                        (r = l.dateEnv),
                        (o = t.defs),
                        (t = ht(t.instances, function (e) {
                            var t = o[e.defId];
                            return t.allDay || t.recurringDef
                                ? e
                                : I(I({}, e), {
                                      range: { start: r.createMarker(n.toDate(e.range.start, e.forcedStartTzo)), end: r.createMarker(n.toDate(e.range.end, e.forcedEndTzo)) },
                                      forcedStartTzo: r.canComputeOffset ? null : e.forcedStartTzo,
                                      forcedEndTzo: r.canComputeOffset ? null : e.forcedEndTzo,
                                  });
                        })),
                        { defs: o, instances: t }))),
                u))
                    c[p] !== d[p] && u[p](d[p], l);
            e.onData && e.onData(l);
        }),
        (Zi.prototype._computeOptionsData = function (e, t, n) {
            var r = this.processRawCalendarOptions(e, t),
                o = r.refinedOptions,
                i = r.pluginHooks,
                a = r.localeDefaults,
                s = r.availableLocaleData;
            oa(r.extra);
            var l = this.buildDateEnv(o.timeZone, o.locale, o.weekNumberCalculation, o.firstDay, o.weekText, i, s, o.defaultRangeSeparator),
                r = this.buildViewSpecs(i.views, e, t, a),
                t = this.buildTheme(o, i);
            return { calendarOptions: o, pluginHooks: i, dateEnv: l, viewSpecs: r, theme: t, toolbarConfig: this.parseToolbars(o, e, t, r, n), localeDefaults: a, availableRawLocales: s.map };
        }),
        (Zi.prototype.processRawCalendarOptions = function (e, t) {
            var n,
                r = cn([rn, e, t]),
                o = r.locales,
                i = r.locale,
                r = this.organizeRawLocales(o),
                o = r.map,
                i = this.buildLocale(i || r.defaultCode, o).options,
                o = this.buildPluginHooks(e.plugins || [], Fi),
                a = (this.currentCalendarOptionsRefiners = I(I(I(I(I({}, nn), on), an), o.listenerRefiners), o.optionRefiners)),
                s = {},
                l = cn([rn, i, e, t]),
                u = {},
                c = this.currentCalendarOptionsInput,
                d = this.currentCalendarOptionsRefined,
                p = !1;
            for (n in l) "plugins" !== n && (l[n] === c[n] || (sn[n] && n in c && sn[n](c[n], l[n])) ? (u[n] = d[n]) : a[n] ? ((u[n] = a[n](l[n])), (p = !0)) : (s[n] = c[n]));
            return (
                p && ((this.currentCalendarOptionsInput = l), (this.currentCalendarOptionsRefined = u)),
                { rawOptions: this.currentCalendarOptionsInput, refinedOptions: this.currentCalendarOptionsRefined, pluginHooks: o, availableLocaleData: r, localeDefaults: i, extra: s }
            );
        }),
        (Zi.prototype._computeCurrentViewData = function (e, t, n, r) {
            var o = t.viewSpecs[e];
            if (!o) throw new Error('viewType "' + e + "\" is not available. Please make sure you've loaded all neccessary plugins");
            (n = this.processRawViewOptions(o, t.pluginHooks, t.localeDefaults, n, r)), (r = n.refinedOptions);
            return (
                oa(n.extra),
                {
                    viewSpec: o,
                    options: r,
                    dateProfileGenerator: this.buildDateProfileGenerator({
                        dateProfileGeneratorClass: o.optionDefaults.dateProfileGeneratorClass,
                        duration: o.duration,
                        durationUnit: o.durationUnit,
                        usesMinMaxTime: o.optionDefaults.usesMinMaxTime,
                        dateEnv: t.dateEnv,
                        calendarApi: this.props.calendarApi,
                        slotMinTime: r.slotMinTime,
                        slotMaxTime: r.slotMaxTime,
                        showNonCurrentDates: r.showNonCurrentDates,
                        dayCount: r.dayCount,
                        dateAlignment: r.dateAlignment,
                        dateIncrement: r.dateIncrement,
                        hiddenDays: r.hiddenDays,
                        weekends: r.weekends,
                        nowInput: r.now,
                        validRangeInput: r.validRange,
                        visibleRangeInput: r.visibleRange,
                        monthMode: r.monthMode,
                        fixedWeekCount: r.fixedWeekCount,
                    }),
                    viewApi: this.buildViewApi(e, this.getCurrentData, t.dateEnv),
                }
            );
        }),
        (Zi.prototype.processRawViewOptions = function (e, t, n, r, o) {
            var i,
                a = cn([rn, e.optionDefaults, n, r, e.optionOverrides, o]),
                s = I(I(I(I(I(I({}, nn), on), an), un), t.listenerRefiners), t.optionRefiners),
                l = {},
                u = this.currentViewOptionsInput,
                c = this.currentViewOptionsRefined,
                d = !1,
                p = {};
            for (i in a)
                a[i] === u[i]
                    ? (l[i] = c[i])
                    : (a[i] === this.currentCalendarOptionsInput[i] ? i in this.currentCalendarOptionsRefined && (l[i] = this.currentCalendarOptionsRefined[i]) : s[i] ? (l[i] = s[i](a[i])) : (p[i] = a[i]), (d = !0));
            return d && ((this.currentViewOptionsInput = a), (this.currentViewOptionsRefined = l)), { rawOptions: this.currentViewOptionsInput, refinedOptions: this.currentViewOptionsRefined, extra: p };
        }),
        Zi);
    function Zi(e) {
        var t = this;
        (this.computeOptionsData = Lt(this._computeOptionsData)),
            (this.computeCurrentViewData = Lt(this._computeCurrentViewData)),
            (this.organizeRawLocales = Lt(Hr)),
            (this.buildLocale = Lt(Or)),
            (this.buildPluginHooks = Qo()),
            (this.buildDateEnv = Lt(Xi)),
            (this.buildTheme = Lt(Ki)),
            (this.parseToolbars = Lt(Ai)),
            (this.buildViewSpecs = Lt(Ci)),
            (this.buildDateProfileGenerator = Ut($i)),
            (this.buildViewApi = Lt(Ji)),
            (this.buildViewUiProps = Ut(ta)),
            (this.buildEventUiBySource = Lt(Qi, mt)),
            (this.buildEventUiBases = Lt(ea)),
            (this.parseContextBusinessHours = Ut(ra)),
            (this.buildTitle = Lt(qi)),
            (this.emitter = new fo()),
            (this.actionRunner = new zi(this._handleAction.bind(this), this.updateData.bind(this))),
            (this.currentCalendarOptionsInput = {}),
            (this.currentCalendarOptionsRefined = {}),
            (this.currentViewOptionsInput = {}),
            (this.currentViewOptionsRefined = {}),
            (this.currentCalendarOptionsRefiners = {}),
            (this.getCurrentData = function () {
                return t.data;
            }),
            (this.dispatch = function (e) {
                t.actionRunner.request(e);
            }),
            (this.props = e),
            this.actionRunner.pause();
        var n = {},
            r = this.computeOptionsData(e.optionOverrides, n, e.calendarApi),
            o = r.calendarOptions.initialView || r.pluginHooks.initialView,
            i = this.computeCurrentViewData(o, r, e.optionOverrides, n);
        (e.calendarApi.currentDataManager = this).emitter.setThisContext(e.calendarApi), this.emitter.setOptions(i.options);
        var a = ((s = r.calendarOptions), (d = r.dateEnv), null != (a = s.initialDate) ? d.createMarker(a) : mr(s.now, d)),
            s = i.dateProfileGenerator.build(a);
        Fn(s.activeRange, a) || (a = s.currentRange.start);
        for (
            var l = { dateEnv: r.dateEnv, options: r.calendarOptions, pluginHooks: r.pluginHooks, calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData },
                u = 0,
                c = r.pluginHooks.contextInit;
            u < c.length;
            u++
        )
            (0, c[u])(l);
        for (
            var d,
                i =
                    ((d = r.calendarOptions),
                    (i = l),
                    (e = (e = s) ? e.activeRange : null),
                    ki(
                        {},
                        (function (e, t) {
                            var n = vr(t),
                                r = [].concat(e.eventSources || []),
                                o = [];
                            e.initialEvents && r.unshift(e.initialEvents), e.events && r.unshift(e.events);
                            for (var i = 0, a = r; i < a.length; i++) {
                                var s = gr(a[i], t, n);
                                s && o.push(s);
                            }
                            return o;
                        })(d, i),
                        e,
                        i
                    )),
                p = {
                    dynamicOptionOverrides: n,
                    currentViewType: o,
                    currentDate: a,
                    dateProfile: s,
                    businessHours: this.parseContextBusinessHours(l),
                    eventSources: i,
                    eventUiBases: {},
                    eventStore: { defs: {}, instances: {} },
                    renderableEventStore: { defs: {}, instances: {} },
                    dateSelection: null,
                    eventSelection: "",
                    eventDrag: null,
                    eventResize: null,
                    selectionConfig: this.buildViewUiProps(l).selectionConfig,
                },
                f = I(I({}, l), p),
                h = 0,
                g = r.pluginHooks.reducers;
            h < g.length;
            h++
        ) {
            var v = g[h];
            I(p, v(null, null, f));
        }
        na(p, l) && this.emitter.trigger("loading", !0), (this.state = p), this.updateData(), this.actionRunner.resume();
    }
    function Xi(e, t, n, r, o, i, a, s) {
        a = Or(t || a.defaultCode, a.map);
        return new xr({ calendarSystem: "gregory", timeZone: e, namedTimeZoneImpl: i.namedTimeZonedImpl, locale: a, weekNumberCalculation: n, firstDay: r, weekText: o, cmdFormatter: i.cmdFormatter, defaultSeparator: s });
    }
    function Ki(e, t) {
        return new (t.themeClasses[e.themeSystem] || ti)(e);
    }
    function $i(e) {
        return new (e.dateProfileGeneratorClass || Ri)(e);
    }
    function Ji(e, t, n) {
        return new pr(e, t, n);
    }
    function Qi(e) {
        return ht(e, function (e) {
            return e.ui;
        });
    }
    function ea(e, t, n) {
        var r,
            o = { "": t };
        for (r in e) {
            var i = e[r];
            i.sourceId && n[i.sourceId] && (o[r] = n[i.sourceId]);
        }
        return o;
    }
    function ta(e) {
        var t = e.options;
        return {
            eventUiSingleBase: bn(
                {
                    display: t.eventDisplay,
                    editable: t.editable,
                    startEditable: t.eventStartEditable,
                    durationEditable: t.eventDurationEditable,
                    constraint: t.eventConstraint,
                    overlap: "boolean" == typeof t.eventOverlap ? t.eventOverlap : void 0,
                    allow: t.eventAllow,
                    backgroundColor: t.eventBackgroundColor,
                    borderColor: t.eventBorderColor,
                    textColor: t.eventTextColor,
                    color: t.eventColor,
                },
                e
            ),
            selectionConfig: bn({ constraint: t.selectConstraint, overlap: "boolean" == typeof t.selectOverlap ? t.selectOverlap : void 0, allow: t.selectAllow }, e),
        };
    }
    function na(e, t) {
        for (var n = 0, r = t.pluginHooks.isLoadingFuncs; n < r.length; n++) if ((0, r[n])(e)) return !0;
        return !1;
    }
    function ra(e) {
        return Vr(e.options.businessHours, e);
    }
    function oa(e, t) {
        for (var n in e) console.warn("Unknown option '" + n + "'" + (t ? " for view '" + t + "'" : ""));
    }
    var ia,
        aa =
            (t(sa, (ia = _o)),
            (sa.prototype.render = function () {
                return this.props.children(this.state);
            }),
            (sa.prototype.componentDidUpdate = function (e) {
                var t = this.props.optionOverrides;
                t !== e.optionOverrides && this.dataManager.resetOptions(t);
            }),
            sa);
    function sa(e) {
        var t = ia.call(this, e) || this;
        return (
            (t.handleData = function (e) {
                t.dataManager ? t.setState(e) : (t.state = e);
            }),
            (t.dataManager = new Yi({ optionOverrides: e.optionOverrides, calendarApi: e.calendarApi, onData: t.handleData })),
            t
        );
    }
    var la =
        ((ua.prototype.addSegs = function (e) {
            for (var t = [], n = 0, r = e; n < r.length; n++) {
                var o = r[n];
                this.insertEntry(o, t);
            }
            return t;
        }),
        (ua.prototype.insertEntry = function (e, t) {
            var n = this.findInsertion(e);
            return this.isInsertionValid(n, e) ? (this.insertEntryAt(e, n), 1) : this.handleInvalidInsertion(n, e, t);
        }),
        (ua.prototype.isInsertionValid = function (e, t) {
            return (-1 === this.maxCoord || e.levelCoord + t.thickness <= this.maxCoord) && (-1 === this.maxStackCnt || e.stackCnt < this.maxStackCnt);
        }),
        (ua.prototype.handleInvalidInsertion = function (e, t, n) {
            return this.allowReslicing && e.touchingEntry ? this.splitEntry(t, e.touchingEntry, n) : (n.push(t), 0);
        }),
        (ua.prototype.splitEntry = function (e, t, n) {
            var r = 0,
                o = [],
                i = e.span,
                t = t.span;
            return (
                i.start < t.start && (r += this.insertEntry({ index: e.index, thickness: e.thickness, span: { start: i.start, end: t.start } }, o)),
                i.end > t.end && (r += this.insertEntry({ index: e.index, thickness: e.thickness, span: { start: t.end, end: i.end } }, o)),
                r ? (n.push.apply(n, h([{ index: e.index, thickness: e.thickness, span: ha(t, i) }], o)), r) : (n.push(e), 0)
            );
        }),
        (ua.prototype.insertEntryAt = function (e, t) {
            var n = this.entriesByLevel,
                r = this.levelCoords;
            -1 === t.lateral ? (ga(r, t.level, t.levelCoord), ga(n, t.level, [e])) : ga(n[t.level], t.lateral, e), (this.stackCnts[da(e)] = t.stackCnt);
        }),
        (ua.prototype.findInsertion = function (e) {
            for (var t = this.levelCoords, n = this.entriesByLevel, r = this.strictOrder, o = this.stackCnts, i = t.length, a = 0, s = -1, l = -1, u = null, c = 0, d = 0; d < i; d += 1) {
                var p = t[d];
                if (!r && p >= a + e.thickness) break;
                for (var f, h = n[d], g = va(h, e.span.start, ca), v = g[0] + g[1]; (f = h[v]) && f.span.start < e.span.end; ) {
                    var m = p + f.thickness;
                    a < m && ((a = m), (u = f), (s = d), (l = v)), m === a && (c = Math.max(c, o[da(f)] + 1)), (v += 1);
                }
            }
            var y = 0;
            if (u) for (y = s + 1; y < i && t[y] < a; ) y += 1;
            var E = -1;
            return { touchingLevel: s, touchingLateral: l, touchingEntry: u, stackCnt: c, levelCoord: a, level: y, lateral: (E = y < i && t[y] === a ? va(n[y], e.span.end, ca)[0] : E) };
        }),
        (ua.prototype.toRects = function () {
            for (var e = this.entriesByLevel, t = this.levelCoords, n = e.length, r = [], o = 0; o < n; o += 1)
                for (var i = e[o], a = t[o], s = 0, l = i; s < l.length; s++) {
                    var u = l[s];
                    r.push(I(I({}, u), { levelCoord: a }));
                }
            return r;
        }),
        ua);
    function ua() {
        (this.strictOrder = !1), (this.allowReslicing = !1), (this.maxCoord = -1), (this.maxStackCnt = -1), (this.levelCoords = []), (this.entriesByLevel = []), (this.stackCnts = {});
    }
    function ca(e) {
        return e.span.end;
    }
    function da(e) {
        return e.index + ":" + e.span.start;
    }
    function pa(e) {
        for (var t = [], n = 0, r = e; n < r.length; n++) {
            for (var o = r[n], i = [], a = { span: o.span, entries: [o] }, s = 0, l = t; s < l.length; s++) {
                var u = l[s];
                ha(u.span, a.span) ? (a = { entries: u.entries.concat(a.entries), span: fa(u.span, a.span) }) : i.push(u);
            }
            i.push(a), (t = i);
        }
        return t;
    }
    function fa(e, t) {
        return { start: Math.min(e.start, t.start), end: Math.max(e.end, t.end) };
    }
    function ha(e, t) {
        var n = Math.max(e.start, t.start),
            t = Math.min(e.end, t.end);
        return n < t ? { start: n, end: t } : null;
    }
    function ga(e, t, n) {
        e.splice(t, 0, n);
    }
    function va(e, t, n) {
        var r = 0,
            o = e.length;
        if (!o || t < n(e[r])) return [0, 0];
        if (t > n(e[o - 1])) return [o, 0];
        for (; r < o; ) {
            var i = Math.floor(r + (o - r) / 2),
                a = n(e[i]);
            if (t < a) o = i;
            else {
                if (!(a < t)) return [i, 1];
                r = i + 1;
            }
        }
        return [r, 0];
    }
    var ma = ((ya.prototype.destroy = function () {}), ya);
    function ya(e) {
        (this.component = e.component), (this.isHitComboAllowed = e.isHitComboAllowed || null);
    }
    function Ea(e) {
        var t;
        return ((t = {})[e.component.uid] = e), t;
    }
    var Sa = {},
        ba = ((wa.prototype.destroy = function () {}), (wa.prototype.setMirrorIsVisible = function (e) {}), (wa.prototype.setMirrorNeedsRevert = function (e) {}), (wa.prototype.setAutoScrollEnabled = function (e) {}), wa),
        Da = {},
        Ca = { startTime: wt, duration: wt, create: Boolean, sourceId: String };
    function wa(e, t) {
        this.emitter = new fo();
    }
    function Ra(e) {
        var t = dn(e, Ca),
            e = t.refined,
            t = t.extra;
        return { startTime: e.startTime || null, duration: e.duration || null, create: null == e.create || e.create, sourceId: e.sourceId, leftoverProps: t };
    }
    var Ta,
        _a,
        ka,
        xa,
        Ma,
        Ia,
        Pa =
            (t(za, (Ia = jo)),
            (za.prototype.render = function () {
                var t = this,
                    e = this.props.widgetGroups.map(function (e) {
                        return t.renderWidgetGroup(e);
                    });
                return ko.apply(void 0, h(["div", { className: "fc-toolbar-chunk" }], e));
            }),
            (za.prototype.renderWidgetGroup = function (e) {
                for (var t = this.props, n = this.context.theme, r = [], o = !0, i = 0, a = e; i < a.length; i++) {
                    var s,
                        l = a[i],
                        u = l.buttonName,
                        c = l.buttonClick,
                        d = l.buttonText,
                        p = l.buttonIcon,
                        f = l.buttonHint;
                    "title" === u
                        ? ((o = !1), r.push(ko("h2", { className: "fc-toolbar-title", id: t.titleId }, t.title)))
                        : ((s = u === t.activeButton),
                          (l = (!t.isTodayEnabled && "today" === u) || (!t.isPrevEnabled && "prev" === u) || (!t.isNextEnabled && "next" === u)),
                          (u = ["fc-" + u + "-button", n.getClass("button")]),
                          s && u.push(n.getClass("buttonActive")),
                          r.push(ko("button", { type: "button", title: "function" == typeof f ? f(t.navUnit) : f, disabled: l, "aria-pressed": s, className: u.join(" "), onClick: c }, d || (p ? ko("span", { className: p }) : ""))));
                }
                if (1 < r.length) {
                    e = (o && n.getClass("buttonGroup")) || "";
                    return ko.apply(void 0, h(["div", { className: e }], r));
                }
                return r[0];
            }),
            za),
        Na =
            (t(Ba, (Ma = jo)),
            (Ba.prototype.render = function () {
                var e = this.props,
                    t = e.model,
                    n = e.extraClassName,
                    r = !1,
                    o = t.sectionWidgets,
                    e = o.center,
                    t = o.left ? ((r = !0), o.left) : o.start,
                    o = o.right ? ((r = !0), o.right) : o.end;
                return ko("div", { className: [n || "", "fc-toolbar", r ? "fc-toolbar-ltr" : ""].join(" ") }, this.renderSection("start", t || []), this.renderSection("center", e || []), this.renderSection("end", o || []));
            }),
            (Ba.prototype.renderSection = function (e, t) {
                var n = this.props;
                return ko(Pa, {
                    key: e,
                    widgetGroups: t,
                    title: n.title,
                    navUnit: n.navUnit,
                    activeButton: n.activeButton,
                    isTodayEnabled: n.isTodayEnabled,
                    isPrevEnabled: n.isPrevEnabled,
                    isNextEnabled: n.isNextEnabled,
                    titleId: n.titleId,
                });
            }),
            Ba),
        Ha =
            (t(Fa, (xa = jo)),
            (Fa.prototype.render = function () {
                var e = this.props,
                    t = this.state,
                    n = e.aspectRatio,
                    r = ["fc-view-harness", n || e.liquid || e.height ? "fc-view-harness-active" : "fc-view-harness-passive"],
                    o = "",
                    i = "";
                return (
                    n ? (null !== t.availableWidth ? (o = t.availableWidth / n) : (i = (1 / n) * 100 + "%")) : (o = e.height || ""),
                    ko("div", { "aria-labelledby": e.labeledById, ref: this.handleEl, className: r.join(" "), style: { height: o, paddingBottom: i } }, e.children)
                );
            }),
            (Fa.prototype.componentDidMount = function () {
                this.context.addResizeHandler(this.handleResize);
            }),
            (Fa.prototype.componentWillUnmount = function () {
                this.context.removeResizeHandler(this.handleResize);
            }),
            (Fa.prototype.updateAvailableWidth = function () {
                this.el && this.props.aspectRatio && this.setState({ availableWidth: this.el.offsetWidth });
            }),
            Fa),
        Oa = (t(Va, (ka = ma)), Va),
        Aa =
            (t(Wa, (_a = ma)),
            (Wa.prototype.destroy = function () {
                this.removeHoverListeners();
            }),
            (Wa.prototype.triggerEvent = function (e, t, n) {
                var r = this.component,
                    o = r.context,
                    i = Gn(n);
                (t && !r.isValidSegDownEl(t.target)) || o.emitter.trigger(e, { el: n, event: new Er(o, i.eventRange.def, i.eventRange.instance), jsEvent: t, view: o.viewApi });
            }),
            Wa),
        La =
            (t(Ua, (Ta = Fo)),
            (Ua.prototype.render = function () {
                var e,
                    t = this.props,
                    n = t.toolbarConfig,
                    r = t.options,
                    o = this.buildToolbarProps(t.viewSpec, t.dateProfile, t.dateProfileGenerator, t.currentDate, mr(t.options.now, t.dateEnv), t.viewTitle),
                    i = !1,
                    a = "";
                t.isHeightAuto || t.forPrint ? (a = "") : null != r.height ? (i = !0) : null != r.contentHeight ? (a = r.contentHeight) : (e = Math.max(r.aspectRatio, 0.5));
                var s = this.buildViewContext(
                        t.viewSpec,
                        t.viewApi,
                        t.options,
                        t.dateProfileGenerator,
                        t.dateEnv,
                        t.theme,
                        t.pluginHooks,
                        t.dispatch,
                        t.getCurrentData,
                        t.emitter,
                        t.calendarApi,
                        this.registerInteractiveComponent,
                        this.unregisterInteractiveComponent
                    ),
                    r = n.header && n.header.hasTitle ? this.state.viewLabelId : "";
                return ko(
                    Lo.Provider,
                    { value: s },
                    n.header && ko(Na, I({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: n.header, titleId: r }, o)),
                    ko(Ha, { liquid: i, height: a, aspectRatio: e, labeledById: r }, this.renderView(t), this.buildAppendContent()),
                    n.footer && ko(Na, I({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: n.footer, titleId: "" }, o))
                );
            }),
            (Ua.prototype.componentDidMount = function () {
                var t = this.props;
                (this.calendarInteractions = t.pluginHooks.calendarInteractions.map(function (e) {
                    return new e(t);
                })),
                    window.addEventListener("resize", this.handleWindowResize);
                var e,
                    n = t.pluginHooks.propSetHandlers;
                for (e in n) n[e](t[e], t);
            }),
            (Ua.prototype.componentDidUpdate = function (e) {
                var t,
                    n = this.props,
                    r = n.pluginHooks.propSetHandlers;
                for (t in r) n[t] !== e[t] && r[t](n[t], n);
            }),
            (Ua.prototype.componentWillUnmount = function () {
                window.removeEventListener("resize", this.handleWindowResize), this.resizeRunner.clear();
                for (var e = 0, t = this.calendarInteractions; e < t.length; e++) t[e].destroy();
                this.props.emitter.trigger("_unmount");
            }),
            (Ua.prototype.buildAppendContent = function () {
                var t = this.props,
                    e = t.pluginHooks.viewContainerAppends.map(function (e) {
                        return e(t);
                    });
                return ko.apply(void 0, h([Io, {}], e));
            }),
            (Ua.prototype.renderView = function (e) {
                for (
                    var t = e.pluginHooks,
                        n = e.viewSpec,
                        r = {
                            dateProfile: e.dateProfile,
                            businessHours: e.businessHours,
                            eventStore: e.renderableEventStore,
                            eventUiBases: e.eventUiBases,
                            dateSelection: e.dateSelection,
                            eventSelection: e.eventSelection,
                            eventDrag: e.eventDrag,
                            eventResize: e.eventResize,
                            isHeightAuto: e.isHeightAuto,
                            forPrint: e.forPrint,
                        },
                        o = 0,
                        i = this.buildViewPropTransformers(t.viewPropsTransformers);
                    o < i.length;
                    o++
                ) {
                    var a = i[o];
                    I(r, a.transform(r, e));
                }
                n = n.component;
                return ko(n, I({}, r));
            }),
            Ua);
    function Ua() {
        var r = (null !== Ta && Ta.apply(this, arguments)) || this;
        return (
            (r.buildViewContext = Lt(Wo)),
            (r.buildViewPropTransformers = Lt(Ga)),
            (r.buildToolbarProps = Lt(ja)),
            (r.headerRef = Mo()),
            (r.footerRef = Mo()),
            (r.interactionsStore = {}),
            (r.state = { viewLabelId: Ce() }),
            (r.registerInteractiveComponent = function (e, t) {
                var n = { component: e, el: (t = t).el, useEventCenter: null == t.useEventCenter || t.useEventCenter, isHitComboAllowed: t.isHitComboAllowed || null },
                    t = [Oa, Aa].concat(r.props.pluginHooks.componentInteractions).map(function (e) {
                        return new e(n);
                    });
                (r.interactionsStore[e.uid] = t), (Sa[e.uid] = n);
            }),
            (r.unregisterInteractiveComponent = function (e) {
                for (var t = 0, n = r.interactionsStore[e.uid]; t < n.length; t++) n[t].destroy();
                delete r.interactionsStore[e.uid], delete Sa[e.uid];
            }),
            (r.resizeRunner = new Bi(function () {
                r.props.emitter.trigger("_resize", !0), r.props.emitter.trigger("windowResize", { view: r.props.viewApi });
            })),
            (r.handleWindowResize = function (e) {
                var t = r.props.options;
                t.handleWindowResize && e.target === window && r.resizeRunner.request(t.windowResizeDelay);
            }),
            r
        );
    }
    function Wa(e) {
        var r,
            o,
            i,
            n = _a.call(this, e) || this;
        return (
            (n.handleEventElRemove = function (e) {
                e === n.currentSegEl && n.handleSegLeave(null, n.currentSegEl);
            }),
            (n.handleSegEnter = function (e, t) {
                Gn(t) && ((n.currentSegEl = t), n.triggerEvent("eventMouseEnter", e, t));
            }),
            (n.handleSegLeave = function (e, t) {
                n.currentSegEl && ((n.currentSegEl = null), n.triggerEvent("eventMouseLeave", e, t));
            }),
            (n.removeHoverListeners =
                ((e = e.el),
                (r = n.handleSegEnter),
                (o = n.handleSegLeave),
                Re(e, "mouseover", ".fc-event", function (e, t) {
                    var n;
                    t !== i &&
                        (r(e, (i = t)),
                        t.addEventListener(
                            "mouseleave",
                            (n = function (e) {
                                (i = null), o(e, t), t.removeEventListener("mouseleave", n);
                            })
                        ));
                }))),
            n
        );
    }
    function Va(e) {
        var a = ka.call(this, e) || this;
        return (
            (a.handleSegClick = function (e, t) {
                var n,
                    r = a.component,
                    o = r.context,
                    i = Gn(t);
                i &&
                    r.isValidSegDownEl(e.target) &&
                    ((n = (n = he(e.target, ".fc-event-forced-url")) ? n.querySelector("a[href]").href : ""),
                    o.emitter.trigger("eventClick", { el: t, event: new Er(r.context, i.eventRange.def, i.eventRange.instance), jsEvent: e, view: o.viewApi }),
                    n && !e.defaultPrevented && (window.location.href = n));
            }),
            (a.destroy = Re(e.el, "click", ".fc-event", a.handleSegClick)),
            a
        );
    }
    function Fa() {
        var t = (null !== xa && xa.apply(this, arguments)) || this;
        return (
            (t.state = { availableWidth: null }),
            (t.handleEl = function (e) {
                (t.el = e), Zo(t.props.elRef, e), t.updateAvailableWidth();
            }),
            (t.handleResize = function () {
                t.updateAvailableWidth();
            }),
            t
        );
    }
    function Ba() {
        return (null !== Ma && Ma.apply(this, arguments)) || this;
    }
    function za() {
        return (null !== Ia && Ia.apply(this, arguments)) || this;
    }
    function ja(e, t, n, r, o, i) {
        var a = n.build(o, void 0, !1),
            s = n.buildPrev(t, r, !1),
            r = n.buildNext(t, r, !1);
        return { title: i, activeButton: e.type, navUnit: e.singleUnit, isTodayEnabled: a.isValid && !Fn(t.currentRange, o), isPrevEnabled: s.isValid, isNextEnabled: r.isValid };
    }
    function Ga(e) {
        return e.map(function (e) {
            return new e();
        });
    }
    var qa,
        Ya =
            (t(Za, (qa = jo)),
            (Za.prototype.render = function () {
                var e = this.props,
                    t = e.options,
                    n = this.state.forPrint,
                    r = n || "auto" === t.height || "auto" === t.contentHeight,
                    o = r || null == t.height ? "" : t.height,
                    t = ["fc", n ? "fc-media-print" : "fc-media-screen", "fc-direction-" + t.direction, e.theme.getClass("root")];
                return qr() || t.push("fc-liquid-hack"), e.children(t, o, r, n);
            }),
            (Za.prototype.componentDidMount = function () {
                var e = this.props.emitter;
                e.on("_beforeprint", this.handleBeforePrint), e.on("_afterprint", this.handleAfterPrint);
            }),
            (Za.prototype.componentWillUnmount = function () {
                var e = this.props.emitter;
                e.off("_beforeprint", this.handleBeforePrint), e.off("_afterprint", this.handleAfterPrint);
            }),
            Za);
    function Za() {
        var e = (null !== qa && qa.apply(this, arguments)) || this;
        return (
            (e.state = { forPrint: !1 }),
            (e.handleBeforePrint = function () {
                e.setState({ forPrint: !0 });
            }),
            (e.handleAfterPrint = function () {
                e.setState({ forPrint: !1 });
            }),
            e
        );
    }
    function Xa(e, t) {
        return tn(!e || 10 < t ? { weekday: "short" } : 1 < t ? { weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 } : { weekday: "long" });
    }
    var Ka = "fc-col-header-cell";
    function $a(e) {
        return e.text;
    }
    var Ja,
        Qa,
        es,
        ts =
            (t(ss, (es = jo)),
            (ss.prototype.render = function () {
                var e = this.context,
                    t = e.dateEnv,
                    n = e.options,
                    r = e.theme,
                    o = e.viewApi,
                    i = this.props,
                    a = i.date,
                    e = i.dateProfile,
                    s = $r(a, i.todayRange, null, e),
                    l = [Ka].concat(Jr(s, r)),
                    r = t.format(a, i.dayHeaderFormat),
                    u = !s.isDisabled && 1 < i.colCnt ? to(this.context, a) : {},
                    r = I(I(I({ date: t.toDate(a), view: o }, i.extraHookProps), { text: r }), s);
                return ko(ii, { hookProps: r, classNames: n.dayHeaderClassNames, content: n.dayHeaderContent, defaultContent: $a, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, function (e, t, n, r) {
                    return ko(
                        "th",
                        I({ ref: e, role: "columnheader", className: l.concat(t).join(" "), "data-date": s.isDisabled ? void 0 : Nt(a), colSpan: i.colSpan }, i.extraDataAttrs),
                        ko("div", { className: "fc-scrollgrid-sync-inner" }, !s.isDisabled && ko("a", I({ ref: n, className: ["fc-col-header-cell-cushion", i.isSticky ? "fc-sticky" : ""].join(" ") }, u), r))
                    );
                });
            }),
            ss),
        ns = tn({ weekday: "long" }),
        rs =
            (t(as, (Qa = jo)),
            (as.prototype.render = function () {
                var o = this.props,
                    e = this.context,
                    i = e.dateEnv,
                    t = e.theme,
                    n = e.viewApi,
                    r = e.options,
                    a = Xe(new Date(2592e5), o.dow),
                    e = { dow: o.dow, isDisabled: !1, isFuture: !1, isPast: !1, isToday: !1, isOther: !1 },
                    s = [Ka].concat(Jr(e, t), o.extraClassNames || []),
                    t = i.format(a, o.dayHeaderFormat),
                    t = I(I(I(I({ date: a }, e), { view: n }), o.extraHookProps), { text: t });
                return ko(ii, { hookProps: t, classNames: r.dayHeaderClassNames, content: r.dayHeaderContent, defaultContent: $a, didMount: r.dayHeaderDidMount, willUnmount: r.dayHeaderWillUnmount }, function (e, t, n, r) {
                    return ko(
                        "th",
                        I({ ref: e, role: "columnheader", className: s.concat(t).join(" "), colSpan: o.colSpan }, o.extraDataAttrs),
                        ko("div", { className: "fc-scrollgrid-sync-inner" }, ko("a", { "aria-label": i.format(a, ns), className: ["fc-col-header-cell-cushion", o.isSticky ? "fc-sticky" : ""].join(" "), ref: n }, r))
                    );
                });
            }),
            as),
        os =
            (t(is, (Ja = _o)),
            (is.prototype.render = function () {
                var e = this.props,
                    t = this.state;
                return e.children(t.nowDate, t.todayRange);
            }),
            (is.prototype.componentDidMount = function () {
                this.setTimeout();
            }),
            (is.prototype.componentDidUpdate = function (e) {
                e.unit !== this.props.unit && (this.clearTimeout(), this.setTimeout());
            }),
            (is.prototype.componentWillUnmount = function () {
                this.clearTimeout();
            }),
            (is.prototype.computeTiming = function () {
                var e = this.props,
                    t = this.context,
                    n = Ke(this.initialNowDate, new Date().valueOf() - this.initialNowQueriedMs),
                    r = t.dateEnv.startOf(n, e.unit),
                    e = t.dateEnv.add(r, wt(1, e.unit)),
                    n = e.valueOf() - n.valueOf(),
                    n = Math.min(864e5, n);
                return { currentState: { nowDate: r, todayRange: ls(r) }, nextState: { nowDate: e, todayRange: ls(e) }, waitMs: n };
            }),
            (is.prototype.setTimeout = function () {
                var e = this,
                    t = this.computeTiming(),
                    n = t.nextState,
                    t = t.waitMs;
                this.timeoutId = setTimeout(function () {
                    e.setState(n, function () {
                        e.setTimeout();
                    });
                }, t);
            }),
            (is.prototype.clearTimeout = function () {
                this.timeoutId && clearTimeout(this.timeoutId);
            }),
            (is.contextType = Lo),
            is);
    function is(e, t) {
        e = Ja.call(this, e, t) || this;
        return (e.initialNowDate = mr(t.options.now, t.dateEnv)), (e.initialNowQueriedMs = new Date().valueOf()), (e.state = e.computeTiming().currentState), e;
    }
    function as() {
        return (null !== Qa && Qa.apply(this, arguments)) || this;
    }
    function ss() {
        return (null !== es && es.apply(this, arguments)) || this;
    }
    function ls(e) {
        e = nt(e);
        return { start: e, end: Xe(e, 1) };
    }
    var us,
        cs =
            (t(ds, (us = jo)),
            (ds.prototype.render = function () {
                var e = this.context,
                    t = this.props,
                    n = t.dates,
                    r = t.dateProfile,
                    o = t.datesRepDistinctDays,
                    i = t.renderIntro,
                    a = this.createDayHeaderFormatter(e.options.dayHeaderFormat, o, n.length);
                return ko(os, { unit: "day" }, function (e, t) {
                    return ko(
                        "tr",
                        { role: "row" },
                        i && i("day"),
                        n.map(function (e) {
                            return o ? ko(ts, { key: e.toISOString(), date: e, dateProfile: r, todayRange: t, colCnt: n.length, dayHeaderFormat: a }) : ko(rs, { key: e.getUTCDay(), dow: e.getUTCDay(), dayHeaderFormat: a });
                        })
                    );
                });
            }),
            ds);
    function ds() {
        var e = (null !== us && us.apply(this, arguments)) || this;
        return (e.createDayHeaderFormatter = Lt(ps)), e;
    }
    function ps(e, t, n) {
        return e || Xa(t, n);
    }
    var fs =
            ((ys.prototype.sliceRange = function (e) {
                var t = this.getDateDayIndex(e.start),
                    n = this.getDateDayIndex(Xe(e.end, -1)),
                    r = Math.max(0, t),
                    e = Math.min(this.cnt - 1, n);
                return (r = Math.ceil(r)) <= (e = Math.floor(e)) ? { firstIndex: r, lastIndex: e, isStart: t === r, isEnd: n === e } : null;
            }),
            (ys.prototype.getDateDayIndex = function (e) {
                var t = this.indices,
                    e = Math.floor(Je(this.dates[0], e));
                return e < 0 ? t[0] - 1 : e >= t.length ? t[t.length - 1] + 1 : t[e];
            }),
            ys),
        hs =
            ((ms.prototype.buildCells = function () {
                for (var e = [], t = 0; t < this.rowCnt; t += 1) {
                    for (var n = [], r = 0; r < this.colCnt; r += 1) n.push(this.buildCell(t, r));
                    e.push(n);
                }
                return e;
            }),
            (ms.prototype.buildCell = function (e, t) {
                t = this.daySeries.dates[e * this.colCnt + t];
                return { key: t.toISOString(), date: t };
            }),
            (ms.prototype.buildHeaderDates = function () {
                for (var e = [], t = 0; t < this.colCnt; t += 1) e.push(this.cells[0][t].date);
                return e;
            }),
            (ms.prototype.sliceRange = function (e) {
                var t = this.colCnt,
                    n = this.daySeries.sliceRange(e),
                    r = [];
                if (n)
                    for (var o = n.firstIndex, i = n.lastIndex, a = o; a <= i; ) {
                        var s = Math.floor(a / t),
                            l = Math.min((s + 1) * t, i + 1);
                        r.push({ row: s, firstCol: a % t, lastCol: (l - 1) % t, isStart: n.isStart && a === o, isEnd: n.isEnd && l - 1 === i }), (a = l);
                    }
                return r;
            }),
            ms),
        gs =
            ((vs.prototype.sliceProps = function (e, t, n, r) {
                for (var o = [], i = 4; i < arguments.length; i++) o[i - 4] = arguments[i];
                var a = e.eventUiBases,
                    s = this.sliceEventStore.apply(this, h([e.eventStore, a, t, n], o));
                return {
                    dateSelectionSegs: this.sliceDateSelection.apply(this, h([e.dateSelection, a, r], o)),
                    businessHourSegs: this.sliceBusinessHours.apply(this, h([e.businessHours, t, n, r], o)),
                    fgEventSegs: s.fg,
                    bgEventSegs: s.bg,
                    eventDrag: this.sliceEventDrag.apply(this, h([e.eventDrag, a, t, n], o)),
                    eventResize: this.sliceEventResize.apply(this, h([e.eventResize, a, t, n], o)),
                    eventSelection: e.eventSelection,
                };
            }),
            (vs.prototype.sliceNowDate = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return this._sliceDateSpan.apply(this, h([{ range: { start: e, end: Ke(e, 1) }, allDay: !1 }, {}, t], n));
            }),
            (vs.prototype._sliceBusinessHours = function (e, t, n, r) {
                for (var o = [], i = 4; i < arguments.length; i++) o[i - 4] = arguments[i];
                return e ? this._sliceEventStore.apply(this, h([bt(e, Es(t, Boolean(n)), r), {}, t, n], o)).bg : [];
            }),
            (vs.prototype._sliceEventStore = function (e, t, n, r) {
                for (var o = [], i = 4; i < arguments.length; i++) o[i - 4] = arguments[i];
                if (e) {
                    r = Bn(e, t, Es(n, Boolean(r)), r);
                    return { bg: this.sliceEventRanges(r.bg, o), fg: this.sliceEventRanges(r.fg, o) };
                }
                return { bg: [], fg: [] };
            }),
            (vs.prototype._sliceInteraction = function (e, t, n, r) {
                for (var o = [], i = 4; i < arguments.length; i++) o[i - 4] = arguments[i];
                if (!e) return null;
                r = Bn(e.mutatedEvents, t, Es(n, Boolean(r)), r);
                return { segs: this.sliceEventRanges(r.fg, o), affectedInstances: e.affectedEvents.instances, isEvent: e.isEvent };
            }),
            (vs.prototype._sliceDateSpan = function (e, t, n) {
                for (var r = [], o = 3; o < arguments.length; o++) r[o - 3] = arguments[o];
                if (!e) return [];
                for (
                    var i,
                        a,
                        s = ((i = e), (a = t), { def: (t = Mn((n = kn({ editable: !1 }, (t = n))).refined, n.extra, "", i.allDay, !0, t)), ui: Yn(t, a), instance: ct(t.defId, i.range), range: i.range, isStart: !0, isEnd: !0 }),
                        e = this.sliceRange.apply(this, h([e.range], r)),
                        l = 0,
                        u = e;
                    l < u.length;
                    l++
                )
                    u[l].eventRange = s;
                return e;
            }),
            (vs.prototype.sliceEventRanges = function (e, t) {
                for (var n = [], r = 0, o = e; r < o.length; r++) {
                    var i = o[r];
                    n.push.apply(n, this.sliceEventRange(i, t));
                }
                return n;
            }),
            (vs.prototype.sliceEventRange = function (e, t) {
                var n = e.range;
                this.forceDayIfListItem && "list-item" === e.ui.display && (n = { start: n.start, end: Xe(n.start, 1) });
                for (var t = this.sliceRange.apply(this, h([n], t)), r = 0, o = t; r < o.length; r++) {
                    var i = o[r];
                    (i.eventRange = e), (i.isStart = e.isStart && i.isStart), (i.isEnd = e.isEnd && i.isEnd);
                }
                return t;
            }),
            vs);
    function vs() {
        (this.sliceBusinessHours = Lt(this._sliceBusinessHours)),
            (this.sliceDateSelection = Lt(this._sliceDateSpan)),
            (this.sliceEventStore = Lt(this._sliceEventStore)),
            (this.sliceEventDrag = Lt(this._sliceInteraction)),
            (this.sliceEventResize = Lt(this._sliceInteraction)),
            (this.forceDayIfListItem = !1);
    }
    function ms(e, t) {
        var n,
            r,
            o,
            i = e.dates;
        if (t) {
            for (r = i[0].getUTCDay(), n = 1; n < i.length && i[n].getUTCDay() !== r; n += 1);
            o = Math.ceil(i.length / n);
        } else (o = 1), (n = i.length);
        (this.rowCnt = o), (this.colCnt = n), (this.daySeries = e), (this.cells = this.buildCells()), (this.headerDates = this.buildHeaderDates());
    }
    function ys(e, t) {
        for (var n = e.start, r = e.end, o = [], i = [], a = -1; n < r; ) t.isHiddenDay(n) ? o.push(a + 0.5) : (o.push((a += 1)), i.push(n)), (n = Xe(n, 1));
        (this.dates = i), (this.indices = o), (this.cnt = i.length);
    }
    function Es(e, t) {
        var n = e.activeRange;
        return t ? n : { start: Ke(n.start, e.slotMinTime.milliseconds), end: Ke(n.end, e.slotMaxTime.milliseconds - 864e5) };
    }
    function Ss(e, t, n) {
        var r,
            o = e.mutatedEvents.instances;
        for (r in o) if (!Vn(t.validRange, o[r].range)) return !1;
        return Ds({ eventDrag: e }, n);
    }
    function bs(e, t, n) {
        return !!Vn(t.validRange, e.range) && Ds({ dateSelection: e }, n);
    }
    function Ds(e, t) {
        var n = t.getCurrentData(),
            e = I({ businessHours: n.businessHours, dateSelection: "", eventStore: n.eventStore, eventUiBases: n.eventUiBases, eventSelection: "", eventDrag: null, eventResize: null }, e);
        return (t.pluginHooks.isPropsValid || Cs)(e, t);
    }
    function Cs(e, t, n, r) {
        return (
            void 0 === n && (n = {}),
            !(
                (e.eventDrag &&
                    !(function (e, t, n, r) {
                        var o = t.getCurrentData(),
                            i = e.eventDrag,
                            a = i.mutatedEvents,
                            s = a.defs,
                            l = a.instances,
                            u = qn(s, i.isEvent ? e.eventUiBases : { "": o.selectionConfig });
                        r && (u = ht(u, r));
                        var c,
                            d,
                            p =
                                ((r = e.eventStore),
                                (c = i.affectedEvents.instances),
                                {
                                    defs: r.defs,
                                    instances: ft(r.instances, function (e) {
                                        return !c[e.instanceId];
                                    }),
                                }),
                            f = p.defs,
                            h = p.instances,
                            g = qn(f, e.eventUiBases);
                        for (d in l) {
                            var v = l[d],
                                m = v.range,
                                y = u[v.defId],
                                E = s[v.defId];
                            if (!ws(y.constraints, m, p, e.businessHours, t)) return;
                            var S,
                                b = t.options.eventOverlap,
                                D = "function" == typeof b ? b : null;
                            for (S in h) {
                                var C = h[S];
                                if (Wn(m, C.range)) {
                                    if (!1 === g[C.defId].overlap && i.isEvent) return;
                                    if (!1 === y.overlap) return;
                                    if (D && !D(new Er(t, f[C.defId], C), new Er(t, E, v))) return;
                                }
                            }
                            for (var w = o.eventStore, R = 0, T = y.allows; R < T.length; R++) {
                                var _ = T[R],
                                    k = I(I({}, n), { range: v.range, allDay: E.allDay }),
                                    x = w.defs[E.defId],
                                    M = w.instances[d],
                                    M = x ? new Er(t, x, M) : new Er(t, E);
                                if (!_(ur(k, t), M)) return;
                            }
                        }
                        return 1;
                    })(e, t, n, r)) ||
                (e.dateSelection &&
                    !(function (e, t, n, r) {
                        var o = e.eventStore,
                            i = o.defs,
                            a = o.instances,
                            s = e.dateSelection,
                            l = s.range,
                            u = t.getCurrentData().selectionConfig;
                        if (ws((u = r ? r(u) : u).constraints, l, o, e.businessHours, t)) {
                            var c,
                                e = t.options.selectOverlap,
                                d = "function" == typeof e ? e : null;
                            for (c in a) {
                                var p = a[c];
                                if (Wn(l, p.range)) {
                                    if (!1 === u.overlap) return;
                                    if (d && !d(new Er(t, i[p.defId], p), null)) return;
                                }
                            }
                            for (var f = 0, h = u.allows; f < h.length; f++) if (!(0, h[f])(ur(I(I({}, n), s), t), null)) return;
                            return 1;
                        }
                    })(e, t, n, r))
            )
        );
    }
    function ws(e, t, n, r, o) {
        for (var i = 0, a = e; i < a.length; i++)
            if (
                !(function (e, t) {
                    for (var n = 0, r = e; n < r.length; n++) if (Vn(r[n], t)) return !0;
                    return !1;
                })(
                    (function (t, e, n, r, o) {
                        return "businessHours" === t
                            ? Rs(bt(r, e, o))
                            : "string" == typeof t
                            ? Rs(
                                  mn(n, function (e) {
                                      return e.groupId === t;
                                  })
                              )
                            : "object" == typeof t && t
                            ? Rs(bt(t, e, o))
                            : [];
                    })(a[i], t, n, r, o),
                    t
                )
            )
                return;
        return 1;
    }
    function Rs(e) {
        var t,
            n = e.instances,
            r = [];
        for (t in n) r.push(n[t].range);
        return r;
    }
    var Ts,
        _s = /^(visible|hidden)$/,
        ks =
            (t(Is, (Ts = jo)),
            (Is.prototype.render = function () {
                var e = this.props,
                    t = e.liquid,
                    n = e.liquidIsAbsolute,
                    r = t && n,
                    o = ["fc-scroller"];
                return (
                    t && (n ? o.push("fc-scroller-liquid-absolute") : o.push("fc-scroller-liquid")),
                    ko(
                        "div",
                        {
                            ref: this.handleEl,
                            className: o.join(" "),
                            style: {
                                overflowX: e.overflowX,
                                overflowY: e.overflowY,
                                left: (r && -(e.overcomeLeft || 0)) || "",
                                right: (r && -(e.overcomeRight || 0)) || "",
                                bottom: (r && -(e.overcomeBottom || 0)) || "",
                                marginLeft: (!r && -(e.overcomeLeft || 0)) || "",
                                marginRight: (!r && -(e.overcomeRight || 0)) || "",
                                marginBottom: (!r && -(e.overcomeBottom || 0)) || "",
                                maxHeight: e.maxHeight || "",
                            },
                        },
                        e.children
                    )
                );
            }),
            (Is.prototype.needsXScrolling = function () {
                if (_s.test(this.props.overflowX)) return !1;
                for (var e = this.el, t = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(), n = e.children, r = 0; r < n.length; r += 1) if (n[r].getBoundingClientRect().width > t) return !0;
                return !1;
            }),
            (Is.prototype.needsYScrolling = function () {
                if (_s.test(this.props.overflowY)) return !1;
                for (var e = this.el, t = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(), n = e.children, r = 0; r < n.length; r += 1) if (n[r].getBoundingClientRect().height > t) return !0;
                return !1;
            }),
            (Is.prototype.getXScrollbarWidth = function () {
                return _s.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight;
            }),
            (Is.prototype.getYScrollbarWidth = function () {
                return _s.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth;
            }),
            Is),
        xs =
            ((Ms.prototype.createRef = function (t) {
                var n = this;
                return (
                    this.callbackMap[t] ||
                    (this.callbackMap[t] = function (e) {
                        n.handleValue(e, String(t));
                    })
                );
            }),
            (Ms.prototype.collect = function (e, t, n) {
                return St(this.currentMap, e, t, n);
            }),
            (Ms.prototype.getAll = function () {
                return vt(this.currentMap);
            }),
            Ms);
    function Ms(e) {
        var a = this;
        (this.masterCallback = e),
            (this.currentMap = {}),
            (this.depths = {}),
            (this.callbackMap = {}),
            (this.handleValue = function (e, t) {
                var n = a.depths,
                    r = a.currentMap,
                    o = !1,
                    i = !1;
                null !== e ? ((o = t in r), (r[t] = e), (n[t] = (n[t] || 0) + 1), (i = !0)) : (--n[t], n[t] || (delete r[t], delete a.callbackMap[t], (o = !0))),
                    a.masterCallback && (o && a.masterCallback(null, String(t)), i && a.masterCallback(e, String(t)));
            });
    }
    function Is() {
        var t = (null !== Ts && Ts.apply(this, arguments)) || this;
        return (
            (t.handleEl = function (e) {
                (t.el = e), Zo(t.props.elRef, e);
            }),
            t
        );
    }
    function Ps(e) {
        for (var t = 0, n = 0, r = ve(e, ".fc-scrollgrid-shrink"); n < r.length; n++) var o = r[n], t = Math.max(t, qe(o));
        return Math.ceil(t);
    }
    function Ns(e, t) {
        return e.liquid && t.liquid;
    }
    function Hs(e, t) {
        return null != t.maxHeight || Ns(e, t);
    }
    function Os(e, t, n, r) {
        var o = n.expandRows;
        return "function" == typeof t.content
            ? t.content(n)
            : ko(
                  "table",
                  { role: "presentation", className: [t.tableClassName, e.syncRowHeights ? "fc-scrollgrid-sync-table" : ""].join(" "), style: { minWidth: n.tableMinWidth, width: n.clientWidth, height: o ? n.clientHeight : "" } },
                  n.tableColGroupNode,
                  ko(r ? "thead" : "tbody", { role: "presentation" }, "function" == typeof t.rowContent ? t.rowContent(n) : t.rowContent)
              );
    }
    function As(e, t) {
        return At(e, t, mt);
    }
    function Ls(e, t) {
        for (var n = [], r = 0, o = e; r < o.length; r++) for (var i = o[r], a = i.span || 1, s = 0; s < a; s += 1) n.push(ko("col", { style: { width: "shrink" === i.width ? Us(t) : i.width || "", minWidth: i.minWidth || "" } }));
        return ko.apply(void 0, h(["colgroup", {}], n));
    }
    function Us(e) {
        return null == e ? 4 : e;
    }
    function Ws(e) {
        for (var t = 0, n = e; t < n.length; t++) if ("shrink" === n[t].width) return !0;
        return !1;
    }
    function Vs(e, t) {
        t = ["fc-scrollgrid", t.theme.getClass("table")];
        return e && t.push("fc-scrollgrid-liquid"), t;
    }
    function Fs(e, t) {
        var n = ["fc-scrollgrid-section", "fc-scrollgrid-section-" + e.type, e.className];
        return t && e.liquid && null == e.maxHeight && n.push("fc-scrollgrid-section-liquid"), e.isSticky && n.push("fc-scrollgrid-section-sticky"), n;
    }
    function Bs(e) {
        return ko("div", { className: "fc-scrollgrid-sticky-shim", style: { width: e.clientWidth, minWidth: e.tableMinWidth } });
    }
    function zs(e) {
        var t = e.stickyHeaderDates;
        return (t = null == t || "auto" === t ? "auto" === e.height || "auto" === e.viewHeight : t);
    }
    function js(e) {
        var t = e.stickyFooterScrollbar;
        return (t = null == t || "auto" === t ? "auto" === e.height || "auto" === e.viewHeight : t);
    }
    var Gs,
        qs =
            (t(Ys, (Gs = jo)),
            (Ys.prototype.render = function () {
                var e = this.props,
                    t = this.state,
                    n = this.context,
                    r = e.sections || [],
                    o = this.processCols(e.cols),
                    i = this.renderMicroColGroup(o, t.shrinkWidth),
                    o = Vs(e.liquid, n);
                e.collapsibleWidth && o.push("fc-scrollgrid-collapsible");
                for (var a, s = r.length, l = 0, u = [], c = [], d = []; l < s && "header" === (a = r[l]).type; ) u.push(this.renderSection(a, i, !0)), (l += 1);
                for (; l < s && "body" === (a = r[l]).type; ) c.push(this.renderSection(a, i, !1)), (l += 1);
                for (; l < s && "footer" === (a = r[l]).type; ) d.push(this.renderSection(a, i, !0)), (l += 1);
                (t = !qr()), (n = { role: "rowgroup" });
                return ko(
                    "table",
                    { role: "grid", className: o.join(" "), style: { height: e.height } },
                    Boolean(!t && u.length) && ko.apply(void 0, h(["thead", n], u)),
                    Boolean(!t && c.length) && ko.apply(void 0, h(["tbody", n], c)),
                    Boolean(!t && d.length) && ko.apply(void 0, h(["tfoot", n], d)),
                    t && ko.apply(void 0, h(h(h(["tbody", n], u), c), d))
                );
            }),
            (Ys.prototype.renderSection = function (e, t, n) {
                return "outerContent" in e ? ko(Io, { key: e.key }, e.outerContent) : ko("tr", { key: e.key, role: "presentation", className: Fs(e, this.props.liquid).join(" ") }, this.renderChunkTd(e, t, e.chunk, n));
            }),
            (Ys.prototype.renderChunkTd = function (e, t, n, r) {
                if ("outerContent" in n) return n.outerContent;
                var o = this.props,
                    i = this.state,
                    a = i.forceYScrollbars,
                    s = i.scrollerClientWidths,
                    l = i.scrollerClientHeights,
                    u = Hs(o, e),
                    i = Ns(o, e),
                    a = o.liquid ? (a ? "scroll" : u ? "auto" : "hidden") : "visible",
                    u = e.key,
                    l = Os(
                        e,
                        n,
                        {
                            tableColGroupNode: t,
                            tableMinWidth: "",
                            clientWidth: o.collapsibleWidth || void 0 === s[u] ? null : s[u],
                            clientHeight: void 0 !== l[u] ? l[u] : null,
                            expandRows: e.expandRows,
                            syncRowHeights: !1,
                            rowSyncHeights: [],
                            reportRowHeightChange: function () {},
                        },
                        r
                    );
                return ko(
                    r ? "th" : "td",
                    { ref: n.elRef, role: "presentation" },
                    ko(
                        "div",
                        { className: "fc-scroller-harness" + (i ? " fc-scroller-harness-liquid" : "") },
                        ko(ks, { ref: this.scrollerRefs.createRef(u), elRef: this.scrollerElRefs.createRef(u), overflowY: a, overflowX: o.liquid ? "hidden" : "visible", maxHeight: e.maxHeight, liquid: i, liquidIsAbsolute: !0 }, l)
                    )
                );
            }),
            (Ys.prototype._handleScrollerEl = function (e, t) {
                t = (function (e, t) {
                    for (var n = 0, r = e; n < r.length; n++) {
                        var o = r[n];
                        if (o.key === t) return o;
                    }
                    return null;
                })(this.props.sections, t);
                t && Zo(t.chunk.scrollerElRef, e);
            }),
            (Ys.prototype.componentDidMount = function () {
                this.handleSizing(), this.context.addResizeHandler(this.handleSizing);
            }),
            (Ys.prototype.componentDidUpdate = function () {
                this.handleSizing();
            }),
            (Ys.prototype.componentWillUnmount = function () {
                this.context.removeResizeHandler(this.handleSizing);
            }),
            (Ys.prototype.computeShrinkWidth = function () {
                return Ws(this.props.cols) ? Ps(this.scrollerElRefs.getAll()) : 0;
            }),
            (Ys.prototype.computeScrollerDims = function () {
                var e = io(),
                    t = this.scrollerRefs,
                    n = this.scrollerElRefs,
                    r = !1,
                    o = {},
                    i = {};
                for (u in t.currentMap) {
                    var a = t.currentMap[u];
                    if (a && a.needsYScrolling()) {
                        r = !0;
                        break;
                    }
                }
                for (var s = 0, l = this.props.sections; s < l.length; s++) {
                    var u = l[s].key,
                        c = n.currentMap[u];
                    c && ((c = c.parentNode), (o[u] = Math.floor(c.getBoundingClientRect().width - (r ? e.y : 0))), (i[u] = Math.floor(c.getBoundingClientRect().height)));
                }
                return { forceYScrollbars: r, scrollerClientWidths: o, scrollerClientHeights: i };
            }),
            Ys);
    function Ys() {
        var e = (null !== Gs && Gs.apply(this, arguments)) || this;
        return (
            (e.processCols = Lt(function (e) {
                return e;
            }, As)),
            (e.renderMicroColGroup = Lt(Ls)),
            (e.scrollerRefs = new xs()),
            (e.scrollerElRefs = new xs(e._handleScrollerEl.bind(e))),
            (e.state = { shrinkWidth: null, forceYScrollbars: !1, scrollerClientWidths: {}, scrollerClientHeights: {} }),
            (e.handleSizing = function () {
                e.setState(I({ shrinkWidth: e.computeShrinkWidth() }, e.computeScrollerDims()));
            }),
            e
        );
    }
    qs.addStateEquality({ scrollerClientWidths: mt, scrollerClientHeights: mt });
    var Zs,
        Xs,
        Ks =
            (t(Qs, (Xs = jo)),
            (Qs.prototype.render = function () {
                var o = this.props,
                    e = this.context,
                    t = e.options,
                    n = o.seg,
                    r = n.eventRange,
                    i = r.ui,
                    a = {
                        event: new Er(e, r.def, r.instance),
                        view: e.viewApi,
                        timeText: o.timeText,
                        textColor: i.textColor,
                        backgroundColor: i.backgroundColor,
                        borderColor: i.borderColor,
                        isDraggable: !o.disableDragging && Kn(n, e),
                        isStartResizable: !o.disableResizing && $n(n, e),
                        isEndResizable: !o.disableResizing && Jn(n),
                        isMirror: Boolean(o.isDragging || o.isResizing || o.isDateSelecting),
                        isStart: Boolean(n.isStart),
                        isEnd: Boolean(n.isEnd),
                        isPast: Boolean(o.isPast),
                        isFuture: Boolean(o.isFuture),
                        isToday: Boolean(o.isToday),
                        isSelected: Boolean(o.isSelected),
                        isDragging: Boolean(o.isDragging),
                        isResizing: Boolean(o.isResizing),
                    },
                    s = tr(a).concat(i.classNames);
                return ko(ii, { hookProps: a, classNames: t.eventClassNames, content: t.eventContent, defaultContent: o.defaultContent, didMount: t.eventDidMount, willUnmount: t.eventWillUnmount, elRef: this.elRef }, function (e, t, n, r) {
                    return o.children(e, s.concat(t), n, r, a);
                });
            }),
            (Qs.prototype.componentDidMount = function () {
                jn(this.elRef.current, this.props.seg);
            }),
            (Qs.prototype.componentDidUpdate = function (e) {
                var t = this.props.seg;
                t !== e.seg && jn(this.elRef.current, t);
            }),
            Qs),
        $s =
            (t(Js, (Zs = jo)),
            (Js.prototype.render = function () {
                var i = this.props,
                    a = this.context,
                    s = i.seg,
                    e = a.options.eventTimeFormat || i.defaultTimeFormat,
                    e = Qn(s, e, a, i.defaultDisplayEventTime, i.defaultDisplayEventEnd);
                return ko(
                    Ks,
                    {
                        seg: s,
                        timeText: e,
                        disableDragging: i.disableDragging,
                        disableResizing: i.disableResizing,
                        defaultContent: i.defaultContent || el,
                        isDragging: i.isDragging,
                        isResizing: i.isResizing,
                        isDateSelecting: i.isDateSelecting,
                        isSelected: i.isSelected,
                        isPast: i.isPast,
                        isFuture: i.isFuture,
                        isToday: i.isToday,
                    },
                    function (e, t, n, r, o) {
                        return ko(
                            "a",
                            I({ className: i.extraClassNames.concat(t).join(" "), style: { borderColor: o.borderColor, backgroundColor: o.backgroundColor }, ref: e }, rr(s, a)),
                            ko("div", { className: "fc-event-main", ref: n, style: { color: o.textColor } }, r),
                            o.isStartResizable && ko("div", { className: "fc-event-resizer fc-event-resizer-start" }),
                            o.isEndResizable && ko("div", { className: "fc-event-resizer fc-event-resizer-end" })
                        );
                    }
                );
            }),
            Js);
    function Js() {
        return (null !== Zs && Zs.apply(this, arguments)) || this;
    }
    function Qs() {
        var e = (null !== Xs && Xs.apply(this, arguments)) || this;
        return (e.elRef = Mo()), e;
    }
    function el(e) {
        return ko(
            "div",
            { className: "fc-event-main-frame" },
            e.timeText && ko("div", { className: "fc-event-time" }, e.timeText),
            ko("div", { className: "fc-event-title-container" }, ko("div", { className: "fc-event-title fc-sticky" }, e.event.title || ko(Io, null, " ")))
        );
    }
    function tl(n) {
        return ko(Lo.Consumer, null, function (e) {
            var t = e.options,
                e = { isAxis: n.isAxis, date: e.dateEnv.toDate(n.date), view: e.viewApi };
            return ko(ii, { hookProps: e, classNames: t.nowIndicatorClassNames, content: t.nowIndicatorContent, didMount: t.nowIndicatorDidMount, willUnmount: t.nowIndicatorWillUnmount }, n.children);
        });
    }
    var nl,
        rl = tn({ day: "numeric" }),
        ol =
            (t(il, (nl = jo)),
            (il.prototype.render = function () {
                var e = this.props,
                    t = this.context,
                    n = t.options,
                    t = al({ date: e.date, dateProfile: e.dateProfile, todayRange: e.todayRange, showDayNumber: e.showDayNumber, extraProps: e.extraHookProps, viewApi: t.viewApi, dateEnv: t.dateEnv });
                return ko(li, { hookProps: t, content: n.dayCellContent, defaultContent: e.defaultContent }, e.children);
            }),
            il);
    function il() {
        return (null !== nl && nl.apply(this, arguments)) || this;
    }
    function al(e) {
        var t = e.date,
            n = e.dateEnv,
            r = $r(t, e.todayRange, null, e.dateProfile);
        return I(I(I({ date: n.toDate(t), view: e.viewApi }, r), { dayNumberText: e.showDayNumber ? n.format(t, rl) : "" }), e.extraProps);
    }
    var sl,
        ll =
            (t(ul, (sl = jo)),
            (ul.prototype.render = function () {
                var t = this.props,
                    e = this.context,
                    n = e.options,
                    r = this.refineHookProps({ date: t.date, dateProfile: t.dateProfile, todayRange: t.todayRange, showDayNumber: t.showDayNumber, extraProps: t.extraHookProps, viewApi: e.viewApi, dateEnv: e.dateEnv }),
                    o = Jr(r, e.theme).concat(r.isDisabled ? [] : this.normalizeClassNames(n.dayCellClassNames, r)),
                    i = r.isDisabled ? {} : { "data-date": Nt(t.date) };
                return ko(pi, { hookProps: r, didMount: n.dayCellDidMount, willUnmount: n.dayCellWillUnmount, elRef: t.elRef }, function (e) {
                    return t.children(e, o, i, r.isDisabled);
                });
            }),
            ul);
    function ul() {
        var e = (null !== sl && sl.apply(this, arguments)) || this;
        return (e.refineHookProps = Ut(al)), (e.normalizeClassNames = gi()), e;
    }
    function cl(e) {
        return ko("div", { className: "fc-" + e });
    }
    function dl(e) {
        return ko(
            Ks,
            { defaultContent: pl, seg: e.seg, timeText: "", disableDragging: !0, disableResizing: !0, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, isPast: e.isPast, isFuture: e.isFuture, isToday: e.isToday },
            function (e, t, n, r, o) {
                return ko("div", { ref: e, className: ["fc-bg-event"].concat(t).join(" "), style: { backgroundColor: o.backgroundColor } }, r);
            }
        );
    }
    function pl(e) {
        return e.event.title && ko("div", { className: "fc-event-title" }, e.event.title);
    }
    function fl(i) {
        return ko(Lo.Consumer, null, function (e) {
            var t = e.dateEnv,
                n = e.options,
                r = i.date,
                o = n.weekNumberFormat || i.defaultFormat,
                e = t.computeWeekNumber(r),
                o = t.format(r, o);
            return ko(ii, { hookProps: { num: e, text: o, date: r }, classNames: n.weekNumberClassNames, content: n.weekNumberContent, defaultContent: hl, didMount: n.weekNumberDidMount, willUnmount: n.weekNumberWillUnmount }, i.children);
        });
    }
    function hl(e) {
        return e.text;
    }
    var gl,
        vl,
        ml,
        yl =
            (t(Cl, (ml = jo)),
            (Cl.prototype.render = function () {
                var e = this.context,
                    t = e.theme,
                    n = e.options,
                    r = this.props,
                    o = this.state,
                    e = ["fc-popover", t.getClass("popover")].concat(r.extraClassNames || []);
                return No(
                    ko(
                        "div",
                        I({ id: r.id, className: e.join(" "), "aria-labelledby": o.titleId }, r.extraAttrs, { ref: this.handleRootEl }),
                        ko(
                            "div",
                            { className: "fc-popover-header " + t.getClass("popoverHeader") },
                            ko("span", { className: "fc-popover-title", id: o.titleId }, r.title),
                            ko("span", { className: "fc-popover-close " + t.getIconClass("close"), title: n.closeHint, onClick: this.handleCloseClick })
                        ),
                        ko("div", { className: "fc-popover-body " + t.getClass("popoverContent") }, r.children)
                    ),
                    r.parentEl
                );
            }),
            (Cl.prototype.componentDidMount = function () {
                document.addEventListener("mousedown", this.handleDocumentMouseDown), document.addEventListener("keydown", this.handleDocumentKeyDown), this.updateSize();
            }),
            (Cl.prototype.componentWillUnmount = function () {
                document.removeEventListener("mousedown", this.handleDocumentMouseDown), document.removeEventListener("keydown", this.handleDocumentKeyDown);
            }),
            (Cl.prototype.updateSize = function () {
                var e = this.context.isRtl,
                    t = this.props,
                    n = t.alignmentEl,
                    r = t.alignGridTop,
                    o = this.rootEl,
                    i = (function (e) {
                        for (var t = co(e), n = e.getBoundingClientRect(), r = 0, o = t; r < o.length; r++) {
                            var i = Br(n, o[r].getBoundingClientRect());
                            if (!i) return null;
                            n = i;
                        }
                        return n;
                    })(n);
                i &&
                    ((t = o.getBoundingClientRect()),
                    (n = (r ? he(n, ".fc-scrollgrid").getBoundingClientRect() : i).top),
                    (i = e ? i.right - t.width : i.left),
                    (n = Math.max(n, 10)),
                    (i = Math.min(i, document.documentElement.clientWidth - 10 - t.width)),
                    (i = Math.max(i, 10)),
                    (t = o.offsetParent.getBoundingClientRect()),
                    ye(o, { top: n - t.top, left: i - t.left }));
            }),
            Cl),
        El =
            (t(Dl, (vl = Ko)),
            (Dl.prototype.render = function () {
                var e = this.context,
                    t = e.options,
                    e = e.dateEnv,
                    r = this.props,
                    o = r.startDate,
                    i = r.todayRange,
                    a = r.dateProfile,
                    s = e.format(o, t.dayPopoverFormat);
                return ko(ll, { date: o, dateProfile: a, todayRange: i, elRef: this.handleRootEl }, function (e, t, n) {
                    return ko(
                        yl,
                        { elRef: e, id: r.id, title: s, extraClassNames: ["fc-more-popover"].concat(t), extraAttrs: n, parentEl: r.parentEl, alignmentEl: r.alignmentEl, alignGridTop: r.alignGridTop, onClose: r.onClose },
                        ko(ol, { date: o, dateProfile: a, todayRange: i }, function (e, t) {
                            return t && ko("div", { className: "fc-more-popover-misc", ref: e }, t);
                        }),
                        r.children
                    );
                });
            }),
            (Dl.prototype.queryHit = function (e, t, n, r) {
                var o = this.rootEl,
                    i = this.props;
                return 0 <= e && e < n && 0 <= t && t < r
                    ? { dateProfile: i.dateProfile, dateSpan: I({ allDay: !0, range: { start: i.startDate, end: i.endDate } }, i.extraDateSpan), dayEl: o, rect: { left: 0, top: 0, right: n, bottom: r }, layer: 1 }
                    : null;
            }),
            Dl),
        Sl =
            (t(bl, (gl = jo)),
            (bl.prototype.render = function () {
                var s = this,
                    l = this.props,
                    u = this.state;
                return ko(Lo.Consumer, null, function (e) {
                    var t = e.viewApi,
                        n = e.options,
                        r = e.calendarApi,
                        o = n.moreLinkText,
                        i = l.moreCnt,
                        e = Rl(l),
                        o = "function" == typeof o ? o.call(r, i) : "+" + i + " " + o,
                        a = ze(n.moreLinkHint, [i], o),
                        t = { num: i, shortText: "+" + i, text: o, view: t };
                    return ko(
                        Io,
                        null,
                        Boolean(l.moreCnt) &&
                            ko(
                                ii,
                                { elRef: s.linkElRef, hookProps: t, classNames: n.moreLinkClassNames, content: n.moreLinkContent, defaultContent: l.defaultContent || wl, didMount: n.moreLinkDidMount, willUnmount: n.moreLinkWillUnmount },
                                function (e, t, n, r) {
                                    return l.children(e, ["fc-more-link"].concat(t), n, r, s.handleClick, a, u.isPopoverOpen, u.isPopoverOpen ? u.popoverId : "");
                                }
                            ),
                        u.isPopoverOpen &&
                            ko(
                                El,
                                {
                                    id: u.popoverId,
                                    startDate: e.start,
                                    endDate: e.end,
                                    dateProfile: l.dateProfile,
                                    todayRange: l.todayRange,
                                    extraDateSpan: l.extraDateSpan,
                                    parentEl: s.parentEl,
                                    alignmentEl: l.alignmentElRef.current,
                                    alignGridTop: l.alignGridTop,
                                    onClose: s.handlePopoverClose,
                                },
                                l.popoverContent()
                            )
                    );
                });
            }),
            (bl.prototype.componentDidMount = function () {
                this.updateParentEl();
            }),
            (bl.prototype.componentDidUpdate = function () {
                this.updateParentEl();
            }),
            (bl.prototype.updateParentEl = function () {
                this.linkElRef.current && (this.parentEl = he(this.linkElRef.current, ".fc-view-harness"));
            }),
            bl);
    function bl() {
        var a = (null !== gl && gl.apply(this, arguments)) || this;
        return (
            (a.linkElRef = Mo()),
            (a.state = { isPopoverOpen: !1, popoverId: Ce() }),
            (a.handleClick = function (e) {
                var t = a.props,
                    o = a.context,
                    n = o.options.moreLinkClick,
                    r = Rl(t).start;
                function i(e) {
                    var t = e.eventRange,
                        n = t.def,
                        r = t.instance,
                        t = t.range;
                    return { event: new Er(o, n, r), start: o.dateEnv.toDate(t.start), end: o.dateEnv.toDate(t.end), isStart: e.isStart, isEnd: e.isEnd };
                }
                (n = "function" == typeof n ? n({ date: r, allDay: Boolean(t.allDayDate), allSegs: t.allSegs.map(i), hiddenSegs: t.hiddenSegs.map(i), jsEvent: e, view: o.viewApi }) : n) && "popover" !== n
                    ? "string" == typeof n && o.calendarApi.zoomTo(r, n)
                    : a.setState({ isPopoverOpen: !0 });
            }),
            (a.handlePopoverClose = function () {
                a.setState({ isPopoverOpen: !1 });
            }),
            a
        );
    }
    function Dl() {
        var t = (null !== vl && vl.apply(this, arguments)) || this;
        return (
            (t.handleRootEl = function (e) {
                (t.rootEl = e) ? t.context.registerInteractiveComponent(t, { el: e, useEventCenter: !1 }) : t.context.unregisterInteractiveComponent(t);
            }),
            t
        );
    }
    function Cl() {
        var t = (null !== ml && ml.apply(this, arguments)) || this;
        return (
            (t.state = { titleId: Ce() }),
            (t.handleRootEl = function (e) {
                (t.rootEl = e), t.props.elRef && Zo(t.props.elRef, e);
            }),
            (t.handleDocumentMouseDown = function (e) {
                e = Se(e);
                t.rootEl.contains(e) || t.handleCloseClick();
            }),
            (t.handleDocumentKeyDown = function (e) {
                "Escape" === e.key && t.handleCloseClick();
            }),
            (t.handleCloseClick = function () {
                var e = t.props.onClose;
                e && e();
            }),
            t
        );
    }
    function wl(e) {
        return e.text;
    }
    function Rl(e) {
        if (e.allDayDate) return { start: e.allDayDate, end: Xe(e.allDayDate, 1) };
        e = e.hiddenSegs;
        return { start: Tl(e), end: e.reduce(kl).eventRange.range.end };
    }
    function Tl(e) {
        return e.reduce(_l).eventRange.range.start;
    }
    function _l(e, t) {
        return e.eventRange.range.start < t.eventRange.range.start ? e : t;
    }
    function kl(e, t) {
        return e.eventRange.range.end > t.eventRange.range.end ? e : t;
    }
    var xl,
        Ml =
            (t(Il, (xl = yr)),
            Object.defineProperty(Il.prototype, "view", {
                get: function () {
                    return this.currentData.viewApi;
                },
                enumerable: !1,
                configurable: !0,
            }),
            (Il.prototype.render = function () {
                var e = this.isRendering;
                e ? (this.customContentRenderId += 1) : (this.isRendering = !0), this.renderRunner.request(), e && this.updateSize();
            }),
            (Il.prototype.destroy = function () {
                this.isRendering && ((this.isRendering = !1), this.renderRunner.request());
            }),
            (Il.prototype.updateSize = function () {
                xl.prototype.updateSize.call(this), Ho();
            }),
            (Il.prototype.batchRendering = function (e) {
                this.renderRunner.pause("batchRendering"), e(), this.renderRunner.resume("batchRendering");
            }),
            (Il.prototype.pauseRendering = function () {
                this.renderRunner.pause("pauseRendering");
            }),
            (Il.prototype.resumeRendering = function () {
                this.renderRunner.resume("pauseRendering", !0);
            }),
            (Il.prototype.resetOptions = function (e, t) {
                this.currentDataManager.resetOptions(e, t);
            }),
            (Il.prototype.setClassNames = function (e) {
                if (!At(e, this.currentClassNames)) {
                    for (var t = this.el.classList, n = 0, r = this.currentClassNames; n < r.length; n++) {
                        var o = r[n];
                        t.remove(o);
                    }
                    for (var i = 0, a = e; i < a.length; i++) (o = a[i]), t.add(o);
                    this.currentClassNames = e;
                }
            }),
            (Il.prototype.setHeight = function (e) {
                Ee(this.el, "height", e);
            }),
            Il);
    function Il(e, t) {
        void 0 === t && (t = {});
        var i = xl.call(this) || this;
        return (
            (i.isRendering = !1),
            (i.isRendered = !1),
            (i.currentClassNames = []),
            (i.customContentRenderId = 0),
            (i.handleAction = function (e) {
                switch (e.type) {
                    case "SET_EVENT_DRAG":
                    case "SET_EVENT_RESIZE":
                        i.renderRunner.tryDrain();
                }
            }),
            (i.handleData = function (e) {
                (i.currentData = e), i.renderRunner.request(e.calendarOptions.rerenderDelay);
            }),
            (i.handleRenderRequest = function () {
                var o;
                i.isRendering
                    ? ((i.isRendered = !0),
                      (o = i.currentData),
                      xo(
                          ko(Ya, { options: o.calendarOptions, theme: o.theme, emitter: o.emitter }, function (e, t, n, r) {
                              return i.setClassNames(e), i.setHeight(t), ko(ai.Provider, { value: i.customContentRenderId }, ko(La, I({ isHeightAuto: n, forPrint: r }, o)));
                          }),
                          i.el
                      ))
                    : i.isRendered && ((i.isRendered = !1), Oo(i.el), i.setClassNames([]), i.setHeight("")),
                    Ho();
            }),
            (i.el = e),
            (i.renderRunner = new Bi(i.handleRenderRequest)),
            new Yi({ optionOverrides: t, calendarApi: i, onAction: i.handleAction, onData: i.handleData }),
            i
        );
    }
    Da.touchMouseIgnoreWait = 500;
    var Pl = 0,
        Nl = 0,
        Hl = !1,
        Ol =
            ((Al.prototype.destroy = function () {
                this.containerEl.removeEventListener("mousedown", this.handleMouseDown),
                    this.containerEl.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }),
                    --Nl || window.removeEventListener("touchmove", Ll, { passive: !1 });
            }),
            (Al.prototype.tryStart = function (e) {
                var t = this.querySubjectEl(e),
                    e = e.target;
                return !(!t || (this.handleSelector && !he(e, this.handleSelector)) || ((this.subjectEl = t), (this.isDragging = !0), (this.wasTouchScroll = !1)));
            }),
            (Al.prototype.cleanup = function () {
                (Hl = !1), (this.isDragging = !1), (this.subjectEl = null), this.destroyScrollWatch();
            }),
            (Al.prototype.querySubjectEl = function (e) {
                return this.selector ? he(e.target, this.selector) : this.containerEl;
            }),
            (Al.prototype.shouldIgnoreMouse = function () {
                return Pl || this.isTouchDragging;
            }),
            (Al.prototype.cancelTouchScroll = function () {
                this.isDragging && (Hl = !0);
            }),
            (Al.prototype.initScrollWatch = function (e) {
                this.shouldWatchScroll && (this.recordCoords(e), window.addEventListener("scroll", this.handleScroll, !0));
            }),
            (Al.prototype.recordCoords = function (e) {
                this.shouldWatchScroll && ((this.prevPageX = e.pageX), (this.prevPageY = e.pageY), (this.prevScrollX = window.pageXOffset), (this.prevScrollY = window.pageYOffset));
            }),
            (Al.prototype.destroyScrollWatch = function () {
                this.shouldWatchScroll && window.removeEventListener("scroll", this.handleScroll, !0);
            }),
            (Al.prototype.createEventFromMouse = function (e, t) {
                var n = 0,
                    r = 0;
                return (
                    t ? ((this.origPageX = e.pageX), (this.origPageY = e.pageY)) : ((n = e.pageX - this.origPageX), (r = e.pageY - this.origPageY)),
                    { origEvent: e, isTouch: !1, subjectEl: this.subjectEl, pageX: e.pageX, pageY: e.pageY, deltaX: n, deltaY: r }
                );
            }),
            (Al.prototype.createEventFromTouch = function (e, t) {
                var n,
                    r = e.touches,
                    o = 0,
                    i = 0,
                    r = r && r.length ? ((n = r[0].pageX), r[0].pageY) : ((n = e.pageX), e.pageY);
                return t ? ((this.origPageX = n), (this.origPageY = r)) : ((o = n - this.origPageX), (i = r - this.origPageY)), { origEvent: e, isTouch: !0, subjectEl: this.subjectEl, pageX: n, pageY: r, deltaX: o, deltaY: i };
            }),
            Al);
    function Al(e) {
        var r = this;
        (this.subjectEl = null),
            (this.selector = ""),
            (this.handleSelector = ""),
            (this.shouldIgnoreMove = !1),
            (this.shouldWatchScroll = !0),
            (this.isDragging = !1),
            (this.isTouchDragging = !1),
            (this.wasTouchScroll = !1),
            (this.handleMouseDown = function (e) {
                r.shouldIgnoreMouse() ||
                    0 !== e.button ||
                    e.ctrlKey ||
                    !r.tryStart(e) ||
                    ((e = r.createEventFromMouse(e, !0)),
                    r.emitter.trigger("pointerdown", e),
                    r.initScrollWatch(e),
                    r.shouldIgnoreMove || document.addEventListener("mousemove", r.handleMouseMove),
                    document.addEventListener("mouseup", r.handleMouseUp));
            }),
            (this.handleMouseMove = function (e) {
                e = r.createEventFromMouse(e);
                r.recordCoords(e), r.emitter.trigger("pointermove", e);
            }),
            (this.handleMouseUp = function (e) {
                document.removeEventListener("mousemove", r.handleMouseMove), document.removeEventListener("mouseup", r.handleMouseUp), r.emitter.trigger("pointerup", r.createEventFromMouse(e)), r.cleanup();
            }),
            (this.handleTouchStart = function (e) {
                var t;
                r.tryStart(e) &&
                    ((r.isTouchDragging = !0),
                    (t = r.createEventFromTouch(e, !0)),
                    r.emitter.trigger("pointerdown", t),
                    r.initScrollWatch(t),
                    (e = e.target),
                    r.shouldIgnoreMove || e.addEventListener("touchmove", r.handleTouchMove),
                    e.addEventListener("touchend", r.handleTouchEnd),
                    e.addEventListener("touchcancel", r.handleTouchEnd),
                    window.addEventListener("scroll", r.handleTouchScroll, !0));
            }),
            (this.handleTouchMove = function (e) {
                e = r.createEventFromTouch(e);
                r.recordCoords(e), r.emitter.trigger("pointermove", e);
            }),
            (this.handleTouchEnd = function (e) {
                var t;
                r.isDragging &&
                    ((t = e.target).removeEventListener("touchmove", r.handleTouchMove),
                    t.removeEventListener("touchend", r.handleTouchEnd),
                    t.removeEventListener("touchcancel", r.handleTouchEnd),
                    window.removeEventListener("scroll", r.handleTouchScroll, !0),
                    r.emitter.trigger("pointerup", r.createEventFromTouch(e)),
                    r.cleanup(),
                    (r.isTouchDragging = !1),
                    (Pl += 1),
                    setTimeout(function () {
                        --Pl;
                    }, Da.touchMouseIgnoreWait));
            }),
            (this.handleTouchScroll = function () {
                r.wasTouchScroll = !0;
            }),
            (this.handleScroll = function (e) {
                var t, n;
                r.shouldIgnoreMove ||
                    ((t = window.pageXOffset - r.prevScrollX + r.prevPageX),
                    (n = window.pageYOffset - r.prevScrollY + r.prevPageY),
                    r.emitter.trigger("pointermove", { origEvent: e, isTouch: r.isTouchDragging, subjectEl: r.subjectEl, pageX: t, pageY: n, deltaX: t - r.origPageX, deltaY: n - r.origPageY }));
            }),
            (this.containerEl = e),
            (this.emitter = new fo()),
            e.addEventListener("mousedown", this.handleMouseDown),
            e.addEventListener("touchstart", this.handleTouchStart, { passive: !0 }),
            1 === (Nl += 1) && window.addEventListener("touchmove", Ll, { passive: !1 });
    }
    function Ll(e) {
        Hl && e.preventDefault();
    }
    var Ul,
        Wl,
        Vl,
        Fl,
        Bl =
            ((nu.prototype.start = function (e, t, n) {
                (this.sourceEl = e),
                    (this.sourceElRect = this.sourceEl.getBoundingClientRect()),
                    (this.origScreenX = t - window.pageXOffset),
                    (this.origScreenY = n - window.pageYOffset),
                    (this.deltaX = 0),
                    (this.deltaY = 0),
                    this.updateElPosition();
            }),
            (nu.prototype.handleMove = function (e, t) {
                (this.deltaX = e - window.pageXOffset - this.origScreenX), (this.deltaY = t - window.pageYOffset - this.origScreenY), this.updateElPosition();
            }),
            (nu.prototype.setIsVisible = function (e) {
                e ? this.isVisible || (this.mirrorEl && (this.mirrorEl.style.display = ""), (this.isVisible = e), this.updateElPosition()) : this.isVisible && (this.mirrorEl && (this.mirrorEl.style.display = "none"), (this.isVisible = e));
            }),
            (nu.prototype.stop = function (e, t) {
                function n() {
                    r.cleanup(), t();
                }
                var r = this;
                e && this.mirrorEl && this.isVisible && this.revertDuration && (this.deltaX || this.deltaY) ? this.doRevertAnimation(n, this.revertDuration) : setTimeout(n, 0);
            }),
            (nu.prototype.doRevertAnimation = function (e, t) {
                var n = this.mirrorEl,
                    r = this.sourceEl.getBoundingClientRect();
                (n.style.transition = "top " + t + "ms,left " + t + "ms"),
                    ye(n, { left: r.left, top: r.top }),
                    _e(n, function () {
                        (n.style.transition = ""), e();
                    });
            }),
            (nu.prototype.cleanup = function () {
                this.mirrorEl && (fe(this.mirrorEl), (this.mirrorEl = null)), (this.sourceEl = null);
            }),
            (nu.prototype.updateElPosition = function () {
                this.sourceEl && this.isVisible && ye(this.getMirrorEl(), { left: this.sourceElRect.left + this.deltaX, top: this.sourceElRect.top + this.deltaY });
            }),
            (nu.prototype.getMirrorEl = function () {
                var e = this.sourceElRect,
                    t = this.mirrorEl;
                return (
                    t ||
                        ((t = this.mirrorEl = this.sourceEl.cloneNode(!0)).classList.add("fc-unselectable"),
                        t.classList.add("fc-event-dragging"),
                        ye(t, { position: "fixed", zIndex: this.zIndex, visibility: "", boxSizing: "border-box", width: e.right - e.left, height: e.bottom - e.top, right: "auto", bottom: "auto", margin: 0 }),
                        this.parentNode.appendChild(t)),
                    t
                );
            }),
            nu),
        zl =
            (t(tu, (Fl = yo)),
            (tu.prototype.destroy = function () {
                this.doesListening && this.getEventTarget().removeEventListener("scroll", this.handleScroll);
            }),
            (tu.prototype.getScrollTop = function () {
                return this.scrollTop;
            }),
            (tu.prototype.getScrollLeft = function () {
                return this.scrollLeft;
            }),
            (tu.prototype.setScrollTop = function (e) {
                this.scrollController.setScrollTop(e), this.doesListening || ((this.scrollTop = Math.max(Math.min(e, this.getMaxScrollTop()), 0)), this.handleScrollChange());
            }),
            (tu.prototype.setScrollLeft = function (e) {
                this.scrollController.setScrollLeft(e), this.doesListening || ((this.scrollLeft = Math.max(Math.min(e, this.getMaxScrollLeft()), 0)), this.handleScrollChange());
            }),
            (tu.prototype.getClientWidth = function () {
                return this.clientWidth;
            }),
            (tu.prototype.getClientHeight = function () {
                return this.clientHeight;
            }),
            (tu.prototype.getScrollWidth = function () {
                return this.scrollWidth;
            }),
            (tu.prototype.getScrollHeight = function () {
                return this.scrollHeight;
            }),
            (tu.prototype.handleScrollChange = function () {}),
            tu),
        jl =
            (t(eu, (Vl = zl)),
            (eu.prototype.getEventTarget = function () {
                return this.scrollController.el;
            }),
            (eu.prototype.computeClientRect = function () {
                return lo(this.scrollController.el);
            }),
            eu),
        Gl =
            (t(Ql, (Wl = zl)),
            (Ql.prototype.getEventTarget = function () {
                return window;
            }),
            (Ql.prototype.computeClientRect = function () {
                return { left: this.scrollLeft, right: this.scrollLeft + this.clientWidth, top: this.scrollTop, bottom: this.scrollTop + this.clientHeight };
            }),
            (Ql.prototype.handleScrollChange = function () {
                this.clientRect = this.computeClientRect();
            }),
            Ql),
        ql = ("function" == typeof performance ? performance : Date).now,
        Yl =
            ((Jl.prototype.start = function (e, t, n) {
                this.isEnabled &&
                    ((this.scrollCaches = this.buildCaches(n)),
                    (this.pointerScreenX = null),
                    (this.pointerScreenY = null),
                    (this.everMovedUp = !1),
                    (this.everMovedDown = !1),
                    (this.everMovedLeft = !1),
                    (this.everMovedRight = !1),
                    this.handleMove(e, t));
            }),
            (Jl.prototype.handleMove = function (e, t) {
                var n, r;
                this.isEnabled &&
                    ((n = e - window.pageXOffset),
                    (r = t - window.pageYOffset),
                    (e = null === this.pointerScreenY ? 0 : r - this.pointerScreenY),
                    (t = null === this.pointerScreenX ? 0 : n - this.pointerScreenX),
                    e < 0 ? (this.everMovedUp = !0) : 0 < e && (this.everMovedDown = !0),
                    t < 0 ? (this.everMovedLeft = !0) : 0 < t && (this.everMovedRight = !0),
                    (this.pointerScreenX = n),
                    (this.pointerScreenY = r),
                    this.isAnimating || ((this.isAnimating = !0), this.requestAnimation(ql())));
            }),
            (Jl.prototype.stop = function () {
                if (this.isEnabled) {
                    this.isAnimating = !1;
                    for (var e = 0, t = this.scrollCaches; e < t.length; e++) t[e].destroy();
                    this.scrollCaches = null;
                }
            }),
            (Jl.prototype.requestAnimation = function (e) {
                (this.msSinceRequest = e), requestAnimationFrame(this.animate);
            }),
            (Jl.prototype.handleSide = function (e, t) {
                var n = e.scrollCache,
                    r = this.edgeThreshold,
                    o = r - e.distance,
                    i = ((o * o) / (r * r)) * this.maxVelocity * t,
                    a = 1;
                switch (e.name) {
                    case "left":
                        a = -1;
                    case "right":
                        n.setScrollLeft(n.getScrollLeft() + i * a);
                        break;
                    case "top":
                        a = -1;
                    case "bottom":
                        n.setScrollTop(n.getScrollTop() + i * a);
                }
            }),
            (Jl.prototype.computeBestEdge = function (e, t) {
                for (var n = this.edgeThreshold, r = null, o = 0, i = this.scrollCaches; o < i.length; o++) {
                    var a = i[o],
                        s = a.clientRect,
                        l = e - s.left,
                        u = s.right - e,
                        c = t - s.top,
                        s = s.bottom - t;
                    0 <= l &&
                        0 <= u &&
                        0 <= c &&
                        0 <= s &&
                        (c <= n && this.everMovedUp && a.canScrollUp() && (!r || r.distance > c) && (r = { scrollCache: a, name: "top", distance: c }),
                        s <= n && this.everMovedDown && a.canScrollDown() && (!r || r.distance > s) && (r = { scrollCache: a, name: "bottom", distance: s }),
                        l <= n && this.everMovedLeft && a.canScrollLeft() && (!r || r.distance > l) && (r = { scrollCache: a, name: "left", distance: l }),
                        u <= n && this.everMovedRight && a.canScrollRight() && (!r || r.distance > u) && (r = { scrollCache: a, name: "right", distance: u }));
                }
                return r;
            }),
            (Jl.prototype.buildCaches = function (e) {
                return this.queryScrollEls(e).map(function (e) {
                    return e === window ? new Gl(!1) : new jl(e, !1);
                });
            }),
            (Jl.prototype.queryScrollEls = function (e) {
                for (var t = [], n = 0, r = this.scrollQuery; n < r.length; n++) {
                    var o = r[n];
                    "object" == typeof o ? t.push(o) : t.push.apply(t, Array.prototype.slice.call(be(e).querySelectorAll(o)));
                }
                return t;
            }),
            Jl),
        Zl =
            (t($l, (Ul = ba)),
            ($l.prototype.destroy = function () {
                this.pointer.destroy(), this.onPointerUp({});
            }),
            ($l.prototype.startDelay = function (e) {
                var t = this;
                "number" == typeof this.delay
                    ? (this.delayTimeoutId = setTimeout(function () {
                          (t.delayTimeoutId = null), t.handleDelayEnd(e);
                      }, this.delay))
                    : this.handleDelayEnd(e);
            }),
            ($l.prototype.handleDelayEnd = function (e) {
                (this.isDelayEnded = !0), this.tryStartDrag(e);
            }),
            ($l.prototype.handleDistanceSurpassed = function (e) {
                (this.isDistanceSurpassed = !0), this.tryStartDrag(e);
            }),
            ($l.prototype.tryStartDrag = function (e) {
                this.isDelayEnded &&
                    this.isDistanceSurpassed &&
                    ((this.pointer.wasTouchScroll && !this.touchScrollAllowed) ||
                        ((this.isDragging = !0),
                        (this.mirrorNeedsRevert = !1),
                        this.autoScroller.start(e.pageX, e.pageY, this.containerEl),
                        this.emitter.trigger("dragstart", e),
                        !1 === this.touchScrollAllowed && this.pointer.cancelTouchScroll()));
            }),
            ($l.prototype.tryStopDrag = function (e) {
                this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, e));
            }),
            ($l.prototype.stopDrag = function (e) {
                (this.isDragging = !1), this.emitter.trigger("dragend", e);
            }),
            ($l.prototype.setIgnoreMove = function (e) {
                this.pointer.shouldIgnoreMove = e;
            }),
            ($l.prototype.setMirrorIsVisible = function (e) {
                this.mirror.setIsVisible(e);
            }),
            ($l.prototype.setMirrorNeedsRevert = function (e) {
                this.mirrorNeedsRevert = e;
            }),
            ($l.prototype.setAutoScrollEnabled = function (e) {
                this.autoScroller.isEnabled = e;
            }),
            $l),
        Xl =
            ((Kl.prototype.destroy = function () {
                for (var e = 0, t = this.scrollCaches; e < t.length; e++) t[e].destroy();
            }),
            (Kl.prototype.computeLeft = function () {
                for (var e = this.origRect.left, t = 0, n = this.scrollCaches; t < n.length; t++) {
                    var r = n[t];
                    e += r.origScrollLeft - r.getScrollLeft();
                }
                return e;
            }),
            (Kl.prototype.computeTop = function () {
                for (var e = this.origRect.top, t = 0, n = this.scrollCaches; t < n.length; t++) {
                    var r = n[t];
                    e += r.origScrollTop - r.getScrollTop();
                }
                return e;
            }),
            (Kl.prototype.isWithinClipping = function (e, t) {
                for (var n = { left: e, top: t }, r = 0, o = this.scrollCaches; r < o.length; r++) {
                    var i,
                        a = o[r];
                    if ("HTML" !== (i = a.getEventTarget().tagName) && "BODY" !== i && !Fr(n, a.clientRect)) return !1;
                }
                return !0;
            }),
            Kl);
    function Kl(e) {
        (this.origRect = uo(e)),
            (this.scrollCaches = co(e).map(function (e) {
                return new jl(e, !0);
            }));
    }
    function $l(e, t) {
        var n = Ul.call(this, e) || this;
        (n.containerEl = e),
            (n.delay = null),
            (n.minDistance = 0),
            (n.touchScrollAllowed = !0),
            (n.mirrorNeedsRevert = !1),
            (n.isInteracting = !1),
            (n.isDragging = !1),
            (n.isDelayEnded = !1),
            (n.isDistanceSurpassed = !1),
            (n.delayTimeoutId = null),
            (n.onPointerDown = function (e) {
                n.isDragging ||
                    ((n.isInteracting = !0),
                    (n.isDelayEnded = !1),
                    (n.isDistanceSurpassed = !1),
                    He(document.body),
                    Ae(document.body),
                    e.isTouch || e.origEvent.preventDefault(),
                    n.emitter.trigger("pointerdown", e),
                    n.isInteracting && !n.pointer.shouldIgnoreMove && (n.mirror.setIsVisible(!1), n.mirror.start(e.subjectEl, e.pageX, e.pageY), n.startDelay(e), n.minDistance || n.handleDistanceSurpassed(e)));
            }),
            (n.onPointerMove = function (e) {
                var t;
                n.isInteracting &&
                    (n.emitter.trigger("pointermove", e),
                    n.isDistanceSurpassed || ((t = n.minDistance) * t <= (t = e.deltaX) * t + (t = e.deltaY) * t && n.handleDistanceSurpassed(e)),
                    n.isDragging && ("scroll" !== e.origEvent.type && (n.mirror.handleMove(e.pageX, e.pageY), n.autoScroller.handleMove(e.pageX, e.pageY)), n.emitter.trigger("dragmove", e)));
            }),
            (n.onPointerUp = function (e) {
                n.isInteracting &&
                    ((n.isInteracting = !1),
                    Oe(document.body),
                    Le(document.body),
                    n.emitter.trigger("pointerup", e),
                    n.isDragging && (n.autoScroller.stop(), n.tryStopDrag(e)),
                    n.delayTimeoutId && (clearTimeout(n.delayTimeoutId), (n.delayTimeoutId = null)));
            });
        e = n.pointer = new Ol(e);
        return e.emitter.on("pointerdown", n.onPointerDown), e.emitter.on("pointermove", n.onPointerMove), e.emitter.on("pointerup", n.onPointerUp), t && (e.selector = t), (n.mirror = new Bl()), (n.autoScroller = new Yl()), n;
    }
    function Jl() {
        var n = this;
        (this.isEnabled = !0),
            (this.scrollQuery = [window, ".fc-scroller"]),
            (this.edgeThreshold = 50),
            (this.maxVelocity = 300),
            (this.pointerScreenX = null),
            (this.pointerScreenY = null),
            (this.isAnimating = !1),
            (this.scrollCaches = null),
            (this.everMovedUp = !1),
            (this.everMovedDown = !1),
            (this.everMovedLeft = !1),
            (this.everMovedRight = !1),
            (this.animate = function () {
                var e, t;
                n.isAnimating &&
                    ((e = n.computeBestEdge(n.pointerScreenX + window.pageXOffset, n.pointerScreenY + window.pageYOffset)) ? ((t = ql()), n.handleSide(e, (t - n.msSinceRequest) / 1e3), n.requestAnimation(t)) : (n.isAnimating = !1));
            });
    }
    function Ql(e) {
        return Wl.call(this, new So(), e) || this;
    }
    function eu(e, t) {
        return Vl.call(this, new Eo(e), t) || this;
    }
    function tu(e, t) {
        var n = Fl.call(this) || this;
        return (
            (n.handleScroll = function () {
                (n.scrollTop = n.scrollController.getScrollTop()), (n.scrollLeft = n.scrollController.getScrollLeft()), n.handleScrollChange();
            }),
            (n.scrollController = e),
            (n.doesListening = t),
            (n.scrollTop = n.origScrollTop = e.getScrollTop()),
            (n.scrollLeft = n.origScrollLeft = e.getScrollLeft()),
            (n.scrollWidth = e.getScrollWidth()),
            (n.scrollHeight = e.getScrollHeight()),
            (n.clientWidth = e.getClientWidth()),
            (n.clientHeight = e.getClientHeight()),
            (n.clientRect = n.computeClientRect()),
            n.doesListening && n.getEventTarget().addEventListener("scroll", n.handleScroll),
            n
        );
    }
    function nu() {
        (this.isVisible = !1), (this.sourceEl = null), (this.mirrorEl = null), (this.sourceElRect = null), (this.parentNode = document.body), (this.zIndex = 9999), (this.revertDuration = 0);
    }
    var ru =
        ((ou.prototype.processFirstCoord = function (e) {
            var t,
                n = { left: e.pageX, top: e.pageY },
                r = n,
                e = e.subjectEl;
            e instanceof HTMLElement && (r = zr(r, (t = uo(e))));
            e = this.initialHit = this.queryHitForOffset(r.left, r.top);
            e ? (this.useSubjectCenter && t && (e = Br(t, e.rect)) && (r = jr(e)), (this.coordAdjust = Gr(r, n))) : (this.coordAdjust = { left: 0, top: 0 });
        }),
        (ou.prototype.handleMove = function (e, t) {
            var n = this.queryHitForOffset(e.pageX + this.coordAdjust.left, e.pageY + this.coordAdjust.top);
            (!t && iu(this.movingHit, n)) || ((this.movingHit = n), this.emitter.trigger("hitupdate", n, !1, e));
        }),
        (ou.prototype.prepareHits = function () {
            this.offsetTrackers = ht(this.droppableStore, function (e) {
                return e.component.prepareHits(), new Xl(e.el);
            });
        }),
        (ou.prototype.releaseHits = function () {
            var e,
                t = this.offsetTrackers;
            for (e in t) t[e].destroy();
            this.offsetTrackers = {};
        }),
        (ou.prototype.queryHitForOffset = function (e, t) {
            var n,
                r = this.droppableStore,
                o = this.offsetTrackers,
                i = null;
            for (n in r) {
                var a,
                    s,
                    l,
                    u,
                    c,
                    d = r[n].component,
                    p = o[n];
                p &&
                    p.isWithinClipping(e, t) &&
                    ((a = p.computeLeft()),
                    (l = t - (s = p.computeTop())),
                    (c = (u = p.origRect).right - u.left),
                    (p = u.bottom - u.top),
                    0 <= (u = e - a) &&
                        u < c &&
                        0 <= l &&
                        l < p &&
                        (p = d.queryHit(u, l, c, p)) &&
                        Vn(p.dateProfile.activeRange, p.dateSpan.range) &&
                        (!i || p.layer > i.layer) &&
                        ((p.componentId = n), (p.context = d.context), (p.rect.left += a), (p.rect.right += a), (p.rect.top += s), (p.rect.bottom += s), (i = p)));
            }
            return i;
        }),
        ou);
    function ou(e, t) {
        var n = this;
        (this.useSubjectCenter = !1),
            (this.requireInitial = !0),
            (this.initialHit = null),
            (this.movingHit = null),
            (this.finalHit = null),
            (this.handlePointerDown = function (e) {
                var t = n.dragging;
                (n.initialHit = null), (n.movingHit = null), (n.finalHit = null), n.prepareHits(), n.processFirstCoord(e), n.initialHit || !n.requireInitial ? (t.setIgnoreMove(!1), n.emitter.trigger("pointerdown", e)) : t.setIgnoreMove(!0);
            }),
            (this.handleDragStart = function (e) {
                n.emitter.trigger("dragstart", e), n.handleMove(e, !0);
            }),
            (this.handleDragMove = function (e) {
                n.emitter.trigger("dragmove", e), n.handleMove(e);
            }),
            (this.handlePointerUp = function (e) {
                n.releaseHits(), n.emitter.trigger("pointerup", e);
            }),
            (this.handleDragEnd = function (e) {
                n.movingHit && n.emitter.trigger("hitupdate", null, !0, e), (n.finalHit = n.movingHit), (n.movingHit = null), n.emitter.trigger("dragend", e);
            }),
            (this.droppableStore = t),
            e.emitter.on("pointerdown", this.handlePointerDown),
            e.emitter.on("dragstart", this.handleDragStart),
            e.emitter.on("dragmove", this.handleDragMove),
            e.emitter.on("pointerup", this.handlePointerUp),
            e.emitter.on("dragend", this.handleDragEnd),
            (this.dragging = e),
            (this.emitter = new fo());
    }
    function iu(e, t) {
        return (!e && !t) || (Boolean(e) === Boolean(t) && ir(e.dateSpan, t.dateSpan));
    }
    function au(e, t) {
        for (var n, r, o = {}, i = 0, a = t.pluginHooks.datePointTransforms; i < a.length; i++) {
            var s = a[i];
            I(o, s(e, t));
        }
        return I(o, { date: (r = t.dateEnv).toDate((n = e).range.start), dateStr: r.formatIso(n.range.start, { omitTime: n.allDay }), allDay: n.allDay }), o;
    }
    var su,
        lu,
        uu =
            (t(pu, (lu = ma)),
            (pu.prototype.destroy = function () {
                this.dragging.destroy();
            }),
            pu),
        cu =
            (t(du, (su = ma)),
            (du.prototype.destroy = function () {
                this.dragging.destroy();
            }),
            du);
    function du(e) {
        var a = su.call(this, e) || this;
        (a.dragSelection = null),
            (a.handlePointerDown = function (e) {
                var t = a.component,
                    n = a.dragging,
                    r = t.context.options.selectable && t.isValidDateDownEl(e.origEvent.target);
                n.setIgnoreMove(!r), (n.delay = e.isTouch ? ((e = t.context.options), (t = null == (t = e.selectLongPressDelay) ? e.longPressDelay : t)) : null);
            }),
            (a.handleDragStart = function (e) {
                a.component.context.calendarApi.unselect(e);
            }),
            (a.handleHitUpdate = function (e, t) {
                var n,
                    r = a.component.context,
                    o = null,
                    i = !1;
                e &&
                    ((n = a.hitDragging.initialHit),
                    ((o =
                        e.componentId !== n.componentId || !a.isHitComboAllowed || a.isHitComboAllowed(n, e)
                            ? (function (e, t, n) {
                                  var r = e.dateSpan,
                                      o = t.dateSpan,
                                      o = [r.range.start, r.range.end, o.range.start, o.range.end];
                                  o.sort(je);
                                  for (var i = {}, a = 0, s = n; a < s.length; a++) {
                                      var l = (0, s[a])(e, t);
                                      if (!1 === l) return null;
                                      l && I(i, l);
                                  }
                                  return (i.range = { start: o[0], end: o[3] }), (i.allDay = r.allDay), i;
                              })(n, e, r.pluginHooks.dateSelectionTransformers)
                            : o) &&
                        bs(o, e.dateProfile, r)) ||
                        ((i = !0), (o = null))),
                    o ? r.dispatch({ type: "SELECT_DATES", selection: o }) : t || r.dispatch({ type: "UNSELECT_DATES" }),
                    (i ? Pe : Ne)(),
                    t || (a.dragSelection = o);
            }),
            (a.handlePointerUp = function (e) {
                a.dragSelection && (lr(a.dragSelection, e, a.component.context), (a.dragSelection = null));
            });
        var t = e.component.context.options,
            n = (a.dragging = new Zl(e.el));
        (n.touchScrollAllowed = !1), (n.minDistance = t.selectMinDistance || 0), (n.autoScroller.isEnabled = t.dragScroll);
        e = a.hitDragging = new ru(a.dragging, Ea(e));
        return e.emitter.on("pointerdown", a.handlePointerDown), e.emitter.on("dragstart", a.handleDragStart), e.emitter.on("hitupdate", a.handleHitUpdate), e.emitter.on("pointerup", a.handlePointerUp), a;
    }
    function pu(e) {
        var o = lu.call(this, e) || this;
        (o.handlePointerDown = function (e) {
            var t = o.dragging,
                e = e.origEvent.target;
            t.setIgnoreMove(!o.component.isValidDateDownEl(e));
        }),
            (o.handleDragEnd = function (e) {
                var t,
                    n,
                    r = o.component;
                o.dragging.pointer.wasTouchScroll ||
                    ((t = (n = o.hitDragging).initialHit),
                    (n = n.finalHit),
                    t && n && iu(t, n) && ((r = r.context), (e = I(I({}, au(t.dateSpan, r)), { dayEl: t.dayEl, jsEvent: e.origEvent, view: r.viewApi || r.calendarApi.view })), r.emitter.trigger("dateClick", e)));
            }),
            (o.dragging = new Zl(e.el)),
            (o.dragging.autoScroller.isEnabled = !1);
        e = o.hitDragging = new ru(o.dragging, Ea(e));
        return e.emitter.on("pointerdown", o.handlePointerDown), e.emitter.on("dragend", o.handleDragEnd), o;
    }
    var fu,
        hu =
            (t(gu, (fu = ma)),
            (gu.prototype.destroy = function () {
                this.dragging.destroy();
            }),
            (gu.prototype.displayDrag = function (e, t) {
                var n = this.component.context,
                    r = this.receivingContext;
                r && r !== e && (r === n ? r.dispatch({ type: "SET_EVENT_DRAG", state: { affectedEvents: t.affectedEvents, mutatedEvents: { defs: {}, instances: {} }, isEvent: !0 } }) : r.dispatch({ type: "UNSET_EVENT_DRAG" })),
                    e && e.dispatch({ type: "SET_EVENT_DRAG", state: t });
            }),
            (gu.prototype.clearDrag = function () {
                var e = this.component.context,
                    t = this.receivingContext;
                t && t.dispatch({ type: "UNSET_EVENT_DRAG" }), e !== t && e.dispatch({ type: "UNSET_EVENT_DRAG" });
            }),
            (gu.prototype.cleanup = function () {
                (this.subjectSeg = null), (this.isDragging = !1), (this.eventRange = null), (this.relevantEvents = null), (this.receivingContext = null), (this.validMutation = null), (this.mutatedRelevantEvents = null);
            }),
            (gu.SELECTOR = ".fc-event-draggable, .fc-event-resizable"),
            gu);
    function gu(e) {
        var v = fu.call(this, e) || this;
        (v.subjectEl = null),
            (v.subjectSeg = null),
            (v.isDragging = !1),
            (v.eventRange = null),
            (v.relevantEvents = null),
            (v.receivingContext = null),
            (v.validMutation = null),
            (v.mutatedRelevantEvents = null),
            (v.handlePointerDown = function (e) {
                var t = e.origEvent.target,
                    n = v.component,
                    r = v.dragging,
                    o = r.mirror,
                    i = n.context.options,
                    a = n.context;
                v.subjectEl = e.subjectEl;
                var s = (v.subjectSeg = Gn(e.subjectEl)),
                    s = (v.eventRange = s.eventRange).instance.instanceId;
                (v.relevantEvents = gn(a.getCurrentData().eventStore, s)),
                    (r.minDistance = e.isTouch ? 0 : i.eventDragMinDistance),
                    (r.delay = e.isTouch && s !== n.props.eventSelection ? ((a = n.context.options), (s = null == (s = a.eventLongPressDelay) ? a.longPressDelay : s)) : null),
                    i.fixedMirrorParent ? (o.parentNode = i.fixedMirrorParent) : (o.parentNode = he(t, ".fc")),
                    (o.revertDuration = i.dragRevertDuration);
                t = n.isValidSegDownEl(t) && !he(t, ".fc-event-resizer");
                r.setIgnoreMove(!t), (v.isDragging = t && e.subjectEl.classList.contains("fc-event-draggable"));
            }),
            (v.handleDragStart = function (e) {
                var t = v.component.context,
                    n = v.eventRange,
                    r = n.instance.instanceId;
                e.isTouch ? r !== v.component.props.eventSelection && t.dispatch({ type: "SELECT_EVENT", eventInstanceId: r }) : t.dispatch({ type: "UNSELECT_EVENT" }),
                    v.isDragging && (t.calendarApi.unselect(e), t.emitter.trigger("eventDragStart", { el: v.subjectEl, event: new Er(t, n.def, n.instance), jsEvent: e.origEvent, view: t.viewApi }));
            }),
            (v.handleHitUpdate = function (e, t) {
                var n, r, o, i, a, s, l, u, c;
                v.isDragging &&
                    ((n = v.relevantEvents),
                    (r = v.hitDragging.initialHit),
                    (o = v.component.context),
                    (s = a = i = null),
                    (u = { affectedEvents: n, mutatedEvents: { defs: {}, instances: {} }, isEvent: !(l = !1) }),
                    e &&
                        ((c = (i = e.context).options),
                        o === i || (c.editable && c.droppable)
                            ? (a = (function (e, t, n) {
                                  var r = e.dateSpan,
                                      o = t.dateSpan,
                                      i = r.range.start,
                                      a = o.range.start,
                                      s = {};
                                  r.allDay !== o.allDay && ((s.allDay = o.allDay), (s.hasEnd = t.context.options.allDayMaintainDuration), o.allDay && (i = nt(i)));
                                  a = Hn(i, a, e.context.dateEnv, e.componentId === t.componentId ? e.largeUnit : null);
                                  a.milliseconds && (s.allDay = !1);
                                  for (var l = { datesDelta: a, standardProps: s }, u = 0, c = n; u < c.length; u++) (0, c[u])(l, e, t);
                                  return l;
                              })(r, e, i.getCurrentData().pluginHooks.eventDragMutationMassagers)) &&
                              ((s = dr(n, i.getCurrentData().eventUiBases, a, i)), (u.mutatedEvents = s), Ss(u, e.dateProfile, i) || ((l = !0), (s = a = null), (u.mutatedEvents = { defs: {}, instances: {} })))
                            : (i = null)),
                    v.displayDrag(i, u),
                    (l ? Pe : Ne)(),
                    t ||
                        (o === i && iu(r, e) && (a = null),
                        v.dragging.setMirrorNeedsRevert(!a),
                        v.dragging.setMirrorIsVisible(!e || !be(v.subjectEl).querySelector(".fc-event-mirror")),
                        (v.receivingContext = i),
                        (v.validMutation = a),
                        (v.mutatedRelevantEvents = s)));
            }),
            (v.handlePointerUp = function () {
                v.isDragging || v.cleanup();
            }),
            (v.handleDragEnd = function (e) {
                if (v.isDragging) {
                    var t = v.component.context,
                        n = t.viewApi,
                        r = v.receivingContext,
                        o = v.validMutation,
                        i = v.eventRange.def,
                        a = v.eventRange.instance,
                        s = new Er(t, i, a),
                        l = v.relevantEvents,
                        u = v.mutatedRelevantEvents,
                        c = v.hitDragging.finalHit;
                    if ((v.clearDrag(), t.emitter.trigger("eventDragStop", { el: v.subjectEl, event: s, jsEvent: e.origEvent, view: n }), o))
                        if (r === t) {
                            var d = new Er(t, u.defs[i.defId], a ? u.instances[a.instanceId] : null);
                            t.dispatch({ type: "MERGE_EVENTS", eventStore: u });
                            for (
                                var d = {
                                        oldEvent: s,
                                        event: d,
                                        relatedEvents: Cr(u, t, a),
                                        revert: function () {
                                            t.dispatch({ type: "MERGE_EVENTS", eventStore: l });
                                        },
                                    },
                                    p = {},
                                    f = 0,
                                    h = t.getCurrentData().pluginHooks.eventDropTransformers;
                                f < h.length;
                                f++
                            ) {
                                var g = h[f];
                                I(p, g(o, t));
                            }
                            t.emitter.trigger("eventDrop", I(I(I({}, d), p), { el: e.subjectEl, delta: o.datesDelta, jsEvent: e.origEvent, view: n })), t.emitter.trigger("eventChange", d);
                        } else
                            r &&
                                ((s = {
                                    event: s,
                                    relatedEvents: Cr(l, t, a),
                                    revert: function () {
                                        t.dispatch({ type: "MERGE_EVENTS", eventStore: l });
                                    },
                                }),
                                t.emitter.trigger("eventLeave", I(I({}, s), { draggedEl: e.subjectEl, view: n })),
                                t.dispatch({ type: "REMOVE_EVENTS", eventStore: l }),
                                t.emitter.trigger("eventRemove", s),
                                (s = u.defs[i.defId]),
                                (i = u.instances[a.instanceId]),
                                (s = new Er(r, s, i)),
                                r.dispatch({ type: "MERGE_EVENTS", eventStore: u }),
                                (i = {
                                    event: s,
                                    relatedEvents: Cr(u, r, i),
                                    revert: function () {
                                        r.dispatch({ type: "REMOVE_EVENTS", eventStore: u });
                                    },
                                }),
                                r.emitter.trigger("eventAdd", i),
                                e.isTouch && r.dispatch({ type: "SELECT_EVENT", eventInstanceId: a.instanceId }),
                                r.emitter.trigger("drop", I(I({}, au(c.dateSpan, r)), { draggedEl: e.subjectEl, jsEvent: e.origEvent, view: c.context.viewApi })),
                                r.emitter.trigger("eventReceive", I(I({}, i), { draggedEl: e.subjectEl, view: c.context.viewApi })));
                    else t.emitter.trigger("_noEventDrop");
                }
                v.cleanup();
            });
        var t = v.component.context.options,
            n = (v.dragging = new Zl(e.el));
        (n.pointer.selector = gu.SELECTOR), (n.touchScrollAllowed = !1), (n.autoScroller.isEnabled = t.dragScroll);
        t = v.hitDragging = new ru(v.dragging, Sa);
        return (
            (t.useSubjectCenter = e.useEventCenter),
            t.emitter.on("pointerdown", v.handlePointerDown),
            t.emitter.on("dragstart", v.handleDragStart),
            t.emitter.on("hitupdate", v.handleHitUpdate),
            t.emitter.on("pointerup", v.handlePointerUp),
            t.emitter.on("dragend", v.handleDragEnd),
            v
        );
    }
    var vu,
        mu =
            (t(yu, (vu = ma)),
            (yu.prototype.destroy = function () {
                this.dragging.destroy();
            }),
            (yu.prototype.querySegEl = function (e) {
                return he(e.subjectEl, ".fc-event");
            }),
            yu);
    function yu(e) {
        var d = vu.call(this, e) || this;
        (d.draggingSegEl = null),
            (d.draggingSeg = null),
            (d.eventRange = null),
            (d.relevantEvents = null),
            (d.validMutation = null),
            (d.mutatedRelevantEvents = null),
            (d.handlePointerDown = function (e) {
                var t = d.component,
                    n = Gn(d.querySegEl(e)),
                    n = (d.eventRange = n.eventRange);
                (d.dragging.minDistance = t.context.options.eventDragMinDistance), d.dragging.setIgnoreMove(!d.component.isValidSegDownEl(e.origEvent.target) || (e.isTouch && d.component.props.eventSelection !== n.instance.instanceId));
            }),
            (d.handleDragStart = function (e) {
                var t = d.component.context,
                    n = d.eventRange;
                d.relevantEvents = gn(t.getCurrentData().eventStore, d.eventRange.instance.instanceId);
                var r = d.querySegEl(e);
                (d.draggingSegEl = r), (d.draggingSeg = Gn(r)), t.calendarApi.unselect(), t.emitter.trigger("eventResizeStart", { el: r, event: new Er(t, n.def, n.instance), jsEvent: e.origEvent, view: t.viewApi });
            }),
            (d.handleHitUpdate = function (e, t, n) {
                var r = d.component.context,
                    o = d.relevantEvents,
                    i = d.hitDragging.initialHit,
                    a = d.eventRange.instance,
                    s = null,
                    l = null,
                    u = !1,
                    c = { affectedEvents: o, mutatedEvents: { defs: {}, instances: {} }, isEvent: !0 };
                e &&
                    ((e.componentId === i.componentId && d.isHitComboAllowed && !d.isHitComboAllowed(i, e)) ||
                        (s = (function (e, t, n, r) {
                            var o = e.context.dateEnv,
                                e = Hn(e.dateSpan.range.start, t.dateSpan.range.start, o, e.largeUnit);
                            if (n) {
                                if (o.add(r.start, e) < r.end) return { startDelta: e };
                            } else if (o.add(r.end, e) > r.start) return { endDelta: e };
                            return null;
                        })(i, e, n.subjectEl.classList.contains("fc-event-resizer-start"), a.range))),
                    s && ((l = dr(o, r.getCurrentData().eventUiBases, s, r)), (c.mutatedEvents = l), Ss(c, e.dateProfile, r) || ((u = !0), (c.mutatedEvents = l = s = null))),
                    l ? r.dispatch({ type: "SET_EVENT_RESIZE", state: c }) : r.dispatch({ type: "UNSET_EVENT_RESIZE" }),
                    (u ? Pe : Ne)(),
                    t || (s && iu(i, e) && (s = null), (d.validMutation = s), (d.mutatedRelevantEvents = l));
            }),
            (d.handleDragEnd = function (e) {
                var t = d.component.context,
                    n = d.eventRange.def,
                    r = d.eventRange.instance,
                    o = new Er(t, n, r),
                    i = d.relevantEvents,
                    a = d.mutatedRelevantEvents;
                t.emitter.trigger("eventResizeStop", { el: d.draggingSegEl, event: o, jsEvent: e.origEvent, view: t.viewApi }),
                    d.validMutation
                        ? ((n = new Er(t, a.defs[n.defId], r ? a.instances[r.instanceId] : null)),
                          t.dispatch({ type: "MERGE_EVENTS", eventStore: a }),
                          (r = {
                              oldEvent: o,
                              event: n,
                              relatedEvents: Cr(a, t, r),
                              revert: function () {
                                  t.dispatch({ type: "MERGE_EVENTS", eventStore: i });
                              },
                          }),
                          t.emitter.trigger("eventResize", I(I({}, r), { el: d.draggingSegEl, startDelta: d.validMutation.startDelta || wt(0), endDelta: d.validMutation.endDelta || wt(0), jsEvent: e.origEvent, view: t.viewApi })),
                          t.emitter.trigger("eventChange", r))
                        : t.emitter.trigger("_noEventResize"),
                    (d.draggingSeg = null),
                    (d.relevantEvents = null),
                    (d.validMutation = null);
            });
        var t = e.component,
            n = (d.dragging = new Zl(e.el));
        (n.pointer.selector = ".fc-event-resizer"), (n.touchScrollAllowed = !1), (n.autoScroller.isEnabled = t.context.options.dragScroll);
        e = d.hitDragging = new ru(d.dragging, Ea(e));
        return e.emitter.on("pointerdown", d.handlePointerDown), e.emitter.on("dragstart", d.handleDragStart), e.emitter.on("hitupdate", d.handleHitUpdate), e.emitter.on("dragend", d.handleDragEnd), d;
    }
    var Eu =
            ((wu.prototype.destroy = function () {
                this.context.emitter.off("select", this.onSelect), this.documentPointer.destroy();
            }),
            wu),
        Su = { fixedMirrorParent: pn },
        bu = { dateClick: pn, eventDragStart: pn, eventDragStop: pn, eventDrop: pn, eventResizeStart: pn, eventResizeStop: pn, eventResize: pn, drop: pn, eventReceive: pn, eventLeave: pn },
        Du =
            ((Cu.prototype.buildDragMeta = function (e) {
                return "object" == typeof this.suppliedDragMeta
                    ? Ra(this.suppliedDragMeta)
                    : "function" == typeof this.suppliedDragMeta
                    ? Ra(this.suppliedDragMeta(e))
                    : Ra(((t = Da.dataAttrPrefix), (t = e.getAttribute("data-" + ((t ? t + "-" : "") + "event")) || "") ? JSON.parse(t) : { create: !1 }));
                var t;
            }),
            (Cu.prototype.displayDrag = function (e, t) {
                var n = this.receivingContext;
                n && n !== e && n.dispatch({ type: "UNSET_EVENT_DRAG" }), e && e.dispatch({ type: "SET_EVENT_DRAG", state: t });
            }),
            (Cu.prototype.clearDrag = function () {
                this.receivingContext && this.receivingContext.dispatch({ type: "UNSET_EVENT_DRAG" });
            }),
            (Cu.prototype.canDropElOnCalendar = function (e, t) {
                var n = t.options.dropAccept;
                return "function" == typeof n ? n.call(t.calendarApi, e) : "string" != typeof n || !n || Boolean(ge(e, n));
            }),
            Cu);
    function Cu(e, t) {
        var l = this;
        (this.receivingContext = null),
            (this.droppableEvent = null),
            (this.suppliedDragMeta = null),
            (this.dragMeta = null),
            (this.handleDragStart = function (e) {
                l.dragMeta = l.buildDragMeta(e.subjectEl);
            }),
            (this.handleHitUpdate = function (e, t, n) {
                var r = l.hitDragging.dragging,
                    o = null,
                    i = null,
                    a = !1,
                    s = { affectedEvents: { defs: {}, instances: {} }, mutatedEvents: { defs: {}, instances: {} }, isEvent: l.dragMeta.create };
                e &&
                    ((o = e.context),
                    l.canDropElOnCalendar(n.subjectEl, o) &&
                        ((i = (function (e, t, n) {
                            for (var r = I({}, t.leftoverProps), o = 0, i = n.pluginHooks.externalDefTransforms; o < i.length; o++) {
                                var a = i[o];
                                I(r, a(e, t));
                            }
                            var s = kn(r, n),
                                l = Mn(s.refined, s.extra, t.sourceId, e.allDay, n.options.forceEventDuration || Boolean(t.duration), n),
                                s = e.range.start;
                            e.allDay && t.startTime && (s = n.dateEnv.add(s, t.startTime));
                            n = t.duration ? n.dateEnv.add(s, t.duration) : cr(e.allDay, s, n);
                            return { def: l, instance: ct(l.defId, { start: s, end: n }) };
                        })(e.dateSpan, l.dragMeta, o)),
                        (s.mutatedEvents = hn(i)),
                        (a = !Ss(s, e.dateProfile, o)) && ((s.mutatedEvents = { defs: {}, instances: {} }), (i = null)))),
                    l.displayDrag(o, s),
                    r.setMirrorIsVisible(t || !i || !document.querySelector(".fc-event-mirror")),
                    (a ? Pe : Ne)(),
                    t || (r.setMirrorNeedsRevert(!i), (l.receivingContext = o), (l.droppableEvent = i));
            }),
            (this.handleDragEnd = function (e) {
                var t,
                    n,
                    r,
                    o,
                    i = l.receivingContext,
                    a = l.droppableEvent;
                l.clearDrag(),
                    i &&
                        a &&
                        ((n = (t = l.hitDragging.finalHit).context.viewApi),
                        (r = l.dragMeta),
                        i.emitter.trigger("drop", I(I({}, au(t.dateSpan, i)), { draggedEl: e.subjectEl, jsEvent: e.origEvent, view: n })),
                        r.create &&
                            ((o = hn(a)),
                            i.dispatch({ type: "MERGE_EVENTS", eventStore: o }),
                            e.isTouch && i.dispatch({ type: "SELECT_EVENT", eventInstanceId: a.instance.instanceId }),
                            i.emitter.trigger("eventReceive", {
                                event: new Er(i, a.def, a.instance),
                                relatedEvents: [],
                                revert: function () {
                                    i.dispatch({ type: "REMOVE_EVENTS", eventStore: o });
                                },
                                draggedEl: e.subjectEl,
                                view: n,
                            }))),
                    (l.receivingContext = null),
                    (l.droppableEvent = null);
            });
        e = this.hitDragging = new ru(e, Sa);
        (e.requireInitial = !1), e.emitter.on("dragstart", this.handleDragStart), e.emitter.on("hitupdate", this.handleHitUpdate), e.emitter.on("dragend", this.handleDragEnd), (this.suppliedDragMeta = t);
    }
    function wu(e) {
        var o = this;
        (this.context = e),
            (this.isRecentPointerDateSelect = !1),
            (this.matchesCancel = !1),
            (this.matchesEvent = !1),
            (this.onSelect = function (e) {
                e.jsEvent && (o.isRecentPointerDateSelect = !0);
            }),
            (this.onDocumentPointerDown = function (e) {
                var t = o.context.options.unselectCancel,
                    e = Se(e.origEvent);
                (o.matchesCancel = !!he(e, t)), (o.matchesEvent = !!he(e, hu.SELECTOR));
            }),
            (this.onDocumentPointerUp = function (e) {
                var t = o.context,
                    n = o.documentPointer,
                    r = t.getCurrentData();
                n.wasTouchScroll ||
                    (r.dateSelection && !o.isRecentPointerDateSelect && (!t.options.unselectAuto || o.matchesCancel || t.calendarApi.unselect(e)), r.eventSelection && !o.matchesEvent && t.dispatch({ type: "UNSELECT_EVENT" })),
                    (o.isRecentPointerDateSelect = !1);
            });
        var t = (this.documentPointer = new Ol(document));
        (t.shouldIgnoreMove = !0), (t.shouldWatchScroll = !1), t.emitter.on("pointerdown", this.onDocumentPointerDown), t.emitter.on("pointerup", this.onDocumentPointerUp), e.emitter.on("select", this.onSelect);
    }
    Da.dataAttrPrefix = "";
    var Ru,
        Tu,
        _u =
            ((Ou.prototype.destroy = function () {
                this.dragging.destroy();
            }),
            Ou),
        ku =
            (t(Hu, (Tu = ba)),
            (Hu.prototype.destroy = function () {
                this.pointer.destroy();
            }),
            (Hu.prototype.setIgnoreMove = function (e) {
                this.shouldIgnoreMove = e;
            }),
            (Hu.prototype.setMirrorIsVisible = function (e) {
                e
                    ? this.currentMirrorEl && ((this.currentMirrorEl.style.visibility = ""), (this.currentMirrorEl = null))
                    : (e = this.mirrorSelector ? document.querySelector(this.mirrorSelector) : null) && ((this.currentMirrorEl = e).style.visibility = "hidden");
            }),
            Hu),
        xu =
            ((Nu.prototype.destroy = function () {
                this.dragging.destroy();
            }),
            Nu),
        Mu = Jo({ componentInteractions: [uu, cu, hu, mu], calendarInteractions: [Eu], elementDraggingImpl: Zl, optionRefiners: Su, listenerRefiners: bu }),
        Iu =
            (t(Pu, (Ru = Ko)),
            (Pu.prototype.renderSimpleLayout = function (e, t) {
                var n = this.props,
                    r = this.context,
                    o = [],
                    i = zs(r.options);
                return (
                    e && o.push({ type: "header", key: "header", isSticky: i, chunk: { elRef: this.headerElRef, tableClassName: "fc-col-header", rowContent: e } }),
                    o.push({ type: "body", key: "body", liquid: !0, chunk: { content: t } }),
                    ko(Ei, { viewSpec: r.viewSpec }, function (e, t) {
                        return ko("div", { ref: e, className: ["fc-daygrid"].concat(t).join(" ") }, ko(qs, { liquid: !n.isHeightAuto && !n.forPrint, collapsibleWidth: n.forPrint, cols: [], sections: o }));
                    })
                );
            }),
            (Pu.prototype.renderHScrollLayout = function (e, t, n, r) {
                var o = this.context.pluginHooks.scrollGridImpl;
                if (!o) throw new Error("No ScrollGrid implementation");
                var i = this.props,
                    a = this.context,
                    s = !i.forPrint && zs(a.options),
                    l = !i.forPrint && js(a.options),
                    u = [];
                return (
                    e && u.push({ type: "header", key: "header", isSticky: s, chunks: [{ key: "main", elRef: this.headerElRef, tableClassName: "fc-col-header", rowContent: e }] }),
                    u.push({ type: "body", key: "body", liquid: !0, chunks: [{ key: "main", content: t }] }),
                    l && u.push({ type: "footer", key: "footer", isSticky: !0, chunks: [{ key: "main", content: Bs }] }),
                    ko(Ei, { viewSpec: a.viewSpec }, function (e, t) {
                        return ko(
                            "div",
                            { ref: e, className: ["fc-daygrid"].concat(t).join(" ") },
                            ko(o, { liquid: !i.isHeightAuto && !i.forPrint, collapsibleWidth: i.forPrint, colGroups: [{ cols: [{ span: n, minWidth: r }] }], sections: u })
                        );
                    })
                );
            }),
            Pu);
    function Pu() {
        var e = (null !== Ru && Ru.apply(this, arguments)) || this;
        return (e.headerElRef = Mo()), e;
    }
    function Nu(e, t) {
        var n = document;
        t = e === document || e instanceof Element ? ((n = e), t || {}) : e || {};
        e = this.dragging = new ku(n);
        "string" == typeof t.itemSelector ? (e.pointer.selector = t.itemSelector) : n === document && (e.pointer.selector = "[data-event]"),
            "string" == typeof t.mirrorSelector && (e.mirrorSelector = t.mirrorSelector),
            new Du(e, t.eventData);
    }
    function Hu(e) {
        var t = Tu.call(this, e) || this;
        (t.shouldIgnoreMove = !1),
            (t.mirrorSelector = ""),
            (t.currentMirrorEl = null),
            (t.handlePointerDown = function (e) {
                t.emitter.trigger("pointerdown", e), t.shouldIgnoreMove || t.emitter.trigger("dragstart", e);
            }),
            (t.handlePointerMove = function (e) {
                t.shouldIgnoreMove || t.emitter.trigger("dragmove", e);
            }),
            (t.handlePointerUp = function (e) {
                t.emitter.trigger("pointerup", e), t.shouldIgnoreMove || t.emitter.trigger("dragend", e);
            });
        e = t.pointer = new Ol(e);
        return e.emitter.on("pointerdown", t.handlePointerDown), e.emitter.on("pointermove", t.handlePointerMove), e.emitter.on("pointerup", t.handlePointerUp), t;
    }
    function Ou(e, t) {
        var o = this;
        void 0 === t && (t = {}),
            (this.handlePointerDown = function (e) {
                var t = o.dragging,
                    n = o.settings,
                    r = n.minDistance,
                    n = n.longPressDelay;
                (t.minDistance = null != r ? r : e.isTouch ? 0 : rn.eventDragMinDistance), (t.delay = e.isTouch ? (null != n ? n : rn.longPressDelay) : 0);
            }),
            (this.handleDragStart = function (e) {
                e.isTouch && o.dragging.delay && e.subjectEl.classList.contains("fc-event") && o.dragging.mirror.getMirrorEl().classList.add("fc-event-selected");
            }),
            (this.settings = t);
        e = this.dragging = new Zl(e);
        (e.touchScrollAllowed = !1),
            null != t.itemSelector && (e.pointer.selector = t.itemSelector),
            null != t.appendTo && (e.mirror.parentNode = t.appendTo),
            e.emitter.on("pointerdown", this.handlePointerDown),
            e.emitter.on("dragstart", this.handleDragStart),
            new Du(e, t.eventData);
    }
    function Au(e, t) {
        for (var n = [], r = 0; r < t; r += 1) n[r] = [];
        for (var o = 0, i = e; o < i.length; o++) {
            var a = i[o];
            n[a.row].push(a);
        }
        return n;
    }
    function Lu(e, t) {
        for (var n = [], r = 0; r < t; r += 1) n[r] = [];
        for (var o = 0, i = e; o < i.length; o++) {
            var a = i[o];
            n[a.firstCol].push(a);
        }
        return n;
    }
    function Uu(e, t) {
        var n = [];
        if (e) {
            for (a = 0; a < t; a += 1) n[a] = { affectedInstances: e.affectedInstances, isEvent: e.isEvent, segs: [] };
            for (var r = 0, o = e.segs; r < o.length; r++) {
                var i = o[r];
                n[i.row].segs.push(i);
            }
        } else for (var a = 0; a < t; a += 1) n[a] = null;
        return n;
    }
    var Wu,
        Vu =
            (t(Fu, (Wu = jo)),
            (Fu.prototype.render = function () {
                var n = this.props,
                    r = to(this.context, n.date);
                return ko(ol, { date: n.date, dateProfile: n.dateProfile, todayRange: n.todayRange, showDayNumber: n.showDayNumber, extraHookProps: n.extraHookProps, defaultContent: Bu }, function (e, t) {
                    return (t || n.forceDayTop) && ko("div", { className: "fc-daygrid-day-top", ref: e }, ko("a", I({ id: n.dayNumberId, className: "fc-daygrid-day-number" }, r), t || ko(Io, null, " ")));
                });
            }),
            Fu);
    function Fu() {
        return (null !== Wu && Wu.apply(this, arguments)) || this;
    }
    function Bu(e) {
        return e.dayNumberText;
    }
    var zu = tn({ hour: "numeric", minute: "2-digit", omitZeroMinute: !0, meridiem: "narrow" });
    function ju(e) {
        var t = e.eventRange.ui.display;
        return "list-item" === t || ("auto" === t && !e.eventRange.def.allDay && e.firstCol === e.lastCol && e.isStart && e.isEnd);
    }
    var Gu,
        qu,
        Yu =
            (t(Ku, (qu = jo)),
            (Ku.prototype.render = function () {
                var e = this.props;
                return ko(
                    $s,
                    I({}, e, { extraClassNames: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"], defaultTimeFormat: zu, defaultDisplayEventEnd: e.defaultDisplayEventEnd, disableResizing: !e.seg.eventRange.def.allDay })
                );
            }),
            Ku),
        Zu =
            (t(Xu, (Gu = jo)),
            (Xu.prototype.render = function () {
                var o = this.props,
                    i = this.context,
                    e = i.options.eventTimeFormat || zu,
                    e = Qn(o.seg, e, i, !0, o.defaultDisplayEventEnd);
                return ko(Ks, { seg: o.seg, timeText: e, defaultContent: $u, isDragging: o.isDragging, isResizing: !1, isDateSelecting: !1, isSelected: o.isSelected, isPast: o.isPast, isFuture: o.isFuture, isToday: o.isToday }, function (
                    e,
                    t,
                    n,
                    r
                ) {
                    return ko("a", I({ className: ["fc-daygrid-event", "fc-daygrid-dot-event"].concat(t).join(" "), ref: e }, rr(o.seg, i)), r);
                });
            }),
            Xu);
    function Xu() {
        return (null !== Gu && Gu.apply(this, arguments)) || this;
    }
    function Ku() {
        return (null !== qu && qu.apply(this, arguments)) || this;
    }
    function $u(e) {
        return ko(
            Io,
            null,
            ko("div", { className: "fc-daygrid-event-dot", style: { borderColor: e.borderColor || e.backgroundColor } }),
            e.timeText && ko("div", { className: "fc-event-time" }, e.timeText),
            ko("div", { className: "fc-event-title" }, e.event.title || ko(Io, null, " "))
        );
    }
    var Ju,
        Qu =
            (t(ec, (Ju = jo)),
            (ec.prototype.render = function () {
                var r = this.props,
                    e = this.compileSegs(r.singlePlacements),
                    t = e.allSegs,
                    e = e.invisibleSegs;
                return ko(
                    Sl,
                    {
                        dateProfile: r.dateProfile,
                        todayRange: r.todayRange,
                        allDayDate: r.allDayDate,
                        moreCnt: r.moreCnt,
                        allSegs: t,
                        hiddenSegs: e,
                        alignmentElRef: r.alignmentElRef,
                        alignGridTop: r.alignGridTop,
                        extraDateSpan: r.extraDateSpan,
                        popoverContent: function () {
                            var n = (r.eventDrag ? r.eventDrag.affectedInstances : null) || (r.eventResize ? r.eventResize.affectedInstances : null) || {};
                            return ko(
                                Io,
                                null,
                                t.map(function (e) {
                                    var t = e.eventRange.instance.instanceId;
                                    return ko(
                                        "div",
                                        { className: "fc-daygrid-event-harness", key: t, style: { visibility: n[t] ? "hidden" : "" } },
                                        ju(e)
                                            ? ko(Zu, I({ seg: e, isDragging: !1, isSelected: t === r.eventSelection, defaultDisplayEventEnd: !1 }, er(e, r.todayRange)))
                                            : ko(Yu, I({ seg: e, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: t === r.eventSelection, defaultDisplayEventEnd: !1 }, er(e, r.todayRange)))
                                    );
                                })
                            );
                        },
                    },
                    function (e, t, n, r, o, i, a, s) {
                        return ko("a", I({ ref: e, className: ["fc-daygrid-more-link"].concat(t).join(" "), title: i, "aria-expanded": a, "aria-controls": s }, ke(o)), r);
                    }
                );
            }),
            ec);
    function ec() {
        var e = (null !== Ju && Ju.apply(this, arguments)) || this;
        return (e.compileSegs = Lt(tc)), e;
    }
    function tc(e) {
        for (var t = [], n = [], r = 0, o = e; r < o.length; r++) {
            var i = o[r];
            t.push(i.seg), i.isVisible || n.push(i.seg);
        }
        return { allSegs: t, invisibleSegs: n };
    }
    var nc,
        rc = tn({ week: "narrow" }),
        oc =
            (t(ic, (nc = Ko)),
            (ic.prototype.render = function () {
                var e = this.context,
                    o = this.props,
                    i = this.state,
                    a = this.rootElRef,
                    s = o.date,
                    l = o.dateProfile,
                    u = to(e, s, "week");
                return ko(ll, { date: s, dateProfile: l, todayRange: o.todayRange, showDayNumber: o.showDayNumber, extraHookProps: o.extraHookProps, elRef: this.handleRootEl }, function (e, t, n, r) {
                    return ko(
                        "td",
                        I({ ref: e, role: "gridcell", className: ["fc-daygrid-day"].concat(t, o.extraClassNames || []).join(" ") }, n, o.extraDataAttrs, o.showDayNumber ? { "aria-labelledby": i.dayNumberId } : {}),
                        ko(
                            "div",
                            { className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", ref: o.innerElRef },
                            o.showWeekNumber &&
                                ko(fl, { date: s, defaultFormat: rc }, function (e, t, n, r) {
                                    return ko("a", I({ ref: e, className: ["fc-daygrid-week-number"].concat(t).join(" ") }, u), r);
                                }),
                            !r && ko(Vu, { date: s, dateProfile: l, showDayNumber: o.showDayNumber, dayNumberId: i.dayNumberId, forceDayTop: o.forceDayTop, todayRange: o.todayRange, extraHookProps: o.extraHookProps }),
                            ko(
                                "div",
                                { className: "fc-daygrid-day-events", ref: o.fgContentElRef },
                                o.fgContent,
                                ko(
                                    "div",
                                    { className: "fc-daygrid-day-bottom", style: { marginTop: o.moreMarginTop } },
                                    ko(Qu, {
                                        allDayDate: s,
                                        singlePlacements: o.singlePlacements,
                                        moreCnt: o.moreCnt,
                                        alignmentElRef: a,
                                        alignGridTop: !o.showDayNumber,
                                        extraDateSpan: o.extraDateSpan,
                                        dateProfile: o.dateProfile,
                                        eventSelection: o.eventSelection,
                                        eventDrag: o.eventDrag,
                                        eventResize: o.eventResize,
                                        todayRange: o.todayRange,
                                    })
                                )
                            ),
                            ko("div", { className: "fc-daygrid-day-bg" }, o.bgContent)
                        )
                    );
                });
            }),
            ic);
    function ic() {
        var t = (null !== nc && nc.apply(this, arguments)) || this;
        return (
            (t.rootElRef = Mo()),
            (t.state = { dayNumberId: Ce() }),
            (t.handleRootEl = function (e) {
                Zo(t.rootElRef, e), Zo(t.props.elRef, e);
            }),
            t
        );
    }
    function ac(e, t, n, r) {
        if (e.firstCol === t && e.lastCol === n - 1) return e;
        var o = e.eventRange,
            i = o.range,
            r = Ln(i, { start: r[t].date, end: Xe(r[n - 1].date, 1) });
        return I(I({}, e), {
            firstCol: t,
            lastCol: n - 1,
            eventRange: { def: o.def, ui: I(I({}, o.ui), { durationEditable: !1 }), instance: o.instance, range: r },
            isStart: e.isStart && r.start.valueOf() === i.start.valueOf(),
            isEnd: e.isEnd && r.end.valueOf() === i.end.valueOf(),
        });
    }
    var sc,
        lc,
        uc =
            (t(pc, (lc = la)),
            (pc.prototype.addSegs = function (e) {
                for (
                    var t = this,
                        e = lc.prototype.addSegs.call(this, e),
                        n = this.entriesByLevel,
                        r = function (e) {
                            return !t.forceHidden[da(e)];
                        },
                        o = 0;
                    o < n.length;
                    o += 1
                )
                    n[o] = n[o].filter(r);
                return e;
            }),
            (pc.prototype.handleInvalidInsertion = function (e, t, n) {
                var r,
                    o,
                    i = this.entriesByLevel,
                    a = this.forceHidden,
                    s = e.touchingEntry,
                    l = e.touchingLevel,
                    u = e.touchingLateral;
                return (
                    this.hiddenConsumes && s && (a[(r = da(s))] || (this.allowReslicing ? ((a[da((o = I(I({}, s), { span: ha(s.span, t.span) })))] = !0), (i[l][u] = o), this.splitEntry(s, t, n)) : ((a[r] = !0), n.push(s)))),
                    lc.prototype.handleInvalidInsertion.call(this, e, t, n)
                );
            }),
            pc),
        cc =
            (t(dc, (sc = Ko)),
            (dc.prototype.render = function () {
                var o = this,
                    i = this.props,
                    e = this.state,
                    t = this.context.options,
                    n = i.cells.length,
                    a = Lu(i.businessHourSegs, n),
                    s = Lu(i.bgEventSegs, n),
                    l = Lu(this.getHighlightSegs(), n),
                    u = Lu(this.getMirrorSegs(), n),
                    e = (function (e, t, n, r, o, i, a) {
                        var s = new uc();
                        (s.allowReslicing = !0),
                            (s.strictOrder = r),
                            !0 === t || !0 === n ? ((s.maxCoord = i), (s.hiddenConsumes = !0)) : "number" == typeof t ? (s.maxStackCnt = t) : "number" == typeof n && ((s.maxStackCnt = n), (s.hiddenConsumes = !0));
                        for (var l = [], u = [], c = 0; c < e.length; c += 1) {
                            var d = o[(C = e[c]).eventRange.instance.instanceId];
                            null != d ? l.push({ index: c, thickness: d, span: { start: C.firstCol, end: C.lastCol + 1 } }) : u.push(C);
                        }
                        for (
                            var n = s.addSegs(l),
                                p = (s = (function (e, t, n) {
                                    for (
                                        var r = (function (e, t) {
                                                for (var n = [], r = 0; r < t; r += 1) n.push([]);
                                                for (var o = 0, i = e; o < i.length; o++) for (var a = i[o], r = a.span.start; r < a.span.end; r += 1) n[r].push(a);
                                                return n;
                                            })(e, n.length),
                                            o = [],
                                            i = [],
                                            a = [],
                                            s = 0;
                                        s < n.length;
                                        s += 1
                                    ) {
                                        for (var l = r[s], u = [], c = 0, d = 0, p = 0, f = l; p < f.length; p++) {
                                            var h = t[(y = f[p]).index];
                                            u.push({ seg: ac(h, s, s + 1, n), isVisible: !0, isAbsolute: !1, absoluteTop: y.levelCoord, marginTop: y.levelCoord - c }), (c = y.levelCoord + y.thickness);
                                        }
                                        for (var g = [], c = 0, d = 0, v = 0, m = l; v < m.length; v++) {
                                            var y,
                                                h = t[(y = m[v]).index],
                                                E = 1 < y.span.end - y.span.start,
                                                S = y.span.start === s;
                                            (d += y.levelCoord - c),
                                                (c = y.levelCoord + y.thickness),
                                                E
                                                    ? ((d += y.thickness), S && g.push({ seg: ac(h, y.span.start, y.span.end, n), isVisible: !0, isAbsolute: !0, absoluteTop: y.levelCoord, marginTop: 0 }))
                                                    : S && (g.push({ seg: ac(h, y.span.start, y.span.end, n), isVisible: !0, isAbsolute: !1, absoluteTop: y.levelCoord, marginTop: d }), (d = 0));
                                        }
                                        o.push(u), i.push(g), a.push(d);
                                    }
                                    return { singleColPlacements: o, multiColPlacements: i, leftoverMargins: a };
                                })(s.toRects(), e, a)).singleColPlacements,
                                f = s.multiColPlacements,
                                h = s.leftoverMargins,
                                g = [],
                                v = [],
                                m = 0,
                                y = u;
                            m < y.length;
                            m++
                        ) {
                            f[(C = y[m]).firstCol].push({ seg: C, isVisible: !1, isAbsolute: !0, absoluteTop: 0, marginTop: 0 });
                            for (var E = C.firstCol; E <= C.lastCol; E += 1) p[E].push({ seg: ac(C, E, E + 1, a), isVisible: !1, isAbsolute: !1, absoluteTop: 0, marginTop: 0 });
                        }
                        for (E = 0; E < a.length; E += 1) g.push(0);
                        for (var S = 0, b = n; S < b.length; S++) {
                            var D = b[S],
                                C = e[D.index],
                                w = D.span;
                            for (f[w.start].push({ seg: ac(C, w.start, w.end, a), isVisible: !1, isAbsolute: !0, absoluteTop: 0, marginTop: 0 }), E = w.start; E < w.end; E += 1)
                                (g[E] += 1), p[E].push({ seg: ac(C, E, E + 1, a), isVisible: !1, isAbsolute: !1, absoluteTop: 0, marginTop: 0 });
                        }
                        for (E = 0; E < a.length; E += 1) v.push(h[E]);
                        return { singleColPlacements: p, multiColPlacements: f, moreCnts: g, moreMarginTops: v };
                    })(Zn(i.fgEventSegs, t.eventOrder), i.dayMaxEvents, i.dayMaxEventRows, t.eventOrderStrict, e.eventInstanceHeights, e.maxContentHeight, i.cells),
                    c = e.singleColPlacements,
                    d = e.multiColPlacements,
                    p = e.moreCnts,
                    f = e.moreMarginTops,
                    h = (i.eventDrag && i.eventDrag.affectedInstances) || (i.eventResize && i.eventResize.affectedInstances) || {};
                return ko(
                    "tr",
                    { ref: this.rootElRef, role: "row" },
                    i.renderIntro && i.renderIntro(),
                    i.cells.map(function (e, t) {
                        var n = o.renderFgSegs(t, (i.forPrint ? c : d)[t], i.todayRange, h),
                            r = o.renderFgSegs(
                                t,
                                (function (e, a) {
                                    if (!e.length) return [];
                                    var t = (function () {
                                        for (var e = {}, t = 0, n = a; t < n.length; t++)
                                            for (var r = 0, o = n[t]; r < o.length; r++) {
                                                var i = o[r];
                                                e[i.seg.eventRange.instance.instanceId] = i.absoluteTop;
                                            }
                                        return e;
                                    })();
                                    return e.map(function (e) {
                                        return { seg: e, isVisible: !0, isAbsolute: !0, absoluteTop: t[e.eventRange.instance.instanceId], marginTop: 0 };
                                    });
                                })(u[t], d),
                                i.todayRange,
                                {},
                                Boolean(i.eventDrag),
                                Boolean(i.eventResize),
                                !1
                            );
                        return ko(oc, {
                            key: e.key,
                            elRef: o.cellElRefs.createRef(e.key),
                            innerElRef: o.frameElRefs.createRef(e.key),
                            dateProfile: i.dateProfile,
                            date: e.date,
                            showDayNumber: i.showDayNumbers,
                            showWeekNumber: i.showWeekNumbers && 0 === t,
                            forceDayTop: i.showWeekNumbers,
                            todayRange: i.todayRange,
                            eventSelection: i.eventSelection,
                            eventDrag: i.eventDrag,
                            eventResize: i.eventResize,
                            extraHookProps: e.extraHookProps,
                            extraDataAttrs: e.extraDataAttrs,
                            extraClassNames: e.extraClassNames,
                            extraDateSpan: e.extraDateSpan,
                            moreCnt: p[t],
                            moreMarginTop: f[t],
                            singlePlacements: c[t],
                            fgContentElRef: o.fgElRefs.createRef(e.key),
                            fgContent: ko(Io, null, ko(Io, null, n), ko(Io, null, r)),
                            bgContent: ko(Io, null, o.renderFillSegs(l[t], "highlight"), o.renderFillSegs(a[t], "non-business"), o.renderFillSegs(s[t], "bg-event")),
                        });
                    })
                );
            }),
            (dc.prototype.componentDidMount = function () {
                this.updateSizing(!0);
            }),
            (dc.prototype.componentDidUpdate = function (e, t) {
                var n = this.props;
                this.updateSizing(!mt(e, n));
            }),
            (dc.prototype.getHighlightSegs = function () {
                var e = this.props;
                return e.eventDrag && e.eventDrag.segs.length ? e.eventDrag.segs : e.eventResize && e.eventResize.segs.length ? e.eventResize.segs : e.dateSelectionSegs;
            }),
            (dc.prototype.getMirrorSegs = function () {
                var e = this.props;
                return e.eventResize && e.eventResize.segs.length ? e.eventResize.segs : [];
            }),
            (dc.prototype.renderFgSegs = function (e, t, n, r, o, i, a) {
                var s = this.context,
                    l = this.props.eventSelection,
                    u = this.state.framePositions,
                    c = 1 === this.props.cells.length,
                    d = o || i || a,
                    p = [];
                if (u)
                    for (var f = 0, h = t; f < h.length; f++) {
                        var g = h[f],
                            v = g.seg,
                            m = v.eventRange.instance.instanceId,
                            y = m + ":" + e,
                            E = g.isVisible && !r[m],
                            S = g.isAbsolute,
                            b = "",
                            D = "";
                        S && (s.isRtl ? ((D = 0), (b = u.lefts[v.lastCol] - u.lefts[v.firstCol])) : ((b = 0), (D = u.rights[v.firstCol] - u.rights[v.lastCol]))),
                            p.push(
                                ko(
                                    "div",
                                    {
                                        className: "fc-daygrid-event-harness" + (S ? " fc-daygrid-event-harness-abs" : ""),
                                        key: y,
                                        ref: d ? null : this.segHarnessRefs.createRef(y),
                                        style: { visibility: E ? "" : "hidden", marginTop: S ? "" : g.marginTop, top: S ? g.absoluteTop : "", left: b, right: D },
                                    },
                                    ju(v)
                                        ? ko(Zu, I({ seg: v, isDragging: o, isSelected: m === l, defaultDisplayEventEnd: c }, er(v, n)))
                                        : ko(Yu, I({ seg: v, isDragging: o, isResizing: i, isDateSelecting: a, isSelected: m === l, defaultDisplayEventEnd: c }, er(v, n)))
                                )
                            );
                    }
                return p;
            }),
            (dc.prototype.renderFillSegs = function (e, t) {
                var n = this.context.isRtl,
                    r = this.props.todayRange,
                    o = this.state.framePositions,
                    i = [];
                if (o)
                    for (var a = 0, s = e; a < s.length; a++) {
                        var l = s[a],
                            u = n ? { right: 0, left: o.lefts[l.lastCol] - o.lefts[l.firstCol] } : { left: 0, right: o.rights[l.firstCol] - o.rights[l.lastCol] };
                        i.push(ko("div", { key: nr(l.eventRange), className: "fc-daygrid-bg-harness", style: u }, "bg-event" === t ? ko(dl, I({ seg: l }, er(l, r))) : cl(t)));
                    }
                return ko.apply(void 0, h([Io, {}], i));
            }),
            (dc.prototype.updateSizing = function (e) {
                var t,
                    n,
                    r = this.props,
                    o = this.frameElRefs;
                r.forPrint ||
                    null === r.clientWidth ||
                    (!e ||
                        ((n = r.cells.map(function (e) {
                            return o.currentMap[e.key];
                        })).length &&
                            ((t = this.rootElRef.current), this.setState({ framePositions: new mo(t, n, !0, !1) }))),
                    (t = this.state.eventInstanceHeights),
                    (n = this.queryEventInstanceHeights()),
                    (r = !0 === r.dayMaxEvents || !0 === r.dayMaxEventRows),
                    this.setState({ eventInstanceHeights: I(I({}, t), n), maxContentHeight: r ? this.computeMaxContentHeight() : null }));
            }),
            (dc.prototype.queryEventInstanceHeights = function () {
                var e,
                    t = this.segHarnessRefs.currentMap,
                    n = {};
                for (e in t) {
                    var r = Math.round(t[e].getBoundingClientRect().height),
                        o = e.split(":")[0];
                    n[o] = Math.max(n[o] || 0, r);
                }
                return n;
            }),
            (dc.prototype.computeMaxContentHeight = function () {
                var e = this.props.cells[0].key,
                    t = this.cellElRefs.currentMap[e],
                    e = this.fgElRefs.currentMap[e];
                return t.getBoundingClientRect().bottom - e.getBoundingClientRect().top;
            }),
            (dc.prototype.getCellEls = function () {
                var t = this.cellElRefs.currentMap;
                return this.props.cells.map(function (e) {
                    return t[e.key];
                });
            }),
            dc);
    function dc() {
        var e = (null !== sc && sc.apply(this, arguments)) || this;
        return (e.cellElRefs = new xs()), (e.frameElRefs = new xs()), (e.fgElRefs = new xs()), (e.segHarnessRefs = new xs()), (e.rootElRef = Mo()), (e.state = { framePositions: null, maxContentHeight: null, eventInstanceHeights: {} }), e;
    }
    function pc() {
        var e = (null !== lc && lc.apply(this, arguments)) || this;
        return (e.hiddenConsumes = !1), (e.forceHidden = {}), e;
    }
    cc.addStateEquality({ eventInstanceHeights: mt });
    var fc,
        hc =
            (t(gc, (fc = Ko)),
            (gc.prototype.render = function () {
                var r = this,
                    o = this.props,
                    i = o.dateProfile,
                    a = o.dayMaxEventRows,
                    s = o.dayMaxEvents,
                    t = o.expandRows,
                    l = o.cells.length,
                    u = this.splitBusinessHourSegs(o.businessHourSegs, l),
                    c = this.splitBgEventSegs(o.bgEventSegs, l),
                    d = this.splitFgEventSegs(o.fgEventSegs, l),
                    p = this.splitDateSelectionSegs(o.dateSelectionSegs, l),
                    f = this.splitEventDrag(o.eventDrag, l),
                    h = this.splitEventResize(o.eventResize, l),
                    e = !0 === s || !0 === a;
                return (
                    e && !t && ((e = !1), (s = a = null)),
                    ko(
                        "div",
                        {
                            className: ["fc-daygrid-body", e ? "fc-daygrid-body-balanced" : "fc-daygrid-body-unbalanced", t ? "" : "fc-daygrid-body-natural"].join(" "),
                            ref: this.handleRootEl,
                            style: { width: o.clientWidth, minWidth: o.tableMinWidth },
                        },
                        ko(os, { unit: "day" }, function (e, n) {
                            return ko(
                                Io,
                                null,
                                ko(
                                    "table",
                                    { role: "presentation", className: "fc-scrollgrid-sync-table", style: { width: o.clientWidth, minWidth: o.tableMinWidth, height: t ? o.clientHeight : "" } },
                                    o.colGroupNode,
                                    ko(
                                        "tbody",
                                        { role: "presentation" },
                                        o.cells.map(function (e, t) {
                                            return ko(cc, {
                                                ref: r.rowRefs.createRef(t),
                                                key: e.length ? e[0].date.toISOString() : t,
                                                showDayNumbers: 1 < l,
                                                showWeekNumbers: o.showWeekNumbers,
                                                todayRange: n,
                                                dateProfile: i,
                                                cells: e,
                                                renderIntro: o.renderRowIntro,
                                                businessHourSegs: u[t],
                                                eventSelection: o.eventSelection,
                                                bgEventSegs: c[t].filter(vc),
                                                fgEventSegs: d[t],
                                                dateSelectionSegs: p[t],
                                                eventDrag: f[t],
                                                eventResize: h[t],
                                                dayMaxEvents: s,
                                                dayMaxEventRows: a,
                                                clientWidth: o.clientWidth,
                                                clientHeight: o.clientHeight,
                                                forPrint: o.forPrint,
                                            });
                                        })
                                    )
                                )
                            );
                        })
                    )
                );
            }),
            (gc.prototype.prepareHits = function () {
                (this.rowPositions = new mo(
                    this.rootEl,
                    this.rowRefs.collect().map(function (e) {
                        return e.getCellEls()[0];
                    }),
                    !1,
                    !0
                )),
                    (this.colPositions = new mo(this.rootEl, this.rowRefs.currentMap[0].getCellEls(), !0, !1));
            }),
            (gc.prototype.queryHit = function (e, t) {
                var n = this.colPositions,
                    r = this.rowPositions,
                    o = n.leftToIndex(e),
                    e = r.topToIndex(t);
                if (null == e || null == o) return null;
                t = this.props.cells[e][o];
                return {
                    dateProfile: this.props.dateProfile,
                    dateSpan: I({ range: this.getCellRange(e, o), allDay: !0 }, t.extraDateSpan),
                    dayEl: this.getCellEl(e, o),
                    rect: { left: n.lefts[o], right: n.rights[o], top: r.tops[e], bottom: r.bottoms[e] },
                    layer: 0,
                };
            }),
            (gc.prototype.getCellEl = function (e, t) {
                return this.rowRefs.currentMap[e].getCellEls()[t];
            }),
            (gc.prototype.getCellRange = function (e, t) {
                t = this.props.cells[e][t].date;
                return { start: t, end: Xe(t, 1) };
            }),
            gc);
    function gc() {
        var t = (null !== fc && fc.apply(this, arguments)) || this;
        return (
            (t.splitBusinessHourSegs = Lt(Au)),
            (t.splitBgEventSegs = Lt(Au)),
            (t.splitFgEventSegs = Lt(Au)),
            (t.splitDateSelectionSegs = Lt(Au)),
            (t.splitEventDrag = Lt(Uu)),
            (t.splitEventResize = Lt(Uu)),
            (t.rowRefs = new xs()),
            (t.handleRootEl = function (e) {
                (t.rootEl = e) ? t.context.registerInteractiveComponent(t, { el: e, isHitComboAllowed: t.props.isHitComboAllowed }) : t.context.unregisterInteractiveComponent(t);
            }),
            t
        );
    }
    function vc(e) {
        return e.eventRange.def.allDay;
    }
    var mc,
        yc,
        Ec,
        Sc =
            (t(wc, (Ec = gs)),
            (wc.prototype.sliceRange = function (e, t) {
                return t.sliceRange(e);
            }),
            wc),
        bc =
            (t(Cc, (yc = Ko)),
            (Cc.prototype.render = function () {
                var e = this.props,
                    t = this.context;
                return ko(
                    hc,
                    I({ ref: this.tableRef }, this.slicer.sliceProps(e, e.dateProfile, e.nextDayThreshold, t, e.dayTableModel), {
                        dateProfile: e.dateProfile,
                        cells: e.dayTableModel.cells,
                        colGroupNode: e.colGroupNode,
                        tableMinWidth: e.tableMinWidth,
                        renderRowIntro: e.renderRowIntro,
                        dayMaxEvents: e.dayMaxEvents,
                        dayMaxEventRows: e.dayMaxEventRows,
                        showWeekNumbers: e.showWeekNumbers,
                        expandRows: e.expandRows,
                        headerAlignElRef: e.headerAlignElRef,
                        clientWidth: e.clientWidth,
                        clientHeight: e.clientHeight,
                        forPrint: e.forPrint,
                    })
                );
            }),
            Cc),
        se =
            (t(Dc, (mc = Iu)),
            (Dc.prototype.render = function () {
                function e(e) {
                    return ko(bc, {
                        ref: t.tableRef,
                        dateProfile: o.dateProfile,
                        dayTableModel: i,
                        businessHours: o.businessHours,
                        dateSelection: o.dateSelection,
                        eventStore: o.eventStore,
                        eventUiBases: o.eventUiBases,
                        eventSelection: o.eventSelection,
                        eventDrag: o.eventDrag,
                        eventResize: o.eventResize,
                        nextDayThreshold: r.nextDayThreshold,
                        colGroupNode: e.tableColGroupNode,
                        tableMinWidth: e.tableMinWidth,
                        dayMaxEvents: r.dayMaxEvents,
                        dayMaxEventRows: r.dayMaxEventRows,
                        showWeekNumbers: r.weekNumbers,
                        expandRows: !o.isHeightAuto,
                        headerAlignElRef: t.headerElRef,
                        clientWidth: e.clientWidth,
                        clientHeight: e.clientHeight,
                        forPrint: o.forPrint,
                    });
                }
                var t = this,
                    n = this.context,
                    r = n.options,
                    n = n.dateProfileGenerator,
                    o = this.props,
                    i = this.buildDayTableModel(o.dateProfile, n),
                    n = r.dayHeaders && ko(cs, { ref: this.headerRef, dateProfile: o.dateProfile, dates: i.headerDates, datesRepDistinctDays: 1 === i.rowCnt });
                return r.dayMinWidth ? this.renderHScrollLayout(n, e, i.colCnt, r.dayMinWidth) : this.renderSimpleLayout(n, e);
            }),
            Dc);
    function Dc() {
        var e = (null !== mc && mc.apply(this, arguments)) || this;
        return (e.buildDayTableModel = Lt(Rc)), (e.headerRef = Mo()), (e.tableRef = Mo()), e;
    }
    function Cc() {
        var e = (null !== yc && yc.apply(this, arguments)) || this;
        return (e.slicer = new Sc()), (e.tableRef = Mo()), e;
    }
    function wc() {
        var e = (null !== Ec && Ec.apply(this, arguments)) || this;
        return (e.forceDayIfListItem = !0), e;
    }
    function Rc(e, t) {
        t = new fs(e.renderRange, t);
        return new hs(t, /year|month|week/.test(e.currentRangeUnit));
    }
    var Tc,
        _c,
        Rr = Jo({
            initialView: "dayGridMonth",
            views: {
                dayGrid: {
                    component: se,
                    dateProfileGeneratorClass:
                        (t(Ic, (_c = Ri)),
                        (Ic.prototype.buildRenderRange = function (e, t, n) {
                            var r = this.props.dateEnv,
                                e = _c.prototype.buildRenderRange.call(this, e, t, n),
                                n = e.start,
                                e = e.end;
                            return (
                                /^(year|month)$/.test(t) && ((n = r.startOfWeek(n)), (r = r.startOfWeek(e)).valueOf() !== e.valueOf() && (e = Ze(r, 1))),
                                { start: n, end: (e = this.props.monthMode && this.props.fixedWeekCount ? Ze(e, 6 - Math.ceil($e(n, e))) : e) }
                            );
                        }),
                        Ic),
                },
                dayGridDay: { type: "dayGrid", duration: { days: 1 } },
                dayGridWeek: { type: "dayGrid", duration: { weeks: 1 } },
                dayGridMonth: { type: "dayGrid", duration: { months: 1 }, monthMode: !0, fixedWeekCount: !0 },
            },
        }),
        kc =
            (t(Mc, (Tc = Zr)),
            (Mc.prototype.getKeyInfo = function () {
                return { allDay: {}, timed: {} };
            }),
            (Mc.prototype.getKeysForDateSpan = function (e) {
                return e.allDay ? ["allDay"] : ["timed"];
            }),
            (Mc.prototype.getKeysForEventDef = function (e) {
                return e.allDay ? (zn(e) ? ["timed", "allDay"] : ["allDay"]) : ["timed"];
            }),
            Mc),
        xc = tn({ hour: "numeric", minute: "2-digit", omitZeroMinute: !0, meridiem: "short" });
    function Mc() {
        return (null !== Tc && Tc.apply(this, arguments)) || this;
    }
    function Ic() {
        return (null !== _c && _c.apply(this, arguments)) || this;
    }
    function Pc(o) {
        var i = ["fc-timegrid-slot", "fc-timegrid-slot-label", o.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor"];
        return ko(Lo.Consumer, null, function (e) {
            if (!o.isLabeled) return ko("td", { className: i.join(" "), "data-time": o.isoTimeStr });
            var t = e.dateEnv,
                n = e.options,
                r = e.viewApi,
                e = null == n.slotLabelFormat ? xc : Array.isArray(n.slotLabelFormat) ? tn(n.slotLabelFormat[0]) : tn(n.slotLabelFormat),
                e = { level: 0, time: o.time, date: t.toDate(o.date), view: r, text: t.format(o.date, e) };
            return ko(ii, { hookProps: e, classNames: n.slotLabelClassNames, content: n.slotLabelContent, defaultContent: Nc, didMount: n.slotLabelDidMount, willUnmount: n.slotLabelWillUnmount }, function (e, t, n, r) {
                return ko(
                    "td",
                    { ref: e, className: i.concat(t).join(" "), "data-time": o.isoTimeStr },
                    ko("div", { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" }, ko("div", { className: "fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion", ref: n }, r))
                );
            });
        });
    }
    function Nc(e) {
        return e.text;
    }
    var Hc,
        Oc,
        Ac =
            (t(Wc, (Oc = jo)),
            (Wc.prototype.render = function () {
                return this.props.slatMetas.map(function (e) {
                    return ko("tr", { key: e.key }, ko(Pc, I({}, e)));
                });
            }),
            Wc),
        Lc = tn({ week: "short" }),
        Fo =
            (t(Uc, (Hc = Ko)),
            (Uc.prototype.renderSimpleLayout = function (e, t, n) {
                var r = this.context,
                    o = this.props,
                    i = [],
                    a = zs(r.options);
                return (
                    e && i.push({ type: "header", key: "header", isSticky: a, chunk: { elRef: this.headerElRef, tableClassName: "fc-col-header", rowContent: e } }),
                    t &&
                        (i.push({ type: "body", key: "all-day", chunk: { content: t } }),
                        i.push({
                            type: "body",
                            key: "all-day-divider",
                            outerContent: ko("tr", { role: "presentation", className: "fc-scrollgrid-section" }, ko("td", { className: "fc-timegrid-divider " + r.theme.getClass("tableCellShaded") })),
                        })),
                    i.push({ type: "body", key: "body", liquid: !0, expandRows: Boolean(r.options.expandRows), chunk: { scrollerElRef: this.scrollerElRef, content: n } }),
                    ko(Ei, { viewSpec: r.viewSpec, elRef: this.rootElRef }, function (e, t) {
                        return ko("div", { className: ["fc-timegrid"].concat(t).join(" "), ref: e }, ko(qs, { liquid: !o.isHeightAuto && !o.forPrint, collapsibleWidth: o.forPrint, cols: [{ width: "shrink" }], sections: i }));
                    })
                );
            }),
            (Uc.prototype.renderHScrollLayout = function (e, t, n, r, o, i, a) {
                var s = this,
                    l = this.context.pluginHooks.scrollGridImpl;
                if (!l) throw new Error("No ScrollGrid implementation");
                var u = this.context,
                    c = this.props,
                    d = !c.forPrint && zs(u.options),
                    p = !c.forPrint && js(u.options),
                    f = [];
                e &&
                    f.push({
                        type: "header",
                        key: "header",
                        isSticky: d,
                        syncRowHeights: !0,
                        chunks: [
                            {
                                key: "axis",
                                rowContent: function (e) {
                                    return ko("tr", { role: "presentation" }, s.renderHeadAxis("day", e.rowSyncHeights[0]));
                                },
                            },
                            { key: "cols", elRef: this.headerElRef, tableClassName: "fc-col-header", rowContent: e },
                        ],
                    }),
                    t &&
                        (f.push({
                            type: "body",
                            key: "all-day",
                            syncRowHeights: !0,
                            chunks: [
                                {
                                    key: "axis",
                                    rowContent: function (e) {
                                        return ko("tr", { role: "presentation" }, s.renderTableRowAxis(e.rowSyncHeights[0]));
                                    },
                                },
                                { key: "cols", content: t },
                            ],
                        }),
                        f.push({
                            key: "all-day-divider",
                            type: "body",
                            outerContent: ko("tr", { role: "presentation", className: "fc-scrollgrid-section" }, ko("td", { colSpan: 2, className: "fc-timegrid-divider " + u.theme.getClass("tableCellShaded") })),
                        }));
                var h = u.options.nowIndicator;
                return (
                    f.push({
                        type: "body",
                        key: "body",
                        liquid: !0,
                        expandRows: Boolean(u.options.expandRows),
                        chunks: [
                            {
                                key: "axis",
                                content: function (e) {
                                    return ko(
                                        "div",
                                        { className: "fc-timegrid-axis-chunk" },
                                        ko("table", { "aria-hidden": !0, style: { height: e.expandRows ? e.clientHeight : "" } }, e.tableColGroupNode, ko("tbody", null, ko(Ac, { slatMetas: i }))),
                                        ko(
                                            "div",
                                            { className: "fc-timegrid-now-indicator-container" },
                                            ko(os, { unit: h ? "minute" : "day" }, function (e) {
                                                var o = h && a && a.safeComputeTop(e);
                                                return "number" == typeof o
                                                    ? ko(tl, { isAxis: !0, date: e }, function (e, t, n, r) {
                                                          return ko("div", { ref: e, className: ["fc-timegrid-now-indicator-arrow"].concat(t).join(" "), style: { top: o } }, r);
                                                      })
                                                    : null;
                                            })
                                        )
                                    );
                                },
                            },
                            { key: "cols", scrollerElRef: this.scrollerElRef, content: n },
                        ],
                    }),
                    p &&
                        f.push({
                            key: "footer",
                            type: "footer",
                            isSticky: !0,
                            chunks: [
                                { key: "axis", content: Bs },
                                { key: "cols", content: Bs },
                            ],
                        }),
                    ko(Ei, { viewSpec: u.viewSpec, elRef: this.rootElRef }, function (e, t) {
                        return ko(
                            "div",
                            { className: ["fc-timegrid"].concat(t).join(" "), ref: e },
                            ko(l, { liquid: !c.isHeightAuto && !c.forPrint, collapsibleWidth: !1, colGroups: [{ width: "shrink", cols: [{ width: "shrink" }] }, { cols: [{ span: r, minWidth: o }] }], sections: f })
                        );
                    })
                );
            }),
            (Uc.prototype.getAllDayMaxEventProps = function () {
                var e = this.context.options,
                    t = e.dayMaxEvents,
                    e = e.dayMaxEventRows;
                return (!0 !== t && !0 !== e) || ((t = void 0), (e = 5)), { dayMaxEvents: t, dayMaxEventRows: e };
            }),
            Uc);
    function Uc() {
        var r = (null !== Hc && Hc.apply(this, arguments)) || this;
        return (
            (r.allDaySplitter = new kc()),
            (r.headerElRef = Mo()),
            (r.rootElRef = Mo()),
            (r.scrollerElRef = Mo()),
            (r.state = { slatCoords: null }),
            (r.handleScrollTopRequest = function (e) {
                var t = r.scrollerElRef.current;
                t && (t.scrollTop = e);
            }),
            (r.renderHeadAxis = function (e, o) {
                void 0 === o && (o = "");
                var t = r.context.options,
                    n = r.props.dateProfile.renderRange,
                    i = 1 === Je(n.start, n.end) ? to(r.context, n.start, "week") : {};
                return t.weekNumbers && "day" === e
                    ? ko(fl, { date: n.start, defaultFormat: Lc }, function (e, t, n, r) {
                          return ko(
                              "th",
                              { ref: e, "aria-hidden": !0, className: ["fc-timegrid-axis", "fc-scrollgrid-shrink"].concat(t).join(" ") },
                              ko(
                                  "div",
                                  { className: "fc-timegrid-axis-frame fc-scrollgrid-shrink-frame fc-timegrid-axis-frame-liquid", style: { height: o } },
                                  ko("a", I({ ref: n, className: "fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner" }, i), r)
                              )
                          );
                      })
                    : ko("th", { "aria-hidden": !0, className: "fc-timegrid-axis" }, ko("div", { className: "fc-timegrid-axis-frame", style: { height: o } }));
            }),
            (r.renderTableRowAxis = function (o) {
                var e = r.context,
                    t = e.options,
                    e = e.viewApi,
                    e = { text: t.allDayText, view: e };
                return ko(ii, { hookProps: e, classNames: t.allDayClassNames, content: t.allDayContent, defaultContent: Vc, didMount: t.allDayDidMount, willUnmount: t.allDayWillUnmount }, function (e, t, n, r) {
                    return ko(
                        "td",
                        { ref: e, "aria-hidden": !0, className: ["fc-timegrid-axis", "fc-scrollgrid-shrink"].concat(t).join(" ") },
                        ko(
                            "div",
                            { className: "fc-timegrid-axis-frame fc-scrollgrid-shrink-frame" + (null == o ? " fc-timegrid-axis-frame-liquid" : ""), style: { height: o } },
                            ko("span", { className: "fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner", ref: n }, r)
                        )
                    );
                });
            }),
            (r.handleSlatCoords = function (e) {
                r.setState({ slatCoords: e });
            }),
            r
        );
    }
    function Wc() {
        return (null !== Oc && Oc.apply(this, arguments)) || this;
    }
    function Vc(e) {
        return e.text;
    }
    var Fc,
        Bc,
        zc =
            ((Zc.prototype.safeComputeTop = function (e) {
                var t = this.dateProfile;
                if (Fn(t.currentRange, e)) {
                    var n = nt(e),
                        n = e.valueOf() - n.valueOf();
                    if (n >= xt(t.slotMinTime) && n < xt(t.slotMaxTime)) return this.computeTimeTop(wt(n));
                }
                return null;
            }),
            (Zc.prototype.computeDateTop = function (e, t) {
                return (t = t || nt(e)), this.computeTimeTop(wt(e.valueOf() - t.valueOf()));
            }),
            (Zc.prototype.computeTimeTop = function (e) {
                var t = this.positions,
                    n = this.dateProfile,
                    r = t.els.length,
                    e = (e.milliseconds - xt(n.slotMinTime)) / xt(this.slotDuration),
                    e = Math.max(0, e);
                return (e = Math.min(r, e)), (n = Math.floor(e)), (r = e - (n = Math.min(n, r - 1))), t.tops[n] + t.getHeight(n) * r;
            }),
            Zc),
        jc =
            (t(Yc, (Bc = jo)),
            (Yc.prototype.render = function () {
                var n = this.props,
                    r = this.context,
                    a = r.options,
                    s = n.slatElRefs;
                return ko(
                    "tbody",
                    null,
                    n.slatMetas.map(function (o, e) {
                        var t = { time: o.time, date: r.dateEnv.toDate(o.date), view: r.viewApi },
                            i = ["fc-timegrid-slot", "fc-timegrid-slot-lane", o.isLabeled ? "" : "fc-timegrid-slot-minor"];
                        return ko(
                            "tr",
                            { key: o.key, ref: s.createRef(o.key) },
                            n.axis && ko(Pc, I({}, o)),
                            ko(ii, { hookProps: t, classNames: a.slotLaneClassNames, content: a.slotLaneContent, didMount: a.slotLaneDidMount, willUnmount: a.slotLaneWillUnmount }, function (e, t, n, r) {
                                return ko("td", { ref: e, className: i.concat(t).join(" "), "data-time": o.isoTimeStr }, r);
                            })
                        );
                    })
                );
            }),
            Yc),
        Gc =
            (t(qc, (Fc = jo)),
            (qc.prototype.render = function () {
                var e = this.props,
                    t = this.context;
                return ko(
                    "div",
                    { ref: this.rootElRef, className: "fc-timegrid-slots" },
                    ko(
                        "table",
                        { "aria-hidden": !0, className: t.theme.getClass("table"), style: { minWidth: e.tableMinWidth, width: e.clientWidth, height: e.minHeight } },
                        e.tableColGroupNode,
                        ko(jc, { slatElRefs: this.slatElRefs, axis: e.axis, slatMetas: e.slatMetas })
                    )
                );
            }),
            (qc.prototype.componentDidMount = function () {
                this.updateSizing();
            }),
            (qc.prototype.componentDidUpdate = function () {
                this.updateSizing();
            }),
            (qc.prototype.componentWillUnmount = function () {
                this.props.onCoords && this.props.onCoords(null);
            }),
            (qc.prototype.updateSizing = function () {
                var t,
                    e = this.context,
                    n = this.props;
                n.onCoords &&
                    null !== n.clientWidth &&
                    this.rootElRef.current.offsetHeight &&
                    n.onCoords(
                        new zc(
                            new mo(
                                this.rootElRef.current,
                                ((t = this.slatElRefs.currentMap),
                                n.slatMetas.map(function (e) {
                                    return t[e.key];
                                })),
                                !1,
                                !0
                            ),
                            this.props.dateProfile,
                            e.options.slotDuration
                        )
                    );
            }),
            qc);
    function qc() {
        var e = (null !== Fc && Fc.apply(this, arguments)) || this;
        return (e.rootElRef = Mo()), (e.slatElRefs = new xs()), e;
    }
    function Yc() {
        return (null !== Bc && Bc.apply(this, arguments)) || this;
    }
    function Zc(e, t, n) {
        (this.positions = e), (this.dateProfile = t), (this.slotDuration = n);
    }
    function Xc(e, t) {
        for (var n = [], r = 0; r < t; r += 1) n.push([]);
        if (e) for (r = 0; r < e.length; r += 1) n[e[r].col].push(e[r]);
        return n;
    }
    function Kc(e, t) {
        var n = [];
        if (e) {
            for (a = 0; a < t; a += 1) n[a] = { affectedInstances: e.affectedInstances, isEvent: e.isEvent, segs: [] };
            for (var r = 0, o = e.segs; r < o.length; r++) {
                var i = o[r];
                n[i.col].segs.push(i);
            }
        } else for (var a = 0; a < t; a += 1) n[a] = null;
        return n;
    }
    var $c,
        Jc =
            (t(Qc, ($c = jo)),
            (Qc.prototype.render = function () {
                var l = this,
                    u = this.props;
                return ko(
                    Sl,
                    {
                        allDayDate: null,
                        moreCnt: u.hiddenSegs.length,
                        allSegs: u.hiddenSegs,
                        hiddenSegs: u.hiddenSegs,
                        alignmentElRef: this.rootElRef,
                        defaultContent: ed,
                        extraDateSpan: u.extraDateSpan,
                        dateProfile: u.dateProfile,
                        todayRange: u.todayRange,
                        popoverContent: function () {
                            return vd(u.hiddenSegs, u);
                        },
                    },
                    function (t, e, n, r, o, i, a, s) {
                        return ko(
                            "a",
                            {
                                ref: function (e) {
                                    Zo(t, e), Zo(l.rootElRef, e);
                                },
                                className: ["fc-timegrid-more-link"].concat(e).join(" "),
                                style: { top: u.top, bottom: u.bottom },
                                onClick: o,
                                title: i,
                                "aria-expanded": a,
                                "aria-controls": s,
                            },
                            ko("div", { ref: n, className: "fc-timegrid-more-link-inner fc-sticky" }, r)
                        );
                    }
                );
            }),
            Qc);
    function Qc() {
        var e = (null !== $c && $c.apply(this, arguments)) || this;
        return (e.rootElRef = Mo()), e;
    }
    function ed(e) {
        return e.shortText;
    }
    function td(e, t) {
        if (!e) return [[], 0];
        for (var n = e.level, r = e.lateralStart, o = e.lateralEnd, i = r, a = []; i < o; ) a.push(t(n, i)), (i += 1);
        return a.sort(nd), [a.map(rd), a[0][1]];
    }
    function nd(e, t) {
        return t[1] - e[1];
    }
    function rd(e) {
        return e[0];
    }
    function od(r, o) {
        var i = {};
        return function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var n = r.apply(void 0, e);
            return n in i ? i[n] : (i[n] = o.apply(void 0, e));
        };
    }
    function id(e, t, n, r) {
        void 0 === r && (r = 0);
        var o = [];
        if ((n = void 0 === n ? null : n))
            for (var i = 0; i < e.length; i += 1) {
                var a = e[i],
                    s = n.computeDateTop(a.start, t),
                    a = Math.max(s + (r || 0), n.computeDateTop(a.end, t));
                o.push({ start: Math.round(s), end: Math.round(a) });
            }
        return o;
    }
    var ad,
        sd,
        ld,
        ud = tn({ hour: "numeric", minute: "2-digit", meridiem: !1 }),
        cd =
            (t(gd, (ld = jo)),
            (gd.prototype.render = function () {
                var e = ["fc-timegrid-event", "fc-v-event"];
                return this.props.isShort && e.push("fc-timegrid-event-short"), ko($s, I({}, this.props, { defaultTimeFormat: ud, extraClassNames: e }));
            }),
            gd),
        dd =
            (t(hd, (sd = jo)),
            (hd.prototype.render = function () {
                var e = this.props;
                return ko(ol, { date: e.date, dateProfile: e.dateProfile, todayRange: e.todayRange, extraHookProps: e.extraHookProps }, function (e, t) {
                    return t && ko("div", { className: "fc-timegrid-col-misc", ref: e }, t);
                });
            }),
            hd),
        pd =
            (t(fd, (ad = jo)),
            (fd.prototype.render = function () {
                var r = this,
                    o = this.props,
                    e = this.context,
                    i = e.options.selectMirror,
                    a = (o.eventDrag && o.eventDrag.segs) || (o.eventResize && o.eventResize.segs) || (i && o.dateSelectionSegs) || [],
                    s = (o.eventDrag && o.eventDrag.affectedInstances) || (o.eventResize && o.eventResize.affectedInstances) || {},
                    l = this.sortEventSegs(o.fgEventSegs, e.options.eventOrder);
                return ko(ll, { elRef: o.elRef, date: o.date, dateProfile: o.dateProfile, todayRange: o.todayRange, extraHookProps: o.extraHookProps }, function (e, t, n) {
                    return ko(
                        "td",
                        I({ ref: e, role: "gridcell", className: ["fc-timegrid-col"].concat(t, o.extraClassNames || []).join(" ") }, n, o.extraDataAttrs),
                        ko(
                            "div",
                            { className: "fc-timegrid-col-frame" },
                            ko("div", { className: "fc-timegrid-col-bg" }, r.renderFillSegs(o.businessHourSegs, "non-business"), r.renderFillSegs(o.bgEventSegs, "bg-event"), r.renderFillSegs(o.dateSelectionSegs, "highlight")),
                            ko("div", { className: "fc-timegrid-col-events" }, r.renderFgSegs(l, s, !1, !1, !1)),
                            ko("div", { className: "fc-timegrid-col-events" }, r.renderFgSegs(a, {}, Boolean(o.eventDrag), Boolean(o.eventResize), Boolean(i))),
                            ko("div", { className: "fc-timegrid-now-indicator-container" }, r.renderNowIndicator(o.nowIndicatorSegs)),
                            ko(dd, { date: o.date, dateProfile: o.dateProfile, todayRange: o.todayRange, extraHookProps: o.extraHookProps })
                        )
                    );
                });
            }),
            (fd.prototype.renderFgSegs = function (e, t, n, r, o) {
                var i = this.props;
                return i.forPrint ? vd(e, i) : this.renderPositionedFgSegs(e, t, n, r, o);
            }),
            (fd.prototype.renderPositionedFgSegs = function (e, s, l, u, c) {
                var d = this,
                    t = this.context.options,
                    n = t.eventMaxStack,
                    p = t.eventShortHeight,
                    r = t.eventOrderStrict,
                    o = t.eventMinHeight,
                    i = this.props,
                    a = i.date,
                    t = i.slatCoords,
                    f = i.eventSelection,
                    h = i.todayRange,
                    g = i.nowDate,
                    v = l || u || c,
                    r = (function (e, t, n, r) {
                        for (var o = [], i = [], a = 0; a < e.length; a += 1) {
                            var s = t[a];
                            s ? o.push({ index: a, thickness: 1, span: s }) : i.push(e[a]);
                        }
                        for (
                            var n = (function (e, t, n) {
                                    var r = new la();
                                    null != t && (r.strictOrder = t), null != n && (r.maxStackCnt = n);
                                    var p,
                                        o,
                                        i,
                                        a,
                                        s,
                                        e = pa(r.addSegs(e)),
                                        r =
                                            ((o = (p = r).entriesByLevel),
                                            (i = od(
                                                function (e, t) {
                                                    return e + ":" + t;
                                                },
                                                function (c, d) {
                                                    var e = td(
                                                            (function () {
                                                                for (var e = p.levelCoords, t = p.entriesByLevel, n = t[c][d], r = e[c] + n.thickness, o = e.length, i = c; i < o && e[i] < r; i += 1);
                                                                for (; i < o; i += 1) {
                                                                    for (var a, s = t[i], l = va(s, n.span.start, ca), l = l[0] + l[1], u = l; (a = s[u]) && a.span.start < n.span.end; ) u += 1;
                                                                    if (l < u) return { level: i, lateralStart: l, lateralEnd: u };
                                                                }
                                                                return null;
                                                            })(),
                                                            i
                                                        ),
                                                        t = o[c][d];
                                                    return [I(I({}, t), { nextLevelNodes: e[0] }), t.thickness + e[1]];
                                                }
                                            )),
                                            td(o.length ? { level: 0, lateralStart: 0, lateralEnd: o[0].length } : null, i)[0]),
                                        f = od(
                                            function (e, t, n) {
                                                return da(e);
                                            },
                                            function (e, t, n) {
                                                var r,
                                                    o = e.nextLevelNodes,
                                                    i = e.thickness,
                                                    a = i + n,
                                                    i = i / a,
                                                    s = [];
                                                if (o.length)
                                                    for (var l = 0, u = o; l < u.length; l++) {
                                                        var c,
                                                            d = u[l];
                                                        void 0 === r ? (r = (c = f(d, t, a))[0]) : (c = f(d, r, 0)), s.push(c[1]);
                                                    }
                                                else r = 1;
                                                i *= r - t;
                                                return [r - i, I(I({}, e), { thickness: i, nextLevelNodes: s })];
                                            }
                                        );
                                    return {
                                        segRects:
                                            ((r = r.map(function (e) {
                                                return f(e, 0, 0)[1];
                                            })),
                                            (a = []),
                                            (s = od(
                                                function (e, t, n) {
                                                    return da(e);
                                                },
                                                function (e, t, n) {
                                                    var r = I(I({}, e), { levelCoord: t, stackDepth: n, stackForward: 0 });
                                                    return a.push(r), (r.stackForward = l(e.nextLevelNodes, t + e.thickness, n + 1) + 1);
                                                }
                                            )),
                                            l(r, 0, 0),
                                            a),
                                        hiddenGroups: e,
                                    };
                                    function l(e, t, n) {
                                        for (var r = 0, o = 0, i = e; o < i.length; o++) var a = i[o], r = Math.max(s(a, t, n), r);
                                        return r;
                                    }
                                })(o, n, r),
                                r = n.segRects,
                                n = n.hiddenGroups,
                                l = [],
                                u = 0,
                                c = r;
                            u < c.length;
                            u++
                        ) {
                            var d = c[u];
                            l.push({ seg: e[d.index], rect: d });
                        }
                        for (var p = 0, f = i; p < f.length; p++) {
                            var h = f[p];
                            l.push({ seg: h, rect: null });
                        }
                        return { segPlacements: l, hiddenGroups: n };
                    })(e, id(e, a, t, o), r, n),
                    n = r.segPlacements,
                    r = r.hiddenGroups;
                return ko(
                    Io,
                    null,
                    this.renderHiddenGroups(r, e),
                    n.map(function (e) {
                        var t = e.seg,
                            n = e.rect,
                            r = t.eventRange.instance.instanceId,
                            o = v || Boolean(!s[r] && n),
                            i = md(n && n.span),
                            a = !v && n ? d.computeSegHStyle(n) : { left: 0, right: 0 },
                            e = Boolean(n) && 0 < n.stackForward,
                            n = Boolean(n) && n.span.end - n.span.start < p;
                        return ko(
                            "div",
                            { className: "fc-timegrid-event-harness" + (e ? " fc-timegrid-event-harness-inset" : ""), key: r, style: I(I({ visibility: o ? "" : "hidden" }, i), a) },
                            ko(cd, I({ seg: t, isDragging: l, isResizing: u, isDateSelecting: c, isSelected: r === f, isShort: n }, er(t, h, g)))
                        );
                    })
                );
            }),
            (fd.prototype.renderHiddenGroups = function (e, r) {
                var t = this.props,
                    o = t.extraDateSpan,
                    i = t.dateProfile,
                    a = t.todayRange,
                    s = t.nowDate,
                    l = t.eventSelection,
                    u = t.eventDrag,
                    c = t.eventResize;
                return ko(
                    Io,
                    null,
                    e.map(function (e) {
                        var t,
                            n = md(e.span),
                            e =
                                ((e = e.entries),
                                (t = r),
                                e.map(function (e) {
                                    return t[e.index];
                                }));
                        return ko(Jc, { key: Pt(Tl(e)), hiddenSegs: e, top: n.top, bottom: n.bottom, extraDateSpan: o, dateProfile: i, todayRange: a, nowDate: s, eventSelection: l, eventDrag: u, eventResize: c });
                    })
                );
            }),
            (fd.prototype.renderFillSegs = function (n, r) {
                var o = this.props,
                    e = this.context,
                    e = id(n, o.date, o.slatCoords, e.options.eventMinHeight).map(function (e, t) {
                        t = n[t];
                        return ko("div", { key: nr(t.eventRange), className: "fc-timegrid-bg-harness", style: md(e) }, "bg-event" === r ? ko(dl, I({ seg: t }, er(t, o.todayRange, o.nowDate))) : cl(r));
                    });
                return ko(Io, null, e);
            }),
            (fd.prototype.renderNowIndicator = function (e) {
                var t = this.props,
                    i = t.slatCoords,
                    a = t.date;
                return i
                    ? e.map(function (o, e) {
                          return ko(tl, { isAxis: !1, date: a, key: e }, function (e, t, n, r) {
                              return ko("div", { ref: e, className: ["fc-timegrid-now-indicator-line"].concat(t).join(" "), style: { top: i.computeDateTop(o.start, a) } }, r);
                          });
                      })
                    : null;
            }),
            (fd.prototype.computeSegHStyle = function (e) {
                var t,
                    n = this.context,
                    r = n.isRtl,
                    o = n.options.slotEventOverlap,
                    i = e.levelCoord,
                    n = e.levelCoord + e.thickness;
                o && (n = Math.min(1, i + 2 * (n - i)));
                (n = r ? ((t = 1 - n), i) : ((t = i), 1 - n)), (n = { zIndex: e.stackDepth + 1, left: 100 * t + "%", right: 100 * n + "%" });
                return o && !e.stackForward && (n[r ? "marginLeft" : "marginRight"] = 20), n;
            }),
            fd);
    function fd() {
        var e = (null !== ad && ad.apply(this, arguments)) || this;
        return (e.sortEventSegs = Lt(Zn)), e;
    }
    function hd() {
        return (null !== sd && sd.apply(this, arguments)) || this;
    }
    function gd() {
        return (null !== ld && ld.apply(this, arguments)) || this;
    }
    function vd(e, t) {
        var n = t.todayRange,
            r = t.nowDate,
            o = t.eventSelection,
            i = t.eventDrag,
            t = t.eventResize,
            a = (i ? i.affectedInstances : null) || (t ? t.affectedInstances : null) || {};
        return ko(
            Io,
            null,
            e.map(function (e) {
                var t = e.eventRange.instance.instanceId;
                return ko("div", { key: t, style: { visibility: a[t] ? "hidden" : "" } }, ko(cd, I({ seg: e, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: t === o, isShort: !1 }, er(e, n, r))));
            })
        );
    }
    function md(e) {
        return e ? { top: e.start, bottom: -e.end } : { top: "", bottom: "" };
    }
    var yd,
        Ed =
            (t(Sd, (yd = jo)),
            (Sd.prototype.render = function () {
                var n = this,
                    r = this.props,
                    o = this.context.options.nowIndicator && r.slatCoords && r.slatCoords.safeComputeTop(r.nowDate),
                    e = r.cells.length,
                    i = this.splitFgEventSegs(r.fgEventSegs, e),
                    a = this.splitBgEventSegs(r.bgEventSegs, e),
                    s = this.splitBusinessHourSegs(r.businessHourSegs, e),
                    l = this.splitNowIndicatorSegs(r.nowIndicatorSegs, e),
                    u = this.splitDateSelectionSegs(r.dateSelectionSegs, e),
                    c = this.splitEventDrag(r.eventDrag, e),
                    d = this.splitEventResize(r.eventResize, e);
                return ko(
                    "div",
                    { className: "fc-timegrid-cols", ref: this.rootElRef },
                    ko(
                        "table",
                        { role: "presentation", style: { minWidth: r.tableMinWidth, width: r.clientWidth } },
                        r.tableColGroupNode,
                        ko(
                            "tbody",
                            { role: "presentation" },
                            ko(
                                "tr",
                                { role: "row" },
                                r.axis &&
                                    ko(
                                        "td",
                                        { "aria-hidden": !0, className: "fc-timegrid-col fc-timegrid-axis" },
                                        ko(
                                            "div",
                                            { className: "fc-timegrid-col-frame" },
                                            ko(
                                                "div",
                                                { className: "fc-timegrid-now-indicator-container" },
                                                "number" == typeof o &&
                                                    ko(tl, { isAxis: !0, date: r.nowDate }, function (e, t, n, r) {
                                                        return ko("div", { ref: e, className: ["fc-timegrid-now-indicator-arrow"].concat(t).join(" "), style: { top: o } }, r);
                                                    })
                                            )
                                        )
                                    ),
                                r.cells.map(function (e, t) {
                                    return ko(pd, {
                                        key: e.key,
                                        elRef: n.cellElRefs.createRef(e.key),
                                        dateProfile: r.dateProfile,
                                        date: e.date,
                                        nowDate: r.nowDate,
                                        todayRange: r.todayRange,
                                        extraHookProps: e.extraHookProps,
                                        extraDataAttrs: e.extraDataAttrs,
                                        extraClassNames: e.extraClassNames,
                                        extraDateSpan: e.extraDateSpan,
                                        fgEventSegs: i[t],
                                        bgEventSegs: a[t],
                                        businessHourSegs: s[t],
                                        nowIndicatorSegs: l[t],
                                        dateSelectionSegs: u[t],
                                        eventDrag: c[t],
                                        eventResize: d[t],
                                        slatCoords: r.slatCoords,
                                        eventSelection: r.eventSelection,
                                        forPrint: r.forPrint,
                                    });
                                })
                            )
                        )
                    )
                );
            }),
            (Sd.prototype.componentDidMount = function () {
                this.updateCoords();
            }),
            (Sd.prototype.componentDidUpdate = function () {
                this.updateCoords();
            }),
            (Sd.prototype.updateCoords = function () {
                var t,
                    e = this.props;
                e.onColCoords &&
                    null !== e.clientWidth &&
                    e.onColCoords(
                        new mo(
                            this.rootElRef.current,
                            ((t = this.cellElRefs.currentMap),
                            e.cells.map(function (e) {
                                return t[e.key];
                            })),
                            !0,
                            !1
                        )
                    );
            }),
            Sd);
    function Sd() {
        var e = (null !== yd && yd.apply(this, arguments)) || this;
        return (
            (e.splitFgEventSegs = Lt(Xc)),
            (e.splitBgEventSegs = Lt(Xc)),
            (e.splitBusinessHourSegs = Lt(Xc)),
            (e.splitNowIndicatorSegs = Lt(Xc)),
            (e.splitDateSelectionSegs = Lt(Xc)),
            (e.splitEventDrag = Lt(Kc)),
            (e.splitEventResize = Lt(Kc)),
            (e.rootElRef = Mo()),
            (e.cellElRefs = new xs()),
            e
        );
    }
    var bd,
        Dd =
            (t(Cd, (bd = Ko)),
            (Cd.prototype.render = function () {
                var e = this.props,
                    t = this.state;
                return ko(
                    "div",
                    { className: "fc-timegrid-body", ref: this.handleRootEl, style: { width: e.clientWidth, minWidth: e.tableMinWidth } },
                    ko(Gc, {
                        axis: e.axis,
                        dateProfile: e.dateProfile,
                        slatMetas: e.slatMetas,
                        clientWidth: e.clientWidth,
                        minHeight: e.expandRows ? e.clientHeight : "",
                        tableMinWidth: e.tableMinWidth,
                        tableColGroupNode: e.axis ? e.tableColGroupNode : null,
                        onCoords: this.handleSlatCoords,
                    }),
                    ko(Ed, {
                        cells: e.cells,
                        axis: e.axis,
                        dateProfile: e.dateProfile,
                        businessHourSegs: e.businessHourSegs,
                        bgEventSegs: e.bgEventSegs,
                        fgEventSegs: e.fgEventSegs,
                        dateSelectionSegs: e.dateSelectionSegs,
                        eventSelection: e.eventSelection,
                        eventDrag: e.eventDrag,
                        eventResize: e.eventResize,
                        todayRange: e.todayRange,
                        nowDate: e.nowDate,
                        nowIndicatorSegs: e.nowIndicatorSegs,
                        clientWidth: e.clientWidth,
                        tableMinWidth: e.tableMinWidth,
                        tableColGroupNode: e.tableColGroupNode,
                        slatCoords: t.slatCoords,
                        onColCoords: this.handleColCoords,
                        forPrint: e.forPrint,
                    })
                );
            }),
            (Cd.prototype.componentDidMount = function () {
                this.scrollResponder = this.context.createScrollResponder(this.handleScrollRequest);
            }),
            (Cd.prototype.componentDidUpdate = function (e) {
                this.scrollResponder.update(e.dateProfile !== this.props.dateProfile);
            }),
            (Cd.prototype.componentWillUnmount = function () {
                this.scrollResponder.detach();
            }),
            (Cd.prototype.queryHit = function (e, t) {
                var n = this.context,
                    r = n.dateEnv,
                    o = n.options,
                    i = this.colCoords,
                    a = this.props.dateProfile,
                    s = this.state.slatCoords,
                    l = this.processSlotOptions(this.props.slotDuration, o.snapDuration),
                    u = l.snapDuration,
                    c = l.snapsPerSlot,
                    n = i.leftToIndex(e),
                    o = s.positions.topToIndex(t);
                if (null == n || null == o) return null;
                (l = this.props.cells[n]),
                    (e = s.positions.tops[o]),
                    (s = s.positions.getHeight(o)),
                    (t = o * c + Math.floor(((t - e) / s) * c)),
                    (c = this.props.cells[n].date),
                    (t = Tt(a.slotMinTime, _t(u, t))),
                    (t = r.add(c, t)),
                    (u = r.add(t, u));
                return { dateProfile: a, dateSpan: I({ range: { start: t, end: u }, allDay: !1 }, l.extraDateSpan), dayEl: i.els[n], rect: { left: i.lefts[n], right: i.rights[n], top: e, bottom: e + s }, layer: 0 };
            }),
            Cd);
    function Cd() {
        var r = (null !== bd && bd.apply(this, arguments)) || this;
        return (
            (r.processSlotOptions = Lt(wd)),
            (r.state = { slatCoords: null }),
            (r.handleRootEl = function (e) {
                e ? r.context.registerInteractiveComponent(r, { el: e, isHitComboAllowed: r.props.isHitComboAllowed }) : r.context.unregisterInteractiveComponent(r);
            }),
            (r.handleScrollRequest = function (e) {
                var t = r.props.onScrollTopRequest,
                    n = r.state.slatCoords;
                return !(!t || !n) && (e.time && ((e = n.computeTimeTop(e.time)), (e = Math.ceil(e)) && (e += 1), t(e)), !0);
            }),
            (r.handleColCoords = function (e) {
                r.colCoords = e;
            }),
            (r.handleSlatCoords = function (e) {
                r.setState({ slatCoords: e }), r.props.onSlatCoords && r.props.onSlatCoords(e);
            }),
            r
        );
    }
    function wd(e, t) {
        var n = t || e,
            t = Mt(e, n);
        return null === t && ((n = e), (t = 1)), { snapDuration: n, snapsPerSlot: t };
    }
    var Rd,
        Td,
        _d =
            (t(Md, (Td = gs)),
            (Md.prototype.sliceRange = function (e, t) {
                for (var n = [], r = 0; r < t.length; r += 1) {
                    var o = Ln(e, t[r]);
                    o && n.push({ start: o.start, end: o.end, isStart: o.start.valueOf() === e.start.valueOf(), isEnd: o.end.valueOf() === e.end.valueOf(), col: r });
                }
                return n;
            }),
            Md),
        kd =
            (t(xd, (Rd = Ko)),
            (xd.prototype.render = function () {
                var n = this,
                    r = this.props,
                    o = this.context,
                    i = r.dateProfile,
                    a = r.dayTableModel,
                    s = o.options.nowIndicator,
                    l = this.buildDayRanges(a, i, o.dateEnv);
                return ko(os, { unit: s ? "minute" : "day" }, function (e, t) {
                    return ko(
                        Dd,
                        I({ ref: n.timeColsRef }, n.slicer.sliceProps(r, i, null, o, l), {
                            forPrint: r.forPrint,
                            axis: r.axis,
                            dateProfile: i,
                            slatMetas: r.slatMetas,
                            slotDuration: r.slotDuration,
                            cells: a.cells[0],
                            tableColGroupNode: r.tableColGroupNode,
                            tableMinWidth: r.tableMinWidth,
                            clientWidth: r.clientWidth,
                            clientHeight: r.clientHeight,
                            expandRows: r.expandRows,
                            nowDate: e,
                            nowIndicatorSegs: s && n.slicer.sliceNowDate(e, o, l),
                            todayRange: t,
                            onScrollTopRequest: r.onScrollTopRequest,
                            onSlatCoords: r.onSlatCoords,
                        })
                    );
                });
            }),
            xd);
    function xd() {
        var e = (null !== Rd && Rd.apply(this, arguments)) || this;
        return (e.buildDayRanges = Lt(Id)), (e.slicer = new _d()), (e.timeColsRef = Mo()), e;
    }
    function Md() {
        return (null !== Td && Td.apply(this, arguments)) || this;
    }
    function Id(e, t, n) {
        for (var r = [], o = 0, i = e.headerDates; o < i.length; o++) {
            var a = i[o];
            r.push({ start: n.add(a, t.slotMinTime), end: n.add(a, t.slotMaxTime) });
        }
        return r;
    }
    var Pd = [{ hours: 1 }, { minutes: 30 }, { minutes: 15 }, { seconds: 30 }, { seconds: 15 }];
    function Nd(e, t, n, r, o) {
        for (
            var i = new Date(0),
                a = e,
                s = wt(0),
                l =
                    n ||
                    (function (e) {
                        for (var t, n, r = Pd.length - 1; 0 <= r; --r) if (null !== (n = Mt((t = wt(Pd[r])), e)) && 1 < n) return t;
                        return e;
                    })(r),
                u = [];
            xt(a) < xt(t);

        ) {
            var c = o.add(i, a),
                d = null !== Mt(s, l);
            u.push({ date: c, time: a, key: c.toISOString(), isoTimeStr: Ht(c), isLabeled: d }), (a = Tt(a, r)), (s = Tt(s, r));
        }
        return u;
    }
    var Hd,
        zl =
            (t(Od, (Hd = Fo)),
            (Od.prototype.render = function () {
                function e(e) {
                    return ko(
                        kd,
                        I({}, u.timed, {
                            dayTableModel: l,
                            dateProfile: s,
                            axis: p,
                            slotDuration: r.slotDuration,
                            slatMetas: c,
                            forPrint: a.forPrint,
                            tableColGroupNode: e.tableColGroupNode,
                            tableMinWidth: e.tableMinWidth,
                            clientWidth: e.clientWidth,
                            clientHeight: e.clientHeight,
                            onSlatCoords: t.handleSlatCoords,
                            expandRows: e.expandRows,
                            onScrollTopRequest: t.handleScrollTopRequest,
                        })
                    );
                }
                var t = this,
                    n = this.context,
                    r = n.options,
                    o = n.dateEnv,
                    i = n.dateProfileGenerator,
                    a = this.props,
                    s = a.dateProfile,
                    l = this.buildTimeColsModel(s, i),
                    u = this.allDaySplitter.splitProps(a),
                    c = this.buildSlatMetas(s.slotMinTime, s.slotMaxTime, r.slotLabelInterval, r.slotDuration, o),
                    d = r.dayMinWidth,
                    p = !d,
                    n = d,
                    i = r.dayHeaders && ko(cs, { dates: l.headerDates, dateProfile: s, datesRepDistinctDays: !0, renderIntro: p ? this.renderHeadAxis : null }),
                    o =
                        !1 !== r.allDaySlot &&
                        function (e) {
                            return ko(
                                bc,
                                I(
                                    {},
                                    u.allDay,
                                    {
                                        dateProfile: s,
                                        dayTableModel: l,
                                        nextDayThreshold: r.nextDayThreshold,
                                        tableMinWidth: e.tableMinWidth,
                                        colGroupNode: e.tableColGroupNode,
                                        renderRowIntro: p ? t.renderTableRowAxis : null,
                                        showWeekNumbers: !1,
                                        expandRows: !1,
                                        headerAlignElRef: t.headerElRef,
                                        clientWidth: e.clientWidth,
                                        clientHeight: e.clientHeight,
                                        forPrint: a.forPrint,
                                    },
                                    t.getAllDayMaxEventProps()
                                )
                            );
                        };
                return n ? this.renderHScrollLayout(i, o, e, l.colCnt, d, c, this.state.slatCoords) : this.renderSimpleLayout(i, o, e);
            }),
            Od);
    function Od() {
        var e = (null !== Hd && Hd.apply(this, arguments)) || this;
        return (e.buildTimeColsModel = Lt(Ad)), (e.buildSlatMetas = Lt(Nd)), e;
    }
    function Ad(e, t) {
        t = new fs(e.renderRange, t);
        return new hs(t, !1);
    }
    var Ld,
        uu = Jo({
            initialView: "timeGridWeek",
            optionRefiners: { allDaySlot: Boolean },
            views: {
                timeGrid: { component: zl, usesMinMaxTime: !0, allDaySlot: !0, slotDuration: "00:30:00", slotEventOverlap: !0 },
                timeGridDay: { type: "timeGrid", duration: { days: 1 } },
                timeGridWeek: { type: "timeGrid", duration: { weeks: 1 } },
            },
        }),
        Ud =
            (t(Wd, (Ld = jo)),
            (Wd.prototype.render = function () {
                var e = this.context,
                    o = e.theme,
                    t = e.dateEnv,
                    n = e.options,
                    r = e.viewApi,
                    i = this.props,
                    a = i.cellId,
                    s = i.dayDate,
                    l = i.todayRange,
                    u = this.state.textId,
                    e = $r(s, l),
                    i = n.listDayFormat ? t.format(s, n.listDayFormat) : "",
                    l = n.listDaySideFormat ? t.format(s, n.listDaySideFormat) : "",
                    l = I({ date: t.toDate(s), view: r, textId: u, text: i, sideText: l, navLinkAttrs: to(this.context, s), sideNavLinkAttrs: to(this.context, s, "day", !1) }, e),
                    c = ["fc-list-day"].concat(Jr(e, o));
                return ko(ii, { hookProps: l, classNames: n.dayHeaderClassNames, content: n.dayHeaderContent, defaultContent: Vd, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, function (e, t, n, r) {
                    return ko(
                        "tr",
                        { ref: e, className: c.concat(t).join(" "), "data-date": Nt(s) },
                        ko("th", { scope: "colgroup", colSpan: 3, id: a, "aria-labelledby": u }, ko("div", { className: "fc-list-day-cushion " + o.getClass("tableCellShaded"), ref: n }, r))
                    );
                });
            }),
            Wd);
    function Wd() {
        var e = (null !== Ld && Ld.apply(this, arguments)) || this;
        return (e.state = { textId: Ce() }), e;
    }
    function Vd(e) {
        return ko(Io, null, e.text && ko("a", I({ id: e.textId, className: "fc-list-day-text" }, e.navLinkAttrs), e.text), e.sideText && ko("a", I({ "aria-hidden": !0, className: "fc-list-day-side-text" }, e.sideNavLinkAttrs), e.sideText));
    }
    var Fd,
        Bd = tn({ hour: "numeric", minute: "2-digit", meridiem: "short" }),
        zd =
            (t(jd, (Fd = jo)),
            (jd.prototype.render = function () {
                var e = this.props,
                    i = this.context,
                    a = e.seg,
                    s = e.timeHeaderId,
                    l = e.eventHeaderId,
                    u = e.dateHeaderId,
                    c = i.options.eventTimeFormat || Bd;
                return ko(
                    Ks,
                    {
                        seg: a,
                        timeText: "",
                        disableDragging: !0,
                        disableResizing: !0,
                        defaultContent: function () {
                            return (t = rr((e = a), i)), ko("a", I({}, t), e.eventRange.def.title);
                            var e, t;
                        },
                        isPast: e.isPast,
                        isFuture: e.isFuture,
                        isToday: e.isToday,
                        isSelected: e.isSelected,
                        isDragging: e.isDragging,
                        isResizing: e.isResizing,
                        isDateSelecting: e.isDateSelecting,
                    },
                    function (e, t, n, r, o) {
                        return ko(
                            "tr",
                            { className: ["fc-list-event", o.event.url ? "fc-event-forced-url" : ""].concat(t).join(" "), ref: e },
                            (function (e, t, n, o, i) {
                                var r = n.options;
                                if (!1 === r.displayEventTime) return null;
                                var a = e.eventRange.def,
                                    s = e.eventRange.instance,
                                    l = !1,
                                    u = void 0;
                                if (
                                    (a.allDay
                                        ? (l = !0)
                                        : Nn(e.eventRange.range)
                                        ? e.isStart
                                            ? (u = Qn(e, t, n, null, null, s.range.start, e.end))
                                            : e.isEnd
                                            ? (u = Qn(e, t, n, null, null, e.start, s.range.end))
                                            : (l = !0)
                                        : (u = Qn(e, t, n)),
                                    l)
                                ) {
                                    n = { text: n.options.allDayText, view: n.viewApi };
                                    return ko(ii, { hookProps: n, classNames: r.allDayClassNames, content: r.allDayContent, defaultContent: Gd, didMount: r.allDayDidMount, willUnmount: r.allDayWillUnmount }, function (e, t, n, r) {
                                        return ko("td", { ref: e, headers: o + " " + i, className: ["fc-list-event-time"].concat(t).join(" ") }, r);
                                    });
                                }
                                return ko("td", { className: "fc-list-event-time" }, u);
                            })(a, c, i, s, u),
                            ko("td", { "aria-hidden": !0, className: "fc-list-event-graphic" }, ko("span", { className: "fc-list-event-dot", style: { borderColor: o.borderColor || o.backgroundColor } })),
                            ko("td", { ref: n, headers: l + " " + u, className: "fc-list-event-title" }, r)
                        );
                    }
                );
            }),
            jd);
    function jd() {
        return (null !== Fd && Fd.apply(this, arguments)) || this;
    }
    function Gd(e) {
        return e.text;
    }
    var qd,
        cu =
            (t(Yd, (qd = Ko)),
            (Yd.prototype.render = function () {
                var n = this,
                    r = this.props,
                    e = this.context,
                    o = ["fc-list", e.theme.getClass("table"), !1 !== e.options.stickyHeaderDates ? "fc-list-sticky" : ""],
                    t = this.computeDateVars(r.dateProfile),
                    i = t.dayDates,
                    t = t.dayRanges,
                    a = this.eventStoreToSegs(r.eventStore, r.eventUiBases, t);
                return ko(Ei, { viewSpec: e.viewSpec, elRef: this.setRootEl }, function (e, t) {
                    return ko(
                        "div",
                        { ref: e, className: o.concat(t).join(" ") },
                        ko(ks, { liquid: !r.isHeightAuto, overflowX: r.isHeightAuto ? "visible" : "hidden", overflowY: r.isHeightAuto ? "visible" : "auto" }, 0 < a.length ? n.renderSegList(a, i) : n.renderEmptyMessage())
                    );
                });
            }),
            (Yd.prototype.renderEmptyMessage = function () {
                var e = this.context,
                    t = e.options,
                    e = e.viewApi,
                    e = { text: t.noEventsText, view: e };
                return ko(ii, { hookProps: e, classNames: t.noEventsClassNames, content: t.noEventsContent, defaultContent: Zd, didMount: t.noEventsDidMount, willUnmount: t.noEventsWillUnmount }, function (e, t, n, r) {
                    return ko("div", { className: ["fc-list-empty"].concat(t).join(" "), ref: e }, ko("div", { className: "fc-list-empty-cushion", ref: n }, r));
                });
            }),
            (Yd.prototype.renderSegList = function (e, c) {
                var t = this.context,
                    d = t.theme,
                    p = t.options,
                    t = this.state,
                    f = t.timeHeaderId,
                    h = t.eventHeaderId,
                    g = t.dateHeaderIdRoot,
                    v = (function (e) {
                        for (var t, n = [], r = 0; r < e.length; r += 1) (n[(t = e[r]).dayIndex] || (n[t.dayIndex] = [])).push(t);
                        return n;
                    })(e);
                return ko(os, { unit: "day" }, function (e, t) {
                    for (var n = [], r = 0; r < v.length; r += 1) {
                        var o = v[r];
                        if (o) {
                            var i = Nt(c[r]),
                                a = g + "-" + i;
                            n.push(ko(Ud, { key: i, cellId: a, dayDate: c[r], todayRange: t }));
                            for (var s = 0, l = Zn(o, p.eventOrder); s < l.length; s++) {
                                var u = l[s];
                                n.push(
                                    ko(zd, I({ key: i + ":" + u.eventRange.instance.instanceId, seg: u, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, timeHeaderId: f, eventHeaderId: h, dateHeaderId: a }, er(u, t, e)))
                                );
                            }
                        }
                    }
                    return ko(
                        "table",
                        { className: "fc-list-table " + d.getClass("table") },
                        ko("thead", null, ko("tr", null, ko("th", { scope: "col", id: f }, p.timeHint), ko("th", { scope: "col", "aria-hidden": !0 }), ko("th", { scope: "col", id: h }, p.eventHint))),
                        ko("tbody", null, n)
                    );
                });
            }),
            (Yd.prototype._eventStoreToSegs = function (e, t, n) {
                return this.eventRangesToSegs(Bn(e, t, this.props.dateProfile.activeRange, this.context.options.nextDayThreshold).fg, n);
            }),
            (Yd.prototype.eventRangesToSegs = function (e, t) {
                for (var n = [], r = 0, o = e; r < o.length; r++) {
                    var i = o[r];
                    n.push.apply(n, this.eventRangeToSegs(i, t));
                }
                return n;
            }),
            (Yd.prototype.eventRangeToSegs = function (e, t) {
                for (var n, r, o = this.context.dateEnv, i = this.context.options.nextDayThreshold, a = e.range, s = e.def.allDay, l = [], u = 0; u < t.length; u += 1)
                    if (
                        (n = Ln(a, t[u])) &&
                        ((r = { component: this, eventRange: e, start: n.start, end: n.end, isStart: e.isStart && n.start.valueOf() === a.start.valueOf(), isEnd: e.isEnd && n.end.valueOf() === a.end.valueOf(), dayIndex: u }),
                        l.push(r),
                        !r.isEnd && !s && u + 1 < t.length && a.end < o.add(t[u + 1].start, i))
                    ) {
                        (r.end = a.end), (r.isEnd = !0);
                        break;
                    }
                return l;
            }),
            Yd);
    function Yd() {
        var t = (null !== qd && qd.apply(this, arguments)) || this;
        return (
            (t.computeDateVars = Lt(Xd)),
            (t.eventStoreToSegs = Lt(t._eventStoreToSegs)),
            (t.state = { timeHeaderId: Ce(), eventHeaderId: Ce(), dateHeaderIdRoot: Ce() }),
            (t.setRootEl = function (e) {
                e ? t.context.registerInteractiveComponent(t, { el: e }) : t.context.unregisterInteractiveComponent(t);
            }),
            t
        );
    }
    function Zd(e) {
        return e.text;
    }
    function Xd(e) {
        for (var t = nt(e.renderRange.start), n = e.renderRange.end, r = [], o = []; t < n; ) r.push(t), o.push({ start: t, end: Xe(t, 1) }), (t = Xe(t, 1));
        return { dayDates: r, dayRanges: o };
    }
    function Kd(e) {
        return !1 === e ? null : tn(e);
    }
    var $d,
        mu = Jo({
            optionRefiners: { listDayFormat: Kd, listDaySideFormat: Kd, noEventsClassNames: pn, noEventsContent: pn, noEventsDidMount: pn, noEventsWillUnmount: pn },
            views: {
                list: { component: cu, buttonTextKey: "list", listDayFormat: { month: "long", day: "numeric", year: "numeric" } },
                listDay: { type: "list", duration: { days: 1 }, listDayFormat: { weekday: "long" } },
                listWeek: { type: "list", duration: { weeks: 1 }, listDayFormat: { weekday: "long" }, listDaySideFormat: { month: "long", day: "numeric", year: "numeric" } },
                listMonth: { type: "list", duration: { month: 1 }, listDaySideFormat: { weekday: "long" } },
                listYear: { type: "list", duration: { year: 1 }, listDaySideFormat: { weekday: "long" } },
            },
        }),
        Eu = (t(Jd, ($d = bo)), Jd);
    function Jd() {
        return (null !== $d && $d.apply(this, arguments)) || this;
    }
    (Eu.prototype.classes = {
        root: "fc-theme-bootstrap",
        table: "table-bordered",
        tableCellShaded: "table-active",
        buttonGroup: "btn-group",
        button: "btn btn-primary",
        buttonActive: "active",
        popover: "popover",
        popoverHeader: "popover-header",
        popoverContent: "popover-body",
    }),
        (Eu.prototype.baseIconClass = "fa"),
        (Eu.prototype.iconClasses = { close: "fa-times", prev: "fa-chevron-left", next: "fa-chevron-right", prevYear: "fa-angle-double-left", nextYear: "fa-angle-double-right" }),
        (Eu.prototype.rtlIconClasses = { prev: "fa-chevron-right", next: "fa-chevron-left", prevYear: "fa-angle-double-right", nextYear: "fa-angle-double-left" }),
        (Eu.prototype.iconOverrideOption = "bootstrapFontAwesome"),
        (Eu.prototype.iconOverrideCustomButtonOption = "bootstrapFontAwesome"),
        (Eu.prototype.iconOverridePrefix = "fa-");
    (Su = Jo({ themeClasses: { bootstrap: Eu } })),
        (bu = Jo({
            eventSourceDefs: [
                {
                    parseMeta: function (e) {
                        var t,
                            n,
                            r = e.googleCalendarId;
                        return (
                            !r &&
                                e.url &&
                                ((t = e.url),
                                (r = /^[^/]+@([^/.]+\.)*(google|googlemail|gmail)\.com$/.test(t)
                                    ? t
                                    : (n = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^/]*)/.exec(t)) || (n = /^https?:\/\/www.google.com\/calendar\/feeds\/([^/]*)/.exec(t))
                                    ? decodeURIComponent(n[1])
                                    : null)),
                            r ? { googleCalendarId: r, googleCalendarApiKey: e.googleCalendarApiKey, googleCalendarApiBase: e.googleCalendarApiBase, extraParams: e.extraParams } : null
                        );
                    },
                    fetch: function (e, r, o) {
                        var i,
                            t,
                            n = e.context,
                            a = n.dateEnv,
                            s = n.options,
                            l = e.eventSource.meta,
                            n = l.googleCalendarApiKey || s.googleCalendarApiKey;
                        n
                            ? ((s = (l.googleCalendarApiBase || "https://www.googleapis.com/calendar/v3/calendars") + "/" + encodeURIComponent(l.googleCalendarId) + "/events"),
                              (l = "function" == typeof (l = l.extraParams) ? l() : l),
                              Ui(
                                  "GET",
                                  s,
                                  (i =
                                      ((e = e.range),
                                      (n = n),
                                      (l = l),
                                      (e = (a = a).canComputeOffset ? ((t = a.formatIso(e.start)), a.formatIso(e.end)) : ((t = Xe(e.start, -1).toISOString()), Xe(e.end, 1).toISOString())),
                                      (e = I(I({}, l || {}), { key: n, timeMin: t, timeMax: e, singleEvents: !0, maxResults: 9999 })),
                                      "local" !== a.timeZone && (e.timeZone = a.timeZone),
                                      e)),
                                  function (e, t) {
                                      var n;
                                      e.error
                                          ? o({ message: "Google Calendar API: " + e.error.message, errors: e.error.errors, xhr: t })
                                          : r({
                                                rawEvents:
                                                    ((e = e.items),
                                                    (n = i.timeZone),
                                                    e.map(function (e) {
                                                        return (
                                                            (e = (t = e).htmlLink || null) &&
                                                                n &&
                                                                ((r = "ctz=" + n),
                                                                (e = e.replace(/(\?.*?)?(#|$)/, function (e, t, n) {
                                                                    return (t ? t + "&" : "?") + r + n;
                                                                }))),
                                                            {
                                                                id: t.id,
                                                                title: t.summary,
                                                                start: t.start.dateTime || t.start.date,
                                                                end: t.end.dateTime || t.end.date,
                                                                url: e,
                                                                location: t.location,
                                                                description: t.description,
                                                                attachments: t.attachments || [],
                                                                extendedProps: (t.extendedProperties || {}).shared || {},
                                                            }
                                                        );
                                                        var t, r;
                                                    })),
                                                xhr: t,
                                            });
                                  },
                                  function (e, t) {
                                      o({ message: e, xhr: t });
                                  }
                              ))
                            : o({ message: "Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/" });
                    },
                },
            ],
            optionRefiners: { googleCalendarApiKey: String },
            eventSourceRefiners: { googleCalendarApiKey: String, googleCalendarId: String, googleCalendarApiBase: String, extraParams: pn },
        }));
    return (
        Fi.push(Mu, Rr, uu, mu, Su, bu),
        (e.BASE_OPTION_DEFAULTS = rn),
        (e.BASE_OPTION_REFINERS = nn),
        (e.BaseComponent = jo),
        (e.BgEvent = dl),
        (e.BootstrapTheme = Eu),
        (e.Calendar = Ml),
        (e.CalendarApi = yr),
        (e.CalendarContent = La),
        (e.CalendarDataManager = Yi),
        (e.CalendarDataProvider = aa),
        (e.CalendarRoot = Ya),
        (e.Component = _o),
        (e.ContentHook = li),
        (e.CustomContentRenderContext = ai),
        (e.DateComponent = Ko),
        (e.DateEnv = xr),
        (e.DateProfileGenerator = Ri),
        (e.DayCellContent = ol),
        (e.DayCellRoot = ll),
        (e.DayGridView = se),
        (e.DayHeader = cs),
        (e.DaySeriesModel = fs),
        (e.DayTable = bc),
        (e.DayTableModel = hs),
        (e.DayTableSlicer = Sc),
        (e.DayTimeCols = kd),
        (e.DayTimeColsSlicer = _d),
        (e.DayTimeColsView = zl),
        (e.DelayedRunner = Bi),
        (e.Draggable = _u),
        (e.ElementDragging = ba),
        (e.ElementScrollController = Eo),
        (e.Emitter = fo),
        (e.EventApi = Er),
        (e.EventRoot = Ks),
        (e.EventSourceApi = de),
        (e.FeaturefulElementDragging = Zl),
        (e.Fragment = Io),
        (e.Interaction = ma),
        (e.ListView = cu),
        (e.MoreLinkRoot = Sl),
        (e.MountHook = pi),
        (e.NamedTimeZoneImpl = function (e) {
            this.timeZoneName = e;
        }),
        (e.NowIndicatorRoot = tl),
        (e.NowTimer = os),
        (e.PointerDragging = Ol),
        (e.PositionCache = mo),
        (e.RefMap = xs),
        (e.RenderHook = ii),
        (e.ScrollController = yo),
        (e.ScrollResponder = Ao),
        (e.Scroller = ks),
        (e.SegHierarchy = la),
        (e.SimpleScrollGrid = qs),
        (e.Slicer = gs),
        (e.Splitter = Zr),
        (e.StandardEvent = $s),
        (e.Table = hc),
        (e.TableDateCell = ts),
        (e.TableDowCell = rs),
        (e.TableView = Iu),
        (e.Theme = bo),
        (e.ThirdPartyDraggable = xu),
        (e.TimeCols = Dd),
        (e.TimeColsSlatsCoords = zc),
        (e.TimeColsView = Fo),
        (e.ViewApi = pr),
        (e.ViewContextType = Lo),
        (e.ViewRoot = Ei),
        (e.WeekNumberRoot = fl),
        (e.WindowScrollController = So),
        (e.addDays = Xe),
        (e.addDurations = Tt),
        (e.addMs = Ke),
        (e.addWeeks = Ze),
        (e.allowContextMenu = Le),
        (e.allowSelection = Oe),
        (e.applyMutationToEventStore = dr),
        (e.applyStyle = ye),
        (e.applyStyleProp = Ee),
        (e.asCleanDays = function (e) {
            return e.years || e.months || e.milliseconds ? 0 : e.days;
        }),
        (e.asRoughMinutes = function (e) {
            return xt(e) / 6e4;
        }),
        (e.asRoughMs = xt),
        (e.asRoughSeconds = function (e) {
            return xt(e) / 1e3;
        }),
        (e.binarySearch = va),
        (e.buildClassNameNormalizer = gi),
        (e.buildDayRanges = Id),
        (e.buildDayTableModel = Rc),
        (e.buildEntryKey = da),
        (e.buildEventApis = Cr),
        (e.buildEventRangeKey = nr),
        (e.buildHashFromArray = function (e, t) {
            for (var n = {}, r = 0; r < e.length; r += 1) {
                var o = t(e[r], r);
                n[o[0]] = o[1];
            }
            return n;
        }),
        (e.buildIsoString = Pt),
        (e.buildNavLinkAttrs = to),
        (e.buildSegCompareObj = Xn),
        (e.buildSegTimeText = Qn),
        (e.buildSlatMetas = Nd),
        (e.buildTimeColsModel = Ad),
        (e.collectFromHash = St),
        (e.combineEventUis = Dn),
        (e.compareByFieldSpec = Ve),
        (e.compareByFieldSpecs = We),
        (e.compareNumbers = je),
        (e.compareObjs = Et),
        (e.computeEarliestSegStart = Tl),
        (e.computeEdges = so),
        (e.computeFallbackHeaderFormat = Xa),
        (e.computeHeightAndMargins = function (e) {
            return e.getBoundingClientRect().height + ((e = window.getComputedStyle(e)), parseInt(e.marginTop, 10) + parseInt(e.marginBottom, 10));
        }),
        (e.computeInnerRect = lo),
        (e.computeRect = uo),
        (e.computeSegDraggable = Kn),
        (e.computeSegEndResizable = Jn),
        (e.computeSegStartResizable = $n),
        (e.computeShrinkWidth = Ps),
        (e.computeSmallestCellWidth = qe),
        (e.computeVisibleDayRange = Pn),
        (e.config = Da),
        (e.constrainPoint = zr),
        (e.createAriaClickAttrs = ke),
        (e.createContext = Po),
        (e.createDuration = wt),
        (e.createElement = ko),
        (e.createEmptyEventStore = function () {
            return { defs: {}, instances: {} };
        }),
        (e.createEventInstance = ct),
        (e.createEventUi = bn),
        (e.createFormatter = tn),
        (e.createPlugin = Jo),
        (e.createPortal = No),
        (e.createRef = Mo),
        (e.diffDates = Hn),
        (e.diffDayAndTime = Qe),
        (e.diffDays = Je),
        (e.diffPoints = Gr),
        (e.diffWeeks = $e),
        (e.diffWholeDays = tt),
        (e.diffWholeWeeks = et),
        (e.disableCursor = Pe),
        (e.elementClosest = he),
        (e.elementMatches = ge),
        (e.enableCursor = Ne),
        (e.eventTupleToStore = hn),
        (e.filterEventStoreDefs = mn),
        (e.filterHash = ft),
        (e.findDirectChildren = function (e, t) {
            for (var n = e instanceof HTMLElement ? [e] : e, r = [], o = 0; o < n.length; o += 1)
                for (var i = n[o].children, a = 0; a < i.length; a += 1) {
                    var s = i[a];
                    (t && !ge(s, t)) || r.push(s);
                }
            return r;
        }),
        (e.findElements = ve),
        (e.flexibleCompare = Fe),
        (e.flushToDom = Ho),
        (e.formatDate = function (e, t) {
            var n = Lr((t = void 0 === t ? {} : t)),
                t = tn(t),
                e = n.createMarkerMeta(e);
            return e ? n.format(e.marker, t, { forcedTzo: e.forcedTzo }) : "";
        }),
        (e.formatDayString = Nt),
        (e.formatIsoTimeString = Ht),
        (e.formatRange = function (e, t, n) {
            var r = Lr("object" == typeof n && n ? n : {}),
                o = tn(n),
                e = r.createMarkerMeta(e),
                t = r.createMarkerMeta(t);
            return e && t ? r.formatRange(e.marker, t.marker, o, { forcedStartTzo: e.forcedTzo, forcedEndTzo: t.forcedTzo, isEndExclusive: n.isEndExclusive, defaultSeparator: rn.defaultRangeSeparator }) : "";
        }),
        (e.getAllowYScrolling = Hs),
        (e.getCanVGrowWithinCell = qr),
        (e.getClippingParents = co),
        (e.getDateMeta = $r),
        (e.getDayClassNames = Jr),
        (e.getDefaultEventEnd = cr),
        (e.getElRoot = be),
        (e.getElSeg = Gn),
        (e.getEntrySpanEnd = ca),
        (e.getEventClassNames = tr),
        (e.getEventTargetViaRoot = Se),
        (e.getIsRtlScrollbarOnLeft = oo),
        (e.getRectCenter = jr),
        (e.getRelevantEvents = gn),
        (e.getScrollGridClassNames = Vs),
        (e.getScrollbarWidths = io),
        (e.getSectionClassNames = Fs),
        (e.getSectionHasLiquidHeight = Ns),
        (e.getSegAnchorAttrs = rr),
        (e.getSegMeta = er),
        (e.getSlotClassNames = function (e, t) {
            var n = ["fc-slot", "fc-slot-" + Ye[e.dow]];
            return e.isDisabled ? n.push("fc-slot-disabled") : (e.isToday && (n.push("fc-slot-today"), n.push(t.getClass("today"))), e.isPast && n.push("fc-slot-past"), e.isFuture && n.push("fc-slot-future")), n;
        }),
        (e.getStickyFooterScrollbar = js),
        (e.getStickyHeaderDates = zs),
        (e.getUnequalProps = yt),
        (e.getUniqueDomId = Ce),
        (e.globalLocales = Mr),
        (e.globalPlugins = Fi),
        (e.greatestDurationDenominator = It),
        (e.groupIntersectingEntries = pa),
        (e.guid = Ie),
        (e.hasBgRendering = zn),
        (e.hasShrinkWidth = Ws),
        (e.identity = pn),
        (e.interactionSettingsStore = Sa),
        (e.interactionSettingsToStore = Ea),
        (e.intersectRanges = Ln),
        (e.intersectRects = Br),
        (e.intersectSpans = ha),
        (e.isArraysEqual = At),
        (e.isColPropsEqual = As),
        (e.isDateSelectionValid = bs),
        (e.isDateSpansEqual = ir),
        (e.isInt = Ge),
        (e.isInteractionValid = Ss),
        (e.isMultiDayRange = Nn),
        (e.isPropsEqual = mt),
        (e.isPropsValid = Cs),
        (e.isValidDate = lt),
        (e.joinSpans = fa),
        (e.listenBySelector = Re),
        (e.mapHash = ht),
        (e.memoize = Lt),
        (e.memoizeArraylike = function (i, a, s) {
            var l = this,
                u = [],
                c = [];
            return function (e) {
                for (var t, n = u.length, r = e.length, o = 0; o < n; o += 1) e[o] ? At(u[o], e[o]) || (s && s(c[o]), (t = i.apply(l, e[o])), (a && a(t, c[o])) || (c[o] = t)) : s && s(c[o]);
                for (; o < r; o += 1) c[o] = i.apply(l, e[o]);
                return (u = e), c.splice(r), c;
            };
        }),
        (e.memoizeHashlike = function (o, i, a) {
            var s = this,
                l = {},
                u = {};
            return function (e) {
                var t,
                    n,
                    r = {};
                for (t in e) u[t] ? (At(l[t], e[t]) ? (r[t] = u[t]) : (a && a(u[t]), (n = o.apply(s, e[t])), (r[t] = i && i(n, u[t]) ? u[t] : n))) : (r[t] = o.apply(s, e[t]));
                return (l = e), (u = r);
            };
        }),
        (e.memoizeObjArg = Ut),
        (e.mergeEventStores = vn),
        (e.multiplyDuration = _t),
        (e.padStart = Be),
        (e.parseBusinessHours = Vr),
        (e.parseClassNames = yn),
        (e.parseDragMeta = Ra),
        (e.parseEventDef = Mn),
        (e.parseFieldSpecs = Ue),
        (e.parseMarker = kr),
        (e.pointInsideRect = Fr),
        (e.preventContextMenu = Ae),
        (e.preventDefault = we),
        (e.preventSelection = He),
        (e.rangeContainsMarker = Fn),
        (e.rangeContainsRange = Vn),
        (e.rangesEqual = Un),
        (e.rangesIntersect = Wn),
        (e.refineEventDef = kn),
        (e.refineProps = dn),
        (e.removeElement = fe),
        (e.removeExact = function (e, t) {
            for (var n = 0, r = 0; r < e.length; ) e[r] === t ? (e.splice(r, 1), (n += 1)) : (r += 1);
            return n;
        }),
        (e.render = xo),
        (e.renderChunkContent = Os),
        (e.renderFill = cl),
        (e.renderMicroColGroup = Ls),
        (e.renderScrollShim = Bs),
        (e.requestJson = Ui),
        (e.sanitizeShrinkWidth = Us),
        (e.setElSeg = jn),
        (e.setRef = Zo),
        (e.sliceEventStore = Bn),
        (e.sliceEvents = function (e, t) {
            return Bn(e.eventStore, e.eventUiBases, e.dateProfile.activeRange, t ? e.nextDayThreshold : null).fg;
        }),
        (e.sortEventSegs = Zn),
        (e.startOfDay = nt),
        (e.translateRect = function (e, t, n) {
            return { left: e.left + t, right: e.right + t, top: e.top + n, bottom: e.bottom + n };
        }),
        (e.triggerDateSelect = lr),
        (e.unmountComponentAtNode = Oo),
        (e.unpromisify = po),
        (e.version = "5.10.1"),
        (e.whenTransitionDone = _e),
        (e.wholeDivideDurations = Mt),
        Object.defineProperty(e, "__esModule", { value: !0 }),
        e
    );
})({});

"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[381],{

/***/ 41161:
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Children: () => (/* binding */ O),
/* harmony export */   Component: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Component),
/* harmony export */   Fragment: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   PureComponent: () => (/* binding */ w),
/* harmony export */   StrictMode: () => (/* binding */ vn),
/* harmony export */   Suspense: () => (/* binding */ D),
/* harmony export */   SuspenseList: () => (/* binding */ V),
/* harmony export */   __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => (/* binding */ rn),
/* harmony export */   cloneElement: () => (/* binding */ cn),
/* harmony export */   createContext: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createContext),
/* harmony export */   createElement: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createElement),
/* harmony export */   createFactory: () => (/* binding */ on),
/* harmony export */   createPortal: () => (/* binding */ j),
/* harmony export */   createRef: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createRef),
/* harmony export */   "default": () => (/* binding */ bn),
/* harmony export */   findDOMNode: () => (/* binding */ an),
/* harmony export */   flushSync: () => (/* binding */ hn),
/* harmony export */   forwardRef: () => (/* binding */ k),
/* harmony export */   hydrate: () => (/* binding */ q),
/* harmony export */   isValidElement: () => (/* binding */ ln),
/* harmony export */   lazy: () => (/* binding */ M),
/* harmony export */   memo: () => (/* binding */ R),
/* harmony export */   render: () => (/* binding */ Y),
/* harmony export */   startTransition: () => (/* binding */ dn),
/* harmony export */   unmountComponentAtNode: () => (/* binding */ fn),
/* harmony export */   unstable_batchedUpdates: () => (/* binding */ sn),
/* harmony export */   useCallback: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback),
/* harmony export */   useContext: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext),
/* harmony export */   useDebugValue: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue),
/* harmony export */   useDeferredValue: () => (/* binding */ pn),
/* harmony export */   useEffect: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect),
/* harmony export */   useErrorBoundary: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useErrorBoundary),
/* harmony export */   useId: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId),
/* harmony export */   useImperativeHandle: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle),
/* harmony export */   useInsertionEffect: () => (/* binding */ yn),
/* harmony export */   useLayoutEffect: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect),
/* harmony export */   useMemo: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo),
/* harmony export */   useReducer: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer),
/* harmony export */   useRef: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef),
/* harmony export */   useState: () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState),
/* harmony export */   useSyncExternalStore: () => (/* binding */ _n),
/* harmony export */   useTransition: () => (/* binding */ mn),
/* harmony export */   version: () => (/* binding */ un)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ 49453);
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ 77462);




function g(n, t) {
  for (var e in t) n[e] = t[e];
  return n;
}
function C(n, t) {
  for (var e in n) if ("__source" !== e && !(e in t)) return !0;
  for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
  return !1;
}
function E(n, t) {
  return n === t && (0 !== n || 1 / n == 1 / t) || n != n && t != t;
}
function w(n) {
  this.props = n;
}
function R(n, e) {
  function r(n) {
    var t = this.props.ref,
      r = t == n.ref;
    return !r && t && (t.call ? t(null) : t.current = null), e ? !e(this.props, n) || !r : C(this.props, n);
  }
  function u(e) {
    return this.shouldComponentUpdate = r, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(n, e);
  }
  return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.prototype.isReactComponent = !0, u.__f = !0, u;
}
(w.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).isPureReactComponent = !0, w.prototype.shouldComponentUpdate = function (n, t) {
  return C(this.props, n) || C(this.state, t);
};
var x = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), x && x(n);
};
var N = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function k(n) {
  function t(t) {
    var e = g({}, t);
    return delete e.ref, n(e, t.ref || null);
  }
  return t.$$typeof = N, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
var A = function (n, t) {
    return null == n ? null : (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).map(t));
  },
  O = {
    map: A,
    forEach: A,
    count: function (n) {
      return n ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).length : 0;
    },
    only: function (n) {
      var t = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n);
      if (1 !== t.length) throw "Children.only";
      return t[0];
    },
    toArray: preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray
  },
  T = preact__WEBPACK_IMPORTED_MODULE_0__.options.__e;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__e = function (n, t, e, r) {
  if (n.then) for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), u.__c(n, t);
  T(n, t, e, r);
};
var I = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;
function L(n, t, e) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function (n) {
    "function" == typeof n.__c && n.__c();
  }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c = null), n.__k = n.__k && n.__k.map(function (n) {
    return L(n, t, e);
  })), n;
}
function U(n, t, e) {
  return n && (n.__v = null, n.__k = n.__k && n.__k.map(function (n) {
    return U(n, t, e);
  }), n.__c && n.__c.__P === t && (n.__e && e.insertBefore(n.__e, n.__d), n.__c.__e = !0, n.__c.__P = e)), n;
}
function D() {
  this.__u = 0, this.t = null, this.__b = null;
}
function F(n) {
  var t = n.__.__c;
  return t && t.__a && t.__a(n);
}
function M(n) {
  var e, r, u;
  function o(o) {
    if (e || (e = n()).then(function (n) {
      r = n.default || n;
    }, function (n) {
      u = n;
    }), u) throw u;
    if (!r) throw e;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(r, o);
  }
  return o.displayName = "Lazy", o.__f = !0, o;
}
function V() {
  this.u = null, this.o = null;
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (n) {
  var t = n.__c;
  t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), I && I(n);
}, (D.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).__c = function (n, t) {
  var e = t.__c,
    r = this;
  null == r.t && (r.t = []), r.t.push(e);
  var u = F(r.__v),
    o = !1,
    i = function () {
      o || (o = !0, e.__R = null, u ? u(l) : l());
    };
  e.__R = i;
  var l = function () {
      if (! --r.__u) {
        if (r.state.__a) {
          var n = r.state.__a;
          r.__v.__k[0] = U(n, n.__c.__P, n.__c.__O);
        }
        var t;
        for (r.setState({
          __a: r.__b = null
        }); t = r.t.pop();) t.forceUpdate();
      }
    },
    c = !0 === t.__h;
  r.__u++ || c || r.setState({
    __a: r.__b = r.__v.__k[0]
  }), n.then(i, i);
}, D.prototype.componentWillUnmount = function () {
  this.t = [];
}, D.prototype.render = function (n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var r = document.createElement("div"),
        o = this.__v.__k[0].__c;
      this.__v.__k[0] = L(this.__b, r, o.__O = o.__P);
    }
    this.__b = null;
  }
  var i = e.__a && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, n.fallback);
  return i && (i.__h = null), [(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, e.__a ? null : n.children), i];
};
var W = function (n, t, e) {
  if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
    for (; e.length > 3;) e.pop()();
    if (e[1] < e[0]) break;
    n.u = e = e[2];
  }
};
function P(n) {
  return this.getChildContext = function () {
    return n.context;
  }, n.children;
}
function $(n) {
  var e = this,
    r = n.i;
  e.componentWillUnmount = function () {
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== r && e.componentWillUnmount(), n.__v ? (e.l || (e.i = r, e.l = {
    nodeType: 1,
    parentNode: r,
    childNodes: [],
    appendChild: function (n) {
      this.childNodes.push(n), e.i.appendChild(n);
    },
    insertBefore: function (n, t) {
      this.childNodes.push(n), e.i.appendChild(n);
    },
    removeChild: function (n) {
      this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.i.removeChild(n);
    }
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(P, {
    context: e.context
  }, n.__v), e.l)) : e.l && e.componentWillUnmount();
}
function j(n, e) {
  var r = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)($, {
    __v: n,
    i: e
  });
  return r.containerInfo = e, r;
}
(V.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).__a = function (n) {
  var t = this,
    e = F(t.__v),
    r = t.o.get(n);
  return r[0]++, function (u) {
    var o = function () {
      t.props.revealOrder ? (r.push(u), W(t, n, r)) : u();
    };
    e ? e(o) : o();
  };
}, V.prototype.render = function (n) {
  this.u = null, this.o = new Map();
  var t = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
  for (var e = t.length; e--;) this.o.set(t[e], this.u = [1, 0, this.u]);
  return n.children;
}, V.prototype.componentDidUpdate = V.prototype.componentDidMount = function () {
  var n = this;
  this.o.forEach(function (t, e) {
    W(n, e, t);
  });
};
var z = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
  B = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
  H = "undefined" != typeof document,
  Z = function (n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n);
  };
function Y(n, t, e) {
  return null == t.__k && (t.textContent = ""), (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function q(n, t, e) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.hydrate)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (t) {
  Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype, t, {
    configurable: !0,
    get: function () {
      return this["UNSAFE_" + t];
    },
    set: function (n) {
      Object.defineProperty(this, t, {
        configurable: !0,
        writable: !0,
        value: n
      });
    }
  });
});
var G = preact__WEBPACK_IMPORTED_MODULE_0__.options.event;
function J() {}
function K() {
  return this.cancelBubble;
}
function Q() {
  return this.defaultPrevented;
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.event = function (n) {
  return G && (n = G(n)), n.persist = J, n.isPropagationStopped = K, n.isDefaultPrevented = Q, n.nativeEvent = n;
};
var X,
  nn = {
    configurable: !0,
    get: function () {
      return this.class;
    }
  },
  tn = preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode;
preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode = function (n) {
  var t = n.type,
    e = n.props,
    u = e;
  if ("string" == typeof t) {
    var o = -1 === t.indexOf("-");
    for (var i in u = {}, e) {
      var l = e[i];
      H && "children" === i && "noscript" === t || "value" === i && "defaultValue" in e && null == l || ("defaultValue" === i && "value" in e && null == e.value ? i = "value" : "download" === i && !0 === l ? l = "" : /ondoubleclick/i.test(i) ? i = "ondblclick" : /^onchange(textarea|input)/i.test(i + t) && !Z(e.type) ? i = "oninput" : /^onfocus$/i.test(i) ? i = "onfocusin" : /^onblur$/i.test(i) ? i = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i) ? i = i.toLowerCase() : o && B.test(i) ? i = i.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l && (l = void 0), /^oninput$/i.test(i) && (i = i.toLowerCase(), u[i] && (i = "oninputCapture")), u[i] = l);
    }
    "select" == t && u.multiple && Array.isArray(u.value) && (u.value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(e.children).forEach(function (n) {
      n.props.selected = -1 != u.value.indexOf(n.props.value);
    })), "select" == t && null != u.defaultValue && (u.value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(e.children).forEach(function (n) {
      n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
    })), n.props = u, e.class != e.className && (nn.enumerable = "className" in e, null != e.className && (u.class = e.className), Object.defineProperty(u, "className", nn));
  }
  n.$$typeof = z, tn && tn(n);
};
var en = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
  en && en(n), X = n.__c;
};
var rn = {
    ReactCurrentDispatcher: {
      current: {
        readContext: function (n) {
          return X.__n[n.__c].props.value;
        }
      }
    }
  },
  un = "17.0.2";
function on(n) {
  return preact__WEBPACK_IMPORTED_MODULE_0__.createElement.bind(null, n);
}
function ln(n) {
  return !!n && n.$$typeof === z;
}
function cn(n) {
  return ln(n) ? preact__WEBPACK_IMPORTED_MODULE_0__.cloneElement.apply(null, arguments) : n;
}
function fn(n) {
  return !!n.__k && ((0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, n), !0);
}
function an(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}
var sn = function (n, t) {
    return n(t);
  },
  hn = function (n, t) {
    return n(t);
  },
  vn = preact__WEBPACK_IMPORTED_MODULE_0__.Fragment;
function dn(n) {
  n();
}
function pn(n) {
  return n;
}
function mn() {
  return [!1, dn];
}
var yn = preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect;
function _n(n, t) {
  var e = t(),
    r = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({
      h: {
        __: e,
        v: t
      }
    }),
    u = r[0].h,
    o = r[1];
  return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(function () {
    u.__ = e, u.v = t, E(u.__, t()) || o({
      h: u
    });
  }, [n, e, t]), (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return E(u.__, u.v()) || o({
      h: u
    }), n(function () {
      E(u.__, u.v()) || o({
        h: u
      });
    });
  }, [n]), e;
}
var bn = {
  useState: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState,
  useId: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId,
  useReducer: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer,
  useEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect,
  useLayoutEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect,
  useInsertionEffect: yn,
  useTransition: mn,
  useDeferredValue: pn,
  useSyncExternalStore: _n,
  startTransition: dn,
  useRef: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef,
  useImperativeHandle: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle,
  useMemo: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo,
  useCallback: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback,
  useContext: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext,
  useDebugValue: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue,
  version: "17.0.2",
  Children: O,
  render: Y,
  hydrate: q,
  unmountComponentAtNode: fn,
  createPortal: j,
  createElement: preact__WEBPACK_IMPORTED_MODULE_0__.createElement,
  createContext: preact__WEBPACK_IMPORTED_MODULE_0__.createContext,
  createFactory: on,
  cloneElement: cn,
  createRef: preact__WEBPACK_IMPORTED_MODULE_0__.createRef,
  Fragment: preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
  isValidElement: ln,
  findDOMNode: an,
  Component: preact__WEBPACK_IMPORTED_MODULE_0__.Component,
  PureComponent: w,
  memo: R,
  forwardRef: k,
  flushSync: hn,
  unstable_batchedUpdates: sn,
  StrictMode: vn,
  Suspense: D,
  SuspenseList: V,
  lazy: M,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: rn
};


/***/ }),

/***/ 49453:
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ x),
/* harmony export */   Fragment: () => (/* binding */ _),
/* harmony export */   cloneElement: () => (/* binding */ F),
/* harmony export */   createContext: () => (/* binding */ G),
/* harmony export */   createElement: () => (/* binding */ y),
/* harmony export */   createRef: () => (/* binding */ d),
/* harmony export */   h: () => (/* binding */ y),
/* harmony export */   hydrate: () => (/* binding */ E),
/* harmony export */   isValidElement: () => (/* binding */ i),
/* harmony export */   options: () => (/* binding */ l),
/* harmony export */   render: () => (/* binding */ D),
/* harmony export */   toChildArray: () => (/* binding */ j)
/* harmony export */ });
var n,
  l,
  u,
  i,
  t,
  r,
  o,
  f,
  e,
  c = {},
  s = [],
  a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n, l) {
  for (var u in l) n[u] = l[u];
  return n;
}
function v(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}
function y(l, u, i) {
  var t,
    r,
    o,
    f = {};
  for (o in u) "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === f[o] && (f[o] = l.defaultProps[o]);
  return p(l, f, t, r, null);
}
function p(n, i, t, r, o) {
  var f = {
    type: n,
    props: i,
    key: t,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++u : o
  };
  return null == o && null != l.vnode && l.vnode(f), f;
}
function d() {
  return {
    current: null
  };
}
function _(n) {
  return n.children;
}
function k(n, l, u, i, t) {
  var r;
  for (r in u) "children" === r || "key" === r || r in l || g(n, r, null, u[r], i);
  for (r in l) t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || g(n, r, l[r], u[r], i);
}
function b(n, l, u) {
  "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a.test(l) ? u : u + "px";
}
function g(n, l, u, i, t) {
  var r;
  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || b(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || b(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? w : m, r) : n.removeEventListener(l, r ? w : m, r);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null == u || !1 === u && -1 == l.indexOf("-") ? n.removeAttribute(l) : n.setAttribute(l, u));
  }
}
function m(n) {
  t = !0;
  try {
    return this.l[n.type + !1](l.event ? l.event(n) : n);
  } finally {
    t = !1;
  }
}
function w(n) {
  t = !0;
  try {
    return this.l[n.type + !0](l.event ? l.event(n) : n);
  } finally {
    t = !1;
  }
}
function x(n, l) {
  this.props = n, this.context = l;
}
function A(n, l) {
  if (null == l) return n.__ ? A(n.__, n.__.__k.indexOf(n) + 1) : null;
  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  return "function" == typeof n.type ? A(n) : null;
}
function P(n) {
  var l, u;
  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }
    return P(n);
  }
}
function C(n) {
  t ? setTimeout(n) : f(n);
}
function T(n) {
  (!n.__d && (n.__d = !0) && r.push(n) && !$.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || C)($);
}
function $() {
  var n, l, u, i, t, o, f, e;
  for (r.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }); n = r.shift();) n.__d && (l = r.length, i = void 0, t = void 0, f = (o = (u = n).__v).__e, (e = u.__P) && (i = [], (t = h({}, o)).__v = o.__v + 1, M(e, o, t, u.__n, void 0 !== e.ownerSVGElement, null != o.__h ? [f] : null, i, null == f ? A(o) : f, o.__h), N(i, o), o.__e != f && P(o)), r.length > l && r.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }));
  $.__r = 0;
}
function H(n, l, u, i, t, r, o, f, e, a) {
  var h,
    v,
    y,
    d,
    k,
    b,
    g,
    m = i && i.__k || s,
    w = m.length;
  for (u.__k = [], h = 0; h < l.length; h++) if (null != (d = u.__k[h] = null == (d = l[h]) || "boolean" == typeof d ? null : "string" == typeof d || "number" == typeof d || "bigint" == typeof d ? p(null, d, null, null, d) : Array.isArray(d) ? p(_, {
    children: d
  }, null, null, null) : d.__b > 0 ? p(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d)) {
    if (d.__ = u, d.__b = u.__b + 1, null === (y = m[h]) || y && d.key == y.key && d.type === y.type) m[h] = void 0;else for (v = 0; v < w; v++) {
      if ((y = m[v]) && d.key == y.key && d.type === y.type) {
        m[v] = void 0;
        break;
      }
      y = null;
    }
    M(n, d, y = y || c, t, r, o, f, e, a), k = d.__e, (v = d.ref) && y.ref != v && (g || (g = []), y.ref && g.push(y.ref, null, d), g.push(v, d.__c || k, d)), null != k ? (null == b && (b = k), "function" == typeof d.type && d.__k === y.__k ? d.__d = e = I(d, e, n) : e = z(n, d, y, m, k, e), "function" == typeof u.type && (u.__d = e)) : e && y.__e == e && e.parentNode != n && (e = A(y));
  }
  for (u.__e = b, h = w; h--;) null != m[h] && ("function" == typeof u.type && null != m[h].__e && m[h].__e == u.__d && (u.__d = L(i).nextSibling), q(m[h], m[h]));
  if (g) for (h = 0; h < g.length; h++) S(g[h], g[++h], g[++h]);
}
function I(n, l, u) {
  for (var i, t = n.__k, r = 0; t && r < t.length; r++) (i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? I(i, l, u) : z(u, i, i, t, i.__e, l));
  return l;
}
function j(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    j(n, l);
  }) : l.push(n)), l;
}
function z(n, l, u, i, t, r) {
  var o, f, e;
  if (void 0 !== l.__d) o = l.__d, l.__d = void 0;else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;else {
    for (f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 1) if (f == t) break n;
    n.insertBefore(t, r), o = r;
  }
  return void 0 !== o ? o : t.nextSibling;
}
function L(n) {
  var l, u, i;
  if (null == n.type || "string" == typeof n.type) return n.__e;
  if (n.__k) for (l = n.__k.length - 1; l >= 0; l--) if ((u = n.__k[l]) && (i = L(u))) return i;
  return null;
}
function M(n, u, i, t, r, o, f, e, c) {
  var s,
    a,
    v,
    y,
    p,
    d,
    k,
    b,
    g,
    m,
    w,
    A,
    P,
    C,
    T,
    $ = u.type;
  if (void 0 !== u.constructor) return null;
  null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [e]), (s = l.__b) && s(u);
  try {
    n: if ("function" == typeof $) {
      if (b = u.props, g = (s = $.contextType) && t[s.__c], m = s ? g ? g.props.value : s.__ : t, i.__c ? k = (a = u.__c = i.__c).__ = a.__E : ("prototype" in $ && $.prototype.render ? u.__c = a = new $(b, m) : (u.__c = a = new x(b, m), a.constructor = $, a.render = B), g && g.sub(a), a.props = b, a.state || (a.state = {}), a.context = m, a.__n = t, v = a.__d = !0, a.__h = [], a._sb = []), null == a.__s && (a.__s = a.state), null != $.getDerivedStateFromProps && (a.__s == a.state && (a.__s = h({}, a.__s)), h(a.__s, $.getDerivedStateFromProps(b, a.__s))), y = a.props, p = a.state, a.__v = u, v) null == $.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);else {
        if (null == $.getDerivedStateFromProps && b !== y && null != a.componentWillReceiveProps && a.componentWillReceiveProps(b, m), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(b, a.__s, m) || u.__v === i.__v) {
          for (u.__v !== i.__v && (a.props = b, a.state = a.__s, a.__d = !1), u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), w = 0; w < a._sb.length; w++) a.__h.push(a._sb[w]);
          a._sb = [], a.__h.length && f.push(a);
          break n;
        }
        null != a.componentWillUpdate && a.componentWillUpdate(b, a.__s, m), null != a.componentDidUpdate && a.__h.push(function () {
          a.componentDidUpdate(y, p, d);
        });
      }
      if (a.context = m, a.props = b, a.__P = n, A = l.__r, P = 0, "prototype" in $ && $.prototype.render) {
        for (a.state = a.__s, a.__d = !1, A && A(u), s = a.render(a.props, a.state, a.context), C = 0; C < a._sb.length; C++) a.__h.push(a._sb[C]);
        a._sb = [];
      } else do {
        a.__d = !1, A && A(u), s = a.render(a.props, a.state, a.context), a.state = a.__s;
      } while (a.__d && ++P < 25);
      a.state = a.__s, null != a.getChildContext && (t = h(h({}, t), a.getChildContext())), v || null == a.getSnapshotBeforeUpdate || (d = a.getSnapshotBeforeUpdate(y, p)), T = null != s && s.type === _ && null == s.key ? s.props.children : s, H(n, Array.isArray(T) ? T : [T], u, i, t, r, o, f, e, c), a.base = u.__e, u.__h = null, a.__h.length && f.push(a), k && (a.__E = a.__ = null), a.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = O(i.__e, u, i, t, r, o, f, c);
    (s = l.diffed) && s(u);
  } catch (n) {
    u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l.__e(n, u, i);
  }
}
function N(n, u) {
  l.__c && l.__c(u, n), n.some(function (u) {
    try {
      n = u.__h, u.__h = [], n.some(function (n) {
        n.call(u);
      });
    } catch (n) {
      l.__e(n, u.__v);
    }
  });
}
function O(l, u, i, t, r, o, f, e) {
  var s,
    a,
    h,
    y = i.props,
    p = u.props,
    d = u.type,
    _ = 0;
  if ("svg" === d && (r = !0), null != o) for (; _ < o.length; _++) if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
    l = s, o[_] = null;
    break;
  }
  if (null == l) {
    if (null === d) return document.createTextNode(p);
    l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, e = !1;
  }
  if (null === d) y === p || e && l.data === p || (l.data = p);else {
    if (o = o && n.call(l.childNodes), a = (y = i.props || c).dangerouslySetInnerHTML, h = p.dangerouslySetInnerHTML, !e) {
      if (null != o) for (y = {}, _ = 0; _ < l.attributes.length; _++) y[l.attributes[_].name] = l.attributes[_].value;
      (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
    }
    if (k(l, p, y, r, e), h) u.__k = [];else if (_ = u.props.children, H(l, Array.isArray(_) ? _ : [_], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && A(i, 0), e), null != o) for (_ = o.length; _--;) null != o[_] && v(o[_]);
    e || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && g(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && g(l, "checked", _, y.checked, !1));
  }
  return l;
}
function S(n, u, i) {
  try {
    "function" == typeof n ? n(u) : n.current = u;
  } catch (n) {
    l.__e(n, i);
  }
}
function q(n, u, i) {
  var t, r;
  if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || S(t, null, u)), null != (t = n.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (n) {
      l.__e(n, u);
    }
    t.base = t.__P = null, n.__c = void 0;
  }
  if (t = n.__k) for (r = 0; r < t.length; r++) t[r] && q(t[r], u, i || "function" != typeof n.type);
  i || null == n.__e || v(n.__e), n.__ = n.__e = n.__d = void 0;
}
function B(n, l, u) {
  return this.constructor(n, u);
}
function D(u, i, t) {
  var r, o, f;
  l.__ && l.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], M(i, u = (!r && t || i).__k = y(_, null, [u]), o || c, c, void 0 !== i.ownerSVGElement, !r && t ? [t] : o ? null : i.firstChild ? n.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), N(f, u);
}
function E(n, l) {
  D(n, l, E);
}
function F(l, u, i) {
  var t,
    r,
    o,
    f = h({}, l.props);
  for (o in u) "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), p(l.type, f, t || l.key, r || l.ref, null);
}
function G(n, l) {
  var u = {
    __c: l = "__cC" + e++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(function (n) {
          n.__e = !0, T(n);
        });
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;
        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}
n = s.slice, l = {
  __e: function (n, l, u, i) {
    for (var t, r, o; l = l.__;) if ((t = l.__c) && !t.__) try {
      if ((r = t.constructor) && null != r.getDerivedStateFromError && (t.setState(r.getDerivedStateFromError(n)), o = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), o = t.__d), o) return t.__E = t;
    } catch (l) {
      n = l;
    }
    throw n;
  }
}, u = 0, i = function (n) {
  return null != n && void 0 === n.constructor;
}, t = !1, x.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n && (n = n(h({}, u), this.props)), n && h(u, n), null != n && this.__v && (l && this._sb.push(l), T(this));
}, x.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), T(this));
}, x.prototype.render = _, r = [], f = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, $.__r = 0, e = 0;


/***/ }),

/***/ 77462:
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallback: () => (/* binding */ T),
/* harmony export */   useContext: () => (/* binding */ q),
/* harmony export */   useDebugValue: () => (/* binding */ x),
/* harmony export */   useEffect: () => (/* binding */ h),
/* harmony export */   useErrorBoundary: () => (/* binding */ P),
/* harmony export */   useId: () => (/* binding */ V),
/* harmony export */   useImperativeHandle: () => (/* binding */ A),
/* harmony export */   useLayoutEffect: () => (/* binding */ s),
/* harmony export */   useMemo: () => (/* binding */ F),
/* harmony export */   useReducer: () => (/* binding */ y),
/* harmony export */   useRef: () => (/* binding */ _),
/* harmony export */   useState: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ 49453);

var t,
  r,
  u,
  i,
  o = 0,
  f = [],
  c = [],
  e = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,
  a = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,
  v = preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,
  l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,
  m = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;
function d(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__.options.__h && preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(r, t, o || u), o = 0;
  var i = r.__H || (r.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({
    __V: c
  }), i.__[t];
}
function p(n) {
  return o = 1, y(B, n);
}
function y(n, u, i) {
  var o = d(t++, 2);
  if (o.t = n, !o.__c && (o.__ = [i ? i(u) : B(void 0, u), function (n) {
    var t = o.__N ? o.__N[0] : o.__[0],
      r = o.t(t, n);
    t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
  }], o.__c = r, !r.u)) {
    r.u = !0;
    var f = r.shouldComponentUpdate;
    r.shouldComponentUpdate = function (n, t, r) {
      if (!o.__c.__H) return !0;
      var u = o.__c.__H.__.filter(function (n) {
        return n.__c;
      });
      if (u.every(function (n) {
        return !n.__N;
      })) return !f || f.call(this, n, t, r);
      var i = !1;
      return u.forEach(function (n) {
        if (n.__N) {
          var t = n.__[0];
          n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
        }
      }), !(!i && o.__c.props === n) && (!f || f.call(this, n, t, r));
    };
  }
  return o.__N || o.__;
}
function h(u, i) {
  var o = d(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s && z(o.__H, i) && (o.__ = u, o.i = i, r.__H.__h.push(o));
}
function s(u, i) {
  var o = d(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s && z(o.__H, i) && (o.__ = u, o.i = i, r.__h.push(o));
}
function _(n) {
  return o = 5, F(function () {
    return {
      current: n
    };
  }, []);
}
function A(n, t, r) {
  o = 6, s(function () {
    return "function" == typeof n ? (n(t()), function () {
      return n(null);
    }) : n ? (n.current = t(), function () {
      return n.current = null;
    }) : void 0;
  }, null == r ? r : r.concat(n));
}
function F(n, r) {
  var u = d(t++, 7);
  return z(u.__H, r) ? (u.__V = n(), u.i = r, u.__h = n, u.__V) : u.__;
}
function T(n, t) {
  return o = 8, F(function () {
    return n;
  }, t);
}
function q(n) {
  var u = r.context[n.__c],
    i = d(t++, 9);
  return i.c = n, u ? (null == i.__ && (i.__ = !0, u.sub(r)), u.props.value) : n.__;
}
function x(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(r ? r(t) : t);
}
function P(n) {
  var u = d(t++, 10),
    i = p();
  return u.__ = n, r.componentDidCatch || (r.componentDidCatch = function (n, t) {
    u.__ && u.__(n, t), i[1](n);
  }), [i[0], function () {
    i[1](void 0);
  }];
}
function V() {
  var n = d(t++, 11);
  if (!n.__) {
    for (var u = r.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
    var i = u.__m || (u.__m = [0, 0]);
    n.__ = "P" + i[0] + "-" + i[1]++;
  }
  return n.__;
}
function b() {
  for (var t; t = f.shift();) if (t.__P && t.__H) try {
    t.__H.__h.forEach(k), t.__H.__h.forEach(w), t.__H.__h = [];
  } catch (r) {
    t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, t.__v);
  }
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
  r = null, e && e(n);
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
  a && a(n), t = 0;
  var i = (r = n.__c).__H;
  i && (u === r ? (i.__h = [], r.__h = [], i.__.forEach(function (n) {
    n.__N && (n.__ = n.__N), n.__V = c, n.__N = n.i = void 0;
  })) : (i.__h.forEach(k), i.__h.forEach(w), i.__h = [])), u = r;
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed = function (t) {
  v && v(t);
  var o = t.__c;
  o && o.__H && (o.__H.__h.length && (1 !== f.push(o) && i === preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame || ((i = preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame) || j)(b)), o.__H.__.forEach(function (n) {
    n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
  })), u = r = null;
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.__c = function (t, r) {
  r.some(function (t) {
    try {
      t.__h.forEach(k), t.__h = t.__h.filter(function (n) {
        return !n.__ || w(n);
      });
    } catch (u) {
      r.some(function (n) {
        n.__h && (n.__h = []);
      }), r = [], preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u, t.__v);
    }
  }), l && l(t, r);
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (t) {
  m && m(t);
  var r,
    u = t.__c;
  u && u.__H && (u.__H.__.forEach(function (n) {
    try {
      k(n);
    } catch (n) {
      r = n;
    }
  }), u.__H = void 0, r && preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, u.__v));
};
var g = "function" == typeof requestAnimationFrame;
function j(n) {
  var t,
    r = function () {
      clearTimeout(u), g && cancelAnimationFrame(t), setTimeout(n);
    },
    u = setTimeout(r, 100);
  g && (t = requestAnimationFrame(r));
}
function k(n) {
  var t = r,
    u = n.__c;
  "function" == typeof u && (n.__c = void 0, u()), r = t;
}
function w(n) {
  var t = r;
  n.__c = n.__(), r = t;
}
function z(n, t) {
  return !n || n.length !== t.length || t.some(function (t, r) {
    return t !== n[r];
  });
}
function B(n, t) {
  return "function" == typeof t ? t(n) : t;
}


/***/ }),

/***/ 35703:
/*!********************************************************!*\
  !*** ./src/app/models/projeto-alocacao-regra.model.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoAlocacaoRegra: () => (/* binding */ ProjetoAlocacaoRegra)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class ProjetoAlocacaoRegra extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.projeto_alocacao_id = "";
    this.regra_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 34907:
/*!**************************************************!*\
  !*** ./src/app/models/projeto-alocacao.model.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoAlocacao: () => (/* binding */ ProjetoAlocacao)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class ProjetoAlocacao extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  //public regra_id: string | null = null;
  constructor(data) {
    super();
    this.descricao = ""; /* Descrição */
    this.quantidade = 1; /* Quantidade */
    this.projeto_id = null;
    this.tarefa_id = null;
    this.recurso_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 31375:
/*!*************************************************!*\
  !*** ./src/app/models/projeto-recurso.model.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoRecurso: () => (/* binding */ ProjetoRecurso)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class ProjetoRecurso extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; /* Nome do recurso */
    this.tipo = "MATERIAL"; /* Tipo do recurso */
    this.unidade_medida = "UNIDADE"; /* Unidade do recurso */
    this.valor = 0; /* Valor de cursto do recurso */
    this.projeto_id = "";
    this.usuario_id = null;
    this.unidade_id = null;
    this.material_servico_id = null;
    this.initialization(data);
  }
}

/***/ }),

/***/ 96878:
/*!***********************************************!*\
  !*** ./src/app/models/projeto-regra.model.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoRegra: () => (/* binding */ ProjetoRegra)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class ProjetoRegra extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.nome = ""; /* Nome da regra */
    this.tipo_recurso = "MATERIAL"; /* Tipo do recurso */
    this.perfis = []; /* Lista de perfis da regra */
    this.projeto_id = "";
    this.initialization(data);
  }
}

/***/ }),

/***/ 48958:
/*!************************************************!*\
  !*** ./src/app/models/projeto-tarefa.model.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoTarefa: () => (/* binding */ ProjetoTarefa)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class ProjetoTarefa extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.indice = 0; /* Indice da sequencia da tarefa */
    this.path = ""; /* Path dos nós pais */
    this.nome = ""; /* Nome da tarefa */
    this.descricao = ""; /* Descricao da tarefa */
    this.inicio = new Date(); /* Inicio da tarefa */
    this.termino = new Date(); /* Fim da tarefa */
    this.inicio_baseline = null; /* Inicio do projeto (Baseline) */
    this.termino_baseline = null; /* Fim do projeto (Baseline) */
    this.duracao = 0.00; /* Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo */
    this.progresso = 0.00; /* Percentual de progresso da tarefa */
    this.inicio_marco = false; /* Se o inicio é um marco */
    this.termino_marco = false; /* Se o termino é um marco */
    this.tem_filhos = false; /* Se é um registro sintético (resumo) */
    this.agrupador = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
    this.soma_progresso_filhos = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
    this.status = "PLANEJADO"; /* Status */
    this.contraido = false; /* Se esta contraído */
    this.custo = 0.00; /* Custo: Será a soma dos recursos, sou a soma dos filhos caso temFilhos e sintetico */
    this.calcula_intervalo = true; /* Se calcula o inicio e termino automaticamente pelos filhos (somente se tem_filhos) */
    this.aloca_proprios_recursos = true; /* Se possui recursos próprios (somente se tem_filhos) */
    this.soma_recusos_alocados_filhos = true; /* Mostra o somatório dos recursos filhos (somente se tem_filhos) */
    this.custos_proprios = true; /* Se possui custos próprios (somente se tem_filhos) */
    this.soma_custos_filhos = true; /* Se possui custos filhos (somente se tem_filhos) */
    this.etiquetas = []; /* Etiquetas */
    this.comentarios = []; /* Comentarios do projeto */
    this.projeto_id = "";
    this.tarefa_pai_id = null;
    this.terefa_projeto_id = null; /* Projeto que será incorporado como uma tarefa */
    this.atividade_id = "";
    this.usuario_id = null;
    this.documento_id = null;
    this.initialization(data);
  }
}

/***/ }),

/***/ 52179:
/*!*****************************************!*\
  !*** ./src/app/models/projeto.model.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Projeto: () => (/* binding */ Projeto)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Projeto extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.numero = 0; /* Número do projeto */
    this.nome = ""; /* Nome do projeto */
    this.descricao = ""; /* Descrição do projeto */
    this.finalidade = ""; /* Descrição do projeto */
    this.status = 'PLANEJADO'; /* Status do projeto */
    this.inicio = new Date(); /* Inicio do projeto */
    this.termino = new Date(); /* Fim do projeto */
    this.inicio_baseline = new Date(); /* Inicio do projeto (Baseline) */
    this.termino_baseline = new Date(); /* Fim do projeto (Baseline) */
    this.custo = 0; /* Custo do projeto */
    this.calcula_custos = true; /* Se o projeto calcula custos */
    this.tempo_corrido = false; /* Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas) */
    this.usa_horas = false; /* Se usa horas nas datas */
    this.usa_baseline = true; /* Se usa baseline */
    this.calcula_intervalo = true; /* Se o termino é calculado automaticamente pelas tarefas */
    this.agrupador = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
    this.soma_progresso_filhos = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
    this.aloca_proprios_recursos = true; /* Se possui recursos próprios */
    this.soma_recusos_alocados_filhos = true; /* Mostra o somatório dos recursos filhos */
    this.custos_proprios = true; /* Se possui custos próprios */
    this.soma_custos_filhos = true; /* Se possui custos filhos */
    this.duracao = 0.00; /* Duração do projeto */
    this.progresso = 0.00; /* Percentual de progresso do projeto */
    this.expediente = null; /* Configuração do expediente */
    this.usuario_id = null;
    this.tipo_projeto_id = null;
    this.fase_id = null;
    this.kanban_dockers = [];
    this.comentarios = []; /* Comentarios do projeto */
    this.fases = [];
    this.initialization(data);
  }
}

/***/ }),

/***/ 60155:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-alocacoes/projeto-form-alocacoes.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoFormAlocacoesComponent: () => (/* binding */ ProjetoFormAlocacoesComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_dao_projeto_recurso_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/projeto-recurso-dao.service */ 77394);
/* harmony import */ var src_app_dao_projeto_regra_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/projeto-regra-dao.service */ 85714);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var src_app_models_projeto_alocacao_regra_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/projeto-alocacao-regra.model */ 35703);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-multiselect/input-multiselect.component */ 17819);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _projeto_recurso_widget_projeto_recurso_widget_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../projeto-recurso-widget/projeto-recurso-widget.component */ 3042);

var _class;























const _c0 = ["regra"];
const _c1 = ["recursoWidget"];
function ProjetoFormAlocacoesComponent_ng_template_3_strong_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().group;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassMap"](ctx_r19.lookup.getIcon(ctx_r19.lookup.PROJETO_TIPO_RECURSOS, group_r18[0].value));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate1"](" ", ctx_r19.lookup.getValue(ctx_r19.lookup.PROJETO_TIPO_RECURSOS, group_r18[0].value), "");
  }
}
function ProjetoFormAlocacoesComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, ProjetoFormAlocacoesComponent_ng_template_3_strong_0_Template, 3, 3, "strong", 17);
  }
  if (rf & 2) {
    const group_r18 = ctx.group;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", group_r18 == null ? null : group_r18.length);
  }
}
function ProjetoFormAlocacoesComponent_ng_template_7_badge_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 22);
  }
  if (rf & 2) {
    const row_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", ctx_r22.lookup.getValue(ctx_r22.lookup.MATERIAL_SERVICO_UNIDADE, row_r21.recurso.unidade_medida));
  }
}
function ProjetoFormAlocacoesComponent_ng_template_7_badge_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 23);
  }
  if (rf & 2) {
    const row_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", ctx_r23.util.formatDecimal(row_r21.recurso.valor));
  }
}
const _c2 = function () {
  return ["HUMANO", "DEPARTAMENTO"];
};
function ProjetoFormAlocacoesComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "profile-picture", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "br")(4, "badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](5, ProjetoFormAlocacoesComponent_ng_template_7_badge_5_Template, 1, 1, "badge", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, ProjetoFormAlocacoesComponent_ng_template_7_badge_6_Template, 1, 1, "badge", 21);
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("url", ctx_r3.projetoService.getRecursoPicture(row_r21.recurso))("hint", row_r21.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"]((row_r21.recurso == null ? null : row_r21.recurso.usuario == null ? null : row_r21.recurso.usuario.nome) || (row_r21.recurso == null ? null : row_r21.recurso.unidade == null ? null : row_r21.recurso.unidade.nome) || (row_r21.recurso == null ? null : row_r21.recurso.material_servico == null ? null : row_r21.recurso.material_servico.descricao) || row_r21.descricao || "");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("icon", ctx_r3.lookup.getIcon(ctx_r3.lookup.PROJETO_TIPO_RECURSOS, row_r21.recurso.tipo))("label", ctx_r3.lookup.getValue(ctx_r3.lookup.PROJETO_TIPO_RECURSOS, row_r21.recurso.tipo))("color", ctx_r3.lookup.getColor(ctx_r3.lookup.PROJETO_TIPO_RECURSOS, row_r21.recurso.tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpureFunction0"](8, _c2).includes(row_r21.recurso.tipo));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r21.recurso.valor);
  }
}
function ProjetoFormAlocacoesComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "projeto-recurso-widget", 24, 25);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("control", ctx_r5.getControlByName("recurso_id"))("recursos", ctx_r5.recursos)("change", ctx_r5.onRecursoChange.bind(ctx_r5));
  }
}
function ProjetoFormAlocacoesComponent_ng_template_12_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 29);
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", "Acessar o " + ctx_r29.lex.translate("projeto"));
  }
}
function ProjetoFormAlocacoesComponent_ng_template_12_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 30);
  }
  if (rf & 2) {
    const regra_r31 = ctx.$implicit;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", regra_r31.regra.nome)("icon", ctx_r30.lookup.getIcon(ctx_r30.lookup.PROJETO_TIPO_RECURSOS, regra_r31.regra.tipo_recurso))("color", ctx_r30.lookup.getColor(ctx_r30.lookup.PROJETO_TIPO_RECURSOS, regra_r31.regra.tipo_recurso));
  }
}
function ProjetoFormAlocacoesComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ProjetoFormAlocacoesComponent_ng_template_12_badge_1_Template, 1, 1, "badge", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, ProjetoFormAlocacoesComponent_ng_template_12_badge_2_Template, 1, 3, "badge", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", ctx_r7.isAcessivel(row_r28));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", row_r28.regras);
  }
}
function ProjetoFormAlocacoesComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "input-multiselect", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "input-select", 32, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r9.form.controls.regras)("addItemHandle", ctx_r9.addItemHandleRegras.bind(ctx_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("valueTodos", null)("control", ctx_r9.formRegra.controls.regra_id)("items", ctx_r9.regras);
  }
}
function ProjetoFormAlocacoesComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r34 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r34.descricao);
  }
}
function ProjetoFormAlocacoesComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "input-text", 34);
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 12)("control", ctx_r13.form.controls.descricao);
  }
}
function ProjetoFormAlocacoesComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r36 = ctx.row;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](ctx_r15.util.formatDecimal(row_r36.quantidade));
  }
}
function ProjetoFormAlocacoesComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "input-number", 36);
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("disabled", ctx_r17.projetoService.isHumanoDepartamento(ctx_r17.tipoRecurso) ? "true" : undefined)("size", 12)("control", ctx_r17.form.controls.quantidade);
  }
}
class ProjetoFormAlocacoesComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_3__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.recursos = [];
    this.tipoRecurso = undefined;
    this._regras = [];
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.validateRegra = (control, controlName) => {
      if (controlName == "regra_id" && !control.value?.length) return "Obrigatório";
      return null;
    };
    this.dao = injector.get(src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_9__.ProjetoDaoService);
    this.recursoDao = injector.get(src_app_dao_projeto_recurso_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProjetoRecursoDaoService);
    this.regraDao = injector.get(src_app_dao_projeto_regra_dao_service__WEBPACK_IMPORTED_MODULE_5__.ProjetoRegraDaoService);
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_6__.ProjetoService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_19__.ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      id: {
        default: ""
      },
      descricao: {
        default: ""
      },
      quantidade: {
        default: 1
      },
      recurso_id: {
        default: ""
      },
      novo_recurso: {
        default: false
      },
      regras: {
        default: []
      }
    }, this.cdRef, this.validate);
    this.formRegra = this.fh.FormBuilder({
      regra_id: {
        default: null
      }
    }, this.cdRef, this.validateRegra);
    this.groupBy = [{
      field: "recurso.tipo",
      label: "Tipo"
    }];
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__.Projeto());
    if (!this.gridControl.value.alocacoes) this.gridControl.value.alocacoes = [];
    return this.gridControl.value.alocacoes;
  }
  loadRecursos(alocacao) {
    const items = (this.entity.recursos || []).filter(x => x.id != "NEW" && !this.entity.alocacoes?.find(r => r.recurso_id != alocacao.recurso_id && r.recurso_id == x.id));
    const recursoNome = recurso => recurso.usuario?.nome || recurso.unidade?.nome || recurso.material_servico?.descricao || recurso.nome;
    this.recursos = items.map(x => Object.assign({}, {
      key: x.id,
      value: recursoNome(x),
      icon: this.lookup.getIcon(this.lookup.PROJETO_TIPO_RECURSOS, x.tipo),
      data: x
    }));
  }
  get regras() {
    const items = (this.entity.regras || []).filter(x => x.id != "NEW" && x.tipo_recurso == this.tipoRecurso);
    if (this._regras.map(x => x.key + x.value).join(";") != items.map(x => x.id + x.nome).join(";")) {
      this._regras = items.map(x => Object.assign({}, {
        key: x.id,
        value: x.nome,
        data: x
      }));
    }
    return this._regras;
  }
  loadData(entity, form) {
    super.loadData(entity, form);
  }
  initializeData(form) {
    this.entity = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_2__.Projeto();
    this.loadData(this.entity, this.form);
  }
  saveData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.grid?.confirm();
      return _this.entity;
    })();
  }
  addAlocacao() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: "NEW",
        descricao: "",
        quantidade: 1,
        recurso_id: "",
        regra_id: null
      };
    })();
  }
  loadAlocacao(form, row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.loadRecursos(row);
      _this2.tipoRecurso = row.recurso?.tipo;
      form.controls.descricao.setValue(row.descricao);
      form.controls.quantidade.setValue(row.quantidade);
      form.controls.recurso_id.setValue(row.recurso_id);
      form.controls.regras.setValue((row.regras || []).map(regra => Object.assign({}, {
        key: regra.regra.id,
        value: regra.regra.nome,
        color: _this2.lookup.getColor(_this2.lookup.PROJETO_TIPO_RECURSOS, regra.regra.tipo_recurso),
        icon: _this2.lookup.getIcon(_this2.lookup.PROJETO_TIPO_RECURSOS, regra.regra.tipo_recurso),
        data: regra
      })));
      form.controls.novo_recurso.setValue(false);
      _this2.cdRef.detectChanges();
    })();
  }
  removeAlocacao(row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return true;
    })();
  }
  saveAlocacao(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      let recurso = _this3.recursoWidget?.recurso;
      _this3.form.markAllAsTouched();
      if (recurso && _this3.form.valid) {
        if (recurso.id == "NEW") {
          /* Insere novo recurso */
          recurso.id = _this3.dao.generateUuid();
          _this3.entity.recursos.push(recurso);
        }
        row.id = row.id == "NEW" ? _this3.dao.generateUuid() : row.id;
        row.descricao = form.controls.descricao.value;
        row.quantidade = form.controls.quantidade.value;
        row.recurso_id = recurso.id;
        row.recurso = recurso;
        row.regras = (form.controls.regras.value || []).map(x => x.data);
        result = row;
        _this3.cdRef.detectChanges();
      }
      return result;
    })();
  }
  addItemHandleRegras() {
    let result = undefined;
    const key = this.formRegra.controls.regra_id.value;
    this.formRegra.markAllAsTouched();
    if (this.formRegra.valid && this.regra?.selectedItem && this.util.validateLookupItem(this.form.controls.regras.value, key)) {
      let regra = this.regra?.selectedItem.data;
      result = {
        key: key,
        value: regra.nome,
        color: this.lookup.getColor(this.lookup.PROJETO_TIPO_RECURSOS, regra.tipo_recurso),
        icon: this.lookup.getIcon(this.lookup.PROJETO_TIPO_RECURSOS, regra.tipo_recurso),
        data: new src_app_models_projeto_alocacao_regra_model__WEBPACK_IMPORTED_MODULE_7__.ProjetoAlocacaoRegra({
          projeto_alocacao_id: this.form.controls.id.value,
          regra_id: regra.id,
          regra: regra
        })
      };
      this.util.clearControl(this.formRegra.controls.regra_id);
    }
    return result;
  }
  isAcessivel(row) {
    return this.projetoService.isEnvolvido(row, this.entity);
  }
  dynamicButtons(row) {
    let result = [];
    let alocacao = row;
    if (!alocacao.tarefa_id?.length) {
      result.push(Object.assign(this.grid.BUTTON_EDIT, {
        onClick: this.grid.onEditItem.bind(this.grid)
      }));
      result.push(Object.assign(this.grid.BUTTON_DELETE, {
        onClick: this.grid.onDeleteItem.bind(this.grid)
      }));
    }
    return result;
  }
  onRecursoChange(tipo) {
    //const recurso = this.recurso?.selectedItem?.data as ProjetoRecurso;
    this.tipoRecurso = tipo;
    if (this.projetoService.isHumanoDepartamento(tipo)) this.form.controls.quantidade.setValue(1);
    this.form.controls.regras.setValue(this.form.controls.regras.value.filter(x => x.data?.regra?.tipo_recurso == tipo));
    this.cdRef.detectChanges();
  }
}
_class = ProjetoFormAlocacoesComponent;
_class.ɵfac = function ProjetoFormAlocacoesComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-form-alocacoes"]],
  viewQuery: function ProjetoFormAlocacoesComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.regra = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.recursoWidget = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    cdRef: "cdRef"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
  decls: 27,
  vars: 23,
  consts: [[3, "form", "disabled", "title"], [1, "row"], ["editable", "", 3, "items", "form", "hasEdit", "groupTemplate", "groupBy", "add", "load", "remove", "save"], ["groupRecurso", ""], ["title", "Recurso", "cellClass", "px-1", 3, "template", "editTemplate"], ["alocacaoRecurso", ""], ["editAlocacaoRecurso", ""], ["title", "Regras", "cellClass", "px-1", 3, "template", "editTemplate"], ["alocacaoRegra", ""], ["editAlocacaoRegra", ""], ["title", "Descri\u00E7\u00E3o", "cellClass", "px-1", 3, "template", "editTemplate"], ["alocacaoDescricao", ""], ["editAlocacaoDescricao", ""], ["title", "Quantidade", "cellClass", "px-1", 3, "align", "maxWidth", "template", "editTemplate"], ["alocacaoQuantidade", ""], ["editAlocacaoQuantidade", ""], ["type", "options", 3, "dynamicButtons"], [4, "ngIf"], [3, "url", "hint"], [3, "icon", "label", "color"], ["icon", "bi bi-rulers", "color", "warning", 3, "label", 4, "ngIf"], ["icon", "bi bi-currency-dollar", "color", "success", 3, "label", 4, "ngIf"], ["icon", "bi bi-rulers", "color", "warning", 3, "label"], ["icon", "bi bi-currency-dollar", "color", "success", 3, "label"], [3, "control", "recursos", "change"], ["recursoWidget", ""], [1, "text-wrap", "multilines-badges"], ["icon", "bi bi-unlock", 3, "label", 4, "ngIf"], [3, "label", "icon", "color", 4, "ngFor", "ngForOf"], ["icon", "bi bi-unlock", 3, "label"], [3, "label", "icon", "color"], ["controlName", "regras", "noBox", "", 3, "size", "control", "addItemHandle"], ["itemTodos", "- Nenhuma -", 3, "size", "valueTodos", "control", "items"], ["regra", ""], ["controlName", "descricao", 3, "size", "control"], [1, "text-end"], ["number", "", "controlName", "quantidade", 3, "disabled", "size", "control"]],
  template: function ProjetoFormAlocacoesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "grid", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](3, ProjetoFormAlocacoesComponent_ng_template_3_Template, 1, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "columns")(6, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](7, ProjetoFormAlocacoesComponent_ng_template_7_Template, 7, 9, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](9, ProjetoFormAlocacoesComponent_ng_template_9_Template, 2, 3, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](11, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](12, ProjetoFormAlocacoesComponent_ng_template_12_Template, 3, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](14, ProjetoFormAlocacoesComponent_ng_template_14_Template, 3, 7, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](16, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](17, ProjetoFormAlocacoesComponent_ng_template_17_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](19, ProjetoFormAlocacoesComponent_ng_template_19_Template, 1, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](21, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](22, ProjetoFormAlocacoesComponent_ng_template_22_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](24, ProjetoFormAlocacoesComponent_ng_template_24_Template, 1, 3, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](26, "column", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](4);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](8);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](10);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](13);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](15);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](18);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](20);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](23);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasEdit", false)("groupTemplate", _r0)("groupBy", ctx.groupBy)("add", ctx.addAlocacao.bind(ctx))("load", ctx.loadAlocacao.bind(ctx))("remove", ctx.removeAlocacao.bind(ctx))("save", ctx.saveAlocacao.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r6)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r10)("editTemplate", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("align", "right")("maxWidth", 100)("template", _r14)("editTemplate", _r16);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("dynamicButtons", ctx.dynamicButtons.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_8__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_13__.InputSelectComponent, _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_14__.InputMultiselectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_16__.ProfilePictureComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__.InputNumberComponent, _projeto_recurso_widget_projeto_recurso_widget_component__WEBPACK_IMPORTED_MODULE_18__.ProjetoRecursoWidgetComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 23739:
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-fases/projeto-form-fases.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoFormFasesComponent: () => (/* binding */ ProjetoFormFasesComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-color/input-color.component */ 66848);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);

var _class;















function ProjetoFormFasesComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "badge", 16);
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", row_r16.cor)("label", row_r16.nome);
  }
}
function ProjetoFormFasesComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input-text", 17)(2, "input-color", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 8)("control", ctx_r3.form.controls.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 4)("control", ctx_r3.form.controls.cor);
  }
}
function ProjetoFormFasesComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "small", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r18.descricao || "");
  }
}
function ProjetoFormFasesComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-text", 20);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx_r7.form.controls.descricao);
  }
}
function ProjetoFormFasesComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "strong", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r9.util.getDateFormatted(row_r20.inicio));
  }
}
function ProjetoFormFasesComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-datetime", 21);
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx_r11.form.controls.inicio);
  }
}
function ProjetoFormFasesComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "strong", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r13.util.getDateFormatted(row_r22.termino));
  }
}
function ProjetoFormFasesComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-datetime", 22);
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx_r15.form.controls.termino);
  }
}
class ProjetoFormFasesComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__.Projeto());
    if (!this.gridControl.value.fases) this.gridControl.value.fases = [];
    return this.gridControl.value.fases;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__.ProjetoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      descricao: {
        default: ""
      },
      cor: {
        default: ""
      },
      inicio: {
        default: null
      },
      termino: {
        default: null
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    super.loadData(entity, form);
  }
  initializeData(form) {
    this.entity = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__.Projeto();
    this.loadData(this.entity, this.form);
  }
  saveData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.grid?.confirm();
      return _this.entity;
    })();
  }
  get randomColor() {
    return this.lookup.CORES[this.items.length % this.lookup.CORES.length].color;
  }
  addFase() {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: "NEW",
        nome: "",
        descricao: "",
        cor: _this2.randomColor,
        inicio: null,
        termino: null
      };
    })();
  }
  loadFase(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.nome.setValue(row.nome);
      form.controls.descricao.setValue(row.descricao);
      form.controls.cor.setValue(row.cor);
      form.controls.inicio.setValue(row.inicio);
      form.controls.termino.setValue(row.termino);
      _this3.cdRef.detectChanges();
    })();
  }
  removeFase(row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return true;
    })();
  }
  saveFase(form, row) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this4.form.markAllAsTouched();
      if (_this4.form.valid) {
        row.id = row.id == "NEW" ? _this4.dao.generateUuid() : row.id;
        row.nome = form.controls.nome.value;
        row.descricao = form.controls.descricao.value;
        row.cor = form.controls.cor.value;
        row.inicio = form.controls.inicio.value;
        row.termino = form.controls.termino.value;
        result = row;
        _this4.cdRef.detectChanges();
      }
      return result;
    })();
  }
}
_class = ProjetoFormFasesComponent;
_class.ɵfac = function ProjetoFormFasesComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-form-fases"]],
  viewQuery: function ProjetoFormFasesComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    cdRef: "cdRef",
    control: "control",
    entity: "entity"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 25,
  vars: 17,
  consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["editable", "", 3, "items", "form", "hasDelete", "add", "load", "remove", "save"], ["title", "Nome", 3, "template", "editTemplate"], ["faseNome", ""], ["editFaseNome", ""], ["title", "Descri\u00E7\u00E3o", 3, "template", "editTemplate"], ["faseDescricao", ""], ["editFaseDescricao", ""], ["title", "In\u00EDcio", 3, "template", "editTemplate"], ["faseInicio", ""], ["editFaseInicio", ""], ["title", "Termino", 3, "template", "editTemplate"], ["faseTermino", ""], ["editFaseTermino", ""], ["type", "options"], [3, "color", "label"], ["controlName", "nome", 3, "size", "control"], ["controlName", "cor", 3, "size", "control"], [1, "d-block"], ["controlName", "descricao", 3, "size", "control"], ["date", "", "controlName", "inicio", 3, "size", "control"], ["date", "", "controlName", "termino", 3, "size", "control"]],
  template: function ProjetoFormFasesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "grid", 2)(3, "columns")(4, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, ProjetoFormFasesComponent_ng_template_5_Template, 1, 2, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, ProjetoFormFasesComponent_ng_template_7_Template, 3, 4, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](10, ProjetoFormFasesComponent_ng_template_10_Template, 2, 1, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, ProjetoFormFasesComponent_ng_template_12_Template, 1, 2, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, ProjetoFormFasesComponent_ng_template_15_Template, 2, 1, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](17, ProjetoFormFasesComponent_ng_template_17_Template, 1, 2, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](20, ProjetoFormFasesComponent_ng_template_20_Template, 2, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](22, ProjetoFormFasesComponent_ng_template_22_Template, 1, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](24, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](6);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](8);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](11);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](13);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](16);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](18);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](21);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("add", ctx.addFase.bind(ctx))("load", ctx.loadFase.bind(ctx))("remove", ctx.removeFase.bind(ctx))("save", ctx.saveFase.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r0)("editTemplate", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r4)("editTemplate", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r8)("editTemplate", _r10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r12)("editTemplate", _r14);
    }
  },
  dependencies: [src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_8__.InputTextComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__.InputDatetimeComponent, _components_input_input_color_input_color_component__WEBPACK_IMPORTED_MODULE_10__.InputColorComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 52591:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-principal/projeto-form-principal.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoFormPrincipalComponent: () => (/* binding */ ProjetoFormPrincipalComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-workload/input-workload.component */ 43417);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../uteis/calendar-expediente/calendar-expediente.component */ 75007);

var _class;




















const _c0 = ["escritorio"];
const _c1 = ["expediente"];
function ProjetoFormPrincipalComponent_separator_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "separator", 32)(1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "input-switch", 33)(3, "input-search", 34, 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](5, "calendar-expediente", null, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("collapsed", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 9)("dao", ctx_r0.unidadeDao);
  }
}
class ProjetoFormPrincipalComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_2__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this._fases = [];
    this.validate = (control, controlName) => {
      let result = null;
      let form = this.form?.value || {};
      if (controlName == "nome" && !control.value?.length || form.usa_baseline && ["inicio_baseline", "termino_baseline"].includes(controlName) && !this.util.isDataValid(control.value) || ["inicio", "termino"].includes(controlName) && !this.util.isDataValid(control.value)) {
        result = "Obrigatório";
      }
      return result;
    };
    this.dao = injector.get(src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProjetoDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__.UnidadeDaoService);
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_5__.ProjetoService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_17__.ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      numero: {
        default: ""
      },
      nome: {
        default: ""
      },
      status: {
        default: "PLANEJADO"
      },
      descricao: {
        default: ""
      },
      finalidade: {
        default: ""
      },
      inicio: {
        default: new Date()
      },
      termino: {
        default: new Date()
      },
      duracao: {
        default: 0
      },
      inicio_baseline: {
        default: new Date()
      },
      termino_baseline: {
        default: new Date()
      },
      progresso: {
        default: 0
      },
      tempo_corrido: {
        default: false
      },
      usa_horas: {
        default: false
      },
      usa_baseline: {
        default: true
      },
      calcula_intervalo: {
        default: false
      },
      soma_progresso_filhos: {
        default: true
      },
      agrupador: {
        default: false
      },
      calcula_custos: {
        default: true
      },
      aloca_proprios_recursos: {
        default: true
      },
      soma_recusos_alocados_filhos: {
        default: true
      },
      custos_proprios: {
        default: true
      },
      soma_custos_filhos: {
        default: true
      },
      fase_id: {
        default: ""
      },
      usar_escritorio: {
        default: true
      },
      escritorio_id: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.join = ["recursos", "tarefas", "alocacoes", "regras", "fase"];
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, _this.form.value);
      let escritorio = entity.alocacoes?.find(x => !!x.regras?.find(y => y.regra?.perfis?.includes("ESCRITORIO")));
      yield Promise.all([_this.escritorio.loadSearch(escritorio?.recurso?.unidade || escritorio?.recurso?.unidade_id)]);
      form?.controls.usar_escritorio.setValue(!!escritorio);
      _this.form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    this.entity = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_3__.Projeto();
    this.loadData(this.entity, this.form);
  }
  saveData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this2.util.fill(_this2.entity, _this2.form.value);
    })();
  }
  get fases() {
    let fases = (this.entity?.fases || []).filter(x => x.id != "NEW").map(x => Object.assign({}, {
      key: x.id,
      value: x.nome
    }));
    if (JSON.stringify(fases) != JSON.stringify(this._fases)) this._fases = fases;
    return this._fases;
  }
  get unitDuracao() {
    return this.form?.controls.usa_horas.value ? "hour" : "day";
  }
  onUnitDuracaoChange(unit) {
    this.form?.controls.usa_horas.setValue(unit == "hour");
    this.recalcular();
  }
  onIntervaloAutomaticoChange(event) {
    this.recalcular();
  }
  recalcular() {
    this.saveData();
    this.projetoService.recalcular(this.entity);
    this.loadData(this.entity);
    this.cdRef.detectChanges();
  }
  onUsaBaselineChange() {
    if (this.form.controls.usa_baseline.value) {
      if (!this.util.isDataValid(this.form.controls.inicio_baseline.value)) this.form.controls.inicio_baseline.setValue(this.form.controls.inicio.value);
      if (!this.util.isDataValid(this.form.controls.termino_baseline.value)) this.form.controls.inicio_baseline.setValue(this.form.controls.termino.value);
    } else {
      this.form.controls.inicio_baseline.setValue(null);
      this.form.controls.termino_baseline.setValue(null);
    }
  }
  get intervaloAutomatico() {
    return this.form?.controls.calcula_intervalo.value ? "true" : undefined;
  }
  get usaBaseline() {
    return this.form.controls.usa_baseline.value ? undefined : "true";
  }
  get usaHoras() {
    return this.form.controls.usa_horas.value ? undefined : "true";
  }
  get progressoAutomatico() {
    return this.form.controls.soma_progresso_filhos.value ? "true" : undefined;
  }
}
_class = ProjetoFormPrincipalComponent;
_class.ɵfac = function ProjetoFormPrincipalComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_17__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-form-principal"]],
  viewQuery: function ProjetoFormPrincipalComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.escritorio = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.expediente = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    cdRef: "cdRef"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵInheritDefinitionFeature"]],
  decls: 40,
  vars: 48,
  consts: [[3, "form", "noButtons", "disabled", "submit", "cancel"], [1, "row"], ["label", "Nome", "controlName", "nome", "labelInfo", "Nome do projeto", 3, "size"], ["label", "Fase", "icon", "bi bi-puzzle", "controlName", "fase_id", 3, "size", "items"], ["label", "Status", "icon", "bi bi-arrow-up-right-circle", "controlName", "status", 3, "size", "items"], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows"], ["label", "Finalidade", "controlName", "finalidade", 3, "size", "rows"], [1, "col-md-4"], ["title", "Usa Baseline (planejado)?", "labelInfo", "Se o utiliza baseline no projeto (planejamento inicial)", 3, "control", "change"], ["noIcon", "", "label", "In\u00EDcio planejado", "icon", "bi bi-calendar-date", "controlName", "inicio_baseline", 3, "date", "size", "disabled"], ["noIcon", "", "label", "T\u00E9rmino planejado", "icon", "bi bi-calendar-date", "controlName", "termino_baseline", 3, "date", "size", "disabled"], [1, "col-md-6"], ["title", "Cronograma autom\u00E1tico?", "transparent", "", "labelInfo", "Se o per\u00EDodo do projeto ser\u00E1 calculado automaticamente pelas tarefas", 3, "control", "change"], ["noIcon", "", "label", "In\u00EDcio real", "icon", "bi bi-calendar-date", "controlName", "inicio", 3, "date", "size", "disabled"], ["noIcon", "", "label", "T\u00E9rmino real", "icon", "bi bi-calendar-date", "controlName", "termino", 3, "date", "size", "disabled"], ["daysOrHours", "", "label", "Dura\u00E7\u00E3o", "controlName", "duracao", "labelInfo", "Se o projeto ser\u00E1 calculado em horas ou dias", 3, "size", "unit", "disabled", "control", "unitChange"], [1, "col-md-2"], ["title", "Autom\u00E1tico?", "labelInfo", "Se o progresso ser\u00E1 calculado automaticamente pela soma dos progressos das tarefas", 3, "control", "change"], ["label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso do projeto (% Conclu\u00EDdo)", 3, "decimals", "size", "disabled"], ["title", "Configura\u00E7\u00F5es", "collapse", "", "transparent", "", 3, "collapsed"], ["label", "Tempo corrido", "scale", "small", "labelPosition", "right", "controlName", "tempo_corrido", "labelInfo", "Se o calculo do tempo \u00E9 cont\u00EDnuo, sem considerar fins de semana e feriados", 3, "size"], ["label", "Usa horas", "scale", "small", "labelPosition", "right", "controlName", "usa_horas", "labelInfo", "Se utiliza as datas com horas (todos os calculos mudam de dias para horas)", 3, "size"], ["label", "Intervalo autom\u00E1tico", "scale", "small", "labelPosition", "right", "controlName", "calcula_intervalo", "labelInfo", "Se o intervalo entre a data de inicio e t\u00E9rmino s\u00E3o calculados automaticamente utilizando as tarefas", 3, "size"], ["label", "Progresso autom\u00E1tico", "scale", "small", "labelPosition", "right", "controlName", "soma_progresso_filhos", "labelInfo", "Se o progresso \u00E9 calculado automaticamente pela soma dos processos das tarefas", 3, "size"], ["label", "Agrupador", "scale", "small", "labelPosition", "right", "controlName", "agrupador", "labelInfo", "Se o projeto agrupa as tarefas dentro dele", 3, "size"], ["label", "Usa custo", "scale", "small", "labelPosition", "right", "controlName", "calcula_custos", "labelInfo", "Se o projeto gerencia custos", 3, "size"], ["label", "Aloca recursos no projeto", "scale", "small", "labelPosition", "right", "controlName", "aloca_proprios_recursos", "labelInfo", "Se o projeto aloca recursos nele pr\u00F3prio, independente das tarefas", 3, "size"], ["label", "Soma aloca\u00E7\u00F5es autom\u00E1tico", "scale", "small", "labelPosition", "right", "controlName", "soma_recusos_alocados_filhos", "labelInfo", "Se os recursos das tarefas totalizam no projeto", 3, "size"], ["label", "Possui custos no projeto", "scale", "small", "labelPosition", "right", "controlName", "custos_proprios", "labelInfo", "Se o projeto possui custos pr\u00F3prios, independente das tarefas", 3, "size"], ["label", "Soma custos autom\u00E1tico", "scale", "small", "labelPosition", "right", "controlName", "soma_custos_filhos", "labelInfo", "Se os custos das tarefas totalizam no projeto", 3, "size"], ["label", "Utiliza baseline", "scale", "small", "labelPosition", "right", "controlName", "usa_baseline", "labelInfo", "Utiliza baseline (planejamento inicial)", 3, "size"], ["title", "Expediente", "collapse", "", "transparent", "", 3, "collapsed", 4, "ngIf"], ["title", "Expediente", "collapse", "", "transparent", "", 3, "collapsed"], ["label", "Usar do escrit\u00F3rio:", "labelPosition", "right", "controlName", "usar_escritorio", "labelInfo", "Aloca recursos no projeto", 3, "size"], ["hostClass", "p-0", "label", "", "icon", "", "disabled", "", "controlName", "escritorio_id", 3, "size", "dao"], ["escritorio", ""], ["expediente", ""]],
  template: function ProjetoFormPrincipalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("submit", function ProjetoFormPrincipalComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function ProjetoFormPrincipalComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "input-text", 2)(3, "input-select", 3)(4, "input-select", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](6, "input-textarea", 5)(7, "input-textarea", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "div", 1)(9, "div", 7)(10, "separator", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function ProjetoFormPrincipalComponent_Template_separator_change_10_listener() {
        return ctx.onUsaBaselineChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](11, "input-datetime", 9)(12, "input-datetime", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](13, "div", 11)(14, "separator", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function ProjetoFormPrincipalComponent_Template_separator_change_14_listener($event) {
        return ctx.onIntervaloAutomaticoChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](15, "input-datetime", 13)(16, "input-datetime", 14)(17, "input-workload", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](18, "div", 16)(19, "separator", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function ProjetoFormPrincipalComponent_Template_separator_change_19_listener($event) {
        return ctx.onIntervaloAutomaticoChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](20, "input-number", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](21, "separator", 19)(22, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](23, "input-switch", 20)(24, "input-switch", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](25, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](26, "input-switch", 22)(27, "input-switch", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](28, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](29, "input-switch", 24)(30, "input-switch", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](31, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](32, "input-switch", 26)(33, "input-switch", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](34, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](35, "input-switch", 28)(36, "input-switch", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](37, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](38, "input-switch", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](39, ProjetoFormPrincipalComponent_separator_39_Template, 7, 4, "separator", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("form", ctx.form)("noButtons", !ctx.entity_id ? "true" : undefined)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("items", ctx.fases);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("items", ctx.lookup.PROJETO_STATUS);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6)("rows", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6)("rows", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx.form.controls.usa_baseline);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("date", ctx.usaHoras)("size", 6)("disabled", ctx.usaBaseline);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("date", ctx.usaHoras)("size", 6)("disabled", ctx.usaBaseline);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx.form.controls.calcula_intervalo);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("date", ctx.usaHoras)("size", 4)("disabled", ctx.intervaloAutomatico);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("date", ctx.usaHoras)("size", 4)("disabled", ctx.intervaloAutomatico);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4)("unit", ctx.unitDuracao)("disabled", ctx.intervaloAutomatico)("control", ctx.form.controls.carga_horaria)("unitChange", ctx.onUnitDuracaoChange.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("control", ctx.form.controls.soma_progresso_filhos);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("decimals", 2)("size", 12)("disabled", ctx.progressoAutomatico);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("collapsed", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !(ctx.form == null ? null : ctx.form.controls == null ? null : ctx.form.controls.tempo_corrido == null ? null : ctx.form.controls.tempo_corrido.value));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_7__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_10__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_11__.InputDatetimeComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_13__.SeparatorComponent, _components_input_input_workload_input_workload_component__WEBPACK_IMPORTED_MODULE_14__.InputWorkloadComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_15__.InputNumberComponent, _uteis_calendar_expediente_calendar_expediente_component__WEBPACK_IMPORTED_MODULE_16__.CalendarExpedienteComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 65646:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-recursos/projeto-form-recursos.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoFormRecursosComponent: () => (/* binding */ ProjetoFormRecursosComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_material_servico_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/material-servico-dao.service */ 84166);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);

var _class;






















const _c0 = ["usuario"];
const _c1 = ["unidade"];
const _c2 = ["materialServico"];
const _c3 = ["tipoRecurso"];
function ProjetoFormRecursosComponent_ng_template_3_strong_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]().group;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassMap"](ctx_r19.lookup.getIcon(ctx_r19.lookup.PROJETO_TIPO_RECURSOS, group_r18[0].value));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"](" ", ctx_r19.lookup.getValue(ctx_r19.lookup.PROJETO_TIPO_RECURSOS, group_r18[0].value), "");
  }
}
function ProjetoFormRecursosComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](0, ProjetoFormRecursosComponent_ng_template_3_strong_0_Template, 3, 3, "strong", 17);
  }
  if (rf & 2) {
    const group_r18 = ctx.group;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", group_r18 == null ? null : group_r18.length);
  }
}
function ProjetoFormRecursosComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "badge", 18);
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("icon", ctx_r3.lookup.getIcon(ctx_r3.lookup.PROJETO_TIPO_RECURSOS, row_r21.tipo))("label", ctx_r3.lookup.getValue(ctx_r3.lookup.PROJETO_TIPO_RECURSOS, row_r21.tipo))("color", ctx_r3.lookup.getColor(ctx_r3.lookup.PROJETO_TIPO_RECURSOS, row_r21.tipo));
  }
}
function ProjetoFormRecursosComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "input-select", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵlistener"]("change", function ProjetoFormRecursosComponent_ng_template_9_Template_input_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵresetView"](ctx_r24.onTipoRecursoChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("disabled", row_r22.id != "NEW" ? "true" : undefined)("control", ctx_r5.form.controls.tipo)("items", ctx_r5.lookup.PROJETO_TIPO_RECURSOS);
  }
}
function ProjetoFormRecursosComponent_ng_template_12_small_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](row_r26.nome);
  }
}
function ProjetoFormRecursosComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "profile-picture", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](1, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](3, ProjetoFormRecursosComponent_ng_template_12_small_3_Template, 3, 1, "small", 17);
  }
  if (rf & 2) {
    const row_r26 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("url", ctx_r7.projetoService.getRecursoPicture(row_r26.recurso))("hint", row_r26.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"]((row_r26.material_servico == null ? null : row_r26.material_servico.descricao) || (row_r26.usuario == null ? null : row_r26.usuario.nome) || (row_r26.unidade == null ? null : row_r26.unidade.nome) || row_r26.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", row_r26.material_servico);
  }
}
function ProjetoFormRecursosComponent_ng_template_14_input_search_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-search", 26, 27);
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("dao", ctx_r30.usuarioDao);
  }
}
function ProjetoFormRecursosComponent_ng_template_14_input_search_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-search", 28, 29);
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("dao", ctx_r31.unidadeDao);
  }
}
const _c4 = function (a2) {
  return ["tipo", "==", a2];
};
const _c5 = function (a0) {
  return [a0];
};
function ProjetoFormRecursosComponent_ng_template_14_input_search_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-search", 30, 31);
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 6)("dao", ctx_r32.materialServicoDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction1"](5, _c5, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction1"](3, _c4, ctx_r32.tipoRecurso == null ? null : ctx_r32.tipoRecurso.value)));
  }
}
function ProjetoFormRecursosComponent_ng_template_14_input_text_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-text", 32);
  }
  if (rf & 2) {
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", ctx_r33.isMaterialServico(ctx_r33.tipoRecurso == null ? null : ctx_r33.tipoRecurso.value) ? 6 : 12)("control", ctx_r33.form.controls.nome);
  }
}
const _c6 = function () {
  return ["HUMANO"];
};
const _c7 = function () {
  return ["DEPARTAMENTO"];
};
function ProjetoFormRecursosComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](1, ProjetoFormRecursosComponent_ng_template_14_input_search_1_Template, 2, 2, "input-search", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](2, ProjetoFormRecursosComponent_ng_template_14_input_search_2_Template, 2, 2, "input-search", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](3, ProjetoFormRecursosComponent_ng_template_14_input_search_3_Template, 2, 7, "input-search", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](4, ProjetoFormRecursosComponent_ng_template_14_input_text_4_Template, 1, 2, "input-text", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r9.isHumanoDepartamento(ctx_r9.tipoRecurso == null ? null : ctx_r9.tipoRecurso.value, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](4, _c6)));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r9.isHumanoDepartamento(ctx_r9.tipoRecurso == null ? null : ctx_r9.tipoRecurso.value, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpureFunction0"](5, _c7)));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", ctx_r9.isMaterialServico(ctx_r9.tipoRecurso == null ? null : ctx_r9.tipoRecurso.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("ngIf", !ctx_r9.isHumanoDepartamento(ctx_r9.tipoRecurso == null ? null : ctx_r9.tipoRecurso.value));
  }
}
function ProjetoFormRecursosComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "badge", 33);
  }
  if (rf & 2) {
    const row_r37 = ctx.row;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("label", ctx_r11.lookup.getValue(ctx_r11.lookup.MATERIAL_SERVICO_UNIDADE, row_r37.unidade_medida));
  }
}
function ProjetoFormRecursosComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-select", 34);
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("control", ctx_r13.form.controls.unidade_medida)("items", ctx_r13.lookup.MATERIAL_SERVICO_UNIDADE);
  }
}
function ProjetoFormRecursosComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r39 = ctx.row;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](ctx_r15.util.formatDecimal(row_r39.valor));
  }
}
function ProjetoFormRecursosComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](0, "input-number", 36);
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("size", 12)("decimals", 2)("control", ctx_r17.form.controls.valor);
  }
}
class ProjetoFormRecursosComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_8__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_7__.Projeto());
    if (!this.gridControl.value.recursos) this.gridControl.value.recursos = [];
    return this.gridControl.value.recursos;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      const tipo = this.form?.controls.tipo.value;
      if (tipo == "HUMANO" && controlName == "usuario_id" && !control.value?.length) return "Obrigatório";
      if (tipo == "DEPARTAMENTO" && controlName == "unidade_id" && !control.value?.length) return "Obrigatório";
      if (controlName == "material_servico_id" && this.materialServico?.selectedItem && this.materialServico?.selectedItem.entity.tipo != tipo) return "Tipo diferente";
      return null;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_18__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_4__.ProjetoDaoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_6__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_5__.UnidadeDaoService);
    this.materialServicoDao = injector.get(src_app_dao_material_servico_dao_service__WEBPACK_IMPORTED_MODULE_3__.MaterialServicoDaoService);
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_9__.ProjetoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      tipo: {
        default: "MATERIAL"
      },
      unidade_medida: {
        default: "UNIDADE"
      },
      material_servico_id: {
        default: null
      },
      usuario_id: {
        default: null
      },
      unidade_id: {
        default: null
      },
      valor: {
        default: 0
      }
    }, this.cdRef, this.validate);
    this.groupBy = [{
      field: "tipo",
      label: "Tipo"
    }];
  }
  loadData(entity, form) {
    super.loadData(entity, form);
  }
  initializeData(form) {
    this.entity = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_7__.Projeto();
    this.loadData(this.entity, this.form);
  }
  saveData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.grid?.confirm();
      return _this.entity;
    })();
  }
  onTipoRecursoChange() {
    this.cdRef.detectChanges();
  }
  isHumanoDepartamento(tipo, tipos = ['HUMANO', 'DEPARTAMENTO']) {
    return tipos.includes(tipo || '');
  }
  isMaterialServico(tipo, tipos = ['MATERIAL', 'SERVICO']) {
    return tipos.includes(tipo || '');
  }
  addRecurso() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: "NEW",
        nome: "",
        tipo: "MATERIAL",
        unidade_medida: "UNIDADE",
        material_servico_id: null,
        usuario_id: null,
        unidade_id: null,
        valor: 0
      };
    })();
  }
  loadRecurso(form, row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.nome.setValue(row.nome);
      form.controls.tipo.setValue(row.tipo);
      form.controls.unidade_medida.setValue(row.unidade_medida);
      form.controls.material_servico_id.setValue(row.material_servico_id);
      form.controls.usuario_id.setValue(row.usuario_id);
      form.controls.unidade_id.setValue(row.unidade_id);
      form.controls.valor.setValue(row.valor);
      _this2.cdRef.detectChanges();
    })();
  }
  removeRecurso(row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return true;
    })();
  }
  saveRecurso(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this3.form.markAllAsTouched();
      if (_this3.form.valid) {
        row.id = row.id == "NEW" ? _this3.dao.generateUuid() : row.id;
        row.nome = form.controls.nome.value;
        row.tipo = form.controls.tipo.value;
        row.unidade_medida = form.controls.unidade_medida.value;
        row.material_servico_id = ["MATERIAL", "SERVICO"].includes(form.controls.tipo.value) ? form.controls.material_servico_id.value : null;
        row.usuario_id = form.controls.tipo.value == "HUMANO" ? form.controls.usuario_id.value : null;
        row.unidade_id = form.controls.tipo.value == "DEPARTAMENTO" ? form.controls.unidade_id.value : null;
        row.valor = form.controls.valor.value;
        row.usuario = _this3.usuario?.selectedItem?.entity;
        row.unidade = _this3.unidade?.selectedItem?.entity;
        row.material_servico = _this3.materialServico?.selectedItem?.entity;
        result = row;
        _this3.cdRef.detectChanges();
      }
      return result;
    })();
  }
}
_class = ProjetoFormRecursosComponent;
_class.ɵfac = function ProjetoFormRecursosComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_18__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-form-recursos"]],
  viewQuery: function ProjetoFormRecursosComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵviewQuery"](_c3, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.materialServico = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵloadQuery"]()) && (ctx.tipoRecurso = _t.first);
    }
  },
  inputs: {
    cdRef: "cdRef",
    control: "control",
    entity: "entity"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵInheritDefinitionFeature"]],
  decls: 27,
  vars: 23,
  consts: [[3, "form", "disabled", "title"], [1, "row"], ["editable", "", 3, "items", "form", "hasDelete", "groupTemplate", "groupBy", "add", "load", "remove", "save"], ["groupRecurso", ""], ["title", "Tipo", 3, "template", "editTemplate"], ["recursoTipo", ""], ["editRecursoTipo", ""], ["title", "Recurso", 3, "template", "editTemplate"], ["recursoNomeUsuarioUnidade", ""], ["editRecursoNomeUsuarioUnidade", ""], ["title", "Un. medida", 3, "width", "template", "editTemplate"], ["recursoUnidade", ""], ["editRecursoUnidade", ""], ["title", "Valor R$", 3, "align", "width", "template", "editTemplate"], ["recursoValor", ""], ["editRecursoValor", ""], ["type", "options"], [4, "ngIf"], [3, "icon", "label", "color"], ["controlName", "tipo", 3, "size", "disabled", "control", "items", "change"], ["tipoRecurso", ""], [3, "url", "hint"], ["label", "", "icon", "", "hostClass", "p-0", "controlName", "usuario_id", 3, "size", "dao", 4, "ngIf"], ["label", "", "icon", "", "hostClass", "p-0", "controlName", "unidade_id", 3, "size", "dao", 4, "ngIf"], ["hostClass", "p-0", "label", "", "icon", "", "controlName", "material_servico_id", 3, "size", "dao", "where", 4, "ngIf"], ["hostClass", "p-0", "prefix", "Descri\u00E7\u00E3o", "controlName", "nome", 3, "size", "control", 4, "ngIf"], ["label", "", "icon", "", "hostClass", "p-0", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], ["label", "", "icon", "", "hostClass", "p-0", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["hostClass", "p-0", "label", "", "icon", "", "controlName", "material_servico_id", 3, "size", "dao", "where"], ["materialServico", ""], ["hostClass", "p-0", "prefix", "Descri\u00E7\u00E3o", "controlName", "nome", 3, "size", "control"], ["icon", "bi bi-rulers", "color", "warning", 3, "label"], ["controlName", "unidade_medida", 3, "size", "control", "items"], [1, "text-end"], ["controlName", "valor", 3, "size", "decimals", "control"]],
  template: function ProjetoFormRecursosComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "grid", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](3, ProjetoFormRecursosComponent_ng_template_3_Template, 1, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "columns")(6, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](7, ProjetoFormRecursosComponent_ng_template_7_Template, 1, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](9, ProjetoFormRecursosComponent_ng_template_9_Template, 2, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](11, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](12, ProjetoFormRecursosComponent_ng_template_12_Template, 4, 4, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](14, ProjetoFormRecursosComponent_ng_template_14_Template, 5, 6, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](16, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](17, ProjetoFormRecursosComponent_ng_template_17_Template, 1, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](19, ProjetoFormRecursosComponent_ng_template_19_Template, 1, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](21, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](22, ProjetoFormRecursosComponent_ng_template_22_Template, 2, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplate"](24, ProjetoFormRecursosComponent_ng_template_24_Template, 1, 3, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](26, "column", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](4);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](8);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](10);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](13);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](15);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](18);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](20);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](23);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵreference"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("groupTemplate", _r0)("groupBy", ctx.groupBy)("add", ctx.addRecurso.bind(ctx))("load", ctx.loadRecurso.bind(ctx))("remove", ctx.removeRecurso.bind(ctx))("save", ctx.saveRecurso.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("template", _r6)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("width", 130)("template", _r10)("editTemplate", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("align", "right")("width", 100)("template", _r14)("editTemplate", _r16);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_10__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_11__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__.InputSelectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_15__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_16__.ProfilePictureComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_17__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 40894:
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form-regras/projeto-form-regras.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoFormRegrasComponent: () => (/* binding */ ProjetoFormRegrasComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);

var _class;
















function ProjetoFormRegrasComponent_ng_template_3_strong_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().group;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassMap"](ctx_r15.lookup.getIcon(ctx_r15.lookup.PROJETO_TIPO_RECURSOS, group_r14[0].value));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r15.lookup.getValue(ctx_r15.lookup.PROJETO_TIPO_RECURSOS, group_r14[0].value), "");
  }
}
function ProjetoFormRegrasComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, ProjetoFormRegrasComponent_ng_template_3_strong_0_Template, 3, 3, "strong", 14);
  }
  if (rf & 2) {
    const group_r14 = ctx.group;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", group_r14 == null ? null : group_r14.length);
  }
}
function ProjetoFormRegrasComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r17.nome);
  }
}
function ProjetoFormRegrasComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "input-text", 15);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("control", ctx_r5.form.controls.nome);
  }
}
function ProjetoFormRegrasComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "badge", 16);
  }
  if (rf & 2) {
    const row_r19 = ctx.row;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("icon", ctx_r7.lookup.getIcon(ctx_r7.lookup.PROJETO_TIPO_RECURSOS, row_r19.tipo_recurso))("label", ctx_r7.lookup.getValue(ctx_r7.lookup.PROJETO_TIPO_RECURSOS, row_r19.tipo_recurso))("color", ctx_r7.lookup.getColor(ctx_r7.lookup.PROJETO_TIPO_RECURSOS, row_r19.tipo_recurso));
  }
}
function ProjetoFormRegrasComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "input-select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("change", function ProjetoFormRegrasComponent_ng_template_14_Template_input_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r21.onTipoRecursoChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r20 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("disabled", row_r20.id != "NEW" ? "true" : undefined)("control", ctx_r9.form.controls.tipo_recurso)("items", ctx_r9.lookup.PROJETO_TIPO_RECURSOS);
  }
}
function ProjetoFormRegrasComponent_ng_template_17_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "badge", 20);
  }
  if (rf & 2) {
    const perfil_r25 = ctx.$implicit;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("icon", ctx_r24.lookup.getIcon(ctx_r24.lookup.PROJETO_PERFIS, perfil_r25))("label", ctx_r24.lookup.getValue(ctx_r24.lookup.PROJETO_PERFIS, perfil_r25));
  }
}
function ProjetoFormRegrasComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ProjetoFormRegrasComponent_ng_template_17_badge_1_Template, 1, 2, "badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r23.perfis);
  }
}
function ProjetoFormRegrasComponent_ng_template_19_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input-switch", 21)(2, "input-switch", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Acesso ao " + ctx_r27.lex.translate("projeto"))("control", ctx_r27.form.controls.perfil_acesso);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Gerente de " + ctx_r27.lex.translate("projeto"))("control", ctx_r27.form.controls.perfil_gerente);
  }
}
function ProjetoFormRegrasComponent_ng_template_19_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input-switch", 21)(2, "input-switch", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Acesso ao " + ctx_r28.lex.translate("projeto"))("control", ctx_r28.form.controls.perfil_acesso);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 12)("label", "Escrit\u00F3rio de " + ctx_r28.lex.translate("projeto"))("control", ctx_r28.form.controls.perfil_escritorio);
  }
}
function ProjetoFormRegrasComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, ProjetoFormRegrasComponent_ng_template_19_ng_container_0_Template, 3, 6, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ProjetoFormRegrasComponent_ng_template_19_ng_container_1_Template, 3, 6, "ng-container", 14);
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r13.form.controls.tipo_recurso.value == "HUMANO");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r13.form.controls.tipo_recurso.value == "DEPARTAMENTO");
  }
}
class ProjetoFormRegrasComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_5__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  get items() {
    if (!this.gridControl.value) this.gridControl.setValue(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__.Projeto());
    if (!this.gridControl.value.regras) this.gridControl.value.regras = [];
    return this.gridControl.value.regras;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      if (controlName == "nome" && !control.value?.length) return "Obrigatório";
      return null;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef);
    this.dao = injector.get(src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__.ProjetoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      perfil_acesso: {
        default: false
      },
      perfil_gerente: {
        default: false
      },
      perfil_escritorio: {
        default: false
      },
      tipo_recurso: {
        default: "MATERIAL"
      }
    }, this.cdRef, this.validate);
    this.groupBy = [{
      field: "tipo_recurso",
      label: "Tipo do recurso"
    }];
  }
  loadData(entity, form) {
    super.loadData(entity, form);
  }
  initializeData(form) {
    this.entity = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__.Projeto();
    this.loadData(this.entity, this.form);
  }
  saveData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.grid?.confirm();
      return _this.entity;
    })();
  }
  onTipoRecursoChange() {
    this.cdRef.detectChanges();
  }
  addRegra() {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return {
        id: "NEW",
        nome: "",
        perfis: [],
        tipo_recurso: "MATERIAL"
      };
    })();
  }
  loadRegra(form, row) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      form.controls.nome.setValue(row.nome);
      form.controls.tipo_recurso.setValue(row.tipo_recurso);
      form.controls.perfil_acesso.setValue((row.perfis || []).includes("ACESSAR"));
      form.controls.perfil_gerente.setValue((row.perfis || []).includes("GERENTE"));
      form.controls.perfil_escritorio.setValue((row.perfis || []).includes("ESCRITORIO"));
      _this2.cdRef.detectChanges();
    })();
  }
  removeRegra(row) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return true;
    })();
  }
  saveRegra(form, row) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let result = undefined;
      _this3.form.markAllAsTouched();
      if (_this3.form.valid) {
        let perfis = [];
        let tipo = form.controls.tipo_recurso.value;
        if (["HUMANO", "DEPARTAMENTO"].includes(tipo) && form.controls.perfil_acesso.value) perfis.push("ACESSAR");
        if (tipo == "HUMANO" && form.controls.perfil_gerente.value) perfis.push("GERENTE");
        if (tipo == "DEPARTAMENTO" && form.controls.perfil_escritorio.value) perfis.push("DEPARTAMENTO");
        row.id = row.id == "NEW" ? _this3.dao.generateUuid() : row.id;
        row.nome = form.controls.nome.value;
        row.tipo_recurso = tipo;
        row.perfis = perfis;
        result = row;
        _this3.cdRef.detectChanges();
      }
      return result;
    })();
  }
}
_class = ProjetoFormRegrasComponent;
_class.ɵfac = function ProjetoFormRegrasComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-form-regras"]],
  viewQuery: function ProjetoFormRegrasComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    cdRef: "cdRef",
    control: "control",
    entity: "entity"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 22,
  vars: 18,
  consts: [["noButtons", "", 3, "form", "disabled"], [1, "row"], ["editable", "", 3, "items", "form", "hasDelete", "groupTemplate", "groupBy", "add", "load", "remove", "save"], ["groupRecurso", ""], ["title", "Nome", 3, "template", "editTemplate"], ["regraNome", ""], ["editRegraNome", ""], ["title", "Tipo do recurso", 3, "width", "template", "editTemplate"], ["regraRecursoTipo", ""], ["editRegraRecursoTipo", ""], ["title", "Perfis", 3, "template", "editTemplate"], ["regraPerfis", ""], ["editRegraPerfis", ""], ["type", "options"], [4, "ngIf"], ["controlName", "nome", 3, "size", "control"], [3, "icon", "label", "color"], ["controlName", "tipo_recurso", 3, "size", "disabled", "control", "items", "change"], [1, "text-wrap", "multilines-badges"], [3, "icon", "label", 4, "ngFor", "ngForOf"], [3, "icon", "label"], ["scale", "small", "labelPosition", "right", "controlName", "perfil_acesso", 3, "size", "label", "control"], ["scale", "small", "labelPosition", "right", "controlName", "perfil_gerente", 3, "size", "label", "control"], ["scale", "small", "labelPosition", "right", "controlName", "perfil_escritorio", 3, "size", "label", "control"]],
  template: function ProjetoFormRegrasComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1)(2, "grid", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, ProjetoFormRegrasComponent_ng_template_3_Template, 1, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "columns")(6, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, ProjetoFormRegrasComponent_ng_template_7_Template, 2, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, ProjetoFormRegrasComponent_ng_template_9_Template, 1, 2, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "column", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, ProjetoFormRegrasComponent_ng_template_12_Template, 1, 3, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, ProjetoFormRegrasComponent_ng_template_14_Template, 1, 4, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](16, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](17, ProjetoFormRegrasComponent_ng_template_17_Template, 2, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](19, ProjetoFormRegrasComponent_ng_template_19_Template, 2, 2, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](21, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](4);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](8);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](10);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](13);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](15);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](18);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](20);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx.items)("form", ctx.form)("hasDelete", true)("groupTemplate", _r0)("groupBy", ctx.groupBy)("add", ctx.addRegra.bind(ctx))("load", ctx.loadRegra.bind(ctx))("remove", ctx.removeRegra.bind(ctx))("save", ctx.saveRegra.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r2)("editTemplate", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("width", 250)("template", _r6)("editTemplate", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r10)("editTemplate", _r12);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_8__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_11__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 92730:
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-form/projeto-form.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoFormComponent: () => (/* binding */ ProjetoFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var src_app_models_projeto_alocacao_regra_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/projeto-alocacao-regra.model */ 35703);
/* harmony import */ var src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto-alocacao.model */ 34907);
/* harmony import */ var src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/projeto-recurso.model */ 31375);
/* harmony import */ var src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/projeto-regra.model */ 96878);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/unidade.model */ 53937);
/* harmony import */ var src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/models/usuario.model */ 26898);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ 54240);
/* harmony import */ var _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../projeto-form-principal/projeto-form-principal.component */ 52591);
/* harmony import */ var _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../projeto-form-recursos/projeto-form-recursos.component */ 65646);
/* harmony import */ var _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../projeto-form-alocacoes/projeto-form-alocacoes.component */ 60155);
/* harmony import */ var _projeto_form_regras_projeto_form_regras_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../projeto-form-regras/projeto-form-regras.component */ 40894);
/* harmony import */ var _projeto_form_fases_projeto_form_fases_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../projeto-form-fases/projeto-form-fases.component */ 23739);

var _class;




















const _c0 = ["principal"];
const _c1 = ["fases"];
const _c2 = ["recursos"];
const _c3 = ["alocacoes"];
const _c4 = ["regras"];
const _c5 = ["comentarios"];
class ProjetoFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_10__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_7__.Projeto, src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_2__.ProjetoDaoService);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      if (['nome', 'pergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.titleEdit = entity => {
      return "Editando " + (entity?.nome || "");
    };
    this.join = [];
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }
  initializeData(form) {
    const regra_escritorio_id = this.dao.generateUuid();
    const regra_gerente_id = this.dao.generateUuid();
    const regra_equipe_id = this.dao.generateUuid();
    const recurso_gerente_id = this.dao.generateUuid();
    const recurso_escritorio_id = this.dao.generateUuid();
    const alocacao_gerente_id = this.dao.generateUuid();
    const alocacao_escritorio_id = this.dao.generateUuid();
    const alocacao_regra_escritorio_id = this.dao.generateUuid();
    const alocacao_regra_gerente_id = this.dao.generateUuid();
    let projeto = new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_7__.Projeto();
    /* Usuario e Unidade */
    let usuario = new src_app_models_usuario_model__WEBPACK_IMPORTED_MODULE_9__.Usuario({
      id: this.auth.usuario.id,
      nome: this.auth.usuario.nome,
      email: this.auth.usuario.email,
      url_foto: this.auth.usuario.url_foto
    });
    let unidade = new src_app_models_unidade_model__WEBPACK_IMPORTED_MODULE_8__.Unidade({
      id: this.auth.unidade.id,
      codigo: this.auth.unidade.codigo,
      sigla: this.auth.unidade.sigla,
      nome: this.auth.unidade.nome
    });
    /* Carrega Regras, Recursos e Alocações padrões */
    projeto.regras = [new src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_6__.ProjetoRegra({
      id: regra_escritorio_id,
      nome: "Escritório",
      tipo_recurso: "DEPARTAMENTO",
      perfis: ["ESCRITORIO", "ACESSAR"]
    }), new src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_6__.ProjetoRegra({
      id: regra_gerente_id,
      nome: "Gerente",
      tipo_recurso: "HUMANO",
      perfis: ["GERENTE", "ACESSAR"]
    }), new src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_6__.ProjetoRegra({
      id: regra_equipe_id,
      nome: "Equipe",
      tipo_recurso: "HUMANO",
      perfis: ["ACESSAR"]
    })];
    projeto.recursos = [new src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_5__.ProjetoRecurso({
      id: recurso_gerente_id,
      nome: usuario.nome,
      tipo: "HUMANO",
      usuario_id: usuario.id,
      usuario: usuario
    }), new src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_5__.ProjetoRecurso({
      id: recurso_escritorio_id,
      nome: unidade.nome,
      tipo: "DEPARTAMENTO",
      unidade_id: unidade.id,
      unidade: unidade
    })];
    projeto.alocacoes = [new src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__.ProjetoAlocacao({
      id: alocacao_gerente_id,
      regras: [new src_app_models_projeto_alocacao_regra_model__WEBPACK_IMPORTED_MODULE_3__.ProjetoAlocacaoRegra({
        id: alocacao_regra_gerente_id,
        regra_id: regra_gerente_id,
        regra: projeto.regras.find(x => x.id == regra_gerente_id),
        projeto_alocacao_id: alocacao_gerente_id
      })],
      recurso_id: recurso_gerente_id,
      recurso: projeto.recursos.find(x => x.id == recurso_gerente_id)
    }), new src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__.ProjetoAlocacao({
      id: alocacao_escritorio_id,
      regras: [new src_app_models_projeto_alocacao_regra_model__WEBPACK_IMPORTED_MODULE_3__.ProjetoAlocacaoRegra({
        id: alocacao_regra_escritorio_id,
        regra_id: regra_escritorio_id,
        regra: projeto.regras.find(x => x.id == regra_escritorio_id),
        projeto_alocacao_id: alocacao_escritorio_id
      })],
      recurso_id: recurso_escritorio_id,
      recurso: projeto.recursos.find(x => x.id == recurso_escritorio_id)
    })];
    /* Carrega projeto */
    this.entity = projeto;
    this.cdRef.detectChanges();
    this.loadData(this.entity, form);
  }
  saveData(form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield Promise.all([_this.principal?.saveData(), _this.fases?.saveData(), _this.recursos?.saveData(), _this.alocacoes?.saveData(), _this.regras?.saveData(), _this.comentarios?.saveData()]);
      return _this.entity;
    })();
  }
  onTabsSelect() {
    console.log("Chamou");
    this.saveData(this.form);
  }
  get titleProjeto() {
    return this.entity?.numero ? "#" + this.entity?.numero : "";
  }
}
_class = ProjetoFormComponent;
_class.ɵfac = function ProjetoFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-projeto-form"]],
  viewQuery: function ProjetoFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](_c5, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.principal = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.fases = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.recursos = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.alocacoes = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.regras = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.comentarios = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
  decls: 20,
  vars: 16,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", "", 3, "title", "select"], ["key", "PRINCIPAL", "label", "Principal"], [3, "entity", "cdRef"], ["principal", ""], ["key", "FASES", "label", "Fases"], ["fases", ""], ["key", "ALOCACOES", "label", "Aloca\u00E7\u00F5es"], ["alocacoes", ""], ["key", "RECURSOS", "label", "Recursos"], ["recursos", ""], ["key", "REGRAS", "label", "Regras"], ["regras", ""], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"], ["origem", "PROJETO", 3, "entity"], ["comentarios", ""]],
  template: function ProjetoFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("submit", function ProjetoFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function ProjetoFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](3, "projeto-form-principal", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](5, "tab", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](6, "projeto-form-fases", 3, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](8, "tab", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](9, "projeto-form-alocacoes", 3, 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](11, "tab", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](12, "projeto-form-recursos", 3, 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](14, "tab", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](15, "projeto-form-regras", 3, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](17, "tab", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](18, "comentarios", 14, 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.titleProjeto)("select", ctx.onTabsSelect.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx.entity)("cdRef", ctx.cdRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("entity", ctx.entity);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_11__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_12__.TabComponent, _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_13__.ComentariosComponent, _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_14__.ProjetoFormPrincipalComponent, _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_15__.ProjetoFormRecursosComponent, _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_16__.ProjetoFormAlocacoesComponent, _projeto_form_regras_projeto_form_regras_component__WEBPACK_IMPORTED_MODULE_17__.ProjetoFormRegrasComponent, _projeto_form_fases_projeto_form_fases_component__WEBPACK_IMPORTED_MODULE_18__.ProjetoFormFasesComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 92821:
/*!*******************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-list/projeto-list.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoListComponent: () => (/* binding */ ProjetoListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/progress-bar/progress-bar.component */ 69756);
var _class;






















function ProjetoListComponent_toolbar_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "toolbar");
  }
}
function ProjetoListComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r16.numero);
  }
}
function ProjetoListComponent_ng_template_17_profile_picture_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "profile-picture", 29);
  }
  if (rf & 2) {
    const envolvido_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("url", envolvido_r20.url)("hint", envolvido_r20.hint);
  }
}
function ProjetoListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, ProjetoListComponent_ng_template_17_profile_picture_2_Template, 1, 2, "profile-picture", 28);
  }
  if (rf & 2) {
    const row_r17 = ctx.row;
    const metadata_r18 = ctx.metadata;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r17.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngForOf", ctx_r5.getEnvolvidos(row_r17, metadata_r18));
  }
}
function ProjetoListComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "strong", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r21.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtextInterpolate"](row_r21.finalidade);
  }
}
function ProjetoListComponent_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 30)(1, "br")(2, "badge", 31);
  }
  if (rf & 2) {
    const row_r22 = ctx.row;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", ctx_r9.util.getDateTimeFormatted(row_r22.inicio));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", ctx_r9.util.getDateTimeFormatted(row_r22.termino));
  }
}
function ProjetoListComponent_ng_template_26_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 34);
  }
}
function ProjetoListComponent_ng_template_26_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 35);
  }
  if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("label", ctx_r25.util.formatDecimal(row_r23.custo));
  }
}
function ProjetoListComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](0, ProjetoListComponent_ng_template_26_badge_0_Template, 1, 0, "badge", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](1, ProjetoListComponent_ng_template_26_badge_1_Template, 1, 1, "badge", 33);
  }
  if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !row_r23.calcula_custos);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r23.calcula_custos);
  }
}
function ProjetoListComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "progress-bar", 36);
  }
  if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("value", row_r27.progresso);
  }
}
function ProjetoListComponent_ng_template_32_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](0, "badge", 40);
  }
  if (rf & 2) {
    const row_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("color", row_r28.fase.cor)("label", row_r28.fase.nome);
  }
}
function ProjetoListComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "badge", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](2, ProjetoListComponent_ng_template_32_badge_2_Template, 1, 2, "badge", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r28 = ctx.row;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassMap"](ctx_r15.lookup.getColor(ctx_r15.lookup.PROJETO_STATUS, row_r28.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("icon", ctx_r15.lookup.getIcon(ctx_r15.lookup.PROJETO_STATUS, row_r28.status))("label", ctx_r15.lookup.getValue(ctx_r15.lookup.PROJETO_STATUS, row_r28.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", row_r28.fase);
  }
}
class ProjetoListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_5__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_4__.Projeto, src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_1__.ProjetoDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      let form = filter.value;
      if (form.nome?.length) {
        result.push(["nome", "like", "%" + form.nome + "%"]);
      } else if (form.status) {
        result.push(["status", "==", form.status]);
      } else if (form.inicio?.length) {
        result.push(["termino", ">=", form.inicio]);
      } else if (form.termino?.length) {
        result.push(["inicio", "=<", form.termino]);
      }
      return result;
    };
    /* Inicializações */
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_6__.ProjetoService);
    this.title = this.lex.translate("Projetos");
    this.code = "MOD_PROJ";
    this.join = ["alocacoes.recurso.usuario:id,nome,apelido", "alocacoes.recurso.unidade:id,nome", "alocacoes.regras.regra", "fase"];
    this.filter = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      status: {
        default: null
      },
      inicio: {
        default: null
      },
      termino: {
        default: null
      }
    });
  }
  filterClear(filter) {
    filter.controls.nome.setValue("");
    filter.controls.status.setValue(null);
    filter.controls.inicio.setValue(null);
    filter.controls.termino.setValue(null);
    super.filterClear(filter);
  }
  getEnvolvidos(projeto, metadata) {
    let result = [];
    for (let envolvido of projeto.alocacoes?.filter(x => this.projetoService.isEnvolvido(x, projeto)) || []) {
      if (envolvido.recurso?.usuario) {
        result.push({
          url: envolvido.recurso.usuario.url_foto || "assets/images/projetos/usuario.png",
          hint: "Usuario: " + envolvido.recurso.usuario.nome + this.projetoService.getNomesRegras(envolvido, "\n(", ")")
        });
      } else if (envolvido.recurso?.unidade) {
        result.push({
          url: "assets/images/projetos/unidade.png",
          hint: "Usuario: " + envolvido.recurso.unidade.nome + this.projetoService.getNomesRegras(envolvido, "\n(", ")")
        });
      }
    }
    if (metadata) {
      const igual = JSON.stringify(result) == JSON.stringify(metadata.envolvidos);
      metadata.envolvidos = igual ? metadata.envolvidos : result;
      result = metadata.envolvidos;
    }
    return result;
  }
  dynamicOptions(row) {
    let result = [];
    let projeto = row;
    const isEnvolvido = this.projetoService.canAcessar(projeto);
    const BOTAO_INFORMACOES = {
      label: "Informações",
      icon: "bi bi-info-circle",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'consult']
      }, {
        modal: true
      })
    };
    const BOTAO_COMENTARIOS = {
      label: "Comentários",
      icon: "bi bi-chat-left-quote",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'comentar']
      }, this.modalRefreshId(projeto))
    };
    const BOTAO_CLONAR = {
      label: "Clonar",
      icon: "bi bi-stickies",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'demanda', projeto.id, 'clonar']
      }, this.modalRefresh())
    };
    const BOTAO_ALTERAR = {
      label: "Alterar demanda",
      icon: "bi bi-pencil-square",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'edit']
      }, this.modalRefreshId(projeto))
    };
    const BOTAO_PLANEJAR = {
      label: "Planejamento",
      icon: "bi bi-bar-chart-steps",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'planejamento']
      }, this.modalRefreshId(projeto))
    };
    const BOTAO_EXCLUIR = {
      label: "Excluir demanda",
      icon: "bi bi-trash",
      onClick: this.delete.bind(this)
    };
    const BOTAO_RECURSOS = {
      label: "Recursos",
      icon: "bi bi-tools",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'recurso']
      }, this.modalRefreshId(projeto))
    };
    const BOTAO_REGRAS = {
      label: "Regras",
      icon: "bi bi-diagram-3",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'regra']
      }, this.modalRefreshId(projeto))
    };
    const BOTAO_ALOCACOES = {
      label: "Alocações",
      icon: "bi bi-cart-check",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'alocacao']
      }, this.modalRefreshId(projeto))
    };
    const BOTAO_ENVOLVIDOS = {
      label: "Envolvidos",
      id: "NAOINICIADO",
      icon: "bi bi-backspace",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'envolvido']
      }, this.modalRefreshId(projeto))
    };
    result.push(BOTAO_INFORMACOES);
    if (true) {
      result.push(BOTAO_PLANEJAR);
      result.push(BOTAO_COMENTARIOS);
      result.push(BOTAO_CLONAR);
      result.push(BOTAO_ALTERAR);
      result.push(BOTAO_EXCLUIR);
      result.push(BOTAO_RECURSOS);
      result.push(BOTAO_REGRAS);
      result.push(BOTAO_ALOCACOES);
      result.push(BOTAO_ENVOLVIDOS);
    }
    return result;
  }
  dynamicButtons(row) {
    let result = [];
    let projeto = row;
    const isEnvolvido = this.projetoService.canAcessar(projeto);
    const BOTAO_INFORMACOES = {
      label: "Informações",
      icon: "bi bi-info-circle",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'consult']
      }, {
        modal: true
      })
    };
    const BOTAO_PLANEJAR = {
      label: "Planejamento",
      icon: "bi bi-bar-chart-steps",
      onClick: projeto => this.go.navigate({
        route: ['gestao', 'projeto', projeto.id, 'planejamento']
      }, this.modalRefreshId(projeto))
    };
    if (true) {
      result.push(BOTAO_PLANEJAR);
    } else {}
    return result;
  }
}
_class = ProjetoListComponent;
_class.ɵfac = function ProjetoListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_19__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-projeto-list"]],
  viewQuery: function ProjetoListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵInheritDefinitionFeature"]],
  decls: 38,
  vars: 39,
  consts: [["right", "", 3, "title"], ["projetos", ""], ["key", "FOLD", "icon", "bi bi-table", "label", "Portif\u00F3lio"], ["key", "GANTT", "icon", "bi bi-bar-chart-steps", "label", "Gantt"], [3, "dao", "add", "orderBy", "groupBy", "join", "selectable", "hasAdd", "hasEdit", "select"], [4, "ngIf"], [3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], [1, "row"], ["label", "Nome", "controlName", "nome", 3, "size", "control"], ["controlName", "usuario_id", 3, "size", "dao"], ["controlName", "unidade_id", 3, "size", "dao"], ["title", "#ID", 3, "template"], ["columnNumero", ""], ["titleHint", "Somente os recursos humanos/departamentais que possuem' lex.translate('perfil') 'para acessar o projeto ser\u00E3o listados aqui", 3, "title", "template"], ["columnNomeEnvolvidos", ""], ["title", "Descri\u00E7\u00E3o", 3, "template"], ["columnDescricao", ""], ["title", "Datas", 3, "template"], ["columnDatas", ""], ["title", "Custo", 3, "template"], ["columnCusto", ""], ["title", "Progresso", 3, "template"], ["columnProgresso", ""], ["title", "Status", 3, "template"], ["columnStatus", ""], ["type", "options", 3, "onEdit", "onDelete", "dynamicOptions", "dynamicButtons"], [3, "rows"], [1, "d-block"], [3, "url", "hint", 4, "ngFor", "ngForOf"], [3, "url", "hint"], ["color", "light", "icon", "bi bi-box-arrow-right", "hint", "Data de in\u00EDcio", 3, "label"], ["color", "light", "icon", "bi bi-box-arrow-in-right", "hint", "Data de t\u00E9rmino", 3, "label"], ["color", "warning", "icon", "bi bi-dash-square", "label", "N\u00E3o calcula", "hint", "Projeto configurado para n\u00E3o calcular custos", 4, "ngIf"], ["color", "light", "icon", "bi bi-cash-coin", "hint", "Projeto configurado para calcular custos", 3, "label", 4, "ngIf"], ["color", "warning", "icon", "bi bi-dash-square", "label", "N\u00E3o calcula", "hint", "Projeto configurado para n\u00E3o calcular custos"], ["color", "light", "icon", "bi bi-cash-coin", "hint", "Projeto configurado para calcular custos", 3, "label"], ["color", "success", 3, "value"], [1, "text-wrap"], [3, "icon", "label"], [3, "color", "label", 4, "ngIf"], [3, "color", "label"]],
  template: function ProjetoListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "tabs", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](2, "tab", 2)(3, "tab", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](4, "div")(5, "grid", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("select", function ProjetoListComponent_Template_grid_select_5_listener($event) {
        return ctx.onSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](6, ProjetoListComponent_toolbar_6_Template, 1, 0, "toolbar", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](7, "filter", 6)(8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](9, "input-text", 8)(10, "input-search", 9)(11, "input-search", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](12, "columns")(13, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](14, ProjetoListComponent_ng_template_14_Template, 2, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](16, "column", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](17, ProjetoListComponent_ng_template_17_Template, 3, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](19, "column", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](20, ProjetoListComponent_ng_template_20_Template, 4, 2, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](22, "column", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](23, ProjetoListComponent_ng_template_23_Template, 3, 2, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](25, "column", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](26, ProjetoListComponent_ng_template_26_Template, 2, 2, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](28, "column", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](29, ProjetoListComponent_ng_template_29_Template, 1, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](31, "column", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplate"](32, ProjetoListComponent_ng_template_32_Template, 3, 5, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](34, "column", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](35, "pagination", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](36, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵtext"](37, " Em desenvolvimento\n");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](1);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](15);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](18);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](21);
      const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](24);
      const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](27);
      const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](30);
      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵreference"](33);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("d-none", _r0.active != "FOLD");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("selectable", ctx.selectable)("hasAdd", ctx.auth.hasPermissionTo("MOD_PROJ_INCL"))("hasEdit", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("ngIf", !ctx.selectable);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere)("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", !ctx.selectable && ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 4)("control", ctx.filter.controls.nome);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 4)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("size", 4)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("title", "Nome\nEnvolvidos")("template", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r8);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r10);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r12);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("template", _r14);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("onEdit", ctx.edit)("onDelete", ctx.delete)("dynamicOptions", ctx.dynamicOptions.bind(ctx))("dynamicButtons", ctx.dynamicButtons.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("rows", ctx.rowsLimit);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵclassProp"]("d-none", _r0.active != "GANTT");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_7__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_8__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_9__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_11__.PaginationComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_12__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_13__.InputTextComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_14__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_15__.TabComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_16__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_17__.ProfilePictureComponent, _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_18__.ProgressBarComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 47247:
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-planejamento/projeto-planejamento.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoPlanejamentoComponent: () => (/* binding */ ProjetoPlanejamentoComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/gantt/gantt-models */ 26637);
/* harmony import */ var src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/projeto-dao.service */ 39707);
/* harmony import */ var src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto-alocacao.model */ 34907);
/* harmony import */ var src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/projeto-recurso.model */ 31375);
/* harmony import */ var src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/projeto-regra.model */ 96878);
/* harmony import */ var src_app_models_projeto_tarefa_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/projeto-tarefa.model */ 48958);
/* harmony import */ var src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/models/projeto.model */ 52179);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fullcalendar/daygrid */ 69684);
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fullcalendar/interaction */ 89548);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/kanban/kanban.component */ 58189);
/* harmony import */ var _components_gantt_gantt_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../components/gantt/gantt.component */ 26884);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/badge/badge.component */ 95489);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
/* harmony import */ var _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @fullcalendar/angular */ 91695);
/* harmony import */ var _projeto_tarefa_filter_projeto_tarefa_filter_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../projeto-tarefa-filter/projeto-tarefa-filter.component */ 16292);

var _class;

























const _c0 = ["planejamentoKanban"];
function ProjetoPlanejamentoComponent_ng_template_0_div_0_profile_picture_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "profile-picture", 18);
  }
  if (rf & 2) {
    const recurso_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("url", recurso_r16.url)("hint", recurso_r16.hint);
  }
}
function ProjetoPlanejamentoComponent_ng_template_0_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "separator", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, ProjetoPlanejamentoComponent_ng_template_0_div_0_profile_picture_2_Template, 1, 2, "profile-picture", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    const card_r11 = ctx_r17.card;
    const metadata_r12 = ctx_r17.metadata;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngForOf", ctx_r13.getRecursos(card_r11.data, metadata_r12));
  }
}
function ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "badge", 22);
  }
  if (rf & 2) {
    const status_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("color", ctx_r18.getStatusColor(status_r19))("icon", status_r19.icon)("label", status_r19.value);
  }
}
function ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_badge_2_Template, 1, 3, "badge", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](3, "separator", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    const card_r11 = ctx_r20.card;
    const metadata_r12 = ctx_r20.metadata;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngForOf", ctx_r14.getStatus(card_r11.data, metadata_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("button", ctx_r14.addComentarioButton);
  }
}
function ProjetoPlanejamentoComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, ProjetoPlanejamentoComponent_ng_template_0_div_0_Template, 3, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](1, ProjetoPlanejamentoComponent_ng_template_0_ng_container_1_Template, 4, 2, "ng-container", 13);
  }
  if (rf & 2) {
    const card_r11 = ctx.card;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", card_r11.data.alocacoes == null ? null : card_r11.data.alocacoes.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", !(ctx_r1.filter == null ? null : ctx_r1.filter.controls == null ? null : ctx_r1.filter.controls.resumido == null ? null : ctx_r1.filter.controls.resumido.value));
  }
}
function ProjetoPlanejamentoComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "input-select", 23);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("size", 12)("control", ctx_r3.formEdit.controls.etiqueta)("items", ctx_r3.etiquetasEdit);
  }
}
function ProjetoPlanejamentoComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 24)(1, "div", 25)(2, "div", 26)(3, "h5", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](4, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](5, "div", 29)(6, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](7, "i", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](8, "h6", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](9, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](10, "p", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](11, "span", 35)(12, "span", 36)(13, "span", 36)(14, "span", 28)(15, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
}
function ProjetoPlanejamentoComponent_gantt_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "gantt", 37);
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("project", ctx_r7.project)("height", ctx_r7.ganttHeight);
  }
}
function ProjetoPlanejamentoComponent_div_15_full_calendar_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](0, "full-calendar", 42);
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("options", ctx_r21.calendarOptions);
  }
}
function ProjetoPlanejamentoComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 38)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "projeto-tarefa-filter", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, ProjetoPlanejamentoComponent_div_15_full_calendar_4_Template, 1, 1, "full-calendar", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("projeto", ctx_r8.entity)("change", ctx_r8.onCalendarioFilterChange.bind(ctx_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx_r8.afterLoadData);
  }
}
function ProjetoPlanejamentoComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div", 43)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](2, "projeto-tarefa-filter", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](3, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](4, "img", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("projeto", ctx_r9.entity)("change", ctx_r9.onCalendarioFilterChange.bind(ctx_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("src", ctx_r9.gb.getResourcePath("assets/images/burndown-example.png"), _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsanitizeUrl"]);
  }
}
function ProjetoPlanejamentoComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](1, "kanban", 45, 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](1);
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](5);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("dockers", ctx_r10.labels)("template", _r0)("placeholderTemplate", _r4)("loading", ctx_r10.loading)("swimlaneDrop", ctx_r10.onSwimlaneDrop.bind(ctx_r10))("dockerDragged", ctx_r10.onDragged.bind(ctx_r10))("dockerDrop", ctx_r10.onDrop.bind(ctx_r10))("dockerEditTemplate", _r2)("dockerToggle", ctx_r10.onDockerCollapse.bind(ctx_r10))("dockerEdit", ctx_r10.editEtiquetas.bind(ctx_r10))("dockerSave", ctx_r10.saveEtiquetas.bind(ctx_r10))("dockerDelete", ctx_r10.deleteEtiquetas.bind(ctx_r10))("dockerCancel", ctx_r10.cancelEtiquetas.bind(ctx_r10))("dockerColorStyle", ctx_r10.getLabelStyle);
  }
}
class ProjetoPlanejamentoComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_9__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_8__.Projeto, src_app_dao_projeto_dao_service__WEBPACK_IMPORTED_MODULE_3__.ProjetoDaoService);
    this.injector = injector;
    this.TITLE_OUTRAS = "Outras";
    this.afterLoadData = false;
    this.cardsVersion = 0;
    this.dragDrop = {};
    this.labels = [];
    this.etiquetas = [];
    this.etiquetasEdit = [];
    this.outrasButtons = [{
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      hint: "Incluir nova lista a direita",
      onClick: this.incluirLista.bind(this)
    }];
    this.etiquetasButtons = [{
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      hint: "Incluir nova lista a direita",
      onClick: this.incluirLista.bind(this)
    }];
    this.addComentarioButton = {
      icon: "bi bi-plus-circle",
      hint: "Incluir comentário"
    };
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [],
      plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_21__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_22__["default"]]
    };
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.titleEdit = entity => {
      return "Editando: " + (entity?.nome || "");
    };
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_10__.ProjetoService);
    this.modalWidth = screen.availWidth - Math.round(screen.availWidth * 0.1); /* Variar de acordo com a resolução do usuário */
    this.ganttHeight = screen.availHeight - 350 - Math.round(screen.availHeight * 0.1); /* Variar de acordo com a resolução do usuário */
    console.log(this.ganttHeight, screen.availWidth, screen.availHeight);
    this.project = new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttProject();
    this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    this.filter = this.fh.FormBuilder({
      resumido: {
        default: false
      }
    }, this.cdRef, this.validate);
    this.formEdit = this.fh.FormBuilder({
      etiqueta: {
        default: null
      }
    });
    this.join = ["tarefas.alocacoes", "tipoProjeto", "usuario", "regras", "recursos.usuario", "recursos.unidade", "recursos.materialServico", "alocacoes"];
  }
  ngOnInit() {
    super.ngOnInit();
    this.action = "edit";
  }
  isOutras(x) {
    return x.title == this.TITLE_OUTRAS && !x.labels.length;
  }
  incluirLista(docker) {
    this.labels.splice(docker.key + 1, 0, {
      labels: [],
      menu: this.etiquetasButtons,
      cards: [],
      editing: true,
      collapse: false
    });
    this.planejamentoKanban?.refreshDoubleScrollbar();
    this.cdRef.detectChanges();
  }
  loadKanbanDockers(projeto) {
    const dockers = projeto.kanban_dockers || [];
    if (!dockers.find(this.isOutras.bind(this))) dockers.splice(0, 0, {
      title: this.TITLE_OUTRAS,
      labels: [],
      collapse: false
    });
    this.labels = dockers.reduce((a, v) => {
      if (!a.find(x => x.title?.length && x.title == v.title || x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key)) {
        a.push({
          labels: this.isOutras(v) ? [] : v.labels,
          title: v.title,
          menu: this.isOutras(v) ? this.outrasButtons : this.etiquetasButtons,
          cards: [],
          editing: false,
          collapse: v.collapse
        });
      }
      return a;
    }, []);
  }
  loadKanbanCards(projeto) {
    const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
    this.cardsVersion++;
    projeto.tarefas?.filter(row => !row.agrupador).forEach(row => {
      let tarefa = row;
      let docker = undefined;
      tarefa.etiquetas = tarefa.etiquetas || [];
      for (let i = 0; i < tarefa.etiquetas.length; i++) {
        for (let j = 1; j < this.labels.length && !docker; j++) {
          if (this.labels[j].labels[0].key == tarefa.etiquetas[i].key) docker = this.labels[j];
        }
        if (!this.etiquetas.some(x => x.key == tarefa.etiquetas[i].key)) this.etiquetas.push(tarefa.etiquetas[i]);
      }
      this.putCard(docker?.cards || this.labels[outrasIndex]?.cards || [], tarefa);
    });
    for (let cards of this.labels.map(x => x.cards || [])) {
      for (let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++);
    }
  }
  putCard(list, tarefa) {
    const index = list.findIndex(x => x.id == tarefa.id);
    const card = {
      id: tarefa.id,
      title: tarefa.nome || "DESCONHECIDO",
      subTitle: tarefa.descricao || "",
      data: tarefa,
      version: this.cardsVersion,
      menu: undefined,
      dynamicMenu: this.dynamicCardMenu.bind(this)
    };
    if (index >= 0) {
      list[index] = Object.assign(list[index], card);
    } else {
      list.push(card);
    }
  }
  dynamicCardMenu(card) {
    const menu = []; //this.dynamicButtons(card.data);
    menu.push({
      icon: "bi bi-three-dots",
      hint: "Opções",
      dynamicItems: this.cardDynamicOptions.bind(this)
    });
    if (!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join()) card.menu = menu;
    return card.menu;
  }
  cardDynamicOptions(card) {
    /*const olders = card.menu?.find(x => x.hint == "Opções");
    if(olders) {
      const options = this.dynamicOptions.bind(this)(card.data);
      if(!olders.items || olders?.items.map(x => x.label).join() != options.map(x => x.label).join()) olders.items = options;
    }
    return olders?.items;*/
    return [];
  }
  saveEtiquetasProjeto() {
    /* Implementar */
  }
  updateEtiquetasTarefa(dragDrop) {
    const sourceLabel = this.labels.find(x => x.cards == dragDrop.source.list)?.labels[0];
    const destinationLabel = this.labels.find(x => x.cards == dragDrop.destination.list)?.labels[0];
    const tarefa = dragDrop.destination.tarefa;
    if (sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key) return;
    if (sourceLabel) tarefa.etiquetas.splice(tarefa.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
    if (destinationLabel) tarefa.etiquetas.unshift(destinationLabel);
    //this.loading = true;
    //this.dao!.update(demanda.id, {etiquetas: demanda.etiquetas}).then(demanda => this.modalRefreshId(demanda).modalClose!.bind(this)(demanda.id)).finally(() => this.loading = false);
  }

  onSwimlaneDrop(event, fromIndex) {
    const element = this.labels[fromIndex];
    const toIndex = fromIndex < event.index ? event.index - 1 : event.index;
    this.labels.splice(fromIndex, 1);
    this.labels.splice(toIndex, 0, element);
    this.saveEtiquetasProjeto();
  }
  onDragged(item, list, effect) {
    if (["copy", "move"].includes(effect)) {
      const index = list.indexOf(item);
      this.dragDrop.source = {
        list,
        index
      };
      this.updateEtiquetasTarefa(this.dragDrop);
    }
  }
  onDrop(event, list) {
    if (list && ["copy", "move"].includes(event.dropEffect)) {
      const demanda = event.data.data;
      const card = event.data;
      let index = typeof event.index === "undefined" ? list.length : event.index;
      this.dragDrop = {
        destination: {
          list,
          index,
          card,
          demanda
        }
      };
    }
  }
  onDockerCollapse(docker, collapse) {
    this.labels[docker.key].collapse = collapse;
    this.saveEtiquetasProjeto();
    this.planejamentoKanban?.refreshDoubleScrollbar();
  }
  saveEtiquetas(docker) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const key = _this.formEdit.controls.etiqueta.value;
      if (key?.length) {
        const label = _this.labels[docker.key];
        const etiqueta = _this.etiquetasEdit.find(x => x.key == key);
        if (etiqueta) label.labels = [etiqueta];
        //if(this.query) this.onQueryLoad(this.query!.rows);
        _this.loadKanbanCards(_this.entity);
        _this.saveEtiquetasProjeto();
        return true;
      }
      return false;
    })();
  }
  deleteEtiquetas(docker) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.labels.splice(docker.key, 1);
      _this2.planejamentoKanban?.refreshDoubleScrollbar();
      _this2.loadKanbanCards(_this2.entity);
      _this2.saveEtiquetasProjeto();
    })();
  }
  cancelEtiquetas(docker) {
    var _this3 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const label = _this3.labels[docker.key];
      if (!label.labels?.length) {
        _this3.labels.splice(docker.key, 1);
        _this3.planejamentoKanban?.refreshDoubleScrollbar();
      }
    })();
  }
  getLabelStyle(label) {
    const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
    //const txtColor = this.util.contrastColor(bgColor);
    return `border-color: ${bgColor} !important;`;
  }
  editEtiquetas(docker) {
    var _this4 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const label = _this4.labels[docker.key];
      const allUsed = _this4.labels.reduce((a, v, i) => {
        if (v.labels.length && i != docker.key) a.push(v.labels[0].key);
        return a;
      }, []);
      _this4.etiquetasEdit = _this4.etiquetas.filter(x => !allUsed.includes(x.key));
      _this4.formEdit.controls.etiqueta.setValue(label.labels.length ? label.labels[0].key : null);
    })();
  }
  loadEtiquetas() {
    //this.etiquetas = this.util.merge(row.atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
  }
  loadData(entity, form) {
    var _this5 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this5.util.fillForm(formValue, entity));
      _this5.entity = entity;
      _this5.project = _this5.toGantt(entity);
      _this5.afterLoadData = true;
      _this5.calendarOptions.events = _this5.toCalendar(entity.tarefas || []);
      _this5.loadEtiquetas();
      _this5.loadKanbanDockers(entity);
      _this5.loadKanbanCards(entity);
      _this5.cdRef.detectChanges();
    })();
  }
  onCalendarioFilterChange(tarefas) {
    this.calendarOptions.events = this.toCalendar(tarefas);
  }
  getStatusColor(status) {
    return status.color;
  }
  getRecursos(tarefa, metadata) {
    let result = [];
    for (let alocacao of tarefa.alocacoes || []) {
      const regra = this.projetoService.getNomesRegras(alocacao, "\n(", ")");
      const nome = alocacao.recurso?.nome?.length ? alocacao.recurso.nome + "\n" : "";
      switch (alocacao.recurso?.tipo) {
        case 'HUMANO':
          result.push({
            url: alocacao.recurso.usuario?.url_foto || "assets/images/projetos/usuario.png",
            hint: nome + "Usuario: " + (alocacao.recurso.usuario?.nome || "(DESCONHECIDO)") + regra
          });
          break;
        case 'MATERIAL':
          result.push({
            url: "assets/images/projetos/material.png",
            hint: nome + "Material: " + (alocacao.recurso.material_servico?.descricao || "(DESCONHECIDO)") + regra
          });
          break;
        case 'SERVICO':
          result.push({
            url: "assets/images/projetos/servico.png",
            hint: nome + "Servico: " + (alocacao.recurso.material_servico?.descricao || "(DESCONHECIDO)") + regra
          });
          break;
        case 'CUSTO':
          result.push({
            url: "assets/images/projetos/custo.png",
            hint: nome + "Valor: " + this.util.formatDecimal(alocacao.recurso.valor) + regra
          });
          break;
        case 'DEPARTAMENTO':
          result.push({
            url: "assets/images/projetos/unidade.png",
            hint: nome + "Unidade: " + (alocacao.recurso.unidade?.nome || "(DESCONHECIDO)") + regra
          });
          break;
      }
    }
    if (metadata) {
      const igual = JSON.stringify(result) == JSON.stringify(metadata.alocacoes);
      metadata.alocacoes = igual ? metadata.alocacoes : result;
      result = metadata.alocacoes;
    }
    return result;
  }
  getStatus(tarefa, metadata) {
    let result = [];
    result.push(this.lookup.PROJETO_TAREFA_STATUS.find(x => x.key == tarefa.status) || {
      key: "DESCONHECIDO",
      value: "Desconhecido",
      icon: "bi bi-question-octagon",
      color: "danger"
    });
    return result;
  }
  initializeData(form) {
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {})();
  } /* Nunca acontecerá pois sempre vai para a tela de planejamento editando (Já existindo registro no banco). O formulário do projeto é que é responsável por inserir um novo projeto
    const usuario = this.auth.usuario!;
    let projeto = new Projeto();
    let recurso = new ProjetoRecurso({
      id: this.dao?.generateUuid(),
      usuario: usuario,
      usuario_id: usuario.id,
      nome: usuario.nome,
      tipo: "HUMANO",
      _status: "ADD"
    });
    let regra = new ProjetoRegra({
      id: this.dao?.generateUuid(),
      nome: "Criador"
    });
    let envolvido = new ProjetoEnvolvido({
      recurso_id: recurso.id,
      regra: regra
    });
    projeto.recursos = [recurso];
    projeto.regras = [regra];
    projeto.envolvidos = [envolvido];
    projeto.alocacoes = [];
    await this.loadData(projeto, this.form!);*/

  saveData(form) {
    return new Promise((resolve, reject) => {
      const projeto = this.util.fill(new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_8__.Projeto(), this.entity);
      resolve(this.util.fillForm(projeto, this.form.value));
    });
  }
  toCalendar(tarefas) {
    let result = [];
    (tarefas || []).forEach(tarefa => {
      if (!tarefa.agrupador) {
        result.push({
          start: tarefa.inicio,
          end: tarefa.termino,
          title: tarefa.nome
          //color?
        });
      }
    });

    return result;
  }
  toGantt(projeto) {
    let index = 1; /* Indice utilizado globalmente para indexar as tarefas, a tarefa referente ao projeto já inicia com 0 */
    const tarefas = projeto.tarefas || [];
    const toGanttStatus = status => {
      const castStatus = {
        PLANEJADO: "STATUS_ACTIVE",
        INICIADO: "STATUS_ACTIVE",
        CONCLUIDO: "STATUS_DONE",
        FALHO: "STATUS_FAILED",
        SUSPENSO: "STATUS_SUSPENDED",
        CANCELADO: "STATUS_FAILED",
        AGUARDANDO: "STATUS_WAITING"
      };
      return castStatus.hasOwnProperty(status) ? castStatus[status] : "STATUS_ACTIVE";
    };
    const toGanttAssignments = alocacoes => {
      const toAssignmentDescription = alocacao => {
        let result = alocacao.descricao;
        if (!result?.length) {
          const recurso = (projeto.recursos || []).find(x => x.id == alocacao.recurso_id);
          result = recurso?.usuario?.nome || recurso?.unidade?.nome || "";
        }
        return result;
      };
      return (alocacoes || []).map(alocacao => new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttAssignment({
        id: alocacao.id,
        extra: alocacao,
        resource_id: alocacao.recurso_id,
        roles_ids: alocacao.regras?.map(x => x.regra_id) || [],
        description: toAssignmentDescription(alocacao),
        quantity: alocacao.quantidade || 1
      }));
    };
    const toGanttTask = tarefa => {
      return new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttTask({
        id: tarefa.id,
        index: index++,
        name: tarefa.nome,
        description: tarefa.descricao,
        extra: tarefa,
        progress: tarefa.progresso,
        start: tarefa.inicio,
        end: tarefa.termino,
        duration: tarefa.duracao,
        startIsMilestone: tarefa.inicio_marco,
        endIsMilestone: tarefa.termino_marco,
        hasChild: tarefa.tem_filhos,
        tasks: toTreeGanttTasks(tarefas.filter(x => x.tarefa_pai_id == tarefa.id).sort((a, b) => a.indice > b.indice ? 1 : a.indice < b.indice ? -1 : 0)),
        status: toGanttStatus(tarefa.status),
        dependencies_ids: [],
        assignments: toGanttAssignments(tarefa.alocacoes || []),
        collapsed: tarefa.contraido
      });
    };
    const toGanttResource = recurso => {
      const toGanttResourceType = tipo => {
        const castTypes = {
          HUMANO: "HUMAN",
          MATERIAL: "MATERIAL",
          SERVICO: "SERVICE",
          CUSTO: "COST",
          DEPARTAMENTO: "DEPARTMENT"
        };
        return castTypes.hasOwnProperty(tipo) ? castTypes[tipo] : "MATERIAL";
      };
      const toGanttPicture = recurso => {
        return this.projetoService.getRecursoPicture(recurso);
      };
      const toGanttUnity = unidade => {
        const castUnity = {
          UNIDADE: "UNITY",
          CAIXA: "BOX",
          METRO: "METER",
          KILO: "KILO",
          LITRO: "LITER",
          DUZIA: "DOZEN",
          MONETARIO: "CURRENCY",
          HORAS: "HOUR",
          DIAS: "DAY",
          PACOTE: "PACKAGE"
        };
        return castUnity.hasOwnProperty(unidade) ? castUnity[unidade] : "UNITY";
      };
      return new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttResource({
        id: recurso.id,
        name: recurso.nome,
        picture: toGanttPicture(recurso),
        type: toGanttResourceType(recurso.tipo),
        unityCost: recurso.valor,
        unity: toGanttUnity(recurso.unidade_medida),
        extra: recurso
      });
    };
    const toGanttRole = regra => {
      return new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttRole({
        id: regra.id,
        name: regra.nome,
        extra: regra
      });
    };
    const toTreeGanttTasks = children => {
      return children.map(child => toGanttTask(child));
    };
    let gantt = new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttProject({
      root: [new src_app_components_gantt_gantt_models__WEBPACK_IMPORTED_MODULE_2__.GanttTask({
        id: projeto.id,
        index: 0,
        level: 0,
        name: projeto.nome,
        description: projeto.descricao,
        extra: projeto,
        progress: projeto.progresso,
        start: projeto.inicio,
        end: projeto.termino,
        duration: projeto.duracao,
        startIsMilestone: false,
        endIsMilestone: false,
        hasChild: true,
        tasks: toTreeGanttTasks(tarefas.filter(x => !x.tarefa_pai_id).sort((a, b) => a.indice > b.indice ? 1 : a.indice < b.indice ? -1 : 0)),
        status: toGanttStatus(projeto.status),
        dependencies_ids: [],
        assignments: toGanttAssignments(projeto.alocacoes || []),
        collapsed: false
      })],
      resources: (projeto.recursos || []).map(x => toGanttResource(x)),
      roles: (projeto.regras || []).map(x => toGanttRole(x))
    });
    /* Converte de arvore para lista de tasks */
    gantt.tasks = this.fromTaskTree(gantt.root, 0);
    return gantt;
  }
  fromGantt(project, update = true) {
    let root = this.project.tasks[0];
    let origem = root.extra;
    let index = 1;
    const fromGanttRules = roles => {
      let result = update ? origem.regras || [] : [];
      return this.util.mergeArrayOfObject(result, roles, "id", true, src => new src_app_models_projeto_regra_model__WEBPACK_IMPORTED_MODULE_6__.ProjetoRegra({
        id: src.id,
        nome: src.name,
        projeto_id: projeto.id
      }), (dst, src) => dst.nome = src.name);
    };
    const fromGanttResources = resources => {
      const fromGanttResourceType = resourceType => {
        const castTypes = {
          HUMAN: "HUMANO",
          MATERIAL: "MATERIAL",
          SERVICE: "SERVICO",
          COST: "CUSTO",
          DEPARTMENT: "DEPARTAMENTO"
        };
        return castTypes.hasOwnProperty(resourceType) ? castTypes[resourceType] : "MATERIAL";
      };
      const fromGanttUnity = unity => {
        const castUnity = {
          UNITY: "UNIDADE",
          BOX: "CAIXA",
          METER: "METRO",
          KILO: "KILO",
          LITER: "LITRO",
          DOZEN: "DUZIA",
          CURRENCY: "MONETARIO",
          HOUR: "HORAS",
          DAY: "DIAS",
          PACKAGE: "PACOTE"
        };
        return castUnity.hasOwnProperty(unity) ? castUnity[unity] : "UNITY";
      };
      let result = update ? origem.recursos || [] : [];
      return this.util.mergeArrayOfObject(result, resources, "id", true, src => new src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_5__.ProjetoRecurso({
        nome: src.name,
        tipo: fromGanttResourceType(src.type),
        unidade_medida: fromGanttUnity(src.unity),
        valor: src.unityCost,
        projeto_id: projeto.id,
        usuario_id: src.extra.usuario_id,
        unidade_id: src.extra.unidade_id,
        material_servico_id: src.extra.material_servico_id
      }), (dst, src) => Object.assign(dst, {
        nome: src.name,
        tipo: fromGanttResourceType(src.type),
        unidade_medida: fromGanttUnity(src.unity),
        valor: src.unityCost
      }));
    };
    const fromGanttAssignment = (origem, assignments) => {
      if (origem.aloca_proprios_recursos || origem.custos_proprios) {
        return this.util.mergeArrayOfObject(origem.alocacoes, assignments, "id", true, src => {
          const recurso = (projeto.recursos || []).find(x => x.id == src.recurso_id);
          if (src.extra && recurso) {
            const isProjeto = origem.id == projeto.id;
            if (origem.custos_proprios) origem.custo += src.quantity * (recurso.valor || 0);
            return new src_app_models_projeto_alocacao_model__WEBPACK_IMPORTED_MODULE_4__.ProjetoAlocacao({
              id: src.id,
              descricao: src.description,
              quantidade: src.quantity,
              recurso_id: src.resource_id,
              //regra_id: assign.role_id, /* TODO: Trazer de uma lista de regras */
              projeto_id: isProjeto ? origem.id : null,
              tarefa_id: !isProjeto ? origem.id : null
            });
          }
          return undefined;
        }, (dst, src) => {
          const recurso = (projeto.recursos || []).find(x => x.id == src.recurso_id);
          if (src.extra && recurso) {
            if (origem.custos_proprios) origem.custo += src.quantity * (recurso.valor || 0);
            Object.assign(dst, {
              descricao: src.description,
              quantidade: src.quantity,
              recurso_id: src.resource_id
            });
          }
        });
      }
      return [];
    };
    const updateTotals = (origem, totais) => {
      if (origem.soma_progresso_filhos) origem.progresso = totais.progresso;
      if (origem.calcula_intervalo) {
        origem.inicio = totais.inicio || origem.inicio;
        origem.termino = totais.termino || origem.termino;
        origem.duracao = totais.duracao || origem.duracao;
      }
    };
    const fromGanttTasks = (pai, tasks, path) => {
      let result = {
        custo: 0,
        progresso: 0,
        duracao: 0,
        inicio: null,
        termino: null
      };
      /* Adiciona caso não exista, ou atualiza caso já exista (A exclusão de tarefas que não existem mais será feita utilizando tasksIds) */
      this.util.mergeArrayOfObject(projeto.tarefas, tasks, "id", false, (action, dst, src) => {
        let origem = src.extra;
        let tarefa = dst;
        if (action == "ADD") {
          tarefa = new src_app_models_projeto_tarefa_model__WEBPACK_IMPORTED_MODULE_7__.ProjetoTarefa({
            id: src.id,
            indice: index++,
            path: path,
            nome: src.name,
            descricao: src.description,
            documento_id: origem.documento_id,
            documento: origem.documento,
            inicio: src.start,
            termino: src.end,
            duracao: src.duration,
            progresso: src.progress,
            inicio_marco: src.startIsMilestone,
            termino_marco: src.endIsMilestone,
            tem_filhos: src.hasChild,
            agrupador: origem.agrupador,
            soma_progresso_filhos: origem.soma_progresso_filhos,
            status: origem.status,
            contraido: src.collapsed,
            custo: 0,
            calcula_intervalo: src.hasChild && origem.calcula_intervalo,
            aloca_proprios_recursos: !src.hasChild || origem.aloca_proprios_recursos,
            soma_recusos_alocados_filhos: src.hasChild && origem.soma_recusos_alocados_filhos,
            custos_proprios: !src.hasChild || origem.custos_proprios,
            soma_custos_filhos: src.hasChild && origem.soma_custos_filhos
          });
        } else if (action == "EDIT") {
          Object.assign(tarefa, {
            indice: index++,
            path: path,
            nome: src.name,
            descricao: src.description,
            inicio: src.start,
            termino: src.end,
            duracao: src.duration,
            progresso: src.progress,
            inicio_marco: src.startIsMilestone,
            termino_marco: src.endIsMilestone,
            tem_filhos: src.hasChild,
            contraido: src.collapsed,
            custo: 0,
            calcula_intervalo: src.hasChild && origem.calcula_intervalo,
            aloca_proprios_recursos: !src.hasChild || origem.aloca_proprios_recursos,
            soma_recusos_alocados_filhos: src.hasChild && origem.soma_recusos_alocados_filhos,
            custos_proprios: !src.hasChild || origem.custos_proprios,
            soma_custos_filhos: src.hasChild && origem.soma_custos_filhos
          });
        }
        /* Adiciona o ID */
        tasksIds.push(tarefa.id);
        /* custos e alocacoes */
        fromGanttAssignment(tarefa, src.assignments);
        /* Totais dos filhos (calculado recursivamente) e insere os filhos como tarefas (se tiver filhos) */
        if (src.hasChild) {
          let totaisFilhos = fromGanttTasks(tarefa, src.tasks || [], path + "/" + src.id);
          /* Atualiza valores pelo total dos filhos */
          updateTotals(tarefa, totaisFilhos);
        }
        /* Calculos feitos para serem retornados, que são utilizados logo aqui acima */
        if (pai.soma_progresso_filhos) result.progresso += src.progress || 0;
        if (pai.calcula_intervalo) {
          result.inicio = !result.inicio || src.start.getTime() < result.inicio.getTime() ? src.start : result.inicio;
          result.termino = !result.termino || src.end.getTime() > result.termino.getTime() ? src.end : result.termino;
        }
        //if(pai.soma_recusos_alocados_filhos)  /* Não precisa fazer nada, vai ser concatenado somente para exibição no toGantt */
        if (pai.soma_custos_filhos) result.custo += tarefa.custo;
        /* Adiciona a tarefa ao projeto */
        //projeto.tarefas!.push(tarefa); /* Não precisa adicionar, o mergeArrayOfObject já adiciona automaticamente */
        return tarefa;
      });
      /* progresso */
      if (pai.soma_progresso_filhos) result.progresso = result.progresso / (tasks.length || 1);
      return result;
    };
    /* Ids das tarefas, será utilizado ao fim para excluir as tarefas que foram excluídas */
    let tasksIds = [];
    /* Atualiza o objeto existente (origem) ou cria um novo objeto Projeto baseado no origem */
    let projeto = update ? origem : new src_app_models_projeto_model__WEBPACK_IMPORTED_MODULE_8__.Projeto(origem);
    Object.assign(projeto, {
      nome: root.name,
      descricao: root.description,
      inicio: root.start,
      termino: root.end,
      duracao: root.duration,
      progresso: root.progress,
      regras: fromGanttRules(project.roles),
      recursos: fromGanttResources(project.resources),
      alocacoes: [],
      tarefas: []
    });
    /* Refas a arvore root baseado nas tasks, para facilitar os calculos e totalizações */
    project.root = this.toTaskTree(project.tasks);
    /* Carrega as tarefas e alocações recursivamente */
    let totais = fromGanttTasks(projeto, project.root || [], "");
    /* Atualiza valores pelo total dos filhos */
    updateTotals(projeto, totais);
    return projeto;
  }
  fromTaskTree(tasks, level) {
    let result = [];
    tasks.forEach(task => result.push(Object.assign(task, {
      level
    }), ...this.fromTaskTree(task.tasks || [], level + 1)));
    return result;
  }
  toTaskTree(tasks) {
    let levels = [tasks[0]]; /* Adiciona a raiz (que é o projeto) como sendo nível 0 */
    let last = 0;
    for (let task of tasks) {
      task.tasks = []; /* Limpa a lista de tasks */
      if (task.level) {
        /* Ignora o level 0, que o próprio projeto */
        task.level = Math.min(task.level, last + 1); /* Garante que os níveis crescem em uma unidade somente */
        levels[task.level - 1].tasks?.push(task); /* Adiciona a task no pai */
        levels[task.level] = task;
      }
      last = task.level;
    }
    return [levels[0]];
  }
}
_class = ProjetoPlanejamentoComponent;
_class.ɵfac = function ProjetoPlanejamentoComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_20__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-projeto-planejamento"]],
  viewQuery: function ProjetoPlanejamentoComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵloadQuery"]()) && (ctx.planejamentoKanban = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵInheritDefinitionFeature"]],
  decls: 18,
  vars: 9,
  consts: [["ticket", ""], ["editDocker", ""], ["placeholder", ""], [3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "right", ""], ["planejamentoTabs", ""], ["key", "GANTT", "label", "Principal", "icon", "bi bi-bar-chart-steps"], ["key", "CALENDARIO", "label", "Calend\u00E1rio", "icon", "bi bi-calendar-week"], ["key", "BURNDOWN", "label", "Burndown", "icon", "bi bi-graph-down"], ["key", "KANBAN", "label", "Quadro", "icon", "bi bi-card-heading"], [3, "project", "height", 4, "ngIf"], ["class", "row", "style", "min-height: 400px;", 4, "ngIf"], ["class", "row", 4, "ngIf"], [4, "ngIf"], ["class", "d-block", 4, "ngIf"], [1, "d-block"], ["title", "Recursos alocados", "small", ""], [3, "url", "hint", 4, "ngFor", "ngForOf"], [3, "url", "hint"], [1, "card-status-container"], [3, "color", "icon", "label", 4, "ngFor", "ngForOf"], ["title", "Coment\u00E1rios", "small", "", 3, "button"], [3, "color", "icon", "label"], ["controlName", "etiqueta", 3, "size", "control", "items"], [1, "card-body"], [1, "d-flex", "w-100"], [1, "flex-fill"], [1, "card-title", "placeholder-glow"], [1, "placeholder", "col-6"], ["role", "group", "aria-label", "Basic outlined example", 1, "btn-group"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-secondary", "disabled", "placeholder"], [1, "bi", "bi-question"], [1, "card-subtitle", "mb-2", "text-muted", "placeholder-glow"], [1, "placeholder", "col-8"], [1, "card-text", "placeholder-glow"], [1, "placeholder", "col-7"], [1, "placeholder", "col-4"], [3, "project", "height"], [1, "row", 2, "min-height", "400px"], [1, "col-md-6"], [3, "projeto", "change"], [3, "options", 4, "ngIf"], [3, "options"], [1, "row"], [2, "width", "100%", 3, "src"], ["useCardData", "", 3, "dockers", "template", "placeholderTemplate", "loading", "swimlaneDrop", "dockerDragged", "dockerDrop", "dockerEditTemplate", "dockerToggle", "dockerEdit", "dockerSave", "dockerDelete", "dockerCancel", "dockerColorStyle"], ["planejamentoKanban", ""]],
  template: function ProjetoPlanejamentoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](0, ProjetoPlanejamentoComponent_ng_template_0_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](2, ProjetoPlanejamentoComponent_ng_template_2_Template, 1, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](4, ProjetoPlanejamentoComponent_ng_template_4_Template, 16, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](6, "editable-form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵlistener"]("submit", function ProjetoPlanejamentoComponent_Template_editable_form_submit_6_listener() {
        return ctx.onSaveData();
      })("cancel", function ProjetoPlanejamentoComponent_Template_editable_form_cancel_6_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](7, "tabs", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelement"](9, "tab", 6)(10, "tab", 7)(11, "tab", 8)(12, "tab", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementStart"](13, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](14, ProjetoPlanejamentoComponent_gantt_14_Template, 1, 2, "gantt", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](15, ProjetoPlanejamentoComponent_div_15_Template, 5, 3, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](16, ProjetoPlanejamentoComponent_div_16_Template, 5, 3, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵtemplate"](17, ProjetoPlanejamentoComponent_div_17_Template, 3, 14, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵreference"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵclassProp"]("d-none", _r6.active != "GANTT");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", ctx.shown);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _r6.active == "CALENDARIO");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _r6.active == "BURNDOWN");
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵproperty"]("ngIf", _r6.active == "KANBAN");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_23__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_23__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__.SeparatorComponent, _components_kanban_kanban_component__WEBPACK_IMPORTED_MODULE_15__.KanbanComponent, _components_gantt_gantt_component__WEBPACK_IMPORTED_MODULE_16__.GanttComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_17__.BadgeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_18__.ProfilePictureComponent, _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_24__.FullCalendarComponent, _projeto_tarefa_filter_projeto_tarefa_filter_component__WEBPACK_IMPORTED_MODULE_19__.ProjetoTarefaFilterComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 3042:
/*!***************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-recurso-widget/projeto-recurso-widget.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoRecursoWidgetComponent: () => (/* binding */ ProjetoRecursoWidgetComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_material_servico_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/material-servico-dao.service */ 84166);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/projeto-recurso.model */ 31375);
/* harmony import */ var src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/form-helper.service */ 38720);
/* harmony import */ var src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/lookup.service */ 39702);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/input/input-number/input-number.component */ 9224);
var _class;


















const _c0 = ["novoRecurso"];
const _c1 = ["selectRecurso"];
const _c2 = ["usuario"];
const _c3 = ["unidade"];
const _c4 = ["materialServico"];
const _c5 = ["tipoRecurso"];
function ProjetoRecursoWidgetComponent_input_select_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "input-select", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function ProjetoRecursoWidgetComponent_input_select_0_Template_input_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r8.onRecursoChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("control", ctx_r0.form.controls.recurso_id)("items", ctx_r0.recursos);
  }
}
function ProjetoRecursoWidgetComponent_input_search_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-search", 15, 16);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("dao", ctx_r3.usuarioDao);
  }
}
function ProjetoRecursoWidgetComponent_input_search_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-search", 17, 18);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("dao", ctx_r4.unidadeDao);
  }
}
const _c6 = function (a2) {
  return ["tipo", "==", a2];
};
const _c7 = function (a0) {
  return [a0];
};
function ProjetoRecursoWidgetComponent_input_search_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-search", 19, 20);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6)("dao", ctx_r5.materialServicoDao)("where", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](5, _c7, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction1"](3, _c6, _r2 == null ? null : _r2.value)));
  }
}
function ProjetoRecursoWidgetComponent_input_text_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "input-text", 21);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", ctx_r6.projetoService.isMaterialServico(_r2 == null ? null : _r2.value) ? 6 : 12)("control", ctx_r6.form.controls.nome);
  }
}
const _c8 = function () {
  return ["HUMANO"];
};
const _c9 = function () {
  return ["DEPARTAMENTO"];
};
class ProjetoRecursoWidgetComponent {
  constructor(injector) {
    this.injector = injector;
    this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControl();
    this.recursos = [];
    this.validate = (control, controlName) => {
      const tipo = this.form?.controls.tipo.value;
      if (tipo == "HUMANO" && controlName == "usuario_id" && !control.value?.length) return "Obrigatório";
      if (tipo == "DEPARTAMENTO" && controlName == "unidade_id" && !control.value?.length) return "Obrigatório";
      if (controlName == "material_servico_id" && this.materialServico?.selectedItem && this.materialServico?.selectedItem.entity.tipo != tipo) return "Tipo diferente";
      return null;
    };
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_13__.ChangeDetectorRef);
    this.lookup = injector.get(src_app_services_lookup_service__WEBPACK_IMPORTED_MODULE_6__.LookupService);
    this.fh = injector.get(src_app_services_form_helper_service__WEBPACK_IMPORTED_MODULE_5__.FormHelperService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_3__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_2__.UnidadeDaoService);
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_7__.ProjetoService);
    this.materialServicoDao = injector.get(src_app_dao_material_servico_dao_service__WEBPACK_IMPORTED_MODULE_1__.MaterialServicoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {
        default: ""
      },
      tipo: {
        default: "MATERIAL"
      },
      unidade_medida: {
        default: "UNIDADE"
      },
      material_servico_id: {
        default: null
      },
      usuario_id: {
        default: null
      },
      unidade_id: {
        default: null
      },
      valor: {
        default: 0
      }
    }, this.cdRef, this.validate);
  }
  onRecursoChange() {
    const tipo = this.novoRecurso?.collapsed ? this.selectRecurso?.selectedItem?.data?.tipo : this.form.controls.tipo.value;
    if (this.change) this.change(tipo);
    this.cdRef.detectChanges();
  }
  get collapsed() {
    return !!this.novoRecurso?.collapsed;
  }
  get recurso() {
    let result = this.novoRecurso?.collapse ? this.selectRecurso?.selectedItem?.data : undefined;
    this.form.markAllAsTouched();
    if (!this.novoRecurso?.collapse && this.form.valid) {
      result = new src_app_models_projeto_recurso_model__WEBPACK_IMPORTED_MODULE_4__.ProjetoRecurso({
        id: "NEW",
        nome: this.form.controls.nome.value,
        tipo: this.form.controls.tipo.value,
        unidade_medida: this.form.controls.unidade_medida.value,
        material_servico_id: ["MATERIAL", "SERVICO"].includes(this.form.controls.tipo.value) ? this.form.controls.material_servico_id.value : null,
        usuario_id: this.form.controls.tipo.value == "HUMANO" ? this.form.controls.usuario_id.value : null,
        unidade_id: this.form.controls.tipo.value == "DEPARTAMENTO" ? this.form.controls.unidade_id.value : null,
        valor: this.form.controls.valor.value,
        usuario: this.usuario?.selectedItem?.entity,
        unidade: this.unidade?.selectedItem?.entity,
        material_servico: this.materialServico?.selectedItem?.entity
      });
    }
    return result;
  }
  ngOnInit() {}
}
_class = ProjetoRecursoWidgetComponent;
_class.ɵfac = function ProjetoRecursoWidgetComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-recurso-widget"]],
  viewQuery: function ProjetoRecursoWidgetComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c2, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c3, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](_c5, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.novoRecurso = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.selectRecurso = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.usuario = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.unidade = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.materialServico = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.tipoRecurso = _t.first);
    }
  },
  inputs: {
    control: "control",
    recursos: "recursos",
    change: "change"
  },
  decls: 14,
  vars: 18,
  consts: [["itemTodos", "- Selecione -", "valueTodos", "", "controlName", "recurso_id", 3, "size", "control", "items", "change", 4, "ngIf"], ["collapse", "", "transparent", "", 3, "title"], ["novoRecurso", ""], ["noMargin", "", "noButtons", "", 3, "form"], [1, "row", "m-0", "p-0"], ["controlName", "tipo", "hostClass", "p-1", 3, "size", "control", "items", "change"], ["tipoRecurso", ""], ["controlName", "unidade_medida", "hostClass", "p-1", 3, "size", "control", "items"], ["controlName", "valor", "prefix", "R$", "hostClass", "p-1", 3, "size", "decimals", "control"], ["hostClass", "p-1", "controlName", "usuario_id", 3, "size", "dao", 4, "ngIf"], ["hostClass", "p-1", "controlName", "unidade_id", 3, "size", "dao", 4, "ngIf"], ["hostClass", "p-1", "controlName", "material_servico_id", 3, "size", "dao", "where", 4, "ngIf"], ["hostClass", "p-1", "prefix", "Descri\u00E7\u00E3o", "controlName", "nome", 3, "size", "control", 4, "ngIf"], ["itemTodos", "- Selecione -", "valueTodos", "", "controlName", "recurso_id", 3, "size", "control", "items", "change"], ["selectRecurso", ""], ["hostClass", "p-1", "controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], ["hostClass", "p-1", "controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["hostClass", "p-1", "controlName", "material_servico_id", 3, "size", "dao", "where"], ["materialServico", ""], ["hostClass", "p-1", "prefix", "Descri\u00E7\u00E3o", "controlName", "nome", 3, "size", "control"]],
  template: function ProjetoRecursoWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, ProjetoRecursoWidgetComponent_input_select_0_Template, 2, 3, "input-select", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "separator", 1, 2)(3, "editable-form", 3)(4, "div", 4)(5, "input-select", 5, 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function ProjetoRecursoWidgetComponent_Template_input_select_change_5_listener() {
        return ctx.onRecursoChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "input-select", 7)(8, "input-number", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, ProjetoRecursoWidgetComponent_input_search_10_Template, 2, 2, "input-search", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, ProjetoRecursoWidgetComponent_input_search_11_Template, 2, 2, "input-search", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, ProjetoRecursoWidgetComponent_input_search_12_Template, 2, 7, "input-search", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](13, ProjetoRecursoWidgetComponent_input_text_13_Template, 1, 2, "input-text", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](2);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", _r1.collapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("title", _r1.collapsed ? "Clique aqui para adicionar novo recurso" : "Clique aqui para selecionar recurso existente");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.tipo)("items", ctx.lookup.PROJETO_TIPO_RECURSOS);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.unidade_medida)("items", ctx.lookup.MATERIAL_SERVICO_UNIDADE);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4)("decimals", 2)("control", ctx.form.controls.valor);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.projetoService.isHumanoDepartamento(_r2 == null ? null : _r2.value, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](16, _c8)));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.projetoService.isHumanoDepartamento(_r2 == null ? null : _r2.value, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](17, _c9)));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.projetoService.isMaterialServico(_r2 == null ? null : _r2.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.projetoService.isHumanoDepartamento(_r2 == null ? null : _r2.value));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_8__.InputSearchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_9__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_10__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_11__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_12__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 44793:
/*!******************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-routing.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoRoutingModule: () => (/* binding */ ProjetoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/guards/auth.guard */ 1391);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projeto-form-recursos/projeto-form-recursos.component */ 65646);
/* harmony import */ var _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projeto-form/projeto-form.component */ 92730);
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ 92821);
/* harmony import */ var _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-planejamento/projeto-planejamento.component */ 47247);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;









const routes = [{
  path: '',
  component: _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_4__.ProjetoListComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Projeto"
  }
}, {
  path: 'new',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consultar",
    modal: true
  }
}, {
  path: ':id/planejamento',
  component: _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_5__.ProjetoPlanejamentoComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Planejamento",
    modal: true
  }
}, {
  path: ':id/comentar',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Comentar",
    modal: true
  }
}, {
  path: ':id/clonar',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Clonar",
    modal: true
  }
}, {
  path: ':id/recurso',
  component: _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_2__.ProjetoFormRecursosComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Recurso",
    modal: true
  }
}, {
  path: ':id/regra',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Regra",
    modal: true
  }
}, {
  path: ':id/alocacao',
  component: _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent,
  canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_1__.ConfigResolver
  },
  data: {
    title: "Alocação",
    modal: true
  }
}];
class ProjetoRoutingModule {}
_class = ProjetoRoutingModule;
_class.ɵfac = function ProjetoRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ProjetoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ }),

/***/ 16292:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-tarefa-filter/projeto-tarefa-filter.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoTarefaFilterComponent: () => (/* binding */ ProjetoTarefaFilterComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ 81214);
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ 35255);
/* harmony import */ var src_app_models_projeto_tarefa_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/projeto-tarefa.model */ 48958);
/* harmony import */ var src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-base */ 17112);
/* harmony import */ var _projeto_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../projeto.service */ 49160);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/profile-picture/profile-picture.component */ 2729);
var _class;















function ProjetoTarefaFilterComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("margin-left", 10 * ctx_r3.getLevel(row_r6), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r6.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](row_r6.descricao);
  }
}
function ProjetoTarefaFilterComponent_ng_template_15_profile_picture_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "profile-picture", 14);
  }
  if (rf & 2) {
    const alocacao_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("url", ctx_r8.projetoService.getRecursoPicture(alocacao_r9.recurso))("hint", alocacao_r9.descricao);
  }
}
function ProjetoTarefaFilterComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, ProjetoTarefaFilterComponent_ng_template_15_profile_picture_0_Template, 1, 2, "profile-picture", 13);
  }
  if (rf & 2) {
    const row_r7 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", row_r7.alocacoes);
  }
}
class ProjetoTarefaFilterComponent extends src_app_modules_base_page_base__WEBPACK_IMPORTED_MODULE_4__.PageBase {
  set projeto(value) {
    if (this._projeto != value) {
      this._projeto = value;
      this.loadTarefas();
    }
  }
  get projeto() {
    return this._projeto;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.formDisabled = false;
    this.tarefas = [];
    this.buttons = [{
      icon: "bi bi-check-all",
      color: "btn btn-outline-success",
      label: "Selecionar",
      onClick: (...args) => {
        this.grid?.setMultiselectSelectedItems(this.tarefas.filter(tarefa => this.form.controls.usuario_id?.value?.length && tarefa.alocacoes?.find(x => x.recurso?.usuario_id == this.form.controls.usuario_id?.value) || this.form.controls.unidade_id?.value?.length && tarefa.alocacoes?.find(x => x.recurso?.unidade_id == this.form.controls.unidade_id?.value)
        //(this.util.isDataValid(this.form.controls.inicio?.value) && tarefa.inicio.getTime() )
        ));
      }
    }, {
      label: "Todos",
      icon: "bi bi-grid-fill",
      hint: "Selecionar",
      color: "btn-outline-danger",
      onClick: (...args) => this.grid?.onSelectAllClick()
    }, {
      label: "Nenhum",
      icon: "bi bi-grid",
      hint: "Selecionar",
      color: "btn-outline-danger",
      onClick: (...args) => this.grid?.onUnselectAllClick()
    }];
    this.projetoService = injector.get(_projeto_service__WEBPACK_IMPORTED_MODULE_5__.ProjetoService);
    this.usuarioDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_2__.UsuarioDaoService);
    this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_1__.UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      usuario_id: {
        default: null
      },
      unidade_id: {
        default: null
      },
      inicio: {
        default: null
      },
      fim: {
        default: null
      }
    });
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.grid?.enableMultiselect(true);
  }
  getLevel(tarefa) {
    return (tarefa.path || "").split("/").length;
  }
  loadTarefas() {
    this.grid?.onUnselectAllClick();
    this.tarefas = [new src_app_models_projeto_tarefa_model__WEBPACK_IMPORTED_MODULE_3__.ProjetoTarefa({
      id: this._projeto?.id,
      index: 0,
      nome: this._projeto?.nome || "PROJETO",
      descricao: this.projeto?.descricao || "",
      inicio: this._projeto?.inicio || new Date(),
      termino: this._projeto?.termino || new Date()
    })];
    this.tarefas.push(...(this._projeto?.tarefas?.sort((a, b) => a.indice < b.indice ? -1 : 1) || []));
    this.cdRef.detectChanges();
    this.grid?.onSelectAllClick();
  }
  onMultiselectChange(multiselected) {
    if (this.change) this.change(Object.values(multiselected));
  }
}
_class = ProjetoTarefaFilterComponent;
_class.ɵfac = function ProjetoTarefaFilterComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-tarefa-filter"]],
  viewQuery: function ProjetoTarefaFilterComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  inputs: {
    formDisabled: "formDisabled",
    change: "change",
    projeto: "projeto"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
  decls: 17,
  vars: 13,
  consts: [[3, "form", "buttons", "disabled"], [1, "row"], ["controlName", "usuario_id", 3, "size", "dao"], ["usuario", ""], ["controlName", "unidade_id", 3, "size", "dao"], ["unidade", ""], ["date", "", "label", "In\u00EDcio", "controlName", "inicio", "labelInfo", "Data de in\u00EDcio da tarefa", 3, "size"], ["date", "", "label", "Fim", "controlName", "fim", "labelInfo", "Data fim da tarefa", 3, "size"], ["multiselect", "", 3, "items", "multiselectChange"], ["title", "Tarefa", 3, "template"], ["columnTarefa", ""], ["title", "Recursos", 3, "template"], ["columnRecursos", ""], [3, "url", "hint", 4, "ngFor", "ngForOf"], [3, "url", "hint"]],
  template: function ProjetoTarefaFilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "editable-form", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "input-search", 2, 3)(4, "input-search", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "input-datetime", 6)(8, "input-datetime", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "grid", 8)(10, "columns")(11, "column", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, ProjetoTarefaFilterComponent_ng_template_12_Template, 6, 4, "ng-template", null, 10, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "column", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, ProjetoTarefaFilterComponent_ng_template_15_Template, 1, 1, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](13);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("form", ctx.form)("buttons", ctx.buttons)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("dao", ctx.usuarioDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6)("dao", ctx.unidadeDao);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("items", ctx.tarefas)("multiselectChange", ctx.onMultiselectChange.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("template", _r4);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_6__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_7__.ColumnComponent, _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_8__.EditableFormComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_9__.InputSearchComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_10__.InputDatetimeComponent, _components_profile_picture_profile_picture_component__WEBPACK_IMPORTED_MODULE_11__.ProfilePictureComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 20382:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-tarefa-form-principal/projeto-tarefa-form-principal.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoTarefaFormPrincipalComponent: () => (/* binding */ ProjetoTarefaFormPrincipalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var src_app_dao_projeto_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/projeto-tarefa-dao.service */ 78325);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/atividade-dao.service */ 84971);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/input/input-search/input-search.component */ 32802);
/* harmony import */ var _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/input/input-button/input-button.component */ 48935);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/input/input-datetime/input-datetime.component */ 84495);
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/input/input-radio/input-radio.component */ 48877);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/separator/separator.component */ 25560);
var _class;
















function ProjetoTarefaFormPrincipalComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](0, " Mostrar dados quando selecionar ");
  }
}
class ProjetoTarefaFormPrincipalComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__.PageFrameBase {
  set control(value) {
    super.control = value;
  }
  get control() {
    return super.control;
  }
  set entity(value) {
    super.entity = value;
  }
  get entity() {
    return super.entity;
  }
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.tipos = [{
      key: "TAREFA",
      value: "Tarefa"
    }, {
      key: "ATIVIDADE",
      value: "Atividade"
    }, {
      key: "DOCUMENTO",
      value: "Doc. SUPER/SEI"
    }, {
      key: "PROJETO",
      value: "Projeto"
    }];
    this.validate = (control, controlName) => {
      let result = null;
      if (controlName == "nome" && !control.value?.length || controlName == "fator_complexidade" && !(control.value > 0) || controlName == "data_entrega" && !this.util.isDataValid(control.value)) {
        result = "Obrigatório";
      }
      return result;
    };
    this.dao = injector.get(src_app_dao_projeto_tarefa_dao_service__WEBPACK_IMPORTED_MODULE_1__.ProjetoTarefaDaoService);
    this.atividadeDao = injector.get(src_app_dao_atividade_dao_service__WEBPACK_IMPORTED_MODULE_3__.AtividadeDaoService);
    this.cdRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_13__.ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      tipo: {
        default: "TAREFA"
      },
      indice: {
        default: ""
      },
      nome: {
        default: ""
      },
      status_tarefa: {
        default: "PLANEJADO"
      },
      descricao: {
        default: ""
      },
      numero_processo: {
        default: ""
      },
      numero_documento: {
        default: ""
      },
      marco_inicio: {
        default: ""
      },
      inicio_tarefa: {
        default: new Date()
      },
      marco_termino: {
        default: ""
      },
      termino_tarefa: {
        default: new Date()
      },
      duracao: {
        default: ""
      },
      progresso: {
        default: 0
      },
      custo_tarefa: {
        default: 0.00
      },
      possui_custos_proprios: {
        default: true
      },
      soma_recursos_alocados_filhos: {
        default: true
      },
      soma_progresso_filhos: {
        default: true
      },
      tem_filhos: {
        default: true
      },
      agrupador: {
        default: false
      },
      contraido: {
        default: false
      },
      aloca_recursos_proprios: {
        default: true
      },
      calcula_intervalo: {
        default: true
      }
    }, this.cdRef, this.validate);
    this.join = ["alocacoes", "atividade"];
  }
  get unitDuracao() {
    return this.form?.controls.usa_horas.value ? "hour" : "day";
  }
}
_class = ProjetoTarefaFormPrincipalComponent;
_class.ɵfac = function ProjetoTarefaFormPrincipalComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-tarefa-form-principal"]],
  viewQuery: function ProjetoTarefaFormPrincipalComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  inputs: {
    control: "control",
    entity: "entity",
    cdRef: "cdRef",
    projeto: "projeto"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
  decls: 43,
  vars: 47,
  consts: [[3, "form", "noButtons", "disabled", "submit", "cancel"], [1, "row"], ["label", "Pai", "controlName", "tem_filhos", "labelInfo", "Se possui filhos, se \u00E9 uma tarefa sint\u00E9tica (resumo)", 3, "size"], ["controlName", "tipo", 3, "size", "label", "control", "items"], ["icon", "bi bi-arrow-up-right-circle", "controlName", "status_tarefa", 3, "size", "label", "items"], ["label", "Nome", "controlName", "nome", "labelInfo", "Nome da tarefa", 3, "size"], ["displayOnlySelected", "", "controlName", "atividade_id", 3, "size", "dao", "displayTemplate"], ["atividade", ""], ["displayAtividade", ""], ["controlName", "numero_processo", "labelInfo", "N\u00FAmero do processo, com a formata\u00E7\u00E3o de origem", 3, "label", "size", "control", "disabled"], ["procRequisicao", ""], ["controlName", "numero_documento", "labelInfo", "Numero do documento de requisi\u00E7\u00E3o, caso seja o Sei \u00E9 o numero Sei", 3, "label", "size", "control", "disabled"], ["docRequisicao", ""], ["label", "Descri\u00E7\u00E3o", "controlName", "descricao", 3, "size", "rows"], ["title", "Cronograma e progresso"], ["label", "Marco", "controlName", "marco_inicio", "labelInfo", "Marco in\u00EDcio", 3, "size"], ["label", "In\u00EDcio", "icon", "bi bi-calendar-date", "controlName", "inicio", 3, "date", "size"], ["label", "Marco", "controlName", "marco_termino", "labelInfo", "Marco t\u00E9rmino", 3, "size"], ["label", "T\u00E9rmino", "icon", "bi bi-calendar-date", "controlName", "termino", 3, "date", "size"], ["date", "", "label", "In\u00EDcio realizado", "icon", "bi bi-calendar-date", "controlName", "inicio_realizado", 3, "size"], ["date", "", "label", "T\u00E9rmino realizado", "icon", "bi bi-calendar-date", "controlName", "termino_relizado", 3, "size"], ["number", "", "prefix", "R$", "icon", "bi bi-clock", "controlName", "custo", "labelInfo", "Custo associado \u00E0 tarefa", 3, "label", "size"], ["number", "", "label", "Progresso", "sufix", "%", "icon", "bi bi-clock", "controlName", "progresso", "labelInfo", "Progresso do projeto (% Conclu\u00EDdo)", 3, "size"], ["title", "Configura\u00E7\u00F5es"], ["label", "Possui custos pr\u00F3prios", "scale", "small", "labelPosition", "right", "controlName", "ten_filhos", "labelInfo", "Define se a tarefa tem custos pr[oprios associados", 3, "size"], ["label", "Aloca recursos no projeto", "scale", "small", "labelPosition", "right", "controlName", "aloca_recursos_proprios", "labelInfo", "Aloca recursos pr\u00F3prios da tarefa", 3, "size"], ["scale", "small", "labelPosition", "right", "controlName", "possui_custos_proprios", "labelInfo", "Define se a tarefa tem custos pr[oprios associados", 3, "label", "size"], ["scale", "small", "labelPosition", "right", "controlName", "calcula_intervalo", "labelInfo", "Calculo intervalo de execu\u00E7\u00E3o da tarefa", 3, "label", "size"], ["label", "Contra\u00EDda", "scale", "small", "labelPosition", "right", "controlName", "contraido", "labelInfo", "Define se a tarefa tem custos pr[oprios associados", 3, "size"], ["label", "Agrupadora", "scale", "small", "labelPosition", "right", "controlName", "agrupador", "labelInfo", "A tarefa tem fun\u00E7\u00E3o agrupadora", 3, "size"], ["label", "Soma progresso das filhas", "scale", "small", "labelPosition", "right", "controlName", "soma_progresso_filhos", "labelInfo", "Calcula o progresso das tarefas filhas", 3, "size"], ["scale", "small", "labelPosition", "right", "controlName", "soma_recursos_alocados_filhos", "labelInfo", "Soma recursos das tarefas filhas", 3, "label", "size"]],
  template: function ProjetoTarefaFormPrincipalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function ProjetoTarefaFormPrincipalComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function ProjetoTarefaFormPrincipalComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "input-switch", 2)(3, "input-radio", 3)(4, "input-select", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](6, "input-text", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "div", 1)(8, "input-search", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, ProjetoTarefaFormPrincipalComponent_ng_template_10_Template, 1, 0, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](13, "input-button", 9, 10)(15, "input-button", 11, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](18, "input-textarea", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](19, "separator", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](21, "input-switch", 15)(22, "input-datetime", 16)(23, "input-switch", 17)(24, "input-datetime", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](25, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](26, "input-datetime", 19)(27, "input-datetime", 20)(28, "input-text", 21)(29, "input-text", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](30, "separator", 23)(31, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](32, "input-switch", 24)(33, "input-switch", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](34, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](35, "input-switch", 26)(36, "input-switch", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](37, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](38, "input-switch", 28)(39, "input-switch", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](40, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](41, "input-switch", 30)(42, "input-switch", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("form", ctx.form)("noButtons", !ctx.entity_id ? "true" : undefined)("disabled", ctx.formDisabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 8)("label", "Tipo da " + ctx.lex.translate("tarefa"))("control", ctx.form.controls.tipo)("items", ctx.tipos);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 3)("label", "Status da " + ctx.lex.translate("tarefa"))("items", ctx.lookup.PROJETO_TAREFA_STATUS);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("dao", ctx.atividadeDao)("displayTemplate", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", ctx.lex.translate("Processo"))("size", 3)("control", ctx.form.controls.numero_processo)("disabled", !ctx.gb.isEmbedded || (ctx.form.controls.numero_requisicao.value == null ? null : ctx.form.controls.numero_requisicao.value.length) ? "true" : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", ctx.lex.translate("Documento"))("size", 1)("control", ctx.form.controls.numero_requisicao)("disabled", !ctx.gb.isEmbedded ? "true" : undefined);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 12)("rows", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("date", (ctx.projeto == null ? null : ctx.projeto.usa_horas) ? undefined : "true")("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("date", (ctx.projeto == null ? null : ctx.projeto.usa_horas) ? undefined : "true")("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", "Custo da " + ctx.lex.translate("tarefa"))("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", "Possui " + ctx.lex.translate("tarefa") + " filhas")("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", "Calcula intervalo da " + ctx.lex.translate("tarefa"))("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("label", "Soma recursos" + ctx.lex.translate("tarefa") + " filhas")("size", 6);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_2__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_4__.InputSwitchComponent, _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_5__.InputSearchComponent, _components_input_input_button_input_button_component__WEBPACK_IMPORTED_MODULE_6__.InputButtonComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_7__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_8__.InputTextareaComponent, _components_input_input_datetime_input_datetime_component__WEBPACK_IMPORTED_MODULE_9__.InputDatetimeComponent, _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_10__.InputRadioComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_12__.SeparatorComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 16440:
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto-tarefa-form/projeto-tarefa-form.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoTarefaFormComponent: () => (/* binding */ ProjetoTarefaFormComponent)
/* harmony export */ });
/* harmony import */ var src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/base/page-frame-base */ 76298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../uteis/comentarios/comentarios.component */ 54240);
/* harmony import */ var _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../projeto-form-alocacoes/projeto-form-alocacoes.component */ 60155);
/* harmony import */ var _projeto_tarefa_form_principal_projeto_tarefa_form_principal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../projeto-tarefa-form-principal/projeto-tarefa-form-principal.component */ 20382);
var _class;








class ProjetoTarefaFormComponent extends src_app_modules_base_page_frame_base__WEBPACK_IMPORTED_MODULE_0__.PageFrameBase {
  constructor(injector) {
    super(injector);
    this.injector = injector;
    this.validate = (control, controlName) => {
      let result = null;
      return result;
    };
    this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
  }
}
_class = ProjetoTarefaFormComponent;
_class.ɵfac = function ProjetoTarefaFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["projeto-tarefa-form"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 8,
  vars: 4,
  consts: [[3, "form", "disabled", "title"], ["display", "", "right", ""], ["key", "PRINCIPAL", "label", "Principal"], [3, "projeto"], ["key", "ALOCACOES", "label", "Aloca\u00E7\u00F5es"], ["key", "COMENTARIOS", "label", "Coment\u00E1rios"]],
  template: function ProjetoTarefaFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "editable-form", 0)(1, "tabs", 1)(2, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "projeto-tarefa-form-principal", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "tab", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "projeto-form-alocacoes");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "tab", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "comentarios");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("projeto", ctx.projeto);
    }
  },
  dependencies: [_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__.TabComponent, _uteis_comentarios_comentarios_component__WEBPACK_IMPORTED_MODULE_4__.ComentariosComponent, _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_5__.ProjetoFormAlocacoesComponent, _projeto_tarefa_form_principal_projeto_tarefa_form_principal_component__WEBPACK_IMPORTED_MODULE_6__.ProjetoTarefaFormPrincipalComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 66381:
/*!**********************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoModule: () => (/* binding */ ProjetoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _projeto_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projeto-routing.module */ 44793);
/* harmony import */ var _projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projeto-list/projeto-list.component */ 92821);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projeto-form/projeto-form.component */ 92730);
/* harmony import */ var _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projeto-planejamento/projeto-planejamento.component */ 47247);
/* harmony import */ var _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projeto-form-principal/projeto-form-principal.component */ 52591);
/* harmony import */ var _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./projeto-form-recursos/projeto-form-recursos.component */ 65646);
/* harmony import */ var _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projeto-form-alocacoes/projeto-form-alocacoes.component */ 60155);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../uteis/uteis.module */ 82509);
/* harmony import */ var _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @fullcalendar/angular */ 91695);
/* harmony import */ var _projeto_tarefa_form_projeto_tarefa_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projeto-tarefa-form/projeto-tarefa-form.component */ 16440);
/* harmony import */ var _projeto_tarefa_form_principal_projeto_tarefa_form_principal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./projeto-tarefa-form-principal/projeto-tarefa-form-principal.component */ 20382);
/* harmony import */ var _projeto_form_regras_projeto_form_regras_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./projeto-form-regras/projeto-form-regras.component */ 40894);
/* harmony import */ var _projeto_tarefa_filter_projeto_tarefa_filter_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./projeto-tarefa-filter/projeto-tarefa-filter.component */ 16292);
/* harmony import */ var _projeto_form_fases_projeto_form_fases_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./projeto-form-fases/projeto-form-fases.component */ 23739);
/* harmony import */ var _projeto_recurso_widget_projeto_recurso_widget_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projeto-recurso-widget/projeto-recurso-widget.component */ 3042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


















class ProjetoModule {}
_class = ProjetoModule;
_class.ɵfac = function ProjetoModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_8__.UteisModule, _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_17__.FullCalendarModule, _projeto_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProjetoRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](ProjetoModule, {
    declarations: [_projeto_list_projeto_list_component__WEBPACK_IMPORTED_MODULE_1__.ProjetoListComponent, _projeto_form_projeto_form_component__WEBPACK_IMPORTED_MODULE_3__.ProjetoFormComponent, _projeto_planejamento_projeto_planejamento_component__WEBPACK_IMPORTED_MODULE_4__.ProjetoPlanejamentoComponent, _projeto_form_principal_projeto_form_principal_component__WEBPACK_IMPORTED_MODULE_5__.ProjetoFormPrincipalComponent, _projeto_form_recursos_projeto_form_recursos_component__WEBPACK_IMPORTED_MODULE_6__.ProjetoFormRecursosComponent, _projeto_form_alocacoes_projeto_form_alocacoes_component__WEBPACK_IMPORTED_MODULE_7__.ProjetoFormAlocacoesComponent, _projeto_tarefa_form_projeto_tarefa_form_component__WEBPACK_IMPORTED_MODULE_9__.ProjetoTarefaFormComponent, _projeto_tarefa_form_principal_projeto_tarefa_form_principal_component__WEBPACK_IMPORTED_MODULE_10__.ProjetoTarefaFormPrincipalComponent, _projeto_form_regras_projeto_form_regras_component__WEBPACK_IMPORTED_MODULE_11__.ProjetoFormRegrasComponent, _projeto_tarefa_filter_projeto_tarefa_filter_component__WEBPACK_IMPORTED_MODULE_12__.ProjetoTarefaFilterComponent, _projeto_form_fases_projeto_form_fases_component__WEBPACK_IMPORTED_MODULE_13__.ProjetoFormFasesComponent, _projeto_recurso_widget_projeto_recurso_widget_component__WEBPACK_IMPORTED_MODULE_14__.ProjetoRecursoWidgetComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.CommonModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_2__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_8__.UteisModule, _fullcalendar_angular__WEBPACK_IMPORTED_MODULE_17__.FullCalendarModule, _projeto_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProjetoRoutingModule]
  });
})();

/***/ }),

/***/ 49160:
/*!***********************************************************!*\
  !*** ./src/app/modules/gestao/projeto/projeto.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjetoService: () => (/* binding */ ProjetoService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/auth.service */ 32333);
var _class;


class ProjetoService {
  constructor(auth) {
    this.auth = auth;
  }
  getRecursoPicture(recurso) {
    return !recurso ? "assets/images/projetos/material.png" : recurso.tipo == "HUMANO" ? recurso.usuario?.url_foto || "assets/images/projetos/usuario.png" : recurso.tipo == "CUSTO" ? "assets/images/projetos/custo.png" : recurso.tipo == "DEPARTAMENTO" ? "assets/images/projetos/unidade.png" : recurso.tipo == "SERVICO" ? "assets/images/projetos/servico.png" : "assets/images/projetos/material.png";
  }
  getNomesRegras(alocacao, prefix, sufix) {
    let result = alocacao.regras?.map(x => x.regra?.nome).filter(x => x).join(", ") || "";
    return result.length ? (prefix || "") + result + (sufix || "") : result;
  }
  isHumanoDepartamento(tipo, tipos = ['HUMANO', 'DEPARTAMENTO']) {
    return tipos.includes(tipo || '');
  }
  isMaterialServico(tipo, tipos = ['MATERIAL', 'SERVICO']) {
    return tipos.includes(tipo || '');
  }
  /* Os envolvidos são considerados os recursos humano e departamental que possuem acesso ao projeto */
  isEnvolvido(alocacao, projeto) {
    return !!alocacao.regras?.find(x => (x.regra || projeto.regras?.find(y => y.id == x.regra_id))?.perfis?.includes("ACESSAR"));
  }
  canAcessar(projeto) {
    return !!(projeto.alocacoes || []).find(x => this.isEnvolvido(x, projeto) && (x.recurso.tipo == "HUMANO" && x.recurso.usuario_id == this.auth.usuario?.id || x.recurso.tipo == "DEPARTAMENTO" && this.auth.hasLotacao(x.recurso.unidade_id)));
  }
  /* Todas as validações realizadas aqui DEVEM ser realizadas tambem no back-end em ProjetoService->recalcular */
  recalcular(projeto) {
    let minData = null;
    let maxData = null;
    for (let tarefa of projeto.tarefas || []) {
      minData = !minData && tarefa.inicio || tarefa.inicio && minData && tarefa.inicio.getTime() < minData.getTime() ? tarefa.inicio : minData;
      maxData = !maxData && tarefa.inicio || tarefa.termino && maxData && tarefa.termino?.getTime() > maxData.getTime() ? tarefa.termino : maxData;
    }
    if (projeto.calcula_intervalo) {
      projeto.inicio = minData || maxData || new Date();
      projeto.termino = maxData || projeto.inicio;
    }
  }
}
_class = ProjetoService;
_class.ɵfac = function ProjetoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 91695:
/*!******************************************************************************!*\
  !*** ./node_modules/@fullcalendar/angular/fesm2020/fullcalendar-angular.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FullCalendarComponent: () => (/* binding */ FullCalendarComponent),
/* harmony export */   FullCalendarModule: () => (/* binding */ FullCalendarModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/core */ 27946);
/* harmony import */ var _fullcalendar_core_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/core/internal */ 20483);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 89650);






const _c0 = ["*"];
const _c1 = ["rootEl"];
const _c2 = function (a0) {
  return {
    $implicit: a0
  };
};
function TransportContainerComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r0.elClasses || "")("ngStyle", ctx_r0.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r0.renderProps));
  }
}
function TransportContainerComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.elClasses || "")("ngStyle", ctx_r1.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r1.renderProps));
  }
}
function TransportContainerComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r2.elClasses || "")("ngStyle", ctx_r2.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r2.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r2.renderProps));
  }
}
function TransportContainerComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r3.elClasses || "")("ngStyle", ctx_r3.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r3.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r3.renderProps));
  }
}
function TransportContainerComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r4.elClasses || "")("ngStyle", ctx_r4.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r4.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r4.renderProps));
  }
}
function TransportContainerComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r5.elClasses || "")("ngStyle", ctx_r5.elStyle || null);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r5.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c2, ctx_r5.renderProps));
  }
}
const _c3 = ["dayHeaderContent"];
const _c4 = ["dayCellContent"];
const _c5 = ["weekNumberContent"];
const _c6 = ["nowIndicatorContent"];
const _c7 = ["eventContent"];
const _c8 = ["slotLaneContent"];
const _c9 = ["slotLabelContent"];
const _c10 = ["allDayContent"];
const _c11 = ["moreLinkContent"];
const _c12 = ["noEventsContent"];
const _c13 = ["resourceAreaHeaderContent"];
const _c14 = ["resourceGroupLabelContent"];
const _c15 = ["resourceLabelContent"];
const _c16 = ["resourceLaneContent"];
const _c17 = ["resourceGroupLaneContent"];
function FullCalendarComponent_transport_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "transport-container", 1);
  }
  if (rf & 2) {
    const customRendering_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("inPlaceOf", customRendering_r1.containerEl)("reportEl", customRendering_r1.reportNewContainerEl)("elTag", customRendering_r1.elTag)("elClasses", customRendering_r1.elClasses)("elStyle", customRendering_r1.elStyle)("elAttrs", customRendering_r1.elAttrs)("template", ctx_r0.templateMap[customRendering_r1.generatorName])("renderProps", customRendering_r1.renderProps);
  }
}
const OPTION_IS_DEEP = {
  headerToolbar: true,
  footerToolbar: true,
  events: true,
  eventSources: true,
  resources: true
};
/*
NOTE: keep synced with component
*/
const OPTION_INPUT_NAMES = ['events', 'eventSources', 'resources'];
const hasOwnProperty = Object.prototype.hasOwnProperty;
/*
Really simple clone utility. Only copies plain arrays, objects, and Dates. Transfers everything else as-is.
Wanted to use a third-party lib, but none did exactly this.
*/
function deepCopy(input) {
  if (Array.isArray(input)) {
    return input.map(deepCopy);
  } else if (input instanceof Date) {
    return new Date(input.valueOf());
  } else if (typeof input === 'object' && input) {
    // non-null object
    return mapHash(input, deepCopy);
  } else {
    // everything else (null, function, etc)
    return input;
  }
}
function mapHash(input, func) {
  const output = {};
  for (const key in input) {
    if (hasOwnProperty.call(input, key)) {
      output[key] = func(input[key], key);
    }
  }
  return output;
}

/*
Forked from https://github.com/epoberezkin/fast-deep-equal (also has MIT license)
Needed ESM support or else Angular complains about treeshaking
(https://github.com/fullcalendar/fullcalendar-angular/issues/421)
*/
function deepEqual(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  // true if both NaN, false otherwise
  return a !== a && b !== b;
}
const dummyContainer$1 = document.createDocumentFragment();
class OffscreenFragmentComponent {
  constructor(element) {
    this.element = element;
  }
  ngAfterViewInit() {
    dummyContainer$1.appendChild(this.element.nativeElement);
  }
  // invoked BEFORE component removed from DOM
  ngOnDestroy() {
    dummyContainer$1.removeChild(this.element.nativeElement);
  }
}
OffscreenFragmentComponent.ɵfac = function OffscreenFragmentComponent_Factory(t) {
  return new (t || OffscreenFragmentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
};
OffscreenFragmentComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: OffscreenFragmentComponent,
  selectors: [["offscreen-fragment"]],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function OffscreenFragmentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    }
  },
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OffscreenFragmentComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'offscreen-fragment',
      template: '<ng-content></ng-content>',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }];
  }, null);
})();
const dummyContainer = document.createDocumentFragment();
class TransportContainerComponent {
  ngAfterViewInit() {
    const rootEl = this.rootElRef?.nativeElement; // assumed defined
    replaceEl(rootEl, this.inPlaceOf);
    applyElAttrs(rootEl, undefined, this.elAttrs);
    // insurance for if Preact recreates and reroots inPlaceOf element
    this.inPlaceOf.style.display = 'none';
    this.reportEl(rootEl);
  }
  ngOnChanges(changes) {
    const rootEl = this.rootElRef?.nativeElement;
    // ngOnChanges is called before ngAfterViewInit (and before DOM initializes)
    // so make sure rootEl is defined before doing anything
    if (rootEl) {
      // If the ContentContainer's tagName changed, it will create a new DOM element in its
      // original place. Detect this and re-replace.
      if (this.inPlaceOf.parentNode !== dummyContainer) {
        replaceEl(rootEl, this.inPlaceOf);
        applyElAttrs(rootEl, undefined, this.elAttrs);
        this.reportEl(rootEl);
      } else {
        const elAttrsChange = changes['elAttrs'];
        if (elAttrsChange) {
          applyElAttrs(rootEl, elAttrsChange.previousValue, elAttrsChange.currentValue);
        }
      }
    }
  }
  // invoked BEFORE component removed from DOM
  ngOnDestroy() {
    // protect against Preact recreating and rerooting inPlaceOf element
    if (this.inPlaceOf.parentNode === dummyContainer) {
      dummyContainer.removeChild(this.inPlaceOf);
    }
    this.reportEl(null);
  }
}
TransportContainerComponent.ɵfac = function TransportContainerComponent_Factory(t) {
  return new (t || TransportContainerComponent)();
};
TransportContainerComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: TransportContainerComponent,
  selectors: [["transport-container"]],
  viewQuery: function TransportContainerComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.rootElRef = _t.first);
    }
  },
  inputs: {
    inPlaceOf: "inPlaceOf",
    reportEl: "reportEl",
    elTag: "elTag",
    elClasses: "elClasses",
    elStyle: "elStyle",
    elAttrs: "elAttrs",
    template: "template",
    renderProps: "renderProps"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 6,
  vars: 6,
  consts: [[3, "ngIf"], [3, "ngClass", "ngStyle"], ["rootEl", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function TransportContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, TransportContainerComponent_ng_template_0_Template, 3, 6, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TransportContainerComponent_ng_template_1_Template, 3, 6, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TransportContainerComponent_ng_template_2_Template, 3, 6, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TransportContainerComponent_ng_template_3_Template, 3, 6, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TransportContainerComponent_ng_template_4_Template, 3, 6, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TransportContainerComponent_ng_template_5_Template, 3, 6, "ng-template", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "a");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.elTag == "td");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TransportContainerComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'transport-container',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      template: "<ng-template [ngIf]=\"elTag == 'div'\">\n  <div #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </div>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'span'\">\n  <span #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </span>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'a'\">\n  <a #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </a>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'tr'\">\n  <tr #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </tr>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'th'\">\n  <th #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </th>\n</ng-template>\n<ng-template [ngIf]=\"elTag == 'td'\">\n  <td #rootEl [ngClass]=\"elClasses || ''\" [ngStyle]=\"elStyle || null\">\n    <ng-container\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{ $implicit: renderProps }\"\n    ></ng-container>\n  </td>\n</ng-template>\n"
    }]
  }], null, {
    inPlaceOf: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    reportEl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elTag: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elClasses: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    elAttrs: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    template: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    renderProps: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    rootElRef: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['rootEl']
    }]
  });
})();
function replaceEl(subject, inPlaceOf) {
  inPlaceOf.parentNode?.insertBefore(subject, inPlaceOf.nextSibling);
  dummyContainer.appendChild(inPlaceOf);
}
function applyElAttrs(el, previousAttrs = {}, currentAttrs = {}) {
  // these are called "attributes" but they manipulate DOM node *properties*
  for (const attrName in previousAttrs) {
    if (!(attrName in currentAttrs)) {
      el[attrName] = null;
    }
  }
  for (const attrName in currentAttrs) {
    el[attrName] = currentAttrs[attrName];
  }
}
class FullCalendarComponent {
  constructor(element, changeDetector) {
    this.element = element;
    this.calendar = null;
    this.optionSnapshot = {}; // for diffing
    this.customRenderingMap = new Map();
    this.templateMap = {};
    const customRenderingStore = new _fullcalendar_core_internal__WEBPACK_IMPORTED_MODULE_2__.cy();
    customRenderingStore.subscribe(customRenderingMap => {
      this.customRenderingMap = customRenderingMap;
      this.customRenderingArray = undefined; // clear cache
      changeDetector.detectChanges();
    });
    this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore);
    this.templateMap = this; // alias to this
  }

  ngAfterViewInit() {
    const {
      deepChangeDetection
    } = this;
    const options = {
      ...this.options,
      ...this.buildInputOptions()
    };
    // initialize snapshot
    this.optionSnapshot = mapHash(options, (optionVal, optionName) => deepChangeDetection && OPTION_IS_DEEP[optionName] ? deepCopy(optionVal) : optionVal);
    const calendarEl = this.element.nativeElement;
    const calendar = this.calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_3__.Calendar(calendarEl, {
      ...options,
      ...this.buildExtraOptions()
    });
    // Ionic dimensions hack
    // https://github.com/fullcalendar/fullcalendar/issues/4976
    const ionContent = calendarEl.closest('ion-content');
    if (ionContent && ionContent.componentOnReady) {
      ionContent.componentOnReady().then(() => {
        window.requestAnimationFrame(() => {
          calendar.render();
        });
      });
    } else {
      calendar.render();
    }
  }
  /*
  allows us to manually detect complex input changes, internal mutations to certain options.
  called before ngOnChanges. called much more often than ngOnChanges.
  */
  ngDoCheck() {
    if (this.calendar) {
      // not the initial render
      const {
        deepChangeDetection,
        optionSnapshot
      } = this;
      const newOptions = {
        ...this.options,
        ...this.buildInputOptions()
      };
      const newProcessedOptions = {};
      const changedOptionNames = [];
      // detect adds and updates (and update snapshot)
      for (const optionName in newOptions) {
        if (newOptions.hasOwnProperty(optionName)) {
          let optionVal = newOptions[optionName];
          if (deepChangeDetection && OPTION_IS_DEEP[optionName]) {
            if (!deepEqual(optionSnapshot[optionName], optionVal)) {
              optionSnapshot[optionName] = deepCopy(optionVal);
              changedOptionNames.push(optionName);
            }
          } else {
            if (optionSnapshot[optionName] !== optionVal) {
              optionSnapshot[optionName] = optionVal;
              changedOptionNames.push(optionName);
            }
          }
          newProcessedOptions[optionName] = optionVal;
        }
      }
      const oldOptionNames = Object.keys(optionSnapshot);
      // detect removals (and update snapshot)
      for (const optionName of oldOptionNames) {
        if (!(optionName in newOptions)) {
          // doesn't exist in new options?
          delete optionSnapshot[optionName];
          changedOptionNames.push(optionName);
        }
      }
      if (changedOptionNames.length) {
        this.calendar.pauseRendering();
        this.calendar.resetOptions({
          ...newProcessedOptions,
          ...this.buildExtraOptions()
        }, changedOptionNames);
      }
    }
  }
  ngAfterContentChecked() {
    if (this.calendar) {
      // too defensive?
      this.calendar.resumeRendering();
    }
  }
  ngOnDestroy() {
    if (this.calendar) {
      // too defensive?
      this.calendar.destroy();
      this.calendar = null;
    }
  }
  get customRenderings() {
    return this.customRenderingArray || (this.customRenderingArray = [...this.customRenderingMap.values()]);
  }
  getApi() {
    return this.calendar;
  }
  buildInputOptions() {
    const options = {};
    for (const inputName of OPTION_INPUT_NAMES) {
      const inputValue = this[inputName];
      if (inputValue != null) {
        // exclude both null and undefined
        options[inputName] = inputValue;
      }
    }
    return options;
  }
  buildExtraOptions() {
    return {
      handleCustomRendering: this.handleCustomRendering,
      customRenderingMetaMap: this.templateMap,
      customRenderingReplacesEl: true
    };
  }
  // for `trackBy` in loop
  trackCustomRendering(index, customRendering) {
    return customRendering.id;
  }
}
FullCalendarComponent.ɵfac = function FullCalendarComponent_Factory(t) {
  return new (t || FullCalendarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
FullCalendarComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FullCalendarComponent,
  selectors: [["full-calendar"]],
  contentQueries: function FullCalendarComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c3, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c4, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c5, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c7, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c8, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c9, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c10, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c11, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c12, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c13, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c14, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c15, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c16, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _c17, 7);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dayHeaderContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dayCellContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.weekNumberContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.nowIndicatorContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.eventContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.slotLaneContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.slotLabelContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.allDayContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.moreLinkContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.noEventsContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceAreaHeaderContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceGroupLabelContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceLabelContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceLaneContent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.resourceGroupLaneContent = _t.first);
    }
  },
  inputs: {
    options: "options",
    deepChangeDetection: "deepChangeDetection",
    events: "events",
    eventSources: "eventSources",
    resources: "resources"
  },
  decls: 2,
  vars: 2,
  consts: [[3, "inPlaceOf", "reportEl", "elTag", "elClasses", "elStyle", "elAttrs", "template", "renderProps", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "inPlaceOf", "reportEl", "elTag", "elClasses", "elStyle", "elAttrs", "template", "renderProps"]],
  template: function FullCalendarComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "offscreen-fragment");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FullCalendarComponent_transport_container_1_Template, 1, 8, "transport-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.customRenderings)("ngForTrackBy", ctx.trackCustomRendering);
    }
  },
  dependencies: [OffscreenFragmentComponent, TransportContainerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf],
  encapsulation: 2
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FullCalendarComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'full-calendar',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None // the styles are root-level, not scoped within the component
      ,
      template: "<offscreen-fragment>\n  <transport-container *ngFor=\"let customRendering of customRenderings; trackBy:trackCustomRendering\"\n    [inPlaceOf]=\"customRendering.containerEl\"\n    [reportEl]=\"customRendering.reportNewContainerEl\"\n    [elTag]=\"customRendering.elTag\"\n    [elClasses]=\"customRendering.elClasses\"\n    [elStyle]=\"customRendering.elStyle\"\n    [elAttrs]=\"customRendering.elAttrs\"\n    [template]=\"templateMap[customRendering.generatorName]!\"\n    [renderProps]=\"customRendering.renderProps\"\n  ></transport-container>\n</offscreen-fragment>\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, {
    options: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    deepChangeDetection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    events: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    eventSources: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    resources: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dayHeaderContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['dayHeaderContent', {
        static: true
      }]
    }],
    dayCellContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['dayCellContent', {
        static: true
      }]
    }],
    weekNumberContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['weekNumberContent', {
        static: true
      }]
    }],
    nowIndicatorContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['nowIndicatorContent', {
        static: true
      }]
    }],
    eventContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['eventContent', {
        static: true
      }]
    }],
    slotLaneContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['slotLaneContent', {
        static: true
      }]
    }],
    slotLabelContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['slotLabelContent', {
        static: true
      }]
    }],
    allDayContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['allDayContent', {
        static: true
      }]
    }],
    moreLinkContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['moreLinkContent', {
        static: true
      }]
    }],
    noEventsContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['noEventsContent', {
        static: true
      }]
    }],
    resourceAreaHeaderContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceAreaHeaderContent', {
        static: true
      }]
    }],
    resourceGroupLabelContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceGroupLabelContent', {
        static: true
      }]
    }],
    resourceLabelContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceLabelContent', {
        static: true
      }]
    }],
    resourceLaneContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceLaneContent', {
        static: true
      }]
    }],
    resourceGroupLaneContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: ['resourceGroupLaneContent', {
        static: true
      }]
    }]
  });
})();
class FullCalendarModule {}
FullCalendarModule.ɵfac = function FullCalendarModule_Factory(t) {
  return new (t || FullCalendarModule)();
};
FullCalendarModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FullCalendarModule
});
FullCalendarModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule]]
});
(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FullCalendarModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      declarations: [FullCalendarComponent, OffscreenFragmentComponent, TransportContainerComponent],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
      exports: [FullCalendarComponent]
    }]
  }], null, null);
})();

/*
 * Public API Surface of lib
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 27946:
/*!**************************************************!*\
  !*** ./node_modules/@fullcalendar/core/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calendar: () => (/* binding */ Calendar),
/* harmony export */   JsonRequestError: () => (/* reexport safe */ _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ag),
/* harmony export */   createPlugin: () => (/* binding */ createPlugin),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   formatRange: () => (/* binding */ formatRange),
/* harmony export */   globalLocales: () => (/* binding */ globalLocales),
/* harmony export */   globalPlugins: () => (/* binding */ globalPlugins),
/* harmony export */   sliceEvents: () => (/* binding */ sliceEvents),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _internal_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal-common.js */ 20483);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ 49453);
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact/compat */ 41161);




const globalLocales = [];
const MINIMAL_RAW_EN_LOCALE = {
  code: 'en',
  week: {
    dow: 0,
    doy: 4 // 4 days need to be within the year to be considered the first week
  },

  direction: 'ltr',
  buttonText: {
    prev: 'prev',
    next: 'next',
    prevYear: 'prev year',
    nextYear: 'next year',
    year: 'year',
    today: 'today',
    month: 'month',
    week: 'week',
    day: 'day',
    list: 'list'
  },
  weekText: 'W',
  weekTextLong: 'Week',
  closeHint: 'Close',
  timeHint: 'Time',
  eventHint: 'Event',
  allDayText: 'all-day',
  moreLinkText: 'more',
  noEventsText: 'No events to display'
};
const RAW_EN_LOCALE = Object.assign(Object.assign({}, MINIMAL_RAW_EN_LOCALE), {
  // Includes things we don't want other locales to inherit,
  // things that derive from other translatable strings.
  buttonHints: {
    prev: 'Previous $0',
    next: 'Next $0',
    today(buttonText, unit) {
      return unit === 'day' ? 'Today' : `This ${buttonText}`;
    }
  },
  viewHint: '$0 view',
  navLinkHint: 'Go to $0',
  moreLinkHint(eventCnt) {
    return `Show ${eventCnt} more event${eventCnt === 1 ? '' : 's'}`;
  }
});
function organizeRawLocales(explicitRawLocales) {
  let defaultCode = explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en';
  let allRawLocales = globalLocales.concat(explicitRawLocales);
  let rawLocaleMap = {
    en: RAW_EN_LOCALE
  };
  for (let rawLocale of allRawLocales) {
    rawLocaleMap[rawLocale.code] = rawLocale;
  }
  return {
    map: rawLocaleMap,
    defaultCode
  };
}
function buildLocale(inputSingular, available) {
  if (typeof inputSingular === 'object' && !Array.isArray(inputSingular)) {
    return parseLocale(inputSingular.code, [inputSingular.code], inputSingular);
  }
  return queryLocale(inputSingular, available);
}
function queryLocale(codeArg, available) {
  let codes = [].concat(codeArg || []); // will convert to array
  let raw = queryRawLocale(codes, available) || RAW_EN_LOCALE;
  return parseLocale(codeArg, codes, raw);
}
function queryRawLocale(codes, available) {
  for (let i = 0; i < codes.length; i += 1) {
    let parts = codes[i].toLocaleLowerCase().split('-');
    for (let j = parts.length; j > 0; j -= 1) {
      let simpleId = parts.slice(0, j).join('-');
      if (available[simpleId]) {
        return available[simpleId];
      }
    }
  }
  return null;
}
function parseLocale(codeArg, codes, raw) {
  let merged = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.m)([MINIMAL_RAW_EN_LOCALE, raw], ['buttonText']);
  delete merged.code; // don't want this part of the options
  let {
    week
  } = merged;
  delete merged.week;
  return {
    codeArg,
    codes,
    week,
    simpleNumberFormat: new Intl.NumberFormat(codeArg),
    options: merged
  };
}

// TODO: easier way to add new hooks? need to update a million things
function createPlugin(input) {
  return {
    id: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.g)(),
    name: input.name,
    premiumReleaseDate: input.premiumReleaseDate ? new Date(input.premiumReleaseDate) : undefined,
    deps: input.deps || [],
    reducers: input.reducers || [],
    isLoadingFuncs: input.isLoadingFuncs || [],
    contextInit: [].concat(input.contextInit || []),
    eventRefiners: input.eventRefiners || {},
    eventDefMemberAdders: input.eventDefMemberAdders || [],
    eventSourceRefiners: input.eventSourceRefiners || {},
    isDraggableTransformers: input.isDraggableTransformers || [],
    eventDragMutationMassagers: input.eventDragMutationMassagers || [],
    eventDefMutationAppliers: input.eventDefMutationAppliers || [],
    dateSelectionTransformers: input.dateSelectionTransformers || [],
    datePointTransforms: input.datePointTransforms || [],
    dateSpanTransforms: input.dateSpanTransforms || [],
    views: input.views || {},
    viewPropsTransformers: input.viewPropsTransformers || [],
    isPropsValid: input.isPropsValid || null,
    externalDefTransforms: input.externalDefTransforms || [],
    viewContainerAppends: input.viewContainerAppends || [],
    eventDropTransformers: input.eventDropTransformers || [],
    componentInteractions: input.componentInteractions || [],
    calendarInteractions: input.calendarInteractions || [],
    themeClasses: input.themeClasses || {},
    eventSourceDefs: input.eventSourceDefs || [],
    cmdFormatter: input.cmdFormatter,
    recurringTypes: input.recurringTypes || [],
    namedTimeZonedImpl: input.namedTimeZonedImpl,
    initialView: input.initialView || '',
    elementDraggingImpl: input.elementDraggingImpl,
    optionChangeHandlers: input.optionChangeHandlers || {},
    scrollGridImpl: input.scrollGridImpl || null,
    listenerRefiners: input.listenerRefiners || {},
    optionRefiners: input.optionRefiners || {},
    propSetHandlers: input.propSetHandlers || {}
  };
}
function buildPluginHooks(pluginDefs, globalDefs) {
  let currentPluginIds = {};
  let hooks = {
    premiumReleaseDate: undefined,
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
    initialView: '',
    elementDraggingImpl: null,
    optionChangeHandlers: {},
    scrollGridImpl: null,
    listenerRefiners: {},
    optionRefiners: {},
    propSetHandlers: {}
  };
  function addDefs(defs) {
    for (let def of defs) {
      const pluginName = def.name;
      const currentId = currentPluginIds[pluginName];
      if (currentId === undefined) {
        currentPluginIds[pluginName] = def.id;
        addDefs(def.deps);
        hooks = combineHooks(hooks, def);
      } else if (currentId !== def.id) {
        // different ID than the one already added
        console.warn(`Duplicate plugin '${pluginName}'`);
      }
    }
  }
  if (pluginDefs) {
    addDefs(pluginDefs);
  }
  addDefs(globalDefs);
  return hooks;
}
function buildBuildPluginHooks() {
  let currentOverrideDefs = [];
  let currentGlobalDefs = [];
  let currentHooks;
  return (overrideDefs, globalDefs) => {
    if (!currentHooks || !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.i)(overrideDefs, currentOverrideDefs) || !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.i)(globalDefs, currentGlobalDefs)) {
      currentHooks = buildPluginHooks(overrideDefs, globalDefs);
    }
    currentOverrideDefs = overrideDefs;
    currentGlobalDefs = globalDefs;
    return currentHooks;
  };
}
function combineHooks(hooks0, hooks1) {
  return {
    premiumReleaseDate: compareOptionalDates(hooks0.premiumReleaseDate, hooks1.premiumReleaseDate),
    reducers: hooks0.reducers.concat(hooks1.reducers),
    isLoadingFuncs: hooks0.isLoadingFuncs.concat(hooks1.isLoadingFuncs),
    contextInit: hooks0.contextInit.concat(hooks1.contextInit),
    eventRefiners: Object.assign(Object.assign({}, hooks0.eventRefiners), hooks1.eventRefiners),
    eventDefMemberAdders: hooks0.eventDefMemberAdders.concat(hooks1.eventDefMemberAdders),
    eventSourceRefiners: Object.assign(Object.assign({}, hooks0.eventSourceRefiners), hooks1.eventSourceRefiners),
    isDraggableTransformers: hooks0.isDraggableTransformers.concat(hooks1.isDraggableTransformers),
    eventDragMutationMassagers: hooks0.eventDragMutationMassagers.concat(hooks1.eventDragMutationMassagers),
    eventDefMutationAppliers: hooks0.eventDefMutationAppliers.concat(hooks1.eventDefMutationAppliers),
    dateSelectionTransformers: hooks0.dateSelectionTransformers.concat(hooks1.dateSelectionTransformers),
    datePointTransforms: hooks0.datePointTransforms.concat(hooks1.datePointTransforms),
    dateSpanTransforms: hooks0.dateSpanTransforms.concat(hooks1.dateSpanTransforms),
    views: Object.assign(Object.assign({}, hooks0.views), hooks1.views),
    viewPropsTransformers: hooks0.viewPropsTransformers.concat(hooks1.viewPropsTransformers),
    isPropsValid: hooks1.isPropsValid || hooks0.isPropsValid,
    externalDefTransforms: hooks0.externalDefTransforms.concat(hooks1.externalDefTransforms),
    viewContainerAppends: hooks0.viewContainerAppends.concat(hooks1.viewContainerAppends),
    eventDropTransformers: hooks0.eventDropTransformers.concat(hooks1.eventDropTransformers),
    calendarInteractions: hooks0.calendarInteractions.concat(hooks1.calendarInteractions),
    componentInteractions: hooks0.componentInteractions.concat(hooks1.componentInteractions),
    themeClasses: Object.assign(Object.assign({}, hooks0.themeClasses), hooks1.themeClasses),
    eventSourceDefs: hooks0.eventSourceDefs.concat(hooks1.eventSourceDefs),
    cmdFormatter: hooks1.cmdFormatter || hooks0.cmdFormatter,
    recurringTypes: hooks0.recurringTypes.concat(hooks1.recurringTypes),
    namedTimeZonedImpl: hooks1.namedTimeZonedImpl || hooks0.namedTimeZonedImpl,
    initialView: hooks0.initialView || hooks1.initialView,
    elementDraggingImpl: hooks0.elementDraggingImpl || hooks1.elementDraggingImpl,
    optionChangeHandlers: Object.assign(Object.assign({}, hooks0.optionChangeHandlers), hooks1.optionChangeHandlers),
    scrollGridImpl: hooks1.scrollGridImpl || hooks0.scrollGridImpl,
    listenerRefiners: Object.assign(Object.assign({}, hooks0.listenerRefiners), hooks1.listenerRefiners),
    optionRefiners: Object.assign(Object.assign({}, hooks0.optionRefiners), hooks1.optionRefiners),
    propSetHandlers: Object.assign(Object.assign({}, hooks0.propSetHandlers), hooks1.propSetHandlers)
  };
}
function compareOptionalDates(date0, date1) {
  if (date0 === undefined) {
    return date1;
  }
  if (date1 === undefined) {
    return date0;
  }
  return new Date(Math.max(date0.valueOf(), date1.valueOf()));
}
class StandardTheme extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.T {}
StandardTheme.prototype.classes = {
  root: 'fc-theme-standard',
  tableCellShaded: 'fc-cell-shaded',
  buttonGroup: 'fc-button-group',
  button: 'fc-button fc-button-primary',
  buttonActive: 'fc-button-active'
};
StandardTheme.prototype.baseIconClass = 'fc-icon';
StandardTheme.prototype.iconClasses = {
  close: 'fc-icon-x',
  prev: 'fc-icon-chevron-left',
  next: 'fc-icon-chevron-right',
  prevYear: 'fc-icon-chevrons-left',
  nextYear: 'fc-icon-chevrons-right'
};
StandardTheme.prototype.rtlIconClasses = {
  prev: 'fc-icon-chevron-right',
  next: 'fc-icon-chevron-left',
  prevYear: 'fc-icon-chevrons-right',
  nextYear: 'fc-icon-chevrons-left'
};
StandardTheme.prototype.iconOverrideOption = 'buttonIcons'; // TODO: make TS-friendly
StandardTheme.prototype.iconOverrideCustomButtonOption = 'icon';
StandardTheme.prototype.iconOverridePrefix = 'fc-icon-';
function compileViewDefs(defaultConfigs, overrideConfigs) {
  let hash = {};
  let viewType;
  for (viewType in defaultConfigs) {
    ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs);
  }
  for (viewType in overrideConfigs) {
    ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs);
  }
  return hash;
}
function ensureViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
  if (hash[viewType]) {
    return hash[viewType];
  }
  let viewDef = buildViewDef(viewType, hash, defaultConfigs, overrideConfigs);
  if (viewDef) {
    hash[viewType] = viewDef;
  }
  return viewDef;
}
function buildViewDef(viewType, hash, defaultConfigs, overrideConfigs) {
  let defaultConfig = defaultConfigs[viewType];
  let overrideConfig = overrideConfigs[viewType];
  let queryProp = name => defaultConfig && defaultConfig[name] !== null ? defaultConfig[name] : overrideConfig && overrideConfig[name] !== null ? overrideConfig[name] : null;
  let theComponent = queryProp('component');
  let superType = queryProp('superType');
  let superDef = null;
  if (superType) {
    if (superType === viewType) {
      throw new Error('Can\'t have a custom view type that references itself');
    }
    superDef = ensureViewDef(superType, hash, defaultConfigs, overrideConfigs);
  }
  if (!theComponent && superDef) {
    theComponent = superDef.component;
  }
  if (!theComponent) {
    return null; // don't throw a warning, might be settings for a single-unit view
  }

  return {
    type: viewType,
    component: theComponent,
    defaults: Object.assign(Object.assign({}, superDef ? superDef.defaults : {}), defaultConfig ? defaultConfig.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, superDef ? superDef.overrides : {}), overrideConfig ? overrideConfig.rawOptions : {})
  };
}
function parseViewConfigs(inputs) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a)(inputs, parseViewConfig);
}
function parseViewConfig(input) {
  let rawOptions = typeof input === 'function' ? {
    component: input
  } : input;
  let {
    component
  } = rawOptions;
  if (rawOptions.content) {
    // TODO: remove content/classNames/didMount/etc from options?
    component = createViewHookComponent(rawOptions);
  } else if (component && !(component.prototype instanceof _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B)) {
    // WHY?: people were using `component` property for `content`
    // TODO: converge on one setting name
    component = createViewHookComponent(Object.assign(Object.assign({}, rawOptions), {
      content: component
    }));
  }
  return {
    superType: rawOptions.type,
    component: component,
    rawOptions // includes type and component too :(
  };
}

function createViewHookComponent(options) {
  return viewProps => (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.V.Consumer, null, context => (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.C, {
    elTag: "div",
    elClasses: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.b)(context.viewSpec),
    renderProps: Object.assign(Object.assign({}, viewProps), {
      nextDayThreshold: context.options.nextDayThreshold
    }),
    generatorName: undefined,
    customGenerator: options.content,
    classNameGenerator: options.classNames,
    didMount: options.didMount,
    willUnmount: options.willUnmount
  }));
}
function buildViewSpecs(defaultInputs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
  let defaultConfigs = parseViewConfigs(defaultInputs);
  let overrideConfigs = parseViewConfigs(optionOverrides.views);
  let viewDefs = compileViewDefs(defaultConfigs, overrideConfigs);
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a)(viewDefs, viewDef => buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults));
}
function buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
  let durationInput = viewDef.overrides.duration || viewDef.defaults.duration || dynamicOptionOverrides.duration || optionOverrides.duration;
  let duration = null;
  let durationUnit = '';
  let singleUnit = '';
  let singleUnitOverrides = {};
  if (durationInput) {
    duration = createDurationCached(durationInput);
    if (duration) {
      // valid?
      let denom = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.c)(duration);
      durationUnit = denom.unit;
      if (denom.value === 1) {
        singleUnit = durationUnit;
        singleUnitOverrides = overrideConfigs[durationUnit] ? overrideConfigs[durationUnit].rawOptions : {};
      }
    }
  }
  let queryButtonText = optionsSubset => {
    let buttonTextMap = optionsSubset.buttonText || {};
    let buttonTextKey = viewDef.defaults.buttonTextKey;
    if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
      return buttonTextMap[buttonTextKey];
    }
    if (buttonTextMap[viewDef.type] != null) {
      return buttonTextMap[viewDef.type];
    }
    if (buttonTextMap[singleUnit] != null) {
      return buttonTextMap[singleUnit];
    }
    return null;
  };
  let queryButtonTitle = optionsSubset => {
    let buttonHints = optionsSubset.buttonHints || {};
    let buttonKey = viewDef.defaults.buttonTextKey; // use same key as text
    if (buttonKey != null && buttonHints[buttonKey] != null) {
      return buttonHints[buttonKey];
    }
    if (buttonHints[viewDef.type] != null) {
      return buttonHints[viewDef.type];
    }
    if (buttonHints[singleUnit] != null) {
      return buttonHints[singleUnit];
    }
    return null;
  };
  return {
    type: viewDef.type,
    component: viewDef.component,
    duration,
    durationUnit,
    singleUnit,
    optionDefaults: viewDef.defaults,
    optionOverrides: Object.assign(Object.assign({}, singleUnitOverrides), viewDef.overrides),
    buttonTextOverride: queryButtonText(dynamicOptionOverrides) || queryButtonText(optionOverrides) ||
    // constructor-specified buttonText lookup hash takes precedence
    viewDef.overrides.buttonText,
    buttonTextDefault: queryButtonText(localeDefaults) || viewDef.defaults.buttonText || queryButtonText(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e) || viewDef.type,
    // not DRY
    buttonTitleOverride: queryButtonTitle(dynamicOptionOverrides) || queryButtonTitle(optionOverrides) || viewDef.overrides.buttonHint,
    buttonTitleDefault: queryButtonTitle(localeDefaults) || viewDef.defaults.buttonHint || queryButtonTitle(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e)
    // will eventually fall back to buttonText
  };
}
// hack to get memoization working
let durationInputMap = {};
function createDurationCached(durationInput) {
  let json = JSON.stringify(durationInput);
  let res = durationInputMap[json];
  if (res === undefined) {
    res = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d)(durationInput);
    durationInputMap[json] = res;
  }
  return res;
}
function reduceViewType(viewType, action) {
  switch (action.type) {
    case 'CHANGE_VIEW_TYPE':
      viewType = action.viewType;
  }
  return viewType;
}
function reduceDynamicOptionOverrides(dynamicOptionOverrides, action) {
  switch (action.type) {
    case 'SET_OPTION':
      return Object.assign(Object.assign({}, dynamicOptionOverrides), {
        [action.optionName]: action.rawOptionValue
      });
    default:
      return dynamicOptionOverrides;
  }
}
function reduceDateProfile(currentDateProfile, action, currentDate, dateProfileGenerator) {
  let dp;
  switch (action.type) {
    case 'CHANGE_VIEW_TYPE':
      return dateProfileGenerator.build(action.dateMarker || currentDate);
    case 'CHANGE_DATE':
      return dateProfileGenerator.build(action.dateMarker);
    case 'PREV':
      dp = dateProfileGenerator.buildPrev(currentDateProfile, currentDate);
      if (dp.isValid) {
        return dp;
      }
      break;
    case 'NEXT':
      dp = dateProfileGenerator.buildNext(currentDateProfile, currentDate);
      if (dp.isValid) {
        return dp;
      }
      break;
  }
  return currentDateProfile;
}
function initEventSources(calendarOptions, dateProfile, context) {
  let activeRange = dateProfile ? dateProfile.activeRange : null;
  return addSources({}, parseInitialSources(calendarOptions, context), activeRange, context);
}
function reduceEventSources(eventSources, action, dateProfile, context) {
  let activeRange = dateProfile ? dateProfile.activeRange : null; // need this check?
  switch (action.type) {
    case 'ADD_EVENT_SOURCES':
      // already parsed
      return addSources(eventSources, action.sources, activeRange, context);
    case 'REMOVE_EVENT_SOURCE':
      return removeSource(eventSources, action.sourceId);
    case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
    case 'NEXT':
    case 'CHANGE_DATE':
    case 'CHANGE_VIEW_TYPE':
      if (dateProfile) {
        return fetchDirtySources(eventSources, activeRange, context);
      }
      return eventSources;
    case 'FETCH_EVENT_SOURCES':
      return fetchSourcesByIds(eventSources, action.sourceIds ?
      // why no type?
      (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.f)(action.sourceIds) : excludeStaticSources(eventSources, context), activeRange, action.isRefetch || false, context);
    case 'RECEIVE_EVENTS':
    case 'RECEIVE_EVENT_ERROR':
      return receiveResponse(eventSources, action.sourceId, action.fetchId, action.fetchRange);
    case 'REMOVE_ALL_EVENT_SOURCES':
      return {};
    default:
      return eventSources;
  }
}
function reduceEventSourcesNewTimeZone(eventSources, dateProfile, context) {
  let activeRange = dateProfile ? dateProfile.activeRange : null; // need this check?
  return fetchSourcesByIds(eventSources, excludeStaticSources(eventSources, context), activeRange, true, context);
}
function computeEventSourcesLoading(eventSources) {
  for (let sourceId in eventSources) {
    if (eventSources[sourceId].isFetching) {
      return true;
    }
  }
  return false;
}
function addSources(eventSourceHash, sources, fetchRange, context) {
  let hash = {};
  for (let source of sources) {
    hash[source.sourceId] = source;
  }
  if (fetchRange) {
    hash = fetchDirtySources(hash, fetchRange, context);
  }
  return Object.assign(Object.assign({}, eventSourceHash), hash);
}
function removeSource(eventSourceHash, sourceId) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.h)(eventSourceHash, eventSource => eventSource.sourceId !== sourceId);
}
function fetchDirtySources(sourceHash, fetchRange, context) {
  return fetchSourcesByIds(sourceHash, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.h)(sourceHash, eventSource => isSourceDirty(eventSource, fetchRange, context)), fetchRange, false, context);
}
function isSourceDirty(eventSource, fetchRange, context) {
  if (!doesSourceNeedRange(eventSource, context)) {
    return !eventSource.latestFetchId;
  }
  return !context.options.lazyFetching || !eventSource.fetchRange || eventSource.isFetching ||
  // always cancel outdated in-progress fetches
  fetchRange.start < eventSource.fetchRange.start || fetchRange.end > eventSource.fetchRange.end;
}
function fetchSourcesByIds(prevSources, sourceIdHash, fetchRange, isRefetch, context) {
  let nextSources = {};
  for (let sourceId in prevSources) {
    let source = prevSources[sourceId];
    if (sourceIdHash[sourceId]) {
      nextSources[sourceId] = fetchSource(source, fetchRange, isRefetch, context);
    } else {
      nextSources[sourceId] = source;
    }
  }
  return nextSources;
}
function fetchSource(eventSource, fetchRange, isRefetch, context) {
  let {
    options,
    calendarApi
  } = context;
  let sourceDef = context.pluginHooks.eventSourceDefs[eventSource.sourceDefId];
  let fetchId = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.g)();
  sourceDef.fetch({
    eventSource,
    range: fetchRange,
    isRefetch,
    context
  }, res => {
    let {
      rawEvents
    } = res;
    if (options.eventSourceSuccess) {
      rawEvents = options.eventSourceSuccess.call(calendarApi, rawEvents, res.response) || rawEvents;
    }
    if (eventSource.success) {
      rawEvents = eventSource.success.call(calendarApi, rawEvents, res.response) || rawEvents;
    }
    context.dispatch({
      type: 'RECEIVE_EVENTS',
      sourceId: eventSource.sourceId,
      fetchId,
      fetchRange,
      rawEvents
    });
  }, error => {
    let errorHandled = false;
    if (options.eventSourceFailure) {
      options.eventSourceFailure.call(calendarApi, error);
      errorHandled = true;
    }
    if (eventSource.failure) {
      eventSource.failure(error);
      errorHandled = true;
    }
    if (!errorHandled) {
      console.warn(error.message, error);
    }
    context.dispatch({
      type: 'RECEIVE_EVENT_ERROR',
      sourceId: eventSource.sourceId,
      fetchId,
      fetchRange,
      error
    });
  });
  return Object.assign(Object.assign({}, eventSource), {
    isFetching: true,
    latestFetchId: fetchId
  });
}
function receiveResponse(sourceHash, sourceId, fetchId, fetchRange) {
  let eventSource = sourceHash[sourceId];
  if (eventSource &&
  // not already removed
  fetchId === eventSource.latestFetchId) {
    return Object.assign(Object.assign({}, sourceHash), {
      [sourceId]: Object.assign(Object.assign({}, eventSource), {
        isFetching: false,
        fetchRange
      })
    });
  }
  return sourceHash;
}
function excludeStaticSources(eventSources, context) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.h)(eventSources, eventSource => doesSourceNeedRange(eventSource, context));
}
function parseInitialSources(rawOptions, context) {
  let refiners = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.j)(context);
  let rawSources = [].concat(rawOptions.eventSources || []);
  let sources = []; // parsed
  if (rawOptions.initialEvents) {
    rawSources.unshift(rawOptions.initialEvents);
  }
  if (rawOptions.events) {
    rawSources.unshift(rawOptions.events);
  }
  for (let rawSource of rawSources) {
    let source = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.p)(rawSource, context, refiners);
    if (source) {
      sources.push(source);
    }
  }
  return sources;
}
function doesSourceNeedRange(eventSource, context) {
  let defs = context.pluginHooks.eventSourceDefs;
  return !defs[eventSource.sourceDefId].ignoreRange;
}
function reduceDateSelection(currentSelection, action) {
  switch (action.type) {
    case 'UNSELECT_DATES':
      return null;
    case 'SELECT_DATES':
      return action.selection;
    default:
      return currentSelection;
  }
}
function reduceSelectedEvent(currentInstanceId, action) {
  switch (action.type) {
    case 'UNSELECT_EVENT':
      return '';
    case 'SELECT_EVENT':
      return action.eventInstanceId;
    default:
      return currentInstanceId;
  }
}
function reduceEventDrag(currentDrag, action) {
  let newDrag;
  switch (action.type) {
    case 'UNSET_EVENT_DRAG':
      return null;
    case 'SET_EVENT_DRAG':
      newDrag = action.state;
      return {
        affectedEvents: newDrag.affectedEvents,
        mutatedEvents: newDrag.mutatedEvents,
        isEvent: newDrag.isEvent
      };
    default:
      return currentDrag;
  }
}
function reduceEventResize(currentResize, action) {
  let newResize;
  switch (action.type) {
    case 'UNSET_EVENT_RESIZE':
      return null;
    case 'SET_EVENT_RESIZE':
      newResize = action.state;
      return {
        affectedEvents: newResize.affectedEvents,
        mutatedEvents: newResize.mutatedEvents,
        isEvent: newResize.isEvent
      };
    default:
      return currentResize;
  }
}
function parseToolbars(calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) {
  let header = calendarOptions.headerToolbar ? parseToolbar(calendarOptions.headerToolbar, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) : null;
  let footer = calendarOptions.footerToolbar ? parseToolbar(calendarOptions.footerToolbar, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) : null;
  return {
    header,
    footer
  };
}
function parseToolbar(sectionStrHash, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi) {
  let sectionWidgets = {};
  let viewsWithButtons = [];
  let hasTitle = false;
  for (let sectionName in sectionStrHash) {
    let sectionStr = sectionStrHash[sectionName];
    let sectionRes = parseSection(sectionStr, calendarOptions, calendarOptionOverrides, theme, viewSpecs, calendarApi);
    sectionWidgets[sectionName] = sectionRes.widgets;
    viewsWithButtons.push(...sectionRes.viewsWithButtons);
    hasTitle = hasTitle || sectionRes.hasTitle;
  }
  return {
    sectionWidgets,
    viewsWithButtons,
    hasTitle
  };
}
/*
BAD: querying icons and text here. should be done at render time
*/
function parseSection(sectionStr, calendarOptions,
// defaults+overrides, then refined
calendarOptionOverrides,
// overrides only!, unrefined :(
theme, viewSpecs, calendarApi) {
  let isRtl = calendarOptions.direction === 'rtl';
  let calendarCustomButtons = calendarOptions.customButtons || {};
  let calendarButtonTextOverrides = calendarOptionOverrides.buttonText || {};
  let calendarButtonText = calendarOptions.buttonText || {};
  let calendarButtonHintOverrides = calendarOptionOverrides.buttonHints || {};
  let calendarButtonHints = calendarOptions.buttonHints || {};
  let sectionSubstrs = sectionStr ? sectionStr.split(' ') : [];
  let viewsWithButtons = [];
  let hasTitle = false;
  let widgets = sectionSubstrs.map(buttonGroupStr => buttonGroupStr.split(',').map(buttonName => {
    if (buttonName === 'title') {
      hasTitle = true;
      return {
        buttonName
      };
    }
    let customButtonProps;
    let viewSpec;
    let buttonClick;
    let buttonIcon; // only one of these will be set
    let buttonText; // "
    let buttonHint;
    // ^ for the title="" attribute, for accessibility
    if (customButtonProps = calendarCustomButtons[buttonName]) {
      buttonClick = ev => {
        if (customButtonProps.click) {
          customButtonProps.click.call(ev.target, ev, ev.target); // TODO: use Calendar this context?
        }
      };

      (buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) || (buttonIcon = theme.getIconClass(buttonName, isRtl)) || (buttonText = customButtonProps.text);
      buttonHint = customButtonProps.hint || customButtonProps.text;
    } else if (viewSpec = viewSpecs[buttonName]) {
      viewsWithButtons.push(buttonName);
      buttonClick = () => {
        calendarApi.changeView(buttonName);
      };
      (buttonText = viewSpec.buttonTextOverride) || (buttonIcon = theme.getIconClass(buttonName, isRtl)) || (buttonText = viewSpec.buttonTextDefault);
      let textFallback = viewSpec.buttonTextOverride || viewSpec.buttonTextDefault;
      buttonHint = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.k)(viewSpec.buttonTitleOverride || viewSpec.buttonTitleDefault || calendarOptions.viewHint, [textFallback, buttonName],
      // view-name = buttonName
      textFallback);
    } else if (calendarApi[buttonName]) {
      // a calendarApi method
      buttonClick = () => {
        calendarApi[buttonName]();
      };
      (buttonText = calendarButtonTextOverrides[buttonName]) || (buttonIcon = theme.getIconClass(buttonName, isRtl)) || (buttonText = calendarButtonText[buttonName]); // everything else is considered default
      if (buttonName === 'prevYear' || buttonName === 'nextYear') {
        let prevOrNext = buttonName === 'prevYear' ? 'prev' : 'next';
        buttonHint = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.k)(calendarButtonHintOverrides[prevOrNext] || calendarButtonHints[prevOrNext], [calendarButtonText.year || 'year', 'year'], calendarButtonText[buttonName]);
      } else {
        buttonHint = navUnit => (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.k)(calendarButtonHintOverrides[buttonName] || calendarButtonHints[buttonName], [calendarButtonText[navUnit] || navUnit, navUnit], calendarButtonText[buttonName]);
      }
    }
    return {
      buttonName,
      buttonClick,
      buttonIcon,
      buttonText,
      buttonHint
    };
  }));
  return {
    widgets,
    viewsWithButtons,
    hasTitle
  };
}

// always represents the current view. otherwise, it'd need to change value every time date changes
class ViewImpl {
  constructor(type, getCurrentData, dateEnv) {
    this.type = type;
    this.getCurrentData = getCurrentData;
    this.dateEnv = dateEnv;
  }
  get calendar() {
    return this.getCurrentData().calendarApi;
  }
  get title() {
    return this.getCurrentData().viewTitle;
  }
  get activeStart() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start);
  }
  get activeEnd() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end);
  }
  get currentStart() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start);
  }
  get currentEnd() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end);
  }
  getOption(name) {
    return this.getCurrentData().options[name]; // are the view-specific options
  }
}

let eventSourceDef$2 = {
  ignoreRange: true,
  parseMeta(refined) {
    if (Array.isArray(refined.events)) {
      return refined.events;
    }
    return null;
  },
  fetch(arg, successCallback) {
    successCallback({
      rawEvents: arg.eventSource.meta
    });
  }
};
const arrayEventSourcePlugin = createPlugin({
  name: 'array-event-source',
  eventSourceDefs: [eventSourceDef$2]
});
let eventSourceDef$1 = {
  parseMeta(refined) {
    if (typeof refined.events === 'function') {
      return refined.events;
    }
    return null;
  },
  fetch(arg, successCallback, errorCallback) {
    const {
      dateEnv
    } = arg.context;
    const func = arg.eventSource.meta;
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.u)(func.bind(null, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.l)(arg.range, dateEnv)), rawEvents => successCallback({
      rawEvents
    }), errorCallback);
  }
};
const funcEventSourcePlugin = createPlugin({
  name: 'func-event-source',
  eventSourceDefs: [eventSourceDef$1]
});
const JSON_FEED_EVENT_SOURCE_REFINERS = {
  method: String,
  extraParams: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let eventSourceDef = {
  parseMeta(refined) {
    if (refined.url && (refined.format === 'json' || !refined.format)) {
      return {
        url: refined.url,
        format: 'json',
        method: (refined.method || 'GET').toUpperCase(),
        extraParams: refined.extraParams,
        startParam: refined.startParam,
        endParam: refined.endParam,
        timeZoneParam: refined.timeZoneParam
      };
    }
    return null;
  },
  fetch(arg, successCallback, errorCallback) {
    const {
      meta
    } = arg.eventSource;
    const requestParams = buildRequestParams(meta, arg.range, arg.context);
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.r)(meta.method, meta.url, requestParams).then(([rawEvents, response]) => {
      successCallback({
        rawEvents,
        response
      });
    }, errorCallback);
  }
};
const jsonFeedEventSourcePlugin = createPlugin({
  name: 'json-event-source',
  eventSourceRefiners: JSON_FEED_EVENT_SOURCE_REFINERS,
  eventSourceDefs: [eventSourceDef]
});
function buildRequestParams(meta, range, context) {
  let {
    dateEnv,
    options
  } = context;
  let startParam;
  let endParam;
  let timeZoneParam;
  let customRequestParams;
  let params = {};
  startParam = meta.startParam;
  if (startParam == null) {
    startParam = options.startParam;
  }
  endParam = meta.endParam;
  if (endParam == null) {
    endParam = options.endParam;
  }
  timeZoneParam = meta.timeZoneParam;
  if (timeZoneParam == null) {
    timeZoneParam = options.timeZoneParam;
  }
  // retrieve any outbound GET/POST data from the options
  if (typeof meta.extraParams === 'function') {
    // supplied as a function that returns a key/value object
    customRequestParams = meta.extraParams();
  } else {
    // probably supplied as a straight key/value object
    customRequestParams = meta.extraParams || {};
  }
  Object.assign(params, customRequestParams);
  params[startParam] = dateEnv.formatIso(range.start);
  params[endParam] = dateEnv.formatIso(range.end);
  if (dateEnv.timeZone !== 'local') {
    params[timeZoneParam] = dateEnv.timeZone;
  }
  return params;
}
const SIMPLE_RECURRING_REFINERS = {
  daysOfWeek: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n,
  startTime: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d,
  endTime: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d,
  duration: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.d,
  startRecur: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n,
  endRecur: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.n
};
let recurring = {
  parse(refined, dateEnv) {
    if (refined.daysOfWeek || refined.startTime || refined.endTime || refined.startRecur || refined.endRecur) {
      let recurringData = {
        daysOfWeek: refined.daysOfWeek || null,
        startTime: refined.startTime || null,
        endTime: refined.endTime || null,
        startRecur: refined.startRecur ? dateEnv.createMarker(refined.startRecur) : null,
        endRecur: refined.endRecur ? dateEnv.createMarker(refined.endRecur) : null
      };
      let duration;
      if (refined.duration) {
        duration = refined.duration;
      }
      if (!duration && refined.startTime && refined.endTime) {
        duration = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.s)(refined.endTime, refined.startTime);
      }
      return {
        allDayGuess: Boolean(!refined.startTime && !refined.endTime),
        duration,
        typeData: recurringData // doesn't need endTime anymore but oh well
      };
    }

    return null;
  },
  expand(typeData, framingRange, dateEnv) {
    let clippedFramingRange = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.o)(framingRange, {
      start: typeData.startRecur,
      end: typeData.endRecur
    });
    if (clippedFramingRange) {
      return expandRanges(typeData.daysOfWeek, typeData.startTime, clippedFramingRange, dateEnv);
    }
    return [];
  }
};
const simpleRecurringEventsPlugin = createPlugin({
  name: 'simple-recurring-event',
  recurringTypes: [recurring],
  eventRefiners: SIMPLE_RECURRING_REFINERS
});
function expandRanges(daysOfWeek, startTime, framingRange, dateEnv) {
  let dowHash = daysOfWeek ? (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.f)(daysOfWeek) : null;
  let dayMarker = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.q)(framingRange.start);
  let endMarker = framingRange.end;
  let instanceStarts = [];
  while (dayMarker < endMarker) {
    let instanceStart;
    // if everyday, or this particular day-of-week
    if (!dowHash || dowHash[dayMarker.getUTCDay()]) {
      if (startTime) {
        instanceStart = dateEnv.add(dayMarker, startTime);
      } else {
        instanceStart = dayMarker;
      }
      instanceStarts.push(instanceStart);
    }
    dayMarker = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.t)(dayMarker, 1);
  }
  return instanceStarts;
}
const changeHandlerPlugin = createPlugin({
  name: 'change-handler',
  optionChangeHandlers: {
    events(events, context) {
      handleEventSources([events], context);
    },
    eventSources: handleEventSources
  }
});
/*
BUG: if `event` was supplied, all previously-given `eventSources` will be wiped out
*/
function handleEventSources(inputs, context) {
  let unfoundSources = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.v)(context.getCurrentData().eventSources);
  if (unfoundSources.length === 1 && inputs.length === 1 && Array.isArray(unfoundSources[0]._raw) && Array.isArray(inputs[0])) {
    context.dispatch({
      type: 'RESET_RAW_EVENTS',
      sourceId: unfoundSources[0].sourceId,
      rawEvents: inputs[0]
    });
    return;
  }
  let newInputs = [];
  for (let input of inputs) {
    let inputFound = false;
    for (let i = 0; i < unfoundSources.length; i += 1) {
      if (unfoundSources[i]._raw === input) {
        unfoundSources.splice(i, 1); // delete
        inputFound = true;
        break;
      }
    }
    if (!inputFound) {
      newInputs.push(input);
    }
  }
  for (let unfoundSource of unfoundSources) {
    context.dispatch({
      type: 'REMOVE_EVENT_SOURCE',
      sourceId: unfoundSource.sourceId
    });
  }
  for (let newInput of newInputs) {
    context.calendarApi.addEventSource(newInput);
  }
}
function handleDateProfile(dateProfile, context) {
  context.emitter.trigger('datesSet', Object.assign(Object.assign({}, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.l)(dateProfile.activeRange, context.dateEnv)), {
    view: context.viewApi
  }));
}
function handleEventStore(eventStore, context) {
  let {
    emitter
  } = context;
  if (emitter.hasHandlers('eventsSet')) {
    emitter.trigger('eventsSet', (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.w)(eventStore, context));
  }
}

/*
this array is exposed on the root namespace so that UMD plugins can add to it.
see the rollup-bundles script.
*/
const globalPlugins = [arrayEventSourcePlugin, funcEventSourcePlugin, jsonFeedEventSourcePlugin, simpleRecurringEventsPlugin, changeHandlerPlugin, createPlugin({
  name: 'misc',
  isLoadingFuncs: [state => computeEventSourcesLoading(state.eventSources)],
  propSetHandlers: {
    dateProfile: handleDateProfile,
    eventStore: handleEventStore
  }
})];
class TaskRunner {
  constructor(runTaskOption, drainedOption) {
    this.runTaskOption = runTaskOption;
    this.drainedOption = drainedOption;
    this.queue = [];
    this.delayedRunner = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.D(this.drain.bind(this));
  }
  request(task, delay) {
    this.queue.push(task);
    this.delayedRunner.request(delay);
  }
  pause(scope) {
    this.delayedRunner.pause(scope);
  }
  resume(scope, force) {
    this.delayedRunner.resume(scope, force);
  }
  drain() {
    let {
      queue
    } = this;
    while (queue.length) {
      let completedTasks = [];
      let task;
      while (task = queue.shift()) {
        this.runTask(task);
        completedTasks.push(task);
      }
      this.drained(completedTasks);
    } // keep going, in case new tasks were added in the drained handler
  }

  runTask(task) {
    if (this.runTaskOption) {
      this.runTaskOption(task);
    }
  }
  drained(completedTasks) {
    if (this.drainedOption) {
      this.drainedOption(completedTasks);
    }
  }
}

// Computes what the title at the top of the calendarApi should be for this view
function buildTitle(dateProfile, viewOptions, dateEnv) {
  let range;
  // for views that span a large unit of time, show the proper interval, ignoring stray days before and after
  if (/^(year|month)$/.test(dateProfile.currentRangeUnit)) {
    range = dateProfile.currentRange;
  } else {
    // for day units or smaller, use the actual day range
    range = dateProfile.activeRange;
  }
  return dateEnv.formatRange(range.start, range.end, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.x)(viewOptions.titleFormat || buildTitleFormat(dateProfile)), {
    isEndExclusive: dateProfile.isRangeAllDay,
    defaultSeparator: viewOptions.titleRangeSeparator
  });
}
// Generates the format string that should be used to generate the title for the current date range.
// Attempts to compute the most appropriate format if not explicitly specified with `titleFormat`.
function buildTitleFormat(dateProfile) {
  let {
    currentRangeUnit
  } = dateProfile;
  if (currentRangeUnit === 'year') {
    return {
      year: 'numeric'
    };
  }
  if (currentRangeUnit === 'month') {
    return {
      year: 'numeric',
      month: 'long'
    }; // like "September 2014"
  }

  let days = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.y)(dateProfile.currentRange.start, dateProfile.currentRange.end);
  if (days !== null && days > 1) {
    // multi-day range. shorter, like "Sep 9 - 10 2014"
    return {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  }
  // one day. longer, like "September 9 2014"
  return {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
}

// in future refactor, do the redux-style function(state=initial) for initial-state
// also, whatever is happening in constructor, have it happen in action queue too
class CalendarDataManager {
  constructor(props) {
    this.computeCurrentViewData = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(this._computeCurrentViewData);
    this.organizeRawLocales = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(organizeRawLocales);
    this.buildLocale = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildLocale);
    this.buildPluginHooks = buildBuildPluginHooks();
    this.buildDateEnv = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildDateEnv$1);
    this.buildTheme = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildTheme);
    this.parseToolbars = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(parseToolbars);
    this.buildViewSpecs = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildViewSpecs);
    this.buildDateProfileGenerator = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.A)(buildDateProfileGenerator);
    this.buildViewApi = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildViewApi);
    this.buildViewUiProps = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.A)(buildViewUiProps);
    this.buildEventUiBySource = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildEventUiBySource, _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.E);
    this.buildEventUiBases = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildEventUiBases);
    this.parseContextBusinessHours = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.A)(parseContextBusinessHours);
    this.buildTitle = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildTitle);
    this.emitter = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.F();
    this.actionRunner = new TaskRunner(this._handleAction.bind(this), this.updateData.bind(this));
    this.currentCalendarOptionsInput = {};
    this.currentCalendarOptionsRefined = {};
    this.currentViewOptionsInput = {};
    this.currentViewOptionsRefined = {};
    this.currentCalendarOptionsRefiners = {};
    this.optionsForRefining = [];
    this.optionsForHandling = [];
    this.getCurrentData = () => this.data;
    this.dispatch = action => {
      this.actionRunner.request(action); // protects against recursive calls to _handleAction
    };

    this.props = props;
    this.actionRunner.pause();
    let dynamicOptionOverrides = {};
    let optionsData = this.computeOptionsData(props.optionOverrides, dynamicOptionOverrides, props.calendarApi);
    let currentViewType = optionsData.calendarOptions.initialView || optionsData.pluginHooks.initialView;
    let currentViewData = this.computeCurrentViewData(currentViewType, optionsData, props.optionOverrides, dynamicOptionOverrides);
    // wire things up
    // TODO: not DRY
    props.calendarApi.currentDataManager = this;
    this.emitter.setThisContext(props.calendarApi);
    this.emitter.setOptions(currentViewData.options);
    let currentDate = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.G)(optionsData.calendarOptions, optionsData.dateEnv);
    let dateProfile = currentViewData.dateProfileGenerator.build(currentDate);
    if (!(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.H)(dateProfile.activeRange, currentDate)) {
      currentDate = dateProfile.currentRange.start;
    }
    let calendarContext = {
      dateEnv: optionsData.dateEnv,
      options: optionsData.calendarOptions,
      pluginHooks: optionsData.pluginHooks,
      calendarApi: props.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    };
    // needs to be after setThisContext
    for (let callback of optionsData.pluginHooks.contextInit) {
      callback(calendarContext);
    }
    // NOT DRY
    let eventSources = initEventSources(optionsData.calendarOptions, dateProfile, calendarContext);
    let initialState = {
      dynamicOptionOverrides,
      currentViewType,
      currentDate,
      dateProfile,
      businessHours: this.parseContextBusinessHours(calendarContext),
      eventSources,
      eventUiBases: {},
      eventStore: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
      renderableEventStore: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
      dateSelection: null,
      eventSelection: '',
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(calendarContext).selectionConfig
    };
    let contextAndState = Object.assign(Object.assign({}, calendarContext), initialState);
    for (let reducer of optionsData.pluginHooks.reducers) {
      Object.assign(initialState, reducer(null, null, contextAndState));
    }
    if (computeIsLoading(initialState, calendarContext)) {
      this.emitter.trigger('loading', true); // NOT DRY
    }

    this.state = initialState;
    this.updateData();
    this.actionRunner.resume();
  }
  resetOptions(optionOverrides, changedOptionNames) {
    let {
      props
    } = this;
    if (changedOptionNames === undefined) {
      props.optionOverrides = optionOverrides;
    } else {
      props.optionOverrides = Object.assign(Object.assign({}, props.optionOverrides || {}), optionOverrides);
      this.optionsForRefining.push(...changedOptionNames);
    }
    if (changedOptionNames === undefined || changedOptionNames.length) {
      this.actionRunner.request({
        type: 'NOTHING'
      });
    }
  }
  _handleAction(action) {
    let {
      props,
      state,
      emitter
    } = this;
    let dynamicOptionOverrides = reduceDynamicOptionOverrides(state.dynamicOptionOverrides, action);
    let optionsData = this.computeOptionsData(props.optionOverrides, dynamicOptionOverrides, props.calendarApi);
    let currentViewType = reduceViewType(state.currentViewType, action);
    let currentViewData = this.computeCurrentViewData(currentViewType, optionsData, props.optionOverrides, dynamicOptionOverrides);
    // wire things up
    // TODO: not DRY
    props.calendarApi.currentDataManager = this;
    emitter.setThisContext(props.calendarApi);
    emitter.setOptions(currentViewData.options);
    let calendarContext = {
      dateEnv: optionsData.dateEnv,
      options: optionsData.calendarOptions,
      pluginHooks: optionsData.pluginHooks,
      calendarApi: props.calendarApi,
      dispatch: this.dispatch,
      emitter,
      getCurrentData: this.getCurrentData
    };
    let {
      currentDate,
      dateProfile
    } = state;
    if (this.data && this.data.dateProfileGenerator !== currentViewData.dateProfileGenerator) {
      // hack
      dateProfile = currentViewData.dateProfileGenerator.build(currentDate);
    }
    currentDate = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.J)(currentDate, action);
    dateProfile = reduceDateProfile(dateProfile, action, currentDate, currentViewData.dateProfileGenerator);
    if (action.type === 'PREV' ||
    // TODO: move this logic into DateProfileGenerator
    action.type === 'NEXT' ||
    // "
    !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.H)(dateProfile.currentRange, currentDate)) {
      currentDate = dateProfile.currentRange.start;
    }
    let eventSources = reduceEventSources(state.eventSources, action, dateProfile, calendarContext);
    let eventStore = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.K)(state.eventStore, action, eventSources, dateProfile, calendarContext);
    let isEventsLoading = computeEventSourcesLoading(eventSources); // BAD. also called in this func in computeIsLoading
    let renderableEventStore = isEventsLoading && !currentViewData.options.progressiveEventRendering ? state.renderableEventStore || eventStore :
    // try from previous state
    eventStore;
    let {
      eventUiSingleBase,
      selectionConfig
    } = this.buildViewUiProps(calendarContext); // will memoize obj
    let eventUiBySource = this.buildEventUiBySource(eventSources);
    let eventUiBases = this.buildEventUiBases(renderableEventStore.defs, eventUiSingleBase, eventUiBySource);
    let newState = {
      dynamicOptionOverrides,
      currentViewType,
      currentDate,
      dateProfile,
      eventSources,
      eventStore,
      renderableEventStore,
      selectionConfig,
      eventUiBases,
      businessHours: this.parseContextBusinessHours(calendarContext),
      dateSelection: reduceDateSelection(state.dateSelection, action),
      eventSelection: reduceSelectedEvent(state.eventSelection, action),
      eventDrag: reduceEventDrag(state.eventDrag, action),
      eventResize: reduceEventResize(state.eventResize, action)
    };
    let contextAndState = Object.assign(Object.assign({}, calendarContext), newState);
    for (let reducer of optionsData.pluginHooks.reducers) {
      Object.assign(newState, reducer(state, action, contextAndState)); // give the OLD state, for old value
    }

    let wasLoading = computeIsLoading(state, calendarContext);
    let isLoading = computeIsLoading(newState, calendarContext);
    // TODO: use propSetHandlers in plugin system
    if (!wasLoading && isLoading) {
      emitter.trigger('loading', true);
    } else if (wasLoading && !isLoading) {
      emitter.trigger('loading', false);
    }
    this.state = newState;
    if (props.onAction) {
      props.onAction(action);
    }
  }
  updateData() {
    let {
      props,
      state
    } = this;
    let oldData = this.data;
    let optionsData = this.computeOptionsData(props.optionOverrides, state.dynamicOptionOverrides, props.calendarApi);
    let currentViewData = this.computeCurrentViewData(state.currentViewType, optionsData, props.optionOverrides, state.dynamicOptionOverrides);
    let data = this.data = Object.assign(Object.assign(Object.assign({
      viewTitle: this.buildTitle(state.dateProfile, currentViewData.options, optionsData.dateEnv),
      calendarApi: props.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    }, optionsData), currentViewData), state);
    let changeHandlers = optionsData.pluginHooks.optionChangeHandlers;
    let oldCalendarOptions = oldData && oldData.calendarOptions;
    let newCalendarOptions = optionsData.calendarOptions;
    if (oldCalendarOptions && oldCalendarOptions !== newCalendarOptions) {
      if (oldCalendarOptions.timeZone !== newCalendarOptions.timeZone) {
        // hack
        state.eventSources = data.eventSources = reduceEventSourcesNewTimeZone(data.eventSources, state.dateProfile, data);
        state.eventStore = data.eventStore = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.L)(data.eventStore, oldData.dateEnv, data.dateEnv);
        state.renderableEventStore = data.renderableEventStore = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.L)(data.renderableEventStore, oldData.dateEnv, data.dateEnv);
      }
      for (let optionName in changeHandlers) {
        if (this.optionsForHandling.indexOf(optionName) !== -1 || oldCalendarOptions[optionName] !== newCalendarOptions[optionName]) {
          changeHandlers[optionName](newCalendarOptions[optionName], data);
        }
      }
    }
    this.optionsForHandling = [];
    if (props.onData) {
      props.onData(data);
    }
  }
  computeOptionsData(optionOverrides, dynamicOptionOverrides, calendarApi) {
    // TODO: blacklist options that are handled by optionChangeHandlers
    if (!this.optionsForRefining.length && optionOverrides === this.stableOptionOverrides && dynamicOptionOverrides === this.stableDynamicOptionOverrides) {
      return this.stableCalendarOptionsData;
    }
    let {
      refinedOptions,
      pluginHooks,
      localeDefaults,
      availableLocaleData,
      extra
    } = this.processRawCalendarOptions(optionOverrides, dynamicOptionOverrides);
    warnUnknownOptions(extra);
    let dateEnv = this.buildDateEnv(refinedOptions.timeZone, refinedOptions.locale, refinedOptions.weekNumberCalculation, refinedOptions.firstDay, refinedOptions.weekText, pluginHooks, availableLocaleData, refinedOptions.defaultRangeSeparator);
    let viewSpecs = this.buildViewSpecs(pluginHooks.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, localeDefaults);
    let theme = this.buildTheme(refinedOptions, pluginHooks);
    let toolbarConfig = this.parseToolbars(refinedOptions, this.stableOptionOverrides, theme, viewSpecs, calendarApi);
    return this.stableCalendarOptionsData = {
      calendarOptions: refinedOptions,
      pluginHooks,
      dateEnv,
      viewSpecs,
      theme,
      toolbarConfig,
      localeDefaults,
      availableRawLocales: availableLocaleData.map
    };
  }
  // always called from behind a memoizer
  processRawCalendarOptions(optionOverrides, dynamicOptionOverrides) {
    let {
      locales,
      locale
    } = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.M)([_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e, optionOverrides, dynamicOptionOverrides]);
    let availableLocaleData = this.organizeRawLocales(locales);
    let availableRawLocales = availableLocaleData.map;
    let localeDefaults = this.buildLocale(locale || availableLocaleData.defaultCode, availableRawLocales).options;
    let pluginHooks = this.buildPluginHooks(optionOverrides.plugins || [], globalPlugins);
    let refiners = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.N), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.O), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.P), pluginHooks.listenerRefiners), pluginHooks.optionRefiners);
    let extra = {};
    let raw = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.M)([_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e, localeDefaults, optionOverrides, dynamicOptionOverrides]);
    let refined = {};
    let currentRaw = this.currentCalendarOptionsInput;
    let currentRefined = this.currentCalendarOptionsRefined;
    let anyChanges = false;
    for (let optionName in raw) {
      if (this.optionsForRefining.indexOf(optionName) === -1 && (raw[optionName] === currentRaw[optionName] || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName] && optionName in currentRaw && _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName](currentRaw[optionName], raw[optionName]))) {
        refined[optionName] = currentRefined[optionName];
      } else if (refiners[optionName]) {
        refined[optionName] = refiners[optionName](raw[optionName]);
        anyChanges = true;
      } else {
        extra[optionName] = currentRaw[optionName];
      }
    }
    if (anyChanges) {
      this.currentCalendarOptionsInput = raw;
      this.currentCalendarOptionsRefined = refined;
      this.stableOptionOverrides = optionOverrides;
      this.stableDynamicOptionOverrides = dynamicOptionOverrides;
    }
    this.optionsForHandling.push(...this.optionsForRefining);
    this.optionsForRefining = [];
    return {
      rawOptions: this.currentCalendarOptionsInput,
      refinedOptions: this.currentCalendarOptionsRefined,
      pluginHooks,
      availableLocaleData,
      localeDefaults,
      extra
    };
  }
  _computeCurrentViewData(viewType, optionsData, optionOverrides, dynamicOptionOverrides) {
    let viewSpec = optionsData.viewSpecs[viewType];
    if (!viewSpec) {
      throw new Error(`viewType "${viewType}" is not available. Please make sure you've loaded all neccessary plugins`);
    }
    let {
      refinedOptions,
      extra
    } = this.processRawViewOptions(viewSpec, optionsData.pluginHooks, optionsData.localeDefaults, optionOverrides, dynamicOptionOverrides);
    warnUnknownOptions(extra);
    let dateProfileGenerator = this.buildDateProfileGenerator({
      dateProfileGeneratorClass: viewSpec.optionDefaults.dateProfileGeneratorClass,
      duration: viewSpec.duration,
      durationUnit: viewSpec.durationUnit,
      usesMinMaxTime: viewSpec.optionDefaults.usesMinMaxTime,
      dateEnv: optionsData.dateEnv,
      calendarApi: this.props.calendarApi,
      slotMinTime: refinedOptions.slotMinTime,
      slotMaxTime: refinedOptions.slotMaxTime,
      showNonCurrentDates: refinedOptions.showNonCurrentDates,
      dayCount: refinedOptions.dayCount,
      dateAlignment: refinedOptions.dateAlignment,
      dateIncrement: refinedOptions.dateIncrement,
      hiddenDays: refinedOptions.hiddenDays,
      weekends: refinedOptions.weekends,
      nowInput: refinedOptions.now,
      validRangeInput: refinedOptions.validRange,
      visibleRangeInput: refinedOptions.visibleRange,
      fixedWeekCount: refinedOptions.fixedWeekCount
    });
    let viewApi = this.buildViewApi(viewType, this.getCurrentData, optionsData.dateEnv);
    return {
      viewSpec,
      options: refinedOptions,
      dateProfileGenerator,
      viewApi
    };
  }
  processRawViewOptions(viewSpec, pluginHooks, localeDefaults, optionOverrides, dynamicOptionOverrides) {
    let raw = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.M)([_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e, viewSpec.optionDefaults, localeDefaults, optionOverrides, viewSpec.optionOverrides, dynamicOptionOverrides]);
    let refiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.N), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.O), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.P), _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.R), pluginHooks.listenerRefiners), pluginHooks.optionRefiners);
    let refined = {};
    let currentRaw = this.currentViewOptionsInput;
    let currentRefined = this.currentViewOptionsRefined;
    let anyChanges = false;
    let extra = {};
    for (let optionName in raw) {
      if (raw[optionName] === currentRaw[optionName] || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName] && _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName](raw[optionName], currentRaw[optionName])) {
        refined[optionName] = currentRefined[optionName];
      } else {
        if (raw[optionName] === this.currentCalendarOptionsInput[optionName] || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName] && _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Q[optionName](raw[optionName], this.currentCalendarOptionsInput[optionName])) {
          if (optionName in this.currentCalendarOptionsRefined) {
            // might be an "extra" prop
            refined[optionName] = this.currentCalendarOptionsRefined[optionName];
          }
        } else if (refiners[optionName]) {
          refined[optionName] = refiners[optionName](raw[optionName]);
        } else {
          extra[optionName] = raw[optionName];
        }
        anyChanges = true;
      }
    }
    if (anyChanges) {
      this.currentViewOptionsInput = raw;
      this.currentViewOptionsRefined = refined;
    }
    return {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra
    };
  }
}
function buildDateEnv$1(timeZone, explicitLocale, weekNumberCalculation, firstDay, weekText, pluginHooks, availableLocaleData, defaultSeparator) {
  let locale = buildLocale(explicitLocale || availableLocaleData.defaultCode, availableLocaleData.map);
  return new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.S({
    calendarSystem: 'gregory',
    timeZone,
    namedTimeZoneImpl: pluginHooks.namedTimeZonedImpl,
    locale,
    weekNumberCalculation,
    firstDay,
    weekText,
    cmdFormatter: pluginHooks.cmdFormatter,
    defaultSeparator
  });
}
function buildTheme(options, pluginHooks) {
  let ThemeClass = pluginHooks.themeClasses[options.themeSystem] || StandardTheme;
  return new ThemeClass(options);
}
function buildDateProfileGenerator(props) {
  let DateProfileGeneratorClass = props.dateProfileGeneratorClass || _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.U;
  return new DateProfileGeneratorClass(props);
}
function buildViewApi(type, getCurrentData, dateEnv) {
  return new ViewImpl(type, getCurrentData, dateEnv);
}
function buildEventUiBySource(eventSources) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a)(eventSources, eventSource => eventSource.ui);
}
function buildEventUiBases(eventDefs, eventUiSingleBase, eventUiBySource) {
  let eventUiBases = {
    '': eventUiSingleBase
  };
  for (let defId in eventDefs) {
    let def = eventDefs[defId];
    if (def.sourceId && eventUiBySource[def.sourceId]) {
      eventUiBases[defId] = eventUiBySource[def.sourceId];
    }
  }
  return eventUiBases;
}
function buildViewUiProps(calendarContext) {
  let {
    options
  } = calendarContext;
  return {
    eventUiSingleBase: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.W)({
      display: options.eventDisplay,
      editable: options.editable,
      startEditable: options.eventStartEditable,
      durationEditable: options.eventDurationEditable,
      constraint: options.eventConstraint,
      overlap: typeof options.eventOverlap === 'boolean' ? options.eventOverlap : undefined,
      allow: options.eventAllow,
      backgroundColor: options.eventBackgroundColor,
      borderColor: options.eventBorderColor,
      textColor: options.eventTextColor,
      color: options.eventColor
      // classNames: options.eventClassNames // render hook will handle this
    }, calendarContext),
    selectionConfig: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.W)({
      constraint: options.selectConstraint,
      overlap: typeof options.selectOverlap === 'boolean' ? options.selectOverlap : undefined,
      allow: options.selectAllow
    }, calendarContext)
  };
}
function computeIsLoading(state, context) {
  for (let isLoadingFunc of context.pluginHooks.isLoadingFuncs) {
    if (isLoadingFunc(state)) {
      return true;
    }
  }
  return false;
}
function parseContextBusinessHours(calendarContext) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.X)(calendarContext.options.businessHours, calendarContext);
}
function warnUnknownOptions(options, viewName) {
  for (let optionName in options) {
    console.warn(`Unknown option '${optionName}'` + (viewName ? ` for view '${viewName}'` : ''));
  }
}
class ToolbarSection extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let children = this.props.widgetGroups.map(widgetGroup => this.renderWidgetGroup(widgetGroup));
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      className: 'fc-toolbar-chunk'
    }, ...children);
  }
  renderWidgetGroup(widgetGroup) {
    let {
      props
    } = this;
    let {
      theme
    } = this.context;
    let children = [];
    let isOnlyButtons = true;
    for (let widget of widgetGroup) {
      let {
        buttonName,
        buttonClick,
        buttonText,
        buttonIcon,
        buttonHint
      } = widget;
      if (buttonName === 'title') {
        isOnlyButtons = false;
        children.push((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", {
          className: "fc-toolbar-title",
          id: props.titleId
        }, props.title));
      } else {
        let isPressed = buttonName === props.activeButton;
        let isDisabled = !props.isTodayEnabled && buttonName === 'today' || !props.isPrevEnabled && buttonName === 'prev' || !props.isNextEnabled && buttonName === 'next';
        let buttonClasses = [`fc-${buttonName}-button`, theme.getClass('button')];
        if (isPressed) {
          buttonClasses.push(theme.getClass('buttonActive'));
        }
        children.push((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
          type: "button",
          title: typeof buttonHint === 'function' ? buttonHint(props.navUnit) : buttonHint,
          disabled: isDisabled,
          "aria-pressed": isPressed,
          className: buttonClasses.join(' '),
          onClick: buttonClick
        }, buttonText || (buttonIcon ? (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
          className: buttonIcon
        }) : '')));
      }
    }
    if (children.length > 1) {
      let groupClassName = isOnlyButtons && theme.getClass('buttonGroup') || '';
      return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
        className: groupClassName
      }, ...children);
    }
    return children[0];
  }
}
class Toolbar extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let {
      model,
      extraClassName
    } = this.props;
    let forceLtr = false;
    let startContent;
    let endContent;
    let sectionWidgets = model.sectionWidgets;
    let centerContent = sectionWidgets.center;
    if (sectionWidgets.left) {
      forceLtr = true;
      startContent = sectionWidgets.left;
    } else {
      startContent = sectionWidgets.start;
    }
    if (sectionWidgets.right) {
      forceLtr = true;
      endContent = sectionWidgets.right;
    } else {
      endContent = sectionWidgets.end;
    }
    let classNames = [extraClassName || '', 'fc-toolbar', forceLtr ? 'fc-toolbar-ltr' : ''];
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: classNames.join(' ')
    }, this.renderSection('start', startContent || []), this.renderSection('center', centerContent || []), this.renderSection('end', endContent || []));
  }
  renderSection(key, widgetGroups) {
    let {
      props
    } = this;
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(ToolbarSection, {
      key: key,
      widgetGroups: widgetGroups,
      title: props.title,
      navUnit: props.navUnit,
      activeButton: props.activeButton,
      isTodayEnabled: props.isTodayEnabled,
      isPrevEnabled: props.isPrevEnabled,
      isNextEnabled: props.isNextEnabled,
      titleId: props.titleId
    });
  }
}
class ViewHarness extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.B {
  constructor() {
    super(...arguments);
    this.state = {
      availableWidth: null
    };
    this.handleEl = el => {
      this.el = el;
      (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Y)(this.props.elRef, el);
      this.updateAvailableWidth();
    };
    this.handleResize = () => {
      this.updateAvailableWidth();
    };
  }
  render() {
    let {
      props,
      state
    } = this;
    let {
      aspectRatio
    } = props;
    let classNames = ['fc-view-harness', aspectRatio || props.liquid || props.height ? 'fc-view-harness-active' // harness controls the height
    : 'fc-view-harness-passive' // let the view do the height
    ];

    let height = '';
    let paddingBottom = '';
    if (aspectRatio) {
      if (state.availableWidth !== null) {
        height = state.availableWidth / aspectRatio;
      } else {
        // while waiting to know availableWidth, we can't set height to *zero*
        // because will cause lots of unnecessary scrollbars within scrollgrid.
        // BETTER: don't start rendering ANYTHING yet until we know container width
        // NOTE: why not always use paddingBottom? Causes height oscillation (issue 5606)
        paddingBottom = `${1 / aspectRatio * 100}%`;
      }
    } else {
      height = props.height || '';
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      "aria-labelledby": props.labeledById,
      ref: this.handleEl,
      className: classNames.join(' '),
      style: {
        height,
        paddingBottom
      }
    }, props.children);
  }
  componentDidMount() {
    this.context.addResizeHandler(this.handleResize);
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleResize);
  }
  updateAvailableWidth() {
    if (this.el &&
    // needed. but why?
    this.props.aspectRatio // aspectRatio is the only height setting that needs availableWidth
    ) {
      this.setState({
        availableWidth: this.el.offsetWidth
      });
    }
  }
}

/*
Detects when the user clicks on an event within a DateComponent
*/
class EventClicking extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    this.handleSegClick = (ev, segEl) => {
      let {
        component
      } = this;
      let {
        context
      } = component;
      let seg = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl);
      if (seg &&
      // might be the <div> surrounding the more link
      component.isValidSegDownEl(ev.target)) {
        // our way to simulate a link click for elements that can't be <a> tags
        // grab before trigger fired in case trigger trashes DOM thru rerendering
        let hasUrlContainer = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.$)(ev.target, '.fc-event-forced-url');
        let url = hasUrlContainer ? hasUrlContainer.querySelector('a[href]').href : '';
        context.emitter.trigger('eventClick', {
          el: segEl,
          event: new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a0(component.context, seg.eventRange.def, seg.eventRange.instance),
          jsEvent: ev,
          view: context.viewApi
        });
        if (url && !ev.defaultPrevented) {
          window.location.href = url;
        }
      }
    };
    this.destroy = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a1)(settings.el, 'click', '.fc-event',
    // on both fg and bg events
    this.handleSegClick);
  }
}

/*
Triggers events and adds/removes core classNames when the user's pointer
enters/leaves event-elements of a component.
*/
class EventHovering extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
    this.handleEventElRemove = el => {
      if (el === this.currentSegEl) {
        this.handleSegLeave(null, this.currentSegEl);
      }
    };
    this.handleSegEnter = (ev, segEl) => {
      if ((0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl)) {
        // TODO: better way to make sure not hovering over more+ link or its wrapper
        this.currentSegEl = segEl;
        this.triggerEvent('eventMouseEnter', ev, segEl);
      }
    };
    this.handleSegLeave = (ev, segEl) => {
      if (this.currentSegEl) {
        this.currentSegEl = null;
        this.triggerEvent('eventMouseLeave', ev, segEl);
      }
    };
    this.removeHoverListeners = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a2)(settings.el, '.fc-event',
    // on both fg and bg events
    this.handleSegEnter, this.handleSegLeave);
  }
  destroy() {
    this.removeHoverListeners();
  }
  triggerEvent(publicEvName, ev, segEl) {
    let {
      component
    } = this;
    let {
      context
    } = component;
    let seg = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl);
    if (!ev || component.isValidSegDownEl(ev.target)) {
      context.emitter.trigger(publicEvName, {
        el: segEl,
        event: new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a0(context, seg.eventRange.def, seg.eventRange.instance),
        jsEvent: ev,
        view: context.viewApi
      });
    }
  }
}
class CalendarContent extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a3 {
  constructor() {
    super(...arguments);
    this.buildViewContext = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a4);
    this.buildViewPropTransformers = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildViewPropTransformers);
    this.buildToolbarProps = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildToolbarProps);
    this.headerRef = (0,preact__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.footerRef = (0,preact__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.interactionsStore = {};
    // eslint-disable-next-line
    this.state = {
      viewLabelId: (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a5)()
    };
    // Component Registration
    // -----------------------------------------------------------------------------------------------------------------
    this.registerInteractiveComponent = (component, settingsInput) => {
      let settings = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a6)(component, settingsInput);
      let DEFAULT_INTERACTIONS = [EventClicking, EventHovering];
      let interactionClasses = DEFAULT_INTERACTIONS.concat(this.props.pluginHooks.componentInteractions);
      let interactions = interactionClasses.map(TheInteractionClass => new TheInteractionClass(settings));
      this.interactionsStore[component.uid] = interactions;
      _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a7[component.uid] = settings;
    };
    this.unregisterInteractiveComponent = component => {
      let listeners = this.interactionsStore[component.uid];
      if (listeners) {
        for (let listener of listeners) {
          listener.destroy();
        }
        delete this.interactionsStore[component.uid];
      }
      delete _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a7[component.uid];
    };
    // Resizing
    // -----------------------------------------------------------------------------------------------------------------
    this.resizeRunner = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.D(() => {
      this.props.emitter.trigger('_resize', true); // should window resizes be considered "forced" ?
      this.props.emitter.trigger('windowResize', {
        view: this.props.viewApi
      });
    });
    this.handleWindowResize = ev => {
      let {
        options
      } = this.props;
      if (options.handleWindowResize && ev.target === window // avoid jqui events
      ) {
        this.resizeRunner.request(options.windowResizeDelay);
      }
    };
  }
  /*
  renders INSIDE of an outer div
  */
  render() {
    let {
      props
    } = this;
    let {
      toolbarConfig,
      options
    } = props;
    let toolbarProps = this.buildToolbarProps(props.viewSpec, props.dateProfile, props.dateProfileGenerator, props.currentDate, (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a8)(props.options.now, props.dateEnv),
    // TODO: use NowTimer????
    props.viewTitle);
    let viewVGrow = false;
    let viewHeight = '';
    let viewAspectRatio;
    if (props.isHeightAuto || props.forPrint) {
      viewHeight = '';
    } else if (options.height != null) {
      viewVGrow = true;
    } else if (options.contentHeight != null) {
      viewHeight = options.contentHeight;
    } else {
      viewAspectRatio = Math.max(options.aspectRatio, 0.5); // prevent from getting too tall
    }

    let viewContext = this.buildViewContext(props.viewSpec, props.viewApi, props.options, props.dateProfileGenerator, props.dateEnv, props.theme, props.pluginHooks, props.dispatch, props.getCurrentData, props.emitter, props.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent);
    let viewLabelId = toolbarConfig.header && toolbarConfig.header.hasTitle ? this.state.viewLabelId : '';
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.V.Provider, {
      value: viewContext
    }, toolbarConfig.header && (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(Toolbar, Object.assign({
      ref: this.headerRef,
      extraClassName: "fc-header-toolbar",
      model: toolbarConfig.header,
      titleId: viewLabelId
    }, toolbarProps)), (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(ViewHarness, {
      liquid: viewVGrow,
      height: viewHeight,
      aspectRatio: viewAspectRatio,
      labeledById: viewLabelId
    }, this.renderView(props), this.buildAppendContent()), toolbarConfig.footer && (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(Toolbar, Object.assign({
      ref: this.footerRef,
      extraClassName: "fc-footer-toolbar",
      model: toolbarConfig.footer,
      titleId: ""
    }, toolbarProps)));
  }
  componentDidMount() {
    let {
      props
    } = this;
    this.calendarInteractions = props.pluginHooks.calendarInteractions.map(CalendarInteractionClass => new CalendarInteractionClass(props));
    window.addEventListener('resize', this.handleWindowResize);
    let {
      propSetHandlers
    } = props.pluginHooks;
    for (let propName in propSetHandlers) {
      propSetHandlers[propName](props[propName], props);
    }
  }
  componentDidUpdate(prevProps) {
    let {
      props
    } = this;
    let {
      propSetHandlers
    } = props.pluginHooks;
    for (let propName in propSetHandlers) {
      if (props[propName] !== prevProps[propName]) {
        propSetHandlers[propName](props[propName], props);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.resizeRunner.clear();
    for (let interaction of this.calendarInteractions) {
      interaction.destroy();
    }
    this.props.emitter.trigger('_unmount');
  }
  buildAppendContent() {
    let {
      props
    } = this;
    let children = props.pluginHooks.viewContainerAppends.map(buildAppendContent => buildAppendContent(props));
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment, {}, ...children);
  }
  renderView(props) {
    let {
      pluginHooks
    } = props;
    let {
      viewSpec
    } = props;
    let viewProps = {
      dateProfile: props.dateProfile,
      businessHours: props.businessHours,
      eventStore: props.renderableEventStore,
      eventUiBases: props.eventUiBases,
      dateSelection: props.dateSelection,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      isHeightAuto: props.isHeightAuto,
      forPrint: props.forPrint
    };
    let transformers = this.buildViewPropTransformers(pluginHooks.viewPropsTransformers);
    for (let transformer of transformers) {
      Object.assign(viewProps, transformer.transform(viewProps, props));
    }
    let ViewComponent = viewSpec.component;
    return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(ViewComponent, Object.assign({}, viewProps));
  }
}
function buildToolbarProps(viewSpec, dateProfile, dateProfileGenerator, currentDate, now, title) {
  // don't force any date-profiles to valid date profiles (the `false`) so that we can tell if it's invalid
  let todayInfo = dateProfileGenerator.build(now, undefined, false); // TODO: need `undefined` or else INFINITE LOOP for some reason
  let prevInfo = dateProfileGenerator.buildPrev(dateProfile, currentDate, false);
  let nextInfo = dateProfileGenerator.buildNext(dateProfile, currentDate, false);
  return {
    title,
    activeButton: viewSpec.type,
    navUnit: viewSpec.singleUnit,
    isTodayEnabled: todayInfo.isValid && !(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.H)(dateProfile.currentRange, now),
    isPrevEnabled: prevInfo.isValid,
    isNextEnabled: nextInfo.isValid
  };
}
// Plugin
// -----------------------------------------------------------------------------------------------------------------
function buildViewPropTransformers(theClasses) {
  return theClasses.map(TheClass => new TheClass());
}
class Calendar extends _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.a9 {
  constructor(el, optionOverrides = {}) {
    super();
    this.isRendering = false;
    this.isRendered = false;
    this.currentClassNames = [];
    this.customContentRenderId = 0;
    this.handleAction = action => {
      // actions we know we want to render immediately
      switch (action.type) {
        case 'SET_EVENT_DRAG':
        case 'SET_EVENT_RESIZE':
          this.renderRunner.tryDrain();
      }
    };
    this.handleData = data => {
      this.currentData = data;
      this.renderRunner.request(data.calendarOptions.rerenderDelay);
    };
    this.handleRenderRequest = () => {
      if (this.isRendering) {
        this.isRendered = true;
        let {
          currentData
        } = this;
        (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.aa)(() => {
          (0,preact__WEBPACK_IMPORTED_MODULE_1__.render)((0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ab, {
            options: currentData.calendarOptions,
            theme: currentData.theme,
            emitter: currentData.emitter
          }, (classNames, height, isHeightAuto, forPrint) => {
            this.setClassNames(classNames);
            this.setHeight(height);
            return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ac.Provider, {
              value: this.customContentRenderId
            }, (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(CalendarContent, Object.assign({
              isHeightAuto: isHeightAuto,
              forPrint: forPrint
            }, currentData)));
          }), this.el);
        });
      } else if (this.isRendered) {
        this.isRendered = false;
        (0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null, this.el);
        this.setClassNames([]);
        this.setHeight('');
      }
    };
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ad)(el);
    this.el = el;
    this.renderRunner = new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.D(this.handleRenderRequest);
    new CalendarDataManager({
      optionOverrides,
      calendarApi: this,
      onAction: this.handleAction,
      onData: this.handleData
    });
  }
  render() {
    let wasRendering = this.isRendering;
    if (!wasRendering) {
      this.isRendering = true;
    } else {
      this.customContentRenderId += 1;
    }
    this.renderRunner.request();
    if (wasRendering) {
      this.updateSize();
    }
  }
  destroy() {
    if (this.isRendering) {
      this.isRendering = false;
      this.renderRunner.request();
    }
  }
  updateSize() {
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.aa)(() => {
      super.updateSize();
    });
  }
  batchRendering(func) {
    this.renderRunner.pause('batchRendering');
    func();
    this.renderRunner.resume('batchRendering');
  }
  pauseRendering() {
    this.renderRunner.pause('pauseRendering');
  }
  resumeRendering() {
    this.renderRunner.resume('pauseRendering', true);
  }
  resetOptions(optionOverrides, changedOptionNames) {
    this.currentDataManager.resetOptions(optionOverrides, changedOptionNames);
  }
  setClassNames(classNames) {
    if (!(0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.i)(classNames, this.currentClassNames)) {
      let {
        classList
      } = this.el;
      for (let className of this.currentClassNames) {
        classList.remove(className);
      }
      for (let className of classNames) {
        classList.add(className);
      }
      this.currentClassNames = classNames;
    }
  }
  setHeight(height) {
    (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.ae)(this.el, 'height', height);
  }
}
function formatDate(dateInput, options = {}) {
  let dateEnv = buildDateEnv(options);
  let formatter = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.x)(options);
  let dateMeta = dateEnv.createMarkerMeta(dateInput);
  if (!dateMeta) {
    // TODO: warning?
    return '';
  }
  return dateEnv.format(dateMeta.marker, formatter, {
    forcedTzo: dateMeta.forcedTzo
  });
}
function formatRange(startInput, endInput, options) {
  let dateEnv = buildDateEnv(typeof options === 'object' && options ? options : {}); // pass in if non-null object
  let formatter = (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.x)(options);
  let startMeta = dateEnv.createMarkerMeta(startInput);
  let endMeta = dateEnv.createMarkerMeta(endInput);
  if (!startMeta || !endMeta) {
    // TODO: warning?
    return '';
  }
  return dateEnv.formatRange(startMeta.marker, endMeta.marker, formatter, {
    forcedStartTzo: startMeta.forcedTzo,
    forcedEndTzo: endMeta.forcedTzo,
    isEndExclusive: options.isEndExclusive,
    defaultSeparator: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e.defaultRangeSeparator
  });
}
// TODO: more DRY and optimized
function buildDateEnv(settings) {
  let locale = buildLocale(settings.locale || 'en', organizeRawLocales([]).map); // TODO: don't hardcode 'en' everywhere
  return new _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.S(Object.assign(Object.assign({
    timeZone: _internal_common_js__WEBPACK_IMPORTED_MODULE_0__.e.timeZone,
    calendarSystem: 'gregory'
  }, settings), {
    locale
  }));
}

// HELPERS
/*
if nextDayThreshold is specified, slicing is done in an all-day fashion.
you can get nextDayThreshold from context.nextDayThreshold
*/
function sliceEvents(props, allDay) {
  return (0,_internal_common_js__WEBPACK_IMPORTED_MODULE_0__.af)(props.eventStore, props.eventUiBases, props.dateProfile.activeRange, allDay ? props.nextDayThreshold : null).fg;
}
const version = '6.1.8';


/***/ }),

/***/ 20483:
/*!************************************************************!*\
  !*** ./node_modules/@fullcalendar/core/internal-common.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ elementClosest),
/* harmony export */   A: () => (/* binding */ memoizeObjArg),
/* harmony export */   B: () => (/* binding */ BaseComponent),
/* harmony export */   C: () => (/* binding */ ContentContainer),
/* harmony export */   D: () => (/* binding */ DelayedRunner),
/* harmony export */   E: () => (/* binding */ isPropsEqual),
/* harmony export */   F: () => (/* binding */ Emitter),
/* harmony export */   G: () => (/* binding */ getInitialDate),
/* harmony export */   H: () => (/* binding */ rangeContainsMarker),
/* harmony export */   I: () => (/* binding */ createEmptyEventStore),
/* harmony export */   J: () => (/* binding */ reduceCurrentDate),
/* harmony export */   K: () => (/* binding */ reduceEventStore),
/* harmony export */   L: () => (/* binding */ rezoneEventStoreDates),
/* harmony export */   M: () => (/* binding */ mergeRawOptions),
/* harmony export */   N: () => (/* binding */ BASE_OPTION_REFINERS),
/* harmony export */   O: () => (/* binding */ CALENDAR_LISTENER_REFINERS),
/* harmony export */   P: () => (/* binding */ CALENDAR_OPTION_REFINERS),
/* harmony export */   Q: () => (/* binding */ COMPLEX_OPTION_COMPARATORS),
/* harmony export */   R: () => (/* binding */ VIEW_OPTION_REFINERS),
/* harmony export */   S: () => (/* binding */ DateEnv),
/* harmony export */   T: () => (/* binding */ Theme),
/* harmony export */   U: () => (/* binding */ DateProfileGenerator),
/* harmony export */   V: () => (/* binding */ ViewContextType),
/* harmony export */   W: () => (/* binding */ createEventUi),
/* harmony export */   X: () => (/* binding */ parseBusinessHours),
/* harmony export */   Y: () => (/* binding */ setRef),
/* harmony export */   Z: () => (/* binding */ Interaction),
/* harmony export */   _: () => (/* binding */ getElSeg),
/* harmony export */   a: () => (/* binding */ mapHash),
/* harmony export */   a$: () => (/* binding */ getSlotClassNames),
/* harmony export */   a0: () => (/* binding */ EventImpl),
/* harmony export */   a1: () => (/* binding */ listenBySelector),
/* harmony export */   a2: () => (/* binding */ listenToHoverBySelector),
/* harmony export */   a3: () => (/* binding */ PureComponent),
/* harmony export */   a4: () => (/* binding */ buildViewContext),
/* harmony export */   a5: () => (/* binding */ getUniqueDomId),
/* harmony export */   a6: () => (/* binding */ parseInteractionSettings),
/* harmony export */   a7: () => (/* binding */ interactionSettingsStore),
/* harmony export */   a8: () => (/* binding */ getNow),
/* harmony export */   a9: () => (/* binding */ CalendarImpl),
/* harmony export */   aA: () => (/* binding */ diffDates),
/* harmony export */   aB: () => (/* binding */ removeExact),
/* harmony export */   aC: () => (/* binding */ memoizeArraylike),
/* harmony export */   aD: () => (/* binding */ memoizeHashlike),
/* harmony export */   aE: () => (/* binding */ intersectRects),
/* harmony export */   aF: () => (/* binding */ pointInsideRect),
/* harmony export */   aG: () => (/* binding */ constrainPoint),
/* harmony export */   aH: () => (/* binding */ getRectCenter),
/* harmony export */   aI: () => (/* binding */ diffPoints),
/* harmony export */   aJ: () => (/* binding */ translateRect),
/* harmony export */   aK: () => (/* binding */ compareObjs),
/* harmony export */   aL: () => (/* binding */ collectFromHash),
/* harmony export */   aM: () => (/* binding */ findElements),
/* harmony export */   aN: () => (/* binding */ findDirectChildren),
/* harmony export */   aO: () => (/* binding */ removeElement),
/* harmony export */   aP: () => (/* binding */ applyStyle),
/* harmony export */   aQ: () => (/* binding */ elementMatches),
/* harmony export */   aR: () => (/* binding */ getEventTargetViaRoot),
/* harmony export */   aS: () => (/* binding */ parseClassNames),
/* harmony export */   aT: () => (/* binding */ getCanVGrowWithinCell),
/* harmony export */   aU: () => (/* binding */ mergeEventStores),
/* harmony export */   aV: () => (/* binding */ getRelevantEvents),
/* harmony export */   aW: () => (/* binding */ eventTupleToStore),
/* harmony export */   aX: () => (/* binding */ combineEventUis),
/* harmony export */   aY: () => (/* binding */ Splitter),
/* harmony export */   aZ: () => (/* binding */ getDayClassNames),
/* harmony export */   a_: () => (/* binding */ getDateMeta),
/* harmony export */   aa: () => (/* binding */ flushSync),
/* harmony export */   ab: () => (/* binding */ CalendarRoot),
/* harmony export */   ac: () => (/* binding */ RenderId),
/* harmony export */   ad: () => (/* binding */ ensureElHasStyles),
/* harmony export */   ae: () => (/* binding */ applyStyleProp),
/* harmony export */   af: () => (/* binding */ sliceEventStore),
/* harmony export */   ag: () => (/* binding */ JsonRequestError),
/* harmony export */   ah: () => (/* binding */ createContext),
/* harmony export */   ai: () => (/* binding */ refineProps),
/* harmony export */   aj: () => (/* binding */ createEventInstance),
/* harmony export */   ak: () => (/* binding */ parseEventDef),
/* harmony export */   al: () => (/* binding */ refineEventDef),
/* harmony export */   am: () => (/* binding */ padStart),
/* harmony export */   an: () => (/* binding */ isInt),
/* harmony export */   ao: () => (/* binding */ parseFieldSpecs),
/* harmony export */   ap: () => (/* binding */ compareByFieldSpecs),
/* harmony export */   aq: () => (/* binding */ flexibleCompare),
/* harmony export */   ar: () => (/* binding */ preventSelection),
/* harmony export */   as: () => (/* binding */ allowSelection),
/* harmony export */   at: () => (/* binding */ preventContextMenu),
/* harmony export */   au: () => (/* binding */ allowContextMenu),
/* harmony export */   av: () => (/* binding */ compareNumbers),
/* harmony export */   aw: () => (/* binding */ enableCursor),
/* harmony export */   ax: () => (/* binding */ disableCursor),
/* harmony export */   ay: () => (/* binding */ computeVisibleDayRange),
/* harmony export */   az: () => (/* binding */ isMultiDayRange),
/* harmony export */   b: () => (/* binding */ buildViewClassNames),
/* harmony export */   b$: () => (/* binding */ SimpleScrollGrid),
/* harmony export */   b0: () => (/* binding */ buildNavLinkAttrs),
/* harmony export */   b1: () => (/* binding */ preventDefault),
/* harmony export */   b2: () => (/* binding */ whenTransitionDone),
/* harmony export */   b3: () => (/* binding */ computeInnerRect),
/* harmony export */   b4: () => (/* binding */ computeEdges),
/* harmony export */   b5: () => (/* binding */ getClippingParents),
/* harmony export */   b6: () => (/* binding */ computeRect),
/* harmony export */   b7: () => (/* binding */ rangesEqual),
/* harmony export */   b8: () => (/* binding */ rangesIntersect),
/* harmony export */   b9: () => (/* binding */ rangeContainsRange),
/* harmony export */   bA: () => (/* binding */ SegHierarchy),
/* harmony export */   bB: () => (/* binding */ buildEntryKey),
/* harmony export */   bC: () => (/* binding */ getEntrySpanEnd),
/* harmony export */   bD: () => (/* binding */ binarySearch),
/* harmony export */   bE: () => (/* binding */ groupIntersectingEntries),
/* harmony export */   bF: () => (/* binding */ intersectSpans),
/* harmony export */   bG: () => (/* binding */ interactionSettingsToStore),
/* harmony export */   bH: () => (/* binding */ ElementDragging),
/* harmony export */   bI: () => (/* binding */ config),
/* harmony export */   bJ: () => (/* binding */ parseDragMeta),
/* harmony export */   bK: () => (/* binding */ DayHeader),
/* harmony export */   bL: () => (/* binding */ computeFallbackHeaderFormat),
/* harmony export */   bM: () => (/* binding */ TableDateCell),
/* harmony export */   bN: () => (/* binding */ TableDowCell),
/* harmony export */   bO: () => (/* binding */ DaySeriesModel),
/* harmony export */   bP: () => (/* binding */ hasBgRendering),
/* harmony export */   bQ: () => (/* binding */ buildSegTimeText),
/* harmony export */   bR: () => (/* binding */ sortEventSegs),
/* harmony export */   bS: () => (/* binding */ getSegMeta),
/* harmony export */   bT: () => (/* binding */ buildEventRangeKey),
/* harmony export */   bU: () => (/* binding */ getSegAnchorAttrs),
/* harmony export */   bV: () => (/* binding */ DayTableModel),
/* harmony export */   bW: () => (/* binding */ Slicer),
/* harmony export */   bX: () => (/* binding */ applyMutationToEventStore),
/* harmony export */   bY: () => (/* binding */ isPropsValid),
/* harmony export */   bZ: () => (/* binding */ isInteractionValid),
/* harmony export */   b_: () => (/* binding */ isDateSelectionValid),
/* harmony export */   ba: () => (/* binding */ PositionCache),
/* harmony export */   bb: () => (/* binding */ ScrollController),
/* harmony export */   bc: () => (/* binding */ ElementScrollController),
/* harmony export */   bd: () => (/* binding */ WindowScrollController),
/* harmony export */   be: () => (/* binding */ DateComponent),
/* harmony export */   bf: () => (/* binding */ isDateSpansEqual),
/* harmony export */   bg: () => (/* binding */ addMs),
/* harmony export */   bh: () => (/* binding */ addWeeks),
/* harmony export */   bi: () => (/* binding */ diffWeeks),
/* harmony export */   bj: () => (/* binding */ diffWholeWeeks),
/* harmony export */   bk: () => (/* binding */ diffDayAndTime),
/* harmony export */   bl: () => (/* binding */ diffDays),
/* harmony export */   bm: () => (/* binding */ isValidDate),
/* harmony export */   bn: () => (/* binding */ asCleanDays),
/* harmony export */   bo: () => (/* binding */ multiplyDuration),
/* harmony export */   bp: () => (/* binding */ addDurations),
/* harmony export */   bq: () => (/* binding */ asRoughMinutes),
/* harmony export */   br: () => (/* binding */ asRoughSeconds),
/* harmony export */   bs: () => (/* binding */ asRoughMs),
/* harmony export */   bt: () => (/* binding */ wholeDivideDurations),
/* harmony export */   bu: () => (/* binding */ formatIsoTimeString),
/* harmony export */   bv: () => (/* binding */ formatDayString),
/* harmony export */   bw: () => (/* binding */ buildIsoString),
/* harmony export */   bx: () => (/* binding */ formatIsoMonthStr),
/* harmony export */   by: () => (/* binding */ NamedTimeZoneImpl),
/* harmony export */   bz: () => (/* binding */ parse),
/* harmony export */   c: () => (/* binding */ greatestDurationDenominator),
/* harmony export */   c0: () => (/* binding */ hasShrinkWidth),
/* harmony export */   c1: () => (/* binding */ renderMicroColGroup),
/* harmony export */   c2: () => (/* binding */ getScrollGridClassNames),
/* harmony export */   c3: () => (/* binding */ getSectionClassNames),
/* harmony export */   c4: () => (/* binding */ getSectionHasLiquidHeight),
/* harmony export */   c5: () => (/* binding */ getAllowYScrolling),
/* harmony export */   c6: () => (/* binding */ renderChunkContent),
/* harmony export */   c7: () => (/* binding */ computeShrinkWidth),
/* harmony export */   c8: () => (/* binding */ sanitizeShrinkWidth),
/* harmony export */   c9: () => (/* binding */ isColPropsEqual),
/* harmony export */   ca: () => (/* binding */ renderScrollShim),
/* harmony export */   cb: () => (/* binding */ getStickyFooterScrollbar),
/* harmony export */   cc: () => (/* binding */ getStickyHeaderDates),
/* harmony export */   cd: () => (/* binding */ Scroller),
/* harmony export */   ce: () => (/* binding */ getScrollbarWidths),
/* harmony export */   cf: () => (/* binding */ RefMap),
/* harmony export */   cg: () => (/* binding */ getIsRtlScrollbarOnLeft),
/* harmony export */   ch: () => (/* binding */ NowTimer),
/* harmony export */   ci: () => (/* binding */ ScrollResponder),
/* harmony export */   cj: () => (/* binding */ StandardEvent),
/* harmony export */   ck: () => (/* binding */ NowIndicatorContainer),
/* harmony export */   cl: () => (/* binding */ DayCellContainer),
/* harmony export */   cm: () => (/* binding */ hasCustomDayCellContent),
/* harmony export */   cn: () => (/* binding */ EventContainer),
/* harmony export */   co: () => (/* binding */ renderFill),
/* harmony export */   cp: () => (/* binding */ BgEvent),
/* harmony export */   cq: () => (/* binding */ WeekNumberContainer),
/* harmony export */   cr: () => (/* binding */ MoreLinkContainer),
/* harmony export */   cs: () => (/* binding */ computeEarliestSegStart),
/* harmony export */   ct: () => (/* binding */ ViewContainer),
/* harmony export */   cu: () => (/* binding */ triggerDateSelect),
/* harmony export */   cv: () => (/* binding */ getDefaultEventEnd),
/* harmony export */   cw: () => (/* binding */ injectStyles),
/* harmony export */   cx: () => (/* binding */ buildElAttrs),
/* harmony export */   cy: () => (/* binding */ CustomRenderingStore),
/* harmony export */   d: () => (/* binding */ createDuration),
/* harmony export */   e: () => (/* binding */ BASE_OPTION_DEFAULTS),
/* harmony export */   f: () => (/* binding */ arrayToHash),
/* harmony export */   g: () => (/* binding */ guid),
/* harmony export */   h: () => (/* binding */ filterHash),
/* harmony export */   i: () => (/* binding */ isArraysEqual),
/* harmony export */   j: () => (/* binding */ buildEventSourceRefiners),
/* harmony export */   k: () => (/* binding */ formatWithOrdinals),
/* harmony export */   l: () => (/* binding */ buildRangeApiWithTimeZone),
/* harmony export */   m: () => (/* binding */ mergeProps),
/* harmony export */   n: () => (/* binding */ identity),
/* harmony export */   o: () => (/* binding */ intersectRanges),
/* harmony export */   p: () => (/* binding */ parseEventSource),
/* harmony export */   q: () => (/* binding */ startOfDay),
/* harmony export */   r: () => (/* binding */ requestJson),
/* harmony export */   s: () => (/* binding */ subtractDurations),
/* harmony export */   t: () => (/* binding */ addDays),
/* harmony export */   u: () => (/* binding */ unpromisify),
/* harmony export */   v: () => (/* binding */ hashValuesToArray),
/* harmony export */   w: () => (/* binding */ buildEventApis),
/* harmony export */   x: () => (/* binding */ createFormatter),
/* harmony export */   y: () => (/* binding */ diffWholeDays),
/* harmony export */   z: () => (/* binding */ memoize)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ 49453);
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/compat */ 41161);



const styleTexts = [];
const styleEls = new Map();
function injectStyles(styleText) {
  styleTexts.push(styleText);
  styleEls.forEach(styleEl => {
    appendStylesTo(styleEl, styleText);
  });
}
function ensureElHasStyles(el) {
  if (el.isConnected) {
    registerStylesRoot(el.getRootNode());
  }
}
function registerStylesRoot(rootNode) {
  let styleEl = styleEls.get(rootNode);
  if (!styleEl || !styleEl.isConnected) {
    styleEl = rootNode.querySelector('style[data-fullcalendar]');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('data-fullcalendar', '');
      const nonce = getNonceValue();
      if (nonce) {
        styleEl.nonce = nonce;
      }
      const parentEl = rootNode === document ? document.head : rootNode;
      const insertBefore = rootNode === document ? parentEl.querySelector('script,link[rel=stylesheet],link[as=style],style') : parentEl.firstChild;
      parentEl.insertBefore(styleEl, insertBefore);
    }
    styleEls.set(rootNode, styleEl);
    hydrateStylesRoot(styleEl);
  }
}
function hydrateStylesRoot(styleEl) {
  for (const styleText of styleTexts) {
    appendStylesTo(styleEl, styleText);
  }
}
function appendStylesTo(styleEl, styleText) {
  const {
    sheet
  } = styleEl;
  const ruleCnt = sheet.cssRules.length;
  styleText.split('}').forEach((styleStr, i) => {
    styleStr = styleStr.trim();
    if (styleStr) {
      sheet.insertRule(styleStr + '}', ruleCnt + i);
    }
  });
}
// nonce
// -------------------------------------------------------------------------------------------------
let queriedNonceValue;
function getNonceValue() {
  if (queriedNonceValue === undefined) {
    queriedNonceValue = queryNonceValue();
  }
  return queriedNonceValue;
}
/*
TODO: discourage meta tag and instead put nonce attribute on placeholder <style> tag
*/
function queryNonceValue() {
  const metaWithNonce = document.querySelector('meta[name="csp-nonce"]');
  if (metaWithNonce && metaWithNonce.hasAttribute('content')) {
    return metaWithNonce.getAttribute('content');
  }
  const elWithNonce = document.querySelector('script[nonce]');
  if (elWithNonce) {
    return elWithNonce.nonce || '';
  }
  return '';
}
// main
// -------------------------------------------------------------------------------------------------
if (typeof document !== 'undefined') {
  registerStylesRoot(document);
}
var css_248z = ":root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url(\"data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\") format(\"truetype\")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:\"\\e900\"}.fc-icon-chevron-right:before{content:\"\\e901\"}.fc-icon-chevrons-left:before{content:\"\\e902\"}.fc-icon-chevrons-right:before{content:\"\\e903\"}.fc-icon-minus-square:before{content:\"\\e904\"}.fc-icon-plus-square:before{content:\"\\e905\"}.fc-icon-x:before{content:\"\\e906\"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:\"\";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:\"\";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:\"\";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}";
injectStyles(css_248z);
function removeElement(el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}
// Querying
// ----------------------------------------------------------------------------------------------------------------
function elementClosest(el, selector) {
  if (el.closest) {
    return el.closest(selector);
    // really bad fallback for IE
    // from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  }

  if (!document.documentElement.contains(el)) {
    return null;
  }
  do {
    if (elementMatches(el, selector)) {
      return el;
    }
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);
  return null;
}
function elementMatches(el, selector) {
  let method = el.matches || el.matchesSelector || el.msMatchesSelector;
  return method.call(el, selector);
}
// accepts multiple subject els
// returns a real array. good for methods like forEach
// TODO: accept the document
function findElements(container, selector) {
  let containers = container instanceof HTMLElement ? [container] : container;
  let allMatches = [];
  for (let i = 0; i < containers.length; i += 1) {
    let matches = containers[i].querySelectorAll(selector);
    for (let j = 0; j < matches.length; j += 1) {
      allMatches.push(matches[j]);
    }
  }
  return allMatches;
}
// accepts multiple subject els
// only queries direct child elements // TODO: rename to findDirectChildren!
function findDirectChildren(parent, selector) {
  let parents = parent instanceof HTMLElement ? [parent] : parent;
  let allMatches = [];
  for (let i = 0; i < parents.length; i += 1) {
    let childNodes = parents[i].children; // only ever elements
    for (let j = 0; j < childNodes.length; j += 1) {
      let childNode = childNodes[j];
      if (!selector || elementMatches(childNode, selector)) {
        allMatches.push(childNode);
      }
    }
  }
  return allMatches;
}
// Style
// ----------------------------------------------------------------------------------------------------------------
const PIXEL_PROP_RE = /(top|left|right|bottom|width|height)$/i;
function applyStyle(el, props) {
  for (let propName in props) {
    applyStyleProp(el, propName, props[propName]);
  }
}
function applyStyleProp(el, name, val) {
  if (val == null) {
    el.style[name] = '';
  } else if (typeof val === 'number' && PIXEL_PROP_RE.test(name)) {
    el.style[name] = `${val}px`;
  } else {
    el.style[name] = val;
  }
}
// Event Handling
// ----------------------------------------------------------------------------------------------------------------
// if intercepting bubbled events at the document/window/body level,
// and want to see originating element (the 'target'), use this util instead
// of `ev.target` because it goes within web-component boundaries.
function getEventTargetViaRoot(ev) {
  var _a, _b;
  return (_b = (_a = ev.composedPath) === null || _a === void 0 ? void 0 : _a.call(ev)[0]) !== null && _b !== void 0 ? _b : ev.target;
}
// Unique ID for DOM attribute
let guid$1 = 0;
function getUniqueDomId() {
  guid$1 += 1;
  return 'fc-dom-' + guid$1;
}

// Stops a mouse/touch event from doing it's native browser action
function preventDefault(ev) {
  ev.preventDefault();
}
// Event Delegation
// ----------------------------------------------------------------------------------------------------------------
function buildDelegationHandler(selector, handler) {
  return ev => {
    let matchedChild = elementClosest(ev.target, selector);
    if (matchedChild) {
      handler.call(matchedChild, ev, matchedChild);
    }
  };
}
function listenBySelector(container, eventType, selector, handler) {
  let attachedHandler = buildDelegationHandler(selector, handler);
  container.addEventListener(eventType, attachedHandler);
  return () => {
    container.removeEventListener(eventType, attachedHandler);
  };
}
function listenToHoverBySelector(container, selector, onMouseEnter, onMouseLeave) {
  let currentMatchedChild;
  return listenBySelector(container, 'mouseover', selector, (mouseOverEv, matchedChild) => {
    if (matchedChild !== currentMatchedChild) {
      currentMatchedChild = matchedChild;
      onMouseEnter(mouseOverEv, matchedChild);
      let realOnMouseLeave = mouseLeaveEv => {
        currentMatchedChild = null;
        onMouseLeave(mouseLeaveEv, matchedChild);
        matchedChild.removeEventListener('mouseleave', realOnMouseLeave);
      };
      // listen to the next mouseleave, and then unattach
      matchedChild.addEventListener('mouseleave', realOnMouseLeave);
    }
  });
}
// Animation
// ----------------------------------------------------------------------------------------------------------------
const transitionEventNames = ['webkitTransitionEnd', 'otransitionend', 'oTransitionEnd', 'msTransitionEnd', 'transitionend'];
// triggered only when the next single subsequent transition finishes
function whenTransitionDone(el, callback) {
  let realCallback = ev => {
    callback(ev);
    transitionEventNames.forEach(eventName => {
      el.removeEventListener(eventName, realCallback);
    });
  };
  transitionEventNames.forEach(eventName => {
    el.addEventListener(eventName, realCallback); // cross-browser way to determine when the transition finishes
  });
}
// ARIA workarounds
// ----------------------------------------------------------------------------------------------------------------
function createAriaClickAttrs(handler) {
  return Object.assign({
    onClick: handler
  }, createAriaKeyboardAttrs(handler));
}
function createAriaKeyboardAttrs(handler) {
  return {
    tabIndex: 0,
    onKeyDown(ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        handler(ev);
        ev.preventDefault(); // if space, don't scroll down page
      }
    }
  };
}

let guidNumber = 0;
function guid() {
  guidNumber += 1;
  return String(guidNumber);
}
/* FullCalendar-specific DOM Utilities
----------------------------------------------------------------------------------------------------------------------*/
// Make the mouse cursor express that an event is not allowed in the current area
function disableCursor() {
  document.body.classList.add('fc-not-allowed');
}
// Returns the mouse cursor to its original look
function enableCursor() {
  document.body.classList.remove('fc-not-allowed');
}
/* Selection
----------------------------------------------------------------------------------------------------------------------*/
function preventSelection(el) {
  el.style.userSelect = 'none';
  el.addEventListener('selectstart', preventDefault);
}
function allowSelection(el) {
  el.style.userSelect = '';
  el.removeEventListener('selectstart', preventDefault);
}
/* Context Menu
----------------------------------------------------------------------------------------------------------------------*/
function preventContextMenu(el) {
  el.addEventListener('contextmenu', preventDefault);
}
function allowContextMenu(el) {
  el.removeEventListener('contextmenu', preventDefault);
}
function parseFieldSpecs(input) {
  let specs = [];
  let tokens = [];
  let i;
  let token;
  if (typeof input === 'string') {
    tokens = input.split(/\s*,\s*/);
  } else if (typeof input === 'function') {
    tokens = [input];
  } else if (Array.isArray(input)) {
    tokens = input;
  }
  for (i = 0; i < tokens.length; i += 1) {
    token = tokens[i];
    if (typeof token === 'string') {
      specs.push(token.charAt(0) === '-' ? {
        field: token.substring(1),
        order: -1
      } : {
        field: token,
        order: 1
      });
    } else if (typeof token === 'function') {
      specs.push({
        func: token
      });
    }
  }
  return specs;
}
function compareByFieldSpecs(obj0, obj1, fieldSpecs) {
  let i;
  let cmp;
  for (i = 0; i < fieldSpecs.length; i += 1) {
    cmp = compareByFieldSpec(obj0, obj1, fieldSpecs[i]);
    if (cmp) {
      return cmp;
    }
  }
  return 0;
}
function compareByFieldSpec(obj0, obj1, fieldSpec) {
  if (fieldSpec.func) {
    return fieldSpec.func(obj0, obj1);
  }
  return flexibleCompare(obj0[fieldSpec.field], obj1[fieldSpec.field]) * (fieldSpec.order || 1);
}
function flexibleCompare(a, b) {
  if (!a && !b) {
    return 0;
  }
  if (b == null) {
    return -1;
  }
  if (a == null) {
    return 1;
  }
  if (typeof a === 'string' || typeof b === 'string') {
    return String(a).localeCompare(String(b));
  }
  return a - b;
}
/* String Utilities
----------------------------------------------------------------------------------------------------------------------*/
function padStart(val, len) {
  let s = String(val);
  return '000'.substr(0, len - s.length) + s;
}
function formatWithOrdinals(formatter, args, fallbackText) {
  if (typeof formatter === 'function') {
    return formatter(...args);
  }
  if (typeof formatter === 'string') {
    // non-blank string
    return args.reduce((str, arg, index) => str.replace('$' + index, arg || ''), formatter);
  }
  return fallbackText;
}
/* Number Utilities
----------------------------------------------------------------------------------------------------------------------*/
function compareNumbers(a, b) {
  return a - b;
}
function isInt(n) {
  return n % 1 === 0;
}
/* FC-specific DOM dimension stuff
----------------------------------------------------------------------------------------------------------------------*/
function computeSmallestCellWidth(cellEl) {
  let allWidthEl = cellEl.querySelector('.fc-scrollgrid-shrink-frame');
  let contentWidthEl = cellEl.querySelector('.fc-scrollgrid-shrink-cushion');
  if (!allWidthEl) {
    throw new Error('needs fc-scrollgrid-shrink-frame className'); // TODO: use const
  }

  if (!contentWidthEl) {
    throw new Error('needs fc-scrollgrid-shrink-cushion className');
  }
  return cellEl.getBoundingClientRect().width - allWidthEl.getBoundingClientRect().width +
  // the cell padding+border
  contentWidthEl.getBoundingClientRect().width;
}
const INTERNAL_UNITS = ['years', 'months', 'days', 'milliseconds'];
const PARSE_RE = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
// Parsing and Creation
function createDuration(input, unit) {
  if (typeof input === 'string') {
    return parseString(input);
  }
  if (typeof input === 'object' && input) {
    // non-null object
    return parseObject(input);
  }
  if (typeof input === 'number') {
    return parseObject({
      [unit || 'milliseconds']: input
    });
  }
  return null;
}
function parseString(s) {
  let m = PARSE_RE.exec(s);
  if (m) {
    let sign = m[1] ? -1 : 1;
    return {
      years: 0,
      months: 0,
      days: sign * (m[2] ? parseInt(m[2], 10) : 0),
      milliseconds: sign * ((m[3] ? parseInt(m[3], 10) : 0) * 60 * 60 * 1000 +
      // hours
      (m[4] ? parseInt(m[4], 10) : 0) * 60 * 1000 +
      // minutes
      (m[5] ? parseInt(m[5], 10) : 0) * 1000 + (
      // seconds
      m[6] ? parseInt(m[6], 10) : 0) // ms
      )
    };
  }

  return null;
}
function parseObject(obj) {
  let duration = {
    years: obj.years || obj.year || 0,
    months: obj.months || obj.month || 0,
    days: obj.days || obj.day || 0,
    milliseconds: (obj.hours || obj.hour || 0) * 60 * 60 * 1000 +
    // hours
    (obj.minutes || obj.minute || 0) * 60 * 1000 +
    // minutes
    (obj.seconds || obj.second || 0) * 1000 + (
    // seconds
    obj.milliseconds || obj.millisecond || obj.ms || 0) // ms
  };

  let weeks = obj.weeks || obj.week;
  if (weeks) {
    duration.days += weeks * 7;
    duration.specifiedWeeks = true;
  }
  return duration;
}
// Equality
function durationsEqual(d0, d1) {
  return d0.years === d1.years && d0.months === d1.months && d0.days === d1.days && d0.milliseconds === d1.milliseconds;
}
function asCleanDays(dur) {
  if (!dur.years && !dur.months && !dur.milliseconds) {
    return dur.days;
  }
  return 0;
}
// Simple Math
function addDurations(d0, d1) {
  return {
    years: d0.years + d1.years,
    months: d0.months + d1.months,
    days: d0.days + d1.days,
    milliseconds: d0.milliseconds + d1.milliseconds
  };
}
function subtractDurations(d1, d0) {
  return {
    years: d1.years - d0.years,
    months: d1.months - d0.months,
    days: d1.days - d0.days,
    milliseconds: d1.milliseconds - d0.milliseconds
  };
}
function multiplyDuration(d, n) {
  return {
    years: d.years * n,
    months: d.months * n,
    days: d.days * n,
    milliseconds: d.milliseconds * n
  };
}
// Conversions
// "Rough" because they are based on average-case Gregorian months/years
function asRoughYears(dur) {
  return asRoughDays(dur) / 365;
}
function asRoughMonths(dur) {
  return asRoughDays(dur) / 30;
}
function asRoughDays(dur) {
  return asRoughMs(dur) / 864e5;
}
function asRoughMinutes(dur) {
  return asRoughMs(dur) / (1000 * 60);
}
function asRoughSeconds(dur) {
  return asRoughMs(dur) / 1000;
}
function asRoughMs(dur) {
  return dur.years * (365 * 864e5) + dur.months * (30 * 864e5) + dur.days * 864e5 + dur.milliseconds;
}
// Advanced Math
function wholeDivideDurations(numerator, denominator) {
  let res = null;
  for (let i = 0; i < INTERNAL_UNITS.length; i += 1) {
    let unit = INTERNAL_UNITS[i];
    if (denominator[unit]) {
      let localRes = numerator[unit] / denominator[unit];
      if (!isInt(localRes) || res !== null && res !== localRes) {
        return null;
      }
      res = localRes;
    } else if (numerator[unit]) {
      // needs to divide by something but can't!
      return null;
    }
  }
  return res;
}
function greatestDurationDenominator(dur) {
  let ms = dur.milliseconds;
  if (ms) {
    if (ms % 1000 !== 0) {
      return {
        unit: 'millisecond',
        value: ms
      };
    }
    if (ms % (1000 * 60) !== 0) {
      return {
        unit: 'second',
        value: ms / 1000
      };
    }
    if (ms % (1000 * 60 * 60) !== 0) {
      return {
        unit: 'minute',
        value: ms / (1000 * 60)
      };
    }
    if (ms) {
      return {
        unit: 'hour',
        value: ms / (1000 * 60 * 60)
      };
    }
  }
  if (dur.days) {
    if (dur.specifiedWeeks && dur.days % 7 === 0) {
      return {
        unit: 'week',
        value: dur.days / 7
      };
    }
    return {
      unit: 'day',
      value: dur.days
    };
  }
  if (dur.months) {
    return {
      unit: 'month',
      value: dur.months
    };
  }
  if (dur.years) {
    return {
      unit: 'year',
      value: dur.years
    };
  }
  return {
    unit: 'millisecond',
    value: 0
  };
}
const {
  hasOwnProperty
} = Object.prototype;
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
function mergeProps(propObjs, complexPropsMap) {
  let dest = {};
  if (complexPropsMap) {
    for (let name in complexPropsMap) {
      if (complexPropsMap[name] === isMaybeObjectsEqual) {
        // implies that it's object-mergeable
        let complexObjs = [];
        // collect the trailing object values, stopping when a non-object is discovered
        for (let i = propObjs.length - 1; i >= 0; i -= 1) {
          let val = propObjs[i][name];
          if (typeof val === 'object' && val) {
            // non-null object
            complexObjs.unshift(val);
          } else if (val !== undefined) {
            dest[name] = val; // if there were no objects, this value will be used
            break;
          }
        }
        // if the trailing values were objects, use the merged value
        if (complexObjs.length) {
          dest[name] = mergeProps(complexObjs);
        }
      }
    }
  }
  // copy values into the destination, going from last to first
  for (let i = propObjs.length - 1; i >= 0; i -= 1) {
    let props = propObjs[i];
    for (let name in props) {
      if (!(name in dest)) {
        // if already assigned by previous props or complex props, don't reassign
        dest[name] = props[name];
      }
    }
  }
  return dest;
}
function filterHash(hash, func) {
  let filtered = {};
  for (let key in hash) {
    if (func(hash[key], key)) {
      filtered[key] = hash[key];
    }
  }
  return filtered;
}
function mapHash(hash, func) {
  let newHash = {};
  for (let key in hash) {
    newHash[key] = func(hash[key], key);
  }
  return newHash;
}
function arrayToHash(a) {
  let hash = {};
  for (let item of a) {
    hash[item] = true;
  }
  return hash;
}
// TODO: reassess browser support
// https://caniuse.com/?search=object.values
function hashValuesToArray(obj) {
  let a = [];
  for (let key in obj) {
    a.push(obj[key]);
  }
  return a;
}
function isPropsEqual(obj0, obj1) {
  if (obj0 === obj1) {
    return true;
  }
  for (let key in obj0) {
    if (hasOwnProperty.call(obj0, key)) {
      if (!(key in obj1)) {
        return false;
      }
    }
  }
  for (let key in obj1) {
    if (hasOwnProperty.call(obj1, key)) {
      if (obj0[key] !== obj1[key]) {
        return false;
      }
    }
  }
  return true;
}
const HANDLER_RE = /^on[A-Z]/;
function isNonHandlerPropsEqual(obj0, obj1) {
  const keys = getUnequalProps(obj0, obj1);
  for (let key of keys) {
    if (!HANDLER_RE.test(key)) {
      return false;
    }
  }
  return true;
}
function getUnequalProps(obj0, obj1) {
  let keys = [];
  for (let key in obj0) {
    if (hasOwnProperty.call(obj0, key)) {
      if (!(key in obj1)) {
        keys.push(key);
      }
    }
  }
  for (let key in obj1) {
    if (hasOwnProperty.call(obj1, key)) {
      if (obj0[key] !== obj1[key]) {
        keys.push(key);
      }
    }
  }
  return keys;
}
function compareObjs(oldProps, newProps, equalityFuncs = {}) {
  if (oldProps === newProps) {
    return true;
  }
  for (let key in newProps) {
    if (key in oldProps && isObjValsEqual(oldProps[key], newProps[key], equalityFuncs[key])) ;else {
      return false;
    }
  }
  // check for props that were omitted in the new
  for (let key in oldProps) {
    if (!(key in newProps)) {
      return false;
    }
  }
  return true;
}
/*
assumed "true" equality for handler names like "onReceiveSomething"
*/
function isObjValsEqual(val0, val1, comparator) {
  if (val0 === val1 || comparator === true) {
    return true;
  }
  if (comparator) {
    return comparator(val0, val1);
  }
  return false;
}
function collectFromHash(hash, startIndex = 0, endIndex, step = 1) {
  let res = [];
  if (endIndex == null) {
    endIndex = Object.keys(hash).length;
  }
  for (let i = startIndex; i < endIndex; i += step) {
    let val = hash[i];
    if (val !== undefined) {
      // will disregard undefined for sparse arrays
      res.push(val);
    }
  }
  return res;
}

// TODO: new util arrayify?
function removeExact(array, exactVal) {
  let removeCnt = 0;
  let i = 0;
  while (i < array.length) {
    if (array[i] === exactVal) {
      array.splice(i, 1);
      removeCnt += 1;
    } else {
      i += 1;
    }
  }
  return removeCnt;
}
function isArraysEqual(a0, a1, equalityFunc) {
  if (a0 === a1) {
    return true;
  }
  let len = a0.length;
  let i;
  if (len !== a1.length) {
    // not array? or not same length?
    return false;
  }
  for (i = 0; i < len; i += 1) {
    if (!(equalityFunc ? equalityFunc(a0[i], a1[i]) : a0[i] === a1[i])) {
      return false;
    }
  }
  return true;
}
const DAY_IDS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// Adding
function addWeeks(m, n) {
  let a = dateToUtcArray(m);
  a[2] += n * 7;
  return arrayToUtcDate(a);
}
function addDays(m, n) {
  let a = dateToUtcArray(m);
  a[2] += n;
  return arrayToUtcDate(a);
}
function addMs(m, n) {
  let a = dateToUtcArray(m);
  a[6] += n;
  return arrayToUtcDate(a);
}
// Diffing (all return floats)
// TODO: why not use ranges?
function diffWeeks(m0, m1) {
  return diffDays(m0, m1) / 7;
}
function diffDays(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60 * 24);
}
function diffHours(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / (1000 * 60 * 60);
}
function diffMinutes(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / (1000 * 60);
}
function diffSeconds(m0, m1) {
  return (m1.valueOf() - m0.valueOf()) / 1000;
}
function diffDayAndTime(m0, m1) {
  let m0day = startOfDay(m0);
  let m1day = startOfDay(m1);
  return {
    years: 0,
    months: 0,
    days: Math.round(diffDays(m0day, m1day)),
    milliseconds: m1.valueOf() - m1day.valueOf() - (m0.valueOf() - m0day.valueOf())
  };
}
// Diffing Whole Units
function diffWholeWeeks(m0, m1) {
  let d = diffWholeDays(m0, m1);
  if (d !== null && d % 7 === 0) {
    return d / 7;
  }
  return null;
}
function diffWholeDays(m0, m1) {
  if (timeAsMs(m0) === timeAsMs(m1)) {
    return Math.round(diffDays(m0, m1));
  }
  return null;
}
// Start-Of
function startOfDay(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate()]);
}
function startOfHour(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate(), m.getUTCHours()]);
}
function startOfMinute(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate(), m.getUTCHours(), m.getUTCMinutes()]);
}
function startOfSecond(m) {
  return arrayToUtcDate([m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate(), m.getUTCHours(), m.getUTCMinutes(), m.getUTCSeconds()]);
}
// Week Computation
function weekOfYear(marker, dow, doy) {
  let y = marker.getUTCFullYear();
  let w = weekOfGivenYear(marker, y, dow, doy);
  if (w < 1) {
    return weekOfGivenYear(marker, y - 1, dow, doy);
  }
  let nextW = weekOfGivenYear(marker, y + 1, dow, doy);
  if (nextW >= 1) {
    return Math.min(w, nextW);
  }
  return w;
}
function weekOfGivenYear(marker, year, dow, doy) {
  let firstWeekStart = arrayToUtcDate([year, 0, 1 + firstWeekOffset(year, dow, doy)]);
  let dayStart = startOfDay(marker);
  let days = Math.round(diffDays(firstWeekStart, dayStart));
  return Math.floor(days / 7) + 1; // zero-indexed
}
// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
  // first-week day -- which january is always in the first week (4 for iso, 1 for other)
  let fwd = 7 + dow - doy;
  // first-week day local weekday -- which local weekday is fwd
  let fwdlw = (7 + arrayToUtcDate([year, 0, fwd]).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
// Array Conversion
function dateToLocalArray(date) {
  return [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];
}
function arrayToLocalDate(a) {
  return new Date(a[0], a[1] || 0, a[2] == null ? 1 : a[2],
  // day of month
  a[3] || 0, a[4] || 0, a[5] || 0);
}
function dateToUtcArray(date) {
  return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()];
}
function arrayToUtcDate(a) {
  // according to web standards (and Safari), a month index is required.
  // massage if only given a year.
  if (a.length === 1) {
    a = a.concat([0]);
  }
  return new Date(Date.UTC(...a));
}
// Other Utils
function isValidDate(m) {
  return !isNaN(m.valueOf());
}
function timeAsMs(m) {
  return m.getUTCHours() * 1000 * 60 * 60 + m.getUTCMinutes() * 1000 * 60 + m.getUTCSeconds() * 1000 + m.getUTCMilliseconds();
}

// timeZoneOffset is in minutes
function buildIsoString(marker, timeZoneOffset, stripZeroTime = false) {
  let s = marker.toISOString();
  s = s.replace('.000', '');
  if (stripZeroTime) {
    s = s.replace('T00:00:00Z', '');
  }
  if (s.length > 10) {
    // time part wasn't stripped, can add timezone info
    if (timeZoneOffset == null) {
      s = s.replace('Z', '');
    } else if (timeZoneOffset !== 0) {
      s = s.replace('Z', formatTimeZoneOffset(timeZoneOffset, true));
    }
    // otherwise, its UTC-0 and we want to keep the Z
  }

  return s;
}
// formats the date, but with no time part
// TODO: somehow merge with buildIsoString and stripZeroTime
// TODO: rename. omit "string"
function formatDayString(marker) {
  return marker.toISOString().replace(/T.*$/, '');
}
function formatIsoMonthStr(marker) {
  return marker.toISOString().match(/^\d{4}-\d{2}/)[0];
}
// TODO: use Date::toISOString and use everything after the T?
function formatIsoTimeString(marker) {
  return padStart(marker.getUTCHours(), 2) + ':' + padStart(marker.getUTCMinutes(), 2) + ':' + padStart(marker.getUTCSeconds(), 2);
}
function formatTimeZoneOffset(minutes, doIso = false) {
  let sign = minutes < 0 ? '-' : '+';
  let abs = Math.abs(minutes);
  let hours = Math.floor(abs / 60);
  let mins = Math.round(abs % 60);
  if (doIso) {
    return `${sign + padStart(hours, 2)}:${padStart(mins, 2)}`;
  }
  return `GMT${sign}${hours}${mins ? `:${padStart(mins, 2)}` : ''}`;
}
function memoize(workerFunc, resEquality, teardownFunc) {
  let currentArgs;
  let currentRes;
  return function (...newArgs) {
    if (!currentArgs) {
      currentRes = workerFunc.apply(this, newArgs);
    } else if (!isArraysEqual(currentArgs, newArgs)) {
      if (teardownFunc) {
        teardownFunc(currentRes);
      }
      let res = workerFunc.apply(this, newArgs);
      if (!resEquality || !resEquality(res, currentRes)) {
        currentRes = res;
      }
    }
    currentArgs = newArgs;
    return currentRes;
  };
}
function memoizeObjArg(workerFunc, resEquality, teardownFunc) {
  let currentArg;
  let currentRes;
  return newArg => {
    if (!currentArg) {
      currentRes = workerFunc.call(this, newArg);
    } else if (!isPropsEqual(currentArg, newArg)) {
      if (teardownFunc) {
        teardownFunc(currentRes);
      }
      let res = workerFunc.call(this, newArg);
      if (!resEquality || !resEquality(res, currentRes)) {
        currentRes = res;
      }
    }
    currentArg = newArg;
    return currentRes;
  };
}
function memoizeArraylike(
// used at all?
workerFunc, resEquality, teardownFunc) {
  let currentArgSets = [];
  let currentResults = [];
  return newArgSets => {
    let currentLen = currentArgSets.length;
    let newLen = newArgSets.length;
    let i = 0;
    for (; i < currentLen; i += 1) {
      if (!newArgSets[i]) {
        // one of the old sets no longer exists
        if (teardownFunc) {
          teardownFunc(currentResults[i]);
        }
      } else if (!isArraysEqual(currentArgSets[i], newArgSets[i])) {
        if (teardownFunc) {
          teardownFunc(currentResults[i]);
        }
        let res = workerFunc.apply(this, newArgSets[i]);
        if (!resEquality || !resEquality(res, currentResults[i])) {
          currentResults[i] = res;
        }
      }
    }
    for (; i < newLen; i += 1) {
      currentResults[i] = workerFunc.apply(this, newArgSets[i]);
    }
    currentArgSets = newArgSets;
    currentResults.splice(newLen); // remove excess
    return currentResults;
  };
}
function memoizeHashlike(workerFunc, resEquality, teardownFunc) {
  let currentArgHash = {};
  let currentResHash = {};
  return newArgHash => {
    let newResHash = {};
    for (let key in newArgHash) {
      if (!currentResHash[key]) {
        newResHash[key] = workerFunc.apply(this, newArgHash[key]);
      } else if (!isArraysEqual(currentArgHash[key], newArgHash[key])) {
        if (teardownFunc) {
          teardownFunc(currentResHash[key]);
        }
        let res = workerFunc.apply(this, newArgHash[key]);
        newResHash[key] = resEquality && resEquality(res, currentResHash[key]) ? currentResHash[key] : res;
      } else {
        newResHash[key] = currentResHash[key];
      }
    }
    currentArgHash = newArgHash;
    currentResHash = newResHash;
    return newResHash;
  };
}
const EXTENDED_SETTINGS_AND_SEVERITIES = {
  week: 3,
  separator: 0,
  omitZeroMinute: 0,
  meridiem: 0,
  omitCommas: 0
};
const STANDARD_DATE_PROP_SEVERITIES = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
};
const MERIDIEM_RE = /\s*([ap])\.?m\.?/i; // eats up leading spaces too
const COMMA_RE = /,/g; // we need re for globalness
const MULTI_SPACE_RE = /\s+/g;
const LTR_RE = /\u200e/g; // control character
const UTC_RE = /UTC|GMT/;
class NativeFormatter {
  constructor(formatSettings) {
    let standardDateProps = {};
    let extendedSettings = {};
    let severity = 0;
    for (let name in formatSettings) {
      if (name in EXTENDED_SETTINGS_AND_SEVERITIES) {
        extendedSettings[name] = formatSettings[name];
        severity = Math.max(EXTENDED_SETTINGS_AND_SEVERITIES[name], severity);
      } else {
        standardDateProps[name] = formatSettings[name];
        if (name in STANDARD_DATE_PROP_SEVERITIES) {
          // TODO: what about hour12? no severity
          severity = Math.max(STANDARD_DATE_PROP_SEVERITIES[name], severity);
        }
      }
    }
    this.standardDateProps = standardDateProps;
    this.extendedSettings = extendedSettings;
    this.severity = severity;
    this.buildFormattingFunc = memoize(buildFormattingFunc);
  }
  format(date, context) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, context)(date);
  }
  formatRange(start, end, context, betterDefaultSeparator) {
    let {
      standardDateProps,
      extendedSettings
    } = this;
    let diffSeverity = computeMarkerDiffSeverity(start.marker, end.marker, context.calendarSystem);
    if (!diffSeverity) {
      return this.format(start, context);
    }
    let biggestUnitForPartial = diffSeverity;
    if (biggestUnitForPartial > 1 && (
    // the two dates are different in a way that's larger scale than time
    standardDateProps.year === 'numeric' || standardDateProps.year === '2-digit') && (standardDateProps.month === 'numeric' || standardDateProps.month === '2-digit') && (standardDateProps.day === 'numeric' || standardDateProps.day === '2-digit')) {
      biggestUnitForPartial = 1; // make it look like the dates are only different in terms of time
    }

    let full0 = this.format(start, context);
    let full1 = this.format(end, context);
    if (full0 === full1) {
      return full0;
    }
    let partialDateProps = computePartialFormattingOptions(standardDateProps, biggestUnitForPartial);
    let partialFormattingFunc = buildFormattingFunc(partialDateProps, extendedSettings, context);
    let partial0 = partialFormattingFunc(start);
    let partial1 = partialFormattingFunc(end);
    let insertion = findCommonInsertion(full0, partial0, full1, partial1);
    let separator = extendedSettings.separator || betterDefaultSeparator || context.defaultSeparator || '';
    if (insertion) {
      return insertion.before + partial0 + separator + partial1 + insertion.after;
    }
    return full0 + separator + full1;
  }
  getLargestUnit() {
    switch (this.severity) {
      case 7:
      case 6:
      case 5:
        return 'year';
      case 4:
        return 'month';
      case 3:
        return 'week';
      case 2:
        return 'day';
      default:
        return 'time';
      // really?
    }
  }
}

function buildFormattingFunc(standardDateProps, extendedSettings, context) {
  let standardDatePropCnt = Object.keys(standardDateProps).length;
  if (standardDatePropCnt === 1 && standardDateProps.timeZoneName === 'short') {
    return date => formatTimeZoneOffset(date.timeZoneOffset);
  }
  if (standardDatePropCnt === 0 && extendedSettings.week) {
    return date => formatWeekNumber(context.computeWeekNumber(date.marker), context.weekText, context.weekTextLong, context.locale, extendedSettings.week);
  }
  return buildNativeFormattingFunc(standardDateProps, extendedSettings, context);
}
function buildNativeFormattingFunc(standardDateProps, extendedSettings, context) {
  standardDateProps = Object.assign({}, standardDateProps); // copy
  extendedSettings = Object.assign({}, extendedSettings); // copy
  sanitizeSettings(standardDateProps, extendedSettings);
  standardDateProps.timeZone = 'UTC'; // we leverage the only guaranteed timeZone for our UTC markers
  let normalFormat = new Intl.DateTimeFormat(context.locale.codes, standardDateProps);
  let zeroFormat; // needed?
  if (extendedSettings.omitZeroMinute) {
    let zeroProps = Object.assign({}, standardDateProps);
    delete zeroProps.minute; // seconds and ms were already considered in sanitizeSettings
    zeroFormat = new Intl.DateTimeFormat(context.locale.codes, zeroProps);
  }
  return date => {
    let {
      marker
    } = date;
    let format;
    if (zeroFormat && !marker.getUTCMinutes()) {
      format = zeroFormat;
    } else {
      format = normalFormat;
    }
    let s = format.format(marker);
    return postProcess(s, date, standardDateProps, extendedSettings, context);
  };
}
function sanitizeSettings(standardDateProps, extendedSettings) {
  // deal with a browser inconsistency where formatting the timezone
  // requires that the hour/minute be present.
  if (standardDateProps.timeZoneName) {
    if (!standardDateProps.hour) {
      standardDateProps.hour = '2-digit';
    }
    if (!standardDateProps.minute) {
      standardDateProps.minute = '2-digit';
    }
  }
  // only support short timezone names
  if (standardDateProps.timeZoneName === 'long') {
    standardDateProps.timeZoneName = 'short';
  }
  // if requesting to display seconds, MUST display minutes
  if (extendedSettings.omitZeroMinute && (standardDateProps.second || standardDateProps.millisecond)) {
    delete extendedSettings.omitZeroMinute;
  }
}
function postProcess(s, date, standardDateProps, extendedSettings, context) {
  s = s.replace(LTR_RE, ''); // remove left-to-right control chars. do first. good for other regexes
  if (standardDateProps.timeZoneName === 'short') {
    s = injectTzoStr(s, context.timeZone === 'UTC' || date.timeZoneOffset == null ? 'UTC' :
    // important to normalize for IE, which does "GMT"
    formatTimeZoneOffset(date.timeZoneOffset));
  }
  if (extendedSettings.omitCommas) {
    s = s.replace(COMMA_RE, '').trim();
  }
  if (extendedSettings.omitZeroMinute) {
    s = s.replace(':00', ''); // zeroFormat doesn't always achieve this
  }
  // ^ do anything that might create adjacent spaces before this point,
  // because MERIDIEM_RE likes to eat up loading spaces
  if (extendedSettings.meridiem === false) {
    s = s.replace(MERIDIEM_RE, '').trim();
  } else if (extendedSettings.meridiem === 'narrow') {
    // a/p
    s = s.replace(MERIDIEM_RE, (m0, m1) => m1.toLocaleLowerCase());
  } else if (extendedSettings.meridiem === 'short') {
    // am/pm
    s = s.replace(MERIDIEM_RE, (m0, m1) => `${m1.toLocaleLowerCase()}m`);
  } else if (extendedSettings.meridiem === 'lowercase') {
    // other meridiem transformers already converted to lowercase
    s = s.replace(MERIDIEM_RE, m0 => m0.toLocaleLowerCase());
  }
  s = s.replace(MULTI_SPACE_RE, ' ');
  s = s.trim();
  return s;
}
function injectTzoStr(s, tzoStr) {
  let replaced = false;
  s = s.replace(UTC_RE, () => {
    replaced = true;
    return tzoStr;
  });
  // IE11 doesn't include UTC/GMT in the original string, so append to end
  if (!replaced) {
    s += ` ${tzoStr}`;
  }
  return s;
}
function formatWeekNumber(num, weekText, weekTextLong, locale, display) {
  let parts = [];
  if (display === 'long') {
    parts.push(weekTextLong);
  } else if (display === 'short' || display === 'narrow') {
    parts.push(weekText);
  }
  if (display === 'long' || display === 'short') {
    parts.push(' ');
  }
  parts.push(locale.simpleNumberFormat.format(num));
  if (locale.options.direction === 'rtl') {
    // TODO: use control characters instead?
    parts.reverse();
  }
  return parts.join('');
}
// Range Formatting Utils
// 0 = exactly the same
// 1 = different by time
// and bigger
function computeMarkerDiffSeverity(d0, d1, ca) {
  if (ca.getMarkerYear(d0) !== ca.getMarkerYear(d1)) {
    return 5;
  }
  if (ca.getMarkerMonth(d0) !== ca.getMarkerMonth(d1)) {
    return 4;
  }
  if (ca.getMarkerDay(d0) !== ca.getMarkerDay(d1)) {
    return 2;
  }
  if (timeAsMs(d0) !== timeAsMs(d1)) {
    return 1;
  }
  return 0;
}
function computePartialFormattingOptions(options, biggestUnit) {
  let partialOptions = {};
  for (let name in options) {
    if (!(name in STANDARD_DATE_PROP_SEVERITIES) ||
    // not a date part prop (like timeZone)
    STANDARD_DATE_PROP_SEVERITIES[name] <= biggestUnit) {
      partialOptions[name] = options[name];
    }
  }
  return partialOptions;
}
function findCommonInsertion(full0, partial0, full1, partial1) {
  let i0 = 0;
  while (i0 < full0.length) {
    let found0 = full0.indexOf(partial0, i0);
    if (found0 === -1) {
      break;
    }
    let before0 = full0.substr(0, found0);
    i0 = found0 + partial0.length;
    let after0 = full0.substr(i0);
    let i1 = 0;
    while (i1 < full1.length) {
      let found1 = full1.indexOf(partial1, i1);
      if (found1 === -1) {
        break;
      }
      let before1 = full1.substr(0, found1);
      i1 = found1 + partial1.length;
      let after1 = full1.substr(i1);
      if (before0 === before1 && after0 === after1) {
        return {
          before: before0,
          after: after0
        };
      }
    }
  }
  return null;
}
function expandZonedMarker(dateInfo, calendarSystem) {
  let a = calendarSystem.markerToArray(dateInfo.marker);
  return {
    marker: dateInfo.marker,
    timeZoneOffset: dateInfo.timeZoneOffset,
    array: a,
    year: a[0],
    month: a[1],
    day: a[2],
    hour: a[3],
    minute: a[4],
    second: a[5],
    millisecond: a[6]
  };
}
function createVerboseFormattingArg(start, end, context, betterDefaultSeparator) {
  let startInfo = expandZonedMarker(start, context.calendarSystem);
  let endInfo = end ? expandZonedMarker(end, context.calendarSystem) : null;
  return {
    date: startInfo,
    start: startInfo,
    end: endInfo,
    timeZone: context.timeZone,
    localeCodes: context.locale.codes,
    defaultSeparator: betterDefaultSeparator || context.defaultSeparator
  };
}

/*
TODO: fix the terminology of "formatter" vs "formatting func"
*/
/*
At the time of instantiation, this object does not know which cmd-formatting system it will use.
It receives this at the time of formatting, as a setting.
*/
class CmdFormatter {
  constructor(cmdStr) {
    this.cmdStr = cmdStr;
  }
  format(date, context, betterDefaultSeparator) {
    return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(date, null, context, betterDefaultSeparator));
  }
  formatRange(start, end, context, betterDefaultSeparator) {
    return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(start, end, context, betterDefaultSeparator));
  }
}
class FuncFormatter {
  constructor(func) {
    this.func = func;
  }
  format(date, context, betterDefaultSeparator) {
    return this.func(createVerboseFormattingArg(date, null, context, betterDefaultSeparator));
  }
  formatRange(start, end, context, betterDefaultSeparator) {
    return this.func(createVerboseFormattingArg(start, end, context, betterDefaultSeparator));
  }
}
function createFormatter(input) {
  if (typeof input === 'object' && input) {
    // non-null object
    return new NativeFormatter(input);
  }
  if (typeof input === 'string') {
    return new CmdFormatter(input);
  }
  if (typeof input === 'function') {
    return new FuncFormatter(input);
  }
  return null;
}

// base options
// ------------
const BASE_OPTION_REFINERS = {
  navLinkDayClick: identity,
  navLinkWeekClick: identity,
  duration: createDuration,
  bootstrapFontAwesome: identity,
  buttonIcons: identity,
  customButtons: identity,
  defaultAllDayEventDuration: createDuration,
  defaultTimedEventDuration: createDuration,
  nextDayThreshold: createDuration,
  scrollTime: createDuration,
  scrollTimeReset: Boolean,
  slotMinTime: createDuration,
  slotMaxTime: createDuration,
  dayPopoverFormat: createFormatter,
  slotDuration: createDuration,
  snapDuration: createDuration,
  headerToolbar: identity,
  footerToolbar: identity,
  defaultRangeSeparator: String,
  titleRangeSeparator: String,
  forceEventDuration: Boolean,
  dayHeaders: Boolean,
  dayHeaderFormat: createFormatter,
  dayHeaderClassNames: identity,
  dayHeaderContent: identity,
  dayHeaderDidMount: identity,
  dayHeaderWillUnmount: identity,
  dayCellClassNames: identity,
  dayCellContent: identity,
  dayCellDidMount: identity,
  dayCellWillUnmount: identity,
  initialView: String,
  aspectRatio: Number,
  weekends: Boolean,
  weekNumberCalculation: identity,
  weekNumbers: Boolean,
  weekNumberClassNames: identity,
  weekNumberContent: identity,
  weekNumberDidMount: identity,
  weekNumberWillUnmount: identity,
  editable: Boolean,
  viewClassNames: identity,
  viewDidMount: identity,
  viewWillUnmount: identity,
  nowIndicator: Boolean,
  nowIndicatorClassNames: identity,
  nowIndicatorContent: identity,
  nowIndicatorDidMount: identity,
  nowIndicatorWillUnmount: identity,
  showNonCurrentDates: Boolean,
  lazyFetching: Boolean,
  startParam: String,
  endParam: String,
  timeZoneParam: String,
  timeZone: String,
  locales: identity,
  locale: identity,
  themeSystem: String,
  dragRevertDuration: Number,
  dragScroll: Boolean,
  allDayMaintainDuration: Boolean,
  unselectAuto: Boolean,
  dropAccept: identity,
  eventOrder: parseFieldSpecs,
  eventOrderStrict: Boolean,
  handleWindowResize: Boolean,
  windowResizeDelay: Number,
  longPressDelay: Number,
  eventDragMinDistance: Number,
  expandRows: Boolean,
  height: identity,
  contentHeight: identity,
  direction: String,
  weekNumberFormat: createFormatter,
  eventResizableFromStart: Boolean,
  displayEventTime: Boolean,
  displayEventEnd: Boolean,
  weekText: String,
  weekTextLong: String,
  progressiveEventRendering: Boolean,
  businessHours: identity,
  initialDate: identity,
  now: identity,
  eventDataTransform: identity,
  stickyHeaderDates: identity,
  stickyFooterScrollbar: identity,
  viewHeight: identity,
  defaultAllDay: Boolean,
  eventSourceFailure: identity,
  eventSourceSuccess: identity,
  eventDisplay: String,
  eventStartEditable: Boolean,
  eventDurationEditable: Boolean,
  eventOverlap: identity,
  eventConstraint: identity,
  eventAllow: identity,
  eventBackgroundColor: String,
  eventBorderColor: String,
  eventTextColor: String,
  eventColor: String,
  eventClassNames: identity,
  eventContent: identity,
  eventDidMount: identity,
  eventWillUnmount: identity,
  selectConstraint: identity,
  selectOverlap: identity,
  selectAllow: identity,
  droppable: Boolean,
  unselectCancel: String,
  slotLabelFormat: identity,
  slotLaneClassNames: identity,
  slotLaneContent: identity,
  slotLaneDidMount: identity,
  slotLaneWillUnmount: identity,
  slotLabelClassNames: identity,
  slotLabelContent: identity,
  slotLabelDidMount: identity,
  slotLabelWillUnmount: identity,
  dayMaxEvents: identity,
  dayMaxEventRows: identity,
  dayMinWidth: Number,
  slotLabelInterval: createDuration,
  allDayText: String,
  allDayClassNames: identity,
  allDayContent: identity,
  allDayDidMount: identity,
  allDayWillUnmount: identity,
  slotMinWidth: Number,
  navLinks: Boolean,
  eventTimeFormat: createFormatter,
  rerenderDelay: Number,
  moreLinkText: identity,
  moreLinkHint: identity,
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
  plugins: identity,
  firstDay: Number,
  dayCount: Number,
  dateAlignment: String,
  dateIncrement: createDuration,
  hiddenDays: identity,
  fixedWeekCount: Boolean,
  validRange: identity,
  visibleRange: identity,
  titleFormat: identity,
  eventInteractive: Boolean,
  // only used by list-view, but languages define the value, so we need it in base options
  noEventsText: String,
  viewHint: identity,
  navLinkHint: identity,
  closeHint: String,
  timeHint: String,
  eventHint: String,
  moreLinkClick: identity,
  moreLinkClassNames: identity,
  moreLinkContent: identity,
  moreLinkDidMount: identity,
  moreLinkWillUnmount: identity,
  monthStartFormat: createFormatter,
  // for connectors
  // (can't be part of plugin system b/c must be provided at runtime)
  handleCustomRendering: identity,
  customRenderingMetaMap: identity,
  customRenderingReplacesEl: Boolean
};
// do NOT give a type here. need `typeof BASE_OPTION_DEFAULTS` to give real results.
// raw values.
const BASE_OPTION_DEFAULTS = {
  eventDisplay: 'auto',
  defaultRangeSeparator: ' - ',
  titleRangeSeparator: ' \u2013 ',
  defaultTimedEventDuration: '01:00:00',
  defaultAllDayEventDuration: {
    day: 1
  },
  forceEventDuration: false,
  nextDayThreshold: '00:00:00',
  dayHeaders: true,
  initialView: '',
  aspectRatio: 1.35,
  headerToolbar: {
    start: 'title',
    center: '',
    end: 'today prev,next'
  },
  weekends: true,
  weekNumbers: false,
  weekNumberCalculation: 'local',
  editable: false,
  nowIndicator: false,
  scrollTime: '06:00:00',
  scrollTimeReset: true,
  slotMinTime: '00:00:00',
  slotMaxTime: '24:00:00',
  showNonCurrentDates: true,
  lazyFetching: true,
  startParam: 'start',
  endParam: 'end',
  timeZoneParam: 'timeZone',
  timeZone: 'local',
  locales: [],
  locale: '',
  themeSystem: 'standard',
  dragRevertDuration: 500,
  dragScroll: true,
  allDayMaintainDuration: false,
  unselectAuto: true,
  dropAccept: '*',
  eventOrder: 'start,-duration,allDay,title',
  dayPopoverFormat: {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  },
  handleWindowResize: true,
  windowResizeDelay: 100,
  longPressDelay: 1000,
  eventDragMinDistance: 5,
  expandRows: false,
  navLinks: false,
  selectable: false,
  eventMinHeight: 15,
  eventMinWidth: 30,
  eventShortHeight: 30,
  monthStartFormat: {
    month: 'long',
    day: 'numeric'
  }
};
// calendar listeners
// ------------------
const CALENDAR_LISTENER_REFINERS = {
  datesSet: identity,
  eventsSet: identity,
  eventAdd: identity,
  eventChange: identity,
  eventRemove: identity,
  windowResize: identity,
  eventClick: identity,
  eventMouseEnter: identity,
  eventMouseLeave: identity,
  select: identity,
  unselect: identity,
  loading: identity,
  // internal
  _unmount: identity,
  _beforeprint: identity,
  _afterprint: identity,
  _noEventDrop: identity,
  _noEventResize: identity,
  _resize: identity,
  _scrollRequest: identity
};
// calendar-specific options
// -------------------------
const CALENDAR_OPTION_REFINERS = {
  buttonText: identity,
  buttonHints: identity,
  views: identity,
  plugins: identity,
  initialEvents: identity,
  events: identity,
  eventSources: identity
};
const COMPLEX_OPTION_COMPARATORS = {
  headerToolbar: isMaybeObjectsEqual,
  footerToolbar: isMaybeObjectsEqual,
  buttonText: isMaybeObjectsEqual,
  buttonHints: isMaybeObjectsEqual,
  buttonIcons: isMaybeObjectsEqual,
  dateIncrement: isMaybeObjectsEqual,
  plugins: isMaybeArraysEqual,
  events: isMaybeArraysEqual,
  eventSources: isMaybeArraysEqual,
  ['resources']: isMaybeArraysEqual
};
function isMaybeObjectsEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object' && a && b) {
    // both non-null objects
    return isPropsEqual(a, b);
  }
  return a === b;
}
function isMaybeArraysEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return isArraysEqual(a, b);
  }
  return a === b;
}
// view-specific options
// ---------------------
const VIEW_OPTION_REFINERS = {
  type: String,
  component: identity,
  buttonText: String,
  buttonTextKey: String,
  dateProfileGeneratorClass: identity,
  usesMinMaxTime: Boolean,
  classNames: identity,
  content: identity,
  didMount: identity,
  willUnmount: identity
};
// util funcs
// ----------------------------------------------------------------------------------------------------
function mergeRawOptions(optionSets) {
  return mergeProps(optionSets, COMPLEX_OPTION_COMPARATORS);
}
function refineProps(input, refiners) {
  let refined = {};
  let extra = {};
  for (let propName in refiners) {
    if (propName in input) {
      refined[propName] = refiners[propName](input[propName]);
    }
  }
  for (let propName in input) {
    if (!(propName in refiners)) {
      extra[propName] = input[propName];
    }
  }
  return {
    refined,
    extra
  };
}
function identity(raw) {
  return raw;
}
function createEventInstance(defId, range, forcedStartTzo, forcedEndTzo) {
  return {
    instanceId: guid(),
    defId,
    range,
    forcedStartTzo: forcedStartTzo == null ? null : forcedStartTzo,
    forcedEndTzo: forcedEndTzo == null ? null : forcedEndTzo
  };
}
function parseRecurring(refined, defaultAllDay, dateEnv, recurringTypes) {
  for (let i = 0; i < recurringTypes.length; i += 1) {
    let parsed = recurringTypes[i].parse(refined, dateEnv);
    if (parsed) {
      let {
        allDay
      } = refined;
      if (allDay == null) {
        allDay = defaultAllDay;
        if (allDay == null) {
          allDay = parsed.allDayGuess;
          if (allDay == null) {
            allDay = false;
          }
        }
      }
      return {
        allDay,
        duration: parsed.duration,
        typeData: parsed.typeData,
        typeId: i
      };
    }
  }
  return null;
}
function expandRecurring(eventStore, framingRange, context) {
  let {
    dateEnv,
    pluginHooks,
    options
  } = context;
  let {
    defs,
    instances
  } = eventStore;
  // remove existing recurring instances
  // TODO: bad. always expand events as a second step
  instances = filterHash(instances, instance => !defs[instance.defId].recurringDef);
  for (let defId in defs) {
    let def = defs[defId];
    if (def.recurringDef) {
      let {
        duration
      } = def.recurringDef;
      if (!duration) {
        duration = def.allDay ? options.defaultAllDayEventDuration : options.defaultTimedEventDuration;
      }
      let starts = expandRecurringRanges(def, duration, framingRange, dateEnv, pluginHooks.recurringTypes);
      for (let start of starts) {
        let instance = createEventInstance(defId, {
          start,
          end: dateEnv.add(start, duration)
        });
        instances[instance.instanceId] = instance;
      }
    }
  }
  return {
    defs,
    instances
  };
}
/*
Event MUST have a recurringDef
*/
function expandRecurringRanges(eventDef, duration, framingRange, dateEnv, recurringTypes) {
  let typeDef = recurringTypes[eventDef.recurringDef.typeId];
  let markers = typeDef.expand(eventDef.recurringDef.typeData, {
    start: dateEnv.subtract(framingRange.start, duration),
    end: framingRange.end
  }, dateEnv);
  // the recurrence plugins don't guarantee that all-day events are start-of-day, so we have to
  if (eventDef.allDay) {
    markers = markers.map(startOfDay);
  }
  return markers;
}
function parseEvents(rawEvents, eventSource, context, allowOpenRange, defIdMap, instanceIdMap) {
  let eventStore = createEmptyEventStore();
  let eventRefiners = buildEventRefiners(context);
  for (let rawEvent of rawEvents) {
    let tuple = parseEvent(rawEvent, eventSource, context, allowOpenRange, eventRefiners, defIdMap, instanceIdMap);
    if (tuple) {
      eventTupleToStore(tuple, eventStore);
    }
  }
  return eventStore;
}
function eventTupleToStore(tuple, eventStore = createEmptyEventStore()) {
  eventStore.defs[tuple.def.defId] = tuple.def;
  if (tuple.instance) {
    eventStore.instances[tuple.instance.instanceId] = tuple.instance;
  }
  return eventStore;
}
// retrieves events that have the same groupId as the instance specified by `instanceId`
// or they are the same as the instance.
// why might instanceId not be in the store? an event from another calendar?
function getRelevantEvents(eventStore, instanceId) {
  let instance = eventStore.instances[instanceId];
  if (instance) {
    let def = eventStore.defs[instance.defId];
    // get events/instances with same group
    let newStore = filterEventStoreDefs(eventStore, lookDef => isEventDefsGrouped(def, lookDef));
    // add the original
    // TODO: wish we could use eventTupleToStore or something like it
    newStore.defs[def.defId] = def;
    newStore.instances[instance.instanceId] = instance;
    return newStore;
  }
  return createEmptyEventStore();
}
function isEventDefsGrouped(def0, def1) {
  return Boolean(def0.groupId && def0.groupId === def1.groupId);
}
function createEmptyEventStore() {
  return {
    defs: {},
    instances: {}
  };
}
function mergeEventStores(store0, store1) {
  return {
    defs: Object.assign(Object.assign({}, store0.defs), store1.defs),
    instances: Object.assign(Object.assign({}, store0.instances), store1.instances)
  };
}
function filterEventStoreDefs(eventStore, filterFunc) {
  let defs = filterHash(eventStore.defs, filterFunc);
  let instances = filterHash(eventStore.instances, instance => defs[instance.defId] // still exists?
  );

  return {
    defs,
    instances
  };
}
function excludeSubEventStore(master, sub) {
  let {
    defs,
    instances
  } = master;
  let filteredDefs = {};
  let filteredInstances = {};
  for (let defId in defs) {
    if (!sub.defs[defId]) {
      // not explicitly excluded
      filteredDefs[defId] = defs[defId];
    }
  }
  for (let instanceId in instances) {
    if (!sub.instances[instanceId] &&
    // not explicitly excluded
    filteredDefs[instances[instanceId].defId] // def wasn't filtered away
    ) {
      filteredInstances[instanceId] = instances[instanceId];
    }
  }
  return {
    defs: filteredDefs,
    instances: filteredInstances
  };
}
function normalizeConstraint(input, context) {
  if (Array.isArray(input)) {
    return parseEvents(input, null, context, true); // allowOpenRange=true
  }

  if (typeof input === 'object' && input) {
    // non-null object
    return parseEvents([input], null, context, true); // allowOpenRange=true
  }

  if (input != null) {
    return String(input);
  }
  return null;
}
function parseClassNames(raw) {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (typeof raw === 'string') {
    return raw.split(/\s+/);
  }
  return [];
}

// TODO: better called "EventSettings" or "EventConfig"
// TODO: move this file into structs
// TODO: separate constraint/overlap/allow, because selection uses only that, not other props
const EVENT_UI_REFINERS = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: identity,
  overlap: identity,
  allow: identity,
  className: parseClassNames,
  classNames: parseClassNames,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
};
const EMPTY_EVENT_UI = {
  display: null,
  startEditable: null,
  durationEditable: null,
  constraints: [],
  overlap: null,
  allows: [],
  backgroundColor: '',
  borderColor: '',
  textColor: '',
  classNames: []
};
function createEventUi(refined, context) {
  let constraint = normalizeConstraint(refined.constraint, context);
  return {
    display: refined.display || null,
    startEditable: refined.startEditable != null ? refined.startEditable : refined.editable,
    durationEditable: refined.durationEditable != null ? refined.durationEditable : refined.editable,
    constraints: constraint != null ? [constraint] : [],
    overlap: refined.overlap != null ? refined.overlap : null,
    allows: refined.allow != null ? [refined.allow] : [],
    backgroundColor: refined.backgroundColor || refined.color || '',
    borderColor: refined.borderColor || refined.color || '',
    textColor: refined.textColor || '',
    classNames: (refined.className || []).concat(refined.classNames || []) // join singular and plural
  };
}
// TODO: prevent against problems with <2 args!
function combineEventUis(uis) {
  return uis.reduce(combineTwoEventUis, EMPTY_EVENT_UI);
}
function combineTwoEventUis(item0, item1) {
  return {
    display: item1.display != null ? item1.display : item0.display,
    startEditable: item1.startEditable != null ? item1.startEditable : item0.startEditable,
    durationEditable: item1.durationEditable != null ? item1.durationEditable : item0.durationEditable,
    constraints: item0.constraints.concat(item1.constraints),
    overlap: typeof item1.overlap === 'boolean' ? item1.overlap : item0.overlap,
    allows: item0.allows.concat(item1.allows),
    backgroundColor: item1.backgroundColor || item0.backgroundColor,
    borderColor: item1.borderColor || item0.borderColor,
    textColor: item1.textColor || item0.textColor,
    classNames: item0.classNames.concat(item1.classNames)
  };
}
const EVENT_NON_DATE_REFINERS = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
};
const EVENT_DATE_REFINERS = {
  start: identity,
  end: identity,
  date: identity,
  allDay: Boolean
};
const EVENT_REFINERS = Object.assign(Object.assign(Object.assign({}, EVENT_NON_DATE_REFINERS), EVENT_DATE_REFINERS), {
  extendedProps: identity
});
function parseEvent(raw, eventSource, context, allowOpenRange, refiners = buildEventRefiners(context), defIdMap, instanceIdMap) {
  let {
    refined,
    extra
  } = refineEventDef(raw, context, refiners);
  let defaultAllDay = computeIsDefaultAllDay(eventSource, context);
  let recurringRes = parseRecurring(refined, defaultAllDay, context.dateEnv, context.pluginHooks.recurringTypes);
  if (recurringRes) {
    let def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : '', recurringRes.allDay, Boolean(recurringRes.duration), context, defIdMap);
    def.recurringDef = {
      typeId: recurringRes.typeId,
      typeData: recurringRes.typeData,
      duration: recurringRes.duration
    };
    return {
      def,
      instance: null
    };
  }
  let singleRes = parseSingle(refined, defaultAllDay, context, allowOpenRange);
  if (singleRes) {
    let def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : '', singleRes.allDay, singleRes.hasEnd, context, defIdMap);
    let instance = createEventInstance(def.defId, singleRes.range, singleRes.forcedStartTzo, singleRes.forcedEndTzo);
    if (instanceIdMap && def.publicId && instanceIdMap[def.publicId]) {
      instance.instanceId = instanceIdMap[def.publicId];
    }
    return {
      def,
      instance
    };
  }
  return null;
}
function refineEventDef(raw, context, refiners = buildEventRefiners(context)) {
  return refineProps(raw, refiners);
}
function buildEventRefiners(context) {
  return Object.assign(Object.assign(Object.assign({}, EVENT_UI_REFINERS), EVENT_REFINERS), context.pluginHooks.eventRefiners);
}
/*
Will NOT populate extendedProps with the leftover properties.
Will NOT populate date-related props.
*/
function parseEventDef(refined, extra, sourceId, allDay, hasEnd, context, defIdMap) {
  let def = {
    title: refined.title || '',
    groupId: refined.groupId || '',
    publicId: refined.id || '',
    url: refined.url || '',
    recurringDef: null,
    defId: (defIdMap && refined.id ? defIdMap[refined.id] : '') || guid(),
    sourceId,
    allDay,
    hasEnd,
    interactive: refined.interactive,
    ui: createEventUi(refined, context),
    extendedProps: Object.assign(Object.assign({}, refined.extendedProps || {}), extra)
  };
  for (let memberAdder of context.pluginHooks.eventDefMemberAdders) {
    Object.assign(def, memberAdder(refined));
  }
  // help out EventImpl from having user modify props
  Object.freeze(def.ui.classNames);
  Object.freeze(def.extendedProps);
  return def;
}
function parseSingle(refined, defaultAllDay, context, allowOpenRange) {
  let {
    allDay
  } = refined;
  let startMeta;
  let startMarker = null;
  let hasEnd = false;
  let endMeta;
  let endMarker = null;
  let startInput = refined.start != null ? refined.start : refined.date;
  startMeta = context.dateEnv.createMarkerMeta(startInput);
  if (startMeta) {
    startMarker = startMeta.marker;
  } else if (!allowOpenRange) {
    return null;
  }
  if (refined.end != null) {
    endMeta = context.dateEnv.createMarkerMeta(refined.end);
  }
  if (allDay == null) {
    if (defaultAllDay != null) {
      allDay = defaultAllDay;
    } else {
      // fall back to the date props LAST
      allDay = (!startMeta || startMeta.isTimeUnspecified) && (!endMeta || endMeta.isTimeUnspecified);
    }
  }
  if (allDay && startMarker) {
    startMarker = startOfDay(startMarker);
  }
  if (endMeta) {
    endMarker = endMeta.marker;
    if (allDay) {
      endMarker = startOfDay(endMarker);
    }
    if (startMarker && endMarker <= startMarker) {
      endMarker = null;
    }
  }
  if (endMarker) {
    hasEnd = true;
  } else if (!allowOpenRange) {
    hasEnd = context.options.forceEventDuration || false;
    endMarker = context.dateEnv.add(startMarker, allDay ? context.options.defaultAllDayEventDuration : context.options.defaultTimedEventDuration);
  }
  return {
    allDay,
    hasEnd,
    range: {
      start: startMarker,
      end: endMarker
    },
    forcedStartTzo: startMeta ? startMeta.forcedTzo : null,
    forcedEndTzo: endMeta ? endMeta.forcedTzo : null
  };
}
function computeIsDefaultAllDay(eventSource, context) {
  let res = null;
  if (eventSource) {
    res = eventSource.defaultAllDay;
  }
  if (res == null) {
    res = context.options.defaultAllDay;
  }
  return res;
}
const DEF_DEFAULTS = {
  startTime: '09:00',
  endTime: '17:00',
  daysOfWeek: [1, 2, 3, 4, 5],
  display: 'inverse-background',
  classNames: 'fc-non-business',
  groupId: '_businessHours' // so multiple defs get grouped
};
/*
TODO: pass around as EventDefHash!!!
*/
function parseBusinessHours(input, context) {
  return parseEvents(refineInputs(input), null, context);
}
function refineInputs(input) {
  let rawDefs;
  if (input === true) {
    rawDefs = [{}]; // will get DEF_DEFAULTS verbatim
  } else if (Array.isArray(input)) {
    // if specifying an array, every sub-definition NEEDS a day-of-week
    rawDefs = input.filter(rawDef => rawDef.daysOfWeek);
  } else if (typeof input === 'object' && input) {
    // non-null object
    rawDefs = [input];
  } else {
    // is probably false
    rawDefs = [];
  }
  rawDefs = rawDefs.map(rawDef => Object.assign(Object.assign({}, DEF_DEFAULTS), rawDef));
  return rawDefs;
}

/* Date stuff that doesn't belong in datelib core
----------------------------------------------------------------------------------------------------------------------*/
// given a timed range, computes an all-day range that has the same exact duration,
// but whose start time is aligned with the start of the day.
function computeAlignedDayRange(timedRange) {
  let dayCnt = Math.floor(diffDays(timedRange.start, timedRange.end)) || 1;
  let start = startOfDay(timedRange.start);
  let end = addDays(start, dayCnt);
  return {
    start,
    end
  };
}
// given a timed range, computes an all-day range based on how for the end date bleeds into the next day
// TODO: give nextDayThreshold a default arg
function computeVisibleDayRange(timedRange, nextDayThreshold = createDuration(0)) {
  let startDay = null;
  let endDay = null;
  if (timedRange.end) {
    endDay = startOfDay(timedRange.end);
    let endTimeMS = timedRange.end.valueOf() - endDay.valueOf(); // # of milliseconds into `endDay`
    // If the end time is actually inclusively part of the next day and is equal to or
    // beyond the next day threshold, adjust the end to be the exclusive end of `endDay`.
    // Otherwise, leaving it as inclusive will cause it to exclude `endDay`.
    if (endTimeMS && endTimeMS >= asRoughMs(nextDayThreshold)) {
      endDay = addDays(endDay, 1);
    }
  }
  if (timedRange.start) {
    startDay = startOfDay(timedRange.start); // the beginning of the day the range starts
    // If end is within `startDay` but not past nextDayThreshold, assign the default duration of one day.
    if (endDay && endDay <= startDay) {
      endDay = addDays(startDay, 1);
    }
  }
  return {
    start: startDay,
    end: endDay
  };
}
// spans from one day into another?
function isMultiDayRange(range) {
  let visibleRange = computeVisibleDayRange(range);
  return diffDays(visibleRange.start, visibleRange.end) > 1;
}
function diffDates(date0, date1, dateEnv, largeUnit) {
  if (largeUnit === 'year') {
    return createDuration(dateEnv.diffWholeYears(date0, date1), 'year');
  }
  if (largeUnit === 'month') {
    return createDuration(dateEnv.diffWholeMonths(date0, date1), 'month');
  }
  return diffDayAndTime(date0, date1); // returns a duration
}

function pointInsideRect(point, rect) {
  return point.left >= rect.left && point.left < rect.right && point.top >= rect.top && point.top < rect.bottom;
}
// Returns a new rectangle that is the intersection of the two rectangles. If they don't intersect, returns false
function intersectRects(rect1, rect2) {
  let res = {
    left: Math.max(rect1.left, rect2.left),
    right: Math.min(rect1.right, rect2.right),
    top: Math.max(rect1.top, rect2.top),
    bottom: Math.min(rect1.bottom, rect2.bottom)
  };
  if (res.left < res.right && res.top < res.bottom) {
    return res;
  }
  return false;
}
function translateRect(rect, deltaX, deltaY) {
  return {
    left: rect.left + deltaX,
    right: rect.right + deltaX,
    top: rect.top + deltaY,
    bottom: rect.bottom + deltaY
  };
}
// Returns a new point that will have been moved to reside within the given rectangle
function constrainPoint(point, rect) {
  return {
    left: Math.min(Math.max(point.left, rect.left), rect.right),
    top: Math.min(Math.max(point.top, rect.top), rect.bottom)
  };
}
// Returns a point that is the center of the given rectangle
function getRectCenter(rect) {
  return {
    left: (rect.left + rect.right) / 2,
    top: (rect.top + rect.bottom) / 2
  };
}
// Subtracts point2's coordinates from point1's coordinates, returning a delta
function diffPoints(point1, point2) {
  return {
    left: point1.left - point2.left,
    top: point1.top - point2.top
  };
}
let canVGrowWithinCell;
function getCanVGrowWithinCell() {
  if (canVGrowWithinCell == null) {
    canVGrowWithinCell = computeCanVGrowWithinCell();
  }
  return canVGrowWithinCell;
}
function computeCanVGrowWithinCell() {
  // for SSR, because this function is call immediately at top-level
  // TODO: just make this logic execute top-level, immediately, instead of doing lazily
  if (typeof document === 'undefined') {
    return true;
  }
  let el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.top = '0px';
  el.style.left = '0px';
  el.innerHTML = '<table><tr><td><div></div></td></tr></table>';
  el.querySelector('table').style.height = '100px';
  el.querySelector('div').style.height = '100%';
  document.body.appendChild(el);
  let div = el.querySelector('div');
  let possible = div.offsetHeight > 0;
  document.body.removeChild(el);
  return possible;
}
const EMPTY_EVENT_STORE = createEmptyEventStore(); // for purecomponents. TODO: keep elsewhere
class Splitter {
  constructor() {
    this.getKeysForEventDefs = memoize(this._getKeysForEventDefs);
    this.splitDateSelection = memoize(this._splitDateSpan);
    this.splitEventStore = memoize(this._splitEventStore);
    this.splitIndividualUi = memoize(this._splitIndividualUi);
    this.splitEventDrag = memoize(this._splitInteraction);
    this.splitEventResize = memoize(this._splitInteraction);
    this.eventUiBuilders = {}; // TODO: typescript protection
  }

  splitProps(props) {
    let keyInfos = this.getKeyInfo(props);
    let defKeys = this.getKeysForEventDefs(props.eventStore);
    let dateSelections = this.splitDateSelection(props.dateSelection);
    let individualUi = this.splitIndividualUi(props.eventUiBases, defKeys); // the individual *bases*
    let eventStores = this.splitEventStore(props.eventStore, defKeys);
    let eventDrags = this.splitEventDrag(props.eventDrag);
    let eventResizes = this.splitEventResize(props.eventResize);
    let splitProps = {};
    this.eventUiBuilders = mapHash(keyInfos, (info, key) => this.eventUiBuilders[key] || memoize(buildEventUiForKey));
    for (let key in keyInfos) {
      let keyInfo = keyInfos[key];
      let eventStore = eventStores[key] || EMPTY_EVENT_STORE;
      let buildEventUi = this.eventUiBuilders[key];
      splitProps[key] = {
        businessHours: keyInfo.businessHours || props.businessHours,
        dateSelection: dateSelections[key] || null,
        eventStore,
        eventUiBases: buildEventUi(props.eventUiBases[''], keyInfo.ui, individualUi[key]),
        eventSelection: eventStore.instances[props.eventSelection] ? props.eventSelection : '',
        eventDrag: eventDrags[key] || null,
        eventResize: eventResizes[key] || null
      };
    }
    return splitProps;
  }
  _splitDateSpan(dateSpan) {
    let dateSpans = {};
    if (dateSpan) {
      let keys = this.getKeysForDateSpan(dateSpan);
      for (let key of keys) {
        dateSpans[key] = dateSpan;
      }
    }
    return dateSpans;
  }
  _getKeysForEventDefs(eventStore) {
    return mapHash(eventStore.defs, eventDef => this.getKeysForEventDef(eventDef));
  }
  _splitEventStore(eventStore, defKeys) {
    let {
      defs,
      instances
    } = eventStore;
    let splitStores = {};
    for (let defId in defs) {
      for (let key of defKeys[defId]) {
        if (!splitStores[key]) {
          splitStores[key] = createEmptyEventStore();
        }
        splitStores[key].defs[defId] = defs[defId];
      }
    }
    for (let instanceId in instances) {
      let instance = instances[instanceId];
      for (let key of defKeys[instance.defId]) {
        if (splitStores[key]) {
          // must have already been created
          splitStores[key].instances[instanceId] = instance;
        }
      }
    }
    return splitStores;
  }
  _splitIndividualUi(eventUiBases, defKeys) {
    let splitHashes = {};
    for (let defId in eventUiBases) {
      if (defId) {
        // not the '' key
        for (let key of defKeys[defId]) {
          if (!splitHashes[key]) {
            splitHashes[key] = {};
          }
          splitHashes[key][defId] = eventUiBases[defId];
        }
      }
    }
    return splitHashes;
  }
  _splitInteraction(interaction) {
    let splitStates = {};
    if (interaction) {
      let affectedStores = this._splitEventStore(interaction.affectedEvents, this._getKeysForEventDefs(interaction.affectedEvents));
      // can't rely on defKeys because event data is mutated
      let mutatedKeysByDefId = this._getKeysForEventDefs(interaction.mutatedEvents);
      let mutatedStores = this._splitEventStore(interaction.mutatedEvents, mutatedKeysByDefId);
      let populate = key => {
        if (!splitStates[key]) {
          splitStates[key] = {
            affectedEvents: affectedStores[key] || EMPTY_EVENT_STORE,
            mutatedEvents: mutatedStores[key] || EMPTY_EVENT_STORE,
            isEvent: interaction.isEvent
          };
        }
      };
      for (let key in affectedStores) {
        populate(key);
      }
      for (let key in mutatedStores) {
        populate(key);
      }
    }
    return splitStates;
  }
}
function buildEventUiForKey(allUi, eventUiForKey, individualUi) {
  let baseParts = [];
  if (allUi) {
    baseParts.push(allUi);
  }
  if (eventUiForKey) {
    baseParts.push(eventUiForKey);
  }
  let stuff = {
    '': combineEventUis(baseParts)
  };
  if (individualUi) {
    Object.assign(stuff, individualUi);
  }
  return stuff;
}
function parseRange(input, dateEnv) {
  let start = null;
  let end = null;
  if (input.start) {
    start = dateEnv.createMarker(input.start);
  }
  if (input.end) {
    end = dateEnv.createMarker(input.end);
  }
  if (!start && !end) {
    return null;
  }
  if (start && end && end < start) {
    return null;
  }
  return {
    start,
    end
  };
}
// SIDE-EFFECT: will mutate ranges.
// Will return a new array result.
function invertRanges(ranges, constraintRange) {
  let invertedRanges = [];
  let {
    start
  } = constraintRange; // the end of the previous range. the start of the new range
  let i;
  let dateRange;
  // ranges need to be in order. required for our date-walking algorithm
  ranges.sort(compareRanges);
  for (i = 0; i < ranges.length; i += 1) {
    dateRange = ranges[i];
    // add the span of time before the event (if there is any)
    if (dateRange.start > start) {
      // compare millisecond time (skip any ambig logic)
      invertedRanges.push({
        start,
        end: dateRange.start
      });
    }
    if (dateRange.end > start) {
      start = dateRange.end;
    }
  }
  // add the span of time after the last event (if there is any)
  if (start < constraintRange.end) {
    // compare millisecond time (skip any ambig logic)
    invertedRanges.push({
      start,
      end: constraintRange.end
    });
  }
  return invertedRanges;
}
function compareRanges(range0, range1) {
  return range0.start.valueOf() - range1.start.valueOf(); // earlier ranges go first
}

function intersectRanges(range0, range1) {
  let {
    start,
    end
  } = range0;
  let newRange = null;
  if (range1.start !== null) {
    if (start === null) {
      start = range1.start;
    } else {
      start = new Date(Math.max(start.valueOf(), range1.start.valueOf()));
    }
  }
  if (range1.end != null) {
    if (end === null) {
      end = range1.end;
    } else {
      end = new Date(Math.min(end.valueOf(), range1.end.valueOf()));
    }
  }
  if (start === null || end === null || start < end) {
    newRange = {
      start,
      end
    };
  }
  return newRange;
}
function rangesEqual(range0, range1) {
  return (range0.start === null ? null : range0.start.valueOf()) === (range1.start === null ? null : range1.start.valueOf()) && (range0.end === null ? null : range0.end.valueOf()) === (range1.end === null ? null : range1.end.valueOf());
}
function rangesIntersect(range0, range1) {
  return (range0.end === null || range1.start === null || range0.end > range1.start) && (range0.start === null || range1.end === null || range0.start < range1.end);
}
function rangeContainsRange(outerRange, innerRange) {
  return (outerRange.start === null || innerRange.start !== null && innerRange.start >= outerRange.start) && (outerRange.end === null || innerRange.end !== null && innerRange.end <= outerRange.end);
}
function rangeContainsMarker(range, date) {
  return (range.start === null || date >= range.start) && (range.end === null || date < range.end);
}
// If the given date is not within the given range, move it inside.
// (If it's past the end, make it one millisecond before the end).
function constrainMarkerToRange(date, range) {
  if (range.start != null && date < range.start) {
    return range.start;
  }
  if (range.end != null && date >= range.end) {
    return new Date(range.end.valueOf() - 1);
  }
  return date;
}
function getDateMeta(date, todayRange, nowDate, dateProfile) {
  return {
    dow: date.getUTCDay(),
    isDisabled: Boolean(dateProfile && !rangeContainsMarker(dateProfile.activeRange, date)),
    isOther: Boolean(dateProfile && !rangeContainsMarker(dateProfile.currentRange, date)),
    isToday: Boolean(todayRange && rangeContainsMarker(todayRange, date)),
    isPast: Boolean(nowDate ? date < nowDate : todayRange ? date < todayRange.start : false),
    isFuture: Boolean(nowDate ? date > nowDate : todayRange ? date >= todayRange.end : false)
  };
}
function getDayClassNames(meta, theme) {
  let classNames = ['fc-day', `fc-day-${DAY_IDS[meta.dow]}`];
  if (meta.isDisabled) {
    classNames.push('fc-day-disabled');
  } else {
    if (meta.isToday) {
      classNames.push('fc-day-today');
      classNames.push(theme.getClass('today'));
    }
    if (meta.isPast) {
      classNames.push('fc-day-past');
    }
    if (meta.isFuture) {
      classNames.push('fc-day-future');
    }
    if (meta.isOther) {
      classNames.push('fc-day-other');
    }
  }
  return classNames;
}
function getSlotClassNames(meta, theme) {
  let classNames = ['fc-slot', `fc-slot-${DAY_IDS[meta.dow]}`];
  if (meta.isDisabled) {
    classNames.push('fc-slot-disabled');
  } else {
    if (meta.isToday) {
      classNames.push('fc-slot-today');
      classNames.push(theme.getClass('today'));
    }
    if (meta.isPast) {
      classNames.push('fc-slot-past');
    }
    if (meta.isFuture) {
      classNames.push('fc-slot-future');
    }
  }
  return classNames;
}
const DAY_FORMAT = createFormatter({
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const WEEK_FORMAT = createFormatter({
  week: 'long'
});
function buildNavLinkAttrs(context, dateMarker, viewType = 'day', isTabbable = true) {
  const {
    dateEnv,
    options,
    calendarApi
  } = context;
  let dateStr = dateEnv.format(dateMarker, viewType === 'week' ? WEEK_FORMAT : DAY_FORMAT);
  if (options.navLinks) {
    let zonedDate = dateEnv.toDate(dateMarker);
    const handleInteraction = ev => {
      let customAction = viewType === 'day' ? options.navLinkDayClick : viewType === 'week' ? options.navLinkWeekClick : null;
      if (typeof customAction === 'function') {
        customAction.call(calendarApi, dateEnv.toDate(dateMarker), ev);
      } else {
        if (typeof customAction === 'string') {
          viewType = customAction;
        }
        calendarApi.zoomTo(dateMarker, viewType);
      }
    };
    return Object.assign({
      title: formatWithOrdinals(options.navLinkHint, [dateStr, zonedDate], dateStr),
      'data-navlink': ''
    }, isTabbable ? createAriaClickAttrs(handleInteraction) : {
      onClick: handleInteraction
    });
  }
  return {
    'aria-label': dateStr
  };
}
let _isRtlScrollbarOnLeft = null;
function getIsRtlScrollbarOnLeft() {
  if (_isRtlScrollbarOnLeft === null) {
    _isRtlScrollbarOnLeft = computeIsRtlScrollbarOnLeft();
  }
  return _isRtlScrollbarOnLeft;
}
function computeIsRtlScrollbarOnLeft() {
  let outerEl = document.createElement('div');
  applyStyle(outerEl, {
    position: 'absolute',
    top: -1000,
    left: 0,
    border: 0,
    padding: 0,
    overflow: 'scroll',
    direction: 'rtl'
  });
  outerEl.innerHTML = '<div></div>';
  document.body.appendChild(outerEl);
  let innerEl = outerEl.firstChild;
  let res = innerEl.getBoundingClientRect().left > outerEl.getBoundingClientRect().left;
  removeElement(outerEl);
  return res;
}
let _scrollbarWidths;
function getScrollbarWidths() {
  if (!_scrollbarWidths) {
    _scrollbarWidths = computeScrollbarWidths();
  }
  return _scrollbarWidths;
}
function computeScrollbarWidths() {
  let el = document.createElement('div');
  el.style.overflow = 'scroll';
  el.style.position = 'absolute';
  el.style.top = '-9999px';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  let res = computeScrollbarWidthsForEl(el);
  document.body.removeChild(el);
  return res;
}
// WARNING: will include border
function computeScrollbarWidthsForEl(el) {
  return {
    x: el.offsetHeight - el.clientHeight,
    y: el.offsetWidth - el.clientWidth
  };
}
function computeEdges(el, getPadding = false) {
  let computedStyle = window.getComputedStyle(el);
  let borderLeft = parseInt(computedStyle.borderLeftWidth, 10) || 0;
  let borderRight = parseInt(computedStyle.borderRightWidth, 10) || 0;
  let borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
  let borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
  let badScrollbarWidths = computeScrollbarWidthsForEl(el); // includes border!
  let scrollbarLeftRight = badScrollbarWidths.y - borderLeft - borderRight;
  let scrollbarBottom = badScrollbarWidths.x - borderTop - borderBottom;
  let res = {
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    scrollbarBottom,
    scrollbarLeft: 0,
    scrollbarRight: 0
  };
  if (getIsRtlScrollbarOnLeft() && computedStyle.direction === 'rtl') {
    // is the scrollbar on the left side?
    res.scrollbarLeft = scrollbarLeftRight;
  } else {
    res.scrollbarRight = scrollbarLeftRight;
  }
  if (getPadding) {
    res.paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
    res.paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
    res.paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
    res.paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
  }
  return res;
}
function computeInnerRect(el, goWithinPadding = false, doFromWindowViewport) {
  let outerRect = doFromWindowViewport ? el.getBoundingClientRect() : computeRect(el);
  let edges = computeEdges(el, goWithinPadding);
  let res = {
    left: outerRect.left + edges.borderLeft + edges.scrollbarLeft,
    right: outerRect.right - edges.borderRight - edges.scrollbarRight,
    top: outerRect.top + edges.borderTop,
    bottom: outerRect.bottom - edges.borderBottom - edges.scrollbarBottom
  };
  if (goWithinPadding) {
    res.left += edges.paddingLeft;
    res.right -= edges.paddingRight;
    res.top += edges.paddingTop;
    res.bottom -= edges.paddingBottom;
  }
  return res;
}
function computeRect(el) {
  let rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset
  };
}
function computeClippedClientRect(el) {
  let clippingParents = getClippingParents(el);
  let rect = el.getBoundingClientRect();
  for (let clippingParent of clippingParents) {
    let intersection = intersectRects(rect, clippingParent.getBoundingClientRect());
    if (intersection) {
      rect = intersection;
    } else {
      return null;
    }
  }
  return rect;
}
// does not return window
function getClippingParents(el) {
  let parents = [];
  while (el instanceof HTMLElement) {
    // will stop when gets to document or null
    let computedStyle = window.getComputedStyle(el);
    if (computedStyle.position === 'fixed') {
      break;
    }
    if (/(auto|scroll)/.test(computedStyle.overflow + computedStyle.overflowY + computedStyle.overflowX)) {
      parents.push(el);
    }
    el = el.parentNode;
  }
  return parents;
}

/*
given a function that resolves a result asynchronously.
the function can either call passed-in success and failure callbacks,
or it can return a promise.
if you need to pass additional params to func, bind them first.
*/
function unpromisify(func, normalizedSuccessCallback, normalizedFailureCallback) {
  // guard against success/failure callbacks being called more than once
  // and guard against a promise AND callback being used together.
  let isResolved = false;
  let wrappedSuccess = function (res) {
    if (!isResolved) {
      isResolved = true;
      normalizedSuccessCallback(res);
    }
  };
  let wrappedFailure = function (error) {
    if (!isResolved) {
      isResolved = true;
      normalizedFailureCallback(error);
    }
  };
  let res = func(wrappedSuccess, wrappedFailure);
  if (res && typeof res.then === 'function') {
    res.then(wrappedSuccess, wrappedFailure);
  }
}
class Emitter {
  constructor() {
    this.handlers = {};
    this.thisContext = null;
  }
  setThisContext(thisContext) {
    this.thisContext = thisContext;
  }
  setOptions(options) {
    this.options = options;
  }
  on(type, handler) {
    addToHash(this.handlers, type, handler);
  }
  off(type, handler) {
    removeFromHash(this.handlers, type, handler);
  }
  trigger(type, ...args) {
    let attachedHandlers = this.handlers[type] || [];
    let optionHandler = this.options && this.options[type];
    let handlers = [].concat(optionHandler || [], attachedHandlers);
    for (let handler of handlers) {
      handler.apply(this.thisContext, args);
    }
  }
  hasHandlers(type) {
    return Boolean(this.handlers[type] && this.handlers[type].length || this.options && this.options[type]);
  }
}
function addToHash(hash, type, handler) {
  (hash[type] || (hash[type] = [])).push(handler);
}
function removeFromHash(hash, type, handler) {
  if (handler) {
    if (hash[type]) {
      hash[type] = hash[type].filter(func => func !== handler);
    }
  } else {
    delete hash[type]; // remove all handler funcs for this type
  }
}

/*
Records offset information for a set of elements, relative to an origin element.
Can record the left/right OR the top/bottom OR both.
Provides methods for querying the cache by position.
*/
class PositionCache {
  constructor(originEl, els, isHorizontal, isVertical) {
    this.els = els;
    let originClientRect = this.originClientRect = originEl.getBoundingClientRect(); // relative to viewport top-left
    if (isHorizontal) {
      this.buildElHorizontals(originClientRect.left);
    }
    if (isVertical) {
      this.buildElVerticals(originClientRect.top);
    }
  }
  // Populates the left/right internal coordinate arrays
  buildElHorizontals(originClientLeft) {
    let lefts = [];
    let rights = [];
    for (let el of this.els) {
      let rect = el.getBoundingClientRect();
      lefts.push(rect.left - originClientLeft);
      rights.push(rect.right - originClientLeft);
    }
    this.lefts = lefts;
    this.rights = rights;
  }
  // Populates the top/bottom internal coordinate arrays
  buildElVerticals(originClientTop) {
    let tops = [];
    let bottoms = [];
    for (let el of this.els) {
      let rect = el.getBoundingClientRect();
      tops.push(rect.top - originClientTop);
      bottoms.push(rect.bottom - originClientTop);
    }
    this.tops = tops;
    this.bottoms = bottoms;
  }
  // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
  // If no intersection is made, returns undefined.
  leftToIndex(leftPosition) {
    let {
      lefts,
      rights
    } = this;
    let len = lefts.length;
    let i;
    for (i = 0; i < len; i += 1) {
      if (leftPosition >= lefts[i] && leftPosition < rights[i]) {
        return i;
      }
    }
    return undefined; // TODO: better
  }
  // Given a top offset (from document top), returns the index of the el that it vertically intersects.
  // If no intersection is made, returns undefined.
  topToIndex(topPosition) {
    let {
      tops,
      bottoms
    } = this;
    let len = tops.length;
    let i;
    for (i = 0; i < len; i += 1) {
      if (topPosition >= tops[i] && topPosition < bottoms[i]) {
        return i;
      }
    }
    return undefined; // TODO: better
  }
  // Gets the width of the element at the given index
  getWidth(leftIndex) {
    return this.rights[leftIndex] - this.lefts[leftIndex];
  }
  // Gets the height of the element at the given index
  getHeight(topIndex) {
    return this.bottoms[topIndex] - this.tops[topIndex];
  }
  similarTo(otherCache) {
    return similarNumArrays(this.tops || [], otherCache.tops || []) && similarNumArrays(this.bottoms || [], otherCache.bottoms || []) && similarNumArrays(this.lefts || [], otherCache.lefts || []) && similarNumArrays(this.rights || [], otherCache.rights || []);
  }
}
function similarNumArrays(a, b) {
  const len = a.length;
  if (len !== b.length) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (Math.round(a[i]) !== Math.round(b[i])) {
      return false;
    }
  }
  return true;
}

/* eslint max-classes-per-file: "off" */
/*
An object for getting/setting scroll-related information for an element.
Internally, this is done very differently for window versus DOM element,
so this object serves as a common interface.
*/
class ScrollController {
  getMaxScrollTop() {
    return this.getScrollHeight() - this.getClientHeight();
  }
  getMaxScrollLeft() {
    return this.getScrollWidth() - this.getClientWidth();
  }
  canScrollVertically() {
    return this.getMaxScrollTop() > 0;
  }
  canScrollHorizontally() {
    return this.getMaxScrollLeft() > 0;
  }
  canScrollUp() {
    return this.getScrollTop() > 0;
  }
  canScrollDown() {
    return this.getScrollTop() < this.getMaxScrollTop();
  }
  canScrollLeft() {
    return this.getScrollLeft() > 0;
  }
  canScrollRight() {
    return this.getScrollLeft() < this.getMaxScrollLeft();
  }
}
class ElementScrollController extends ScrollController {
  constructor(el) {
    super();
    this.el = el;
  }
  getScrollTop() {
    return this.el.scrollTop;
  }
  getScrollLeft() {
    return this.el.scrollLeft;
  }
  setScrollTop(top) {
    this.el.scrollTop = top;
  }
  setScrollLeft(left) {
    this.el.scrollLeft = left;
  }
  getScrollWidth() {
    return this.el.scrollWidth;
  }
  getScrollHeight() {
    return this.el.scrollHeight;
  }
  getClientHeight() {
    return this.el.clientHeight;
  }
  getClientWidth() {
    return this.el.clientWidth;
  }
}
class WindowScrollController extends ScrollController {
  getScrollTop() {
    return window.pageYOffset;
  }
  getScrollLeft() {
    return window.pageXOffset;
  }
  setScrollTop(n) {
    window.scroll(window.pageXOffset, n);
  }
  setScrollLeft(n) {
    window.scroll(n, window.pageYOffset);
  }
  getScrollWidth() {
    return document.documentElement.scrollWidth;
  }
  getScrollHeight() {
    return document.documentElement.scrollHeight;
  }
  getClientHeight() {
    return document.documentElement.clientHeight;
  }
  getClientWidth() {
    return document.documentElement.clientWidth;
  }
}
class Theme {
  constructor(calendarOptions) {
    if (this.iconOverrideOption) {
      this.setIconOverride(calendarOptions[this.iconOverrideOption]);
    }
  }
  setIconOverride(iconOverrideHash) {
    let iconClassesCopy;
    let buttonName;
    if (typeof iconOverrideHash === 'object' && iconOverrideHash) {
      // non-null object
      iconClassesCopy = Object.assign({}, this.iconClasses);
      for (buttonName in iconOverrideHash) {
        iconClassesCopy[buttonName] = this.applyIconOverridePrefix(iconOverrideHash[buttonName]);
      }
      this.iconClasses = iconClassesCopy;
    } else if (iconOverrideHash === false) {
      this.iconClasses = {};
    }
  }
  applyIconOverridePrefix(className) {
    let prefix = this.iconOverridePrefix;
    if (prefix && className.indexOf(prefix) !== 0) {
      // if not already present
      className = prefix + className;
    }
    return className;
  }
  getClass(key) {
    return this.classes[key] || '';
  }
  getIconClass(buttonName, isRtl) {
    let className;
    if (isRtl && this.rtlIconClasses) {
      className = this.rtlIconClasses[buttonName] || this.iconClasses[buttonName];
    } else {
      className = this.iconClasses[buttonName];
    }
    if (className) {
      return `${this.baseIconClass} ${className}`;
    }
    return '';
  }
  getCustomButtonIconClass(customButtonProps) {
    let className;
    if (this.iconOverrideCustomButtonOption) {
      className = customButtonProps[this.iconOverrideCustomButtonOption];
      if (className) {
        return `${this.baseIconClass} ${this.applyIconOverridePrefix(className)}`;
      }
    }
    return '';
  }
}
Theme.prototype.classes = {};
Theme.prototype.iconClasses = {};
Theme.prototype.baseIconClass = '';
Theme.prototype.iconOverridePrefix = '';

/*
NOTE: this can be a public API, especially createElement for hooks.
See examples/typescript-scheduler/src/index.ts
*/
function flushSync(runBeforeFlush) {
  runBeforeFlush();
  let oldDebounceRendering = preact__WEBPACK_IMPORTED_MODULE_0__.options.debounceRendering; // orig
  let callbackQ = [];
  function execCallbackSync(callback) {
    callbackQ.push(callback);
  }
  preact__WEBPACK_IMPORTED_MODULE_0__.options.debounceRendering = execCallbackSync;
  preact__WEBPACK_IMPORTED_MODULE_0__.render(preact__WEBPACK_IMPORTED_MODULE_0__.createElement(FakeComponent, {}), document.createElement('div'));
  while (callbackQ.length) {
    callbackQ.shift()();
  }
  preact__WEBPACK_IMPORTED_MODULE_0__.options.debounceRendering = oldDebounceRendering;
}
class FakeComponent extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {});
  }
  componentDidMount() {
    this.setState({});
  }
}
// TODO: use preact/compat instead?
function createContext(defaultValue) {
  let ContextType = preact__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultValue);
  let origProvider = ContextType.Provider;
  ContextType.Provider = function () {
    let isNew = !this.getChildContext;
    let children = origProvider.apply(this, arguments); // eslint-disable-line prefer-rest-params
    if (isNew) {
      let subs = [];
      this.shouldComponentUpdate = _props => {
        if (this.props.value !== _props.value) {
          subs.forEach(c => {
            c.context = _props.value;
            c.forceUpdate();
          });
        }
      };
      this.sub = c => {
        subs.push(c);
        let old = c.componentWillUnmount;
        c.componentWillUnmount = () => {
          subs.splice(subs.indexOf(c), 1);
          old && old.call(c);
        };
      };
    }
    return children;
  };
  return ContextType;
}
class ScrollResponder {
  constructor(execFunc, emitter, scrollTime, scrollTimeReset) {
    this.execFunc = execFunc;
    this.emitter = emitter;
    this.scrollTime = scrollTime;
    this.scrollTimeReset = scrollTimeReset;
    this.handleScrollRequest = request => {
      this.queuedRequest = Object.assign({}, this.queuedRequest || {}, request);
      this.drain();
    };
    emitter.on('_scrollRequest', this.handleScrollRequest);
    this.fireInitialScroll();
  }
  detach() {
    this.emitter.off('_scrollRequest', this.handleScrollRequest);
  }
  update(isDatesNew) {
    if (isDatesNew && this.scrollTimeReset) {
      this.fireInitialScroll(); // will drain
    } else {
      this.drain();
    }
  }
  fireInitialScroll() {
    this.handleScrollRequest({
      time: this.scrollTime
    });
  }
  drain() {
    if (this.queuedRequest && this.execFunc(this.queuedRequest)) {
      this.queuedRequest = null;
    }
  }
}
const ViewContextType = createContext({}); // for Components
function buildViewContext(viewSpec, viewApi, viewOptions, dateProfileGenerator, dateEnv, theme, pluginHooks, dispatch, getCurrentData, emitter, calendarApi, registerInteractiveComponent, unregisterInteractiveComponent) {
  return {
    dateEnv,
    options: viewOptions,
    pluginHooks,
    emitter,
    dispatch,
    getCurrentData,
    calendarApi,
    viewSpec,
    viewApi,
    dateProfileGenerator,
    theme,
    isRtl: viewOptions.direction === 'rtl',
    addResizeHandler(handler) {
      emitter.on('_resize', handler);
    },
    removeResizeHandler(handler) {
      emitter.off('_resize', handler);
    },
    createScrollResponder(execFunc) {
      return new ScrollResponder(execFunc, emitter, createDuration(viewOptions.scrollTime), viewOptions.scrollTimeReset);
    },
    registerInteractiveComponent,
    unregisterInteractiveComponent
  };
}

/* eslint max-classes-per-file: off */
class PureComponent extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(getUnequalProps(nextProps, this.props), getUnequalProps(nextState, this.state));
    }
    return !compareObjs(this.props, nextProps, this.propEquality) || !compareObjs(this.state, nextState, this.stateEquality);
  }
  // HACK for freakin' React StrictMode
  safeSetState(newState) {
    if (!compareObjs(this.state, Object.assign(Object.assign({}, this.state), newState), this.stateEquality)) {
      this.setState(newState);
    }
  }
}
PureComponent.addPropsEquality = addPropsEquality;
PureComponent.addStateEquality = addStateEquality;
PureComponent.contextType = ViewContextType;
PureComponent.prototype.propEquality = {};
PureComponent.prototype.stateEquality = {};
class BaseComponent extends PureComponent {}
BaseComponent.contextType = ViewContextType;
function addPropsEquality(propEquality) {
  let hash = Object.create(this.prototype.propEquality);
  Object.assign(hash, propEquality);
  this.prototype.propEquality = hash;
}
function addStateEquality(stateEquality) {
  let hash = Object.create(this.prototype.stateEquality);
  Object.assign(hash, stateEquality);
  this.prototype.stateEquality = hash;
}
// use other one
function setRef(ref, current) {
  if (typeof ref === 'function') {
    ref(current);
  } else if (ref) {
    // see https://github.com/facebook/react/issues/13029
    ref.current = current;
  }
}

/*
an INTERACTABLE date component

PURPOSES:
- hook up to fg, fill, and mirror renderers
- interface for dragging and hits
*/
class DateComponent extends BaseComponent {
  constructor() {
    super(...arguments);
    this.uid = guid();
  }
  // Hit System
  // -----------------------------------------------------------------------------------------------------------------
  prepareHits() {}
  queryHit(positionLeft, positionTop, elWidth, elHeight) {
    return null; // this should be abstract
  }
  // Pointer Interaction Utils
  // -----------------------------------------------------------------------------------------------------------------
  isValidSegDownEl(el) {
    return !this.props.eventDrag &&
    // HACK
    !this.props.eventResize &&
    // HACK
    !elementClosest(el, '.fc-event-mirror');
  }
  isValidDateDownEl(el) {
    return !elementClosest(el, '.fc-event:not(.fc-bg-event)') && !elementClosest(el, '.fc-more-link') &&
    // a "more.." link
    !elementClosest(el, 'a[data-navlink]') &&
    // a clickable nav link
    !elementClosest(el, '.fc-popover'); // hack
  }
}

function reduceCurrentDate(currentDate, action) {
  switch (action.type) {
    case 'CHANGE_DATE':
      return action.dateMarker;
    default:
      return currentDate;
  }
}
function getInitialDate(options, dateEnv) {
  let initialDateInput = options.initialDate;
  // compute the initial ambig-timezone date
  if (initialDateInput != null) {
    return dateEnv.createMarker(initialDateInput);
  }
  return getNow(options.now, dateEnv); // getNow already returns unzoned
}

function getNow(nowInput, dateEnv) {
  if (typeof nowInput === 'function') {
    nowInput = nowInput();
  }
  if (nowInput == null) {
    return dateEnv.createNowMarker();
  }
  return dateEnv.createMarker(nowInput);
}
class DateProfileGenerator {
  constructor(props) {
    this.props = props;
    this.nowDate = getNow(props.nowInput, props.dateEnv);
    this.initHiddenDays();
  }
  /* Date Range Computation
  ------------------------------------------------------------------------------------------------------------------*/
  // Builds a structure with info about what the dates/ranges will be for the "prev" view.
  buildPrev(currentDateProfile, currentDate, forceToValid) {
    let {
      dateEnv
    } = this.props;
    let prevDate = dateEnv.subtract(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit),
    // important for start-of-month
    currentDateProfile.dateIncrement);
    return this.build(prevDate, -1, forceToValid);
  }
  // Builds a structure with info about what the dates/ranges will be for the "next" view.
  buildNext(currentDateProfile, currentDate, forceToValid) {
    let {
      dateEnv
    } = this.props;
    let nextDate = dateEnv.add(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit),
    // important for start-of-month
    currentDateProfile.dateIncrement);
    return this.build(nextDate, 1, forceToValid);
  }
  // Builds a structure holding dates/ranges for rendering around the given date.
  // Optional direction param indicates whether the date is being incremented/decremented
  // from its previous value. decremented = -1, incremented = 1 (default).
  build(currentDate, direction, forceToValid = true) {
    let {
      props
    } = this;
    let validRange;
    let currentInfo;
    let isRangeAllDay;
    let renderRange;
    let activeRange;
    let isValid;
    validRange = this.buildValidRange();
    validRange = this.trimHiddenDays(validRange);
    if (forceToValid) {
      currentDate = constrainMarkerToRange(currentDate, validRange);
    }
    currentInfo = this.buildCurrentRangeInfo(currentDate, direction);
    isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit);
    renderRange = this.buildRenderRange(this.trimHiddenDays(currentInfo.range), currentInfo.unit, isRangeAllDay);
    renderRange = this.trimHiddenDays(renderRange);
    activeRange = renderRange;
    if (!props.showNonCurrentDates) {
      activeRange = intersectRanges(activeRange, currentInfo.range);
    }
    activeRange = this.adjustActiveRange(activeRange);
    activeRange = intersectRanges(activeRange, validRange); // might return null
    // it's invalid if the originally requested date is not contained,
    // or if the range is completely outside of the valid range.
    isValid = rangesIntersect(currentInfo.range, validRange);
    // HACK: constrain to render-range so `currentDate` is more useful to view rendering
    if (!rangeContainsMarker(renderRange, currentDate)) {
      currentDate = renderRange.start;
    }
    return {
      currentDate,
      // constraint for where prev/next operations can go and where events can be dragged/resized to.
      // an object with optional start and end properties.
      validRange,
      // range the view is formally responsible for.
      // for example, a month view might have 1st-31st, excluding padded dates
      currentRange: currentInfo.range,
      // name of largest unit being displayed, like "month" or "week"
      currentRangeUnit: currentInfo.unit,
      isRangeAllDay,
      // dates that display events and accept drag-n-drop
      // will be `null` if no dates accept events
      activeRange,
      // date range with a rendered skeleton
      // includes not-active days that need some sort of DOM
      renderRange,
      // Duration object that denotes the first visible time of any given day
      slotMinTime: props.slotMinTime,
      // Duration object that denotes the exclusive visible end time of any given day
      slotMaxTime: props.slotMaxTime,
      isValid,
      // how far the current date will move for a prev/next operation
      dateIncrement: this.buildDateIncrement(currentInfo.duration)
      // pass a fallback (might be null) ^
    };
  }
  // Builds an object with optional start/end properties.
  // Indicates the minimum/maximum dates to display.
  // not responsible for trimming hidden days.
  buildValidRange() {
    let input = this.props.validRangeInput;
    let simpleInput = typeof input === 'function' ? input.call(this.props.calendarApi, this.nowDate) : input;
    return this.refineRange(simpleInput) || {
      start: null,
      end: null
    }; // completely open-ended
  }
  // Builds a structure with info about the "current" range, the range that is
  // highlighted as being the current month for example.
  // See build() for a description of `direction`.
  // Guaranteed to have `range` and `unit` properties. `duration` is optional.
  buildCurrentRangeInfo(date, direction) {
    let {
      props
    } = this;
    let duration = null;
    let unit = null;
    let range = null;
    let dayCount;
    if (props.duration) {
      duration = props.duration;
      unit = props.durationUnit;
      range = this.buildRangeFromDuration(date, direction, duration, unit);
    } else if (dayCount = this.props.dayCount) {
      unit = 'day';
      range = this.buildRangeFromDayCount(date, direction, dayCount);
    } else if (range = this.buildCustomVisibleRange(date)) {
      unit = props.dateEnv.greatestWholeUnit(range.start, range.end).unit;
    } else {
      duration = this.getFallbackDuration();
      unit = greatestDurationDenominator(duration).unit;
      range = this.buildRangeFromDuration(date, direction, duration, unit);
    }
    return {
      duration,
      unit,
      range
    };
  }
  getFallbackDuration() {
    return createDuration({
      day: 1
    });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(range) {
    let {
      dateEnv,
      usesMinMaxTime,
      slotMinTime,
      slotMaxTime
    } = this.props;
    let {
      start,
      end
    } = range;
    if (usesMinMaxTime) {
      // expand active range if slotMinTime is negative (why not when positive?)
      if (asRoughDays(slotMinTime) < 0) {
        start = startOfDay(start); // necessary?
        start = dateEnv.add(start, slotMinTime);
      }
      // expand active range if slotMaxTime is beyond one day (why not when negative?)
      if (asRoughDays(slotMaxTime) > 1) {
        end = startOfDay(end); // necessary?
        end = addDays(end, -1);
        end = dateEnv.add(end, slotMaxTime);
      }
    }
    return {
      start,
      end
    };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(date, direction, duration, unit) {
    let {
      dateEnv,
      dateAlignment
    } = this.props;
    let start;
    let end;
    let res;
    // compute what the alignment should be
    if (!dateAlignment) {
      let {
        dateIncrement
      } = this.props;
      if (dateIncrement) {
        // use the smaller of the two units
        if (asRoughMs(dateIncrement) < asRoughMs(duration)) {
          dateAlignment = greatestDurationDenominator(dateIncrement).unit;
        } else {
          dateAlignment = unit;
        }
      } else {
        dateAlignment = unit;
      }
    }
    // if the view displays a single day or smaller
    if (asRoughDays(duration) <= 1) {
      if (this.isHiddenDay(start)) {
        start = this.skipHiddenDays(start, direction);
        start = startOfDay(start);
      }
    }
    function computeRes() {
      start = dateEnv.startOf(date, dateAlignment);
      end = dateEnv.add(start, duration);
      res = {
        start,
        end
      };
    }
    computeRes();
    // if range is completely enveloped by hidden days, go past the hidden days
    if (!this.trimHiddenDays(res)) {
      date = this.skipHiddenDays(date, direction);
      computeRes();
    }
    return res;
  }
  // Builds the "current" range when a dayCount is specified.
  buildRangeFromDayCount(date, direction, dayCount) {
    let {
      dateEnv,
      dateAlignment
    } = this.props;
    let runningCount = 0;
    let start = date;
    let end;
    if (dateAlignment) {
      start = dateEnv.startOf(start, dateAlignment);
    }
    start = startOfDay(start);
    start = this.skipHiddenDays(start, direction);
    end = start;
    do {
      end = addDays(end, 1);
      if (!this.isHiddenDay(end)) {
        runningCount += 1;
      }
    } while (runningCount < dayCount);
    return {
      start,
      end
    };
  }
  // Builds a normalized range object for the "visible" range,
  // which is a way to define the currentRange and activeRange at the same time.
  buildCustomVisibleRange(date) {
    let {
      props
    } = this;
    let input = props.visibleRangeInput;
    let simpleInput = typeof input === 'function' ? input.call(props.calendarApi, props.dateEnv.toDate(date)) : input;
    let range = this.refineRange(simpleInput);
    if (range && (range.start == null || range.end == null)) {
      return null;
    }
    return range;
  }
  // Computes the range that will represent the element/cells for *rendering*,
  // but which may have voided days/times.
  // not responsible for trimming hidden days.
  buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay) {
    return currentRange;
  }
  // Compute the duration value that should be added/substracted to the current date
  // when a prev/next operation happens.
  buildDateIncrement(fallback) {
    let {
      dateIncrement
    } = this.props;
    let customAlignment;
    if (dateIncrement) {
      return dateIncrement;
    }
    if (customAlignment = this.props.dateAlignment) {
      return createDuration(1, customAlignment);
    }
    if (fallback) {
      return fallback;
    }
    return createDuration({
      days: 1
    });
  }
  refineRange(rangeInput) {
    if (rangeInput) {
      let range = parseRange(rangeInput, this.props.dateEnv);
      if (range) {
        range = computeVisibleDayRange(range);
      }
      return range;
    }
    return null;
  }
  /* Hidden Days
  ------------------------------------------------------------------------------------------------------------------*/
  // Initializes internal variables related to calculating hidden days-of-week
  initHiddenDays() {
    let hiddenDays = this.props.hiddenDays || []; // array of day-of-week indices that are hidden
    let isHiddenDayHash = []; // is the day-of-week hidden? (hash with day-of-week-index -> bool)
    let dayCnt = 0;
    let i;
    if (this.props.weekends === false) {
      hiddenDays.push(0, 6); // 0=sunday, 6=saturday
    }

    for (i = 0; i < 7; i += 1) {
      if (!(isHiddenDayHash[i] = hiddenDays.indexOf(i) !== -1)) {
        dayCnt += 1;
      }
    }
    if (!dayCnt) {
      throw new Error('invalid hiddenDays'); // all days were hidden? bad.
    }

    this.isHiddenDayHash = isHiddenDayHash;
  }
  // Remove days from the beginning and end of the range that are computed as hidden.
  // If the whole range is trimmed off, returns null
  trimHiddenDays(range) {
    let {
      start,
      end
    } = range;
    if (start) {
      start = this.skipHiddenDays(start);
    }
    if (end) {
      end = this.skipHiddenDays(end, -1, true);
    }
    if (start == null || end == null || start < end) {
      return {
        start,
        end
      };
    }
    return null;
  }
  // Is the current day hidden?
  // `day` is a day-of-week index (0-6), or a Date (used for UTC)
  isHiddenDay(day) {
    if (day instanceof Date) {
      day = day.getUTCDay();
    }
    return this.isHiddenDayHash[day];
  }
  // Incrementing the current day until it is no longer a hidden day, returning a copy.
  // DOES NOT CONSIDER validRange!
  // If the initial value of `date` is not a hidden day, don't do anything.
  // Pass `isExclusive` as `true` if you are dealing with an end date.
  // `inc` defaults to `1` (increment one day forward each time)
  skipHiddenDays(date, inc = 1, isExclusive = false) {
    while (this.isHiddenDayHash[(date.getUTCDay() + (isExclusive ? inc : 0) + 7) % 7]) {
      date = addDays(date, inc);
    }
    return date;
  }
}
function triggerDateSelect(selection, pev, context) {
  context.emitter.trigger('select', Object.assign(Object.assign({}, buildDateSpanApiWithContext(selection, context)), {
    jsEvent: pev ? pev.origEvent : null,
    view: context.viewApi || context.calendarApi.view
  }));
}
function triggerDateUnselect(pev, context) {
  context.emitter.trigger('unselect', {
    jsEvent: pev ? pev.origEvent : null,
    view: context.viewApi || context.calendarApi.view
  });
}
function buildDateSpanApiWithContext(dateSpan, context) {
  let props = {};
  for (let transform of context.pluginHooks.dateSpanTransforms) {
    Object.assign(props, transform(dateSpan, context));
  }
  Object.assign(props, buildDateSpanApi(dateSpan, context.dateEnv));
  return props;
}
// Given an event's allDay status and start date, return what its fallback end date should be.
// TODO: rename to computeDefaultEventEnd
function getDefaultEventEnd(allDay, marker, context) {
  let {
    dateEnv,
    options
  } = context;
  let end = marker;
  if (allDay) {
    end = startOfDay(end);
    end = dateEnv.add(end, options.defaultAllDayEventDuration);
  } else {
    end = dateEnv.add(end, options.defaultTimedEventDuration);
  }
  return end;
}

// applies the mutation to ALL defs/instances within the event store
function applyMutationToEventStore(eventStore, eventConfigBase, mutation, context) {
  let eventConfigs = compileEventUis(eventStore.defs, eventConfigBase);
  let dest = createEmptyEventStore();
  for (let defId in eventStore.defs) {
    let def = eventStore.defs[defId];
    dest.defs[defId] = applyMutationToEventDef(def, eventConfigs[defId], mutation, context);
  }
  for (let instanceId in eventStore.instances) {
    let instance = eventStore.instances[instanceId];
    let def = dest.defs[instance.defId]; // important to grab the newly modified def
    dest.instances[instanceId] = applyMutationToEventInstance(instance, def, eventConfigs[instance.defId], mutation, context);
  }
  return dest;
}
function applyMutationToEventDef(eventDef, eventConfig, mutation, context) {
  let standardProps = mutation.standardProps || {};
  // if hasEnd has not been specified, guess a good value based on deltas.
  // if duration will change, there's no way the default duration will persist,
  // and thus, we need to mark the event as having a real end
  if (standardProps.hasEnd == null && eventConfig.durationEditable && (mutation.startDelta || mutation.endDelta)) {
    standardProps.hasEnd = true; // TODO: is this mutation okay?
  }

  let copy = Object.assign(Object.assign(Object.assign({}, eventDef), standardProps), {
    ui: Object.assign(Object.assign({}, eventDef.ui), standardProps.ui)
  });
  if (mutation.extendedProps) {
    copy.extendedProps = Object.assign(Object.assign({}, copy.extendedProps), mutation.extendedProps);
  }
  for (let applier of context.pluginHooks.eventDefMutationAppliers) {
    applier(copy, mutation, context);
  }
  if (!copy.hasEnd && context.options.forceEventDuration) {
    copy.hasEnd = true;
  }
  return copy;
}
function applyMutationToEventInstance(eventInstance, eventDef,
// must first be modified by applyMutationToEventDef
eventConfig, mutation, context) {
  let {
    dateEnv
  } = context;
  let forceAllDay = mutation.standardProps && mutation.standardProps.allDay === true;
  let clearEnd = mutation.standardProps && mutation.standardProps.hasEnd === false;
  let copy = Object.assign({}, eventInstance);
  if (forceAllDay) {
    copy.range = computeAlignedDayRange(copy.range);
  }
  if (mutation.datesDelta && eventConfig.startEditable) {
    copy.range = {
      start: dateEnv.add(copy.range.start, mutation.datesDelta),
      end: dateEnv.add(copy.range.end, mutation.datesDelta)
    };
  }
  if (mutation.startDelta && eventConfig.durationEditable) {
    copy.range = {
      start: dateEnv.add(copy.range.start, mutation.startDelta),
      end: copy.range.end
    };
  }
  if (mutation.endDelta && eventConfig.durationEditable) {
    copy.range = {
      start: copy.range.start,
      end: dateEnv.add(copy.range.end, mutation.endDelta)
    };
  }
  if (clearEnd) {
    copy.range = {
      start: copy.range.start,
      end: getDefaultEventEnd(eventDef.allDay, copy.range.start, context)
    };
  }
  // in case event was all-day but the supplied deltas were not
  // better util for this?
  if (eventDef.allDay) {
    copy.range = {
      start: startOfDay(copy.range.start),
      end: startOfDay(copy.range.end)
    };
  }
  // handle invalid durations
  if (copy.range.end < copy.range.start) {
    copy.range.end = getDefaultEventEnd(eventDef.allDay, copy.range.start, context);
  }
  return copy;
}
class EventSourceImpl {
  constructor(context, internalEventSource) {
    this.context = context;
    this.internalEventSource = internalEventSource;
  }
  remove() {
    this.context.dispatch({
      type: 'REMOVE_EVENT_SOURCE',
      sourceId: this.internalEventSource.sourceId
    });
  }
  refetch() {
    this.context.dispatch({
      type: 'FETCH_EVENT_SOURCES',
      sourceIds: [this.internalEventSource.sourceId],
      isRefetch: true
    });
  }
  get id() {
    return this.internalEventSource.publicId;
  }
  get url() {
    return this.internalEventSource.meta.url;
  }
  get format() {
    return this.internalEventSource.meta.format; // TODO: bad. not guaranteed
  }
}

class EventImpl {
  // instance will be null if expressing a recurring event that has no current instances,
  // OR if trying to validate an incoming external event that has no dates assigned
  constructor(context, def, instance) {
    this._context = context;
    this._def = def;
    this._instance = instance || null;
  }
  /*
  TODO: make event struct more responsible for this
  */
  setProp(name, val) {
    if (name in EVENT_DATE_REFINERS) {
      console.warn('Could not set date-related prop \'name\'. Use one of the date-related methods instead.');
      // TODO: make proper aliasing system?
    } else if (name === 'id') {
      val = EVENT_NON_DATE_REFINERS[name](val);
      this.mutate({
        standardProps: {
          publicId: val
        } // hardcoded internal name
      });
    } else if (name in EVENT_NON_DATE_REFINERS) {
      val = EVENT_NON_DATE_REFINERS[name](val);
      this.mutate({
        standardProps: {
          [name]: val
        }
      });
    } else if (name in EVENT_UI_REFINERS) {
      let ui = EVENT_UI_REFINERS[name](val);
      if (name === 'color') {
        ui = {
          backgroundColor: val,
          borderColor: val
        };
      } else if (name === 'editable') {
        ui = {
          startEditable: val,
          durationEditable: val
        };
      } else {
        ui = {
          [name]: val
        };
      }
      this.mutate({
        standardProps: {
          ui
        }
      });
    } else {
      console.warn(`Could not set prop '${name}'. Use setExtendedProp instead.`);
    }
  }
  setExtendedProp(name, val) {
    this.mutate({
      extendedProps: {
        [name]: val
      }
    });
  }
  setStart(startInput, options = {}) {
    let {
      dateEnv
    } = this._context;
    let start = dateEnv.createMarker(startInput);
    if (start && this._instance) {
      // TODO: warning if parsed bad
      let instanceRange = this._instance.range;
      let startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity); // what if parsed bad!?
      if (options.maintainDuration) {
        this.mutate({
          datesDelta: startDelta
        });
      } else {
        this.mutate({
          startDelta
        });
      }
    }
  }
  setEnd(endInput, options = {}) {
    let {
      dateEnv
    } = this._context;
    let end;
    if (endInput != null) {
      end = dateEnv.createMarker(endInput);
      if (!end) {
        return; // TODO: warning if parsed bad
      }
    }

    if (this._instance) {
      if (end) {
        let endDelta = diffDates(this._instance.range.end, end, dateEnv, options.granularity);
        this.mutate({
          endDelta
        });
      } else {
        this.mutate({
          standardProps: {
            hasEnd: false
          }
        });
      }
    }
  }
  setDates(startInput, endInput, options = {}) {
    let {
      dateEnv
    } = this._context;
    let standardProps = {
      allDay: options.allDay
    };
    let start = dateEnv.createMarker(startInput);
    let end;
    if (!start) {
      return; // TODO: warning if parsed bad
    }

    if (endInput != null) {
      end = dateEnv.createMarker(endInput);
      if (!end) {
        // TODO: warning if parsed bad
        return;
      }
    }
    if (this._instance) {
      let instanceRange = this._instance.range;
      // when computing the diff for an event being converted to all-day,
      // compute diff off of the all-day values the way event-mutation does.
      if (options.allDay === true) {
        instanceRange = computeAlignedDayRange(instanceRange);
      }
      let startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity);
      if (end) {
        let endDelta = diffDates(instanceRange.end, end, dateEnv, options.granularity);
        if (durationsEqual(startDelta, endDelta)) {
          this.mutate({
            datesDelta: startDelta,
            standardProps
          });
        } else {
          this.mutate({
            startDelta,
            endDelta,
            standardProps
          });
        }
      } else {
        // means "clear the end"
        standardProps.hasEnd = false;
        this.mutate({
          datesDelta: startDelta,
          standardProps
        });
      }
    }
  }
  moveStart(deltaInput) {
    let delta = createDuration(deltaInput);
    if (delta) {
      // TODO: warning if parsed bad
      this.mutate({
        startDelta: delta
      });
    }
  }
  moveEnd(deltaInput) {
    let delta = createDuration(deltaInput);
    if (delta) {
      // TODO: warning if parsed bad
      this.mutate({
        endDelta: delta
      });
    }
  }
  moveDates(deltaInput) {
    let delta = createDuration(deltaInput);
    if (delta) {
      // TODO: warning if parsed bad
      this.mutate({
        datesDelta: delta
      });
    }
  }
  setAllDay(allDay, options = {}) {
    let standardProps = {
      allDay
    };
    let {
      maintainDuration
    } = options;
    if (maintainDuration == null) {
      maintainDuration = this._context.options.allDayMaintainDuration;
    }
    if (this._def.allDay !== allDay) {
      standardProps.hasEnd = maintainDuration;
    }
    this.mutate({
      standardProps
    });
  }
  formatRange(formatInput) {
    let {
      dateEnv
    } = this._context;
    let instance = this._instance;
    let formatter = createFormatter(formatInput);
    if (this._def.hasEnd) {
      return dateEnv.formatRange(instance.range.start, instance.range.end, formatter, {
        forcedStartTzo: instance.forcedStartTzo,
        forcedEndTzo: instance.forcedEndTzo
      });
    }
    return dateEnv.format(instance.range.start, formatter, {
      forcedTzo: instance.forcedStartTzo
    });
  }
  mutate(mutation) {
    let instance = this._instance;
    if (instance) {
      let def = this._def;
      let context = this._context;
      let {
        eventStore
      } = context.getCurrentData();
      let relevantEvents = getRelevantEvents(eventStore, instance.instanceId);
      let eventConfigBase = {
        '': {
          display: '',
          startEditable: true,
          durationEditable: true,
          constraints: [],
          overlap: null,
          allows: [],
          backgroundColor: '',
          borderColor: '',
          textColor: '',
          classNames: []
        }
      };
      relevantEvents = applyMutationToEventStore(relevantEvents, eventConfigBase, mutation, context);
      let oldEvent = new EventImpl(context, def, instance); // snapshot
      this._def = relevantEvents.defs[def.defId];
      this._instance = relevantEvents.instances[instance.instanceId];
      context.dispatch({
        type: 'MERGE_EVENTS',
        eventStore: relevantEvents
      });
      context.emitter.trigger('eventChange', {
        oldEvent,
        event: this,
        relatedEvents: buildEventApis(relevantEvents, context, instance),
        revert() {
          context.dispatch({
            type: 'RESET_EVENTS',
            eventStore // the ORIGINAL store
          });
        }
      });
    }
  }

  remove() {
    let context = this._context;
    let asStore = eventApiToStore(this);
    context.dispatch({
      type: 'REMOVE_EVENTS',
      eventStore: asStore
    });
    context.emitter.trigger('eventRemove', {
      event: this,
      relatedEvents: [],
      revert() {
        context.dispatch({
          type: 'MERGE_EVENTS',
          eventStore: asStore
        });
      }
    });
  }
  get source() {
    let {
      sourceId
    } = this._def;
    if (sourceId) {
      return new EventSourceImpl(this._context, this._context.getCurrentData().eventSources[sourceId]);
    }
    return null;
  }
  get start() {
    return this._instance ? this._context.dateEnv.toDate(this._instance.range.start) : null;
  }
  get end() {
    return this._instance && this._def.hasEnd ? this._context.dateEnv.toDate(this._instance.range.end) : null;
  }
  get startStr() {
    let instance = this._instance;
    if (instance) {
      return this._context.dateEnv.formatIso(instance.range.start, {
        omitTime: this._def.allDay,
        forcedTzo: instance.forcedStartTzo
      });
    }
    return '';
  }
  get endStr() {
    let instance = this._instance;
    if (instance && this._def.hasEnd) {
      return this._context.dateEnv.formatIso(instance.range.end, {
        omitTime: this._def.allDay,
        forcedTzo: instance.forcedEndTzo
      });
    }
    return '';
  }
  // computable props that all access the def
  // TODO: find a TypeScript-compatible way to do this at scale
  get id() {
    return this._def.publicId;
  }
  get groupId() {
    return this._def.groupId;
  }
  get allDay() {
    return this._def.allDay;
  }
  get title() {
    return this._def.title;
  }
  get url() {
    return this._def.url;
  }
  get display() {
    return this._def.ui.display || 'auto';
  } // bad. just normalize the type earlier
  get startEditable() {
    return this._def.ui.startEditable;
  }
  get durationEditable() {
    return this._def.ui.durationEditable;
  }
  get constraint() {
    return this._def.ui.constraints[0] || null;
  }
  get overlap() {
    return this._def.ui.overlap;
  }
  get allow() {
    return this._def.ui.allows[0] || null;
  }
  get backgroundColor() {
    return this._def.ui.backgroundColor;
  }
  get borderColor() {
    return this._def.ui.borderColor;
  }
  get textColor() {
    return this._def.ui.textColor;
  }
  // NOTE: user can't modify these because Object.freeze was called in event-def parsing
  get classNames() {
    return this._def.ui.classNames;
  }
  get extendedProps() {
    return this._def.extendedProps;
  }
  toPlainObject(settings = {}) {
    let def = this._def;
    let {
      ui
    } = def;
    let {
      startStr,
      endStr
    } = this;
    let res = {
      allDay: def.allDay
    };
    if (def.title) {
      res.title = def.title;
    }
    if (startStr) {
      res.start = startStr;
    }
    if (endStr) {
      res.end = endStr;
    }
    if (def.publicId) {
      res.id = def.publicId;
    }
    if (def.groupId) {
      res.groupId = def.groupId;
    }
    if (def.url) {
      res.url = def.url;
    }
    if (ui.display && ui.display !== 'auto') {
      res.display = ui.display;
    }
    // TODO: what about recurring-event properties???
    // TODO: include startEditable/durationEditable/constraint/overlap/allow
    if (settings.collapseColor && ui.backgroundColor && ui.backgroundColor === ui.borderColor) {
      res.color = ui.backgroundColor;
    } else {
      if (ui.backgroundColor) {
        res.backgroundColor = ui.backgroundColor;
      }
      if (ui.borderColor) {
        res.borderColor = ui.borderColor;
      }
    }
    if (ui.textColor) {
      res.textColor = ui.textColor;
    }
    if (ui.classNames.length) {
      res.classNames = ui.classNames;
    }
    if (Object.keys(def.extendedProps).length) {
      if (settings.collapseExtendedProps) {
        Object.assign(res, def.extendedProps);
      } else {
        res.extendedProps = def.extendedProps;
      }
    }
    return res;
  }
  toJSON() {
    return this.toPlainObject();
  }
}
function eventApiToStore(eventApi) {
  let def = eventApi._def;
  let instance = eventApi._instance;
  return {
    defs: {
      [def.defId]: def
    },
    instances: instance ? {
      [instance.instanceId]: instance
    } : {}
  };
}
function buildEventApis(eventStore, context, excludeInstance) {
  let {
    defs,
    instances
  } = eventStore;
  let eventApis = [];
  let excludeInstanceId = excludeInstance ? excludeInstance.instanceId : '';
  for (let id in instances) {
    let instance = instances[id];
    let def = defs[instance.defId];
    if (instance.instanceId !== excludeInstanceId) {
      eventApis.push(new EventImpl(context, def, instance));
    }
  }
  return eventApis;
}

/*
Specifying nextDayThreshold signals that all-day ranges should be sliced.
*/
function sliceEventStore(eventStore, eventUiBases, framingRange, nextDayThreshold) {
  let inverseBgByGroupId = {};
  let inverseBgByDefId = {};
  let defByGroupId = {};
  let bgRanges = [];
  let fgRanges = [];
  let eventUis = compileEventUis(eventStore.defs, eventUiBases);
  for (let defId in eventStore.defs) {
    let def = eventStore.defs[defId];
    let ui = eventUis[def.defId];
    if (ui.display === 'inverse-background') {
      if (def.groupId) {
        inverseBgByGroupId[def.groupId] = [];
        if (!defByGroupId[def.groupId]) {
          defByGroupId[def.groupId] = def;
        }
      } else {
        inverseBgByDefId[defId] = [];
      }
    }
  }
  for (let instanceId in eventStore.instances) {
    let instance = eventStore.instances[instanceId];
    let def = eventStore.defs[instance.defId];
    let ui = eventUis[def.defId];
    let origRange = instance.range;
    let normalRange = !def.allDay && nextDayThreshold ? computeVisibleDayRange(origRange, nextDayThreshold) : origRange;
    let slicedRange = intersectRanges(normalRange, framingRange);
    if (slicedRange) {
      if (ui.display === 'inverse-background') {
        if (def.groupId) {
          inverseBgByGroupId[def.groupId].push(slicedRange);
        } else {
          inverseBgByDefId[instance.defId].push(slicedRange);
        }
      } else if (ui.display !== 'none') {
        (ui.display === 'background' ? bgRanges : fgRanges).push({
          def,
          ui,
          instance,
          range: slicedRange,
          isStart: normalRange.start && normalRange.start.valueOf() === slicedRange.start.valueOf(),
          isEnd: normalRange.end && normalRange.end.valueOf() === slicedRange.end.valueOf()
        });
      }
    }
  }
  for (let groupId in inverseBgByGroupId) {
    // BY GROUP
    let ranges = inverseBgByGroupId[groupId];
    let invertedRanges = invertRanges(ranges, framingRange);
    for (let invertedRange of invertedRanges) {
      let def = defByGroupId[groupId];
      let ui = eventUis[def.defId];
      bgRanges.push({
        def,
        ui,
        instance: null,
        range: invertedRange,
        isStart: false,
        isEnd: false
      });
    }
  }
  for (let defId in inverseBgByDefId) {
    let ranges = inverseBgByDefId[defId];
    let invertedRanges = invertRanges(ranges, framingRange);
    for (let invertedRange of invertedRanges) {
      bgRanges.push({
        def: eventStore.defs[defId],
        ui: eventUis[defId],
        instance: null,
        range: invertedRange,
        isStart: false,
        isEnd: false
      });
    }
  }
  return {
    bg: bgRanges,
    fg: fgRanges
  };
}
function hasBgRendering(def) {
  return def.ui.display === 'background' || def.ui.display === 'inverse-background';
}
function setElSeg(el, seg) {
  el.fcSeg = seg;
}
function getElSeg(el) {
  return el.fcSeg || el.parentNode.fcSeg ||
  // for the harness
  null;
}
// event ui computation
function compileEventUis(eventDefs, eventUiBases) {
  return mapHash(eventDefs, eventDef => compileEventUi(eventDef, eventUiBases));
}
function compileEventUi(eventDef, eventUiBases) {
  let uis = [];
  if (eventUiBases['']) {
    uis.push(eventUiBases['']);
  }
  if (eventUiBases[eventDef.defId]) {
    uis.push(eventUiBases[eventDef.defId]);
  }
  uis.push(eventDef.ui);
  return combineEventUis(uis);
}
function sortEventSegs(segs, eventOrderSpecs) {
  let objs = segs.map(buildSegCompareObj);
  objs.sort((obj0, obj1) => compareByFieldSpecs(obj0, obj1, eventOrderSpecs));
  return objs.map(c => c._seg);
}
// returns a object with all primitive props that can be compared
function buildSegCompareObj(seg) {
  let {
    eventRange
  } = seg;
  let eventDef = eventRange.def;
  let range = eventRange.instance ? eventRange.instance.range : eventRange.range;
  let start = range.start ? range.start.valueOf() : 0; // TODO: better support for open-range events
  let end = range.end ? range.end.valueOf() : 0; // "
  return Object.assign(Object.assign(Object.assign({}, eventDef.extendedProps), eventDef), {
    id: eventDef.publicId,
    start,
    end,
    duration: end - start,
    allDay: Number(eventDef.allDay),
    _seg: seg
  });
}
function computeSegDraggable(seg, context) {
  let {
    pluginHooks
  } = context;
  let transformers = pluginHooks.isDraggableTransformers;
  let {
    def,
    ui
  } = seg.eventRange;
  let val = ui.startEditable;
  for (let transformer of transformers) {
    val = transformer(val, def, ui, context);
  }
  return val;
}
function computeSegStartResizable(seg, context) {
  return seg.isStart && seg.eventRange.ui.durationEditable && context.options.eventResizableFromStart;
}
function computeSegEndResizable(seg, context) {
  return seg.isEnd && seg.eventRange.ui.durationEditable;
}
function buildSegTimeText(seg, timeFormat, context, defaultDisplayEventTime,
// defaults to true
defaultDisplayEventEnd,
// defaults to true
startOverride, endOverride) {
  let {
    dateEnv,
    options
  } = context;
  let {
    displayEventTime,
    displayEventEnd
  } = options;
  let eventDef = seg.eventRange.def;
  let eventInstance = seg.eventRange.instance;
  if (displayEventTime == null) {
    displayEventTime = defaultDisplayEventTime !== false;
  }
  if (displayEventEnd == null) {
    displayEventEnd = defaultDisplayEventEnd !== false;
  }
  let wholeEventStart = eventInstance.range.start;
  let wholeEventEnd = eventInstance.range.end;
  let segStart = startOverride || seg.start || seg.eventRange.range.start;
  let segEnd = endOverride || seg.end || seg.eventRange.range.end;
  let isStartDay = startOfDay(wholeEventStart).valueOf() === startOfDay(segStart).valueOf();
  let isEndDay = startOfDay(addMs(wholeEventEnd, -1)).valueOf() === startOfDay(addMs(segEnd, -1)).valueOf();
  if (displayEventTime && !eventDef.allDay && (isStartDay || isEndDay)) {
    segStart = isStartDay ? wholeEventStart : segStart;
    segEnd = isEndDay ? wholeEventEnd : segEnd;
    if (displayEventEnd && eventDef.hasEnd) {
      return dateEnv.formatRange(segStart, segEnd, timeFormat, {
        forcedStartTzo: startOverride ? null : eventInstance.forcedStartTzo,
        forcedEndTzo: endOverride ? null : eventInstance.forcedEndTzo
      });
    }
    return dateEnv.format(segStart, timeFormat, {
      forcedTzo: startOverride ? null : eventInstance.forcedStartTzo // nooooo, same
    });
  }

  return '';
}
function getSegMeta(seg, todayRange, nowDate) {
  let segRange = seg.eventRange.range;
  return {
    isPast: segRange.end < (nowDate || todayRange.start),
    isFuture: segRange.start >= (nowDate || todayRange.end),
    isToday: todayRange && rangeContainsMarker(todayRange, segRange.start)
  };
}
function getEventClassNames(props) {
  let classNames = ['fc-event'];
  if (props.isMirror) {
    classNames.push('fc-event-mirror');
  }
  if (props.isDraggable) {
    classNames.push('fc-event-draggable');
  }
  if (props.isStartResizable || props.isEndResizable) {
    classNames.push('fc-event-resizable');
  }
  if (props.isDragging) {
    classNames.push('fc-event-dragging');
  }
  if (props.isResizing) {
    classNames.push('fc-event-resizing');
  }
  if (props.isSelected) {
    classNames.push('fc-event-selected');
  }
  if (props.isStart) {
    classNames.push('fc-event-start');
  }
  if (props.isEnd) {
    classNames.push('fc-event-end');
  }
  if (props.isPast) {
    classNames.push('fc-event-past');
  }
  if (props.isToday) {
    classNames.push('fc-event-today');
  }
  if (props.isFuture) {
    classNames.push('fc-event-future');
  }
  return classNames;
}
function buildEventRangeKey(eventRange) {
  return eventRange.instance ? eventRange.instance.instanceId : `${eventRange.def.defId}:${eventRange.range.start.toISOString()}`;
  // inverse-background events don't have specific instances. TODO: better solution
}

function getSegAnchorAttrs(seg, context) {
  let {
    def,
    instance
  } = seg.eventRange;
  let {
    url
  } = def;
  if (url) {
    return {
      href: url
    };
  }
  let {
    emitter,
    options
  } = context;
  let {
    eventInteractive
  } = options;
  if (eventInteractive == null) {
    eventInteractive = def.interactive;
    if (eventInteractive == null) {
      eventInteractive = Boolean(emitter.hasHandlers('eventClick'));
    }
  }
  // mock what happens in EventClicking
  if (eventInteractive) {
    // only attach keyboard-related handlers because click handler is already done in EventClicking
    return createAriaKeyboardAttrs(ev => {
      emitter.trigger('eventClick', {
        el: ev.target,
        event: new EventImpl(context, def, instance),
        jsEvent: ev,
        view: context.viewApi
      });
    });
  }
  return {};
}
const STANDARD_PROPS = {
  start: identity,
  end: identity,
  allDay: Boolean
};
function parseDateSpan(raw, dateEnv, defaultDuration) {
  let span = parseOpenDateSpan(raw, dateEnv);
  let {
    range
  } = span;
  if (!range.start) {
    return null;
  }
  if (!range.end) {
    if (defaultDuration == null) {
      return null;
    }
    range.end = dateEnv.add(range.start, defaultDuration);
  }
  return span;
}
/*
TODO: somehow combine with parseRange?
Will return null if the start/end props were present but parsed invalidly.
*/
function parseOpenDateSpan(raw, dateEnv) {
  let {
    refined: standardProps,
    extra
  } = refineProps(raw, STANDARD_PROPS);
  let startMeta = standardProps.start ? dateEnv.createMarkerMeta(standardProps.start) : null;
  let endMeta = standardProps.end ? dateEnv.createMarkerMeta(standardProps.end) : null;
  let {
    allDay
  } = standardProps;
  if (allDay == null) {
    allDay = startMeta && startMeta.isTimeUnspecified && (!endMeta || endMeta.isTimeUnspecified);
  }
  return Object.assign({
    range: {
      start: startMeta ? startMeta.marker : null,
      end: endMeta ? endMeta.marker : null
    },
    allDay
  }, extra);
}
function isDateSpansEqual(span0, span1) {
  return rangesEqual(span0.range, span1.range) && span0.allDay === span1.allDay && isSpanPropsEqual(span0, span1);
}
// the NON-DATE-RELATED props
function isSpanPropsEqual(span0, span1) {
  for (let propName in span1) {
    if (propName !== 'range' && propName !== 'allDay') {
      if (span0[propName] !== span1[propName]) {
        return false;
      }
    }
  }
  // are there any props that span0 has that span1 DOESN'T have?
  // both have range/allDay, so no need to special-case.
  for (let propName in span0) {
    if (!(propName in span1)) {
      return false;
    }
  }
  return true;
}
function buildDateSpanApi(span, dateEnv) {
  return Object.assign(Object.assign({}, buildRangeApi(span.range, dateEnv, span.allDay)), {
    allDay: span.allDay
  });
}
function buildRangeApiWithTimeZone(range, dateEnv, omitTime) {
  return Object.assign(Object.assign({}, buildRangeApi(range, dateEnv, omitTime)), {
    timeZone: dateEnv.timeZone
  });
}
function buildRangeApi(range, dateEnv, omitTime) {
  return {
    start: dateEnv.toDate(range.start),
    end: dateEnv.toDate(range.end),
    startStr: dateEnv.formatIso(range.start, {
      omitTime
    }),
    endStr: dateEnv.formatIso(range.end, {
      omitTime
    })
  };
}
function fabricateEventRange(dateSpan, eventUiBases, context) {
  let res = refineEventDef({
    editable: false
  }, context);
  let def = parseEventDef(res.refined, res.extra, '',
  // sourceId
  dateSpan.allDay, true,
  // hasEnd
  context);
  return {
    def,
    ui: compileEventUi(def, eventUiBases),
    instance: createEventInstance(def.defId, dateSpan.range),
    range: dateSpan.range,
    isStart: true,
    isEnd: true
  };
}
let calendarSystemClassMap = {};
function registerCalendarSystem(name, theClass) {
  calendarSystemClassMap[name] = theClass;
}
function createCalendarSystem(name) {
  return new calendarSystemClassMap[name]();
}
class GregorianCalendarSystem {
  getMarkerYear(d) {
    return d.getUTCFullYear();
  }
  getMarkerMonth(d) {
    return d.getUTCMonth();
  }
  getMarkerDay(d) {
    return d.getUTCDate();
  }
  arrayToMarker(arr) {
    return arrayToUtcDate(arr);
  }
  markerToArray(marker) {
    return dateToUtcArray(marker);
  }
}
registerCalendarSystem('gregory', GregorianCalendarSystem);
const ISO_RE = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function parse(str) {
  let m = ISO_RE.exec(str);
  if (m) {
    let marker = new Date(Date.UTC(Number(m[1]), m[3] ? Number(m[3]) - 1 : 0, Number(m[5] || 1), Number(m[7] || 0), Number(m[8] || 0), Number(m[10] || 0), m[12] ? Number(`0.${m[12]}`) * 1000 : 0));
    if (isValidDate(marker)) {
      let timeZoneOffset = null;
      if (m[13]) {
        timeZoneOffset = (m[15] === '-' ? -1 : 1) * (Number(m[16] || 0) * 60 + Number(m[18] || 0));
      }
      return {
        marker,
        isTimeUnspecified: !m[6],
        timeZoneOffset
      };
    }
  }
  return null;
}
class DateEnv {
  constructor(settings) {
    let timeZone = this.timeZone = settings.timeZone;
    let isNamedTimeZone = timeZone !== 'local' && timeZone !== 'UTC';
    if (settings.namedTimeZoneImpl && isNamedTimeZone) {
      this.namedTimeZoneImpl = new settings.namedTimeZoneImpl(timeZone);
    }
    this.canComputeOffset = Boolean(!isNamedTimeZone || this.namedTimeZoneImpl);
    this.calendarSystem = createCalendarSystem(settings.calendarSystem);
    this.locale = settings.locale;
    this.weekDow = settings.locale.week.dow;
    this.weekDoy = settings.locale.week.doy;
    if (settings.weekNumberCalculation === 'ISO') {
      this.weekDow = 1;
      this.weekDoy = 4;
    }
    if (typeof settings.firstDay === 'number') {
      this.weekDow = settings.firstDay;
    }
    if (typeof settings.weekNumberCalculation === 'function') {
      this.weekNumberFunc = settings.weekNumberCalculation;
    }
    this.weekText = settings.weekText != null ? settings.weekText : settings.locale.options.weekText;
    this.weekTextLong = (settings.weekTextLong != null ? settings.weekTextLong : settings.locale.options.weekTextLong) || this.weekText;
    this.cmdFormatter = settings.cmdFormatter;
    this.defaultSeparator = settings.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(input) {
    let meta = this.createMarkerMeta(input);
    if (meta === null) {
      return null;
    }
    return meta.marker;
  }
  createNowMarker() {
    if (this.canComputeOffset) {
      return this.timestampToMarker(new Date().valueOf());
    }
    // if we can't compute the current date val for a timezone,
    // better to give the current local date vals than UTC
    return arrayToUtcDate(dateToLocalArray(new Date()));
  }
  createMarkerMeta(input) {
    if (typeof input === 'string') {
      return this.parse(input);
    }
    let marker = null;
    if (typeof input === 'number') {
      marker = this.timestampToMarker(input);
    } else if (input instanceof Date) {
      input = input.valueOf();
      if (!isNaN(input)) {
        marker = this.timestampToMarker(input);
      }
    } else if (Array.isArray(input)) {
      marker = arrayToUtcDate(input);
    }
    if (marker === null || !isValidDate(marker)) {
      return null;
    }
    return {
      marker,
      isTimeUnspecified: false,
      forcedTzo: null
    };
  }
  parse(s) {
    let parts = parse(s);
    if (parts === null) {
      return null;
    }
    let {
      marker
    } = parts;
    let forcedTzo = null;
    if (parts.timeZoneOffset !== null) {
      if (this.canComputeOffset) {
        marker = this.timestampToMarker(marker.valueOf() - parts.timeZoneOffset * 60 * 1000);
      } else {
        forcedTzo = parts.timeZoneOffset;
      }
    }
    return {
      marker,
      isTimeUnspecified: parts.isTimeUnspecified,
      forcedTzo
    };
  }
  // Accessors
  getYear(marker) {
    return this.calendarSystem.getMarkerYear(marker);
  }
  getMonth(marker) {
    return this.calendarSystem.getMarkerMonth(marker);
  }
  getDay(marker) {
    return this.calendarSystem.getMarkerDay(marker);
  }
  // Adding / Subtracting
  add(marker, dur) {
    let a = this.calendarSystem.markerToArray(marker);
    a[0] += dur.years;
    a[1] += dur.months;
    a[2] += dur.days;
    a[6] += dur.milliseconds;
    return this.calendarSystem.arrayToMarker(a);
  }
  subtract(marker, dur) {
    let a = this.calendarSystem.markerToArray(marker);
    a[0] -= dur.years;
    a[1] -= dur.months;
    a[2] -= dur.days;
    a[6] -= dur.milliseconds;
    return this.calendarSystem.arrayToMarker(a);
  }
  addYears(marker, n) {
    let a = this.calendarSystem.markerToArray(marker);
    a[0] += n;
    return this.calendarSystem.arrayToMarker(a);
  }
  addMonths(marker, n) {
    let a = this.calendarSystem.markerToArray(marker);
    a[1] += n;
    return this.calendarSystem.arrayToMarker(a);
  }
  // Diffing Whole Units
  diffWholeYears(m0, m1) {
    let {
      calendarSystem
    } = this;
    if (timeAsMs(m0) === timeAsMs(m1) && calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1) && calendarSystem.getMarkerMonth(m0) === calendarSystem.getMarkerMonth(m1)) {
      return calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0);
    }
    return null;
  }
  diffWholeMonths(m0, m1) {
    let {
      calendarSystem
    } = this;
    if (timeAsMs(m0) === timeAsMs(m1) && calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1)) {
      return calendarSystem.getMarkerMonth(m1) - calendarSystem.getMarkerMonth(m0) + (calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)) * 12;
    }
    return null;
  }
  // Range / Duration
  greatestWholeUnit(m0, m1) {
    let n = this.diffWholeYears(m0, m1);
    if (n !== null) {
      return {
        unit: 'year',
        value: n
      };
    }
    n = this.diffWholeMonths(m0, m1);
    if (n !== null) {
      return {
        unit: 'month',
        value: n
      };
    }
    n = diffWholeWeeks(m0, m1);
    if (n !== null) {
      return {
        unit: 'week',
        value: n
      };
    }
    n = diffWholeDays(m0, m1);
    if (n !== null) {
      return {
        unit: 'day',
        value: n
      };
    }
    n = diffHours(m0, m1);
    if (isInt(n)) {
      return {
        unit: 'hour',
        value: n
      };
    }
    n = diffMinutes(m0, m1);
    if (isInt(n)) {
      return {
        unit: 'minute',
        value: n
      };
    }
    n = diffSeconds(m0, m1);
    if (isInt(n)) {
      return {
        unit: 'second',
        value: n
      };
    }
    return {
      unit: 'millisecond',
      value: m1.valueOf() - m0.valueOf()
    };
  }
  countDurationsBetween(m0, m1, d) {
    // TODO: can use greatestWholeUnit
    let diff;
    if (d.years) {
      diff = this.diffWholeYears(m0, m1);
      if (diff !== null) {
        return diff / asRoughYears(d);
      }
    }
    if (d.months) {
      diff = this.diffWholeMonths(m0, m1);
      if (diff !== null) {
        return diff / asRoughMonths(d);
      }
    }
    if (d.days) {
      diff = diffWholeDays(m0, m1);
      if (diff !== null) {
        return diff / asRoughDays(d);
      }
    }
    return (m1.valueOf() - m0.valueOf()) / asRoughMs(d);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(m, unit) {
    if (unit === 'year') {
      return this.startOfYear(m);
    }
    if (unit === 'month') {
      return this.startOfMonth(m);
    }
    if (unit === 'week') {
      return this.startOfWeek(m);
    }
    if (unit === 'day') {
      return startOfDay(m);
    }
    if (unit === 'hour') {
      return startOfHour(m);
    }
    if (unit === 'minute') {
      return startOfMinute(m);
    }
    if (unit === 'second') {
      return startOfSecond(m);
    }
    return null;
  }
  startOfYear(m) {
    return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m)]);
  }
  startOfMonth(m) {
    return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m), this.calendarSystem.getMarkerMonth(m)]);
  }
  startOfWeek(m) {
    return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m), this.calendarSystem.getMarkerMonth(m), m.getUTCDate() - (m.getUTCDay() - this.weekDow + 7) % 7]);
  }
  // Week Number
  computeWeekNumber(marker) {
    if (this.weekNumberFunc) {
      return this.weekNumberFunc(this.toDate(marker));
    }
    return weekOfYear(marker, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(marker, formatter, dateOptions = {}) {
    return formatter.format({
      marker,
      timeZoneOffset: dateOptions.forcedTzo != null ? dateOptions.forcedTzo : this.offsetForMarker(marker)
    }, this);
  }
  formatRange(start, end, formatter, dateOptions = {}) {
    if (dateOptions.isEndExclusive) {
      end = addMs(end, -1);
    }
    return formatter.formatRange({
      marker: start,
      timeZoneOffset: dateOptions.forcedStartTzo != null ? dateOptions.forcedStartTzo : this.offsetForMarker(start)
    }, {
      marker: end,
      timeZoneOffset: dateOptions.forcedEndTzo != null ? dateOptions.forcedEndTzo : this.offsetForMarker(end)
    }, this, dateOptions.defaultSeparator);
  }
  /*
  DUMB: the omitTime arg is dumb. if we omit the time, we want to omit the timezone offset. and if we do that,
  might as well use buildIsoString or some other util directly
  */
  formatIso(marker, extraOptions = {}) {
    let timeZoneOffset = null;
    if (!extraOptions.omitTimeZoneOffset) {
      if (extraOptions.forcedTzo != null) {
        timeZoneOffset = extraOptions.forcedTzo;
      } else {
        timeZoneOffset = this.offsetForMarker(marker);
      }
    }
    return buildIsoString(marker, timeZoneOffset, extraOptions.omitTime);
  }
  // TimeZone
  timestampToMarker(ms) {
    if (this.timeZone === 'local') {
      return arrayToUtcDate(dateToLocalArray(new Date(ms)));
    }
    if (this.timeZone === 'UTC' || !this.namedTimeZoneImpl) {
      return new Date(ms);
    }
    return arrayToUtcDate(this.namedTimeZoneImpl.timestampToArray(ms));
  }
  offsetForMarker(m) {
    if (this.timeZone === 'local') {
      return -arrayToLocalDate(dateToUtcArray(m)).getTimezoneOffset(); // convert "inverse" offset to "normal" offset
    }

    if (this.timeZone === 'UTC') {
      return 0;
    }
    if (this.namedTimeZoneImpl) {
      return this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m));
    }
    return null;
  }
  // Conversion
  toDate(m, forcedTzo) {
    if (this.timeZone === 'local') {
      return arrayToLocalDate(dateToUtcArray(m));
    }
    if (this.timeZone === 'UTC') {
      return new Date(m.valueOf()); // make sure it's a copy
    }

    if (!this.namedTimeZoneImpl) {
      return new Date(m.valueOf() - (forcedTzo || 0));
    }
    return new Date(m.valueOf() - this.namedTimeZoneImpl.offsetForArray(dateToUtcArray(m)) * 1000 * 60);
  }
}
class NamedTimeZoneImpl {
  constructor(timeZoneName) {
    this.timeZoneName = timeZoneName;
  }
}
class SegHierarchy {
  constructor() {
    // settings
    this.strictOrder = false;
    this.allowReslicing = false;
    this.maxCoord = -1; // -1 means no max
    this.maxStackCnt = -1; // -1 means no max
    this.levelCoords = []; // ordered
    this.entriesByLevel = []; // parallel with levelCoords
    this.stackCnts = {}; // TODO: use better technique!?
  }

  addSegs(inputs) {
    let hiddenEntries = [];
    for (let input of inputs) {
      this.insertEntry(input, hiddenEntries);
    }
    return hiddenEntries;
  }
  insertEntry(entry, hiddenEntries) {
    let insertion = this.findInsertion(entry);
    if (this.isInsertionValid(insertion, entry)) {
      this.insertEntryAt(entry, insertion);
      return 1;
    }
    return this.handleInvalidInsertion(insertion, entry, hiddenEntries);
  }
  isInsertionValid(insertion, entry) {
    return (this.maxCoord === -1 || insertion.levelCoord + entry.thickness <= this.maxCoord) && (this.maxStackCnt === -1 || insertion.stackCnt < this.maxStackCnt);
  }
  // returns number of new entries inserted
  handleInvalidInsertion(insertion, entry, hiddenEntries) {
    if (this.allowReslicing && insertion.touchingEntry) {
      return this.splitEntry(entry, insertion.touchingEntry, hiddenEntries);
    }
    hiddenEntries.push(entry);
    return 0;
  }
  splitEntry(entry, barrier, hiddenEntries) {
    let partCnt = 0;
    let splitHiddenEntries = [];
    let entrySpan = entry.span;
    let barrierSpan = barrier.span;
    if (entrySpan.start < barrierSpan.start) {
      partCnt += this.insertEntry({
        index: entry.index,
        thickness: entry.thickness,
        span: {
          start: entrySpan.start,
          end: barrierSpan.start
        }
      }, splitHiddenEntries);
    }
    if (entrySpan.end > barrierSpan.end) {
      partCnt += this.insertEntry({
        index: entry.index,
        thickness: entry.thickness,
        span: {
          start: barrierSpan.end,
          end: entrySpan.end
        }
      }, splitHiddenEntries);
    }
    if (partCnt) {
      hiddenEntries.push({
        index: entry.index,
        thickness: entry.thickness,
        span: intersectSpans(barrierSpan, entrySpan) // guaranteed to intersect
      }, ...splitHiddenEntries);
      return partCnt;
    }
    hiddenEntries.push(entry);
    return 0;
  }
  insertEntryAt(entry, insertion) {
    let {
      entriesByLevel,
      levelCoords
    } = this;
    if (insertion.lateral === -1) {
      // create a new level
      insertAt(levelCoords, insertion.level, insertion.levelCoord);
      insertAt(entriesByLevel, insertion.level, [entry]);
    } else {
      // insert into existing level
      insertAt(entriesByLevel[insertion.level], insertion.lateral, entry);
    }
    this.stackCnts[buildEntryKey(entry)] = insertion.stackCnt;
  }
  findInsertion(newEntry) {
    let {
      levelCoords,
      entriesByLevel,
      strictOrder,
      stackCnts
    } = this;
    let levelCnt = levelCoords.length;
    let candidateCoord = 0;
    let touchingLevel = -1;
    let touchingLateral = -1;
    let touchingEntry = null;
    let stackCnt = 0;
    for (let trackingLevel = 0; trackingLevel < levelCnt; trackingLevel += 1) {
      let trackingCoord = levelCoords[trackingLevel];
      // if the current level is past the placed entry, we have found a good empty space and can stop.
      // if strictOrder, keep finding more lateral intersections.
      if (!strictOrder && trackingCoord >= candidateCoord + newEntry.thickness) {
        break;
      }
      let trackingEntries = entriesByLevel[trackingLevel];
      let trackingEntry;
      let searchRes = binarySearch(trackingEntries, newEntry.span.start, getEntrySpanEnd); // find first entry after newEntry's end
      let lateralIndex = searchRes[0] + searchRes[1]; // if exact match (which doesn't collide), go to next one
      while (
      // loop through entries that horizontally intersect
      (trackingEntry = trackingEntries[lateralIndex]) &&
      // but not past the whole entry list
      trackingEntry.span.start < newEntry.span.end // and not entirely past newEntry
      ) {
        let trackingEntryBottom = trackingCoord + trackingEntry.thickness;
        // intersects into the top of the candidate?
        if (trackingEntryBottom > candidateCoord) {
          candidateCoord = trackingEntryBottom;
          touchingEntry = trackingEntry;
          touchingLevel = trackingLevel;
          touchingLateral = lateralIndex;
        }
        // butts up against top of candidate? (will happen if just intersected as well)
        if (trackingEntryBottom === candidateCoord) {
          // accumulate the highest possible stackCnt of the trackingEntries that butt up
          stackCnt = Math.max(stackCnt, stackCnts[buildEntryKey(trackingEntry)] + 1);
        }
        lateralIndex += 1;
      }
    }
    // the destination level will be after touchingEntry's level. find it
    let destLevel = 0;
    if (touchingEntry) {
      destLevel = touchingLevel + 1;
      while (destLevel < levelCnt && levelCoords[destLevel] < candidateCoord) {
        destLevel += 1;
      }
    }
    // if adding to an existing level, find where to insert
    let destLateral = -1;
    if (destLevel < levelCnt && levelCoords[destLevel] === candidateCoord) {
      destLateral = binarySearch(entriesByLevel[destLevel], newEntry.span.end, getEntrySpanEnd)[0];
    }
    return {
      touchingLevel,
      touchingLateral,
      touchingEntry,
      stackCnt,
      levelCoord: candidateCoord,
      level: destLevel,
      lateral: destLateral
    };
  }
  // sorted by levelCoord (lowest to highest)
  toRects() {
    let {
      entriesByLevel,
      levelCoords
    } = this;
    let levelCnt = entriesByLevel.length;
    let rects = [];
    for (let level = 0; level < levelCnt; level += 1) {
      let entries = entriesByLevel[level];
      let levelCoord = levelCoords[level];
      for (let entry of entries) {
        rects.push(Object.assign(Object.assign({}, entry), {
          levelCoord
        }));
      }
    }
    return rects;
  }
}
function getEntrySpanEnd(entry) {
  return entry.span.end;
}
function buildEntryKey(entry) {
  return entry.index + ':' + entry.span.start;
}
// returns groups with entries sorted by input order
function groupIntersectingEntries(entries) {
  let merges = [];
  for (let entry of entries) {
    let filteredMerges = [];
    let hungryMerge = {
      span: entry.span,
      entries: [entry]
    };
    for (let merge of merges) {
      if (intersectSpans(merge.span, hungryMerge.span)) {
        hungryMerge = {
          entries: merge.entries.concat(hungryMerge.entries),
          span: joinSpans(merge.span, hungryMerge.span)
        };
      } else {
        filteredMerges.push(merge);
      }
    }
    filteredMerges.push(hungryMerge);
    merges = filteredMerges;
  }
  return merges;
}
function joinSpans(span0, span1) {
  return {
    start: Math.min(span0.start, span1.start),
    end: Math.max(span0.end, span1.end)
  };
}
function intersectSpans(span0, span1) {
  let start = Math.max(span0.start, span1.start);
  let end = Math.min(span0.end, span1.end);
  if (start < end) {
    return {
      start,
      end
    };
  }
  return null;
}
// general util
// ---------------------------------------------------------------------------------------------------------------------
function insertAt(arr, index, item) {
  arr.splice(index, 0, item);
}
function binarySearch(a, searchVal, getItemVal) {
  let startIndex = 0;
  let endIndex = a.length; // exclusive
  if (!endIndex || searchVal < getItemVal(a[startIndex])) {
    // no items OR before first item
    return [0, 0];
  }
  if (searchVal > getItemVal(a[endIndex - 1])) {
    // after last item
    return [endIndex, 0];
  }
  while (startIndex < endIndex) {
    let middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
    let middleVal = getItemVal(a[middleIndex]);
    if (searchVal < middleVal) {
      endIndex = middleIndex;
    } else if (searchVal > middleVal) {
      startIndex = middleIndex + 1;
    } else {
      // equal!
      return [middleIndex, 1];
    }
  }
  return [startIndex, 0];
}
class Interaction {
  constructor(settings) {
    this.component = settings.component;
    this.isHitComboAllowed = settings.isHitComboAllowed || null;
  }
  destroy() {}
}
function parseInteractionSettings(component, input) {
  return {
    component,
    el: input.el,
    useEventCenter: input.useEventCenter != null ? input.useEventCenter : true,
    isHitComboAllowed: input.isHitComboAllowed || null
  };
}
function interactionSettingsToStore(settings) {
  return {
    [settings.component.uid]: settings
  };
}
// global state
const interactionSettingsStore = {};

/*
An abstraction for a dragging interaction originating on an event.
Does higher-level things than PointerDragger, such as possibly:
- a "mirror" that moves with the pointer
- a minimum number of pixels or other criteria for a true drag to begin

subclasses must emit:
- pointerdown
- dragstart
- dragmove
- pointerup
- dragend
*/
class ElementDragging {
  constructor(el, selector) {
    this.emitter = new Emitter();
  }
  destroy() {}
  setMirrorIsVisible(bool) {
    // optional if subclass doesn't want to support a mirror
  }
  setMirrorNeedsRevert(bool) {
    // optional if subclass doesn't want to support a mirror
  }
  setAutoScrollEnabled(bool) {
    // optional
  }
}

// TODO: get rid of this in favor of options system,
// tho it's really easy to access this globally rather than pass thru options.
const config = {};

/*
Information about what will happen when an external element is dragged-and-dropped
onto a calendar. Contains information for creating an event.
*/
const DRAG_META_REFINERS = {
  startTime: createDuration,
  duration: createDuration,
  create: Boolean,
  sourceId: String
};
function parseDragMeta(raw) {
  let {
    refined,
    extra
  } = refineProps(raw, DRAG_META_REFINERS);
  return {
    startTime: refined.startTime || null,
    duration: refined.duration || null,
    create: refined.create != null ? refined.create : true,
    sourceId: refined.sourceId,
    leftoverProps: extra
  };
}
class CalendarRoot extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      forPrint: false
    };
    this.handleBeforePrint = () => {
      this.setState({
        forPrint: true
      });
    };
    this.handleAfterPrint = () => {
      this.setState({
        forPrint: false
      });
    };
  }
  render() {
    let {
      props
    } = this;
    let {
      options
    } = props;
    let {
      forPrint
    } = this.state;
    let isHeightAuto = forPrint || options.height === 'auto' || options.contentHeight === 'auto';
    let height = !isHeightAuto && options.height != null ? options.height : '';
    let classNames = ['fc', forPrint ? 'fc-media-print' : 'fc-media-screen', `fc-direction-${options.direction}`, props.theme.getClass('root')];
    if (!getCanVGrowWithinCell()) {
      classNames.push('fc-liquid-hack');
    }
    return props.children(classNames, height, isHeightAuto, forPrint);
  }
  componentDidMount() {
    let {
      emitter
    } = this.props;
    emitter.on('_beforeprint', this.handleBeforePrint);
    emitter.on('_afterprint', this.handleAfterPrint);
  }
  componentWillUnmount() {
    let {
      emitter
    } = this.props;
    emitter.off('_beforeprint', this.handleBeforePrint);
    emitter.off('_afterprint', this.handleAfterPrint);
  }
}

// Computes a default column header formatting string if `colFormat` is not explicitly defined
function computeFallbackHeaderFormat(datesRepDistinctDays, dayCnt) {
  // if more than one week row, or if there are a lot of columns with not much space,
  // put just the day numbers will be in each cell
  if (!datesRepDistinctDays || dayCnt > 10) {
    return createFormatter({
      weekday: 'short'
    }); // "Sat"
  }

  if (dayCnt > 1) {
    return createFormatter({
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      omitCommas: true
    }); // "Sat 11/12"
  }

  return createFormatter({
    weekday: 'long'
  }); // "Saturday"
}

const CLASS_NAME = 'fc-col-header-cell'; // do the cushion too? no
function renderInner$1(renderProps) {
  return renderProps.text;
}
class ContentInjector extends BaseComponent {
  constructor() {
    super(...arguments);
    this.id = guid();
    this.queuedDomNodes = [];
    this.currentDomNodes = [];
    this.handleEl = el => {
      if (this.props.elRef) {
        setRef(this.props.elRef, el);
      }
    };
  }
  render() {
    const {
      props,
      context
    } = this;
    const {
      options
    } = context;
    const {
      customGenerator,
      defaultGenerator,
      renderProps
    } = props;
    const attrs = buildElAttrs(props);
    let useDefault = false;
    let innerContent;
    let queuedDomNodes = [];
    let currentGeneratorMeta;
    if (customGenerator != null) {
      const customGeneratorRes = typeof customGenerator === 'function' ? customGenerator(renderProps, preact__WEBPACK_IMPORTED_MODULE_0__.createElement) : customGenerator;
      if (customGeneratorRes === true) {
        useDefault = true;
      } else {
        const isObject = customGeneratorRes && typeof customGeneratorRes === 'object'; // non-null
        if (isObject && 'html' in customGeneratorRes) {
          attrs.dangerouslySetInnerHTML = {
            __html: customGeneratorRes.html
          };
        } else if (isObject && 'domNodes' in customGeneratorRes) {
          queuedDomNodes = Array.prototype.slice.call(customGeneratorRes.domNodes);
        } else if (!isObject && typeof customGeneratorRes !== 'function') {
          // primitive value (like string or number)
          innerContent = customGeneratorRes;
        } else {
          // an exotic object for handleCustomRendering
          currentGeneratorMeta = customGeneratorRes;
        }
      }
    } else {
      useDefault = !hasCustomRenderingHandler(props.generatorName, options);
    }
    if (useDefault && defaultGenerator) {
      innerContent = defaultGenerator(renderProps);
    }
    this.queuedDomNodes = queuedDomNodes;
    this.currentGeneratorMeta = currentGeneratorMeta;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(props.elTag, attrs, innerContent);
  }
  componentDidMount() {
    this.applyQueueudDomNodes();
    this.triggerCustomRendering(true);
  }
  componentDidUpdate() {
    this.applyQueueudDomNodes();
    this.triggerCustomRendering(true);
  }
  componentWillUnmount() {
    this.triggerCustomRendering(false); // TODO: different API for removal?
  }

  triggerCustomRendering(isActive) {
    var _a;
    const {
      props,
      context
    } = this;
    const {
      handleCustomRendering,
      customRenderingMetaMap
    } = context.options;
    if (handleCustomRendering) {
      const generatorMeta = (_a = this.currentGeneratorMeta) !== null && _a !== void 0 ? _a : customRenderingMetaMap === null || customRenderingMetaMap === void 0 ? void 0 : customRenderingMetaMap[props.generatorName];
      if (generatorMeta) {
        handleCustomRendering(Object.assign(Object.assign({
          id: this.id,
          isActive,
          containerEl: this.base,
          reportNewContainerEl: this.handleEl,
          // for customRenderingReplacesEl
          generatorMeta
        }, props), {
          elClasses: (props.elClasses || []).filter(isTruthy)
        }));
      }
    }
  }
  applyQueueudDomNodes() {
    const {
      queuedDomNodes,
      currentDomNodes
    } = this;
    const el = this.base;
    if (!isArraysEqual(queuedDomNodes, currentDomNodes)) {
      currentDomNodes.forEach(removeElement);
      for (let newNode of queuedDomNodes) {
        el.appendChild(newNode);
      }
      this.currentDomNodes = queuedDomNodes;
    }
  }
}
ContentInjector.addPropsEquality({
  elClasses: isArraysEqual,
  elStyle: isPropsEqual,
  elAttrs: isNonHandlerPropsEqual,
  renderProps: isPropsEqual
});
// Util
/*
Does UI-framework provide custom way of rendering?
*/
function hasCustomRenderingHandler(generatorName, options) {
  var _a;
  return Boolean(options.handleCustomRendering && generatorName && ((_a = options.customRenderingMetaMap) === null || _a === void 0 ? void 0 : _a[generatorName]));
}
function buildElAttrs(props, extraClassNames) {
  const attrs = Object.assign(Object.assign({}, props.elAttrs), {
    ref: props.elRef
  });
  if (props.elClasses || extraClassNames) {
    attrs.className = (props.elClasses || []).concat(extraClassNames || []).concat(attrs.className || []).filter(Boolean).join(' ');
  }
  if (props.elStyle) {
    attrs.style = props.elStyle;
  }
  return attrs;
}
function isTruthy(val) {
  return Boolean(val);
}
const RenderId = createContext(0);
class ContentContainer extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.InnerContent = InnerContentInjector.bind(undefined, this);
    this.handleRootEl = el => {
      this.rootEl = el;
      if (this.props.elRef) {
        setRef(this.props.elRef, el);
      }
    };
  }
  render() {
    const {
      props
    } = this;
    const generatedClassNames = generateClassNames(props.classNameGenerator, props.renderProps);
    if (props.children) {
      const elAttrs = buildElAttrs(props, generatedClassNames);
      const children = props.children(this.InnerContent, props.renderProps, elAttrs);
      if (props.elTag) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(props.elTag, elAttrs, children);
      } else {
        return children;
      }
    } else {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentInjector, Object.assign(Object.assign({}, props), {
        elRef: this.handleRootEl,
        elTag: props.elTag || 'div',
        elClasses: (props.elClasses || []).concat(generatedClassNames),
        renderId: this.context
      }));
    }
  }
  componentDidMount() {
    var _a, _b;
    (_b = (_a = this.props).didMount) === null || _b === void 0 ? void 0 : _b.call(_a, Object.assign(Object.assign({}, this.props.renderProps), {
      el: this.rootEl || this.base
    }));
  }
  componentWillUnmount() {
    var _a, _b;
    (_b = (_a = this.props).willUnmount) === null || _b === void 0 ? void 0 : _b.call(_a, Object.assign(Object.assign({}, this.props.renderProps), {
      el: this.rootEl || this.base
    }));
  }
}
ContentContainer.contextType = RenderId;
function InnerContentInjector(containerComponent, props) {
  const parentProps = containerComponent.props;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentInjector, Object.assign({
    renderProps: parentProps.renderProps,
    generatorName: parentProps.generatorName,
    customGenerator: parentProps.customGenerator,
    defaultGenerator: parentProps.defaultGenerator,
    renderId: containerComponent.context
  }, props));
}
// Utils
function generateClassNames(classNameGenerator, renderProps) {
  const classNames = typeof classNameGenerator === 'function' ? classNameGenerator(renderProps) : classNameGenerator || [];
  return typeof classNames === 'string' ? [classNames] : classNames;
}

// BAD name for this class now. used in the Header
class TableDateCell extends BaseComponent {
  render() {
    let {
      dateEnv,
      options,
      theme,
      viewApi
    } = this.context;
    let {
      props
    } = this;
    let {
      date,
      dateProfile
    } = props;
    let dayMeta = getDateMeta(date, props.todayRange, null, dateProfile);
    let classNames = [CLASS_NAME].concat(getDayClassNames(dayMeta, theme));
    let text = dateEnv.format(date, props.dayHeaderFormat);
    // if colCnt is 1, we are already in a day-view and don't need a navlink
    let navLinkAttrs = !dayMeta.isDisabled && props.colCnt > 1 ? buildNavLinkAttrs(this.context, date) : {};
    let renderProps = Object.assign(Object.assign(Object.assign({
      date: dateEnv.toDate(date),
      view: viewApi
    }, props.extraRenderProps), {
      text
    }), dayMeta);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, {
      elTag: "th",
      elClasses: classNames,
      elAttrs: Object.assign({
        role: 'columnheader',
        colSpan: props.colSpan,
        'data-date': !dayMeta.isDisabled ? formatDayString(date) : undefined
      }, props.extraDataAttrs),
      renderProps: renderProps,
      generatorName: "dayHeaderContent",
      customGenerator: options.dayHeaderContent,
      defaultGenerator: renderInner$1,
      classNameGenerator: options.dayHeaderClassNames,
      didMount: options.dayHeaderDidMount,
      willUnmount: options.dayHeaderWillUnmount
    }, InnerContainer => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-scrollgrid-sync-inner"
    }, !dayMeta.isDisabled && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContainer, {
      elTag: "a",
      elAttrs: navLinkAttrs,
      elClasses: ['fc-col-header-cell-cushion', props.isSticky && 'fc-sticky']
    })));
  }
}
const WEEKDAY_FORMAT = createFormatter({
  weekday: 'long'
});
class TableDowCell extends BaseComponent {
  render() {
    let {
      props
    } = this;
    let {
      dateEnv,
      theme,
      viewApi,
      options
    } = this.context;
    let date = addDays(new Date(259200000), props.dow); // start with Sun, 04 Jan 1970 00:00:00 GMT
    let dateMeta = {
      dow: props.dow,
      isDisabled: false,
      isFuture: false,
      isPast: false,
      isToday: false,
      isOther: false
    };
    let text = dateEnv.format(date, props.dayHeaderFormat);
    let renderProps = Object.assign(Object.assign(Object.assign(Object.assign({
      // TODO: make this public?
      date
    }, dateMeta), {
      view: viewApi
    }), props.extraRenderProps), {
      text
    });
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, {
      elTag: "th",
      elClasses: [CLASS_NAME, ...getDayClassNames(dateMeta, theme), ...(props.extraClassNames || [])],
      elAttrs: Object.assign({
        role: 'columnheader',
        colSpan: props.colSpan
      }, props.extraDataAttrs),
      renderProps: renderProps,
      generatorName: "dayHeaderContent",
      customGenerator: options.dayHeaderContent,
      defaultGenerator: renderInner$1,
      classNameGenerator: options.dayHeaderClassNames,
      didMount: options.dayHeaderDidMount,
      willUnmount: options.dayHeaderWillUnmount
    }, InnerContent => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-scrollgrid-sync-inner"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContent, {
      elTag: "a",
      elClasses: ['fc-col-header-cell-cushion', props.isSticky && 'fc-sticky'],
      elAttrs: {
        'aria-label': dateEnv.format(date, WEEKDAY_FORMAT)
      }
    })));
  }
}
class NowTimer extends preact__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props, context) {
    super(props, context);
    this.initialNowDate = getNow(context.options.now, context.dateEnv);
    this.initialNowQueriedMs = new Date().valueOf();
    this.state = this.computeTiming().currentState;
  }
  render() {
    let {
      props,
      state
    } = this;
    return props.children(state.nowDate, state.todayRange);
  }
  componentDidMount() {
    this.setTimeout();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.unit !== this.props.unit) {
      this.clearTimeout();
      this.setTimeout();
    }
  }
  componentWillUnmount() {
    this.clearTimeout();
  }
  computeTiming() {
    let {
      props,
      context
    } = this;
    let unroundedNow = addMs(this.initialNowDate, new Date().valueOf() - this.initialNowQueriedMs);
    let currentUnitStart = context.dateEnv.startOf(unroundedNow, props.unit);
    let nextUnitStart = context.dateEnv.add(currentUnitStart, createDuration(1, props.unit));
    let waitMs = nextUnitStart.valueOf() - unroundedNow.valueOf();
    // there is a max setTimeout ms value (https://stackoverflow.com/a/3468650/96342)
    // ensure no longer than a day
    waitMs = Math.min(1000 * 60 * 60 * 24, waitMs);
    return {
      currentState: {
        nowDate: currentUnitStart,
        todayRange: buildDayRange(currentUnitStart)
      },
      nextState: {
        nowDate: nextUnitStart,
        todayRange: buildDayRange(nextUnitStart)
      },
      waitMs
    };
  }
  setTimeout() {
    let {
      nextState,
      waitMs
    } = this.computeTiming();
    this.timeoutId = setTimeout(() => {
      this.setState(nextState, () => {
        this.setTimeout();
      });
    }, waitMs);
  }
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
NowTimer.contextType = ViewContextType;
function buildDayRange(date) {
  let start = startOfDay(date);
  let end = addDays(start, 1);
  return {
    start,
    end
  };
}
class DayHeader extends BaseComponent {
  constructor() {
    super(...arguments);
    this.createDayHeaderFormatter = memoize(createDayHeaderFormatter);
  }
  render() {
    let {
      context
    } = this;
    let {
      dates,
      dateProfile,
      datesRepDistinctDays,
      renderIntro
    } = this.props;
    let dayHeaderFormat = this.createDayHeaderFormatter(context.options.dayHeaderFormat, datesRepDistinctDays, dates.length);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(NowTimer, {
      unit: "day"
    }, (nowDate, todayRange) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      role: "row"
    }, renderIntro && renderIntro('day'), dates.map(date => datesRepDistinctDays ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableDateCell, {
      key: date.toISOString(),
      date: date,
      dateProfile: dateProfile,
      todayRange: todayRange,
      colCnt: dates.length,
      dayHeaderFormat: dayHeaderFormat
    }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableDowCell, {
      key: date.getUTCDay(),
      dow: date.getUTCDay(),
      dayHeaderFormat: dayHeaderFormat
    }))));
  }
}
function createDayHeaderFormatter(explicitFormat, datesRepDistinctDays, dateCnt) {
  return explicitFormat || computeFallbackHeaderFormat(datesRepDistinctDays, dateCnt);
}
class DaySeriesModel {
  constructor(range, dateProfileGenerator) {
    let date = range.start;
    let {
      end
    } = range;
    let indices = [];
    let dates = [];
    let dayIndex = -1;
    while (date < end) {
      // loop each day from start to end
      if (dateProfileGenerator.isHiddenDay(date)) {
        indices.push(dayIndex + 0.5); // mark that it's between indices
      } else {
        dayIndex += 1;
        indices.push(dayIndex);
        dates.push(date);
      }
      date = addDays(date, 1);
    }
    this.dates = dates;
    this.indices = indices;
    this.cnt = dates.length;
  }
  sliceRange(range) {
    let firstIndex = this.getDateDayIndex(range.start); // inclusive first index
    let lastIndex = this.getDateDayIndex(addDays(range.end, -1)); // inclusive last index
    let clippedFirstIndex = Math.max(0, firstIndex);
    let clippedLastIndex = Math.min(this.cnt - 1, lastIndex);
    // deal with in-between indices
    clippedFirstIndex = Math.ceil(clippedFirstIndex); // in-between starts round to next cell
    clippedLastIndex = Math.floor(clippedLastIndex); // in-between ends round to prev cell
    if (clippedFirstIndex <= clippedLastIndex) {
      return {
        firstIndex: clippedFirstIndex,
        lastIndex: clippedLastIndex,
        isStart: firstIndex === clippedFirstIndex,
        isEnd: lastIndex === clippedLastIndex
      };
    }
    return null;
  }
  // Given a date, returns its chronolocial cell-index from the first cell of the grid.
  // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
  // If before the first offset, returns a negative number.
  // If after the last offset, returns an offset past the last cell offset.
  // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
  getDateDayIndex(date) {
    let {
      indices
    } = this;
    let dayOffset = Math.floor(diffDays(this.dates[0], date));
    if (dayOffset < 0) {
      return indices[0] - 1;
    }
    if (dayOffset >= indices.length) {
      return indices[indices.length - 1] + 1;
    }
    return indices[dayOffset];
  }
}
class DayTableModel {
  constructor(daySeries, breakOnWeeks) {
    let {
      dates
    } = daySeries;
    let daysPerRow;
    let firstDay;
    let rowCnt;
    if (breakOnWeeks) {
      // count columns until the day-of-week repeats
      firstDay = dates[0].getUTCDay();
      for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow += 1) {
        if (dates[daysPerRow].getUTCDay() === firstDay) {
          break;
        }
      }
      rowCnt = Math.ceil(dates.length / daysPerRow);
    } else {
      rowCnt = 1;
      daysPerRow = dates.length;
    }
    this.rowCnt = rowCnt;
    this.colCnt = daysPerRow;
    this.daySeries = daySeries;
    this.cells = this.buildCells();
    this.headerDates = this.buildHeaderDates();
  }
  buildCells() {
    let rows = [];
    for (let row = 0; row < this.rowCnt; row += 1) {
      let cells = [];
      for (let col = 0; col < this.colCnt; col += 1) {
        cells.push(this.buildCell(row, col));
      }
      rows.push(cells);
    }
    return rows;
  }
  buildCell(row, col) {
    let date = this.daySeries.dates[row * this.colCnt + col];
    return {
      key: date.toISOString(),
      date
    };
  }
  buildHeaderDates() {
    let dates = [];
    for (let col = 0; col < this.colCnt; col += 1) {
      dates.push(this.cells[0][col].date);
    }
    return dates;
  }
  sliceRange(range) {
    let {
      colCnt
    } = this;
    let seriesSeg = this.daySeries.sliceRange(range);
    let segs = [];
    if (seriesSeg) {
      let {
        firstIndex,
        lastIndex
      } = seriesSeg;
      let index = firstIndex;
      while (index <= lastIndex) {
        let row = Math.floor(index / colCnt);
        let nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1);
        segs.push({
          row,
          firstCol: index % colCnt,
          lastCol: (nextIndex - 1) % colCnt,
          isStart: seriesSeg.isStart && index === firstIndex,
          isEnd: seriesSeg.isEnd && nextIndex - 1 === lastIndex
        });
        index = nextIndex;
      }
    }
    return segs;
  }
}
class Slicer {
  constructor() {
    this.sliceBusinessHours = memoize(this._sliceBusinessHours);
    this.sliceDateSelection = memoize(this._sliceDateSpan);
    this.sliceEventStore = memoize(this._sliceEventStore);
    this.sliceEventDrag = memoize(this._sliceInteraction);
    this.sliceEventResize = memoize(this._sliceInteraction);
    this.forceDayIfListItem = false; // hack
  }

  sliceProps(props, dateProfile, nextDayThreshold, context, ...extraArgs) {
    let {
      eventUiBases
    } = props;
    let eventSegs = this.sliceEventStore(props.eventStore, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs);
    return {
      dateSelectionSegs: this.sliceDateSelection(props.dateSelection, dateProfile, nextDayThreshold, eventUiBases, context, ...extraArgs),
      businessHourSegs: this.sliceBusinessHours(props.businessHours, dateProfile, nextDayThreshold, context, ...extraArgs),
      fgEventSegs: eventSegs.fg,
      bgEventSegs: eventSegs.bg,
      eventDrag: this.sliceEventDrag(props.eventDrag, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs),
      eventResize: this.sliceEventResize(props.eventResize, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs),
      eventSelection: props.eventSelection
    }; // TODO: give interactionSegs?
  }

  sliceNowDate(
  // does not memoize
  date, dateProfile, nextDayThreshold, context, ...extraArgs) {
    return this._sliceDateSpan({
      range: {
        start: date,
        end: addMs(date, 1)
      },
      allDay: false
    },
    // add 1 ms, protect against null range
    dateProfile, nextDayThreshold, {}, context, ...extraArgs);
  }
  _sliceBusinessHours(businessHours, dateProfile, nextDayThreshold, context, ...extraArgs) {
    if (!businessHours) {
      return [];
    }
    return this._sliceEventStore(expandRecurring(businessHours, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), context), {}, dateProfile, nextDayThreshold, ...extraArgs).bg;
  }
  _sliceEventStore(eventStore, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs) {
    if (eventStore) {
      let rangeRes = sliceEventStore(eventStore, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold);
      return {
        bg: this.sliceEventRanges(rangeRes.bg, extraArgs),
        fg: this.sliceEventRanges(rangeRes.fg, extraArgs)
      };
    }
    return {
      bg: [],
      fg: []
    };
  }
  _sliceInteraction(interaction, eventUiBases, dateProfile, nextDayThreshold, ...extraArgs) {
    if (!interaction) {
      return null;
    }
    let rangeRes = sliceEventStore(interaction.mutatedEvents, eventUiBases, computeActiveRange(dateProfile, Boolean(nextDayThreshold)), nextDayThreshold);
    return {
      segs: this.sliceEventRanges(rangeRes.fg, extraArgs),
      affectedInstances: interaction.affectedEvents.instances,
      isEvent: interaction.isEvent
    };
  }
  _sliceDateSpan(dateSpan, dateProfile, nextDayThreshold, eventUiBases, context, ...extraArgs) {
    if (!dateSpan) {
      return [];
    }
    let activeRange = computeActiveRange(dateProfile, Boolean(nextDayThreshold));
    let activeDateSpanRange = intersectRanges(dateSpan.range, activeRange);
    if (activeDateSpanRange) {
      dateSpan = Object.assign(Object.assign({}, dateSpan), {
        range: activeDateSpanRange
      });
      let eventRange = fabricateEventRange(dateSpan, eventUiBases, context);
      let segs = this.sliceRange(dateSpan.range, ...extraArgs);
      for (let seg of segs) {
        seg.eventRange = eventRange;
      }
      return segs;
    }
    return [];
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRanges(eventRanges, extraArgs) {
    let segs = [];
    for (let eventRange of eventRanges) {
      segs.push(...this.sliceEventRange(eventRange, extraArgs));
    }
    return segs;
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRange(eventRange, extraArgs) {
    let dateRange = eventRange.range;
    // hack to make multi-day events that are being force-displayed as list-items to take up only one day
    if (this.forceDayIfListItem && eventRange.ui.display === 'list-item') {
      dateRange = {
        start: dateRange.start,
        end: addDays(dateRange.start, 1)
      };
    }
    let segs = this.sliceRange(dateRange, ...extraArgs);
    for (let seg of segs) {
      seg.eventRange = eventRange;
      seg.isStart = eventRange.isStart && seg.isStart;
      seg.isEnd = eventRange.isEnd && seg.isEnd;
    }
    return segs;
  }
}
/*
for incorporating slotMinTime/slotMaxTime if appropriate
TODO: should be part of DateProfile!
TimelineDateProfile already does this btw
*/
function computeActiveRange(dateProfile, isComponentAllDay) {
  let range = dateProfile.activeRange;
  if (isComponentAllDay) {
    return range;
  }
  return {
    start: addMs(range.start, dateProfile.slotMinTime.milliseconds),
    end: addMs(range.end, dateProfile.slotMaxTime.milliseconds - 864e5) // 864e5 = ms in a day
  };
}

function reduceEventStore(eventStore, action, eventSources, dateProfile, context) {
  switch (action.type) {
    case 'RECEIVE_EVENTS':
      // raw
      return receiveRawEvents(eventStore, eventSources[action.sourceId], action.fetchId, action.fetchRange, action.rawEvents, context);
    case 'RESET_RAW_EVENTS':
      return resetRawEvents(eventStore, eventSources[action.sourceId], action.rawEvents, dateProfile.activeRange, context);
    case 'ADD_EVENTS':
      // already parsed, but not expanded
      return addEvent(eventStore, action.eventStore,
      // new ones
      dateProfile ? dateProfile.activeRange : null, context);
    case 'RESET_EVENTS':
      return action.eventStore;
    case 'MERGE_EVENTS':
      // already parsed and expanded
      return mergeEventStores(eventStore, action.eventStore);
    case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
    case 'NEXT':
    case 'CHANGE_DATE':
    case 'CHANGE_VIEW_TYPE':
      if (dateProfile) {
        return expandRecurring(eventStore, dateProfile.activeRange, context);
      }
      return eventStore;
    case 'REMOVE_EVENTS':
      return excludeSubEventStore(eventStore, action.eventStore);
    case 'REMOVE_EVENT_SOURCE':
      return excludeEventsBySourceId(eventStore, action.sourceId);
    case 'REMOVE_ALL_EVENT_SOURCES':
      return filterEventStoreDefs(eventStore, eventDef => !eventDef.sourceId // only keep events with no source id
      );

    case 'REMOVE_ALL_EVENTS':
      return createEmptyEventStore();
    default:
      return eventStore;
  }
}
function receiveRawEvents(eventStore, eventSource, fetchId, fetchRange, rawEvents, context) {
  if (eventSource &&
  // not already removed
  fetchId === eventSource.latestFetchId // TODO: wish this logic was always in event-sources
  ) {
    let subset = parseEvents(transformRawEvents(rawEvents, eventSource, context), eventSource, context);
    if (fetchRange) {
      subset = expandRecurring(subset, fetchRange, context);
    }
    return mergeEventStores(excludeEventsBySourceId(eventStore, eventSource.sourceId), subset);
  }
  return eventStore;
}
function resetRawEvents(existingEventStore, eventSource, rawEvents, activeRange, context) {
  const {
    defIdMap,
    instanceIdMap
  } = buildPublicIdMaps(existingEventStore);
  let newEventStore = parseEvents(transformRawEvents(rawEvents, eventSource, context), eventSource, context, false, defIdMap, instanceIdMap);
  return expandRecurring(newEventStore, activeRange, context);
}
function transformRawEvents(rawEvents, eventSource, context) {
  let calEachTransform = context.options.eventDataTransform;
  let sourceEachTransform = eventSource ? eventSource.eventDataTransform : null;
  if (sourceEachTransform) {
    rawEvents = transformEachRawEvent(rawEvents, sourceEachTransform);
  }
  if (calEachTransform) {
    rawEvents = transformEachRawEvent(rawEvents, calEachTransform);
  }
  return rawEvents;
}
function transformEachRawEvent(rawEvents, func) {
  let refinedEvents;
  if (!func) {
    refinedEvents = rawEvents;
  } else {
    refinedEvents = [];
    for (let rawEvent of rawEvents) {
      let refinedEvent = func(rawEvent);
      if (refinedEvent) {
        refinedEvents.push(refinedEvent);
      } else if (refinedEvent == null) {
        refinedEvents.push(rawEvent);
      } // if a different falsy value, do nothing
    }
  }

  return refinedEvents;
}
function addEvent(eventStore, subset, expandRange, context) {
  if (expandRange) {
    subset = expandRecurring(subset, expandRange, context);
  }
  return mergeEventStores(eventStore, subset);
}
function rezoneEventStoreDates(eventStore, oldDateEnv, newDateEnv) {
  let {
    defs
  } = eventStore;
  let instances = mapHash(eventStore.instances, instance => {
    let def = defs[instance.defId];
    if (def.allDay) {
      return instance; // isn't dependent on timezone
    }

    return Object.assign(Object.assign({}, instance), {
      range: {
        start: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.start, instance.forcedStartTzo)),
        end: newDateEnv.createMarker(oldDateEnv.toDate(instance.range.end, instance.forcedEndTzo))
      },
      forcedStartTzo: newDateEnv.canComputeOffset ? null : instance.forcedStartTzo,
      forcedEndTzo: newDateEnv.canComputeOffset ? null : instance.forcedEndTzo
    });
  });
  return {
    defs,
    instances
  };
}
function excludeEventsBySourceId(eventStore, sourceId) {
  return filterEventStoreDefs(eventStore, eventDef => eventDef.sourceId !== sourceId);
}
// QUESTION: why not just return instances? do a general object-property-exclusion util
function excludeInstances(eventStore, removals) {
  return {
    defs: eventStore.defs,
    instances: filterHash(eventStore.instances, instance => !removals[instance.instanceId])
  };
}
function buildPublicIdMaps(eventStore) {
  const {
    defs,
    instances
  } = eventStore;
  const defIdMap = {};
  const instanceIdMap = {};
  for (let defId in defs) {
    const def = defs[defId];
    const {
      publicId
    } = def;
    if (publicId) {
      defIdMap[publicId] = defId;
    }
  }
  for (let instanceId in instances) {
    const instance = instances[instanceId];
    const def = defs[instance.defId];
    const {
      publicId
    } = def;
    if (publicId) {
      instanceIdMap[publicId] = instanceId;
    }
  }
  return {
    defIdMap,
    instanceIdMap
  };
}

// high-level segmenting-aware tester functions
// ------------------------------------------------------------------------------------------------------------------------
function isInteractionValid(interaction, dateProfile, context) {
  let {
    instances
  } = interaction.mutatedEvents;
  for (let instanceId in instances) {
    if (!rangeContainsRange(dateProfile.validRange, instances[instanceId].range)) {
      return false;
    }
  }
  return isNewPropsValid({
    eventDrag: interaction
  }, context); // HACK: the eventDrag props is used for ALL interactions
}

function isDateSelectionValid(dateSelection, dateProfile, context) {
  if (!rangeContainsRange(dateProfile.validRange, dateSelection.range)) {
    return false;
  }
  return isNewPropsValid({
    dateSelection
  }, context);
}
function isNewPropsValid(newProps, context) {
  let calendarState = context.getCurrentData();
  let props = Object.assign({
    businessHours: calendarState.businessHours,
    dateSelection: '',
    eventStore: calendarState.eventStore,
    eventUiBases: calendarState.eventUiBases,
    eventSelection: '',
    eventDrag: null,
    eventResize: null
  }, newProps);
  return (context.pluginHooks.isPropsValid || isPropsValid)(props, context);
}
function isPropsValid(state, context, dateSpanMeta = {}, filterConfig) {
  if (state.eventDrag && !isInteractionPropsValid(state, context, dateSpanMeta, filterConfig)) {
    return false;
  }
  if (state.dateSelection && !isDateSelectionPropsValid(state, context, dateSpanMeta, filterConfig)) {
    return false;
  }
  return true;
}
// Moving Event Validation
// ------------------------------------------------------------------------------------------------------------------------
function isInteractionPropsValid(state, context, dateSpanMeta, filterConfig) {
  let currentState = context.getCurrentData();
  let interaction = state.eventDrag; // HACK: the eventDrag props is used for ALL interactions
  let subjectEventStore = interaction.mutatedEvents;
  let subjectDefs = subjectEventStore.defs;
  let subjectInstances = subjectEventStore.instances;
  let subjectConfigs = compileEventUis(subjectDefs, interaction.isEvent ? state.eventUiBases : {
    '': currentState.selectionConfig
  });
  if (filterConfig) {
    subjectConfigs = mapHash(subjectConfigs, filterConfig);
  }
  // exclude the subject events. TODO: exclude defs too?
  let otherEventStore = excludeInstances(state.eventStore, interaction.affectedEvents.instances);
  let otherDefs = otherEventStore.defs;
  let otherInstances = otherEventStore.instances;
  let otherConfigs = compileEventUis(otherDefs, state.eventUiBases);
  for (let subjectInstanceId in subjectInstances) {
    let subjectInstance = subjectInstances[subjectInstanceId];
    let subjectRange = subjectInstance.range;
    let subjectConfig = subjectConfigs[subjectInstance.defId];
    let subjectDef = subjectDefs[subjectInstance.defId];
    // constraint
    if (!allConstraintsPass(subjectConfig.constraints, subjectRange, otherEventStore, state.businessHours, context)) {
      return false;
    }
    // overlap
    let {
      eventOverlap
    } = context.options;
    let eventOverlapFunc = typeof eventOverlap === 'function' ? eventOverlap : null;
    for (let otherInstanceId in otherInstances) {
      let otherInstance = otherInstances[otherInstanceId];
      // intersect! evaluate
      if (rangesIntersect(subjectRange, otherInstance.range)) {
        let otherOverlap = otherConfigs[otherInstance.defId].overlap;
        // consider the other event's overlap. only do this if the subject event is a "real" event
        if (otherOverlap === false && interaction.isEvent) {
          return false;
        }
        if (subjectConfig.overlap === false) {
          return false;
        }
        if (eventOverlapFunc && !eventOverlapFunc(new EventImpl(context, otherDefs[otherInstance.defId], otherInstance),
        // still event
        new EventImpl(context, subjectDef, subjectInstance))) {
          return false;
        }
      }
    }
    // allow (a function)
    let calendarEventStore = currentState.eventStore; // need global-to-calendar, not local to component (splittable)state
    for (let subjectAllow of subjectConfig.allows) {
      let subjectDateSpan = Object.assign(Object.assign({}, dateSpanMeta), {
        range: subjectInstance.range,
        allDay: subjectDef.allDay
      });
      let origDef = calendarEventStore.defs[subjectDef.defId];
      let origInstance = calendarEventStore.instances[subjectInstanceId];
      let eventApi;
      if (origDef) {
        // was previously in the calendar
        eventApi = new EventImpl(context, origDef, origInstance);
      } else {
        // was an external event
        eventApi = new EventImpl(context, subjectDef); // no instance, because had no dates
      }

      if (!subjectAllow(buildDateSpanApiWithContext(subjectDateSpan, context), eventApi)) {
        return false;
      }
    }
  }
  return true;
}
// Date Selection Validation
// ------------------------------------------------------------------------------------------------------------------------
function isDateSelectionPropsValid(state, context, dateSpanMeta, filterConfig) {
  let relevantEventStore = state.eventStore;
  let relevantDefs = relevantEventStore.defs;
  let relevantInstances = relevantEventStore.instances;
  let selection = state.dateSelection;
  let selectionRange = selection.range;
  let {
    selectionConfig
  } = context.getCurrentData();
  if (filterConfig) {
    selectionConfig = filterConfig(selectionConfig);
  }
  // constraint
  if (!allConstraintsPass(selectionConfig.constraints, selectionRange, relevantEventStore, state.businessHours, context)) {
    return false;
  }
  // overlap
  let {
    selectOverlap
  } = context.options;
  let selectOverlapFunc = typeof selectOverlap === 'function' ? selectOverlap : null;
  for (let relevantInstanceId in relevantInstances) {
    let relevantInstance = relevantInstances[relevantInstanceId];
    // intersect! evaluate
    if (rangesIntersect(selectionRange, relevantInstance.range)) {
      if (selectionConfig.overlap === false) {
        return false;
      }
      if (selectOverlapFunc && !selectOverlapFunc(new EventImpl(context, relevantDefs[relevantInstance.defId], relevantInstance), null)) {
        return false;
      }
    }
  }
  // allow (a function)
  for (let selectionAllow of selectionConfig.allows) {
    let fullDateSpan = Object.assign(Object.assign({}, dateSpanMeta), selection);
    if (!selectionAllow(buildDateSpanApiWithContext(fullDateSpan, context), null)) {
      return false;
    }
  }
  return true;
}
// Constraint Utils
// ------------------------------------------------------------------------------------------------------------------------
function allConstraintsPass(constraints, subjectRange, otherEventStore, businessHoursUnexpanded, context) {
  for (let constraint of constraints) {
    if (!anyRangesContainRange(constraintToRanges(constraint, subjectRange, otherEventStore, businessHoursUnexpanded, context), subjectRange)) {
      return false;
    }
  }
  return true;
}
function constraintToRanges(constraint, subjectRange,
// for expanding a recurring constraint, or expanding business hours
otherEventStore,
// for if constraint is an even group ID
businessHoursUnexpanded,
// for if constraint is 'businessHours'
context) {
  if (constraint === 'businessHours') {
    return eventStoreToRanges(expandRecurring(businessHoursUnexpanded, subjectRange, context));
  }
  if (typeof constraint === 'string') {
    // an group ID
    return eventStoreToRanges(filterEventStoreDefs(otherEventStore, eventDef => eventDef.groupId === constraint));
  }
  if (typeof constraint === 'object' && constraint) {
    // non-null object
    return eventStoreToRanges(expandRecurring(constraint, subjectRange, context));
  }
  return []; // if it's false
}
// TODO: move to event-store file?
function eventStoreToRanges(eventStore) {
  let {
    instances
  } = eventStore;
  let ranges = [];
  for (let instanceId in instances) {
    ranges.push(instances[instanceId].range);
  }
  return ranges;
}
// TODO: move to geom file?
function anyRangesContainRange(outerRanges, innerRange) {
  for (let outerRange of outerRanges) {
    if (rangeContainsRange(outerRange, innerRange)) {
      return true;
    }
  }
  return false;
}
class JsonRequestError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}
function requestJson(method, url, params) {
  method = method.toUpperCase();
  const fetchOptions = {
    method
  };
  if (method === 'GET') {
    url += (url.indexOf('?') === -1 ? '?' : '&') + new URLSearchParams(params);
  } else {
    fetchOptions.body = new URLSearchParams(params);
    fetchOptions.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }
  return fetch(url, fetchOptions).then(fetchRes => {
    if (fetchRes.ok) {
      return fetchRes.json().then(parsedResponse => {
        return [parsedResponse, fetchRes];
      }, () => {
        throw new JsonRequestError('Failure parsing JSON', fetchRes);
      });
    } else {
      throw new JsonRequestError('Request failed', fetchRes);
    }
  });
}
class DelayedRunner {
  constructor(drainedOption) {
    this.drainedOption = drainedOption;
    this.isRunning = false;
    this.isDirty = false;
    this.pauseDepths = {};
    this.timeoutId = 0;
  }
  request(delay) {
    this.isDirty = true;
    if (!this.isPaused()) {
      this.clearTimeout();
      if (delay == null) {
        this.tryDrain();
      } else {
        this.timeoutId = setTimeout(
        // NOT OPTIMAL! TODO: look at debounce
        this.tryDrain.bind(this), delay);
      }
    }
  }
  pause(scope = '') {
    let {
      pauseDepths
    } = this;
    pauseDepths[scope] = (pauseDepths[scope] || 0) + 1;
    this.clearTimeout();
  }
  resume(scope = '', force) {
    let {
      pauseDepths
    } = this;
    if (scope in pauseDepths) {
      if (force) {
        delete pauseDepths[scope];
      } else {
        pauseDepths[scope] -= 1;
        let depth = pauseDepths[scope];
        if (depth <= 0) {
          delete pauseDepths[scope];
        }
      }
      this.tryDrain();
    }
  }
  isPaused() {
    return Object.keys(this.pauseDepths).length;
  }
  tryDrain() {
    if (!this.isRunning && !this.isPaused()) {
      this.isRunning = true;
      while (this.isDirty) {
        this.isDirty = false;
        this.drained(); // might set isDirty to true again
      }

      this.isRunning = false;
    }
  }
  clear() {
    this.clearTimeout();
    this.isDirty = false;
    this.pauseDepths = {};
  }
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = 0;
    }
  }
  drained() {
    if (this.drainedOption) {
      this.drainedOption();
    }
  }
}
const VISIBLE_HIDDEN_RE = /^(visible|hidden)$/;
class Scroller extends BaseComponent {
  constructor() {
    super(...arguments);
    this.handleEl = el => {
      this.el = el;
      setRef(this.props.elRef, el);
    };
  }
  render() {
    let {
      props
    } = this;
    let {
      liquid,
      liquidIsAbsolute
    } = props;
    let isAbsolute = liquid && liquidIsAbsolute;
    let className = ['fc-scroller'];
    if (liquid) {
      if (liquidIsAbsolute) {
        className.push('fc-scroller-liquid-absolute');
      } else {
        className.push('fc-scroller-liquid');
      }
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: this.handleEl,
      className: className.join(' '),
      style: {
        overflowX: props.overflowX,
        overflowY: props.overflowY,
        left: isAbsolute && -(props.overcomeLeft || 0) || '',
        right: isAbsolute && -(props.overcomeRight || 0) || '',
        bottom: isAbsolute && -(props.overcomeBottom || 0) || '',
        marginLeft: !isAbsolute && -(props.overcomeLeft || 0) || '',
        marginRight: !isAbsolute && -(props.overcomeRight || 0) || '',
        marginBottom: !isAbsolute && -(props.overcomeBottom || 0) || '',
        maxHeight: props.maxHeight || ''
      }
    }, props.children);
  }
  needsXScrolling() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
      return false;
    }
    // testing scrollWidth>clientWidth is unreliable cross-browser when pixel heights aren't integers.
    // much more reliable to see if children are taller than the scroller, even tho doesn't account for
    // inner-child margins and absolute positioning
    let {
      el
    } = this;
    let realClientWidth = this.el.getBoundingClientRect().width - this.getYScrollbarWidth();
    let {
      children
    } = el;
    for (let i = 0; i < children.length; i += 1) {
      let childEl = children[i];
      if (childEl.getBoundingClientRect().width > realClientWidth) {
        return true;
      }
    }
    return false;
  }
  needsYScrolling() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
      return false;
    }
    // testing scrollHeight>clientHeight is unreliable cross-browser when pixel heights aren't integers.
    // much more reliable to see if children are taller than the scroller, even tho doesn't account for
    // inner-child margins and absolute positioning
    let {
      el
    } = this;
    let realClientHeight = this.el.getBoundingClientRect().height - this.getXScrollbarWidth();
    let {
      children
    } = el;
    for (let i = 0; i < children.length; i += 1) {
      let childEl = children[i];
      if (childEl.getBoundingClientRect().height > realClientHeight) {
        return true;
      }
    }
    return false;
  }
  getXScrollbarWidth() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowX)) {
      return 0;
    }
    return this.el.offsetHeight - this.el.clientHeight; // only works because we guarantee no borders. TODO: add to CSS with important?
  }

  getYScrollbarWidth() {
    if (VISIBLE_HIDDEN_RE.test(this.props.overflowY)) {
      return 0;
    }
    return this.el.offsetWidth - this.el.clientWidth; // only works because we guarantee no borders. TODO: add to CSS with important?
  }
}

/*
TODO: somehow infer OtherArgs from masterCallback?
TODO: infer RefType from masterCallback if provided
*/
class RefMap {
  constructor(masterCallback) {
    this.masterCallback = masterCallback;
    this.currentMap = {};
    this.depths = {};
    this.callbackMap = {};
    this.handleValue = (val, key) => {
      let {
        depths,
        currentMap
      } = this;
      let removed = false;
      let added = false;
      if (val !== null) {
        // for bug... ACTUALLY: can probably do away with this now that callers don't share numeric indices anymore
        removed = key in currentMap;
        currentMap[key] = val;
        depths[key] = (depths[key] || 0) + 1;
        added = true;
      } else {
        depths[key] -= 1;
        if (!depths[key]) {
          delete currentMap[key];
          delete this.callbackMap[key];
          removed = true;
        }
      }
      if (this.masterCallback) {
        if (removed) {
          this.masterCallback(null, String(key));
        }
        if (added) {
          this.masterCallback(val, String(key));
        }
      }
    };
  }
  createRef(key) {
    let refCallback = this.callbackMap[key];
    if (!refCallback) {
      refCallback = this.callbackMap[key] = val => {
        this.handleValue(val, String(key));
      };
    }
    return refCallback;
  }
  // TODO: check callers that don't care about order. should use getAll instead
  // NOTE: this method has become less valuable now that we are encouraged to map order by some other index
  // TODO: provide ONE array-export function, buildArray, which fails on non-numeric indexes. caller can manipulate and "collect"
  collect(startIndex, endIndex, step) {
    return collectFromHash(this.currentMap, startIndex, endIndex, step);
  }
  getAll() {
    return hashValuesToArray(this.currentMap);
  }
}
function computeShrinkWidth(chunkEls) {
  let shrinkCells = findElements(chunkEls, '.fc-scrollgrid-shrink');
  let largestWidth = 0;
  for (let shrinkCell of shrinkCells) {
    largestWidth = Math.max(largestWidth, computeSmallestCellWidth(shrinkCell));
  }
  return Math.ceil(largestWidth); // <table> elements work best with integers. round up to ensure contents fits
}

function getSectionHasLiquidHeight(props, sectionConfig) {
  return props.liquid && sectionConfig.liquid; // does the section do liquid-height? (need to have whole scrollgrid liquid-height as well)
}

function getAllowYScrolling(props, sectionConfig) {
  return sectionConfig.maxHeight != null ||
  // if its possible for the height to max out, we might need scrollbars
  getSectionHasLiquidHeight(props, sectionConfig); // if the section is liquid height, it might condense enough to require scrollbars
}
// TODO: ONLY use `arg`. force out internal function to use same API
function renderChunkContent(sectionConfig, chunkConfig, arg, isHeader) {
  let {
    expandRows
  } = arg;
  let content = typeof chunkConfig.content === 'function' ? chunkConfig.content(arg) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('table', {
    role: 'presentation',
    className: [chunkConfig.tableClassName, sectionConfig.syncRowHeights ? 'fc-scrollgrid-sync-table' : ''].join(' '),
    style: {
      minWidth: arg.tableMinWidth,
      width: arg.clientWidth,
      height: expandRows ? arg.clientHeight : '' // css `height` on a <table> serves as a min-height
    }
  }, arg.tableColGroupNode, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(isHeader ? 'thead' : 'tbody', {
    role: 'presentation'
  }, typeof chunkConfig.rowContent === 'function' ? chunkConfig.rowContent(arg) : chunkConfig.rowContent));
  return content;
}
function isColPropsEqual(cols0, cols1) {
  return isArraysEqual(cols0, cols1, isPropsEqual);
}
function renderMicroColGroup(cols, shrinkWidth) {
  let colNodes = [];
  /*
  for ColProps with spans, it would have been great to make a single <col span="">
  HOWEVER, Chrome was getting messing up distributing the width to <td>/<th> elements with colspans.
  SOLUTION: making individual <col> elements makes Chrome behave.
  */
  for (let colProps of cols) {
    let span = colProps.span || 1;
    for (let i = 0; i < span; i += 1) {
      colNodes.push((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("col", {
        style: {
          width: colProps.width === 'shrink' ? sanitizeShrinkWidth(shrinkWidth) : colProps.width || '',
          minWidth: colProps.minWidth || ''
        }
      }));
    }
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('colgroup', {}, ...colNodes);
}
function sanitizeShrinkWidth(shrinkWidth) {
  /* why 4? if we do 0, it will kill any border, which are needed for computeSmallestCellWidth
  4 accounts for 2 2-pixel borders. TODO: better solution? */
  return shrinkWidth == null ? 4 : shrinkWidth;
}
function hasShrinkWidth(cols) {
  for (let col of cols) {
    if (col.width === 'shrink') {
      return true;
    }
  }
  return false;
}
function getScrollGridClassNames(liquid, context) {
  let classNames = ['fc-scrollgrid', context.theme.getClass('table')];
  if (liquid) {
    classNames.push('fc-scrollgrid-liquid');
  }
  return classNames;
}
function getSectionClassNames(sectionConfig, wholeTableVGrow) {
  let classNames = ['fc-scrollgrid-section', `fc-scrollgrid-section-${sectionConfig.type}`, sectionConfig.className // used?
  ];

  if (wholeTableVGrow && sectionConfig.liquid && sectionConfig.maxHeight == null) {
    classNames.push('fc-scrollgrid-section-liquid');
  }
  if (sectionConfig.isSticky) {
    classNames.push('fc-scrollgrid-section-sticky');
  }
  return classNames;
}
function renderScrollShim(arg) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-scrollgrid-sticky-shim",
    style: {
      width: arg.clientWidth,
      minWidth: arg.tableMinWidth
    }
  });
}
function getStickyHeaderDates(options) {
  let {
    stickyHeaderDates
  } = options;
  if (stickyHeaderDates == null || stickyHeaderDates === 'auto') {
    stickyHeaderDates = options.height === 'auto' || options.viewHeight === 'auto';
  }
  return stickyHeaderDates;
}
function getStickyFooterScrollbar(options) {
  let {
    stickyFooterScrollbar
  } = options;
  if (stickyFooterScrollbar == null || stickyFooterScrollbar === 'auto') {
    stickyFooterScrollbar = options.height === 'auto' || options.viewHeight === 'auto';
  }
  return stickyFooterScrollbar;
}
class SimpleScrollGrid extends BaseComponent {
  constructor() {
    super(...arguments);
    this.processCols = memoize(a => a, isColPropsEqual); // so we get same `cols` props every time
    // yucky to memoize VNodes, but much more efficient for consumers
    this.renderMicroColGroup = memoize(renderMicroColGroup);
    this.scrollerRefs = new RefMap();
    this.scrollerElRefs = new RefMap(this._handleScrollerEl.bind(this));
    this.state = {
      shrinkWidth: null,
      forceYScrollbars: false,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    };
    // TODO: can do a really simple print-view. dont need to join rows
    this.handleSizing = () => {
      this.safeSetState(Object.assign({
        shrinkWidth: this.computeShrinkWidth()
      }, this.computeScrollerDims()));
    };
  }
  render() {
    let {
      props,
      state,
      context
    } = this;
    let sectionConfigs = props.sections || [];
    let cols = this.processCols(props.cols);
    let microColGroupNode = this.renderMicroColGroup(cols, state.shrinkWidth);
    let classNames = getScrollGridClassNames(props.liquid, context);
    if (props.collapsibleWidth) {
      classNames.push('fc-scrollgrid-collapsible');
    }
    // TODO: make DRY
    let configCnt = sectionConfigs.length;
    let configI = 0;
    let currentConfig;
    let headSectionNodes = [];
    let bodySectionNodes = [];
    let footSectionNodes = [];
    while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'header') {
      headSectionNodes.push(this.renderSection(currentConfig, microColGroupNode, true));
      configI += 1;
    }
    while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'body') {
      bodySectionNodes.push(this.renderSection(currentConfig, microColGroupNode, false));
      configI += 1;
    }
    while (configI < configCnt && (currentConfig = sectionConfigs[configI]).type === 'footer') {
      footSectionNodes.push(this.renderSection(currentConfig, microColGroupNode, true));
      configI += 1;
    }
    // firefox bug: when setting height on table and there is a thead or tfoot,
    // the necessary height:100% on the liquid-height body section forces the *whole* table to be taller. (bug #5524)
    // use getCanVGrowWithinCell as a way to detect table-stupid firefox.
    // if so, use a simpler dom structure, jam everything into a lone tbody.
    let isBuggy = !getCanVGrowWithinCell();
    const roleAttrs = {
      role: 'rowgroup'
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('table', {
      role: 'grid',
      className: classNames.join(' '),
      style: {
        height: props.height
      }
    }, Boolean(!isBuggy && headSectionNodes.length) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('thead', roleAttrs, ...headSectionNodes), Boolean(!isBuggy && bodySectionNodes.length) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('tbody', roleAttrs, ...bodySectionNodes), Boolean(!isBuggy && footSectionNodes.length) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('tfoot', roleAttrs, ...footSectionNodes), isBuggy && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('tbody', roleAttrs, ...headSectionNodes, ...bodySectionNodes, ...footSectionNodes));
  }
  renderSection(sectionConfig, microColGroupNode, isHeader) {
    if ('outerContent' in sectionConfig) {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: sectionConfig.key
      }, sectionConfig.outerContent);
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: sectionConfig.key,
      role: "presentation",
      className: getSectionClassNames(sectionConfig, this.props.liquid).join(' ')
    }, this.renderChunkTd(sectionConfig, microColGroupNode, sectionConfig.chunk, isHeader));
  }
  renderChunkTd(sectionConfig, microColGroupNode, chunkConfig, isHeader) {
    if ('outerContent' in chunkConfig) {
      return chunkConfig.outerContent;
    }
    let {
      props
    } = this;
    let {
      forceYScrollbars,
      scrollerClientWidths,
      scrollerClientHeights
    } = this.state;
    let needsYScrolling = getAllowYScrolling(props, sectionConfig); // TODO: do lazily. do in section config?
    let isLiquid = getSectionHasLiquidHeight(props, sectionConfig);
    // for `!props.liquid` - is WHOLE scrollgrid natural height?
    // TODO: do same thing in advanced scrollgrid? prolly not b/c always has horizontal scrollbars
    let overflowY = !props.liquid ? 'visible' : forceYScrollbars ? 'scroll' : !needsYScrolling ? 'hidden' : 'auto';
    let sectionKey = sectionConfig.key;
    let content = renderChunkContent(sectionConfig, chunkConfig, {
      tableColGroupNode: microColGroupNode,
      tableMinWidth: '',
      clientWidth: !props.collapsibleWidth && scrollerClientWidths[sectionKey] !== undefined ? scrollerClientWidths[sectionKey] : null,
      clientHeight: scrollerClientHeights[sectionKey] !== undefined ? scrollerClientHeights[sectionKey] : null,
      expandRows: sectionConfig.expandRows,
      syncRowHeights: false,
      rowSyncHeights: [],
      reportRowHeightChange: () => {}
    }, isHeader);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(isHeader ? 'th' : 'td', {
      ref: chunkConfig.elRef,
      role: 'presentation'
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `fc-scroller-harness${isLiquid ? ' fc-scroller-harness-liquid' : ''}`
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(Scroller, {
      ref: this.scrollerRefs.createRef(sectionKey),
      elRef: this.scrollerElRefs.createRef(sectionKey),
      overflowY: overflowY,
      overflowX: !props.liquid ? 'visible' : 'hidden' /* natural height? */,
      maxHeight: sectionConfig.maxHeight,
      liquid: isLiquid,
      liquidIsAbsolute // because its within a harness
      : true
    }, content)));
  }
  _handleScrollerEl(scrollerEl, key) {
    let section = getSectionByKey(this.props.sections, key);
    if (section) {
      setRef(section.chunk.scrollerElRef, scrollerEl);
    }
  }
  componentDidMount() {
    this.handleSizing();
    this.context.addResizeHandler(this.handleSizing);
  }
  componentDidUpdate() {
    // TODO: need better solution when state contains non-sizing things
    this.handleSizing();
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleSizing);
  }
  computeShrinkWidth() {
    return hasShrinkWidth(this.props.cols) ? computeShrinkWidth(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let scrollbarWidth = getScrollbarWidths();
    let {
      scrollerRefs,
      scrollerElRefs
    } = this;
    let forceYScrollbars = false;
    let scrollerClientWidths = {};
    let scrollerClientHeights = {};
    for (let sectionKey in scrollerRefs.currentMap) {
      let scroller = scrollerRefs.currentMap[sectionKey];
      if (scroller && scroller.needsYScrolling()) {
        forceYScrollbars = true;
        break;
      }
    }
    for (let section of this.props.sections) {
      let sectionKey = section.key;
      let scrollerEl = scrollerElRefs.currentMap[sectionKey];
      if (scrollerEl) {
        let harnessEl = scrollerEl.parentNode; // TODO: weird way to get this. need harness b/c doesn't include table borders
        scrollerClientWidths[sectionKey] = Math.floor(harnessEl.getBoundingClientRect().width - (forceYScrollbars ? scrollbarWidth.y // use global because scroller might not have scrollbars yet but will need them in future
        : 0));
        scrollerClientHeights[sectionKey] = Math.floor(harnessEl.getBoundingClientRect().height);
      }
    }
    return {
      forceYScrollbars,
      scrollerClientWidths,
      scrollerClientHeights
    };
  }
}
SimpleScrollGrid.addStateEquality({
  scrollerClientWidths: isPropsEqual,
  scrollerClientHeights: isPropsEqual
});
function getSectionByKey(sections, key) {
  for (let section of sections) {
    if (section.key === key) {
      return section;
    }
  }
  return null;
}
class EventContainer extends BaseComponent {
  constructor() {
    super(...arguments);
    this.handleEl = el => {
      this.el = el;
      if (el) {
        setElSeg(el, this.props.seg);
      }
    };
  }
  render() {
    const {
      props,
      context
    } = this;
    const {
      options
    } = context;
    const {
      seg
    } = props;
    const {
      eventRange
    } = seg;
    const {
      ui
    } = eventRange;
    const renderProps = {
      event: new EventImpl(context, eventRange.def, eventRange.instance),
      view: context.viewApi,
      timeText: props.timeText,
      textColor: ui.textColor,
      backgroundColor: ui.backgroundColor,
      borderColor: ui.borderColor,
      isDraggable: !props.disableDragging && computeSegDraggable(seg, context),
      isStartResizable: !props.disableResizing && computeSegStartResizable(seg, context),
      isEndResizable: !props.disableResizing && computeSegEndResizable(seg),
      isMirror: Boolean(props.isDragging || props.isResizing || props.isDateSelecting),
      isStart: Boolean(seg.isStart),
      isEnd: Boolean(seg.isEnd),
      isPast: Boolean(props.isPast),
      isFuture: Boolean(props.isFuture),
      isToday: Boolean(props.isToday),
      isSelected: Boolean(props.isSelected),
      isDragging: Boolean(props.isDragging),
      isResizing: Boolean(props.isResizing)
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props /* contains children */, {
      elRef: this.handleEl,
      elClasses: [...getEventClassNames(renderProps), ...seg.eventRange.ui.classNames, ...(props.elClasses || [])],
      renderProps: renderProps,
      generatorName: "eventContent",
      customGenerator: options.eventContent,
      defaultGenerator: props.defaultGenerator,
      classNameGenerator: options.eventClassNames,
      didMount: options.eventDidMount,
      willUnmount: options.eventWillUnmount
    }));
  }
  componentDidUpdate(prevProps) {
    if (this.el && this.props.seg !== prevProps.seg) {
      setElSeg(this.el, this.props.seg);
    }
  }
}

// should not be a purecomponent
class StandardEvent extends BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let {
      seg
    } = props;
    let {
      ui
    } = seg.eventRange;
    let timeFormat = options.eventTimeFormat || props.defaultTimeFormat;
    let timeText = buildSegTimeText(seg, timeFormat, context, props.defaultDisplayEventTime, props.defaultDisplayEventEnd);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContainer, Object.assign({}, props /* includes elRef */, {
      elTag: "a",
      elStyle: {
        borderColor: ui.borderColor,
        backgroundColor: ui.backgroundColor
      },
      elAttrs: getSegAnchorAttrs(seg, context),
      defaultGenerator: renderInnerContent$1,
      timeText: timeText
    }), (InnerContent, eventContentArg) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContent, {
      elTag: "div",
      elClasses: ['fc-event-main'],
      elStyle: {
        color: eventContentArg.textColor
      }
    }), Boolean(eventContentArg.isStartResizable) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-event-resizer fc-event-resizer-start"
    }), Boolean(eventContentArg.isEndResizable) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "fc-event-resizer fc-event-resizer-end"
    })));
  }
}
function renderInnerContent$1(innerProps) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-main-frame"
  }, innerProps.timeText && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-time"
  }, innerProps.timeText), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title fc-sticky"
  }, innerProps.event.title || (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\u00A0"))));
}
const NowIndicatorContainer = props => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewContextType.Consumer, null, context => {
  let {
    options
  } = context;
  let renderProps = {
    isAxis: props.isAxis,
    date: context.dateEnv.toDate(props.date),
    view: context.viewApi
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props /* includes children */, {
    elTag: props.elTag || 'div',
    renderProps: renderProps,
    generatorName: "nowIndicatorContent",
    customGenerator: options.nowIndicatorContent,
    classNameGenerator: options.nowIndicatorClassNames,
    didMount: options.nowIndicatorDidMount,
    willUnmount: options.nowIndicatorWillUnmount
  }));
});
const DAY_NUM_FORMAT = createFormatter({
  day: 'numeric'
});
class DayCellContainer extends BaseComponent {
  constructor() {
    super(...arguments);
    this.refineRenderProps = memoizeObjArg(refineRenderProps);
  }
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let renderProps = this.refineRenderProps({
      date: props.date,
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      isMonthStart: props.isMonthStart || false,
      showDayNumber: props.showDayNumber,
      extraRenderProps: props.extraRenderProps,
      viewApi: context.viewApi,
      dateEnv: context.dateEnv,
      monthStartFormat: options.monthStartFormat
    });
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props /* includes children */, {
      elClasses: [...getDayClassNames(renderProps, context.theme), ...(props.elClasses || [])],
      elAttrs: Object.assign(Object.assign({}, props.elAttrs), renderProps.isDisabled ? {} : {
        'data-date': formatDayString(props.date)
      }),
      renderProps: renderProps,
      generatorName: "dayCellContent",
      customGenerator: options.dayCellContent,
      defaultGenerator: props.defaultGenerator,
      classNameGenerator:
      // don't use custom classNames if disabled
      renderProps.isDisabled ? undefined : options.dayCellClassNames,
      didMount: options.dayCellDidMount,
      willUnmount: options.dayCellWillUnmount
    }));
  }
}
function hasCustomDayCellContent(options) {
  return Boolean(options.dayCellContent || hasCustomRenderingHandler('dayCellContent', options));
}
function refineRenderProps(raw) {
  let {
    date,
    dateEnv,
    dateProfile,
    isMonthStart
  } = raw;
  let dayMeta = getDateMeta(date, raw.todayRange, null, dateProfile);
  let dayNumberText = raw.showDayNumber ? dateEnv.format(date, isMonthStart ? raw.monthStartFormat : DAY_NUM_FORMAT) : '';
  return Object.assign(Object.assign(Object.assign({
    date: dateEnv.toDate(date),
    view: raw.viewApi
  }, dayMeta), {
    isMonthStart,
    dayNumberText
  }), raw.extraRenderProps);
}
class BgEvent extends BaseComponent {
  render() {
    let {
      props
    } = this;
    let {
      seg
    } = props;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContainer, {
      elTag: "div",
      elClasses: ['fc-bg-event'],
      elStyle: {
        backgroundColor: seg.eventRange.ui.backgroundColor
      },
      defaultGenerator: renderInnerContent,
      seg: seg,
      timeText: "",
      isDragging: false,
      isResizing: false,
      isDateSelecting: false,
      isSelected: false,
      isPast: props.isPast,
      isFuture: props.isFuture,
      isToday: props.isToday,
      disableDragging: true,
      disableResizing: true
    });
  }
}
function renderInnerContent(props) {
  let {
    title
  } = props.event;
  return title && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "fc-event-title"
  }, props.event.title);
}
function renderFill(fillType) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `fc-${fillType}`
  });
}
const WeekNumberContainer = props => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewContextType.Consumer, null, context => {
  let {
    dateEnv,
    options
  } = context;
  let {
    date
  } = props;
  let format = options.weekNumberFormat || props.defaultFormat;
  let num = dateEnv.computeWeekNumber(date); // TODO: somehow use for formatting as well?
  let text = dateEnv.format(date, format);
  let renderProps = {
    num,
    text,
    date
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer // why isn't WeekNumberContentArg being auto-detected?
  , Object.assign({}, props /* includes children */, {
    renderProps: renderProps,
    generatorName: "weekNumberContent",
    customGenerator: options.weekNumberContent,
    defaultGenerator: renderInner,
    classNameGenerator: options.weekNumberClassNames,
    didMount: options.weekNumberDidMount,
    willUnmount: options.weekNumberWillUnmount
  }));
});
function renderInner(innerProps) {
  return innerProps.text;
}
const PADDING_FROM_VIEWPORT = 10;
class Popover extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      titleId: getUniqueDomId()
    };
    this.handleRootEl = el => {
      this.rootEl = el;
      if (this.props.elRef) {
        setRef(this.props.elRef, el);
      }
    };
    // Triggered when the user clicks *anywhere* in the document, for the autoHide feature
    this.handleDocumentMouseDown = ev => {
      // only hide the popover if the click happened outside the popover
      const target = getEventTargetViaRoot(ev);
      if (!this.rootEl.contains(target)) {
        this.handleCloseClick();
      }
    };
    this.handleDocumentKeyDown = ev => {
      if (ev.key === 'Escape') {
        this.handleCloseClick();
      }
    };
    this.handleCloseClick = () => {
      let {
        onClose
      } = this.props;
      if (onClose) {
        onClose();
      }
    };
  }
  render() {
    let {
      theme,
      options
    } = this.context;
    let {
      props,
      state
    } = this;
    let classNames = ['fc-popover', theme.getClass('popover')].concat(props.extraClassNames || []);
    return (0,preact_compat__WEBPACK_IMPORTED_MODULE_1__.createPortal)((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", Object.assign({}, props.extraAttrs, {
      id: props.id,
      className: classNames.join(' '),
      "aria-labelledby": state.titleId,
      ref: this.handleRootEl
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'fc-popover-header ' + theme.getClass('popoverHeader')
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "fc-popover-title",
      id: state.titleId
    }, props.title), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: 'fc-popover-close ' + theme.getIconClass('close'),
      title: options.closeHint,
      onClick: this.handleCloseClick
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'fc-popover-body ' + theme.getClass('popoverContent')
    }, props.children)), props.parentEl);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    this.updateSize();
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }
  updateSize() {
    let {
      isRtl
    } = this.context;
    let {
      alignmentEl,
      alignGridTop
    } = this.props;
    let {
      rootEl
    } = this;
    let alignmentRect = computeClippedClientRect(alignmentEl);
    if (alignmentRect) {
      let popoverDims = rootEl.getBoundingClientRect();
      // position relative to viewport
      let popoverTop = alignGridTop ? elementClosest(alignmentEl, '.fc-scrollgrid').getBoundingClientRect().top : alignmentRect.top;
      let popoverLeft = isRtl ? alignmentRect.right - popoverDims.width : alignmentRect.left;
      // constrain
      popoverTop = Math.max(popoverTop, PADDING_FROM_VIEWPORT);
      popoverLeft = Math.min(popoverLeft, document.documentElement.clientWidth - PADDING_FROM_VIEWPORT - popoverDims.width);
      popoverLeft = Math.max(popoverLeft, PADDING_FROM_VIEWPORT);
      let origin = rootEl.offsetParent.getBoundingClientRect();
      applyStyle(rootEl, {
        top: popoverTop - origin.top,
        left: popoverLeft - origin.left
      });
    }
  }
}
class MorePopover extends DateComponent {
  constructor() {
    super(...arguments);
    this.handleRootEl = rootEl => {
      this.rootEl = rootEl;
      if (rootEl) {
        this.context.registerInteractiveComponent(this, {
          el: rootEl,
          useEventCenter: false
        });
      } else {
        this.context.unregisterInteractiveComponent(this);
      }
    };
  }
  render() {
    let {
      options,
      dateEnv
    } = this.context;
    let {
      props
    } = this;
    let {
      startDate,
      todayRange,
      dateProfile
    } = props;
    let title = dateEnv.format(startDate, options.dayPopoverFormat);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(DayCellContainer, {
      elRef: this.handleRootEl,
      date: startDate,
      dateProfile: dateProfile,
      todayRange: todayRange
    }, (InnerContent, renderProps, elAttrs) => (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(Popover, {
      elRef: elAttrs.ref,
      id: props.id,
      title: title,
      extraClassNames: ['fc-more-popover'].concat(elAttrs.className || []),
      extraAttrs: elAttrs /* TODO: make these time-based when not whole-day? */,
      parentEl: props.parentEl,
      alignmentEl: props.alignmentEl,
      alignGridTop: props.alignGridTop,
      onClose: props.onClose
    }, hasCustomDayCellContent(options) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerContent, {
      elTag: "div",
      elClasses: ['fc-more-popover-misc']
    }), props.children));
  }
  queryHit(positionLeft, positionTop, elWidth, elHeight) {
    let {
      rootEl,
      props
    } = this;
    if (positionLeft >= 0 && positionLeft < elWidth && positionTop >= 0 && positionTop < elHeight) {
      return {
        dateProfile: props.dateProfile,
        dateSpan: Object.assign({
          allDay: !props.forceTimed,
          range: {
            start: props.startDate,
            end: props.endDate
          }
        }, props.extraDateSpan),
        dayEl: rootEl,
        rect: {
          left: 0,
          top: 0,
          right: elWidth,
          bottom: elHeight
        },
        layer: 1 // important when comparing with hits from other components
      };
    }

    return null;
  }
}
class MoreLinkContainer extends BaseComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isPopoverOpen: false,
      popoverId: getUniqueDomId()
    };
    this.handleLinkEl = linkEl => {
      this.linkEl = linkEl;
      if (this.props.elRef) {
        setRef(this.props.elRef, linkEl);
      }
    };
    this.handleClick = ev => {
      let {
        props,
        context
      } = this;
      let {
        moreLinkClick
      } = context.options;
      let date = computeRange(props).start;
      function buildPublicSeg(seg) {
        let {
          def,
          instance,
          range
        } = seg.eventRange;
        return {
          event: new EventImpl(context, def, instance),
          start: context.dateEnv.toDate(range.start),
          end: context.dateEnv.toDate(range.end),
          isStart: seg.isStart,
          isEnd: seg.isEnd
        };
      }
      if (typeof moreLinkClick === 'function') {
        moreLinkClick = moreLinkClick({
          date,
          allDay: Boolean(props.allDayDate),
          allSegs: props.allSegs.map(buildPublicSeg),
          hiddenSegs: props.hiddenSegs.map(buildPublicSeg),
          jsEvent: ev,
          view: context.viewApi
        });
      }
      if (!moreLinkClick || moreLinkClick === 'popover') {
        this.setState({
          isPopoverOpen: true
        });
      } else if (typeof moreLinkClick === 'string') {
        // a view name
        context.calendarApi.zoomTo(date, moreLinkClick);
      }
    };
    this.handlePopoverClose = () => {
      this.setState({
        isPopoverOpen: false
      });
    };
  }
  render() {
    let {
      props,
      state
    } = this;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewContextType.Consumer, null, context => {
      let {
        viewApi,
        options,
        calendarApi
      } = context;
      let {
        moreLinkText
      } = options;
      let {
        moreCnt
      } = props;
      let range = computeRange(props);
      let text = typeof moreLinkText === 'function' // TODO: eventually use formatWithOrdinals
      ? moreLinkText.call(calendarApi, moreCnt) : `+${moreCnt} ${moreLinkText}`;
      let hint = formatWithOrdinals(options.moreLinkHint, [moreCnt], text);
      let renderProps = {
        num: moreCnt,
        shortText: `+${moreCnt}`,
        text,
        view: viewApi
      };
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Boolean(props.moreCnt) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, {
        elTag: props.elTag || 'a',
        elRef: this.handleLinkEl,
        elClasses: [...(props.elClasses || []), 'fc-more-link'],
        elStyle: props.elStyle,
        elAttrs: Object.assign(Object.assign(Object.assign({}, props.elAttrs), createAriaClickAttrs(this.handleClick)), {
          title: hint,
          'aria-expanded': state.isPopoverOpen,
          'aria-controls': state.isPopoverOpen ? state.popoverId : ''
        }),
        renderProps: renderProps,
        generatorName: "moreLinkContent",
        customGenerator: options.moreLinkContent,
        defaultGenerator: props.defaultGenerator || renderMoreLinkInner,
        classNameGenerator: options.moreLinkClassNames,
        didMount: options.moreLinkDidMount,
        willUnmount: options.moreLinkWillUnmount
      }, props.children), state.isPopoverOpen && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(MorePopover, {
        id: state.popoverId,
        startDate: range.start,
        endDate: range.end,
        dateProfile: props.dateProfile,
        todayRange: props.todayRange,
        extraDateSpan: props.extraDateSpan,
        parentEl: this.parentEl,
        alignmentEl: props.alignmentElRef ? props.alignmentElRef.current : this.linkEl,
        alignGridTop: props.alignGridTop,
        forceTimed: props.forceTimed,
        onClose: this.handlePopoverClose
      }, props.popoverContent()));
    });
  }
  componentDidMount() {
    this.updateParentEl();
  }
  componentDidUpdate() {
    this.updateParentEl();
  }
  updateParentEl() {
    if (this.linkEl) {
      this.parentEl = elementClosest(this.linkEl, '.fc-view-harness');
    }
  }
}
function renderMoreLinkInner(props) {
  return props.text;
}
function computeRange(props) {
  if (props.allDayDate) {
    return {
      start: props.allDayDate,
      end: addDays(props.allDayDate, 1)
    };
  }
  let {
    hiddenSegs
  } = props;
  return {
    start: computeEarliestSegStart(hiddenSegs),
    end: computeLatestSegEnd(hiddenSegs)
  };
}
function computeEarliestSegStart(segs) {
  return segs.reduce(pickEarliestStart).eventRange.range.start;
}
function pickEarliestStart(seg0, seg1) {
  return seg0.eventRange.range.start < seg1.eventRange.range.start ? seg0 : seg1;
}
function computeLatestSegEnd(segs) {
  return segs.reduce(pickLatestEnd).eventRange.range.end;
}
function pickLatestEnd(seg0, seg1) {
  return seg0.eventRange.range.end > seg1.eventRange.range.end ? seg0 : seg1;
}
class ViewContainer extends BaseComponent {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let renderProps = {
      view: context.viewApi
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentContainer, Object.assign({}, props, {
      elTag: props.elTag || 'div',
      elClasses: [...buildViewClassNames(props.viewSpec), ...(props.elClasses || [])],
      renderProps: renderProps,
      classNameGenerator: options.viewClassNames,
      generatorName: undefined,
      didMount: options.viewDidMount,
      willUnmount: options.viewWillUnmount
    }), () => props.children);
  }
}
function buildViewClassNames(viewSpec) {
  return [`fc-${viewSpec.type}-view`, 'fc-view'];
}
const EVENT_SOURCE_REFINERS = {
  id: String,
  defaultAllDay: Boolean,
  url: String,
  format: String,
  events: identity,
  eventDataTransform: identity,
  // for any network-related sources
  success: identity,
  failure: identity
};
function parseEventSource(raw, context, refiners = buildEventSourceRefiners(context)) {
  let rawObj;
  if (typeof raw === 'string') {
    rawObj = {
      url: raw
    };
  } else if (typeof raw === 'function' || Array.isArray(raw)) {
    rawObj = {
      events: raw
    };
  } else if (typeof raw === 'object' && raw) {
    // not null
    rawObj = raw;
  }
  if (rawObj) {
    let {
      refined,
      extra
    } = refineProps(rawObj, refiners);
    let metaRes = buildEventSourceMeta(refined, context);
    if (metaRes) {
      return {
        _raw: raw,
        isFetching: false,
        latestFetchId: '',
        fetchRange: null,
        defaultAllDay: refined.defaultAllDay,
        eventDataTransform: refined.eventDataTransform,
        success: refined.success,
        failure: refined.failure,
        publicId: refined.id || '',
        sourceId: guid(),
        sourceDefId: metaRes.sourceDefId,
        meta: metaRes.meta,
        ui: createEventUi(refined, context),
        extendedProps: extra
      };
    }
  }
  return null;
}
function buildEventSourceRefiners(context) {
  return Object.assign(Object.assign(Object.assign({}, EVENT_UI_REFINERS), EVENT_SOURCE_REFINERS), context.pluginHooks.eventSourceRefiners);
}
function buildEventSourceMeta(raw, context) {
  let defs = context.pluginHooks.eventSourceDefs;
  for (let i = defs.length - 1; i >= 0; i -= 1) {
    // later-added plugins take precedence
    let def = defs[i];
    let meta = def.parseMeta(raw);
    if (meta) {
      return {
        sourceDefId: i,
        meta
      };
    }
  }
  return null;
}
class CalendarImpl {
  getCurrentData() {
    return this.currentDataManager.getCurrentData();
  }
  dispatch(action) {
    this.currentDataManager.dispatch(action);
  }
  get view() {
    return this.getCurrentData().viewApi;
  }
  batchRendering(callback) {
    callback();
  }
  updateSize() {
    this.trigger('_resize', true);
  }
  // Options
  // -----------------------------------------------------------------------------------------------------------------
  setOption(name, val) {
    this.dispatch({
      type: 'SET_OPTION',
      optionName: name,
      rawOptionValue: val
    });
  }
  getOption(name) {
    return this.currentDataManager.currentCalendarOptionsInput[name];
  }
  getAvailableLocaleCodes() {
    return Object.keys(this.getCurrentData().availableRawLocales);
  }
  // Trigger
  // -----------------------------------------------------------------------------------------------------------------
  on(handlerName, handler) {
    let {
      currentDataManager
    } = this;
    if (currentDataManager.currentCalendarOptionsRefiners[handlerName]) {
      currentDataManager.emitter.on(handlerName, handler);
    } else {
      console.warn(`Unknown listener name '${handlerName}'`);
    }
  }
  off(handlerName, handler) {
    this.currentDataManager.emitter.off(handlerName, handler);
  }
  // not meant for public use
  trigger(handlerName, ...args) {
    this.currentDataManager.emitter.trigger(handlerName, ...args);
  }
  // View
  // -----------------------------------------------------------------------------------------------------------------
  changeView(viewType, dateOrRange) {
    this.batchRendering(() => {
      this.unselect();
      if (dateOrRange) {
        if (dateOrRange.start && dateOrRange.end) {
          // a range
          this.dispatch({
            type: 'CHANGE_VIEW_TYPE',
            viewType
          });
          this.dispatch({
            type: 'SET_OPTION',
            optionName: 'visibleRange',
            rawOptionValue: dateOrRange
          });
        } else {
          let {
            dateEnv
          } = this.getCurrentData();
          this.dispatch({
            type: 'CHANGE_VIEW_TYPE',
            viewType,
            dateMarker: dateEnv.createMarker(dateOrRange)
          });
        }
      } else {
        this.dispatch({
          type: 'CHANGE_VIEW_TYPE',
          viewType
        });
      }
    });
  }
  // Forces navigation to a view for the given date.
  // `viewType` can be a specific view name or a generic one like "week" or "day".
  // needs to change
  zoomTo(dateMarker, viewType) {
    let state = this.getCurrentData();
    let spec;
    viewType = viewType || 'day'; // day is default zoom
    spec = state.viewSpecs[viewType] || this.getUnitViewSpec(viewType);
    this.unselect();
    if (spec) {
      this.dispatch({
        type: 'CHANGE_VIEW_TYPE',
        viewType: spec.type,
        dateMarker
      });
    } else {
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker
      });
    }
  }
  // Given a duration singular unit, like "week" or "day", finds a matching view spec.
  // Preference is given to views that have corresponding buttons.
  getUnitViewSpec(unit) {
    let {
      viewSpecs,
      toolbarConfig
    } = this.getCurrentData();
    let viewTypes = [].concat(toolbarConfig.header ? toolbarConfig.header.viewsWithButtons : [], toolbarConfig.footer ? toolbarConfig.footer.viewsWithButtons : []);
    let i;
    let spec;
    for (let viewType in viewSpecs) {
      viewTypes.push(viewType);
    }
    for (i = 0; i < viewTypes.length; i += 1) {
      spec = viewSpecs[viewTypes[i]];
      if (spec) {
        if (spec.singleUnit === unit) {
          return spec;
        }
      }
    }
    return null;
  }
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  prev() {
    this.unselect();
    this.dispatch({
      type: 'PREV'
    });
  }
  next() {
    this.unselect();
    this.dispatch({
      type: 'NEXT'
    });
  }
  prevYear() {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: state.dateEnv.addYears(state.currentDate, -1)
    });
  }
  nextYear() {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: state.dateEnv.addYears(state.currentDate, 1)
    });
  }
  today() {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: getNow(state.calendarOptions.now, state.dateEnv)
    });
  }
  gotoDate(zonedDateInput) {
    let state = this.getCurrentData();
    this.unselect();
    this.dispatch({
      type: 'CHANGE_DATE',
      dateMarker: state.dateEnv.createMarker(zonedDateInput)
    });
  }
  incrementDate(deltaInput) {
    let state = this.getCurrentData();
    let delta = createDuration(deltaInput);
    if (delta) {
      // else, warn about invalid input?
      this.unselect();
      this.dispatch({
        type: 'CHANGE_DATE',
        dateMarker: state.dateEnv.add(state.currentDate, delta)
      });
    }
  }
  getDate() {
    let state = this.getCurrentData();
    return state.dateEnv.toDate(state.currentDate);
  }
  // Date Formatting Utils
  // -----------------------------------------------------------------------------------------------------------------
  formatDate(d, formatter) {
    let {
      dateEnv
    } = this.getCurrentData();
    return dateEnv.format(dateEnv.createMarker(d), createFormatter(formatter));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(d0, d1, settings) {
    let {
      dateEnv
    } = this.getCurrentData();
    return dateEnv.formatRange(dateEnv.createMarker(d0), dateEnv.createMarker(d1), createFormatter(settings), settings);
  }
  formatIso(d, omitTime) {
    let {
      dateEnv
    } = this.getCurrentData();
    return dateEnv.formatIso(dateEnv.createMarker(d), {
      omitTime
    });
  }
  // Date Selection / Event Selection / DayClick
  // -----------------------------------------------------------------------------------------------------------------
  select(dateOrObj, endDate) {
    let selectionInput;
    if (endDate == null) {
      if (dateOrObj.start != null) {
        selectionInput = dateOrObj;
      } else {
        selectionInput = {
          start: dateOrObj,
          end: null
        };
      }
    } else {
      selectionInput = {
        start: dateOrObj,
        end: endDate
      };
    }
    let state = this.getCurrentData();
    let selection = parseDateSpan(selectionInput, state.dateEnv, createDuration({
      days: 1
    }));
    if (selection) {
      // throw parse error otherwise?
      this.dispatch({
        type: 'SELECT_DATES',
        selection
      });
      triggerDateSelect(selection, null, state);
    }
  }
  unselect(pev) {
    let state = this.getCurrentData();
    if (state.dateSelection) {
      this.dispatch({
        type: 'UNSELECT_DATES'
      });
      triggerDateUnselect(pev, state);
    }
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(eventInput, sourceInput) {
    if (eventInput instanceof EventImpl) {
      let def = eventInput._def;
      let instance = eventInput._instance;
      let currentData = this.getCurrentData();
      // not already present? don't want to add an old snapshot
      if (!currentData.eventStore.defs[def.defId]) {
        this.dispatch({
          type: 'ADD_EVENTS',
          eventStore: eventTupleToStore({
            def,
            instance
          }) // TODO: better util for two args?
        });

        this.triggerEventAdd(eventInput);
      }
      return eventInput;
    }
    let state = this.getCurrentData();
    let eventSource;
    if (sourceInput instanceof EventSourceImpl) {
      eventSource = sourceInput.internalEventSource;
    } else if (typeof sourceInput === 'boolean') {
      if (sourceInput) {
        // true. part of the first event source
        [eventSource] = hashValuesToArray(state.eventSources);
      }
    } else if (sourceInput != null) {
      // an ID. accepts a number too
      let sourceApi = this.getEventSourceById(sourceInput); // TODO: use an internal function
      if (!sourceApi) {
        console.warn(`Could not find an event source with ID "${sourceInput}"`); // TODO: test
        return null;
      }
      eventSource = sourceApi.internalEventSource;
    }
    let tuple = parseEvent(eventInput, eventSource, state, false);
    if (tuple) {
      let newEventApi = new EventImpl(state, tuple.def, tuple.def.recurringDef ? null : tuple.instance);
      this.dispatch({
        type: 'ADD_EVENTS',
        eventStore: eventTupleToStore(tuple)
      });
      this.triggerEventAdd(newEventApi);
      return newEventApi;
    }
    return null;
  }
  triggerEventAdd(eventApi) {
    let {
      emitter
    } = this.getCurrentData();
    emitter.trigger('eventAdd', {
      event: eventApi,
      relatedEvents: [],
      revert: () => {
        this.dispatch({
          type: 'REMOVE_EVENTS',
          eventStore: eventApiToStore(eventApi)
        });
      }
    });
  }
  // TODO: optimize
  getEventById(id) {
    let state = this.getCurrentData();
    let {
      defs,
      instances
    } = state.eventStore;
    id = String(id);
    for (let defId in defs) {
      let def = defs[defId];
      if (def.publicId === id) {
        if (def.recurringDef) {
          return new EventImpl(state, def, null);
        }
        for (let instanceId in instances) {
          let instance = instances[instanceId];
          if (instance.defId === def.defId) {
            return new EventImpl(state, def, instance);
          }
        }
      }
    }
    return null;
  }
  getEvents() {
    let currentData = this.getCurrentData();
    return buildEventApis(currentData.eventStore, currentData);
  }
  removeAllEvents() {
    this.dispatch({
      type: 'REMOVE_ALL_EVENTS'
    });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let state = this.getCurrentData();
    let sourceHash = state.eventSources;
    let sourceApis = [];
    for (let internalId in sourceHash) {
      sourceApis.push(new EventSourceImpl(state, sourceHash[internalId]));
    }
    return sourceApis;
  }
  getEventSourceById(id) {
    let state = this.getCurrentData();
    let sourceHash = state.eventSources;
    id = String(id);
    for (let sourceId in sourceHash) {
      if (sourceHash[sourceId].publicId === id) {
        return new EventSourceImpl(state, sourceHash[sourceId]);
      }
    }
    return null;
  }
  addEventSource(sourceInput) {
    let state = this.getCurrentData();
    if (sourceInput instanceof EventSourceImpl) {
      // not already present? don't want to add an old snapshot
      if (!state.eventSources[sourceInput.internalEventSource.sourceId]) {
        this.dispatch({
          type: 'ADD_EVENT_SOURCES',
          sources: [sourceInput.internalEventSource]
        });
      }
      return sourceInput;
    }
    let eventSource = parseEventSource(sourceInput, state);
    if (eventSource) {
      // TODO: error otherwise?
      this.dispatch({
        type: 'ADD_EVENT_SOURCES',
        sources: [eventSource]
      });
      return new EventSourceImpl(state, eventSource);
    }
    return null;
  }
  removeAllEventSources() {
    this.dispatch({
      type: 'REMOVE_ALL_EVENT_SOURCES'
    });
  }
  refetchEvents() {
    this.dispatch({
      type: 'FETCH_EVENT_SOURCES',
      isRefetch: true
    });
  }
  // Scroll
  // -----------------------------------------------------------------------------------------------------------------
  scrollToTime(timeInput) {
    let time = createDuration(timeInput);
    if (time) {
      this.trigger('_scrollRequest', {
        time
      });
    }
  }
}
class Store {
  constructor() {
    this.handlers = [];
  }
  set(value) {
    this.currentValue = value;
    for (let handler of this.handlers) {
      handler(value);
    }
  }
  subscribe(handler) {
    this.handlers.push(handler);
    if (this.currentValue !== undefined) {
      handler(this.currentValue);
    }
  }
}

/*
Subscribers will get a LIST of CustomRenderings
*/
class CustomRenderingStore extends Store {
  constructor() {
    super(...arguments);
    this.map = new Map();
  }
  // for consistent order
  handle(customRendering) {
    const {
      map
    } = this;
    let updated = false;
    if (customRendering.isActive) {
      map.set(customRendering.id, customRendering);
      updated = true;
    } else if (map.has(customRendering.id)) {
      map.delete(customRendering.id);
      updated = true;
    }
    if (updated) {
      this.set(map);
    }
  }
}


/***/ }),

/***/ 69684:
/*!*****************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ index)
/* harmony export */ });
/* harmony import */ var _fullcalendar_core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core/index.js */ 27946);
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal.js */ 1619);




var index = (0,_fullcalendar_core_index_js__WEBPACK_IMPORTED_MODULE_0__.createPlugin)({
  name: '@fullcalendar/daygrid',
  initialView: 'dayGridMonth',
  views: {
    dayGrid: {
      component: _internal_js__WEBPACK_IMPORTED_MODULE_1__.DayGridView,
      dateProfileGeneratorClass: _internal_js__WEBPACK_IMPORTED_MODULE_1__.TableDateProfileGenerator
    },
    dayGridDay: {
      type: 'dayGrid',
      duration: {
        days: 1
      }
    },
    dayGridWeek: {
      type: 'dayGrid',
      duration: {
        weeks: 1
      }
    },
    dayGridMonth: {
      type: 'dayGrid',
      duration: {
        months: 1
      },
      fixedWeekCount: true
    },
    dayGridYear: {
      type: 'dayGrid',
      duration: {
        years: 1
      }
    }
  }
});


/***/ }),

/***/ 1619:
/*!********************************************************!*\
  !*** ./node_modules/@fullcalendar/daygrid/internal.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DayGridView: () => (/* binding */ DayTableView),
/* harmony export */   DayTable: () => (/* binding */ DayTable),
/* harmony export */   DayTableSlicer: () => (/* binding */ DayTableSlicer),
/* harmony export */   Table: () => (/* binding */ Table),
/* harmony export */   TableDateProfileGenerator: () => (/* binding */ TableDateProfileGenerator),
/* harmony export */   TableRows: () => (/* binding */ TableRows),
/* harmony export */   TableView: () => (/* binding */ TableView),
/* harmony export */   buildDayTableModel: () => (/* binding */ buildDayTableModel),
/* harmony export */   buildDayTableRenderRange: () => (/* binding */ buildDayTableRenderRange)
/* harmony export */ });
/* harmony import */ var _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core/internal.js */ 20483);
/* harmony import */ var _fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/core/preact.js */ 49453);


var css_248z = ":root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:\"\";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:\"\";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}";
(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cw)(css_248z);
function splitSegsByRow(segs, rowCnt) {
  let byRow = [];
  for (let i = 0; i < rowCnt; i += 1) {
    byRow[i] = [];
  }
  for (let seg of segs) {
    byRow[seg.row].push(seg);
  }
  return byRow;
}
function splitSegsByFirstCol(segs, colCnt) {
  let byCol = [];
  for (let i = 0; i < colCnt; i += 1) {
    byCol[i] = [];
  }
  for (let seg of segs) {
    byCol[seg.firstCol].push(seg);
  }
  return byCol;
}
function splitInteractionByRow(ui, rowCnt) {
  let byRow = [];
  if (!ui) {
    for (let i = 0; i < rowCnt; i += 1) {
      byRow[i] = null;
    }
  } else {
    for (let i = 0; i < rowCnt; i += 1) {
      byRow[i] = {
        affectedInstances: ui.affectedInstances,
        isEvent: ui.isEvent,
        segs: []
      };
    }
    for (let seg of ui.segs) {
      byRow[seg.row].segs.push(seg);
    }
  }
  return byRow;
}
const DEFAULT_TABLE_EVENT_TIME_FORMAT = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.x)({
  hour: 'numeric',
  minute: '2-digit',
  omitZeroMinute: true,
  meridiem: 'narrow'
});
function hasListItemDisplay(seg) {
  let {
    display
  } = seg.eventRange.ui;
  return display === 'list-item' || display === 'auto' && !seg.eventRange.def.allDay && seg.firstCol === seg.lastCol &&
  // can't be multi-day
  seg.isStart &&
  // "
  seg.isEnd // "
  ;
}

class TableBlockEvent extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let {
      props
    } = this;
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cj, Object.assign({}, props, {
      elClasses: ['fc-daygrid-event', 'fc-daygrid-block-event', 'fc-h-event'],
      defaultTimeFormat: DEFAULT_TABLE_EVENT_TIME_FORMAT,
      defaultDisplayEventEnd: props.defaultDisplayEventEnd,
      disableResizing: !props.seg.eventRange.def.allDay
    }));
  }
}
class TableListItemEvent extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.B {
  render() {
    let {
      props,
      context
    } = this;
    let {
      options
    } = context;
    let {
      seg
    } = props;
    let timeFormat = options.eventTimeFormat || DEFAULT_TABLE_EVENT_TIME_FORMAT;
    let timeText = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bQ)(seg, timeFormat, context, true, props.defaultDisplayEventEnd);
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cn, Object.assign({}, props, {
      elTag: "a",
      elClasses: ['fc-daygrid-event', 'fc-daygrid-dot-event'],
      elAttrs: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bU)(props.seg, context),
      defaultGenerator: renderInnerContent,
      timeText: timeText,
      isResizing: false,
      isDateSelecting: false
    }));
  }
}
function renderInnerContent(renderProps) {
  return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "fc-daygrid-event-dot",
    style: {
      borderColor: renderProps.borderColor || renderProps.backgroundColor
    }
  }), renderProps.timeText && (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "fc-event-time"
  }, renderProps.timeText), (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "fc-event-title"
  }, renderProps.event.title || (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "\u00A0")));
}
class TableCellMoreLink extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.B {
  constructor() {
    super(...arguments);
    this.compileSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(compileSegs);
  }
  render() {
    let {
      props
    } = this;
    let {
      allSegs,
      invisibleSegs
    } = this.compileSegs(props.singlePlacements);
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cr, {
      elClasses: ['fc-daygrid-more-link'],
      dateProfile: props.dateProfile,
      todayRange: props.todayRange,
      allDayDate: props.allDayDate,
      moreCnt: props.moreCnt,
      allSegs: allSegs,
      hiddenSegs: invisibleSegs,
      alignmentElRef: props.alignmentElRef,
      alignGridTop: props.alignGridTop,
      extraDateSpan: props.extraDateSpan,
      popoverContent: () => {
        let isForcedInvisible = (props.eventDrag ? props.eventDrag.affectedInstances : null) || (props.eventResize ? props.eventResize.affectedInstances : null) || {};
        return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, allSegs.map(seg => {
          let instanceId = seg.eventRange.instance.instanceId;
          return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
            className: "fc-daygrid-event-harness",
            key: instanceId,
            style: {
              visibility: isForcedInvisible[instanceId] ? 'hidden' : ''
            }
          }, hasListItemDisplay(seg) ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableListItemEvent, Object.assign({
            seg: seg,
            isDragging: false,
            isSelected: instanceId === props.eventSelection,
            defaultDisplayEventEnd: false
          }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, props.todayRange))) : (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableBlockEvent, Object.assign({
            seg: seg,
            isDragging: false,
            isResizing: false,
            isDateSelecting: false,
            isSelected: instanceId === props.eventSelection,
            defaultDisplayEventEnd: false
          }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, props.todayRange))));
        }));
      }
    });
  }
}
function compileSegs(singlePlacements) {
  let allSegs = [];
  let invisibleSegs = [];
  for (let placement of singlePlacements) {
    allSegs.push(placement.seg);
    if (!placement.isVisible) {
      invisibleSegs.push(placement.seg);
    }
  }
  return {
    allSegs,
    invisibleSegs
  };
}
const DEFAULT_WEEK_NUM_FORMAT = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.x)({
  week: 'narrow'
});
class TableCell extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.rootElRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.state = {
      dayNumberId: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a5)()
    };
    this.handleRootEl = el => {
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Y)(this.rootElRef, el);
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Y)(this.props.elRef, el);
    };
  }
  render() {
    let {
      context,
      props,
      state,
      rootElRef
    } = this;
    let {
      options,
      dateEnv
    } = context;
    let {
      date,
      dateProfile
    } = props;
    // TODO: memoize this?
    const isMonthStart = props.showDayNumber && shouldDisplayMonthStart(date, dateProfile.currentRange, dateEnv);
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cl, {
      elTag: "td",
      elRef: this.handleRootEl,
      elClasses: ['fc-daygrid-day', ...(props.extraClassNames || [])],
      elAttrs: Object.assign(Object.assign(Object.assign({}, props.extraDataAttrs), props.showDayNumber ? {
        'aria-labelledby': state.dayNumberId
      } : {}), {
        role: 'gridcell'
      }),
      defaultGenerator: renderTopInner,
      date: date,
      dateProfile: dateProfile,
      todayRange: props.todayRange,
      showDayNumber: props.showDayNumber,
      isMonthStart: isMonthStart,
      extraRenderProps: props.extraRenderProps
    }, (InnerContent, renderProps) => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      ref: props.innerElRef,
      className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
      style: {
        minHeight: props.minHeight
      }
    }, props.showWeekNumber && (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cq, {
      elTag: "a",
      elClasses: ['fc-daygrid-week-number'],
      elAttrs: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b0)(context, date, 'week'),
      date: date,
      defaultFormat: DEFAULT_WEEK_NUM_FORMAT
    }), !renderProps.isDisabled && (props.showDayNumber || (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cm)(options) || props.forceDayTop) ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-top"
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(InnerContent, {
      elTag: "a",
      elClasses: ['fc-daygrid-day-number', isMonthStart && 'fc-daygrid-month-start'],
      elAttrs: Object.assign(Object.assign({}, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b0)(context, date)), {
        id: state.dayNumberId
      })
    })) : props.showDayNumber ?
    // for creating correct amount of space (see issue #7162)
    (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-top",
      style: {
        visibility: 'hidden'
      }
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
      className: "fc-daygrid-day-number"
    }, "\u00A0")) : undefined, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-events",
      ref: props.fgContentElRef
    }, props.fgContent, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-bottom",
      style: {
        marginTop: props.moreMarginTop
      }
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableCellMoreLink, {
      allDayDate: date,
      singlePlacements: props.singlePlacements,
      moreCnt: props.moreCnt,
      alignmentElRef: rootElRef,
      alignGridTop: !props.showDayNumber,
      extraDateSpan: props.extraDateSpan,
      dateProfile: props.dateProfile,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      todayRange: props.todayRange
    }))), (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "fc-daygrid-day-bg"
    }, props.bgContent)));
  }
}
function renderTopInner(props) {
  return props.dayNumberText || (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, "\u00A0");
}
function shouldDisplayMonthStart(date, currentRange, dateEnv) {
  const {
    start: currentStart,
    end: currentEnd
  } = currentRange;
  const currentEndIncl = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bg)(currentEnd, -1);
  const currentFirstYear = dateEnv.getYear(currentStart);
  const currentFirstMonth = dateEnv.getMonth(currentStart);
  const currentLastYear = dateEnv.getYear(currentEndIncl);
  const currentLastMonth = dateEnv.getMonth(currentEndIncl);
  // spans more than one month?
  return !(currentFirstYear === currentLastYear && currentFirstMonth === currentLastMonth) && Boolean(
  // first date in current view?
  date.valueOf() === currentStart.valueOf() ||
  // a month-start that's within the current range?
  dateEnv.getDay(date) === 1 && date.valueOf() < currentEnd.valueOf());
}
function computeFgSegPlacement(segs,
// assumed already sorted
dayMaxEvents, dayMaxEventRows, strictOrder, eventInstanceHeights, maxContentHeight, cells) {
  let hierarchy = new DayGridSegHierarchy();
  hierarchy.allowReslicing = true;
  hierarchy.strictOrder = strictOrder;
  if (dayMaxEvents === true || dayMaxEventRows === true) {
    hierarchy.maxCoord = maxContentHeight;
    hierarchy.hiddenConsumes = true;
  } else if (typeof dayMaxEvents === 'number') {
    hierarchy.maxStackCnt = dayMaxEvents;
  } else if (typeof dayMaxEventRows === 'number') {
    hierarchy.maxStackCnt = dayMaxEventRows;
    hierarchy.hiddenConsumes = true;
  }
  // create segInputs only for segs with known heights
  let segInputs = [];
  let unknownHeightSegs = [];
  for (let i = 0; i < segs.length; i += 1) {
    let seg = segs[i];
    let {
      instanceId
    } = seg.eventRange.instance;
    let eventHeight = eventInstanceHeights[instanceId];
    if (eventHeight != null) {
      segInputs.push({
        index: i,
        thickness: eventHeight,
        span: {
          start: seg.firstCol,
          end: seg.lastCol + 1
        }
      });
    } else {
      unknownHeightSegs.push(seg);
    }
  }
  let hiddenEntries = hierarchy.addSegs(segInputs);
  let segRects = hierarchy.toRects();
  let {
    singleColPlacements,
    multiColPlacements,
    leftoverMargins
  } = placeRects(segRects, segs, cells);
  let moreCnts = [];
  let moreMarginTops = [];
  // add segs with unknown heights
  for (let seg of unknownHeightSegs) {
    multiColPlacements[seg.firstCol].push({
      seg,
      isVisible: false,
      isAbsolute: true,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let col = seg.firstCol; col <= seg.lastCol; col += 1) {
      singleColPlacements[col].push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: false,
        isAbsolute: false,
        absoluteTop: 0,
        marginTop: 0
      });
    }
  }
  // add the hidden entries
  for (let col = 0; col < cells.length; col += 1) {
    moreCnts.push(0);
  }
  for (let hiddenEntry of hiddenEntries) {
    let seg = segs[hiddenEntry.index];
    let hiddenSpan = hiddenEntry.span;
    multiColPlacements[hiddenSpan.start].push({
      seg: resliceSeg(seg, hiddenSpan.start, hiddenSpan.end, cells),
      isVisible: false,
      isAbsolute: true,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let col = hiddenSpan.start; col < hiddenSpan.end; col += 1) {
      moreCnts[col] += 1;
      singleColPlacements[col].push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: false,
        isAbsolute: false,
        absoluteTop: 0,
        marginTop: 0
      });
    }
  }
  // deal with leftover margins
  for (let col = 0; col < cells.length; col += 1) {
    moreMarginTops.push(leftoverMargins[col]);
  }
  return {
    singleColPlacements,
    multiColPlacements,
    moreCnts,
    moreMarginTops
  };
}
// rects ordered by top coord, then left
function placeRects(allRects, segs, cells) {
  let rectsByEachCol = groupRectsByEachCol(allRects, cells.length);
  let singleColPlacements = [];
  let multiColPlacements = [];
  let leftoverMargins = [];
  for (let col = 0; col < cells.length; col += 1) {
    let rects = rectsByEachCol[col];
    // compute all static segs in singlePlacements
    let singlePlacements = [];
    let currentHeight = 0;
    let currentMarginTop = 0;
    for (let rect of rects) {
      let seg = segs[rect.index];
      singlePlacements.push({
        seg: resliceSeg(seg, col, col + 1, cells),
        isVisible: true,
        isAbsolute: false,
        absoluteTop: rect.levelCoord,
        marginTop: rect.levelCoord - currentHeight
      });
      currentHeight = rect.levelCoord + rect.thickness;
    }
    // compute mixed static/absolute segs in multiPlacements
    let multiPlacements = [];
    currentHeight = 0;
    currentMarginTop = 0;
    for (let rect of rects) {
      let seg = segs[rect.index];
      let isAbsolute = rect.span.end - rect.span.start > 1; // multi-column?
      let isFirstCol = rect.span.start === col;
      currentMarginTop += rect.levelCoord - currentHeight; // amount of space since bottom of previous seg
      currentHeight = rect.levelCoord + rect.thickness; // height will now be bottom of current seg
      if (isAbsolute) {
        currentMarginTop += rect.thickness;
        if (isFirstCol) {
          multiPlacements.push({
            seg: resliceSeg(seg, rect.span.start, rect.span.end, cells),
            isVisible: true,
            isAbsolute: true,
            absoluteTop: rect.levelCoord,
            marginTop: 0
          });
        }
      } else if (isFirstCol) {
        multiPlacements.push({
          seg: resliceSeg(seg, rect.span.start, rect.span.end, cells),
          isVisible: true,
          isAbsolute: false,
          absoluteTop: rect.levelCoord,
          marginTop: currentMarginTop // claim the margin
        });

        currentMarginTop = 0;
      }
    }
    singleColPlacements.push(singlePlacements);
    multiColPlacements.push(multiPlacements);
    leftoverMargins.push(currentMarginTop);
  }
  return {
    singleColPlacements,
    multiColPlacements,
    leftoverMargins
  };
}
function groupRectsByEachCol(rects, colCnt) {
  let rectsByEachCol = [];
  for (let col = 0; col < colCnt; col += 1) {
    rectsByEachCol.push([]);
  }
  for (let rect of rects) {
    for (let col = rect.span.start; col < rect.span.end; col += 1) {
      rectsByEachCol[col].push(rect);
    }
  }
  return rectsByEachCol;
}
function resliceSeg(seg, spanStart, spanEnd, cells) {
  if (seg.firstCol === spanStart && seg.lastCol === spanEnd - 1) {
    return seg;
  }
  let eventRange = seg.eventRange;
  let origRange = eventRange.range;
  let slicedRange = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.o)(origRange, {
    start: cells[spanStart].date,
    end: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.t)(cells[spanEnd - 1].date, 1)
  });
  return Object.assign(Object.assign({}, seg), {
    firstCol: spanStart,
    lastCol: spanEnd - 1,
    eventRange: {
      def: eventRange.def,
      ui: Object.assign(Object.assign({}, eventRange.ui), {
        durationEditable: false
      }),
      instance: eventRange.instance,
      range: slicedRange
    },
    isStart: seg.isStart && slicedRange.start.valueOf() === origRange.start.valueOf(),
    isEnd: seg.isEnd && slicedRange.end.valueOf() === origRange.end.valueOf()
  });
}
class DayGridSegHierarchy extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bA {
  constructor() {
    super(...arguments);
    // config
    this.hiddenConsumes = false;
    // allows us to keep hidden entries in the hierarchy so they take up space
    this.forceHidden = {};
  }
  addSegs(segInputs) {
    const hiddenSegs = super.addSegs(segInputs);
    const {
      entriesByLevel
    } = this;
    const excludeHidden = entry => !this.forceHidden[(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bB)(entry)];
    // remove the forced-hidden segs
    for (let level = 0; level < entriesByLevel.length; level += 1) {
      entriesByLevel[level] = entriesByLevel[level].filter(excludeHidden);
    }
    return hiddenSegs;
  }
  handleInvalidInsertion(insertion, entry, hiddenEntries) {
    const {
      entriesByLevel,
      forceHidden
    } = this;
    const {
      touchingEntry,
      touchingLevel,
      touchingLateral
    } = insertion;
    if (this.hiddenConsumes && touchingEntry) {
      const touchingEntryId = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bB)(touchingEntry);
      // if not already hidden
      if (!forceHidden[touchingEntryId]) {
        if (this.allowReslicing) {
          const placeholderEntry = Object.assign(Object.assign({}, touchingEntry), {
            span: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bF)(touchingEntry.span, entry.span)
          });
          const placeholderEntryId = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bB)(placeholderEntry);
          forceHidden[placeholderEntryId] = true;
          entriesByLevel[touchingLevel][touchingLateral] = placeholderEntry; // replace touchingEntry with our placeholder
          this.splitEntry(touchingEntry, entry, hiddenEntries); // split up the touchingEntry, reinsert it
        } else {
          forceHidden[touchingEntryId] = true;
          hiddenEntries.push(touchingEntry);
        }
      }
    }
    return super.handleInvalidInsertion(insertion, entry, hiddenEntries);
  }
}
class TableRow extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.cellElRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // the <td>
    this.frameElRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // the fc-daygrid-day-frame
    this.fgElRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // the fc-daygrid-day-events
    this.segHarnessRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf(); // indexed by "instanceId:firstCol"
    this.rootElRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.state = {
      framePositions: null,
      maxContentHeight: null,
      eventInstanceHeights: {}
    };
    this.handleResize = isForced => {
      if (isForced) {
        this.updateSizing(true); // isExternal=true
      }
    };
  }

  render() {
    let {
      props,
      state,
      context
    } = this;
    let {
      options
    } = context;
    let colCnt = props.cells.length;
    let businessHoursByCol = splitSegsByFirstCol(props.businessHourSegs, colCnt);
    let bgEventSegsByCol = splitSegsByFirstCol(props.bgEventSegs, colCnt);
    let highlightSegsByCol = splitSegsByFirstCol(this.getHighlightSegs(), colCnt);
    let mirrorSegsByCol = splitSegsByFirstCol(this.getMirrorSegs(), colCnt);
    let {
      singleColPlacements,
      multiColPlacements,
      moreCnts,
      moreMarginTops
    } = computeFgSegPlacement((0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bR)(props.fgEventSegs, options.eventOrder), props.dayMaxEvents, props.dayMaxEventRows, options.eventOrderStrict, state.eventInstanceHeights, state.maxContentHeight, props.cells);
    let isForcedInvisible =
    // TODO: messy way to compute this
    props.eventDrag && props.eventDrag.affectedInstances || props.eventResize && props.eventResize.affectedInstances || {};
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("tr", {
      ref: this.rootElRef,
      role: "row"
    }, props.renderIntro && props.renderIntro(), props.cells.map((cell, col) => {
      let normalFgNodes = this.renderFgSegs(col, props.forPrint ? singleColPlacements[col] : multiColPlacements[col], props.todayRange, isForcedInvisible);
      let mirrorFgNodes = this.renderFgSegs(col, buildMirrorPlacements(mirrorSegsByCol[col], multiColPlacements), props.todayRange, {}, Boolean(props.eventDrag), Boolean(props.eventResize), false);
      return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableCell, {
        key: cell.key,
        elRef: this.cellElRefs.createRef(cell.key),
        innerElRef: this.frameElRefs.createRef(cell.key) /* FF <td> problem, but okay to use for left/right. TODO: rename prop */,
        dateProfile: props.dateProfile,
        date: cell.date,
        showDayNumber: props.showDayNumbers,
        showWeekNumber: props.showWeekNumbers && col === 0,
        forceDayTop: props.showWeekNumbers /* even displaying weeknum for row, not necessarily day */,
        todayRange: props.todayRange,
        eventSelection: props.eventSelection,
        eventDrag: props.eventDrag,
        eventResize: props.eventResize,
        extraRenderProps: cell.extraRenderProps,
        extraDataAttrs: cell.extraDataAttrs,
        extraClassNames: cell.extraClassNames,
        extraDateSpan: cell.extraDateSpan,
        moreCnt: moreCnts[col],
        moreMarginTop: moreMarginTops[col],
        singlePlacements: singleColPlacements[col],
        fgContentElRef: this.fgElRefs.createRef(cell.key),
        fgContent:
        // Fragment scopes the keys
        (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, normalFgNodes), (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, mirrorFgNodes)),
        bgContent:
        // Fragment scopes the keys
        (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, this.renderFillSegs(highlightSegsByCol[col], 'highlight'), this.renderFillSegs(businessHoursByCol[col], 'non-business'), this.renderFillSegs(bgEventSegsByCol[col], 'bg-event')),
        minHeight: props.cellMinHeight
      });
    }));
  }
  componentDidMount() {
    this.updateSizing(true);
    this.context.addResizeHandler(this.handleResize);
  }
  componentDidUpdate(prevProps, prevState) {
    let currentProps = this.props;
    this.updateSizing(!(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.E)(prevProps, currentProps));
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleResize);
  }
  getHighlightSegs() {
    let {
      props
    } = this;
    if (props.eventDrag && props.eventDrag.segs.length) {
      // messy check
      return props.eventDrag.segs;
    }
    if (props.eventResize && props.eventResize.segs.length) {
      // messy check
      return props.eventResize.segs;
    }
    return props.dateSelectionSegs;
  }
  getMirrorSegs() {
    let {
      props
    } = this;
    if (props.eventResize && props.eventResize.segs.length) {
      // messy check
      return props.eventResize.segs;
    }
    return [];
  }
  renderFgSegs(col, segPlacements, todayRange, isForcedInvisible, isDragging, isResizing, isDateSelecting) {
    let {
      context
    } = this;
    let {
      eventSelection
    } = this.props;
    let {
      framePositions
    } = this.state;
    let defaultDisplayEventEnd = this.props.cells.length === 1; // colCnt === 1
    let isMirror = isDragging || isResizing || isDateSelecting;
    let nodes = [];
    if (framePositions) {
      for (let placement of segPlacements) {
        let {
          seg
        } = placement;
        let {
          instanceId
        } = seg.eventRange.instance;
        let key = instanceId + ':' + col;
        let isVisible = placement.isVisible && !isForcedInvisible[instanceId];
        let isAbsolute = placement.isAbsolute;
        let left = '';
        let right = '';
        if (isAbsolute) {
          if (context.isRtl) {
            right = 0;
            left = framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol];
          } else {
            left = 0;
            right = framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol];
          }
        }
        /*
        known bug: events that are force to be list-item but span multiple days still take up space in later columns
        todo: in print view, for multi-day events, don't display title within non-start/end segs
        */
        nodes.push((0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          className: 'fc-daygrid-event-harness' + (isAbsolute ? ' fc-daygrid-event-harness-abs' : ''),
          key: key,
          ref: isMirror ? null : this.segHarnessRefs.createRef(key),
          style: {
            visibility: isVisible ? '' : 'hidden',
            marginTop: isAbsolute ? '' : placement.marginTop,
            top: isAbsolute ? placement.absoluteTop : '',
            left,
            right
          }
        }, hasListItemDisplay(seg) ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableListItemEvent, Object.assign({
          seg: seg,
          isDragging: isDragging,
          isSelected: instanceId === eventSelection,
          defaultDisplayEventEnd: defaultDisplayEventEnd
        }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, todayRange))) : (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableBlockEvent, Object.assign({
          seg: seg,
          isDragging: isDragging,
          isResizing: isResizing,
          isDateSelecting: isDateSelecting,
          isSelected: instanceId === eventSelection,
          defaultDisplayEventEnd: defaultDisplayEventEnd
        }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, todayRange)))));
      }
    }
    return nodes;
  }
  renderFillSegs(segs, fillType) {
    let {
      isRtl
    } = this.context;
    let {
      todayRange
    } = this.props;
    let {
      framePositions
    } = this.state;
    let nodes = [];
    if (framePositions) {
      for (let seg of segs) {
        let leftRightCss = isRtl ? {
          right: 0,
          left: framePositions.lefts[seg.lastCol] - framePositions.lefts[seg.firstCol]
        } : {
          left: 0,
          right: framePositions.rights[seg.firstCol] - framePositions.rights[seg.lastCol]
        };
        nodes.push((0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          key: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bT)(seg.eventRange),
          className: "fc-daygrid-bg-harness",
          style: leftRightCss
        }, fillType === 'bg-event' ? (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cp, Object.assign({
          seg: seg
        }, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bS)(seg, todayRange))) : (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.co)(fillType)));
      }
    }
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, {}, ...nodes);
  }
  updateSizing(isExternalSizingChange) {
    let {
      props,
      state,
      frameElRefs
    } = this;
    if (!props.forPrint && props.clientWidth !== null // positioning ready?
    ) {
      if (isExternalSizingChange) {
        let frameEls = props.cells.map(cell => frameElRefs.currentMap[cell.key]);
        if (frameEls.length) {
          let originEl = this.rootElRef.current;
          let newPositionCache = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(originEl, frameEls, true,
          // isHorizontal
          false);
          if (!state.framePositions || !state.framePositions.similarTo(newPositionCache)) {
            this.setState({
              framePositions: new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(originEl, frameEls, true,
              // isHorizontal
              false)
            });
          }
        }
      }
      const oldInstanceHeights = this.state.eventInstanceHeights;
      const newInstanceHeights = this.queryEventInstanceHeights();
      const limitByContentHeight = props.dayMaxEvents === true || props.dayMaxEventRows === true;
      this.safeSetState({
        // HACK to prevent oscillations of events being shown/hidden from max-event-rows
        // Essentially, once you compute an element's height, never null-out.
        // TODO: always display all events, as visibility:hidden?
        eventInstanceHeights: Object.assign(Object.assign({}, oldInstanceHeights), newInstanceHeights),
        maxContentHeight: limitByContentHeight ? this.computeMaxContentHeight() : null
      });
    }
  }
  queryEventInstanceHeights() {
    let segElMap = this.segHarnessRefs.currentMap;
    let eventInstanceHeights = {};
    // get the max height amongst instance segs
    for (let key in segElMap) {
      let height = Math.round(segElMap[key].getBoundingClientRect().height);
      let instanceId = key.split(':')[0]; // deconstruct how renderFgSegs makes the key
      eventInstanceHeights[instanceId] = Math.max(eventInstanceHeights[instanceId] || 0, height);
    }
    return eventInstanceHeights;
  }
  computeMaxContentHeight() {
    let firstKey = this.props.cells[0].key;
    let cellEl = this.cellElRefs.currentMap[firstKey];
    let fcContainerEl = this.fgElRefs.currentMap[firstKey];
    return cellEl.getBoundingClientRect().bottom - fcContainerEl.getBoundingClientRect().top;
  }
  getCellEls() {
    let elMap = this.cellElRefs.currentMap;
    return this.props.cells.map(cell => elMap[cell.key]);
  }
}
TableRow.addStateEquality({
  eventInstanceHeights: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.E
});
function buildMirrorPlacements(mirrorSegs, colPlacements) {
  if (!mirrorSegs.length) {
    return [];
  }
  let topsByInstanceId = buildAbsoluteTopHash(colPlacements); // TODO: cache this at first render?
  return mirrorSegs.map(seg => ({
    seg,
    isVisible: true,
    isAbsolute: true,
    absoluteTop: topsByInstanceId[seg.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function buildAbsoluteTopHash(colPlacements) {
  let topsByInstanceId = {};
  for (let placements of colPlacements) {
    for (let placement of placements) {
      topsByInstanceId[placement.seg.eventRange.instance.instanceId] = placement.absoluteTop;
    }
  }
  return topsByInstanceId;
}
class TableRows extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.splitBusinessHourSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitBgEventSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitFgEventSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitDateSelectionSegs = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitSegsByRow);
    this.splitEventDrag = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitInteractionByRow);
    this.splitEventResize = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(splitInteractionByRow);
    this.rowRefs = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cf();
  }
  render() {
    let {
      props,
      context
    } = this;
    let rowCnt = props.cells.length;
    let businessHourSegsByRow = this.splitBusinessHourSegs(props.businessHourSegs, rowCnt);
    let bgEventSegsByRow = this.splitBgEventSegs(props.bgEventSegs, rowCnt);
    let fgEventSegsByRow = this.splitFgEventSegs(props.fgEventSegs, rowCnt);
    let dateSelectionSegsByRow = this.splitDateSelectionSegs(props.dateSelectionSegs, rowCnt);
    let eventDragByRow = this.splitEventDrag(props.eventDrag, rowCnt);
    let eventResizeByRow = this.splitEventResize(props.eventResize, rowCnt);
    // for DayGrid view with many rows, force a min-height on cells so doesn't appear squished
    // choose 7 because a month view will have max 6 rows
    let cellMinHeight = rowCnt >= 7 && props.clientWidth ? props.clientWidth / context.options.aspectRatio / 6 : null;
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ch, {
      unit: "day"
    }, (nowDate, todayRange) => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, props.cells.map((cells, row) => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableRow, {
      ref: this.rowRefs.createRef(row),
      key: cells.length ? cells[0].date.toISOString() /* best? or put key on cell? or use diff formatter? */ : row // in case there are no cells (like when resource view is loading)
      ,
      showDayNumbers: rowCnt > 1,
      showWeekNumbers: props.showWeekNumbers,
      todayRange: todayRange,
      dateProfile: props.dateProfile,
      cells: cells,
      renderIntro: props.renderRowIntro,
      businessHourSegs: businessHourSegsByRow[row],
      eventSelection: props.eventSelection,
      bgEventSegs: bgEventSegsByRow[row].filter(isSegAllDay) /* hack */,
      fgEventSegs: fgEventSegsByRow[row],
      dateSelectionSegs: dateSelectionSegsByRow[row],
      eventDrag: eventDragByRow[row],
      eventResize: eventResizeByRow[row],
      dayMaxEvents: props.dayMaxEvents,
      dayMaxEventRows: props.dayMaxEventRows,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      cellMinHeight: cellMinHeight,
      forPrint: props.forPrint
    }))));
  }
  componentDidMount() {
    // HACK: need a daygrid wrapper parent to do positioning
    // NOTE: a daygrid resource view w/o resources can have zero cells
    const firstCellEl = this.rowRefs.currentMap[0].getCellEls()[0];
    this.rootEl = firstCellEl ? firstCellEl.closest('.fc-daygrid-body') : null;
    if (this.rootEl) {
      this.context.registerInteractiveComponent(this, {
        el: this.rootEl,
        isHitComboAllowed: this.props.isHitComboAllowed
      });
    }
  }
  componentWillUnmount() {
    if (this.rootEl) {
      this.context.unregisterInteractiveComponent(this);
      this.rootEl = null;
    }
  }
  // Hit System
  // ----------------------------------------------------------------------------------------------------
  prepareHits() {
    this.rowPositions = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(this.rootEl, this.rowRefs.collect().map(rowObj => rowObj.getCellEls()[0]),
    // first cell el in each row. TODO: not optimal
    false, true);
    this.colPositions = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ba(this.rootEl, this.rowRefs.currentMap[0].getCellEls(),
    // cell els in first row
    true,
    // horizontal
    false);
  }
  queryHit(positionLeft, positionTop) {
    let {
      colPositions,
      rowPositions
    } = this;
    let col = colPositions.leftToIndex(positionLeft);
    let row = rowPositions.topToIndex(positionTop);
    if (row != null && col != null) {
      let cell = this.props.cells[row][col];
      return {
        dateProfile: this.props.dateProfile,
        dateSpan: Object.assign({
          range: this.getCellRange(row, col),
          allDay: true
        }, cell.extraDateSpan),
        dayEl: this.getCellEl(row, col),
        rect: {
          left: colPositions.lefts[col],
          right: colPositions.rights[col],
          top: rowPositions.tops[row],
          bottom: rowPositions.bottoms[row]
        },
        layer: 0
      };
    }
    return null;
  }
  getCellEl(row, col) {
    return this.rowRefs.currentMap[row].getCellEls()[col]; // TODO: not optimal
  }

  getCellRange(row, col) {
    let start = this.props.cells[row][col].date;
    let end = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.t)(start, 1);
    return {
      start,
      end
    };
  }
}
function isSegAllDay(seg) {
  return seg.eventRange.def.allDay;
}
class Table extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.elRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.needsScrollReset = false;
  }
  render() {
    let {
      props
    } = this;
    let {
      dayMaxEventRows,
      dayMaxEvents,
      expandRows
    } = props;
    let limitViaBalanced = dayMaxEvents === true || dayMaxEventRows === true;
    // if rows can't expand to fill fixed height, can't do balanced-height event limit
    // TODO: best place to normalize these options?
    if (limitViaBalanced && !expandRows) {
      limitViaBalanced = false;
      dayMaxEventRows = null;
      dayMaxEvents = null;
    }
    let classNames = ['fc-daygrid-body', limitViaBalanced ? 'fc-daygrid-body-balanced' : 'fc-daygrid-body-unbalanced', expandRows ? '' : 'fc-daygrid-body-natural' // will height of one row depend on the others?
    ];

    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      ref: this.elRef,
      className: classNames.join(' '),
      style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: props.clientWidth,
        minWidth: props.tableMinWidth
      }
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("table", {
      role: "presentation",
      className: "fc-scrollgrid-sync-table",
      style: {
        width: props.clientWidth,
        minWidth: props.tableMinWidth,
        height: expandRows ? props.clientHeight : ''
      }
    }, props.colGroupNode, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("tbody", {
      role: "presentation"
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TableRows, {
      dateProfile: props.dateProfile,
      cells: props.cells,
      renderRowIntro: props.renderRowIntro,
      showWeekNumbers: props.showWeekNumbers,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      businessHourSegs: props.businessHourSegs,
      bgEventSegs: props.bgEventSegs,
      fgEventSegs: props.fgEventSegs,
      dateSelectionSegs: props.dateSelectionSegs,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      dayMaxEvents: dayMaxEvents,
      dayMaxEventRows: dayMaxEventRows,
      forPrint: props.forPrint,
      isHitComboAllowed: props.isHitComboAllowed
    }))));
  }
  componentDidMount() {
    this.requestScrollReset();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dateProfile !== this.props.dateProfile) {
      this.requestScrollReset();
    } else {
      this.flushScrollReset();
    }
  }
  requestScrollReset() {
    this.needsScrollReset = true;
    this.flushScrollReset();
  }
  flushScrollReset() {
    if (this.needsScrollReset && this.props.clientWidth // sizes computed?
    ) {
      const subjectEl = getScrollSubjectEl(this.elRef.current, this.props.dateProfile);
      if (subjectEl) {
        const originEl = subjectEl.closest('.fc-daygrid-body');
        const scrollEl = originEl.closest('.fc-scroller');
        const scrollTop = subjectEl.getBoundingClientRect().top - originEl.getBoundingClientRect().top;
        scrollEl.scrollTop = scrollTop ? scrollTop + 1 : 0; // overcome border
      }

      this.needsScrollReset = false;
    }
  }
}
function getScrollSubjectEl(containerEl, dateProfile) {
  let el;
  if (dateProfile.currentRangeUnit.match(/year|month/)) {
    el = containerEl.querySelector(`[data-date="${(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bx)(dateProfile.currentDate)}-01"]`);
    // even if view is month-based, first-of-month might be hidden...
  }

  if (!el) {
    el = containerEl.querySelector(`[data-date="${(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bv)(dateProfile.currentDate)}"]`);
    // could still be hidden if an interior-view hidden day
  }

  return el;
}
class DayTableSlicer extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bW {
  constructor() {
    super(...arguments);
    this.forceDayIfListItem = true;
  }
  sliceRange(dateRange, dayTableModel) {
    return dayTableModel.sliceRange(dateRange);
  }
}
class DayTable extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.slicer = new DayTableSlicer();
    this.tableRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
  }
  render() {
    let {
      props,
      context
    } = this;
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(Table, Object.assign({
      ref: this.tableRef
    }, this.slicer.sliceProps(props, props.dateProfile, props.nextDayThreshold, context, props.dayTableModel), {
      dateProfile: props.dateProfile,
      cells: props.dayTableModel.cells,
      colGroupNode: props.colGroupNode,
      tableMinWidth: props.tableMinWidth,
      renderRowIntro: props.renderRowIntro,
      dayMaxEvents: props.dayMaxEvents,
      dayMaxEventRows: props.dayMaxEventRows,
      showWeekNumbers: props.showWeekNumbers,
      expandRows: props.expandRows,
      headerAlignElRef: props.headerAlignElRef,
      clientWidth: props.clientWidth,
      clientHeight: props.clientHeight,
      forPrint: props.forPrint
    }));
  }
}
class TableDateProfileGenerator extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.U {
  // Computes the date range that will be rendered
  buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay) {
    let renderRange = super.buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay);
    let {
      props
    } = this;
    return buildDayTableRenderRange({
      currentRange: renderRange,
      snapToWeek: /^(year|month)$/.test(currentRangeUnit),
      fixedWeekCount: props.fixedWeekCount,
      dateEnv: props.dateEnv
    });
  }
}
function buildDayTableRenderRange(props) {
  let {
    dateEnv,
    currentRange
  } = props;
  let {
    start,
    end
  } = currentRange;
  let endOfWeek;
  // year and month views should be aligned with weeks. this is already done for week
  if (props.snapToWeek) {
    start = dateEnv.startOfWeek(start);
    // make end-of-week if not already
    endOfWeek = dateEnv.startOfWeek(end);
    if (endOfWeek.valueOf() !== end.valueOf()) {
      end = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bh)(endOfWeek, 1);
    }
  }
  // ensure 6 weeks
  if (props.fixedWeekCount) {
    // TODO: instead of these date-math gymnastics (for multimonth view),
    // compute dateprofiles of all months, then use start of first and end of last.
    let lastMonthRenderStart = dateEnv.startOfWeek(dateEnv.startOfMonth((0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.t)(currentRange.end, -1)));
    let rowCnt = Math.ceil(
    // could be partial weeks due to hiddenDays
    (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bi)(lastMonthRenderStart, end));
    end = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bh)(end, 6 - rowCnt);
  }
  return {
    start,
    end
  };
}

/* An abstract class for the daygrid views, as well as month view. Renders one or more rows of day cells.
----------------------------------------------------------------------------------------------------------------------*/
// It is a manager for a Table subcomponent, which does most of the heavy lifting.
// It is responsible for managing width/height.
class TableView extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.be {
  constructor() {
    super(...arguments);
    this.headerElRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
  }
  renderSimpleLayout(headerRowContent, bodyContent) {
    let {
      props,
      context
    } = this;
    let sections = [];
    let stickyHeaderDates = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cc)(context.options);
    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunk: {
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }
      });
    }
    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      chunk: {
        content: bodyContent
      }
    });
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ct, {
      elClasses: ['fc-daygrid'],
      viewSpec: context.viewSpec
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b$, {
      liquid: !props.isHeightAuto && !props.forPrint,
      collapsibleWidth: props.forPrint,
      cols: [] /* TODO: make optional? */,
      sections: sections
    }));
  }
  renderHScrollLayout(headerRowContent, bodyContent, colCnt, dayMinWidth) {
    let ScrollGrid = this.context.pluginHooks.scrollGridImpl;
    if (!ScrollGrid) {
      throw new Error('No ScrollGrid implementation');
    }
    let {
      props,
      context
    } = this;
    let stickyHeaderDates = !props.forPrint && (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cc)(context.options);
    let stickyFooterScrollbar = !props.forPrint && (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cb)(context.options);
    let sections = [];
    if (headerRowContent) {
      sections.push({
        type: 'header',
        key: 'header',
        isSticky: stickyHeaderDates,
        chunks: [{
          key: 'main',
          elRef: this.headerElRef,
          tableClassName: 'fc-col-header',
          rowContent: headerRowContent
        }]
      });
    }
    sections.push({
      type: 'body',
      key: 'body',
      liquid: true,
      chunks: [{
        key: 'main',
        content: bodyContent
      }]
    });
    if (stickyFooterScrollbar) {
      sections.push({
        type: 'footer',
        key: 'footer',
        isSticky: true,
        chunks: [{
          key: 'main',
          content: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ca
        }]
      });
    }
    return (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ct, {
      elClasses: ['fc-daygrid'],
      viewSpec: context.viewSpec
    }, (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(ScrollGrid, {
      liquid: !props.isHeightAuto && !props.forPrint,
      forPrint: props.forPrint,
      collapsibleWidth: props.forPrint,
      colGroups: [{
        cols: [{
          span: colCnt,
          minWidth: dayMinWidth
        }]
      }],
      sections: sections
    }));
  }
}
class DayTableView extends TableView {
  constructor() {
    super(...arguments);
    this.buildDayTableModel = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.z)(buildDayTableModel);
    this.headerRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    this.tableRef = (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    // can't override any lifecycle methods from parent
  }

  render() {
    let {
      options,
      dateProfileGenerator
    } = this.context;
    let {
      props
    } = this;
    let dayTableModel = this.buildDayTableModel(props.dateProfile, dateProfileGenerator);
    let headerContent = options.dayHeaders && (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bK, {
      ref: this.headerRef,
      dateProfile: props.dateProfile,
      dates: dayTableModel.headerDates,
      datesRepDistinctDays: dayTableModel.rowCnt === 1
    });
    let bodyContent = contentArg => (0,_fullcalendar_core_preact_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(DayTable, {
      ref: this.tableRef,
      dateProfile: props.dateProfile,
      dayTableModel: dayTableModel,
      businessHours: props.businessHours,
      dateSelection: props.dateSelection,
      eventStore: props.eventStore,
      eventUiBases: props.eventUiBases,
      eventSelection: props.eventSelection,
      eventDrag: props.eventDrag,
      eventResize: props.eventResize,
      nextDayThreshold: options.nextDayThreshold,
      colGroupNode: contentArg.tableColGroupNode,
      tableMinWidth: contentArg.tableMinWidth,
      dayMaxEvents: options.dayMaxEvents,
      dayMaxEventRows: options.dayMaxEventRows,
      showWeekNumbers: options.weekNumbers,
      expandRows: !props.isHeightAuto,
      headerAlignElRef: this.headerElRef,
      clientWidth: contentArg.clientWidth,
      clientHeight: contentArg.clientHeight,
      forPrint: props.forPrint
    });
    return options.dayMinWidth ? this.renderHScrollLayout(headerContent, bodyContent, dayTableModel.colCnt, options.dayMinWidth) : this.renderSimpleLayout(headerContent, bodyContent);
  }
}
function buildDayTableModel(dateProfile, dateProfileGenerator) {
  let daySeries = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bO(dateProfile.renderRange, dateProfileGenerator);
  return new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bV(daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}


/***/ }),

/***/ 89548:
/*!*********************************************************!*\
  !*** ./node_modules/@fullcalendar/interaction/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Draggable: () => (/* binding */ ExternalDraggable),
/* harmony export */   ThirdPartyDraggable: () => (/* binding */ ThirdPartyDraggable),
/* harmony export */   "default": () => (/* binding */ index)
/* harmony export */ });
/* harmony import */ var _fullcalendar_core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/core/index.js */ 27946);
/* harmony import */ var _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/core/internal.js */ 20483);


_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bI.touchMouseIgnoreWait = 500;
let ignoreMouseDepth = 0;
let listenerCnt = 0;
let isWindowTouchMoveCancelled = false;
/*
Uses a "pointer" abstraction, which monitors UI events for both mouse and touch.
Tracks when the pointer "drags" on a certain element, meaning down+move+up.

Also, tracks if there was touch-scrolling.
Also, can prevent touch-scrolling from happening.
Also, can fire pointermove events when scrolling happens underneath, even when no real pointer movement.

emits:
- pointerdown
- pointermove
- pointerup
*/
class PointerDragging {
  constructor(containerEl) {
    this.subjectEl = null;
    // options that can be directly assigned by caller
    this.selector = ''; // will cause subjectEl in all emitted events to be this element
    this.handleSelector = '';
    this.shouldIgnoreMove = false;
    this.shouldWatchScroll = true; // for simulating pointermove on scroll
    // internal states
    this.isDragging = false;
    this.isTouchDragging = false;
    this.wasTouchScroll = false;
    // Mouse
    // ----------------------------------------------------------------------------------------------------
    this.handleMouseDown = ev => {
      if (!this.shouldIgnoreMouse() && isPrimaryMouseButton(ev) && this.tryStart(ev)) {
        let pev = this.createEventFromMouse(ev, true);
        this.emitter.trigger('pointerdown', pev);
        this.initScrollWatch(pev);
        if (!this.shouldIgnoreMove) {
          document.addEventListener('mousemove', this.handleMouseMove);
        }
        document.addEventListener('mouseup', this.handleMouseUp);
      }
    };
    this.handleMouseMove = ev => {
      let pev = this.createEventFromMouse(ev);
      this.recordCoords(pev);
      this.emitter.trigger('pointermove', pev);
    };
    this.handleMouseUp = ev => {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      this.emitter.trigger('pointerup', this.createEventFromMouse(ev));
      this.cleanup(); // call last so that pointerup has access to props
    };
    // Touch
    // ----------------------------------------------------------------------------------------------------
    this.handleTouchStart = ev => {
      if (this.tryStart(ev)) {
        this.isTouchDragging = true;
        let pev = this.createEventFromTouch(ev, true);
        this.emitter.trigger('pointerdown', pev);
        this.initScrollWatch(pev);
        // unlike mouse, need to attach to target, not document
        // https://stackoverflow.com/a/45760014
        let targetEl = ev.target;
        if (!this.shouldIgnoreMove) {
          targetEl.addEventListener('touchmove', this.handleTouchMove);
        }
        targetEl.addEventListener('touchend', this.handleTouchEnd);
        targetEl.addEventListener('touchcancel', this.handleTouchEnd); // treat it as a touch end
        // attach a handler to get called when ANY scroll action happens on the page.
        // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
        // http://stackoverflow.com/a/32954565/96342
        window.addEventListener('scroll', this.handleTouchScroll, true);
      }
    };
    this.handleTouchMove = ev => {
      let pev = this.createEventFromTouch(ev);
      this.recordCoords(pev);
      this.emitter.trigger('pointermove', pev);
    };
    this.handleTouchEnd = ev => {
      if (this.isDragging) {
        // done to guard against touchend followed by touchcancel
        let targetEl = ev.target;
        targetEl.removeEventListener('touchmove', this.handleTouchMove);
        targetEl.removeEventListener('touchend', this.handleTouchEnd);
        targetEl.removeEventListener('touchcancel', this.handleTouchEnd);
        window.removeEventListener('scroll', this.handleTouchScroll, true); // useCaptured=true
        this.emitter.trigger('pointerup', this.createEventFromTouch(ev));
        this.cleanup(); // call last so that pointerup has access to props
        this.isTouchDragging = false;
        startIgnoringMouse();
      }
    };
    this.handleTouchScroll = () => {
      this.wasTouchScroll = true;
    };
    this.handleScroll = ev => {
      if (!this.shouldIgnoreMove) {
        let pageX = window.pageXOffset - this.prevScrollX + this.prevPageX;
        let pageY = window.pageYOffset - this.prevScrollY + this.prevPageY;
        this.emitter.trigger('pointermove', {
          origEvent: ev,
          isTouch: this.isTouchDragging,
          subjectEl: this.subjectEl,
          pageX,
          pageY,
          deltaX: pageX - this.origPageX,
          deltaY: pageY - this.origPageY
        });
      }
    };
    this.containerEl = containerEl;
    this.emitter = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.F();
    containerEl.addEventListener('mousedown', this.handleMouseDown);
    containerEl.addEventListener('touchstart', this.handleTouchStart, {
      passive: true
    });
    listenerCreated();
  }
  destroy() {
    this.containerEl.removeEventListener('mousedown', this.handleMouseDown);
    this.containerEl.removeEventListener('touchstart', this.handleTouchStart, {
      passive: true
    });
    listenerDestroyed();
  }
  tryStart(ev) {
    let subjectEl = this.querySubjectEl(ev);
    let downEl = ev.target;
    if (subjectEl && (!this.handleSelector || (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(downEl, this.handleSelector))) {
      this.subjectEl = subjectEl;
      this.isDragging = true; // do this first so cancelTouchScroll will work
      this.wasTouchScroll = false;
      return true;
    }
    return false;
  }
  cleanup() {
    isWindowTouchMoveCancelled = false;
    this.isDragging = false;
    this.subjectEl = null;
    // keep wasTouchScroll around for later access
    this.destroyScrollWatch();
  }
  querySubjectEl(ev) {
    if (this.selector) {
      return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(ev.target, this.selector);
    }
    return this.containerEl;
  }
  shouldIgnoreMouse() {
    return ignoreMouseDepth || this.isTouchDragging;
  }
  // can be called by user of this class, to cancel touch-based scrolling for the current drag
  cancelTouchScroll() {
    if (this.isDragging) {
      isWindowTouchMoveCancelled = true;
    }
  }
  // Scrolling that simulates pointermoves
  // ----------------------------------------------------------------------------------------------------
  initScrollWatch(ev) {
    if (this.shouldWatchScroll) {
      this.recordCoords(ev);
      window.addEventListener('scroll', this.handleScroll, true); // useCapture=true
    }
  }

  recordCoords(ev) {
    if (this.shouldWatchScroll) {
      this.prevPageX = ev.pageX;
      this.prevPageY = ev.pageY;
      this.prevScrollX = window.pageXOffset;
      this.prevScrollY = window.pageYOffset;
    }
  }
  destroyScrollWatch() {
    if (this.shouldWatchScroll) {
      window.removeEventListener('scroll', this.handleScroll, true); // useCaptured=true
    }
  }
  // Event Normalization
  // ----------------------------------------------------------------------------------------------------
  createEventFromMouse(ev, isFirst) {
    let deltaX = 0;
    let deltaY = 0;
    // TODO: repeat code
    if (isFirst) {
      this.origPageX = ev.pageX;
      this.origPageY = ev.pageY;
    } else {
      deltaX = ev.pageX - this.origPageX;
      deltaY = ev.pageY - this.origPageY;
    }
    return {
      origEvent: ev,
      isTouch: false,
      subjectEl: this.subjectEl,
      pageX: ev.pageX,
      pageY: ev.pageY,
      deltaX,
      deltaY
    };
  }
  createEventFromTouch(ev, isFirst) {
    let touches = ev.touches;
    let pageX;
    let pageY;
    let deltaX = 0;
    let deltaY = 0;
    // if touch coords available, prefer,
    // because FF would give bad ev.pageX ev.pageY
    if (touches && touches.length) {
      pageX = touches[0].pageX;
      pageY = touches[0].pageY;
    } else {
      pageX = ev.pageX;
      pageY = ev.pageY;
    }
    // TODO: repeat code
    if (isFirst) {
      this.origPageX = pageX;
      this.origPageY = pageY;
    } else {
      deltaX = pageX - this.origPageX;
      deltaY = pageY - this.origPageY;
    }
    return {
      origEvent: ev,
      isTouch: true,
      subjectEl: this.subjectEl,
      pageX,
      pageY,
      deltaX,
      deltaY
    };
  }
}
// Returns a boolean whether this was a left mouse click and no ctrl key (which means right click on Mac)
function isPrimaryMouseButton(ev) {
  return ev.button === 0 && !ev.ctrlKey;
}
// Ignoring fake mouse events generated by touch
// ----------------------------------------------------------------------------------------------------
function startIgnoringMouse() {
  ignoreMouseDepth += 1;
  setTimeout(() => {
    ignoreMouseDepth -= 1;
  }, _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bI.touchMouseIgnoreWait);
}
// We want to attach touchmove as early as possible for Safari
// ----------------------------------------------------------------------------------------------------
function listenerCreated() {
  listenerCnt += 1;
  if (listenerCnt === 1) {
    window.addEventListener('touchmove', onWindowTouchMove, {
      passive: false
    });
  }
}
function listenerDestroyed() {
  listenerCnt -= 1;
  if (!listenerCnt) {
    window.removeEventListener('touchmove', onWindowTouchMove, {
      passive: false
    });
  }
}
function onWindowTouchMove(ev) {
  if (isWindowTouchMoveCancelled) {
    ev.preventDefault();
  }
}

/*
An effect in which an element follows the movement of a pointer across the screen.
The moving element is a clone of some other element.
Must call start + handleMove + stop.
*/
class ElementMirror {
  constructor() {
    this.isVisible = false; // must be explicitly enabled
    this.sourceEl = null;
    this.mirrorEl = null;
    this.sourceElRect = null; // screen coords relative to viewport
    // options that can be set directly by caller
    this.parentNode = document.body; // HIGHLY SUGGESTED to set this to sidestep ShadowDOM issues
    this.zIndex = 9999;
    this.revertDuration = 0;
  }
  start(sourceEl, pageX, pageY) {
    this.sourceEl = sourceEl;
    this.sourceElRect = this.sourceEl.getBoundingClientRect();
    this.origScreenX = pageX - window.pageXOffset;
    this.origScreenY = pageY - window.pageYOffset;
    this.deltaX = 0;
    this.deltaY = 0;
    this.updateElPosition();
  }
  handleMove(pageX, pageY) {
    this.deltaX = pageX - window.pageXOffset - this.origScreenX;
    this.deltaY = pageY - window.pageYOffset - this.origScreenY;
    this.updateElPosition();
  }
  // can be called before start
  setIsVisible(bool) {
    if (bool) {
      if (!this.isVisible) {
        if (this.mirrorEl) {
          this.mirrorEl.style.display = '';
        }
        this.isVisible = bool; // needs to happen before updateElPosition
        this.updateElPosition(); // because was not updating the position while invisible
      }
    } else if (this.isVisible) {
      if (this.mirrorEl) {
        this.mirrorEl.style.display = 'none';
      }
      this.isVisible = bool;
    }
  }
  // always async
  stop(needsRevertAnimation, callback) {
    let done = () => {
      this.cleanup();
      callback();
    };
    if (needsRevertAnimation && this.mirrorEl && this.isVisible && this.revertDuration && (
    // if 0, transition won't work
    this.deltaX || this.deltaY) // if same coords, transition won't work
    ) {
      this.doRevertAnimation(done, this.revertDuration);
    } else {
      setTimeout(done, 0);
    }
  }
  doRevertAnimation(callback, revertDuration) {
    let mirrorEl = this.mirrorEl;
    let finalSourceElRect = this.sourceEl.getBoundingClientRect(); // because autoscrolling might have happened
    mirrorEl.style.transition = 'top ' + revertDuration + 'ms,' + 'left ' + revertDuration + 'ms';
    (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aP)(mirrorEl, {
      left: finalSourceElRect.left,
      top: finalSourceElRect.top
    });
    (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b2)(mirrorEl, () => {
      mirrorEl.style.transition = '';
      callback();
    });
  }
  cleanup() {
    if (this.mirrorEl) {
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aO)(this.mirrorEl);
      this.mirrorEl = null;
    }
    this.sourceEl = null;
  }
  updateElPosition() {
    if (this.sourceEl && this.isVisible) {
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aP)(this.getMirrorEl(), {
        left: this.sourceElRect.left + this.deltaX,
        top: this.sourceElRect.top + this.deltaY
      });
    }
  }
  getMirrorEl() {
    let sourceElRect = this.sourceElRect;
    let mirrorEl = this.mirrorEl;
    if (!mirrorEl) {
      mirrorEl = this.mirrorEl = this.sourceEl.cloneNode(true); // cloneChildren=true
      // we don't want long taps or any mouse interaction causing selection/menus.
      // would use preventSelection(), but that prevents selectstart, causing problems.
      mirrorEl.style.userSelect = 'none';
      mirrorEl.classList.add('fc-event-dragging');
      (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aP)(mirrorEl, {
        position: 'fixed',
        zIndex: this.zIndex,
        visibility: '',
        boxSizing: 'border-box',
        width: sourceElRect.right - sourceElRect.left,
        height: sourceElRect.bottom - sourceElRect.top,
        right: 'auto',
        bottom: 'auto',
        margin: 0
      });
      this.parentNode.appendChild(mirrorEl);
    }
    return mirrorEl;
  }
}

/*
Is a cache for a given element's scroll information (all the info that ScrollController stores)
in addition the "client rectangle" of the element.. the area within the scrollbars.

The cache can be in one of two modes:
- doesListening:false - ignores when the container is scrolled by someone else
- doesListening:true - watch for scrolling and update the cache
*/
class ScrollGeomCache extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bb {
  constructor(scrollController, doesListening) {
    super();
    this.handleScroll = () => {
      this.scrollTop = this.scrollController.getScrollTop();
      this.scrollLeft = this.scrollController.getScrollLeft();
      this.handleScrollChange();
    };
    this.scrollController = scrollController;
    this.doesListening = doesListening;
    this.scrollTop = this.origScrollTop = scrollController.getScrollTop();
    this.scrollLeft = this.origScrollLeft = scrollController.getScrollLeft();
    this.scrollWidth = scrollController.getScrollWidth();
    this.scrollHeight = scrollController.getScrollHeight();
    this.clientWidth = scrollController.getClientWidth();
    this.clientHeight = scrollController.getClientHeight();
    this.clientRect = this.computeClientRect(); // do last in case it needs cached values
    if (this.doesListening) {
      this.getEventTarget().addEventListener('scroll', this.handleScroll);
    }
  }
  destroy() {
    if (this.doesListening) {
      this.getEventTarget().removeEventListener('scroll', this.handleScroll);
    }
  }
  getScrollTop() {
    return this.scrollTop;
  }
  getScrollLeft() {
    return this.scrollLeft;
  }
  setScrollTop(top) {
    this.scrollController.setScrollTop(top);
    if (!this.doesListening) {
      // we are not relying on the element to normalize out-of-bounds scroll values
      // so we need to sanitize ourselves
      this.scrollTop = Math.max(Math.min(top, this.getMaxScrollTop()), 0);
      this.handleScrollChange();
    }
  }
  setScrollLeft(top) {
    this.scrollController.setScrollLeft(top);
    if (!this.doesListening) {
      // we are not relying on the element to normalize out-of-bounds scroll values
      // so we need to sanitize ourselves
      this.scrollLeft = Math.max(Math.min(top, this.getMaxScrollLeft()), 0);
      this.handleScrollChange();
    }
  }
  getClientWidth() {
    return this.clientWidth;
  }
  getClientHeight() {
    return this.clientHeight;
  }
  getScrollWidth() {
    return this.scrollWidth;
  }
  getScrollHeight() {
    return this.scrollHeight;
  }
  handleScrollChange() {}
}
class ElementScrollGeomCache extends ScrollGeomCache {
  constructor(el, doesListening) {
    super(new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bc(el), doesListening);
  }
  getEventTarget() {
    return this.scrollController.el;
  }
  computeClientRect() {
    return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b3)(this.scrollController.el);
  }
}
class WindowScrollGeomCache extends ScrollGeomCache {
  constructor(doesListening) {
    super(new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bd(), doesListening);
  }
  getEventTarget() {
    return window;
  }
  computeClientRect() {
    return {
      left: this.scrollLeft,
      right: this.scrollLeft + this.clientWidth,
      top: this.scrollTop,
      bottom: this.scrollTop + this.clientHeight
    };
  }
  // the window is the only scroll object that changes it's rectangle relative
  // to the document's topleft as it scrolls
  handleScrollChange() {
    this.clientRect = this.computeClientRect();
  }
}

// If available we are using native "performance" API instead of "Date"
// Read more about it on MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Performance
const getTime = typeof performance === 'function' ? performance.now : Date.now;
/*
For a pointer interaction, automatically scrolls certain scroll containers when the pointer
approaches the edge.

The caller must call start + handleMove + stop.
*/
class AutoScroller {
  constructor() {
    // options that can be set by caller
    this.isEnabled = true;
    this.scrollQuery = [window, '.fc-scroller'];
    this.edgeThreshold = 50; // pixels
    this.maxVelocity = 300; // pixels per second
    // internal state
    this.pointerScreenX = null;
    this.pointerScreenY = null;
    this.isAnimating = false;
    this.scrollCaches = null;
    // protect against the initial pointerdown being too close to an edge and starting the scroll
    this.everMovedUp = false;
    this.everMovedDown = false;
    this.everMovedLeft = false;
    this.everMovedRight = false;
    this.animate = () => {
      if (this.isAnimating) {
        // wasn't cancelled between animation calls
        let edge = this.computeBestEdge(this.pointerScreenX + window.pageXOffset, this.pointerScreenY + window.pageYOffset);
        if (edge) {
          let now = getTime();
          this.handleSide(edge, (now - this.msSinceRequest) / 1000);
          this.requestAnimation(now);
        } else {
          this.isAnimating = false; // will stop animation
        }
      }
    };
  }

  start(pageX, pageY, scrollStartEl) {
    if (this.isEnabled) {
      this.scrollCaches = this.buildCaches(scrollStartEl);
      this.pointerScreenX = null;
      this.pointerScreenY = null;
      this.everMovedUp = false;
      this.everMovedDown = false;
      this.everMovedLeft = false;
      this.everMovedRight = false;
      this.handleMove(pageX, pageY);
    }
  }
  handleMove(pageX, pageY) {
    if (this.isEnabled) {
      let pointerScreenX = pageX - window.pageXOffset;
      let pointerScreenY = pageY - window.pageYOffset;
      let yDelta = this.pointerScreenY === null ? 0 : pointerScreenY - this.pointerScreenY;
      let xDelta = this.pointerScreenX === null ? 0 : pointerScreenX - this.pointerScreenX;
      if (yDelta < 0) {
        this.everMovedUp = true;
      } else if (yDelta > 0) {
        this.everMovedDown = true;
      }
      if (xDelta < 0) {
        this.everMovedLeft = true;
      } else if (xDelta > 0) {
        this.everMovedRight = true;
      }
      this.pointerScreenX = pointerScreenX;
      this.pointerScreenY = pointerScreenY;
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.requestAnimation(getTime());
      }
    }
  }
  stop() {
    if (this.isEnabled) {
      this.isAnimating = false; // will stop animation
      for (let scrollCache of this.scrollCaches) {
        scrollCache.destroy();
      }
      this.scrollCaches = null;
    }
  }
  requestAnimation(now) {
    this.msSinceRequest = now;
    requestAnimationFrame(this.animate);
  }
  handleSide(edge, seconds) {
    let {
      scrollCache
    } = edge;
    let {
      edgeThreshold
    } = this;
    let invDistance = edgeThreshold - edge.distance;
    let velocity =
    // the closer to the edge, the faster we scroll
    invDistance * invDistance / (edgeThreshold * edgeThreshold) *
    // quadratic
    this.maxVelocity * seconds;
    let sign = 1;
    switch (edge.name) {
      case 'left':
        sign = -1;
      // falls through
      case 'right':
        scrollCache.setScrollLeft(scrollCache.getScrollLeft() + velocity * sign);
        break;
      case 'top':
        sign = -1;
      // falls through
      case 'bottom':
        scrollCache.setScrollTop(scrollCache.getScrollTop() + velocity * sign);
        break;
    }
  }
  // left/top are relative to document topleft
  computeBestEdge(left, top) {
    let {
      edgeThreshold
    } = this;
    let bestSide = null;
    let scrollCaches = this.scrollCaches || [];
    for (let scrollCache of scrollCaches) {
      let rect = scrollCache.clientRect;
      let leftDist = left - rect.left;
      let rightDist = rect.right - left;
      let topDist = top - rect.top;
      let bottomDist = rect.bottom - top;
      // completely within the rect?
      if (leftDist >= 0 && rightDist >= 0 && topDist >= 0 && bottomDist >= 0) {
        if (topDist <= edgeThreshold && this.everMovedUp && scrollCache.canScrollUp() && (!bestSide || bestSide.distance > topDist)) {
          bestSide = {
            scrollCache,
            name: 'top',
            distance: topDist
          };
        }
        if (bottomDist <= edgeThreshold && this.everMovedDown && scrollCache.canScrollDown() && (!bestSide || bestSide.distance > bottomDist)) {
          bestSide = {
            scrollCache,
            name: 'bottom',
            distance: bottomDist
          };
        }
        if (leftDist <= edgeThreshold && this.everMovedLeft && scrollCache.canScrollLeft() && (!bestSide || bestSide.distance > leftDist)) {
          bestSide = {
            scrollCache,
            name: 'left',
            distance: leftDist
          };
        }
        if (rightDist <= edgeThreshold && this.everMovedRight && scrollCache.canScrollRight() && (!bestSide || bestSide.distance > rightDist)) {
          bestSide = {
            scrollCache,
            name: 'right',
            distance: rightDist
          };
        }
      }
    }
    return bestSide;
  }
  buildCaches(scrollStartEl) {
    return this.queryScrollEls(scrollStartEl).map(el => {
      if (el === window) {
        return new WindowScrollGeomCache(false); // false = don't listen to user-generated scrolls
      }

      return new ElementScrollGeomCache(el, false); // false = don't listen to user-generated scrolls
    });
  }

  queryScrollEls(scrollStartEl) {
    let els = [];
    for (let query of this.scrollQuery) {
      if (typeof query === 'object') {
        els.push(query);
      } else {
        els.push(...Array.prototype.slice.call(scrollStartEl.getRootNode().querySelectorAll(query)));
      }
    }
    return els;
  }
}

/*
Monitors dragging on an element. Has a number of high-level features:
- minimum distance required before dragging
- minimum wait time ("delay") before dragging
- a mirror element that follows the pointer
*/
class FeaturefulElementDragging extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bH {
  constructor(containerEl, selector) {
    super(containerEl);
    this.containerEl = containerEl;
    // options that can be directly set by caller
    // the caller can also set the PointerDragging's options as well
    this.delay = null;
    this.minDistance = 0;
    this.touchScrollAllowed = true; // prevents drag from starting and blocks scrolling during drag
    this.mirrorNeedsRevert = false;
    this.isInteracting = false; // is the user validly moving the pointer? lasts until pointerup
    this.isDragging = false; // is it INTENTFULLY dragging? lasts until after revert animation
    this.isDelayEnded = false;
    this.isDistanceSurpassed = false;
    this.delayTimeoutId = null;
    this.onPointerDown = ev => {
      if (!this.isDragging) {
        // so new drag doesn't happen while revert animation is going
        this.isInteracting = true;
        this.isDelayEnded = false;
        this.isDistanceSurpassed = false;
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ar)(document.body);
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.at)(document.body);
        // prevent links from being visited if there's an eventual drag.
        // also prevents selection in older browsers (maybe?).
        // not necessary for touch, besides, browser would complain about passiveness.
        if (!ev.isTouch) {
          ev.origEvent.preventDefault();
        }
        this.emitter.trigger('pointerdown', ev);
        if (this.isInteracting &&
        // not destroyed via pointerdown handler
        !this.pointer.shouldIgnoreMove) {
          // actions related to initiating dragstart+dragmove+dragend...
          this.mirror.setIsVisible(false); // reset. caller must set-visible
          this.mirror.start(ev.subjectEl, ev.pageX, ev.pageY); // must happen on first pointer down
          this.startDelay(ev);
          if (!this.minDistance) {
            this.handleDistanceSurpassed(ev);
          }
        }
      }
    };
    this.onPointerMove = ev => {
      if (this.isInteracting) {
        this.emitter.trigger('pointermove', ev);
        if (!this.isDistanceSurpassed) {
          let minDistance = this.minDistance;
          let distanceSq; // current distance from the origin, squared
          let {
            deltaX,
            deltaY
          } = ev;
          distanceSq = deltaX * deltaX + deltaY * deltaY;
          if (distanceSq >= minDistance * minDistance) {
            // use pythagorean theorem
            this.handleDistanceSurpassed(ev);
          }
        }
        if (this.isDragging) {
          // a real pointer move? (not one simulated by scrolling)
          if (ev.origEvent.type !== 'scroll') {
            this.mirror.handleMove(ev.pageX, ev.pageY);
            this.autoScroller.handleMove(ev.pageX, ev.pageY);
          }
          this.emitter.trigger('dragmove', ev);
        }
      }
    };
    this.onPointerUp = ev => {
      if (this.isInteracting) {
        this.isInteracting = false;
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.as)(document.body);
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.au)(document.body);
        this.emitter.trigger('pointerup', ev); // can potentially set mirrorNeedsRevert
        if (this.isDragging) {
          this.autoScroller.stop();
          this.tryStopDrag(ev); // which will stop the mirror
        }

        if (this.delayTimeoutId) {
          clearTimeout(this.delayTimeoutId);
          this.delayTimeoutId = null;
        }
      }
    };
    let pointer = this.pointer = new PointerDragging(containerEl);
    pointer.emitter.on('pointerdown', this.onPointerDown);
    pointer.emitter.on('pointermove', this.onPointerMove);
    pointer.emitter.on('pointerup', this.onPointerUp);
    if (selector) {
      pointer.selector = selector;
    }
    this.mirror = new ElementMirror();
    this.autoScroller = new AutoScroller();
  }
  destroy() {
    this.pointer.destroy();
    // HACK: simulate a pointer-up to end the current drag
    // TODO: fire 'dragend' directly and stop interaction. discourage use of pointerup event (b/c might not fire)
    this.onPointerUp({});
  }
  startDelay(ev) {
    if (typeof this.delay === 'number') {
      this.delayTimeoutId = setTimeout(() => {
        this.delayTimeoutId = null;
        this.handleDelayEnd(ev);
      }, this.delay); // not assignable to number!
    } else {
      this.handleDelayEnd(ev);
    }
  }
  handleDelayEnd(ev) {
    this.isDelayEnded = true;
    this.tryStartDrag(ev);
  }
  handleDistanceSurpassed(ev) {
    this.isDistanceSurpassed = true;
    this.tryStartDrag(ev);
  }
  tryStartDrag(ev) {
    if (this.isDelayEnded && this.isDistanceSurpassed) {
      if (!this.pointer.wasTouchScroll || this.touchScrollAllowed) {
        this.isDragging = true;
        this.mirrorNeedsRevert = false;
        this.autoScroller.start(ev.pageX, ev.pageY, this.containerEl);
        this.emitter.trigger('dragstart', ev);
        if (this.touchScrollAllowed === false) {
          this.pointer.cancelTouchScroll();
        }
      }
    }
  }
  tryStopDrag(ev) {
    // .stop() is ALWAYS asynchronous, which we NEED because we want all pointerup events
    // that come from the document to fire beforehand. much more convenient this way.
    this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, ev));
  }
  stopDrag(ev) {
    this.isDragging = false;
    this.emitter.trigger('dragend', ev);
  }
  // fill in the implementations...
  setIgnoreMove(bool) {
    this.pointer.shouldIgnoreMove = bool;
  }
  setMirrorIsVisible(bool) {
    this.mirror.setIsVisible(bool);
  }
  setMirrorNeedsRevert(bool) {
    this.mirrorNeedsRevert = bool;
  }
  setAutoScrollEnabled(bool) {
    this.autoScroller.isEnabled = bool;
  }
}

/*
When this class is instantiated, it records the offset of an element (relative to the document topleft),
and continues to monitor scrolling, updating the cached coordinates if it needs to.
Does not access the DOM after instantiation, so highly performant.

Also keeps track of all scrolling/overflow:hidden containers that are parents of the given element
and an determine if a given point is inside the combined clipping rectangle.
*/
class OffsetTracker {
  constructor(el) {
    this.origRect = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b6)(el);
    // will work fine for divs that have overflow:hidden
    this.scrollCaches = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b5)(el).map(scrollEl => new ElementScrollGeomCache(scrollEl, true));
  }
  destroy() {
    for (let scrollCache of this.scrollCaches) {
      scrollCache.destroy();
    }
  }
  computeLeft() {
    let left = this.origRect.left;
    for (let scrollCache of this.scrollCaches) {
      left += scrollCache.origScrollLeft - scrollCache.getScrollLeft();
    }
    return left;
  }
  computeTop() {
    let top = this.origRect.top;
    for (let scrollCache of this.scrollCaches) {
      top += scrollCache.origScrollTop - scrollCache.getScrollTop();
    }
    return top;
  }
  isWithinClipping(pageX, pageY) {
    let point = {
      left: pageX,
      top: pageY
    };
    for (let scrollCache of this.scrollCaches) {
      if (!isIgnoredClipping(scrollCache.getEventTarget()) && !(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aF)(point, scrollCache.clientRect)) {
        return false;
      }
    }
    return true;
  }
}
// certain clipping containers should never constrain interactions, like <html> and <body>
// https://github.com/fullcalendar/fullcalendar/issues/3615
function isIgnoredClipping(node) {
  let tagName = node.tagName;
  return tagName === 'HTML' || tagName === 'BODY';
}

/*
Tracks movement over multiple droppable areas (aka "hits")
that exist in one or more DateComponents.
Relies on an existing draggable.

emits:
- pointerdown
- dragstart
- hitchange - fires initially, even if not over a hit
- pointerup
- (hitchange - again, to null, if ended over a hit)
- dragend
*/
class HitDragging {
  constructor(dragging, droppableStore) {
    // options that can be set by caller
    this.useSubjectCenter = false;
    this.requireInitial = true; // if doesn't start out on a hit, won't emit any events
    this.initialHit = null;
    this.movingHit = null;
    this.finalHit = null; // won't ever be populated if shouldIgnoreMove
    this.handlePointerDown = ev => {
      let {
        dragging
      } = this;
      this.initialHit = null;
      this.movingHit = null;
      this.finalHit = null;
      this.prepareHits();
      this.processFirstCoord(ev);
      if (this.initialHit || !this.requireInitial) {
        dragging.setIgnoreMove(false);
        // TODO: fire this before computing processFirstCoord, so listeners can cancel. this gets fired by almost every handler :(
        this.emitter.trigger('pointerdown', ev);
      } else {
        dragging.setIgnoreMove(true);
      }
    };
    this.handleDragStart = ev => {
      this.emitter.trigger('dragstart', ev);
      this.handleMove(ev, true); // force = fire even if initially null
    };

    this.handleDragMove = ev => {
      this.emitter.trigger('dragmove', ev);
      this.handleMove(ev);
    };
    this.handlePointerUp = ev => {
      this.releaseHits();
      this.emitter.trigger('pointerup', ev);
    };
    this.handleDragEnd = ev => {
      if (this.movingHit) {
        this.emitter.trigger('hitupdate', null, true, ev);
      }
      this.finalHit = this.movingHit;
      this.movingHit = null;
      this.emitter.trigger('dragend', ev);
    };
    this.droppableStore = droppableStore;
    dragging.emitter.on('pointerdown', this.handlePointerDown);
    dragging.emitter.on('dragstart', this.handleDragStart);
    dragging.emitter.on('dragmove', this.handleDragMove);
    dragging.emitter.on('pointerup', this.handlePointerUp);
    dragging.emitter.on('dragend', this.handleDragEnd);
    this.dragging = dragging;
    this.emitter = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.F();
  }
  // sets initialHit
  // sets coordAdjust
  processFirstCoord(ev) {
    let origPoint = {
      left: ev.pageX,
      top: ev.pageY
    };
    let adjustedPoint = origPoint;
    let subjectEl = ev.subjectEl;
    let subjectRect;
    if (subjectEl instanceof HTMLElement) {
      // i.e. not a Document/ShadowRoot
      subjectRect = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b6)(subjectEl);
      adjustedPoint = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aG)(adjustedPoint, subjectRect);
    }
    let initialHit = this.initialHit = this.queryHitForOffset(adjustedPoint.left, adjustedPoint.top);
    if (initialHit) {
      if (this.useSubjectCenter && subjectRect) {
        let slicedSubjectRect = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aE)(subjectRect, initialHit.rect);
        if (slicedSubjectRect) {
          adjustedPoint = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aH)(slicedSubjectRect);
        }
      }
      this.coordAdjust = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aI)(adjustedPoint, origPoint);
    } else {
      this.coordAdjust = {
        left: 0,
        top: 0
      };
    }
  }
  handleMove(ev, forceHandle) {
    let hit = this.queryHitForOffset(ev.pageX + this.coordAdjust.left, ev.pageY + this.coordAdjust.top);
    if (forceHandle || !isHitsEqual(this.movingHit, hit)) {
      this.movingHit = hit;
      this.emitter.trigger('hitupdate', hit, false, ev);
    }
  }
  prepareHits() {
    this.offsetTrackers = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a)(this.droppableStore, interactionSettings => {
      interactionSettings.component.prepareHits();
      return new OffsetTracker(interactionSettings.el);
    });
  }
  releaseHits() {
    let {
      offsetTrackers
    } = this;
    for (let id in offsetTrackers) {
      offsetTrackers[id].destroy();
    }
    this.offsetTrackers = {};
  }
  queryHitForOffset(offsetLeft, offsetTop) {
    let {
      droppableStore,
      offsetTrackers
    } = this;
    let bestHit = null;
    for (let id in droppableStore) {
      let component = droppableStore[id].component;
      let offsetTracker = offsetTrackers[id];
      if (offsetTracker &&
      // wasn't destroyed mid-drag
      offsetTracker.isWithinClipping(offsetLeft, offsetTop)) {
        let originLeft = offsetTracker.computeLeft();
        let originTop = offsetTracker.computeTop();
        let positionLeft = offsetLeft - originLeft;
        let positionTop = offsetTop - originTop;
        let {
          origRect
        } = offsetTracker;
        let width = origRect.right - origRect.left;
        let height = origRect.bottom - origRect.top;
        if (
        // must be within the element's bounds
        positionLeft >= 0 && positionLeft < width && positionTop >= 0 && positionTop < height) {
          let hit = component.queryHit(positionLeft, positionTop, width, height);
          if (hit &&
          // make sure the hit is within activeRange, meaning it's not a dead cell
          (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b9)(hit.dateProfile.activeRange, hit.dateSpan.range) && (!bestHit || hit.layer > bestHit.layer)) {
            hit.componentId = id;
            hit.context = component.context;
            // TODO: better way to re-orient rectangle
            hit.rect.left += originLeft;
            hit.rect.right += originLeft;
            hit.rect.top += originTop;
            hit.rect.bottom += originTop;
            bestHit = hit;
          }
        }
      }
    }
    return bestHit;
  }
}
function isHitsEqual(hit0, hit1) {
  if (!hit0 && !hit1) {
    return true;
  }
  if (Boolean(hit0) !== Boolean(hit1)) {
    return false;
  }
  return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bf)(hit0.dateSpan, hit1.dateSpan);
}
function buildDatePointApiWithContext(dateSpan, context) {
  let props = {};
  for (let transform of context.pluginHooks.datePointTransforms) {
    Object.assign(props, transform(dateSpan, context));
  }
  Object.assign(props, buildDatePointApi(dateSpan, context.dateEnv));
  return props;
}
function buildDatePointApi(span, dateEnv) {
  return {
    date: dateEnv.toDate(span.range.start),
    dateStr: dateEnv.formatIso(span.range.start, {
      omitTime: span.allDay
    }),
    allDay: span.allDay
  };
}

/*
Monitors when the user clicks on a specific date/time of a component.
A pointerdown+pointerup on the same "hit" constitutes a click.
*/
class DateClicking extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    this.handlePointerDown = pev => {
      let {
        dragging
      } = this;
      let downEl = pev.origEvent.target;
      // do this in pointerdown (not dragend) because DOM might be mutated by the time dragend is fired
      dragging.setIgnoreMove(!this.component.isValidDateDownEl(downEl));
    };
    // won't even fire if moving was ignored
    this.handleDragEnd = ev => {
      let {
        component
      } = this;
      let {
        pointer
      } = this.dragging;
      if (!pointer.wasTouchScroll) {
        let {
          initialHit,
          finalHit
        } = this.hitDragging;
        if (initialHit && finalHit && isHitsEqual(initialHit, finalHit)) {
          let {
            context
          } = component;
          let arg = Object.assign(Object.assign({}, buildDatePointApiWithContext(initialHit.dateSpan, context)), {
            dayEl: initialHit.dayEl,
            jsEvent: ev.origEvent,
            view: context.viewApi || context.calendarApi.view
          });
          context.emitter.trigger('dateClick', arg);
        }
      }
    };
    // we DO want to watch pointer moves because otherwise finalHit won't get populated
    this.dragging = new FeaturefulElementDragging(settings.el);
    this.dragging.autoScroller.isEnabled = false;
    let hitDragging = this.hitDragging = new HitDragging(this.dragging, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bG)(settings));
    hitDragging.emitter.on('pointerdown', this.handlePointerDown);
    hitDragging.emitter.on('dragend', this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
}

/*
Tracks when the user selects a portion of time of a component,
constituted by a drag over date cells, with a possible delay at the beginning of the drag.
*/
class DateSelecting extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    this.dragSelection = null;
    this.handlePointerDown = ev => {
      let {
        component,
        dragging
      } = this;
      let {
        options
      } = component.context;
      let canSelect = options.selectable && component.isValidDateDownEl(ev.origEvent.target);
      // don't bother to watch expensive moves if component won't do selection
      dragging.setIgnoreMove(!canSelect);
      // if touch, require user to hold down
      dragging.delay = ev.isTouch ? getComponentTouchDelay$1(component) : null;
    };
    this.handleDragStart = ev => {
      this.component.context.calendarApi.unselect(ev); // unselect previous selections
    };

    this.handleHitUpdate = (hit, isFinal) => {
      let {
        context
      } = this.component;
      let dragSelection = null;
      let isInvalid = false;
      if (hit) {
        let initialHit = this.hitDragging.initialHit;
        let disallowed = hit.componentId === initialHit.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(initialHit, hit);
        if (!disallowed) {
          dragSelection = joinHitsIntoSelection(initialHit, hit, context.pluginHooks.dateSelectionTransformers);
        }
        if (!dragSelection || !(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.b_)(dragSelection, hit.dateProfile, context)) {
          isInvalid = true;
          dragSelection = null;
        }
      }
      if (dragSelection) {
        context.dispatch({
          type: 'SELECT_DATES',
          selection: dragSelection
        });
      } else if (!isFinal) {
        // only unselect if moved away while dragging
        context.dispatch({
          type: 'UNSELECT_DATES'
        });
      }
      if (!isInvalid) {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aw)();
      } else {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ax)();
      }
      if (!isFinal) {
        this.dragSelection = dragSelection; // only clear if moved away from all hits while dragging
      }
    };

    this.handlePointerUp = pev => {
      if (this.dragSelection) {
        // selection is already rendered, so just need to report selection
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cu)(this.dragSelection, pev, this.component.context);
        this.dragSelection = null;
      }
    };
    let {
      component
    } = settings;
    let {
      options
    } = component.context;
    let dragging = this.dragging = new FeaturefulElementDragging(settings.el);
    dragging.touchScrollAllowed = false;
    dragging.minDistance = options.selectMinDistance || 0;
    dragging.autoScroller.isEnabled = options.dragScroll;
    let hitDragging = this.hitDragging = new HitDragging(this.dragging, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bG)(settings));
    hitDragging.emitter.on('pointerdown', this.handlePointerDown);
    hitDragging.emitter.on('dragstart', this.handleDragStart);
    hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
    hitDragging.emitter.on('pointerup', this.handlePointerUp);
  }
  destroy() {
    this.dragging.destroy();
  }
}
function getComponentTouchDelay$1(component) {
  let {
    options
  } = component.context;
  let delay = options.selectLongPressDelay;
  if (delay == null) {
    delay = options.longPressDelay;
  }
  return delay;
}
function joinHitsIntoSelection(hit0, hit1, dateSelectionTransformers) {
  let dateSpan0 = hit0.dateSpan;
  let dateSpan1 = hit1.dateSpan;
  let ms = [dateSpan0.range.start, dateSpan0.range.end, dateSpan1.range.start, dateSpan1.range.end];
  ms.sort(_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.av);
  let props = {};
  for (let transformer of dateSelectionTransformers) {
    let res = transformer(hit0, hit1);
    if (res === false) {
      return null;
    }
    if (res) {
      Object.assign(props, res);
    }
  }
  props.range = {
    start: ms[0],
    end: ms[3]
  };
  props.allDay = dateSpan0.allDay;
  return props;
}
class EventDragging extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    // internal state
    this.subjectEl = null;
    this.subjectSeg = null; // the seg being selected/dragged
    this.isDragging = false;
    this.eventRange = null;
    this.relevantEvents = null; // the events being dragged
    this.receivingContext = null;
    this.validMutation = null;
    this.mutatedRelevantEvents = null;
    this.handlePointerDown = ev => {
      let origTarget = ev.origEvent.target;
      let {
        component,
        dragging
      } = this;
      let {
        mirror
      } = dragging;
      let {
        options
      } = component.context;
      let initialContext = component.context;
      this.subjectEl = ev.subjectEl;
      let subjectSeg = this.subjectSeg = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__._)(ev.subjectEl);
      let eventRange = this.eventRange = subjectSeg.eventRange;
      let eventInstanceId = eventRange.instance.instanceId;
      this.relevantEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aV)(initialContext.getCurrentData().eventStore, eventInstanceId);
      dragging.minDistance = ev.isTouch ? 0 : options.eventDragMinDistance;
      dragging.delay =
      // only do a touch delay if touch and this event hasn't been selected yet
      ev.isTouch && eventInstanceId !== component.props.eventSelection ? getComponentTouchDelay(component) : null;
      if (options.fixedMirrorParent) {
        mirror.parentNode = options.fixedMirrorParent;
      } else {
        mirror.parentNode = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(origTarget, '.fc');
      }
      mirror.revertDuration = options.dragRevertDuration;
      let isValid = component.isValidSegDownEl(origTarget) && !(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(origTarget, '.fc-event-resizer'); // NOT on a resizer
      dragging.setIgnoreMove(!isValid);
      // disable dragging for elements that are resizable (ie, selectable)
      // but are not draggable
      this.isDragging = isValid && ev.subjectEl.classList.contains('fc-event-draggable');
    };
    this.handleDragStart = ev => {
      let initialContext = this.component.context;
      let eventRange = this.eventRange;
      let eventInstanceId = eventRange.instance.instanceId;
      if (ev.isTouch) {
        // need to select a different event?
        if (eventInstanceId !== this.component.props.eventSelection) {
          initialContext.dispatch({
            type: 'SELECT_EVENT',
            eventInstanceId
          });
        }
      } else {
        // if now using mouse, but was previous touch interaction, clear selected event
        initialContext.dispatch({
          type: 'UNSELECT_EVENT'
        });
      }
      if (this.isDragging) {
        initialContext.calendarApi.unselect(ev); // unselect *date* selection
        initialContext.emitter.trigger('eventDragStart', {
          el: this.subjectEl,
          event: new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(initialContext, eventRange.def, eventRange.instance),
          jsEvent: ev.origEvent,
          view: initialContext.viewApi
        });
      }
    };
    this.handleHitUpdate = (hit, isFinal) => {
      if (!this.isDragging) {
        return;
      }
      let relevantEvents = this.relevantEvents;
      let initialHit = this.hitDragging.initialHit;
      let initialContext = this.component.context;
      // states based on new hit
      let receivingContext = null;
      let mutation = null;
      let mutatedRelevantEvents = null;
      let isInvalid = false;
      let interaction = {
        affectedEvents: relevantEvents,
        mutatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
        isEvent: true
      };
      if (hit) {
        receivingContext = hit.context;
        let receivingOptions = receivingContext.options;
        if (initialContext === receivingContext || receivingOptions.editable && receivingOptions.droppable) {
          mutation = computeEventMutation(initialHit, hit, receivingContext.getCurrentData().pluginHooks.eventDragMutationMassagers);
          if (mutation) {
            mutatedRelevantEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bX)(relevantEvents, receivingContext.getCurrentData().eventUiBases, mutation, receivingContext);
            interaction.mutatedEvents = mutatedRelevantEvents;
            if (!(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bZ)(interaction, hit.dateProfile, receivingContext)) {
              isInvalid = true;
              mutation = null;
              mutatedRelevantEvents = null;
              interaction.mutatedEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)();
            }
          }
        } else {
          receivingContext = null;
        }
      }
      this.displayDrag(receivingContext, interaction);
      if (!isInvalid) {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aw)();
      } else {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ax)();
      }
      if (!isFinal) {
        if (initialContext === receivingContext &&
        // TODO: write test for this
        isHitsEqual(initialHit, hit)) {
          mutation = null;
        }
        this.dragging.setMirrorNeedsRevert(!mutation);
        // render the mirror if no already-rendered mirror
        // TODO: wish we could somehow wait for dispatch to guarantee render
        this.dragging.setMirrorIsVisible(!hit || !this.subjectEl.getRootNode().querySelector('.fc-event-mirror'));
        // assign states based on new hit
        this.receivingContext = receivingContext;
        this.validMutation = mutation;
        this.mutatedRelevantEvents = mutatedRelevantEvents;
      }
    };
    this.handlePointerUp = () => {
      if (!this.isDragging) {
        this.cleanup(); // because handleDragEnd won't fire
      }
    };

    this.handleDragEnd = ev => {
      if (this.isDragging) {
        let initialContext = this.component.context;
        let initialView = initialContext.viewApi;
        let {
          receivingContext,
          validMutation
        } = this;
        let eventDef = this.eventRange.def;
        let eventInstance = this.eventRange.instance;
        let eventApi = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(initialContext, eventDef, eventInstance);
        let relevantEvents = this.relevantEvents;
        let mutatedRelevantEvents = this.mutatedRelevantEvents;
        let {
          finalHit
        } = this.hitDragging;
        this.clearDrag(); // must happen after revert animation
        initialContext.emitter.trigger('eventDragStop', {
          el: this.subjectEl,
          event: eventApi,
          jsEvent: ev.origEvent,
          view: initialView
        });
        if (validMutation) {
          // dropped within same calendar
          if (receivingContext === initialContext) {
            let updatedEventApi = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(initialContext, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null);
            initialContext.dispatch({
              type: 'MERGE_EVENTS',
              eventStore: mutatedRelevantEvents
            });
            let eventChangeArg = {
              oldEvent: eventApi,
              event: updatedEventApi,
              relatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.w)(mutatedRelevantEvents, initialContext, eventInstance),
              revert() {
                initialContext.dispatch({
                  type: 'MERGE_EVENTS',
                  eventStore: relevantEvents // the pre-change data
                });
              }
            };

            let transformed = {};
            for (let transformer of initialContext.getCurrentData().pluginHooks.eventDropTransformers) {
              Object.assign(transformed, transformer(validMutation, initialContext));
            }
            initialContext.emitter.trigger('eventDrop', Object.assign(Object.assign(Object.assign({}, eventChangeArg), transformed), {
              el: ev.subjectEl,
              delta: validMutation.datesDelta,
              jsEvent: ev.origEvent,
              view: initialView
            }));
            initialContext.emitter.trigger('eventChange', eventChangeArg);
            // dropped in different calendar
          } else if (receivingContext) {
            let eventRemoveArg = {
              event: eventApi,
              relatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.w)(relevantEvents, initialContext, eventInstance),
              revert() {
                initialContext.dispatch({
                  type: 'MERGE_EVENTS',
                  eventStore: relevantEvents
                });
              }
            };
            initialContext.emitter.trigger('eventLeave', Object.assign(Object.assign({}, eventRemoveArg), {
              draggedEl: ev.subjectEl,
              view: initialView
            }));
            initialContext.dispatch({
              type: 'REMOVE_EVENTS',
              eventStore: relevantEvents
            });
            initialContext.emitter.trigger('eventRemove', eventRemoveArg);
            let addedEventDef = mutatedRelevantEvents.defs[eventDef.defId];
            let addedEventInstance = mutatedRelevantEvents.instances[eventInstance.instanceId];
            let addedEventApi = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(receivingContext, addedEventDef, addedEventInstance);
            receivingContext.dispatch({
              type: 'MERGE_EVENTS',
              eventStore: mutatedRelevantEvents
            });
            let eventAddArg = {
              event: addedEventApi,
              relatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.w)(mutatedRelevantEvents, receivingContext, addedEventInstance),
              revert() {
                receivingContext.dispatch({
                  type: 'REMOVE_EVENTS',
                  eventStore: mutatedRelevantEvents
                });
              }
            };
            receivingContext.emitter.trigger('eventAdd', eventAddArg);
            if (ev.isTouch) {
              receivingContext.dispatch({
                type: 'SELECT_EVENT',
                eventInstanceId: eventInstance.instanceId
              });
            }
            receivingContext.emitter.trigger('drop', Object.assign(Object.assign({}, buildDatePointApiWithContext(finalHit.dateSpan, receivingContext)), {
              draggedEl: ev.subjectEl,
              jsEvent: ev.origEvent,
              view: finalHit.context.viewApi
            }));
            receivingContext.emitter.trigger('eventReceive', Object.assign(Object.assign({}, eventAddArg), {
              draggedEl: ev.subjectEl,
              view: finalHit.context.viewApi
            }));
          }
        } else {
          initialContext.emitter.trigger('_noEventDrop');
        }
      }
      this.cleanup();
    };
    let {
      component
    } = this;
    let {
      options
    } = component.context;
    let dragging = this.dragging = new FeaturefulElementDragging(settings.el);
    dragging.pointer.selector = EventDragging.SELECTOR;
    dragging.touchScrollAllowed = false;
    dragging.autoScroller.isEnabled = options.dragScroll;
    let hitDragging = this.hitDragging = new HitDragging(this.dragging, _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a7);
    hitDragging.useSubjectCenter = settings.useEventCenter;
    hitDragging.emitter.on('pointerdown', this.handlePointerDown);
    hitDragging.emitter.on('dragstart', this.handleDragStart);
    hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
    hitDragging.emitter.on('pointerup', this.handlePointerUp);
    hitDragging.emitter.on('dragend', this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  // render a drag state on the next receivingCalendar
  displayDrag(nextContext, state) {
    let initialContext = this.component.context;
    let prevContext = this.receivingContext;
    // does the previous calendar need to be cleared?
    if (prevContext && prevContext !== nextContext) {
      // does the initial calendar need to be cleared?
      // if so, don't clear all the way. we still need to to hide the affectedEvents
      if (prevContext === initialContext) {
        prevContext.dispatch({
          type: 'SET_EVENT_DRAG',
          state: {
            affectedEvents: state.affectedEvents,
            mutatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
            isEvent: true
          }
        });
        // completely clear the old calendar if it wasn't the initial
      } else {
        prevContext.dispatch({
          type: 'UNSET_EVENT_DRAG'
        });
      }
    }
    if (nextContext) {
      nextContext.dispatch({
        type: 'SET_EVENT_DRAG',
        state
      });
    }
  }
  clearDrag() {
    let initialCalendar = this.component.context;
    let {
      receivingContext
    } = this;
    if (receivingContext) {
      receivingContext.dispatch({
        type: 'UNSET_EVENT_DRAG'
      });
    }
    // the initial calendar might have an dummy drag state from displayDrag
    if (initialCalendar !== receivingContext) {
      initialCalendar.dispatch({
        type: 'UNSET_EVENT_DRAG'
      });
    }
  }
  cleanup() {
    this.subjectSeg = null;
    this.isDragging = false;
    this.eventRange = null;
    this.relevantEvents = null;
    this.receivingContext = null;
    this.validMutation = null;
    this.mutatedRelevantEvents = null;
  }
}
// TODO: test this in IE11
// QUESTION: why do we need it on the resizable???
EventDragging.SELECTOR = '.fc-event-draggable, .fc-event-resizable';
function computeEventMutation(hit0, hit1, massagers) {
  let dateSpan0 = hit0.dateSpan;
  let dateSpan1 = hit1.dateSpan;
  let date0 = dateSpan0.range.start;
  let date1 = dateSpan1.range.start;
  let standardProps = {};
  if (dateSpan0.allDay !== dateSpan1.allDay) {
    standardProps.allDay = dateSpan1.allDay;
    standardProps.hasEnd = hit1.context.options.allDayMaintainDuration;
    if (dateSpan1.allDay) {
      // means date1 is already start-of-day,
      // but date0 needs to be converted
      date0 = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.q)(date0);
    }
  }
  let delta = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aA)(date0, date1, hit0.context.dateEnv, hit0.componentId === hit1.componentId ? hit0.largeUnit : null);
  if (delta.milliseconds) {
    // has hours/minutes/seconds
    standardProps.allDay = false;
  }
  let mutation = {
    datesDelta: delta,
    standardProps
  };
  for (let massager of massagers) {
    massager(mutation, hit0, hit1);
  }
  return mutation;
}
function getComponentTouchDelay(component) {
  let {
    options
  } = component.context;
  let delay = options.eventLongPressDelay;
  if (delay == null) {
    delay = options.longPressDelay;
  }
  return delay;
}
class EventResizing extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.Z {
  constructor(settings) {
    super(settings);
    // internal state
    this.draggingSegEl = null;
    this.draggingSeg = null; // TODO: rename to resizingSeg? subjectSeg?
    this.eventRange = null;
    this.relevantEvents = null;
    this.validMutation = null;
    this.mutatedRelevantEvents = null;
    this.handlePointerDown = ev => {
      let {
        component
      } = this;
      let segEl = this.querySegEl(ev);
      let seg = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl);
      let eventRange = this.eventRange = seg.eventRange;
      this.dragging.minDistance = component.context.options.eventDragMinDistance;
      // if touch, need to be working with a selected event
      this.dragging.setIgnoreMove(!this.component.isValidSegDownEl(ev.origEvent.target) || ev.isTouch && this.component.props.eventSelection !== eventRange.instance.instanceId);
    };
    this.handleDragStart = ev => {
      let {
        context
      } = this.component;
      let eventRange = this.eventRange;
      this.relevantEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aV)(context.getCurrentData().eventStore, this.eventRange.instance.instanceId);
      let segEl = this.querySegEl(ev);
      this.draggingSegEl = segEl;
      this.draggingSeg = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__._)(segEl);
      context.calendarApi.unselect();
      context.emitter.trigger('eventResizeStart', {
        el: segEl,
        event: new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(context, eventRange.def, eventRange.instance),
        jsEvent: ev.origEvent,
        view: context.viewApi
      });
    };
    this.handleHitUpdate = (hit, isFinal, ev) => {
      let {
        context
      } = this.component;
      let relevantEvents = this.relevantEvents;
      let initialHit = this.hitDragging.initialHit;
      let eventInstance = this.eventRange.instance;
      let mutation = null;
      let mutatedRelevantEvents = null;
      let isInvalid = false;
      let interaction = {
        affectedEvents: relevantEvents,
        mutatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
        isEvent: true
      };
      if (hit) {
        let disallowed = hit.componentId === initialHit.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(initialHit, hit);
        if (!disallowed) {
          mutation = computeMutation(initialHit, hit, ev.subjectEl.classList.contains('fc-event-resizer-start'), eventInstance.range);
        }
      }
      if (mutation) {
        mutatedRelevantEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bX)(relevantEvents, context.getCurrentData().eventUiBases, mutation, context);
        interaction.mutatedEvents = mutatedRelevantEvents;
        if (!(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bZ)(interaction, hit.dateProfile, context)) {
          isInvalid = true;
          mutation = null;
          mutatedRelevantEvents = null;
          interaction.mutatedEvents = null;
        }
      }
      if (mutatedRelevantEvents) {
        context.dispatch({
          type: 'SET_EVENT_RESIZE',
          state: interaction
        });
      } else {
        context.dispatch({
          type: 'UNSET_EVENT_RESIZE'
        });
      }
      if (!isInvalid) {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aw)();
      } else {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ax)();
      }
      if (!isFinal) {
        if (mutation && isHitsEqual(initialHit, hit)) {
          mutation = null;
        }
        this.validMutation = mutation;
        this.mutatedRelevantEvents = mutatedRelevantEvents;
      }
    };
    this.handleDragEnd = ev => {
      let {
        context
      } = this.component;
      let eventDef = this.eventRange.def;
      let eventInstance = this.eventRange.instance;
      let eventApi = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(context, eventDef, eventInstance);
      let relevantEvents = this.relevantEvents;
      let mutatedRelevantEvents = this.mutatedRelevantEvents;
      context.emitter.trigger('eventResizeStop', {
        el: this.draggingSegEl,
        event: eventApi,
        jsEvent: ev.origEvent,
        view: context.viewApi
      });
      if (this.validMutation) {
        let updatedEventApi = new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(context, mutatedRelevantEvents.defs[eventDef.defId], eventInstance ? mutatedRelevantEvents.instances[eventInstance.instanceId] : null);
        context.dispatch({
          type: 'MERGE_EVENTS',
          eventStore: mutatedRelevantEvents
        });
        let eventChangeArg = {
          oldEvent: eventApi,
          event: updatedEventApi,
          relatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.w)(mutatedRelevantEvents, context, eventInstance),
          revert() {
            context.dispatch({
              type: 'MERGE_EVENTS',
              eventStore: relevantEvents // the pre-change events
            });
          }
        };

        context.emitter.trigger('eventResize', Object.assign(Object.assign({}, eventChangeArg), {
          el: this.draggingSegEl,
          startDelta: this.validMutation.startDelta || (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.d)(0),
          endDelta: this.validMutation.endDelta || (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.d)(0),
          jsEvent: ev.origEvent,
          view: context.viewApi
        }));
        context.emitter.trigger('eventChange', eventChangeArg);
      } else {
        context.emitter.trigger('_noEventResize');
      }
      // reset all internal state
      this.draggingSeg = null;
      this.relevantEvents = null;
      this.validMutation = null;
      // okay to keep eventInstance around. useful to set it in handlePointerDown
    };

    let {
      component
    } = settings;
    let dragging = this.dragging = new FeaturefulElementDragging(settings.el);
    dragging.pointer.selector = '.fc-event-resizer';
    dragging.touchScrollAllowed = false;
    dragging.autoScroller.isEnabled = component.context.options.dragScroll;
    let hitDragging = this.hitDragging = new HitDragging(this.dragging, (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bG)(settings));
    hitDragging.emitter.on('pointerdown', this.handlePointerDown);
    hitDragging.emitter.on('dragstart', this.handleDragStart);
    hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
    hitDragging.emitter.on('dragend', this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  querySegEl(ev) {
    return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(ev.subjectEl, '.fc-event');
  }
}
function computeMutation(hit0, hit1, isFromStart, instanceRange) {
  let dateEnv = hit0.context.dateEnv;
  let date0 = hit0.dateSpan.range.start;
  let date1 = hit1.dateSpan.range.start;
  let delta = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aA)(date0, date1, dateEnv, hit0.largeUnit);
  if (isFromStart) {
    if (dateEnv.add(instanceRange.start, delta) < instanceRange.end) {
      return {
        startDelta: delta
      };
    }
  } else if (dateEnv.add(instanceRange.end, delta) > instanceRange.start) {
    return {
      endDelta: delta
    };
  }
  return null;
}
class UnselectAuto {
  constructor(context) {
    this.context = context;
    this.isRecentPointerDateSelect = false; // wish we could use a selector to detect date selection, but uses hit system
    this.matchesCancel = false;
    this.matchesEvent = false;
    this.onSelect = selectInfo => {
      if (selectInfo.jsEvent) {
        this.isRecentPointerDateSelect = true;
      }
    };
    this.onDocumentPointerDown = pev => {
      let unselectCancel = this.context.options.unselectCancel;
      let downEl = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aR)(pev.origEvent);
      this.matchesCancel = !!(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(downEl, unselectCancel);
      this.matchesEvent = !!(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.$)(downEl, EventDragging.SELECTOR); // interaction started on an event?
    };

    this.onDocumentPointerUp = pev => {
      let {
        context
      } = this;
      let {
        documentPointer
      } = this;
      let calendarState = context.getCurrentData();
      // touch-scrolling should never unfocus any type of selection
      if (!documentPointer.wasTouchScroll) {
        if (calendarState.dateSelection &&
        // an existing date selection?
        !this.isRecentPointerDateSelect // a new pointer-initiated date selection since last onDocumentPointerUp?
        ) {
          let unselectAuto = context.options.unselectAuto;
          if (unselectAuto && (!unselectAuto || !this.matchesCancel)) {
            context.calendarApi.unselect(pev);
          }
        }
        if (calendarState.eventSelection &&
        // an existing event selected?
        !this.matchesEvent // interaction DIDN'T start on an event
        ) {
          context.dispatch({
            type: 'UNSELECT_EVENT'
          });
        }
      }
      this.isRecentPointerDateSelect = false;
    };
    let documentPointer = this.documentPointer = new PointerDragging(document);
    documentPointer.shouldIgnoreMove = true;
    documentPointer.shouldWatchScroll = false;
    documentPointer.emitter.on('pointerdown', this.onDocumentPointerDown);
    documentPointer.emitter.on('pointerup', this.onDocumentPointerUp);
    /*
    TODO: better way to know about whether there was a selection with the pointer
    */
    context.emitter.on('select', this.onSelect);
  }
  destroy() {
    this.context.emitter.off('select', this.onSelect);
    this.documentPointer.destroy();
  }
}
const OPTION_REFINERS = {
  fixedMirrorParent: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n
};
const LISTENER_REFINERS = {
  dateClick: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventDragStart: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventDragStop: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventDrop: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventResizeStart: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventResizeStop: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventResize: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  drop: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventReceive: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n,
  eventLeave: _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.n
};

/*
Given an already instantiated draggable object for one-or-more elements,
Interprets any dragging as an attempt to drag an events that lives outside
of a calendar onto a calendar.
*/
class ExternalElementDragging {
  constructor(dragging, suppliedDragMeta) {
    this.receivingContext = null;
    this.droppableEvent = null; // will exist for all drags, even if create:false
    this.suppliedDragMeta = null;
    this.dragMeta = null;
    this.handleDragStart = ev => {
      this.dragMeta = this.buildDragMeta(ev.subjectEl);
    };
    this.handleHitUpdate = (hit, isFinal, ev) => {
      let {
        dragging
      } = this.hitDragging;
      let receivingContext = null;
      let droppableEvent = null;
      let isInvalid = false;
      let interaction = {
        affectedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
        mutatedEvents: (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)(),
        isEvent: this.dragMeta.create
      };
      if (hit) {
        receivingContext = hit.context;
        if (this.canDropElOnCalendar(ev.subjectEl, receivingContext)) {
          droppableEvent = computeEventForDateSpan(hit.dateSpan, this.dragMeta, receivingContext);
          interaction.mutatedEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aW)(droppableEvent);
          isInvalid = !(0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bZ)(interaction, hit.dateProfile, receivingContext);
          if (isInvalid) {
            interaction.mutatedEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.I)();
            droppableEvent = null;
          }
        }
      }
      this.displayDrag(receivingContext, interaction);
      // show mirror if no already-rendered mirror element OR if we are shutting down the mirror (?)
      // TODO: wish we could somehow wait for dispatch to guarantee render
      dragging.setMirrorIsVisible(isFinal || !droppableEvent || !document.querySelector('.fc-event-mirror'));
      if (!isInvalid) {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aw)();
      } else {
        (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ax)();
      }
      if (!isFinal) {
        dragging.setMirrorNeedsRevert(!droppableEvent);
        this.receivingContext = receivingContext;
        this.droppableEvent = droppableEvent;
      }
    };
    this.handleDragEnd = pev => {
      let {
        receivingContext,
        droppableEvent
      } = this;
      this.clearDrag();
      if (receivingContext && droppableEvent) {
        let finalHit = this.hitDragging.finalHit;
        let finalView = finalHit.context.viewApi;
        let dragMeta = this.dragMeta;
        receivingContext.emitter.trigger('drop', Object.assign(Object.assign({}, buildDatePointApiWithContext(finalHit.dateSpan, receivingContext)), {
          draggedEl: pev.subjectEl,
          jsEvent: pev.origEvent,
          view: finalView
        }));
        if (dragMeta.create) {
          let addingEvents = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aW)(droppableEvent);
          receivingContext.dispatch({
            type: 'MERGE_EVENTS',
            eventStore: addingEvents
          });
          if (pev.isTouch) {
            receivingContext.dispatch({
              type: 'SELECT_EVENT',
              eventInstanceId: droppableEvent.instance.instanceId
            });
          }
          // signal that an external event landed
          receivingContext.emitter.trigger('eventReceive', {
            event: new _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a0(receivingContext, droppableEvent.def, droppableEvent.instance),
            relatedEvents: [],
            revert() {
              receivingContext.dispatch({
                type: 'REMOVE_EVENTS',
                eventStore: addingEvents
              });
            },
            draggedEl: pev.subjectEl,
            view: finalView
          });
        }
      }
      this.receivingContext = null;
      this.droppableEvent = null;
    };
    let hitDragging = this.hitDragging = new HitDragging(dragging, _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.a7);
    hitDragging.requireInitial = false; // will start outside of a component
    hitDragging.emitter.on('dragstart', this.handleDragStart);
    hitDragging.emitter.on('hitupdate', this.handleHitUpdate);
    hitDragging.emitter.on('dragend', this.handleDragEnd);
    this.suppliedDragMeta = suppliedDragMeta;
  }
  buildDragMeta(subjectEl) {
    if (typeof this.suppliedDragMeta === 'object') {
      return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bJ)(this.suppliedDragMeta);
    }
    if (typeof this.suppliedDragMeta === 'function') {
      return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bJ)(this.suppliedDragMeta(subjectEl));
    }
    return getDragMetaFromEl(subjectEl);
  }
  displayDrag(nextContext, state) {
    let prevContext = this.receivingContext;
    if (prevContext && prevContext !== nextContext) {
      prevContext.dispatch({
        type: 'UNSET_EVENT_DRAG'
      });
    }
    if (nextContext) {
      nextContext.dispatch({
        type: 'SET_EVENT_DRAG',
        state
      });
    }
  }
  clearDrag() {
    if (this.receivingContext) {
      this.receivingContext.dispatch({
        type: 'UNSET_EVENT_DRAG'
      });
    }
  }
  canDropElOnCalendar(el, receivingContext) {
    let dropAccept = receivingContext.options.dropAccept;
    if (typeof dropAccept === 'function') {
      return dropAccept.call(receivingContext.calendarApi, el);
    }
    if (typeof dropAccept === 'string' && dropAccept) {
      return Boolean((0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aQ)(el, dropAccept));
    }
    return true;
  }
}
// Utils for computing event store from the DragMeta
// ----------------------------------------------------------------------------------------------------
function computeEventForDateSpan(dateSpan, dragMeta, context) {
  let defProps = Object.assign({}, dragMeta.leftoverProps);
  for (let transform of context.pluginHooks.externalDefTransforms) {
    Object.assign(defProps, transform(dateSpan, dragMeta));
  }
  let {
    refined,
    extra
  } = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.al)(defProps, context);
  let def = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.ak)(refined, extra, dragMeta.sourceId, dateSpan.allDay, context.options.forceEventDuration || Boolean(dragMeta.duration),
  // hasEnd
  context);
  let start = dateSpan.range.start;
  // only rely on time info if drop zone is all-day,
  // otherwise, we already know the time
  if (dateSpan.allDay && dragMeta.startTime) {
    start = context.dateEnv.add(start, dragMeta.startTime);
  }
  let end = dragMeta.duration ? context.dateEnv.add(start, dragMeta.duration) : (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.cv)(dateSpan.allDay, start, context);
  let instance = (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.aj)(def.defId, {
    start,
    end
  });
  return {
    def,
    instance
  };
}
// Utils for extracting data from element
// ----------------------------------------------------------------------------------------------------
function getDragMetaFromEl(el) {
  let str = getEmbeddedElData(el, 'event');
  let obj = str ? JSON.parse(str) : {
    create: false
  }; // if no embedded data, assume no event creation
  return (0,_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bJ)(obj);
}
_fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bI.dataAttrPrefix = '';
function getEmbeddedElData(el, name) {
  let prefix = _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bI.dataAttrPrefix;
  let prefixedName = (prefix ? prefix + '-' : '') + name;
  return el.getAttribute('data-' + prefixedName) || '';
}

/*
Makes an element (that is *external* to any calendar) draggable.
Can pass in data that determines how an event will be created when dropped onto a calendar.
Leverages FullCalendar's internal drag-n-drop functionality WITHOUT a third-party drag system.
*/
class ExternalDraggable {
  constructor(el, settings = {}) {
    this.handlePointerDown = ev => {
      let {
        dragging
      } = this;
      let {
        minDistance,
        longPressDelay
      } = this.settings;
      dragging.minDistance = minDistance != null ? minDistance : ev.isTouch ? 0 : _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.e.eventDragMinDistance;
      dragging.delay = ev.isTouch ?
      // TODO: eventually read eventLongPressDelay instead vvv
      longPressDelay != null ? longPressDelay : _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.e.longPressDelay : 0;
    };
    this.handleDragStart = ev => {
      if (ev.isTouch && this.dragging.delay && ev.subjectEl.classList.contains('fc-event')) {
        this.dragging.mirror.getMirrorEl().classList.add('fc-event-selected');
      }
    };
    this.settings = settings;
    let dragging = this.dragging = new FeaturefulElementDragging(el);
    dragging.touchScrollAllowed = false;
    if (settings.itemSelector != null) {
      dragging.pointer.selector = settings.itemSelector;
    }
    if (settings.appendTo != null) {
      dragging.mirror.parentNode = settings.appendTo; // TODO: write tests
    }

    dragging.emitter.on('pointerdown', this.handlePointerDown);
    dragging.emitter.on('dragstart', this.handleDragStart);
    new ExternalElementDragging(dragging, settings.eventData); // eslint-disable-line no-new
  }

  destroy() {
    this.dragging.destroy();
  }
}

/*
Detects when a *THIRD-PARTY* drag-n-drop system interacts with elements.
The third-party system is responsible for drawing the visuals effects of the drag.
This class simply monitors for pointer movements and fires events.
It also has the ability to hide the moving element (the "mirror") during the drag.
*/
class InferredElementDragging extends _fullcalendar_core_internal_js__WEBPACK_IMPORTED_MODULE_0__.bH {
  constructor(containerEl) {
    super(containerEl);
    this.shouldIgnoreMove = false;
    this.mirrorSelector = '';
    this.currentMirrorEl = null;
    this.handlePointerDown = ev => {
      this.emitter.trigger('pointerdown', ev);
      if (!this.shouldIgnoreMove) {
        // fire dragstart right away. does not support delay or min-distance
        this.emitter.trigger('dragstart', ev);
      }
    };
    this.handlePointerMove = ev => {
      if (!this.shouldIgnoreMove) {
        this.emitter.trigger('dragmove', ev);
      }
    };
    this.handlePointerUp = ev => {
      this.emitter.trigger('pointerup', ev);
      if (!this.shouldIgnoreMove) {
        // fire dragend right away. does not support a revert animation
        this.emitter.trigger('dragend', ev);
      }
    };
    let pointer = this.pointer = new PointerDragging(containerEl);
    pointer.emitter.on('pointerdown', this.handlePointerDown);
    pointer.emitter.on('pointermove', this.handlePointerMove);
    pointer.emitter.on('pointerup', this.handlePointerUp);
  }
  destroy() {
    this.pointer.destroy();
  }
  setIgnoreMove(bool) {
    this.shouldIgnoreMove = bool;
  }
  setMirrorIsVisible(bool) {
    if (bool) {
      // restore a previously hidden element.
      // use the reference in case the selector class has already been removed.
      if (this.currentMirrorEl) {
        this.currentMirrorEl.style.visibility = '';
        this.currentMirrorEl = null;
      }
    } else {
      let mirrorEl = this.mirrorSelector
      // TODO: somehow query FullCalendars WITHIN shadow-roots
      ? document.querySelector(this.mirrorSelector) : null;
      if (mirrorEl) {
        this.currentMirrorEl = mirrorEl;
        mirrorEl.style.visibility = 'hidden';
      }
    }
  }
}

/*
Bridges third-party drag-n-drop systems with FullCalendar.
Must be instantiated and destroyed by caller.
*/
class ThirdPartyDraggable {
  constructor(containerOrSettings, settings) {
    let containerEl = document;
    if (
    // wish we could just test instanceof EventTarget, but doesn't work in IE11
    containerOrSettings === document || containerOrSettings instanceof Element) {
      containerEl = containerOrSettings;
      settings = settings || {};
    } else {
      settings = containerOrSettings || {};
    }
    let dragging = this.dragging = new InferredElementDragging(containerEl);
    if (typeof settings.itemSelector === 'string') {
      dragging.pointer.selector = settings.itemSelector;
    } else if (containerEl === document) {
      dragging.pointer.selector = '[data-event]';
    }
    if (typeof settings.mirrorSelector === 'string') {
      dragging.mirrorSelector = settings.mirrorSelector;
    }
    new ExternalElementDragging(dragging, settings.eventData); // eslint-disable-line no-new
  }

  destroy() {
    this.dragging.destroy();
  }
}
var index = (0,_fullcalendar_core_index_js__WEBPACK_IMPORTED_MODULE_1__.createPlugin)({
  name: '@fullcalendar/interaction',
  componentInteractions: [DateClicking, DateSelecting, EventDragging, EventResizing],
  calendarInteractions: [UnselectAuto],
  elementDraggingImpl: FeaturefulElementDragging,
  optionRefiners: OPTION_REFINERS,
  listenerRefiners: LISTENER_REFINERS
});


/***/ })

}]);
//# sourceMappingURL=381.js.map
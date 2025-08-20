// Copyright 2019 Google LLC. All Rights Reserved.
"use strict";
var m,
  ca = function (a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  },
  da =
    typeof Object.defineProperties == "function"
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) return a;
          a[b] = c.value;
          return a;
        },
  ea = function (a) {
    a = [
      "object" == typeof globalThis && globalThis,
      a,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    throw Error("Cannot find global object");
  },
  fa = ea(this),
  ha = function (a, b) {
    if (b)
      a: {
        var c = fa;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) break a;
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d &&
          b != null &&
          da(c, a, { configurable: !0, writable: !0, value: b });
      }
  };
ha("Symbol", function (a) {
  if (a) return a;
  var b = function (g, f) {
    this.T = g;
    da(this, "description", { configurable: !0, writable: !0, value: f });
  };
  b.prototype.toString = function () {
    return this.T;
  };
  var c = "jscomp_symbol_" + ((Math.random() * 1e9) >>> 0) + "_",
    d = 0,
    e = function (g) {
      if (this instanceof e) throw new TypeError("Symbol is not a constructor");
      return new b(c + (g || "") + "_" + d++, g);
    };
  return e;
});
ha("Symbol.iterator", function (a) {
  if (a) return a;
  a = Symbol("Symbol.iterator");
  for (
    var b =
        "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
          " "
        ),
      c = 0;
    c < b.length;
    c++
  ) {
    var d = fa[b[c]];
    typeof d === "function" &&
      typeof d.prototype[a] != "function" &&
      da(d.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
          return ia(ca(this));
        },
      });
  }
  return a;
});
var ia = function (a) {
    a = { next: a };
    a[Symbol.iterator] = function () {
      return this;
    };
    return a;
  },
  x = function (a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new Promise(function (d, e) {
      function g(f) {
        f.done ? d(f.value) : Promise.resolve(f.value).then(b, c).then(g, e);
      }
      g(a.next());
    });
  }; /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var y = this || self,
  ja = function (a) {
    return a;
  };
function ka(a) {
  const b = Buffer.from(a, "base64");
  if (b.toString("base64") === a) return b.toString();
}
function la(a, b, c = !1) {
  a = (a || "")
    .split(";")
    .map((d) => d.replace(/^\s+/, ""))
    .filter((d) => d.startsWith(b + "="))
    .map((d) => d.substring(b.length + 1));
  return c ? a : a.map(decodeURIComponent);
}
function z(a, b, c = !1) {
  return la(a.headers.cookie || "", b, c)[0] || "";
}
function ma(a, b) {
  var c = a.headers;
  if (c["x-gtm-server-preview"]) {
    a = Object;
    var d = a.assign;
    c = c["x-gtm-server-preview"];
    Array.isArray(c) && (c = c[0] || "");
    c = (ka(c) || "").split("|");
    if (c.length !== 3)
      throw Error("Invalid 'x-gtm-server-preview' header value.");
    return d.call(a, {}, { containerId: b }, { l: c[0], m: c[1], o: c[2] });
  }
  d = {
    containerId: b,
    m: B(na(c["x-gtm-auth"]), b),
    o: B(na(c["x-gtm-debug"]), b),
    l: B(na(c["x-gtm-preview"]), b),
  };
  if (d.m !== void 0 || d.o !== void 0 || d.l !== void 0) return d;
  c = z(a, "gtm_auth");
  const e = z(a, "gtm_debug");
  a = z(a, "gtm_preview");
  d.m = B(c, b);
  d.o = B(e, b);
  d.l = B(a, b);
  return d;
}
function B(a, b) {
  const c = `${b}=`;
  a = a.split(":").find((d) => !d.indexOf(c));
  if (a !== void 0) return a.substring(c.length);
}
function oa(a, b, c) {
  const d = `${b}=`;
  a = a.split(":").filter((e) => e.length && e.indexOf(d));
  c && a.push(`${d}${c}`);
  return a.join(":");
}
function na(a) {
  Array.isArray(a) && (a = a[0]);
  return a || "";
}
var pa = {
  "Cache-Control": "no-store",
  "Content-Disposition": 'attachment; filename="f.txt"',
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};
var C = require("flags");
var wa = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("console");
var E = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("process");
var xa = class {
  constructor(a, b, c) {
    this.flag = a;
    this.H = b;
    this.s = c;
  }
  isSet() {
    return C.isSet(this.H) || !!(this.s && this.s in E.env);
  }
  get() {
    if (this.s && this.s in E.env)
      if (C.isSet(this.H))
        wa.warn(
          `Ignored environment variable ${this.s}=${
            E.env[this.s]
          } because command-line flag --${this.H}=${this.flag.get()} was given.`
        );
      else return this.flag.parseInput(E.env[this.s]);
    return this.flag.get();
  }
  setSecret(a) {
    this.flag.setSecret(a);
  }
};
function ya(a, b) {
  a.endsWith(".") || (a += ".");
  return b ? `${a} May also be set by ${b} environment variable.` : a;
}
function F(a, b, c, d) {
  b = ya(b, d);
  return new xa(C.defineString(a, c, b), a, d);
}
function H(a, b, c) {
  b = ya(b, c);
  return new xa(C.defineBoolean(a, !1, b), a, c);
}
function I(a, b, c, d) {
  b = ya(b, d);
  return new xa(C.defineInteger(a, c, b), a, d);
}
var za = C.parse;
var Aa = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("url");
var J = function (a, b) {
    return a.url.query[b];
  },
  Ba = function (a) {
    const b = {
      protocol: a.url.protocol,
      hostname: a.url.hostname,
      hash: a.url.hash,
      search: a.url.search,
      pathname: a.url.pathname,
      path: a.url.path,
      href: a.url.href,
    };
    a.url.port && (b.port = a.url.port);
    a.url.auth && (b.auth = a.url.auth);
    return b;
  },
  K = class {
    constructor(a) {
      this.url = Aa.parse(a, !0);
    }
    hostname() {
      return this.url.hostname;
    }
    host() {
      return this.url.host;
    }
    pathname() {
      return this.url.pathname;
    }
    search() {
      return this.url.search;
    }
  };
const Ca = [
  { start: 17322624e5, end: 173329914e4 },
  { start: 1734768e6, end: 173589114e4 },
];
var Da;
const Ea = 10368e5 + 1728e5 * Math.random();
let Fa = Date.now() + Ea;
for (const a of Ca) a.start < Fa && Fa < a.end && (Fa += 12096e5);
Da = Fa;
var Ga = 0,
  Ha = 0;
const Ia = H(
  "enable_probe_image_version",
  "Enable to turn on a healthz command that verifies the server is running the passed in version.",
  "ENABLE_PROBE_IMAGE_VERSION"
);
Ia.setSecret(!0);
function Ja(a, b) {
  if (a.method !== "GET") return !1;
  var c = new K(a.url);
  const d = c.pathname();
  return (d == null ? 0 : d.endsWith("/healthz")) ||
    (d == null ? 0 : d.endsWith("/healthy"))
    ? (c = J(c, "servertype")) && c !== "serverjs"
      ? N(b, 500)
      : Ka(a, b)
      ? !0
      : Date.now() > Da
      ? N(b, 503)
      : N(b, 200, "ok")
    : !1;
}
function Ka(a, b) {
  a = a.headers["x-sgtm-healthz"];
  if (!a) return !1;
  const c = a.split(",")[0].split("=");
  a = c[0];
  if (Ia.get() && a === "probe_running_version") {
    if (!/\d+\.\d+\.\d+\-\d+/.test(c[1])) return N(b, 400);
    const [e, g] = c[1].split("-");
    var d;
    a = (d = global.sst_bootstrap_version) != null ? d : 0;
    const [f, h, l] = e.split("."),
      [w, q, u] = (global.sst_image_version || "0.0.0").split(".");
    return Number(w) >= Number(f) &&
      Number(q) >= Number(h) &&
      Number(u) >= Number(l) &&
      Number(a) >= Number(g)
      ? N(b, 200, "ok")
      : N(b, 500);
  }
  d = Number(c[1]);
  return isNaN(d)
    ? N(b, 500)
    : a === "server_start_millis"
    ? Date.now() - Ga > d
      ? N(b, 500)
      : N(b, 200, "ok")
    : a === "container_refresh_millis"
    ? Date.now() - Ha > d
      ? N(b, 500)
      : N(b, 200, "ok")
    : !1;
}
function N(a, b, c = "") {
  a.writeHead(b, { "Content-Type": "text/plain" });
  a.end(c);
  return !0;
}
var La = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("http");
var Ma = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("https");
var Na = class extends Error {
    constructor(a) {
      super(a);
      this.name = "HttpTimeoutError";
      Error.captureStackTrace(this, Na);
    }
  },
  Oa = class extends Error {
    constructor(a) {
      super(a);
      this.name = "HttpNotFoundError";
      Error.captureStackTrace(this, Oa);
    }
  },
  Pa = class extends Error {
    constructor(a) {
      super(a);
      this.name = "HttpPermissionError";
      Error.captureStackTrace(this, Pa);
    }
  },
  Qa = class extends Error {
    constructor(a) {
      super(a);
      this.name = "HttpClientSideError";
      Error.captureStackTrace(this, Qa);
    }
  },
  Ra = class extends Error {
    constructor(a) {
      super(a);
      this.name = "HttpServiceUnavailableError";
      Error.captureStackTrace(this, Ra);
    }
  },
  Xa = class extends Error {
    constructor(a) {
      super(a);
      this.name = "HttpServerSideError";
      Error.captureStackTrace(this, Xa);
    }
  };
const Ya = new Map([
  [400, Qa],
  [403, Pa],
  [404, Oa],
  [408, Na],
  [500, Xa],
  [503, Ra],
]);
function Za(a, b, c) {
  const d = !!b.followRedirects,
    e = Number(b.maxRedirects),
    g = isNaN(e) ? 3 : e;
  if (d && g < 0) return Promise.reject(Error("Too many redirects."));
  let f, h;
  return new Promise((l, w) => {
    var q = Number(b.timeout);
    let { timeoutCallbacks: u } = b;
    q > 0 &&
      ((u = u || []),
      (h = setTimeout(() => {
        for (const r of u) r();
      }, q)));
    let Q;
    (Q = u) == null ||
      Q.push(() => {
        let r;
        (r = f) == null || r.abort();
        w(new Na("Request timed out."));
      });
    const t = Object.assign({}, b);
    b.headers && (t.headers = Object.assign({}, b.headers));
    delete t.timeout;
    global.server_js_dev_only &&
      (t.headers || (t.headers = {}),
      (t.headers["X-Google-GFE-Frontline-Info"] = "ssl"));
    c &&
      (t.headers || (t.headers = {}),
      (t.headers["content-length"] = Buffer.byteLength(c)));
    "agent" in t || !(q = $a(a)) || (t.agent = q);
    q = Object.assign({}, Ba(new K(a)), t);
    f = ab(a).request(q, (r) => {
      if (
        d &&
        r.statusCode &&
        r.statusCode >= 300 &&
        r.statusCode < 400 &&
        r.headers.location
      ) {
        r.resume();
        const A = r.headers.location;
        bb(a) && !bb(A)
          ? w(Error("Unable to follow HTTPS -> HTTP redirect."))
          : ((t.agent = $a(A)),
            l(
              Za(
                r.headers.location,
                Object.assign({}, t, {
                  timeoutCallbacks: u,
                  followRedirects: d,
                  maxRedirects: g - 1,
                }),
                c
              )
            ));
      } else {
        var G = [];
        r.on("data", (A) => {
          G.push(A);
        });
        r.on("end", () => {
          const A = {
            statusCode: r.statusCode,
            headers: r.headers,
            body: G.length === 0 ? void 0 : Buffer.concat(G).toString(),
          };
          l(A);
        });
      }
    });
    let R;
    (R = f) == null || R.on("error", w);
    let D;
    (D = f) == null || D.end(c);
  }).finally(() => void clearTimeout(h));
}
function cb(a) {
  return Za(a, Object.assign({}, {}, { method: "GET" }));
}
function db(a) {
  const b = `Received HTTP status code ${a.statusCode}.`,
    c = Ya.get(a.statusCode);
  if (c) throw new c(b);
  if (a.statusCode >= 500) throw new Xa(b);
  if (a.statusCode >= 400) throw new Qa(b);
}
function bb(a) {
  return a.toLowerCase().startsWith("https://");
}
function ab(a) {
  if (bb(a)) return { request: Ma.request, get: Ma.get };
  if (a.toLowerCase().startsWith("http://"))
    return { request: La.request, get: La.get };
  throw Error(`URL ${a} uses unsupported protocol; must be HTTP or HTTPS.`);
}
function $a(a) {
  if (global.http_proxy_agent && global.https_proxy_agent && eb(a)) {
    if (bb(a)) return global.https_proxy_agent;
    if (a.toLowerCase().startsWith("http://")) return global.http_proxy_agent;
  }
}
function eb(a) {
  const b = global.no_proxy_hosts;
  if (!b || !Array.isArray(b)) return !0;
  let c;
  try {
    c = new URL(a);
  } catch (d) {
    return !0;
  }
  for (let d of b) {
    d.startsWith(".") && (d = d.substring(1));
    if (c.hostname === d || c.host === d) return !1;
    d = "." + d;
    if (c.hostname.endsWith(d) || c.host.endsWith(d)) return !1;
  }
  return !0;
}
class fb {
  constructor(a, b) {
    this.U = a[y.Symbol.iterator]();
    this.W = b;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const a = this.U.next();
    return {
      value: a.done ? void 0 : this.W.call(void 0, a.value),
      done: a.done,
    };
  }
}
var gb = function (a, b) {
  return new fb(a, b);
};
var hb =
  Object.freeze ||
  function (a) {
    return a;
  };
var ib = function () {};
ib.prototype.next = function () {
  return jb;
};
var jb = hb({ done: !0, value: void 0 });
ib.prototype.u = function () {
  return this;
};
var lb = function (a) {
  if (a instanceof O || a instanceof kb || a instanceof P) return a;
  if (typeof a.next == "function") return new O(() => a);
  if (typeof a[Symbol.iterator] == "function")
    return new O(() => a[Symbol.iterator]());
  if (typeof a.u == "function") return new O(() => a.u());
  throw Error("Not an iterator or iterable.");
};
class O {
  constructor(a) {
    this.I = a;
  }
  u() {
    return new kb(this.I());
  }
  [Symbol.iterator]() {
    return new P(this.I());
  }
  K() {
    return new P(this.I());
  }
}
class kb extends ib {
  constructor(a) {
    super();
    this.B = a;
  }
  next() {
    return this.B.next();
  }
  [Symbol.iterator]() {
    return new P(this.B);
  }
  K() {
    return new P(this.B);
  }
}
class P extends O {
  constructor(a) {
    super(() => a);
    this.B = a;
  }
  next() {
    return this.B.next();
  }
}
var S = function (a, b) {
  this.i = {};
  this.h = [];
  this.D = this.size = 0;
  var c = arguments.length;
  if (c > 1) {
    if (c % 2) throw Error("Uneven number of arguments");
    for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
  } else a && this.addAll(a);
};
S.prototype.A = function () {
  return this.size;
};
S.prototype.J = function () {
  mb(this);
  return this.h.concat();
};
S.prototype.has = function (a) {
  return T(this.i, a);
};
S.prototype.equals = function (a, b) {
  if (this === a) return !0;
  if (this.size != a.A()) return !1;
  b = b || nb;
  mb(this);
  for (var c, d = 0; (c = this.h[d]); d++)
    if (!b(this.get(c), a.get(c))) return !1;
  return !0;
};
var nb = function (a, b) {
  return a === b;
};
S.prototype.clear = function () {
  this.i = {};
  this.D = this.size = this.h.length = 0;
};
S.prototype.remove = function (a) {
  return this.delete(a);
};
S.prototype.delete = function (a) {
  return T(this.i, a)
    ? (delete this.i[a],
      --this.size,
      this.D++,
      this.h.length > 2 * this.size && mb(this),
      !0)
    : !1;
};
var mb = function (a) {
  if (a.size != a.h.length) {
    for (var b = 0, c = 0; b < a.h.length; ) {
      var d = a.h[b];
      T(a.i, d) && (a.h[c++] = d);
      b++;
    }
    a.h.length = c;
  }
  if (a.size != a.h.length) {
    var e = {};
    for (c = b = 0; b < a.h.length; )
      (d = a.h[b]), T(e, d) || ((a.h[c++] = d), (e[d] = 1)), b++;
    a.h.length = c;
  }
};
m = S.prototype;
m.get = function (a, b) {
  return T(this.i, a) ? this.i[a] : b;
};
m.set = function (a, b) {
  T(this.i, a) || ((this.size += 1), this.h.push(a), this.D++);
  this.i[a] = b;
};
m.addAll = function (a) {
  if (a instanceof S)
    for (var b = a.J(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
  else for (b in a) this.set(b, a[b]);
};
m.forEach = function (a, b) {
  for (var c = this.J(), d = 0; d < c.length; d++) {
    var e = c[d],
      g = this.get(e);
    a.call(b, g, e, this);
  }
};
m.clone = function () {
  return new S(this);
};
m.keys = function () {
  return lb(this.u(!0)).K();
};
m.values = function () {
  return lb(this.u(!1)).K();
};
m.entries = function () {
  const a = this;
  return gb(this.keys(), function (b) {
    return [b, a.get(b)];
  });
};
m.u = function (a) {
  mb(this);
  var b = 0,
    c = this.D,
    d = this,
    e = new ib();
  e.next = function () {
    if (c != d.D)
      throw Error("The map has changed since the iterator was created");
    if (b >= d.h.length) return jb;
    var g = d.h[b++];
    return { value: a ? g : d.i[g], done: !1 };
  };
  return e;
};
var T = function (a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
var pb = function (a) {
    this.S = a || null;
    this.F = !0;
    this.M = void 0;
    this.i = new S();
    this.g = new ob("");
    this.g.next = this.g.j = this.g;
  },
  rb = function (a, b) {
    (b = a.i.get(b)) && a.F && (b.remove(), qb(a, b));
    return b;
  };
m = pb.prototype;
m.get = function (a, b) {
  return (a = rb(this, a)) ? a.value : b;
};
m.set = function (a, b) {
  var c = rb(this, a);
  c ? (c.value = b) : ((c = new ob(a, b)), this.i.set(a, c), qb(this, c));
};
m.shift = function () {
  return sb(this, this.g.next);
};
m.pop = function () {
  return sb(this, this.g.j);
};
m.remove = function (a) {
  return (a = this.i.get(a)) ? (this.removeNode(a), !0) : !1;
};
m.removeNode = function (a) {
  a.remove();
  this.i.remove(a.key);
};
m.A = function () {
  return this.i.A();
};
m.J = function () {
  return this.map(function (a, b) {
    return b;
  });
};
m.contains = function (a) {
  return this.some(function (b) {
    return b == a;
  });
};
m.clear = function () {
  tb(this, 0);
};
m.forEach = function (a, b) {
  for (var c = this.g.next; c != this.g; c = c.next)
    a.call(b, c.value, c.key, this);
};
m.map = function (a, b) {
  for (var c = [], d = this.g.next; d != this.g; d = d.next)
    c.push(a.call(b, d.value, d.key, this));
  return c;
};
m.some = function (a, b) {
  for (var c = this.g.next; c != this.g; c = c.next)
    if (a.call(b, c.value, c.key, this)) return !0;
  return !1;
};
m.every = function (a, b) {
  for (var c = this.g.next; c != this.g; c = c.next)
    if (!a.call(b, c.value, c.key, this)) return !1;
  return !0;
};
var qb = function (a, b) {
    a.F
      ? ((b.next = a.g.next), (b.j = a.g), (a.g.next = b), (b.next.j = b))
      : ((b.j = a.g.j), (b.next = a.g), (a.g.j = b), (b.j.next = b));
    a.S != null && tb(a, a.S);
  },
  tb = function (a, b) {
    for (; a.A() > b; ) {
      var c = a.F ? a.g.j : a.g.next;
      a.removeNode(c);
      a.M && a.M(c.key, c.value);
    }
  },
  sb = function (a, b) {
    a.g != b && a.removeNode(b);
    return b.value;
  },
  ob = function (a, b) {
    this.key = a;
    this.value = b;
  };
ob.prototype.remove = function () {
  this.j.next = this.next;
  this.next.j = this.j;
  delete this.j;
  delete this.next;
};
var ub = class {
  constructor(a) {
    this.options = a;
    this.cache = new pb(this.options.X);
  }
  get(a) {
    const b = this.cache.get(a);
    if (b) {
      if (b.expires > Date.now()) return b.data;
      this.cache.remove(a);
    }
  }
  set(a, b, c) {
    b = { data: b, expires: Date.now() + c * 1e3 };
    this.cache.set(a, b);
  }
  count() {
    return this.cache.A();
  }
};
var vb = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("vm");
function wb() {
  return x(
    (function* () {
      return xb();
    })()
  );
}
function yb() {
  return x(
    (function* () {
      return cb(
        "https://www.googletagmanager.com/static/serverjs/nodejs_modules/cacheable_lookup/v6_0_0/source/index.js"
      ).then((a) => {
        db(a);
        return a.body;
      });
    })()
  );
}
var xb = function () {
  return x(
    (function* () {
      try {
        return new (require("cacheable-lookup"))();
      } catch (a) {}
      return new Promise((a) =>
        x(
          (function* () {
            const b = setTimeout(() => void a(void 0), 3e3);
            try {
              const d = yield yb();
              if (d) {
                var c = { exports: {} };
                vb.runInThisContext(
                  `(function () { return function (require, module) {${d}}; })();`,
                  { timeout: 1e3 }
                )(require, c);
                a(new c.exports());
              } else a(void 0);
            } catch (d) {
              console.error(
                "Error loading remote CacheableLookup script:\n",
                d
              ),
                a(void 0);
            } finally {
              clearTimeout(b);
            }
          })()
        )
      );
    })()
  );
};
var zb = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("querystring");
const Ab = Object.freeze(["id", "env", "auth"]);
function Bb(a) {
  a = a ? ka(a) : void 0;
  if (!a) throw Error("Failed to decode the container config.");
  a = zb.parse(a);
  for (const b of Ab)
    if (!a[b] || typeof a[b] !== "string")
      throw Error(`Missing or invalid container config parameter: ${b}`);
  return { containerId: a.id, environmentId: a.env, G: a.auth };
}
function Cb(a, b = new Set()) {
  if (b.has(a)) return "(Recursive reference)";
  switch (typeof a) {
    case "object":
      if (a) {
        var c = Object.getPrototypeOf(a);
        switch (c) {
          case Map.prototype:
          case Set.prototype:
          case Array.prototype:
            b.add(a);
            var d = `[${Array.from(a, (e) => Cb(e, b)).join(", ")}]`;
            b.delete(a);
            c !== Array.prototype && (d = `${Db(c.constructor)}(${d})`);
            return d;
          case Object.prototype:
            return (
              b.add(a),
              (c = `{${Object.entries(a)
                .map(([e, g]) => `${e}: ${Cb(g, b)}`)
                .join(", ")}}`),
              b.delete(a),
              c
            );
          default:
            return (
              (d = "Object"),
              c && c.constructor && (d = Db(c.constructor)),
              typeof a.toString === "function" &&
              a.toString !== Object.prototype.toString
                ? `${d}(${String(a)})`
                : `(object ${d})`
            );
        }
      }
      break;
    case "function":
      return `function ${Db(a)}`;
    case "number":
      if (!Number.isFinite(a)) return String(a);
      break;
    case "bigint":
      return `${a.toString(10)}n`;
    case "symbol":
      return a.toString();
  }
  return JSON.stringify(a);
}
function Db(a) {
  var b = a.displayName;
  return (b && typeof b === "string") || ((b = a.name) && typeof b === "string")
    ? b
    : (a = /function\s+([^\(]+)/m.exec(String(a)))
    ? a[1]
    : "(Anonymous)";
}
function Y(a) {
  var b = Eb();
  const c = Fb,
    d = [];
  Gb(b, a, d) || Hb(void 0, c, `Guard ${b.P().trim()} failed:`, ...d.reverse());
}
function Ib(a, b) {
  a.ga = !0;
  a.P = typeof b === "function" ? b : () => b;
  return a;
}
function Gb(a, b, c) {
  const d = a(b, c);
  d ||
    Jb(c, () => {
      let e = "";
      e.length > 0 && (e += ": ");
      return `${e}Expected ${a.P().trim()}, got ${Cb(b)}`;
    });
  return d;
}
function Jb(a, b) {
  a == null || a.push((typeof b === "function" ? b() : b).trim());
}
let Fb = void 0;
function Kb(a) {
  return typeof a === "function" ? a() : a;
}
function Hb(...a) {
  throw Error(a.map(Kb).filter(Boolean).join("\n").trim().replace(/:$/, ""));
}
function Eb() {
  var a = Error;
  return Ib(
    (b) => b instanceof a,
    () => Db(a)
  );
}
function Lb(a) {
  return cb(a).then((b) => {
    try {
      if ((db(b), !b.body)) throw Error("Empty or missing response body.");
    } catch (d) {
      throw (
        (Y(d),
        (d.message = `Fetching container from ${a} failed: ${d.message}`),
        d)
      );
    }
    const c = {};
    try {
      vb.runInThisContext(b.body).call(c, require);
    } catch (d) {
      throw (
        (Y(d),
        wa.error("Unable to eval container response.\n", d),
        Error(`Unable to eval container response: ${d.message}`))
      );
    }
    return c;
  });
}
function Mb(a) {
  a = new K(a.url);
  return {
    containerId: Sb(J(a, "id")),
    m: Sb(J(a, "gtm_auth")),
    l: Sb(J(a, "gtm_preview")),
    R: Sb(J(a, "hl")),
  };
}
function Tb(a, b) {
  var c = Mb(a);
  const d = {};
  c.containerId &&
    c.m &&
    c.l &&
    ((d.containerId = c.containerId),
    (d.m = c.m),
    (d.l = c.l),
    (c = z(a, "gtm_debug")),
    (c = B(c, d.containerId)),
    (d.o =
      c ||
      Date.now().toString(16) +
        Math.floor(Math.random() * 1e12)
          .toString(16)
          .padStart(10, "0")));
  Ub(a, b, d);
  return d;
}
function Sb(a) {
  return a ? (Array.isArray(a) && a.length ? a[0] : a) : "";
}
function Ub(a, b, c) {
  let d = z(a, "gtm_auth"),
    e = z(a, "gtm_debug");
  a = z(a, "gtm_preview");
  c.containerId &&
    ((d = oa(d, c.containerId, c.m)),
    (a = oa(a, c.containerId, c.l)),
    (e = oa(e, c.containerId, c.o)));
  b.getHeaders()["set-cookie"] || b.setHeader("Set-Cookie", []);
  Vb(b, "gtm_auth", d);
  Vb(b, "gtm_debug", e);
  Vb(b, "gtm_preview", a);
}
function Vb(a, b, c) {
  a.getHeaders()["set-cookie"].push(
    (c
      ? `${b}=${c}${"; Max-Age=300; Path=/; HttpOnly; SameSite=None; Secure"}`
      : `${b}=x${"; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; SameSite=None; Secure"}`
    ).replace(/[\n\r]/g, "")
  );
} /*

 SPDX-License-Identifier: Apache-2.0
*/
var Wb = {};
function Xb(a) {
  return a.toString().indexOf("`") === -1;
}
Xb((a) => a``) || Xb((a) => a`\0`) || Xb((a) => a`\n`) || Xb((a) => a`\u0000`);
var Yb;
var Zb = class {
  constructor(a) {
    if (Wb !== Wb) throw Error("Bad secret");
    this.da = a;
  }
  toString() {
    return this.da;
  }
};
new Zb("about:blank");
new Zb("about:invalid#zClosurez");
const $b = [];
var ac = (a) => {
  console.warn(`A URL with content '${a}' was sanitized away.`);
};
$b.indexOf(ac) === -1 && $b.push(ac);
const bc = {};
class cc {
  constructor() {
    if (bc !== bc) throw Error("SafeStyle is not meant to be built directly");
    this.ba = "";
  }
  toString() {
    return this.ba.toString();
  }
}
new cc();
const dc = {};
class ec {
  constructor() {
    if (dc !== dc)
      throw Error("SafeStyleSheet is not meant to be built directly");
    this.aa = "";
  }
  toString() {
    return this.aa.toString();
  }
}
new ec();
const fc = {};
class hc {
  constructor(a) {
    if (fc !== fc) throw Error("SafeHtml is not meant to be built directly");
    this.Z = a;
  }
  toString() {
    return this.Z.toString();
  }
}
new hc((y.trustedTypes && y.trustedTypes.emptyHTML) || "");
function ic(a) {
  var b = {};
  if (a instanceof hc) return a;
  a = String(a)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
  b.ia && (a = a.replace(/(^|[\r\n\t ]) /g, "$1&#160;"));
  b.ha && (a = a.replace(/(\r\n|\n|\r)/g, "<br>"));
  b.ja && (a = a.replace(/(\t+)/g, '<span style="white-space:pre">$1</span>'));
  b = a;
  if (Yb === void 0) {
    a = null;
    var c = y.trustedTypes;
    if (c && c.createPolicy)
      try {
        a = c.createPolicy("goog#html", {
          createHTML: ja,
          createScript: ja,
          createScriptURL: ja,
        });
      } catch (d) {
        y.console && y.console.error(d.message);
      }
    Yb = a;
  }
  b = (a = Yb) ? a.createHTML(b) : b;
  return new hc(b);
}
"ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR NOBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT"
  .split(" ")
  .concat(["BUTTON", "INPUT"]);
var jc = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("events");
function kc(a, b) {
  const c = new Map(),
    d = a * 1e3,
    e = new jc.EventEmitter(),
    g = (f) => ((f = c.get(f)) ? f.splice(0, 5).map((h) => h.Y) : []);
  setInterval(() => {
    const f = [],
      h = Date.now();
    for (const l of c.entries()) {
      const w = l[0],
        q = l[1],
        u = q.findIndex((Q) => Q.expires > h);
      u === -1 ? f.push(w) : q.splice(0, u);
    }
    f.forEach((l) => void c.delete(l));
  }, 3e4);
  return {
    V: (f, h, l) => {
      const w = (u) => {
          clearTimeout(q);
          h(u);
        },
        q = setTimeout(() => {
          e.removeListener(f, w);
          l();
        }, b * 1e3);
      e.once(f, w);
    },
    fa: (f, h) => {
      c.has(f) || c.set(f, []);
      c.get(f).push({ expires: Date.now() + d, Y: h });
      e.listenerCount(f) && e.emit(f, g(f));
    },
    ea: g,
  };
}
function lc(a) {
  return {
    preview: z(a, "gtm_preview")
      .split(":")
      .map((b) => b.split("="))
      .filter((b) => b.length === 2),
  };
}
function mc(a, b, c, d) {
  return (e, g) => {
    if (e.method !== "OPTIONS" || e.headers.origin !== b) var f = !1;
    else
      g.writeHead(204, {
        "Access-Control-Allow-Headers": [
          "x-gtm-auth",
          "x-gtm-preview",
          "x-gtm-debug",
        ],
        "Access-Control-Allow-Methods": ["GET"],
        "Access-Control-Allow-Origin": [b],
        "Access-Control-Max-Age": 86400,
      }),
        g.end(),
        (f = !0);
    if (!f && !Ja(e, g))
      if (
        ((f = new K(e.url).pathname()),
        f == null ? 0 : f.endsWith("/gtm/debug"))
      ) {
        f = d.containerId;
        const l = Mb(e);
        if (l.containerId && l.m && l.l) {
          var h = void 0;
          l.R && (h = l.R);
          l.containerId === f
            ? ((e = Tb(e, g).o || ""),
              (f = `${ic(b)}/debug/fps-bootstrap?id=${ic(f)}`),
              h && (f += `&hl=${ic(h)}`),
              (e =
                '<!DOCTYPE html><html><head><meta charset="utf-8">' +
                `<meta name="sgtm:debug-session" content="${ic(e)}">` +
                '<link rel="shortcut icon" href="//ssl.gstatic.com/analytics-suite/header/suite/v2/Favicon_GTM_suite_16.png">' +
                `<script src="${f}">` +
                "\x3c/script></head><body></body></html>"))
            : (e =
                '<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="shortcut icon" href="//ssl.gstatic.com/analytics-suite/header/suite/v2/Favicon_GTM_suite_16.png"></head><body style="padding: 20px; background-color: #f7f7f7; color: #646464;font-family: \'Google Sans\';"><img src="https://fonts.gstatic.com/s/i/googlematerialicons/sentiment_very_dissatisfied/v10/gm_grey-48dp/1x/gm_sentiment_very_dissatisfied_gm_grey_48dp.png"><h1 style="color: #333; font-weight: normal; font-size: 1.6em;">Preview failed to load</h1><h4 style="margin: 0">The preview container ID does not match the server configuration. You can preview only the container that is deployed on the server.</h4></body></html>');
          g.writeHead(200, {
            "Content-Length": Buffer.byteLength(e),
            "Content-Type": "text/html",
            "Cache-Control": "no-store",
          });
          g.end(e);
        } else
          g.writeHead(404, { "Content-Type": "text/plain" }),
            g.end("Not Found");
      } else
        (f == null ? 0 : f.endsWith("/gtm/exit_preview"))
          ? ((f = Mb(e)),
            f.containerId
              ? (Ub(e, g, { containerId: f.containerId }),
                g.writeHead(200, pa),
                g.end())
              : (g.writeHead(404, { "Content-Type": "text/plain" }),
                g.end("Not Found")))
          : (f == null ? 0 : f.endsWith("/gtm/get_memo"))
          ? nc(e, g, a)
          : (f == null ? 0 : f.endsWith("/gtm/post_memo"))
          ? oc(e, g, a, d.G)
          : (f == null ? 0 : f.endsWith("/gtm/preview_status"))
          ? (g.writeHead(
              200,
              Object.assign(
                {},
                {
                  "Access-Control-Allow-Origin": b,
                  "Access-Control-Allow-Credentials": "true",
                },
                pa
              )
            ),
            g.end(")]}'\n" + JSON.stringify(lc(e))))
          : pc(e, g, c) || (g.writeHead(404), g.end("Not Found"));
  };
}
function qc(a) {
  return (b, c) => {
    const d = Ba(new K(`${a}${b.url}`));
    d.method = b.method;
    d.headers = b.headers;
    d.headers.forwarded = `host=${d.headers.host}`;
    delete d.headers.host;
    rc(b, c, a, d, (e) => {
      console.error(
        "An exception was thrown while proxying preview request. Make sure the PREVIEW_SERVER_URL is set correctly and the preview server is healthy. Message: " +
          ((e && e.message) || "Unknown error")
      );
      c.writeHead(500);
      c.end();
    });
  };
}
function nc(a, b, c) {
  function d(h) {
    b.writableEnded ||
      b.finished ||
      (b.writeHead(200, pa),
      b.end(
        ")]}'\n" + JSON.stringify({ [e]: h.reduce((l, w) => l.concat(w), []) })
      ));
  }
  const e = Mb(a).containerId;
  var g = zb.parse(la(a.headers.cookie, "gtm_debug").join(":"), ":");
  if (e && g[e]) {
    Tb(a, b);
    g = g[e];
    var f = c.ea(g);
    f.length
      ? d(f)
      : (c.V(
          g,
          (h) => void d(h),
          () => {
            b.writableEnded || b.finished || sc(b, 204);
          }
        ),
        a.on("aborted", () => void sc(b, 204)));
  } else b.writeHead(404, pa), b.end();
}
function oc(a, b, c, d) {
  const e = J(new K(a.url), "auth_code");
  if (d !== e) sc(b, 403, "Not authorized.");
  else {
    var g = [];
    a.on("data", (f) => void g.push(f)).on("end", () => {
      try {
        const f = JSON.parse(g.join(""));
        if (!Array.isArray(f)) throw Error();
        f.forEach((h) => {
          const l = h.sessionId;
          h = h.memos;
          if (!l || !Array.isArray(h)) throw Error();
          c.fa(l, h);
        });
        b.end();
      } catch (f) {
        sc(b, 400, "Incoming request memo was malformed.");
      }
    });
  }
}
function pc(a, b, c) {
  var d = new K(a.url),
    e = d.pathname();
  e = (d = d.search()) ? e + d : e;
  d = e.indexOf("/gtm/debug/");
  if (d === -1) return !1;
  d = e.substring(d + 4);
  e = Object.assign({}, Ba(new K(c + d)));
  e.method = a.method;
  d.startsWith("/debug/api/") &&
    ((d = [
      `${"gtm_auth"}=${z(a, "gtm_auth", !0)}`,
      `${"gtm_debug"}=${z(a, "gtm_debug", !0)}`,
      `${"gtm_preview"}=${z(a, "gtm_preview", !0)}`,
    ]),
    (e.headers = { cookie: d.join("; ") }));
  rc(a, b, c, e, (g) => {
    console.error(
      `An exception was thrown while sending a request to ${a.url}: ` +
        ((g && g.message) || "Unknown error")
    );
    b.writeHead(500);
    b.end();
  });
  return !0;
}
function rc(a, b, c, d, e) {
  const g = $a(c);
  g && (d.agent = g);
  c = ab(c).request(d, (f) => {
    let h;
    b.writeHead((h = f.statusCode) != null ? h : 0, f.headers);
    f.pipe(b, { end: !0 });
  });
  a.pipe(c, { end: !0 }).on("error", e);
}
function sc(a, b, c) {
  a.writeHead(b);
  a.end(c);
}
var tc = (
  typeof require === "function"
    ? require
    : function () {
        return {};
      }
)("fs");
function uc(a) {
  cb("https://publicsuffix.org/list/public_suffix_list.dat")
    .then((b) => void a(b.statusCode === 200 ? b.body : void 0))
    .catch(() => void a(void 0));
}
function vc() {
  const a = (0, tc.readFileSync)(
      global.dirname + "/public_suffix_list.json"
    ).toString(),
    b = new wc();
  xc(b, JSON.parse(a));
  return (c) => yc(b, c);
}
function zc(a) {
  if (a) {
    var b = new wc();
    for (const c of a.split("\n"))
      c.length && !c.startsWith("//") && Ac(b, c.split(" ")[0].split("."));
    return (c) => yc(b, c);
  }
}
function Bc() {
  return new Promise((a, b) => {
    try {
      a(vc());
    } catch (c) {
      uc((d) => {
        (d = zc(d)) ? a(d) : b();
      });
    }
  });
}
function Cc() {
  return new Promise((a) => {
    let b;
    const c = (f) => (b ? b(f) : f),
      d = setTimeout(() => void a(c), 2e3);
    let e = 0;
    const g = () =>
      void Bc().then(
        (f) => {
          clearTimeout(d);
          b = f;
          a(c);
        },
        () => {
          setTimeout(
            g,
            Math.floor(1e3 * (Math.pow(e, 4) + Math.pow(e, 2) * Math.random()))
          );
          e++;
        }
      );
    g();
  });
}
var Ec = function (a, b, c, d) {
    let e = 0;
    if (c) {
      if (!b) return 1;
      e += 1;
      d && ((e = Dc(d, a, b - 1)), (e += e < 0 ? -1 : 1));
    }
    return e;
  },
  xc = function (a, b) {
    for (const c of Object.keys(b))
      if (b[c]) {
        const d = new wc();
        xc(d, b[c]);
        a.children.set(c, d);
      } else a.children.set(c, void 0);
  },
  yc = function (a, b) {
    if (b.startsWith(".")) return "";
    b = b.toLowerCase().split(".");
    if (b.length < 2) return "";
    a = Dc(a, b);
    if (a < 0)
      return b.splice(0, b.length + a), b.length > 1 ? b.join(".") : "";
    if (b.length === a) return "";
    a === 0 ? b.splice(0, b.length - 2) : b.splice(0, b.length - a - 1);
    return b.length > 1 ? b.join(".") : "";
  },
  Ac = function (a, b) {
    const c = b.pop();
    a.children.get(c) || a.children.set(c, b.length ? new wc() : void 0);
    b.length && Ac(a.children.get(c), b);
  },
  Dc = function (a, b, c = b.length - 1) {
    var d = b[c];
    if (a.children.has("!" + d)) return -1;
    d = Ec(b, c, a.children.has(d), a.children.get(d));
    a = Ec(b, c, a.children.has("*"), a.children.get("*"));
    return d < 0 && a < 0
      ? Math.min(d, a)
      : d < 0
      ? d
      : a < 0
      ? a
      : Math.max(d, a);
  };
class wc {
  constructor() {
    this.children = new Map();
  }
}
function Fc(a) {
  const b = {};
  if (!a) return b;
  const c = {},
    d = console;
  for (const e of "debug error info log warn trace".split(" "))
    c[e] = (...g) => void d[e](...g);
  vb.runInNewContext(
    `(function(){\n${a}\n})();`,
    {
      console: c,
      gtag: (e, g, f) => {
        if (e !== "policy" || typeof g !== "string" || typeof f !== "function")
          return !1;
        b[g] || (b[g] = []);
        b[g].push(f);
        return !0;
      },
    },
    { timeout: 100 }
  );
  return b;
}
const Gc = /^https:\/\/.+/i;
global.sst_bootstrap_version = 9;
let Hc;
E.on("unhandledRejection", (a) => {
  console.error("Unhandled promise rejection.");
  throw a;
});
function Ic(a) {
  return x(
    (function* () {
      if (!a) return Promise.resolve({});
      let b = "";
      try {
        const c = yield cb(a);
        db(c);
        b = c.body || "";
      } catch (c) {
        throw (
          (Y(c),
          console.error(`Error loading policy script from ${a}:\n`, c),
          Error(`Error loading policy script from ${a}: ${c.message}`))
        );
      }
      try {
        return Fc(b);
      } catch (c) {
        throw (
          (console.error(`Error processing policy script at ${a}:\n`, c),
          Error(`Error processing policy script from ${a}: ${c.message}`))
        );
      }
    })()
  );
}
function Jc(a) {
  return x(
    (function* () {
      const b = yield Lb(a);
      if (b.newRequestProcessor) return b;
      throw Error(
        `Invalid container returned from ${a} (no ${"newRequestProcessor"}).`
      );
    })()
  );
}
function Kc(a, b, c) {
  a = `${a}/server.js?id=${b.containerId}`;
  c
    ? ((a += `&gtm_auth=${c.m}`),
      (a += c.o ? "&gtm_debug=x" : ""),
      (a += c.l ? `&gtm_preview=${c.l}` : ""))
    : (a += `&gtm_preview=env-${b.environmentId}&gtm_auth=${b.G}`);
  /^https?:\/\/.+/i.test(a) || Z(`Invalid container URL: ${a}`);
  return a;
}
function Lc() {
  const a = String(E.env.NO_PROXY || "").trim();
  String(E.env.HTTP_PROXY || "") &&
    a !== "*" &&
    ((global.http_proxy_agent && global.https_proxy_agent) ||
      Z(
        "HTTP proxying is not available. Update your Server-side Tagging Docker image. https://developers.google.com/tag-platform/tag-manager/server-side/release-notes"
      ));
}
function Z(a) {
  throw Error(a);
}
function Mc() {
  global.server_js_dev_only ||
    wb().then((a) => {
      if (a) {
        var b = require("https"),
          c = require("http");
        try {
          a.install(b.globalAgent),
            a.install(c.globalAgent),
            global.http_proxy_agent && a.install(global.http_proxy_agent),
            global.https_proxy_agent && a.install(global.https_proxy_agent);
        } catch (d) {
          console.warn(
            "Failed to install cacheable lookup on HTTP(S) library."
          );
        }
      }
    });
}
x(
  (function* () {
    function a(k, n, p) {
      return x(
        (function* () {
          const v = {
            authCode: aa.G,
            cache: Nc,
            ctfeUrl: qa,
            getDebugServerEndpointOverride: Oc,
            persistentStorage: n,
            policyMap: p,
            registerableDomainResolver: Nb,
            shutdownParameters: Pc,
          };
          return (yield k.newRequestProcessor)(v);
        })()
      );
    }
    function b(k) {
      return x(
        (function* () {
          var n = ma(k, aa.containerId);
          if (!n.l && !n.o) return Promise.resolve(ra);
          if (!n.m)
            return (
              g.log(
                `Request ${k.method} ${k.url} from ${k.socket.remoteAddress} missing required authentication.`
              ),
              Promise.resolve((p, v) => {
                c(v, 401);
              })
            );
          n = yield Jc(Kc(qa, aa, n));
          return a(n, {}, U);
        })()
      );
    }
    function c(k, n, p) {
      p
        ? (k.writeHead(n, {
            "Content-Length": Buffer.byteLength(p),
            "Content-Type": "text/plain",
          }),
          k.end(p))
        : (k.writeHead(n), k.end());
    }
    function d(k, n) {
      return x(
        (function* () {
          if (
            k.method !== "OPTIONS" ||
            k.headers.origin !== "https://tagmanager.googleusercontent.com"
          )
            var p = !1;
          else
            n.writeHead(204, {
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Headers": [
                "x-gtm-auth",
                "x-gtm-preview",
                "x-gtm-debug",
                "x-gtm-cloud-test",
              ],
              "Access-Control-Allow-Methods": ["GET"],
              "Access-Control-Allow-Origin": [
                "https://tagmanager.googleusercontent.com",
              ],
              "Access-Control-Max-Age": 86400,
            }),
              n.end(),
              (p = !0);
          if (!p && !Ja(k, n)) {
            try {
              var v = yield b(k);
            } catch (L) {
              Y(L);
              g.error(`getServerJsRequestHandler failed\n${L}`);
              a: {
                p = L;
                for (const [Sa, sa] of Ya.entries())
                  if (((v = Sa), p instanceof sa)) {
                    p = v;
                    break a;
                  }
                p = 500;
              }
              c(n, p);
              return;
            }
            v(k, n);
          }
        })()
      );
    }
    function e(k, n, p) {
      const v = f.createServer(k).listen(ta, Q.get() || void 0);
      v.timeout = n === void 0 ? 12e4 : n;
      v.keepAliveTimeout = p === void 0 ? 5e3 : p;
      return new Promise((L, Sa) => {
        Ga || (Ga = Date.now());
        v.on("listening", () => {
          g.log(`***Listening on ${JSON.stringify(v.address())}***`);
          Ta = v.address().port;
          L(v);
        });
        v.on("error", (sa) => {
          g.error("Server failed to start", sa);
          Sa(sa);
        });
      }).then((L) => (Hc = L));
    }
    Lc();
    const g = require("console"),
      f = require("http");
    var h = F(
        "container_config",
        "Base64-encoded container parameters in the URL query string format. This flag is required to be set.",
        void 0,
        "CONTAINER_CONFIG"
      ),
      l = H(
        "run_as_debug_server",
        "Enable when the server should run as a debug server. See the documentation for additional details.",
        "RUN_AS_DEBUG_SERVER"
      );
    l.setSecret(!0);
    const w = H(
      "run_as_preview_server",
      "Enable when the server should run as a preview server. See the documentation for additional details.",
      "RUN_AS_PREVIEW_SERVER"
    );
    var q = F(
        "preview_server_url",
        "URL for the preview server. This should not be set with the run_as_preview_server setting set to true.",
        void 0,
        "PREVIEW_SERVER_URL"
      ),
      u = I(
        "container_refresh_seconds",
        "Interval between container refreshes",
        60,
        "CONTAINER_REFRESH_SECONDS"
      );
    const Q = F(
      "host",
      "Host on which to bind. Set the value to empty string to listen on the unspecified IPv6 address (::) if available, or the unspecified IPv4 address (0.0.0.0) otherwise.",
      "",
      "HOST"
    );
    var t = I("port", "Port to listen on", 8080, "PORT"),
      R = I(
        "debug_message_expiration_seconds",
        "Number of seconds after which an unread debug message is deleted. This flag is applicable only when running as the debug server.",
        600,
        "DEBUG_MESSAGE_EXPIRATION_SECONDS"
      ),
      D = F(
        "policy_script_url",
        "HTTPS URL from which to load the policy script.",
        void 0,
        "POLICY_SCRIPT_URL"
      ),
      r = I(
        "policy_script_refresh_seconds",
        "Interval between policy script refreshes",
        60,
        "POLICY_SCRIPT_REFRESH_SECONDS"
      ),
      G = H(
        "use_ipv6_loopback_for_debug",
        "Enable to use [::1] instead of 127.0.0.1 for preview server URL. ",
        "USE_IPV6_LOOPBACK_FOR_DEBUG"
      );
    G.setSecret(!0);
    let A, ua;
    let Ua;
    if (global.server_js_dev_only) {
      A = F(
        "tag_manager_ui_url",
        "The Google Tag Manager UI URL. Value must not end in a /.",
        "https://tagmanager.google.com",
        "TAG_MANAGER_UI_URL"
      );
      A.setSecret(!0);
      ua = F(
        "ctfe_url",
        "The Google Tag Manager Frontend URL. Value must not end in a /.",
        "https://www.googletagmanager.com",
        "CTFE_URL"
      );
      ua.setSecret(!0);
      Ua = I(
        "socketTimeoutInMillis",
        "Number of milliseconds socket can remain idle before timeout.",
        12e4,
        "SOCKET_TIMEOUT_IN_MILLIS"
      );
      Ua.setSecret(!0);
      var V = I(
        "keepAliveTimeoutInMillis",
        "The number of milliseconds of inactivity a server needs to wait for additional incoming data, after it has finished writing the last response, before a socket will be destroyed.",
        5e3,
        "KEEP_ALIVE_TIMEOUT_IN_MILLIS"
      );
      V.setSecret(!0);
      var M = H(
        "fetch_uncompiled",
        "Fetch the uncompiled container from CTFE",
        "FETCH_UNCOMPILED"
      );
      M.setSecret(!0);
      M = H(
        "remove_local_suffix_list",
        "Enable to remove local suffix list.",
        "REMOVE_LOCAL_SUFFIX_LIST"
      );
      M.setSecret(!0);
      M.get() ? (global.dirname = void 0) : (global.dirname += "/suffix_list");
    }
    M = I(
      "cache_size",
      "Number of items the cache can hold.",
      50,
      "CACHE_SIZE"
    );
    M.setSecret(!0);
    const Va = H(
      "include_debug_server",
      "Enable to include the debug server in the server-side GTM server. When enabled, all requests sent to /gtm/* will be routed to the internal debug server. This is intended for QA only. Do not use in production.",
      "INCLUDE_DEBUG_SERVER"
    );
    Va.setSecret(!0);
    const Ob = I(
      "get_memo_long_poll_timeout_sec",
      "Number of seconds until a get memo request times out.",
      20,
      "GET_MEMO_LONG_POLL_TIMEOUT_SEC"
    );
    Ob.setSecret(!0);
    C.usageInfo +=
      "\nFor options that can be set via either command-line flag or an environment variable, the command-line flag value takes precedence.";
    za();
    const ta = t.get();
    (ta < 0 || ta > 65535) && Z(`Invalid port: ${ta}`);
    let Pb;
    t = (Pb = Ua) == null ? void 0 : Pb.get();
    let Qb;
    V = (Qb = V) == null ? void 0 : Qb.get();
    (h = h.get()) ||
      Z(
        "Missing container config. Please provide the CONTAINER_CONFIG environment variable or the container_config command line option."
      );
    const aa = Bb(h),
      Pc = {
        serverShutdownCallback: () =>
          Hc ? new Promise((k) => void Hc.close(k)) : Promise.resolve(),
        shutdownManagers: [],
        shutdownTasks: [],
      };
    let Ta, ba;
    const qa = (ua && ua.get()) || "https://www.googletagmanager.com";
    if ((l = l.get() || w.get()) || Va.get())
      if (
        ((R = kc(R.get(), Ob.get())),
        (ba = mc(R, (A && A.get()) || "https://tagmanager.google.com", qa, aa)),
        l)
      )
        return (
          q.get() &&
            g.log(
              "Warning: PREVIEW_SERVER_URL should not be set if RUN_AS_PREVIEW_SERVER is set to true."
            ),
          e(ba, t, V)
        );
    const W = q.get();
    W && (Gc.test(W) || Z(`Invalid preview server URL: ${W}`), (ba = qc(W)));
    q = u.get();
    q < 0 && Z(`Invalid container refresh seconds: ${q}`);
    const X = D.get();
    X && !Gc.test(X) && Z(`Invalid policy script URL: ${X}`);
    D = r.get();
    D < 0 && Z(`Invalid policy script refresh seconds: ${D}`);
    let U = {},
      ra = () => {};
    const Nc = new ub({ X: M.get() }),
      Wa = {};
    let Nb;
    const Qc = G.get() ? "[::1]" : "127.0.0.1",
      Oc = () => (W ? W : Va.get() && Ta ? `http://${Qc}:${Ta}` : void 0);
    Mc();
    const Rb = Kc(qa, aa);
    G = Jc(Rb);
    r = Ic(X);
    u = Cc();
    let va = yield G;
    Ha = Date.now();
    U = yield r;
    Nb = yield u;
    q > 0 &&
      setInterval(
        () =>
          x(
            (function* () {
              try {
                (va = yield Jc(Rb)),
                  (Ha = Date.now()),
                  (ra = yield a(va, Wa, U));
              } catch (k) {
                Y(k), console.error(k.message);
              }
            })()
          ),
        q * 1e3
      );
    X &&
      D > 0 &&
      setInterval(
        () =>
          x(
            (function* () {
              try {
                (U = yield Ic(X)), (ra = yield a(va, Wa, U));
              } catch (k) {
                Y(k), console.error(k.message);
              }
            })()
          ),
        D * 1e3
      );
    ra = yield a(va, Wa, U);
    return ba
      ? e(
          (k, n) => {
            const p = new K(k.url).pathname();
            (p == null ? 0 : p.endsWith("/gtm")) ||
            (p == null ? 0 : p.includes("/gtm/"))
              ? ba(k, n)
              : d(k, n);
          },
          t,
          V
        )
      : e(d, t, V);
  })()
);

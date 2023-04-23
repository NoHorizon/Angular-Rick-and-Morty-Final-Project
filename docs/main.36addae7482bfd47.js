"use strict";
(self.webpackChunkFinal_Project_Angular_Rick_and_Morty =
  self.webpackChunkFinal_Project_Angular_Rick_and_Morty || []).push([
  [179],
  {
    567: () => {
      function re(e) {
        return "function" == typeof e;
      }
      function po(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Vi = po(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function go(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class mt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (re(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Vi ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  vf(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Vi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Vi(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) vf(t);
            else {
              if (t instanceof mt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && go(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && go(n, t), t instanceof mt && t._removeParent(this);
        }
      }
      mt.EMPTY = (() => {
        const e = new mt();
        return (e.closed = !0), e;
      })();
      const mf = mt.EMPTY;
      function yf(e) {
        return (
          e instanceof mt ||
          (e && "closed" in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
        );
      }
      function vf(e) {
        re(e) ? e() : e.unsubscribe();
      }
      const zn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        ji = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = ji;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = ji;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function _f(e) {
        ji.setTimeout(() => {
          const { onUnhandledError: t } = zn;
          if (!t) throw e;
          t(e);
        });
      }
      function Df() {}
      const JC = el("C", void 0, void 0);
      function el(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Gn = null;
      function Bi(e) {
        if (zn.useDeprecatedSynchronousErrorHandling) {
          const t = !Gn;
          if ((t && (Gn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Gn;
            if (((Gn = null), n)) throw r;
          }
        } else e();
      }
      class tl extends mt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), yf(t) && t.add(this))
              : (this.destination = sw);
        }
        static create(t, n, r) {
          return new mo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? rl(
                (function tw(e) {
                  return el("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? rl(
                (function ew(e) {
                  return el("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? rl(JC, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const rw = Function.prototype.bind;
      function nl(e, t) {
        return rw.call(e, t);
      }
      class ow {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              $i(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              $i(r);
            }
          else $i(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              $i(n);
            }
        }
      }
      class mo extends tl {
        constructor(t, n, r) {
          let o;
          if ((super(), re(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && zn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && nl(t.next, i),
                  error: t.error && nl(t.error, i),
                  complete: t.complete && nl(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new ow(o);
        }
      }
      function $i(e) {
        zn.useDeprecatedSynchronousErrorHandling
          ? (function nw(e) {
              zn.useDeprecatedSynchronousErrorHandling &&
                Gn &&
                ((Gn.errorThrown = !0), (Gn.error = e));
            })(e)
          : _f(e);
      }
      function rl(e, t) {
        const { onStoppedNotification: n } = zn;
        n && ji.setTimeout(() => n(e, t));
      }
      const sw = {
          closed: !0,
          next: Df,
          error: function iw(e) {
            throw e;
          },
          complete: Df,
        },
        ol =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Wn(e) {
        return e;
      }
      function Cf(e) {
        return 0 === e.length
          ? Wn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let me = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function uw(e) {
              return (
                (e && e instanceof tl) ||
                ((function lw(e) {
                  return e && re(e.next) && re(e.error) && re(e.complete);
                })(e) &&
                  yf(e))
              );
            })(n)
              ? n
              : new mo(n, r, o);
            return (
              Bi(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = wf(r))((o, i) => {
              const s = new mo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ol]() {
            return this;
          }
          pipe(...n) {
            return Cf(n)(this);
          }
          toPromise(n) {
            return new (n = wf(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function wf(e) {
        var t;
        return null !== (t = e ?? zn.Promise) && void 0 !== t ? t : Promise;
      }
      const cw = po(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let rn = (() => {
        class e extends me {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Ef(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new cw();
          }
          next(n) {
            Bi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Bi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Bi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? mf
              : ((this.currentObservers = null),
                i.push(n),
                new mt(() => {
                  (this.currentObservers = null), go(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new me();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Ef(t, n)), e;
      })();
      class Ef extends rn {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : mf;
        }
      }
      function bf(e) {
        return re(e?.lift);
      }
      function Oe(e) {
        return (t) => {
          if (bf(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Te(e, t, n, r, o) {
        return new dw(e, t, n, r, o);
      }
      class dw extends tl {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function z(e, t) {
        return Oe((n, r) => {
          let o = 0;
          n.subscribe(
            Te(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function qn(e) {
        return this instanceof qn ? ((this.v = e), this) : new qn(e);
      }
      function gw(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function If(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Af = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Tf(e) {
        return re(e?.then);
      }
      function Rf(e) {
        return re(e[ol]);
      }
      function Nf(e) {
        return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator]);
      }
      function xf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Of = (function yw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ff(e) {
        return re(e?.[Of]);
      }
      function Pf(e) {
        return (function pw(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof qn
                  ? Promise.resolve(f.value.v).then(u, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function u(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield qn(n.read());
              if (o) return yield qn(void 0);
              yield yield qn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function kf(e) {
        return re(e?.getReader);
      }
      function yt(e) {
        if (e instanceof me) return e;
        if (null != e) {
          if (Rf(e))
            return (function vw(e) {
              return new me((t) => {
                const n = e[ol]();
                if (re(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Af(e))
            return (function _w(e) {
              return new me((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Tf(e))
            return (function Dw(e) {
              return new me((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, _f);
              });
            })(e);
          if (Nf(e)) return Lf(e);
          if (Ff(e))
            return (function Cw(e) {
              return new me((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (kf(e))
            return (function ww(e) {
              return Lf(Pf(e));
            })(e);
        }
        throw xf(e);
      }
      function Lf(e) {
        return new me((t) => {
          (function Ew(e, t) {
            var n, r, o, i;
            return (function fw(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = gw(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function on(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Fe(e, t, n = 1 / 0) {
        return re(t)
          ? Fe((r, o) => z((i, s) => t(r, i, o, s))(yt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Oe((r, o) =>
              (function bw(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (g) => (u < r ? p(g) : l.push(g)),
                  p = (g) => {
                    i && t.next(g), u++;
                    let m = !1;
                    yt(n(g, c++)).subscribe(
                      Te(
                        t,
                        (v) => {
                          o?.(v), i ? h(v) : t.next(v);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (u--; l.length && u < r; ) {
                                const v = l.shift();
                                s ? on(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Te(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function dr(e = 1 / 0) {
        return Fe(Wn, e);
      }
      const $t = new me((e) => e.complete());
      function sl(e) {
        return e[e.length - 1];
      }
      function Vf(e) {
        return re(sl(e)) ? e.pop() : void 0;
      }
      function yo(e) {
        return (function Mw(e) {
          return e && re(e.schedule);
        })(sl(e))
          ? e.pop()
          : void 0;
      }
      function jf(e, t = 0) {
        return Oe((n, r) => {
          n.subscribe(
            Te(
              r,
              (o) => on(r, e, () => r.next(o), t),
              () => on(r, e, () => r.complete(), t),
              (o) => on(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Bf(e, t = 0) {
        return Oe((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function $f(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new me((n) => {
          on(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            on(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ee(e, t) {
        return t
          ? (function Ow(e, t) {
              if (null != e) {
                if (Rf(e))
                  return (function Aw(e, t) {
                    return yt(e).pipe(Bf(t), jf(t));
                  })(e, t);
                if (Af(e))
                  return (function Rw(e, t) {
                    return new me((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Tf(e))
                  return (function Tw(e, t) {
                    return yt(e).pipe(Bf(t), jf(t));
                  })(e, t);
                if (Nf(e)) return $f(e, t);
                if (Ff(e))
                  return (function Nw(e, t) {
                    return new me((n) => {
                      let r;
                      return (
                        on(n, t, () => {
                          (r = e[Of]()),
                            on(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => re(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (kf(e))
                  return (function xw(e, t) {
                    return $f(Pf(e), t);
                  })(e, t);
              }
              throw xf(e);
            })(e, t)
          : yt(e);
      }
      function al(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new mo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return yt(t(...n)).subscribe(r);
      }
      function te(e) {
        for (let t in e) if (e[t] === te) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ll(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function oe(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(oe).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function ul(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const kw = te({ __forward_ref__: te });
      function ie(e) {
        return (
          (e.__forward_ref__ = ie),
          (e.toString = function () {
            return oe(this());
          }),
          e
        );
      }
      function N(e) {
        return cl(e) ? e() : e;
      }
      function cl(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(kw) &&
          e.__forward_ref__ === ie
        );
      }
      function dl(e) {
        return e && !!e.ɵproviders;
      }
      const Uf = "https://g.co/ng/security#xss";
      class C extends Error {
        constructor(t, n) {
          super(Ui(t, n)), (this.code = t);
        }
      }
      function Ui(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function k(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Hi(e, t) {
        throw new C(-201, !1);
      }
      function vt(e, t) {
        null == e &&
          (function X(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function I(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function _t(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function zi(e) {
        return Hf(e, Gi) || Hf(e, Gf);
      }
      function Hf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function zf(e) {
        return e && (e.hasOwnProperty(fl) || e.hasOwnProperty(Gw))
          ? e[fl]
          : null;
      }
      const Gi = te({ ɵprov: te }),
        fl = te({ ɵinj: te }),
        Gf = te({ ngInjectableDef: te }),
        Gw = te({ ngInjectorDef: te });
      var x = (() => (
        ((x = x || {})[(x.Default = 0)] = "Default"),
        (x[(x.Host = 1)] = "Host"),
        (x[(x.Self = 2)] = "Self"),
        (x[(x.SkipSelf = 4)] = "SkipSelf"),
        (x[(x.Optional = 8)] = "Optional"),
        x
      ))();
      let hl;
      function Dt(e) {
        const t = hl;
        return (hl = e), t;
      }
      function Wf(e, t, n) {
        const r = zi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & x.Optional
          ? null
          : void 0 !== t
          ? t
          : void Hi(oe(e));
      }
      const ae = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        vo = {},
        pl = "__NG_DI_FLAG__",
        Wi = "ngTempTokenPath",
        qw = "ngTokenPath",
        Kw = /\n/gm,
        Zw = "\u0275",
        qf = "__source";
      let _o;
      function fr(e) {
        const t = _o;
        return (_o = e), t;
      }
      function Yw(e, t = x.Default) {
        if (void 0 === _o) throw new C(-203, !1);
        return null === _o
          ? Wf(e, void 0, t)
          : _o.get(e, t & x.Optional ? null : void 0, t);
      }
      function M(e, t = x.Default) {
        return (
          (function Ww() {
            return hl;
          })() || Yw
        )(N(e), t);
      }
      function G(e, t = x.Default) {
        return M(e, qi(t));
      }
      function qi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function gl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = N(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = x.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = Qw(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(M(o, i));
          } else t.push(M(r));
        }
        return t;
      }
      function Do(e, t) {
        return (e[pl] = t), (e.prototype[pl] = t), e;
      }
      function Qw(e) {
        return e[pl];
      }
      function sn(e) {
        return { toString: e }.toString();
      }
      var Ut = (() => (
          ((Ut = Ut || {})[(Ut.OnPush = 0)] = "OnPush"),
          (Ut[(Ut.Default = 1)] = "Default"),
          Ut
        ))(),
        Ht = (() => {
          return (
            ((e = Ht || (Ht = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Ht
          );
          var e;
        })();
      const an = {},
        Y = [],
        Ki = te({ ɵcmp: te }),
        ml = te({ ɵdir: te }),
        yl = te({ ɵpipe: te }),
        Zf = te({ ɵmod: te }),
        ln = te({ ɵfac: te }),
        Co = te({ __NG_ELEMENT_ID__: te });
      let eE = 0;
      function un(e) {
        return sn(() => {
          const t = Qf(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ut.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || Ht.Emulated,
              id: "c" + eE++,
              styles: e.styles || Y,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Xf(n);
          const r = e.dependencies;
          return (n.directiveDefs = Zi(r, !1)), (n.pipeDefs = Zi(r, !0)), n;
        });
      }
      function nE(e) {
        return J(e) || Be(e);
      }
      function rE(e) {
        return null !== e;
      }
      function At(e) {
        return sn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Y,
          declarations: e.declarations || Y,
          imports: e.imports || Y,
          exports: e.exports || Y,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Yf(e, t) {
        if (null == e) return an;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function P(e) {
        return sn(() => {
          const t = Qf(e);
          return Xf(t), t;
        });
      }
      function J(e) {
        return e[Ki] || null;
      }
      function Be(e) {
        return e[ml] || null;
      }
      function nt(e) {
        return e[yl] || null;
      }
      function lt(e, t) {
        const n = e[Zf] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${oe(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Qf(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Y,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Yf(e.inputs, t),
          outputs: Yf(e.outputs),
        };
      }
      function Xf(e) {
        e.features?.forEach((t) => t(e));
      }
      function Zi(e, t) {
        if (!e) return null;
        const n = t ? nt : nE;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(rE);
      }
      const cn = 0,
        b = 1,
        U = 2,
        he = 3,
        Tt = 4,
        Kn = 5,
        $e = 6,
        pr = 7,
        ye = 8,
        Yi = 9,
        Qi = 10,
        W = 11,
        vl = 12,
        wo = 13,
        Jf = 14,
        gr = 15,
        Ue = 16,
        Eo = 17,
        mr = 18,
        zt = 19,
        bo = 20,
        eh = 21,
        le = 22,
        _l = 1,
        th = 2,
        Xi = 7,
        Ji = 8,
        yr = 9,
        Ke = 10;
      function ut(e) {
        return Array.isArray(e) && "object" == typeof e[_l];
      }
      function Rt(e) {
        return Array.isArray(e) && !0 === e[_l];
      }
      function Dl(e) {
        return 0 != (4 & e.flags);
      }
      function So(e) {
        return e.componentOffset > -1;
      }
      function es(e) {
        return 1 == (1 & e.flags);
      }
      function Nt(e) {
        return !!e.template;
      }
      function iE(e) {
        return 0 != (256 & e[U]);
      }
      function Zn(e, t) {
        return e.hasOwnProperty(ln) ? e[ln] : null;
      }
      class lE {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ct() {
        return oh;
      }
      function oh(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = cE), uE;
      }
      function uE() {
        const e = sh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === an) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function cE(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            sh(e) ||
            (function dE(e, t) {
              return (e[ih] = t);
            })(e, { previous: an, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new lE(l && l.currentValue, t, a === an)), (e[r] = t);
      }
      Ct.ngInherit = !0;
      const ih = "__ngSimpleChanges__";
      function sh(e) {
        return e[ih] || null;
      }
      const wt = function (e, t, n) {};
      function Pe(e) {
        for (; Array.isArray(e); ) e = e[cn];
        return e;
      }
      function ts(e, t) {
        return Pe(t[e]);
      }
      function ct(e, t) {
        return Pe(t[e.index]);
      }
      function uh(e, t) {
        return e.data[t];
      }
      function dt(e, t) {
        const n = t[e];
        return ut(n) ? n : n[cn];
      }
      function ns(e) {
        return 64 == (64 & e[U]);
      }
      function In(e, t) {
        return null == t ? null : e[t];
      }
      function ch(e) {
        e[mr] = 0;
      }
      function wl(e, t) {
        e[Kn] += t;
        let n = e,
          r = e[he];
        for (
          ;
          null !== r && ((1 === t && 1 === n[Kn]) || (-1 === t && 0 === n[Kn]));

        )
          (r[Kn] += t), (n = r), (r = r[he]);
      }
      const L = { lFrame: Dh(null), bindingsEnabled: !0 };
      function fh() {
        return L.bindingsEnabled;
      }
      function _() {
        return L.lFrame.lView;
      }
      function Z() {
        return L.lFrame.tView;
      }
      function ke() {
        let e = hh();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function hh() {
        return L.lFrame.currentTNode;
      }
      function Gt(e, t) {
        const n = L.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function El() {
        return L.lFrame.isParent;
      }
      function Ze() {
        const e = L.lFrame;
        let t = e.bindingRootIndex;
        return (
          -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
        );
      }
      function _r() {
        return L.lFrame.bindingIndex++;
      }
      function fn(e) {
        const t = L.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function ME(e, t) {
        const n = L.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Sl(t);
      }
      function Sl(e) {
        L.lFrame.currentDirectiveIndex = e;
      }
      function Il(e) {
        L.lFrame.currentQueryIndex = e;
      }
      function AE(e) {
        const t = e[b];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[$e] : null;
      }
      function vh(e, t, n) {
        if (n & x.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & x.Host ||
              ((o = AE(i)), null === o || ((i = i[gr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (L.lFrame = _h());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Al(e) {
        const t = _h(),
          n = e[b];
        (L.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function _h() {
        const e = L.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Dh(e) : t;
      }
      function Dh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Ch() {
        const e = L.lFrame;
        return (
          (L.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const wh = Ch;
      function Tl() {
        const e = Ch();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ye() {
        return L.lFrame.selectedIndex;
      }
      function Yn(e) {
        L.lFrame.selectedIndex = e;
      }
      function ce() {
        const e = L.lFrame;
        return uh(e.tView, e.selectedIndex);
      }
      function rs(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks ?? (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function os(e, t, n) {
        Eh(e, t, 3, n);
      }
      function is(e, t, n, r) {
        (3 & e[U]) === n && Eh(e, t, n, r);
      }
      function Rl(e, t) {
        let n = e[U];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[U] = n));
      }
      function Eh(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[mr] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[mr] += 65536),
              (a < i || -1 == i) &&
                (LE(e, n, t, l), (e[mr] = (4294901760 & e[mr]) + l + 2)),
              l++;
      }
      function LE(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[U] >> 11 < e[mr] >> 16 && (3 & e[U]) === t) {
            (e[U] += 2048), wt(4, a, i);
            try {
              i.call(a);
            } finally {
              wt(5, a, i);
            }
          }
        } else {
          wt(4, a, i);
          try {
            i.call(a);
          } finally {
            wt(5, a, i);
          }
        }
      }
      const Dr = -1;
      class Io {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function xl(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            Sh(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function bh(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Sh(e) {
        return 64 === e.charCodeAt(0);
      }
      function Ao(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Mh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Mh(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Ih(e) {
        return e !== Dr;
      }
      function ss(e) {
        return 32767 & e;
      }
      function as(e, t) {
        let n = (function $E(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[gr]), n--;
        return r;
      }
      let Ol = !0;
      function ls(e) {
        const t = Ol;
        return (Ol = e), t;
      }
      const Ah = 255,
        Th = 5;
      let UE = 0;
      const Wt = {};
      function us(e, t) {
        const n = Rh(e, t);
        if (-1 !== n) return n;
        const r = t[b];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Fl(r.data, e),
          Fl(t, null),
          Fl(r.blueprint, null));
        const o = Pl(e, t),
          i = e.injectorIndex;
        if (Ih(o)) {
          const s = ss(o),
            a = as(o, t),
            l = a[b].data;
          for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | l[s + u];
        }
        return (t[i + 8] = o), i;
      }
      function Fl(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Rh(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Pl(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Lh(o)), null === r)) return Dr;
          if ((n++, (o = o[gr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Dr;
      }
      function kl(e, t, n) {
        !(function HE(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Co) && (r = n[Co]),
            null == r && (r = n[Co] = UE++);
          const o = r & Ah;
          t.data[e + (o >> Th)] |= 1 << o;
        })(e, t, n);
      }
      function Nh(e, t, n) {
        if (n & x.Optional || void 0 !== e) return e;
        Hi();
      }
      function xh(e, t, n, r) {
        if (
          (n & x.Optional && void 0 === r && (r = null),
          !(n & (x.Self | x.Host)))
        ) {
          const o = e[Yi],
            i = Dt(void 0);
          try {
            return o ? o.get(t, r, n & x.Optional) : Wf(t, r, n & x.Optional);
          } finally {
            Dt(i);
          }
        }
        return Nh(r, 0, n);
      }
      function Oh(e, t, n, r = x.Default, o) {
        if (null !== e) {
          if (1024 & t[U]) {
            const s = (function KE(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[U] && !(256 & s[U]);

              ) {
                const a = Fh(i, s, n, r | x.Self, Wt);
                if (a !== Wt) return a;
                let l = i.parent;
                if (!l) {
                  const u = s[eh];
                  if (u) {
                    const c = u.get(n, Wt, r);
                    if (c !== Wt) return c;
                  }
                  (l = Lh(s)), (s = s[gr]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, Wt);
            if (s !== Wt) return s;
          }
          const i = Fh(e, t, n, r, Wt);
          if (i !== Wt) return i;
        }
        return xh(t, n, r, o);
      }
      function Fh(e, t, n, r, o) {
        const i = (function WE(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Co) ? e[Co] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Ah : qE) : t;
        })(n);
        if ("function" == typeof i) {
          if (!vh(t, e, r)) return r & x.Host ? Nh(o, 0, r) : xh(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & x.Optional) return s;
            Hi();
          } finally {
            wh();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Rh(e, t),
            l = Dr,
            u = r & x.Host ? t[Ue][$e] : null;
          for (
            (-1 === a || r & x.SkipSelf) &&
            ((l = -1 === a ? Pl(e, t) : t[a + 8]),
            l !== Dr && kh(r, !1)
              ? ((s = t[b]), (a = ss(l)), (t = as(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[b];
            if (Ph(i, a, c.data)) {
              const d = GE(a, t, n, s, r, u);
              if (d !== Wt) return d;
            }
            (l = t[a + 8]),
              l !== Dr && kh(r, t[b].data[a + 8] === u) && Ph(i, a, t)
                ? ((s = c), (a = ss(l)), (t = as(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function GE(e, t, n, r, o, i) {
        const s = t[b],
          a = s.data[e + 8],
          c = (function cs(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (o) {
              const h = s[l];
              if (h && Nt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? So(a) && Ol : r != s && 0 != (3 & a.type),
            o & x.Host && i === a
          );
        return null !== c ? Qn(t, s, c, a) : Wt;
      }
      function Qn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function VE(e) {
            return e instanceof Io;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Lw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Q(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : k(e);
              })(i[n])
            );
          const a = ls(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Dt(s.injectImpl) : null;
          vh(e, r, x.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function kE(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = oh(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && Dt(l), ls(a), (s.resolving = !1), wh();
          }
        }
        return o;
      }
      function Ph(e, t, n) {
        return !!(n[t + (e >> Th)] & (1 << e));
      }
      function kh(e, t) {
        return !(e & x.Self || (e & x.Host && t));
      }
      class Cr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Oh(this._tNode, this._lView, t, qi(r), n);
        }
      }
      function qE() {
        return new Cr(ke(), _());
      }
      function Le(e) {
        return sn(() => {
          const t = e.prototype.constructor,
            n = t[ln] || Ll(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[ln] || Ll(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Ll(e) {
        return cl(e)
          ? () => {
              const t = Ll(N(e));
              return t && t();
            }
          : Zn(e);
      }
      function Lh(e) {
        const t = e[b],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[$e] : null;
      }
      const Er = "__parameters__";
      function Sr(e, t, n) {
        return sn(() => {
          const r = (function Vl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(Er)
                ? l[Er]
                : Object.defineProperty(l, Er, { value: [] })[Er];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class S {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = I({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Xn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Xn(n, t) : t(n)));
      }
      function jh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function fs(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ft(e, t, n) {
        let r = Mr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function XE(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Bl(e, t) {
        const n = Mr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Mr(e, t) {
        return (function Bh(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const xo = Do(Sr("Optional"), 8),
        Oo = Do(Sr("SkipSelf"), 4);
      var rt = (() => (
        ((rt = rt || {})[(rt.Important = 1)] = "Important"),
        (rt[(rt.DashCase = 2)] = "DashCase"),
        rt
      ))();
      const Wl = new Map();
      let Db = 0;
      const Kl = "__ngContext__";
      function He(e, t) {
        ut(t)
          ? ((e[Kl] = t[bo]),
            (function wb(e) {
              Wl.set(e[bo], e);
            })(t))
          : (e[Kl] = t);
      }
      let Zl;
      function Yl(e, t) {
        return Zl(e, t);
      }
      function Lo(e) {
        const t = e[he];
        return Rt(t) ? t[he] : t;
      }
      function Ql(e) {
        return sp(e[wo]);
      }
      function Xl(e) {
        return sp(e[Tt]);
      }
      function sp(e) {
        for (; null !== e && !Rt(e); ) e = e[Tt];
        return e;
      }
      function Ar(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Rt(r) ? (i = r) : ut(r) && ((s = !0), (r = r[cn]));
          const a = Pe(r);
          0 === e && null !== n
            ? null == o
              ? fp(t, n, a)
              : Jn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Jn(t, n, a, o || null, !0)
            : 2 === e
            ? (function iu(e, t, n) {
                const r = ms(e, t);
                r &&
                  (function Ub(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function Gb(e, t, n, r, o) {
                const i = n[Xi];
                i !== Pe(n) && Ar(t, e, r, i, o);
                for (let a = Ke; a < n.length; a++) {
                  const l = n[a];
                  Vo(l[b], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function eu(e, t, n) {
        return e.createElement(t, n);
      }
      function lp(e, t) {
        const n = e[yr],
          r = n.indexOf(t),
          o = t[he];
        512 & t[U] && ((t[U] &= -513), wl(o, -1)), n.splice(r, 1);
      }
      function tu(e, t) {
        if (e.length <= Ke) return;
        const n = Ke + t,
          r = e[n];
        if (r) {
          const o = r[Eo];
          null !== o && o !== e && lp(o, r), t > 0 && (e[n - 1][Tt] = r[Tt]);
          const i = fs(e, Ke + t);
          !(function Fb(e, t) {
            Vo(e, t, t[W], 2, null, null), (t[cn] = null), (t[$e] = null);
          })(r[b], r);
          const s = i[zt];
          null !== s && s.detachView(i[b]),
            (r[he] = null),
            (r[Tt] = null),
            (r[U] &= -65);
        }
        return r;
      }
      function up(e, t) {
        if (!(128 & t[U])) {
          const n = t[W];
          n.destroyNode && Vo(e, t, n, 3, null, null),
            (function Lb(e) {
              let t = e[wo];
              if (!t) return nu(e[b], e);
              for (; t; ) {
                let n = null;
                if (ut(t)) n = t[wo];
                else {
                  const r = t[Ke];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[Tt] && t !== e; )
                    ut(t) && nu(t[b], t), (t = t[he]);
                  null === t && (t = e), ut(t) && nu(t[b], t), (n = t && t[Tt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function nu(e, t) {
        if (!(128 & t[U])) {
          (t[U] &= -65),
            (t[U] |= 128),
            (function $b(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Io)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        wt(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          wt(5, a, l);
                        }
                      }
                    else {
                      wt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        wt(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function Bb(e, t) {
              const n = e.cleanup,
                r = t[pr];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[pr] = null;
              }
            })(e, t),
            1 === t[b].type && t[W].destroy();
          const n = t[Eo];
          if (null !== n && Rt(t[he])) {
            n !== t[he] && lp(n, t);
            const r = t[zt];
            null !== r && r.detachView(e);
          }
          !(function Eb(e) {
            Wl.delete(e[bo]);
          })(t);
        }
      }
      function cp(e, t, n) {
        return (function dp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[cn];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Ht.None || i === Ht.Emulated) return null;
            }
            return ct(r, n);
          }
        })(e, t.parent, n);
      }
      function Jn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function fp(e, t, n) {
        e.appendChild(t, n);
      }
      function hp(e, t, n, r, o) {
        null !== r ? Jn(e, t, n, r, o) : fp(e, t, n);
      }
      function ms(e, t) {
        return e.parentNode(t);
      }
      let ru,
        lu,
        Ds,
        mp = function gp(e, t, n) {
          return 40 & e.type ? ct(e, n) : null;
        };
      function ys(e, t, n, r) {
        const o = cp(e, r, t),
          i = t[W],
          a = (function pp(e, t, n) {
            return mp(e, t, n);
          })(r.parent || t[$e], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) hp(i, o, n[l], a, !1);
          else hp(i, o, n, a, !1);
        void 0 !== ru && ru(i, r, t, n, o);
      }
      function vs(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return ct(t, e);
          if (4 & n) return ou(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return vs(e, r);
            {
              const o = e[t.index];
              return Rt(o) ? ou(-1, o) : Pe(o);
            }
          }
          if (32 & n) return Yl(t, e)() || Pe(e[t.index]);
          {
            const r = vp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : vs(Lo(e[Ue]), r)
              : vs(e, t.next);
          }
        }
        return null;
      }
      function vp(e, t) {
        return null !== t ? e[Ue][$e].projection[t.projection] : null;
      }
      function ou(e, t) {
        const n = Ke + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[b].firstChild;
          if (null !== o) return vs(r, o);
        }
        return t[Xi];
      }
      function su(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && He(Pe(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) su(e, t, n.child, r, o, i, !1), Ar(t, e, o, a, i);
            else if (32 & l) {
              const u = Yl(n, r);
              let c;
              for (; (c = u()); ) Ar(t, e, o, c, i);
              Ar(t, e, o, a, i);
            } else 16 & l ? _p(e, t, r, n, o, i) : Ar(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Vo(e, t, n, r, o, i) {
        su(n, r, e.firstChild, t, o, i, !1);
      }
      function _p(e, t, n, r, o, i) {
        const s = n[Ue],
          l = s[$e].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Ar(t, e, o, l[u], i);
        else su(e, t, l, s[he], o, i, !0);
      }
      function Dp(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Cp(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && xl(e, t, r),
          null !== o && Dp(e, t, o),
          null !== i &&
            (function qb(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      function Sp(e) {
        return (
          (function uu() {
            if (void 0 === Ds && ((Ds = null), ae.trustedTypes))
              try {
                Ds = ae.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Ds;
          })()?.createScriptURL(e) || e
        );
      }
      class Mp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Uf})`;
        }
      }
      function An(e) {
        return e instanceof Mp ? e.changingThisBreaksApplicationSecurity : e;
      }
      function jo(e, t) {
        const n = (function rS(e) {
          return (e instanceof Mp && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${Uf})`);
        }
        return n === t;
      }
      const aS = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var be = (() => (
        ((be = be || {})[(be.NONE = 0)] = "NONE"),
        (be[(be.HTML = 1)] = "HTML"),
        (be[(be.STYLE = 2)] = "STYLE"),
        (be[(be.SCRIPT = 3)] = "SCRIPT"),
        (be[(be.URL = 4)] = "URL"),
        (be[(be.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        be
      ))();
      function $o(e) {
        const t = Uo();
        return t
          ? t.sanitize(be.URL, e) || ""
          : jo(e, "URL")
          ? An(e)
          : (function cu(e) {
              return (e = String(e)).match(aS) ? e : "unsafe:" + e;
            })(k(e));
      }
      function Op(e) {
        const t = Uo();
        if (t) return Sp(t.sanitize(be.RESOURCE_URL, e) || "");
        if (jo(e, "ResourceURL")) return Sp(An(e));
        throw new C(904, !1);
      }
      function Uo() {
        const e = _();
        return e && e[vl];
      }
      const ws = new S("ENVIRONMENT_INITIALIZER"),
        Pp = new S("INJECTOR", -1),
        kp = new S("INJECTOR_DEF_TYPES");
      class Lp {
        get(t, n = vo) {
          if (n === vo) {
            const r = new Error(`NullInjectorError: No provider for ${oe(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function CS(...e) {
        return { ɵproviders: Vp(0, e), ɵfromNgModule: !0 };
      }
      function Vp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Xn(t, (i) => {
            const s = i;
            pu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && jp(o, n),
          n
        );
      }
      function jp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          gu(o, (i) => {
            t.push(i);
          });
        }
      }
      function pu(e, t, n, r) {
        if (!(e = N(e))) return !1;
        let o = null,
          i = zf(e);
        const s = !i && J(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = zf(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) pu(u, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let u;
              r.add(o);
              try {
                Xn(i.imports, (c) => {
                  pu(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && jp(u, t);
            }
            if (!a) {
              const u = Zn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: u, deps: Y },
                { provide: kp, useValue: o, multi: !0 },
                { provide: ws, useValue: () => M(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              gu(l, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function gu(e, t) {
        for (let n of e)
          dl(n) && (n = n.ɵproviders), Array.isArray(n) ? gu(n, t) : t(n);
      }
      const wS = te({ provide: String, useValue: te });
      function mu(e) {
        return null !== e && "object" == typeof e && wS in e;
      }
      function er(e) {
        return "function" == typeof e;
      }
      const yu = new S("Set Injector scope."),
        Es = {},
        bS = {};
      let vu;
      function bs() {
        return void 0 === vu && (vu = new Lp()), vu;
      }
      class qt {}
      class Up extends qt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Du(t, (s) => this.processProvider(s)),
            this.records.set(Pp, Rr(void 0, this)),
            o.has("environment") && this.records.set(qt, Rr(void 0, this));
          const i = this.records.get(yu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(kp.multi, Y, x.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = fr(this),
            r = Dt(void 0);
          try {
            return t();
          } finally {
            fr(n), Dt(r);
          }
        }
        get(t, n = vo, r = x.Default) {
          this.assertNotDestroyed(), (r = qi(r));
          const o = fr(this),
            i = Dt(void 0);
          try {
            if (!(r & x.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function TS(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof S)
                    );
                  })(t) && zi(t);
                (a = l && this.injectableDefInScope(l) ? Rr(_u(t), Es) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & x.Self ? bs() : this.parent).get(
              t,
              (n = r & x.Optional && n === vo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Wi] = s[Wi] || []).unshift(oe(t)), o)) throw s;
              return (function Xw(e, t, n, r) {
                const o = e[Wi];
                throw (
                  (t[qf] && o.unshift(t[qf]),
                  (e.message = (function Jw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Zw
                        ? e.slice(2)
                        : e;
                    let o = oe(t);
                    if (Array.isArray(t)) o = t.map(oe).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : oe(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Kw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[qw] = o),
                  (e[Wi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Dt(i), fr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = fr(this),
            n = Dt(void 0);
          try {
            const r = this.get(ws.multi, Y, x.Self);
            for (const o of r) o();
          } finally {
            fr(t), Dt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(oe(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = er((t = N(t))) ? t : N(t && t.provide);
          const r = (function MS(e) {
            return mu(e) ? Rr(void 0, e.useValue) : Rr(Hp(e), Es);
          })(t);
          if (er(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Rr(void 0, Es, !0)),
              (o.factory = () => gl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Es && ((n.value = bS), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function AS(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = N(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function _u(e) {
        const t = zi(e),
          n = null !== t ? t.factory : Zn(e);
        if (null !== n) return n;
        if (e instanceof S) throw new C(204, !1);
        if (e instanceof Function)
          return (function SS(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function No(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function Hw(e) {
              const t = e && (e[Gi] || e[Gf]);
              return t
                ? ((function zw(e) {
                    if (e.hasOwnProperty("name")) return e.name;
                    ("" + e).match(/^function\s*([^\s(]+)/);
                  })(e),
                  t)
                : null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function Hp(e, t, n) {
        let r;
        if (er(e)) {
          const o = N(e);
          return Zn(o) || _u(o);
        }
        if (mu(e)) r = () => N(e.useValue);
        else if (
          (function $p(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...gl(e.deps || []));
        else if (
          (function Bp(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => M(N(e.useExisting));
        else {
          const o = N(e && (e.useClass || e.provide));
          if (
            !(function IS(e) {
              return !!e.deps;
            })(e)
          )
            return Zn(o) || _u(o);
          r = () => new o(...gl(e.deps));
        }
        return r;
      }
      function Rr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Du(e, t) {
        for (const n of e)
          Array.isArray(n) ? Du(n, t) : n && dl(n) ? Du(n.ɵproviders, t) : t(n);
      }
      class RS {}
      class zp {}
      class xS {
        resolveComponentFactory(t) {
          throw (function NS(e) {
            const t = Error(
              `No component factory found for ${oe(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ho = (() => {
        class e {}
        return (e.NULL = new xS()), e;
      })();
      function OS() {
        return Nr(ke(), _());
      }
      function Nr(e, t) {
        return new ht(ct(e, t));
      }
      let ht = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = OS), e;
      })();
      class Wp {}
      let pn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function PS() {
                const e = _(),
                  n = dt(ke().index, e);
                return (ut(n) ? n : e)[W];
              })()),
            e
          );
        })(),
        kS = (() => {
          class e {}
          return (
            (e.ɵprov = I({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class zo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const LS = new zo("15.2.6"),
        Cu = {},
        wu = "ngOriginalError";
      function Eu(e) {
        return e[wu];
      }
      class xr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Eu(t);
          for (; n && Eu(n); ) n = Eu(n);
          return n || null;
        }
      }
      function gn(e) {
        return e instanceof Function ? e() : e;
      }
      function Kp(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Zp = "ng-template";
      function KS(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Kp(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Yp(e) {
        return 4 === e.type && e.value !== Zp;
      }
      function ZS(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Zp);
      }
      function YS(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function JS(e) {
            for (let t = 0; t < e.length; t++) if (bh(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !ZS(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (xt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!KS(e.attrs, u, n)) {
                    if (xt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = QS(8 & r ? "class" : l, o, Yp(e), n);
                if (-1 === d) {
                  if (xt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Kp(h, u, 0)) || (2 & r && u !== f)) {
                    if (xt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !xt(r) && !xt(l)) return !1;
            if (s && xt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return xt(r) || s;
      }
      function xt(e) {
        return 0 == (1 & e);
      }
      function QS(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function eM(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Qp(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (YS(e, t[r], n)) return !0;
        return !1;
      }
      function Xp(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function nM(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !xt(s) && ((t += Xp(i, o)), (o = "")),
              (r = s),
              (i = i || !xt(r));
          n++;
        }
        return "" !== o && (t += Xp(i, o)), t;
      }
      const V = {};
      function de(e) {
        Jp(Z(), _(), Ye() + e, !1);
      }
      function Jp(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[U])) {
            const i = e.preOrderCheckHooks;
            null !== i && os(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && is(t, i, 0, n);
          }
        Yn(n);
      }
      function rg(e, t = null, n = null, r) {
        const o = og(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function og(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Y, CS(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : oe(e))),
          new Up(i, t || bs(), r || null, o)
        );
      }
      let Kt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return rg({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return rg({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = vo),
          (e.NULL = new Lp()),
          (e.ɵprov = I({ token: e, providedIn: "any", factory: () => M(Pp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function D(e, t = x.Default) {
        const n = _();
        return null === n ? M(e, t) : Oh(ke(), n, N(e), t);
      }
      function fg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Il(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ms(e, t, n, r, o, i, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[cn] = o),
          (d[U] = 76 | r),
          (null !== c || (e && 1024 & e[U])) && (d[U] |= 1024),
          ch(d),
          (d[he] = d[gr] = e),
          (d[ye] = n),
          (d[Qi] = s || (e && e[Qi])),
          (d[W] = a || (e && e[W])),
          (d[vl] = l || (e && e[vl]) || null),
          (d[Yi] = u || (e && e[Yi]) || null),
          (d[$e] = i),
          (d[bo] = (function Cb() {
            return Db++;
          })()),
          (d[eh] = c),
          (d[Ue] = 2 == t.type ? e[Ue] : d),
          d
        );
      }
      function Pr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Au(e, t, n, r, o) {
            const i = hh(),
              s = El(),
              l = (e.data[t] = (function AM(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && ((i.next = l), (l.prev = i))),
              l
            );
          })(e, t, n, r, o)),
            (function SE() {
              return L.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Mo() {
            const e = L.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Gt(i, !0), i;
      }
      function Go(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Tu(e, t, n) {
        Al(t);
        try {
          const r = e.viewQuery;
          null !== r && ju(1, r, n);
          const o = e.template;
          null !== o && hg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && fg(e, t),
            e.staticViewQueries && ju(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function SM(e, t) {
              for (let n = 0; n < t.length; n++) qM(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[U] &= -5), Tl();
        }
      }
      function Is(e, t, n, r) {
        const o = t[U];
        if (128 != (128 & o)) {
          Al(t);
          try {
            ch(t),
              (function gh(e) {
                return (L.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && hg(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && os(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && is(t, u, 0, null), Rl(t, 0);
            }
            if (
              ((function GM(e) {
                for (let t = Ql(e); null !== t; t = Xl(t)) {
                  if (!t[th]) continue;
                  const n = t[yr];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[U] || wl(o[he], 1), (o[U] |= 512);
                  }
                }
              })(t),
              (function zM(e) {
                for (let t = Ql(e); null !== t; t = Xl(t))
                  for (let n = Ke; n < t.length; n++) {
                    const r = t[n],
                      o = r[b];
                    ns(r) && Is(o, r, o.template, r[ye]);
                  }
              })(t),
              null !== e.contentQueries && fg(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && os(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && is(t, u, 1), Rl(t, 1);
            }
            !(function EM(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Yn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      ME(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Yn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function bM(e, t) {
                for (let n = 0; n < t.length; n++) WM(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && ju(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && os(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && is(t, u, 2), Rl(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[U] &= -41),
              512 & t[U] && ((t[U] &= -513), wl(t[he], -1));
          } finally {
            Tl();
          }
        }
      }
      function hg(e, t, n, r, o) {
        const i = Ye(),
          s = 2 & r;
        try {
          Yn(-1),
            s && t.length > le && Jp(e, t, le, !1),
            wt(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Yn(i), wt(s ? 3 : 1, o);
        }
      }
      function Ru(e, t, n) {
        if (Dl(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Nu(e, t, n) {
        fh() &&
          ((function FM(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            So(n) &&
              (function $M(e, t, n) {
                const r = ct(t, e),
                  o = pg(n),
                  i = e[Qi],
                  s = As(
                    e,
                    Ms(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || us(n, t),
              He(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = Qn(t, e, a, n);
              He(u, t),
                null !== s && UM(0, a - o, u, l, 0, s),
                Nt(l) && (dt(n.index, t)[ye] = Qn(t, e, a, n));
            }
          })(e, t, n, ct(n, t)),
          64 == (64 & n.flags) && Dg(e, t, n));
      }
      function xu(e, t, n = ct) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function pg(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Ou(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Ou(e, t, n, r, o, i, s, a, l, u) {
        const c = le + r,
          d = c + o,
          f = (function MM(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : V);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[b] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function mg(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? yg(n, t, o, i)
              : r.hasOwnProperty(o) && yg(n, t, r[o], i);
          }
        return n;
      }
      function yg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function pt(e, t, n, r, o, i, s, a) {
        const l = ct(t, n);
        let c,
          u = t.inputs;
        !a && null != u && (c = u[r])
          ? (Bu(e, n, c, r, o), So(t) && vg(n, t.index))
          : 3 & t.type &&
            ((r = (function RM(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(l, r, o));
      }
      function vg(e, t) {
        const n = dt(t, e);
        16 & n[U] || (n[U] |= 32);
      }
      function Fu(e, t, n, r) {
        if (fh()) {
          const o = null === r ? null : { "": -1 },
            i = (function kM(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Qp(t, s.selectors, !1))
                    if ((r || (r = []), Nt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Pu(e, t, a.length);
                      } else r.unshift(s), Pu(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && _g(e, t, n, s, o, a),
            o &&
              (function LM(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = Ao(n.mergedAttrs, n.attrs);
      }
      function _g(e, t, n, r, o, i) {
        for (let u = 0; u < r.length; u++) kl(us(n, t), e, r[u].type);
        !(function jM(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = Go(e, t, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (n.mergedAttrs = Ao(n.mergedAttrs, c.hostAttrs)),
            BM(e, n, t, l, c),
            VM(l, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            l++;
        }
        !(function TM(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (l = mg(d.inputs, c, l, f ? f.inputs : null)),
              (u = mg(d.outputs, c, u, p));
            const g = null === l || null === s || Yp(t) ? null : HM(l, c, s);
            a.push(g);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = u);
        })(e, n, i);
      }
      function Dg(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function IE() {
            return L.lFrame.currentDirectiveIndex;
          })();
        try {
          Yn(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              u = t[a];
            Sl(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                PM(l, u);
          }
        } finally {
          Yn(-1), Sl(s);
        }
      }
      function PM(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Pu(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function VM(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Nt(t) && (n[""] = e);
        }
      }
      function BM(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Zn(o.type)),
          s = new Io(i, Nt(o), D);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function xM(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function OM(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Go(e, n, o.hostVars, V), o);
      }
      function Zt(e, t, n, r, o, i) {
        const s = ct(e, t);
        !(function ku(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? k(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[W], s, i, e.value, n, r, o);
      }
      function UM(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function HM(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function Cg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function WM(e, t) {
        const n = dt(t, e);
        if (ns(n)) {
          const r = n[b];
          48 & n[U] ? Is(r, n, r.template, n[ye]) : n[Kn] > 0 && Lu(n);
        }
      }
      function Lu(e) {
        for (let r = Ql(e); null !== r; r = Xl(r))
          for (let o = Ke; o < r.length; o++) {
            const i = r[o];
            if (ns(i))
              if (512 & i[U]) {
                const s = i[b];
                Is(s, i, s.template, i[ye]);
              } else i[Kn] > 0 && Lu(i);
          }
        const n = e[b].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = dt(n[r], e);
            ns(o) && o[Kn] > 0 && Lu(o);
          }
      }
      function qM(e, t) {
        const n = dt(t, e),
          r = n[b];
        (function KM(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Tu(r, n, n[ye]);
      }
      function As(e, t) {
        return e[wo] ? (e[Jf][Tt] = t) : (e[wo] = t), (e[Jf] = t), t;
      }
      function Vu(e) {
        for (; e; ) {
          e[U] |= 32;
          const t = Lo(e);
          if (iE(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Ts(e, t, n, r = !0) {
        const o = t[Qi];
        o.begin && o.begin();
        try {
          Is(e, t, e.template, n);
        } catch (s) {
          throw (r && Sg(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function ju(e, t, n) {
        Il(0), t(e, n);
      }
      function wg(e) {
        return e[pr] || (e[pr] = []);
      }
      function Eg(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Sg(e, t) {
        const n = e[Yi],
          r = n ? n.get(xr, null) : null;
        r && r.handleError(t);
      }
      function Bu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function mn(e, t, n) {
        const r = ts(t, e);
        !(function ap(e, t, n) {
          e.setValue(t, n);
        })(e[W], r, n);
      }
      function Rs(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = ul(o, a))
              : 2 == i && (r = ul(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Ns(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Pe(i)), Rt(i)))
            for (let a = Ke; a < i.length; a++) {
              const l = i[a],
                u = l[b].firstChild;
              null !== u && Ns(l[b], l, u, r);
            }
          const s = n.type;
          if (8 & s) Ns(e, t, n.child, r);
          else if (32 & s) {
            const a = Yl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = vp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Lo(t[Ue]);
              Ns(l[b], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Wo {
        get rootNodes() {
          const t = this._lView,
            n = t[b];
          return Ns(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ye];
        }
        set context(t) {
          this._lView[ye] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[U]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[he];
            if (Rt(t)) {
              const n = t[Ji],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (tu(t, r), fs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          up(this._lView[b], this._lView);
        }
        onDestroy(t) {
          !(function gg(e, t, n, r) {
            const o = wg(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && Eg(e).push(r, o.length - 1));
          })(this._lView[b], this._lView, null, t);
        }
        markForCheck() {
          Vu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[U] &= -65;
        }
        reattach() {
          this._lView[U] |= 64;
        }
        detectChanges() {
          Ts(this._lView[b], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function kb(e, t) {
              Vo(e, t, t[W], 2, null, null);
            })(this._lView[b], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class ZM extends Wo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Ts(t[b], t, t[ye], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Mg extends Ho {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = J(t);
          return new qo(n, this.ngModule);
        }
      }
      function Ig(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class QM {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = qi(r);
          const o = this.injector.get(t, Cu, r);
          return o !== Cu || n === Cu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class qo extends zp {
        get inputs() {
          return Ig(this.componentDef.inputs);
        }
        get outputs() {
          return Ig(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function rM(e) {
              return e.map(nM).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof qt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new QM(t, i) : t,
            a = s.get(Wp, null);
          if (null === a) throw new C(407, !1);
          const l = s.get(kS, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function IM(e, t, n) {
                  return e.selectRootElement(t, n === Ht.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : eu(
                  u,
                  c,
                  (function YM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Ou(0, null, null, 1, 0, null, null, null, null, null),
            p = Ms(null, h, null, f, null, null, a, u, l, s, null);
          let g, m;
          Al(p);
          try {
            const v = this.componentDef;
            let w,
              y = null;
            v.findHostDirectiveDefs
              ? ((w = []),
                (y = new Map()),
                v.findHostDirectiveDefs(v, w, y),
                w.push(v))
              : (w = [v]);
            const R = (function JM(e, t) {
                const n = e[b],
                  r = le;
                return (e[r] = t), Pr(n, r, 2, "#host", null);
              })(p, d),
              ne = (function e0(e, t, n, r, o, i, s, a) {
                const l = o[b];
                !(function t0(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Ao(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Rs(t, t.mergedAttrs, !0), null !== n && Cp(r, n, t));
                })(r, e, t, s);
                const u = i.createRenderer(t, n),
                  c = Ms(
                    o,
                    pg(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    u,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && Pu(l, e, r.length - 1),
                  As(o, c),
                  (o[e.index] = c)
                );
              })(R, d, v, w, p, a, u);
            (m = uh(h, le)),
              d &&
                (function r0(e, t, n, r) {
                  if (r) xl(e, n, ["ng-version", LS.full]);
                  else {
                    const { attrs: o, classes: i } = (function oM(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!xt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && xl(e, n, o),
                      i && i.length > 0 && Dp(e, n, i.join(" "));
                  }
                })(u, v, d, r),
              void 0 !== n &&
                (function o0(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(m, this.ngContentSelectors, n),
              (g = (function n0(e, t, n, r, o, i) {
                const s = ke(),
                  a = o[b],
                  l = ct(s, o);
                _g(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  He(Qn(o, a, s.directiveStart + c, s), o);
                Dg(a, o, s), l && He(l, o);
                const u = Qn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ye] = o[ye] = u), null !== i))
                  for (const c of i) c(u, t);
                return Ru(a, s, e), u;
              })(ne, v, w, y, p, [s0])),
              Tu(h, p, null);
          } finally {
            Tl();
          }
          return new XM(this.componentType, g, Nr(m, p), p, m);
        }
      }
      class XM extends RS {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new ZM(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Bu(i[b], i, o, t, n), vg(i, this._tNode.index);
          }
        }
        get injector() {
          return new Cr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function s0() {
        const e = ke();
        rs(_()[b], e);
      }
      function ee(e) {
        let t = (function Ag(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (Nt(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = $u(e.inputs)),
                (s.declaredInputs = $u(e.declaredInputs)),
                (s.outputs = $u(e.outputs));
              const a = o.hostBindings;
              a && c0(e, a);
              const l = o.viewQuery,
                u = o.contentQueries;
              if (
                (l && l0(e, l),
                u && u0(e, u),
                ll(e.inputs, o.inputs),
                ll(e.declaredInputs, o.declaredInputs),
                ll(e.outputs, o.outputs),
                Nt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === ee && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function a0(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Ao(o.hostAttrs, (n = Ao(n, o.hostAttrs))));
          }
        })(r);
      }
      function $u(e) {
        return e === an ? {} : e === Y ? [] : e;
      }
      function l0(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function u0(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function c0(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function xs(e) {
        return (
          !!Uu(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Uu(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Yt(e, t, n) {
        return (e[t] = n);
      }
      function ze(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Os(e, t, n, r, o) {
        const i = (function tr(e, t, n, r) {
          const o = ze(e, t, n);
          return ze(e, t + 1, r) || o;
        })(e, t, n, r);
        return ze(e, t + 2, o) || i;
      }
      function Ot(e, t, n, r) {
        const o = _();
        return ze(o, _r(), t) && (Z(), Zt(ce(), o, e, t, n, r)), Ot;
      }
      function Lr(e, t, n, r) {
        return ze(e, _r(), n) ? t + k(n) + r : V;
      }
      function jr(e, t, n, r, o, i, s, a) {
        const u = Os(
          e,
          (function dn() {
            return L.lFrame.bindingIndex;
          })(),
          n,
          o,
          s
        );
        return fn(3), u ? t + k(n) + r + k(o) + i + k(s) + a : V;
      }
      function Zo(e, t, n, r, o, i, s, a) {
        const l = _(),
          u = Z(),
          c = e + le,
          d = u.firstCreatePass
            ? (function D0(e, t, n, r, o, i, s, a, l) {
                const u = t.consts,
                  c = Pr(t, e, 4, s || null, In(u, a));
                Fu(t, n, c, In(u, l)), rs(t, c);
                const d = (c.tView = Ou(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, o, i, s)
            : u.data[c];
        Gt(d, !1);
        const f = l[W].createComment("");
        ys(u, l, f, d),
          He(f, l),
          As(l, (l[c] = Cg(f, l, f, d))),
          es(d) && Nu(u, l, d),
          null != s && xu(l, d, a);
      }
      function Ve(e, t, n) {
        const r = _();
        return ze(r, _r(), t) && pt(Z(), ce(), r, e, t, r[W], n, !1), Ve;
      }
      function Hu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Bu(e, n, t.inputs[s], s, r);
      }
      function O(e, t, n, r) {
        const o = _(),
          i = Z(),
          s = le + e,
          a = o[W],
          l = i.firstCreatePass
            ? (function E0(e, t, n, r, o, i) {
                const s = t.consts,
                  l = Pr(t, e, 2, r, In(s, o));
                return (
                  Fu(t, n, l, In(s, i)),
                  null !== l.attrs && Rs(l, l.attrs, !1),
                  null !== l.mergedAttrs && Rs(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          u = (o[s] = eu(
            a,
            t,
            (function PE() {
              return L.lFrame.currentNamespace;
            })()
          )),
          c = es(l);
        return (
          Gt(l, !0),
          Cp(a, u, l),
          32 != (32 & l.flags) && ys(i, o, u, l),
          0 ===
            (function yE() {
              return L.lFrame.elementDepthCount;
            })() && He(u, o),
          (function vE() {
            L.lFrame.elementDepthCount++;
          })(),
          c && (Nu(i, o, l), Ru(i, l, o)),
          null !== r && xu(o, l),
          O
        );
      }
      function B() {
        let e = ke();
        El()
          ? (function bl() {
              L.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Gt(e, !1));
        const t = e;
        !(function _E() {
          L.lFrame.elementDepthCount--;
        })();
        const n = Z();
        return (
          n.firstCreatePass && (rs(n, e), Dl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function jE(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Hu(n, t, _(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function BE(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Hu(n, t, _(), t.stylesWithoutHost, !1),
          B
        );
      }
      function Se(e, t, n, r) {
        return O(e, t, n, r), B(), Se;
      }
      function Yo(e) {
        return !!e && "function" == typeof e.then;
      }
      const Wu = function Ug(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Ge(e, t, n, r) {
        const o = _(),
          i = Z(),
          s = ke();
        return (
          (function zg(e, t, n, r, o, i, s) {
            const a = es(r),
              u = e.firstCreatePass && Eg(e),
              c = t[ye],
              d = wg(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = ct(r, t),
                m = s ? s(g) : g,
                v = d.length,
                w = s ? (R) => s(Pe(R[r.index])) : r.index;
              let y = null;
              if (
                (!s &&
                  a &&
                  (y = (function M0(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[pr],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== y)
              )
                ((y.__ngLastListenerFn__ || y).__ngNextListenerFn__ = i),
                  (y.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Wg(r, t, c, i, !1);
                const R = n.listen(m, o, i);
                d.push(i, R), u && u.push(o, w, v, v + 1);
              }
            } else i = Wg(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let m = 0; m < g; m += 2) {
                  const ne = t[p[m]][p[m + 1]].subscribe(i),
                    we = d.length;
                  d.push(i, ne), u && u.push(o, r.index, we, -(we + 1));
                }
            }
          })(i, o, o[W], s, e, t, r),
          Ge
        );
      }
      function Gg(e, t, n, r) {
        try {
          return wt(6, t, n), !1 !== n(r);
        } catch (o) {
          return Sg(e, o), !1;
        } finally {
          wt(7, t, n);
        }
      }
      function Wg(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Vu(e.componentOffset > -1 ? dt(e.index, t) : t);
          let l = Gg(t, n, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = Gg(t, n, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Fs(e, t, n) {
        return qu(e, "", t, "", n), Fs;
      }
      function qu(e, t, n, r, o) {
        const i = _(),
          s = Lr(i, t, n, r);
        return s !== V && pt(Z(), ce(), i, e, s, i[W], o, !1), qu;
      }
      function Ps(e, t) {
        return (e << 17) | (t << 2);
      }
      function Tn(e) {
        return (e >> 17) & 32767;
      }
      function Ku(e) {
        return 2 | e;
      }
      function nr(e) {
        return (131068 & e) >> 2;
      }
      function Zu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Yu(e) {
        return 1 | e;
      }
      function tm(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? Tn(i) : nr(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          k0(e[a], t) && ((l = !0), (e[a + 1] = r ? Yu(c) : Ku(c))),
            (a = r ? Tn(c) : nr(c));
        }
        l && (e[n + 1] = r ? Ku(i) : Yu(i));
      }
      function k0(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Mr(e, t) >= 0)
        );
      }
      function ks(e, t) {
        return (
          (function Ft(e, t, n, r) {
            const o = _(),
              i = Z(),
              s = fn(2);
            i.firstUpdatePass &&
              (function cm(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Ye()],
                    s = (function um(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function pm(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function G0(e, t, n, r) {
                      const o = (function Ml(e) {
                        const t = L.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Qo((n = Qu(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = Qu(o, e, t, n, r)), null === i)) {
                            let l = (function W0(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== nr(r)) return e[Tn(r)];
                            })(e, t, r);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = Qu(null, e, t, l[1], r)),
                              (l = Qo(l, t.attrs, r)),
                              (function q0(e, t, n, r) {
                                e[Tn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, l));
                          } else
                            i = (function K0(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Qo(r, e[i].hostAttrs, n);
                              return Qo(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function F0(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = Tn(s),
                        l = nr(s);
                      e[r] = n;
                      let c,
                        u = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || Mr(n, c) > 0) && (u = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== l) {
                          const f = Tn(e[a + 1]);
                          (e[r + 1] = Ps(f, a)),
                            0 !== f && (e[f + 1] = Zu(e[f + 1], r)),
                            (e[a + 1] = (function x0(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Ps(a, 0)),
                            0 !== a && (e[a + 1] = Zu(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Ps(l, 0)),
                          0 === a ? (a = r) : (e[l + 1] = Zu(e[l + 1], r)),
                          (l = r);
                      u && (e[r + 1] = Ku(e[r + 1])),
                        tm(e, c, r, !0),
                        tm(e, c, r, !1),
                        (function P0(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            Mr(i, t) >= 0 &&
                            (n[r + 1] = Yu(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = Ps(a, l)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== V &&
                ze(o, s, t) &&
                (function fm(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const l = e.data,
                    u = l[a + 1],
                    c = (function O0(e) {
                      return 1 == (1 & e);
                    })(u)
                      ? hm(l, t, n, o, nr(u), s)
                      : void 0;
                  Ls(c) ||
                    (Ls(i) ||
                      ((function N0(e) {
                        return 2 == (2 & e);
                      })(u) &&
                        (i = hm(l, null, n, o, a, s))),
                    (function Wb(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : rt.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= rt.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, ts(Ye(), n), o, i));
                })(
                  i,
                  i.data[Ye()],
                  o,
                  o[W],
                  e,
                  (o[s + 1] = (function Q0(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = oe(An(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          ks
        );
      }
      function Qu(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = Qo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Qo(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                ft(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function hm(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[o + 1];
          f === V && (f = d ? Y : void 0);
          let h = d ? Bl(f, r) : c === r ? f : void 0;
          if ((u && !Ls(h) && (h = Bl(l, r)), Ls(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? Tn(p) : nr(p);
        }
        if (null !== t) {
          let l = i ? t.residualClasses : t.residualStyles;
          null != l && (a = Bl(l, r));
        }
        return a;
      }
      function Ls(e) {
        return void 0 !== e;
      }
      function $(e, t = "") {
        const n = _(),
          r = Z(),
          o = e + le,
          i = r.firstCreatePass ? Pr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Jl(e, t) {
            return e.createText(t);
          })(n[W], t));
        ys(r, n, s, i), Gt(i, !1);
      }
      function Rn(e) {
        return Xu("", e, ""), Rn;
      }
      function Xu(e, t, n) {
        const r = _(),
          o = Lr(r, e, t, n);
        return o !== V && mn(r, Ye(), o), Xu;
      }
      function Vs(e, t, n, r, o, i, s) {
        const a = _(),
          l = jr(a, e, t, n, r, o, i, s);
        return l !== V && mn(a, Ye(), l), Vs;
      }
      const qr = "en-US";
      let Pm = qr;
      function tc(e, t, n, r, o) {
        if (((e = N(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) tc(e[i], t, n, r, o);
        else {
          const i = Z(),
            s = _();
          let a = er(e) ? e : N(e.provide),
            l = Hp(e);
          const u = ke(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (er(e) || !e.multi) {
            const h = new Io(l, o, D),
              p = rc(a, t, o ? c : c + f, d);
            -1 === p
              ? (kl(us(u, s), i, a),
                nc(i, e, t.length),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(h),
                s.push(h))
              : ((n[p] = h), (s[p] = h));
          } else {
            const h = rc(a, t, c + f, d),
              p = rc(a, t, c, c + f),
              m = p >= 0 && n[p];
            if ((o && !m) || (!o && !(h >= 0 && n[h]))) {
              kl(us(u, s), i, a);
              const v = (function gA(e, t, n, r, o) {
                const i = new Io(e, n, D);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  sy(i, o, r && !n),
                  i
                );
              })(o ? pA : hA, n.length, o, r, l);
              !o && m && (n[p].providerFactory = v),
                nc(i, e, t.length, 0),
                t.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                n.push(v),
                s.push(v);
            } else nc(i, e, h > -1 ? h : p, sy(n[o ? p : h], l, !o && r));
            !o && r && m && n[p].componentProviders++;
          }
        }
      }
      function nc(e, t, n, r) {
        const o = er(t),
          i = (function ES(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const l = (i ? N(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const c = u.indexOf(n);
              -1 === c ? u.push(n, [r, l]) : u[c + 1].push(r, l);
            } else u.push(n, l);
          }
        }
      }
      function sy(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function rc(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function hA(e, t, n, r) {
        return oc(this.multi, []);
      }
      function pA(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Qn(n, n[b], this.providerFactory.index, r);
          (i = a.slice(0, s)), oc(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), oc(o, i);
        return i;
      }
      function oc(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function ue(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function fA(e, t, n) {
              const r = Z();
              if (r.firstCreatePass) {
                const o = Nt(e);
                tc(n, r.data, r.blueprint, o, !0),
                  tc(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Kr {}
      class ay {}
      class ly extends Kr {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Mg(this));
          const r = lt(t);
          (this._bootstrapComponents = gn(r.bootstrap)),
            (this._r3Injector = og(
              t,
              n,
              [
                { provide: Kr, useValue: this },
                { provide: Ho, useValue: this.componentFactoryResolver },
              ],
              oe(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class ic extends ay {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new ly(this.moduleType, t);
        }
      }
      class yA extends Kr {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Mg(this)),
            (this.instance = null);
          const o = new Up(
            [
              ...t,
              { provide: Kr, useValue: this },
              { provide: Ho, useValue: this.componentFactoryResolver },
            ],
            n || bs(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Hs(e, t, n = null) {
        return new yA(e, t, n).injector;
      }
      let vA = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Vp(0, n.type),
                o =
                  r.length > 0
                    ? Hs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = I({
            token: e,
            providedIn: "environment",
            factory: () => new e(M(qt)),
          })),
          e
        );
      })();
      function uy(e) {
        e.getStandaloneInjector = (t) =>
          t.get(vA).getOrCreateStandaloneInjector(e);
      }
      function zs(e, t, n) {
        const r = Ze() + e,
          o = _();
        return o[r] === V
          ? Yt(o, r, n ? t.call(n) : t())
          : (function Ko(e, t) {
              return e[t];
            })(o, r);
      }
      function Zr(e, t, n, r) {
        return (function my(e, t, n, r, o, i) {
          const s = t + n;
          return ze(e, s, o)
            ? Yt(e, s + 1, i ? r.call(i, o) : r(o))
            : (function ri(e, t) {
                const n = e[t];
                return n === V ? void 0 : n;
              })(e, s + 1);
        })(_(), Ze(), e, t, n, r);
      }
      function ac(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const ge = class UA extends rn {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = ac(i)), o && (o = ac(o)), s && (s = ac(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof mt && t.add(a), a;
        }
      };
      let yn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = WA), e;
      })();
      const zA = yn,
        GA = class extends zA {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = Ms(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[Eo] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[zt];
            return (
              null !== s && (o[zt] = s.createEmbeddedView(r)),
              Tu(r, o, t),
              new Wo(o)
            );
          }
        };
      function WA() {
        return (function Gs(e, t) {
          return 4 & e.type ? new GA(t, e, Nr(e, t)) : null;
        })(ke(), _());
      }
      let kt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = qA), e;
      })();
      function qA() {
        return (function Ey(e, t) {
          let n;
          const r = t[e.index];
          if (Rt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Pe(r);
            else {
              const i = t[W];
              o = i.createComment("");
              const s = ct(e, t);
              Jn(
                i,
                ms(i, s),
                o,
                (function Hb(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = Cg(r, t, o, e)), As(t, n);
          }
          return new Cy(n, e, t);
        })(ke(), _());
      }
      const KA = kt,
        Cy = class extends KA {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Nr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Cr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Pl(this._hostTNode, this._hostLView);
            if (Ih(t)) {
              const n = as(t, this._hostLView),
                r = ss(t);
              return new Cr(n[b].data[r + 8], n);
            }
            return new Cr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = wy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Ke;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Ro(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new qo(J(t)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(qt, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[b];
            if (
              (function mE(e) {
                return Rt(e[he]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[he],
                  f = new Cy(d, d[$e], d[he]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Vb(e, t, n, r) {
              const o = Ke + r,
                i = n.length;
              r > 0 && (n[o - 1][Tt] = t),
                r < i - Ke
                  ? ((t[Tt] = n[o]), jh(n, Ke + r, t))
                  : (n.push(t), (t[Tt] = null)),
                (t[he] = n);
              const s = t[Eo];
              null !== s &&
                n !== s &&
                (function jb(e, t) {
                  const n = e[yr];
                  t[Ue] !== t[he][he][Ue] && (e[th] = !0),
                    null === n ? (e[yr] = [t]) : n.push(t);
                })(s, t);
              const a = t[zt];
              null !== a && a.insertView(e), (t[U] |= 64);
            })(o, r, s, i);
            const a = ou(i, s),
              l = r[W],
              u = ms(l, s[Xi]);
            return (
              null !== u &&
                (function Pb(e, t, n, r, o, i) {
                  (r[cn] = o), (r[$e] = t), Vo(e, r, n, 1, o, i);
                })(o, s[$e], l, r, u, a),
              t.attachToViewContainerRef(),
              jh(uc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = wy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = tu(this._lContainer, n);
            r && (fs(uc(this._lContainer), n), up(r[b], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = tu(this._lContainer, n);
            return r && null != fs(uc(this._lContainer), n) ? new Wo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function wy(e) {
        return e[Ji];
      }
      function uc(e) {
        return e[Ji] || (e[Ji] = []);
      }
      function qs(...e) {}
      const Ks = new S("Application Initializer");
      let Zs = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = qs),
              (this.reject = qs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Yo(i)) n.push(i);
                else if (Wu(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ks, 8));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const si = new S("AppId", {
        providedIn: "root",
        factory: function Zy() {
          return `${Dc()}${Dc()}${Dc()}`;
        },
      });
      function Dc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Yy = new S("Platform Initializer"),
        Cc = new S("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let wT = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const vn = new S("LocaleId", {
        providedIn: "root",
        factory: () =>
          G(vn, x.Optional | x.SkipSelf) ||
          (function ET() {
            return (typeof $localize < "u" && $localize.locale) || qr;
          })(),
      });
      class ST {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Qy = (() => {
        class e {
          compileModuleSync(n) {
            return new ic(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = gn(lt(n).declarations).reduce((s, a) => {
                const l = J(a);
                return l && s.push(new qo(l)), s;
              }, []);
            return new ST(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const AT = (() => Promise.resolve(0))();
      function wc(e) {
        typeof Zone > "u"
          ? AT.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class ve {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ge(!1)),
            (this.onMicrotaskEmpty = new ge(!1)),
            (this.onStable = new ge(!1)),
            (this.onError = new ge(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function TT() {
              let e = ae.requestAnimationFrame,
                t = ae.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function xT(e) {
              const t = () => {
                !(function NT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ae, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                bc(e),
                                (e.isCheckStableRunning = !0),
                                Ec(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    bc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return ev(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      tv(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return ev(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), tv(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          bc(e),
                          Ec(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ve.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (ve.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, RT, qs, qs);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const RT = {};
      function Ec(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function bc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ev(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function tv(e) {
        e._nesting--, Ec(e);
      }
      class OT {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ge()),
            (this.onMicrotaskEmpty = new ge()),
            (this.onStable = new ge()),
            (this.onError = new ge());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const nv = new S(""),
        Ys = new S("");
      let Ic,
        Sc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Ic ||
                  ((function FT(e) {
                    Ic = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ve.assertNotInAngularZone(),
                        wc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                wc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(ve), M(Mc), M(Ys));
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Mc = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Ic?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const _n = !1;
      let Nn = null;
      const rv = new S("AllowMultipleToken"),
        Ac = new S("PlatformDestroyListeners"),
        ov = new S("appBootstrapListener");
      class iv {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function av(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new S(r);
        return (i = []) => {
          let s = Tc();
          if (!s || s.injector.get(rv, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function LT(e) {
                  if (Nn && !Nn.get(rv, !1)) throw new C(400, !1);
                  Nn = e;
                  const t = e.get(uv);
                  (function sv(e) {
                    const t = e.get(Yy, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function lv(e = [], t) {
                    return Kt.create({
                      name: t,
                      providers: [
                        { provide: yu, useValue: "platform" },
                        { provide: Ac, useValue: new Set([() => (Nn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function jT(e) {
            const t = Tc();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function Tc() {
        return Nn?.get(uv) ?? null;
      }
      let uv = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function dv(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new OT()
                      : ("zone.js" === e ? void 0 : e) || new ve(t)),
                  n
                );
              })(
                r?.ngZone,
                (function cv(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: ve, useValue: o }];
            return o.run(() => {
              const s = Kt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(xr, null);
              if (!l) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const u = o.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Xs(this._modules, a), u.unsubscribe();
                  });
                }),
                (function fv(e, t, n) {
                  try {
                    const r = n();
                    return Yo(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const u = a.injector.get(Zs);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function km(e) {
                          vt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Pm = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(vn, qr) || qr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = hv({}, r);
            return (function PT(e, t, n) {
              const r = new ic(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Qs);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Ac, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Kt));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function hv(e, t) {
        return Array.isArray(t) ? t.reduce(hv, e) : { ...e, ...t };
      }
      let Qs = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new me((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new me((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    ve.assertNotInAngularZone(),
                      wc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  ve.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function Fw(...e) {
              const t = yo(e),
                n = (function Iw(e, t) {
                  return "number" == typeof sl(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? yt(r[0])
                  : dr(n)(Ee(r, t))
                : $t;
            })(
              i,
              s.pipe(
                (function Pw(e = {}) {
                  const {
                    connector: t = () => new rn(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Oe((g, m) => {
                      u++, !d && !c && f();
                      const v = (l = l ?? t());
                      m.add(() => {
                        u--, 0 === u && !d && !c && (a = al(p, o));
                      }),
                        v.subscribe(m),
                        !s &&
                          u > 0 &&
                          ((s = new mo({
                            next: (w) => v.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = al(h, n, w)), v.error(w);
                            },
                            complete: () => {
                              (c = !0), f(), (a = al(h, r)), v.complete();
                            },
                          })),
                          yt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof zp;
            if (!this._injector.get(Zs).done) {
              !o &&
                (function hr(e) {
                  const t = J(e) || Be(e) || nt(e);
                  return null !== t && t.standalone;
                })(n);
              throw new C(405, _n);
            }
            let s;
            (s = o ? n : this._injector.get(Ho).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function kT(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Kr),
              u = s.create(Kt.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(nv, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Xs(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Xs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(ov, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Xs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(ve), M(qt), M(xr));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Xs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Js = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = $T), e;
      })();
      function $T(e) {
        return (function UT(e, t, n) {
          if (So(e) && !n) {
            const r = dt(e.index, t);
            return new Wo(r, r);
          }
          return 47 & e.type ? new Wo(t[Ue], t) : null;
        })(ke(), _(), 16 == (16 & e));
      }
      class vv {
        constructor() {}
        supports(t) {
          return xs(t);
        }
        create(t) {
          return new KT(t);
        }
      }
      const qT = (e, t) => t;
      class KT {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || qT);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Dv(r, o, i)) ? n : r,
              a = Dv(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !xs(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function y0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new ZT(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new _v()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new _v()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class ZT {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class YT {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class _v {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new YT()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Dv(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class Cv {
        constructor() {}
        supports(t) {
          return t instanceof Map || Uu(t);
        }
        create() {
          return new QT();
        }
      }
      class QT {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Uu(t))) throw new C(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new XT(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class XT {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function wv() {
        return new na([new vv()]);
      }
      let na = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || wv()),
              deps: [[e, new Oo(), new xo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = I({ token: e, providedIn: "root", factory: wv })), e;
      })();
      function Ev() {
        return new ai([new Cv()]);
      }
      let ai = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Ev()),
              deps: [[e, new Oo(), new xo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = I({ token: e, providedIn: "root", factory: Ev })), e;
      })();
      const tR = av(null, "core", []);
      let nR = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Qs));
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = _t({})),
          e
        );
      })();
      function Xr(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Fc = null;
      function Dn() {
        return Fc;
      }
      class iR {}
      const Je = new S("DocumentToken");
      let Pc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({
            token: e,
            factory: function () {
              return (function sR() {
                return M(bv);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const aR = new S("Location Initialized");
      let bv = (() => {
        class e extends Pc {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Dn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Dn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Dn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            Sv() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            Sv()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Je));
          }),
          (e.ɵprov = I({
            token: e,
            factory: function () {
              return (function lR() {
                return new bv(M(Je));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Sv() {
        return !!window.history.pushState;
      }
      function kc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Mv(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Cn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let ir = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({
            token: e,
            factory: function () {
              return G(Av);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Iv = new S("appBaseHref");
      let Av = (() => {
          class e extends ir {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  G(Je).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return kc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Cn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Cn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Cn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Pc), M(Iv, 8));
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        uR = (() => {
          class e extends ir {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = kc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Cn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Cn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Pc), M(Iv, 8));
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Lc = (() => {
          class e {
            constructor(n) {
              (this._subject = new ge()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function fR(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(Mv(Tv(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Cn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function dR(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, Tv(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Cn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Cn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Cn),
            (e.joinWithSlash = kc),
            (e.stripTrailingSlash = Mv),
            (e.ɵfac = function (n) {
              return new (n || e)(M(ir));
            }),
            (e.ɵprov = I({
              token: e,
              factory: function () {
                return (function cR() {
                  return new Lc(M(ir));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function Tv(e) {
        return e.replace(/\/index.html$/, "");
      }
      function Vv(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(i);
        }
        return null;
      }
      const qc = /\s+/,
        jv = [];
      let Bv = (() => {
        class e {
          constructor(n, r, o, i) {
            (this._iterableDiffers = n),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this.initialClasses = jv),
              (this.stateMap = new Map());
          }
          set klass(n) {
            this.initialClasses = null != n ? n.trim().split(qc) : jv;
          }
          set ngClass(n) {
            this.rawClass = "string" == typeof n ? n.trim().split(qc) : n;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set)
              for (const r of n) this._updateState(r, !0);
            else if (null != n)
              for (const r of Object.keys(n))
                this._updateState(r, Boolean(n[r]));
            this._applyStateDiff();
          }
          _updateState(n, r) {
            const o = this.stateMap.get(n);
            void 0 !== o
              ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
                (o.touched = !0))
              : this.stateMap.set(n, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const n of this.stateMap) {
              const r = n[0],
                o = n[1];
              o.changed
                ? (this._toggleClass(r, o.enabled), (o.changed = !1))
                : o.touched ||
                  (o.enabled && this._toggleClass(r, !1),
                  this.stateMap.delete(r)),
                (o.touched = !1);
            }
          }
          _toggleClass(n, r) {
            (n = n.trim()).length > 0 &&
              n.split(qc).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(na), D(ai), D(ht), D(pn));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          e
        );
      })();
      class YR {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let fa = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new YR(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Hv(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              Hv(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(kt), D(yn), D(na));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Hv(e, t) {
        e.context.$implicit = t.item;
      }
      let bN = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = _t({})),
          e
        );
      })();
      let AN = (() => {
        class e {}
        return (
          (e.ɵprov = I({
            token: e,
            providedIn: "root",
            factory: () => new TN(M(Je), window),
          })),
          e
        );
      })();
      class TN {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function RN(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Kv(this.window.history) ||
              Kv(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Kv(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Zv {}
      class rx extends iR {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class ed extends rx {
        static makeCurrent() {
          !(function oR(e) {
            Fc || (Fc = e);
          })(new ed());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function ox() {
            return (
              (di = di || document.querySelector("base")),
              di ? di.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function ix(e) {
                (ga = ga || document.createElement("a")),
                  ga.setAttribute("href", e);
                const t = ga.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          di = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return Vv(document.cookie, t);
        }
      }
      let ga,
        di = null;
      const e_ = new S("TRANSITION_ID"),
        ax = [
          {
            provide: Ks,
            useFactory: function sx(e, t, n) {
              return () => {
                n.get(Zs).donePromise.then(() => {
                  const r = Dn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [e_, Je, Kt],
            multi: !0,
          },
        ];
      let ux = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ma = new S("EventManagerPlugins");
      let ya = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(ma), M(ve));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class t_ {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = Dn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let n_ = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        fi = (() => {
          class e extends n_ {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Je));
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const td = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        nd = /%COMP%/g,
        i_ = new S("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function s_(e, t) {
        return t.flat(100).map((n) => n.replace(nd, e));
      }
      function a_(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let rd = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new od(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof c_
                ? o.applyToHost(n)
                : o instanceof id && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                l = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case Ht.Emulated:
                  i = new c_(s, a, r, this.appId, l);
                  break;
                case Ht.ShadowDom:
                  return new mx(s, a, n, r);
                default:
                  i = new id(s, a, r, l);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(ya), M(fi), M(si), M(i_));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class od {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(td[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (u_(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (u_(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = td[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = td[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (rt.DashCase | rt.Important)
            ? t.style.setProperty(n, r, o & rt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & rt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, a_(r))
            : this.eventManager.addEventListener(t, n, a_(r));
        }
      }
      function u_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class mx extends od {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = s_(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class id extends od {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = s_(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class c_ extends id {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function hx(e) {
              return "_ngcontent-%COMP%".replace(nd, e);
            })(s)),
            (this.hostAttr = (function px(e) {
              return "_nghost-%COMP%".replace(nd, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let yx = (() => {
        class e extends t_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Je));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const d_ = ["alt", "control", "meta", "shift"],
        vx = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        _x = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let Dx = (() => {
        class e extends t_ {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Dn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              d_.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = vx[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                d_.forEach((s) => {
                  s !== o && (0, _x[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Je));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bx = av(tR, "browser", [
          { provide: Cc, useValue: "browser" },
          {
            provide: Yy,
            useValue: function Cx() {
              ed.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Je,
            useFactory: function Ex() {
              return (
                (function Qb(e) {
                  lu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        p_ = new S(""),
        g_ = [
          {
            provide: Ys,
            useClass: class lx {
              addToWindow(t) {
                (ae.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ae.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ae.getAllAngularRootElements = () => t.getAllRootElements()),
                  ae.frameworkStabilizers || (ae.frameworkStabilizers = []),
                  ae.frameworkStabilizers.push((r) => {
                    const o = ae.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Dn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: nv, useClass: Sc, deps: [ve, Mc, Ys] },
          { provide: Sc, useClass: Sc, deps: [ve, Mc, Ys] },
        ],
        m_ = [
          { provide: yu, useValue: "root" },
          {
            provide: xr,
            useFactory: function wx() {
              return new xr();
            },
            deps: [],
          },
          { provide: ma, useClass: yx, multi: !0, deps: [Je, ve, Cc] },
          { provide: ma, useClass: Dx, multi: !0, deps: [Je] },
          { provide: rd, useClass: rd, deps: [ya, fi, si, i_] },
          { provide: Wp, useExisting: rd },
          { provide: n_, useExisting: fi },
          { provide: fi, useClass: fi, deps: [Je] },
          { provide: ya, useClass: ya, deps: [ma, ve] },
          { provide: Zv, useClass: ux, deps: [] },
          [],
        ];
      let Sx = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: si, useValue: n.appId },
                  { provide: e_, useExisting: si },
                  ax,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(p_, 12));
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = _t({ providers: [...m_, ...g_], imports: [bN, nR] })),
            e
          );
        })(),
        y_ = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(Je));
            }),
            (e.ɵprov = I({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function Ix() {
                        return new y_(M(Je));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function A(...e) {
        return Ee(e, yo(e));
      }
      typeof window < "u" && window;
      class Bt extends rn {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const va = po(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: Ox } = Array,
        { getPrototypeOf: Fx, prototype: Px, keys: kx } = Object;
      function D_(e) {
        if (1 === e.length) {
          const t = e[0];
          if (Ox(t)) return { args: t, keys: null };
          if (
            (function Lx(e) {
              return e && "object" == typeof e && Fx(e) === Px;
            })(t)
          ) {
            const n = kx(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: Vx } = Array;
      function C_(e) {
        return z((t) =>
          (function jx(e, t) {
            return Vx(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function w_(e, t) {
        return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
      }
      function E_(...e) {
        const t = yo(e),
          n = Vf(e),
          { args: r, keys: o } = D_(e);
        if (0 === r.length) return Ee([], t);
        const i = new me(
          (function Bx(e, t, n = Wn) {
            return (r) => {
              b_(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    b_(
                      t,
                      () => {
                        const u = Ee(e[l], t);
                        let c = !1;
                        u.subscribe(
                          Te(
                            r,
                            (d) => {
                              (i[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, o ? (s) => w_(o, s) : Wn)
        );
        return n ? i.pipe(C_(n)) : i;
      }
      function b_(e, t, n) {
        e ? on(n, e, t) : t();
      }
      function ld(...e) {
        return (function $x() {
          return dr(1);
        })()(Ee(e, yo(e)));
      }
      function S_(e) {
        return new me((t) => {
          yt(e()).subscribe(t);
        });
      }
      function hi(e, t) {
        const n = re(e) ? e : () => e,
          r = (o) => o.error(n());
        return new me(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function ud() {
        return Oe((e, t) => {
          let n = null;
          e._refCount++;
          const r = Te(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class M_ extends me {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            bf(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new mt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Te(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = mt.EMPTY));
          }
          return t;
        }
        refCount() {
          return ud()(this);
        }
      }
      function Jt(e, t) {
        return Oe((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Te(
              r,
              (l) => {
                o?.unsubscribe();
                let u = 0;
                const c = i++;
                yt(e(l, c)).subscribe(
                  (o = Te(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Jr(e) {
        return e <= 0
          ? () => $t
          : Oe((t, n) => {
              let r = 0;
              t.subscribe(
                Te(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function En(e, t) {
        return Oe((n, r) => {
          let o = 0;
          n.subscribe(Te(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function _a(e) {
        return Oe((t, n) => {
          let r = !1;
          t.subscribe(
            Te(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function I_(e = Hx) {
        return Oe((t, n) => {
          let r = !1;
          t.subscribe(
            Te(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function Hx() {
        return new va();
      }
      function On(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? En((o, i) => e(o, i, r)) : Wn,
            Jr(1),
            n ? _a(t) : I_(() => new va())
          );
      }
      function Fn(e, t) {
        return re(t) ? Fe(e, t, 1) : Fe(e, 1);
      }
      function We(e, t, n) {
        const r = re(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Oe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Te(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : Wn;
      }
      function Pn(e) {
        return Oe((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Te(n, void 0, void 0, (s) => {
              (i = yt(e(s, Pn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function A_(e, t) {
        return Oe(
          (function zx(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                l = t,
                u = 0;
              i.subscribe(
                Te(
                  s,
                  (c) => {
                    const d = u++;
                    (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
                  },
                  o &&
                    (() => {
                      a && s.next(l), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function cd(e) {
        return e <= 0
          ? () => $t
          : Oe((t, n) => {
              let r = [];
              t.subscribe(
                Te(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function T_(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? En((o, i) => e(o, i, r)) : Wn,
            cd(1),
            n ? _a(t) : I_(() => new va())
          );
      }
      function dd(e) {
        return Oe((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const j = "primary",
        pi = Symbol("RouteTitle");
      class qx {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function eo(e) {
        return new qx(e);
      }
      function Kx(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function en(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !R_(e[o], t[o]))) return !1;
        return !0;
      }
      function R_(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function N_(e) {
        return Array.prototype.concat.apply([], e);
      }
      function x_(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function je(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function kn(e) {
        return Wu(e) ? e : Yo(e) ? Ee(Promise.resolve(e)) : A(e);
      }
      const Da = !1,
        Yx = {
          exact: function P_(e, t, n) {
            if (
              !sr(e.segments, t.segments) ||
              !Ca(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !P_(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: k_,
        },
        O_ = {
          exact: function Qx(e, t) {
            return en(e, t);
          },
          subset: function Xx(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => R_(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function F_(e, t, n) {
        return (
          Yx[n.paths](e.root, t.root, n.matrixParams) &&
          O_[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function k_(e, t, n) {
        return L_(e, t, t.segments, n);
      }
      function L_(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!sr(o, n) || t.hasChildren() || !Ca(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!sr(e.segments, n) || !Ca(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !k_(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(sr(e.segments, o) && Ca(e.segments, o, r) && e.children[j]) &&
            L_(e.children[j], t, i, r)
          );
        }
      }
      function Ca(e, t, n) {
        return t.every((r, o) => O_[n](e[o].parameters, r.parameters));
      }
      class Ln {
        constructor(t = new q([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = eo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return tO.serialize(this);
        }
      }
      class q {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            je(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return wa(this);
        }
      }
      class gi {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = eo(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return B_(this);
        }
      }
      function sr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let mi = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({
            token: e,
            factory: function () {
              return new fd();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class fd {
        parse(t) {
          const n = new cO(t);
          return new Ln(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${yi(t.root, !0)}`,
            r = (function oO(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ea(n)}=${Ea(o)}`).join("&")
                    : `${Ea(n)}=${Ea(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function nO(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const tO = new fd();
      function wa(e) {
        return e.segments.map((t) => B_(t)).join("/");
      }
      function yi(e, t) {
        if (!e.hasChildren()) return wa(e);
        if (t) {
          const n = e.children[j] ? yi(e.children[j], !1) : "",
            r = [];
          return (
            je(e.children, (o, i) => {
              i !== j && r.push(`${i}:${yi(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function eO(e, t) {
            let n = [];
            return (
              je(e.children, (r, o) => {
                o === j && (n = n.concat(t(r, o)));
              }),
              je(e.children, (r, o) => {
                o !== j && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === j ? [yi(e.children[j], !1)] : [`${o}:${yi(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[j]
            ? `${wa(e)}/${n[0]}`
            : `${wa(e)}/(${n.join("//")})`;
        }
      }
      function V_(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ea(e) {
        return V_(e).replace(/%3B/gi, ";");
      }
      function hd(e) {
        return V_(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ba(e) {
        return decodeURIComponent(e);
      }
      function j_(e) {
        return ba(e.replace(/\+/g, "%20"));
      }
      function B_(e) {
        return `${hd(e.path)}${(function rO(e) {
          return Object.keys(e)
            .map((t) => `;${hd(t)}=${hd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const iO = /^[^\/()?;=#]+/;
      function Sa(e) {
        const t = e.match(iO);
        return t ? t[0] : "";
      }
      const sO = /^[^=?&#]+/,
        lO = /^[^&#]+/;
      class cO {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new q([], {})
              : new q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[j] = new q(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Sa(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new C(4009, Da);
          return this.capture(t), new gi(ba(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Sa(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Sa(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[ba(n)] = ba(r);
        }
        parseQueryParam(t) {
          const n = (function aO(e) {
            const t = e.match(sO);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function uO(e) {
              const t = e.match(lO);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = j_(n),
            i = j_(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Sa(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, Da);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = j);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[j] : new q([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new C(4011, Da);
        }
      }
      function pd(e) {
        return e.segments.length > 0 ? new q([], { [j]: e }) : e;
      }
      function Ma(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Ma(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function dO(e) {
          if (1 === e.numberOfChildren && e.children[j]) {
            const t = e.children[j];
            return new q(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new q(e.segments, t));
      }
      function ar(e) {
        return e instanceof Ln;
      }
      const gd = !1;
      function fO(e, t, n, r, o) {
        if (0 === n.length) return to(t.root, t.root, t.root, r, o);
        const i = (function G_(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new z_(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  je(i.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new z_(n, t, r);
        })(n);
        return i.toRoot()
          ? to(t.root, t.root, new q([], {}), r, o)
          : (function s(l) {
              const u = (function pO(e, t, n, r) {
                  if (e.isAbsolute) return new no(t.root, !0, 0);
                  if (-1 === r) return new no(n, n === t.root, 0);
                  return (function W_(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new C(4005, gd && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new no(r, !1, o - i);
                  })(n, r + (vi(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? ro(u.segmentGroup, u.index, i.commands)
                  : md(u.segmentGroup, u.index, i.commands);
              return to(t.root, u.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function vi(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function _i(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function to(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          je(r, (l, u) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : H_(e, t, n));
        const a = pd(Ma(s));
        return new Ln(a, i, o);
      }
      function H_(e, t, n) {
        const r = {};
        return (
          je(e.children, (o, i) => {
            r[i] = o === t ? n : H_(o, t, n);
          }),
          new q(e.segments, r)
        );
      }
      class z_ {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && vi(r[0]))
          )
            throw new C(
              4003,
              gd && "Root segment cannot have matrix parameters"
            );
          const o = r.find(_i);
          if (o && o !== x_(r))
            throw new C(4004, gd && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class no {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function md(e, t, n) {
        if (
          (e || (e = new q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ro(e, t, n);
        const r = (function mO(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (_i(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!K_(l, u, s)) return i;
                r += 2;
              } else {
                if (!K_(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new q(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[j] = new q(e.segments.slice(r.pathIndex), e.children)),
            ro(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new q(e.segments, {})
          : r.match && !e.hasChildren()
          ? yd(e, t, n)
          : r.match
          ? ro(e, 0, o)
          : yd(e, t, n);
      }
      function ro(e, t, n) {
        if (0 === n.length) return new q(e.segments, {});
        {
          const r = (function gO(e) {
              return _i(e[0]) ? e[0].outlets : { [j]: e };
            })(n),
            o = {};
          if (
            !r[j] &&
            e.children[j] &&
            1 === e.numberOfChildren &&
            0 === e.children[j].segments.length
          ) {
            const i = ro(e.children[j], t, n);
            return new q(e.segments, i.children);
          }
          return (
            je(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = md(e.children[s], t, i));
            }),
            je(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new q(e.segments, o)
          );
        }
      }
      function yd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (_i(i)) {
            const l = yO(i.outlets);
            return new q(r, l);
          }
          if (0 === o && vi(n[0])) {
            r.push(new gi(e.segments[t].path, q_(n[0]))), o++;
            continue;
          }
          const s = _i(i) ? i.outlets[j] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && vi(a)
            ? (r.push(new gi(s, q_(a))), (o += 2))
            : (r.push(new gi(s, {})), o++);
        }
        return new q(r, {});
      }
      function yO(e) {
        const t = {};
        return (
          je(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = yd(new q([], {}), 0, n));
          }),
          t
        );
      }
      function q_(e) {
        const t = {};
        return je(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function K_(e, t, n) {
        return e == n.path && en(t, n.parameters);
      }
      const Di = "imperative";
      class tn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class vd extends tn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class lr extends tn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Ia extends tn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Aa extends tn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class _d extends tn {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class vO extends tn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _O extends tn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class DO extends tn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class CO extends tn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class wO extends tn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class EO {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class bO {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class SO {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class MO {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class IO {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class AO {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Z_ {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let NO = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return fO(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        OO = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({
              token: e,
              factory: function (t) {
                return NO.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Y_ {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Dd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Dd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Cd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Cd(t, this._root).map((n) => n.value);
        }
      }
      function Dd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Dd(e, n);
          if (r) return r;
        }
        return null;
      }
      function Cd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Cd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class bn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function oo(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Q_ extends Y_ {
        constructor(t, n) {
          super(t), (this.snapshot = n), wd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function X_(e, t) {
        const n = (function FO(e, t) {
            const s = new Ta([], {}, {}, "", {}, j, t, null, e.root, -1, {});
            return new eD("", new bn(s, []));
          })(e, t),
          r = new Bt([new gi("", {})]),
          o = new Bt({}),
          i = new Bt({}),
          s = new Bt({}),
          a = new Bt(""),
          l = new Vn(r, o, s, a, i, j, t, n.root);
        return (l.snapshot = n.root), new Q_(new bn(l, []), n);
      }
      class Vn {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(z((u) => u[pi])) ?? A(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(z((t) => eo(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(z((t) => eo(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function J_(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function PO(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Ta {
        get title() {
          return this.data?.[pi];
        }
        constructor(t, n, r, o, i, s, a, l, u, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = eo(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = eo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class eD extends Y_ {
        constructor(t, n) {
          super(n), (this.url = t), wd(this, n);
        }
        toString() {
          return tD(this._root);
        }
      }
      function wd(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => wd(e, n));
      }
      function tD(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(tD).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Ed(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            en(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            en(t.params, n.params) || e.params.next(n.params),
            (function Zx(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!en(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            en(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function bd(e, t) {
        const n =
          en(e.params, t.params) &&
          (function Jx(e, t) {
            return (
              sr(e, t) && e.every((n, r) => en(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || bd(e.parent, t.parent))
        );
      }
      function Ci(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function LO(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ci(e, r, o);
              return Ci(e, r);
            });
          })(e, t, n);
          return new bn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ci(e, a))),
                s
              );
            }
          }
          const r = (function VO(e) {
              return new Vn(
                new Bt(e.url),
                new Bt(e.params),
                new Bt(e.queryParams),
                new Bt(e.fragment),
                new Bt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ci(e, i));
          return new bn(r, o);
        }
      }
      const Sd = "ngNavigationCancelingError";
      function nD(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = ar(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = rD(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function rD(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Sd] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function oD(e) {
        return iD(e) && ar(e.url);
      }
      function iD(e) {
        return e && e[Sd];
      }
      class jO {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new wi()),
            (this.attachRef = null);
        }
      }
      let wi = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new jO()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ra = !1;
      let Md = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = j),
              (this.activateEvents = new ge()),
              (this.deactivateEvents = new ge()),
              (this.attachEvents = new ge()),
              (this.detachEvents = new ge()),
              (this.parentContexts = G(wi)),
              (this.location = G(kt)),
              (this.changeDetector = G(Js)),
              (this.environmentInjector = G(qt));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new C(4012, Ra);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new C(4012, Ra);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new C(4012, Ra);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new C(4013, Ra);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new BO(n, a, o.injector);
            if (
              r &&
              (function $O(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = o.createComponent(u, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Ct],
          })),
          e
        );
      })();
      class BO {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Vn
            ? this.route
            : t === wi
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Id = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [uy],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Se(0, "router-outlet");
            },
            dependencies: [Md],
            encapsulation: 2,
          })),
          e
        );
      })();
      function sD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = Hs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Td(e) {
        const t = e.children && e.children.map(Td),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== j &&
            (n.component = Id),
          n
        );
      }
      function It(e) {
        return e.outlet || j;
      }
      function aD(e, t) {
        const n = e.filter((r) => It(r) === t);
        return n.push(...e.filter((r) => It(r) !== t)), n;
      }
      function Ei(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class WO {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Ed(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = oo(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            je(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = oo(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = oo(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = oo(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new AO(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new MO(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Ed(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Ed(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ei(o.snapshot),
                l = a?.get(Ho) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class lD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Na {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function qO(e, t, n) {
        const r = e._root;
        return bi(r, t ? t._root : null, n, [r.value]);
      }
      function io(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Uw(e) {
              return null !== zi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function bi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = oo(t);
        return (
          e.children.forEach((s) => {
            (function ZO(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function YO(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !sr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !sr(e.url, t.url) || !en(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !bd(e, t) || !en(e.queryParams, t.queryParams);
                    default:
                      return !bd(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new lD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  bi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Na(a.outlet.component, s));
              } else
                s && Si(t, a, o),
                  o.canActivateChecks.push(new lD(r)),
                  bi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          je(i, (s, a) => Si(s, n.getContext(a), o)),
          o
        );
      }
      function Si(e, t, n) {
        const r = oo(e),
          o = e.value;
        je(r, (i, s) => {
          Si(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Na(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Mi(e) {
        return "function" == typeof e;
      }
      function Rd(e) {
        return e instanceof va || "EmptyError" === e?.name;
      }
      const xa = Symbol("INITIAL_VALUE");
      function so() {
        return Jt((e) =>
          E_(
            e.map((t) =>
              t.pipe(
                Jr(1),
                (function Ux(...e) {
                  const t = yo(e);
                  return Oe((n, r) => {
                    (t ? ld(e, n, t) : ld(e, n)).subscribe(r);
                  });
                })(xa)
              )
            )
          ).pipe(
            z((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === xa) return xa;
                  if (!1 === n || n instanceof Ln) return n;
                }
              return !0;
            }),
            En((t) => t !== xa),
            Jr(1)
          )
        );
      }
      function uD(e) {
        return (function aw(...e) {
          return Cf(e);
        })(
          We((t) => {
            if (ar(t)) throw nD(0, t);
          }),
          z((t) => !0 === t)
        );
      }
      const Nd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function cD(e, t, n, r, o) {
        const i = xd(e, t, n);
        return i.matched
          ? (function hF(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? A(
                    o.map((s) => {
                      const a = io(s, e);
                      return kn(
                        (function nF(e) {
                          return e && Mi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(so(), uD())
                : A(!0);
            })((r = sD(t, r)), t, n).pipe(z((s) => (!0 === s ? i : { ...Nd })))
          : A(i);
      }
      function xd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Nd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || Kx)(n, e, t);
        if (!o) return { ...Nd };
        const i = {};
        je(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Oa(e, t, n, r) {
        if (
          n.length > 0 &&
          (function mF(e, t, n) {
            return n.some((r) => Fa(e, t, r) && It(r) !== j);
          })(e, n, r)
        ) {
          const i = new q(
            t,
            (function gF(e, t, n, r) {
              const o = {};
              (o[j] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && It(i) !== j) {
                  const s = new q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[It(i)] = s);
                }
              return o;
            })(e, t, r, new q(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function yF(e, t, n) {
            return n.some((r) => Fa(e, t, r));
          })(e, n, r)
        ) {
          const i = new q(
            e.segments,
            (function pF(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (Fa(e, n, s) && !o[It(s)]) {
                  const a = new q([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[It(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new q(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function Fa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function dD(e, t, n, r) {
        return (
          !!(It(e) === r || (r !== j && Fa(t, n, e))) &&
          ("**" === e.path || xd(t, e, n).matched)
        );
      }
      function fD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Pa = !1;
      class ka {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class hD {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Ii(e) {
        return hi(new ka(e));
      }
      function pD(e) {
        return hi(new hD(e));
      }
      class CF {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Oa(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new q(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, j)
            .pipe(
              z((i) =>
                this.createUrlTree(
                  Ma(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Pn((i) => {
                if (i instanceof hD)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof ka ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, j)
            .pipe(
              z((o) => this.createUrlTree(Ma(o), t.queryParams, t.fragment))
            )
            .pipe(
              Pn((o) => {
                throw o instanceof ka ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new C(4002, Pa);
        }
        createUrlTree(t, n, r) {
          const o = pd(t);
          return new Ln(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(z((i) => new q([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Ee(o).pipe(
            Fn((i) => {
              const s = r.children[i],
                a = aD(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                z((l) => ({ segment: l, outlet: i }))
              );
            }),
            A_((i, s) => ((i[s.outlet] = s.segment), i), {}),
            T_()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Ee(r).pipe(
            Fn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                Pn((u) => {
                  if (u instanceof ka) return A(null);
                  throw u;
                })
              )
            ),
            On((a) => !!a),
            Pn((a, l) => {
              if (Rd(a)) return fD(n, o, i) ? A(new q([], {})) : Ii(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return dD(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Ii(n)
            : Ii(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? pD(i)
            : this.lineralizeSegments(r, i).pipe(
                Fe((s) => {
                  const a = new q(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = xd(n, o, i);
          if (!a) return Ii(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? pD(d)
            : this.lineralizeSegments(o, d).pipe(
                Fe((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = sD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    z(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new q(o, {})
                      )
                    )
                  )
                : A(new q(o, {})))
            : cD(n, r, o, t).pipe(
                Jt(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Fe((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Oa(
                                n,
                                a,
                                l,
                                f
                              ),
                              g = new q(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                z((y) => new q(a, y))
                              );
                            if (0 === f.length && 0 === p.length)
                              return A(new q(a, {}));
                            const m = It(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              m ? j : i,
                              !0
                            ).pipe(
                              z((w) => new q(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : Ii(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function fF(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? A(!0)
                    : A(
                        o.map((s) => {
                          const a = io(s, e);
                          return kn(
                            (function XO(e) {
                              return e && Mi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(so(), uD());
                })(t, n, r).pipe(
                  Fe((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          We((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function _F(e) {
                          return hi(rD(Pa, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return A(r);
            if (o.numberOfChildren > 1 || !o.children[j])
              return t.redirectTo, hi(new C(4e3, Pa));
            o = o.children[j];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Ln(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            je(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            je(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new q(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new C(4001, Pa);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class EF {}
      class MF {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Oa(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            j
          ).pipe(
            z((n) => {
              if (null === n) return null;
              const r = new Ta(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  j,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new bn(r, n),
                i = new eD(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = J_(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return Ee(Object.keys(r.children)).pipe(
            Fn((o) => {
              const i = r.children[o],
                s = aD(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            A_((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function Gx(e, t = !1) {
              return Oe((n, r) => {
                let o = 0;
                n.subscribe(
                  Te(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            _a(null),
            T_(),
            z((o) => {
              if (null === o) return null;
              const i = mD(o);
              return (
                (function IF(e) {
                  e.sort((t, n) =>
                    t.value.outlet === j
                      ? -1
                      : n.value.outlet === j
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return Ee(n).pipe(
            Fn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            On((s) => !!s),
            Pn((s) => {
              if (Rd(s)) return fD(r, o, i) ? A([]) : A(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !dD(n, r, o, i)) return A(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? x_(o).parameters : {},
              l = vD(r) + o.length;
            s = A({
              snapshot: new Ta(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                _D(n),
                It(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                yD(r),
                l,
                DD(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = cD(r, n, o, t).pipe(
              z(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = vD(r) + l.length;
                  return {
                    snapshot: new Ta(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      _D(n),
                      It(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      yD(r),
                      d,
                      DD(n)
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            Jt((a) => {
              if (null === a) return A(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function AF(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Oa(
                  r,
                  u,
                  c,
                  f.filter((m) => void 0 === m.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  z((m) => (null === m ? null : [new bn(l, m)]))
                );
              if (0 === f.length && 0 === p.length) return A([new bn(l, [])]);
              const g = It(n) === i;
              return this.processSegment(d, f, h, p, g ? j : i).pipe(
                z((m) => (null === m ? null : [new bn(l, m)]))
              );
            })
          );
        }
      }
      function TF(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function mD(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!TF(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = mD(r.children);
          t.push(new bn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function yD(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function vD(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function _D(e) {
        return e.data || {};
      }
      function DD(e) {
        return e.resolve || {};
      }
      function CD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Od(e) {
        return Jt((t) => {
          const n = e(t);
          return n ? Ee(n).pipe(z(() => t)) : A(t);
        });
      }
      const ao = new S("ROUTES");
      let Fd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = G(Qy));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = kn(n.loadComponent()).pipe(
                z(ED),
                We((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                dd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new M_(r, () => new rn()).pipe(ud());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                z((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = N_(l.get(ao, [], x.Self | x.Optional))));
                  return { routes: u.map(Td), injector: l };
                }),
                dd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new M_(i, () => new rn()).pipe(ud());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return kn(n()).pipe(
              z(ED),
              Fe((r) =>
                r instanceof ay || Array.isArray(r)
                  ? A(r)
                  : Ee(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ED(e) {
        return (function LF(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Va = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new rn()),
              (this.configLoader = G(Fd)),
              (this.environmentInjector = G(qt)),
              (this.urlSerializer = G(mi)),
              (this.rootContexts = G(wi)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => A(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new bO(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new EO(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Bt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Di,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                En((r) => 0 !== r.id),
                z((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Jt((r) => {
                  let o = !1,
                    i = !1;
                  return A(r).pipe(
                    We((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Jt((s) => {
                      const a = n.browserUrlTree.toString(),
                        l =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Aa(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          $t
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          bD(s.source) && (n.browserUrlTree = s.extractedUrl),
                          A(s).pipe(
                            Jt((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new vd(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? $t
                                  : Promise.resolve(c)
                              );
                            }),
                            (function wF(e, t, n, r) {
                              return Jt((o) =>
                                (function DF(e, t, n, r, o) {
                                  return new CF(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  z((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            We((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function NF(e, t, n, r, o) {
                              return Fe((i) =>
                                (function SF(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new MF(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Jt((a) =>
                                        null === a
                                          ? (function bF(e) {
                                              return new me((t) => t.error(e));
                                            })(new EF())
                                          : A(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(z((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            We((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new vO(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new vd(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const m = X_(d, this.rootComponentType).snapshot;
                        return A(
                          (r = {
                            ...s,
                            targetSnapshot: m,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Aa(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          $t
                        );
                      }
                    }),
                    We((s) => {
                      const a = new _O(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    z(
                      (s) =>
                        (r = {
                          ...s,
                          guards: qO(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function oF(e, t) {
                      return Fe((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? A({ ...n, guardsResult: !0 })
                          : (function iF(e, t, n, r) {
                              return Ee(e).pipe(
                                Fe((o) =>
                                  (function dF(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? A(
                                          i.map((a) => {
                                            const l = Ei(t) ?? o,
                                              u = io(a, l);
                                            return kn(
                                              (function tF(e) {
                                                return e && Mi(e.canDeactivate);
                                              })(u)
                                                ? u.canDeactivate(e, t, n, r)
                                                : l.runInContext(() =>
                                                    u(e, t, n, r)
                                                  )
                                            ).pipe(On());
                                          })
                                        ).pipe(so())
                                      : A(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                On((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Fe((a) =>
                                a &&
                                (function QO(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function sF(e, t, n, r) {
                                      return Ee(t).pipe(
                                        Fn((o) =>
                                          ld(
                                            (function lF(e, t) {
                                              return (
                                                null !== e && t && t(new SO(e)),
                                                A(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function aF(e, t) {
                                              return (
                                                null !== e && t && t(new IO(e)),
                                                A(!0)
                                              );
                                            })(o.route, r),
                                            (function cF(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function KO(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    S_(() =>
                                                      A(
                                                        s.guards.map((l) => {
                                                          const u =
                                                              Ei(s.node) ?? n,
                                                            c = io(l, u);
                                                          return kn(
                                                            (function eF(e) {
                                                              return (
                                                                e &&
                                                                Mi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : u.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(On());
                                                        })
                                                      ).pipe(so())
                                                    )
                                                  );
                                              return A(i).pipe(so());
                                            })(e, o.path, n),
                                            (function uF(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return A(!0);
                                              const o = r.map((i) =>
                                                S_(() => {
                                                  const s = Ei(t) ?? n,
                                                    a = io(i, s);
                                                  return kn(
                                                    (function JO(e) {
                                                      return (
                                                        e && Mi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(On());
                                                })
                                              );
                                              return A(o).pipe(so());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        On((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : A(a)
                              ),
                              z((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    We((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), ar(s.guardsResult))
                      )
                        throw nD(0, s.guardsResult);
                      const a = new DO(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    En(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Od((s) => {
                      if (s.guards.canActivateChecks.length)
                        return A(s).pipe(
                          We((a) => {
                            const l = new CO(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Jt((a) => {
                            let l = !1;
                            return A(a).pipe(
                              (function xF(e, t) {
                                return Fe((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return A(n);
                                  let i = 0;
                                  return Ee(o).pipe(
                                    Fn((s) =>
                                      (function OF(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !CD(o) &&
                                            (i[pi] = o.title),
                                          (function FF(e, t, n, r) {
                                            const o = (function PF(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return A({});
                                            const i = {};
                                            return Ee(o).pipe(
                                              Fe((s) =>
                                                (function kF(e, t, n, r) {
                                                  const o = Ei(t) ?? r,
                                                    i = io(e, o);
                                                  return kn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  On(),
                                                  We((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              cd(1),
                                              (function Wx(e) {
                                                return z(() => e);
                                              })(i),
                                              Pn((s) => (Rd(s) ? $t : hi(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            z(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = J_(e, n).resolve),
                                                o &&
                                                  CD(o) &&
                                                  (e.data[pi] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    We(() => i++),
                                    cd(1),
                                    Fe((s) => (i === o.length ? A(n) : $t))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              We({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          We((a) => {
                            const l = new wO(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Od((s) => {
                      const a = (l) => {
                        const u = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              We((c) => {
                                l.component = c;
                              }),
                              z(() => {})
                            )
                          );
                        for (const c of l.children) u.push(...a(c));
                        return u;
                      };
                      return E_(a(s.targetSnapshot.root)).pipe(_a(), Jr(1));
                    }),
                    Od(() => this.afterPreactivation()),
                    z((s) => {
                      const a = (function kO(e, t, n) {
                        const r = Ci(e, t._root, n ? n._root : void 0);
                        return new Q_(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    We((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      z(
                        (r) => (
                          new WO(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Jr(1),
                    We({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new lr(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    dd(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Pn((s) => {
                      if (((i = !0), iD(s))) {
                        oD(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new Ia(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), oD(s))) {
                          const l = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            u = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || bD(r.source),
                            };
                          n.scheduleNavigation(l, Di, null, u, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new _d(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return $t;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Ia(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function bD(e) {
        return e !== Di;
      }
      let SD = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === j));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[pi];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({
              token: e,
              factory: function () {
                return G(VF);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        VF = (() => {
          class e extends SD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(y_));
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        jF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({
              token: e,
              factory: function () {
                return G($F);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class BF {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let $F = (() => {
        class e extends BF {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (t || (t = Le(e)))(r || e);
            };
          })()),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ja = new S("", { providedIn: "root", factory: () => ({}) });
      let HF = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({
              token: e,
              factory: function () {
                return G(zF);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        zF = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function GF(e) {
        throw e;
      }
      function WF(e, t, n) {
        return t.parse("/");
      }
      const qF = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        KF = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let st = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = G(wT)),
                (this.isNgZoneEnabled = !1),
                (this.options = G(ja, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || GF),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || WF),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = G(HF)),
                (this.routeReuseStrategy = G(jF)),
                (this.urlCreationStrategy = G(OO)),
                (this.titleStrategy = G(SD)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = N_(G(ao, { optional: !0 }) ?? [])),
                (this.navigationTransitions = G(Va)),
                (this.urlSerializer = G(mi)),
                (this.location = G(Lc)),
                (this.isNgZoneEnabled =
                  G(ve) instanceof ve && ve.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new Ln()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = X_(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = n.targetPageId);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                );
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n),
                (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const n = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Di, n);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((n) => {
                  const r = "popstate" === n.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(n.url, r, n.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(n, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const l = { ...o };
                delete l.navigationId,
                  delete l.ɵrouterPageId,
                  0 !== Object.keys(l).length && (i.state = l);
              }
              const a = this.parseUrl(n);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(Td)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(n, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: l,
                } = r,
                u = l ? this.currentUrlTree.fragment : s;
              let c = null;
              switch (a) {
                case "merge":
                  c = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = i || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                this.urlCreationStrategy.createUrlTree(
                  o,
                  this.routerState,
                  this.currentUrlTree,
                  n,
                  c,
                  u ?? null
                )
              );
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const o = ar(n) ? n : this.parseUrl(n),
                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
              return this.scheduleNavigation(i, Di, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function ZF(e) {
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (null == n) throw new C(4008, false);
                  }
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              let r;
              try {
                r = this.urlSerializer.parse(n);
              } catch (o) {
                r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
              }
              return r;
            }
            isActive(n, r) {
              let o;
              if (
                ((o = !0 === r ? { ...qF } : !1 === r ? { ...KF } : r), ar(n))
              )
                return F_(this.currentUrlTree, n, o);
              const i = this.parseUrl(n);
              return F_(this.currentUrlTree, i, o);
            }
            removeEmptyProps(n) {
              return Object.keys(n).reduce((r, o) => {
                const i = n[o];
                return null != i && (r[o] = i), r;
              }, {});
            }
            scheduleNavigation(n, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, l, u, c;
              return (
                s
                  ? ((a = s.resolve), (l = s.reject), (u = s.promise))
                  : (u = new Promise((d, f) => {
                      (a = d), (l = f);
                    })),
                (c =
                  "computed" === this.canceledNavigationResolution
                    ? o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: c,
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: i,
                  resolve: a,
                  reject: l,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(n, r) {
              const o = this.urlSerializer.serialize(n),
                i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, r.targetPageId),
                };
              this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
                ? this.location.replaceState(o, "", i)
                : this.location.go(o, "", i);
            }
            restoreHistory(n, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const o = this.currentPageId - n.targetPageId;
                ("popstate" !== n.source &&
                  "eager" !== this.urlUpdateStrategy &&
                  this.currentUrlTree !==
                    this.getCurrentNavigation()?.finalUrl) ||
                0 === o
                  ? this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === o &&
                    (this.resetState(n),
                    (this.browserUrlTree = n.currentUrlTree),
                    this.resetUrlToCurrentUrlTree())
                  : this.location.historyGo(o);
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = n.currentRouterState),
                (this.currentUrlTree = n.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(n, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        lo = (() => {
          class e {
            constructor(n, r, o, i, s, a) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new rn());
              const l = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === l || "area" === l),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe((u) => {
                      u instanceof lr && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(n) {
              this._preserveFragment = Xr(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = Xr(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = Xr(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(n, r, o, i, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== n ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const n =
                null === this.href
                  ? null
                  : (function Fp(e, t, n) {
                      return (function _S(e, t) {
                        return ("src" === t &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === t && ("base" === e || "link" === e))
                          ? Op
                          : $o;
                      })(
                        t,
                        n
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", n);
            }
            applyAttributeValue(n, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                D(st),
                D(Vn),
                (function ds(e) {
                  return (function zE(e, t) {
                    if ("class" === t) return e.classes;
                    if ("style" === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = n[o];
                        if (bh(i)) break;
                        if (0 === i) o += 2;
                        else if ("number" == typeof i)
                          for (o++; o < r && "string" == typeof n[o]; ) o++;
                        else {
                          if (i === t) return n[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(ke(), e);
                })("tabindex"),
                D(pn),
                D(ht),
                D(ir)
              );
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (n, r) {
                1 & n &&
                  Ge("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & n && Ot("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Ct],
            })),
            e
          );
        })();
      class MD {}
      let XF = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                En((n) => n instanceof lr),
                Fn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Hs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Ee(o).pipe(dr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const i = o.pipe(
                Fe((s) =>
                  null === s
                    ? A(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Ee([i, this.loader.loadComponent(r)]).pipe(dr())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(st), M(Qy), M(qt), M(MD), M(Fd));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const kd = new S("");
      let ID = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof vd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof lr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Z_ &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Z_(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function dg() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var gt = (() => (
        ((gt = gt || {})[(gt.COMPLETE = 0)] = "COMPLETE"),
        (gt[(gt.FAILED = 1)] = "FAILED"),
        (gt[(gt.REDIRECTING = 2)] = "REDIRECTING"),
        gt
      ))();
      const uo = !1;
      function jn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const Ld = new S("", { providedIn: "root", factory: () => !1 });
      function TD() {
        const e = G(Kt);
        return (t) => {
          const n = e.get(Qs);
          if (t !== n.components[0]) return;
          const r = e.get(st),
            o = e.get(RD);
          1 === e.get(Vd) && r.initialNavigation(),
            e.get(ND, null, x.Optional)?.setUpPreloading(),
            e.get(kd, null, x.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const RD = new S(uo ? "bootstrap done indicator" : "", {
          factory: () => new rn(),
        }),
        Vd = new S(uo ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function rP() {
        let e = [];
        return (
          (e = uo
            ? [
                {
                  provide: ws,
                  multi: !0,
                  useFactory: () => {
                    const t = G(st);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function TO(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          jn(1, e)
        );
      }
      const ND = new S(uo ? "router preloader" : "");
      function oP(e) {
        return jn(0, [
          { provide: ND, useExisting: XF },
          { provide: MD, useExisting: e },
        ]);
      }
      const Ai = !1,
        xD = new S(
          Ai ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        iP = [
          Lc,
          { provide: mi, useClass: fd },
          st,
          wi,
          {
            provide: Vn,
            useFactory: function AD(e) {
              return e.routerState.root;
            },
            deps: [st],
          },
          Fd,
          Ai ? { provide: Ld, useValue: !0 } : [],
        ];
      function sP() {
        return new iv("Router", st);
      }
      let OD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                iP,
                Ai && r?.enableTracing ? rP().ɵproviders : [],
                { provide: ao, multi: !0, useValue: n },
                {
                  provide: xD,
                  useFactory: cP,
                  deps: [[st, new xo(), new Oo()]],
                },
                { provide: ja, useValue: r || {} },
                r?.useHash
                  ? { provide: ir, useClass: uR }
                  : { provide: ir, useClass: Av },
                {
                  provide: kd,
                  useFactory: () => {
                    const e = G(AN),
                      t = G(ve),
                      n = G(ja),
                      r = G(Va),
                      o = G(mi);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new ID(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? oP(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: iv, multi: !0, useFactory: sP },
                r?.initialNavigation ? dP(r) : [],
                [
                  { provide: FD, useFactory: TD },
                  { provide: ov, multi: !0, useExisting: FD },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: ao, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(xD, 8));
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = _t({ imports: [Id] })),
          e
        );
      })();
      function cP(e) {
        if (Ai && e)
          throw new C(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function dP(e) {
        return [
          "disabled" === e.initialNavigation
            ? jn(3, [
                {
                  provide: Ks,
                  multi: !0,
                  useFactory: () => {
                    const t = G(st);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Vd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? jn(2, [
                { provide: Vd, useValue: 0 },
                {
                  provide: Ks,
                  multi: !0,
                  deps: [Kt],
                  useFactory: (t) => {
                    const n = t.get(aR, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(st),
                              i = t.get(RD);
                            (function JF(e, t) {
                              e.events
                                .pipe(
                                  En(
                                    (n) =>
                                      n instanceof lr ||
                                      n instanceof Ia ||
                                      n instanceof _d ||
                                      n instanceof Aa
                                  ),
                                  z((n) =>
                                    n instanceof lr || n instanceof Aa
                                      ? gt.COMPLETE
                                      : n instanceof Ia &&
                                        (0 === n.code || 1 === n.code)
                                      ? gt.REDIRECTING
                                      : gt.FAILED
                                  ),
                                  En((n) => n !== gt.REDIRECTING),
                                  Jr(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(Va).afterPreactivation = () => (
                                r(!0), i.closed ? A(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const FD = new S(Ai ? "Router Initializer" : "");
      let hP = (() => {
        class e {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-aboutproject"]],
            decls: 38,
            vars: 0,
            consts: [
              [1, "pageCenter"],
              [1, "container"],
              [1, "underline"],
              [1, "signature"],
            ],
            template: function (n, r) {
              1 & n &&
                (O(0, "div", 0)(1, "div", 1)(2, "h1"),
                $(
                  3,
                  " A little about my final project: Building a dynamic website with "
                ),
                O(4, "span", 2),
                $(5, "Angular"),
                B()(),
                Se(6, "hr"),
                O(7, "p"),
                $(8, " This is my final project for "),
                O(9, "span", 2),
                $(10, "IT-STEP Academy"),
                B(),
                $(11, " 6-month Front-End Course. "),
                Se(12, "br")(13, "br"),
                $(
                  14,
                  " I would like to express my gratitude to my instructor, "
                ),
                O(15, "span", 2),
                $(16, "Beka Baghaturia"),
                B(),
                $(
                  17,
                  ", for his expertise and guidance throughout this 6-month Front-End Course. His dedication to teaching us the latest technologies and tools in front-end development has been invaluable to completing this project. Thank you, "
                ),
                O(18, "span", 2),
                $(19, "Beka"),
                B(),
                $(20, ", for being a true professional in your field. "),
                Se(21, "br")(22, "br"),
                $(
                  23,
                  ' In this project, I have created a website centered around the popular TV show "Rick and Morty". The website uses an API to fetch information about various characters in the show and display them in a visually appealing way using Bootstrap 5 cards and carousel. '
                ),
                Se(24, "br")(25, "br"),
                $(
                  26,
                  " I have also implemented routing in my application, which allows users to easily navigate between different views and pages. My website features several components, each with a specific purpose. "
                ),
                Se(27, "br")(28, "br"),
                $(
                  29,
                  ' One of these components is a card component that displays information about a character, including their name, image, and other relevant details. To enhance the user experience, I have included a "Show Alters" button on each card. When the user clicks this button, the website displays other characters with the same first name as the one displayed on the card. This feature adds an extra layer of interactivity and engagement to the website. '
                ),
                Se(30, "br")(31, "br"),
                $(
                  32,
                  ' Overall, my Angular project about "Rick and Morty" showcases my skills in creating dynamic and responsive web applications using the latest technologies and tools. I hope that my website provides an enjoyable and informative experience for fans of the show and users alike. '
                ),
                Se(33, "br")(34, "br"),
                $(
                  35,
                  " By breaking the text into smaller paragraphs and adding some whitespace, it's easier for readers to follow the flow of information and understand the different components of the project. "
                ),
                B(),
                O(36, "div", 3),
                $(37, "David Chartolani"),
                B()()());
            },
            styles: [
              ".pageCenter[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:auto;margin-top:50px;width:100%}.container[_ngcontent-%COMP%]{position:relative;max-width:800px}@media screen and (max-width: 762px){.container[_ngcontent-%COMP%]{max-width:100%}}.underline[_ngcontent-%COMP%]{font-weight:700;font-style:italic}.signature[_ngcontent-%COMP%]{position:absolute;bottom:-2rem;right:10px;font-size:1.2em;font-weight:700;font-style:italic;text-decoration:underline}",
            ],
          })),
          e
        );
      })();
      class Ba {}
      class jd {}
      class Sn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const o = n.slice(0, r),
                                i = o.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((n) => {
                            let r = t[n];
                            const o = n.toLowerCase();
                            "string" == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(o, r),
                                this.maybeSetNormalizedName(n, o));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Sn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Sn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Sn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const i = t.value;
              if (i) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class pP {
        encodeKey(t) {
          return PD(t);
        }
        encodeValue(t) {
          return PD(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const mP = /%(\d[a-f0-9])/gi,
        yP = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function PD(e) {
        return encodeURIComponent(e).replace(mP, (t, n) => yP[n] ?? t);
      }
      function $a(e) {
        return `${e}`;
      }
      class Bn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new pP()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function gP(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, i)),
                                t.decodeValue(o.slice(i + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map($a) : [$a(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    n.push({ param: r, value: i, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Bn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push($a(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf($a(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class vP {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function kD(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function LD(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function VD(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Ti {
        constructor(t, n, r, o) {
          let i;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function _P(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Sn()),
            this.context || (this.context = new vP()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Bn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : kD(this.body) ||
              LD(this.body) ||
              VD(this.body) ||
              (function DP(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Bn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || VD(this.body)
            ? null
            : LD(this.body)
            ? this.body.type || null
            : kD(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Bn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            i = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            u = t.params || this.params;
          const c = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (u = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                u
              )),
            new Ti(n, r, i, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var Ae = (() => (
        ((Ae = Ae || {})[(Ae.Sent = 0)] = "Sent"),
        (Ae[(Ae.UploadProgress = 1)] = "UploadProgress"),
        (Ae[(Ae.ResponseHeader = 2)] = "ResponseHeader"),
        (Ae[(Ae.DownloadProgress = 3)] = "DownloadProgress"),
        (Ae[(Ae.Response = 4)] = "Response"),
        (Ae[(Ae.User = 5)] = "User"),
        Ae
      ))();
      class Bd {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Sn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class $d extends Bd {
        constructor(t = {}) {
          super(t), (this.type = Ae.ResponseHeader);
        }
        clone(t = {}) {
          return new $d({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ua extends Bd {
        constructor(t = {}) {
          super(t),
            (this.type = Ae.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ua({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class jD extends Bd {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Ud(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let BD = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, o = {}) {
            let i;
            if (n instanceof Ti) i = n;
            else {
              let l, u;
              (l = o.headers instanceof Sn ? o.headers : new Sn(o.headers)),
                o.params &&
                  (u =
                    o.params instanceof Bn
                      ? o.params
                      : new Bn({ fromObject: o.params })),
                (i = new Ti(n, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: u,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = A(i).pipe(Fn((l) => this.handler.handle(l)));
            if (n instanceof Ti || "events" === o.observe) return s;
            const a = s.pipe(En((l) => l instanceof Ua));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(z((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Bn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, o = {}) {
            return this.request("PATCH", n, Ud(o, r));
          }
          post(n, r, o = {}) {
            return this.request("POST", n, Ud(o, r));
          }
          put(n, r, o = {}) {
            return this.request("PUT", n, Ud(o, r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Ba));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function $D(e, t) {
        return t(e);
      }
      function CP(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const EP = new S("HTTP_INTERCEPTORS"),
        Ri = new S("HTTP_INTERCEPTOR_FNS");
      function bP() {
        let e = null;
        return (t, n) => (
          null === e &&
            (e = (G(EP, { optional: !0 }) ?? []).reduceRight(CP, $D)),
          e(t, n)
        );
      }
      let UD = (() => {
        class e extends Ba {
          constructor(n, r) {
            super(),
              (this.backend = n),
              (this.injector = r),
              (this.chain = null);
          }
          handle(n) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(Ri)));
              this.chain = r.reduceRight(
                (o, i) =>
                  (function wP(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (i) => e(i, o)));
                  })(o, i, this.injector),
                $D
              );
            }
            return this.chain(n, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(jd), M(qt));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const AP = /^\)\]\}',?\n/;
      let zD = (() => {
        class e {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new me((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(n.method, n.urlWithParams),
                n.withCredentials && (o.withCredentials = !0),
                n.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = n.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new Sn(o.getAllResponseHeaders()),
                    g =
                      (function TP(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || n.url;
                  return (
                    (s = new $d({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: g,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: m } = a(),
                    v = null;
                  204 !== p &&
                    (v = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = v ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof v) {
                    const y = v;
                    v = v.replace(AP, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (R) {
                      (v = y), w && ((w = !1), (v = { error: R, text: v }));
                    }
                  }
                  w
                    ? (r.next(
                        new Ua({
                          body: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new jD({
                          error: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      );
                },
                u = (h) => {
                  const { url: p } = a(),
                    g = new jD({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(g);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: Ae.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: Ae.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", l),
                o.addEventListener("error", u),
                o.addEventListener("timeout", u),
                o.addEventListener("abort", u),
                n.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: Ae.Sent }),
                () => {
                  o.removeEventListener("error", u),
                    o.removeEventListener("abort", u),
                    o.removeEventListener("load", l),
                    o.removeEventListener("timeout", u),
                    n.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Zv));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Hd = new S("XSRF_ENABLED"),
        GD = new S("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        WD = new S("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class qD {}
      let xP = (() => {
        class e {
          constructor(n, r, o) {
            (this.doc = n),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = Vv(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(M(Je), M(Cc), M(GD));
          }),
          (e.ɵprov = I({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function OP(e, t) {
        const n = e.url.toLowerCase();
        if (
          !G(Hd) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = G(qD).getToken(),
          o = G(WD);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var Ce = (() => (
        ((Ce = Ce || {})[(Ce.Interceptors = 0)] = "Interceptors"),
        (Ce[(Ce.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (Ce[(Ce.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (Ce[(Ce.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (Ce[(Ce.JsonpSupport = 4)] = "JsonpSupport"),
        (Ce[(Ce.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        Ce
      ))();
      function co(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function FP(...e) {
        const t = [
          BD,
          zD,
          UD,
          { provide: Ba, useExisting: UD },
          { provide: jd, useExisting: zD },
          { provide: Ri, useValue: OP, multi: !0 },
          { provide: Hd, useValue: !0 },
          { provide: qD, useClass: xP },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function DS(e) {
          return { ɵproviders: e };
        })(t);
      }
      const KD = new S("LEGACY_INTERCEPTOR_FN");
      let kP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = _t({
              providers: [
                FP(
                  co(Ce.LegacyInterceptors, [
                    { provide: KD, useFactory: bP },
                    { provide: Ri, useExisting: KD, multi: !0 },
                  ])
                ),
              ],
            })),
            e
          );
        })(),
        zd = (() => {
          class e {
            constructor(n) {
              (this.http = n),
                (this.apiUrl = "https://rickandmortyapi.com/api/character");
            }
            getAllCharacters() {
              return this.http.get(this.apiUrl);
            }
            getCharacterByName(n) {
              return this.http.get(`${this.apiUrl}/?name=${n}`);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(M(BD));
            }),
            (e.ɵprov = I({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        ZD = (() => {
          class e {
            constructor(n, r) {
              (this._renderer = n),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, r);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(pn), D(ht));
            }),
            (e.ɵdir = P({ type: e })),
            e
          );
        })(),
        ur = (() => {
          class e extends ZD {}
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Le(e)))(r || e);
              };
            })()),
            (e.ɵdir = P({ type: e, features: [ee] })),
            e
          );
        })();
      const nn = new S("NgValueAccessor"),
        jP = { provide: nn, useExisting: ie(() => Ni), multi: !0 },
        $P = new S("CompositionEventMode");
      let Ni = (() => {
        class e extends ZD {
          constructor(n, r, o) {
            super(n, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function BP() {
                  const e = Dn() ? Dn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(pn), D(ht), D($P, 8));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Ge("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [ue([jP]), ee],
          })),
          e
        );
      })();
      const UP = !1,
        qe = new S("NgValidators"),
        Un = new S("NgAsyncValidators");
      function sC(e) {
        return null != e;
      }
      function aC(e) {
        const t = Yo(e) ? Ee(e) : e;
        if (UP && !Wu(t)) {
          let n = "Expected async validator to return Promise or Observable.";
          throw (
            ("object" == typeof e &&
              (n +=
                " Are you using a synchronous validator where an async validator is expected?"),
            new C(-1101, n))
          );
        }
        return t;
      }
      function lC(e) {
        let t = {};
        return (
          e.forEach((n) => {
            t = null != n ? { ...t, ...n } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function uC(e, t) {
        return t.map((n) => n(e));
      }
      function cC(e) {
        return e.map((t) =>
          (function zP(e) {
            return !e.validate;
          })(t)
            ? t
            : (n) => t.validate(n)
        );
      }
      function Gd(e) {
        return null != e
          ? (function dC(e) {
              if (!e) return null;
              const t = e.filter(sC);
              return 0 == t.length
                ? null
                : function (n) {
                    return lC(uC(n, t));
                  };
            })(cC(e))
          : null;
      }
      function Wd(e) {
        return null != e
          ? (function fC(e) {
              if (!e) return null;
              const t = e.filter(sC);
              return 0 == t.length
                ? null
                : function (n) {
                    return (function LP(...e) {
                      const t = Vf(e),
                        { args: n, keys: r } = D_(e),
                        o = new me((i) => {
                          const { length: s } = n;
                          if (!s) return void i.complete();
                          const a = new Array(s);
                          let l = s,
                            u = s;
                          for (let c = 0; c < s; c++) {
                            let d = !1;
                            yt(n[c]).subscribe(
                              Te(
                                i,
                                (f) => {
                                  d || ((d = !0), u--), (a[c] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (u || i.next(r ? w_(r, a) : a),
                                    i.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? o.pipe(C_(t)) : o;
                    })(uC(n, t).map(aC)).pipe(z(lC));
                  };
            })(cC(e))
          : null;
      }
      function hC(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function qd(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function za(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function mC(e, t) {
        const n = qd(t);
        return (
          qd(e).forEach((o) => {
            za(n, o) || n.push(o);
          }),
          n
        );
      }
      function yC(e, t) {
        return qd(t).filter((n) => !za(e, n));
      }
      class vC {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Gd(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = Wd(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, n) {
          return !!this.control && this.control.hasError(t, n);
        }
        getError(t, n) {
          return this.control ? this.control.getError(t, n) : null;
        }
      }
      class et extends vC {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Hn extends vC {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class _C {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let Kd = (() => {
          class e extends _C {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(Hn, 2));
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, r) {
                2 & n &&
                  ks("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [ee],
            })),
            e
          );
        })(),
        Zd = (() => {
          class e extends _C {
            constructor(n) {
              super(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(et, 10));
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, r) {
                2 & n &&
                  ks("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [ee],
            })),
            e
          );
        })();
      function DC(e, t) {
        return e ? `with name: '${t}'` : `at index: ${t}`;
      }
      const Xd = !1,
        xi = "VALID",
        Wa = "INVALID",
        fo = "PENDING",
        Oi = "DISABLED";
      function Jd(e) {
        return (qa(e) ? e.validators : e) || null;
      }
      function ef(e, t) {
        return (qa(t) ? t.asyncValidators : e) || null;
      }
      function qa(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class EC {
        constructor(t, n) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(n);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === xi;
        }
        get invalid() {
          return this.status === Wa;
        }
        get pending() {
          return this.status == fo;
        }
        get disabled() {
          return this.status === Oi;
        }
        get enabled() {
          return this.status !== Oi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(mC(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(mC(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(yC(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(yC(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return za(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return za(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((n) => {
              n.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((n) => {
              n.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = fo),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = Oi),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(t = {}) {
          const n = this._parentMarkedDirty(t.onlySelf);
          (this.status = xi),
            this._forEachChild((r) => {
              r.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: n }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === xi || this.status === fo) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((n) => n._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Oi : xi;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = fo), (this._hasOwnPendingAsyncValidator = !0);
            const n = aC(this.asyncValidator(this));
            this._asyncValidationSubscription = n.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, n = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== n.emitEvent);
        }
        get(t) {
          let n = t;
          return null == n ||
            (Array.isArray(n) || (n = n.split(".")), 0 === n.length)
            ? null
            : n.reduce((r, o) => r && r._find(o), this);
        }
        getError(t, n) {
          const r = n ? this.get(n) : this;
          return r && r.errors ? r.errors[t] : null;
        }
        hasError(t, n) {
          return !!this.getError(t, n);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new ge()), (this.statusChanges = new ge());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Oi
            : this.errors
            ? Wa
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(fo)
            ? fo
            : this._anyControlsHaveStatus(Wa)
            ? Wa
            : xi;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((n) => n.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          qa(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function QP(e) {
              return Array.isArray(e) ? Gd(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function XP(e) {
              return Array.isArray(e) ? Wd(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class tf extends EC {
        constructor(t, n, r) {
          super(Jd(n), ef(r, n)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(n),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, n) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = n),
              n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange),
              n);
        }
        addControl(t, n, r = {}) {
          this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, n, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            n && this.registerControl(t, n),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, n = {}) {
          (function wC(e, t, n) {
            e._forEachChild((r, o) => {
              if (void 0 === n[o])
                throw new C(
                  1002,
                  Xd
                    ? (function YP(e, t) {
                        return `Must supply a value for form control ${DC(
                          e,
                          t
                        )}`;
                      })(t, o)
                    : ""
                );
            });
          })(this, !0, t),
            Object.keys(t).forEach((r) => {
              (function CC(e, t, n) {
                const r = e.controls;
                if (!(t ? Object.keys(r) : r).length)
                  throw new C(
                    1e3,
                    Xd
                      ? (function KP(e) {
                          return `\n    There are no form controls registered with this ${
                            e ? "group" : "array"
                          } yet. If you're using ngModel,\n    you may want to check next tick (e.g. use setTimeout).\n  `;
                        })(t)
                      : ""
                  );
                if (!r[n])
                  throw new C(
                    1001,
                    Xd
                      ? (function ZP(e, t) {
                          return `Cannot find form control ${DC(e, t)}`;
                        })(t, n)
                      : ""
                  );
              })(this, !0, r),
                this.controls[r].setValue(t[r], {
                  onlySelf: !0,
                  emitEvent: n.emitEvent,
                });
            }),
            this.updateValueAndValidity(n);
        }
        patchValue(t, n = {}) {
          null != t &&
            (Object.keys(t).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(t[r], { onlySelf: !0, emitEvent: n.emitEvent });
            }),
            this.updateValueAndValidity(n));
        }
        reset(t = {}, n = {}) {
          this._forEachChild((r, o) => {
            r.reset(t[o], { onlySelf: !0, emitEvent: n.emitEvent });
          }),
            this._updatePristine(n),
            this._updateTouched(n),
            this.updateValueAndValidity(n);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, n, r) => ((t[r] = n.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (n, r) => !!r._syncPendingControls() || n
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((n) => {
            const r = this.controls[n];
            r && t(r, n);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [n, r] of Object.entries(this.controls))
            if (this.contains(n) && t(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, r, o) => ((r.enabled || this.disabled) && (n[o] = r.value), n)
          );
        }
        _reduceChildren(t, n) {
          let r = t;
          return (
            this._forEachChild((o, i) => {
              r = n(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const ho = new S("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Ka,
        }),
        Ka = "always";
      function Fi(e, t, n = Ka) {
        nf(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === n) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function t1(e, t) {
            t.valueAccessor.registerOnChange((n) => {
              (e._pendingValue = n),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && bC(e, t);
            });
          })(e, t),
          (function r1(e, t) {
            const n = (r, o) => {
              t.valueAccessor.writeValue(r), o && t.viewToModelUpdate(r);
            };
            e.registerOnChange(n),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(n);
              });
          })(e, t),
          (function n1(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && bC(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function e1(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const n = (r) => {
                t.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(n),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(n);
                });
            }
          })(e, t);
      }
      function Qa(e, t) {
        e.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(t);
        });
      }
      function nf(e, t) {
        const n = (function pC(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators(hC(n, t.validator))
          : "function" == typeof n && e.setValidators([n]);
        const r = (function gC(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(hC(r, t.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        Qa(t._rawValidators, o), Qa(t._rawAsyncValidators, o);
      }
      function bC(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const l1 = { provide: et, useExisting: ie(() => ki) },
        Pi = (() => Promise.resolve())();
      let ki = (() => {
        class e extends et {
          constructor(n, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new ge()),
              (this.form = new tf({}, Gd(n), Wd(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            Pi.then(() => {
              const r = this._findContainer(n.path);
              (n.control = r.registerControl(n.name, n.control)),
                Fi(n.control, n, this.callSetDisabledState),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            Pi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            Pi.then(() => {
              const r = this._findContainer(n.path),
                o = new tf({});
              (function SC(e, t) {
                nf(e, t);
              })(o, n),
                r.registerControl(n.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            Pi.then(() => {
              const r = this._findContainer(n.path);
              r && r.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, r) {
            Pi.then(() => {
              this.form.get(n.path).setValue(r);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function MC(e, t) {
                e._syncPendingControls(),
                  t.forEach((n) => {
                    const r = n.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (n.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(qe, 10), D(Un, 10), D(ho, 8));
          }),
          (e.ɵdir = P({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, r) {
              1 & n &&
                Ge("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [ue([l1]), ee],
          })),
          e
        );
      })();
      function IC(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      function AC(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const TC = class extends EC {
          constructor(t = null, n, r) {
            super(Jd(n), ef(r, n)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(n),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              qa(n) &&
                (n.nonNullable || n.initialValueIsDefault) &&
                (this.defaultValue = AC(t) ? t.value : t);
          }
          setValue(t, n = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== n.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== n.emitViewToModelChange)
                ),
              this.updateValueAndValidity(n);
          }
          patchValue(t, n = {}) {
            this.setValue(t, n);
          }
          reset(t = this.defaultValue, n = {}) {
            this._applyFormState(t),
              this.markAsPristine(n),
              this.markAsUntouched(n),
              this.setValue(this.value, n),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            IC(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            IC(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            AC(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        d1 = { provide: Hn, useExisting: ie(() => Ja) },
        xC = (() => Promise.resolve())();
      let Ja = (() => {
          class e extends Hn {
            constructor(n, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new TC()),
                (this._registered = !1),
                (this.update = new ge()),
                (this._parent = n),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function af(e, t) {
                  if (!t) return null;
                  let n, r, o;
                  return (
                    Array.isArray(t),
                    t.forEach((i) => {
                      i.constructor === Ni
                        ? (n = i)
                        : (function s1(e) {
                            return Object.getPrototypeOf(e.constructor) === ur;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || n || null
                  );
                })(0, i));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function sf(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const n = e.model;
                  return !!n.isFirstChange() || !Object.is(t, n.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Fi(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              xC.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const r = n.isDisabled.currentValue,
                o = 0 !== r && Xr(r);
              xC.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function Za(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                D(et, 9),
                D(qe, 10),
                D(Un, 10),
                D(nn, 10),
                D(Js, 8),
                D(ho, 8)
              );
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ue([d1]), ee, Ct],
            })),
            e
          );
        })(),
        lf = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })(),
        FC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = _t({})),
            e
          );
        })();
      const C1 = { provide: nn, useExisting: ie(() => Li), multi: !0 };
      function $C(e, t) {
        return null == e
          ? `${t}`
          : (t && "object" == typeof t && (t = "Object"),
            `${e}: ${t}`.slice(0, 50));
      }
      let Li = (() => {
          class e extends ur {
            constructor() {
              super(...arguments),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this._compareWith = Object.is);
            }
            set compareWith(n) {
              this._compareWith = n;
            }
            writeValue(n) {
              this.value = n;
              const o = $C(this._getOptionId(n), n);
              this.setProperty("value", o);
            }
            registerOnChange(n) {
              this.onChange = (r) => {
                (this.value = this._getOptionValue(r)), n(this.value);
              };
            }
            _registerOption() {
              return (this._idCounter++).toString();
            }
            _getOptionId(n) {
              for (const r of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(r), n)) return r;
              return null;
            }
            _getOptionValue(n) {
              const r = (function w1(e) {
                return e.split(":")[0];
              })(n);
              return this._optionMap.has(r) ? this._optionMap.get(r) : n;
            }
          }
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Le(e)))(r || e);
              };
            })()),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["select", "formControlName", "", 3, "multiple", ""],
                ["select", "formControl", "", 3, "multiple", ""],
                ["select", "ngModel", "", 3, "multiple", ""],
              ],
              hostBindings: function (n, r) {
                1 & n &&
                  Ge("change", function (i) {
                    return r.onChange(i.target.value);
                  })("blur", function () {
                    return r.onTouched();
                  });
              },
              inputs: { compareWith: "compareWith" },
              features: [ue([C1]), ee],
            })),
            e
          );
        })(),
        ff = (() => {
          class e {
            constructor(n, r, o) {
              (this._element = n),
                (this._renderer = r),
                (this._select = o),
                this._select && (this.id = this._select._registerOption());
            }
            set ngValue(n) {
              null != this._select &&
                (this._select._optionMap.set(this.id, n),
                this._setElementValue($C(this.id, n)),
                this._select.writeValue(this._select.value));
            }
            set value(n) {
              this._setElementValue(n),
                this._select && this._select.writeValue(this._select.value);
            }
            _setElementValue(n) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                n
              );
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(ht), D(pn), D(Li, 9));
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            e
          );
        })();
      const E1 = { provide: nn, useExisting: ie(() => hf), multi: !0 };
      function UC(e, t) {
        return null == e
          ? `${t}`
          : ("string" == typeof t && (t = `'${t}'`),
            t && "object" == typeof t && (t = "Object"),
            `${e}: ${t}`.slice(0, 50));
      }
      let hf = (() => {
          class e extends ur {
            constructor() {
              super(...arguments),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this._compareWith = Object.is);
            }
            set compareWith(n) {
              this._compareWith = n;
            }
            writeValue(n) {
              let r;
              if (((this.value = n), Array.isArray(n))) {
                const o = n.map((i) => this._getOptionId(i));
                r = (i, s) => {
                  i._setSelected(o.indexOf(s.toString()) > -1);
                };
              } else
                r = (o, i) => {
                  o._setSelected(!1);
                };
              this._optionMap.forEach(r);
            }
            registerOnChange(n) {
              this.onChange = (r) => {
                const o = [],
                  i = r.selectedOptions;
                if (void 0 !== i) {
                  const s = i;
                  for (let a = 0; a < s.length; a++) {
                    const u = this._getOptionValue(s[a].value);
                    o.push(u);
                  }
                } else {
                  const s = r.options;
                  for (let a = 0; a < s.length; a++) {
                    const l = s[a];
                    if (l.selected) {
                      const u = this._getOptionValue(l.value);
                      o.push(u);
                    }
                  }
                }
                (this.value = o), n(o);
              };
            }
            _registerOption(n) {
              const r = (this._idCounter++).toString();
              return this._optionMap.set(r, n), r;
            }
            _getOptionId(n) {
              for (const r of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(r)._value, n))
                  return r;
              return null;
            }
            _getOptionValue(n) {
              const r = (function b1(e) {
                return e.split(":")[0];
              })(n);
              return this._optionMap.has(r) ? this._optionMap.get(r)._value : n;
            }
          }
          return (
            (e.ɵfac = (function () {
              let t;
              return function (r) {
                return (t || (t = Le(e)))(r || e);
              };
            })()),
            (e.ɵdir = P({
              type: e,
              selectors: [
                ["select", "multiple", "", "formControlName", ""],
                ["select", "multiple", "", "formControl", ""],
                ["select", "multiple", "", "ngModel", ""],
              ],
              hostBindings: function (n, r) {
                1 & n &&
                  Ge("change", function (i) {
                    return r.onChange(i.target);
                  })("blur", function () {
                    return r.onTouched();
                  });
              },
              inputs: { compareWith: "compareWith" },
              features: [ue([E1]), ee],
            })),
            e
          );
        })(),
        pf = (() => {
          class e {
            constructor(n, r, o) {
              (this._element = n),
                (this._renderer = r),
                (this._select = o),
                this._select && (this.id = this._select._registerOption(this));
            }
            set ngValue(n) {
              null != this._select &&
                ((this._value = n),
                this._setElementValue(UC(this.id, n)),
                this._select.writeValue(this._select.value));
            }
            set value(n) {
              this._select
                ? ((this._value = n),
                  this._setElementValue(UC(this.id, n)),
                  this._select.writeValue(this._select.value))
                : this._setElementValue(n);
            }
            _setElementValue(n) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                n
              );
            }
            _setSelected(n) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "selected",
                n
              );
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(ht), D(pn), D(hf, 9));
            }),
            (e.ɵdir = P({
              type: e,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            e
          );
        })(),
        O1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = _t({ imports: [FC] })),
            e
          );
        })(),
        P1 = (() => {
          class e {
            static withConfig(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: ho, useValue: n.callSetDisabledState ?? Ka },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = _t({ imports: [O1] })),
            e
          );
        })();
      const k1 = function () {
          return ["/alters"];
        },
        L1 = function (e) {
          return { name: e };
        };
      function V1(e, t) {
        if (
          (1 & e &&
            (O(0, "div", 10)(1, "div", 11),
            Se(2, "img", 12),
            O(3, "div", 13)(4, "h5", 14),
            $(5),
            B(),
            O(6, "p"),
            $(7),
            B(),
            O(8, "p", 15),
            $(9),
            B(),
            O(10, "a", 16),
            $(11, "Show Alters"),
            B()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          de(2),
            Ve("src", n.image, $o),
            de(3),
            Rn(n.name),
            de(2),
            Rn(n.location.name),
            de(2),
            Vs(" ", n.species, " - ", n.gender, " - ", n.status, " "),
            de(1),
            Ve("routerLink", zs(8, k1))(
              "queryParams",
              Zr(9, L1, n.name.split(" ")[0])
            );
        }
      }
      let j1 = (() => {
        class e {
          constructor(n, r) {
            (this.rickAndMortyApiService = n),
              (this.router = r),
              (this.characters = []),
              (this.filteredCharacters = []),
              (this.name = ""),
              (this.gender = "All genders");
          }
          ngOnInit() {
            this.rickAndMortyApiService.getAllCharacters().subscribe((n) => {
              (this.characters = n.results),
                (this.filteredCharacters = n.results);
            });
          }
          filterCharacters() {
            this.filteredCharacters = this.characters.filter(
              (n) =>
                n.name.toLowerCase().includes(this.name.toLowerCase()) &&
                ("All genders" === this.gender || n.gender === this.gender)
            );
          }
          showAlters(n) {
            this.rickAndMortyApiService.getCharacterByName(n).subscribe((r) => {
              this.router.navigate(["/alters"], {
                state: { characters: r.results },
              });
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(zd), D(st));
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-card"]],
            decls: 16,
            vars: 3,
            consts: [
              ["for", "name"],
              [
                "type",
                "text",
                "id",
                "name",
                "name",
                "name",
                "placeholder",
                "Enter the name",
                3,
                "ngModel",
                "ngModelChange",
              ],
              ["id", "gender", "name", "gender", 3, "ngModel", "ngModelChange"],
              ["value", "All genders"],
              ["value", "Male"],
              ["value", "Female"],
              ["value", "unknown"],
              [1, "container", "mt-4"],
              [1, "row", "d-flex", "justify-content-center"],
              [
                "class",
                "col-md mb-2 d-flex justify-content-center",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "col-md", "mb-2", "d-flex", "justify-content-center"],
              [1, "card", 2, "width", "18rem"],
              ["alt", "card__image", 1, "card-img-top", 3, "src"],
              [1, "card-body"],
              [1, "card-title"],
              [1, "card-text"],
              [1, "btn", "btn-dark", 3, "routerLink", "queryParams"],
            ],
            template: function (n, r) {
              1 & n &&
                (O(0, "form")(1, "label", 0),
                $(2, "Name:"),
                B(),
                O(3, "input", 1),
                Ge("ngModelChange", function (i) {
                  return (r.name = i);
                })("ngModelChange", function () {
                  return r.filterCharacters();
                }),
                B(),
                O(4, "select", 2),
                Ge("ngModelChange", function (i) {
                  return (r.gender = i);
                })("ngModelChange", function () {
                  return r.filterCharacters();
                }),
                O(5, "option", 3),
                $(6, "All genders"),
                B(),
                O(7, "option", 4),
                $(8, "Male"),
                B(),
                O(9, "option", 5),
                $(10, "Female"),
                B(),
                O(11, "option", 6),
                $(12, "Unknown"),
                B()()(),
                O(13, "div", 7)(14, "div", 8),
                Zo(15, V1, 12, 11, "div", 9),
                B()()),
                2 & n &&
                  (de(3),
                  Ve("ngModel", r.name),
                  de(1),
                  Ve("ngModel", r.gender),
                  de(11),
                  Ve("ngForOf", r.filteredCharacters));
            },
            dependencies: [fa, lo, lf, ff, pf, Ni, Li, Kd, Zd, Ja, ki],
            styles: [
              "form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;width:40%;margin:0 auto}label[_ngcontent-%COMP%]{font-weight:700;margin-bottom:5px}input[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{padding:10px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;margin-bottom:15px;font-size:16px}input[type=text][_ngcontent-%COMP%]{width:100%}select[_ngcontent-%COMP%]{width:100%;height:40px}option[_ngcontent-%COMP%]{font-size:16px}.searchBtn[_ngcontent-%COMP%]{width:100%}",
            ],
          })),
          e
        );
      })();
      const XC = function (e) {
        return { active: e };
      };
      function B1(e, t) {
        if ((1 & e && Se(0, "button", 10), 2 & e)) {
          const n = t.index;
          Ve("ngClass", Zr(3, XC, 0 === n)),
            Ot("data-bs-slide-to", n)("aria-label", "Slide " + (n + 1));
        }
      }
      function $1(e, t) {
        if (
          (1 & e &&
            (O(0, "div", 11),
            Se(1, "img", 12),
            O(2, "div", 13)(3, "h5"),
            $(4),
            B(),
            O(5, "p"),
            $(6),
            B()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          Ve("ngClass", Zr(5, XC, 0 === t.index)),
            de(1),
            Fs("src", n.image, $o),
            Fs("alt", n.name),
            de(3),
            Rn(n.name),
            de(2),
            Rn(n.location.name);
        }
      }
      let U1 = (() => {
        class e {
          constructor(n) {
            (this.rickAndMortyApiService = n), (this.characters = []);
          }
          ngOnInit() {
            this.getCharacters();
          }
          getCharacters() {
            this.rickAndMortyApiService.getAllCharacters().subscribe((n) => {
              (this.characters = n.results), this.shuffleArray(this.characters);
            });
          }
          shuffleArray(n) {
            for (let r = n.length - 1; r > 0; r--) {
              const o = Math.floor(Math.random() * (r + 1));
              [n[r], n[o]] = [n[o], n[r]];
            }
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(D(zd));
          }),
          (e.ɵcmp = un({
            type: e,
            selectors: [["app-carousel"]],
            decls: 13,
            vars: 2,
            consts: [
              [
                "id",
                "carousel",
                "data-bs-ride",
                "carousel",
                "data-bs-interval",
                "5000",
                1,
                "carousel",
                "slide",
              ],
              [1, "carousel-indicators"],
              [
                "type",
                "button",
                "data-bs-target",
                "#carousel",
                "aria-current",
                "true",
                3,
                "ngClass",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "carousel-inner"],
              ["class", "carousel-item", 3, "ngClass", 4, "ngFor", "ngForOf"],
              [
                "type",
                "button",
                "data-bs-target",
                "#carousel",
                "data-bs-slide",
                "prev",
                1,
                "carousel-control-prev",
              ],
              ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
              [1, "visually-hidden"],
              [
                "type",
                "button",
                "data-bs-target",
                "#carousel",
                "data-bs-slide",
                "next",
                1,
                "carousel-control-next",
              ],
              ["aria-hidden", "true", 1, "carousel-control-next-icon"],
              [
                "type",
                "button",
                "data-bs-target",
                "#carousel",
                "aria-current",
                "true",
                3,
                "ngClass",
              ],
              [1, "carousel-item", 3, "ngClass"],
              [1, "", 3, "src", "alt"],
              [1, "carousel-caption", "d-none", "d-md-block"],
            ],
            template: function (n, r) {
              1 & n &&
                (O(0, "div", 0)(1, "div", 1),
                Zo(2, B1, 1, 5, "button", 2),
                B(),
                O(3, "div", 3),
                Zo(4, $1, 7, 7, "div", 4),
                B(),
                O(5, "button", 5),
                Se(6, "span", 6),
                O(7, "span", 7),
                $(8, "Previous"),
                B()(),
                O(9, "button", 8),
                Se(10, "span", 9),
                O(11, "span", 7),
                $(12, "Next"),
                B()()()),
                2 & n &&
                  (de(2),
                  Ve("ngForOf", r.characters),
                  de(2),
                  Ve("ngForOf", r.characters));
            },
            dependencies: [Bv, fa],
            styles: [
              ".carousel-inner[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:40%;object-fit:cover;opacity:.7}.carousel-item[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;max-height:750px;opacity:0;transition:opacity 0s;background-color:#000}.carousel-item.active[_ngcontent-%COMP%]{opacity:1}",
            ],
          })),
          e
        );
      })();
      const z1 = function () {
          return ["/alters"];
        },
        G1 = function (e) {
          return { name: e };
        };
      function W1(e, t) {
        if (
          (1 & e &&
            (O(0, "div", 10)(1, "div", 11),
            Se(2, "img", 12),
            O(3, "div", 13)(4, "h5", 14),
            $(5),
            B(),
            O(6, "p"),
            $(7),
            B(),
            O(8, "p", 15),
            $(9),
            B(),
            O(10, "a", 16),
            $(11, "Show Alters"),
            B()()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          de(2),
            Ve("src", n.image, $o),
            de(3),
            Rn(n.name),
            de(2),
            Rn(n.location.name),
            de(2),
            Vs(" ", n.species, " - ", n.gender, " - ", n.status, " "),
            de(1),
            Ve("routerLink", zs(8, z1))(
              "queryParams",
              Zr(9, G1, n.name.split(" ")[0])
            );
        }
      }
      const q1 = [
        { path: "", redirectTo: "/home", pathMatch: "full" },
        {
          path: "home",
          component: (() => {
            class e {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)();
              }),
              (e.ɵcmp = un({
                type: e,
                selectors: [["app-home"]],
                decls: 3,
                vars: 0,
                template: function (n, r) {
                  1 & n && Se(0, "app-carousel")(1, "hr")(2, "app-card");
                },
                dependencies: [j1, U1],
              })),
              e
            );
          })(),
        },
        { path: "aboutus", component: hP },
        {
          path: "alters",
          component: (() => {
            class e {
              constructor(n, r) {
                (this.rickAndMortyApiService = n),
                  (this.route = r),
                  (this.characters = []),
                  (this.firstName = ""),
                  (this.filteredCharacters = []),
                  (this.name = ""),
                  (this.gender = "All genders");
              }
              filterCharacters() {
                this.filteredCharacters = this.characters.filter(
                  (n) =>
                    n.name.toLowerCase().includes(this.name.toLowerCase()) &&
                    ("All genders" === this.gender || n.gender === this.gender)
                );
              }
              ngOnInit() {
                this.route.queryParams.subscribe((n) => {
                  (this.firstName = n.name),
                    this.getCharactersByName(this.firstName);
                }),
                  this.filterCharacters();
              }
              getCharactersByName(n) {
                this.rickAndMortyApiService
                  .getCharacterByName(n)
                  .subscribe((r) => {
                    (this.characters = r.results),
                      console.log("characters:", this.characters),
                      this.filterCharacters();
                  });
              }
            }
            return (
              (e.ɵfac = function (n) {
                return new (n || e)(D(zd), D(Vn));
              }),
              (e.ɵcmp = un({
                type: e,
                selectors: [["app-alters"]],
                decls: 16,
                vars: 3,
                consts: [
                  ["for", "name"],
                  [
                    "type",
                    "text",
                    "id",
                    "name",
                    "name",
                    "name",
                    "placeholder",
                    "Enter the name",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  [
                    "id",
                    "gender",
                    "name",
                    "gender",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["value", "All genders"],
                  ["value", "Male"],
                  ["value", "Female"],
                  ["value", "unknown"],
                  [1, "container", "mt-4"],
                  [1, "row", "d-flex", "justify-content-center"],
                  [
                    "class",
                    "col-md mb-2 d-flex justify-content-center",
                    4,
                    "ngFor",
                    "ngForOf",
                  ],
                  [1, "col-md", "mb-2", "d-flex", "justify-content-center"],
                  [1, "card", 2, "width", "18rem"],
                  ["alt", "card__image", 1, "card-img-top", 3, "src"],
                  [1, "card-body"],
                  [1, "card-title"],
                  [1, "card-text"],
                  [1, "btn", "btn-dark", 3, "routerLink", "queryParams"],
                ],
                template: function (n, r) {
                  1 & n &&
                    (O(0, "form")(1, "label", 0),
                    $(2, "Name:"),
                    B(),
                    O(3, "input", 1),
                    Ge("ngModelChange", function (i) {
                      return (r.name = i);
                    })("ngModelChange", function () {
                      return r.filterCharacters();
                    }),
                    B(),
                    O(4, "select", 2),
                    Ge("ngModelChange", function (i) {
                      return (r.gender = i);
                    })("ngModelChange", function () {
                      return r.filterCharacters();
                    }),
                    O(5, "option", 3),
                    $(6, "All genders"),
                    B(),
                    O(7, "option", 4),
                    $(8, "Male"),
                    B(),
                    O(9, "option", 5),
                    $(10, "Female"),
                    B(),
                    O(11, "option", 6),
                    $(12, "Unknown"),
                    B()()(),
                    O(13, "div", 7)(14, "div", 8),
                    Zo(15, W1, 12, 11, "div", 9),
                    B()()),
                    2 & n &&
                      (de(3),
                      Ve("ngModel", r.name),
                      de(1),
                      Ve("ngModel", r.gender),
                      de(11),
                      Ve("ngForOf", r.filteredCharacters));
                },
                dependencies: [fa, lo, lf, ff, pf, Ni, Li, Kd, Zd, Ja, ki],
                styles: [
                  "form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;width:40%;margin:0 auto}label[_ngcontent-%COMP%]{font-weight:700;margin-bottom:5px}input[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{padding:10px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;margin-bottom:15px;font-size:16px}input[type=text][_ngcontent-%COMP%]{width:100%}select[_ngcontent-%COMP%]{width:100%;height:40px}option[_ngcontent-%COMP%]{font-size:16px}.searchBtn[_ngcontent-%COMP%]{width:100%}select[_ngcontent-%COMP%]{height:43px}",
                ],
              })),
              e
            );
          })(),
        },
      ];
      let K1 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = _t({ imports: [OD.forRoot(q1), OD] })),
          e
        );
      })();
      const Z1 = function () {
          return ["/alters"];
        },
        Y1 = function (e) {
          return { name: e };
        };
      let Q1 = (() => {
          class e {
            constructor(n) {
              (this.route = n), (this.firstName = "");
            }
            ngOnInit() {
              this.route.queryParams.subscribe((n) => {
                this.firstName = n.name || "";
              });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(D(Vn));
            }),
            (e.ɵcmp = un({
              type: e,
              selectors: [["app-navbar"]],
              decls: 17,
              vars: 5,
              consts: [
                [1, "navbar", "navbar-expand-lg"],
                [1, "container-fluid"],
                ["routerLink", "/home", 1, "navbar-brand"],
                ["src", "../../assets/img/navbar_LOGO.png", "alt", ""],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#navbarNav",
                  "aria-controls",
                  "navbarNav",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-icon"],
                ["id", "navbarNav", 1, "collapse", "navbar-collapse"],
                [1, "navbar-nav"],
                [1, "nav-item"],
                [
                  "aria-current",
                  "page",
                  "routerLink",
                  "/home",
                  1,
                  "nav-link",
                  "home",
                ],
                ["routerLink", "/aboutus", 1, "nav-link", "about"],
                [1, "nav-link", "charinfo", 3, "routerLink", "queryParams"],
              ],
              template: function (n, r) {
                1 & n &&
                  (O(0, "nav", 0)(1, "div", 1)(2, "a", 2),
                  Se(3, "img", 3),
                  B(),
                  O(4, "button", 4),
                  Se(5, "span", 5),
                  B(),
                  O(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9),
                  $(10, "Home"),
                  B()(),
                  O(11, "li", 8)(12, "a", 10),
                  $(13, "About Project"),
                  B()(),
                  O(14, "li", 8)(15, "a", 11),
                  $(16, "Character Full Info"),
                  B()()()()()()),
                  2 & n &&
                    (de(15),
                    Ve("routerLink", zs(2, Z1))(
                      "queryParams",
                      Zr(3, Y1, r.firstName)
                    ));
              },
              dependencies: [lo],
              styles: [
                ".navbar[_ngcontent-%COMP%]{margin:auto;background-color:#343a40}.navbar-brand[_ngcontent-%COMP%]{margin-left:14%}.navbar-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60px}a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:active, a[_ngcontent-%COMP%]:visited{text-decoration:none}.nav-link[_ngcontent-%COMP%]{color:#fff}#about_Link[_ngcontent-%COMP%]:hover{color:#ffffff80}",
              ],
            })),
            e
          );
        })(),
        X1 = (() => {
          class e {
            constructor() {
              this.title = "Final_Project_Angular_Rick_and_Morty";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = un({
              type: e,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (n, r) {
                1 & n && Se(0, "app-navbar")(1, "router-outlet");
              },
              dependencies: [Md, Q1],
            })),
            e
          );
        })(),
        J1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = At({ type: e, bootstrap: [X1] })),
            (e.ɵinj = _t({ imports: [Sx, K1, P1, kP] })),
            e
          );
        })();
      bx()
        .bootstrapModule(J1)
        .catch((e) => console.error(e));
    },
  },
  (re) => {
    re((re.s = 567));
  },
]);

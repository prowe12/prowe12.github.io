import{S as N,o as G,n as K,q as P,u as j,v as g,U as l,w as D,x as b,y as x,z,A as V,B as Z,C as $,L as H,P as J,D as Q,F as q,G as W,R as X,I as F,J as k,K as p,M as ee,N as re,O as ne,Q as M,T as te,V as ae,W as ie}from"./runtime.B4WY0L9c.js";import{c as fe}from"./store.Do1cz0ED.js";function O(a,v=null,y){if(typeof a!="object"||a===null||N in a)return a;const o=V(a);if(o!==G&&o!==K)return a;var f=new Map,c=Z(a),m=P(0);c&&f.set("length",P(a.length));var w;return new Proxy(a,{defineProperty(i,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&j();var t=f.get(e);return t===void 0?(t=P(r.value),f.set(e,t)):g(t,O(r.value,w)),!0},deleteProperty(i,e){var r=f.get(e);if(r===void 0)e in i&&f.set(e,P(l));else{if(c&&typeof e=="string"){var t=f.get("length"),n=Number(e);Number.isInteger(n)&&n<t.v&&g(t,n)}g(r,l),U(m)}return!0},get(i,e,r){var _;if(e===N)return a;var t=f.get(e),n=e in i;if(t===void 0&&(!n||(_=D(i,e))!=null&&_.writable)&&(t=P(O(n?i[e]:l,w)),f.set(e,t)),t!==void 0){var u=b(t);return u===l?void 0:u}return Reflect.get(i,e,r)},getOwnPropertyDescriptor(i,e){var r=Reflect.getOwnPropertyDescriptor(i,e);if(r&&"value"in r){var t=f.get(e);t&&(r.value=b(t))}else if(r===void 0){var n=f.get(e),u=n==null?void 0:n.v;if(n!==void 0&&u!==l)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return r},has(i,e){var u;if(e===N)return!0;var r=f.get(e),t=r!==void 0&&r.v!==l||Reflect.has(i,e);if(r!==void 0||x!==null&&(!t||(u=D(i,e))!=null&&u.writable)){r===void 0&&(r=P(t?O(i[e],w):l),f.set(e,r));var n=b(r);if(n===l)return!1}return t},set(i,e,r,t){var R;var n=f.get(e),u=e in i;if(c&&e==="length")for(var _=r;_<n.v;_+=1){var I=f.get(_+"");I!==void 0?g(I,l):_ in i&&(I=P(l),f.set(_+"",I))}n===void 0?(!u||(R=D(i,e))!=null&&R.writable)&&(n=P(void 0),g(n,O(r,w)),f.set(e,n)):(u=n.v!==l,g(n,O(r,w)));var d=Reflect.getOwnPropertyDescriptor(i,e);if(d!=null&&d.set&&d.set.call(t,r),!u){if(c&&typeof e=="string"){var S=f.get("length"),E=Number(e);Number.isInteger(E)&&E>=S.v&&g(S,E+1)}U(m)}return!0},ownKeys(i){b(m);var e=Reflect.ownKeys(i).filter(n=>{var u=f.get(n);return u===void 0||u.v!==l});for(var[r,t]of f)t.v!==l&&!(r in i)&&e.push(r);return e},setPrototypeOf(){z()}})}function U(a,v=1){g(a,a.v+v)}function Y(a){for(var v=x,y=x;v!==null&&!(v.f&(W|X));)v=v.parent;try{return F(v),a()}finally{F(y)}}function ve(a,v,y,o){var C;var f=(y&k)!==0,c=!p||(y&ee)!==0,m=(y&re)!==0,w=(y&ae)!==0,i=!1,e;m?[e,i]=fe(()=>a[v]):e=a[v];var r=N in a||ne in a,t=((C=D(a,v))==null?void 0:C.set)??(r&&m&&v in a?s=>a[v]=s:void 0),n=o,u=!0,_=!1,I=()=>(_=!0,u&&(u=!1,w?n=q(o):n=o),n);e===void 0&&o!==void 0&&(t&&c&&$(),e=I(),t&&t(e));var d;if(c)d=()=>{var s=a[v];return s===void 0?I():(u=!0,_=!1,s)};else{var S=Y(()=>(f?M:te)(()=>a[v]));S.f|=H,d=()=>{var s=b(S);return s!==void 0&&(n=void 0),s===void 0?n:s}}if(!(y&J))return d;if(t){var E=a.$$legacy;return function(s,h){return arguments.length>0?((!c||!h||E||i)&&t(h?d():s),s):d()}}var R=!1,B=!1,T=ie(e),A=Y(()=>M(()=>{var s=d(),h=b(T);return R?(R=!1,B=!0,h):(B=!1,T.v=s)}));return f||(A.equals=Q),function(s,h){if(arguments.length>0){const L=h?b(A):c&&m?O(s):s;return A.equals(L)||(R=!0,g(T,L),_&&n!==void 0&&(n=L),q(()=>b(A))),s}return b(A)}}export{O as a,ve as p};

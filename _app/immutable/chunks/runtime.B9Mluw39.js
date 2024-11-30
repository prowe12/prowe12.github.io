var In=Array.isArray,Dn=Array.from,xn=Object.defineProperty,it=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyDescriptors,On=Object.prototype,Cn=Array.prototype,Zt=Object.getPrototypeOf;const Nn=()=>{};function bn(t){return t()}function pt(t){for(var n=0;n<t.length;n++)t[n]()}const m=2,ht=4,M=8,et=16,y=32,Z=64,I=128,U=256,p=512,g=1024,Y=2048,N=4096,H=8192,zt=16384,dt=32768,qn=65536,Wt=1<<18,Et=1<<19,ft=Symbol("$state"),Pn=Symbol("legacy props"),Fn=Symbol("");function yt(t){return t===this.v}function Xt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function wt(t){return!Xt(t,this.v)}function Jt(t){throw new Error("effect_in_teardown")}function Qt(){throw new Error("effect_in_unowned_derived")}function tn(t){throw new Error("effect_orphan")}function nn(){throw new Error("effect_update_depth_exceeded")}function Ln(){throw new Error("hydration_failed")}function Mn(t){throw new Error("props_invalid_value")}function Yn(){throw new Error("state_descriptors_fixed")}function Hn(){throw new Error("state_prototype_fixed")}function rn(){throw new Error("state_unsafe_local_read")}function en(){throw new Error("state_unsafe_mutation")}let z=!1;function jn(){z=!0}function st(t){return{f:0,v:t,reactions:null,equals:yt,version:0}}function Bn(t){return Tt(st(t))}function sn(t,n=!1){var e;const r=st(t);return n||(r.equals=wt),z&&f!==null&&f.l!==null&&((e=f.l).s??(e.s=[])).push(r),r}function Un(t,n=!1){return Tt(sn(t,n))}function Tt(t){return o!==null&&o.f&m&&(E===null?Tn([t]):E.push(t)),t}function Vn(t,n){return o!==null&&ut()&&o.f&(m|et)&&(E===null||!E.includes(t))&&en(),an(t,n)}function an(t,n){return t.equals(n)||(t.v=n,t.version=jt(),mt(t,g),ut()&&u!==null&&u.f&p&&!(u.f&y)&&(_!==null&&_.includes(t)?(w(u,g),X(u)):k===null?mn([t]):k.push(t))),n}function mt(t,n){var r=t.reactions;if(r!==null)for(var e=ut(),s=r.length,a=0;a<s;a++){var l=r[a],i=l.f;i&g||!e&&l===u||(w(l,n),i&(p|I)&&(i&m?mt(l,Y):X(l)))}}const Gn=1,$n=2,Kn=16,Zn=1,zn=2,Wn=4,Xn=8,Jn=16,Qn=1,tr=2,ln="[",un="[!",on="]",At={},nr=Symbol();function kt(t){console.warn("hydration_mismatch")}let S=!1;function rr(t){S=t}let d;function P(t){if(t===null)throw kt(),At;return d=t}function er(){return P(D(d))}function sr(t){if(S){if(D(d)!==null)throw kt(),At;d=t}}function ar(t=1){if(S){for(var n=t,r=d;n--;)r=D(r);d=r}}function lr(){for(var t=0,n=d;;){if(n.nodeType===8){var r=n.data;if(r===on){if(t===0)return n;t-=1}else(r===ln||r===un)&&(t+=1)}var e=D(n);n.remove(),n=e}}var _t,fn,gt,Rt;function ur(){if(_t===void 0){_t=window,fn=document;var t=Element.prototype,n=Node.prototype;gt=it(n,"firstChild").get,Rt=it(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function J(t=""){return document.createTextNode(t)}function Q(t){return gt.call(t)}function D(t){return Rt.call(t)}function or(t,n){if(!S)return Q(t);var r=Q(d);if(r===null)r=d.appendChild(J());else if(n&&r.nodeType!==3){var e=J();return r==null||r.before(e),P(e),e}return P(r),r}function ir(t,n){if(!S){var r=Q(t);return r instanceof Comment&&r.data===""?D(r):r}return d}function fr(t,n=1,r=!1){let e=S?d:t;for(;n--;)e=D(e);if(!S)return e;var s=e.nodeType;if(r&&s!==3){var a=J();return e==null||e.before(a),P(a),a}return P(e),e}function _r(t){t.textContent=""}function _n(t){var n=m|g;u===null?n|=I:u.f|=Et;const r={children:null,ctx:f,deps:null,equals:yt,f:n,fn:t,reactions:null,v:null,version:0,parent:u};if(o!==null&&o.f&m){var e=o;(e.children??(e.children=[])).push(r)}return r}function cr(t){const n=_n(t);return n.equals=wt,n}function St(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&m?at(e):q(e)}}}function It(t){var n,r=u;K(t.parent);try{St(t),n=Bt(t)}finally{K(r)}return n}function Dt(t){var n=It(t),r=(x||t.f&I)&&t.deps!==null?Y:p;w(t,r),t.equals(n)||(t.v=n,t.version=jt())}function at(t){St(t),L(t,0),w(t,H),t.v=t.children=t.deps=t.ctx=t.reactions=null}function xt(t){u===null&&o===null&&tn(),o!==null&&o.f&I&&Qt(),lt&&Jt()}function cn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function b(t,n,r,e=!0){var s=(t&Z)!==0,a=u,l={ctx:f,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|g,first:null,fn:n,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,version:0};if(r){var i=O;try{ct(!0),W(l),l.f|=zt}catch(c){throw q(l),c}finally{ct(i)}}else n!==null&&X(l);var T=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&Et)===0;if(!T&&!s&&e&&(a!==null&&cn(l,a),o!==null&&o.f&m)){var A=o;(A.children??(A.children=[])).push(l)}return l}function vr(t){const n=b(M,null,!1);return w(n,p),n.teardown=t,n}function pr(t){xt();var n=u!==null&&(u.f&y)!==0&&f!==null&&!f.m;if(n){var r=f;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Ot(t);return e}}function hr(t){return xt(),vn(t)}function dr(t){const n=b(Z,t,!0);return()=>{q(n)}}function Ot(t){return b(ht,t,!1)}function vn(t){return b(M,t,!0)}function Er(t){return pn(t)}function pn(t,n=0){return b(M|et|n,t,!0)}function yr(t,n=!0){return b(M|y,t,!0,n)}function Ct(t){var n=t.teardown;if(n!==null){const r=lt,e=o;vt(!0),$(null);try{n.call(null)}finally{vt(r),$(e)}}}function Nt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)at(n[r])}}function bt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;q(r,n),r=e}}function hn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&y||q(n),n=r}}function q(t,n=!0){var r=!1;if((n||t.f&Wt)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var a=e===s?null:D(e);e.remove(),e=a}r=!0}bt(t,n&&!r),Nt(t),L(t,0),w(t,H);var l=t.transitions;if(l!==null)for(const T of l)T.stop();Ct(t);var i=t.parent;i!==null&&i.first!==null&&qt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function qt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function wr(t,n){var r=[];Pt(t,r,!0),dn(r,()=>{q(t),n&&n()})}function dn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Pt(t,n,r){if(!(t.f&N)){if(t.f^=N,t.transitions!==null)for(const l of t.transitions)(l.is_global||r)&&n.push(l);for(var e=t.first;e!==null;){var s=e.next,a=(e.f&dt)!==0||(e.f&y)!==0;Pt(e,n,a?r:!1),e=s}}}function Tr(t){Ft(t,!0)}function Ft(t,n){if(t.f&N){j(t)&&W(t),t.f^=N;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&dt)!==0||(r.f&y)!==0;Ft(r,s?n:!1),r=e}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}const En=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let V=!1,G=!1,tt=[],nt=[];function Lt(){V=!1;const t=tt.slice();tt=[],pt(t)}function Mt(){G=!1;const t=nt.slice();nt=[],pt(t)}function mr(t){V||(V=!0,queueMicrotask(Lt)),tt.push(t)}function Ar(t){G||(G=!0,En(Mt)),nt.push(t)}function yn(){V&&Lt(),G&&Mt()}const Yt=0,wn=1;let B=Yt,F=!1,O=!1,lt=!1;function ct(t){O=t}function vt(t){lt=t}let R=[],C=0;let o=null;function $(t){o=t}let u=null;function K(t){u=t}let E=null;function Tn(t){E=t}let _=null,h=0,k=null;function mn(t){k=t}let Ht=0,x=!1,f=null;function jt(){return++Ht}function ut(){return!z||f!==null&&f.l===null}function j(t){var l,i;var n=t.f;if(n&g)return!0;if(n&Y){var r=t.deps,e=(n&I)!==0;if(r!==null){var s;if(n&U){for(s=0;s<r.length;s++)((l=r[s]).reactions??(l.reactions=[])).push(t);t.f^=U}for(s=0;s<r.length;s++){var a=r[s];if(j(a)&&Dt(a),e&&u!==null&&!x&&!((i=a==null?void 0:a.reactions)!=null&&i.includes(t))&&(a.reactions??(a.reactions=[])).push(t),a.version>t.version)return!0}}e||w(t,p)}return!1}function An(t,n,r){throw t}function Bt(t){var ot;var n=_,r=h,e=k,s=o,a=x,l=E,i=f,T=t.f;_=null,h=0,k=null,o=T&(y|Z)?null:t,x=!O&&(T&I)!==0,E=null,f=t.ctx;try{var A=(0,t.fn)(),c=t.deps;if(_!==null){var v;if(L(t,h),c!==null&&h>0)for(c.length=h+_.length,v=0;v<_.length;v++)c[h+v]=_[v];else t.deps=c=_;if(!x)for(v=h;v<c.length;v++)((ot=c[v]).reactions??(ot.reactions=[])).push(t)}else c!==null&&h<c.length&&(L(t,h),c.length=h);return A}finally{_=n,h=r,k=e,o=s,x=a,E=l,f=i}}function kn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&m&&(_===null||!_.includes(n))&&(w(n,Y),n.f&(I|U)||(n.f^=U),L(n,0))}function L(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)kn(t,r[e])}function W(t){var n=t.f;if(!(n&H)){w(t,p);var r=u;u=t;try{n&et?hn(t):bt(t),Nt(t),Ct(t);var e=Bt(t);t.teardown=typeof e=="function"?e:null,t.version=Ht}catch(s){An(s)}finally{u=r}}}function Ut(){C>1e3&&(C=0,nn()),C++}function Vt(t){var n=t.length;if(n!==0){Ut();var r=O;O=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&p||(s.f^=p);var a=[];Gt(s,a),gn(a)}}finally{O=r}}}function gn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(H|N))&&j(e)&&(W(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?qt(e):e.fn=null))}}function Rn(){if(F=!1,C>1001)return;const t=R;R=[],Vt(t),F||(C=0)}function X(t){B===Yt&&(F||(F=!0,queueMicrotask(Rn)));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(Z|y)){if(!(r&p))return;n.f^=p}}R.push(n)}function Gt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,a=(s&y)!==0,l=a&&(s&p)!==0;if(!l&&!(s&N))if(s&M){a?r.f^=p:j(r)&&W(r);var i=r.first;if(i!==null){r=i;continue}}else s&ht&&e.push(r);var T=r.next;if(T===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var A=v.next;if(A!==null){r=A;continue t}v=v.parent}}r=T}for(var c=0;c<e.length;c++)i=e[c],n.push(i),Gt(i,n)}function $t(t){var n=B,r=R;try{Ut();const s=[];B=wn,R=s,F=!1,Vt(r);var e=t==null?void 0:t();return yn(),(R.length>0||s.length>0)&&$t(),C=0,e}finally{B=n,R=r}}async function kr(){await Promise.resolve(),$t()}function gr(t){var i;var n=t.f,r=(n&m)!==0;if(r&&n&H){var e=It(t);return at(t),e}if(o!==null){E!==null&&E.includes(t)&&rn();var s=o.deps;_===null&&s!==null&&s[h]===t?h++:_===null?_=[t]:_.push(t),k!==null&&u!==null&&u.f&p&&!(u.f&y)&&k.includes(t)&&(w(u,g),X(u))}else if(r&&t.deps===null){var a=t,l=a.parent;l!==null&&!((i=l.deriveds)!=null&&i.includes(a))&&(l.deriveds??(l.deriveds=[])).push(a)}return r&&(a=t,j(a)&&Dt(a)),t.v}function Rr(t){const n=o;try{return o=null,t()}finally{o=n}}const Sn=~(g|Y|p);function w(t,n){t.f=t.f&Sn|n}function Sr(t,n=!1,r){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},z&&!n&&(f.l={s:null,u:null,r1:[],r2:st(!1)})}function Ir(t){const n=f;if(n!==null){const l=n.e;if(l!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<l.length;s++){var a=l[s];K(a.effect),$(a.reaction),Ot(a.fn)}}finally{K(r),$(e)}}f=n.p,n.m=!0}return{}}function Dr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ft in t)rt(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ft in r&&rt(r)}}}function rt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{rt(t[e],n)}catch{}const r=Zt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Kt(r);for(let s in e){const a=e[s].get;if(a)try{a.call(t)}catch{}}}}}export{Zt as $,er as A,In as B,Dn as C,lr as D,rr as E,d as F,Tr as G,un as H,N as I,yr as J,wr as K,u as L,an as M,Pt as N,_r as O,dn as P,q as Q,Q as R,on as S,o as T,st as U,$n as V,Gn as W,Kn as X,D as Y,Ar as Z,Fn as _,pr as a,Kt as a0,ft as a1,On as a2,Cn as a3,Yn as a4,nr as a5,it as a6,Hn as a7,dt as a8,Mn as a9,vn as aA,$t as aB,kr as aC,Bn as aD,ut as aE,fn as aF,Un as aG,Xt as aH,qn as aa,Wn as ab,wt as ac,y as ad,Z as ae,K as af,Zn as ag,zn as ah,Xn as ai,Pn as aj,cr as ak,Jn as al,ar as am,Qn as an,tr as ao,$ as ap,mr as aq,xn as ar,Wt as as,ln as at,ur as au,At as av,kt as aw,Ln as ax,dr as ay,Ot as az,Rr as b,f as c,bn as d,Dr as e,_n as f,gr as g,jn as h,ir as i,Ir as j,or as k,sr as l,vr as m,Nn as n,sn as o,Sr as p,Vn as q,pt as r,fr as s,Er as t,hr as u,z as v,J as w,pn as x,S as y,P as z};

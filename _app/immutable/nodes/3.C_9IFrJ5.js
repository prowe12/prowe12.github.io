import{a as G,t as K}from"../chunks/disclose-version.CJVT5_US.js";import"../chunks/legacy.lfnBCQM9.js";import{aE as Ue,aA as Ne,y as Ge,p as We,t as Be,j as Ye,aF as Je,k as x,s as z,q as Ke,g as W,l as k,am as $,aG as Qe}from"../chunks/runtime.B9Mluw39.js";import{l as Xe,b as Ze,s as ze}from"../chunks/render.Dmg70gpr.js";import{e as Me,i as Te,r as et}from"../chunks/attributes.CLDe157K.js";import{i as tt}from"../chunks/lifecycle.By3iFH6R.js";import{o as ot}from"../chunks/index-client.CP-LMr0N.js";function nt(e,t,o=t){var a=Ue();Xe(e,"input",()=>{var l=se(e)?ie(e.value):e.value;o(l),a&&l!==(l=t())&&(e.value=l??"")}),Ne(()=>{var l=t();if(Ge&&e.defaultValue!==e.value){o(se(e)?ie(e.value):e.value);return}se(e)&&l===ie(e.value)||e.type==="date"&&!l&&!e.value||l!==e.value&&(e.value=l??"")})}function se(e){var t=e.type;return t==="number"||t==="range"}function ie(e){return e===""?null:+e}function lt(e,t,o){let a=[],l=Math.floor(t/3),r=Math.floor(o/3),n=l*3,s=l*3+3,i=r*3,v=r*3+3;for(let u=n;u<s;u++)for(let p=i;p<v;p++)a.push(e[u][p]);return a}function Ie(e,t,o,a){if(e[t].includes(a))return!0;let l=[],r;for(let n=0;n<9;n++)r=e[n][o],l.push(r);return!!(l.includes(a)||lt(e,t,o).includes(a))}function _e(e,t,o,a){let l,r;for(;e[t][o]>0;)if(o<8)o+=1;else if(o==8&&t<8)o=0,t+=1;else if(o==8&&t==8)return[!0,e,a];for(let n=1;n<10;n++)if(!Ie(e,t,o,n)){if(e[t][o]=n,a.push([t,o,n,"backtrack"]),l=_e(e,t,o,a),r=l[0],e=l[1],r)return[!0,e,a];e[t][o]=0,a.push([t,o,0,"backtrack"])}return[!1,e,a]}function Ae(e){for(let t=0;t<9;t++)for(let o=0;o<9;o++){let a=e[t][o];if(a!==0){if(e[t][o]=0,Ie(e,t,o,a))return[!1,`Duplicate value in row: ${t}, col: ${o}: ${a}`];e[t][o]=a}}return[!0,"success"]}function at(e){let t,o,a,l,r=[];if(a=Ae(e),t=_e(e,0,0,r),l=t[0],e=t[1],r=t[2],l){a=Ae(e);let n=a[0],s=a[1];n?o="success":o=s}else o="failure";return[o,r]}function I(e="easy"){let t;if(e==="random"){let o=["easy","medium","hard","evil"],a=Math.floor(o.length*Math.random());e=o[a]}return e==="easy"?(t=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]],t):e==="medium"?(t=[[0,0,2,0,0,9,0,0,0],[0,3,0,8,0,1,2,0,0],[1,0,0,0,0,0,0,0,9],[0,2,5,0,0,0,4,0,0],[0,7,0,0,0,0,8,0,2],[0,0,0,6,0,0,9,3,0],[8,0,0,5,2,0,0,0,0],[0,0,0,3,4,0,6,0,0],[0,0,0,0,0,7,0,0,0]],t):e==="hard"?(t=[[0,0,0,7,0,8,0,3,5],[5,9,3,0,4,0,0,0,0],[0,0,0,0,0,0,1,0,0],[0,0,4,0,0,0,0,2,8],[0,0,9,0,5,0,3,0,0],[2,6,0,0,0,0,9,0,0],[0,0,8,0,0,0,0,0,0],[0,0,0,0,2,0,5,9,7],[4,7,0,9,0,3,0,0,0]],t):e==="evil"?(t=[[0,0,0,6,3,5,2,0,0],[0,0,5,7,0,0,0,0,9],[0,7,0,0,0,0,0,0,0],[5,0,0,0,0,4,6,0,0],[0,9,0,0,5,0,0,7,0],[0,0,4,8,0,0,0,0,5],[0,0,0,0,0,0,0,4,0],[7,0,0,0,0,2,3,0,0],[0,0,2,5,9,6,0,0,0]],t):(t=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]],t)}function rt(e,t){let o=document.getElementById("sudokuGraphic");for(;o.lastChild;)o.removeChild(o.lastChild);for(let a=0;a<e;a++){let l=document.createElement("tr");l.classList.add(`row-${a}`),o.appendChild(l);for(let r=0;r<t;r++){let n=document.createElement("td");n.classList.add(`col-${r}`),n.classList.add("sudokubox"),l.appendChild(n)}}}function Y(e){let t=I(e);rt(9,9),pe(t),I(e)}function st(e,t){let o=1;return t<=0?o=Math.round(e/10):t<=10?o=Math.round(e/100):t<=100&&(o=Math.round(e/1e3)),o<1&&(o=1),o}function ue(e){let t=10**(3-e/100);return t<=1&&(t=0),t}function ce(e,t,o){return setInterval(function(){e(t)},o)}function it(e,t,o){let a=o.length,l,r=new Set,n=new Set,s=He(e,t,a);for(;s.length>0;){let i=s.pop();l=o[i[1][0]][i[1][1]],r.add(l)}for(let i=0;i<=a;i++)r.has(i)||n.add(i);return n}function ut(e){e.value=="OFF"?e.value="ON":e.value="OFF"}function qe(e){let t=e.length;for(let o=0;o<t;o++)for(let a=0;a<t;a++)e[o][a]===0&&he(o,a,0,"empty")}function J(e){let t,o=e.length;for(let a=0;a<o;a++)for(let l=0;l<o;l++)e[a][l]===0&&(t=it(a,l,e),ct(a,l,t,"domain"))}function ct(e,t,o,a="empty"){let l="<p>",r;for(r=1;r<=3;r++)l+=de(r,o);for(l+="</p><p>",r=4;r<=6;r++)l+=de(r,o);for(l+="</p><p>",r=7;r<=9;r++)l+=de(r,o);l+="</p>",o=l;let n=["empty","fixed","backtrack","AC3","backtrackPlusAC3","finalAC3"],s=document.querySelector(`.row-${e} .col-${t}`);if(s.className.indexOf("fixed")===-1){for(let i of n)s.classList.remove(i);s.classList.add("domain"),s.innerHTML=o}}function de(e,t){return t.has(e)?String(e):" "}function Ee(e){let t=e[0][0].maxDomainVal;if(!Number.isFinite(t)||t<=0)return!1;let o;for(let a=0;a<t;a++)for(let l=0;l<t;l++){if(!e[a][l].fixed)continue;o=e[a][l].getOnlyValue();for(let s=0;s<t;s++)if(s!==l&&e[a][s].domain.size===1&&e[a][s].getOnlyValue()===o)return!1;for(let s=0;s<t;s++)if(s!==a&&e[s][l].domain.size===1&&o===e[s][l].getOnlyValue())return!1;let r=Math.floor(a/3)*3,n=Math.floor(l/3)*3;for(let s=r;s<r+3;s++)for(let i=n;i<n+3;i++)if(!(s===a&&i===l)&&e[s][i].domain.size===1&&o===e[s][i].getOnlyValue())return!1}return!0}function He(e,t,o){let a=[];for(let n=0;n<o;n++)n!==t&&a.push([[e,t],[e,n]]);for(let n=0;n<o;n++)n!==e&&a.push([[e,t],[n,t]]);let l=Math.floor(e/3)*3,r=Math.floor(t/3)*3;for(let n=l;n<l+3;n++)for(let s=r;s<r+3;s++)n!=e&&s!=t&&a.push([[e,t],[n,s]]);return a}function dt(e){let t=e[0][0].maxDomainVal,o=[],a;for(let l=0;l<t;l++)for(let r=0;r<t;r++)e[l][r].fixed||(a=He(l,r,t),o=o.concat(a));return o}function pt(e,t,o,a,l){let r,n;for(r=0;r<o;r++)r!==t&&!l[e][r].fixed&&a.push([[e,r],[e,t]]);for(n=0;n<o;n++)n!==e&&!l[n][t].fixed&&a.push([[n,t],[e,t]]);let s=Math.floor(e/3)*3,i=Math.floor(t/3)*3;for(n=s;n<s+3;n++)for(r=i;r<i+3;r++)n!==e&&r!==t&&!l[n][r].fixed&&a.push([[n,r],[e,t]]);return a}function pe(e){for(let t=0;t<9;t++)for(let o=0;o<9;o++){let a=document.querySelector(`.row-${t} .col-${o}`);a&&(a.textContent=e[t][o]!==0?e[t][o]:"",a.classList.toggle("empty",e[t][o]===0),a.classList.toggle("filled",e[t][o]!==0))}}function ft(e,t,o="empty"){document.querySelector(`.row-${e} .col-${t}`).classList.add("boxborder")}function fe(e,t,o="empty"){document.querySelector(`.row-${e} .col-${t}`).classList.remove("boxborder")}function he(e,t,o,a="none"){let l=["empty","fixed","backtrack","AC3","backtrackPlusAC3","finalAC3","domain"];if(!(o in[0,1,2,3,4,5,6,7,8,9]))throw"Bad value in square at "+e+", "+t+": "+o;console.log(e,t,o);let n=document.querySelector(`.row-${e} .col-${t}`);if(!n){console.warn(`Element with selector .row-${e} .col-${t} not found.`);return}if(n.classList.contains("fixed"))return;for(let v of l)n.classList.remove(v);l.indexOf(a)!==-1&&n.classList.add(a),o===0?n.innerHTML="":n.innerHTML=String(o);let s={fixed:"<p>Puzzle ready!</p><p>Choose another puzzle or choose a solver.</p>",backtrack:"<p>Solved with backtracking.</p>",backtrackPlusAC3:"<p>Solved with AC-3 during backtracking.</p>",finalAC3:"<p>Solving with AC-3: final solution for box.</p>",AC3:"<p>Solving with AC-3.</p>",none:"<p>none</p>","":"<p>unknown</p>",empty:"<p>empty</p>",undobacktrack:"<p>Undoing square that was solved with backtracking.</p>",undobacktrackPlusAC3:"<p>Undoing square that was solved with AC-3 during backtracking.</p>",undofinalAC3:"<p>Undoing square that was solved with AC-3.</p>",undoAC3:"<p>Undoing square that was solved with AC-3.</p>"};if(!s.hasOwnProperty(a))throw"boxStyle "+a+" not defined";let i=document.querySelector(".explanation");i.innerHTML=s[a]}function ht(e,t,o,a){let l=e.length,r=e[0].length,n=new Array(l),s=new Array(l),i;o>=t.length-1&&(o=t.length-1);let v=t[o+1];a&&fe(v[0],v[1],v[2]);for(let u=0;u<l;u++){n[u]=new Array(r),s[u]=new Array(r);for(let p=0;p<r;p++){let g=e[u][p];g>0?s[u][p]="fixed":s[u][p]="",n[u][p]=g}}for(let u=0;u<o;u++)i=t[u],n[i[0]][i[1]]=i[2],s[i[0]][i[1]]=i[3];i=t[o],s[i[0]][i[1]]=i[3];for(let u=0;u<l;u++)for(let p=0;p<r;p++){let g=document.querySelector(`.row-${u} .col-${p}`);g&&(g.textContent=e[u][p]!==0?e[u][p]:"",g.classList.toggle("empty",e[u][p]===0),g.classList.toggle("filled",e[u][p]!==0))}return n}function j(e,t,o,a,l=!1){this.row=e,this.col=t,this.maxDomainVal=o,this.fixed=l,this.domain=a}j.prototype.replace=function(e){if(this.fixed)throw"The domain is fixed; cannot replace value.";this.domain=new Set([e])};j.prototype.getDomainSize=function(){return this.domain.size};j.prototype.getOnlyValue=function(){if(this.getDomainSize()!==1)throw"Domain of one expected, but was 0 or > 1";return this.domain[Symbol.iterator]().next().value};function vt(e){for(let t of e)for(let o of t)if(o.getDomainSize()>1)return o;throw"Looking for next unassigned, but everything seems to be assigned!"}function mt(e,t){let o=!1;if(t.getDomainSize()==1){let a=t.getOnlyValue();e.domain.has(a)&&(e.domain.delete(a),o=!0)}return new Array(e,o)}function wt(e){let t=e.length;var o=new Array;let a,l,r;for(let n=0;n<t;n++){a=new Array;for(let s=0;s<t;s++)if(l=e[n][s],l==0){r=new Set;for(let i=1;i<=t;i++)r.add(i);a.push(new j(n,s,t,r))}else r=new Set,r.add(l),a.push(new j(n,s,t,r,!0));o.push(a)}return o}function bt(e){let t;if(e===-1)throw"board is -1";let o=e.length,a=e[0].length,l=new Array(o);for(let r=0;r<o;r++){t=new Array(a);for(let n=0;n<a;n++)e[r][n].getDomainSize()===1?t[n]=e[r][n].getOnlyValue():e[r][n].getDomainSize()===0?t[n]=-1:t[n]=0;l[r]=t}return l}function De(e){let t;if(e===-1||e===void 0)return!1;let o=e.length,a=e[0].length;for(let l=0;l<o;l++)for(let r=0;r<a;r++)if(t=e[l][r],t.getDomainSize()>1)return!1;return!0}function Oe(e,t,o,a){let l,r;if(De(e))return[e,o,[]];let n=e.length,s=vt(e);for(let i of s.domain){let v=new Array(n);for(let c=0;c<n;c++){v[c]=new Array(n);for(let b=0;b<n;b++){l=new Set;for(let M of e[c][b].domain)l.add(M);let T=e[c][b].fixed;v[c][b]=new j(c,b,n,l,T)}}v[s.row][s.col].replace(i),o.push([s.row,s.col,i,"backtrack"]);let u=[];u.push([s.row,s.col,0,"undobacktrack"]);let p,g;if([r,p,g]=Pe(v,t,"backtrackPlus"),o=[].concat(o,p),u=[].concat(u,g),r!==-1){let c;if([c,o,u]=Oe(v,t,o),c!==-1)return[c,o,u]}o=[].concat(o,u.reverse()),u=[]}return[-1,o,[]]}function Pe(e,t,o=""){let a=[],l=[];function r(v,u,p=""){let g=[],c,b,T=[];for(let M=0;M<u.length;M++){b=u[M];let y=v[b[0][0]][b[0][1]],O=v[b[1][0]][b[1][1]];if(b[0][0]===b[1][0]&&b[0][1]===b[1][1])throw"invalid constraint";if(y.row===O.row&&y.col===O.col)throw"invalid constraint: xi = xj";if(y.fixed)throw"The value in this box is fixed; should not have a constraint.";if([y,c]=mt(y,O),c&&y.getDomainSize()==1){let R=y.getOnlyValue();l.push([y.row,y.col,R,p+"AC3"]),T.push([y.row,y.col,0,"undoAC3"])}if(c){if(y.getDomainSize()===0)return[[],T,!1];g=pt(y.row,y.col,y.maxDomainVal,g,v)}}return[g,T,!0]}let n,s=t,i=0;for(;s.length>0&&i<100;){let v;if([s,v,n]=r(e,s,o),a=[].concat(a,v),!n)return[-1,l,a];i++}if(i>=99)throw"Tried to go through constraint loop too many times, so quit.";return[e,l,a]}function gt(e){let t=[],o=[],a,l=wt(e),r=Ee(l);if(!r)return["Puzzle is not valid!",t];let n=dt(l);return[l,o,a]=Pe(l,n,"final"),[l,t]=Oe(l,n,[]),t=[].concat(o,t),r=Ee(l),r?De(l)?(bt(l),["success",t]):["failure",t]:["Solved puzzle is not valid!",l]}var yt=K('<meta charset="utf-8">'),kt=K("<td> </td>"),xt=K('<tr class="svelte-1wrvw5t"></tr>'),St=K(`<main class="svelte-1wrvw5t"><div class="mx-auto max-w-4xl flex flex-col px-6 py-4 mt-6"><h1 class="text-4xl flex justify-center mb-2 svelte-1wrvw5t">Sudoku Solver</h1> <div class="mx-auto max-w-4xl px-6 py-4 mb-10 prose">Under construction. Some features are not yet implemented. For fully functional code please see my <a href="https://github.com/prowe12/game-solvers/tree/main/sudoku">Python Sudoku Solver</a> and <a href="https://github.com/prowe12/gamesolverhub/tree/master/sudoku">Javascript &amp; CSS Sudoku Solver</a>.</div> <div class="max-w-8xl flex justify-center mb-20"><div id="grid-container-puzzle" class="svelte-1wrvw5t"><div class="svelte-1wrvw5t"><fieldset id="selections" class="svelte-1wrvw5t"><legend>Selections</legend> Choose Puzzle<br> <select name="puzzle" id="dropdownpuzzle" class="button svelte-1wrvw5t"><option>Easy</option><option>Medium</option><option>Hard</option><option>Evil</option><option>Random</option></select> <br> <br> Choose Solver <br> <button name="solverDemoBacktrack" id="solverDemoBacktrack" class="button svelte-1wrvw5t">Backtracking</button> <br> <button name="playSudokuSolver" id="playSudokuSolver" class="button svelte-1wrvw5t">AC-3 and Backtracking</button> <br></fieldset> <br> <br> <div class="colorkeybox svelte-1wrvw5t"><h2>Key for colors</h2> <p class="backtrack svelte-1wrvw5t">Backtracking</p> <p class="finalAC3 svelte-1wrvw5t">AC-3, solved</p> <p class="backtrackPlusAC3 svelte-1wrvw5t">AC-3, value may change</p></div></div> <div class="svelte-1wrvw5t"><table id="sudokuGraphic" class="svelte-1wrvw5t"><tbody></tbody></table> <div id="sudokuControls" class="svelte-1wrvw5t"><fieldset id="controls" class="svelte-1wrvw5t"><legend>Controls</legend> <button type="button" id="rewindToBeg" class="button controlButton svelte-1wrvw5t">Restart</button> <button type="button" id="rewind" class="button controlButton svelte-1wrvw5t">Rewind</button> <button type="button" id="pauseButton" class="button controlButton svelte-1wrvw5t">Pause</button> <button type="button" id="playPause" class="button controlButton svelte-1wrvw5t">Play</button> <button type="button" id="forwardToEnd" class="button controlButton svelte-1wrvw5t">Finish</button>  <label for="speed" class="svelte-1wrvw5t">Speed</label> <input id="speed" class="slider anim-speed svelte-1wrvw5t" type="range" min="0" max="300"> <p> </p> <br> <br> <button type="button" id="showDomainButton" class="button controlButton svelte-1wrvw5t" value="OFF">Show the domain</button>     <button type="button" id="step" class="button controlButton svelte-1wrvw5t">Step</button> <button type="button" id="stepBack" class="button controlButton svelte-1wrvw5t">Undo</button></fieldset></div></div> <div class="svelte-1wrvw5t"><p class="state"></p> <p class="explanation"></p></div></div></div> <div class="howto svelte-1wrvw5t"><h1 class="svelte-1wrvw5t">How to Play</h1> <p>A Sudoku board is made up of a 9x9 grid of 81 boxes. The grid includes 9 subgrids
            of size 3x3.</p><p>The board starts with preset or "fixed" numbers
            that cannot be changed. The player's task is to solve the puzzle by filling in the
            remaining boxes.</p> <p>The puzzle is solved when each of the 81 boxes contain an integer
            between 1 and 9, and all of the integers 1-9 appear in every row, column, and
            3x3 subgrid of the board.</p></div> <div class="howto svelte-1wrvw5t"><h1 class="svelte-1wrvw5t">How the Solver Works</h1> <p>Sudoku is a type of Constraint Satisfaction Problem, or <a href="https://en.wikipedia.org/wiki/Constraint_satisfaction_problem">CSP</a>.
            The solver uses the Arc Consistency Algorithm #3 ( <a href="https://en.wikipedia.org/wiki/AC-3_algorithm">AC-3</a>), and <a href="https://simple.wikipedia.org/wiki/Backtracking">backtracking</a> with the
            Minimum Remaining Values and degree heuristics.</p></div> <div class="row svelte-1wrvw5t"><div class="col1 svelte-1wrvw5t"><center><h3>AC-3</h3></center> <p>To use AC-3, first every box of the cell is given a domain of possible integers 1-9,
                with the exception of the boxes with fixed starting values. For fixed boxes, the domain
                consists of the fixed value.</p> <p>Next, a list of constraints is created for each
                box. For example, the box at (row, column) = (1,1) must not have the same value
                as any box in its row (e.g. the boxes at (1,1), (1,2), ... (1,9)), any box in its
                column (i.e. (2,1), (3,1), ... (9,1)), or any box in its subgrid (i.e. (1,2), (1,3), (2,1), (2,2),
                (2,3)
                (3,1), (3,2), (3,3)). Leaving out repeats, these represent the 20 constraints for box (1,1).</p> <p>AC-3 progresses by going through the list of constraints one by one. For each box x<sub>i</sub> and
                constraining box x<sub>j</sub>, if there is a single value in the domain of x<sub>j</sub>, that
                value is
                removed from the domain of x<sub>i</sub>. If this causes the domain of x<sub>i</sub> to contain only
                a
                single value, then a new set of "reverse
                constraints" is added to the list of constraints, to be worked through. For the reverse constraints,
                the box that was previously x<sub>i</sub> becomes the constraining box x<sub>j</sub> for all the
                boxes
                that share its row,
                column, and subgrid.</p> <p>After all the constraints have been worked through, the puzzle may not be completely solved. Thus
                AC-3 is not necessarily sufficient to find a solution, if one exists. In this case, another method
                is
                needed.</p></div> <div class="col1 svelte-1wrvw5t"><center><h3>Backtracking</h3></center> <p>Backtracking uses a trial-and-error approach to solve the puzzle. For an empty Sudoku box,
                a value is selected from the domain of allowable values. These can be chosen randomly, in order, or
                using a heuristic as described below.</p><p>The guess value is placed in the box and used to constrain the boxes that share the row, column, and
                subgrid. The process is repeated for another empty Sudoku box, new constraints are accounted for, and so
                on.</p> <p>This continues until either the puzzle is solved, or a box is found to have no allowable value
                (because all values 1-9 are already present in the row, column,
                and subgrid).</p> <p>If there is no allowable value, the algorithm "backtracks" to the last box that had multiple values
                in its domain, emptying boxes as it backs up. A different value from the domain is tried, and the
                algorithm proceeds forward again for as long as it can. Because of the need to undo changes when the
                algorithm backtracks, recursion is generally used.</p> <p>Backtracking can be used alone or with another method like AC-3. For example, if AC-3 gets stuck,
                backtracking can take over. Unlike AC-3, backtracking can almost always solve a Sudoku puzzle if it is
                solveable.</p></div></div> <div class="howto svelte-1wrvw5t"><center><h3>Heuristic</h3></center> <p>To speed up the solver, a heuristic can be used. A <a href="https://en.wikipedia.org/wiki/Heuristic">heuristic</a> is a problem-solving technique "that is not guaranteed to be optimal, perfect, or
            rational, but is nevertheless sufficient for reaching an immediate, short-term goal or approximation".
            Useful heuristics for Sudoku include:</p> <p>The Minimum Remaining Values (MRV) heuristic speeds up the sover by choosing the next box to solve by
            identifying the box with the shortest list of allowable values.</p> <p>The degree heuristic speeds up the solver by choosing the value involved in the largest number of
            constraints with remaining unassigned values.</p></div></div></main>`);function qt(e,t){We(t,!1);let o=Qe(20),a="backtracking",l=[],r,n=0,s=!1,i=!1,v={backtracking:"<p>Solving the outlined square with backtracking.</p><p>If there is more than one value in the domain, backtracking tries one, makes a note of the others, and then moves on to the next box.<p>This continues until it encounters an empty square, and then it backs up.</p><p>Click 'Step' again to keep going.",ac3:"<p>Solving the outlined square with AC-3.</p><p>AC-3 solves any boxes with only one value in the domain first. After solving a box, the domains of all the boxes that depend on it are recomputed.</p><p>If all incomplete boxes have more than one value in the domain, it uses backtracking to try out a value from the domain of a square.</p>"},u={backtracking:"<p>Click 'Step' to see backtracking in action.</p>",ac3:"<p>AC-3 solves only the squares with a single value in the domain.</p><p>Click 'Step' to see AC-3 in action.</p>"},p="Easy",g=I(p),c=I(p),b=function(h){if(n<h.length)he(h[n][0],h[n][1],h[n][2],h[n][3]),c[h[n][0]][h[n][1]]=h[n][2],n+=1;else{clearInterval(r);let C=document.querySelector(".state");C.innerHTML="<p>Puzzle Completed!</p><p>Continue using controls or choose a different puzzle or solver.</p>";let B=document.querySelector(".explanation");B.innerHTML="<p></p>",s=!1}},T=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];ot(async()=>{var Ce;let h=((Ce=document.getElementById("dropdownpuzzle"))==null?void 0:Ce.value)||"easy",C=document.getElementById("rewindToBeg"),B=document.getElementById("rewind"),P=document.getElementById("playPause"),_=document.getElementById("forwardToEnd"),A=document.getElementById("step"),F=document.getElementById("stepBack");document.getElementById("myRange"),document.getElementById("demo");let V=document.querySelector(".slider"),le=document.getElementById("pauseButton"),je=document.getElementById("playSudokuSolver"),Ve=document.getElementById("solverDemoBacktrack"),ae=b,H=V.value||12,q=10**(3-H/100);document.querySelector("#dropdownpuzzle").addEventListener("change",function(){S(),h=document.getElementById("dropdownpuzzle").value,g=I(h),c=I(h),n=0,l=[],Le(9,9),pe(g),l=re(h)}),document.querySelector("#solverDemoBacktrack").addEventListener("click",function(){a="backtracking",S(),E(c),l=re(h)}),document.querySelector("#playSudokuSolver").addEventListener("click",function(){a="ac3",S(),E(c),je.classList.add("selectedsolver"),Ve.classList.remove("selectedsolver"),U(),Y(h);let d=document.querySelector(".state");d.innerHTML="<p>You have chosen backtracking.</p><p>Please wait while I solve the puzzle.</p>";let f=document.querySelector(".explanation");f.innerHTML="<p></p>";let m=I(h),w=gt(m);w[0],l=w[1],d.innerHTML="<p>Solve using AC-3 and backtracking. You can: </p>1) Choose another puzzle or solver on the left. <p>2) Use the controls to play the solution.</p><p>3) Click 'Show the domain' to walk through an explanation of the solution."}),V.addEventListener("click",()=>{H=V.value,q=ue(H),s&&(clearInterval(r),r=ce(ae,l,q))}),P.addEventListener("click",function(){E(c),S(),P.classList.add("selected"),clearInterval(r),s=!0;let d=document.querySelector(".state");if(d.innerHTML="<p>Playing Solution.</p>",n>=l.length){let f=document.querySelector(".state");f.innerHTML="<p>Puzzle Complete!</p><p>Continue using controls or choose a different puzzle or solver.</p>";let m=document.querySelector(".explanation");m.innerHTML="<p></p>",s=!1,P.classList.remove("selected");return}H=V.value,q=ue(H),r=ce(b,l,q),ae=b}),B.addEventListener("click",function(){console.log("rewinding"),E(c),S(),B.classList.add("selected"),clearInterval(r),s=!0;let d=document.querySelector(".state"),f=document.querySelector(".explanation");if(f.innerHTML="<p></p>",n===0){d.innerHTML="<p>At the beginning.</p><p>Use controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";return}d.innerHTML="<p>Rewinding.</p>",H=V.value,q=ue(H);let m=st(n,q),w=function(L){if(n>0)c=Se(Math.max(n-m,0),c),n-=m;else{clearInterval(r),n=0,s=!1;let D=document.querySelector(".explanation");D.innerHTML="<p>Rewound to beginning.</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>",B.classList.remove("selected")}};r=ce(w,l,q),ae=w}),_.addEventListener("click",async function(){clearInterval(r),E(c),S(),_.classList.add("selected");let d=document.querySelector(".state");d.innerHTML="<p>Working on completing the puzzle. Please wait.</p>",s=!0;function f(){return new Promise((w,L)=>{setTimeout(()=>{for(_.classList.add("selected"),n=n;n<l.length;(n+=1)-1)he(l[n][0],l[n][1],l[n][2],l[n][3]);w()},0)})}await f(),d=document.querySelector(".state"),d.innerHTML="<p>Puzzle Completed!</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";let m=document.querySelector(".explanation");m.innerHTML="<p></p>",s=!1,_.classList.remove("selected")});function $e(){!i&&!(typeof l>"u")&&!(typeof n>"u")&&!(typeof l[n]>"u")?(ft(l[n][0],l[n][1],l[n][3]),i=!0):(i&&fe(l[n][0],l[n][1],l[n][3]),b(l),i=!1)}function re(d){document.getElementById("solverDemoBacktrack").classList.add("selectedsolver"),document.getElementById("playSudokuSolver").classList.remove("selectedsolver"),U(),Y(d);let w=document.querySelector(".state");w.innerHTML="<p>You have chosen backtracking.</p><p>Please wait while I solve the puzzle.</p>";let L=document.querySelector(".explanation");L.innerHTML="<p></p>";let D=I(d),Re=at(D)[1];return w.innerHTML="<p><b>Suggested use</b></p><p>Use the top set of controls<br> and the speed slider to<br>move through the solution.</p>or<p></p><p>Click 'Show the domain'<br>and 'step' to step through<br>the solution.</p><br><p>Choose a new puzzle and <br>solver on the left.</p>",Re}C.addEventListener("click",async function(){E(c),S(),C.classList.add("selected"),s=!0;function d(){return new Promise((w,L)=>{setTimeout(()=>{U(),Y(h),w()},100)})}await d();let f=document.querySelector(".state");f.innerHTML="<p>At the beginning.</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";let m=document.querySelector(".explanation");m.innerHTML="<p></p>",s=!1,C.classList.remove("selected")}),le.addEventListener("click",function(){s=!1,S(),le.classList.add("selected");let d=document.querySelector(".state");d.innerHTML="<p>Paused.</p>";let f=document.querySelector(".explanation");f.innerHTML="<p></p>",clearInterval(r)}),showDomainButton.addEventListener("click",function(){S();let d=document.getElementById("showDomainButton");ut(d);let f=document.querySelector(".state"),m=document.querySelector(".explanation");if(clearInterval(r),d.value==="ON"){showDomainButton.classList.add("selected");let w="<p>Showing the domain of each square.</p><p>The domain consists of all the numbers 0-9 that are not already present in the same row, column, or 3x3 square."+u[a];f.innerHTML=w,m.innerHTML="<p></p>",J(c)}else showDomainButton.classList.remove("selected"),f.innerHTML="<p>Removed the domain for each square.</p>",m.innerHTML="<p></p>",qe(c)}),A.addEventListener("click",function(){S(),A.classList.add("selected"),s=!1;let d=document.querySelector(".state");d.innerHTML=v[a];let f=document.querySelector(".explanation");f.innerHTML="<p></p>",s=!1,clearInterval(r),$e(),document.getElementById("step").classList.remove("selected"),A.classList.remove("selected"),document.getElementById("showDomainButton").value==="ON"&&J(c)}),F.addEventListener("click",function(){S(),F.classList.add("selected"),clearInterval(r);let d=document.querySelector(".state"),f=document.querySelector(".explanation");if(f.innerHTML="<p></p>",n===0){stepBack.style.setProperty("border","none"),d.innerHTML="<p>At the beginning.</p><p>Use controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>";return}d.innerHTML="<p>Undoing the previous step.</p>";let m=document.getElementById("showDomainButton");if(n>0){if(c=Se(Math.max(n-1,0),c),m.value==="ON"){let w=l[n];getDomain(w[0],w[1],c),J(c)}n-=1}else{if(clearInterval(r),m.value==="ON"){let L=l[n];getDomain(L[0],L[1],c),J(c)}n=0,s=!1;let w=document.querySelector(".explanation");w.innerHTML="<p>Undid all moves back to beginning.</p><p>Continue using controls to play the solution.</p><p>Or choose a different puzzle or solver.</p>"}F.classList.remove("selected")});function S(){C.classList.remove("selected"),B.classList.remove("selected"),le.classList.remove("selected"),P.classList.remove("selected"),_.classList.remove("selected"),A.classList.remove("selected"),F.classList.remove("selected")}function U(){clearInterval(r),q=1e3,n=0,s=!1,E(c)}function E(d){let f=document.getElementById("showDomainButton");f.value==="ON"&&(f.value="OFF",showDomainButton.classList.remove("selected"),qe(d)),i&&!(typeof l>"u")&&!(typeof n>"u")&&(fe(l[n][0],l[n][1],l[n][3]),i=!1)}function Se(d,f){if(E(f),d>n)throw"Rewinding, so new location must be before current";if(d===n)throw"Rewinding, but new location is same as current";return ht(g,l,d,i)}function Le(d,f){let m=document.getElementById("sudokuGraphic");for(;m.lastChild;)m.removeChild(m.lastChild);for(let w=0;w<d;(w+=1)-1){let L=document.createElement("tr");L.classList.add(`row-${w}`),m.appendChild(L);for(let D=0;D<f;(D+=1)-1){let N=document.createElement("td");N.classList.add(`col-${D}`),N.classList.add("sudokubox"),L.appendChild(N)}}}try{Le(9,9),pe(T),U(),Y(h),l=re(h)}catch(d){console.error("Error during grid setup:",d)}}),tt();var M=St();Ze(h=>{var C=yt();Je.title="Sudoku Solver",G(h,C)});var y=x(M),O=z(x(y),4),R=x(O),Q=x(R),ve=x(Q),me=z(x(ve),4),X=x(me);X.value=(X.__value="easy")==null?"":"easy";var Z=z(X);Z.value=(Z.__value="medium")==null?"":"medium";var ee=z(Z);ee.value=(ee.__value="hard")==null?"":"hard";var te=z(ee);te.value=(te.__value="evil")==null?"":"evil";var we=z(te);we.value=(we.__value="random")==null?"":"random",k(me),$(14),k(ve),$(6),k(Q);var be=z(Q,2),oe=x(be),ge=x(oe);Me(ge,5,()=>T,Te,(h,C)=>{var B=xt();Me(B,5,()=>W(C),Te,(P,_)=>{var A=kt(),F=x(A,!0);k(A),Be(()=>ze(F,W(_))),G(P,A)}),k(B),G(h,B)}),k(ge),k(oe);var ye=z(oe,2),ke=x(ye),ne=z(x(ke),14);et(ne);var xe=z(ne,2),Fe=x(xe);k(xe),$(10),k(ke),k(ye),k(be),$(2),k(R),k(O),$(8),k(y),k(M),Be(()=>ze(Fe,`Current speed: ${W(o)??""}`)),nt(ne,()=>W(o),h=>Ke(o,h)),G(e,M),Ye()}export{qt as component};

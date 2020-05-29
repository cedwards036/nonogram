!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e){const n={EMPTY:"empty",FILLED:"filled",BLANK:"blank"},o={FILL:"fill",BLANK:"blank"},r=function(){function t(t,e,n,o){t.hasOwnProperty(e)||(t[e]={}),t[e][n]=o}const e={};return t(e,n.EMPTY,o.FILL,n.FILLED),t(e,n.EMPTY,o.BLANK,n.BLANK),t(e,n.FILLED,o.FILL,n.EMPTY),t(e,n.FILLED,o.BLANK,n.EMPTY),t(e,n.BLANK,o.BLANK,n.EMPTY),t(e,n.BLANK,o.FILL,n.EMPTY),e}();function u(t,e){const n={rowCounts:[],colCounts:[]};for(let t=0;t<e;t++)n.rowCounts.push([0]);for(let e=0;e<t;e++)n.colCounts.push([0]);return n.board=l(t,e),n}function l(t,e){if(0===t||0===e)return[];{let o=[];for(let r=0;r<e;r++){o.push([]);for(let e=0;e<t;e++)o[r].push(n.EMPTY)}return o}}function c(t,e,n,o){const u=o.board[e][n];return o.board[e][n]=r[u][t],o}function a(t,e){const o=[];let r=0;for(var u=0;r<t.board.length;){for(;r<t.board.length&&t.board[r][e]===n.FILLED;)u++,r++;u>0&&(o.push(u),u=0),r++}return 0===o.length?t.colCounts[e]=[0]:t.colCounts[e]=o,t}function s(t,e){const o=[];let r=0;for(var u=0;r<t.board[0].length;){for(;r<t.board[0].length&&t.board[e][r]===n.FILLED;)u++,r++;u>0&&(o.push(u),u=0),r++}return 0===o.length?t.rowCounts[e]=[0]:t.rowCounts[e]=o,t}t.exports={generateSolveGame:function(t,e){return{rowCounts:t,colCounts:e,board:l(t.length,e.length)}},generateCreationGame:u,generateEmptyBoard:l,interactWithCell:c,updateColumnCounts:a,updateRowCounts:s,makeGameFrom2DArray:function(t){const e=u(t[0].length,t.length);for(let n=0;n<t.length;n++)for(let r=0;r<t[0].length;r++)1===t[n][r]&&c(o.FILL,n,r,e);for(let n=0;n<t.length;n++)s(e,n);for(let n=0;n<t[0].length;n++)a(e,n);return e},STATES:n,MESSAGES:o}},function(t,e,n){const o=n(0).STATES;function r(){const t=document.createElement("div");return t.setAttribute("class","row"),t}function u(t,e,n){const o=document.createElement("div");return c(o,l(t[e][n])),o.setAttribute("rowIdx",e),o.setAttribute("colIdx",n),o}function l(t){switch(t){case o.EMPTY:return"empty-cell";case o.FILLED:return"filled-cell";case o.BLANK:return"blank-cell"}}function c(t,e){t.setAttribute("class","cell "+e)}function a(t,e){return t.forEach(t=>{e.appendChild(function(t){const e=document.createElement("div");return e.setAttribute("class","counts-col"),s(e,t)}(t))}),e}function s(t,e){return function(t){for(;t.firstChild;)t.removeChild(t.lastChild)}(t),e.forEach(e=>{t.appendChild(function(t){const e=document.createElement("div");return e.textContent=t,e.setAttribute("class","count"),e}(e))}),t}t.exports={renderGame:function(t){!function(t){const e=document.getElementById("cellGrid");for(let n=0;n<t.board.length;n++){const o=r();for(let e=0;e<t.board[n].length;e++)o.appendChild(u(t.board,n,e));e.appendChild(o)}}(t),function(t){a(t.rowCounts,document.getElementById("rowCounts"))}(t),function(t){a(t.colCounts,document.getElementById("colCounts"))}(t)},updateLineCountsColumnDiv:s,updateCellStateClass:c,getCellClass:l}},function(t,e,n){const o=n(5).makeGameURLQueryString;t.exports={updateGameURL:function(t){document.getElementById("gameURL").textContent=function(t){return window.location.href+"/"+o(t)}(t)}}},function(t,e,n){const o=n(0).generateCreationGame,r=n(1).renderGame,u=n(4).addCellEventListeners,l=n(2).updateGameURL;t.exports={createGame:function(t,e){const n=o(t,e);return r(n),u(n),l(n),n}}},function(t,e,n){const o=n(0).interactWithCell,r=n(0).updateColumnCounts,u=n(0).updateRowCounts,l=n(0).MESSAGES,c=n(1).updateLineCountsColumnDiv,a=n(1).updateCellStateClass,s=n(1).getCellClass,i=n(2).updateGameURL;function f(t,e,n){const l=e.getAttribute("rowIdx"),f=e.getAttribute("colIdx");o(n,l,f,t),function(t,e){r(t,e);const n=(o=e,document.getElementById("colCounts").getElementsByClassName("counts-col")[o]);var o;c(n,t.colCounts[e])}(t,f),function(t,e){u(t,e);const n=(o=e,document.getElementById("rowCounts").getElementsByClassName("counts-col")[o]);var o;c(n,t.rowCounts[e])}(t,l),a(e,s(t.board[l][f])),i(t)}t.exports={addCellEventListeners:function(t){Array.from(document.getElementsByClassName("cell")).forEach(e=>{e.addEventListener("click",()=>{f(t,e,l.FILL)})}),Array.from(document.getElementsByClassName("cell")).forEach(e=>{e.addEventListener("contextmenu",n=>{f(t,e,l.BLANK),n.preventDefault()})})}}},function(t,e,n){const o=n(0).generateSolveGame;function r(t){return t.rowCounts.map(t=>t.join(",")).join(";")+"#"+t.colCounts.map(t=>t.join(",")).join(";")}function u(t){function e(t){return t.split(";").map(t=>t.split(",").map(t=>parseInt(t)))}const n=t.split("#");return{rowCounts:e(n[0]),colCounts:e(n[1])}}function l(t){const e=u(t);return o(e.rowCounts,e.colCounts)}t.exports={makeGameString:r,makeGameURLQueryString:function(t){return btoa(r(t))},parseGameString:u,buildGameFromGameString:l,buildGameFromQueryString:function(t){return l(function(t){return atob(t)}(t))},extractGameQuery:function(t){return t.slice(t.indexOf("?puzzle=")+8)}}},,,function(t,e,n){n(3).createGame}]);
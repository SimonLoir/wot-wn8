!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=55)}({32:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(e){this.message=e,this.name="IndexOutOfArrayException"}}t.IndexOutOfArrayExecption=o;class r{constructor(e,t){var n;if("string"==typeof e)n=document.querySelectorAll(e),null!=t&&(n=[n[t]]);else{if(null==e||e==document)return this.ready=function(e){document.addEventListener("DOMContentLoaded",e)},this;if("object"!=typeof e)return"ExtJsObject"==e.type?e:void 0;n=null==e.length?[e]:null!=t?[e[t]]:e}this.type="ExtJsObject",this.node=n}html(e){if(null!=e){for(var t=0;t<this.node.length;t++){var n=this.node[t];"string"!=typeof e&&"number"!=typeof e||(n.innerHTML=e)}return this}return this.node[0].innerHTML}text(e){if(null!=e){for(var t=0;t<this.node.length;t++){var n=this.node[t];"string"!=typeof e&&"number"!=typeof e||(n.innerText=e)}return this}return this.node[0].innerText}click(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e?o.addEventListener("click",e):o.click();else if(void 0!==e){var r=o;o.addEventListener("click",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}else{(r=o).querySelector(t).click()}}return this}dblclick(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e?o.addEventListener("dblclick",e):o.dblclick();else if(void 0!==e){var r=o;o.addEventListener("dblclick",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}else{(r=o).querySelector(t).dblclick()}}return this}hover(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e?o.addEventListener("mouseover",e):o.click();else if(void 0!==e){var r=o;o.addEventListener("mouseover",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}leave(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e?o.addEventListener("mouseleave",e):o.click();else if(void 0!==e){var r=o;o.addEventListener("mouseleave",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}get(e){if(null!=e){if(null==this.node[e])throw new o("ExtJsObject.get undefined index node["+e+"]");return this.node[e]}if(null==this.node[0])throw new o("ExtJsObject.get undefined index node[0]");return this.node[0]}exists(e){return null!=e?null!=this.node[e]:0!=this.node.length}height(e){for(var t=0;t<this.node.length;t++){var n=this.node[t];if(void 0===e)return n.offsetHeight;n.style.height=e}return this}width(e){for(var t=0;t<this.node.length;t++){var n=this.node[t];if(void 0===e)return n.offsetWidth;n.style.width=e}return this}addClass(e){for(var t=0;t<this.node.length;t++){this.node[t].classList.add(e)}return this}hasClass(e){return this.node[0].classList.contains(e)}removeClass(e){for(var t=0;t<this.node.length;t++){this.node[t].classList.remove(e)}return this}remove(){for(var e=0;e<this.node.length;e++){var t=this.node[e];t.parentElement.removeChild(t)}}child(e){for(var t=[],n=0;n<this.node.length;n++){var o=this.node[n],r=document.createElement(e);o.appendChild(r),t.push(r)}return i(t)}css(e,t,n){var o=n;if(null==n&&(n=0),null==t)return this.node[n].style[e];if(null!=o)return this.node[n].style[e]=t,this;for(let n=0;n<this.node.length;n++){this.node[n].style[e]=t}return this}attr(e,t,n){var o=n;if(null==n&&(n=0),null==t)return this.node[n].getAttribute(e);if(null!=o)return this.node[n].style[e]=t,this;for(let n=0;n<this.node.length;n++){this.node[n].setAttribute(e,t)}return this}parent(e){for(var t=[],n=0;n<this.node.length;n++){var o=this.node[n];null==e?t.push(o.parentElement):t.push(o.closest(e))}return i(t)}value(e){if(null!=e){for(var t=0;t<this.node.length;t++){var n=this.node[t];"string"!=typeof e&&"number"!=typeof e||(n.value=e)}return this}this.node[0];return this.node[0].value}keypress(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e&&o.addEventListener("keypress",e);else if(void 0!==e){var r=o;o.addEventListener("keypress",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}input(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e&&o.addEventListener("input",e);else if(void 0!==e){var r=o;o.addEventListener("input",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}keydown(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e&&o.addEventListener("keydown",e);else if(void 0!==e){var r=o;o.addEventListener("keydown",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}change(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e&&o.addEventListener("change",e);else if(void 0!==e){var r=o;o.addEventListener("change",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}keyup(e,t){for(var n=0;n<this.node.length;n++){var o=this.node[n];if(void 0===t)void 0!==e&&o.addEventListener("keyup",e);else if(void 0!==e){var r=o;o.addEventListener("keyup",(function(n){if(r.querySelector(t)==n.target){let n=r.querySelector(t);n.prototype.toDo=e,n.toDo()}}))}}return this}prevSibling(){let e=[];for(var t=0;t<this.node.length;t++){var n=this.node[t];e.push(n.previousSibling)}return i(e)}nextSibling(){let e=[];for(var t=0;t<this.node.length;t++){var n=this.node[t];e.push(n.nextSibling)}return i(e)}appendTo(e){let t=this.get(0);e.get(0).appendChild(t)}count(){return this.node.length}forEach(e){for(let t=0;t<this.node.length;t++){const n=this.node[t];e.bind(n)(t)}return this}cssObj(e){return Object.keys(e).forEach(t=>{this.css(t,e[t])}),this}children(e){return i(this.node[0].querySelectorAll(e))}only(e){return i(this.node[e])}}t.ExtJsObject=r;function i(e,t){return null!=e?new r(e,t):this}t.AR=new class{request(e,t,n,o,r){let i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status)o(i.responseText);else if(4==i.readyState&&null!=r)try{r()}catch(e){}},i.open("GET"==e||"DELETE"==e?"GET":"POST",t,!0);let a="";if(null!=n){let e=Object.keys(n);for(let t=0;t<e.length;t++)0!==t&&(a+="&"),a=a+e[t]+"="+n[e[t]];i.setRequestHeader("Content-type","application/x-www-form-urlencoded")}"PUT"!=e&&"DELETE"!=e||i.setRequestHeader("x-http-method-override",e),""!=a?i.send(a):i.send()}GET(e,t,n){return this.request("GET",e,void 0,t,n)}DELETE(e,t,n){return this.request("DELETE",e,void 0,t,n)}POST(e,t,n,o){return this.request("POST",e,t,n,o)}PUT(e,t,n,o){return this.request("PUT",e,t,n,o)}},t.$=i},39:function(e,t,n){var o=n(40),r=n(41);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);e.exports=r.locals||{}},40:function(e,t,n){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},o=[],r=0;r<e.length;r++){var i=e[r],l=t.base?i[0]+t.base:i[0],d=n[l]||0,c="".concat(l," ").concat(d);n[l]=d+1;var u=s(c),p={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:c,updater:g(p,t),references:1}),o.push(c)}return o}function d(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var r=n.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var c,u=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function p(e,t,n,o){var r=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=u(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function h(e,t,n){var o=n.css,r=n.media,i=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),i&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var f=null,v=0;function g(e,t){var n,o,r;if(t.singleton){var i=v++;n=f||(f=d(t)),o=p.bind(null,n,i,!1),r=p.bind(null,n,i,!0)}else n=d(t),o=h.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var r=s(n[o]);a[r].references--}for(var i=l(e,t),d=0;d<n.length;d++){var c=s(n[d]);0===a[c].references&&(a[c].updater(),a.splice(c,1))}n=i}}}},41:function(e,t,n){(t=n(42)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;900&display=swap);"]),t.push([e.i,"body{font-family:'Roboto', sans-serif;padding:0;margin:0;font-weight:300;color:#2a3335}.icon{display:inline-block;vertical-align:middle;width:60px;text-align:center;font-size:20px}header{position:relative;border-bottom:1px solid #E4E8F0;line-height:60px}header #app-menu,header #app-title{vertical-align:middle}header #app-menu{display:inline-block;width:60px;height:60px;border-right:1px solid #E4E8F0;user-select:none}header #app-menu .icon i{cursor:pointer}header #app-title{font-weight:500;padding-left:25px}#app-left-bar{user-select:none;width:60px;position:fixed;top:61px;bottom:0;left:0;border-right:1px solid #E4E8F0}#app-left-bar .item{line-height:60px;font-weight:500;color:gray;cursor:pointer;border-bottom:1px solid #E4E8F0}#app-left-bar .item span{display:none}main{position:absolute;top:62px;left:61px;bottom:0;right:0;background:#f4f4f4;padding:25px;overflow:auto}.expended header #app-menu{display:inline-block;width:300px}.expended #app-left-bar{width:300px}.expended #app-left-bar .item span{display:inline-block}.expended main{left:301px;z-index:-1}.section{border:1px solid #f1f1f1;padding:25px;background:white;border-radius:8px}.section .header{color:#8798ad;text-transform:uppercase;font-size:12px}.section .content{padding-top:25px}.section+.section,.section+.ad{margin-top:25px}.section .data-graph{height:50vh;position:relative}.ad+.section,.ad+.ad{margin-top:25px}table{font-family:\"Roboto\", sans-serif;border-collapse:collapse;width:100%}td,th{border:1px solid #eee;text-align:left;padding:8px}tr:nth-child(even){background-color:#eee}\n",""]),e.exports=t},42:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=(a=o,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),i=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([r]).join("\n")}var a,s,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(r[a]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);o&&r[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},43:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(32);t.default=function(){o.$("#menu").click((function(){const e=o.$(".app");e.hasClass("expended")?(o.$(this).removeClass("icon-left"),o.$(this).addClass("icon-menu"),e.removeClass("expended")):(o.$(this).removeClass("icon-menu"),o.$(this).addClass("icon-left"),e.addClass("expended"))})),o.$("#go-home").click(()=>{window.location.href="/"})}},50:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createAd=function(e){const t=e.child("div").addClass("ad");t.css("textAlign","center"),t.html("")}},51:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(32);t.default=function(e){const t=o.$("main").child("div").addClass("section");return t.child("div").addClass("header").text(e),{container:t,content:t.child("div").addClass("content")}}},55:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),n(39);const r=n(43),i=n(51),a=n(56),s=n(32),l=n(50),d=n(61),c=window.data.user_id,u=i.default("Loading...");u.content.text("Please wait while we are loading data from the server"),r.default(),fetch(`api/player/${c}/data`).then(e=>e.json()).then(e=>o(void 0,void 0,void 0,(function*(){const[t,n]=yield Promise.all([(yield fetch("api/expected")).json(),(yield fetch("api/tanks")).json()]),o={IDNum:0,expDef:0,expFrag:0,expSpot:0,expDamage:0,expWinRate:0};let r=e.tanks_stats.map(e=>{const r=e.damage_dealt/e.battles,i=e.xp/e.battles,s=e.spotted/e.battles,l=e.frags/e.battles,d=e.dropped_capture_points/e.battles,c=100*e.wins/(e.wins+e.draws+e.losses);let u;try{const n=t[e.tank_id];u=a.computeWN8(r,s,l,d,c,n),o.expDamage+=e.battles*n.expDamage,o.expDef+=e.battles*n.expDef,o.expFrag+=e.battles*n.expFrag,o.expSpot+=e.battles*n.expSpot,o.expWinRate+=.01*e.battles*n.expWinRate}catch(e){u=-1}return Object.assign(Object.assign({name:"",tier:0,premium:!1,avg_damages:r,avg_spot:s,avg_frag:l,avg_def:d,avg_win_rate:c,avg_xp:i,wn8:u},e),{data:n[e.tank_id]})});const p=e.player.statistics.all,h=p.damage_dealt/o.expDamage,f=p.spotted/o.expSpot,v=p.frags/o.expFrag,g=p.dropped_capture_points/o.expDef,m=p.wins/o.expWinRate,y=a.wn8(h,f,v,g,m);u.container.remove();const x=i.default("Informations about "+e.player.nickname);l.createAd(s.$("main")),x.content.html(`\n        <span \n            style="color: ${a.getColor(y)}; font-size: 25px; \n            margin-bottom:15px;display: block;">\n            ${y.toFixed(0)}\n        </span>\n        Last battle : \n        ${new Date(1e3*e.player.last_battle_time).toLocaleString()} \n        <br />\n        Last seen : ${new Date(1e3*e.player.logout_at).toLocaleString()} \n        `);const b=i.default("Informations about "+e.player.nickname+" tanks").content.child("table");let w=d.getCookie("last"),E=1;const _=e=>{r=r.sort((t,n)=>{const o=t[e],r=n[e];return o<r?-1*E:o>r?1*E:0*E})},k=e=>{w==e+".asc"?(E=1,w=e+".desc",d.setCookie("last",e+".asc")):(E=-1,d.setCookie("last",e+".desc"),w=e+".asc")};r.forEach(e=>{var t,n,o;(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.name)&&(e.name=e.data.name),(null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.tier)&&(e.tier=e.data.tier),(null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.is_premium)&&(e.premium=e.data.is_premium)});const S=()=>{b.html("");const e=b.child("tr");[["Tier","tier"],["Tank","name"],["Win","avg_win_rate"],["Avg Dmg","avg_damages"],["Avg XP","avg_xp"],["Avg Spot","avg_spot"],["Battles","battles"],["WN8","wn8"]].forEach(([t,n])=>((e,t)=>{e.click(()=>{k(t),_(t),S()})})(e.child("th").text(t).css("cursor","pointer"),n)),r.forEach(e=>{const t=b.child("tr");t.child("td").text(e.tier.toString()),t.child("td").html(`\n                <img src="\n                ${""!=e.name?e.data.images.small_icon.replace("http://","https://"):""}\n                " style="vertical-align: middle;">\n                <span style="vertical-align: middle;">${e.name} ${e.premium?"&#9733;":""}</span>\n                `).css("cursor","pointer").click(()=>{window.location.href=c+"/"+e.tank_id}),t.child("td").text(e.avg_win_rate.toFixed(2)),t.child("td").text(e.avg_damages.toFixed(0)),t.child("td").text(e.avg_xp.toFixed(0)),t.child("td").text(e.avg_spot.toFixed(2)),t.child("td").text(e.battles.toFixed(0)),t.child("td").text(e.wn8.toFixed(0)).css("background",a.getColor(e.wn8)).css("color","white")})};let L=w.split(".")[0];L=""!=L?L:"wn8",k(L),_(L),S()})))},56:function(e,t,n){"use strict";function o(e,t,n,o,r){const i=Math.max(0,(r-.71)/(1-.71)),a=Math.max(0,(e-.22)/.78),s=Math.max(0,Math.min(a+.2,(n-.12)/.88));return 980*a+210*a*s+155*s*Math.max(0,Math.min(a+.1,(t-.38)/.62))+75*Math.max(0,Math.min(a+.1,(o-.1)/.9))*s+145*Math.min(1.8,i)}Object.defineProperty(t,"__esModule",{value:!0}),t.computeWN8=function(e,t,n,r,i,a){return o(e/a.expDamage,t/a.expSpot,n/a.expFrag,r/a.expDef,i/a.expWinRate)},t.wn8=o,t.getColor=function(e){return e<300?"black":e<599?"rgb(205,51,51)":e<899?"rgb(215,121,0)":e<1249?"rgb(215,182,0)":e<1599?"rgb(109,149,33)":e<1899?"rgb(76,118,46)":e<2349?"rgb(74,146,183)":e<2899?"rgb(131,87,157)":"rgb(90,49,117)"}},61:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setCookie=function(e,t,n=1){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var r="expires="+o.toUTCString();document.cookie=e+"="+t+";"+r+";path=/"},t.getCookie=function(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var r=n[o];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return console.log("cookie set",e),""}}});
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(o,s,function(e){return t[e]}.bind(null,s));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(s,i){function r(t){try{c(o.next(t))}catch(t){i(t)}}function a(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}c((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=n(3);e.default=class{constructor(t,e="eu"){this.appID=t,this.server=e,this.serialize=function(t){let e=[];for(let n in t)t.hasOwnProperty(n)&&e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")}}call(t,e){return o(this,void 0,void 0,(function*(){e.application_id=this.appID;const n=this.serialize(e),o=`https://api.worldoftanks.${this.server}/wot/${t}/?${n}`;return console.log(o),yield(yield s.default(o)).json()}))}}},function(t,e){t.exports=require("express")},function(t,e,n){"use strict";function o(t,e){e.status(500).json({type:"error",message:t})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o,e.asyn=function(t){return function(e,n){t(e,n).catch(t=>{t.errno&&t.sqlMessage?o(`SQL ERROR ${t.errno} : ${t.sqlMessage}`,n):o(t,n)})}}},function(t,e){t.exports=require("node-fetch")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(5),s=n(1),i=n(6);o.config();const r=n(7),a=n(2),{APP_BASE_URL:c="/",PORT:u=8080,NODE_ENV:d="development"}=process.env,l=s();l.set("view engine","ejs"),l.use(i),l.set("views","public/"),l.use(c,s.static("public")),l.use(c+"api",r.API),l.get(c,(t,e)=>{e.render("index")}),l.get(c+":user_id",(t,e)=>{e.render("stats",{params:t.params})}),l.listen(u,()=>console.log("Server started at "+(new Date).toString())),l.use((t,e,n,o)=>{a.default(t.message,n)})},function(t,e){t.exports=require("dotenv")},function(t,e){t.exports=require("express-force-https")},function(t,e,n){"use strict";var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(s,i){function r(t){try{c(o.next(t))}catch(t){i(t)}}function a(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}c((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=n(1),i=n(8),r=n(2),a=n(9),c=n(3),u=n(12);e.API=s.Router();const d=new a.default(process.env.APPID,"eu");e.API.get("/player/:name",r.asyn((t,e)=>o(void 0,void 0,void 0,(function*(){e.json(yield d.accounts.search(t.params.name))})))),e.API.get("/update-expected",r.asyn((t,e)=>o(void 0,void 0,void 0,(function*(){const t=yield(yield c.default("https://static.modxvm.com/wn8-data-exp/json/wn8exp.json")).json();let n={};t.data.forEach(t=>{n[t.IDNum]=t}),i.writeFileSync("data/exp.json",JSON.stringify(n)),e.send("done")})))),e.API.get("/update-tanks",r.asyn((t,e)=>o(void 0,void 0,void 0,(function*(){const t=yield d.tanks.getAll();i.writeFileSync("data/tanks.json",JSON.stringify(t)),e.send("done")})))),e.API.use("/tanks",s.static("data/tanks.json")),e.API.use("/expected",s.static("data/exp.json")),e.API.get("/player/:player_id/data",r.asyn((t,e)=>o(void 0,void 0,void 0,(function*(){const n=t.params.player_id;console.log("Player data asked for "+n);const o=yield d.accounts.info(n);if(!(null==o?void 0:o.data[n]))throw"Fatal error while loading the user";const s=o.data[n];const i=(yield u.database.query("SELECT * FROM snapshots WHERE pid = ? AND time = ?",[n,s.updated_at.toString()]))[0];if(i)e.json({player:s,tanks_stats:(yield u.database.query("SELECT * FROM snapshots_data WHERE id = ?",[i.id])).map(t=>JSON.parse(t.data))});else{const t=(yield d.tanks.stats(n)).data[n].map(t=>Object.assign({tank_id:t.tank_id},t.all));e.json({player:s,tanks_stats:t});const o=(yield u.database.query("INSERT INTO snapshots VALUES (NULL, ?, ?)",[n,s.updated_at.toString()])).insertId;t.forEach(t=>u.database.query("INSERT INTO snapshots_data VALUES (?, ?, ?)",[o.toString(),t.tank_id,JSON.stringify(t)]))}})))),e.API.get("/player/:player_id/snapshots",r.asyn((t,e)=>o(void 0,void 0,void 0,(function*(){e.json(yield u.database.query("SELECT * FROM snapshots_data s WHERE s.id IN (\n                    SELECT MAX(id) AS id\n                    FROM snapshots \n                    WHERE pid = ?\n                    GROUP BY `date`)",[t.params.player_id]))}))))},function(t,e){t.exports=require("fs")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=n(0),s=n(10),i=n(11);class r extends o.default{constructor(t,e="eu"){super(t,e),this.accounts=new s.default(t,e),this.tanks=new i.default(t,e)}}e.default=r},function(t,e,n){"use strict";var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(s,i){function r(t){try{c(o.next(t))}catch(t){i(t)}}function a(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}c((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=n(0);class i extends s.default{search(t){return o(this,void 0,void 0,(function*(){return yield this.call("account/list",{search:t})}))}info(t,e="account_id, nickname, updated_at, statistics.all, created_at, logout_at, last_battle_time"){return o(this,void 0,void 0,(function*(){return yield this.call("account/info",{account_id:t,fields:e})}))}}e.default=i},function(t,e,n){"use strict";var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(s,i){function r(t){try{c(o.next(t))}catch(t){i(t)}}function a(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}c((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=n(0);class i extends s.default{stats(t){return o(this,void 0,void 0,(function*(){return yield this.call("tanks/stats",{account_id:t,fields:"all, tank_id"})}))}getAll(){return o(this,void 0,void 0,(function*(){return(yield this.call("encyclopedia/vehicles",{fields:"is_premium, images.small_icon, name, tier"})).data}))}}e.default=i},function(t,e,n){"use strict";var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(s,i){function r(t){try{c(o.next(t))}catch(t){i(t)}}function a(t){try{c(o.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}c((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const s=n(13);class i{constructor(){this._output_errors=!process.env.ERRORS||"1"==process.env.ERRORS}get connection(){return this._con||(this._con=s.createConnection({host:process.env.DB_HOST||"localhost",user:process.env.DB_USER||"root",password:process.env.DB_PSSWD||"",database:process.env.DB_NAME||"wn8master",charset:"utf8mb4_unicode_ci"})),this._con}query(t,e=[]){return o(this,void 0,void 0,(function*(){return new Promise((n,o)=>{this.connection.query(t,e,(t,e)=>{t&&(this._output_errors?o(t):o("Database error")),n(e)})})}))}beginTransaction(){return o(this,void 0,void 0,(function*(){return new Promise((t,e)=>{this.connection.beginTransaction(n=>{n&&(this._output_errors?e(n):e("Database error")),t()})})}))}commit(){return o(this,void 0,void 0,(function*(){return new Promise((t,e)=>{this.connection.commit(n=>{n&&(this._output_errors?e(n):e("Database error")),t()})})}))}rollback(){return o(this,void 0,void 0,(function*(){return new Promise((t,e)=>{this.connection.rollback(n=>{n&&(this._output_errors?e(n):e("Database error")),t()})})}))}end(){return new Promise((t,e)=>{this.connection.end(n=>{n&&(this._output_errors?e(n):e("Database error")),t()})})}}e.db=i,e.database=new i},function(t,e){t.exports=require("mysql")}]);
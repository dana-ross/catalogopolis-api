!function(r){function e(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return r[t].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=r,e.c=n,e.i=function(r){return r},e.d=function(r,n,t){e.o(r,n)||Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:t})},e.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(n,"a",n),n},e.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},e.p="",e(e.s=3)}([function(r,e){r.exports=require("chai")},function(r,e,n){"use strict";function t(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function r(r,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}}return function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}}();e.Actor=function(){function r(){t(this,r)}return o(r,[{key:"addHATEAOS",value:function(e){return void 0===e&&(e=this),e.links=[],e.links.push({rel:"self",href:r.restv1URL(e.id)}),e}}],[{key:"restv1URL",value:function(r){return"/v1/actors"+(void 0!==r?"/"+r:"")}},{key:"fromRow",value:function(e){var n=new r;return e.id&&(n.id=e.id),e.name&&(n.name=e.name),n}},{key:"forID",value:function(e,n){return new Promise(function(t,o){e.all("SELECT * FROM actors WHERE id = ?",[n],function(e,n,i){e?o({error:{message:"Error while performing Query."}}):t(n&&n.length?r.fromRow(n[0]).addHATEAOS():[])})})}},{key:"all",value:function(e){return new Promise(function(n,t){e.all("SELECT * FROM actors ORDER BY id",[],function(e,o,i){e?t({error:{message:"Error while performing Query."}}):n(o&&o.length?o.map(function(e){return r.fromRow(e).addHATEAOS()}):[])})})}},{key:"forName",value:function(e,n){return new Promise(function(t,o){e.all("SELECT * FROM actors WHERE name = ?",[n],function(e,n,i){e?o({error:{message:"Error while performing Query."}}):t(n&&n.length?r.fromRow(n[0]).addHATEAOS():[])})})}}]),r}()},function(r,e){r.exports=require("mocha")},function(r,e,n){"use strict";n(2);var t=n(1),o=n(0).assert,i=n(0).expect;describe("Actor",function(){it("generates correct restV1 URLs",function(){i(t.Actor.restv1URL(1)).to.be.a("string"),o.equal("/v1/actors/1",t.Actor.restv1URL(1),"Actor restv1URL is correct")})})}]);
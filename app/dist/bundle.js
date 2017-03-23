!function(e){function r(i){if(n[i])return n[i].exports;var t=n[i]={i:i,l:!1,exports:{}};return e[i].call(t.exports,t,t.exports,r),t.l=!0,t.exports}var n={};r.m=e,r.c=n,r.i=function(e){return e},r.d=function(e,n,i){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=13)}([function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}();r.Serial=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM serials WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"forTitle",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM serials WHERE title = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM serials ORDER BY id",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()},t):[])})})}},{key:"fromRow",value:function(r){var n=new e;return r.id&&(n.id=r.id),r.season_id&&(n.seasonID=r.season_id),r.story&&(n.story=r.story),r.serial&&(n.serial=r.serial),r.title&&(n.title=r.title),r.production_code&&(n.productionCode=r.production_code),n}},{key:"restv1URL",value:function(e){return"/v1/serials/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}}]),e}()},function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}();r.Actor=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"restv1URL",value:function(e){return"/v1/actors/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}},{key:"fromRow",value:function(r){var n=new e;return r.id&&(n.id=r.id),r.name&&(n.name=r.name),n}},{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM actors WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM actors ORDER BY id",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()}):[])})})}},{key:"forName",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM actors WHERE name = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}}]),e}()},function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0}),r.Director=void 0;var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}(),o=n(0);r.Director=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM directors WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM directors ORDER BY id",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()}):[])})})}},{key:"forName",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM directors WHERE name = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"forSerialID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT directors.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE serials.id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"serials",value:function(e,r){return new Promise(function(n,i){e.all("SELECT serials.* FROM serials INNER JOIN serials_directors ON serials.id = serials_directors.serial_id INNER JOIN directors ON serials_directors.director_id = directors.id WHERE directors.id = ? ORDER BY serials.id",[r],function(e,r,t){e?i({error:{message:"Error while performing Query."}}):n(r&&r.length?r.map(function(e){return o.Serial.fromRow(e).addHATEAOS()},r):[])})})}},{key:"fromRow",value:function(r){var n=new e;return r.id&&(n.id=r.id),r.name&&(n.name=r.name),n}},{key:"restv1URL",value:function(e){return"/v1/directors/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}}]),e}()},function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0}),r.Doctor=void 0;var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}(),o=n(0),s=n(1);r.Doctor=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM doctors WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"forIncarnation",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM doctors WHERE incarnation = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"forPrimaryActorID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM doctors WHERE primary_actor = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"actors",value:function(e,r){return new Promise(function(n,i){e.all("SELECT actors.* FROM actors INNER JOIN doctors ON actors.id = doctors.primary_actor WHERE doctors.id = ? ORDER BY actors.id",[r],function(e,r,t){e?i({error:{message:"Error while performing Query."}}):n(r&&r.length?r.map(function(e){return s.Actor.fromRow(e).addHATEAOS()},r):[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM doctors ORDER BY id",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()},t):[])})})}},{key:"forSerialID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT doctors.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE serials.id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"serials",value:function(e,r){return new Promise(function(n,i){e.all("SELECT serials.* FROM serials INNER JOIN serials_doctors ON serials.id = serials_doctors.serial_id INNER JOIN doctors ON serials_doctors.doctor_id = doctors.id WHERE doctors.id = ? ORDER BY serials.id",[r],function(e,r,t){e?i({error:{message:"Error while performing Query."}}):n(r&&r.length?r.map(function(e){return o.Serial.fromRow(e).addHATEAOS()},r):[])})})}},{key:"fromRow",value:function(r){var n=new e;return r.id&&(n.id=r.id),r.incarnation&&(n.incarnation=r.incarnation),r.primary_actor&&(n.primaryActorID=r.primary_actor),n}},{key:"restv1URL",value:function(e){return"/v1/doctors/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}}]),e}()},function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}(),o=r.Episode=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM episodes WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM episodes ORDER BY serial_id, episode_order",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()},t):[])})})}},{key:"forSerialID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT episodes.* FROM episodes WHERE episodes.serial_id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"forTitle",value:function(r,n){return new Promise(function(i,t){r.all("SELECT episodes.* FROM episodes WHERE episodes.title = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"forOriginalAirDate",value:function(r,n){return new Promise(function(i,t){r.all("SELECT episodes.* FROM episodes WHERE episodes.original_air_date = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"forMissingStatus",value:function(r,n){return new Promise(function(i,t){r.all("SELECT episodes.* FROM episodes WHERE episodes.missing = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"restv1URL",value:function(e){return"/v1/episodes/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}}]),e}();o.fromRow=function(e){var r=new o;return e.id&&(r.id=e.id),e.title&&(r.title=e.title),e.serial_id&&(r.serialID=e.serial_id),e.episode_order&&(r.episodeOrder=e.episode_order),e.original_air_date&&(r.originalAirDate=e.original_air_date),e.runtime&&(r.runtime=e.runtime),e.uk_viewers_mm&&(r.ukViewersMM=e.uk_viewers_mm),e.appreciation_index&&(r.appreciationIndex=e.appreciation_index),e.missing&&(r.missing=1===e.missing),e.recreated&&(r.recreated=1===e.recreated),r}},function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0}),r.Season=void 0;var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}(),o=n(0);r.Season=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM seasons WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"forName",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM seasons WHERE name = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"serials",value:function(e,r){return new Promise(function(n,i){e.all("SELECT serials.* FROM serials WHERE serials.season_id = ? ORDER BY serials.id",[r],function(e,r,t){e?i({error:{message:"Error while performing Query."}}):n(r&&r.length?r.map(function(e){return o.Serial.fromRow(e).addHATEAOS()},r):[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM seasons ORDER BY id",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()}):[])})})}},{key:"fromRow",value:function(r){var n=new e;return r.id&&(n.id=r.id),r.name&&(n.name=r.name),n}},{key:"restv1URL",value:function(e){return"/v1/seasons/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}}]),e}()},function(e,r,n){"use strict";function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0}),r.Writer=void 0;var t=function(){function e(e,r){for(var n=0;n<r.length;n++){var i=r[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(r,n,i){return n&&e(r.prototype,n),i&&e(r,i),r}}(),o=n(0);r.Writer=function(){function e(){i(this,e)}return t(e,[{key:"addHATEAOS",value:function(){return e.addHATEAOSTo(this)}}],[{key:"forID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM writers WHERE id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"all",value:function(r){return new Promise(function(n,i){r.all("SELECT * FROM writers ORDER BY id",[],function(r,t,o){r?i({error:{message:"Error while performing Query."}}):n(t&&t.length?t.map(function(r){return e.fromRow(r).addHATEAOS()},t):[])})})}},{key:"forName",value:function(r,n){return new Promise(function(i,t){r.all("SELECT * FROM writers WHERE name = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?e.fromRow(n[0]).addHATEAOS():[])})})}},{key:"forSerialID",value:function(r,n){return new Promise(function(i,t){r.all("SELECT writers.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE serials.id = ?",[n],function(r,n,o){r?t({error:{message:"Error while performing Query."}}):i(n&&n.length?n.map(function(r){return e.fromRow(r).addHATEAOS()},n):[])})})}},{key:"serials",value:function(e,r){return new Promise(function(n,i){e.all("SELECT serials.* FROM serials INNER JOIN serials_writers ON serials.id = serials_writers.serial_id INNER JOIN writers ON serials_writers.writer_id = writers.id WHERE writers.id = ? ORDER BY serials.id",[r],function(e,r,t){e?i({error:{message:"Error while performing Query."}}):n(r&&r.length?r.map(function(e){return o.Serial.fromRow(e).addHATEAOS()},r):[])})})}},{key:"fromRow",value:function(r){var n=new e;return r.id&&(n.id=r.id),r.name&&(n.name=r.name),n}},{key:"restv1URL",value:function(e){return"/v1/writers/"+e}},{key:"addHATEAOSTo",value:function(r){return r.links=[],r.links.push({rel:"self",href:e.restv1URL(r.id)}),r}}]),e}()},function(e,r,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function t(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return new Promise(function(e,n){Promise.all(r.filter(function(e){return null!==e})).then(function(r){return e(h(r)?r[0]:null)},function(e){return n(e)})})}Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,r){var n=new o.GraphQLObjectType({name:"Actor",description:"An actor",fields:function(){return{id:{type:o.GraphQLID,description:"Actor ID"},name:{type:o.GraphQLString,description:"Actor name"}}}}),i=new o.GraphQLObjectType({name:"Doctor",description:"A single incarnation of The Doctor",fields:function(){return{id:{type:o.GraphQLID,description:"Doctor ID"},incarnation:{type:o.GraphQLString,description:"Name of this incarnation of The Doctor"},primaryActor:{type:n,description:"The actor who usually portrayed this incarnation of The Doctor",resolve:function(e){return new Promise(function(n,i){p.Actor.forID(r,e.primaryActorID).then(function(e){return n(e)},function(e){return i(e)})})}},serials:{type:new o.GraphQLList(g),description:"Serials",resolve:function(e){return new Promise(function(n,i){u.Doctor.serials(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}}}}}),s=new o.GraphQLObjectType({name:"Director",description:"The director of an episode",fields:function(){return{id:{type:o.GraphQLID,description:"Director ID"},name:{type:o.GraphQLString,description:"Director name"},serials:{type:new o.GraphQLList(g),description:"Serials",resolve:function(e){return new Promise(function(n,i){l.Director.serials(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}}}}}),E=new o.GraphQLObjectType({name:"Writer",description:"The writer of an episode",fields:function(){return{id:{type:o.GraphQLID,description:"Writer ID"},name:{type:o.GraphQLString,description:"Writer name"},serials:{type:new o.GraphQLList(g),description:"Serials",resolve:function(e){return new Promise(function(n,i){c.Writer.serials(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}}}}}),h=new o.GraphQLObjectType({name:"Episode",description:"An episode of a Serial, or a single episode of the show",fields:function(){return{id:{type:o.GraphQLID,description:"Episode ID"},title:{type:o.GraphQLString,description:"Episode title"},serial:{type:g,description:"Serial this Episode appears in",resolve:function(e){return new Promise(function(n,i){f.Serial.forID(r,e.serialID).then(function(e){return n(e)},function(e){return i(e)})})}},episodeOrder:{type:o.GraphQLInt,description:"Episode order within a serial"},originalAirDate:{type:o.GraphQLString,description:"Original air date (yyyy-mm-dd)"},runtime:{type:o.GraphQLString,description:"Original running time (hh:mm)"},ukViewersMM:{type:o.GraphQLFloat,description:"UK viewers (millions) of the first showing"},appreciationIndex:{type:o.GraphQLInt,description:"Appreciation Index of the first showing"},missing:{type:o.GraphQLBoolean,description:"Whether the episode is currently missing"},recreated:{type:o.GraphQLBoolean,description:"Whether a missing episode has been officially re-created (such as the animated re-creations)"}}}}),y=new o.GraphQLObjectType({name:"Season",description:"A season of the show",fields:function(){return{id:{type:o.GraphQLID,description:"Season ID"},name:{type:o.GraphQLString,description:"Season name"},serials:{type:new o.GraphQLList(g),description:"Serials",resolve:function(e){return new Promise(function(n,i){d.Season.serials(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}}}}}),g=new o.GraphQLObjectType({name:"Serial",description:"A serial or single episode",fields:function(){return{id:{type:o.GraphQLID,description:"Serial ID"},season:{type:y,description:"Season",resolve:function(e){return new Promise(function(n,i){d.Season.forID(r,e.seasonID).then(function(e){return n(e)},function(e){return i(e)})})}},story:{type:o.GraphQLInt,description:"Story number"},serial:{type:o.GraphQLInt,description:"Serial episode number"},title:{type:o.GraphQLString,description:"Serial title"},productionCode:{type:o.GraphQLString,description:"Serial production code"},doctors:{type:new o.GraphQLList(i),description:"Doctor(s) who appeared in this episode",resolve:function(e){return new Promise(function(n,i){u.Doctor.forSerialID(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}},directors:{type:new o.GraphQLList(s),description:"Directors of this serial",resolve:function(e){return new Promise(function(n,i){l.Director.forSerialID(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}},writers:{type:new o.GraphQLList(E),description:"Writers of this serial",resolve:function(e){return new Promise(function(n,i){c.Writer.forSerialID(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}},episodes:{type:new o.GraphQLList(h),description:"Episodes in this serial",resolve:function(e){return new Promise(function(n,i){m.Episode.forSerialID(r,e.id).then(function(e){return n(e)},function(e){return i(e)})})}}}}}),w=new o.GraphQLSchema({query:new o.GraphQLObjectType({name:"RootQueryType",fields:{doctor:{type:i,args:{id:{description:"Doctor ID",type:o.GraphQLID},incarnation:{description:"Name of this incarnation of The Doctor",type:o.GraphQLString},primaryActorID:{description:"The actor who usually portrayed this incarnation of The Doctor",type:o.GraphQLID}},resolve:function(e,n){var i=n.id,o=n.incarnation,s=n.primaryActorID;return t(i?u.Doctor.forID(r,i):null,o?u.Doctor.forIncarnation(r,o):null,s?u.Doctor.forPrimaryActorID(r,s):null)}},director:{type:s,args:{id:{description:"Director ID",type:o.GraphQLID},name:{description:"Director name",type:o.GraphQLString}},resolve:function(e,n){var i=n.id,o=n.name;return t(i?l.Director.forID(r,i):null,o?l.Director.forName(r,o):null)}},writer:{type:E,args:{id:{description:"Writer ID",type:o.GraphQLID},name:{description:"Writer name",type:o.GraphQLString}},resolve:function(e,n){var i=n.id,o=n.name;return t(i?c.Writer.forID(r,i):null,o?c.Writer.forName(r,o):null)}},season:{type:y,args:{id:{description:"Season ID",type:o.GraphQLID},name:{description:"Season name",type:o.GraphQLString}},resolve:function(e,n){var i=n.id,o=n.name;return t(i?d.Season.forID(r,i):null,o?d.Season.forName(r,o):null)}},episode:{type:h,args:{id:{description:"Episode ID",type:o.GraphQLID},title:{description:"Episode Title",type:o.GraphQLString},originalAirDate:{description:"Original air date (yyyy-mm-dd)",type:o.GraphQLString},missing:{description:"If the episode is currently missing",type:o.GraphQLBoolean}},resolve:function(e,n){var i=n.id,o=n.title,s=n.originalAirDate,a=n.missing;return t(i?m.Episode.forID(r,i):null,o?m.Episode.forTitle(r,o):null,s?m.Episode.forOriginalAirDate(r,s):null,a?m.Episode.forMissingStatus(r,a):null)}},serial:{type:g,args:{id:{description:"Serial ID",type:o.GraphQLID},title:{description:"Serial title",type:o.GraphQLString}},resolve:function(e,n){var i=n.id,o=n.title;return t(i?f.Serial.forID(r,i):null,o?f.Serial.forTitle(r,o):null)}}}})});e.use("/graphql",(0,a.default)({schema:w,graphiql:!0}))};var o=n(12),s=n(11),a=i(s),u=n(3),l=n(2),c=n(6),d=n(5),f=n(0),p=n(1),m=n(4),E=function(e,r){return void 0!==e.id&&void 0!==r.id&&e.id===r.id},h=function(e){return e.reduce(function(e,r,n,i){return e&&E(r,i[0])})}},function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,r){function n(e,n){i.Doctor.all(r).then(l(n),c(n))}function d(e,n){i.Doctor.forID(r,e.params.id).then(l(n),c(n))}function f(e,n){i.Doctor.serials(r,e.params.id).then(l(n),c(n))}function p(e,n){i.Doctor.actors(r,e.params.id).then(l(n),c(n))}function m(e,n){t.Serial.all(r).then(l(n),c(n))}function E(e,n){t.Serial.forID(r,e.params.id).then(l(n),c(n))}function h(e,n){i.Doctor.forSerialID(r,e.params.id).then(l(n),c(n))}function y(e,n){s.Director.forSerialID(r,e.params.id).then(l(n),c(n))}function g(e,n){o.Writer.forSerialID(r,e.params.id).then(l(n),c(n))}function w(e,n){u.Episode.forSerialID(r,e.params.id).then(l(n),c(n))}function v(e,n){a.Season.all(r).then(l(n),c(n))}function O(e,n){a.Season.forID(r,e.params.id).then(l(n),c(n))}function S(e,n){a.Season.serials(r,e.params.id).then(l(n),c(n))}function R(e,n){s.Director.all(r).then(l(n),c(n))}function A(e,n){s.Director.forID(r,e.params.id).then(l(n),c(n))}function T(e,n){s.Director.serials(r,e.params.id).then(l(n),c(n))}function D(e,n){o.Writer.all(r).then(l(n),c(n))}function L(e,n){o.Writer.forID(r,e.params.id).then(l(n),c(n))}function I(e,n){o.Writer.serials(r,e.params.id).then(l(n),c(n))}function Q(e,n){u.Episode.all(r).then(l(n),c(n))}function k(e,n){u.Episode.forID(r,e.params.id).then(l(n),c(n))}e.get("/doctors",n),e.get("/v1/doctors",n),e.get("/doctors/:id",d),e.get("/v1/doctors/:id",d),e.get("/doctors/:id/serials",f),e.get("/v1/doctors/:id/serials",f),e.get("/doctors/:id/actors",p),e.get("/v1/doctors/:id/actors",p),e.get("/serials",m),e.get("/v1/serials",m),e.get("/serials/:id",E),e.get("/v1/serials/:id",E),e.get("/serials/:id/doctors",h),e.get("/v1/serials/:id/doctors",h),e.get("/serials/:id/directors",y),e.get("/v1/serials/:id/directors",y),e.get("/serials/:id/writers",g),e.get("/v1/serials/:id/writers",g),e.get("/serials/:id/episodes",w),e.get("/v1/serials/:id/episodes",w),e.get("/seasons",v),e.get("/v1/seasons",v),e.get("/seasons/:id",O),e.get("/v1/seasons/:id",O),e.get("/seasons/:id/serials",S),e.get("/v1/seasons/:id/serials",S),e.get("/directors",R),e.get("/v1/directors",R),e.get("/directors/:id",A),e.get("/v1/directors/:id",A),e.get("/directors/:id/serials",T),e.get("/v1/directors/:id/serials",T),e.get("/writers",D),e.get("/v1/writers",D),e.get("/writers/:id",L),e.get("/v1/writers/:id",L),e.get("/writers/:id/serials",I),e.get("/v1/writers/:id/serials",I),e.get("/episodes",Q),e.get("/v1/episodes",Q),e.get("/episodes/:id",k),e.get("/v1/episodes/:id",k)};var i=n(3),t=n(0),o=n(6),s=n(2),a=n(5),u=n(4),l=function(e){return function(r){e.send(r)}},c=function(e){return function(r){e.status(404).send("Error")}}},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("sqlite3")},function(e,r){e.exports=require("express-graphql")},function(e,r){e.exports=require("graphql")},function(e,r,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var t=n(9),o=i(t),s=n(8),a=i(s),u=n(10),l=n(7),c=i(l),d=new u.Database("catalogopolis-api.sqlite"),f=(0,o.default)();(0,a.default)(f,d),(0,c.default)(f,d),f.listen(5e3)}]);
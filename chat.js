var tmi=(()=>{var oe=Object.defineProperty;var k=(n,e)=>oe(n,"name",{value:e,configurable:!0});var T=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var j=T(()=>{});var q=T((ke,J)=>{var v=class{constructor(){this._events=new Map,this._maxListeners=0}setMaxListeners(e){return this._maxListeners=e,this}emit(e,...s){if(e==="error"&&(!this._events.has("error")||!this._events.get("error").length))throw s[0]instanceof Error?s[0]:TypeError('Uncaught, unspecified "error" event.');let t=this._events.get(e);return t?(t.forEach(i=>i.apply(this,s)),!0):!1}emits(e,s){for(let t=0;t<e.length;t++){let i=t<s.length?s[t]:s[s.length-1];this.emit(e[t],...i)}}on(e,s){this._events.has(e)||this._events.set(e,[]);let t=this._events.get(e);if(this._maxListeners&&t.length>=this._maxListeners)throw Error(`Max listeners exceeded for event '${e}'`);return t.push(s),this}once(e,s){let t=k((...i)=>{this.removeListener(e,t),s(...i)},"onceListener");return this.on(e,t)}off(e,s){let t=this._events.get(e);if(!t)return this;let i=t.indexOf(s);return i===-1?this:(t.splice(i,1),t.length===0&&this._events.delete(e),this)}removeAllListeners(e){return e?this._events.delete(e):this._events.clear(),this}listeners(e){return this._events.get(e)||[]}listenerCount(e){return this._events.get(e)?this._events.get(e).length:0}};k(v,"EventEmitter");v.prototype.addListener=v.prototype.on;v.prototype.removeListener=v.prototype.off;v.EventEmitter=v;v.defaultMaxListeners=10;J.exports=v});var G=T((Ce,H)=>{var L=class{constructor(){this._levels={trace:0,debug:1,info:2,warn:3,error:4,fatal:5},this._currentLevel="error"}_log(e,s){if(this._levels[e]<this._levels[this._currentLevel])return;let t=new Date,i=t.getHours(),o=t.getMinutes(),h=`${(i<10?"0":"")+i}:${(o<10?"0":"")+o}`;console.log(`[${h}] ${e}: ${s}`)}setLevel(e){this._currentLevel=e}getLevel(){return this._currentLevel}trace(e){this._log("trace",e)}debug(e){this._log("debug",e)}info(e){this._log("info",e)}warn(e){this._log("warn",e)}error(e){this._log("error",e)}fatal(e){this._log("fatal",e)}};k(L,"Logger");H.exports=L});var M=T(($e,F)=>{var ne=/^\u0001ACTION ([^\u0001]+)\u0001$/,re=/^(justinfan)(\d+$)/,ae=/\\([sn:r\\])/g,ce=/([ \n;\r\\])/g,le=/^oauth:/i,V={s:" ",n:"",":":";",r:""},W={" ":"s","\n":"n",";":":","\r":"r"},he=F.exports={hasOwn:(n,e)=>({}).hasOwnProperty.call(n,e),promiseDelay:n=>new Promise(e=>setTimeout(e,n)),isInteger(n){return typeof n!="string"&&typeof n!="number"?!1:!isNaN(Math.round(n))},justinfan:()=>`justinfan${Math.floor(Math.random()*8e4+1e3)}`,isJustinfan:n=>re.test(n),channel(n){let e=(n||"").toLowerCase();return e[0]==="#"?e:`#${e}`},username(n){let e=(n||"").toLowerCase();return e[0]==="#"?e.slice(1):e},token:n=>n?n.replace(le,""):"",password(n){let e=he.token(n);return e?`oauth:${e}`:""},actionMessage:n=>n.match(ne),unescapeHtml:n=>n.replace(/\\&amp\\;/g,"&").replace(/\\&lt\\;/g,"<").replace(/\\&gt\\;/g,">").replace(/\\&quot\\;/g,'"').replace(/\\&#039\\;/g,"'"),unescapeIRC(n){return!n||typeof n!="string"||!n.includes("\\")?n:n.replace(ae,(e,s)=>s in V?V[s]:s)},escapeIRC(n){return!n||typeof n!="string"?n:n.replace(ce,(e,s)=>s in W?`\\${W[s]}`:s)},inherits(n,e){n.super_=e;let s=k(function(){},"TempCtor");s.prototype=e.prototype,n.prototype=new s,n.prototype.constructor=n}}});var z=T((ve,B)=>{var N=M(),E=/\S+/g;function D(n,e,s=",",t="/",i){let o=n[e];if(o===void 0)return n;let h=typeof o=="string";if(n[`${e}-raw`]=h?o:null,o===!0)return n[e]=null,n;if(n[e]={},h){let u=o.split(s);for(let b=0;b<u.length;b++){let w=u[b].split(t),[,C]=w;i!==void 0&&C&&(C=C.split(i)),n[e][w[0]]=C||null}}return n}k(D,"parseComplexTag");B.exports={badges:n=>D(n,"badges"),badgeInfo:n=>D(n,"badge-info"),emotes:n=>D(n,"emotes","/",":",","),emoteRegex(n,e,s,t){E.lastIndex=0;let i=new RegExp(`(\\b|^|\\s)${N.unescapeHtml(e)}(\\b|$|\\s)`),o;for(;(o=E.exec(n))!==null;)i.test(o[0])&&(t[s]=t[s]||[],t[s].push([o.index,E.lastIndex-1]))},emoteString(n,e,s,t){E.lastIndex=0;let i;for(;(i=E.exec(n))!==null;)i[0]===N.unescapeHtml(e)&&(t[s]=t[s]||[],t[s].push([i.index,E.lastIndex-1]))},transformEmotes(n){let e="";return Object.keys(n).forEach(s=>{e=`${e}${s}:`,n[s].forEach(t=>e=`${e}${t.join("-")},`),e=`${e.slice(0,-1)}/`}),e.slice(0,-1)},formTags(n={}){let e=Object.entries(n).map(([s,t])=>`${N.escapeIRC(s)}=${N.escapeIRC(t)}`);return e.length?`@${e.join(";")}`:null},msg(n){let e={raw:n,tags:{},prefix:null,command:null,params:[]},s=0,t=0;if(n.charCodeAt(0)===64){if(t=n.indexOf(" "),t===-1)return null;let i=n.slice(1,t).split(";");for(let o=0;o<i.length;o++){let h=i[o],u=h.split("=");e.tags[u[0]]=h.slice(h.indexOf("=")+1)||!0}s=t+1}for(;n.charCodeAt(s)===32;)s++;if(n.charCodeAt(s)===58){if(t=n.indexOf(" ",s),t===-1)return null;for(e.prefix=n.slice(s+1,t),s=t+1;n.charCodeAt(s)===32;)s++}if(t=n.indexOf(" ",s),t===-1)return n.length>s?(e.command=n.slice(s),e):null;for(e.command=n.slice(s,t),s=t+1;n.charCodeAt(s)===32;)s++;for(;s<n.length;){if(t=n.indexOf(" ",s),n.charCodeAt(s)===58){e.params.push(n.slice(s+1));break}if(t!==-1){for(e.params.push(n.slice(s,t)),s=t+1;n.charCodeAt(s)===32;)s++;continue}if(t===-1){e.params.push(n.slice(s));break}}return e}}});var X=T((xe,Q)=>{var A=class{constructor(e){this.queue=[],this.index=0,this.defaultDelay=e===void 0?3e3:e}add(e,s){this.queue.push({fn:e,delay:s})}next(){let e=this.index++,s=this.queue[e];if(!s)return;let t=this.queue[this.index];if(s.fn(),t){let i=t.delay===void 0?this.defaultDelay:t.delay;setTimeout(()=>this.next(),i)}}};k(A,"Queue");Q.exports=A});var K=T((Te,Z)=>{var me=typeof global!="undefined"?global:typeof window!="undefined"?window:{},Y,ue=(Y=me.WebSocket)!=null?Y:j(),pe=q(),fe=G(),R=z(),de=X(),m=M(),P=class extends pe{constructor(e){var s,t,i,o,h,u,b,w,C,x,S,O,r,a;super(),this.opts=e!=null?e:{},this.opts.channels=(s=this.opts.channels)!=null?s:[],this.opts.connection=(t=this.opts.connection)!=null?t:{},this.opts.identity=(i=this.opts.identity)!=null?i:{},this.opts.options=(o=this.opts.options)!=null?o:{},this.clientId=(h=this.opts.options.clientId)!=null?h:null,this._globalDefaultChannel=m.channel((u=this.opts.options.globalDefaultChannel)!=null?u:"#tmijs"),this._skipMembership=(b=this.opts.options.skipMembership)!=null?b:!1,this.maxReconnectAttempts=(w=this.opts.connection.maxReconnectAttempts)!=null?w:1/0,this.maxReconnectInterval=(C=this.opts.connection.maxReconnectInterval)!=null?C:3e4,this.reconnect=(x=this.opts.connection.reconnect)!=null?x:!0,this.reconnectDecay=(S=this.opts.connection.reconnectDecay)!=null?S:1.5,this.reconnectInterval=(O=this.opts.connection.reconnectInterval)!=null?O:1e3,this.reconnecting=!1,this.reconnections=0,this.reconnectTimer=this.reconnectInterval,this.currentLatency=0,this.latency=new Date,this.secure=(r=this.opts.connection.secure)!=null?r:!this.opts.connection.server&&!this.opts.connection.port,this.pingLoop=null,this.pingTimeout=null,this.wasCloseCalled=!1,this.reason="",this.ws=null,this.emotes="",this.emotesets={},this.username="",this.channels=[],this.globaluserstate={},this.userstate={},this.lastJoined="",this.moderators={},this.log=(a=this.opts.logger)!=null?a:new fe;try{this.log.setLevel(this.opts.options.debug?"info":"error")}catch(p){}this.opts.channels.forEach((p,f,_)=>_[f]=m.channel(p)),this.setMaxListeners(0)}api(){throw new Error("The Client.api() method has been removed.")}handleMessage(e){var h,u,b,w,C,x,S,O;if(!e)return;this.listenerCount("raw_message")&&this.emit("raw_message",JSON.parse(JSON.stringify(e)),e);let s=m.channel((h=e.params[0])!=null?h:null),t=(u=e.params[1])!=null?u:null,i=(b=e.tags["msg-id"])!=null?b:null,o=e.tags=R.badges(R.badgeInfo(R.emotes(e.tags)));for(let r in o){if(r==="emote-sets"||r==="ban-duration"||r==="bits")continue;let a=o[r];typeof a=="boolean"?a=null:a==="1"?a=!0:a==="0"?a=!1:typeof a=="string"&&(a=m.unescapeIRC(a)),o[r]=a}if(e.prefix===null)switch(e.command){case"PING":this.emit("ping"),this._isConnected()&&this.ws.send("PONG");break;case"PONG":{this.currentLatency=(new Date().getTime()-this.latency.getTime())/1e3,this.emits(["pong","_promisePing"],[[this.currentLatency]]),clearTimeout(this.pingTimeout);break}default:this.log.warn(`Could not parse message with no prefix:
${JSON.stringify(e,null,4)}`);break}else if(e.prefix==="tmi.twitch.tv")switch(e.command){case"002":case"003":case"004":case"372":case"375":case"CAP":break;case"001":[this.username]=e.params;break;case"376":{this.log.info("Connected to server."),this.userstate[this._globalDefaultChannel]={},this.emits(["connected","_promiseConnect"],[[this.server,this.port],[null]]),this.reconnections=0,this.reconnectTimer=this.reconnectInterval,this.pingLoop=setInterval(()=>{var f;this._isConnected()&&this.ws.send("PING"),this.latency=new Date,this.pingTimeout=setTimeout(()=>{this.ws!==null&&(this.wasCloseCalled=!1,this.log.error("Ping timeout."),this.ws.close(),clearInterval(this.pingLoop),clearTimeout(this.pingTimeout))},(f=this.opts.connection.timeout)!=null?f:9999)},6e4);let r=(w=this.opts.options.joinInterval)!=null?w:2e3;r<300&&(r=300);let a=new de(r),p=[...new Set([...this.opts.channels,...this.channels])];this.channels=[];for(let f=0;f<p.length;f++){let _=p[f];a.add(()=>{this._isConnected()&&this.join(_).catch(y=>this.log.error(y))})}a.next();break}case"NOTICE":{let r=[null],a=[s,i,t],p=[i],f=[s,!0],_=[s,!1],y=[a,r],d=[a,p],c=`[${s}] ${t}`;switch(i){case"subs_on":this.log.info(`[${s}] This room is now in subscribers-only mode.`),this.emits(["subscriber","subscribers","_promiseSubscribers"],[f,f,r]);break;case"subs_off":this.log.info(`[${s}] This room is no longer in subscribers-only mode.`),this.emits(["subscriber","subscribers","_promiseSubscribersoff"],[_,_,r]);break;case"emote_only_on":this.log.info(`[${s}] This room is now in emote-only mode.`),this.emits(["emoteonly","_promiseEmoteonly"],[f,r]);break;case"emote_only_off":this.log.info(`[${s}] This room is no longer in emote-only mode.`),this.emits(["emoteonly","_promiseEmoteonlyoff"],[_,r]);break;case"slow_on":case"slow_off":break;case"followers_on_zero":case"followers_on":case"followers_off":break;case"r9k_on":this.log.info(`[${s}] This room is now in r9k mode.`),this.emits(["r9kmode","r9kbeta","_promiseR9kbeta"],[f,f,r]);break;case"r9k_off":this.log.info(`[${s}] This room is no longer in r9k mode.`),this.emits(["r9kmode","r9kbeta","_promiseR9kbetaoff"],[_,_,r]);break;case"room_mods":{let $=t.split(": "),I=($.length>1?$[1]:"").toLowerCase().split(", ").filter(U=>U);this.emits(["_promiseMods","mods"],[[null,I],[s,I]]);break}case"no_mods":this.emits(["_promiseMods","mods"],[[null,[]],[s,[]]]);break;case"vips_success":{let $=(t.endsWith(".")?t.slice(0,-1):t).split(": "),I=($.length>1?$[1]:"").toLowerCase().split(", ").filter(U=>U);this.emits(["_promiseVips","vips"],[[null,I],[s,I]]);break}case"no_vips":this.emits(["_promiseVips","vips"],[[null,[]],[s,[]]]);break;case"already_banned":case"bad_ban_admin":case"bad_ban_anon":case"bad_ban_broadcaster":case"bad_ban_global_mod":case"bad_ban_mod":case"bad_ban_self":case"bad_ban_staff":case"usage_ban":this.log.info(c),this.emits(["notice","_promiseBan"],d);break;case"ban_success":this.log.info(c),this.emits(["notice","_promiseBan"],y);break;case"usage_clear":this.log.info(c),this.emits(["notice","_promiseClear"],d);break;case"usage_mods":this.log.info(c),this.emits(["notice","_promiseMods"],[a,[i,[]]]);break;case"mod_success":this.log.info(c),this.emits(["notice","_promiseMod"],y);break;case"usage_vips":this.log.info(c),this.emits(["notice","_promiseVips"],[a,[i,[]]]);break;case"usage_vip":case"bad_vip_grantee_banned":case"bad_vip_grantee_already_vip":case"bad_vip_max_vips_reached":case"bad_vip_achievement_incomplete":this.log.info(c),this.emits(["notice","_promiseVip"],[a,[i,[]]]);break;case"vip_success":this.log.info(c),this.emits(["notice","_promiseVip"],y);break;case"usage_mod":case"bad_mod_banned":case"bad_mod_mod":this.log.info(c),this.emits(["notice","_promiseMod"],d);break;case"unmod_success":this.log.info(c),this.emits(["notice","_promiseUnmod"],y);break;case"unvip_success":this.log.info(c),this.emits(["notice","_promiseUnvip"],y);break;case"usage_unmod":case"bad_unmod_mod":this.log.info(c),this.emits(["notice","_promiseUnmod"],d);break;case"usage_unvip":case"bad_unvip_grantee_not_vip":this.log.info(c),this.emits(["notice","_promiseUnvip"],d);break;case"color_changed":this.log.info(c),this.emits(["notice","_promiseColor"],y);break;case"usage_color":case"turbo_only_color":this.log.info(c),this.emits(["notice","_promiseColor"],d);break;case"commercial_success":this.log.info(c),this.emits(["notice","_promiseCommercial"],y);break;case"usage_commercial":case"bad_commercial_error":this.log.info(c),this.emits(["notice","_promiseCommercial"],d);break;case"hosts_remaining":{this.log.info(c);let $=isNaN(t[0])?0:parseInt(t[0]);this.emits(["notice","_promiseHost"],[a,[null,~~$]]);break}case"bad_host_hosting":case"bad_host_rate_exceeded":case"bad_host_error":case"usage_host":this.log.info(c),this.emits(["notice","_promiseHost"],[a,[i,null]]);break;case"already_r9k_on":case"usage_r9k_on":this.log.info(c),this.emits(["notice","_promiseR9kbeta"],d);break;case"already_r9k_off":case"usage_r9k_off":this.log.info(c),this.emits(["notice","_promiseR9kbetaoff"],d);break;case"timeout_success":this.log.info(c),this.emits(["notice","_promiseTimeout"],y);break;case"delete_message_success":this.log.info(`[${s} ${t}]`),this.emits(["notice","_promiseDeletemessage"],y);break;case"already_subs_off":case"usage_subs_off":this.log.info(c),this.emits(["notice","_promiseSubscribersoff"],d);break;case"already_subs_on":case"usage_subs_on":this.log.info(c),this.emits(["notice","_promiseSubscribers"],d);break;case"already_emote_only_off":case"usage_emote_only_off":this.log.info(c),this.emits(["notice","_promiseEmoteonlyoff"],d);break;case"already_emote_only_on":case"usage_emote_only_on":this.log.info(c),this.emits(["notice","_promiseEmoteonly"],d);break;case"usage_slow_on":this.log.info(c),this.emits(["notice","_promiseSlow"],d);break;case"usage_slow_off":this.log.info(c),this.emits(["notice","_promiseSlowoff"],d);break;case"usage_timeout":case"bad_timeout_admin":case"bad_timeout_anon":case"bad_timeout_broadcaster":case"bad_timeout_duration":case"bad_timeout_global_mod":case"bad_timeout_mod":case"bad_timeout_self":case"bad_timeout_staff":this.log.info(c),this.emits(["notice","_promiseTimeout"],d);break;case"untimeout_success":case"unban_success":this.log.info(c),this.emits(["notice","_promiseUnban"],y);break;case"usage_unban":case"bad_unban_no_ban":this.log.info(c),this.emits(["notice","_promiseUnban"],d);break;case"usage_delete":case"bad_delete_message_error":case"bad_delete_message_broadcaster":case"bad_delete_message_mod":this.log.info(c),this.emits(["notice","_promiseDeletemessage"],d);break;case"usage_unhost":case"not_hosting":this.log.info(c),this.emits(["notice","_promiseUnhost"],d);break;case"whisper_invalid_login":case"whisper_invalid_self":case"whisper_limit_per_min":case"whisper_limit_per_sec":case"whisper_restricted":case"whisper_restricted_recipient":this.log.info(c),this.emits(["notice","_promiseWhisper"],d);break;case"no_permission":case"msg_banned":case"msg_room_not_found":case"msg_channel_suspended":case"tos_ban":case"invalid_user":this.log.info(c),this.emits(["notice","_promiseBan","_promiseClear","_promiseUnban","_promiseTimeout","_promiseDeletemessage","_promiseMods","_promiseMod","_promiseUnmod","_promiseVips","_promiseVip","_promiseUnvip","_promiseCommercial","_promiseHost","_promiseUnhost","_promiseJoin","_promisePart","_promiseR9kbeta","_promiseR9kbetaoff","_promiseSlow","_promiseSlowoff","_promiseFollowers","_promiseFollowersoff","_promiseSubscribers","_promiseSubscribersoff","_promiseEmoteonly","_promiseEmoteonlyoff","_promiseWhisper"],[a,[i,s]]);break;case"msg_rejected":case"msg_rejected_mandatory":this.log.info(c),this.emit("automod",s,i,t);break;case"unrecognized_cmd":this.log.info(c),this.emit("notice",s,i,t);break;case"cmds_available":case"host_target_went_offline":case"msg_censored_broadcaster":case"msg_duplicate":case"msg_emoteonly":case"msg_verified_email":case"msg_ratelimit":case"msg_subsonly":case"msg_timedout":case"msg_bad_characters":case"msg_channel_blocked":case"msg_facebook":case"msg_followersonly":case"msg_followersonly_followed":case"msg_followersonly_zero":case"msg_slowmode":case"msg_suspended":case"no_help":case"usage_disconnect":case"usage_help":case"usage_me":case"unavailable_command":this.log.info(c),this.emit("notice",s,i,t);break;case"host_on":case"host_off":break;default:t.includes("Login unsuccessful")||t.includes("Login authentication failed")?(this.wasCloseCalled=!1,this.reconnect=!1,this.reason=t,this.log.error(this.reason),this.ws.close()):t.includes("Error logging in")||t.includes("Improperly formatted auth")?(this.wasCloseCalled=!1,this.reconnect=!1,this.reason=t,this.log.error(this.reason),this.ws.close()):t.includes("Invalid NICK")?(this.wasCloseCalled=!1,this.reconnect=!1,this.reason="Invalid NICK.",this.log.error(this.reason),this.ws.close()):(this.log.warn(`Could not parse NOTICE from tmi.twitch.tv:
${JSON.stringify(e,null,4)}`),this.emit("notice",s,i,t));break}break}case"USERNOTICE":{let r=o["display-name"]||o.login,a=(C=o["msg-param-sub-plan"])!=null?C:"",p=m.unescapeIRC((x=o["msg-param-sub-plan-name"])!=null?x:"")||null,_={prime:a.includes("Prime"),plan:a,planName:p},y=~~(o["msg-param-streak-months"]||0),d=o["msg-param-recipient-display-name"]||o["msg-param-recipient-user-name"],c=~~o["msg-param-mass-gift-count"];switch(o["message-type"]=i,i){case"resub":this.emits(["resub","subanniversary"],[[s,r,y,t,o,_]]);break;case"sub":this.emits(["subscription","sub"],[[s,r,_,t,o]]);break;case"subgift":this.emit("subgift",s,r,y,d,_,o);break;case"anonsubgift":this.emit("anonsubgift",s,y,d,_,o);break;case"submysterygift":this.emit("submysterygift",s,r,c,_,o);break;case"anonsubmysterygift":this.emit("anonsubmysterygift",s,c,_,o);break;case"primepaidupgrade":this.emit("primepaidupgrade",s,r,_,o);break;case"giftpaidupgrade":{let $=o["msg-param-sender-name"]||o["msg-param-sender-login"];this.emit("giftpaidupgrade",s,r,$,o);break}case"anongiftpaidupgrade":this.emit("anongiftpaidupgrade",s,r,o);break;case"announcement":{let $=o["msg-param-color"];this.emit("announcement",s,o,t,!1,$);break}case"raid":{let $=o["msg-param-displayName"]||o["msg-param-login"],I=+o["msg-param-viewerCount"];this.emit("raided",s,$,I,o);break}default:this.emit("usernotice",i,s,o,t);break}break}case"HOSTTARGET":{let r=t.split(" "),a=~~r[1]||0;r[0]==="-"?(this.log.info(`[${s}] Exited host mode.`),this.emits(["unhost","_promiseUnhost"],[[s,a],[null]])):(this.log.info(`[${s}] Now hosting ${r[0]} for ${a} viewer(s).`),this.emit("hosting",s,r[0],a));break}case"CLEARCHAT":if(e.params.length>1){let r=(S=e.tags["ban-duration"])!=null?S:null;r===null?(this.log.info(`[${s}] ${t} has been banned.`),this.emit("ban",s,t,null,e.tags)):(this.log.info(`[${s}] ${t} has been timed out for ${r} seconds.`),this.emit("timeout",s,t,null,~~r,e.tags))}else this.log.info(`[${s}] Chat was cleared by a moderator.`),this.emits(["clearchat","_promiseClear"],[[s],[null]]);break;case"CLEARMSG":if(e.params.length>1){let r=t,a=o.login;o["message-type"]="messagedeleted",this.log.info(`[${s}] ${a}'s message has been deleted.`),this.emit("messagedeleted",s,a,r,o)}break;case"RECONNECT":this.log.info("Received RECONNECT request from Twitch.."),this.log.info(`Disconnecting and reconnecting in ${Math.round(this.reconnectTimer/1e3)} seconds..`),this.disconnect().catch(r=>this.log.error(r)),setTimeout(()=>this.connect().catch(r=>this.log.error(r)),this.reconnectTimer);break;case"USERSTATE":e.tags.username=this.username,e.tags["user-type"]==="mod"&&(this.moderators[s]||(this.moderators[s]=[]),this.moderators[s].includes(this.username)||this.moderators[s].push(this.username)),!m.isJustinfan(this.getUsername())&&!this.userstate[s]&&(this.userstate[s]=o,this.lastJoined=s,this.channels.push(s),this.log.info(`Joined ${s}`),this.emit("join",s,m.username(this.getUsername()),!0)),e.tags["emote-sets"]!==this.emotes&&(this.emotes=e.tags["emote-sets"],this.emit("emotesets",this.emotes,null)),this.userstate[s]=o;break;case"GLOBALUSERSTATE":this.globaluserstate=o,this.emit("globaluserstate",o),e.tags["emote-sets"]!==void 0&&e.tags["emote-sets"]!==this.emotes&&(this.emotes=e.tags["emote-sets"],this.emit("emotesets",this.emotes,null));break;case"ROOMSTATE":if(m.channel(this.lastJoined)===s&&this.emit("_promiseJoin",null,s),e.tags.channel=s,this.emit("roomstate",s,e.tags),!m.hasOwn(e.tags,"subs-only")){if(m.hasOwn(e.tags,"slow"))if(typeof e.tags.slow=="boolean"&&!e.tags.slow){let r=[s,!1,0];this.log.info(`[${s}] This room is no longer in slow mode.`),this.emits(["slow","slowmode","_promiseSlowoff"],[r,r,[null]])}else{let r=~~e.tags.slow,a=[s,!0,r];this.log.info(`[${s}] This room is now in slow mode.`),this.emits(["slow","slowmode","_promiseSlow"],[a,a,[null]])}if(m.hasOwn(e.tags,"followers-only"))if(e.tags["followers-only"]==="-1"){let r=[s,!1,0];this.log.info(`[${s}] This room is no longer in followers-only mode.`),this.emits(["followersonly","followersmode","_promiseFollowersoff"],[r,r,[null]])}else{let r=~~e.tags["followers-only"],a=[s,!0,r];this.log.info(`[${s}] This room is now in follower-only mode.`),this.emits(["followersonly","followersmode","_promiseFollowers"],[a,a,[null]])}}break;case"SERVERCHANGE":break;default:this.log.warn(`Could not parse message from tmi.twitch.tv:
${JSON.stringify(e,null,4)}`);break}else if(e.prefix==="jtv")switch(e.command){case"MODE":t==="+o"?(this.moderators[s]||(this.moderators[s]=[]),this.moderators[s].includes(e.params[2])||this.moderators[s].push(e.params[2]),this.emit("mod",s,e.params[2])):t==="-o"&&(this.moderators[s]||(this.moderators[s]=[]),this.moderators[s].filter(r=>r!==e.params[2]),this.emit("unmod",s,e.params[2]));break;default:this.log.warn(`Could not parse message from jtv:
${JSON.stringify(e,null,4)}`);break}else switch(e.command){case"353":this.emit("names",e.params[2],e.params[3].split(" "));break;case"366":break;case"JOIN":{let[r]=e.prefix.split("!"),a=this.username===r;a&&m.isJustinfan(this.getUsername())?(this.lastJoined=s,this.channels.push(s),this.log.info(`Joined ${s}`),this.emit("join",s,r,!0)):a||this.emit("join",s,r,!1);break}case"PART":{let[r]=e.prefix.split("!"),a=this.username===r;if(a){this.userstate[s]&&delete this.userstate[s];let p=this.channels.indexOf(s);p!==-1&&this.channels.splice(p,1),p=this.opts.channels.indexOf(s),p!==-1&&this.opts.channels.splice(p,1),this.log.info(`Left ${s}`),this.emit("_promisePart",null)}this.emit("part",s,r,a);break}case"WHISPER":{let[r]=e.prefix.split("!");this.log.info(`[WHISPER] <${r}>: ${t}`),m.hasOwn(e.tags,"username")||(e.tags.username=r),e.tags["message-type"]="whisper";let a=m.channel(e.tags.username);this.emits(["whisper","message"],[[a,e.tags,t,!1]]);break}case"PRIVMSG":if([e.tags.username]=e.prefix.split("!"),e.tags.username==="jtv"){let r=m.username(t.split(" ")[0]),a=t.includes("auto");if(t.includes("hosting you for")){let p=0,f=t.split(" ");for(let _=0;_<f.length;_++)if(m.isInteger(f[_])){p=~~f[_];break}this.emit("hosted",s,r,p,a)}else t.includes("hosting you")&&this.emit("hosted",s,r,0,a)}else{let r=(O=this.opts.options.messagesLogLevel)!=null?O:"info",a=m.actionMessage(t);e.tags["message-type"]=a?"action":"chat";let p=a?a[1]:t;if(m.hasOwn(e.tags,"bits"))this.emit("cheer",s,e.tags,p);else{if(m.hasOwn(e.tags,"msg-id")){if(e.tags["msg-id"]==="highlighted-message"){let f=e.tags["msg-id"];this.emit("redeem",s,e.tags.username,f,e.tags,p)}else if(e.tags["msg-id"]==="skip-subs-mode-message"){let f=e.tags["msg-id"];this.emit("redeem",s,e.tags.username,f,e.tags,p)}}else if(m.hasOwn(e.tags,"custom-reward-id")){let f=e.tags["custom-reward-id"];this.emit("redeem",s,e.tags.username,f,e.tags,p)}a?(this.log[r](`[${s}] *<${e.tags.username}>: ${p}`),this.emits(["action","message"],[[s,e.tags,p,!1]])):(this.log[r](`[${s}] <${e.tags.username}>: ${p}`),this.emits(["chat","message"],[[s,e.tags,p,!1]]))}}break;default:this.log.warn(`Could not parse message:
${JSON.stringify(e,null,4)}`);break}}connect(){return new Promise((e,s)=>{var t,i;this.server=(t=this.opts.connection.server)!=null?t:"irc-ws.chat.twitch.tv",this.port=(i=this.opts.connection.port)!=null?i:80,this.secure&&(this.port=443),this.port===443&&(this.secure=!0),this.reconnectTimer=this.reconnectTimer*this.reconnectDecay,this.reconnectTimer>=this.maxReconnectInterval&&(this.reconnectTimer=this.maxReconnectInterval),this._openConnection(),this.once("_promiseConnect",o=>{o?s(o):e([this.server,~~this.port])})})}_openConnection(){let e=`${this.secure?"wss":"ws"}://${this.server}:${this.port}/`,s={};"agent"in this.opts.connection&&(s.agent=this.opts.connection.agent),this.ws=new ue(e,"irc",s),this.ws.onmessage=this._onMessage.bind(this),this.ws.onerror=this._onError.bind(this),this.ws.onclose=this._onClose.bind(this),this.ws.onopen=this._onOpen.bind(this)}_onOpen(){var e;!this._isConnected()||(this.log.info(`Connecting to ${this.server} on port ${this.port}..`),this.emit("connecting",this.server,~~this.port),this.username=m.username((e=this.opts.identity.username)!=null?e:m.justinfan()),this._getToken().then(s=>{let t=m.password(s);this.log.info("Sending authentication to server.."),this.emit("logon");let i="twitch.tv/tags twitch.tv/commands";this._skipMembership||(i+=" twitch.tv/membership"),this.ws.send(`CAP REQ :${i}`),t?this.ws.send(`PASS ${t}`):m.isJustinfan(this.username)&&this.ws.send("PASS SCHMOOPIIE"),this.ws.send(`NICK ${this.username}`)}).catch(s=>{this.emits(["_promiseConnect","disconnected"],[[s],["Could not get a token."]])}))}_getToken(){let e=this.opts.identity.password,s=typeof e=="function"?e():e;return Promise.resolve(s)}_onMessage(e){e.data.trim().split(`\r
`).forEach(t=>{let i=R.msg(t);i&&this.handleMessage(i)})}_onError(){this.moderators={},this.userstate={},this.globaluserstate={},clearInterval(this.pingLoop),clearTimeout(this.pingTimeout),this.reason=this.ws===null?"Connection closed.":"Unable to connect.",this.emits(["_promiseConnect","disconnected"],[[this.reason]]),this.reconnect&&this.reconnections===this.maxReconnectAttempts&&(this.emit("maxreconnect"),this.log.error("Maximum reconnection attempts reached.")),this.reconnect&&!this.reconnecting&&this.reconnections<=this.maxReconnectAttempts-1&&(this.reconnecting=!0,this.reconnections++,this.log.error(`Reconnecting in ${Math.round(this.reconnectTimer/1e3)} seconds..`),this.emit("reconnect"),setTimeout(()=>{this.reconnecting=!1,this.connect().catch(e=>this.log.error(e))},this.reconnectTimer)),this.ws=null}_onClose(){this.moderators={},this.userstate={},this.globaluserstate={},clearInterval(this.pingLoop),clearTimeout(this.pingTimeout),this.wasCloseCalled?(this.wasCloseCalled=!1,this.reason="Connection closed.",this.log.info(this.reason),this.emits(["_promiseConnect","_promiseDisconnect","disconnected"],[[this.reason],[null],[this.reason]])):(this.emits(["_promiseConnect","disconnected"],[[this.reason]]),!this.wasCloseCalled&&this.reconnect&&this.reconnections===this.maxReconnectAttempts&&(this.emit("maxreconnect"),this.log.error("Maximum reconnection attempts reached.")),!this.wasCloseCalled&&this.reconnect&&!this.reconnecting&&this.reconnections<=this.maxReconnectAttempts-1&&(this.reconnecting=!0,this.reconnections++,this.log.error(`Could not connect to server. Reconnecting in ${Math.round(this.reconnectTimer/1e3)} seconds..`),this.emit("reconnect"),setTimeout(()=>{this.reconnecting=!1,this.connect().catch(e=>this.log.error(e))},this.reconnectTimer))),this.ws=null}_getPromiseDelay(){return Math.max(600,this.currentLatency*1e3+100)}_sendCommand({delay:e,channel:s,command:t,tags:i},o){return new Promise((h,u)=>{if(this._isConnected())(e===null||typeof e=="number")&&(e===null&&(e=this._getPromiseDelay()),m.promiseDelay(e).then(()=>u("No response from Twitch.")));else return u("Not connected to server.");let b=R.formTags(i);if(typeof s=="string"){let w=m.channel(s);this.log.info(`[${w}] Executing command: ${t}`),this.ws.send(`${b?`${b} `:""}PRIVMSG ${w} :${t}`)}else this.log.info(`Executing command: ${t}`),this.ws.send(`${b?`${b} `:""}${t}`);typeof o=="function"?o(h,u):h()})}_sendMessage({channel:e,message:s,tags:t},i){return new Promise((o,h)=>{var S;if(this._isConnected()){if(m.isJustinfan(this.getUsername()))return h("Cannot send anonymous messages.")}else return h("Not connected to server.");let u=m.channel(e);if(this.userstate[u]||(this.userstate[u]={}),s.length>500){let r=s,a=r.slice(0,500).lastIndexOf(" ");a===-1&&(a=500),s=r.slice(0,a),setTimeout(()=>this._sendMessage({channel:e,message:r.slice(a),tags:t}),350)}let b=R.formTags(t);this.ws.send(`${b?`${b} `:""}PRIVMSG ${u} :${s}`);let w=Object.assign({},this.userstate[u],{emotes:null}),C=(S=this.opts.options.messagesLogLevel)!=null?S:"info",x=m.actionMessage(s);x?(w["message-type"]="action",this.log[C](`[${u}] *<${this.getUsername()}>: ${x[1]}`),this.emits(["action","message"],[[u,w,x[1],!0]])):(w["message-type"]="chat",this.log[C](`[${u}] <${this.getUsername()}>: ${s}`),this.emits(["chat","message"],[[u,w,s,!0]])),typeof i=="function"?i(o,h):o()})}getUsername(){return this.username}getOptions(){return this.opts}getChannels(){return this.channels}isMod(e,s){let t=m.channel(e);return this.moderators[t]||(this.moderators[t]=[]),this.moderators[t].includes(m.username(s))}readyState(){return this.ws===null?"CLOSED":["CONNECTING","OPEN","CLOSING","CLOSED"][this.ws.readyState]}_isConnected(){return this.ws!==null&&this.ws.readyState===1}disconnect(){return new Promise((e,s)=>{this.ws!==null&&this.ws.readyState!==3?(this.wasCloseCalled=!0,this.log.info("Disconnecting from server.."),this.ws.close(),this.once("_promiseDisconnect",()=>e([this.server,~~this.port]))):(this.log.error("Cannot disconnect from server. Socket is not opened or connection is already closing."),s("Cannot disconnect from server. Socket is not opened or connection is already closing."))})}};k(P,"ClientBase");Z.exports=P});var se=T((Se,ee)=>{var _e=K(),l=M(),g=class extends _e{action(e,s,t){return s=`ACTION ${s}`,this._sendMessage({channel:e,message:s,tags:t},(i,o)=>i([l.channel(e),s]))}announce(e,s){return this._sendMessage({channel:e,message:`/announce ${s}`},(t,i)=>t([l.channel(e),s]))}ban(e,s,t){return s=l.username(s),t=t!=null?t:"",this._sendCommand({channel:e,command:`/ban ${s} ${t}`},(i,o)=>this.once("_promiseBan",h=>h?o(h):i([l.channel(e),s,t])))}clear(e){return this._sendCommand({channel:e,command:"/clear"},(s,t)=>this.once("_promiseClear",i=>i?t(i):s([l.channel(e)])))}color(e,s){return e=s!=null?s:e,this._sendCommand({channel:this._globalDefaultChannel,command:`/color ${e}`},(t,i)=>this.once("_promiseColor",o=>o?i(o):t([e])))}commercial(e,s){return s=s!=null?s:30,this._sendCommand({channel:e,command:`/commercial ${s}`},(t,i)=>this.once("_promiseCommercial",o=>o?i(o):t([l.channel(e),~~s])))}deletemessage(e,s){return this._sendCommand({channel:e,command:`/delete ${s}`},(t,i)=>this.once("_promiseDeletemessage",o=>o?i(o):t([l.channel(e)])))}emoteonly(e){return this._sendCommand({channel:e,command:"/emoteonly"},(s,t)=>this.once("_promiseEmoteonly",i=>i?t(i):s([l.channel(e)])))}emoteonlyoff(e){return this._sendCommand({channel:e,command:"/emoteonlyoff"},(s,t)=>this.once("_promiseEmoteonlyoff",i=>i?t(i):s([l.channel(e)])))}followersonly(e,s){return s=s!=null?s:30,this._sendCommand({channel:e,command:`/followers ${s}`},(t,i)=>this.once("_promiseFollowers",o=>o?i(o):t([l.channel(e),~~s])))}followersonlyoff(e){return this._sendCommand({channel:e,command:"/followersoff"},(s,t)=>this.once("_promiseFollowersoff",i=>i?t(i):s([l.channel(e)])))}host(e,s){return s=l.username(s),this._sendCommand({delay:2e3,channel:e,command:`/host ${s}`},(t,i)=>this.once("_promiseHost",(o,h)=>o?i(o):t([l.channel(e),s,~~h])))}join(e){return e=l.channel(e),this._sendCommand({delay:void 0,channel:null,command:`JOIN ${e}`},(s,t)=>{let i="_promiseJoin",o=!1,h=k((b,w)=>{e===l.channel(w)&&(this.removeListener(i,h),o=!0,b?t(b):s([e]))},"listener");this.on(i,h);let u=this._getPromiseDelay();l.promiseDelay(u).then(()=>{o||this.emit(i,"No response from Twitch.",e)})})}mod(e,s){return s=l.username(s),this._sendCommand({channel:e,command:`/mod ${s}`},(t,i)=>this.once("_promiseMod",o=>o?i(o):t([l.channel(e),s])))}mods(e){return e=l.channel(e),this._sendCommand({channel:e,command:"/mods"},(s,t)=>{this.once("_promiseMods",(i,o)=>{i?t(i):(o.forEach(h=>{this.moderators[e]||(this.moderators[e]=[]),this.moderators[e].includes(h)||this.moderators[e].push(h)}),s(o))})})}part(e){return this._sendCommand({delay:null,channel:null,command:`PART ${e}`},(s,t)=>this.once("_promisePart",i=>i?t(i):s([l.channel(e)])))}ping(){return this._sendCommand({delay:null,command:"PING"},(e,s)=>{var t;this.latency=new Date,this.pingTimeout=setTimeout(()=>{this.ws!==null&&(this.wasCloseCalled=!1,this.log.error("Ping timeout."),this.ws.close(),clearInterval(this.pingLoop),clearTimeout(this.pingTimeout))},(t=this.opts.connection.timeout)!=null?t:9999),this.once("_promisePing",i=>e([parseFloat(i)]))})}r9kbeta(e){return this._sendCommand({channel:e,command:"/r9kbeta"},(s,t)=>this.once("_promiseR9kbeta",i=>i?t(i):s([l.channel(e)])))}r9kbetaoff(e){return this._sendCommand({channel:e,command:"/r9kbetaoff"},(s,t)=>this.once("_promiseR9kbetaoff",i=>i?t(i):s([l.channel(e)])))}raw(e,s){return this._sendCommand({channel:null,command:e,tags:s},(t,i)=>t([e]))}reply(e,s,t,i={}){if(typeof t=="object"&&(t=t.id),!t||typeof t!="string")throw new Error("replyParentMsgId is required.");return this.say(e,s,{...i,"reply-parent-msg-id":t})}say(e,s,t){return e=l.channel(e),s.startsWith(".")&&!s.startsWith("..")||s.startsWith("/")||s.startsWith("\\")?s.slice(1,4)==="me "?this.action(e,s.slice(4)):this._sendCommand({channel:e,command:s,tags:t},(i,o)=>i([e,s])):this._sendMessage({channel:e,message:s,tags:t},(i,o)=>i([e,s]))}slow(e,s){return s=s!=null?s:300,this._sendCommand({channel:e,command:`/slow ${s}`},(t,i)=>this.once("_promiseSlow",o=>o?i(o):t([l.channel(e),~~s])))}slowoff(e){return this._sendCommand({channel:e,command:"/slowoff"},(s,t)=>this.once("_promiseSlowoff",i=>i?t(i):s([l.channel(e)])))}subscribers(e){return this._sendCommand({channel:e,command:"/subscribers"},(s,t)=>this.once("_promiseSubscribers",i=>i?t(i):s([l.channel(e)])))}subscribersoff(e){return this._sendCommand({channel:e,command:"/subscribersoff"},(s,t)=>this.once("_promiseSubscribersoff",i=>i?t(i):s([l.channel(e)])))}timeout(e,s,t,i){return s=l.username(s),(t!=null?t:!1)&&!l.isInteger(t)&&(i=t,t=300),t=t!=null?t:300,i=i!=null?i:"",this._sendCommand({channel:e,command:`/timeout ${s} ${t} ${i}`},(o,h)=>this.once("_promiseTimeout",u=>u?h(u):o([l.channel(e),s,~~t,i])))}unban(e,s){return s=l.username(s),this._sendCommand({channel:e,command:`/unban ${s}`},(t,i)=>this.once("_promiseUnban",o=>o?i(o):t([l.channel(e),s])))}unhost(e){return this._sendCommand({delay:2e3,channel:e,command:"/unhost"},(s,t)=>this.once("_promiseUnhost",i=>i?t(i):s([l.channel(e)])))}unmod(e,s){return s=l.username(s),this._sendCommand({channel:e,command:`/unmod ${s}`},(t,i)=>this.once("_promiseUnmod",o=>o?i(o):t([l.channel(e),s])))}unvip(e,s){return s=l.username(s),this._sendCommand({channel:e,command:`/unvip ${s}`},(t,i)=>this.once("_promiseUnvip",o=>o?i(o):t([l.channel(e),s])))}vip(e,s){return s=l.username(s),this._sendCommand({channel:e,command:`/vip ${s}`},(t,i)=>this.once("_promiseVip",o=>o?i(o):t([l.channel(e),s])))}vips(e){return this._sendCommand({channel:e,command:"/vips"},(s,t)=>this.once("_promiseVips",(i,o)=>i?t(i):s(o)))}whisper(e,s){return e=l.username(e),e===this.getUsername()?Promise.reject("Cannot send a whisper to the same account."):this._sendCommand({delay:null,channel:this._globalDefaultChannel,command:`/w ${e} ${s}`},(t,i)=>this.once("_promiseWhisper",o=>o&&i(o))).catch(t=>{if(t&&typeof t=="string"&&t.indexOf("No response from Twitch.")!==0)throw t;let i=l.channel(e),o=Object.assign({"message-type":"whisper","message-id":null,"thread-id":null,username:this.getUsername()},this.globaluserstate);return this.emits(["whisper","message"],[[i,o,s,!0]]),[e,s]})}};k(g,"Client");g.prototype.followersmode=g.prototype.followersonly;g.prototype.followersmodeoff=g.prototype.followersonlyoff;g.prototype.leave=g.prototype.part;g.prototype.slowmode=g.prototype.slow;g.prototype.r9kmode=g.prototype.r9kbeta;g.prototype.uniquechat=g.prototype.r9kbeta;g.prototype.r9kmodeoff=g.prototype.r9kbetaoff;g.prototype.uniquechatoff=g.prototype.r9kbeta;g.prototype.slowmodeoff=g.prototype.slowoff;ee.exports=g});var ge=T((Ie,ie)=>{var te=se();ie.exports={client:te,Client:te}});return ge();})();
//# sourceMappingURL=tmi.min.js.map

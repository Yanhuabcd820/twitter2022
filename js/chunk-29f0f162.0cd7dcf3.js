(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29f0f162"],{"20b3":function(t,e,o){},"2ca7":function(t,e,o){"use strict";o("20b3")},"2fb2":function(t,e,o){},"6abf":function(t,e,o){"use strict";o("2fb2")},ee09:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"wrap"},[o("navigation",{attrs:{userId:t.currentUser.id}}),o("div",{staticClass:"main"},[o("userTitle",{attrs:{userName:t.user.name,tweetNum:t.user.tweetsCount}}),o("navTabsFollow",{attrs:{userId:Number(t.$route.params.id)}}),o("div",{staticClass:"tweet-wrap"},t._l(t.followships,(function(e){return o("div",{key:e.id,staticClass:"tweet-card"},[o("div",{staticClass:"tweet-avatar"},[o("img",{attrs:{src:t._f("emptyAvatar")(e.followingUser.avatar),alt:""}})]),o("div",{staticClass:"tweet-content"},[o("div",{staticClass:"tweet-title"},[o("div",{staticClass:"tweet-name-group"},[o("p",{staticClass:"tweet-name"},[o("b",[t._v(t._s(e.followingUser.name))])]),e.isFollowed?o("div",{staticClass:"btn active",on:{click:function(o){return o.preventDefault(),o.stopPropagation(),t.unFollow(e.followingId)}}},[t._v("正在跟隨")]):o("div",{staticClass:"btn",on:{click:function(o){return o.preventDefault(),o.stopPropagation(),t.addFollow(e.followingId)}}},[t._v("跟隨")])])]),o("div",{staticClass:"tweet-text"},[o("p",[t._v(" "+t._s(e.followingUser.introduction)+" ")])])])])})),0)],1),o("followTopTypeB",{key:t.componentKey,on:{"addFollow-From-followTop":t.addFollowFromfollowTop,"unFollow-From-followTop":t.unFollowFromfollowTop}})],1)},i=[],r=o("5530"),l=o("2909"),a=o("1da1"),s=(o("96cf"),o("b0c0"),o("d81d"),o("7db0"),o("d3b7"),o("3d01")),c=o("7e59"),u=o("8e6e"),f=o("477d"),w=o("2708"),d=o("1602"),p=o("2f62"),h=o("2fa3"),m=o("b025"),v={name:"selfPageFollowing",components:{navigation:s["a"],followTopTypeB:c["a"],userTitle:u["a"],navTabsFollow:f["a"]},data:function(){return{user:{name:"",tweetNum:-1},followships:[],componentKey:0}},methods:{fetchUser:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var n,i,r,l,a,s,c,u,f,w,p,h,m,v;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,d["a"].getUser(t);case 3:n=o.sent,i=n.data,r=i.id,l=i.account,a=i.name,s=i.email,c=i.role,u=i.introduction,f=i.avatar,w=i.cover,p=i.followingCount,h=i.followerCount,m=i.isFollowing,v=i.tweetsCount,e.user={id:r,account:l,name:a,email:s,role:c,introduction:u,avatar:f,cover:w,followingCount:p,followerCount:h,isFollowing:m,tweetsCount:v},o.next=11;break;case 8:o.prev=8,o.t0=o["catch"](0),console.log("error",o.t0);case 11:case"end":return o.stop()}}),o,null,[[0,8]])})))()},fetchUserFollowing:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,d["a"].getUserFollowings(t);case 3:n=o.sent,e.followships=Object(l["a"])(n.data),e.followships.length<1&&h["a"].fire({icon:"info",title:"這個人沒有追蹤任何人"}),o.next=11;break;case 8:o.prev=8,o.t0=o["catch"](0),console.log("error",o.t0);case 11:case"end":return o.stop()}}),o,null,[[0,8]])})))()},isThisMe:function(t){this.isMe=this.currentUser.id==t},addFollow:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,m["a"].addFollow({id:t});case 3:e.followships=e.followships.map((function(e){return e.followingId===t?Object(r["a"])(Object(r["a"])({},e),{},{isFollowed:!0}):e})),e.forceRenderFollowTop(),o.next=10;break;case 7:o.prev=7,o.t0=o["catch"](0),h["a"].fire({icon:"error",title:"無法follow此人，請稍後再試"});case 10:case"end":return o.stop()}}),o,null,[[0,7]])})))()},unFollow:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,m["a"].unFollow({followingId:t});case 3:e.followships=e.followships.map((function(e){return e.followingId===t?Object(r["a"])(Object(r["a"])({},e),{},{isFollowed:!1}):e})),e.forceRenderFollowTop(),o.next=10;break;case 7:o.prev=7,o.t0=o["catch"](0),h["a"].fire({icon:"error",title:"無法unFollow此人，請稍後再試"});case 10:case"end":return o.stop()}}),o,null,[[0,7]])})))()},forceRenderFollowTop:function(){this.componentKey+=1},addFollowFromfollowTop:function(t){if(this.$route.params.id==this.currentUser.id)this.followships.find((function(e){return e.followingId===t.id}))?this.followships=this.followships.map((function(e){return e.followingId===t.id?Object(r["a"])(Object(r["a"])({},e),{},{isFollowed:!0}):e})):this.followships.push({followingId:t.id,followingUser:{id:t.id,name:t.name,account:t.account,avatar:t.avatar,introduction:t.introduction},isFollowed:!0});else{var e=this.followships.find((function(e){return e.followingId===t.id}));e&&(this.followships=this.followships.map((function(e){return e.followingId===t.id?Object(r["a"])(Object(r["a"])({},e),{},{isFollowed:!0}):e})))}},unFollowFromfollowTop:function(t){this.$route.params.id,this.currentUser.id,this.followships.find((function(e){return e.followingId===t.id}))&&(this.followships=this.followships.map((function(e){return e.followingId===t.id?Object(r["a"])(Object(r["a"])({},e),{},{isFollowed:!1}):e})))}},computed:Object(r["a"])({},Object(p["b"])(["currentUser"])),created:function(){var t=localStorage.getItem("token");t||(h["a"].fire({icon:"warning",title:"請登入"}),this.$router.push("/login"));var e=this.$route.params.id;this.fetchUser(e),this.fetchUserFollowing(e),this.isThisMe(e)},watch:{"$route.params.id":{handler:function(t){this.fetchUser(t),this.fetchUserFollowing(t),this.isThisMe(t)},immediate:!0}},mixins:[w["b"],w["a"]]},g=v,b=(o("2ca7"),o("6abf"),o("2877")),F=Object(b["a"])(g,n,i,!1,null,"2050474b",null);e["default"]=F.exports}}]);
//# sourceMappingURL=chunk-29f0f162.0cd7dcf3.js.map
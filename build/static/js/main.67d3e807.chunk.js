(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t(15),o=t.n(c),a=t(5),u=t(3),i=t(4),s=t.n(i),b="/api/persons",l=function(){return s.a.get(b).then((function(e){return e.data}))},j=function(e){return s.a.post(b,e).then((function(e){return e.data}))},d=function(e,n){return s.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},f=function(e){return s.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},m=t(0),h=function(e){var n=e.state,t=e.onChange;return Object(m.jsxs)("div",{children:["filter names with ",Object(m.jsx)("input",{value:n,onChange:t})]})},O=function(e){return Object(m.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(m.jsxs)("div",{children:["name: ",Object(m.jsx)("input",{value:e.nameState,onChange:e.onNameChange})]}),Object(m.jsxs)("div",{children:["number:"," ",Object(m.jsx)("input",{type:"tel",value:e.numberState,onChange:e.onNumberChange})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.person,t=e.onRemove;return Object(m.jsxs)("li",{children:[n.name," ",n.number," ",Object(m.jsx)("button",{onClick:t,children:"remove"})]})},p=function(e){var n=e.allPersons,t=e.nameFilter,r=e.handleRemove,c=t?n.filter((function(e){return e.name.toLowerCase().startsWith(t.toLowerCase())})):n;return Object(m.jsx)("ul",{children:c.map((function(e){return Object(m.jsx)(v,{person:e,onRemove:function(){return r(e.id)}},e.id)}))})},x=function(e){var n=e.message,t=e.style;return null===n?null:Object(m.jsx)("div",{style:t,children:n})},g=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(""),i=Object(u.a)(o,2),s=i[0],b=i[1],v=Object(r.useState)(""),g=Object(u.a)(v,2),S=g[0],w=g[1],C=Object(r.useState)(""),y=Object(u.a)(C,2),k=y[0],R=y[1],N=Object(r.useState)(null),P=Object(u.a)(N,2),A=P[0],B=P[1],E=Object(r.useState)(null),F=Object(u.a)(E,2),J=F[0],L=F[1];Object(r.useEffect)((function(){return l().then((function(e){return c(e)}))}),[]);var T={background:"lightgrey",fontSize:20,color:"green",padding:10,borderStyle:"solid",borderRadius:5,marginBottom:10},z=Object(a.a)(Object(a.a)({},T),{},{color:"red"});return Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{children:"Phonebook"}),Object(m.jsx)(x,{message:A,style:T}),Object(m.jsx)(x,{message:J,style:z}),Object(m.jsx)(h,{state:k,onChange:function(e){return R(e.target.value)}}),Object(m.jsx)("h2",{children:"Add new contact"}),Object(m.jsx)(O,{onSubmit:function(e){e.preventDefault();var n=null;if(""!==s){if(t.some((function(e){return e.name===s}))){if(window.confirm("".concat(s," is already in phonebook, replace old number with new?"))){var r=t.find((function(e){return e.name===s}));d(r.id,Object(a.a)(Object(a.a)({},r),{},{number:S})).then((function(e){c(t.map((function(n){return n.id!==e.id?n:e}))),n="Updated"})).catch((function(e){L("".concat(s," has already been removed from server")),setTimeout((function(){return L(null)}),5e3),c(t.filter((function(e){return e.id!==r.id})))}))}}else j({name:s,number:S}).then((function(e){return c(t.concat(e))})),n="Added";b(""),w(""),n&&(B("".concat(n," ").concat(s)),setTimeout((function(){return B(null)}),3e3))}},onNameChange:function(e){return b(e.target.value)},onNumberChange:function(e){return w(e.target.value)},nameState:s,numberState:S}),Object(m.jsx)("h2",{children:"Numbers"}),Object(m.jsx)(p,{allPersons:t,nameFilter:k,handleRemove:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Remove ".concat(n.name," ?"))&&(f(e),l().then((function(e){c(e)})))}})]})};o.a.render(Object(m.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.67d3e807.chunk.js.map
(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=t(4),l=t(2),i=function(e){var n=e.newFilter,t=e.handleNewFilter;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t})))},m=function(e){return r.a.createElement("form",{onSubmit:e.handleNewPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNewName})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNewNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.persons,t=e.removePerson;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("p",{key:n.indexOf(e)},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},f=t(3),s=t.n(f),b="/api/persons",h=function(){return s.a.get(b).then((function(e){return e.data}))},v=function(e){return s.a.post(b,e).then((function(e){return e.data}))},g=function(e){return console.log("".concat(b,"/").concat(e)),s.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},E=function(e,n){return console.log("".concat(b,"/").concat(e)),s.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.message,t={background:"lightgrey",color:"green",fontSize:18,borderStyle:"solid",padding:"0.8em",marginLeft:"0.5em",marginRight:"0.5em",borderColor:"green",borderRadius:5,marginBottom:"1em",backgroundColor:"lightgrey"};if(!0===e.isError){var a=Object(u.a)(Object(u.a)({},t),{},{color:"red",borderColor:"red"});return r.a.createElement("div",{style:a},n)}return null===n?null:r.a.createElement("div",{style:t},n)},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),f=Object(l.a)(c,2),s=f[0],b=f[1],w=Object(a.useState)(""),O=Object(l.a)(w,2),j=O[0],N=O[1],k=Object(a.useState)(""),y=Object(l.a)(k,2),C=y[0],S=y[1],P=Object(a.useState)(null),T=Object(l.a)(P,2),F=T[0],L=T[1],R=Object(a.useState)(!1),x=Object(l.a)(R,2),B=x[0],D=x[1];Object(a.useEffect)((function(){h().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:F,isError:B}),r.a.createElement(i,{filter:C,handleNewFilter:function(e){console.log(e.target.value),S(e.target.value);var n=t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())}));o(n),""===e.target.value&&h().then((function(e){o(e)}))}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(m,{newName:s,handleNewName:function(e){console.log(e.target.value),b(e.target.value)},newNumber:j,handleNewNumber:function(e){console.log(e.target.value),N(e.target.value)},handleNewPerson:function(e){if(e.preventDefault(),!0===t.map((function(e){return e.name})).includes(s)){if(!0===window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===s})),a=Object(u.a)(Object(u.a)({},n),{},{number:j});E(a.id,a).then((function(e){o(t.map((function(t){return t.name!==n.name?t:e})))})).catch((function(e){L("Information of ".concat(s," has already been removed from server")),D(!0),setTimeout((function(){L(null),D(!1)}),5e3)})),L("Changed number of ".concat(a.name)),setTimeout((function(){L(null)}),5e3)}}else{var r={name:s,number:j};v(r).then((function(e){o(t.concat(e))})),L("Added ".concat(r.name)),setTimeout((function(){L(null)}),5e3)}b(""),N("")}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(d,{persons:t,removePerson:function(e){var n=t.find((function(n){return n.id===e}));if(!0===window.confirm("Delete ".concat(n.name," ?"))){var a=t.filter((function(n){return n.id!==e}));o(a),g(e),console.log("person removed from database"),L("Removed ".concat(n.name," from database")),setTimeout((function(){L(null)}),5e3)}}}))};t(37);c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b0f420ea.chunk.js.map
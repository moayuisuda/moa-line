parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"deRS":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3];!function(t){var o=t.noise={};function r(t,o,r){this.x=t,this.y=o,this.z=r}r.prototype.dot2=function(t,o){return this.x*t+this.y*o},r.prototype.dot3=function(t,o,r){return this.x*t+this.y*o+this.z*r};var n=[new r(1,1,0),new r(-1,1,0),new r(1,-1,0),new r(-1,-1,0),new r(1,0,1),new r(-1,0,1),new r(1,0,-1),new r(-1,0,-1),new r(0,1,1),new r(0,-1,1),new r(0,1,-1),new r(0,-1,-1)],e=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],a=new Array(512),i=new Array(512);o.seed=function(t){t>0&&t<1&&(t*=65536),(t=Math.floor(t))<256&&(t|=t<<8);for(var o=0;o<256;o++){var r;r=1&o?e[o]^255&t:e[o]^t>>8&255,a[o]=a[o+256]=r,i[o]=i[o+256]=n[r%12]}},o.seed(0);var d=.5*(Math.sqrt(3)-1),f=(3-Math.sqrt(3))/6,h=1/6;function u(t){return t*t*t*(t*(6*t-15)+10)}function s(t,o,r){return(1-r)*t+r*o}o.simplex2=function(t,o){var r,n,e=(t+o)*d,h=Math.floor(t+e),u=Math.floor(o+e),s=(h+u)*f,l=t-h+s,v=o-u+s;l>v?(r=1,n=0):(r=0,n=1);var w=l-r+f,M=v-n+f,c=l-1+2*f,p=v-1+2*f,y=i[(h&=255)+a[u&=255]],x=i[h+r+a[u+n]],m=i[h+1+a[u+1]],q=.5-l*l-v*v,z=.5-w*w-M*M,A=.5-c*c-p*p;return 70*((q<0?0:(q*=q)*q*y.dot2(l,v))+(z<0?0:(z*=z)*z*x.dot2(w,M))+(A<0?0:(A*=A)*A*m.dot2(c,p)))},o.simplex3=function(t,o,r){var n,e,d,f,u,s,l=(t+o+r)*(1/3),v=Math.floor(t+l),w=Math.floor(o+l),M=Math.floor(r+l),c=(v+w+M)*h,p=t-v+c,y=o-w+c,x=r-M+c;p>=y?y>=x?(n=1,e=0,d=0,f=1,u=1,s=0):p>=x?(n=1,e=0,d=0,f=1,u=0,s=1):(n=0,e=0,d=1,f=1,u=0,s=1):y<x?(n=0,e=0,d=1,f=0,u=1,s=1):p<x?(n=0,e=1,d=0,f=0,u=1,s=1):(n=0,e=1,d=0,f=1,u=1,s=0);var m=p-n+h,q=y-e+h,z=x-d+h,A=p-f+2*h,g=y-u+2*h,b=x-s+2*h,j=p-1+.5,k=y-1+.5,B=x-1+.5,C=i[(v&=255)+a[(w&=255)+a[M&=255]]],D=i[v+n+a[w+e+a[M+d]]],E=i[v+f+a[w+u+a[M+s]]],F=i[v+1+a[w+1+a[M+1]]],G=.6-p*p-y*y-x*x,H=.6-m*m-q*q-z*z,I=.6-A*A-g*g-b*b,J=.6-j*j-k*k-B*B;return 32*((G<0?0:(G*=G)*G*C.dot3(p,y,x))+(H<0?0:(H*=H)*H*D.dot3(m,q,z))+(I<0?0:(I*=I)*I*E.dot3(A,g,b))+(J<0?0:(J*=J)*J*F.dot3(j,k,B)))},o.perlin2=function(t,o){var r=Math.floor(t),n=Math.floor(o);t-=r,o-=n;var e=i[(r&=255)+a[n&=255]].dot2(t,o),d=i[r+a[n+1]].dot2(t,o-1),f=i[r+1+a[n]].dot2(t-1,o),h=i[r+1+a[n+1]].dot2(t-1,o-1),l=u(t);return s(s(e,f,l),s(d,h,l),u(o))},o.perlin3=function(t,o,r){var n=Math.floor(t),e=Math.floor(o),d=Math.floor(r);t-=n,o-=e,r-=d;var f=i[(n&=255)+a[(e&=255)+a[d&=255]]].dot3(t,o,r),h=i[n+a[e+a[d+1]]].dot3(t,o,r-1),l=i[n+a[e+1+a[d]]].dot3(t,o-1,r),v=i[n+a[e+1+a[d+1]]].dot3(t,o-1,r-1),w=i[n+1+a[e+a[d]]].dot3(t-1,o,r),M=i[n+1+a[e+a[d+1]]].dot3(t-1,o,r-1),c=i[n+1+a[e+1+a[d]]].dot3(t-1,o-1,r),p=i[n+1+a[e+1+a[d+1]]].dot3(t-1,o-1,r-1),y=u(t),x=u(o),m=u(r);return s(s(s(f,w,y),s(h,M,y),m),s(s(l,c,y),s(v,p,y),m),x)}}(this);
},{}],"FO+Z":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.move=exports.copy=void 0;var r=function(r){var e=[];for(var o in r)e[o]=r[o];return e};exports.copy=r;var e=!1,o=function(r,o,n){if(!e){var t,a;e=!0,t=a=performance.now();var i={};for(var v in r)i[v]=o[v]-r[v];!function o(v){var f=(v-t)/n;if((v-a)/n>=1)e=!1;else{for(var s in r)r[s]+=i[s]*f;t=v,requestAnimationFrame(o)}}(t)}};exports.move=o;
},{}],"40vq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.wave=void 0;var e=require("./perlin"),t=require("./utils"),n=function(n){var i=n.dom,o=n.span,a=void 0===o?50:o,r=n.scale,s=void 0===r?1e3:r,c=n.speed,h=void 0===c?.002:c,d=n.duration,l=void 0===d?1e3:d,p=n.colors,v=void 0===p?[{r:212,g:192,b:255},{r:192,g:255,b:244},{r:255,g:192,b:203}]:p;i.style.position="relative",i.style.zIndex=0,i.style.overflow="hidden";var u=document.createElement("canvas"),y=u.getContext("2d");u.style.position="absolute",u.style.zIndex="-999",u.style.top="-"+.1*parseInt(getComputedStyle(i).height)+"px",u.style.left="-"+.1*parseInt(getComputedStyle(i).width)+"px",u.height=1.2*parseInt(getComputedStyle(i).height),u.width=1.2*parseInt(getComputedStyle(i).width),i.appendChild(u);var g=a/2,m=0,x=0,f=(0,t.copy)(v[x]);function w(e){var t=e.cx,n=e.cy;this.cx=t,this.cy=n}w.prototype.line=function(){y.beginPath();var t=e.noise.simplex3(this.cx/s,this.cy/s,m),n=Math.abs(t);y.strokeStyle="rgba(".concat(f.r,", ").concat(f.g,", ").concat(f.b,", ").concat(n,")"),y.lineWidth=8*Math.abs(t);var i=2*Math.PI*t,o=Math.PI+i;y.moveTo(this.cx+Math.cos(i)*g,this.cy),y.lineTo(this.cx+Math.cos(o)*g,this.cy+Math.sin(o)*g),y.stroke()};var I=[];function b(){for(var e=0;e<u.height;e+=a)for(var t=0;t<u.width;t+=a)I.push(new w({cx:t+g,cy:e+g}))}var C,S={x:0,y:0};return b(),function e(){!function(){y.clearRect(0,0,u.width,u.height),y.translate(S.x,S.y);var e=[0,0];S.x=e[0],S.y=e[1],y.beginPath();for(var t=0;t<I.length;t++)I[t].line()}(),m+=h,C=requestAnimationFrame(e)}(),u.addEventListener("mousemove",function(e){S.x=e.movementX/50,S.y=e.movementY/50}),u.addEventListener("mouseleave",function(){var e=[0,0];S.x=e[0],S.y=e[1]}),window.addEventListener("resize",function(){u.height=1.2*parseInt(getComputedStyle(i).height),u.width=1.2*parseInt(getComputedStyle(i).width),u.style.top="-"+.1*parseInt(getComputedStyle(i).height)+"px",u.style.left="-"+.1*parseInt(getComputedStyle(i).width)+"px",b()}),u.addEventListener("click",function(){var e=(0,t.copy)(v[++x%v.length]);(0,t.move)(f,e,l)}),{canvas:u,stop:function(){cancelAnimationFrame(C)}}};exports.wave=n;
},{"./perlin":"deRS","./utils":"FO+Z"}],"5NEn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.wind=void 0;var t=require("./perlin"),e=require("./utils"),n=function(n){var i=n.dom,o=n.span,a=void 0===o?50:o,r=n.scale,s=void 0===r?200:r,c=n.speed,h=void 0===c?1e-4:c,d=n.duration,l=void 0===d?1e3:d,p=n.colors,v=void 0===p?[{r:212,g:192,b:255},{r:192,g:255,b:244},{r:255,g:192,b:203}]:p;i.style.position="relative",i.style.zIndex=0,i.style.overflow="hidden";var u=document.createElement("canvas"),y=u.getContext("2d");u.style.position="absolute",u.style.zIndex="-999",u.style.top="-"+.1*parseInt(getComputedStyle(i).height)+"px",u.style.left="-"+.1*parseInt(getComputedStyle(i).width)+"px",u.height=1.2*parseInt(getComputedStyle(i).height),u.width=1.2*parseInt(getComputedStyle(i).width),i.appendChild(u);var g=a/2,m=0,x=0,f=(0,e.copy)(v[x]);function w(t){var e=t.cx,n=t.cy;this.cx=e,this.cy=n}w.prototype.line=function(){y.beginPath();var e=t.noise.simplex3(this.cx/s,this.cy/s,m),n=Math.abs(e);y.strokeStyle="rgba(".concat(f.r,", ").concat(f.g,", ").concat(f.b,", ").concat(n,")"),y.lineWidth=8*Math.abs(e);var i=2*Math.PI*e,o=Math.PI+i;y.moveTo(this.cx*Math.cos(i),this.cx*Math.sin(i)),y.lineTo(this.cx*Math.sin(o),this.cy*Math.cos(o)),y.stroke()};var I=[];function b(){for(var t=0;t<u.height;t+=a)for(var e=0;e<u.width;e+=a)I.push(new w({cx:e+g,cy:t+g}))}var C,M={x:0,y:0};return b(),function t(){!function(){y.clearRect(0,0,u.width,u.height),y.translate(M.x,M.y);var t=[0,0];M.x=t[0],M.y=t[1],y.beginPath();for(var e=0;e<I.length;e++)I[e].line()}(),m+=h,C=requestAnimationFrame(t)}(),u.addEventListener("mousemove",function(t){M.x=t.movementX/50,M.y=t.movementY/50}),u.addEventListener("mouseleave",function(){var t=[0,0];M.x=t[0],M.y=t[1]}),window.addEventListener("resize",function(){u.height=1.2*parseInt(getComputedStyle(i).height),u.width=1.2*parseInt(getComputedStyle(i).width),u.style.top="-"+.1*parseInt(getComputedStyle(i).height)+"px",u.style.left="-"+.1*parseInt(getComputedStyle(i).width)+"px",b()}),u.addEventListener("click",function(){var t=(0,e.copy)(v[++x%v.length]);(0,e.move)(f,t,l)}),{canvas:u,stop:function(){cancelAnimationFrame(C)}}};exports.wind=n;
},{"./perlin":"deRS","./utils":"FO+Z"}],"dNwM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.rain=void 0;var t=require("./perlin"),e=require("./utils"),n=function(n){var i=n.dom,o=n.span,a=void 0===o?50:o,r=n.scale,s=void 0===r?1e3:r,c=n.speed,h=void 0===c?.002:c,d=n.duration,l=void 0===d?1e3:d,p=n.colors,v=void 0===p?[{r:212,g:192,b:255},{r:192,g:255,b:244},{r:255,g:192,b:203}]:p;i.style.position="relative",i.style.zIndex=0,i.style.overflow="hidden";var u=document.createElement("canvas"),y=u.getContext("2d");u.style.position="absolute",u.style.zIndex="-999",u.style.top="-"+.1*parseInt(getComputedStyle(i).height)+"px",u.style.left="-"+.1*parseInt(getComputedStyle(i).width)+"px",u.height=1.2*parseInt(getComputedStyle(i).height),u.width=1.2*parseInt(getComputedStyle(i).width),i.appendChild(u);var g=a/2,m=0,x=0,f=(0,e.copy)(v[x]);function w(t){var e=t.cx,n=t.cy;this.cx=e,this.cy=n}w.prototype.line=function(){y.beginPath();var e=t.noise.simplex3(this.cx/s,this.cy/s,m),n=Math.abs(e);y.strokeStyle="rgba(".concat(f.r,", ").concat(f.g,", ").concat(f.b,", ").concat(n,")"),y.lineWidth=8*Math.abs(e);var i=2*Math.PI*e,o=Math.PI+i;y.moveTo(this.cx+Math.sin(i)*g,this.cy+Math.cos(i)*g),y.lineTo(this.cx+Math.cos(o)*g,this.cy+Math.sin(o)*g),y.stroke()};var I=[];function b(){for(var t=0;t<u.height;t+=a)for(var e=0;e<u.width;e+=a)I.push(new w({cx:e+g,cy:t+g}))}var C,M={x:0,y:0};return b(),function t(){!function(){y.clearRect(0,0,u.width,u.height),y.translate(M.x,M.y);var t=[0,0];M.x=t[0],M.y=t[1],y.beginPath();for(var e=0;e<I.length;e++)I[e].line()}(),m+=h,C=requestAnimationFrame(t)}(),u.addEventListener("mousemove",function(t){M.x=t.movementX/50,M.y=t.movementY/50}),u.addEventListener("mouseleave",function(){var t=[0,0];M.x=t[0],M.y=t[1]}),window.addEventListener("resize",function(){u.height=1.2*parseInt(getComputedStyle(i).height),u.width=1.2*parseInt(getComputedStyle(i).width),u.style.top="-"+.1*parseInt(getComputedStyle(i).height)+"px",u.style.left="-"+.1*parseInt(getComputedStyle(i).width)+"px",b()}),u.addEventListener("click",function(){var t=(0,e.copy)(v[++x%v.length]);(0,e.move)(f,t,l)}),{canvas:u,stop:function(){cancelAnimationFrame(C)}}};exports.rain=n;
},{"./perlin":"deRS","./utils":"FO+Z"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"wave",{enumerable:!0,get:function(){return e.wave}}),Object.defineProperty(exports,"wind",{enumerable:!0,get:function(){return r.wind}}),Object.defineProperty(exports,"rain",{enumerable:!0,get:function(){return t.rain}});var e=require("./wave"),r=require("./wind"),t=require("./rain");
},{"./wave":"40vq","./wind":"5NEn","./rain":"dNwM"}]},{},["Focm"], "moaline")
//# sourceMappingURL=/index.map
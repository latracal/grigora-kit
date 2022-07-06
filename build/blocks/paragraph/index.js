(()=>{var e,t={728:(e,t,a)=>{"use strict";const o=window.wp.blocks;function r(){return r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},r.apply(this,arguments)}const i=window.wp.element;var n=a(184),l=a.n(n);const f=window.wp.i18n,d=window.wp.blockEditor,c=window.wp.components;function s(e){let{direction:t,setDirection:a}=e;return(0,f.isRTL)()&&(0,i.createElement)(c.ToolbarDropdownMenu,{controls:[{icon:formatLtr,title:(0,f._x)("Left to right","editor button"),isActive:"ltr"===t,onClick(){a("ltr"===t?void 0:"ltr")}}]})}const g=JSON.parse('{"u2":"grigora-kit/paragraph"}');(0,o.registerBlockType)(g.u2,{edit:function(e){const{attributes:t,setAttributes:a,clientId:o}=e,[n,g]=(0,i.useState)(!1),{id:u,content:p,align:m,direction:R,textShadow:h,textShadowColor:B,textShadowBlur:b,textShadowHorizontal:v,textShadowVertical:C,layoutVerticalAlign:y,layoutPosition:x,effectNRotateX:_,effectNRotateY:H,effectNRotateZ:E,effectNOffsetX:N,effectNOffsetY:k,effectNScale:T,effectNBorderType:$,effectNBorderWidth:w,effectNBorderColor:P,effectNBorderRadiusTL:S,effectNBorderRadiusTR:O,effectNBorderRadiusBL:L,effectNBorderRadiusBR:X,hoverEffect:Y,transitionTime:Z,effectHRotateX:W,effectHRotateY:A,effectHRotateZ:j,effectHOffsetX:D,effectHOffsetY:V,effectHScale:z,effectHBorderType:F,effectHBorderWidth:M,effectHBorderColor:I,effectHBorderRadiusTL:J,effectHBorderRadiusTR:q,effectHBorderRadiusBL:G,effectHBorderRadiusBR:K}=t;o&&!u&&a({id:o});const Q=(0,d.useBlockProps)({className:l()({[`has-text-align-${m}`]:m}),style:{transition:Y?`${Z}s`:"0s",direction:R,"text-shadow":h?`${v}px ${C}px ${b}px ${B}`:"none","align-self":y,position:x,transform:Y&&n?`rotateX(${W}deg) rotateY(${A}deg) rotateZ(${j}deg) translateX(${D}px) translateY(${V}px) scale(${z})`:`rotateX(${_}deg) rotateY(${H}deg) rotateZ(${E}deg) translateX(${N}px) translateY(${k}px) scale(${T})`,"border-width":Y&&n?`${M}px`:`${w}px`,"border-style":Y&&n?`${F}`:`${$}`,"border-color":Y&&n?`${I}`:`${P}`,borderTopLeftRadius:Y&&n?`${J}%`:`${S}%`,borderTopRightRadius:Y&&n?`${q}%`:`${O}%`,borderBottomLeftRadius:Y&&n?`${G}%`:`${L}%`,borderBottomRightRadius:Y&&n?`${K}%`:`${X}%`}});return(0,i.createElement)("div",(0,d.useBlockProps)(),(0,i.createElement)(d.BlockControls,{group:"block"},(0,i.createElement)(d.AlignmentControl,{value:m,onChange:e=>a({align:e})}),(0,i.createElement)(s,{direction:R,setDirection:e=>a({direction:e})})),(0,i.createElement)(d.InspectorControls,null,(0,i.createElement)(c.PanelBody,{title:(0,f.__)("Text Shadow","grigora-kit"),initialOpen:!1},(0,i.createElement)(c.ToggleControl,{label:(0,f.__)("Text Shadow","grigora-kit"),checked:!!h,onChange:()=>a({textShadow:!h})}),h&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(c.ColorPalette,{clearable:!1,value:B,onChange:e=>a({textShadowColor:e})}),(0,i.createElement)(c.RangeControl,{initialPosition:33,label:(0,f.__)("Blur","grigora-kit"),max:100,min:0,onChange:e=>a({textShadowBlur:e}),value:b}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Horizontal","grigora-kit"),max:100,min:-100,onChange:e=>a({textShadowHorizontal:e}),value:v}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Vertical","grigora-kit"),max:100,min:-100,onChange:e=>a({textShadowVertical:e}),value:C}))),(0,i.createElement)(c.PanelBody,{title:(0,f.__)("Layout","grigora-kit"),initialOpen:!1},(0,i.createElement)(c.SelectControl,{label:(0,f.__)("Vertical Align: ","grigora-kit"),labelPosition:"side",onChange:e=>a({layoutVerticalAlign:e}),value:y,options:[{label:"Start",value:"flex-start"},{label:"Center",value:"center"},{label:"End",value:"flex-end"}]}),"initial"!=x&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(c.Notice,{status:"warning",isDismissible:!1},(0,i.createElement)("p",null,(0,f.__)("Position other than default is not recommended. Don't change this unless, you're sure of what you're doing.","grigora-kit"))),(0,i.createElement)("br",null)),(0,i.createElement)(c.SelectControl,{label:(0,f.__)("Position: ","grigora-kit"),labelPosition:"side",onChange:e=>a({layoutPosition:e}),value:x,options:[{label:"Default",value:"initial"},{label:"Absolute",value:"absolute"},{label:"Fixed",value:"fixed"},{label:"Sticky",value:"sticky"}]})),(0,i.createElement)(c.PanelBody,{title:(0,f.__)("Effects & Border: Normal","grigora-kit"),initialOpen:!1},(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Rotate X (degrees)","grigora-kit"),max:180,min:-180,onChange:e=>a({effectNRotateX:e}),value:_}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Rotate Y (degrees)","grigora-kit"),max:180,min:-180,onChange:e=>a({effectNRotateY:e}),value:H}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Rotate Z (degrees)","grigora-kit"),max:180,min:-180,onChange:e=>a({effectNRotateZ:e}),value:E}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Offset X (px)","grigora-kit"),max:500,min:-500,onChange:e=>a({effectNOffsetX:e}),value:N}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Offset Y (px)","grigora-kit"),max:500,min:-500,onChange:e=>a({effectNOffsetY:e}),value:k}),(0,i.createElement)(c.RangeControl,{initialPosition:1,label:(0,f.__)("Scale","grigora-kit"),max:1.5,min:0,step:.1,onChange:e=>a({effectNScale:e}),value:T}),(0,i.createElement)(c.SelectControl,{label:(0,f.__)("Border Type: ","grigora-kit"),labelPosition:"side",onChange:e=>a({effectNBorderType:e}),value:$,options:[{label:"None",value:"none"},{label:"Solid",value:"solid"},{label:"Dotted",value:"dotted"},{label:"Dashed",value:"dashed"}]}),"none"!=$&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Width (px)","grigora-kit"),max:10,min:0,onChange:e=>a({effectNBorderWidth:e}),value:w}),(0,i.createElement)(c.ColorPalette,{clearable:!1,value:P,onChange:e=>a({effectNBorderColor:e})})),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius TL (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectNBorderRadiusTL:e}),value:S}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius TR (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectNBorderRadiusTR:e}),value:O}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius BL (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectNBorderRadiusBL:e}),value:L}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius BR (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectNBorderRadiusBR:e}),value:X})),(0,i.createElement)(c.PanelBody,{title:(0,f.__)("Effects & Border: Hover","grigora-kit"),initialOpen:!1},(0,i.createElement)(c.ToggleControl,{label:(0,f.__)("Hover Effects","grigora-kit"),checked:!!Y,onChange:()=>a({hoverEffect:!Y})}),Y&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(c.RangeControl,{initialPosition:1,label:(0,f.__)("Transition Time (sec)","grigora-kit"),max:5,min:.1,step:.1,onChange:e=>a({transitionTime:e}),value:Z}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Rotate X (degrees)","grigora-kit"),max:180,min:-180,onChange:e=>a({effectHRotateX:e}),value:W}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Rotate Y (degrees)","grigora-kit"),max:180,min:-180,onChange:e=>a({effectHRotateY:e}),value:A}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Rotate Z (degrees)","grigora-kit"),max:180,min:-180,onChange:e=>a({effectHRotateZ:e}),value:j}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Offset X (px)","grigora-kit"),max:500,min:-500,onChange:e=>a({effectHOffsetX:e}),value:D}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Offset Y (px)","grigora-kit"),max:500,min:-500,onChange:e=>a({effectHOffsetY:e}),value:V}),(0,i.createElement)(c.RangeControl,{initialPosition:1,label:(0,f.__)("Scale","grigora-kit"),max:1.5,min:0,step:.1,onChange:e=>a({effectHScale:e}),value:z}),(0,i.createElement)(c.SelectControl,{label:(0,f.__)("Border Type: ","grigora-kit"),labelPosition:"side",onChange:e=>a({effectHBorderType:e}),value:F,options:[{label:"None",value:"none"},{label:"Solid",value:"solid"},{label:"Dotted",value:"dotted"},{label:"Dashed",value:"dashed"}]}),"none"!=F&&(0,i.createElement)(i.Fragment,null,(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Width (px)","grigora-kit"),max:10,min:0,onChange:e=>a({effectHBorderWidth:e}),value:M}),(0,i.createElement)(c.ColorPalette,{clearable:!1,value:I,onChange:e=>a({effectHBorderColor:e})})),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius TL (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectHBorderRadiusTL:e}),value:J}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius TR (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectHBorderRadiusTR:e}),value:q}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius BL (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectHBorderRadiusBL:e}),value:G}),(0,i.createElement)(c.RangeControl,{initialPosition:0,label:(0,f.__)("Border Radius BR (%)","grigora-kit"),max:100,min:0,onChange:e=>a({effectHBorderRadiusBR:e}),value:K})))),(0,i.createElement)(d.RichText,r({},Q,{onMouseEnter:()=>{g(!0)},onMouseLeave:()=>{g(!1)},tagName:"p",identifier:"content",value:p,onChange:e=>{a({content:e})},placeholder:(0,f.__)("Write Something...","grigora-kit")})))},save:function(e){let{attributes:t,className:a,clientId:o}=e;const{id:r,content:n,align:f,direction:c,textShadow:s,textShadowColor:g,textShadowBlur:u,textShadowHorizontal:p,textShadowVertical:m,layoutVerticalAlign:R,layoutPosition:h,effectNRotateX:B,effectNRotateY:b,effectNRotateZ:v,effectNOffsetX:C,effectNOffsetY:y,effectNScale:x,effectNBorderType:_,effectNBorderWidth:H,effectNBorderColor:E,effectNBorderRadiusTL:N,effectNBorderRadiusTR:k,effectNBorderRadiusBL:T,effectNBorderRadiusBR:$,hoverEffect:w,transitionTime:P,effectHRotateX:S,effectHRotateY:O,effectHRotateZ:L,effectHOffsetX:X,effectHOffsetY:Y,effectHScale:Z,effectHBorderType:W,effectHBorderWidth:A,effectHBorderColor:j,effectHBorderRadiusTL:D,effectHBorderRadiusTR:V,effectHBorderRadiusBL:z,effectHBorderRadiusBR:F}=t,M=l()(a,{[`has-text-align-${f}`]:f,"wp-block-grigora-kit-paragraph":!0,"hover-effects":w,[`block-id-${r}`]:r}),I={transition:w?`${P}s`:"0s",direction:c,"text-shadow":s?`${p}px ${m}px ${u}px ${g}`:"none","align-self":R,position:h,transform:`rotateX(${B}deg) rotateY(${b}deg) rotateZ(${v}deg) translateX(${C}px) translateY(${y}px) scale(${x})`,"border-width":`${H}px`,"border-style":`${_}`,"border-color":`${E}`,borderTopLeftRadius:`${N}%`,borderTopRightRadius:`${k}%`,borderBottomLeftRadius:`${T}%`,borderBottomRightRadius:`${$}%`},J=JSON.stringify({id:r,effectHRotateX:S,effectHRotateY:O,effectHRotateZ:L,effectHOffsetX:X,effectHOffsetY:Y,effectHScale:Z,effectHBorderType:W,effectHBorderWidth:A,effectHBorderColor:j,effectHBorderRadiusTL:D,effectHBorderRadiusTR:V,effectHBorderRadiusBL:z,effectHBorderRadiusBR:F});return(0,i.createElement)(d.RichText.Content,{tagName:"p",className:M,value:n,style:I,"data-settings":J})},attributes:{id:{type:"string",default:""},align:{type:"string"},content:{type:"string",default:""},direction:{type:"string",enum:["ltr","rtl"]},textShadow:{type:"boolean",default:!1},textShadowColor:{type:"string",default:"#000"},textShadowBlur:{type:"integer",default:33},textShadowHorizontal:{type:"integer",default:0},textShadowVertical:{type:"integer",default:0},layoutVerticalAlign:{type:"string",default:"flex-start"},layoutPosition:{type:"string",default:"initial"},effectNRotateX:{type:"integer",default:0},effectNRotateY:{type:"integer",default:0},effectNRotateZ:{type:"integer",default:0},effectNOffsetX:{type:"integer",default:0},effectNOffsetY:{type:"integer",default:0},effectNScale:{type:"number",default:1},effectNBorderType:{type:"string",default:"none"},effectNBorderWidth:{type:"integer",default:0},effectNBorderColor:{type:"string",default:"#000"},effectNBorderRadiusTL:{type:"integer",default:0},effectNBorderRadiusTR:{type:"integer",default:0},effectNBorderRadiusBL:{type:"integer",default:0},effectNBorderRadiusBR:{type:"integer",default:0},hoverEffect:{type:"boolean",default:!1},transitionTime:{type:"number",default:1},effectHRotateX:{type:"integer",default:0},effectHRotateY:{type:"integer",default:0},effectHRotateZ:{type:"integer",default:0},effectHOffsetX:{type:"integer",default:0},effectHOffsetY:{type:"integer",default:0},effectHScale:{type:"number",default:1},effectHBorderType:{type:"string",default:"none"},effectHBorderWidth:{type:"integer",default:0},effectHBorderColor:{type:"string",default:"#000"},effectHBorderRadiusTL:{type:"integer",default:0},effectHBorderRadiusTR:{type:"integer",default:0},effectHBorderRadiusBL:{type:"integer",default:0},effectHBorderRadiusBR:{type:"integer",default:0}},supports:{anchor:!0,className:!1,color:{link:!0},typography:{fontSize:!0,lineHeight:!0},spacing:{margin:!0,padding:!0}}})},184:(e,t)=>{var a;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var i=typeof a;if("string"===i||"number"===i)e.push(a);else if(Array.isArray(a)){if(a.length){var n=r.apply(null,a);n&&e.push(n)}}else if("object"===i)if(a.toString===Object.prototype.toString)for(var l in a)o.call(a,l)&&a[l]&&e.push(l);else e.push(a.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()}},a={};function o(e){var r=a[e];if(void 0!==r)return r.exports;var i=a[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,a,r,i)=>{if(!a){var n=1/0;for(c=0;c<e.length;c++){for(var[a,r,i]=e[c],l=!0,f=0;f<a.length;f++)(!1&i||n>=i)&&Object.keys(o.O).every((e=>o.O[e](a[f])))?a.splice(f--,1):(l=!1,i<n&&(n=i));if(l){e.splice(c--,1);var d=r();void 0!==d&&(t=d)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[a,r,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={527:0,773:0};o.O.j=t=>0===e[t];var t=(t,a)=>{var r,i,[n,l,f]=a,d=0;if(n.some((t=>0!==e[t]))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(f)var c=f(o)}for(t&&t(a);d<n.length;d++)i=n[d],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},a=globalThis.webpackChunkgrigora_kit=globalThis.webpackChunkgrigora_kit||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var r=o.O(void 0,[773],(()=>o(728)));r=o.O(r)})();
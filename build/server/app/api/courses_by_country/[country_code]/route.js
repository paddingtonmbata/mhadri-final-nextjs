"use strict";(()=>{var e={};e.id=909,e.ids=[909],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2176:(e,r,o)=>{o.r(r),o.d(r,{headerHooks:()=>_,originalPathname:()=>d,requestAsyncStorage:()=>n,routeModule:()=>u,serverHooks:()=>i,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>p});var t={};o.r(t),o.d(t,{GET:()=>GET});var a=o(884),s=o(6132);async function GET(e,{params:r}){let o=await fetch(`https://mhadri-final-database-af023718fb18.herokuapp.com/courses_by_country/${r.country_code}/`),t=await o.json();return Response.json({data:t})}let u=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/courses_by_country/[country_code]/route",pathname:"/api/courses_by_country/[country_code]",filename:"route",bundlePath:"app/api/courses_by_country/[country_code]/route"},resolvedPagePath:"C:\\Users\\User\\Desktop\\mhadri-final-nextjs\\app\\api\\courses_by_country\\[country_code]\\route.js",nextConfigOutput:"",userland:t}),{requestAsyncStorage:n,staticGenerationAsyncStorage:c,serverHooks:i,headerHooks:_,staticGenerationBailout:p}=u,d="/api/courses_by_country/[country_code]/route"}};var r=require("../../../../webpack-runtime.js");r.C(e);var __webpack_exec__=e=>r(r.s=e),o=r.X(0,[729],()=>__webpack_exec__(2176));module.exports=o})();
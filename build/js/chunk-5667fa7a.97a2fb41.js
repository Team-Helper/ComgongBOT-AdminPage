(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5667fa7a"],{"02ca":function(e,o,a){"use strict";a.r(o);var t=function(){var e=this,o=e._self._c;return o("div",[o("div",{staticClass:"d-flex h-100 justify-content-center align-items-center"},[o("b-modal",{attrs:{title:"비정상 접근!","ok-only":"ok-only","no-close-on-backdrop":"no-close-on-backdrop","hide-header-close":"hide-header-close"},on:{ok:e.handleOk},model:{value:e.modalShow,callback:function(o){e.modalShow=o},expression:"modalShow"}},[e._v("해당 페이지는 반드시 "),o("code",[e._v("id 값")]),e._v("이 필요합니다.")]),o("b-modal",{attrs:{size:"lg",title:"이메일 전송 완료!","ok-only":"ok-only","no-close-on-backdrop":"no-close-on-backdrop","hide-backdrop":"hide-backdrop"},model:{value:e.sendSuccess,callback:function(o){e.sendSuccess=o},expression:"sendSuccess"}},[e._v("입력하신 이메일 주소로 인증 관련 메일을 전송했어요! "),o("code",[e._v("(메일이 오지 않았으면 스팸함을 확인해주세요)")])]),o("b-modal",{attrs:{title:"이메일 전송 실패...","ok-only":"ok-only","no-close-on-backdrop":"no-close-on-backdrop","hide-backdrop":"hide-backdrop"},model:{value:e.sendFailed,callback:function(o){e.sendFailed=o},expression:"sendFailed"}},[e._v("빠른 수정을 위해 개발자 메일주소를 통해 알려주세요! ")]),o("b-col",{directives:[{name:"show",rawName:"v-show",value:e.key,expression:"key"}],staticClass:"mx-auto app-login-box",attrs:{md:"8"}},[o("div",{staticClass:"modal-dialog w-100 mx-auto"},[o("div",{staticClass:"modal-content"},[o("b-form",{on:{submit:e.submit}},[o("div",{staticClass:"modal-body"},[o("div",{staticClass:"h5 modal-title text-left text-blue"},[o("b-img",{attrs:{src:a("8002"),width:"42",alt:"comgongBOT"}}),o("b",[e._v("  이메일 인증")])],1),o("br"),o("b-form-group",{attrs:{id:"exampleInputGroup1","label-for":"exampleInput1",label:"학교 이메일 주소","label-class":"font-weight-bold",description:"본인의 학교 아이디를 입력해주세요."}},[o("b-input-group",{attrs:{append:"@sungkyul.ac.kr"}},[o("b-form-input",{attrs:{id:"exampleInput1",type:"text",required:"required",autofocus:"autofocus"},model:{value:e.form.email,callback:function(o){e.$set(e.form,"email",o)},expression:"form.email"}})],1)],1),o("b-form-group",{attrs:{id:"exampleInputGroup3","label-for":"exampleInput3",label:"학번","label-class":"font-weight-bold",description:"본인의 학번을 입학년도인 숫자 2자리로 입력해주세요."}},[o("b-form-input",{attrs:{id:"exampleInput3",type:"number",required:"required",min:"08",max:"22",placeholder:"ex) 22"},model:{value:e.form.studentID,callback:function(o){e.$set(e.form,"studentID",o)},expression:"form.studentID"}})],1)],1),o("div",{staticClass:"modal-footer clearfix"},[o("b-button",{attrs:{type:"submit",block:"block",variant:"blue",size:"lg"}},[e._v("제출")])],1)])],1)])])],1)])},s=[],l=a("ea7b"),n={data:function(){return{form:{email:"",studentID:""},key:!1,modalShow:!0,sendSuccess:!1,sendFailed:!1}},created:function(){var e=new URL(window.location.href).searchParams,o=e.get("variable");o&&(this.key=!0,this.modalShow=!1)},methods:{submit:function(e){var o=this;e.preventDefault();var a=Object(l["a"])(),t=this.form.email+"@sungkyul.ac.kr",s=this.form.studentID,n=new URL(window.location.href).searchParams,i=n.get("variable"),r=new URL("https://comgong-bot.web.app/#/email-link?email=?studentID=?userKey=");r.searchParams.set("email",t),r.searchParams.set("studentID",s),r.searchParams.set("userKey",i);var c=r.href;Object(l["c"])(a,t,{url:c,handleCodeInApp:!0}).then((function(){console.log("send email success!"),o.sendSuccess=!0})).catch((function(e){console.error(e),o.sendFailed=!0}))},handleOk:function(){this.$router.go(-1)}}},i=n,r=a("2877"),c=Object(r["a"])(i,t,s,!1,null,null,null);o["default"]=c.exports},8002:function(e,o,a){e.exports=a.p+"img/comgongBOT-logo.26529f60.png"}}]);
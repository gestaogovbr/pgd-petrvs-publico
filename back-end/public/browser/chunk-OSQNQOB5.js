import{a as oe}from"./chunk-UFS3OPCG.js";import{b as ae}from"./chunk-76VPKZU2.js";import{a as w,b as D}from"./chunk-RMYSPY7H.js";import{W as ne,Y as le,b as K,f as j,fa as se,h as B,o as te,s as q,v as re}from"./chunk-XHTD5OAS.js";import{b as Y,c as Z,d as $,e as ee,h as ie,s as Q}from"./chunk-KODYKPWY.js";import"./chunk-ORJB5SCJ.js";import{Bb as L,Fa as s,Fb as H,Ga as m,Ha as p,La as z,Ma as y,Na as u,Nc as P,P as O,Qd as b,Sd as A,U as E,Ua as _,V as I,Va as v,Wa as g,Xa as R,Ya as M,Z as f,Za as X,_ as h,_a as x,ba as T,fd as V,h as W,ic as J,ma as l,na as F,oc as U,sb as N,va as S,xa as c,za as n}from"./chunk-6YMI2QVU.js";var he=["plano"],_e=["usuario"];function ve(r,t){if(r&1&&p(0,"top-alert",10),r&2){let d=u();n("message",d.warning)}}var G=(()=>{let t=class t extends oe{constructor(i){super(i,b,A),this.injector=i,this.validate=(a,e)=>{let o=null;return e=="plano_trabalho_id"&&a.value?.length&&this.plano?.selectedEntity?.usuario_id!=this.form?.controls.usuario_id.value?o="Obrigat\xF3rio ser o mesmo "+this.lex.translate("usu\xE1rio")+" do "+this.lex.translate("plano de trabalho"):["data_inicio","data_fim"].indexOf(e)>=0&&!this.dao?.validDateTime(a.value)?o="Inv\xE1lido":e=="data_fim"&&this.util.asTimestamp(this.form?.controls.data_inicio.value)>this.util.asTimestamp(a.value)&&(o="Menor que in\xEDcio"),o},this.titleEdit=a=>"Editando "+this.lex.translate("ocorr\xEAncia")+": "+(a?.usuario?.nome||""),this.planoTrabalhoDao=i.get(V),this.usuarioDao=i.get(P),this.modalWidth=500,this.form=this.fh.FormBuilder({descricao:{default:""},data_inicio:{default:new Date},data_fim:{default:new Date},usuario_id:{default:""},plano_trabalho_id:{default:""}},this.cdRef,this.validate),this.join=["usuario","plano_trabalho.usuario:id,nome,apelido"]}loadData(i,a){return W(this,null,function*(){let e=Object.assign({},a.value);this.metadata?.consolidacao&&(this.consolidacao=this.metadata?.consolidacao,this.planoTrabalho=this.metadata?.plano_trabalho||this.consolidacao.plano_trabalho,i.usuario_id=this.planoTrabalho.usuario_id,i.usuario=this.planoTrabalho.usuario,i.plano_trabalho_id=this.consolidacao.plano_trabalho_id,i.plano_trabalho=this.planoTrabalho),yield Promise.all([this.usuario.loadSearch(i.usuario||i.usuario_id),this.plano.loadSearch(i.plano_trabalho||i.plano_trabalho_id)]),a.patchValue(this.util.fillForm(e,i))})}initializeData(i){this.entity=new b,this.entity.usuario_id=this.auth.usuario.id,this.loadData(this.entity,i)}saveData(i){return new Promise((a,e)=>{let o=this.util.fill(new b,this.entity);o=this.util.fillForm(o,this.form.value),a(o)})}get warning(){let i,a=this.util.asDate(this.form.controls.data_inicio.value),e=this.util.asDate(this.form.controls.data_fim.value);return this.consolidacao&&a&&e&&(this.util.daystamp(a)<this.util.daystamp(this.consolidacao.data_inicio)||this.util.daystamp(e)>this.util.daystamp(this.consolidacao.data_fim))&&(i="Aten\xE7\xE3o: Data da consolida\xE7\xE3o do plano \xE9 de "+this.util.getDateFormatted(this.consolidacao.data_inicio)+" a "+this.util.getDateFormatted(this.consolidacao.data_fim)),i}};t.\u0275fac=function(a){return new(a||t)(F(T))},t.\u0275cmp=E({type:t,selectors:[["app-ocorrencia-form"]],viewQuery:function(a,e){if(a&1&&(_(q,5),_(he,5),_(_e,5)),a&2){let o;v(o=g())&&(e.editableForm=o.first),v(o=g())&&(e.plano=o.first),v(o=g())&&(e.usuario=o.first)}},features:[S],decls:13,vars:13,consts:[["usuario",""],["plano",""],["type","warning",3,"message",4,"ngIf"],["initialFocus","usuario_id",3,"submit","cancel","form","disabled","title"],[1,"row"],["controlName","usuario_id","required","",3,"size","disabled","dao"],["controlName","plano_trabalho_id",3,"size","dao"],["label","In\xEDcio","controlName","data_inicio","required","",3,"size"],["label","Fim","controlName","data_fim","required","",3,"size"],["label","Descri\xE7\xE3o","controlName","descricao","required","",3,"size","rows"],["type","warning",3,"message"]],template:function(a,e){if(a&1){let o=z();c(0,ve,1,1,"top-alert",2),s(1,"editable-form",3),y("submit",function(){return f(o),h(e.onSaveData())})("cancel",function(){return f(o),h(e.onCancel())}),s(2,"div",4),p(3,"input-search",5,0),m(),s(5,"div",4),p(6,"input-search",6,1),m(),s(8,"div",4),p(9,"input-datetime",7)(10,"input-datetime",8),m(),s(11,"div",4),p(12,"input-textarea",9),m()()}a&2&&(n("ngIf",e.warning==null?null:e.warning.length),l(),n("form",e.form)("disabled",e.formDisabled)("title",e.isModal?"":e.title),l(2),n("size",12)("disabled",e.consolidacao||e.action!="new"?"true":void 0)("dao",e.usuarioDao),l(3),n("size",12)("dao",e.planoTrabalhoDao),l(3),n("size",6),l(),n("size",6),l(2),n("size",12)("rows",3))},dependencies:[L,q,B,te,j,le]});let r=t;return r})();function ge(r,t){r&1&&p(0,"toolbar")}function be(r,t){if(r&1&&p(0,"badge",25),r&2){let d=u().row,i=u();n("maxWidth",300)("icon",i.entityService.getIcon("PlanoTrabalho"))("label",d.plano_trabalho.unidade.sigla+" - #"+d.plano_trabalho.numero)("textValue",i.util.getDateFormatted(d.plano_trabalho.data_inicio)+" \xE0 "+i.util.getDateFormatted(d.plano_trabalho.data_fim))("hint",i.lex.translate("Plano de trabalho"))}}function Ce(r,t){if(r&1&&(s(0,"div",20)(1,"div",21),p(2,"profile-picture",22),m(),s(3,"div",23)(4,"strong"),M(5),m(),p(6,"br"),c(7,be,1,5,"badge",24),m()()),r&2){let d=t.row;l(2),n("url",d.usuario.url_foto)("size",40)("hint",d.usuario.nome),l(3),X(d.usuario.nome||""),l(2),n("ngIf",d.plano_trabalho)}}function ye(r,t){if(r&1&&(s(0,"span"),M(1),m()),r&2){let d=t.row,i=u();l(),x(" ",i.dao.getDateFormatted(d.data_inicio),"")}}function we(r,t){if(r&1&&(s(0,"span"),M(1),m()),r&2){let d=t.row,i=u();l(),x(" ",i.dao.getDateFormatted(d.data_fim),"")}}var me=(()=>{let t=class t extends ae{constructor(i){super(i,b,A),this.injector=i,this.listagemInicial=!0,this.filterWhere=a=>{let e=[],o=a.value;return o.plano_trabalho_id?.length?e.push(["plano_trabalho_id","==",o.plano_trabalho_id]):o.usuario_id?.length?e.push(["usuario_id","==",o.usuario_id]):o.descricao?.length?e.push(["descricao","like","%"+o.descricao.replace(" ","%")+"%"]):this.dao?.validDateTime(o.data_inicio)?e.push(["data_fim",">=",o.data_inicio]):this.dao?.validDateTime(o.data_fim)&&e.push(["data_inicio","<=",o.data_fim]),e},this.join=["plano_trabalho:id,numero,data_inicio,data_fim","plano_trabalho.unidade:id,nome,sigla","usuario:id,nome,url_foto"],this.planoTrabalhoDao=i.get(V),this.usuarioDao=i.get(P),this.title=this.lex.translate("Ocorr\xEAncias"),this.code="MOD_OCOR",this.filter=this.fh.FormBuilder({descricao:{default:""},data_inicio:{default:void 0},data_fim:{default:void 0},usuario_id:{default:""},plano_trabalho_id:{default:""}}),this.addOption(this.OPTION_INFORMACOES),this.addOption(this.OPTION_EXCLUIR,"MOD_OCOR_EXCL"),this.addOption(this.OPTION_LOGS,"MOD_AUDIT_LOG")}filtro(){this.listagemInicial=!1}};t.\u0275fac=function(a){return new(a||t)(F(T))},t.\u0275cmp=E({type:t,selectors:[["app-ocorrencia-list"]],viewQuery:function(a,e){if(a&1&&_(Q,5),a&2){let o;v(o=g())&&(e.grid=o.first)}},features:[S],decls:25,vars:34,consts:[["usuario",""],["planoTrabalho",""],["columnUsuario",""],["columnInicio",""],["columnFim",""],[3,"dao","add","title","orderBy","groupBy","join","hasAdd","hasEdit"],[4,"ngIf"],[3,"form","where","submit","collapseChange","collapsed","deleted"],[1,"row"],["controlName","usuario_id",3,"size","control","dao"],["controlName","plano_trabalho_id",3,"size","control","dao"],["label","Cont\xE9m a descri\xE7\xE3o","controlName","descricao",3,"size","control"],["date","","label","In\xEDcio","controlName","data_inicio",3,"click","size","control"],["date","","label","Fim","controlName","data_fim",3,"click","size","control"],[3,"title","template"],["title","In\xEDcio",3,"template"],["title","Fim",3,"template"],["title","Descri\xE7\xE3o","field","descricao"],["type","options",3,"onEdit","options"],[3,"rows"],[1,"d-flex"],[1,"ms-3"],[3,"url","size","hint"],[1,"flex-fill","ms-3"],["color","light",3,"maxWidth","icon","label","textValue","hint",4,"ngIf"],["color","light",3,"maxWidth","icon","label","textValue","hint"]],template:function(a,e){if(a&1){let o=z();s(0,"grid",5),c(1,ge,1,0,"toolbar",6),s(2,"filter",7)(3,"div",8),p(4,"input-search",9,0)(6,"input-search",10,1),m(),s(8,"div",8),p(9,"input-text",11),s(10,"input-datetime",12),y("click",function(){return f(o),h(e.filtro())}),m(),s(11,"input-datetime",13),y("click",function(){return f(o),h(e.filtro())}),m()()(),s(12,"columns")(13,"column",14),c(14,Ce,8,5,"ng-template",null,2,N),m(),s(16,"column",15),c(17,ye,2,1,"ng-template",null,3,N),m(),s(19,"column",16),c(20,we,2,1,"ng-template",null,4,N),m(),p(22,"column",17)(23,"column",18),m(),p(24,"pagination",19),m()}if(a&2){let o=R(15),C=R(18),pe=R(21);n("dao",e.dao)("add",e.add)("title",e.isModal?"":e.title)("orderBy",e.orderBy)("groupBy",e.groupBy)("join",e.join)("hasAdd",e.auth.hasPermissionTo("MOD_OCOR_INCL"))("hasEdit",e.auth.hasPermissionTo("MOD_OCOR_EDT")),l(),n("ngIf",!e.selectable),l(),n("form",e.filter)("where",e.filterWhere)("submit",e.filterSubmit.bind(e))("collapseChange",e.filterCollapseChange.bind(e))("collapsed",e.filterCollapsed)("deleted",e.auth.hasPermissionTo("MOD_AUDIT_DEL")),l(2),n("size",6)("control",e.filter.controls.usuario_id)("dao",e.usuarioDao),l(2),n("size",6)("control",e.filter.controls.plano_trabalho_id)("dao",e.planoTrabalhoDao),l(3),n("size",6)("control",e.filter.controls.descricao),l(),n("size",3)("control",e.filter.controls.data_inicio),l(),n("size",3)("control",e.filter.controls.data_fim),l(2),n("title",e.lex.translate("Usu\xE1rio"))("template",o),l(3),n("template",C),l(3),n("template",pe),l(4),n("onEdit",e.edit)("options",e.options),l(),n("rows",e.rowsLimit)}},dependencies:[L,Q,$,Z,ee,Y,ie,B,K,j,re,ne]});let r=t;return r})();var De=[{path:"",component:me,canActivate:[w],resolve:{config:D},runGuardsAndResolvers:"always",data:{title:"Ocorr\xEAncias"}},{path:"new",component:G,canActivate:[w],resolve:{config:D},runGuardsAndResolvers:"always",data:{title:"Inclus\xE3o de Ocorr\xEAncia",modal:!0}},{path:":id/edit",component:G,canActivate:[w],resolve:{config:D},runGuardsAndResolvers:"always",data:{title:"Edi\xE7\xE3o de Ocorr\xEAncia",modal:!0}},{path:":id/consult",component:G,canActivate:[w],resolve:{config:D},runGuardsAndResolvers:"always",data:{title:"Consulta a Ocorr\xEAncia",modal:!0}}],de=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=I({type:t}),t.\u0275inj=O({imports:[U.forChild(De),U]});let r=t;return r})();var pi=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=I({type:t}),t.\u0275inj=O({imports:[H,se,J,de]});let r=t;return r})();export{pi as OcorrenciaModule};
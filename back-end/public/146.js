"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[146],{2146:(Q,u,i)=>{i.r(u),i.d(u,{EixoTematicoModule:()=>V});var h=i(6610),g=i(8832),b=i(8425),f=i(1260),l=i(1620),r=i(6819),G=i(3308),p=i(1641),v=i(3203),y=i(291);class m extends y.C{constructor(c){super(),this.nome="",this.icone="",this.cor="",this.descricao="",this.initialization(c)}}var M=i(24),t=i(3279),E=i(16),D=i(158),L=i(3678),N=i(4054);let d=(()=>{class s extends M.n{constructor(n){super(n,m,v.X),this.injector=n,this.validate=(o,e)=>null,this.titleEdit=o=>"Editando "+this.lex.translate("Eixo Tem\xe1tico")+": "+(o?.nome||""),this.form=this.fh.FormBuilder({nome:{default:""},icone:{default:""},cor:{default:""},descricao:{default:""}},this.cdRef,this.validate)}loadData(n,o){let e=Object.assign({},o.value);o.patchValue(this.util.fillForm(e,n))}initializeData(n){n.patchValue(new m)}saveData(n){var o=this;return(0,G.A)(function*(){return new Promise((e,a)=>{const C=o.util.fill(new m,o.entity);e(o.util.fillForm(C,o.form.value))})})()}static#t=this.\u0275fac=function(o){return new(o||s)(t.rXU(t.zZn))};static#e=this.\u0275cmp=t.VBU({type:s,selectors:[["app-eixo-tematico-form"]],viewQuery:function(o,e){if(1&o&&t.GBs(p.Q,5),2&o){let a;t.mGM(a=t.lsd())&&(e.editableForm=a.first)}},features:[t.Vt3],decls:10,vars:12,consts:[["initialFocus","nome",3,"submit","cancel","form","disabled","title"],[1,"row"],["controlName","nome","required","",3,"size","label"],[1,"col"],["label","Descri\xe7\xe3o","controlName","descricao","required","",3,"size","rows"],["label","\xcdcone","icon","fas fa-sign-out-alt","controlName","icone","required","",3,"size","items"],["background","","label","Cor","controlName","cor","required","",3,"size"]],template:function(o,e){1&o&&(t.j41(0,"editable-form",0),t.bIt("submit",function(){return e.onSaveData()})("cancel",function(){return e.onCancel()}),t.j41(1,"div",1)(2,"div",1),t.nrm(3,"input-text",2),t.k0s(),t.j41(4,"div",1)(5,"div",3),t.nrm(6,"input-textarea",4),t.k0s(),t.j41(7,"div",3),t.nrm(8,"input-select",5)(9,"input-color",6),t.k0s()()()()),2&o&&(t.Y8G("form",e.form)("disabled",e.formDisabled)("title",e.isModal?"":e.title),t.R7$(3),t.Y8G("size",12)("label","Nome "+e.lex.translate("do eixo tem\xe1tico")),t.BMQ("maxlength",250),t.R7$(3),t.Y8G("size",8)("rows",4),t.BMQ("maxlength",250),t.R7$(2),t.Y8G("size",3)("items",e.lookup.ICONES),t.R7$(),t.Y8G("size",3))},dependencies:[p.Q,E.H,D.S,L.K,N.f]})}return s})();var T=i(5611),R=i(9062),B=i(2034),F=i(5852),z=i(7772),I=i(2305),j=i(6764),x=i(5201);function A(s,c){1&s&&t.nrm(0,"toolbar")}function O(s,c){if(1&s&&t.nrm(0,"badge",9),2&s){const n=c.row;t.Y8G("color",n.cor)("icon",n.icone)("label",n.nome)("hint",n.nome)}}const Y=[{path:"",component:(()=>{class s extends R.P{constructor(n){super(n,m,v.X),this.injector=n,this.filterWhere=o=>{let e=[],a=o.value;return a.nome?.length&&e.push(["nome","like","%"+a.nome.trim().replace(" ","%")+"%"]),e},this.title=this.lex.translate("Eixos Tem\xe1ticos"),this.orderBy=[["nome","asc"]],this.filter=this.fh.FormBuilder({nome:{default:""}}),this.auth.hasPermissionTo("MOD_EXTM")&&this.options.push({icon:"bi bi-info-circle",label:"Informa\xe7\xf5es",onClick:this.consult.bind(this)}),this.auth.hasPermissionTo("MOD_EXTM_EXCL")&&this.options.push({icon:"bi bi-trash",label:"Excluir",onClick:this.delete.bind(this)}),this.addOption(this.OPTION_LOGS,"MOD_AUDIT_LOG")}filterClear(n){n.controls.nome.setValue(""),super.filterClear(n)}static#t=this.\u0275fac=function(o){return new(o||s)(t.rXU(t.zZn))};static#e=this.\u0275cmp=t.VBU({type:s,selectors:[["app-eixo-tematico-list"]],viewQuery:function(o,e){if(1&o&&t.GBs(T._,5),2&o){let a;t.mGM(a=t.lsd())&&(e.grid=a.first)}},features:[t.Vt3],decls:11,vars:24,consts:[["columnNome",""],[3,"select","dao","add","title","hasAdd","hasEdit","selectable","orderBy"],[4,"ngIf"],[3,"deleted","form","where","submit","clear","collapseChange","collapsed"],[1,"row"],["controlName","nome",3,"size","label","control","placeholder"],["title","Nome","orderBy","nome",3,"template"],["type","options",3,"onEdit","options"],[3,"rows"],[3,"color","icon","label","hint"]],template:function(o,e){if(1&o){const a=t.RV6();t.j41(0,"grid",1),t.bIt("select",function(X){return t.eBV(a),t.Njj(e.onSelect(X))}),t.DNE(1,A,1,0,"toolbar",2),t.j41(2,"filter",3)(3,"div",4),t.nrm(4,"input-text",5),t.k0s()(),t.j41(5,"columns")(6,"column",6),t.DNE(7,O,1,4,"ng-template",null,0,t.C5r),t.k0s(),t.nrm(9,"column",7),t.k0s(),t.nrm(10,"pagination",8),t.k0s()}if(2&o){const a=t.sdS(8);t.Y8G("dao",e.dao)("add",e.add)("title",e.isModal?"":e.title)("hasAdd",e.auth.hasPermissionTo("MOD_EXTM_INCL"))("hasEdit",e.auth.hasPermissionTo("MOD_EXTM_EDT"))("selectable",e.selectable)("orderBy",e.orderBy),t.R7$(),t.Y8G("ngIf",!e.selectable),t.R7$(),t.Y8G("deleted",e.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form",e.filter)("where",e.filterWhere)("submit",e.filterSubmit.bind(e))("clear",e.filterClear.bind(e))("collapseChange",e.filterCollapseChange.bind(e))("collapsed",!e.selectable&&e.filterCollapsed),t.R7$(2),t.Y8G("size",12)("label",e.lex.translate("Eixo tem\xe1tico"))("control",e.filter.controls.nome)("placeholder","Nome "+e.lex.translate("eixo tem\xe1tico")+"..."),t.BMQ("maxlength",250),t.R7$(2),t.Y8G("template",a),t.R7$(3),t.Y8G("onEdit",e.edit)("options",e.options),t.R7$(),t.Y8G("rows",e.rowsLimit)}},dependencies:[h.bT,T._,B.T,F.I,z.i,I.H,j.e,E.H,x.n]})}return s})(),canActivate:[l.q],resolve:{config:r.L},runGuardsAndResolvers:"always",data:{title:"Eixos Tem\xe1ticos"}},{path:"new",component:d,canActivate:[l.q],resolve:{config:r.L},runGuardsAndResolvers:"always",data:{title:"Incluir Eixo Tem\xe1tico",modal:!0}},{path:":id/edit",component:d,canActivate:[l.q],resolve:{config:r.L},runGuardsAndResolvers:"always",data:{title:"Editar Eixo Tem\xe1tico",modal:!0}},{path:":id/consult",component:d,canActivate:[l.q],resolve:{config:r.L},runGuardsAndResolvers:"always",data:{title:"Consultar Eixo Tem\xe1tico",modal:!0}}];let $=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#e=this.\u0275mod=t.$C({type:s});static#o=this.\u0275inj=t.G2t({imports:[f.iI.forChild(Y),f.iI]})}return s})(),V=(()=>{class s{static#t=this.\u0275fac=function(o){return new(o||s)};static#e=this.\u0275mod=t.$C({type:s});static#o=this.\u0275inj=t.G2t({imports:[h.MD,b.h,g.X1,$]})}return s})()}}]);
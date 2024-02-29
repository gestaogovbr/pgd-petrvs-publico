"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[4105],{93164:(Q,C,s)=>{s.d(C,{O:()=>b});var c=s(64368);class b extends c.X{constructor(m){super(),this.perfil_id=null,this.tipo_capacidade_id="",this.initialization(m)}}},74105:(Q,C,s)=>{s.r(C),s.d(C,{PerfilModule:()=>N});var c=s(76733),b=s(55579),p=s(1391),m=s(2314),y=s(8239),Z=s(74040),x=s(73150),O=s(65298);class J{constructor(i){i&&Object.assign(this,i)}}var U=s(96150),P=s(93164),L=s(64368);class A extends L.X{constructor(i){super(),this.capacidades=[],this.nivel=0,this.nome="",this.descricao="",this.initialization(i)}}var f,z=s(1184),t=s(20755),j=s(39702);class E{constructor(i){this.lookup=i}ordenarTiposCapacidade(i){return i.sort((e,a)=>e.codigo.toUpperCase()<a.codigo.toUpperCase()?-1:1)}}(f=E).\u0275fac=function(i){return new(i||f)(t.LFG(j.W))},f.\u0275prov=t.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"});var g,D=s(57224),F=s(83351),R=s(88820),M=s(92392),W=s(66384),B=s(74978);function G(o,i){if(1&o&&(t.TgZ(0,"h3",9),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Oqu(e.title)}}function S(o,i){if(1&o&&(t.TgZ(0,"span",24),t._UZ(1,"i",25),t._uU(2),t.qZA()),2&o){const e=t.oxw().row;t.xp6(2),t.hij(" ",null==e.filhos?null:e.filhos.length,"")}}function Y(o,i){if(1&o&&t.YNc(0,S,3,1,"span",23),2&o){const e=i.row;t.Q6J("ngIf",null==e.filhos?null:e.filhos.length)}}function H(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"div",28)(3,"span",29)(4,"small",30),t._UZ(5,"i",31),t._uU(6),t.qZA(),t._UZ(7,"span",32),t.qZA()()(),t.TgZ(8,"td")(9,"div",33)(10,"span",34),t._uU(11),t.qZA()()(),t.TgZ(12,"td",35)(13,"div",36)(14,"span",37)(15,"input-switch",38,39),t.NdJ("change",function(){const l=t.CHM(e).$implicit,d=t.MAs(16),r=t.oxw(3);return t.KtG(r.onHabilitadoChangeFilha(l,d.value))}),t.qZA()()()()()}if(2&o){const e=i.$implicit,a=t.oxw(3);t.xp6(6),t.hij(" ",e.codigo,""),t.xp6(5),t.Oqu(e.descricao),t.xp6(4),t.Q6J("size",1)("size",2)("disabled","consult"==a.action?"true":void 0)("source",e)}}function X(o,i){if(1&o&&(t.TgZ(0,"table",26)(1,"tbody"),t.YNc(2,H,17,6,"tr",27),t.qZA()()),2&o){const e=i.row;t.xp6(2),t.Q6J("ngForOf",e.filhos)}}function V(o,i){if(1&o&&(t.TgZ(0,"span",40)(1,"strong",41),t._uU(2),t.qZA()()),2&o){const e=i.row;t.xp6(2),t.Oqu(e.codigo)}}function K(o,i){if(1&o&&(t.TgZ(0,"span",32),t._uU(1),t.qZA()),2&o){const e=i.row;t.xp6(1),t.hij(" ",e.descricao,"")}}function q(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"input-switch",42,39),t.NdJ("change",function(){const l=t.CHM(e).row,d=t.MAs(1),r=t.oxw(2);return t.KtG(r.onHabilitadoChange(l,d.value))}),t.qZA()}if(2&o){const e=i.row,a=t.oxw(2);t.Q6J("disabled","consult"==a.action?"true":void 0)("source",e)}}function $(o,i){if(1&o&&(t.TgZ(0,"tab",10)(1,"grid",11,12)(3,"columns")(4,"column",13),t.YNc(5,Y,1,1,"ng-template",null,14,t.W1O),t.YNc(7,X,3,1,"ng-template",15,16,t.W1O),t.qZA(),t.TgZ(9,"column",17),t.YNc(10,V,3,1,"ng-template",null,18,t.W1O),t.qZA(),t.TgZ(12,"column",19),t.YNc(13,K,2,1,"ng-template",null,20,t.W1O),t.qZA(),t.TgZ(15,"column",21),t.YNc(16,q,2,2,"ng-template",null,22,t.W1O),t.qZA()()()()),2&o){const e=t.MAs(6),a=t.MAs(8),n=t.MAs(11),l=t.MAs(14),d=t.MAs(17),r=t.oxw();t.Q6J("label",r.lex.translate("Capacidades")),t.xp6(1),t.Q6J("items",r.tiposCapacidades)("scrollable",!0),t.xp6(3),t.Q6J("align","center")("hint","Lista das capacidades com status m\xf3dulo")("template",e)("expandTemplate",a)("minWidth",50),t.xp6(5),t.Q6J("template",n)("minWidth",160)("maxWidth",160),t.xp6(3),t.Q6J("title",r.lex.translate("M\xf3dulo/Capacidade"))("template",l)("minWidth",600),t.xp6(3),t.Q6J("template",d)}}class T extends z.F{constructor(i){super(i,A,O.r),this.injector=i,this.tiposCapacidades=[],this.validate=(e,a)=>{let n=null;return["nome","descricao"].indexOf(a)>=0&&!e.value?.length&&(n="Obrigat\xf3rio"),n},this.titleEdit=e=>"Editando "+this.lex.translate("Perfil")+": "+(e?.nome||""),this.tipoCapacidadeDao=i.get(U.r),this.perfilService=i.get(E),this.form=this.fh.FormBuilder({nome:{default:""},capacidades:{default:[]},descricao:{default:""},nivel:{default:""},data_inicio:{default:""},data_fim:{default:""}},this.cdRef,this.validate),this.join=["capacidades.tipo_capacidade"]}loadData(i,e){var a=this;return(0,y.Z)(function*(){let n=Object.assign({},e.value);a.entity=i;var l=new J({where:[["grupo_id","==",null]],orderBy:[["codigo","asc"]],join:["filhos"]});yield a.tipoCapacidadeDao.query(l).asPromise().then(d=>{d.forEach(r=>{a.perfilService.ordenarTiposCapacidade(r.filhos),a.tiposCapacidades.push(r)})}),n=a.util.fillForm(n,i);for(let d of a.tiposCapacidades){const r=i.capacidades?.find(v=>v.tipo_capacidade?.codigo==d.codigo);d._metadata=Object.assign(d._metadata||{},{habilitado:!!r});for(let v of d.filhos){const dt=i.capacidades?.find(rt=>rt.tipo_capacidade?.codigo==v.codigo);v._metadata=Object.assign(v._metadata||{},{habilitado:!!dt})}}e.patchValue(n)})()}onHabilitadoChange(i,e){let a=this.entity.capacidades?.find(n=>n.tipo_capacidade_id==i.id);if(e)a&&"DELETE"==a._status&&(a._status=void 0),a||this.entity.capacidades.push(new P.O({tipo_capacidade_id:i.id,perfil_id:this.entity.id,_status:"ADD"}));else{a&&!a._status&&(a._status="DELETE"),a&&"ADD"==a._status&&this.entity.capacidades.splice(this.entity.capacidades.findIndex(n=>n.tipo_capacidade_id==i.id),1);for(let n of i.filhos){n._metadata=Object.assign(n._metadata||{},{habilitado:!1});let l=this.entity.capacidades?.find(d=>d.tipo_capacidade_id==n.id);l&&!l._status&&(l._status="DELETE"),l&&"ADD"==l._status&&this.entity.capacidades.splice(this.entity.capacidades.findIndex(d=>d.tipo_capacidade_id==n.id),1)}}this.refreshCapacidadesHabilitadas()}refreshCapacidadesHabilitadas(){var i=this;return(0,y.Z)(function*(){let e=Object.assign({},i.form.value);e=i.util.fillForm(e,i.entity),i.form.patchValue(e),i.cdRef.detectChanges()})()}onHabilitadoChangeFilha(i,e){let a=this.entity.capacidades?.find(l=>l.tipo_capacidade_id==i.id),n=this.tiposCapacidades.find(l=>l.id==i.grupo_id);if(e){if(!n._metadata.habilitado){n._metadata=Object.assign(n._metadata||{},{habilitado:!0});let l=this.entity.capacidades?.find(d=>d.tipo_capacidade_id==n.id);l&&"DELETE"==l._status&&(l._status=void 0),l||this.entity.capacidades.push(new P.O({tipo_capacidade_id:n.id,perfil_id:this.entity.id,_status:"ADD"}))}a&&"DELETE"==a._status&&(a._status=void 0),a||this.entity.capacidades.push(new P.O({tipo_capacidade_id:i.id,perfil_id:this.entity.id,_status:"ADD"}))}else a&&!a._status&&(a._status="DELETE"),a&&"ADD"==a._status&&this.entity.capacidades.splice(this.entity.capacidades.findIndex(l=>l.tipo_capacidade_id==i.id),1);this.refreshCapacidadesHabilitadas()}initializeData(i){i.patchValue(new A)}saveData(i){return new Promise((e,a)=>{let n=this.util.fill(new A,this.entity);n=this.util.fillForm(n,this.form.value),n.capacidades=n.capacidades.filter(l=>["ADD","DELETE"].includes(l._status||"")),e(n)})}}(g=T).\u0275fac=function(i){return new(i||g)(t.Y36(t.zs3))},g.\u0275cmp=t.Xpm({type:g,selectors:[["app-perfil-form"]],viewQuery:function(i,e){if(1&i&&(t.Gf(Z.Q,5),t.Gf(x.M,5)),2&i){let a;t.iGM(a=t.CRH())&&(e.editableForm=a.first),t.iGM(a=t.CRH())&&(e.gridPai=a.first)}},features:[t.qOj],decls:10,vars:10,consts:[["class","my-2",4,"ngIf"],["initialFocus","nome",3,"form","disabled","submit","cancel"],["display","","right",""],["key","PRINCIPAL","label","Principal"],[1,"row"],["label","Nome","controlName","nome","required","",3,"size"],["numbers","","label","N\xedvel","controlName","nivel",3,"size"],["label","Descri\xe7\xe3o","controlName","descricao","required","",3,"size"],["key","CAPACIDADES",3,"label",4,"ngIf"],[1,"my-2"],["key","CAPACIDADES",3,"label"],[3,"items","scrollable"],["gridPai",""],["type","expand","icon","bi bi-shield-lock",3,"align","hint","template","expandTemplate","minWidth"],["columnCapacidades",""],["style","justify-content: inherit;"],["columnExpandedCapacidades",""],["title","C\xf3digo","orderBy","codigo",3,"template","minWidth","maxWidth"],["columnCodCapacidade",""],[3,"title","template","minWidth"],["columnTipoCapacidade",""],["title","Habilitado",3,"template"],["columnSelecionado",""],["class","badge rounded-pill bg-light text-dark",4,"ngIf"],[1,"badge","rounded-pill","bg-light","text-dark"],[1,"bi","bi-grid"],[1,"table","table-hover"],[4,"ngFor","ngForOf"],[2,"width","220px"],[1,"text-wrap","text-center"],[1,"micro-text","fw-light"],[1,"bi","bi-key"],[1,"badge","bg-light","text-dark"],[2,"width","450px"],[1,"badge","bg-light","text-dark","text-wrap"],[2,"text-align","right"],[2,"width","60px","margin-left","40px"],[1,"text-align"],["scale","medium","path","_metadata.habilitado",1,"text-align",2,"right","10px",3,"size","disabled","source","change"],["habilitado",""],[1,"text-wrap"],[1,"grid-group-text"],["path","_metadata.habilitado",2,"width","45px","margin-right","70px",3,"disabled","source","change"]],template:function(i,e){1&i&&(t.YNc(0,G,2,1,"h3",0),t.TgZ(1,"editable-form",1),t.NdJ("submit",function(){return e.onSaveData()})("cancel",function(){return e.onCancel()}),t.TgZ(2,"tabs",2)(3,"tab",3)(4,"div",4),t._UZ(5,"input-text",5)(6,"input-text",6),t.qZA(),t.TgZ(7,"div",4),t._UZ(8,"input-text",7),t.qZA()(),t.YNc(9,$,18,15,"tab",8),t.qZA()()),2&i&&(t.Q6J("ngIf",!e.isModal),t.xp6(1),t.Q6J("form",e.form)("disabled",e.formDisabled),t.xp6(4),t.Q6J("size",10),t.uIk("maxlength",250),t.xp6(1),t.Q6J("size",2),t.uIk("maxlength",250),t.xp6(2),t.Q6J("size",12),t.uIk("maxlength",250),t.xp6(1),t.Q6J("ngIf",e.auth.hasPermissionTo("MOD_TIPO_CAP")))},dependencies:[c.sg,c.O5,x.M,D.a,F.b,Z.Q,R.a,M.m,W.n,B.i]});var _,u,k=s(78509),tt=s(57765),et=s(45512),it=s(42704);function at(o,i){if(1&o&&(t.TgZ(0,"h3",11),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Oqu(e.title)}}function ot(o,i){if(1&o&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&o){const e=i.row;t.xp6(1),t.Oqu(e.nivel)}}class w extends k.E{constructor(i){super(i,A,O.r),this.injector=i,this.options=[],this.filterWhere=e=>{let a=[],n=e.value;return n.nome?.length&&a.push(["nome","like","%"+n.nome.trim().replace(" ","%")+"%"]),a},this.title=this.lex.translate("Perfis"),this.code="MOD_CFG_PERFS",this.orderBy=[["nome","asc"]],this.filter=this.fh.FormBuilder({nome:{default:""}}),this.addOption(this.OPTION_INFORMACOES),this.addOption(this.OPTION_EXCLUIR,"MOD_PERF_EXCL"),this.addOption(this.OPTION_LOGS,"MOD_AUDIT_LOG")}}(_=w).\u0275fac=function(i){return new(i||_)(t.Y36(t.zs3))},_.\u0275cmp=t.Xpm({type:_,selectors:[["app-perfil-list"]],viewQuery:function(i,e){if(1&i&&t.Gf(x.M,5),2&i){let a;t.iGM(a=t.CRH())&&(e.grid=a.first)}},features:[t.qOj],decls:14,vars:22,consts:[["class","my-2",4,"ngIf"],[3,"dao","add","orderBy","groupBy","join","hasAdd","hasEdit"],[3,"deleted","form","where","submit","collapseChange","collapsed"],[1,"row"],["controlName","nome","placeholder","Nome...",3,"size","label","control"],["title","Nome","field","nome"],["title","Descri\xe7\xe3o","field","descricao"],["title","N\xedvel de acesso",3,"template"],["columnNivel",""],["type","options",3,"onEdit","options"],[3,"rows"],[1,"my-2"]],template:function(i,e){if(1&i&&(t.YNc(0,at,2,1,"h3",0),t.TgZ(1,"grid",1),t._UZ(2,"toolbar"),t.TgZ(3,"filter",2)(4,"div",3),t._UZ(5,"input-text",4),t.qZA()(),t.TgZ(6,"columns"),t._UZ(7,"column",5)(8,"column",6),t.TgZ(9,"column",7),t.YNc(10,ot,2,1,"ng-template",null,8,t.W1O),t.qZA(),t._UZ(12,"column",9),t.qZA(),t._UZ(13,"pagination",10),t.qZA()),2&i){const a=t.MAs(11);t.Q6J("ngIf",!e.isModal),t.xp6(1),t.Q6J("dao",e.dao)("add",e.add)("orderBy",e.orderBy)("groupBy",e.groupBy)("join",e.join)("hasAdd",e.auth.hasPermissionTo("MOD_PERF_INCL"))("hasEdit",e.auth.hasPermissionTo("MOD_PERF_EDT")),t.xp6(2),t.Q6J("deleted",e.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form",e.filter)("where",e.filterWhere)("submit",e.filterSubmit.bind(e))("collapseChange",e.filterCollapseChange.bind(e))("collapsed",e.filterCollapsed),t.xp6(2),t.Q6J("size",12)("label","Nome "+e.lex.translate("Perfil"))("control",e.filter.controls.nome),t.uIk("maxlength",250),t.xp6(4),t.Q6J("template",a),t.xp6(3),t.Q6J("onEdit",e.edit)("options",e.options),t.xp6(1),t.Q6J("rows",e.rowsLimit)}},dependencies:[c.O5,x.M,D.a,F.b,tt.z,et.n,it.Q,M.m]});const nt=[{path:"",component:w,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Perfils"}},{path:"new",component:T,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Inclus\xe3o de Perfil",modal:!0}},{path:":id/edit",component:T,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Edi\xe7\xe3o de Perfil",modal:!0}},{path:":perfil_id/capacidade",loadChildren:()=>s.e(7472).then(s.bind(s,57472)).then(o=>o.CapacidadeModule),canActivate:[p.a]},{path:":id/consult",component:T,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Consulta a Perfil",modal:!0}}];class I{}(u=I).\u0275fac=function(i){return new(i||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[b.Bz.forChild(nt),b.Bz]});var h,st=s(58568),lt=s(72133);class N{}(h=N).\u0275fac=function(i){return new(i||h)},h.\u0275mod=t.oAB({type:h}),h.\u0275inj=t.cJS({imports:[c.ez,st.K,lt.UX,I]})}}]);
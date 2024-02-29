"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[4750],{54750:(U,h,a)=>{a.r(h),a.d(h,{TipoTarefaModule:()=>M});var T=a(76733),v=a(55579),f=a(1391),p=a(2314),g=a(74040),C=a(15213),O=a(64368);class u extends O.X{constructor(t){super(),this.nome="",this.tempo_estimado=0,this.documental=!1,this.comentario=null,this.initialization(t)}}var m,Q=a(1184),e=a(20755),D=a(88820),b=a(92392),J=a(74508);class c extends Q.F{constructor(t){super(t,u,C.J),this.injector=t,this.validate=(o,i)=>{let l=null;return["nome"].indexOf(i)>=0&&!o.value?.length&&(l="Obrigat\xf3rio"),l},this.titleEdit=o=>"Editando "+this.lex.translate("Tipo de Tarefa")+": "+(o?.nome||""),this.modalWidth=800,this.form=this.fh.FormBuilder({nome:{default:""},tempo_estimado:{default:0},documental:{default:!1},comentario_predefinido:{default:""}},this.cdRef,this.validate)}loadData(t,o){let i=Object.assign({},o.value);o.patchValue(this.util.fillForm(i,t))}initializeData(t){t.patchValue(new u)}saveData(t){return new Promise((o,i)=>{const l=this.util.fill(new u,this.entity);o(this.util.fillForm(l,this.form.value))})}}(m=c).\u0275fac=function(t){return new(t||m)(e.Y36(e.zs3))},m.\u0275cmp=e.Xpm({type:m,selectors:[["tipo-tarefa-form"]],viewQuery:function(t,o){if(1&t&&e.Gf(g.Q,5),2&t){let i;e.iGM(i=e.CRH())&&(o.editableForm=i.first)}},features:[e.qOj],decls:7,vars:8,consts:[["initialFocus","nome",3,"form","disabled","title","submit","cancel"],[1,"row"],["label","Nome","icon","bi bi-upc","controlName","nome","required","",3,"size"],["label","Documental?","controlName","documental","labelInfo","",3,"size"],["label","Coment\xe1rio autom\xe1tico","controlName","comentario_predefinido",3,"size","rows"]],template:function(t,o){1&t&&(e.TgZ(0,"editable-form",0),e.NdJ("submit",function(){return o.onSaveData()})("cancel",function(){return o.onCancel()}),e.TgZ(1,"div",1)(2,"div",1),e._UZ(3,"input-text",2)(4,"input-switch",3),e.qZA(),e.TgZ(5,"div",1),e._UZ(6,"input-textarea",4),e.qZA()()()),2&t&&(e.Q6J("form",o.form)("disabled",o.formDisabled)("title",o.isModal?"":o.title),e.xp6(3),e.Q6J("size",10),e.uIk("maxlength",250),e.xp6(1),e.Q6J("size",2),e.xp6(2),e.Q6J("size",12)("rows",3))},dependencies:[g.Q,D.a,b.m,J.Q]});var d,s,y=a(73150),Z=a(78509),z=a(57224),E=a(83351),R=a(57765),B=a(45512),N=a(42704);function I(n,t){1&n&&e._UZ(0,"toolbar")}class F extends Z.E{constructor(t){super(t,u,C.J),this.injector=t,this.filterWhere=o=>{let i=[],l=o.value;return l.nome?.length&&i.push(["nome","like","%"+l.nome.trim().replace(" ","%")+"%"]),i},this.title=this.lex.translate("Tipos de Tarefa"),this.code="MOD_TRF",this.filter=this.fh.FormBuilder({nome:{default:""}}),this.auth.hasPermissionTo("MOD_TRF")&&this.options.push({icon:"bi bi-info-circle",label:"Informa\xe7\xf5es",onClick:this.consult.bind(this)}),this.auth.hasPermissionTo("MOD_TRF_EXCL")&&this.options.push({icon:"bi bi-trash",label:"Excluir",onClick:this.delete.bind(this)}),this.addOption(this.OPTION_LOGS,"MOD_AUDIT_LOG")}filterClear(t){t.controls.nome.setValue(""),super.filterClear(t)}}(d=F).\u0275fac=function(t){return new(t||d)(e.Y36(e.zs3))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-tarefa-list"]],viewQuery:function(t,o){if(1&t&&e.Gf(y.M,5),2&t){let i;e.iGM(i=e.CRH())&&(o.grid=i.first)}},features:[e.qOj],decls:10,vars:25,consts:[[3,"dao","add","title","orderBy","groupBy","join","selectable","hasAdd","hasEdit","select"],[4,"ngIf"],[3,"deleted","form","where","submit","clear","collapseChange","collapsed"],[1,"row"],["controlName","nome","placeholder","Nome ...",3,"size","label","control"],["title","Nome","field","nome","orderBy","nome"],["title","Documental?","type","select","field","documental",3,"items"],["type","options",3,"onEdit","options"],[3,"rows"]],template:function(t,o){1&t&&(e.TgZ(0,"grid",0),e.NdJ("select",function(l){return o.onSelect(l)}),e.YNc(1,I,1,0,"toolbar",1),e.TgZ(2,"filter",2)(3,"div",3),e._UZ(4,"input-text",4),e.qZA()(),e.TgZ(5,"columns"),e._UZ(6,"column",5)(7,"column",6)(8,"column",7),e.qZA(),e._UZ(9,"pagination",8),e.qZA()),2&t&&(e.Q6J("dao",o.dao)("add",o.add)("title",o.isModal?"":o.title)("orderBy",o.orderBy)("groupBy",o.groupBy)("join",o.join)("selectable",o.selectable)("hasAdd",o.auth.hasPermissionTo("MOD_TRF_INCL"))("hasEdit",o.auth.hasPermissionTo("MOD_TRF_EDT")),e.xp6(1),e.Q6J("ngIf",!o.selectable),e.xp6(1),e.Q6J("deleted",o.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form",o.filter)("where",o.filterWhere)("submit",o.filterSubmit.bind(o))("clear",o.filterClear.bind(o))("collapseChange",o.filterCollapseChange.bind(o))("collapsed",!o.selectable&&o.filterCollapsed),e.xp6(2),e.Q6J("size",12)("label",o.lex.translate("Tarefa"))("control",o.filter.controls.nome),e.uIk("maxlength",250),e.xp6(3),e.Q6J("items",o.lookup.SIMNAO),e.xp6(1),e.Q6J("onEdit",o.edit)("options",o.options),e.xp6(1),e.Q6J("rows",o.rowsLimit))},dependencies:[T.O5,y.M,z.a,E.b,R.z,B.n,N.Q,b.m]});const L=[{path:"",component:F,canActivate:[f.a],resolve:{config:p.o},runGuardsAndResolvers:"always",data:{title:"Tipos de Tarefa"}},{path:"new",component:c,canActivate:[f.a],resolve:{config:p.o},runGuardsAndResolvers:"always",data:{title:"Inclus\xe3o de Tipo de Tarefa",modal:!0}},{path:":id/edit",component:c,canActivate:[f.a],resolve:{config:p.o},runGuardsAndResolvers:"always",data:{title:"Edi\xe7\xe3o de Tipo de Tarefa",modal:!0}},{path:":id/consult",component:c,canActivate:[f.a],resolve:{config:p.o},runGuardsAndResolvers:"always",data:{title:"Consulta a Tipo de Tarefa",modal:!0}}];class A{}(s=A).\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[v.Bz.forChild(L),v.Bz]});var r,G=a(58568),j=a(72133);class M{}(r=M).\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[T.ez,G.K,j.UX,A]})}}]);
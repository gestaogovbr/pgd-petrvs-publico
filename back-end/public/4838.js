"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[4838],{44838:(N,h,i)=>{i.r(h),i.d(h,{GrupoEspecializadoModule:()=>A});var v=i(76733),T=i(58568),D=i(72133),g=i(55579),p=i(1391),m=i(2314),z=i(73150),F=i(78509),M=i(64368);class c extends M.X{constructor(t){super(),this.nome="",this.ativo=1,this.initialization(t)}}var d,E=i(51353),o=i(20755),Q=i(57224),R=i(83351),Z=i(57765),B=i(45512),J=i(42704),C=i(92392);function O(l,t){1&l&&o._UZ(0,"toolbar")}class G extends F.E{constructor(t){super(t,c,E.n),this.injector=t,this.filterWhere=e=>{let a=[],s=e.value;return s.nome?.length&&a.push(["nome","like","%"+s.nome.trim().replace(" ","%")+"%"]),a},this.title=this.lex.translate("Grupos Especializados"),this.code="MOD_RX",this.filter=this.fh.FormBuilder({nome:{default:""}}),this.auth.hasPermissionTo("MOD_RX_VIS_DPE")&&this.options.push({icon:"bi bi-info-circle",label:"Informa\xe7\xf5es",onClick:this.consult.bind(this)}),this.auth.hasPermissionTo("MOD_RX_VIS_DPE")&&this.options.push({icon:"bi bi-trash",label:"Excluir",onClick:this.delete.bind(this)})}filterClear(t){t.controls.nome.setValue(""),super.filterClear(t)}}(d=G).\u0275fac=function(t){return new(t||d)(o.Y36(o.zs3))},d.\u0275cmp=o.Xpm({type:d,selectors:[["grupo-especializado-list"]],viewQuery:function(t,e){if(1&t&&o.Gf(z.M,5),2&t){let a;o.iGM(a=o.CRH())&&(e.grid=a.first)}},features:[o.qOj],decls:9,vars:23,consts:[[3,"dao","add","title","orderBy","groupBy","join","selectable","hasAdd","hasEdit","select"],[4,"ngIf"],[3,"deleted","form","where","submit","clear","collapseChange","collapsed"],[1,"row"],["label","Nome do Centro de Treinamento","controlName","nome","placeholder","Nome/Sigla",3,"size","control"],["title","Nome/Sigla do Grupo Especializado","field","nome","orderBy","nome"],["type","options",3,"onEdit","options"],[3,"rows"]],template:function(t,e){1&t&&(o.TgZ(0,"grid",0),o.NdJ("select",function(s){return e.onSelect(s)}),o.YNc(1,O,1,0,"toolbar",1),o.TgZ(2,"filter",2)(3,"div",3),o._UZ(4,"input-text",4),o.qZA()(),o.TgZ(5,"columns"),o._UZ(6,"column",5)(7,"column",6),o.qZA(),o._UZ(8,"pagination",7),o.qZA()),2&t&&(o.Q6J("dao",e.dao)("add",e.add)("title",e.isModal?"":e.title)("orderBy",e.orderBy)("groupBy",e.groupBy)("join",e.join)("selectable",e.selectable)("hasAdd",e.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit",e.auth.hasPermissionTo("MOD_RX_VIS_DPE")),o.xp6(1),o.Q6J("ngIf",!e.selectable),o.xp6(1),o.Q6J("deleted",e.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form",e.filter)("where",e.filterWhere)("submit",e.filterSubmit.bind(e))("clear",e.filterClear.bind(e))("collapseChange",e.filterCollapseChange.bind(e))("collapsed",!e.selectable&&e.filterCollapsed),o.xp6(2),o.Q6J("size",6)("control",e.filter.controls.nome),o.uIk("maxlength",250),o.xp6(3),o.Q6J("onEdit",e.edit)("options",e.options),o.xp6(1),o.Q6J("rows",e.rowsLimit))},dependencies:[v.O5,z.M,Q.a,R.b,Z.z,B.n,J.Q,C.m]});var u,n,b=i(74040),I=i(1184),P=i(88820);class f extends I.F{constructor(t){super(t,c,E.n),this.injector=t,this.titulos=[],this.validate=(e,a)=>{let s=null;return["nome"].indexOf(a)>=0&&!e.value?.length&&(s="Obrigat\xf3rio"),s},this.titleEdit=e=>"Editando "+(e?.nome||""),this.form=this.fh.FormBuilder({nome:{default:""},ativo:{default:!0}},this.cdRef,this.validate)}loadData(t,e){let a=Object.assign({},e.value);e.patchValue(this.util.fillForm(a,t))}initializeData(t){t.patchValue(new c)}saveData(t){return new Promise((e,a)=>{const s=this.util.fill(new c,this.entity);e(this.util.fillForm(s,this.form.value))})}}(u=f).\u0275fac=function(t){return new(t||u)(o.Y36(o.zs3))},u.\u0275cmp=o.Xpm({type:u,selectors:[["grupo-especializado-form"]],viewQuery:function(t,e){if(1&t&&o.Gf(b.Q,5),2&t){let a;o.iGM(a=o.CRH())&&(e.editableForm=a.first)}},features:[o.qOj],decls:4,vars:6,consts:[["initialFocus","nome",3,"form","disabled","title","submit","cancel"],[1,"row"],["label","Nome do Grupo Especializado","controlName","nome","required","",3,"size"],["labelPosition","left","label","Ativo","controlName","ativo",3,"size"]],template:function(t,e){1&t&&(o.TgZ(0,"editable-form",0),o.NdJ("submit",function(){return e.onSaveData()})("cancel",function(){return e.onCancel()}),o.TgZ(1,"div",1),o._UZ(2,"input-text",2)(3,"input-switch",3),o.qZA()()),2&t&&(o.Q6J("form",e.form)("disabled",e.formDisabled)("title",e.isModal?"":e.title),o.xp6(2),o.Q6J("size",10),o.uIk("maxlength",250),o.xp6(1),o.Q6J("size",2))},dependencies:[b.Q,P.a,C.m]});const S=[{path:"",component:G,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Lista",modal:!1}},{path:"new",component:f,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Inclus\xe3o",modal:!0}},{path:":id/edit",component:f,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Edi\xe7\xe3o",modal:!0}},{path:":id/consult",component:f,canActivate:[p.a],resolve:{config:m.o},runGuardsAndResolvers:"always",data:{title:"Consultar",modal:!0}}];class y{}var r;(n=y).\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[g.Bz.forChild(S),g.Bz]});class A{}(r=A).\u0275fac=function(t){return new(t||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[v.ez,T.K,D.UX,y]})}}]);
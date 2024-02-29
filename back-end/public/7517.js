"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[7517],{27517:(L,p,n)=>{n.r(p),n.d(p,{AreaConhecimentoModule:()=>F});var v=n(76733),M=n(58568),T=n(72133),C=n(55579),d=n(1391),u=n(2314),g=n(73150),Q=n(64368);class h extends Q.X{constructor(t){super(),this.nome="",this.ativo=1,this.initialization(t)}}var m,z=n(78509),A=n(24997),e=n(20755),B=n(57224),R=n(83351),Z=n(57765),J=n(45512),O=n(42704),y=n(92392);function I(i,t){1&i&&e._UZ(0,"toolbar")}class b extends z.E{constructor(t){super(t,h,A.s),this.injector=t,this.filterWhere=o=>{let a=[],s=o.value;return s.nome_area?.length&&a.push(["nome","like","%"+s.nome_area.trim().replace(" ","%")+"%"]),a},this.title=this.lex.translate("\xc1reas de Conhecimento"),this.code="MOD_RX",this.orderBy=[["nome","asc"]],this.filter=this.fh.FormBuilder({nome_area:{default:""}}),this.auth.hasPermissionTo("MOD_RX_VIS_DPE")&&this.options.push({icon:"bi bi-info-circle",label:"Informa\xe7\xf5es",onClick:this.consult.bind(this)}),this.auth.hasPermissionTo("MOD_RX_VIS_DPE")&&this.options.push({icon:"bi bi-trash",label:"Excluir",onClick:this.delete.bind(this)})}filterClear(t){t.controls.nome_area.setValue(""),super.filterClear(t)}}(m=b).\u0275fac=function(t){return new(t||m)(e.Y36(e.zs3))},m.\u0275cmp=e.Xpm({type:m,selectors:[["area-conhecimento-list"]],viewQuery:function(t,o){if(1&t&&e.Gf(g.M,5),2&t){let a;e.iGM(a=e.CRH())&&(o.grid=a.first)}},features:[e.qOj],decls:9,vars:23,consts:[[3,"dao","add","title","orderBy","groupBy","join","selectable","hasAdd","hasEdit","select"],[4,"ngIf"],[3,"deleted","form","where","submit","clear","collapseChange","collapsed"],[1,"row"],["label","Nome da \xe1rea de conhecimento","controlName","nome_area","placeholder","Nome da \xe1rea de conhecimento",3,"size","control"],["title","Nome da \xe1rea","field","nome","orderBy","nome"],["type","options",3,"onEdit","options"],[3,"rows"]],template:function(t,o){1&t&&(e.TgZ(0,"grid",0),e.NdJ("select",function(s){return o.onSelect(s)}),e.YNc(1,I,1,0,"toolbar",1),e.TgZ(2,"filter",2)(3,"div",3),e._UZ(4,"input-text",4),e.qZA()(),e.TgZ(5,"columns"),e._UZ(6,"column",5)(7,"column",6),e.qZA(),e._UZ(8,"pagination",7),e.qZA()),2&t&&(e.Q6J("dao",o.dao)("add",o.add)("title",o.isModal?"":o.title)("orderBy",o.orderBy)("groupBy",o.groupBy)("join",o.join)("selectable",o.selectable)("hasAdd",o.auth.hasPermissionTo("MOD_RX_VIS_DPE"))("hasEdit",o.auth.hasPermissionTo("MOD_RX_VIS_DPE")),e.xp6(1),e.Q6J("ngIf",!o.selectable),e.xp6(1),e.Q6J("deleted",o.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form",o.filter)("where",o.filterWhere)("submit",o.filterSubmit.bind(o))("clear",o.filterClear.bind(o))("collapseChange",o.filterCollapseChange.bind(o))("collapsed",!o.selectable&&o.filterCollapsed),e.xp6(2),e.Q6J("size",12)("control",o.filter.controls.nome_area),e.uIk("maxlength",250),e.xp6(3),e.Q6J("onEdit",o.edit)("options",o.options),e.xp6(1),e.Q6J("rows",o.rowsLimit))},dependencies:[v.O5,g.M,B.a,R.b,Z.z,J.n,O.Q,y.m]});var c,l,E=n(74040),P=n(1184),N=n(88820);class f extends P.F{constructor(t){super(t,h,A.s),this.injector=t,this.validate=(o,a)=>{let s=null;return["nome_area"].indexOf(a)>=0&&!o.value?.length&&(s="Obrigat\xf3rio"),s},this.titleEdit=o=>"Editando "+(o?.nome||""),this.form=this.fh.FormBuilder({nome_area:{default:""},ativo:{default:!0}},this.cdRef,this.validate)}loadData(t,o){let a=Object.assign({},o.value);o.patchValue(this.util.fillForm(a,t))}initializeData(t){t.patchValue(new h)}saveData(t){return new Promise((o,a)=>{const s=this.util.fill(new h,this.entity);o(this.util.fillForm(s,this.form.value))})}}(c=f).\u0275fac=function(t){return new(t||c)(e.Y36(e.zs3))},c.\u0275cmp=e.Xpm({type:c,selectors:[["area-conhecimento-form"]],viewQuery:function(t,o){if(1&t&&e.Gf(E.Q,5),2&t){let a;e.iGM(a=e.CRH())&&(o.editableForm=a.first)}},features:[e.qOj],decls:4,vars:6,consts:[["initialFocus","nome_area",3,"form","disabled","title","submit","cancel"],[1,"row"],["label","Nome da \xe1rea de conhecimento","controlName","nome_area","required","",3,"size"],["labelPosition","left","label","Ativo","controlName","ativo",3,"size"]],template:function(t,o){1&t&&(e.TgZ(0,"editable-form",0),e.NdJ("submit",function(){return o.onSaveData()})("cancel",function(){return o.onCancel()}),e.TgZ(1,"div",1),e._UZ(2,"input-text",2)(3,"input-switch",3),e.qZA()()),2&t&&(e.Q6J("form",o.form)("disabled",o.formDisabled)("title",o.isModal?"":o.title),e.xp6(2),e.Q6J("size",10),e.uIk("maxlength",250),e.xp6(1),e.Q6J("size",2))},dependencies:[E.Q,N.a,y.m]});const j=[{path:"",component:b,canActivate:[d.a],resolve:{config:u.o},runGuardsAndResolvers:"always",data:{title:"Lista",modal:!1}},{path:"new",component:f,canActivate:[d.a],resolve:{config:u.o},runGuardsAndResolvers:"always",data:{title:"Inclus\xe3o",modal:!0}},{path:":id/edit",component:f,canActivate:[d.a],resolve:{config:u.o},runGuardsAndResolvers:"always",data:{title:"Edi\xe7\xe3o",modal:!0}},{path:":id/consult",component:f,canActivate:[d.a],resolve:{config:u.o},runGuardsAndResolvers:"always",data:{title:"Consultar",modal:!0}}];class D{}var r;(l=D).\u0275fac=function(t){return new(t||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[C.Bz.forChild(j),C.Bz]});class F{}(r=F).\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[v.ez,M.K,T.UX,D]})}}]);
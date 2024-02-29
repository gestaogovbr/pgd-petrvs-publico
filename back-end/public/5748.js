"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[5748],{55748:(X,p,a)=>{a.r(p),a.d(p,{EntregaModule:()=>A});var m=a(76733),C=a(72133),N=a(58568),g=a(55579),c=a(1391),f=a(2314),Z=a(8239),E=a(74040),Q=a(67465),b=a(64368);class v extends b.X{constructor(i){super(),this.nome="",this.descricao="",this.tipo_indicador="PORCENTAGEM",this.lista_qualitativos=[],this.etiquetas=[],this.checklist=[],this.unidade_id=null,this.initialization(i)}}var u,F=a(1184),T=a(81214),t=a(20755),q=a(92392),_=a(74508),L=a(64603),D=a(17819);const M=["itemQualitativo"];function J(l,i){if(1&l&&(t.TgZ(0,"div",6)(1,"div",7)(2,"label",8),t._uU(3,"\xa0"),t.qZA(),t.TgZ(4,"input-multiselect",9),t._UZ(5,"input-text",10),t.qZA()()()),2&l){const e=t.oxw();t.xp6(4),t.Q6J("addItemHandle",e.addItemHandleItemQualitativo.bind(e)),t.xp6(1),t.uIk("maxlength",250)}}class h extends F.F{constructor(i){super(i,v,Q.y),this.injector=i,this.listaQualitativos=[],this.etiquetas=[],this.checklist=[],this.validate=(e,o)=>{let n=null;return["nome","tipo_indicador","descricao"].indexOf(o)>=0&&!e.value?.length&&(n="Obrigat\xf3rio"),n},this.formValidation=e=>{let o=null;return"QUALITATIVO"==this.form?.controls.tipo_indicador.value&&!this.form?.controls.lista_qualitativos.value.length&&(o="Quando o tipo da entrega for Qualitativo, \xe9 necess\xe1ria a inclus\xe3o de ao menos um item de qualitativo!"),o},this.titleEdit=e=>"Editando "+this.lex.translate("Entrega")+": "+(e?.nome||""),this.unidadeDao=i.get(T.J),this.modalWidth=900,this.title="Inclus\xe3o de "+this.lex.translate("Entregas"),this.join=["unidade"],this.form=this.fh.FormBuilder({nome:{default:""},descricao:{default:""},tipo_indicador:{default:""},qualitativo:{default:""},lista_qualitativos:{default:[]},item_qualitativo:{default:""},unidade_id:{default:null},etiquetas:{default:[]},checklist:{default:[]},etiqueta_texto:{default:""},etiqueta_icone:{default:null},etiqueta_cor:{default:null}},this.cdRef,this.validate),this.formChecklist=this.fh.FormBuilder({id:{default:""},texto:{default:""},checked:{default:!1}},this.cdRef)}loadData(i,e){let o=Object.assign({},e.value);e.patchValue(this.util.fillForm(o,i)),this.loadListaQualitativos()}initializeData(i){i.patchValue(new v)}saveData(i){var e=this;return(0,Z.Z)(function*(){return new Promise((o,n)=>{const S=e.util.fill(new v,e.entity);o(e.util.fillForm(S,e.form.value))})})()}incluirQualitativo(i){let e=i.trim().replace(" ","%"),o=this.form.controls.lista_qualitativos.value;!o.find(n=>n==e)&&e.length&&(this.clearErros(),o.push(e),this.form.controls.lista_qualitativos.setValue(o),this.form?.controls.qualitativo.setValue(""),this.loadListaQualitativos())}excluirQualitativo(i){let e=this.form.controls.lista_qualitativos.value;e.find(o=>o==i)&&(this.form.controls.lista_qualitativos.setValue(e.filter(o=>o!=i)),this.loadListaQualitativos())}loadListaQualitativos(){this.listaQualitativos=this.form.controls.lista_qualitativos.value||[]}addItemHandleItemQualitativo(){let i;const e=this.form.controls.item_qualitativo.value,o=this.util.onlyAlphanumeric(e).toUpperCase();return e?.length&&this.util.validateLookupItem(this.form.controls.lista_qualitativos.value,o)&&(i={key:o,value:this.form.controls.item_qualitativo.value},this.form.controls.item_qualitativo.setValue("")),i}addItemHandleEtiquetas(){let i;const e=this.form.controls.etiqueta_texto.value,o=this.util.textHash(e);return e?.length&&this.util.validateLookupItem(this.form.controls.etiquetas.value,o)&&(i={key:o,value:this.form.controls.etiqueta_texto.value,color:this.form.controls.etiqueta_cor.value,icon:this.form.controls.etiqueta_icone.value},this.form.controls.etiqueta_texto.setValue(""),this.form.controls.etiqueta_icone.setValue(null),this.form.controls.etiqueta_cor.setValue(null)),i}}(u=h).\u0275fac=function(i){return new(i||u)(t.Y36(t.zs3))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-entrega-form"]],viewQuery:function(i,e){if(1&i&&(t.Gf(E.Q,5),t.Gf(M,5)),2&i){let o;t.iGM(o=t.CRH())&&(e.editableForm=o.first),t.iGM(o=t.CRH())&&(e.itemQualitativo=o.first)}},features:[t.qOj],decls:8,vars:13,consts:[["initialFocus","nome",3,"form","disabled","title","submit","cancel"],[1,"row"],["controlName","nome","required","",3,"size","label"],["controlName","descricao","required","",3,"size","rows","label"],["icon","bi bi-arrow-up-right-circle","controlName","tipo_indicador",3,"size","label","items"],["class","row col-6",4,"ngIf"],[1,"row","col-6"],[1,"col-12"],["for","itemQualitativo",1,"radio","control-label"],["label","Itens Qualitativos","controlName","lista_qualitativos",3,"addItemHandle"],["icon","far fa-edit","controlName","item_qualitativo"]],template:function(i,e){1&i&&(t.TgZ(0,"editable-form",0),t.NdJ("submit",function(){return e.onSaveData()})("cancel",function(){return e.onCancel()}),t.TgZ(1,"div",1)(2,"div",1),t._UZ(3,"input-text",2),t.qZA(),t.TgZ(4,"div",1),t._UZ(5,"input-textarea",3)(6,"input-select",4),t.YNc(7,J,6,2,"div",5),t.qZA()()()),2&i&&(t.Q6J("form",e.form)("disabled",e.formDisabled)("title",e.isModal?"":e.title),t.xp6(3),t.Q6J("size",12)("label","Nome "+e.lex.translate("entrega")),t.uIk("maxlength",1e3),t.xp6(2),t.Q6J("size",7)("rows",2)("label","Descri\xe7\xe3o "+e.lex.translate("entrega")),t.xp6(1),t.Q6J("size",5)("label",e.lex.translate("Tipo de indicador"))("items",e.lookup.TIPO_INDICADOR),t.xp6(1),t.Q6J("ngIf","QUALITATIVO"==(null==e.form?null:e.form.controls.tipo_indicador.value)||null))},dependencies:[m.O5,E.Q,q.m,_.Q,L.p,D.p]});var d,s,y=a(73150),R=a(78509),G=a(57224),B=a(83351),U=a(45512),z=a(42704),V=a(95489);function x(l,i){1&l&&t._UZ(0,"toolbar")}function j(l,i){if(1&l&&t._UZ(0,"badge",11),2&l){const e=i.$implicit;t.Q6J("label",e.value)}}function H(l,i){if(1&l&&(t.TgZ(0,"div",9),t.YNc(1,j,1,1,"badge",10),t.qZA()),2&l){const e=i.row;t.xp6(1),t.Q6J("ngForOf",e.lista_qualitativos)}}class I extends R.E{constructor(i){super(i,v,Q.y),this.injector=i,this.filterWhere=e=>{let o=[],n=e.value;return n.nome?.length&&o.push(["nome","like","%"+n.nome.trim().replace(" ","%")+"%"]),n.tipo_indicador?.length&&o.push(["tipo_indicador","==",n.tipo_indicador]),o},this.join=["unidade:id,sigla,nome"],this.title=this.lex.translate("Modelos de Entregas"),this.code="MOD_ENTRG",this.unidadeDao=i.get(T.J),this.filter=this.fh.FormBuilder({nome:{default:""},tipo_indicador:{default:null}}),this.addOption(this.OPTION_INFORMACOES),this.addOption(this.OPTION_EXCLUIR,"MOD_ENTRG_EXCL"),this.addOption(this.OPTION_LOGS,"MOD_AUDIT_LOG")}}(d=I).\u0275fac=function(i){return new(i||d)(t.Y36(t.zs3))},d.\u0275cmp=t.Xpm({type:d,selectors:[["app-entrega-list"]],viewQuery:function(i,e){if(1&i&&t.Gf(y.M,5),2&i){let o;t.iGM(o=t.CRH())&&(e.grid=o.first)}},features:[t.qOj],decls:11,vars:16,consts:[[3,"dao","add","title","orderBy","groupBy","join","selectable","hasAdd","hasEdit","select"],[4,"ngIf"],["title","Nome","field","nome","orderBy","nome"],["title","Descri\xe7\xe3o","field","descricao","orderBy","descricao"],["type","select","field","tipo_indicador",3,"title","items"],["title","N\xedveis",3,"template"],["columnQualitativos",""],["type","options",3,"onEdit","options"],[3,"rows"],[1,"one-per-line"],["color","light","icon","bi bi-check2-square",3,"label",4,"ngFor","ngForOf"],["color","light","icon","bi bi-check2-square",3,"label"]],template:function(i,e){if(1&i&&(t.TgZ(0,"grid",0),t.NdJ("select",function(n){return e.onSelect(n)}),t.YNc(1,x,1,0,"toolbar",1),t.TgZ(2,"columns"),t._UZ(3,"column",2)(4,"column",3)(5,"column",4),t.TgZ(6,"column",5),t.YNc(7,H,2,1,"ng-template",null,6,t.W1O),t.qZA(),t._UZ(9,"column",7),t.qZA(),t._UZ(10,"pagination",8),t.qZA()),2&i){const o=t.MAs(8);t.Q6J("dao",e.dao)("add",e.add)("title",e.isModal?"":e.title)("orderBy",e.orderBy)("groupBy",e.groupBy)("join",e.join)("selectable",e.selectable)("hasAdd",e.auth.hasPermissionTo("MOD_ENTRG_INCL"))("hasEdit",e.auth.hasPermissionTo("MOD_ENTRG_EDT")),t.xp6(1),t.Q6J("ngIf",!e.selectable),t.xp6(4),t.Q6J("title",e.lex.translate("Tipo do indicador"))("items",e.lookup.TIPO_INDICADOR),t.xp6(1),t.Q6J("template",o),t.xp6(3),t.Q6J("onEdit",e.edit)("options",e.options),t.xp6(1),t.Q6J("rows",e.rowsLimit)}},dependencies:[m.sg,m.O5,y.M,G.a,B.b,U.n,z.Q,V.F]});const P=[{path:"",component:I,canActivate:[c.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Entregas"}},{path:"new",component:h,canActivate:[c.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Inclus\xe3o de Entrega",modal:!0}},{path:":id/edit",component:h,canActivate:[c.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Edi\xe7\xe3o de Entrega",modal:!0}},{path:":id/consult",component:h,canActivate:[c.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Consulta a Entrega",modal:!0}}];class O{}var r;(s=O).\u0275fac=function(i){return new(i||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[g.Bz.forChild(P),g.Bz]});class A{}(r=A).\u0275fac=function(i){return new(i||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[m.ez,N.K,C.UX,O]})}}]);
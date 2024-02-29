"use strict";(self.webpackChunkpetrvs=self.webpackChunkpetrvs||[]).push([[3357],{83357:(Nt,b,n)=>{n.r(b),n.d(b,{TipoAvaliacaoModule:()=>F});var r=n(76733),Z=n(55579),d=n(1391),f=n(2314),v=n(8239),N=n(74040),O=n(20207),h=n(64368);class g extends h.X{constructor(a){super(),this.notas=[],this.tipo="QUANTITATIVO",this.nome="",this.initialization(a)}}var U=n(1184),y=n(79055),M=n(65296);class z extends h.X{constructor(a){super(),this.sequencia=0,this.nota=0,this.descricao="",this.aprova=!1,this.justifica=!1,this.pergunta="",this.icone="",this.cor="",this.codigo="",this.justificativas=[],this.tipo_avaliacao_id="",this.initialization(a)}}class D extends h.X{constructor(a){super(),this.tipo_avaliacao_nota_id="",this.tipo_justificativa_id="",this.initialization(a)}}var p,t=n(20755),T=n(73150),C=n(57224),J=n(83351),L=n(88820),j=n(92392),w=n(64603),Y=n(66848),P=n(17819),V=n(25560),I=n(95489),q=n(9224);function B(i,a){if(1&i&&(t.TgZ(0,"strong"),t._uU(1),t.qZA()),2&i){const o=a.row;t.xp6(1),t.Oqu(o.nota)}}function R(i,a){if(1&i&&t._UZ(0,"input-number",23),2&i){const o=t.oxw(2);t.Q6J("control",o.formNota.controls.nota)}}function S(i,a){if(1&i&&t._UZ(0,"input-text",23),2&i){const o=t.oxw(2);t.Q6J("control",o.formNota.controls.nota),t.uIk("maxlength",250)}}function W(i,a){if(1&i&&(t.YNc(0,R,1,1,"input-number",21),t.YNc(1,S,1,2,"input-text",21),t._UZ(2,"input-text",22)),2&i){const o=t.oxw();t.Q6J("ngIf","QUANTITATIVO"==o.form.controls.tipo.value),t.xp6(1),t.Q6J("ngIf","QUALITATIVO"==o.form.controls.tipo.value),t.xp6(1),t.Q6J("control",o.formNota.controls.codigo),t.uIk("maxlength",250)}}function G(i,a){if(1&i&&t._UZ(0,"badge",24),2&i){const o=a.row;t.Q6J("label",o.descricao)("icon",o.icone)("color",o.cor)}}function X(i,a){if(1&i&&t._UZ(0,"input-text",25)(1,"input-select",26)(2,"input-color",27),2&i){const o=t.oxw();t.Q6J("control",o.formNota.controls.descricao),t.uIk("maxlength",250),t.xp6(1),t.Q6J("size",6)("control",o.formNota.controls.icone)("items",o.lookup.ICONES),t.xp6(1),t.Q6J("size",6)("control",o.formNota.controls.cor)}}function H(i,a){1&i&&t._UZ(0,"badge",31)}function K(i,a){1&i&&t._UZ(0,"badge",32)}function $(i,a){if(1&i&&(t.TgZ(0,"strong"),t._uU(1),t.qZA(),t.TgZ(2,"div",28),t.YNc(3,H,1,0,"badge",29),t.YNc(4,K,1,0,"badge",30),t.qZA()),2&i){const o=a.row;t.xp6(1),t.Oqu(o.pergunta),t.xp6(2),t.Q6J("ngIf",o.aprova),t.xp6(1),t.Q6J("ngIf",o.justifica)}}function k(i,a){if(1&i&&(t._UZ(0,"input-text",23),t.TgZ(1,"div",1),t._UZ(2,"input-switch",33)(3,"input-switch",34),t.qZA()),2&i){const o=t.oxw();t.Q6J("control",o.formNota.controls.pergunta),t.uIk("maxlength",250),t.xp6(2),t.Q6J("size",12)("control",o.formNota.controls.aprova),t.xp6(1),t.Q6J("size",12)("control",o.formNota.controls.justifica)}}function tt(i,a){if(1&i&&t._UZ(0,"badge",36),2&i){const o=a.$implicit;t.Q6J("label",o.tipo_justificativa.nome)}}function ot(i,a){if(1&i&&(t.TgZ(0,"div",28),t.YNc(1,tt,1,1,"badge",35),t.qZA()),2&i){const o=a.row;t.xp6(1),t.Q6J("ngForOf",o.justificativas)}}const at=function(){return["cadastros","tipo-justificativa","new"]},it=function(i){return{route:i}};function et(i,a){if(1&i&&(t.TgZ(0,"input-multiselect",37),t._UZ(1,"input-select",38,39),t.qZA()),2&i){const o=t.MAs(2),e=t.oxw();t.Q6J("size",12)("canEdit",!0)("addItemControl",o)("control",e.formNota.controls.justificativas),t.xp6(1),t.Q6J("size",12)("control",e.formNota.controls.tipo_justificativa_id)("dao",e.tipoJustificativaDao)("addRoute",t.VKq(9,it,t.DdM(8,at)))}}class _ extends U.F{constructor(a){super(a,g,O.r),this.injector=a,this.justificativasLista=[],this.tipoJustificativa=new M.H,this.validate=(o,e)=>{let l=null;return["nome"].indexOf(e)>=0&&!o.value?.length&&(l="Obrigat\xf3rio"),l},this.validateNota=(o,e)=>{let l=null;return["pergunta","descricao","icone"].indexOf(e)>=0&&!o.value?.length&&(l="Obrigat\xf3rio"),l},this.titleEdit=o=>"Editando "+this.lex.translate("Tipo de Avalia\xe7\xe3o")+": "+(o?.nome||""),this.tipoJustificativaDao=a.get(y.i),this.join=["notas.justificativas.tipo_justificativa"],this.form=this.fh.FormBuilder({nome:{default:""},tipo:{default:"QUANTITATIVO"},notas:{default:[]}},this.cdRef,this.validate),this.formNota=this.fh.FormBuilder({descricao:{default:""},nota:{default:0},codigo:{default:""},aprova:{default:!1},pergunta:{default:""},justifica:{default:!1},icone:{default:""},cor:{default:""},justificativas:{default:[]},tipo_justificativa_id:{default:null}},this.cdRef,this.validateNota)}loadData(a,o){let e=Object.assign({},o.value);o.patchValue(this.util.fillForm(e,a))}initializeData(a){this.entity=new g,this.loadData(this.entity,a)}saveData(a){return new Promise((o,e)=>{let l=this.util.fill(new g,this.entity);l=this.util.fillForm(l,this.form.value),o(l)})}addNota(){var a=this;return(0,v.Z)(function*(){return new z({tipo_avaliacao_id:a.entity.id,sequencia:a.form.controls.notas.value.length+1})})()}loadNota(a,o){return(0,v.Z)(function*(){a.patchValue(o),a.controls.tipo_justificativa_id.setValue(null),a.controls.justificativas.setValue(o.justificativas?.map(e=>Object.assign({},{key:e.tipo_justificativa_id,value:e.tipo_justificativa.nome,data:e.tipo_justificativa}))||[])})()}removeNota(a){var o=this;return(0,v.Z)(function*(){return yield o.dialog.confirm("Exclui ?","Deseja realmente excluir?")})()}saveNota(a,o){var e=this;return(0,v.Z)(function*(){let l=a.controls.justificativas.value||[];return e.util.fillForm(o,a.value),o.justificativas=l.map(m=>(o.justificativas||[]).find(A=>A.tipo_justificativa_id==m.key)||new D({tipo_avaliacao_nota_id:e.entity.id,tipo_justificativa_id:m.key,tipo_justificativa:m.data})),o})()}}(p=_).\u0275fac=function(a){return new(a||p)(t.Y36(t.zs3))},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-tipo-avaliacao-form"]],viewQuery:function(a,o){if(1&a&&t.Gf(N.Q,5),2&a){let e;t.iGM(e=t.CRH())&&(o.editableForm=e.first)}},features:[t.qOj],decls:30,vars:25,consts:[["initialFocus","nome",3,"form","disabled","title","submit","cancel"],[1,"row"],["label","T\xedtulo","controlName","nome","required","",3,"size"],["label","Tipo da nota","controlName","tipo",3,"size","items"],["tipo",""],["title","Notas"],["editable","",3,"control","form","hasDelete","add","load","remove","save"],["grid",""],["title","Nota",3,"template","editTemplate"],["columnNota",""],["editNota",""],["title","Descri\xe7\xe3o/Icone/Cor",3,"template","editTemplate"],["columnDescricao",""],["editDescricao",""],[3,"title","template","editTemplate"],["columnPerguntaConfiguracoes",""],["editPerguntaConfiguracoes",""],[3,"title","width","template","editTemplate"],["columnJustificativas",""],["editJustificativas",""],["type","options"],[3,"control",4,"ngIf"],["placeholder","C\xf3digo integra\xe7\xe3o",3,"control"],[3,"control"],[3,"label","icon","color"],["placeholder","Descri\xe7\xe3o",3,"control"],["icon","fas fa-sign-out-alt",3,"size","control","items"],[3,"size","control"],[1,"one-per-line"],["color","success","icon","bi bi-check","label","Aprova","hint","Se para esta nota ser\xe1 considerado como aprovado, quando aplic\xe1vel",4,"ngIf"],["color","warning","icon","bi bi-patch-question","label","Justifica","hint","Se para esta nota ser\xe1 obrigat\xf3rio uma justificativa",4,"ngIf"],["color","success","icon","bi bi-check","label","Aprova","hint","Se para esta nota ser\xe1 considerado como aprovado, quando aplic\xe1vel"],["color","warning","icon","bi bi-patch-question","label","Justifica","hint","Se para esta nota ser\xe1 obrigat\xf3rio uma justificativa"],["scale","small","labelPosition","right","label","Aprova?","labelInfo","Se para esta nota ser\xe1 considerado como aprovado, quando aplic\xe1vel",3,"size","control"],["scale","small","labelPosition","right","label","Justifica?","labelInfo","Se para esta nota ser\xe1 obrigat\xf3rio uma justificativa",3,"size","control"],["color","light",3,"label",4,"ngFor","ngForOf"],["color","light",3,"label"],["noBox","",3,"size","canEdit","addItemControl","control"],["fullEntity","",3,"size","control","dao","addRoute"],["justificativa",""]],template:function(a,o){if(1&a&&(t.TgZ(0,"editable-form",0),t.NdJ("submit",function(){return o.onSaveData()})("cancel",function(){return o.onCancel()}),t.TgZ(1,"div",1),t._UZ(2,"input-text",2)(3,"input-select",3,4),t.qZA(),t.TgZ(5,"separator",5)(6,"grid",6,7)(8,"columns")(9,"column",8),t.YNc(10,B,2,1,"ng-template",null,9,t.W1O),t.YNc(12,W,3,4,"ng-template",null,10,t.W1O),t.qZA(),t.TgZ(14,"column",11),t.YNc(15,G,1,3,"ng-template",null,12,t.W1O),t.YNc(17,X,3,7,"ng-template",null,13,t.W1O),t.qZA(),t.TgZ(19,"column",14),t.YNc(20,$,5,3,"ng-template",null,15,t.W1O),t.YNc(22,k,4,6,"ng-template",null,16,t.W1O),t.qZA(),t.TgZ(24,"column",17),t.YNc(25,ot,2,1,"ng-template",null,18,t.W1O),t.YNc(27,et,3,11,"ng-template",null,19,t.W1O),t.qZA(),t._UZ(29,"column",20),t.qZA()()()()),2&a){const e=t.MAs(11),l=t.MAs(13),m=t.MAs(16),E=t.MAs(18),A=t.MAs(21),At=t.MAs(23),bt=t.MAs(26),Zt=t.MAs(28);t.Q6J("form",o.form)("disabled",o.formDisabled)("title",o.isModal?"":o.title),t.xp6(2),t.Q6J("size",8),t.uIk("maxlength",250),t.xp6(1),t.Q6J("size",4)("items",o.lookup.TIPO_AVALIACAO_TIPO),t.xp6(3),t.Q6J("control",o.form.controls.notas)("form",o.formNota)("hasDelete",!0)("add",o.addNota.bind(o))("load",o.loadNota.bind(o))("remove",o.removeNota.bind(o))("save",o.saveNota.bind(o)),t.xp6(3),t.Q6J("template",e)("editTemplate",l),t.xp6(5),t.Q6J("template",m)("editTemplate",E),t.xp6(5),t.Q6J("title","Pergunta motivacional\nConfigura\xe7\xf5es")("template",A)("editTemplate",At),t.xp6(5),t.Q6J("title",o.lex.translate("Tipos de justificativa"))("width",300)("template",bt)("editTemplate",Zt)}},dependencies:[r.sg,r.O5,T.M,C.a,J.b,N.Q,L.a,j.m,w.p,Y.z,P.p,V.N,I.F,q.l]});var u,s,nt=n(78509),lt=n(57765),st=n(45512),ct=n(42704);function rt(i,a){1&i&&t._UZ(0,"toolbar")}function pt(i,a){if(1&i&&t._uU(0),2&i){const o=a.row;t.hij(" ",o.nome," ")}}function ut(i,a){if(1&i&&(t.TgZ(0,"div"),t._uU(1),t.qZA()),2&i){const o=t.oxw().row,e=t.oxw();t.xp6(1),t.hij(" ",e.getNotasText(o.notas)," ")}}function mt(i,a){1&i&&t._UZ(0,"badge",19)}function dt(i,a){1&i&&t._UZ(0,"badge",20)}function ft(i,a){if(1&i&&(t.TgZ(0,"tr")(1,"td"),t._UZ(2,"badge",16),t.qZA(),t.TgZ(3,"td"),t._uU(4),t._UZ(5,"br"),t.TgZ(6,"small"),t._uU(7),t.qZA(),t._UZ(8,"br"),t.qZA(),t.TgZ(9,"td"),t.YNc(10,mt,1,0,"badge",17),t.YNc(11,dt,1,0,"badge",18),t.qZA()()),2&i){const o=a.$implicit;t.xp6(2),t.Q6J("label",o.nota)("icon",o.icon)("color",o.cor),t.xp6(2),t.hij(" ",o.descricao,""),t.xp6(3),t.Oqu(o.pergunta),t.xp6(3),t.Q6J("ngIf",o.aprova),t.xp6(1),t.Q6J("ngIf",o.justifica)}}function vt(i,a){if(1&i&&(t.TgZ(0,"table",13)(1,"thead")(2,"tr")(3,"th",14),t._uU(4,"Nota"),t.qZA(),t.TgZ(5,"th",14),t._uU(6,"Descri\xe7\xe3o"),t._UZ(7,"br"),t.TgZ(8,"small"),t._uU(9,"Pergunta motivacional"),t.qZA()(),t.TgZ(10,"th",14),t._uU(11,"Op\xe7\xf5es"),t.qZA()()(),t.TgZ(12,"tbody"),t.YNc(13,ft,12,7,"tr",15),t.qZA()()),2&i){const o=t.oxw().row,e=t.oxw();t.xp6(13),t.Q6J("ngForOf",e.notasOrdenadas(o).notas)}}function gt(i,a){if(1&i&&(t.YNc(0,ut,2,1,"div",11),t.YNc(1,vt,14,1,"ng-template",null,12,t.W1O)),2&i){const o=t.MAs(2),e=t.oxw();t.Q6J("ngIf",e.selectable)("ngIfElse",o)}}class x extends nt.E{constructor(a){super(a,g,O.r),this.injector=a,this.filterWhere=o=>{let e=[],l=o.value;return l.nome?.length&&e.push(["nome","like","%"+l.nome.trim().replace(" ","%")+"%"]),e},this.title=this.lex.translate("Tipos de Avalia\xe7\xe3o"),this.code="MOD_TIPO_AVAL",this.filter=this.fh.FormBuilder({nome:{default:""}}),this.addOption(this.OPTION_INFORMACOES),this.addOption(this.OPTION_EXCLUIR,"MOD_TIPO_AVAL_EXCL"),this.addOption(this.OPTION_LOGS,"MOD_AUDIT_LOG")}getNotasText(a){return a.map(o=>o.nota).join(", ")}notasOrdenadas(a){let o=a.notas;return o.sort((e,l)=>e.sequencia-l.sequencia),a.notas=o,a}}(u=x).\u0275fac=function(a){return new(a||u)(t.Y36(t.zs3))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-tipo-avaliacao-list"]],viewQuery:function(a,o){if(1&a&&t.Gf(T.M,5),2&a){let e;t.iGM(e=t.CRH())&&(o.grid=e.first)}},features:[t.qOj],decls:14,vars:25,consts:[[3,"dao","add","title","orderBy","groupBy","join","selectable","hasAdd","hasEdit","select"],[4,"ngIf"],[3,"deleted","form","where","submit","collapseChange","collapsed"],[1,"row"],["controlName","nome","placeholder","Nome...",3,"size","label","control"],["title","Nome",3,"template"],["columnNome",""],["title","Notas",3,"template"],["columnNotas",""],["type","options",3,"onEdit","options"],[3,"rows"],[4,"ngIf","ngIfElse"],["tabelaNotas",""],[1,"table"],["scope","col"],[4,"ngFor","ngForOf"],[3,"label","icon","color"],["icon","bi bi-hand-thumbs-up","color","success","label","Aprova",4,"ngIf"],["icon","bi bi-patch-question","color","primary","label","Justifica",4,"ngIf"],["icon","bi bi-hand-thumbs-up","color","success","label","Aprova"],["icon","bi bi-patch-question","color","primary","label","Justifica"]],template:function(a,o){if(1&a&&(t.TgZ(0,"grid",0),t.NdJ("select",function(l){return o.onSelect(l)}),t.YNc(1,rt,1,0,"toolbar",1),t.TgZ(2,"filter",2)(3,"div",3),t._UZ(4,"input-text",4),t.qZA()(),t.TgZ(5,"columns")(6,"column",5),t.YNc(7,pt,1,1,"ng-template",null,6,t.W1O),t.qZA(),t.TgZ(9,"column",7),t.YNc(10,gt,3,2,"ng-template",null,8,t.W1O),t.qZA(),t._UZ(12,"column",9),t.qZA(),t._UZ(13,"pagination",10),t.qZA()),2&a){const e=t.MAs(8),l=t.MAs(11);t.Q6J("dao",o.dao)("add",o.add)("title",o.isModal?"":o.title)("orderBy",o.orderBy)("groupBy",o.groupBy)("join",o.join)("selectable",o.selectable)("hasAdd",o.auth.hasPermissionTo("MOD_TIPO_AVAL_INCL"))("hasEdit",o.auth.hasPermissionTo("MOD_TIPO_AVAL_EDT")),t.xp6(1),t.Q6J("ngIf",!o.selectable),t.xp6(1),t.Q6J("deleted",o.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form",o.filter)("where",o.filterWhere)("submit",o.filterSubmit.bind(o))("collapseChange",o.filterCollapseChange.bind(o))("collapsed",o.filterCollapsed),t.xp6(2),t.Q6J("size",12)("label","Nome "+o.lex.translate("tipo de avalia\xe7\xe3o"))("control",o.filter.controls.nome),t.uIk("maxlength",250),t.xp6(2),t.Q6J("template",e),t.xp6(3),t.Q6J("template",l),t.xp6(3),t.Q6J("onEdit",o.edit)("options",o.options),t.xp6(1),t.Q6J("rows",o.rowsLimit)}},dependencies:[r.sg,r.O5,T.M,C.a,J.b,lt.z,st.n,ct.Q,j.m,I.F]});const _t=[{path:"",component:x,canActivate:[d.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Tipos de Avalia\xe7\xe3o"}},{path:"new",component:_,canActivate:[d.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Inclus\xe3o de Tipo de Avalia\xe7\xe3o",modal:!0}},{path:":id/edit",component:_,canActivate:[d.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Edi\xe7\xe3o de Tipo de Avalia\xe7\xe3o",modal:!0}},{path:":id/consult",component:_,canActivate:[d.a],resolve:{config:f.o},runGuardsAndResolvers:"always",data:{title:"Consulta a Tipo de Avalia\xe7\xe3o",modal:!0}}];class Q{}(s=Q).\u0275fac=function(a){return new(a||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[Z.Bz.forChild(_t),Z.Bz]});var c,ht=n(58568),Tt=n(72133);class F{}(c=F).\u0275fac=function(a){return new(a||c)},c.\u0275mod=t.oAB({type:c}),c.\u0275inj=t.cJS({imports:[r.ez,ht.K,Tt.UX,Q]})}}]);
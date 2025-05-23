(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-curriculum-curriculum-module"],{

/***/ "3GkB":
/*!**********************************************************!*\
  !*** ./src/app/models/currriculum-profissional.model.ts ***!
  \**********************************************************/
/*! exports provided: CurriculumProfissional */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumProfissional", function() { return CurriculumProfissional; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class CurriculumProfissional extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    constructor(data) {
        super();
        this.ano_ingresso = ""; //Ano de ingresso na instituição
        this.lotacao_atual = ""; //Lotação atual do servidor
        this.pgd_inserido = ""; // Esta ou não inserido no PGD da instituição e qual modalidade
        this.pgd_interesse = ""; //Tem interesse ou não no PGD da instituição e qual modalidade
        this.telefone = ""; // Telefone do chefe imediato caso tenha interesse no PGD
        this.funcoes = []; // Funções ocupadas em toda carreira como titular ou substituto
        this.unidades_lotado = []; // Unidades de lotação em toda carreira
        this.atividades_fora = []; //Atividades desempenhadas externamente que podem contribuir para intituição
        this.atividades_internas = []; //Atividades desempenhadas internamente que podem contribuir para intituição
        this.especifique_habilidades = []; //Atividades desempenhadas internamente que podem contribuir para intituição
        this.docencia_fora = []; // Já foi docente fora da instituição
        this.docencia_interna = []; // Já foi docente na instituição
        this.curso_fora = []; //Quais cursos você já fez e quais pretende fazer fora da Instituição
        this.curso_interno = []; //Quais os principais cursos que você já fez e pretende fazer na Instituição
        this.viagem_nacional = 0; //Já fez viagem nacional a trabalho
        this.viagem_internacional = 0; //Já fez viagem internacional a trabalho
        this.interesse_bnt = 0; //Você tem interesse na participação do Banco Nacional de Talentos -PRF
        this.remocao = 0; // Tem interesse em remoção
        this.curriculum_id = ""; //ID Curriculum
        this.centro_treinamento_id = ""; //ID do CT 
        this.cargo_id = ""; //ID do Cargo
        this.grupo_especializado_id = ""; //ID do Grupo Especializado
        this.initialization(data);
    }
}


/***/ }),

/***/ "7zjW":
/*!***********************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: CurriculumProfissionalFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumProfissionalFormComponent", function() { return CurriculumProfissionalFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/currriculum.model */ "Vsx9");
/* harmony import */ var src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/funcao-dao.service */ "oaRx");
/* harmony import */ var src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/centro-treinamento-dao.service */ "cok8");
/* harmony import */ var src_app_dao_grupo_epecializado_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/grupo-epecializado-dao.service */ "1BoH");
/* harmony import */ var src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/dao/unidade-dao.service */ "Ufbc");
/* harmony import */ var src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/models/currriculum-profissional.model */ "3GkB");
/* harmony import */ var src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/dao/curriculum-profissional-dao.service */ "CAi7");
/* harmony import */ var src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/dao/usuario-dao.service */ "w5Sy");
/* harmony import */ var src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/dao/unidade-integrante-dao.service */ "Tlc2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ "suJ1");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ "8OLq");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../components/input/input-radio/input-radio.component */ "q/rX");























const _c0 = ["radioDocenciaFora"];
const _c1 = ["radioDocenciaPRF"];
const _c2 = ["radioCursos"];
const _c3 = ["radioCursosFora"];
const _c4 = ["radioInteresseBNT"];
const _c5 = ["radioPG"];
const _c6 = ["radioInteressePG"];
const _c7 = ["radioInteresseRemove"];
const _c8 = ["radioViajaN"];
const _c9 = ["radioViajaI"];
const _c10 = ["escolhaRadioPG"];
const _c11 = ["escolhaInteressePG"];
function CurriculumProfissionalFormComponent_input_radio_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-radio", 79, 80);
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("items", ctx_r11.lookup.PG_PRF);
} }
function CurriculumProfissionalFormComponent_input_radio_89_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-radio", 81, 82);
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("items", ctx_r13.lookup.PG_PRF);
} }
function CurriculumProfissionalFormComponent_input_text_90_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "input-text", 83);
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx_r14.form.controls.telefone)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
} }
class CurriculumProfissionalFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_currriculum_profissional_model__WEBPACK_IMPORTED_MODULE_7__["CurriculumProfissional"], src_app_dao_curriculum_profissional_dao_service__WEBPACK_IMPORTED_MODULE_8__["CurriculumProfissionalDaoService"]);
        this.injector = injector;
        this.testeLookup = [{ 'key': 'key 1', 'value': 'value 1' }];
        this.anos = [];
        this.ct = [];
        this.cargo = [];
        this.funcao = [];
        this.grupo = [];
        this.unidade = [];
        this.usuarioUnidade = [];
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.userDao = injector.get(src_app_dao_usuario_dao_service__WEBPACK_IMPORTED_MODULE_9__["UsuarioDaoService"]);
        this.lotacaoDao = injector.get(src_app_dao_unidade_integrante_dao_service__WEBPACK_IMPORTED_MODULE_10__["UnidadeIntegranteDaoService"]);
        this.ctDao = injector.get(src_app_dao_centro_treinamento_dao_service__WEBPACK_IMPORTED_MODULE_4__["CentroTreinamentoDaoService"]);
        this.funcaoDao = injector.get(src_app_dao_funcao_dao_service__WEBPACK_IMPORTED_MODULE_3__["FuncaoDaoService"]);
        this.grupoDao = injector.get(src_app_dao_grupo_epecializado_dao_service__WEBPACK_IMPORTED_MODULE_5__["GrupoEspecializadoDaoService"]);
        this.unidadeDao = injector.get(src_app_dao_unidade_dao_service__WEBPACK_IMPORTED_MODULE_6__["UnidadeDaoService"]);
        this.form = this.fh.FormBuilder({
            radioDocenciaFora: { default: false },
            radioDocenciaPRF: { default: false },
            radioCursos: { default: false },
            radioPretendoCursos: { default: false },
            radioCursosFora: { default: false },
            radioPretendoCursosFora: { default: false },
            radioPG: { default: false },
            radioInteressePG: { default: false },
            radioInteresseBNT: { default: false },
            radioInteresseRemove: { default: false },
            radioViajaN: { default: false },
            radioViajaI: { default: false },
            ano_ingresso: { default: false },
            centro_treinamento: { default: false },
            cargo: { default: false },
            funcoes: { default: [] },
            lotacoes: { default: [] },
            funcoesOcupadas: { default: "" },
            selectLotacao: { default: "" },
            lotacaoAtual: { default: "" },
            grupo: { default: "" },
            telefone: { default: "" },
            escolhaInteressePG: { default: "" },
            escolhaRadioPG: { default: "" },
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        for (let i = 1980; i <= (new Date()).getFullYear(); i++) {
            this.anos.push(Object.assign({}, { key: i, value: (i.toString()) }));
        }
        const userUnidade = this.auth.unidade;
        console.log(userUnidade);
        /*   this.lotacaoDao?.query({ where: [['usuario_id', '==', userID],['principal', '==', 1 ]]}).getAll().then((user) => {
               const unidadeID=user[0].unidade_id;
               this.unidadeDao?.query({ where: [['id', '==', unidadeID]]}).getAll().then((unidade) => {
                   console.log('UNIDADES',unidade[0].sigla,unidade[0].nome)
                     //this.usuarioUnidade = user.map(x => Object.assign({}, { key: x.id, value: x.unidade_id }) as LookupItem);
                     //this.cdRef.detectChanges();
               });
           });*/
    }
    loadData(entity, form) {
        //throw new Error('Method not implemented.');
    }
    initializeData(form) {
        //throw new Error('Method not implemented.');
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            // this.entity!.usuario_id=this.auth.usuario!.id;
            let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_2__["Curriculum"](), this.entity);
            //curriculum.usuario_id=this.auth.usuario?.id;
            curriculum = this.util.fillForm(curriculum, this.form.value);
            curriculum.usuario_id = (_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id;
            ((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.idiomasM.value).forEach(element => curriculum.idiomas.push(element.data));
            resolve(curriculum);
            //resolve(this.util.fillForm(curriculum, this.form!.value));
        });
    }
    ;
    onChangeEscolhePG() {
        var _a;
        (_a = this.escolhaRadioPG) === null || _a === void 0 ? void 0 : _a.setValue("");
    }
    onChangeEscolheInteressePG() {
        var _a;
        (_a = this.escolhaInteressePG) === null || _a === void 0 ? void 0 : _a.setValue("");
    }
    addItemFuncao() {
        return;
    }
    onAddClick() { }
}
CurriculumProfissionalFormComponent.ɵfac = function CurriculumProfissionalFormComponent_Factory(t) { return new (t || CurriculumProfissionalFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["Injector"])); };
CurriculumProfissionalFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: CurriculumProfissionalFormComponent, selectors: [["curriculum-profissional-form"]], viewQuery: function CurriculumProfissionalFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c3, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c4, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c5, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c7, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c8, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c9, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c10, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c11, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioDocenciaFora = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioDocenciaPRF = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioCursos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioCursosFora = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioInteresseBNT = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioPG = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioInteressePG = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioInteresseRemove = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioViajaN = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.radioViajaI = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.escolhaRadioPG = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.escolhaInteressePG = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]], decls: 96, vars: 130, consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["display", "", "left", ""], ["key", "FUNCIONAIS", "label", "Funcionais", 1, "fw-bold"], [1, "row", "mb-2", "mt-4"], ["label", "Ingresso na Institui\u00E7\u00E3o", "icon", "bi bi-calendar-check-fill", "controlName", "ano_ingresso", 3, "size", "control", "items"], ["label", "Centro de Treinamento", "icon", "bi bi-building-fill", "controlName", "centro_treinamento", 3, "size", "control", "dao"], ["label", "Cargo", "icon", "bi bi-person-badge", "controlName", "cargo", 3, "size", "control", "items"], [1, "row"], ["title", "Hist\u00F3rico de Lota\u00E7\u00F5es e Fun\u00E7\u00F5es Gratificadas", 1, "mb-3", "mt-3", 3, "bold"], ["controlName", "funcoes", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Fun\u00E7\u00F5es ocupadas como titular ou substituto", "icon", "bi bi-check-circle-fill", "controlName", "funcoesOcupadas", "liveSearch", "", 3, "size", "control", "dao"], ["label", "Voc\u00EA faz parte de algum grupo especializado?", "icon", "bi bi-check-circle", "controlName", "grupo", "id", "testeID", "liveSearch", "", 3, "size", "control", "dao"], [1, "row", "my-3"], ["controlName", "lotacoes", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Selecione todas as unidades em que j\u00E1 foi lotado", "icon", "bi bi-check-circle-fill", "controlName", "selectLotacao", "liveSearch", "", 3, "size", "control", "dao"], ["label", "Lota\u00E7\u00E3o atual", "icon", "bi bi-check-circle", "controlName", "lotacaoAtual", "liveSearch", "", 3, "size", "control", "dao"], ["key", "HARD_SKILLS", "label", "Hard Skills", 1, "fw-bold"], [1, "row", "mb-2", "mt-3"], ["title", "Desempenhou atividades fora e que podem contribuir para a institui\u00E7\u00E3o? Informe a \u00E1rea:", 1, "mb-3", 3, "bold"], ["controlName", "atividades_fora", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Area", "icon", "bi bi-box-arrow-in-down", "controlName", "selecAtividadeFora", "liveSearch", "", 3, "size", "control", "items"], ["title", "Quais atividades voc\u00EA desempenhou internamente que podem contribuir para a institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["label", "", "controlName", "atividadeDesempenhou", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "\u00C1rea", "controlName", "areaatividadeDesempenhou", "icon", "fas fa-layer-group", 3, "size", "control"], ["area", ""], ["label", "Atividade", "icon", "bi bi-arrows-angle-contract", "controlName", "selectAtividade", "liveSearch", "", 3, "size", "control", "items"], ["title", "Informe as suas habilidades", 1, "mb-3", 3, "bold"], ["controlName", "especifique_habilidades", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Especifique", "icon", "bi bi-list-stars", "controlName", "inputEspecifique", "liveSearch", "", 3, "size", "control"], ["key", "DOCENCIA", "label", "Doc\u00EAncia", 1, "fw-bold", "mb-3"], ["title", "Voc\u00EA j\u00E1 realizou algum trabalho de doc\u00EAncia fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaFora", 3, "size", "label", "control"], ["radioDocenciaFora", ""], ["label", "", "controlName", "docenciaFora", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "Qual/Quais", "icon", "bi bi-mortarboard-fill", "controlName", "docenciaFora", "liveSearch", "", 3, "size", "control"], ["title", "Voc\u00EA \u00E9 docente ou instrutor da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-chalkboard", "controlName", "radioDocenciaPRF", 3, "size", "label", "control"], ["radioDocenciaPRF", ""], ["label", "Em qual/quais disciplinas?", "icon", "bi bi-mortarboard-fill", "controlName", "docenciaPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["icon", "bi bi-mortarboard-fill", "controlName", "selectDocenciaPRF", "liveSearch", "", 3, "size", "control", "items"], ["key", "CURSOS", "label", "Cursos", 1, "fw-bold", "mb-3"], ["title", "Quais os principais cursos que voc\u00EA j\u00E1 fez e pretende fazer na Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-user-graduate", "controlName", "radioCursos", 3, "size", "label", "control"], ["radioCursos", ""], ["label", "", "controlName", "cursosPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "\u00C1rea", "controlName", "areaCursoPRF", 3, "size", "control"], ["label", "Curso", "icon", "bi bi-mortarboard-fill", "controlName", "selectCursosPRF", "liveSearch", "", 3, "size", "control", "items"], [1, "row", "mb-3"], ["title", "Quais cursos voc\u00EA j\u00E1 fez e quais pretende fazer fora da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "fas fa-user-graduate", "controlName", "radioCursosFora", 3, "size", "label", "control"], ["radioCursosFora", ""], ["label", "", "controlName", "cursosForaPRF", "noBox", "", 3, "hidden", "size", "control", "addItemHandle"], ["label", "Institui\u00E7\u00E3o/Coorpora\u00E7\u00E3o", "controlName", "instituicao", 3, "size", "control"], ["label", "Curso", "icon", "bi bi-mortarboard-fill", "controlName", "selectCursosForaPRF", "liveSearch", "", 3, "size", "control", "items"], ["key", "DISPONIBILIDADE", "label", "Disponibilidade", 1, "fw-bold", "mb-3"], ["title", "Viagens", 1, "mb-3", "mt-3", 3, "bold"], [1, "col-lg-6"], [1, "bi", "bi-flag-fill"], ["labelPosition", "right", "controlName", "radioViajaN", 3, "size", "label", "control"], ["radioViajaN", ""], [1, "bi", "bi-globe-americas"], ["labelPosition", "right", "controlName", "radioViajaI", 3, "size", "label", "control"], ["radioViajaI", ""], ["title", "Voc\u00EA tem interesse na participa\u00E7\u00E3o do Banco Nacional de Talentos (BNT IN PRF N\u00BA 58 de 27 de agosto de 2021) SEI 35010079?", 1, "my-3", 3, "bold"], ["icon", "bi bi-universal-access", "controlName", "radioInteresseBNT", 3, "size", "label", "control"], ["radioInteresseBNT", ""], ["title", "Voc\u00EA est\u00E1 inserido no programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-calendar2-check", "controlName", "radioPG", 3, "size", "label", "control", "change"], ["radioPG", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaRadioPG", 3, "size", "items", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em participar do programa de gest\u00E3o da Institui\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-bookmark-check", "controlName", "radioInteressePG", 3, "size", "label", "control", "change"], ["radioInteressePG", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaInteressePG", 3, "size", "items", 4, "ngIf"], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat", 4, "ngIf"], ["title", "Voc\u00EA tem interesse em remo\u00E7\u00E3o?", 1, "my-3", 3, "bold"], ["icon", "bi bi-house-door-fill", "controlName", "radioInteresseRemove", 3, "size", "label", "control"], ["radioInteresseRemove", ""], [1, "mb-5"], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaRadioPG", 3, "size", "items"], ["escolhaRadioPG", ""], ["label", "Op\u00E7\u00F5es", "controlName", "escolhaInteressePG", 3, "size", "items"], ["escolhaInteressePG", ""], ["label", "Telefone de contato do Chefe Imediato", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"]], template: function CurriculumProfissionalFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function CurriculumProfissionalFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function CurriculumProfissionalFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "tabs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "input-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "input-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "separator", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "input-multiselect", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "input-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "input-select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "input-multiselect", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](14, "input-select", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](15, "input-select", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "tab", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](18, "separator", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "input-multiselect", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](20, "input-select", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](21, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](22, "separator", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "input-multiselect", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](24, "input-search", 23, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](26, "input-select", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](27, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](28, "separator", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "input-multiselect", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](30, "input-text", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](31, "tab", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](33, "separator", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](34, "input-switch", 31, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](36, "input-multiselect", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](37, "input-text", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](38, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](39, "separator", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](40, "input-switch", 36, 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "input-multiselect", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](43, "input-select", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](44, "tab", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](45, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](46, "separator", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](47, "input-switch", 42, 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](49, "input-multiselect", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](50, "input-search", 45, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](52, "input-select", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](53, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](54, "separator", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](55, "input-switch", 49, 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](57, "input-multiselect", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](58, "input-search", 52, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](60, "input-select", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](61, "tab", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](62, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](63, "separator", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](64, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](65, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](66, "i", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](67, " J\u00E1 fez viagem nacional a trabalho?");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](68, "input-switch", 58, 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](70, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](71, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](72, "i", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](73, " J\u00E1 fez viagem internacional a trabalho?");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](74, "input-switch", 61, 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](76, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](77, "separator", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](78, "input-switch", 64, 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](80, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](81, "separator", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](82, "input-switch", 67, 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_82_listener() { return ctx.onChangeEscolhePG(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](84, CurriculumProfissionalFormComponent_input_radio_84_Template, 2, 2, "input-radio", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](85, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](86, "separator", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](87, "input-switch", 71, 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function CurriculumProfissionalFormComponent_Template_input_switch_change_87_listener() { return ctx.onChangeEscolheInteressePG(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](89, CurriculumProfissionalFormComponent_input_radio_89_Template, 2, 2, "input-radio", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](90, CurriculumProfissionalFormComponent_input_text_90_Template, 1, 3, "input-text", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](91, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](92, "separator", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](93, "input-switch", 76, 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](95, "separator", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](35);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](41);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](48);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](56);
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](69);
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](75);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](79);
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](83);
        const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](88);
        const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](94);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.ano_ingresso)("items", ctx.anos);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.centro_treinamento)("dao", ctx.ctDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cargo)("items", ctx.lookup.CARGOS_PRF);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.funcoes)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.funcoesOcupadas)("dao", ctx.funcaoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.grupo)("dao", ctx.grupoDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotaces)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.selectLotacao)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 6)("control", ctx.form.controls.lotacaoAtual)("dao", ctx.unidadeDao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.atividades_fora)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.selecAtividadeFora)("items", ctx.testeLookup);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.atividadeDesempenhou)("addItemHandle", ctx.addItemFuncao.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.areaatividadeDesempenhou);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectAtividade)("items", ctx.testeLookup);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 10)("control", ctx.form.controls.especifique_habilidades)("addItemHandle", ctx.addItemFuncao.bind(ctx))("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 12)("control", ctx.form.controls.inputEspecifique);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("label", _r1.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaFora);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("hidden", !ctx.form.controls.radioDocenciaFora.value)("size", 8)("control", ctx.form.controls.docenciaFora)("addItemHandle", ctx.addItemFuncao.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.docenciaFora);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("label", _r2.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioDocenciaPRF);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("hidden", !ctx.form.controls.radioDocenciaPRF.value)("size", 8)("control", ctx.form.controls.docenciaFora)("addItemHandle", ctx.addItemFuncao.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectDocenciaPRF)("items", ctx.testeLookup);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("label", _r3.value ? "Pretendo" : "N\u00E3o Pretendo")("control", ctx.form.controls.radioCursos);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("hidden", !ctx.form.controls.radioCursos.value)("size", 8)("control", ctx.form.controls.cursosPRF)("addItemHandle", ctx.addItemFuncao.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.areaCursoPRF);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectCursosPRF)("items", ctx.testeLookup);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("label", _r5.value ? "Pretendo" : "N\u00E3o Pretendo")("control", ctx.form.controls.radioCursosFora);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("hidden", !ctx.form.controls.radioCursosFora.value)("size", 8)("control", ctx.form.controls.cursosForaPRF)("addItemHandle", ctx.addItemFuncao.bind(ctx));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.instituicao);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 8)("control", ctx.form.controls.selectCursosForaPRF)("items", ctx.testeLookup);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("label", _r7.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioViajaN);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 2)("label", _r8.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioViajaI);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 1)("label", _r9.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseBNT);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 1)("label", _r10.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioPG);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.form.controls.radioPG.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 1)("label", _r12.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteressePG);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteressePG.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.form.controls.radioInteressePG.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("size", 1)("label", _r15.value ? "Sim" : "N\u00E3o")("control", ctx.form.controls.radioInteresseRemove);
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_12__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__["TabComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_14__["InputSelectComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_15__["SeparatorComponent"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__["InputMultiselectComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__["InputSearchComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_18__["InputTextComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_19__["InputSwitchComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_20__["NgIf"], _components_input_input_radio_input_radio_component__WEBPACK_IMPORTED_MODULE_21__["InputRadioComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXJyaWN1bHVtLXByb2Zpc3Npb25hbC1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "8oFY":
/*!*********************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum.module.ts ***!
  \*********************************************************/
/*! exports provided: CurriculumModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumModule", function() { return CurriculumModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curriculum-routing.module */ "tt/2");
/* harmony import */ var _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./curriculum-form/curriculum-form.component */ "YtwN");
/* harmony import */ var _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ "7zjW");
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ "knmu");
/* harmony import */ var _cadastros_curriculum_curriculum_list_curriculum_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../cadastros/curriculum/curriculum-list/curriculum-list.component */ "xCjx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class CurriculumModule {
}
CurriculumModule.ɵfac = function CurriculumModule_Factory(t) { return new (t || CurriculumModule)(); };
CurriculumModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: CurriculumModule });
CurriculumModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_3__["CurriculumRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](CurriculumModule, { declarations: [_cadastros_curriculum_curriculum_list_curriculum_list_component__WEBPACK_IMPORTED_MODULE_7__["CurriculumListComponent"],
        _curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_4__["CurriculumFormComponent"],
        _curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_5__["CurriculumProfissionalFormComponent"],
        _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_6__["CurriculumAtributosbig5FormComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        src_app_components_components_module__WEBPACK_IMPORTED_MODULE_1__["ComponentsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _curriculum_routing_module__WEBPACK_IMPORTED_MODULE_3__["CurriculumRoutingModule"]] }); })();


/***/ }),

/***/ "CAi7":
/*!************************************************************!*\
  !*** ./src/app/dao/curriculum-profissional-dao.service.ts ***!
  \************************************************************/
/*! exports provided: CurriculumProfissionalDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumProfissionalDaoService", function() { return CurriculumProfissionalDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CurriculumProfissionalDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("CurriculumProfissional", injector);
        this.injector = injector;
        this.searchFields = ["ano_ingresso", "lotacao_atual", "pgd_inserido", "pgd_interesse", "funcoes", "unidades_lotado", "atividades_fora", "atividades_internas",
            "especifique_habilidades", "docencia_fora", "docencia_interna", "curso_fora", "curso_interno", "viagem_nacional", "viagem_internacional", "interesse_bnt", "remocao"];
    }
}
CurriculumProfissionalDaoService.ɵfac = function CurriculumProfissionalDaoService_Factory(t) { return new (t || CurriculumProfissionalDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
CurriculumProfissionalDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CurriculumProfissionalDaoService, factory: CurriculumProfissionalDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "TuCU":
/*!***********************************************!*\
  !*** ./src/app/dao/curriculum-dao.service.ts ***!
  \***********************************************/
/*! exports provided: CurriculumDaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumDaoService", function() { return CurriculumDaoService; });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ "WScx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CurriculumDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__["DaoBaseService"] {
    constructor(injector) {
        super("Curriculum", injector);
        this.injector = injector;
        this.searchFields = ["apresentacao", "telefone", "idiomas", "estado_civil", "quantidade_filhos"];
    }
}
CurriculumDaoService.ɵfac = function CurriculumDaoService_Factory(t) { return new (t || CurriculumDaoService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"])); };
CurriculumDaoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CurriculumDaoService, factory: CurriculumDaoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Vsx9":
/*!*********************************************!*\
  !*** ./src/app/models/currriculum.model.ts ***!
  \*********************************************/
/*! exports provided: Curriculum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Curriculum", function() { return Curriculum; });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ "rBj3");

class Curriculum extends _base_model__WEBPACK_IMPORTED_MODULE_0__["Base"] {
    // public curriculum_id? : string= ""; 
    constructor(data) {
        super();
        this.apresentacao = ""; //Apresentação do servidor
        this.telefone = ""; // Telefone do servidor
        this.idiomas = []; // Idiomas falado pelo servidor
        this.estado_civil = ""; //
        this.quantidade_filhos = 0;
        this.ativo = 1; //Curriculum ativo ou não
        this.usuario_id = ""; //ID do usuario 
        this.cidade_id = ""; //ID da cidade
        this.initialization(data);
    }
}


/***/ }),

/***/ "YtwN":
/*!*********************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-form/curriculum-form.component.ts ***!
  \*********************************************************************************/
/*! exports provided: CurriculumFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumFormComponent", function() { return CurriculumFormComponent; });
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/editable-form/editable-form.component */ "RKEd");
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ "793T");
/* harmony import */ var src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/cidade-dao.service */ "lbnZ");
/* harmony import */ var src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/dao/area-conhecimento-dao.service */ "D4Q4");
/* harmony import */ var src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/curso-dao.service */ "jswM");
/* harmony import */ var src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/dao/curriculum-dao.service */ "TuCU");
/* harmony import */ var src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/currriculum.model */ "Vsx9");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/input/input-textarea/input-textarea.component */ "S/J2");
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/separator/separator.component */ "FVj5");
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ "txHH");
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ "lYxd");
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ "puzm");
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ "imFN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/input/input-multiselect/input-multiselect.component */ "oldG");
/* harmony import */ var _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../components/input/input-search/input-search.component */ "8OLq");



















const _c0 = ["areaPos"];
const _c1 = ["estados"];
const _c2 = ["curso"];
function CurriculumFormComponent_input_multiselect_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "input-multiselect", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "input-select", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "input-select", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "input-select", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "input-select", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 10)("control", ctx_r1.form.controls.idiomasM)("addItemHandle", ctx_r1.addItemIdioma.bind(ctx_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idioma)("items", ctx_r1.lookup.IDIOMAS);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idiomaFala)("items", ctx_r1.lookup.NIVEL_IDIOMA);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idiomaEscrita)("items", ctx_r1.lookup.NIVEL_IDIOMA);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 3)("control", ctx_r1.form.controls.idiomaEntendimento)("items", ctx_r1.lookup.NIVEL_IDIOMA);
} }
const _c3 = function () { return ["raiox", "cadastros", "gerais", "curso", "new"]; };
const _c4 = function (a0) { return { route: a0 }; };
class CurriculumFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_1__["PageFormBase"] {
    constructor(injector) {
        super(injector, src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__["Curriculum"], src_app_dao_curriculum_dao_service__WEBPACK_IMPORTED_MODULE_5__["CurriculumDaoService"]);
        this.injector = injector;
        this.municipios = [];
        //public areasGraduacao: LookupItem[] = [];
        this.cursos = [];
        this.cursosPos = [];
        this.cursosGradPos = [];
        // public grad : LookupItem[] = [];
        this.opcoesEscolha = [{ 'key': 1, 'value': 'Pretendo Fazer' }, { 'key': 0, 'value': 'Finalizado' }];
        this.cursoWhere = [["id", "==", null]];
        this.show = false;
        this.validate = (control, controlName) => {
            let result = null;
            /*if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
              result = "Obrigatório";
            }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
              result = "Valor não pode ser zero.";
            }*/
            return result;
        };
        //super(injector,Curso, CursoDaoService)
        this.cidadeDao = injector.get(src_app_dao_cidade_dao_service__WEBPACK_IMPORTED_MODULE_2__["CidadeDaoService"]);
        this.areaDao = injector.get(src_app_dao_area_conhecimento_dao_service__WEBPACK_IMPORTED_MODULE_3__["AreaConhecimentoDaoService"]);
        this.cursoDao = injector.get(src_app_dao_curso_dao_service__WEBPACK_IMPORTED_MODULE_4__["CursoDaoService"]);
        this.join = ['graduacoes'];
        this.form = this.fh.FormBuilder({
            id: { default: "" },
            usuario_id: { default: "" },
            cidade_id: { default: "" },
            apresentacao: { default: "" },
            estados: { default: "" },
            telefone: { default: "" },
            estado_civil: { default: "" },
            filhos: { default: false },
            quantidade_filhos: { default: 0 },
            radioFalaIdioma: { default: false },
            idioma: { default: "" },
            idiomaFala: { default: "" },
            idiomaEscrita: { default: "" },
            idiomaEntendimento: { default: "" },
            idiomasM: { default: [] },
            idiomas: { default: [] },
            ativo: { default: true },
        }, this.cdRef, this.validate);
        this.formGraduacao = this.fh.FormBuilder({
            curriculum_id: { default: "" },
            curso_id: { default: "" },
            area: { default: "" },
            curso: { default: "" },
            graduacao: { default: [] },
            pretensao: { default: false },
            areaPos: { default: "" },
            cursoPos: { default: "" },
            titulo: { default: "" },
            graduacaopos: { default: [] },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    initializeData(form) {
        form.patchValue(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__["Curriculum"]());
    }
    saveData(form) {
        console.log('FORMULARIOGRAD', this.formGraduacao.value);
        console.log('FORMULARIO', this.form.value);
        return new Promise((resolve, reject) => {
            var _a, _b;
            // this.entity!.usuario_id=this.auth.usuario!.id;
            let curriculum = this.util.fill(new src_app_models_currriculum_model__WEBPACK_IMPORTED_MODULE_6__["Curriculum"](), this.entity);
            //curriculum.usuario_id=this.auth.usuario?.id;
            curriculum = this.util.fillForm(curriculum, this.form.value);
            curriculum.usuario_id = (_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.id;
            ((_b = this.form) === null || _b === void 0 ? void 0 : _b.controls.idiomasM.value).forEach(element => curriculum.idiomas.push(element.data));
            // let graduacoes = this.util.fill(new CurriculumGraduacao(),)
            resolve(curriculum);
            //resolve(this.util.fillForm(curriculum, this.form!.value));
        });
    }
    onEstadosChange() {
        //console.log('onEstadosChange', this.form?.controls.estados)
        this.selecionaMunicipios(this.estados.value);
    }
    selecionaMunicipios(uf) {
        var _a;
        //console.log(uf)
        (_a = this.cidadeDao) === null || _a === void 0 ? void 0 : _a.query({ where: [['uf', '==', uf]], orderBy: [['nome', 'asc']] }).getAll().then((municipios) => {
            this.municipios = municipios.map(x => Object.assign({}, { key: x.id, value: x.nome }));
        });
    }
    addItemIdioma() {
        let result = undefined;
        //console.log('addItemGraduacao',this.formGraduacao!.value)
        let res = this.form.value;
        console.log('addItemIdioma', res);
        const idioma = this.lookup.IDIOMAS.find(x => x.key == this.form.controls.idioma.value);
        const escrita = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaEscrita.value); //this.form!.controls.idiomaEscrita.value;
        const fala = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaFala.value); //this.form!.controls.idiomaFala.value;
        const entende = this.lookup.NIVEL_IDIOMA.find(x => x.key == this.form.controls.idiomaEntendimento.value); //idiomaFalathis.form!.controls.idiomaEntendimento.value;
        const key = this.util.textHash(idioma === null || idioma === void 0 ? void 0 : idioma.key);
        console.log('addItemIdioma', ' - ', idioma, ' - ', escrita, ' - ', fala, ' - ', entende, ' - ', key);
        if (idioma && escrita && fala && entende && this.util.validateLookupItem(this.form.controls.idiomasM.value, key)) { // && this.util.validateLookupItem(key,value)) {
            result = {
                key: key,
                value: idioma.value + ' - ' + escrita.value + ' - ' + fala.value + ' - ' + entende.value,
                data: {
                    idioma: idioma.key,
                    escrita: escrita.key,
                    fala: fala.key,
                    entende: entende.key
                }
            };
            this.form.controls.idioma.setValue("");
            this.form.controls.idiomaFala.setValue("");
            this.form.controls.idiomaEscrita.setValue("");
            this.form.controls.idiomaEntendimento.setValue("");
        }
        return result;
    }
    ;
    /* public addItemGraduacao(): LookupItem | undefined {
       let result = undefined;
   
       const area = { 'key': this.formGraduacao!.controls.area.value, 'value': this.area?.selectedItem?.text };
       const curso = this.cursos.find(value => value.key == this.formGraduacao!.controls.curso.value)
       const status = this.opcoesEscolha.find(value => value.key == (this.formGraduacao!.controls.pretensao.value ? 1 : 0))//converte o value do switch
       const key = this.util.textHash((area.key || "") + (curso?.key || "") + (status?.key || ""));
   
       if (curso && area && status && this.util.validateLookupItem(this.formGraduacao!.controls.graduacao.value, key)) {
   
         result = {
           key: key,
           value: area.value + ' - ' + curso.value + ' - ' + status?.value,
           data: {
             area: area.key,
             curso: curso.key,
             status: status?.key
           }
         };
         console.log('FORMGRAD->', this.formGraduacao!.value)
         this.formGraduacao!.controls.area.setValue("");
         this.formGraduacao!.controls.curso.setValue("");
         this.formGraduacao!.controls.pretensao.setValue(false);
       }
       return result;
     };*/
    addItemGraduacaoPos() {
        var _a, _b, _c;
        let result = undefined;
        /*this.cursoDao?.query({where: [['id', '==', this.formGraduacao!.controls.curso.value]]}).getAll().then((curso2)=>{
            curso = curso2.map(x => Object.assign({},{key: x.id, value: x.nome_curso}) as LookupItem);
            console.log('CURSO DENTRO->',curso)
        })*/
        const area = { 'key': this.formGraduacao.controls.areaPos.value, 'value': (_b = (_a = this.areaPos) === null || _a === void 0 ? void 0 : _a.selectedItem) === null || _b === void 0 ? void 0 : _b.text };
        const curso = this.curso.selectedItem; //this.cursosGradPos.find(value => value.key == this.formGraduacao!.controls.cursoPos.value)
        const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao.controls.titulo.value);
        const pretensao = this.opcoesEscolha.find(value => value.key == (this.formGraduacao.controls.pretensao.value ? 1 : 0)); //converte o value do switch
        const key = this.util.textHash((area.key || "") + ((curso === null || curso === void 0 ? void 0 : curso.key) || "") + ((titulo === null || titulo === void 0 ? void 0 : titulo.key) || "")); // + (pretensao?.key || ""));
        console.log('AREA', area, 'AREA', curso, 'AREA', titulo, 'AREA', pretensao);
        if (curso && area && titulo && pretensao && this.util.validateLookupItem(this.formGraduacao.controls.graduacaopos.value, key)) {
            result = {
                key: key,
                value: area.value + ' - ' + curso.value + ' - ' + (titulo === null || titulo === void 0 ? void 0 : titulo.value) + ' - ' + (pretensao === null || pretensao === void 0 ? void 0 : pretensao.value),
                data: {
                    id: (_c = this.dao) === null || _c === void 0 ? void 0 : _c.generateUuid(),
                    area: area.key,
                    curso: curso.key,
                    titulo: titulo === null || titulo === void 0 ? void 0 : titulo.key,
                    pretensao: pretensao === null || pretensao === void 0 ? void 0 : pretensao.key,
                    _status: "ADD"
                }
            };
            console.log('FORMULARIOGRAD', this.formGraduacao.value);
            this.formGraduacao.controls.areaPos.setValue("");
            this.formGraduacao.controls.cursoPos.setValue("");
            this.formGraduacao.controls.titulo.setValue("");
            this.formGraduacao.controls.pretensao.setValue(false);
        }
        return result;
    }
    ;
    onAreaGraducaoPosChange() {
        var _a;
        (_a = this.cursoDao) === null || _a === void 0 ? void 0 : _a.query({ where: [['area_curso_id', '==', this.formGraduacao.controls.area.value], ['titulo', 'like', 'GRAD%']] }).getAll().then((cursos2) => {
            this.cursos = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }));
            this.cdRef.detectChanges();
        });
    }
    onAreaPosGraduacaoChange() {
        const titulo = this.lookup.TITULOS_CURSOS.find(x => x.key == this.formGraduacao.controls.titulo.value);
        // this.cursoDao?.query({where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value && 'titulo','==',titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC","GRAD_LIC","ESPECIAL","MESTRADO","DOUTORADO","POS_DOUTORADO"]]]}).getAll().then((cursos3) => {
        this.cursoWhere = [['area_id', '==', this.formGraduacao.controls.areaPos.value], ['titulo', '==', titulo === null || titulo === void 0 ? void 0 : titulo.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]];
        this.cdRef.detectChanges();
        /*this.cursoDao?.query({ where: [['area_curso_id', '==', this.formGraduacao!.controls.areaPos.value], ['titulo', '==', titulo?.key], ['titulo', 'in', ["GRAD_TEC", "GRAD_BAC", "GRAD_LIC", "ESPECIAL", "MESTRADO", "DOUTORADO", "POS_DOUTORADO"]]] }).getAll().then((cursos3) => {
          this.cursosGradPos = cursos3.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
          this.cdRef.detectChanges();
        });*/
    }
    ngOnInit() {
        var _a, _b;
        (_a = this.dao) === null || _a === void 0 ? void 0 : _a.query({ where: ['usuario_id', '==', (_b = this.auth.usuario) === null || _b === void 0 ? void 0 : _b.id] }).getAll().then((user) => {
            var _a;
            console.log('USER', user.map(x => x.id));
            if (!(user == null || user.length == 0)) {
                //console.log('VAZIO')
                const userID = (user.map(x => x.id)).toString();
                //console.log('USERID',userID)          
                (_a = this.form) === null || _a === void 0 ? void 0 : _a.controls.id.setValue(userID); //.toString())))
            }
        });
    }
    onAddClick() {
    }
    get stateName() {
        return this.show ? 'show' : 'hide';
    }
    togglePopOver() {
        const pop = document.getElementById('divPop');
        console.log(pop === null || pop === void 0 ? void 0 : pop.hidden);
        if (pop === null || pop === void 0 ? void 0 : pop.hidden) {
            pop.hidden = false;
        }
        else {
            pop.hidden = true;
        }
        this.show = !this.show;
    }
}
CurriculumFormComponent.ɵfac = function CurriculumFormComponent_Factory(t) { return new (t || CurriculumFormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["Injector"])); };
CurriculumFormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: CurriculumFormComponent, selectors: [["curriculum-pessoal-form"]], viewQuery: function CurriculumFormComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c2, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.areaPos = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.estados = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.curso = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 34, vars: 48, consts: [[3, "form", "disabled", "title", "submit", "cancel"], [1, "row", "mt-3"], ["label", "Apresente-se", "icon", "bi-card-list", "controlName", "apresentacao", 3, "size", "bold", "control"], ["title", "Dados Residenciais"], [1, "row", "mt-2"], ["label", "Estado", "icon", "fas fa-flag", "controlName", "estados", 3, "size", "control", "items", "change"], ["estados", ""], ["label", "Munic\u00EDpio", "icon", "far fa-flag", "controlName", "cidade_id", 3, "size", "control", "items"], ["label", "Telefone de contato WhatsAPP", "icon", "fas fa-phone", "controlName", "telefone", 3, "size", "control", "maskFormat"], ["title", "Estado Civil"], ["label", "Estado Civil", "icon", "fas fa-ring", "controlName", "estado_civil", 3, "size", "control", "items"], ["label", "Possui Filhos?", "icon", "fas fa-child", "controlName", "filhos", "labelInfo", "Possui Filhos?", 3, "size", "control"], ["label", "Quantos?", "icon", "bi bi-arrow-up-right-circle", "controlName", "quantidade_filhos", 3, "hidden", "size", "control", "minValue"], ["title", "Idiomas", 3, "click"], ["id", "divPop", "hidden", ""], [1, "bi", "bi-exclamation-triangle-fill"], [1, "row", "my-3"], ["label", "Fala outros idiomas?", "icon", "fas fa-language", "controlName", "radioFalaIdioma", 3, "size", "control"], ["controlName", "idiomasM", "noBox", "", 3, "size", "control", "addItemHandle", 4, "ngIf"], [1, "row", "mt-3", "mb-5"], ["label", "Gradua\u00E7\u00E3o e P\u00F3s-Gradua\u00E7\u00E3o - Especializa\u00E7\u00E3o, Mestrado, Doutorado e P\u00F3s Doutorado", "controlName", "graduacaopos", "noBox", "", 3, "size", "control", "addItemHandle", "bold"], ["label", "Pretende Cursar?", "icon", "fas fa-user-graduate", "controlName", "pretensao", "labelInfo", "Pretendo Cursar", 3, "size", "control"], ["label", "\u00C1rea de conhecimento", "controlName", "areaPos", 3, "size", "dao", "control"], ["areaPos", ""], ["label", "Titulo", "icon", "bi bi-mortarboard-fill", "controlName", "titulo", "liveSearch", "", 3, "size", "control", "items", "change"], ["label", "Curso", "icon", "fas fa-graduation-cap", "controlName", "cursoPos", "liveSearch", "", 3, "size", "control", "dao", "where", "addRoute"], ["curso", ""], [1, "mb-1"], ["controlName", "idiomasM", "noBox", "", 3, "size", "control", "addItemHandle"], ["label", "Idioma", "icon", "fas fa-sign-out-alt", "controlName", "idioma", "liveSearch", "", 3, "size", "control", "items"], ["label", "N\u00EDvel de fala?", "icon", "fas fa-sign-out-alt", "controlName", "idiomaFala", 3, "size", "control", "items"], ["label", "N\u00EDvel de escrita?", "icon", "fas fa-sign-out-alt", "controlName", "idiomaEscrita", 3, "size", "control", "items"], ["label", "N\u00EDvel de entendimento?", "icon", "fas fa-sign-out-alt", "controlName", "idiomaEntendimento", 3, "size", "control", "items"]], template: function CurriculumFormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "editable-form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function CurriculumFormComponent_Template_editable_form_submit_0_listener() { return ctx.onSaveData(); })("cancel", function CurriculumFormComponent_Template_editable_form_cancel_0_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "input-textarea", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "separator", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "input-select", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CurriculumFormComponent_Template_input_select_change_6_listener() { return ctx.onEstadosChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "input-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "input-text", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "separator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "input-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](14, "input-switch", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "input-number", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "separator", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function CurriculumFormComponent_Template_separator_click_17_listener() { return ctx.togglePopOver(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](19, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21, "Hello! I'm a helpful message.");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](23, "input-switch", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](24, CurriculumFormComponent_input_multiselect_24_Template, 5, 15, "input-multiselect", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "input-multiselect", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](27, "input-switch", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](28, "input-search", 22, 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "input-select", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function CurriculumFormComponent_Template_input_select_change_30_listener() { return ctx.onAreaPosGraduacaoChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](31, "input-select", 25, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](33, "separator", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("bold", true)("control", ctx.form.controls.apresentacao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.estados)("items", ctx.lookup.UF);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.cidade_id)("items", ctx.municipios);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.form.controls.telefone)("maskFormat", "(00) 0000-0000||(00) 0 0000-0000");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 5)("control", ctx.form.controls.estado_civil)("items", ctx.lookup.ESTADO_CIVIL);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.filhos);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("hidden", ctx.form.controls.filhos.value ? undefined : "true")("size", 4)("control", ctx.form.controls.quantidade_filhos)("minValue", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("@popOverState", ctx.stateName);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 2)("control", ctx.form.controls.radioFalaIdioma);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.form.controls.radioFalaIdioma.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 12)("control", ctx.formGraduacao.controls.graduacaopos)("addItemHandle", ctx.addItemGraduacaoPos.bind(ctx))("bold", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 2)("control", ctx.formGraduacao.controls.pretensao);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("dao", ctx.areaDao)("control", ctx.formGraduacao.controls.areaPos);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 2)("control", ctx.formGraduacao.controls.titulo)("items", ctx.lookup.TITULOS_CURSOS);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("size", 4)("control", ctx.formGraduacao.controls.cursoPos)("dao", ctx.cursoDao)("where", ctx.cursoWhere)("addRoute", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](46, _c4, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](45, _c3)));
    } }, directives: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_0__["EditableFormComponent"], _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_9__["InputTextareaComponent"], _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_10__["SeparatorComponent"], _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_11__["InputSelectComponent"], _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_12__["InputTextComponent"], _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_13__["InputSwitchComponent"], _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_14__["InputNumberComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_15__["NgIf"], _components_input_input_multiselect_input_multiselect_component__WEBPACK_IMPORTED_MODULE_16__["InputMultiselectComponent"], _components_input_input_search_input_search_component__WEBPACK_IMPORTED_MODULE_17__["InputSearchComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXJyaWN1bHVtLWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["trigger"])('popOverState', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["state"])('show', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["style"])({
                    opacity: 1
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["state"])('hide', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["style"])({
                    opacity: 0
                })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["transition"])('show => hide', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["animate"])('600ms ease-out')),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["transition"])('hide => show', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_7__["animate"])('1000ms ease-in'))
            ])
        ] } });


/***/ }),

/***/ "Z4OF":
/*!***************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-home/raioxhome.component.ts ***!
  \***************************************************************************/
/*! exports provided: RaioxhomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RaioxhomeComponent", function() { return RaioxhomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");



class RaioxhomeComponent {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.logoInicial = "../../../../assets/images/logo-raio-x-3.png";
        this.imgDadosPessoais = "../../../../assets/images/Dados_pessoais.png";
        this.imgDadosProfissionais = "../../../../assets/images/Dados_profissionais.png";
        this.imgAtributos = "../../../../assets/images/Atributos_comportamentais.png";
        this.imgOportunidades = "../../../../assets/images/Oportunidade.png";
    }
    ngOnInit() {
    }
    dadosPessoais() {
        this.router.navigate(['raiox/pessoal']);
    }
    mensagemSaudacao() {
        var _a, _b;
        const hora = parseInt(this.auth.unidadeHora.replace(":", ""));
        const apelido = (_a = this.auth.usuario) === null || _a === void 0 ? void 0 : _a.apelido;
        const mail = (_b = this.auth.usuario) === null || _b === void 0 ? void 0 : _b.email;
        return hora < 1200 ? "Bom dia, " + apelido : hora < 1800 ? "Boa tarde, " + apelido : "Boa noite, " + apelido;
    }
}
RaioxhomeComponent.ɵfac = function RaioxhomeComponent_Factory(t) { return new (t || RaioxhomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"])); };
RaioxhomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RaioxhomeComponent, selectors: [["app-raioxhome"]], decls: 52, vars: 6, consts: [[1, "saudacao"], [1, "msgSaudacao"], [1, "logo-raio-x"], ["id", "logoRaioX", 3, "src"], [1, "card-group", "card-group--custom"], [1, "row", "justify-content-md-center", "mx-3"], [1, "col-lg-3", "col-md-12", "my-2", "d-lg-flex", "align-items-stretch"], [1, "card", "menu", "card-custom"], [1, "card-body", "my-1"], [1, "card-header", "card-header--custom"], [1, "card-title", "text-center", "title-custom"], [1, "card-text", "py-2", "p-custom-inicial"], [1, "card-footer", "text-muted", "text-center"], ["id", "BTNPessoal", 1, "closing"], ["id", "imgBTNPessoal", 3, "src"], [1, "card-body"], ["id", "BTNProf", "data-bs-toggle", "modal", "data-bs-target", "#dadosP", 1, "closing"], ["id", "imgBTNProf", 3, "src"], ["id", "BTNGer", "onclick", "msgInicial()", 1, "closing"], ["id", "imgBTNGer", 3, "src"], ["id", "BTNatributos", "data-bs-toggle", "modal", "data-bs-target", "#atributos", 1, "closing"], ["id", "imgBTNatributos", 3, "src"]], template: function RaioxhomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h5", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Dados Pessoais");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Nos conte um pouco sobre voc\u00EA, sua fam\u00EDlia, os idiomas que fala e as gradua\u00E7\u00F5es que tem!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "img", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h5", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Dados Profissionais");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Como est\u00E1 sendo sua jornada profissional? Informe suas qualifica\u00E7\u00F5es e experi\u00EAncias.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "img", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "h5", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Oportunidades");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Espa\u00E7o reservado para inscri\u00E7\u00F5es oportunidades como cursos e processos seletivos.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "img", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "h5", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Atributos Comportamentais");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Informe seus Soft Skills, tenha um relat\u00F3rio gerencial sobre seus atributos comportamentais com base no teste Big Five e DISC.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "img", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "img", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.mensagemSaudacao());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.logoInicial, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgDadosPessoais, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgDadosProfissionais, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgOportunidades, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.imgAtributos, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["@import url(\"https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;800&display=swap\");\nbody[_ngcontent-%COMP%]::-webkit-scrollbar, #dadospessoais[_ngcontent-%COMP%]::-webkit-scrollbar, #dadosP[_ngcontent-%COMP%]::-webkit-scrollbar, #oportunidades[_ngcontent-%COMP%]::-webkit-scrollbar, #atributos[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 11px;\n}\nbody[_ngcontent-%COMP%]::-webkit-scrollbar-track, #dadospessoais[_ngcontent-%COMP%]::-webkit-scrollbar-track, #dadosP[_ngcontent-%COMP%]::-webkit-scrollbar-track, #oportunidades[_ngcontent-%COMP%]::-webkit-scrollbar-track, #atributos[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background-color: #fff;\n}\nbody[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #dadospessoais[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #dadosP[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #oportunidades[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, #atributos[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: #1d2143;\n  border-radius: 5px;\n}\n.logo-raio-x[_ngcontent-%COMP%], .saudacao[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  margin: auto;\n  display: flex;\n  justify-content: center;\n}\n.msgSaudacao[_ngcontent-%COMP%] {\n  color: #1d2143;\n}\n.logo-raio-x[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 330px;\n  height: auto;\n}\n.closing[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n}\nbutton[_ngcontent-%COMP%]   #imgBTNProf[_ngcontent-%COMP%], button[_ngcontent-%COMP%]   #imgBTNGer[_ngcontent-%COMP%], button[_ngcontent-%COMP%]   #imgBTNPessoal[_ngcontent-%COMP%], button[_ngcontent-%COMP%]   #imgBTNatributos[_ngcontent-%COMP%] {\n  width: auto;\n  height: 120px;\n  border: none;\n}\n.card-group--custom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.title-custom[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-family: \"Fira Sans\", sans-serif;\n  color: #1d2143;\n}\n.card-custom[_ngcontent-%COMP%] {\n  border-radius: 20px 20px 20px 0px;\n  width: 260px;\n  height: auto;\n  transition: all 0.2s linear;\n}\n.card-custom[_ngcontent-%COMP%]:hover {\n  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);\n}\n.card-header--custom[_ngcontent-%COMP%] {\n  background-color: #d9dad9;\n  border-radius: 15px 15px 0px 0px !important;\n}\n.card-custom[_ngcontent-%COMP%] {\n  width: 100% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3JhaW94aG9tZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBUSxtR0FBQTtBQUVSO0VBQ0ksV0FBQTtBQUFKO0FBR0M7RUFDSSxzQkFBQTtBQUFMO0FBR0M7RUFDSSx5QkFBQTtFQUNBLGtCQUFBO0FBQUw7QUFHRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtBQUFKO0FBR0U7RUFDRSxjQUFBO0FBQUo7QUFJRTtFQUNFLFlBQUE7RUFDQSxZQUFBO0FBREo7QUFJRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQURKO0FBS0U7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFGSjtBQU9FO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBSko7QUFPRTtFQUNFLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxjQUFBO0FBSko7QUFPRTtFQUNFLGlDQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQUpKO0FBT0U7RUFHSSw4Q0FBQTtBQUpOO0FBUUU7RUFDRSx5QkFBQTtFQUNBLDJDQUFBO0FBTEo7QUFTRztFQUNJLHNCQUFBO0FBTlAiLCJmaWxlIjoicmFpb3hob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RmlyYStTYW5zOndnaHRAMzAwOzQwMDs1MDA7ODAwJmRpc3BsYXk9c3dhcCcpO1xyXG4gIFxyXG5ib2R5Ojotd2Via2l0LXNjcm9sbGJhciwgI2RhZG9zcGVzc29haXM6Oi13ZWJraXQtc2Nyb2xsYmFyLCAjZGFkb3NQOjotd2Via2l0LXNjcm9sbGJhciwgI29wb3J0dW5pZGFkZXM6Oi13ZWJraXQtc2Nyb2xsYmFyLCAjYXRyaWJ1dG9zOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICB3aWR0aDogMTFweDtcclxuIH1cclxuXHJcbiBib2R5Ojotd2Via2l0LXNjcm9sbGJhci10cmFjaywgI2RhZG9zcGVzc29haXM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLCAjZGFkb3NQOjotd2Via2l0LXNjcm9sbGJhci10cmFjaywgI29wb3J0dW5pZGFkZXM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrLCAjYXRyaWJ1dG9zOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuIH1cclxuXHJcbiBib2R5Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiwgI2RhZG9zcGVzc29haXM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLCAjZGFkb3NQOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiwgI29wb3J0dW5pZGFkZXM6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLCAjYXRyaWJ1dG9zOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogIzFkMjE0MztcclxuICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiB9XHJcbiAgICBcclxuICAubG9nby1yYWlvLXgsIC5zYXVkYWNhb3tcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLm1zZ1NhdWRhY2FvIHtcclxuICAgIGNvbG9yOiAjMWQyMTQzO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgLmxvZ28tcmFpby14IGltZyB7XHJcbiAgICB3aWR0aDogMzMwcHg7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgfVxyXG5cclxuICAuY2xvc2luZ3tcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIGJ1dHRvbiAjaW1nQlROUHJvZiwgYnV0dG9uICNpbWdCVE5HZXIsIGJ1dHRvbiAjaW1nQlROUGVzc29hbCwgYnV0dG9uICNpbWdCVE5hdHJpYnV0b3Mge1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgYm9yZGVyOm5vbmU7XHJcbiAgfVxyXG5cclxuICBcclxuXHJcbiAgLmNhcmQtZ3JvdXAtLWN1c3RvbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAudGl0bGUtY3VzdG9tIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbiAgICBmb250LWZhbWlseTogJ0ZpcmEgU2FucycsIHNhbnMtc2VyaWY7XHJcbiAgICBjb2xvcjogIzFkMjE0MztcclxuICB9XHJcblxyXG4gIC5jYXJkLWN1c3RvbSB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4IDIwcHggMjBweCAwcHg7XHJcbiAgICB3aWR0aDogMjYwcHg7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGxpbmVhcjtcclxuICB9XHJcblxyXG4gIC5jYXJkLWN1c3RvbTpob3ZlciB7XHJcbiAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDBweCA1cHggM3B4IHJnYmEoMCwwLDAsMC4yKTtcclxuICAgICAgLW1vei1ib3gtc2hhZG93OiAwcHggMHB4IDVweCAzcHggcmdiYSgwLDAsMCwwLjIpO1xyXG4gICAgICBib3gtc2hhZG93OiAwcHggMHB4IDVweCAzcHggcmdiYSgwLDAsMCwwLjIpO1xyXG4gIH1cclxuXHJcblxyXG4gIC5jYXJkLWhlYWRlci0tY3VzdG9tIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWRhZDk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4IDE1cHggMHB4IDBweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcblxyXG4gICAuY2FyZC1jdXN0b20ge1xyXG4gICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgfVxyXG5cclxuIl19 */"] });


/***/ }),

/***/ "knmu":
/*!*************************************************************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: CurriculumAtributosbig5FormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumAtributosbig5FormComponent", function() { return CurriculumAtributosbig5FormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ "EkNo");
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ "suJ1");




class CurriculumAtributosbig5FormComponent {
    constructor(router) {
        this.router = router;
        this.comunica = "/assets/images/Comunica.jpeg"; //"../assets/images/Comunica.jpg";
        this.lideranca = "/assets/images/Lid.jpeg";
        this.resolucao = "/assets/images/Resolucao.jpeg";
        this.bigicoAmarelo = "/assets/images/iconBigAmarelo.png";
        this.bigico = "/assets/images/iconBig.png";
        const range = document.getElementById('range');
        console.log('RANGE-->', range);
        const rangeV = document.getElementById('rangeV');
        const setValue = () => {
            console.log(range);
            const newValue = Number((parseInt(range.value)) - (parseInt(range.min)) * 100 / (parseInt(range.max) - parseInt(range.min))), newPosition = 10 - (newValue * 0.2);
            rangeV.innerHTML = `<span>${range}</span>`;
            rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        };
        document.addEventListener('DOMContentLoaded', setValue);
        console.log(range);
        //range.addEventListener('input', setValue);
    }
    ngOnInit() {
    }
    inicio() {
        if ($('#big5').is(":hidden")) {
            $('#big5').show();
            $('#lblinicio').text('Voltar');
            $('#btnInicio').removeClass().addClass('btn btn-dark');
        }
        else {
            $('#big5').hide();
            $('#lblinicio').text('Iniciar');
            $('#btnInicio').removeClass().addClass('btn btn-success');
        }
    }
    onChangePerma() {
        console.log();
        let value = $('#rangePerma').val();
        $('#lblPerma').text(value.toString());
    }
    voltarb5() { }
    resposta() { }
    proxb5() { }
}
CurriculumAtributosbig5FormComponent.ɵfac = function CurriculumAtributosbig5FormComponent_Factory(t) { return new (t || CurriculumAtributosbig5FormComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
CurriculumAtributosbig5FormComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CurriculumAtributosbig5FormComponent, selectors: [["curriculum-atributosbig5-form"]], decls: 138, vars: 5, consts: [["display", "", "right", ""], ["key", "BIG5", "label", "Big-Five", 1, "fw-bold"], ["id", "b5exp", 1, "my-3"], ["id", "pb5exp", 1, "text-justify", "fw-bold"], [1, "row", "justify-content-center"], [1, "col-md-5"], [1, "card", "text-center", "mt-5"], [1, "card-header"], ["id", "imgBigIco", "alt", "...", 1, "card-img-top", "me-2", 3, "src"], [1, "card-body"], [1, "row", "my-2"], [1, "col-lg-12"], ["for", "escolheRelatorioIFR", 1, "label", "mb-3"], [1, "btn-group", "d-grid", "justify-content-md-center"], [1, "col-12", "mb-1"], ["type", "radio", "name", "escolheRelatorioIFR", "id", "dataIF", "autocomplete", "off", "value", "dataIF", "checked", "", 1, "btn-check", "btnRadio"], ["for", "dataIF", 1, "btn", "btn-outline-primary", "mb-1", "w-100", "text-center"], ["type", "radio", "name", "escolheRelatorioIFR", "id", "mesAno", "autocomplete", "off", "value", "mesAno", 1, "btn-check", "btnRadio"], ["for", "mesAno", 1, "btn", "btn-outline-primary", "mb-1", "w-100", "text-center"], ["type", "radio", "name", "escolheRelatorioIFR", "id", "total", "autocomplete", "off", "value", "total", 1, "btn-check", "btnRadio"], ["for", "total", 1, "btn", "btn-outline-primary", "mb-1", "w-100", "text-center"], [1, "card-footer"], [1, "row"], [1, "col-md-12", "d-flex", "justify-content-between"], [1, "col-md-3"], ["type", "button", "id", "btnv", "disabled", "", 1, "btn", "btn-primary", 3, "click"], ["type", "button", "id", "btne", "disabled", "", 1, "btn", "btn-primary", 3, "click"], [1, "btn-group", "d-flex", "flex-wrap"], ["for", "dataIF", 1, "btn", "btn-outline-primary", "btnRadio"], ["for", "mesAno", 1, "btn", "btn-outline-primary", "mx-2", "btnRadio"], ["for", "total", 1, "btn", "btn-outline-primary", "btnRadio"], ["key", "DISC", "label", "Disc", 1, "fw-bold"], ["key", "PERMA", "label", "M\u00E9todo PERMA", 1, "fw-bold"], [1, "col-md-7"], [1, "card", "mt-5"], [1, "card-header", "hperma"], [1, "card-body-perma"], [1, "range-wrap", "divSlidePerma", "w-100", "box"], ["name", "lblPerma", "id", "lblPerma", 1, "me-2", "lperma"], ["id", "rangePerma", "name", "rangePerma", "type", "range", "min", "0", "max", "10", "value", "0", "step", "1", 1, "ms-2", "rperma", 3, "change"], [1, "card-footer", "fperma"], [1, "d-flex", "justify-content-between"], ["type", "button", "id", "btnv", "disabled", "", 1, "btn", "btnpermav", 3, "click"], ["type", "button", "id", "btne", "disabled", "", 1, "btn", "btnpermap", 3, "click"], ["key", "SRQ19", "label", "SRQ-19", 1, "fw-bold"], ["key", "SOFTSKILLS", "label", "Soft-Skills", 1, "fw-bold"], [1, "my-5"], [1, "row", "row-cols-1", "row-cols-md-3", "g-4"], [1, "col"], [1, "card", "h-100"], ["id", "imgComunica", "alt", "...", 1, "card-img-top", 3, "src"], [1, "card-title", "text-center"], [1, "card-text"], ["type", "number", 1, "form-control"], ["id", "imgLideranca", "alt", "...", 1, "card-img-top", 3, "src"], ["id", "imgResolucao", "alt", "...", 1, "card-img-top", 3, "src"]], template: function CurriculumAtributosbig5FormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tabs", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Voc\u00EA quer se conhecer melhor? Este teste de personalidade ir\u00E1 ajud\u00E1-lo a compreender as formas de seu comportamento e os motivos de suas a\u00E7\u00F5es. Ao final do teste voc\u00EA poder\u00E1 optar se deseja torn\u00E1-lo p\u00FAblico ou n\u00E3o. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Para prosseguir \u00E9 necess\u00E1rio responder a pergunta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "1. Eu sou a alma da festa.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Muito Inadequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Relativamente Inadequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Nem Adequado, Nem Inadequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Relativamente Adequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Muito Adequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_43_listener() { return ctx.voltarb5(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Voltar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_46_listener() { return ctx.resposta(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Enviar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Para prosseguir \u00E9 necess\u00E1rio responder a pergunta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "1. Eu sou a alma da festa.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Muito Inadequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Relativamente Inadequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Nem Adequado, Nem Inadequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "label", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Relativamente Adequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Muito Adequado");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_79_listener() { return ctx.voltarb5(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "Voltar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_82_listener() { return ctx.resposta(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "Enviar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "tab", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "tab", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "1. Em geral, at\u00E9 que ponto voc\u00EA se sente satisfeito?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "label", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "input", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function CurriculumAtributosbig5FormComponent_Template_input_change_96_listener() { return ctx.onChangePerma(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "div", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "button", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_99_listener() { return ctx.voltarb5(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "Voltar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "button", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CurriculumAtributosbig5FormComponent_Template_button_click_101_listener() { return ctx.resposta(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "Pr\u00F3ximo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "tab", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "tab", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "h4", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](106, "Compet\u00EAncias Gerenciais, distribua 20 pontos entre as habilidades abaixo: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "img", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "h5", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](113, "Comunica\u00E7\u00E3o");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "p", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "input", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](120, "img", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "h5", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, "Lideran\u00E7a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "p", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "input", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](130, "img", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "h5", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, "Resolu\u00E7\u00E3o de Problemas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "p", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "input", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.bigico, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.bigico, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.comunica, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.lideranca, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.resolucao, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, directives: [_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_2__["TabsComponent"], _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_3__["TabComponent"]], styles: ["input[type=range][_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n  margin: 20px 0;\n  width: 100%;\n}\n\ninput[type=range][_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\ninput[type=range][_ngcontent-%COMP%]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 4px;\n  cursor: pointer;\n  animate: 0.2s;\n  background: grey;\n  border-radius: 25px;\n}\n\ninput[type=range][_ngcontent-%COMP%]::-webkit-slider-thumb {\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 0 4px 0 black;\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -8px;\n}\n\ninput[type=range][_ngcontent-%COMP%]:focus::-webkit-slider-runnable-track {\n  background: grey;\n}\n\n.range-wrap[_ngcontent-%COMP%] {\n  width: 500px;\n  position: relative;\n}\n\n.range-value[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -50%;\n}\n\n.range-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  background: grey;\n  color: #fff;\n  font-size: 12px;\n  display: block;\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 0);\n  border-radius: 6px;\n}\n\n.range-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-top: 10px solid grey;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  margin-top: -1px;\n}\n\n#lblPerma[_ngcontent-%COMP%] {\n  float: right;\n  font-size: 200%;\n  text-align: center;\n  padding-left: 1em;\n}\n\n.divSlidePerma[_ngcontent-%COMP%] {\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n  justify-content: flex-end;\n  height: auto;\n}\n\n.card-body-perma[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #223;\n  display: grid;\n}\n\n.box[_ngcontent-%COMP%] {\n  --border-size: 3px;\n  --border-angle: 0turn;\n  width: 60vmin;\n  height: 10vmin;\n  background-image: conic-gradient(from var(--border-angle), #223, #223 50%, #223), conic-gradient(from var(--border-angle), transparent 20%, white, #fec901);\n  background-size: calc(100% - (var(--border-size) * 2)) calc(100% - (var(--border-size) * 2)), cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  animation: bg-spin 3s linear infinite;\n  border-color: #223;\n}\n\n@keyframes bg-spin {\n  to {\n    --border-angle: 1turn;\n  }\n}\n\n.box[_ngcontent-%COMP%]:hover {\n  animation-play-state: paused;\n}\n\n@property --border-angle {\n  syntax: \"<angle>\";\n  inherits: true;\n  initial-value: 0turn;\n}\n\n#lblPerma[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.hb51[_ngcontent-%COMP%] {\n  background-color: #223;\n  color: #fec901;\n}\n\n.bb51[_ngcontent-%COMP%] {\n  background-color: #223;\n}\n\n.fb51[_ngcontent-%COMP%] {\n  background-color: #223;\n}\n\n#btnvb5[_ngcontent-%COMP%], #btneb5[_ngcontent-%COMP%] {\n  color: #fec901;\n  outline-color: #fec901;\n}\n\n.lblRadio[_ngcontent-%COMP%] {\n  background-color: #fec901;\n  color: #223;\n  outline: #223;\n}\n\n.lblRadio[_ngcontent-%COMP%]:hover {\n  background-color: #223;\n  color: #fec901;\n  border-color: #fec901;\n}\n\n.lblpergB5[_ngcontent-%COMP%] {\n  color: #fec901;\n}\n\n#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n\n.hperma[_ngcontent-%COMP%], .fperma[_ngcontent-%COMP%] {\n  background-color: #223;\n  color: #fff;\n}\n\n.btnpermav[_ngcontent-%COMP%], .btnpermap[_ngcontent-%COMP%] {\n  background-color: #fff;\n  color: #213;\n  border-color: #213;\n}\n\ninput[type=radio][_ngcontent-%COMP%]:checked    + .lblRadio[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n#imgBigIco[_ngcontent-%COMP%], #imgBigIcoAmarelo[_ngcontent-%COMP%] {\n  max-width: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2N1cnJpY3VsdW0tYXRyaWJ1dG9zYmlnNS1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksd0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQUNKOztBQUNFO0VBQ0UsYUFBQTtBQUVKOztBQUFFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFHSjs7QUFERTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLHdCQUFBO0VBQ0EsZ0JBQUE7QUFJSjs7QUFGRTtFQUNFLGdCQUFBO0FBS0o7O0FBSEU7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFNSjs7QUFKRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtBQU9KOztBQUxFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FBUUo7O0FBTkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVNKOztBQU5BO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBU0o7O0FBTkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQVNGOztBQUxBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtBQVFGOztBQUhBO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsMkpBQUE7RUFDQSxtR0FBQTtFQUNBLGtDQUFBO0VBQ0EsNEJBQUE7RUFFQSxxQ0FBQTtFQUNBLGtCQUFBO0FBTUY7O0FBR0E7RUFDRTtJQUNJLHFCQUFBO0VBS0o7QUFDRjs7QUFGQTtFQUVFLDRCQUFBO0FBSUY7O0FBREE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtBQUlGOztBQURBO0VBQ0UsWUFBQTtBQUdGOztBQUFBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0FBR0Y7O0FBQUE7RUFDRSxzQkFBQTtBQUdGOztBQUFBO0VBQ0Usc0JBQUE7QUFHRjs7QUFBQTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtBQUdGOztBQUFBO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQUdGOztBQUFBO0VBQ0Usc0JBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUFHRjs7QUFDQTtFQUVFLGNBQUE7QUFDRjs7QUFJQTtFQUNFLGVBQUE7QUFERjs7QUFLQTtFQUNFLHNCQUFBO0VBQ0EsV0FBQTtBQUZGOztBQU1BO0VBRUUsc0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFKRjs7QUFTQTtFQUNFLHNCQUFBO0FBTkY7O0FBU0E7RUFDRSxlQUFBO0FBTkYiLCJmaWxlIjoiY3VycmljdWx1bS1hdHJpYnV0b3NiaWc1LWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbnB1dFt0eXBlPXJhbmdlXSB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIG1hcmdpbjogMjBweCAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIGlucHV0W3R5cGU9cmFuZ2VdOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG4gIGlucHV0W3R5cGU9cmFuZ2VdOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGFuaW1hdGU6IDAuMnM7XG4gICAgYmFja2dyb3VuZDogZ3JleTsvLyMwM2E5ZjQ7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgfVxuICBpbnB1dFt0eXBlPXJhbmdlXTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgIGhlaWdodDogMjBweDtcbiAgICB3aWR0aDogMjBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IDAgcmdiYSgwLDAsMCwgMSk7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBtYXJnaW4tdG9wOiAtOHB4O1xuICB9XG4gIGlucHV0W3R5cGU9cmFuZ2VdOmZvY3VzOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XG4gICAgYmFja2dyb3VuZDogZ3JleTsgLy8jMDNhOWY0O1xuICB9XG4gIC5yYW5nZS13cmFwe1xuICAgIHdpZHRoOiA1MDBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cbiAgLnJhbmdlLXZhbHVle1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC01MCU7XG4gIH1cbiAgLnJhbmdlLXZhbHVlIHNwYW57XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgaGVpZ2h0OiAyNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kOiBncmV5Oy8vICMwM2E5ZjQ7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCk7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICB9XG4gIC5yYW5nZS12YWx1ZSBzcGFuOmJlZm9yZXtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMDtcbiAgICBoZWlnaHQ6IDA7XG4gICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCBncmV5OyAvLyMwM2E5ZjQ7XG4gICAgYm9yZGVyLWxlZnQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItcmlnaHQ6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICB0b3A6IDEwMCU7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICAgIG1hcmdpbi10b3A6IC0xcHg7XG4gIH1cblxuI2xibFBlcm1he1xuICAgIGZsb2F0OnJpZ2h0O1xuICAgIGZvbnQtc2l6ZTogMjAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZy1sZWZ0OiAxZW07XG59XG5cbi5kaXZTbGlkZVBlcm1hIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1mbG93OiByb3ctcmV2ZXJzZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgaGVpZ2h0OiBhdXRvO1xuIFxufVxuXG4uY2FyZC1ib2R5LXBlcm1he1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICMyMjM7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIC8vcGxhY2UtaXRlbXM6IGNlbnRlcjtcblxufVxuXG4uYm94IHtcbiAgLS1ib3JkZXItc2l6ZTogM3B4O1xuICAtLWJvcmRlci1hbmdsZTogMHR1cm47XG4gIHdpZHRoOiA2MHZtaW47XG4gIGhlaWdodDogMTB2bWluO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBjb25pYy1ncmFkaWVudChmcm9tIHZhcigtLWJvcmRlci1hbmdsZSksICMyMjMsICMyMjMgNTAlLCAjMjIzKSwgY29uaWMtZ3JhZGllbnQoZnJvbSB2YXIoLS1ib3JkZXItYW5nbGUpLCB0cmFuc3BhcmVudCAyMCUsIHdoaXRlLCAjZmVjOTAxKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjYWxjKDEwMCUgLSAodmFyKC0tYm9yZGVyLXNpemUpICogMikpIGNhbGMoMTAwJSAtICh2YXIoLS1ib3JkZXItc2l6ZSkgKiAyKSksIGNvdmVyO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAtd2Via2l0LWFuaW1hdGlvbjogYmctc3BpbiAzcyBsaW5lYXIgaW5maW5pdGU7XG4gIGFuaW1hdGlvbjogYmctc3BpbiAzcyBsaW5lYXIgaW5maW5pdGU7XG4gIGJvcmRlci1jb2xvcjojMjIzO1xufVxuXG5ALXdlYmtpdC1rZXlmcmFtZXMgYmctc3BpbiB7XG4gIHRvIHtcbiAgICAgIC0tYm9yZGVyLWFuZ2xlOiAxdHVybjtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJnLXNwaW4ge1xuICB0byB7XG4gICAgICAtLWJvcmRlci1hbmdsZTogMXR1cm47XG4gIH1cbn1cblxuLmJveDpob3ZlciB7XG4gIC13ZWJraXQtYW5pbWF0aW9uLXBsYXktc3RhdGU6IHBhdXNlZDtcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHBhdXNlZDtcbn1cblxuQHByb3BlcnR5IC0tYm9yZGVyLWFuZ2xlIHtcbiAgc3ludGF4OiBcIjxhbmdsZT5cIjtcbiAgaW5oZXJpdHM6IHRydWU7XG4gIGluaXRpYWwtdmFsdWU6IDB0dXJuO1xufVxuXG4jbGJsUGVybWF7XG4gIGNvbG9yOndoaXRlO1xufVxuXG4uaGI1MXtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMztcbiAgY29sb3I6ICNmZWM5MDE7XG59XG5cbi5iYjUxe1xuICBiYWNrZ3JvdW5kLWNvbG9yOiMyMjM7XG59XG5cbi5mYjUxe1xuICBiYWNrZ3JvdW5kLWNvbG9yOiMyMjM7XG59XG5cbiNidG52YjUsICNidG5lYjV7XG4gIGNvbG9yOiNmZWM5MDE7XG4gIG91dGxpbmUtY29sb3I6I2ZlYzkwMTtcbn1cblxuLmxibFJhZGlve1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVjOTAxOy8vZmVjOTAxXG4gIGNvbG9yOiMyMjM7Ly8yMjNcbiAgb3V0bGluZTogIzIyMztcbn1cblxuLmxibFJhZGlvOmhvdmVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiMyMjM7XG4gIGNvbG9yOiAjZmVjOTAxO1xuICBib3JkZXItY29sb3I6ICNmZWM5MDE7XG5cbn1cblxuLmxibHBlcmdCNXtcbiAgXG4gIGNvbG9yOiAjZmVjOTAxO1xuXG59XG5cblxuI2ltZ0JpZ0ljbywjaW1nQmlnSWNvQW1hcmVsb3tcbiAgbWF4LXdpZHRoOiAzMHB4O1xuICBcbn1cblxuLmhwZXJtYSwgLmZwZXJtYSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjM7XG4gIGNvbG9yOiAjZmZmO1xuICAvL2ZvbnQtZmFtaWx5OidUcmVidWNoZXQgTVMnLCAnTHVjaWRhIFNhbnMgVW5pY29kZScsICdMdWNpZGEgR3JhbmRlJywgJ0x1Y2lkYSBTYW5zJywgQXJpYWwsIHNhbnMtc2VyaWY7XG59XG5cbi5idG5wZXJtYXYsIC5idG5wZXJtYXB7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgY29sb3I6ICMyMTM7XG4gIGJvcmRlci1jb2xvcjogIzIxMztcblxufVxuXG5cbmlucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkKyAubGJsUmFkaW97ICBcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgXG59XG5cbiNpbWdCaWdJY28sI2ltZ0JpZ0ljb0FtYXJlbG97XG4gIG1heC13aWR0aDogMzBweDtcblxufSJdfQ== */"] });


/***/ }),

/***/ "tt/2":
/*!*****************************************************************!*\
  !*** ./src/app/modules/curriculum/curriculum-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: CurriculumRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumRoutingModule", function() { return CurriculumRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/guards/auth.guard */ "UTcu");
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ "toza");
/* harmony import */ var src_app_modules_curriculum_curriculum_home_raioxhome_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-home/raioxhome.component */ "Z4OF");
/* harmony import */ var src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-form/curriculum-form.component */ "YtwN");
/* harmony import */ var src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/curriculum/curriculum-profissional-form/curriculum-profissional-form.component */ "7zjW");
/* harmony import */ var _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./curriculum-atributosbig5-form/curriculum-atributosbig5-form.component */ "knmu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: src_app_modules_curriculum_curriculum_home_raioxhome_component__WEBPACK_IMPORTED_MODULE_3__["RaioxhomeComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], resolve: { config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_2__["ConfigResolver"] }, runGuardsAndResolvers: 'always', data: { title: "Home Raio-X" } },
    { path: 'home', component: src_app_modules_curriculum_curriculum_home_raioxhome_component__WEBPACK_IMPORTED_MODULE_3__["RaioxhomeComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], data: { title: "Home Raio-X" } },
    { path: 'pessoal', component: src_app_modules_curriculum_curriculum_form_curriculum_form_component__WEBPACK_IMPORTED_MODULE_4__["CurriculumFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], data: { title: "" } },
    { path: 'profissional', component: src_app_modules_curriculum_curriculum_profissional_form_curriculum_profissional_form_component__WEBPACK_IMPORTED_MODULE_5__["CurriculumProfissionalFormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], data: { title: "Dados Profissionais" } },
    { path: 'big5', component: _curriculum_atributosbig5_form_curriculum_atributosbig5_form_component__WEBPACK_IMPORTED_MODULE_6__["CurriculumAtributosbig5FormComponent"], canActivate: [src_app_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]], data: { title: "Teste BIG 5" } },
];
class CurriculumRoutingModule {
}
CurriculumRoutingModule.ɵfac = function CurriculumRoutingModule_Factory(t) { return new (t || CurriculumRoutingModule)(); };
CurriculumRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: CurriculumRoutingModule });
CurriculumRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](CurriculumRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xCjx":
/*!*******************************************************************************************!*\
  !*** ./src/app/modules/cadastros/curriculum/curriculum-list/curriculum-list.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: CurriculumListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurriculumListComponent", function() { return CurriculumListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class CurriculumListComponent {
    constructor() { }
    ngOnInit() {
    }
}
CurriculumListComponent.ɵfac = function CurriculumListComponent_Factory(t) { return new (t || CurriculumListComponent)(); };
CurriculumListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CurriculumListComponent, selectors: [["app-curriculum-list"]], decls: 2, vars: 0, template: function CurriculumListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "curriculum-list works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXJyaWN1bHVtLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=modules-curriculum-curriculum-module.js.map
"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[865],{

/***/ 66852:
/*!*******************************************!*\
  !*** ./src/app/dao/tenant-dao.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TenantDaoService: () => (/* binding */ TenantDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class TenantDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("Tenant", injector);
    this.injector = injector;
    this.PREFIX_URL = "config";
  }
  cidadesSeeder(item) {
    return new Promise((resolve, reject) => {
      this.server.post('config/' + this.collection + '/cidades', {
        tenant_id: item.id
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
  tiposCapacidadesSeeder(item) {
    return new Promise((resolve, reject) => {
      this.server.post('config/' + this.collection + '/tipo-capacidade', {
        tenant_id: item.id
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
}
_class = TenantDaoService;
_class.ɵfac = function TenantDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 12239:
/*!****************************************!*\
  !*** ./src/app/models/tenant.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tenant: () => (/* binding */ Tenant)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class Tenant extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.tenancy_db_name = ""; /* Nome do banco de dados */
    this.tenancy_db_host = null; /* Endereço do banco de dados */
    this.tenancy_db_port = null; /* Porta do banco de dados */
    this.tenancy_db_username = null; /* Nome do usuário */
    this.tenancy_db_password = null; /* Senha do usuário */
    this.log_traffic = false;
    this.log_changes = false;
    this.log_errors = false;
    this.log_host = null;
    this.log_database = null;
    this.log_port = null;
    this.log_username = null;
    this.log_password = null;
    this.notification_petrvs = true;
    this.notification_mail = false;
    this.notification_mail_signature = "";
    this.notification_mail_host = "";
    this.notification_mail_port = 465;
    this.notification_mail_username = "";
    this.notification_mail_password = "";
    this.notification_mail_encryption = "SSL";
    this.notification_whatsapp = false;
    this.notification_whatsapp_url = "";
    this.notification_whatsapp_token = "";
    this.email = "";
    this.nome_usuario = "";
    this.cpf = "";
    this.apelido = "";
    this.sigla = "";
    this.nome_entidade = "";
    this.abrangencia = "";
    this.codigo_cidade = null;
    this.initialization(data);
  }
}

/***/ }),

/***/ 86516:
/*!******************************************************************!*\
  !*** ./src/app/modules/panel/panel-form/panel-form.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelFormComponent: () => (/* binding */ PanelFormComponent)
/* harmony export */ });
/* harmony import */ var _usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/dao/tenant-dao.service */ 66852);
/* harmony import */ var src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/tenant.model */ 12239);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ 9224);

var _class;











class PanelFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_4__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_3__.Tenant, src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_2__.TenantDaoService);
    this.injector = injector;
    this.encryption = [{
      key: "SSL",
      value: "SSL"
    }, {
      key: "TLS",
      value: "TLS"
    }];
    this.validate = (control, controlName) => {
      let result = null;
      if (['id', 'tenancy_db_name', 'nome_entidade', 'codigo_cidade', 'abrangencia', 'email', 'cpf', 'nome_usuario', 'apelido'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
        result = "Inválido";
      }
      if ((this.form?.controls.log_traffic.value || this.form?.controls.log_changes.value || this.form?.controls.log_errors.value) && ['log_host', 'log_database'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.form = this.fh.FormBuilder({
      id: {
        default: ""
      },
      tenancy_db_name: {
        default: ""
      },
      tenancy_db_host: {
        default: null
      },
      tenancy_db_port: {
        default: null
      },
      tenancy_db_username: {
        default: null
      },
      tenancy_db_password: {
        default: null
      },
      log_traffic: {
        default: false
      },
      log_changes: {
        default: false
      },
      log_errors: {
        default: false
      },
      log_host: {
        default: null
      },
      log_database: {
        default: null
      },
      log_port: {
        default: null
      },
      log_username: {
        default: null
      },
      log_password: {
        default: null
      },
      notification_petrvs: {
        default: true
      },
      notification_mail: {
        default: false
      },
      notification_mail_signature: {
        default: "assets/images/signature.png"
      },
      notification_mail_host: {
        default: ""
      },
      notification_mail_port: {
        default: 465
      },
      notification_mail_username: {
        default: ""
      },
      notification_mail_password: {
        default: ""
      },
      notification_mail_encryption: {
        default: "SSL"
      },
      notification_whatsapp: {
        default: false
      },
      notification_whatsapp_url: {
        default: ""
      },
      notification_whatsapp_token: {
        default: ""
      },
      email: {
        default: ""
      },
      nome_usuario: {
        default: ""
      },
      cpf: {
        default: ""
      },
      apelido: {
        default: ""
      },
      nome_entidade: {
        default: ""
      },
      abrangencia: {
        default: ""
      },
      codigo_cidade: {
        default: null
      }
    }, this.cdRef, this.validate);
  }
  loadData(entity, form) {
    var _this = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      form.patchValue(_this.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    form.patchValue(new src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_3__.Tenant());
  }
  saveData(form) {
    var _this2 = this;
    return (0,_usr_src_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        const entrega = _this2.util.fill(new src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_3__.Tenant(), _this2.entity);
        resolve(_this2.util.fillForm(entrega, _this2.form.value));
      });
    })();
  }
}
_class = PanelFormComponent;
_class.ɵfac = function PanelFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-panel-form"]],
  viewQuery: function PanelFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 61,
  vars: 38,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["title", "Entidade"], [1, "row"], ["label", "SIGLA", "controlName", "id", 3, "size", "disabled"], ["label", "Nome", "controlName", "nome_entidade", 3, "size"], ["label", "Abrang\u00EAncia", "controlName", "abrangencia", 3, "size", "items"], ["label", "Cod. IBGE", "controlName", "codigo_cidade", 3, "size"], ["title", "Banco de dados da aplica\u00E7\u00E3o"], ["label", "Host", "controlName", "tenancy_db_host", 3, "size"], ["label", "Banco de dados", "controlName", "tenancy_db_name", 3, "size"], ["label", "Porta", "controlName", "tenancy_db_port", 3, "size"], ["label", "Usu\u00E1rio", "controlName", "tenancy_db_username", 3, "size"], ["password", "", "label", "Senha", "controlName", "tenancy_db_password", 3, "size"], ["title", "Logs"], [1, "col-md-8"], ["label", "Host", "controlName", "log_host", 3, "size"], ["label", "Banco de dados", "controlName", "log_database", 3, "size"], ["label", "Porta", "controlName", "log_port", 3, "size"], ["label", "Usu\u00E1rio", "controlName", "log_username", 3, "size"], ["password", "", "label", "Senha", "controlName", "log_password", 3, "size"], [1, "col-md-4"], ["title", "Op\u00E7\u00F5es de log"], ["scale", "small", "labelPosition", "right", "label", "Tr\u00E1fego (traffic)", "controlName", "log_traffic", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Auditoria (changes)", "controlName", "log_changes", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Erros (errors)", "controlName", "log_errors", 3, "size"], ["title", "Notifica\u00E7\u00F5es"], [1, "col-md-6"], ["scale", "small", "labelPosition", "right", "label", "Petrvs (Dentro do sistema)", "controlName", "notification_petrvs", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "E-mail", "controlName", "notification_mail", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "WhatsApp", "controlName", "notification_whatsapp", 3, "size"], ["title", "WhatsApp"], ["label", "URL", "controlName", "notification_whatsapp_url", 3, "size"], ["label", "Token", "controlName", "notification_whatsapp_token", 3, "size"], ["title", "E-mail"], ["label", "Imagem assinatura", "controlName", "notification_mail_signature", 3, "size"], ["label", "Host", "controlName", "notification_mail_host", 3, "size"], ["label", "Porta", "controlName", "notification_mail_port", 3, "size"], ["label", "Protocolo", "controlName", "notification_mail_encryption", 3, "size", "items"], ["label", "Usu\u00E1rio", "controlName", "notification_mail_username", 3, "size"], ["password", "", "label", "Senha", "controlName", "notification_mail_password", 3, "size"], ["title", "Super Usu\u00E1rio"], ["label", "Email", "controlName", "email", 3, "size"], ["label", "Nome", "controlName", "nome_usuario", 3, "size"], ["label", "CPF", "controlName", "cpf", 3, "size"], ["label", "Apelido", "controlName", "apelido", 3, "size"]],
  template: function PanelFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function PanelFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PanelFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "separator", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](3, "input-text", 3)(4, "input-text", 4)(5, "input-select", 5)(6, "input-number", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "separator", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "input-text", 8)(10, "input-text", 9)(11, "input-number", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](13, "input-text", 11)(14, "input-text", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "separator", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "div", 2)(17, "div", 14)(18, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](19, "input-text", 15)(20, "input-text", 16)(21, "input-number", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](23, "input-text", 18)(24, "input-text", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](26, "separator", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](28, "input-switch", 22)(29, "input-switch", 23)(30, "input-switch", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](31, "separator", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "div", 2)(33, "div", 26)(34, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](35, "input-switch", 27)(36, "input-switch", 28)(37, "input-switch", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](38, "separator", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](40, "input-text", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](42, "input-text", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](43, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](44, "separator", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](46, "input-text", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](47, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](48, "input-text", 35)(49, "input-number", 36)(50, "input-select", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](52, "input-text", 38)(53, "input-text", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](54, "separator", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](55, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](56, "input-text", 41)(57, "input-text", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](58, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](59, "input-text", 43)(60, "input-text", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2)("disabled", ctx.action == "new" ? undefined : "true");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ABRANGENCIA);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 4)("items", ctx.encryption);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("size", 6);
    }
  },
  dependencies: [src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_5__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_6__.InputTextComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_7__.InputSelectComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_8__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_9__.InputNumberComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 93997:
/*!******************************************************************!*\
  !*** ./src/app/modules/panel/panel-list/panel-list.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelListComponent: () => (/* binding */ PanelListComponent)
/* harmony export */ });
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tenant-dao.service */ 66852);
/* harmony import */ var src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tenant.model */ 12239);
/* harmony import */ var src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/badge/badge.component */ 95489);
var _class;














function PanelListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](row_r6.id);
  }
}
function PanelListComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Dados:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Logs:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
  }
  if (rf & 2) {
    const row_r7 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate3"](" ", row_r7.tenancy_db_host || "[ENV_HOST]", ":", row_r7.tenancy_db_port || "[ENV_PORT]", "/", row_r7.tenancy_db_name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate3"](" ", row_r7.log_host || "[LOG_HOST]", ":", row_r7.log_port || "[LOG_PORT]", "/", (row_r7.log_database == null ? null : row_r7.log_database.length) ? row_r7.log_database : "log_" + row_r7.tenancy_db_name, " ");
  }
}
function PanelListComponent_ng_template_11_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "badge", 13);
  }
}
function PanelListComponent_ng_template_11_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "badge", 14);
  }
}
function PanelListComponent_ng_template_11_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "badge", 15);
  }
}
function PanelListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, PanelListComponent_ng_template_11_badge_0_Template, 1, 0, "badge", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PanelListComponent_ng_template_11_badge_1_Template, 1, 0, "badge", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, PanelListComponent_ng_template_11_badge_2_Template, 1, 0, "badge", 12);
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r8.log_changes);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r8.log_traffic);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", row_r8.log_errors);
  }
}
class PanelListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector, dao) {
    super(injector, src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_2__.Tenant, src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_1__.TenantDaoService);
    this.injector = injector;
    this.filterWhere = filter => {
      let result = [];
      return result;
    };
    /* Inicializações */
    this.title = "Painel Petrvs";
    this.code = "PANEL";
    this.filter = this.fh.FormBuilder({});
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Executar Migrations",
      onClick: this.consult.bind(this)
    });
    this.options.push({
      icon: "bi bi-building",
      label: "Executar Cidades",
      onClick: this.cidadeSeeder.bind(this)
    });
    this.options.push({
      icon: "bi bi-list-check",
      label: "Executar Tipos Capacidades",
      onClick: this.tipoCapacidadeSeeder.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });
  }
  executaMigrationTenant(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente executar as migrations?").then(confirm => {
      if (confirm) {
        this.dao.tiposCapacidadesSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Migration executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  tipoCapacidadeSeeder(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao.tiposCapacidadesSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  cidadeSeeder(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente executar a seeder de cidades?").then(confirm => {
      if (confirm) {
        this.dao.cidadesSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
}
_class = PanelListComponent;
_class.ɵfac = function PanelListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_1__.TenantDaoService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-panel-list"]],
  viewQuery: function PanelListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
  decls: 15,
  vars: 18,
  consts: [["title", "Painel de entidades (SaaS)", 3, "dao", "add", "orderBy", "groupBy", "join", "hasAdd", "hasEdit"], ["hidden", "", 3, "form", "where", "submit", "clear", "collapseChange", "collapsed"], ["title", "ID", 3, "template"], ["columnId", ""], ["title", "Banco de dados", 3, "template"], ["columnDb", ""], ["title", "Logs", "field", "columnLogs"], ["columnLogs", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["color", "light", "label", "Auditoria (Changes)", 4, "ngIf"], ["color", "light", "label", "Tr\u00E1fego (Traffic)", 4, "ngIf"], ["color", "light", "label", "Erros (Errors)", 4, "ngIf"], ["color", "light", "label", "Auditoria (Changes)"], ["color", "light", "label", "Tr\u00E1fego (Traffic)"], ["color", "light", "label", "Erros (Errors)"]],
  template: function PanelListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "grid", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "toolbar")(2, "filter", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "columns")(4, "column", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, PanelListComponent_ng_template_5_Template, 2, 1, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, PanelListComponent_ng_template_8_Template, 7, 6, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, PanelListComponent_ng_template_11_Template, 3, 3, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](13, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](14, "pagination", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](6);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("hasAdd", true)("hasEdit", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("form", ctx.filter)("where", ctx.filterWhere.bind(ctx))("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_4__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_5__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_6__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_7__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_8__.PaginationComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_9__.BadgeComponent],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 10840:
/*!*******************************************************!*\
  !*** ./src/app/modules/panel/panel-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelRoutingModule: () => (/* binding */ PanelRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel-list/panel-list.component */ 93997);
/* harmony import */ var _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel-form/panel-form.component */ 86516);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;






const routes = [{
  path: '',
  component: _panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_1__.PanelListComponent,
  runGuardsAndResolvers: 'always',
  data: {
    title: "Painéis"
  }
}, {
  path: 'new',
  component: _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__.PanelFormComponent,
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Inclusão de Painel",
    modal: true
  }
}, {
  path: ':id/edit',
  component: _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__.PanelFormComponent,
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Edição de Painel",
    modal: true
  }
}, {
  path: ':id/consult',
  component: _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__.PanelFormComponent,
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Painel",
    modal: true
  }
}];
class PanelRoutingModule {}
_class = PanelRoutingModule;
_class.ɵfac = function PanelRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PanelRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 13865:
/*!***********************************************!*\
  !*** ./src/app/modules/panel/panel.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelModule: () => (/* binding */ PanelModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel-list/panel-list.component */ 93997);
/* harmony import */ var _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel-form/panel-form.component */ 86516);
/* harmony import */ var _panel_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel-routing.module */ 10840);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../uteis/uteis.module */ 82509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;







class PanelModule {}
_class = PanelModule;
_class.ɵfac = function PanelModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _panel_routing_module__WEBPACK_IMPORTED_MODULE_2__.PanelRoutingModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__.UteisModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](PanelModule, {
    declarations: [_panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_0__.PanelListComponent, _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_1__.PanelFormComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _panel_routing_module__WEBPACK_IMPORTED_MODULE_2__.PanelRoutingModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_3__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_4__.UteisModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=865.js.map
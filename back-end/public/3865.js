"use strict";
(self["webpackChunkpetrvs"] = self["webpackChunkpetrvs"] || []).push([[3865],{

/***/ 39779:
/*!*******************************************!*\
  !*** ./src/app/dao/seeder-dao.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeederDaoService: () => (/* binding */ SeederDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class SeederDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("Seeder", injector);
    this.injector = injector;
    this.inputSearchConfig.searchFields = ["nome"];
  }
  getAllSeeder() {
    return new Promise((resolve, reject) => {
      this.server.get('api/' + this.collection + '/getAll').subscribe(response => {
        resolve(this.loadSeederDados(response));
      }, error => {
        console.log("Erro ao montar a hierarquia da atividade!", error);
        resolve([]);
      });
    });
  }
  loadSeederDados(response) {
    let dados = response;
    return dados;
  }
  executeSeeder(seederName) {
    return new Promise((resolve, reject) => {
      this.server.post('api/' + this.collection + '/execute', {
        seeder: seederName
      }).subscribe(response => {
        resolve(response || []);
      }, error => reject(error));
    });
  }
}
_class = SeederDaoService;
_class.ɵfac = function SeederDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

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
  generateCertificateKeys() {
    return new Promise((resolve, reject) => {
      this.server.post('config/' + this.collection + '/generate-certificate-keys', {}).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.data);
        }
      }, error => reject(error));
    });
  }
  seeders(item) {
    return new Promise((resolve, reject) => {
      this.server.post('config/' + this.collection + '/seeders', {
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
  migrations(item) {
    return new Promise((resolve, reject) => {
      this.server.post('config/' + this.collection + '/migrations', {
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
  resetDB() {
    return new Promise((resolve, reject) => {
      this.server.get('config/' + this.collection + '/resetdb').subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
  usuarioSeeder(item) {
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
  entidadeSeeder(item) {
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
  databaseSeeder(item) {
    return new Promise((resolve, reject) => {
      this.server.post('config/' + this.collection + '/database', {
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

/***/ 58036:
/*!************************************************!*\
  !*** ./src/app/dao/tenant-logs-dao.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TenantLogsDaoService: () => (/* binding */ TenantLogsDaoService)
/* harmony export */ });
/* harmony import */ var _dao_base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dao-base.service */ 29995);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;


class TenantLogsDaoService extends _dao_base_service__WEBPACK_IMPORTED_MODULE_0__.DaoBaseService {
  constructor(injector) {
    super("TenantLogs", injector);
    this.injector = injector;
    this.PREFIX_URL = "config";
  }
  getAllLogs(tenant_id) {
    return new Promise((resolve, reject) => {
      this.server.post('api/Logs/list', {
        tenant_id: tenant_id ? tenant_id : ''
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          console.log(response.data);
          resolve(response.data);
        }
      }, error => reject(error));
    });
  }
}
_class = TenantLogsDaoService;
_class.ɵfac = function TenantLogsDaoService_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
};
_class.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _class,
  factory: _class.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 57975:
/*!*********************************************!*\
  !*** ./src/app/models/tenant-logs.model.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TenantLogs: () => (/* binding */ TenantLogs)
/* harmony export */ });
/* harmony import */ var _base_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.model */ 64368);

class TenantLogs extends _base_model__WEBPACK_IMPORTED_MODULE_0__.Base {
  constructor(data) {
    super();
    this.id = ""; //Nome da funcao
    this.tenant_id = ""; //Nome da funcao
    this.level = ""; //Nível da funcao
    this.message = ""; //Descrição da funcao
    this.initialization(data);
  }
}

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
  // public petrvs_version //pega a versao do app.json
  // public petrvs_last_migration // nome da ultima migration executada
  // public petrvs_url // nome da ultima migration executada
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
    this.dominio_url = null;
    // LOGIN
    this.login_select_entidade = false;
    this.login_google_client_id = "";
    this.login_firebase_client_id = "";
    this.login_azure_client_id = "";
    this.login_azure_secret = "";
    this.login_azure_redirect_uri = "";
    this.login_login_unico_client_id = "";
    this.login_login_unico_secret = "";
    this.login_google = false;
    this.login_azure = false;
    this.login_login_unico = false;
    // INTEGRACAO
    this.tipo_integracao = "";
    this.integracao_auto_incluir = true;
    this.integracao_cod_unidade_raiz = "";
    this.integracao_siape_url = "";
    this.integracao_siape_upag = "";
    this.integracao_siape_sigla = "";
    this.integracao_siape_nome = "";
    this.integracao_siape_cpf = "";
    this.integracao_siape_senha = "";
    this.integracao_siape_codorgao = "";
    this.integracao_siape_uorg = "";
    this.integracao_siape_existepag = "";
    this.integracao_siape_tipovinculo = "";
    this.integracao_wso2_url = "";
    this.integracao_wso2_unidades = "";
    this.integracao_wso2_pessoas = "";
    this.integracao_wso2_token_url = "";
    this.integracao_wso2_token_authorization = "";
    this.integracao_wso2_token_acesso = "";
    this.integracao_wso2_token_user = "";
    this.integracao_wso2_token_password = "";
    // SEI
    this.modulo_sei_habilitado = false;
    this.modulo_sei_private_key = "";
    this.modulo_sei_public_key = "";
    this.modulo_sei_url = "";
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
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/editable-form/editable-form.component */ 74040);
/* harmony import */ var src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/grid/grid.component */ 73150);
/* harmony import */ var src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/tabs/tabs.component */ 66384);
/* harmony import */ var src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/dao/tenant-dao.service */ 66852);
/* harmony import */ var src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/tenant.model */ 12239);
/* harmony import */ var src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/base/page-form-base */ 1184);
/* harmony import */ var src_app_dao_seeder_dao_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/dao/seeder-dao.service */ 39779);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_input_input_container_input_container_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/input/input-container/input-container.component */ 38544);
/* harmony import */ var _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/input/input-switch/input-switch.component */ 88820);
/* harmony import */ var _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/input/input-text/input-text.component */ 92392);
/* harmony import */ var _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/input/input-textarea/input-textarea.component */ 74508);
/* harmony import */ var _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/input/input-select/input-select.component */ 64603);
/* harmony import */ var _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/tabs/tab/tab.component */ 74978);
/* harmony import */ var _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/separator/separator.component */ 25560);
/* harmony import */ var _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/input/input-number/input-number.component */ 9224);
/* harmony import */ var _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/action-button/action-button.component */ 28032);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 70997);

var _class;





















function PanelFormComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "separator", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](3, "input-text", 87)(4, "input-text", 88)(5, "input-text", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](7, "input-text", 90)(8, "input-text", 91)(9, "input-text", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](11, "input-text", 93)(12, "input-text", 94)(13, "input-select", 95)(14, "input-select", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](15, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](16, "input-text", 97)(17, "input-text", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("items", ctx_r0.lookup.EXISTE_PAGADOR);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("items", ctx_r0.lookup.TIPO_VINCULO);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
  }
}
function PanelFormComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "separator", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](3, "input-text", 100)(4, "input-text", 101)(5, "input-text", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](7, "input-text", 103)(8, "input-text", 104)(9, "input-text", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](11, "input-text", 106)(12, "input-text", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
  }
}
function PanelFormComponent_option_108_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "option", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", s_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](s_r3);
  }
}
class PanelFormComponent extends src_app_modules_base_page_form_base__WEBPACK_IMPORTED_MODULE_6__.PageFormBase {
  constructor(injector) {
    super(injector, src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_5__.Tenant, src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_4__.TenantDaoService);
    this.injector = injector;
    this.seeders = [];
    this.selectedSeeder = '';
    this.encryption = [{
      key: "SSL",
      value: "SSL"
    }, {
      key: "TLS",
      value: "TLS"
    }];
    this.tiposLogin = [{
      Tipo: 'Usuário/Senha',
      Web: '',
      API: '',
      Habilitado: true
    }, {
      Tipo: 'Firebase',
      Web: '',
      API: '',
      Habilitado: true
    }, {
      Tipo: 'Google (GIS)',
      Web: '',
      API: '',
      Habilitado: true
    }, {
      Tipo: 'Microsoft (Azure)',
      Web: '',
      API: '',
      Habilitado: true
    }, {
      Tipo: 'Login único',
      Web: '',
      API: '',
      Habilitado: true
    }, {
      Tipo: 'Institucional',
      Web: '',
      API: '',
      Habilitado: true
    }];
    this.validate = (control, controlName) => {
      let result = null;
      if (['id', 'tenancy_db_name', 'nome_entidade', 'abrangencia', 'email', 'cpf', 'nome_usuario', 'apelido'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      } else if (controlName == "codigo_cidade" && !control.value) {
        result = "Obrigatório";
      } else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
        result = "Inválido";
      }
      if ((this.form?.controls.log_traffic.value || this.form?.controls.log_changes.value || this.form?.controls.log_errors.value) && ['log_host', 'log_database'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      return result;
    };
    this.seederDao = injector.get(src_app_dao_seeder_dao_service__WEBPACK_IMPORTED_MODULE_7__.SeederDaoService);
    this.form = this.fh.FormBuilder({
      id: {
        default: ""
      },
      edition: {
        default: "MGI"
      },
      tenancy_db_name: {
        default: ""
      },
      tenancy_db_host: {
        default: null
      },
      tenancy_db_port: {
        default: 3306
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
        default: 3306
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
        default: 5300108
      },
      login: {
        default: []
      },
      dominio_url: {
        default: window.location.hostname
      },
      // LOGIN
      login_google: {
        default: false
      },
      login_azure: {
        default: false
      },
      login_login_unico: {
        default: false
      },
      login_select_entidade: {
        default: false
      },
      login_google_client_id: {
        default: ""
      },
      login_firebase_client_id: {
        default: ""
      },
      login_azure_client_id: {
        default: ""
      },
      login_azure_secret: {
        default: ""
      },
      login_azure_redirect_uri: {
        default: ""
      },
      login_login_unico_client_id: {
        default: ""
      },
      login_login_unico_secret: {
        default: ""
      },
      // INTEGRACAO
      tipo_integracao: {
        default: null
      },
      integracao_auto_incluir: {
        default: true
      },
      integracao_cod_unidade_raiz: {
        default: ""
      },
      integracao_siape_url: {
        default: ""
      },
      integracao_siape_upag: {
        default: ""
      },
      integracao_siape_sigla: {
        default: ""
      },
      integracao_siape_nome: {
        default: ""
      },
      integracao_siape_cpf: {
        default: ""
      },
      integracao_siape_senha: {
        default: ""
      },
      integracao_siape_codorgao: {
        default: ""
      },
      integracao_siape_uorg: {
        default: ""
      },
      integracao_siape_existepag: {
        default: ""
      },
      integracao_siape_tipovinculo: {
        default: ""
      },
      integracao_wso2_url: {
        default: ""
      },
      integracao_wso2_unidades: {
        default: ""
      },
      integracao_wso2_pessoas: {
        default: ""
      },
      integracao_wso2_token_url: {
        default: ""
      },
      integracao_wso2_token_authorization: {
        default: ""
      },
      integracao_wso2_token_acesso: {
        default: ""
      },
      integracao_wso2_token_user: {
        default: ""
      },
      integracao_wso2_token_password: {
        default: ""
      },
      integracao_siape_usuario_comum: {
        default: "Participante"
      },
      integracao_siape_usuario_chefe: {
        default: "Chefia de Unidade Executora"
      },
      // SEI
      modulo_sei_habilitado: {
        default: false
      },
      modulo_sei_private_key: {
        default: ""
      },
      modulo_sei_public_key: {
        default: ""
      },
      modulo_sei_url: {
        default: ""
      }
    }, this.cdRef, this.validate);
    this.formLogin = this.fh.FormBuilder({
      Tipo: {
        default: ""
      },
      Web: {
        default: ""
      },
      API: {
        default: ""
      },
      Habilitado: {
        default: false
      }
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadSeeders();
  }
  loadSeeders() {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this.seederDao.getAllSeeder();
      if (result) {
        _this.seeders = result;
      }
    })();
  }
  onSeederChange(event) {
    this.selectedSeeder = event.target.value;
  }
  executeSeeder(seeder) {
    if (!this.selectedSeeder) {
      alert('Por favor, selecione um seeder para executar.');
      return;
    }
    this.seederDao.executeSeeder(this.selectedSeeder).then(response => {
      // Verificar se response é um objeto e tem a propriedade 'message'
      if (response && typeof response === 'object' && 'message' in response) {
        this.dialog.alert('Sucesso', String(response?.message));
        console.log('Seeder executado com sucesso:', response);
      } else {
        console.error('Resposta inválida ou sem propriedade "message":', response);
      }
    }, error => {
      console.error('Erro ao executar seeder:', error);
      let errorMessage = error.error && error.error.message ? error.error.message : 'Erro desconhecido';
      alert(errorMessage);
    });
  }
  onSelectTab(tab) {
    var _this2 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.viewInit) _this2.saveUsuarioConfig({
        active_tab: tab.key
      });
    })();
  }
  loadData(entity, form) {
    var _this3 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let formValue = Object.assign({}, form.value);
      let login = _this3.tiposLogin || [];
      formValue.login = login;
      form.patchValue(_this3.util.fillForm(formValue, entity));
    })();
  }
  initializeData(form) {
    var _this4 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.entity = yield _this4.dao.getById(_this4.urlParams.get("id"), _this4.join);
      yield _this4.loadData(_this4.entity, form);
    })();
  }
  saveData(form) {
    var _this5 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        const entrega = _this5.util.fill(new src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_5__.Tenant(), _this5.entity);
        resolve(_this5.util.fillForm(entrega, _this5.form.value));
      });
    })();
  }
  gerarCertificado() {
    var _this6 = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let certificado = yield _this6.dao.generateCertificateKeys();
      _this6.form.controls.modulo_sei_private_key.setValue(certificado.private_key);
      _this6.form.controls.modulo_sei_public_key.setValue(certificado.public_key);
    })();
  }
  copiarPublicKeyClipboard() {
    this.util.copyToClipboard(this.form.controls.modulo_sei_public_key.value);
  }
}
_class = PanelFormComponent;
_class.ɵfac = function PanelFormComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_17__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-panel-form"]],
  viewQuery: function PanelFormComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__.GridComponent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵviewQuery"](src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__.TabsComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.editableForm = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵloadQuery"]()) && (ctx.tabs = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵInheritDefinitionFeature"]],
  decls: 112,
  vars: 97,
  consts: [[3, "form", "disabled", "title", "submit", "cancel"], ["right", "", 3, "title", "select"], ["key", "PRINCIPAL", "label", "Principal"], ["title", "Entidade"], [1, "row"], ["label", "Edi\u00E7\u00E3o", "controlName", "edition", 3, "size", "items"], ["label", "SIGLA", "controlName", "id", 3, "size", "disabled"], ["label", "Nome", "controlName", "nome_entidade", 3, "size"], ["label", "Abrang\u00EAncia", "controlName", "abrangencia", 3, "size", "items"], ["label", "Cod. IBGE", "icon", "bi bi-clock", 3, "size", "control"], ["label", "Dom\u00EDnio", "controlName", "dominio_url", 3, "size"], ["title", "Super Usu\u00E1rio"], ["label", "Email", "controlName", "email", 3, "size"], ["label", "Nome", "controlName", "nome_usuario", 3, "size"], ["label", "CPF", "controlName", "cpf", 3, "size"], ["label", "Apelido", "controlName", "apelido", 3, "size"], ["title", "Notifica\u00E7\u00F5es", "hidden", "true"], ["hidden", "true", 1, "row"], [1, "col-md-6"], ["scale", "small", "labelPosition", "right", "label", "Petrvs (Dentro do sistema)", "controlName", "notification_petrvs", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "E-mail", "controlName", "notification_mail", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "WhatsApp", "controlName", "notification_whatsapp", 3, "size"], ["title", "WhatsApp"], ["label", "URL", "controlName", "notification_whatsapp_url", 3, "size"], ["label", "Token", "controlName", "notification_whatsapp_token", 3, "size"], ["title", "E-mail"], ["label", "Imagem assinatura", "controlName", "notification_mail_signature", 3, "size"], ["label", "Host", "controlName", "notification_mail_host", 3, "size"], ["label", "Porta", "controlName", "notification_mail_port", 3, "size"], ["label", "Protocolo", "controlName", "notification_mail_encryption", 3, "size", "items"], ["label", "Usu\u00E1rio", "controlName", "notification_mail_username", 3, "size"], ["password", "", "label", "Senha", "controlName", "notification_mail_password", 3, "size"], ["key", "BANCO", "label", "Banco de dados"], ["title", "Banco de dados da aplica\u00E7\u00E3o"], ["label", "Host", "controlName", "tenancy_db_host", 3, "size"], ["label", "Banco de dados", "controlName", "tenancy_db_name", 3, "size"], ["label", "Porta", "controlName", "tenancy_db_port", 3, "size"], ["label", "Usu\u00E1rio", "controlName", "tenancy_db_username", 3, "size"], ["password", "", "label", "Senha", "controlName", "tenancy_db_password", 3, "size"], ["title", "Logs"], [1, "col-md-8"], ["label", "Host", "controlName", "log_host", 3, "size"], ["label", "Banco de dados", "controlName", "log_database", 3, "size"], ["label", "Porta", "controlName", "log_port", 3, "size"], ["label", "Usu\u00E1rio", "controlName", "log_username", 3, "size"], ["password", "", "label", "Senha", "controlName", "log_password", 3, "size"], [1, "col-md-4"], ["title", "Op\u00E7\u00F5es de log"], ["scale", "small", "labelPosition", "right", "label", "Tr\u00E1fego (traffic)", "controlName", "log_traffic", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Auditoria (changes)", "controlName", "log_changes", 3, "size"], ["scale", "small", "labelPosition", "right", "label", "Erros (errors)", "controlName", "log_errors", 3, "size"], ["key", "LOGIN", "label", "Login"], ["title", "Google"], ["label", "Google Client ID", "controlName", "login_google_client_id", 3, "size"], ["label", "Firebase Project ID", "controlName", "login_firebase_client_id", 3, "size"], ["scale", "large", "labelPosition", "right", "label", "", "controlName", "login_google", 3, "size"], ["title", "Microsoft"], ["label", "Azure Client ID", "controlName", "login_azure_client_id", 3, "size"], ["label", "Azure Client Secret", "controlName", "login_azure_secret", 3, "size"], ["label", "Azure Redirect URI", "controlName", "login_azure_redirect_uri", 3, "size"], ["scale", "large", "labelPosition", "right", "label", "", "controlName", "login_azure", 3, "size"], ["title", "Login GOVBr"], ["label", "Client ID", "controlName", "login_login_unico_client_id", 3, "size"], ["label", "Secret", "controlName", "login_login_unico_secret", 3, "size"], ["scale", "large", "labelPosition", "right", "label", "", "controlName", "login_login_unico", 3, "size"], ["key", "INTEGRACAO", "label", "Integra\u00E7\u00E3o"], ["label", "Tipo da Integra\u00E7\u00E3o", "controlName", "tipo_integracao", 3, "size", "items"], ["labelPosition", "top", "label", "Auto-incluir", "controlName", "integracao_auto_incluir", 3, "size"], ["label", "Codigo unidade raiz", "controlName", "integracao_cod_unidade_raiz", 3, "size"], ["class", "row", 4, "ngIf"], ["key", "SEI", "label", "M\u00F3dulo SEI"], ["labelPosition", "top", "label", "Habilitado", "controlName", "modulo_sei_habilitado", 3, "size"], ["label", "Url do sei", "controlName", "modulo_sei_url", "labelInfo", "Url completa do SEI incluindo o https://, sem a barra no final", 3, "size"], ["title", "Certificado digital (Comunica\u00E7\u00E3o B2B)"], ["label", "Chave privada", "controlName", "modulo_sei_private_key", 3, "rows", "size"], ["label", "Chave p\u00FAblica", "controlName", "modulo_sei_public_key", 3, "rows", "size"], [1, "col-md-2", "one-per-line"], ["label", "Op\u00E7\u00F5es", "labelInfo", "Utilize os bot\u00F5es abaixo caso deseje gerar o certificado diretamente pelo sistema"], ["fullWidth", "", "label", "Gerar", 3, "onClick"], ["fullWidth", "", "label", "Copiar", 3, "onClick"], ["key", "SEEDERS", "label", "Seeders"], ["label", "Seeders"], ["controlName", "selectedSeeder", 1, "form-control", 3, "change"], [3, "value", 4, "ngFor", "ngForOf"], ["label", "Op\u00E7\u00F5es"], ["fullWidth", "", "label", "Executar", 3, "onClick"], ["title", "Siape-WS", "labeInfo", "As informa\u00E7\u00F5es dessa tela s\u00E3o referentes \u00E0s inseridas no cadastro do SIAPE"], ["label", "URL", "controlName", "integracao_siape_url", 3, "size"], ["label", "Upag", "controlName", "integracao_siape_upag", 3, "size"], ["label", "Sigla do Sistema", "controlName", "integracao_siape_sigla", 3, "size"], ["label", "Nome do Sistema", "controlName", "integracao_siape_nome", 3, "size"], ["label", "CPF", "controlName", "integracao_siape_cpf", 3, "size"], ["label", "Senha", "controlName", "integracao_siape_senha", 3, "size"], ["label", "Codigo do \u00D3rg\u00E3o", "controlName", "integracao_siape_codorgao", 3, "size"], ["label", "Codigo UORG", "controlName", "integracao_siape_uorg", 3, "size"], ["label", "Existe Pagador", "controlName", "integracao_siape_existepag", 3, "size", "items"], ["label", "Tipo de V\u00EDnculo", "controlName", "integracao_siape_tipovinculo", 3, "size", "items"], ["label", "Perfil Usu\u00E1rio Comum", "controlName", "integracao_siape_usuario_comum", 3, "size"], ["label", "Perfil Usu\u00E1rio Chefe", "controlName", "integracao_siape_usuario_chefe", 3, "size"], ["title", "Siape-PRF"], ["label", "URL", "controlName", "integracao_wso2_url", 3, "size"], ["label", "URL Unidades", "controlName", "integracao_wso2_unidades", 3, "size"], ["label", "URL Pessoas", "controlName", "integracao_wso2_pessoas", 3, "size"], ["label", "Token URL", "controlName", "integracao_wso2_token_url", 3, "size"], ["label", "Token AUTHORIZATION", "controlName", "integracao_wso2_token_authorization", 3, "size"], ["label", "Token Acesso", "controlName", "integracao_wso2_token_acesso", 3, "size"], ["label", "Token USER", "controlName", "integracao_wso2_token_user", 3, "size"], ["label", "Token Password", "controlName", "integracao_wso2_token_password", 3, "size"], [3, "value"]],
  template: function PanelFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "editable-form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("submit", function PanelFormComponent_Template_editable_form_submit_0_listener() {
        return ctx.onSaveData();
      })("cancel", function PanelFormComponent_Template_editable_form_cancel_0_listener() {
        return ctx.onCancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "tabs", 1)(2, "tab", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](3, "separator", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](5, "input-select", 5)(6, "input-text", 6)(7, "input-text", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](9, "input-select", 8)(10, "input-number", 9)(11, "input-text", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](12, "separator", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](13, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](14, "input-text", 12)(15, "input-text", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](16, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](17, "input-text", 14)(18, "input-text", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](19, "separator", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](20, "div", 17)(21, "div", 18)(22, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](23, "input-switch", 19)(24, "input-switch", 20)(25, "input-switch", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](26, "separator", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](27, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](28, "input-text", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](29, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](30, "input-text", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](31, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](32, "separator", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](33, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](34, "input-text", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](35, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](36, "input-text", 27)(37, "input-number", 28)(38, "input-select", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](39, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](40, "input-text", 30)(41, "input-text", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](42, "tab", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](43, "separator", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](44, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](45, "input-text", 34)(46, "input-text", 35)(47, "input-number", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](48, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](49, "input-text", 37)(50, "input-text", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](51, "separator", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](52, "div", 4)(53, "div", 40)(54, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](55, "input-text", 41)(56, "input-text", 42)(57, "input-number", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](58, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](59, "input-text", 44)(60, "input-text", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](61, "div", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](62, "separator", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](63, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](64, "input-switch", 48)(65, "input-switch", 49)(66, "input-switch", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](67, "tab", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](68, "separator", 52);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](69, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](70, "input-text", 53)(71, "input-text", 54)(72, "input-switch", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](73, "separator", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](74, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](75, "input-text", 57)(76, "input-text", 58)(77, "input-text", 59)(78, "input-switch", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](79, "separator", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](80, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](81, "input-text", 62)(82, "input-text", 63)(83, "input-switch", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](84, "tab", 65)(85, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](86, "input-select", 66)(87, "input-switch", 67)(88, "input-text", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](89, PanelFormComponent_div_89_Template, 18, 24, "div", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](90, PanelFormComponent_div_90_Template, 13, 12, "div", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](91, "tab", 70)(92, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](93, "input-switch", 71)(94, "input-text", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](95, "separator", 73)(96, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](97, "input-textarea", 74)(98, "input-textarea", 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](99, "div", 76)(100, "input-container", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](101, "action-button", 78)(102, "action-button", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](103, "tab", 80)(104, "div", 4)(105, "div", 40)(106, "input-container", 81)(107, "select", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function PanelFormComponent_Template_select_change_107_listener($event) {
        return ctx.onSeederChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](108, PanelFormComponent_option_108_Template, 2, 2, "option", 83);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](109, "div", 46)(110, "input-container", 84);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](111, "action-button", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("form", ctx.form)("disabled", ctx.formDisabled)("title", ctx.isModal ? "" : ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("title", ctx.isModal ? "" : ctx.title)("select", ctx.onSelectTab.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("items", ctx.lookup.EDICOES);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("disabled", ctx.action == "new" ? undefined : "true");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("items", ctx.lookup.ABRANGENCIA);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3)("control", ctx.form.controls.codigo_cidade);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4)("items", ctx.encryption);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 4)("items", ctx.lookup.TIPO_INTEGRACAO);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵattribute"]("maxlength", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", (ctx.form == null ? null : ctx.form.controls.tipo_integracao.value) == "SIAPE");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", (ctx.form == null ? null : ctx.form.controls == null ? null : ctx.form.controls.tipo_integracao == null ? null : ctx.form.controls.tipo_integracao.value) == "WSO2");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("size", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("rows", 5)("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("rows", 5)("size", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("onClick", ctx.gerarCertificado.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("onClick", ctx.copiarPublicKeyClipboard.bind(ctx));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx.seeders);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("onClick", ctx.executeSeeder.bind(ctx));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, src_app_components_editable_form_editable_form_component__WEBPACK_IMPORTED_MODULE_1__.EditableFormComponent, _components_input_input_container_input_container_component__WEBPACK_IMPORTED_MODULE_8__.InputContainerComponent, _components_input_input_switch_input_switch_component__WEBPACK_IMPORTED_MODULE_9__.InputSwitchComponent, _components_input_input_text_input_text_component__WEBPACK_IMPORTED_MODULE_10__.InputTextComponent, _components_input_input_textarea_input_textarea_component__WEBPACK_IMPORTED_MODULE_11__.InputTextareaComponent, _components_input_input_select_input_select_component__WEBPACK_IMPORTED_MODULE_12__.InputSelectComponent, src_app_components_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__.TabsComponent, _components_tabs_tab_tab_component__WEBPACK_IMPORTED_MODULE_13__.TabComponent, _components_separator_separator_component__WEBPACK_IMPORTED_MODULE_14__.SeparatorComponent, _components_input_input_number_input_number_component__WEBPACK_IMPORTED_MODULE_15__.InputNumberComponent, _components_action_button_action_button_component__WEBPACK_IMPORTED_MODULE_16__.ActionButtonComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵNgSelectMultipleOption"]],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 4083:
/*!****************************************************************************!*\
  !*** ./src/app/modules/panel/panel-list-logs/panel-list-logs.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelListLogsComponent: () => (/* binding */ PanelListLogsComponent)
/* harmony export */ });
/* harmony import */ var _home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 19369);
/* harmony import */ var src_app_dao_tenant_logs_dao_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/dao/tenant-logs-dao.service */ 58036);
/* harmony import */ var src_app_models_tenant_logs_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/tenant-logs.model */ 57975);
/* harmony import */ var _base_page_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../base/page-list-base */ 78509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _components_grid_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/grid/grid.component */ 73150);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);

var _class;







function PanelListLogsComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r6 = ctx.row;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r1.dao.getDateFormatted(row_r6.created_at));
  }
}
function PanelListLogsComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r7 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r7.message);
  }
}
function PanelListLogsComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r8.level);
  }
}
class PanelListLogsComponent extends _base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector) {
    super(injector, src_app_models_tenant_logs_model__WEBPACK_IMPORTED_MODULE_2__.TenantLogs, src_app_dao_tenant_logs_dao_service__WEBPACK_IMPORTED_MODULE_1__.TenantLogsDaoService);
    this.injector = injector;
    this.items = [];
    this.tenantLogsDaoService = injector.get(src_app_dao_tenant_logs_dao_service__WEBPACK_IMPORTED_MODULE_1__.TenantLogsDaoService);
    /* Inicializações */
    this.title = "Painel de Logs Petrvs";
    this.code = "PANEL_LOGS";
    this.filter = this.fh.FormBuilder({});
  }
  ngOnInit() {
    super.ngOnInit();
    this.loadData();
  }
  loadData() {
    var _this = this;
    return (0,_home_marcocoelho_projetos_petrvs_front_end_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let tenat_id = _this.urlParams.get("id");
      const result = yield _this.tenantLogsDaoService.getAllLogs(tenat_id);
      if (result) {
        _this.items = result;
      }
    })();
  }
}
_class = PanelListLogsComponent;
_class.ɵfac = function PanelListLogsComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["panel-list-logs"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
  decls: 11,
  vars: 4,
  consts: [["title", "Painel de entidades (SaaS)", 3, "items"], ["title", "Criado em", 3, "template"], ["columnData", ""], ["title", "Mensagem", 3, "template"], ["columnMensagem", ""], ["title", "Tipo", 3, "template"], ["columnTipo", ""]],
  template: function PanelListLogsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "grid", 0)(1, "columns")(2, "column", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, PanelListLogsComponent_ng_template_3_Template, 2, 1, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "column", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, PanelListLogsComponent_ng_template_6_Template, 2, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "column", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, PanelListLogsComponent_ng_template_9_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](4);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](7);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.items);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("template", _r4);
    }
  },
  dependencies: [_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_4__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent],
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 51197);
/* harmony import */ var _services_auth_panel_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth-panel.service */ 67457);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/grid/columns/columns.component */ 57224);
/* harmony import */ var _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/grid/column/column.component */ 83351);
/* harmony import */ var _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/grid/filter/filter.component */ 57765);
/* harmony import */ var _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/toolbar/toolbar.component */ 45512);
/* harmony import */ var _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/grid/pagination/pagination.component */ 42704);
/* harmony import */ var _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/badge/badge.component */ 95489);
var _class;















function PanelListComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r8 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r8.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r8.dominio_url);
  }
}
function PanelListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Dados:");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "Logs:");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
  }
  if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate3"](" ", row_r9.tenancy_db_host || "[ENV_HOST]", ":", row_r9.tenancy_db_port || "[ENV_PORT]", "/", row_r9.tenancy_db_name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate3"](" ", row_r9.log_host || "[LOG_HOST]", ":", row_r9.log_port || "[LOG_PORT]", "/", (row_r9.log_database == null ? null : row_r9.log_database.length) ? row_r9.log_database : "log_" + row_r9.tenancy_db_name, " ");
  }
}
function PanelListComponent_ng_template_13_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 16);
  }
}
function PanelListComponent_ng_template_13_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 17);
  }
}
function PanelListComponent_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, PanelListComponent_ng_template_13_badge_0_Template, 1, 0, "badge", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PanelListComponent_ng_template_13_badge_1_Template, 1, 0, "badge", 15);
  }
  if (rf & 2) {
    const row_r10 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r10.modulo_sei_habilitado);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r10.tipo_integracao != "NENHUMA");
  }
}
function PanelListComponent_ng_template_16_badge_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 21);
  }
}
function PanelListComponent_ng_template_16_badge_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 22);
  }
}
function PanelListComponent_ng_template_16_badge_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "badge", 23);
  }
}
function PanelListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, PanelListComponent_ng_template_16_badge_0_Template, 1, 0, "badge", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, PanelListComponent_ng_template_16_badge_1_Template, 1, 0, "badge", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, PanelListComponent_ng_template_16_badge_2_Template, 1, 0, "badge", 20);
  }
  if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r13.log_changes);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r13.log_traffic);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r13.log_errors);
  }
}
class PanelListComponent extends src_app_modules_base_page_list_base__WEBPACK_IMPORTED_MODULE_3__.PageListBase {
  constructor(injector, dao, authService) {
    super(injector, src_app_models_tenant_model__WEBPACK_IMPORTED_MODULE_2__.Tenant, src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_1__.TenantDaoService);
    this.injector = injector;
    this.authService = authService;
    this.toolbarButtons = [{
      icon: "bi bi-eye-fill",
      label: "Ver Logs",
      onClick: () => this.go.navigate({
        route: ["panel", "logs2"]
      })
    }, {
      icon: "bi bi-database-add",
      label: "Executar Migrations",
      onClick: this.executaMigrations.bind(this)
    }, {
      icon: "bi bi-database-fill-up",
      label: "Executar Seeders"
    }, {
      icon: "bi bi-database-x",
      label: "Resetar DB",
      disabled: this.gb.ENV === 'production',
      onClick: this.resetDB.bind(this)
    }];
    this.filterWhere = filter => {
      let result = [];
      return result;
    };
    /* Inicializações */
    this.setTitleUser();
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
      onClick: this.executaMigrations.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Excluir",
      onClick: this.delete.bind(this)
    });
    this.options.push({
      icon: "bi bi-trash",
      label: "Ver Logs",
      onClick: tenant => this.go.navigate({
        route: ["panel", tenant.id, "logs"]
      })
    });
  }
  resetDB(row) {
    const self = this;
    this.dialog.confirm("Deseja Resetar o DB?", "Deseja realmente executar o reset?").then(confirm => {
      if (confirm) {
        self.loading = true;
        this.dao.resetDB().then(function () {
          self.loading = false;
          self.dialog.alert("Sucesso", "Executado com sucesso!");
          window.location.reload();
        }).catch(function (error) {
          self.loading = false;
          self.dialog.alert("Erro", "Erro ao executar: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  executaMigrations(row) {
    const self = this;
    this.dialog.confirm("Executar Migration?", "Deseja realmente executar as migrations?").then(confirm => {
      if (confirm) {
        this.dao.migrations(row).then(function () {
          self.dialog.alert("Sucesso", "Migration executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  executaSeeders(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente executar as seeders?").then(confirm => {
      if (confirm) {
        this.dao.seeders(row).then(function () {
          self.dialog.alert("Sucesso", "Migration executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a migration: " + error?.message ? error?.message : 0);
        });
      }
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
  usuariosSeeder(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao.usuarioSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  entidadesSeeder(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao.entidadeSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  databaseSeeder(row) {
    const self = this;
    this.dialog.confirm("Executar Seeder?", "Deseja realmente atualizar as capacidades?").then(confirm => {
      if (confirm) {
        this.dao.entidadeSeeder(row).then(function () {
          self.dialog.alert("Sucesso", "Seeder executada com sucesso!");
        }).catch(function (error) {
          self.dialog.alert("Erro", "Erro ao executar a seeder: " + error?.message ? error?.message : 0);
        });
      }
    });
  }
  setTitleUser() {
    this.authService.detailUser().then(user => {
      this.title = "Bem vindo " + user.nome + " - Voce está em Ambiente " + this.gb.ENV;
    });
  }
}
_class = PanelListComponent;
_class.ɵfac = function PanelListComponent_Factory(t) {
  return new (t || _class)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_dao_tenant_dao_service__WEBPACK_IMPORTED_MODULE_1__.TenantDaoService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_auth_panel_service__WEBPACK_IMPORTED_MODULE_4__.AuthPanelService));
};
_class.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _class,
  selectors: [["app-panel-list"]],
  viewQuery: function PanelListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.grid = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]],
  decls: 20,
  vars: 22,
  consts: [[1, "my-2"], ["title", "Painel de entidades (SaaS)", 3, "dao", "add", "orderBy", "groupBy", "join", "hasAdd", "hasEdit"], [3, "buttons"], ["hidden", "", 3, "deleted", "form", "where", "submit", "clear", "collapseChange", "collapsed"], ["title", "ID", 3, "template"], ["columnId", ""], ["title", "Banco de dados", 3, "template"], ["columnDb", ""], ["title", "Recursos", 3, "template"], ["columnRecursos", ""], ["title", "Logs", "field", "columnLogs"], ["columnLogs", ""], ["type", "options", 3, "onEdit", "options"], [3, "rows"], ["color", "primary", "label", "M\u00F3dulo Sei", 4, "ngIf"], ["color", "primary", "label", "Integra\u00E7\u00E3o SIAPE", 4, "ngIf"], ["color", "primary", "label", "M\u00F3dulo Sei"], ["color", "primary", "label", "Integra\u00E7\u00E3o SIAPE"], ["color", "light", "label", "Auditoria (Changes)", 4, "ngIf"], ["color", "light", "label", "Tr\u00E1fego (Traffic)", 4, "ngIf"], ["color", "light", "label", "Erros (Errors)", 4, "ngIf"], ["color", "light", "label", "Auditoria (Changes)"], ["color", "light", "label", "Tr\u00E1fego (Traffic)"], ["color", "light", "label", "Erros (Errors)"]],
  template: function PanelListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "h3", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "grid", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "toolbar", 2)(4, "filter", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "columns")(6, "column", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, PanelListComponent_ng_template_7_Template, 5, 2, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "column", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, PanelListComponent_ng_template_10_Template, 7, 6, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "column", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, PanelListComponent_ng_template_13_Template, 2, 2, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "column", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, PanelListComponent_ng_template_16_Template, 3, 3, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](18, "column", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](19, "pagination", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](8);
      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](11);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dao", ctx.dao)("add", ctx.add)("orderBy", ctx.orderBy)("groupBy", ctx.groupBy)("join", ctx.join)("hasAdd", true)("hasEdit", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("buttons", ctx.toolbarButtons);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("deleted", ctx.auth.hasPermissionTo("MOD_AUDIT_DEL"))("form", ctx.filter)("where", ctx.filterWhere.bind(ctx))("submit", ctx.filterSubmit.bind(ctx))("clear", ctx.filterClear.bind(ctx))("collapseChange", ctx.filterCollapseChange.bind(ctx))("collapsed", ctx.filterCollapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("template", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("onEdit", ctx.edit)("options", ctx.options);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("rows", ctx.rowsLimit);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, src_app_components_grid_grid_component__WEBPACK_IMPORTED_MODULE_0__.GridComponent, _components_grid_columns_columns_component__WEBPACK_IMPORTED_MODULE_5__.ColumnsComponent, _components_grid_column_column_component__WEBPACK_IMPORTED_MODULE_6__.ColumnComponent, _components_grid_filter_filter_component__WEBPACK_IMPORTED_MODULE_7__.FilterComponent, _components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_8__.ToolbarComponent, _components_grid_pagination_pagination_component__WEBPACK_IMPORTED_MODULE_9__.PaginationComponent, _components_badge_badge_component__WEBPACK_IMPORTED_MODULE_10__.BadgeComponent],
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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 82454);
/* harmony import */ var src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/resolvies/config.resolver */ 2314);
/* harmony import */ var _panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel-list/panel-list.component */ 93997);
/* harmony import */ var _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel-form/panel-form.component */ 86516);
/* harmony import */ var _panel_list_logs_panel_list_logs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panel-list-logs/panel-list-logs.component */ 4083);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51197);
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
}, {
  path: ':id/logs',
  component: _panel_list_logs_panel_list_logs_component__WEBPACK_IMPORTED_MODULE_3__.PanelListLogsComponent,
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Logs",
    modal: true
  }
}, {
  path: 'logs2',
  component: _panel_list_logs_panel_list_logs_component__WEBPACK_IMPORTED_MODULE_3__.PanelListLogsComponent,
  resolve: {
    config: src_app_resolvies_config_resolver__WEBPACK_IMPORTED_MODULE_0__.ConfigResolver
  },
  runGuardsAndResolvers: 'always',
  data: {
    title: "Consulta a Logs",
    modal: true
  }
}];
class PanelRoutingModule {}
_class = PanelRoutingModule;
_class.ɵfac = function PanelRoutingModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](PanelRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 89650);
/* harmony import */ var _panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panel-list/panel-list.component */ 93997);
/* harmony import */ var _panel_login_panel_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel-login/panel-login.component */ 85250);
/* harmony import */ var _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel-form/panel-form.component */ 86516);
/* harmony import */ var _panel_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panel-routing.module */ 10840);
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/components.module */ 10822);
/* harmony import */ var _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../uteis/uteis.module */ 82509);
/* harmony import */ var _panel_list_logs_panel_list_logs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./panel-list-logs/panel-list-logs.component */ 4083);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 70997);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 51197);
var _class;










class PanelModule {}
_class = PanelModule;
_class.ɵfac = function PanelModule_Factory(t) {
  return new (t || _class)();
};
_class.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
  type: _class
});
_class.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _panel_routing_module__WEBPACK_IMPORTED_MODULE_3__.PanelRoutingModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_5__.UteisModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](PanelModule, {
    declarations: [_panel_list_panel_list_component__WEBPACK_IMPORTED_MODULE_0__.PanelListComponent, _panel_login_panel_login_component__WEBPACK_IMPORTED_MODULE_1__.PanelLoginComponent, _panel_form_panel_form_component__WEBPACK_IMPORTED_MODULE_2__.PanelFormComponent, _panel_list_logs_panel_list_logs_component__WEBPACK_IMPORTED_MODULE_6__.PanelListLogsComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _panel_routing_module__WEBPACK_IMPORTED_MODULE_3__.PanelRoutingModule, src_app_components_components_module__WEBPACK_IMPORTED_MODULE_4__.ComponentsModule, _uteis_uteis_module__WEBPACK_IMPORTED_MODULE_5__.UteisModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=3865.js.map
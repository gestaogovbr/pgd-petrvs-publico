import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { TenantDaoService } from 'src/app/dao/tenant-dao.service';
import { Tenant } from 'src/app/models/tenant.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { SeederDaoService } from 'src/app/dao/seeder-dao.service';
import { JobAgendadoDaoService } from 'src/app/dao/job-agendado-dao.service';
let PanelFormComponent = class PanelFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Tenant, TenantDaoService);
        this.injector = injector;
        this.seeders = [];
        this.selectedSeeder = '';
        this.encryption = [
            { key: "SSL", value: "SSL" },
            { key: "TLS", value: "TLS" }
        ];
        this.smtp_encryption = [
            { key: "", value: "Nenhum" },
            { key: "SSL", value: "SSL" },
            { key: "TLS", value: "TLS" }
        ];
        this.tiposLogin = [
            { Tipo: 'Usuário/Senha', Web: '', API: '', Habilitado: true },
            { Tipo: 'Firebase', Web: '', API: '', Habilitado: true },
            { Tipo: 'Google (GIS)', Web: '', API: '', Habilitado: true },
            { Tipo: 'Microsoft (Azure)', Web: '', API: '', Habilitado: true },
            { Tipo: 'Login único', Web: '', API: '', Habilitado: true },
            { Tipo: 'Institucional', Web: '', API: '', Habilitado: true }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            if (['id', 'nome_entidade', 'abrangencia', 'email', 'cpf', 'nome_usuario', 'apelido'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            else if (controlName == "codigo_cidade" && !control.value) {
                result = "Obrigatório";
            }
            else if (controlName == "cpf" && !this.util.validarCPF(control.value)) {
                result = "Inválido";
            }
            return result;
        };
        this.seederDao = injector.get(SeederDaoService);
        this.jobAgendadoDao = injector.get(JobAgendadoDaoService);
        this.form = this.fh.FormBuilder({
            id: { default: "" },
            edition: { default: "MGI" },
            tenancy_db_name: { default: "" },
            tenancy_db_host: { default: null },
            tenancy_db_port: { default: 3306 },
            tenancy_db_username: { default: null },
            tenancy_db_password: { default: null },
            log_traffic: { default: false },
            log_changes: { default: false },
            log_errors: { default: true },
            log_host: { default: null },
            log_database: { default: null },
            log_port: { default: 3306 },
            log_username: { default: null },
            log_password: { default: null },
            notification_petrvs: { default: true },
            notification_mail: { default: false },
            notification_mail_signature: { default: "assets/images/signature.png" },
            notification_mail_host: { default: "" },
            notification_mail_port: { default: 465 },
            notification_mail_username: { default: "" },
            notification_mail_password: { default: "" },
            notification_mail_encryption: { default: "SSL" },
            notification_whatsapp: { default: false },
            notification_whatsapp_url: { default: "" },
            notification_whatsapp_token: { default: "" },
            email: { default: "" },
            nome_usuario: { default: "" },
            cpf: { default: "" },
            apelido: { default: "" },
            nome_entidade: { default: "" },
            abrangencia: { default: "" },
            codigo_cidade: { default: 5300108 },
            login: { default: [] },
            dominio_url: { default: window.location.hostname },
            // LOGIN
            login_google: { default: false },
            login_azure: { default: false },
            login_login_unico: { default: false },
            login_select_entidade: { default: false },
            login_google_client_id: { default: "" },
            login_firebase_client_id: { default: "" },
            login_azure_client_id: { default: "" },
            login_azure_secret: { default: "" },
            login_azure_redirect_uri: { default: "" },
            login_login_unico_client_id: { default: "" },
            login_login_unico_secret: { default: "" },
            login_login_unico_redirect: { default: "" },
            login_login_unico_code_verifier: { default: "" },
            login_login_unico_code_challenge_method: { default: "" },
            login_login_unico_environment: { default: "staging" },
            // INTEGRACAO
            tipo_integracao: { default: null },
            integracao_auto_incluir: { default: true },
            integracao_cod_unidade_raiz: { default: "" },
            integracao_siape_url: { default: "" },
            integracao_siape_upag: { default: "" },
            integracao_siape_sigla: { default: "" },
            integracao_siape_nome: { default: "" },
            integracao_siape_cpf: { default: "" },
            integracao_siape_senha: { default: "" },
            integracao_siape_codorgao: { default: "" },
            integracao_siape_uorg: { default: "" },
            integracao_siape_existepag: { default: "" },
            integracao_siape_tipovinculo: { default: "" },
            integracao_wso2_url: { default: "" },
            integracao_wso2_unidades: { default: "" },
            integracao_wso2_pessoas: { default: "" },
            integracao_wso2_token_url: { default: "" },
            integracao_wso2_token_authorization: { default: "" },
            integracao_wso2_token_acesso: { default: "" },
            integracao_wso2_token_user: { default: "" },
            integracao_wso2_token_password: { default: "" },
            integracao_usuario_comum: { default: "Participante" },
            integracao_usuario_chefe: { default: "Chefia de Unidade Executora" },
            integracao_siape_conectagov_chave: { default: "" },
            integracao_siape_conectagov_senha: { default: "" },
            integracao_siape_conectagov_qtd_max_requisicoes: { default: 10 },
            // SEI
            modulo_sei_habilitado: { default: false },
            modulo_sei_private_key: { default: "" },
            modulo_sei_public_key: { default: "" },
            modulo_sei_url: { default: "" },
            // API
            api_url: { default: "https://api.pgd.gestao.gov.br" },
            api_username: { default: "" },
            api_password: { default: "" },
            api_cod_unidade_autorizadora: { default: "" },
            //SMTP
            smtp_host: { default: "" },
            smtp_port: { default: 465 },
            smtp_user: { default: "" },
            smtp_password: { default: "" },
            smtp_encryption: { default: "" },
        }, this.cdRef, this.validate);
        this.formLogin = this.fh.FormBuilder({
            Tipo: { default: "" },
            Web: { default: "" },
            API: { default: "" },
            SMTP: { default: "" },
            Habilitado: { default: false }
        });
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadSeeders();
    }
    async loadSeeders() {
        const result = await this.seederDao.getAllSeeder();
        if (result) {
            this.seeders = result;
        }
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
            }
            else {
                console.error('Resposta inválida ou sem propriedade "message":', response);
            }
        }, error => {
            console.error('Erro ao executar seeder:', error);
            let errorMessage = error.error && error.error.message ? error.error.message : 'Erro desconhecido';
            alert(errorMessage);
        });
    }
    async onSelectTab(tab) {
        if (this.viewInit)
            this.saveUsuarioConfig({ active_tab: tab.key });
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        let login = this.tiposLogin || [];
        formValue.login = login;
        form.patchValue(this.util.fillForm(formValue, entity));
        this.updateSubdomain();
        form.get('api_password')?.setValue("");
    }
    async initializeData(form) {
        this.entity = (await this.dao.getById(this.urlParams.get("id"), this.join));
        await this.loadData(this.entity, form);
    }
    async saveData(form) {
        return new Promise((resolve, reject) => {
            const entrega = this.util.fill(new Tenant(), this.entity);
            resolve(this.util.fillForm(entrega, this.form.value));
        });
    }
    async gerarCertificado() {
        let certificado = await this.dao.generateCertificateKeys();
        this.form.controls.modulo_sei_private_key.setValue(certificado.private_key);
        this.form.controls.modulo_sei_public_key.setValue(certificado.public_key);
    }
    copiarPublicKeyClipboard() {
        this.util.copyToClipboard(this.form.controls.modulo_sei_public_key.value);
    }
    updateSubdomain() {
        let domain = this.form?.controls.dominio_url?.value || '';
        if (this.form && this.form.controls.login_login_unico_redirect) {
            this.form.controls.login_login_unico_redirect.setValue("https://" + domain + "/login-unico/");
        }
    }
    get apiPasswordPlaceholder() {
        return this.form?.controls['api_username'].value === ''
            ? 'Informe a senha da API'
            : 'Informe para alterar a senha';
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PanelFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], PanelFormComponent.prototype, "grid", void 0);
__decorate([
    ViewChild(TabsComponent, { static: false })
], PanelFormComponent.prototype, "tabs", void 0);
PanelFormComponent = __decorate([
    Component({
        selector: 'app-panel-form',
        templateUrl: './panel-form.component.html',
        styleUrls: ['./panel-form.component.scss'],
        standalone: false
    })
], PanelFormComponent);
export { PanelFormComponent };
//# sourceMappingURL=panel-form.component.js.map
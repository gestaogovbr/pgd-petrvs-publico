import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { IntegracaoDaoService } from 'src/app/dao/integracao-dao.service';
import { Integracao } from 'src/app/models/integracao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { environment } from 'src/environments/environment';
let IntegracaoFormComponent = class IntegracaoFormComponent extends PageFormBase {
    constructor(injector, dao) {
        super(injector, Integracao, IntegracaoDaoService);
        this.injector = injector;
        this.confirmLabel = "Executar";
        this.production = false;
        this.resultado_unidades = '';
        this.obs_unidades = [];
        this.falhas_unidades = [];
        this.resultado_servidores = '';
        this.obs_servidores = [];
        this.falhas_servidores = [];
        this.resultado_gestores = '';
        this.obs_gestores = [];
        this.falhas_gestores = [];
        this.processamentos = {};
        this.validate = (control, controlName) => {
            let result = null;
            if (['entidade_id', 'usuario_id'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            if ((controlName == 'atualizar_unidades' && control.value) && !this.processamentos.siapeDadosUORG) {
                result = "Nada a ser processado!";
            }
            if ((controlName == 'atualizar_servidores' && control.value) && (!this.processamentos.siapeDadosPessoais || !this.processamentos.siapeDadosFuncionais)) {
                result = "Nada a ser processado!";
            }
            return result;
        };
        this.entidadeDao = injector.get(EntidadeDaoService);
        this.form = this.fh.FormBuilder({
            atualizar_unidades: { default: false },
            atualizar_servidores: { default: false },
            atualizar_gestores: { default: true },
            usar_arquivos_locais: { default: false },
            gravar_arquivos_locais: { default: false },
            entidade_id: { default: "" },
            usuario_id: { default: "" },
            data_execucao: { default: "" },
            resultado: { default: "" }
        }, this.cdRef, this.validate);
        this.join = ["entidade", "usuario"];
    }
    loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        form.patchValue(this.util.fillForm(formValue, entity));
        this.preparaFormulario(entity);
    }
    preparaFormulario(entity) {
        this.production = environment.production;
        this.form.controls.entidade_id.setValue(entity.id ? entity.entidade.nome : this.auth.unidade?.entidade_id);
        this.form.controls.usuario_id.setValue(entity.id ? (entity.usuario_id ? entity.usuario.nome : 'Sistema') : this.auth.usuario.id);
        this.resultado_unidades = entity.id ? JSON.parse(entity.resultado).unidades.Resultado : '';
        this.obs_unidades = entity.id ? JSON.parse(entity.resultado).unidades.Observações : [];
        this.falhas_unidades = entity.id ? JSON.parse(entity.resultado).unidades.Falhas : [];
        this.resultado_servidores = entity.id ? JSON.parse(entity.resultado).servidores.Resultado : '';
        this.obs_servidores = entity.id ? JSON.parse(entity.resultado).servidores.Observações : [];
        this.falhas_servidores = entity.id ? JSON.parse(entity.resultado).servidores.Falhas : [];
        this.resultado_gestores = entity.id ? JSON.parse(entity.resultado).gestores.Resultado : '';
        this.obs_gestores = entity.id ? JSON.parse(entity.resultado).gestores.Observações : [];
        this.falhas_gestores = entity.id ? JSON.parse(entity.resultado).gestores.Falhas : [];
    }
    initializeData(form) {
        this.dao.buscaProcessamentosPendentes().then((response) => {
            if (response && response.processamentos) {
                this.processamentos = response.processamentos;
            }
        });
        this.loadData(new Integracao(), form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const integracao = this.util.fill(new Integracao(), this.entity);
            resolve(this.util.fillForm(integracao, this.form.value));
        });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], IntegracaoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('entidade', { static: false })
], IntegracaoFormComponent.prototype, "entidade", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], IntegracaoFormComponent.prototype, "usuario", void 0);
IntegracaoFormComponent = __decorate([
    Component({
        selector: 'app-integracao-form',
        templateUrl: './integracao-form.component.html',
        styleUrls: ['./integracao-form.component.scss'],
        standalone: false
    })
], IntegracaoFormComponent);
export { IntegracaoFormComponent };
//# sourceMappingURL=integracao-form.component.js.map
import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { RelatoDaoService } from 'src/app/dao/relato-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PageBase } from 'src/app/modules/base/page-base';
let RelatoLotacaoFormComponent = class RelatoLotacaoFormComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.mensagemCarregando = "Carregando dados do formulário...";
        this.mensagemSalvando = "Salvando dados do formulário...";
        this.OPTIONS = [
            { key: "1", value: "O agente público mudou de unidade dentro do próprio órgão/entidade e o Petrvs não atualizou sua lotação." },
            { key: "2", value: "O agente público está cedido para outro órgão/entidade e o Petrvs o mantém na base de dados deste órgão/entidade." },
            { key: "3", value: "O agente público está cedido para este órgão/entidade, mas no Petrvs ainda não consta na base de dados." },
            { key: "4", value: "Outros" }
        ];
        this.relatoDao = injector.get(RelatoDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.form = this.fh.FormBuilder({
            opcao: { default: "" },
            usuario_id: { default: "" },
            unidade_id: { default: "" },
            nome: { default: "" },
            cpf: { default: "" },
            matricula: { default: "" },
            descricao: { default: "" },
        });
        this.updateValidators();
    }
    updateValidators() {
        this.form.get('usuario_id')?.clearValidators();
        this.form.get('unidade_id')?.clearValidators();
        this.form.get('nome')?.clearValidators();
        this.form.get('cpf')?.clearValidators();
        this.form.get('matricula')?.clearValidators();
        this.form.get('descricao')?.clearValidators();
        if ((this.form.controls.opcao.value == 1) || (this.form.controls.opcao.value == 2)) {
            this.form.get('usuario_id')?.setValidators(this.requiredValidator.bind(this));
            if (this.form.controls.opcao.value == 1) {
                this.form.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
                this.form.get('descricao')?.setValidators(this.requiredValidator.bind(this));
            }
        }
        else {
            this.form.get('nome')?.setValidators(this.requiredValidator.bind(this));
            this.form.get('cpf')?.setValidators(this.requiredValidator.bind(this));
            this.form.get('matricula')?.setValidators(this.requiredValidator.bind(this));
            if (this.form.controls.opcao.value == 4) {
                this.form.get('descricao')?.setValidators(this.requiredValidator.bind(this));
            }
        }
        this.form.get('usuario_id')?.updateValueAndValidity();
        this.form.get('unidade_id')?.updateValueAndValidity();
    }
    requiredValidator(control) {
        return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
    }
    async onSaveData() {
        this.relatoDao.enviar(this.form.controls.opcao.value, this.form.controls.usuario_id.value, this.form.controls.unidade_id.value, this.form.controls.nome.value, this.form.controls.cpf.value, this.form.controls.matricula.value, this.form.controls.descricao.value).subscribe({
            next: async (result) => {
                await this.dialog.alert('Problema relatado com sucesso', 'Obrigado por relatar este problema');
                this.close();
            },
            error: error => {
                this.editableForm.error = error.error.message ? error.error.message : error;
                console.error('Erro:', error.error);
            }
        });
    }
    onCancel() {
        this.close();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], RelatoLotacaoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], RelatoLotacaoFormComponent.prototype, "usuario", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], RelatoLotacaoFormComponent.prototype, "unidade", void 0);
RelatoLotacaoFormComponent = __decorate([
    Component({
        selector: 'app-relato-lotacao-form',
        templateUrl: './relato-lotacao-form.component.html',
        styleUrls: ['./relato-lotacao-form.component.scss'],
        standalone: false
    })
], RelatoLotacaoFormComponent);
export { RelatoLotacaoFormComponent };
//# sourceMappingURL=relato-lotacao-form.component.js.map
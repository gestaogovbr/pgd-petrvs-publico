import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from '../../base/page-form-base';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
let ConsultaCpfSiapeFormComponent = class ConsultaCpfSiapeFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Usuario, UsuarioDaoService);
        this.injector = injector;
        this.erros = '';
        this.integrantes = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (['cpf'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            ;
            return result;
        };
        this.integranteDao = injector.get(UnidadeIntegranteDaoService);
        this.form = this.fh.FormBuilder({
            cpf: { default: "" },
        }, this.cdRef, this.validate);
    }
    loadData(entity, form) {
        //throw new Error('Method not implemented.');
    }
    initializeData(form) {
        //throw new Error('Method not implemented.');
    }
    saveData(form) {
        throw new Error('Method not implemented.');
    }
    async onClickCPF() {
        if (this.form.valid) {
            this.loading = true;
            this.clearErros();
            try {
                const cpf = this.form.get('cpf')?.value.replace(/\D/g, '');
                const usuarios = await this.dao?.query({ where: [['cpf', '==', cpf]] })
                    .asPromise();
                if (usuarios) {
                    this.usuario = usuarios[0];
                }
                this.integrantes = [];
                if (this.usuario) {
                    const integrantesList = await this.integranteDao.carregarIntegrantes("", this.usuario.id);
                    this.integrantes = integrantesList.integrantes.filter(integrante => integrante.atribuicoes?.length > 0);
                }
                this.dao.consultarSIAPE(cpf)
                    .subscribe(result => {
                    const status = Number(result?.status);
                    const hasResponseStatus = Number.isInteger(status);
                    const isSuccessStatus = !hasResponseStatus || [200, 201].includes(status);
                    if (isSuccessStatus && result?.success) {
                        this.dadosPessoais = result.pessoais;
                        this.dadosFuncionais = result.funcionais;
                        this.loading = false;
                        this.go.navigate({
                            route: ['consultas', 'cpf-siape-result']
                        }, {
                            metadata: {
                                cpf: this.form.get('cpf')?.value,
                                usuario: this.usuario,
                                dadosPessoais: result.pessoais,
                                dadosFuncionais: result.funcionais,
                                integrantes: this.integrantes
                            }
                        });
                        return;
                    }
                    this.loading = false;
                    this.error("Erro ao consultar CPF no SIAPE: " + this.getSiapeErrorMessage(result));
                }, error => {
                    this.loading = false;
                    console.log(error);
                    this.error("Erro ao consultar CPF no SIAPE: " + this.getSiapeErrorMessage(error));
                });
            }
            catch (error) {
                this.loading = false;
                console.log(error);
                this.erros = error;
            }
            finally {
            }
        }
    }
    getSiapeErrorMessage(error) {
        const message = error?.error?.error
            || error?.error?.message
            || error?.message
            || error?.error
            || error;
        if (typeof message === 'string' && message.trim().length) {
            return message;
        }
        const status = error?.status;
        if (typeof status === 'number' && status > 0) {
            return `Falha na consulta (status ${status}).`;
        }
        return 'Falha na consulta.';
    }
    ngOnInit() {
        super.ngOnInit();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ConsultaCpfSiapeFormComponent.prototype, "editableForm", void 0);
ConsultaCpfSiapeFormComponent = __decorate([
    Component({
        selector: 'consulta-cpf-siape-form',
        templateUrl: './consulta-cpf-siape-form.component.html',
        styleUrls: ['./consulta-cpf-siape-form.component.scss'],
        standalone: false
    })
], ConsultaCpfSiapeFormComponent);
export { ConsultaCpfSiapeFormComponent };
//# sourceMappingURL=consulta-cpf-siape-form.component.js.map
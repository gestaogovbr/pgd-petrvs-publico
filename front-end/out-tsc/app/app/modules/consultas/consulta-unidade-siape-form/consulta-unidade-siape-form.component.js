import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFormBase } from '../../base/page-form-base';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
let ConsultaUnidadeSiapeFormComponent = class ConsultaUnidadeSiapeFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Unidade, UnidadeDaoService);
        this.injector = injector;
        this.mensagemSiapeIndisponivel = 'Não foi possível consultar a unidade no SIAPE neste momento. Verifique se o ambiente possui configuração de acesso ao SIAPE ou tente novamente mais tarde.';
        this.integrantes = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (['unidade'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            ;
            return result;
        };
        this.integranteDao = injector.get(UnidadeIntegranteDaoService);
        this.form = this.fh.FormBuilder({
            unidade: { default: "" },
        }, this.cdRef, this.validate);
    }
    async onClickUnidade() {
        if (this.form.valid) {
            this.loading = true;
            this.clearErros();
            try {
                const codigoUnidade = this.form.get('unidade')?.value.replace(/\D/g, '');
                const unidades = await this.dao?.query({
                    where: [['codigo', '==', codigoUnidade]],
                    join: ['gestor.usuario:cpf', 'unidadePai:codigo']
                })
                    .asPromise();
                if (unidades) {
                    this.unidade = unidades[0];
                }
                this.integrantes = [];
                if (this.unidade) {
                    const integrantesList = await this.integranteDao.carregarIntegrantes(this.unidade.id, "");
                    this.integrantes = integrantesList.integrantes.filter(integrante => integrante.atribuicoes?.length > 0);
                }
                const result = await firstValueFrom(this.dao.consultaUnidadeSIAPE(codigoUnidade));
                const status = Number(result?.status);
                const hasResponseStatus = Number.isInteger(status);
                const isSuccessStatus = !hasResponseStatus || [200, 201].includes(status);
                if (isSuccessStatus && result?.success) {
                    this.dados = result.dados;
                    this.go.navigate({
                        route: ['consultas', 'unidade-siape-result']
                    }, {
                        metadata: {
                            codigoUnidade: this.form.get('unidade')?.value,
                            unidade: this.unidade,
                            dados: result.dados,
                            integrantes: this.integrantes
                        }
                    });
                    return;
                }
                this.showSiapeError(result);
            }
            catch (error) {
                console.log(error);
                this.showSiapeError(error);
            }
            finally {
                this.loading = false;
                this.detectChangesIfActive();
            }
        }
    }
    showSiapeError(error) {
        const message = this.getSiapeErrorMessage(error);
        this.error(message);
    }
    detectChangesIfActive() {
        const viewRef = this.cdRef;
        if (!viewRef.destroyed) {
            this.cdRef.detectChanges();
        }
    }
    getSiapeErrorMessage(error) {
        const message = error?.error?.error
            || error?.error?.message
            || error?.message
            || error?.error
            || error;
        if (typeof message === 'string' && message.trim().length) {
            const trimmedMessage = message.trim();
            if (this.isSiapeConfigurationError(trimmedMessage)) {
                return this.mensagemSiapeIndisponivel;
            }
            return trimmedMessage;
        }
        const status = error?.status;
        if (typeof status === 'number' && status > 0) {
            return `Falha na consulta (status ${status}).`;
        }
        return 'Falha na consulta.';
    }
    isSiapeConfigurationError(message) {
        const normalizedMessage = message.toLowerCase();
        return normalizedMessage.includes('curl error')
            || normalizedMessage.includes('url rejected')
            || normalizedMessage.includes('no host part in the url')
            || normalizedMessage.includes('could not resolve host')
            || normalizedMessage.includes('failed to connect');
    }
    loadData(_entity, _form, _action) {
        // throw new Error('Method not implemented.');
    }
    initializeData(_form) {
        // throw new Error('Method not implemented.');
    }
    saveData(_form) {
        throw new Error('Method not implemented.');
    }
    ngOnInit() {
        super.ngOnInit();
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ConsultaUnidadeSiapeFormComponent.prototype, "editableForm", void 0);
ConsultaUnidadeSiapeFormComponent = __decorate([
    Component({
        selector: 'consulta-unidade-siape-form',
        templateUrl: './consulta-unidade-siape-form.component.html',
        styleUrls: ['./consulta-unidade-siape-form.component.scss'],
        standalone: false
    })
], ConsultaUnidadeSiapeFormComponent);
export { ConsultaUnidadeSiapeFormComponent };
//# sourceMappingURL=consulta-unidade-siape-form.component.js.map
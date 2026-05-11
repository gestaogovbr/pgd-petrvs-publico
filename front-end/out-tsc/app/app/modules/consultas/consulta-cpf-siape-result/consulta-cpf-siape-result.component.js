import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from '../../base/page-form-base';
import { firstValueFrom } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
let ConsultaCpfSiapeResultComponent = class ConsultaCpfSiapeResultComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Usuario, UsuarioDaoService);
        this.injector = injector;
        this.usuarios = [];
        this.erros = '';
        this.log = '';
        this.cpf = null;
        this.integrantes = [];
        this.toolbarButtons = [
            {
                label: "Baixar Dados",
                icon: "bi bi-download",
                onClick: async () => {
                    let error = undefined;
                    this.loading = true;
                    try {
                        const response = await firstValueFrom(this.dao.exportarCPFSIAPE(this.cpf));
                        const contentType = response.type;
                        const dataCriacao = new Date().toISOString().slice(0, 10);
                        const extensoes = {
                            'application/xml': 'xml',
                            'text/plain': 'txt',
                            'application/zip': 'zip',
                        };
                        const extensao = extensoes[contentType] ?? (console.warn('Tipo de conteúdo inesperado:', contentType), 'txt');
                        const nomeArquivo = `dados_cpf_${this.cpf}_${dataCriacao}.${extensao}`;
                        const blob = new Blob([response], { type: contentType });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = nomeArquivo;
                        link.click();
                        window.URL.revokeObjectURL(url);
                        this.loading = false;
                    }
                    catch (error) {
                        this.erros = error;
                    }
                    finally {
                        this.loading = false;
                    }
                }
            },
            {
                label: "Ver relatório da carga",
                icon: "bi bi-clipboard-data",
                color: "btn-outline-info",
                dynamicVisible: () => !!this.ultimoRelatorioCargaId,
                onClick: () => this.abrirRelatorioCarga()
            },
            {
                label: "Processar",
                icon: "bi bi-gear",
                onClick: async () => {
                    let error = undefined;
                    let confirm = await this.dialog.confirm("ATENÇÃO", "CONFIRMA A SINCRONIZAÇÃO DO USUÁRIO?");
                    if (confirm) {
                        this.loading = true;
                        this.log = 'Processando...';
                        try {
                            this.dao.sincronizarSIAPE(this.cpf)
                                .subscribe(async (result) => {
                                this.loading = false;
                                this.ultimoRelatorioCargaId = result?.relatorio_carga_id ?? result?.relatorio_carga?.id ?? this.ultimoRelatorioCargaId;
                                if (result?.success) {
                                    await this.loadUsuario();
                                    if (result.resumo) {
                                        await this.mostrarResumo(result.resumo, result.message, this.ultimoRelatorioCargaId);
                                    }
                                    else {
                                        await this.dialog.alert("Sucesso", result.message);
                                    }
                                    this.log = result.log;
                                }
                                else {
                                    if (result?.resumo) {
                                        await this.mostrarResumo(result.resumo, "Erro ao processar CPF: " + result?.message, this.ultimoRelatorioCargaId);
                                    }
                                    else {
                                        await this.dialog.alert("Erro", "Erro ao processar CPF: " + result?.message);
                                    }
                                }
                                this.downloadSiape();
                            }, error => {
                                this.loading = false;
                                const result = error.error;
                                this.ultimoRelatorioCargaId = result?.relatorio_carga_id ?? result?.relatorio_carga?.id ?? this.ultimoRelatorioCargaId;
                                if (result?.resumo) {
                                    this.mostrarResumo(result.resumo, "Erro ao processar CPF: " + (result.message ?? error.message), this.ultimoRelatorioCargaId);
                                }
                                else {
                                    this.dialog.alert("Erro", "Erro ao processar CPF: " + (result?.message ?? error.message));
                                }
                                this.log = result?.log ?? error.message;
                            });
                        }
                        catch (error) {
                            this.loading = false;
                            console.log(error);
                            this.erros = error;
                        }
                    }
                }
            }
        ];
        this.validate = (control, controlName) => {
            let result = null;
            if (['cpf'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            ;
            return result;
        };
        this.dialog = this.injector.get(DialogService);
        this.integranteDao = injector.get(UnidadeIntegranteDaoService);
    }
    loadData(entity, form) {
    }
    initializeData(form) {
        //throw new Error('Method not implemented.');
    }
    saveData(form) {
        throw new Error('Method not implemented.');
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.metadata?.cpf) {
            this.cpf = this.metadata?.cpf;
            this.title = 'Dados do CPF: ' + this.cpf;
        }
        if (this.metadata?.usuario) {
            this.usuarios = Array.isArray(this.metadata?.usuario) ? this.metadata?.usuario : [this.metadata?.usuario];
        }
        if (this.metadata?.dadosPessoais) {
            this.dadosPessoais = this.metadata?.dadosPessoais;
        }
        if (this.metadata?.dadosFuncionais) {
            this.dadosFuncionais = this.metadata?.dadosFuncionais;
        }
        if (this.metadata?.integrantes) {
            this.integrantes = this.metadata?.integrantes;
        }
        if (this.cpf) {
            this.loadUsuario();
        }
    }
    async downloadSiape() {
        this.loading = true;
        try {
            const response = await firstValueFrom(this.dao.baixaLogSiape(this.cpf));
            const contentType = response.type;
            const dataCriacao = new Date().toISOString().slice(0, 10);
            const extensoes = {
                'application/xml': 'xml',
                'text/plain': 'txt',
                'application/zip': 'zip',
            };
            const extensao = extensoes[contentType] ?? (console.warn('Tipo de conteúdo inesperado:', contentType), 'txt');
            const nomeArquivo = `log_cpf_${this.cpf}_${dataCriacao}.${extensao}`;
            const blob = new Blob([response], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = nomeArquivo;
            link.click();
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            this.erros = error;
        }
        finally {
            this.loading = false;
        }
    }
    getIntegrantesByUsuario(usuarioId) {
        return this.integrantes.filter(integrante => integrante.usuario_id === usuarioId);
    }
    async loadUsuario() {
        this.loading = true;
        try {
            const cpf = this.cpf?.replace(/\D/g, '');
            const usuarios = await this.dao.query({ where: [['cpf', '==', cpf]] }).getAll();
            this.usuarios = usuarios ?? [];
            this.integrantes = [];
            for (const usuario of this.usuarios) {
                const integrantesList = await this.integranteDao.carregarIntegrantes("", usuario.id);
                const integrantesUsuario = integrantesList.integrantes.filter(integrante => integrante.atribuicoes?.length > 0);
                this.integrantes.push(...integrantesUsuario);
            }
        }
        finally {
            this.loading = false;
        }
    }
    async mostrarResumo(resumo, titulo, relatorioCargaId) {
        if (!Array.isArray(resumo)) {
            this.dialog.alert(titulo, 'Resumo inválido');
            return;
        }
        if (this.resumoTpl) {
            if (resumo.some(item => item.status === 'parcial') && titulo.toLowerCase().includes('sucesso')) {
                titulo = 'Parcial';
            }
            const buttons = relatorioCargaId
                ? [
                    { label: "Ver relatório da carga", color: "btn-primary", value: "relatorio" },
                    { label: "Ok", color: "btn-outline-secondary", value: true }
                ]
                : [{ label: "Ok", color: "btn-primary", value: true }];
            const dialogResult = await this.dialog.template({ title: titulo, modalWidth: 700 }, this.resumoTpl, buttons, { resumo: resumo })
                .asPromise();
            if (dialogResult?.button?.value === "relatorio" && relatorioCargaId) {
                dialogResult.dialog.close();
                this.abrirRelatorioCarga(relatorioCargaId);
                return;
            }
            if (dialogResult?.button?.label === "Ok" && dialogResult?.dialog) {
                dialogResult.dialog.close();
            }
        }
        else {
            // Fallback in case template is not loaded for some reason
            let msg = '';
            resumo.forEach((item, index) => {
                msg += `Usuario ${index + 1}:\n`;
                msg += `Status: ${item.status}\n`;
                msg += `Mensagem: ${item.mensagem}\n`;
                msg += `Existia: ${item.usuario_existia ? 'Sim' : 'Não'}\n`;
                msg += `Inserido: ${item.usuario_inserido ? 'Sim' : 'Não'}\n`;
                msg += `Lotação Associada: ${item.lotacao_associada ? 'Sim' : 'Não'}\n`;
                if (item.alteracoes && item.alteracoes.length > 0) {
                    msg += `Alterações: ${item.alteracoes.join(', ')}\n`;
                }
                msg += '\n';
            });
            await this.dialog.alert(titulo, msg);
        }
    }
    abrirRelatorioCarga(relatorioCargaId = this.ultimoRelatorioCargaId ?? '') {
        if (!relatorioCargaId)
            return;
        this.go.navigate({ route: ['relatorios', 'carga-individual-siape'], params: { id: relatorioCargaId } }, { metadata: { relatorioId: relatorioCargaId } });
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ConsultaCpfSiapeResultComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('resumoTpl')
], ConsultaCpfSiapeResultComponent.prototype, "resumoTpl", void 0);
ConsultaCpfSiapeResultComponent = __decorate([
    Component({
        selector: 'consulta-cpf-siape-result',
        templateUrl: './consulta-cpf-siape-result.component.html',
        styleUrls: ['./consulta-cpf-siape-result.component.scss'],
        standalone: false
    })
], ConsultaCpfSiapeResultComponent);
export { ConsultaCpfSiapeResultComponent };
//# sourceMappingURL=consulta-cpf-siape-result.component.js.map
import { __decorate } from "tslib";
import { Component, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let UnidadeListGridComponent = class UnidadeListGridComponent extends PageListBase {
    constructor(injector) {
        super(injector, Unidade, UnidadeDaoService);
        this.injector = injector;
        this.selectable = false;
        this.buttons = [];
        this.filterWhere = (filter) => {
            let form = filter.value;
            let result = [];
            /* Se for selectable trás somente os inativos ou os não inativos, se não for então trás juntamente os inativos se form.inativos */
            result.push(this.selectable ? ["data_inativacao", form.inativos ? "!=" : "==", null] : ["inativos", "==", form.inativos]);
            if (form.entidade_id?.length)
                result.push(["entidade_id", "==", form.entidade_id]);
            if (form.nome?.length)
                result.push(["or", ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
            if (form.instituidora)
                result.push(["instituidora", "==", 1]);
            if (form.apenas_chefiadas)
                result.push(["apenas_chefiadas", "==", 1]);
            if (this.unidade_pai) {
                result.push(["unidade_pai", "==", this.unidade_pai]);
            }
            if (this.unidades && this.unidades.length) {
                result.push(["id", "in", this.unidades]);
            }
            return result;
        };
        this.validateJustificativa = (control, controlName) => {
            let result = null;
            if (controlName == 'justificativa' && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.join = ["cidade", "unidade_pai:id,sigla", "entidade:id,sigla", "gestor.usuario:id", "gestores_substitutos.usuario:id"];
        this.cidadeDao = injector.get(CidadeDaoService);
        this.entidadeDao = injector.get(EntidadeDaoService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.justificativaForm = this.fh.FormBuilder({
            unidade_id: { default: "" },
            justificativa: { default: "" }
        });
        /* Inicializações */
        this.code = "MOD_CFG_UND";
        this.filter = this.fh.FormBuilder({
            entidade_id: { default: this.auth.unidade?.entidade_id },
            inativos: { default: false },
            instituidora: { default: false },
            apenas_chefiadas: { default: false },
            nome: { default: "" },
            tem_chefe_titular: { default: false },
            tem_chefe_substituto: { default: false }
        });
        this.groupBy = [{ field: "entidade.sigla", label: "Entidade" }];
        // Testa se o usuário possui permissão unificar unidade
        if (this.auth.hasPermissionTo("MOD_UND_UNIR")) {
            this.buttons.push({
                icon: "bi bi-arrows-collapse",
                color: "btn-outline-danger",
                label: "Unificar",
                onClick: (unidade) => this.go.navigate({ route: ['logs', 'unidade', 'merge'] }, this.modalRefresh())
            });
        }
        this.addOption(this.OPTION_INFORMACOES, "MOD_UND");
        this.addOption(this.OPTION_EXCLUIR, "MOD_UND_EXCL");
        this.addOption(this.OPTION_LOGS);
    }
    dynamicOptions(row) {
        let result = [];
        let unidade = row;
        // Testa se o usuário logado possui permissão de inativar a unidade do grid
        if (this.auth.hasPermissionTo("MOD_UND_INATV"))
            result.push({ icon: unidade.data_inativacao ? "bi bi-check-circle" : "bi bi-x-circle", label: unidade.data_inativacao ? 'Reativar' : 'Inativar', onClick: async (unidade) => await this.inativo(unidade, !unidade.data_inativacao) });
        // Testa se o usuário logado possui permissão para ativar temporariamente uma unidade inativa
        if (this.auth.hasPermissionTo("MOD_UND_EDT") && unidade.data_inativacao)
            result.push({ icon: "bi bi-clock-history", label: 'Ativar temporariamente', onClick: (unidade) => this.abrirFormAtivar(unidade) });
        // Testa se o usuário logado possui permissão para gerenciar integrantes da unidade do grid
        if (this.auth.hasPermissionTo("MOD_UND_INTG"))
            result.push({ label: "Integrantes", icon: "bi bi-people", onClick: (unidade) => this.go.navigate({ route: ['configuracoes', 'unidade', '', unidade.id, 'integrante'] }, { metadata: { unidade: row } }) });
        return result;
    }
    async inativo(unidade, inativo) {
        if (await this.dialog.confirm(inativo ? "Inativar" : "Reativar", inativo ? "Deseja realmente inativar essa unidade (" + unidade.nome + ")?" : "Deseja reativar essa unidade (" + unidade.nome + ")?")) {
            try {
                this.submitting = true;
                await this.dao.inativar(unidade.id, inativo);
                await this.modalRefreshId(unidade).modalClose(undefined);
            }
            finally {
                this.submitting = false;
            }
        }
    }
    filterClear(filter) {
        super.filterClear(filter);
    }
    get labelInfoInativas() {
        return this.selectable ? 'Se lista só as unidades inativas' : 'Se lista também as unidades inativas';
    }
    temChefeTitular(row) {
        return !(row.gestor == null);
    }
    temChefeSubstituta(row) {
        return row.gestores_substitutos?.length > 0;
    }
    isAtivo(row) {
        const inativacao = row?.data_inativacao;
        return inativacao === null || inativacao === undefined || inativacao === "";
    }
    isAtivoTemporario(row) {
        const inativacao = row?.data_inativacao;
        const ativacaoTemp = row?.data_ativacao_temporaria;
        const hasAtivacaoTemp = ativacaoTemp !== null && ativacaoTemp !== undefined && ativacaoTemp !== "";
        return (inativacao === null || inativacao === undefined || inativacao === "") && hasAtivacaoTemp;
    }
    getSituacaoHint(row) {
        if (this.isAtivoTemporario(row))
            return "Ativo Temporário";
        if (this.isAtivo(row))
            return "Ativo";
        return "Inativo";
    }
    getSituacaoColor(row) {
        if (this.isAtivoTemporario(row))
            return "info";
        if (this.isAtivo(row))
            return "success";
        return "danger";
    }
    getSituacaoIcon(row) {
        if (this.isAtivoTemporario(row))
            return "bi bi-clock-history";
        if (this.isAtivo(row))
            return "bi bi-check-circle";
        return "bi bi-x-circle";
    }
    abrirFormAtivar(unidade) {
        this.justificativaForm.controls.unidade_id.setValue(unidade.id);
        if (this.justificativaDialog) {
            this.dialog.template({ title: "Ativar temporariamente" }, this.justificativaDialog, [], null);
        }
    }
    onCancel() {
        this.justificativaForm.reset();
    }
    onSubmit() {
        const justificativa = this.justificativaForm.controls.justificativa.value?.trim();
        if (!justificativa?.length) {
            this.dialog.alert("Atenção", "Informe a justificativa.");
            return;
        }
        this.dialog.confirm("Confirmação", "Ao confirmar, a unidade poderá ser utilizada no sistema durante 30 dias. Deseja continuar?").then((confirm) => {
            if (confirm) {
                const ativo = this.dao.ativarTemporariamente(this.justificativaForm.controls.unidade_id.value, justificativa);
                ativo.then(() => {
                    this.dialog.alert("Sucesso", "Unidade ativada temporariamente.");
                    this.justificativaForm.reset();
                    this.cdRef.detectChanges();
                });
                ativo.finally(() => {
                    this.dialog.closeAll();
                    this.refresh();
                });
            }
        });
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], UnidadeListGridComponent.prototype, "grid", void 0);
__decorate([
    ViewChild("justificativaDialog", { static: false })
], UnidadeListGridComponent.prototype, "justificativaDialog", void 0);
__decorate([
    Input()
], UnidadeListGridComponent.prototype, "selectable", void 0);
__decorate([
    Input()
], UnidadeListGridComponent.prototype, "snapshot", void 0);
__decorate([
    Input()
], UnidadeListGridComponent.prototype, "unidade_pai", void 0);
__decorate([
    Input()
], UnidadeListGridComponent.prototype, "unidades", void 0);
__decorate([
    ViewChild('instituidora', { static: false })
], UnidadeListGridComponent.prototype, "instituidora", void 0);
__decorate([
    ViewChild('apenas_chefiadas', { static: false })
], UnidadeListGridComponent.prototype, "apenas_chefiadas", void 0);
UnidadeListGridComponent = __decorate([
    Component({
        selector: 'unidade-list-grid',
        templateUrl: './unidade-list-grid.component.html',
        styleUrls: ['./unidade-list-grid.component.scss'],
        standalone: false
    })
], UnidadeListGridComponent);
export { UnidadeListGridComponent };
//# sourceMappingURL=unidade-list-grid.component.js.map
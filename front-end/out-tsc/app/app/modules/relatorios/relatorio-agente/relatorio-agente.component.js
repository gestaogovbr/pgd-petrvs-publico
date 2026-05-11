import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { RelatorioAgenteDaoService } from "src/app/dao/relatorio-agente-dao.service";
import { RelatorioAgente } from "src/app/models/relatorio-agente.model";
import { PerfilDaoService } from "src/app/dao/perfil-dao.service";
import { of } from "rxjs";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { ModalidadePgdService } from "src/app/services/modalidade-pgd.service";
let RelatorioAgenteComponent = class RelatorioAgenteComponent extends RelatorioBaseComponent {
    constructor(injector, dao) {
        super(injector, RelatorioAgente, RelatorioAgenteDaoService);
        this.injector = injector;
        this.permissao = 'MOD_RELATORIO_USUARIO';
        this.botoes = [];
        this.tiposModalidade = [];
        this.tiposSituacao = [];
        this.perfis = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (form.unidade_id?.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.incluir_unidades_subordinadas) {
                result.push(["incluir_unidades_subordinadas", "==", 1]);
            }
            if (form.nome) {
                result.push(["nome", "like", "%" + form.nome + "%"]);
            }
            if (form.unidadeNome) {
                result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
            }
            if (form.matricula?.length) {
                result.push(["matricula", "like", "%" + form.matricula + "%"]);
            }
            if (form.jornada?.length) {
                result.push(["jornada", "==", form.jornada]);
            }
            if (form.perfil_id?.length) {
                result.push(["perfil_id", "==", form.perfil_id]);
            }
            if (form.situacao?.length) {
                result.push(["situacao", "==", form.situacao]);
            }
            if (form.selecao?.length) {
                result.push(["programaNome", "like", "%" + form.selecao + "%"]);
            }
            if (form.modalidade?.length) {
                result.push(["modalidade_pgd", "==", form.modalidade]);
            }
            if (form.modalidadeSouGov?.length) {
                result.push(["modalidadeSouGov", "==", form.modalidadeSouGov]);
            }
            if (form.comparacaoSouGovPetrvs?.length) {
                result.push(["comparacaoSouGovPetrvs", "==", form.comparacaoSouGovPetrvs]);
            }
            if (form.tipo_pedagio?.length) {
                result.push(["tipo_pedagio", "==", form.tipo_pedagio]);
            }
            if (form.data_inicial_pedagio) {
                result.push(["data_inicial_pedagio", "==", form.data_inicial_pedagio.toISOString().slice(0, 10)]);
            }
            if (form.data_final_pedagio) {
                result.push(["data_final_pedagio", "==", form.data_final_pedagio.toISOString().slice(0, 10)]);
            }
            if (this.metadata?.atribuicao) {
                result.push(["atribuicao", "==", this.metadata.atribuicao]);
            }
            return result;
        };
        this.onButtonFilterClick = (filter) => {
            let form = filter.value;
            let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
            if (this.filter.valid) {
                if (this.grid && this.grid.query) {
                    this.loaded = true;
                }
                this.grid?.query?.reload(queryOptions);
            }
            else {
                this.filter.markAllAsTouched();
            }
        };
        this.exportExcel = (form, queryOptions) => {
            this.loading = true;
            try {
                return this.dao.exportarXls({
                    where: queryOptions.where,
                    orderBy: queryOptions.orderBy
                });
            }
            catch (error) {
                this.error(error);
            }
            finally {
                this.loading = false;
            }
            return of(null);
        };
        this.perfilDao = injector.get(PerfilDaoService);
        this.tiposModalidade = injector.get(ModalidadePgdService).items;
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: this.auth.unidade?.id },
            incluir_unidades_subordinadas: { default: false },
            exportar: { default: false },
            id: { default: "" },
            nome: { default: "" },
            unidadeNome: { default: "" },
            status: { default: "" },
            matricula: { default: "" },
            jornada: { default: "" },
            perfil_id: { default: "" },
            situacao: { default: "" },
            selecao: { default: "" },
            lotado: { default: this.metadata?.lotado ?? "" },
            modalidade: { default: "" },
            modalidadeSouGov: { default: "" },
            comparacaoSouGovPetrvs: { default: "" },
            tipo_pedagio: { default: "" },
            data_inicial_pedagio: { default: "" },
            data_final_pedagio: { default: "" }
        });
        this.filter.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
        this.filter.get('unidade_id')?.updateValueAndValidity();
        this.orderBy = [['unidadeHierarquia', 'asc'], ['nome', 'asc']];
        this.rowsLimit = 10;
    }
    async ngOnInit() {
        super.ngOnInit();
        if (this.metadata?.unidade_id) {
            this.filter?.controls.unidade_id.setValue(this.metadata?.unidade_id);
            this.saveUsuarioConfig();
        }
        this.perfilDao.query().asPromise().then(perfis => {
            this.perfis = this.lookup.map(perfis, 'id', 'nome')
                .map(item => ({
                key: item.key,
                value: item.value.replace('Perfil ', '')
            })); // Remove a palavra 'Perfil' dos perfis
        });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loaded = true;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], RelatorioAgenteComponent.prototype, "grid", void 0);
RelatorioAgenteComponent = __decorate([
    Component({
        selector: 'relatorio-agente',
        templateUrl: './relatorio-agente.component.html',
        styleUrls: ['./relatorio-agente.component.scss'],
        standalone: false
    })
], RelatorioAgenteComponent);
export { RelatorioAgenteComponent };
//# sourceMappingURL=relatorio-agente.component.js.map
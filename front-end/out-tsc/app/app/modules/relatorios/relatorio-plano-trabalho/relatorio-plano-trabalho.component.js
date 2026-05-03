import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { RelatorioPlanoTrabalhoDaoService } from "src/app/dao/relatorio-plano-trabalho-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { RelatorioPlanoTrabalho } from "src/app/models/relatorio-plano-trabalho.model";
import moment from 'moment';
import { RelatorioPlanoTrabalhoDetalhadoDaoService } from "src/app/dao/relatorio-plano-trabalho-detalhado-dao.service";
import { TipoAvaliacaoNotaDaoService } from "src/app/dao/tipo-avaliacao-nota-dao.service";
import { of } from 'rxjs';
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { ModalidadePgdService } from "src/app/services/modalidade-pgd.service";
let RelatorioPlanoTrabalhoComponent = class RelatorioPlanoTrabalhoComponent extends RelatorioBaseComponent {
    constructor(injector, dao) {
        super(injector, RelatorioPlanoTrabalho, RelatorioPlanoTrabalhoDaoService);
        this.injector = injector;
        this.permissao = 'MOD_RELATORIO_PT';
        this.botoes = [];
        this.resumido = true;
        this.tiposModalidade = [];
        this.tiposNotas = [];
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            this.resumido = !form.incluir_periodos_avaliativos;
            if (form.unidade_id?.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.data_inicio) {
                result.push(["dataInicio", ">=", form.data_inicio.toISOString().slice(0, 10)]);
            }
            if (form.data_fim) {
                result.push(["dataFim", "<=", form.data_fim.toISOString().slice(0, 10)]);
            }
            if (form.periodo_inicio) {
                result.push(["periodoInicio", ">=", form.periodo_inicio.toISOString().slice(0, 10)]);
            }
            if (form.periodo_fim) {
                result.push(["periodoFim", "<=", form.periodo_fim.toISOString().slice(0, 10)]);
            }
            if (form.somente_vigentes) {
                result.push(["somente_vigentes", "==", 1]);
            }
            if (form.incluir_periodos_avaliativos) {
                result.push(["incluir_periodos_avaliativos", "==", 1]);
            }
            if (form.incluir_unidades_subordinadas) {
                result.push(["incluir_unidades_subordinadas", "==", 1]);
            }
            if (form.id) {
                result.push(["numero", "like", "%" + form.id + "%"]);
            }
            if (form.participanteNome) {
                result.push(["participanteNome", "like", "%" + form.participanteNome + "%"]);
            }
            if (form.unidadeNome) {
                result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
            }
            if (form.chd) {
                result.push(["chd", "==", form.chd]);
            }
            if (form.status) {
                result.push(["status", "==", form.status]);
            }
            if (form.modalidade) {
                result.push(["modalidade_pgd", "==", form.modalidade]);
            }
            if (form.nota) {
                result.push(["nota", "==", form.nota]);
            }
            if (form.duracao) {
                result.push(["duracao", "==", form.duracao]);
            }
            if (this.resumido && form.qtdePeriodosAvaliativos) {
                result.push(["qtdePeriodosAvaliativos", "==", form.qtdePeriodosAvaliativos]);
            }
            if (!this.resumido) {
                if (form.nota_reavaliacao) {
                    result.push(["nota_reavaliacao", "==", form.nota_reavaliacao]);
                }
                if (form.situacao_avaliacao) {
                    result.push(["situacao_avaliacao", "==", form.situacao_avaliacao]);
                }
                if (form.situacao_execucao) {
                    result.push(["situacao_execucao", "==", form.situacao_execucao]);
                }
                if (form.data_inicio_avaliativo) {
                    result.push(["data_inicio_avaliativo", ">=", form.data_inicio_avaliativo.toISOString().slice(0, 10)]);
                }
                if (form.data_fim_avaliativo) {
                    result.push(["data_fim_avaliativo", "<=", form.data_fim_avaliativo.toISOString().slice(0, 10)]);
                }
                if (form.data_recurso) {
                    result.push(["data_recurso", "==", form.data_recurso.toISOString().slice(0, 10)]);
                }
                if (form.data_avaliacao) {
                    result.push(["data_avaliacao", "==", form.data_avaliacao.toISOString().slice(0, 10)]);
                }
                if (form.data_reavaliacao) {
                    result.push(["data_reavaliacao", "==", form.data_reavaliacao.toISOString().slice(0, 10)]);
                }
                if (form.data_conclusao) {
                    result.push(["data_conclusao", "==", form.data_conclusao.toISOString().slice(0, 10)]);
                }
            }
            return result;
        };
        this.onButtonFilterClick = (filter) => {
            let form = filter.value;
            let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
            this.resumido = !form.incluir_periodos_avaliativos;
            if (this.filter.valid) {
                if (this.grid && this.grid.query) {
                    this.cdRef.detectChanges();
                    this.loaded = false;
                    this.grid.loadColumns();
                    this.loaded = true;
                    if (!form.incluir_periodos_avaliativos) {
                        this.grid.query.collection = 'Relatorio/planos-trabalho';
                    }
                    else {
                        this.grid.query.collection = 'Relatorio/planos-trabalho-detalhado';
                    }
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
                return this.dao.exportarXls(!form.incluir_periodos_avaliativos, {
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
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.tiposModalidade = injector.get(ModalidadePgdService).items;
        this.tipoAvaliacaoNotaDao = injector.get(TipoAvaliacaoNotaDaoService);
        this.relatorioPlanoTrabalhoDao = injector.get(RelatorioPlanoTrabalhoDaoService);
        this.relatorioPlanoTrabalhoDetalhadoDao = injector.get(RelatorioPlanoTrabalhoDetalhadoDaoService);
        this.title = "Relatório de Planos de Trabalho";
        this.filter = this.fh.FormBuilder({
            unidade_id: { default: this.auth.unidade?.id },
            agrupar: { default: true },
            data_inicio: { default: "" },
            data_fim: { default: "" },
            periodo_inicio: { default: "" },
            periodo_fim: { default: "" },
            somente_vigentes: { default: false },
            incluir_periodos_avaliativos: { default: false },
            incluir_unidades_subordinadas: { default: false },
            exportar: { default: false },
            id: { default: "" },
            participanteNome: { default: "" },
            unidadeNome: { default: "" },
            chd: { default: "" },
            status: { default: "" },
            modalidade: { default: "" },
            duracao: { default: "" },
            qtdePeriodosAvaliativos: { default: "" },
            data_inicio_avaliativo: { default: "" },
            data_fim_avaliativo: { default: "" },
            data_conclusao: { default: "" },
            situacao_execucao: { default: "" },
            data_avaliacao: { default: "" },
            nota: { default: "" },
            situacao_avaliacao: { default: "" },
            data_recurso: { default: "" },
            data_reavaliacao: { default: "" },
            nota_reavaliacao: { default: "" },
        });
        this.filter.get('unidade_id')?.setValidators([
            this.lotacaoValidator.bind(this),
            this.requiredValidator.bind(this)
        ]);
        this.filter.get('unidade_id')?.updateValueAndValidity();
        this.filter.get('data_fim')?.setValidators(this.periodoValidator.bind(this));
        this.filter.get('data_fim')?.updateValueAndValidity();
        this.orderBy = [['unidadeHierarquia', 'asc'], ['numero', 'asc']];
    }
    periodoValidator(control) {
        const dataInicio = this.filter?.get('data_inicio')?.value;
        const dataFim = new Date(control.value);
        return dataFim < dataInicio ? { errorMessage: "deve ser maior que a data inicial" } : null;
    }
    async ngOnInit() {
        super.ngOnInit();
        this.tipoAvaliacaoNotaDao.query({ orderBy: [['sequencia', 'asc']] })
            .asPromise().then(notas => {
            const sanitizeNotas = notas.map(nota => ({
                id: nota.nota,
                nota: nota.nota.replaceAll('"', '')
            }))
                .filter((item, index, self) => index === self.findIndex(t => t.nota === item.nota));
            this.tiposNotas = this.lookup.map(sanitizeNotas, 'id', 'nota');
        });
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loaded = true;
    }
    getDuracao(row) {
        if (row.dataInicio && row.dataFim) {
            const start = moment(row.dataInicio, 'YYYY-MM-DD');
            const end = moment(row.dataFim, 'YYYY-MM-DD');
            const duration = end.diff(start, 'days') + 1;
            return duration;
        }
        return 0;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], RelatorioPlanoTrabalhoComponent.prototype, "grid", void 0);
RelatorioPlanoTrabalhoComponent = __decorate([
    Component({
        selector: 'relatorio-plano-trabalho',
        templateUrl: './relatorio-plano-trabalho.component.html',
        styleUrls: ['./relatorio-plano-trabalho.component.scss'],
        standalone: false
    })
], RelatorioPlanoTrabalhoComponent);
export { RelatorioPlanoTrabalhoComponent };
//# sourceMappingURL=relatorio-plano-trabalho.component.js.map
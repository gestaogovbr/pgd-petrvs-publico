import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar-types";
import { RelatorioPlanoEntregaDaoService } from "src/app/dao/relatorio-plano-entrega-dao.service";
import { RelatorioGeracaoDaoService } from "src/app/dao/relatorio-geracao-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { RelatorioPlanoEntrega } from "src/app/models/relatorio-plano-entrega.model";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { TipoAvaliacaoNotaDaoService } from "src/app/dao/tipo-avaliacao-nota-dao.service";
import { of } from "rxjs";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";

@Component({
    selector: 'relatorio-plano-entrega',
    templateUrl: './relatorio-plano-entrega.component.html',
    styleUrls: [
        '../relatorio-base/relatorio-base.component.scss',
        './relatorio-plano-entrega.component.scss'
    ],
    standalone: false
})
export class RelatorioPlanoEntregaComponent extends RelatorioBaseComponent<RelatorioPlanoEntrega, RelatorioPlanoEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public tipoAvaliacaoNotaDao: TipoAvaliacaoNotaDaoService;
  public relatorioGeracaoDao: RelatorioGeracaoDaoService;
  public botoes: ToolbarButton[] = [];
  public tiposNotas: LookupItem[] = [];
  public permissao: string = 'MOD_RELATORIO_PE';

  constructor(public injector: Injector, dao: RelatorioPlanoEntregaDaoService) {
      super(injector, RelatorioPlanoEntrega, RelatorioPlanoEntregaDaoService);
      this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.tipoAvaliacaoNotaDao = injector.get<TipoAvaliacaoNotaDaoService>(TipoAvaliacaoNotaDaoService);
      this.relatorioGeracaoDao = injector.get<RelatorioGeracaoDaoService>(RelatorioGeracaoDaoService);
      this.title = "Relatório de Planos de Entrega";
      this.filter = this.fh.FormBuilder({
          unidade_id: { default: this.auth.unidade?.id },
          agrupar: { default: true },
          data_inicio: { default: "" },
          data_fim: { default: "" },
          periodo_inicio: { default: "" },
          periodo_fim: { default: "" },
          incluir_unidades_subordinadas: { default: false },
          exportar: { default: false },
          somente_vigentes: { default: false },
          id: { default: "" },
          nome: { default: "" },
          unidadeNome: { default: "" },
          status: { default: "" },
          duracao: { default: ""},
          data_conclusao: { default: "" },
          data_avaliacao: { default: "" },
          nota: { default: "" },
          situacao_avaliacao: { default: "" },
          situacao_conclusao: { default: "" },
          homologacao: { default: "" },
          entregaNome: { default: "" },
        });

      
      this.filter!.get('unidade_id')?.setValidators([
        this.lotacaoValidator.bind(this),
        this.requiredValidator.bind(this)
      ]);

      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.orderBy = [['unidadeHierarquia', 'asc'], ['numero', 'asc']];

      this.loadFilterParams = (params: any, filter?: any) => {
        const parsed = { ...params };
        if (parsed.periodo_inicio && typeof parsed.periodo_inicio === 'string') {
          parsed.periodo_inicio = new Date(parsed.periodo_inicio + 'T00:00:00');
        }
        if (parsed.periodo_fim && typeof parsed.periodo_fim === 'string') {
          parsed.periodo_fim = new Date(parsed.periodo_fim + 'T00:00:00');
        }
        if (parsed.incluir_unidades_subordinadas === 'true' || parsed.incluir_unidades_subordinadas === '1') {
          parsed.incluir_unidades_subordinadas = true;
        }
        if (parsed.somente_vigentes === 'true' || parsed.somente_vigentes === '1') {
          parsed.somente_vigentes = true;
        }
        filter?.patchValue(parsed, { emitEvent: true });
      };
  }

  public async ngOnInit() {
      super.ngOnInit();

      this.tipoAvaliacaoNotaDao.query({ orderBy: [['sequencia', 'asc']] })
          .asPromise().then(notas => {
              const sanitizeNotas = notas.map(nota => ({
              id: nota.nota,
              nota: nota.nota.replaceAll('"', '')
              }))
              .filter((item, index, self) =>
              index === self.findIndex(t => t.nota === item.nota)
              );
              this.tiposNotas = this.lookup.map(sanitizeNotas, 'id', 'nota');
          });
  }

  public ngAfterViewInit(): void {
      super.ngAfterViewInit();
      this.loaded = true;
  }

  public buildFilters(filter: FormGroup): Record<string, unknown> {
    const form: any = filter.value;
    const filters: Record<string, unknown> = {};

    if (form.unidade_id?.length) {
      filters['unidade_id'] = form.unidade_id;
    }
    if (form.data_inicio) {
      filters['dataInicio'] = form.data_inicio.toISOString().slice(0, 10);
    }
    if (form.data_fim) {
      filters['dataFim'] = form.data_fim.toISOString().slice(0, 10);
    }
    if (form.periodo_inicio) {
      filters['periodoInicio'] = form.periodo_inicio.toISOString().slice(0, 10);
    }
    if (form.periodo_fim) {
      filters['periodoFim'] = form.periodo_fim.toISOString().slice(0, 10);
    }
    if (form.somente_vigentes) {
      filters['somente_vigentes'] = true;
    }
    if (form.incluir_unidades_subordinadas) {
      filters['incluir_unidades_subordinadas'] = true;
    }
    if (form.id) {
      filters['numero'] = form.id;
    }
    if (form.entregaNome) {
      filters['entregaNome'] = form.entregaNome;
    }
    if (form.unidadeNome) {
      filters['unidadeHierarquia'] = form.unidadeNome;
    }
    if (form.status) {
      filters['status'] = form.status;
    }
    if (form.nota) {
      filters['nota'] = form.nota;
    }
    if (form.duracao) {
      filters['duracao'] = form.duracao;
    }
    if (form.situacao_avaliacao) {
      filters['situacao_avaliacao'] = form.situacao_avaliacao;
    }
    if (form.situacao_conclusao) {
      filters['situacao_conclusao'] = form.situacao_conclusao;
    }
    if (form.data_avaliacao) {
      filters['data_avaliacao'] = form.data_avaliacao.toISOString().slice(0, 10);
    }
    if (form.data_conclusao) {
      filters['data_conclusao'] = form.data_conclusao.toISOString().slice(0, 10);
    }

    return filters;
  }

  public buildQueryOptions(filter: FormGroup): QueryOptions {
    return {
      filters: this.buildFilters(filter),
      where: [],
      orderBy: this.orderBy,
      limit: this.rowsLimit,
    };
  }

  public onButtonFilterClick = (filter: FormGroup) => {
    if (this.filter!.valid) {
      if (this.grid && this.grid.query) {
        this.loaded = true;
      }
      this.grid?.query?.reload(this.buildQueryOptions(filter));
    } else {
      this.filter!.markAllAsTouched();
    }
  }

  public exportExcel = (form: any, queryOptions: QueryOptions) => {
    try {
      return this.relatorioGeracaoDao.solicitar('plano_entrega', {
        filters: this.buildFilters(this.filter!),
        orderBy: queryOptions.orderBy || this.orderBy,
      });
    } catch (error: any) {
      this.error(error);
    }

    return of(null);
  }

  public getDataHomologacao(row: any): string {

    let retorno = this.dao!.getDateFormatted(row.data_homologacao) || '';
    if (row.status === 'ATIVO' || row.status === 'CONCLUIDO' || row.status === 'AVALIADO' || row.status === 'SUSPENSO') {
      if (retorno === '') {
        return 'Dispensado';
      }
    }
    return retorno;
  }
}
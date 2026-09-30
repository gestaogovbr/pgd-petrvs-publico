import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar-types";
import { RelatorioAgenteDaoService } from "src/app/dao/relatorio-agente-dao.service";
import { RelatorioGeracaoDaoService } from "src/app/dao/relatorio-geracao-dao.service";
import { RelatorioAgente } from "src/app/models/relatorio-agente.model";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { of } from "rxjs";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";
import { ModalidadePgdService } from "src/app/services/modalidade-pgd.service";

@Component({
    selector: 'relatorio-agente',
    templateUrl: './relatorio-agente.component.html',
    styleUrls: [
        '../relatorio-base/relatorio-base.component.scss',
        './relatorio-agente.component.scss'
    ],
    standalone: false
})
export class RelatorioAgenteComponent extends RelatorioBaseComponent<RelatorioAgente, RelatorioAgenteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public permissao: string = 'MOD_RELATORIO_USUARIO';
  public relatorioGeracaoDao: RelatorioGeracaoDaoService;
  public botoes: ToolbarButton[] = [];
  public tiposModalidade: LookupItem[] = [];

  constructor(public injector: Injector, dao: RelatorioAgenteDaoService) {
      super(injector, RelatorioAgente, RelatorioAgenteDaoService);
      this.tiposModalidade = injector.get<ModalidadePgdService>(ModalidadePgdService).items;
      this.relatorioGeracaoDao = injector.get<RelatorioGeracaoDaoService>(RelatorioGeracaoDaoService);

      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        id: { default: "" },
        nome: { default: "" },
        unidadeNome: { default: "" },
        matricula: { default: "" },
        situacao: { default: "" },
        participantePGD: { default: "" },
        selecao: { default: "" },
        modalidade: { default: "" },
        modalidadeSouGov: { default: "" },
        comparacaoSouGovPetrvs: { default: "" },
        tipo_pedagio: { default: "" },
        data_inicial_pedagio: { default: "" },
        data_final_pedagio: { default: "" },
        dispensa_plano_trabalho: { default: "" },
        data_inicio_dispensa_pt: { default: "" },
        data_fim_dispensa_pt: { default: "" }
      });

      this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.orderBy = [['unidadeHierarquia', 'asc'], ['nome', 'asc']];
      this.rowsLimit = 10;
  }

  public async ngOnInit() {
      super.ngOnInit();

      if(this.metadata?.unidade_id) {
        this.filter?.controls.unidade_id.setValue(this.metadata?.unidade_id);
        this.saveUsuarioConfig();
      }
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
    if (form.incluir_unidades_subordinadas) {
      filters['incluir_unidades_subordinadas'] = true;
    }
    if (form.nome) {
      filters['nome'] = form.nome;
    }
    if (form.unidadeNome) {
      filters['unidadeHierarquia'] = form.unidadeNome;
    }
    if (form.matricula?.length) {
      filters['matricula'] = form.matricula;
    }
    if (form.situacao?.length) {
      filters['situacao'] = form.situacao;
    }
    if (form.participantePGD?.length) {
      filters['participantePGD'] = form.participantePGD;
    }
    if (form.selecao?.length) {
      filters['programaNome'] = form.selecao;
    }
    if (form.modalidade?.length) {
      filters['modalidade_pgd'] = form.modalidade;
    }
    if (form.modalidadeSouGov?.length) {
      filters['modalidadeSouGov'] = form.modalidadeSouGov;
    }
    if (form.comparacaoSouGovPetrvs?.length) {
      filters['comparacaoSouGovPetrvs'] = form.comparacaoSouGovPetrvs;
    }
    if (form.tipo_pedagio?.length) {
      filters['tipo_pedagio'] = form.tipo_pedagio;
    }
    if (form.data_inicial_pedagio) {
      filters['data_inicial_pedagio'] = form.data_inicial_pedagio.toISOString().slice(0, 10);
    }
    if (form.data_final_pedagio) {
      filters['data_final_pedagio'] = form.data_final_pedagio.toISOString().slice(0, 10);
    }
    if (form.dispensa_plano_trabalho?.length) {
      filters['dispensa_plano_trabalho'] = form.dispensa_plano_trabalho;
    }
    if (form.data_inicio_dispensa_pt) {
      filters['data_inicio_dispensa_pt'] = form.data_inicio_dispensa_pt.toISOString().slice(0, 10);
    }
    if (form.data_fim_dispensa_pt) {
      filters['data_fim_dispensa_pt'] = form.data_fim_dispensa_pt.toISOString().slice(0, 10);
    }
    if (this.metadata?.atribuicao) {
      filters['atribuicao'] = this.metadata.atribuicao;
    }
    if (this.metadata?.plano_entrega_entrega_id) {
      filters['plano_entrega_entrega_id'] = this.metadata.plano_entrega_entrega_id;
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
      return this.relatorioGeracaoDao.solicitar('agente', {
        filters: this.buildFilters(this.filter!),
        orderBy: queryOptions.orderBy || this.orderBy,
      });
    } catch (error: any) {
      this.error(error);
    }

    return of(null);
  }
}

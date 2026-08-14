import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar-types";
import { RelatorioAgenteDaoService } from "src/app/dao/relatorio-agente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
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
  public botoes: ToolbarButton[] = [];
  public tiposModalidade: LookupItem[] = [];

  constructor(public injector: Injector, dao: RelatorioAgenteDaoService) {
      super(injector, RelatorioAgente, RelatorioAgenteDaoService);
      this.tiposModalidade = injector.get<ModalidadePgdService>(ModalidadePgdService).items;

      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        id: { default: "" },
        nome: { default: "" },
        unidadeNome: { default: "" },
        matricula: { default: "" },
        situacao: { default: "" },
        selecao: { default: "" },
        modalidade: { default: "" },
        modalidadeSouGov: { default: "" },
        comparacaoSouGovPetrvs: { default: "" },
        tipo_pedagio: { default: "" },
        data_inicial_pedagio: { default: "" },
        data_final_pedagio: { default: "" }
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

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

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
      result.push(["data_inicial_pedagio", "==", form.data_inicial_pedagio.toISOString().slice(0,10)]);
    }

    if (form.data_final_pedagio) {
      result.push(["data_final_pedagio", "==", form.data_final_pedagio.toISOString().slice(0,10)]);
    }

    if (this.metadata?.atribuicao) {
      result.push(["atribuicao", "==", this.metadata.atribuicao]);
    }
    
    return result;
  };

  public onButtonFilterClick = (filter: FormGroup) => {
    if (this.filter!.valid) {
      if (this.grid && this.grid.query) {
        this.loaded = true;
      }
      let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
      this.grid?.query?.reload(queryOptions);
    } else {
      this.filter!.markAllAsTouched(); 
    }
  }

  public exportExcel = (form: any, queryOptions: QueryOptions) => {
    try {
      return this.dao!.exportarXls({
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      });
    } catch (error: any) {
      this.error(error);
    }

    return of(null);
  }
}

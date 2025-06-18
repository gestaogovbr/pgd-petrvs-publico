import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { RelatorioPlanoTrabalhoDaoService } from "src/app/dao/relatorio-plano-trabalho-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { RelatorioPlanoTrabalho } from "src/app/models/relatorio-plano-trabalho.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import moment from 'moment';
import { firstValueFrom } from "rxjs";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { RelatorioPlanoTrabalhoDetalhadoDaoService } from "src/app/dao/relatorio-plano-trabalho-detalhado-dao.service";

@Component({
  selector: 'relatorio-plano-trabalho',
  templateUrl: './relatorio-plano-trabalho.component.html',
  styleUrls: ['./relatorio-plano-trabalho.component.scss']
})
export class RelatorioPlanoTrabalhoComponent extends PageListBase<RelatorioPlanoTrabalho, RelatorioPlanoTrabalhoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public relatorioPlanoTrabalhoDao: RelatorioPlanoTrabalhoDaoService;
  public relatorioPlanoTrabalhoDetalhadoDao: RelatorioPlanoTrabalhoDetalhadoDaoService;
  public botoes: ToolbarButton[] = [];
  public unidadeId: string = '';
  public resumido: boolean = true;

  constructor(public injector: Injector, dao: RelatorioPlanoTrabalhoDaoService) {
    super(injector, RelatorioPlanoTrabalho, RelatorioPlanoTrabalhoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.relatorioPlanoTrabalhoDao = injector.get<RelatorioPlanoTrabalhoDaoService>(RelatorioPlanoTrabalhoDaoService);
    this.relatorioPlanoTrabalhoDetalhadoDao = injector.get<RelatorioPlanoTrabalhoDetalhadoDaoService>(RelatorioPlanoTrabalhoDetalhadoDaoService);
    this.title = "Relatório de Planos de Trabalho";
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: this.auth.unidade?.id },
      agrupar: { default: true },
      data_inicio: { default: "" },
      data_fim: { default: "" },
      somente_vigentes: { default: false },
      incluir_periodos_avaliativos: { default: false },
      incluir_unidades_subordinadas: { default: false },
      exportar: { default: false }
    });
  
    this.orderBy = [['unidadeHierarquia', 'asc'], ['numero', 'asc']];
  }

  public async ngOnInit() {
    super.ngOnInit();
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if (
      (agrupar && !this.groupBy?.length) ||
      (!agrupar && this.groupBy?.length)
    ) {
      this.groupBy = agrupar
        ? [{ field: "unidade.sigla", label: "Unidade" }]
        : [];
      this.grid!.reloadFilter();
    }    
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }

    if (form.data_inicio) {
      result.push(["dataInicio", ">=", form.data_inicio]);
    }

    if (form.data_fim) {
      result.push(["dataFim", "<=", form.data_fim]);
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
    
    return result;
  };

  public onFilterClear() {
    this.filter?.reset()
    this.grid!.reloadFilter();
    this.cdRef.markForCheck();
  }

  public getDuracao(row: RelatorioPlanoTrabalho): number {
    if (row.dataInicio && row.dataFim) {
      const start = moment(row.dataInicio, 'YYYY-MM-DD');
      const end = moment(row.dataFim, 'YYYY-MM-DD');
      const duration = end.diff(start, 'days') + 1;
      return duration;
    }
    return 0;
  }

  public onButtonFilterClick = (filter: FormGroup) => {
    let form: any = filter.value;
    let queryOptions = this.grid?.queryOptions || this.queryOptions || {};
    this.resumido = !form.incluir_periodos_avaliativos;
    
    if (this.grid && this.grid.query) {
      this.cdRef.detectChanges();
      this.grid.loadColumns();
      
      if (!form.incluir_periodos_avaliativos){
        this.grid.query.collection = 'Relatorio/planos-trabalho';
      } else {
        this.grid.query.collection = 'Relatorio/planos-trabalho-detalhado';         }
    }

    if (form?.exportar) {
      this.downloadXls(queryOptions);
    } else {
      this.grid?.query?.reload(queryOptions);
    }
  }

  public async downloadCsv(queryOptions: QueryOptions){
    let error: any = undefined;
    this.loading = true;
    try {
      this.dao!.exportarCsv(this.resumido, {
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio-plano-trabalho.csv';
        link.click();
        window.URL.revokeObjectURL(url);
      });

      this.loading = false;
    } catch (error: any) {
      this.error(error);
    } finally {
      this.loading = false;
    }
  }

  public async downloadXls(queryOptions: QueryOptions){
    let error: any = undefined;
    this.loading = true;
    try {
      this.dao!.exportarXls(this.resumido, {
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      }).subscribe(res => {

        if (res && res.body) {
          const blob = new Blob([res.body!], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'relatorio-planos-trabalho.xlsx';
          link.click();
          window.URL.revokeObjectURL(url);
        }
      }, error => {
        this.dialog.alert('Erro ao gerar Excel', 'Houve um erro ao tentar baixar o arquivo');
        console.log(error);
        this.error(error);
      });

      this.loading = false;
    } catch (error: any) {
      this.error(error);
    } finally {
      this.loading = false;
    }
  }

}
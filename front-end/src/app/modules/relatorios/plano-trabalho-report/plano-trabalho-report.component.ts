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

@Component({
  selector: 'plano-trabalho-report',
  templateUrl: './plano-trabalho-report.component.html',
  styleUrls: ['./plano-trabalho-report.component.scss']
})
export class PlanoTrabalhoReportComponent extends PageListBase<RelatorioPlanoTrabalho, RelatorioPlanoTrabalhoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public botoes: ToolbarButton[] = [];
  public unidadeId: string = '';

  constructor(public injector: Injector, dao: RelatorioPlanoTrabalhoDaoService) {
    super(injector, RelatorioPlanoTrabalho, RelatorioPlanoTrabalhoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.title = "Relatório de Planos de Trabalho";
    this.filter = this.fh.FormBuilder({
      unidade_id: { default: this.auth.unidade?.id },
      agrupar: { default: true },
      data_inicio: { default: "" },
      data_fim: { default: "" },
      somente_vigentes: { default: true },
      incluir_periodos_avaliativos: { default: true },
      incluir_unidades_subordinadas: { default: true }
    });
  
    this.orderBy = [['id', 'asc']];
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
      //result.push(["unidade_ativa", "==", form.unidade_id]);
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

}
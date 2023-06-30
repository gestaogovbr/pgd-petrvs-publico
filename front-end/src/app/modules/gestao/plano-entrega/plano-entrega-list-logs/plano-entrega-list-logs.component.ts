import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Change } from 'src/app/models/change.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'plano-entrega-list-logs',
  templateUrl: './plano-entrega-list-logs.component.html',
  styleUrls: ['./plano-entrega-list-logs.component.scss']
})
export class PlanoEntregaListLogsComponent extends PageListBase<Change,ChangeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('selectResponsaveis', { static: false }) public selectResponsaveis?: InputSelectComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public responsaveis: LookupItem[] = [];
  public logs: Change[] = [];

  constructor(public injector: Injector, dao: ChangeDaoService) {
    super(injector, Change, ChangeDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = "Logs de Planos de Entregas";
    this.filter = this.fh.FormBuilder({
      row_id: {default: ""},
      responsavel_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      tipo: {default: ""}
    });
    this.orderBy = [['id', 'desc']];
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();
    this.filter!.controls.row_id.setValue(this.urlParams?.get("id"));
    this.selectResponsaveis!.loading = true;
    let result = await Promise.all ([
      this.dao?.showResponsaveis(),
      this.dao!.query({where: [["table_name", "==", "planos_entregas"],["row_id", "==", this.filter?.controls.row_id.value]]}).asPromise()
    ]);
    this.responsaveis = result[0] || [];
    this.logs = result[1] || [];
    this.cdRef.detectChanges();
    this.selectResponsaveis!.loading = false;
  }
  
  public filterClear(filter: FormGroup) {
    filter.controls.responsavel_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.tipo.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.responsavel_id?.length){
      result.push(["user_id", "==", form.responsavel_id == "null" ? null : form.responsavel_id]);
    };
    if(form.data_inicio){
      result.push(["date_time", ">=", form.data_inicio]);
    };
    if(form.data_fim){
      result.push(["date_time", "<=", form.data_fim]);
    };
    if(form.tipo?.length){
      result.push(["type", "==", form.tipo]);
    };
    return result;
  }

}

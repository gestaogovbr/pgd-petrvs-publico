import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { PlanoEntregaDaoService } from 'src/app/dao/plano-entrega-dao.service';
import { Change } from 'src/app/models/change.model';
import { PlanoEntrega } from 'src/app/models/plano-entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'plano-entrega-list-logs',
  templateUrl: './plano-entrega-list-logs.component.html',
  styleUrls: ['./plano-entrega-list-logs.component.scss']
})
export class PlanoEntregaListLogsComponent extends PageListBase<Change, ChangeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('selectResponsaveis', { static: false }) public selectResponsaveis?: InputSelectComponent;

  public responsaveis: LookupItem[] = [];
  public planoEntregaDao: PlanoEntregaDaoService;
  public planoEntrega?: PlanoEntrega;
  public planoId: string = "";
  public action: string = "";

  constructor(public injector: Injector, dao: ChangeDaoService) {
    super(injector, Change, ChangeDaoService);
    /* Inicializações */
    this.planoEntregaDao = injector.get<PlanoEntregaDaoService>(PlanoEntregaDaoService);
    this.title = "Logs de Planos de Entregas";
    this.filter = this.fh.FormBuilder({
      responsavel_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      tipo: {default: ""}
    });
    this.orderBy = [['id', 'desc']];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.planoId = this.urlParams?.get("id") || "";
    this.planoEntregaDao.getById(this.planoId).then(plano => this.planoEntrega = plano!);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // this.selectResponsaveis!.loading = true;
    // this.dao?.showResponsaveis().then(responsaveis => {
    //   this.responsaveis = responsaveis || [];
    //   this.selectResponsaveis!.loading = false;
    // });
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

    result.push(["table_name", "==", "planos_entregas"]);
    result.push(["row_id", "==", this.planoId]);
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

  public preparaDelta(row: any): any[] {
    this.action = row.type;
    let novoDelta = row.delta instanceof Array ? row.delta : Object.entries(row.delta);
    novoDelta.forEach((element: any[]) => {
      if(element[1] instanceof Date) element[1] = new Date(element[1]).toUTCString();
      if(element.length > 2 && element[2] instanceof Date) element[2] = new Date(element[2]).toUTCString();
    });
    return novoDelta;
  }

}

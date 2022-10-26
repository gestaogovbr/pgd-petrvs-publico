import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Change } from 'src/app/models/change.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-change-list',
  templateUrl: './change-list.component.html',
  styleUrls: ['./change-list.component.scss']
})
export class ChangeListComponent extends PageListBase<Change, ChangeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('selectTabelas', { static: false }) public selectTabelas?: InputSelectComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public usuarioDao: UsuarioDaoService;
  public tabelas: LookupItem[] = [];

  constructor(public injector: Injector, dao: ChangeDaoService) {
    super(injector, Change, ChangeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = "Log das alterações";
    this.filter = this.fh.FormBuilder({
      responsavel_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      tabela: {default: ""},
      tipo: {default: ""},
      row_id: {default: ""}
    });
    // Testa se o usuário possui permissão para exibir dados dos logs
    if (this.auth.hasPermissionTo("DEV_MOD_LOGS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o registro de log
    if (this.auth.hasPermissionTo("DEV_MOD_LOGS")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectTabelas!.loading = true;
    this.dao?.showTables().then(tabelas => {
      this.tabelas = tabelas || [];
      this.cdRef.detectChanges();
    }).finally(() => this.selectTabelas!.loading = false);
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  public onTabelaChange(event: Event) {
    this.entity = this.entities.find(x => x.table == this.filter?.controls.tabela.value);
    this.cdRef.detectChanges();
  }

  public filterClear(filter: FormGroup) {
    filter.controls.responsavel_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.tabela.setValue("");
    filter.controls.tipo.setValue("");
    filter.controls.row_id.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.responsavel_id?.length){
      result.push(["user_id", "like", "%" + form.responsavel_id + "%"]);
    };
    if(form.data_inicio){
      result.push(["date_time", ">=", form.data_inicio]);
    };
    if(form.data_fim){
      result.push(["date_time", "<=", form.data_fim]);
    };
    if(form.tabela){
      result.push(["table_name", "==", form.tabela]);
    };
    if(form.row_id){
      result.push(["row_id", "==", form.row_id]);
    };
    if(form.tipo?.length){
      result.push(["type", "==", form.tipo]);
    };
    return result;
  }
}

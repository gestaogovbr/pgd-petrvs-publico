import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Base, IIndexable } from 'src/app/models/base.model';
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
  @ViewChild('selectResponsaveis', { static: false }) public selectResponsaveis?: InputSelectComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public usuarioDao: UsuarioDaoService;
  public tabelas: LookupItem[] = [];
  public responsaveis: LookupItem[] = [];
  public opcoes_filtro: LookupItem[] = [
    {'key': 0, 'value': 'ID do registro'},{'key': 1, 'value': ''}];

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
      row_id: {default: ""},
      opcao_filtro: {default: 0}
    });
    this.orderBy = [['id', 'desc']];
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectTabelas!.loading = true;
    this.selectResponsaveis!.loading = true;
    await Promise.all([
      this.dao?.showTables().then(tabelas => {
        this.tabelas = tabelas || []}),
      this.dao?.showResponsaveis().then(responsaveis => {
        this.responsaveis = responsaveis || []})
    ]).finally(() => {
      this.cdRef.detectChanges();
      this.selectTabelas!.loading = false;
      this.selectResponsaveis!.loading = false;
    });
  }
  
  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  public onRowClick(row: Change) {
    if(row){
      let change = row as Change;
      this.entity = this.entities.find(x => x.table == change!.table_name.toLowerCase());
      this.go.navigate({route: ['logs', 'change', change!.id, 'consult']}, {
        metadata: {entity: this.entity, entity_id: change!.row_id},
        modal: true, 
        modalClose: (modalResult?: string) => {
          if(modalResult?.length) this.go.navigate({route: ['logs', 'change']});
        }
      });
    }
  }

  public onTabelaChange(event: Event) {
    this.filter!.controls.row_id.setValue("");
    this.filter!.controls.opcao_filtro.setValue(0);
    this.entity = this.entities.find(x => x.table == this.filter?.controls.tabela.value);
    if(this.entity) this.opcoes_filtro[1].value = this.entity!.label + ': ' + this.entity!.campo;
    this.cdRef.detectChanges();
  }

  public filterClear(filter: FormGroup) {
    filter.controls.responsavel_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.tabela.setValue("");
    filter.controls.tipo.setValue("");
    filter.controls.row_id.setValue("");
    filter.controls.opcao_filtro.setValue("ID do registro");
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

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.onRowClick.bind(this)});
    result.push({icon: "bi bi-trash", color: "btn-outline-danger", label: "Excluir", onClick: this.delete.bind(this)});
    return result;
  }

}

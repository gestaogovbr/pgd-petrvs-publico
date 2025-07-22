import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { EntityService } from 'src/app/services/entity.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Change } from 'src/app/models/change.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { EntityItem } from 'src/app/services/entity.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Base } from 'src/app/models/base.model';
import {InputTextComponent} from "../../../../components/input/input-text/input-text.component";
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { SelectItem } from 'src/app/components/input/input-base';

@Component({
  selector: 'app-change-list',
  templateUrl: './change-list.component.html',
  styleUrls: ['./change-list.component.scss']
})
export class ChangeListComponent extends PageListBase<Change, ChangeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('selectResponsaveis', { static: false }) public selectResponsaveis?: InputSelectComponent;
  @ViewChild('relacao', { static: false }) public relacao?: InputSelectComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public usuarioDao: UsuarioDaoService;
  public entityService: EntityService;
  public entity?: EntityItem;
  public responsaveis: LookupItem[] = [];
  public relacoes: LookupItem[] = [];
  public changes: Change[] = [];
  public models: LookupItem[] = [];
  public consultaFinalizada = false;


  constructor(public injector: Injector, dao: ChangeDaoService, public xlsx: ExcelService) {
    super(injector, Change, ChangeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.entityService = injector.get<EntityService>(EntityService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = this.lex.translate("Logs das Alterações");
    this.filter = this.fh.FormBuilder({
      relacoes: {default: []},
      usuario_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      tabela: {default: ""},
      search: {default: ""},
      modelo: {default: ""},
      model: {default: ""},
      tipo: {default: ""},
      row_id: {default: ""},
      row_id_text: {default: ""},
      row_id_search: {default: ""}
    });
    this.join = ["usuario"];
    this.orderBy = [['id', 'desc']];
  }

  ngOnInit(){
    super.ngOnInit();
    this.filter?.controls.row_id_text.setValue(this.urlParams?.get('id'));
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();
    
    this.models = await this.dao?.listModels() || [];
    
    //this.selectResponsaveis!.loading = true;
    this.dao?.showResponsaveis().then(responsaveis => {
      this.responsaveis = responsaveis || [];
      this.cdRef.detectChanges();
    });
    //.finally(() => this.selectResponsaveis!.loading = false);
  }

  public async loadChanges(changes?: Base[]){
    this.changes = changes as Change[];
    this.consultaFinalizada = true;
  }

  public filterClear(filter: FormGroup) {
    filter.controls.usuario_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.tabela.setValue("");
    filter.controls.f.setValue("");
    filter.controls.search.setValue("");
    filter.controls.modelo.setValue("");
    filter.controls.opcao_filtro.setValue("ID do registro");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.usuario_id?.length){
      result.push(["user_id", "==", form.usuario_id == "null" ? null : form.usuario_id]);
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
    if(form.row_id_text){
      result.push(["row_id", "==", form.row_id_text]);
    };
    if(form.row_id_search && !form.row_id_text){
      result.push(["row_id", "==", form.row_id_search]);
    };    
    if(form.tipo?.length){
      result.push(["type", "==", form.tipo]);
    };
    if(form.modelo?.length){
      result.push(["auditable_type", "==", form.modelo]);
    };
    if(form.search?.length){
      result.push(["search", "==", form.search]);
    };
    return result;
  }


  public async onUsuarioSelect(selected: SelectItem) {
  }

}

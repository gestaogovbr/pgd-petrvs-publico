import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ChangeDaoService } from 'src/app/dao/change-dao.service';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Base } from 'src/app/models/base.model';
import { Change } from 'src/app/models/change.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { FullRoute } from 'src/app/services/navigate.service';

export type LogEntity = {
  table: string,
  dao: DaoBaseService<Base>,
  label: string,
  selectRoute: FullRoute
}

@Component({
  selector: 'app-change-list',
  templateUrl: './change-list.component.html',
  styleUrls: ['./change-list.component.scss']
})
export class ChangeListComponent extends PageListBase<Change, ChangeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public tabelas: string[] | null = [];
  public entities: LogEntity[] = [];
  //public entity: LogEntity;

  constructor(public injector: Injector, dao: ChangeDaoService) {
    super(injector, Change, ChangeDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    //this.title = "Logs de registros - tipo CHANGE";
    this.filter = this.fh.FormBuilder({
      usuario: {default: ""},
      data_hora: {default: null},
      tabela: {default: ""},
      tipo: {default: ""},
      row_id: {default: null}
    });

/*     this.entities = [
      {table: 'usuarios', dao: injector.get<UsuarioDaoService>(UsuarioDaoService), label: "Usuário", selectRoute: {route: ['configuracoes', 'usuario']}},
    ] */

    //this.entity = {table: '', dao: injector.get<DaoBaseService<Base>>(DaoBaseService<Base>), label: "Selecione uma tabela válida...", selectRoute: {route: []}};

    //se a tabela selecionada tiver uma entity(Model) associada,

    // Testa se o usuário possui permissão para exibir dados dos logs
    if (this.auth.hasPermissionTo("MOD_LOGS_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o registro de log
    if (this.auth.hasPermissionTo("MOD_LOGS_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  async ngOnInit(){
    this.tabelas = await this.dao!.showTables();
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.usuario?.length) {
      result.push(["user_id", "like", "%" + form.usuario + "%"]);
    } else if(form.tabela?.length) {
      result.push(["tabela", "like", "%" + form.tabela + "%"]);
    } //else if(form.status) {
/*       result.push(["status", "==", form.status]);
    } else if(form.inicio?.length) {
      result.push(["termino", ">=", form.inicio]);
    } else if(form.termino?.length) {
      result.push(["inicio", "=<", form.termino]);
    } else if(form.tabela?.length) {
      result.push(["tabela", "like", "%" + form.tabela + "%"]);
    } */

    return result;
  }
}

import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { IntegracaoDaoService } from 'src/app/dao/integracao-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Integracao } from 'src/app/models/integracao.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-integracao-list',
  templateUrl: './integracao-list.component.html',
  styleUrls: ['./integracao-list.component.scss']
})
export class IntegracaoListComponent extends PageListBase<Integracao, IntegracaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  //@ViewChild('selectResponsaveis', { static: false }) public selectResponsaveis?: InputSelectComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public usuarioDao: UsuarioDaoService;

  constructor(public injector: Injector, dao: IntegracaoDaoService) {
    super(injector, Integracao, IntegracaoDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.title = "Rotinas de Integração";
    this.filter = this.fh.FormBuilder({
      usuario_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      atualizar_unidades: {default: ""},
      atualizar_servidores: {default: ""},
      atualizar_gestores: {default: ""}
    });
    this.join = ['usuario:nome'];
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  public filterClear(filter: FormGroup)
  {
    filter.controls.usuario_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.atualizar_unidades.setValue("");
    filter.controls.atualizar_servidores.setValue("");
    filter.controls.atualizar_gestores.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.usuario_id?.length){
//      result.push(["user_id", "like", "%" + form.responsavel_id + "%"]);
    };
    if(form.data_inicio){
//      result.push(["date_time", ">=", form.data_inicio]);
    };
    if(form.data_fim){
//      result.push(["date_time", "<=", form.data_fim]);
    };
    if(form.atualizar_unidades){
      //      result.push(["row_id", "==", form.row_id]);
          };
    if(form.atualizar_servidores){
//      result.push(["row_id", "==", form.row_id]);
    };
    if(form.atualizar_gestores){
//      result.push(["type", "==", form.tipo]);
    };
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
//    result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.onRowClick.bind(this)});
    result.push({icon: "bi bi-trash", color: "btn-outline-danger", label: "Excluir", onClick: this.delete.bind(this)});
    return result;
  }

}

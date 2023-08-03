import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { IntegracaoDaoService } from 'src/app/dao/integracao-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Integracao } from 'src/app/models/integracao.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-integracao-list',
  templateUrl: './integracao-list.component.html',
  styleUrls: ['./integracao-list.component.scss']
})
export class IntegracaoListComponent extends PageListBase<Integracao, IntegracaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('selectResponsaveis', { static: false }) public selectResponsaveis?: InputSelectComponent;

  public toolbarButtons: ToolbarButton[] = [];
  public allPages: ListenerAllPagesService;
  public usuarioDao: UsuarioDaoService;
  public responsaveis: LookupItem[] = [];
  public labelAdd: string = "Executar";

  constructor(public injector: Injector, dao: IntegracaoDaoService) {
    super(injector, Integracao, IntegracaoDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.title = this.lex.translate("Rotinas de Integração");
    this.filter = this.fh.FormBuilder({
      usuario_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      atualizar_unidades: {default: ""},
      atualizar_servidores: {default: ""},
      atualizar_gestores: {default: ""}
    });
    this.orderBy = [['data_execucao', 'desc']];
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectResponsaveis!.loading = true;
    this.dao?.showResponsaveis().then(responsaveis => {
      this.responsaveis = responsaveis || [];
      this.cdRef.detectChanges();
    }).finally(() => this.selectResponsaveis!.loading = false);
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
    if(form.usuario_id.length){
      result.push(["usuario_id", "==", form.usuario_id == "null" ? null : form.usuario_id]);
    };
    if(form.data_inicio){
      result.push(["data_execucao", ">=", form.data_inicio]);
    };
    if(form.data_fim){
      result.push(["data_execucao", "<=", form.data_fim]);
    };
    if(form.atualizar_unidades){
      result.push(["atualizar_unidades", "==", form.atualizar_unidades]);
          };
    if(form.atualizar_servidores){
      result.push(["atualizar_servidores", "==", form.atualizar_servidores]);
    };
    if(form.atualizar_gestores){
      result.push(["atualizar_gestores", "==", form.atualizar_gestores]);
    };
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    // Testa se o usuário possui permissão para exibir dados de uma rotina de integração
    if (this.auth.hasPermissionTo("MOD_LOGS")) result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this)});
    return result;
  }
}

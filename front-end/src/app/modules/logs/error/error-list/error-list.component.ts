import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ErrorDaoService } from 'src/app/dao/error-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Error } from 'src/app/models/error.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent extends PageListBase<Error, ErrorDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(InputSelectComponent, { static: false }) public selectResponsaveis?: InputSelectComponent;

  public allPages: ListenerAllPagesService;
  public usuarioDao: UsuarioDaoService;
  public responsaveis: LookupItem[] = [];

  constructor(public injector: Injector, dao: ErrorDaoService) {
    super(injector, Error, ErrorDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = this.lex.translate("Logs dos Erros");
    this.filter = this.fh.FormBuilder({
      type: {default: ""},
      responsavel_id: {default: ""},
      data_inicio: {default: null},
      data_fim: {default: null}
    });
    this.orderBy = [['date_time', 'desc']];
  }

  async ngAfterViewInit() {
      super.ngAfterViewInit();
      this.selectResponsaveis!.loading = true;
      this.dao?.showResponsaveis().then(responsaveis => { this.responsaveis = responsaveis || [] });
      this.cdRef.detectChanges();
      this.selectResponsaveis!.loading = false;
  };

  public filterClear(filter: FormGroup) {
    filter.controls.responsavel_id.setValue("");
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
    filter.controls.type.setValue("");
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
    if(form.type?.length){
      result.push(["type", "==", form.type]);
    };
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if (this.auth.hasPermissionTo("MOD_PENT_CONS")) result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this)});
    return result;
  }
}
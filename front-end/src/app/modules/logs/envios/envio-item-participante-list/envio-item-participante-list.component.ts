import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { EnvioItemDaoService } from 'src/app/dao/envio-item-dao.service';
import { EnvioItem } from 'src/app/models/envio-item.model';
import { Envio } from 'src/app/models/envio.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'envio-item-participante-list',
  templateUrl: './envio-item-participante-list.component.html',
  styleUrls: ['./envio-item-participante-list.component.scss']
})
export class EnvioItemParticipanteListComponent extends PageListBase<EnvioItem, EnvioItemDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public envio_id: string | null = null;
  public envioItemDaoService: EnvioItemDaoService;
  // public allPages: ListenerAllPagesService;

  constructor(public injector: Injector, dao: EnvioItemDaoService) {
    super(injector, EnvioItem, EnvioItemDaoService);
    /* Inicializações */
    this.envioItemDaoService = dao // injector.get<EnvioItemDaoService>(EnvioItemDaoService);
    // this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = this.lex.translate("Histórico de Participantes Enviados");
    this.filter = this.fh.FormBuilder({
      envio_id: {default: null }, 
      tipo: {default: null},
      uid: {default: null},
      cpf: {default: null},
      sucesso: {default: ""},
    });
    this.join = [
			"usuario:id,cpf,nome",
    ];
    this.orderBy = [['created_at', 'asc']];
  }

  /*async ngAfterViewInit() {
      super.ngAfterViewInit();
      this.cdRef.detectChanges();
  };*/

  public filterClear(filter: FormGroup) {
    filter.controls.tipo.setValue("");
    filter.controls.uid.setValue("");
    filter.controls.sucesso.setValue("");
    filter.controls.cpf.setValue("");
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    result.push(["tipo", '=', 'participante']);
    result.push(["envio_id", '=', form.envio_id]);
    result.push(["sucesso", '=', form.sucesso]);

    if (form.uid) {
      result.push(["uid", '=', form.uid]);
    }

    if (form.cpf) {
      result.push(["usuario.cpf", '=', form.cpf]);
    }

    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if (this.auth.hasPermissionTo("MOD_PENT")) result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this)});
    return result;
  }

  public ngOnInit() {
    super.ngOnInit();
    this.filter?.controls.envio_id.setValue(this.urlParams!.get("id") as string);
  }

  public consult = async (doc: EnvioItem) => {
    this.go.navigate({route: ['logs', 'envio-items', doc.id, "consult"]});
  }
}
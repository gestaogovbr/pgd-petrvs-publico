import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Envio } from 'src/app/models/envio.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'envio-list',
  templateUrl: './envio-list.component.html',
  styleUrls: ['./envio-list.component.scss']
})
export class EnvioListComponent extends PageListBase<Envio, EnvioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public allPages: ListenerAllPagesService;
  public BOTAO_PARTICIPANTES: ToolbarButton;

  constructor(public injector: Injector, dao: EnvioDaoService) {
    super(injector, Envio, EnvioDaoService);
    /* Inicializações */
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.title = this.lex.translate("Logs dos Envios à API PGD");
    this.filter = this.fh.FormBuilder({
      data_inicio: {default: null},
      data_fim: {default: null}
    });
    this.orderBy = [['created_at', 'desc']];

    this.BOTAO_PARTICIPANTES = {
			label: "Participantes",
			icon: "bi bi-users",
			color: "btn-outline-info",
			onClick: this.participantes.bind(this),
		};
  }

  async ngAfterViewInit() {
      super.ngAfterViewInit();
      this.cdRef.detectChanges();
  };

  public filterClear(filter: FormGroup) {
    filter.controls.data_inicio.setValue("");
    filter.controls.data_fim.setValue("");
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.data_inicio){
      result.push(["created_at", ">=", form.data_inicio]);
    };

    if(form.data_fim){
      result.push(["created_at", "<=", form.data_fim]);
    };

    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if (this.auth.hasPermissionTo("MOD_PENT")) result.push({icon: "bi bi-info-circle", label: "Informações", onClick: this.consult.bind(this)});
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		result.push(this.BOTAO_PARTICIPANTES);
		return result;
	}

  public participantes = async (doc: Envio) => {
    this.go.navigate({route: ['envios', doc.id, "participantes"]});
  }
}
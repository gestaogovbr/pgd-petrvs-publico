import { Component, Injector, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar-types";
import { MuralAvisoDaoService } from "src/app/dao/mural-aviso-dao.service";
import { MuralAviso } from "src/app/models/mural-aviso.model";
import { PageListBase } from "src/app/modules/base/page-list-base";

@Component({
  selector: 'panel-mural-list',
  templateUrl: './panel-mural-list.component.html',
  standalone: false
})
export class PanelMuralListComponent extends PageListBase<MuralAviso, MuralAvisoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  constructor(public injector: Injector) {
    super(injector, MuralAviso, MuralAvisoDaoService);
    this.title = "Mural de Avisos";
    this.orderBy = [['data_publicacao', 'desc']];
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: MuralAviso): ToolbarButton[] {
    return [
      { label: "Excluir", icon: "bi bi-trash", color: "btn-outline-danger", onClick: this.delete.bind(this) }
    ];
  }

  public getDestinatarioLabel(destinatario: string): string {
    return destinatario === 'TODOS' ? 'Todos os tenants' : 'Tenant específico';
  }
}

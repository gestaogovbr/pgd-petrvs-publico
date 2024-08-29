import { Component, Injector, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { CatalogoDaoService } from "src/app/dao/catalogo-dao.service";
import { Catalogo } from "src/app/models/catalogo.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { CatalogoService } from "src/app/services/catalogo.service";

@Component({
  selector: 'app-catalogo-list',
  templateUrl: './catalogo-list.component.html',
  styleUrls: ['./catalogo-list.component.scss']
})
export class CatalogoListComponent extends PageListBase<Catalogo, CatalogoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public catalogoService: CatalogoService;


  constructor(public injector: Injector, dao: CatalogoDaoService) {
    super(injector, Catalogo, CatalogoDaoService);
    this.catalogoService = injector.get<CatalogoService>(CatalogoService);
    this.title = this.lex.translate("Catalogos");
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
    });
    this.join = [
      "unidade"
    ];
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: Catalogo): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

}
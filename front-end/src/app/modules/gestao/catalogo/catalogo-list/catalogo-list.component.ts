import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { CatalogoDaoService } from "src/app/dao/catalogo-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
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
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public botoes: ToolbarButton[] = [];
	public BOTAO_DETALHES: ToolbarButton;
  public BOTAO_CLONAR: ToolbarButton;
  public BOTAO_CONCLUIR: ToolbarButton;
  public BOTAO_CANCELAR: ToolbarButton;

  constructor(public injector: Injector, dao: CatalogoDaoService) {
    super(injector, Catalogo, CatalogoDaoService);
    this.catalogoService = injector.get<CatalogoService>(CatalogoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.title = this.lex.translate("Catalogos");
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      curador_responsavel_id: {default: ""},
      unidade_id: {default: ""},
      data_inicio: {default: ""},
      data_fim: {default: ""}
    });
    this.join = [
      "unidade",
      "curadorResponsavel"
    ];
    this.BOTAO_DETALHES = {
			label: "Detalhes",
			icon: "bi bi-eye",
			color: "btn-outline-success",
			onClick: this.edit.bind(this),
		};
    this.BOTAO_CLONAR = {
			label: "Clonar",
			icon: "bi bi-copy",
			color: "btn-outline-primary",
			onClick: this.edit.bind(this),
		};
    this.BOTAO_CONCLUIR = {
			label: "Concluir",
			icon: "bi bi-x-circle",
			color: "btn-outline-danger",
			onClick: this.edit.bind(this),
		};
    this.BOTAO_CANCELAR = {
			label: "Cancelar conclusão",
			icon: "bi bi-backspace",
			color: "btn-outline-warning",
			onClick: this.edit.bind(this),
		};
    this.botoes = [
			this.BOTAO_DETALHES,
      this.BOTAO_CLONAR,
      this.BOTAO_CONCLUIR,
      this.BOTAO_CANCELAR
    ]
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public dynamicButtons(row: Catalogo): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push(this.BOTAO_DETALHES);
    result.push(this.BOTAO_CLONAR);
    result.push(this.BOTAO_CONCLUIR);
    result.push(this.BOTAO_CANCELAR);
    return result;
  }

}
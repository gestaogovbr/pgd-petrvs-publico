import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { RelatorioAgenteDaoService } from "src/app/dao/relatorio-agente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { RelatorioAgente } from "src/app/models/relatorio-agente.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { TipoAvaliacaoNotaDaoService } from "src/app/dao/tipo-avaliacao-nota-dao.service";
import { of } from "rxjs";
import { TipoModalidadeDaoService } from "src/app/dao/tipo-modalidade-dao.service";

@Component({
  selector: 'relatorio-agente',
  templateUrl: './relatorio-agente.component.html',
  styleUrls: ['./relatorio-agente.component.scss']
})
export class RelatorioAgenteComponent extends PageListBase<RelatorioAgente, RelatorioAgenteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public botoes: ToolbarButton[] = [];
  public unidadeId: string = '';
  public loaded: boolean = false;
  public tiposModalidade: LookupItem[] = [];

  constructor(public injector: Injector, dao: RelatorioAgenteDaoService) {
      super(injector, RelatorioAgente, RelatorioAgenteDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
      this.dao = injector.get<RelatorioAgenteDaoService>(RelatorioAgenteDaoService);

      this.title = "Relatório de Planos de Entrega";
      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        id: { default: "" },
        nome: { default: "" },
        unidadeNome: { default: "" },
        status: { default: "" }
      });

      this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.orderBy = [['unidadeHierarquia', 'asc'], ['numero', 'asc']];
  }

  public requiredValidator(control: AbstractControl): ValidationErrors | null { 
      return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
  }

  public async ngOnInit() {
      super.ngOnInit();

      this.tipoModalidadeDao.query().asPromise().then(modalidades => {
          this.tiposModalidade = this.lookup.map(modalidades, 'id', 'nome');
      });
  }

  public ngAfterViewInit(): void {
      super.ngAfterViewInit();
      this.loaded = true;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }

    if (form.incluir_unidades_subordinadas) {
      result.push(["incluir_unidades_subordinadas", "==", 1]);
    }

    if (form.nome) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    if (form.unidadeNome) {
      result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
    }
    
    return result;
  };

  public onFilterClear() {
    this.filter?.reset()
    this.grid!.reloadFilter();
    this.cdRef.markForCheck();
  }

  public onButtonFilterClick = (filter: FormGroup) => {
    let form: any = filter.value;
    let queryOptions = this.grid?.queryOptions || this.queryOptions || {};

    if (this.filter!.valid) {
      if (this.grid && this.grid.query) {
        this.loaded = true;
      }
      this.grid?.query?.reload(queryOptions);
    } else {
      this.filter!.markAllAsTouched(); 
    }
  }

  public exportExcel = (form: any, queryOptions: QueryOptions) => {
    this.loading = true;
    try{
      return this.dao!.exportarXls({
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      });
    } catch (error: any) {
      this.error(error);
    } finally {
      this.loading = false;
    }

    return of(null);
  }

  public onValueChange(event: Event) {
    this.onButtonFilterClick(this.filter!);
  }
}
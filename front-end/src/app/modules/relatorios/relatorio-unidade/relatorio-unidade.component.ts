import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { RelatorioUnidadeDaoService } from "src/app/dao/relatorio-unidade-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { RelatorioUnidade } from "src/app/models/relatorio-unidade.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { of } from "rxjs";

@Component({
  selector: 'relatorio-unidade',
  templateUrl: './relatorio-unidade.component.html',
  styleUrls: ['./relatorio-unidade.component.scss']
})
export class RelatorioUnidadeComponent extends PageListBase<RelatorioUnidade, RelatorioUnidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public botoes: ToolbarButton[] = [];
  public unidadeId: string = '';
  public loaded: boolean = false;
  public unidades?: any[];

  constructor(public injector: Injector) {
    super(injector, RelatorioUnidade, RelatorioUnidadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);

    this.filter = this.fh.FormBuilder({
      unidade_id: { default: this.auth.unidade?.id },
      incluir_unidades_subordinadas: { default: false },
      exportar: { default: false },
      id: { default: "" },
      unidadeNome: { default: "" },
      nome: { default: "" },
      uorg: { default: "" },
      tipo: { default: "" },
      chefiaNome: { default: "" },
      totalVinculados: { default: "" },
      totalSubstitutos: { default: "" },
      totalDelegados: { default: "" }
    });

    this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
    this.filter.get('unidade_id')?.updateValueAndValidity();

    this.orderBy = [['unidadeHierarquia', 'asc'], ['sigla', 'asc']];
  }

  public requiredValidator(control: AbstractControl): ValidationErrors | null { 
      return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
  }

  public async ngOnInit() {
      super.ngOnInit();

      if (this.auth.unidade) {
        const unidades = (await this.unidadeDao.subordinadas(this.auth?.unidade?.id))
          .map((item: any) => item.id);
        unidades.push(this.auth.unidade.id);
        this.unidades = unidades;
      }
  }

  public ngAfterViewInit(): void {
      super.ngAfterViewInit();
      this.loaded = true;
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

   
      result.push(["unidade_id", "==", form.unidade_id]);
    

    if (form.incluir_unidades_subordinadas) {
      result.push(["incluir_unidades_subordinadas", "==", 1]);
    }

    if (form.nome) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    if (form.unidadeNome) {
      result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
    }

    if (form.uorg?.length) {
      result.push(["codigo", "like", "%" + form.uorg + "%"]);
    }

    if (form.tipo?.length) {
      result.push(["tipo", "==", form.tipo]);
    }

    if (form.chefiaNome?.length) {
      result.push(["chefiaNome", "like", "%" + form.chefiaNome + "%"]);
    }

    if (form.totalVinculados?.length) {
      result.push(["totalVinculados", "==", form.totalVinculados]);
    }

    if (form.totalSubstitutos?.length) {
      result.push(["totalSubstitutos", "==", form.totalSubstitutos]);
    }

    if (form.totalDelegados?.length) {
      result.push(["totalDelegados", "==", form.totalDelegados]);
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
import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { RelatorioErrosEnvioDaoService } from "src/app/dao/relatorio-erros-envio-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { RelatorioErrosEnvio } from "src/app/models/relatorio-erros-envio.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { QueryOptions } from "src/app/dao/query-options";
import { of } from "rxjs";

@Component({
  selector: 'relatorio-erros-envio',
  templateUrl: './relatorio-erros-envio.component.html',
  styleUrls: ['./relatorio-erros-envio.component.scss']
})
export class RelatorioErrosEnvioComponent extends PageListBase<RelatorioErrosEnvio, RelatorioErrosEnvioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public unidadeId: string = '';
  public loaded: boolean = false;
  public unidades?: any[];

  constructor(public injector: Injector, dao: RelatorioErrosEnvioDaoService) {
      super(injector, RelatorioErrosEnvio, RelatorioErrosEnvioDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.dao = injector.get<RelatorioErrosEnvioDaoService>(RelatorioErrosEnvioDaoService);

      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        id: { default: "" },
        matricula: { default: "" },
        data_inicial: { default: "" },
        data_final: { default: "" }
      });

      this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.orderBy = [['unidadeHierarquia', 'asc'], ['nome', 'asc']];
      this.rowsLimit = 10;
  }

  public requiredValidator(control: AbstractControl): ValidationErrors | null { 
      return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
  }

  public async ngOnInit() {
      super.ngOnInit();

      if(this.metadata?.unidade_id) {
        this.filter?.controls.unidade_id.setValue(this.metadata?.unidade_id);
        this.saveUsuarioConfig();
      }

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

    if (form.matricula?.length) {
      result.push(["matricula", "like", "%" + form.matricula + "%"]);
    }

    if (form.data_inicial) {
      result.push(["data_inicial_pedagio", "==",  form.data_inicial.toISOString().slice(0,10)]);
    }

    if (form.data_final_) {
      result.push(["data_final_pedagio", "==", form.data_final.toISOString().slice(0,10)]);
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
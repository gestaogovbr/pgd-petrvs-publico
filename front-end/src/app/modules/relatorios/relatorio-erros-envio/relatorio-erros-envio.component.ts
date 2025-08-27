import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { RelatorioErrosEnvioDaoService } from "src/app/dao/relatorio-erros-envio-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { RelatorioErrosEnvio } from "src/app/models/relatorio-erros-envio.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { QueryOptions } from "src/app/dao/query-options";
import { of } from "rxjs";
import moment from 'moment';
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";

@Component({
  selector: 'relatorio-erros-envio',
  templateUrl: './relatorio-erros-envio.component.html',
  styleUrls: ['./relatorio-erros-envio.component.scss']
})
export class RelatorioErrosEnvioComponent extends PageListBase<RelatorioErrosEnvio, RelatorioErrosEnvioDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public unidadeDao: UnidadeDaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeId: string = '';
  public loaded: boolean = false;
  public unidades?: any[];

  constructor(public injector: Injector, dao: RelatorioErrosEnvioDaoService) {
      super(injector, RelatorioErrosEnvio, RelatorioErrosEnvioDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
      this.dao = injector.get<RelatorioErrosEnvioDaoService>(RelatorioErrosEnvioDaoService);

      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        id: { default: "" },
        categoria: { default: "" },
        envioNumero: { default: "" },
        numero: { default: "" },
        envio_inicio: { default: moment().subtract(30, 'days').toDate() },
        envio_fim: { default: moment().toDate() },
        data_envio: { default: "" },
        motivo: { default: "" },
        usuario_id: { default: "" },
      });

      this.filter!.get('unidade_id')?.setValidators(this.requiredValidator.bind(this));
      this.filter.get('unidade_id')?.updateValueAndValidity();
      this.rowsLimit = 100;
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

    if (form.unidadeNome) {
      result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
    }

    if (form.id?.length) {
      result.push(["id", "like", form.id]);
    }

    if (form.categoria?.length) {
      result.push(["categoria", "==", form.categoria]);
    }

    if (form.envioNumero?.length) {
      result.push(["envioNumero", "==", form.envioNumero]);
    }

    if (form.numero?.length) {
      result.push(["numero", "like", "%" + form.numero + "%"]);
    }

    if (form.envio_inicio) {
      result.push(["envio_inicio", ">=",  form.envio_inicio.toISOString().slice(0,10)]);
    }

    if (form.envio_fim) {
      result.push(["envio_fim", "<=", form.envio_fim.toISOString().slice(0,10)]);
    }

    if (form.data_envio) {
      result.push(["data_envio", "==", form.data_envio.toISOString().slice(0,10)]);
    }

    if (form.motivo?.length) {
      result.push(["motivo", "like", form.motivo]);
    }

    if (form.usuario_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
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
      const exportar$ = this.dao!.exportarXls({
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      });

      return exportar$;
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
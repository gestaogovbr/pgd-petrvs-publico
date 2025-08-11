import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { RelatorioAgenteDaoService } from "src/app/dao/relatorio-agente-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { RelatorioAgente } from "src/app/models/relatorio-agente.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { TipoModalidadeDaoService } from "src/app/dao/tipo-modalidade-dao.service";
import { PerfilDaoService } from "src/app/dao/perfil-dao.service";
import { of } from "rxjs";

@Component({
  selector: 'relatorio-agente',
  templateUrl: './relatorio-agente.component.html',
  styleUrls: ['./relatorio-agente.component.scss']
})
export class RelatorioAgenteComponent extends PageListBase<RelatorioAgente, RelatorioAgenteDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public perfilDao: PerfilDaoService;
  public unidadeDao: UnidadeDaoService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public botoes: ToolbarButton[] = [];
  public unidadeId: string = '';
  public loaded: boolean = false;
  public tiposModalidade: LookupItem[] = [];
  public perfis: LookupItem[] = [];
  public unidades?: any[];

  constructor(public injector: Injector, dao: RelatorioAgenteDaoService) {
      super(injector, RelatorioAgente, RelatorioAgenteDaoService);
      this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
      this.dao = injector.get<RelatorioAgenteDaoService>(RelatorioAgenteDaoService);

      this.filter = this.fh.FormBuilder({
        unidade_id: { default: this.auth.unidade?.id },
        incluir_unidades_subordinadas: { default: false },
        exportar: { default: false },
        id: { default: "" },
        nome: { default: "" },
        unidadeNome: { default: "" },
        status: { default: "" },
        matricula: { default: "" },
        jornada: { default: "" },
        perfil_id: { default: "" },
        situacao: { default: "" },
        selecao: { default: "" },
        lotado: { default: this.metadata?.lotado ?? "" },
        modalidade: { default: "" },
        modalidadeSouGov: { default: "" },
        comparacaoSouGovPetrvs: { default: "" },
        tipo_pedagio: { default: "" },
        data_inicial_pedagio: { default: "" },
        data_final_pedagio: { default: "" }
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

      this.tipoModalidadeDao.query().asPromise().then(modalidades => {
          this.tiposModalidade = this.lookup.map(modalidades, 'id', 'nome');
      });

      this.perfilDao.query().asPromise().then(perfis => {
          this.perfis = this.lookup.map(perfis, 'id', 'nome')
            .map(item => ({
              key: item.key,
              value: item.value.replace('Perfil ', '')
            })); // Remove a palavra 'Perfil' dos perfis

          console.log(this.perfis);
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

    if (form.matricula?.length) {
      result.push(["matricula", "like", "%" + form.matricula + "%"]);
    }

    if (form.jornada?.length) {
      result.push(["jornada", "==", form.jornada]);
    }

    if (form.perfil_id?.length) {
      result.push(["perfil_id", "==", form.perfil_id]);
    }

    if (form.situacao?.length) {
      result.push(["situacao", "==", form.situacao]);
    }

    if (form.selecao?.length) {
      result.push(["programaNome", "like", "%" + form.selecao + "%"]);
    }

    if (form.modalidade?.length) {
      result.push(["tipo_modalidade_id", "==", form.modalidade]);
    }

    if (form.modalidadeSouGov?.length) {
      result.push(["modalidadeSouGov", "==", form.modalidadeSouGov]);
    }

    if (form.comparacaoSouGovPetrvs?.length) {
      result.push(["comparacaoSouGovPetrvs", "==", form.comparacaoSouGovPetrvs]);
    }

    if (form.tipo_pedagio?.length) {
      result.push(["tipo_pedagio", "==", form.tipo_pedagio]);
    }

    if (form.data_inicial_pedagio) {
      result.push(["data_inicial_pedagio", "==",  form.data_inicial_pedagio.toISOString().slice(0,10)]);
    }

    if (form.data_final_pedagio) {
      result.push(["data_final_pedagio", "==", form.data_final_pedagio.toISOString().slice(0,10)]);
    }

    if (this.metadata?.atribuicao) {
      result.push(["atribuicao", "==", this.metadata.atribuicao]);
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
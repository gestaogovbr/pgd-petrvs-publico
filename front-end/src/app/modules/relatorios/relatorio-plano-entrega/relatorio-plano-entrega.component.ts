import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { RelatorioPlanoEntregaDaoService } from "src/app/dao/relatorio-plano-entrega-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { RelatorioPlanoEntrega } from "src/app/models/relatorio-plano-entrega.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { TipoAvaliacaoNotaDaoService } from "src/app/dao/tipo-avaliacao-nota-dao.service";

@Component({
  selector: 'relatorio-plano-entrega',
  templateUrl: './relatorio-plano-entrega.component.html',
  styleUrls: ['./relatorio-plano-entrega.component.scss']
})
export class RelatorioPlanoEntregaComponent extends PageListBase<RelatorioPlanoEntrega, RelatorioPlanoEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public tipoAvaliacaoNotaDao: TipoAvaliacaoNotaDaoService;
  public relatorioPlanoEntregaDao: RelatorioPlanoEntregaDaoService;
  public botoes: ToolbarButton[] = [];
  public unidadeId: string = '';
  public loaded: boolean = false;
  public tiposNotas: LookupItem[] = [];

  constructor(public injector: Injector, dao: RelatorioPlanoEntregaDaoService) {
      super(injector, RelatorioPlanoEntrega, RelatorioPlanoEntregaDaoService);
      this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.tipoAvaliacaoNotaDao = injector.get<TipoAvaliacaoNotaDaoService>(TipoAvaliacaoNotaDaoService);
      this.relatorioPlanoEntregaDao = injector.get<RelatorioPlanoEntregaDaoService>(RelatorioPlanoEntregaDaoService);
      this.title = "Relatório de Planos de Entrega";
      this.filter = this.fh.FormBuilder({
          unidade_id: { default: this.auth.unidade?.id },
          agrupar: { default: true },
          data_inicio: { default: "" },
          data_fim: { default: "" },
          incluir_unidades_subordinadas: { default: false },
          exportar: { default: false },
          somente_vigentes: { default: false },
          id: { default: "" },
          nome: { default: "" },
          unidadeNome: { default: "" },
          status: { default: "" },
          duracao: { default: ""},
          data_conclusao: { default: "" },
          data_avaliacao: { default: "" },
          nota: { default: "" },
          situacao_avaliacao: { default: "" },
          homologador: { default: "" },
          entregaNome: { default: "" },
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

      this.tipoAvaliacaoNotaDao.query({ orderBy: [['sequencia', 'asc']] })
          .asPromise().then(notas => {
              const sanitizeNotas = notas.map(nota => ({
              id: nota.nota,
              nota: nota.nota.replaceAll('"', '')
              }))
              .filter((item, index, self) =>
              index === self.findIndex(t => t.nota === item.nota)
              );
              this.tiposNotas = this.lookup.map(sanitizeNotas, 'id', 'nota');
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

    if (form.data_inicio) {
      result.push(["dataInicio", ">=", form.data_inicio]);
    }

    if (form.data_fim) {
      result.push(["dataFim", "<=", form.data_fim]);
    }

    if (form.somente_vigentes) {
      result.push(["somente_vigentes", "==", 1]);
    }

    if (form.incluir_unidades_subordinadas) {
      result.push(["incluir_unidades_subordinadas", "==", 1]);
    }

    if (form.id) {
      result.push(["numero", "like", "%" + form.id + "%"]);
    }

    if (form.entregaNome) {
      result.push(["entregaNome", "like", "%" + form.entregaNome + "%"]);
    }

    if (form.unidadeNome) {
      result.push(["unidadeHierarquia", "like", "%" + form.unidadeNome + "%"]);
    }

    if (form.status) {
      result.push(["status", "==", form.status]);
    }

    if (form.nota) {
      result.push(["nota", "==", form.nota]);
    }

    if (form.duracao) {
      result.push(["duracao", "==", form.duracao]);
    }

    if (form.situacao_avaliacao) {
      result.push(["situacao_avaliacao", "==", form.situacao_avaliacao]);
    }

    if (form.data_avaliacao) {
      result.push(["data_avaliacao", "==", form.data_avaliacao.toISOString().slice(0,10)]);
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

      if (form?.exportar) {
        this.downloadXls(queryOptions);
      } else {
        this.grid?.query?.reload(queryOptions);
      }
    } else {
      this.filter!.markAllAsTouched(); 
    }
  }

  public async downloadXls(queryOptions: QueryOptions){
    let error: any = undefined;
    this.loading = true;
    try {
      this.dao!.exportarXls({
        where: queryOptions.where,
        orderBy: queryOptions.orderBy
      }).subscribe(res => {
        if (res && res.body) {
          const blob = new Blob([res.body!], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'relatorio-planos-entrega.xlsx';
          link.click();
          window.URL.revokeObjectURL(url);
        }
      }, error => {
        this.dialog.alert('Erro ao gerar Excel', 'Houve um erro ao tentar baixar o arquivo');
        console.log(error);
        this.error(error);
      });

      this.loading = false;
    } catch (error: any) {
      this.error(error);
    } finally {
      this.loading = false;
    }
  }

  public onValueChange(event: Event) {
    this.onButtonFilterClick(this.filter!);
  }
}
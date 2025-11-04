import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { RelatorioPlanoEntregaDaoService } from "src/app/dao/relatorio-plano-entrega-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { RelatorioPlanoEntrega } from "src/app/models/relatorio-plano-entrega.model";
import { LookupItem } from "src/app/services/lookup.service";
import { QueryOptions } from "src/app/dao/query-options";
import { TipoAvaliacaoNotaDaoService } from "src/app/dao/tipo-avaliacao-nota-dao.service";
import { of } from "rxjs";
import { RelatorioBaseComponent } from "../relatorio-base/relatorio-base.component";

@Component({
  selector: 'relatorio-plano-entrega',
  templateUrl: './relatorio-plano-entrega.component.html',
  styleUrls: ['./relatorio-plano-entrega.component.scss']
})
export class RelatorioPlanoEntregaComponent extends RelatorioBaseComponent<RelatorioPlanoEntrega, RelatorioPlanoEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public tipoAvaliacaoNotaDao: TipoAvaliacaoNotaDaoService;
  public botoes: ToolbarButton[] = [];
  public tiposNotas: LookupItem[] = [];
  public permissao: string = 'MOD_RELATORIO_PE';

  constructor(public injector: Injector, dao: RelatorioPlanoEntregaDaoService) {
      super(injector, RelatorioPlanoEntrega, RelatorioPlanoEntregaDaoService);
      this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.tipoAvaliacaoNotaDao = injector.get<TipoAvaliacaoNotaDaoService>(TipoAvaliacaoNotaDaoService);
      this.title = "Relatório de Planos de Entrega";
      this.filter = this.fh.FormBuilder({
          unidade_id: { default: this.auth.unidade?.id },
          agrupar: { default: true },
          data_inicio: { default: "" },
          data_fim: { default: "" },
          periodo_inicio: { default: "" },
          periodo_fim: { default: "" },
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
          situacao_conclusao: { default: "" },
          homologacao: { default: "" },
          entregaNome: { default: "" },
        });

      
      this.filter!.get('unidade_id')?.setValidators([
        this.lotacaoValidator.bind(this),
        this.requiredValidator.bind(this)
      ]);

      this.filter.get('unidade_id')?.updateValueAndValidity();

      this.orderBy = [['unidadeHierarquia', 'asc'], ['numero', 'asc']];
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
      result.push(["dataInicio", ">=", form.data_inicio.toISOString().slice(0,10)]);
    }

    if (form.data_fim) {
      result.push(["dataFim", "<=", form.data_fim.toISOString().slice(0,10)]);
    }

    if (form.periodo_inicio) {
      result.push(["periodoInicio", ">=", form.periodo_inicio.toISOString().slice(0,10)]);
    }

    if (form.periodo_fim) {
      result.push(["periodoFim", "<=", form.periodo_fim.toISOString().slice(0,10)]);
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

    if (form.situacao_conclusao) {
      result.push(["situacao_conclusao", "==", form.situacao_conclusao]);
    }

    if (form.data_avaliacao) {
      result.push(["data_avaliacao", "==", form.data_avaliacao.toISOString().slice(0,10)]);
    }

     if (form.data_conclusao) {
      result.push(["data_conclusao", "==", form.data_conclusao.toISOString().slice(0,10)]);
    }
    
    return result;
  };

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

  public getDataHomologacao(row: any): string {

    let retorno = this.dao!.getDateFormatted(row.data_homologacao) || '';
    if (row.status === 'ATIVO' || row.status === 'CONCLUIDO' || row.status === 'AVALIADO' || row.status === 'SUSPENSO') {
      if (retorno === '') {
        return 'Dispensado';
      }
    }
    return retorno;
  }
}
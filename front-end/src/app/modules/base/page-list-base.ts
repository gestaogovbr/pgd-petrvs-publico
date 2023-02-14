import { OnInit, Injector, Injectable, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaoBaseService, QueryOrderBy } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { PageBase } from './page-base';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { GridComponent, GroupBy } from 'src/app/components/grid/grid.component';
import { QueryContext } from 'src/app/dao/query-context';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { appInjector } from 'src/app/app.component';
import { QueryOptions } from 'src/app/dao/query-options';
import { AfastamentoDaoService } from 'src/app/dao/afastamento-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { TarefaDaoService } from 'src/app/dao/tarefa-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { FeriadoDaoService } from 'src/app/dao/feriado-dao.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { MaterialServicoDaoService } from 'src/app/dao/material-servico-dao.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoJustificativaDaoService } from 'src/app/dao/tipo-justificativa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import {TemplateDaoService} from "src/app/dao/template-dao.service";
import {AdesaoDaoService} from "src/app/dao/adesao-dao.service";

export type LogEntity = {
  table: string,
  campo: string,
  dao: any,
  label: string,
  selectRoute: FullRoute
}

//@Component({ template: '' })
@Injectable()
export abstract class PageListBase<M extends Base, D extends DaoBaseService<M>> extends PageBase implements OnInit {
  /* Poderá utilizar o componente Grid ou ser genérico, mas precisa fornecer o QueryContext */
  public grid?: GridComponent;
  public query?: QueryContext<M>;

  public dao?: D;
  public filter?: FormGroup;
  public filterCollapsed: boolean = true;
  public filterWhere?: (filter: FormGroup) => any[]
  public fixedFilter?: any[];

  /* configurações */
  public orderBy?: QueryOrderBy[];
  public groupBy?: GroupBy[];
  public join: string[] = [];
  public addRoute?: string[];
  public addParams?: any;
  public options: ToolbarButton[] = [];
  public rowsLimit = QueryContext.DEFAULT_LIMIT;
  public selectable: boolean = false;
  public static selectRoute?: FullRoute;
  public storeFilter?: (filter?: FormGroup) => any;
  public loadFilterParams?: (params: any, filter?: FormGroup) => void;
  public entities: LogEntity[] = [];
  public entity?: LogEntity;

  constructor(public injector: Injector, mType: Type<M>, dType: Type<D>) {
    super(injector);
    this.dao = injector.get<D>(dType);
    this.entities = [
      {table: 'afastamentos', campo: 'observacoes', dao: injector.get<AfastamentoDaoService>(AfastamentoDaoService), label: "Afastamento", selectRoute: {route: ['cadastros', 'afastamento']}},
      {table: 'atividades', campo: 'nome', dao: injector.get<AtividadeDaoService>(AtividadeDaoService), label: "Atividade", selectRoute: {route: ['cadastros', 'atividade']}},
      {table: 'cidades', campo: 'nome', dao: injector.get<CidadeDaoService>(CidadeDaoService), label: "Cidade", selectRoute: {route: ['cadastros', 'cidade']}},
      {table: 'entidades', campo: 'nome', dao: injector.get<EntidadeDaoService>(EntidadeDaoService), label: "Entidade", selectRoute: {route: ['configuracoes', 'entidade']}},
      {table: 'feriados', campo: 'nome', dao: injector.get<FeriadoDaoService>(FeriadoDaoService), label: "Feriado", selectRoute: {route: ['cadastros', 'feriado']}},
      {table: 'materiais_servicos', campo: 'descricao', dao: injector.get<MaterialServicoDaoService>(MaterialServicoDaoService), label: "Material/Serviço", selectRoute: {route: ['cadastros', 'material-servico']}},
      {table: 'perfis', campo: 'nome', dao: injector.get<PerfilDaoService>(PerfilDaoService), label: "Perfil", selectRoute: {route: ['configuracoes', 'perfil']}},
      {table: 'planos', campo: 'numero', dao: injector.get<PlanoDaoService>(PlanoDaoService), label: "Plano", selectRoute: {route: ['gestao', 'plano']}},
      {table: 'programas', campo: 'nome', dao: injector.get<ProgramaDaoService>(ProgramaDaoService), label: "Programa", selectRoute: {route: ['cadastros', 'programa']}},
      {table: 'projetos', campo: 'nome', dao: injector.get<ProjetoDaoService>(ProjetoDaoService), label: "Projeto", selectRoute: {route: ['gestao', 'projeto']}},
      {table: 'tarefas', campo: 'nome', dao: injector.get<TarefaDaoService>(TarefaDaoService), label: "Tarefa", selectRoute: {route: ['cadastros', 'tarefa']}},
      {table: 'templates', campo: 'titulo', dao: injector.get<TemplateDaoService>(TemplateDaoService), label: "Template", selectRoute: {route: ['cadastros', 'template']}},
      {table: 'tipos-atividades', campo: 'nome', dao: injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService), label: "Tipo de Atividade", selectRoute: {route: ['cadastros', 'tipo-atividade']}},
      {table: 'tipos-avaliacoes', campo: 'nome', dao: injector.get<TipoAvaliacaoDaoService>(TipoAvaliacaoDaoService), label: "Tipo de Avaliação", selectRoute: {route: ['cadastros', 'tipo-avaliacao']}},
      {table: 'tipos-documentos', campo: 'nome', dao: injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService), label: "Tipo de Documento", selectRoute: {route: ['cadastros', 'tipo-documento']}},
      {table: 'tipos-justificativas', campo: 'nome', dao: injector.get<TipoJustificativaDaoService>(TipoJustificativaDaoService), label: "Tipo de Justificativa", selectRoute: {route: ['cadastros', 'tipo-justificativa']}},
      {table: 'tipos-modalidades', campo: 'nome', dao: injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService), label: "Tipo de Modalidade", selectRoute: {route: ['cadastros', 'tipo-modalidade']}},
      {table: 'tipos-motivos-afastamentos', campo: 'nome', dao: injector.get<TipoMotivoAfastamentoDaoService>(TipoMotivoAfastamentoDaoService), label: "Tipo de Motivo de Afastamento", selectRoute: {route: ['cadastros', 'tipo-motivo-afastamento']}},
      {table: 'tipos-processos', campo: 'nome', dao: injector.get<TipoProcessoDaoService>(TipoProcessoDaoService), label: "Tipo de Processo", selectRoute: {route: ['cadastros', 'tipo-processo']}},
      {table: 'unidades', campo: 'nome', dao: injector.get<UnidadeDaoService>(UnidadeDaoService), label: "Unidade", selectRoute: {route: ['configuracoes', 'unidade']}},
      {table: 'usuarios', campo: 'nome', dao: injector.get<UsuarioDaoService>(UsuarioDaoService), label: "Usuário", selectRoute: {route: ['configuracoes', 'usuario']}},
    ];
  }

  public saveUsuarioConfig(config?: any) {
    const filter = {
      filter: this.storeFilter ? this.storeFilter(this.filter) : undefined,
      filterCollapsed: this.filterCollapsed
    };
    const order = {
      orderBy: this.orderBy
    }
    super.saveUsuarioConfig(Object.assign(filter, order, config || {}));
  }

  public filterSubmit(filter: FormGroup): QueryOptions | undefined {
    this.saveUsuarioConfig();
    return undefined;
  }

  public filterClear(filter: FormGroup): void {
    this.saveUsuarioConfig();
  }

  public filterCollapseChange(filter: FormGroup): void {
    this.filterCollapsed = !!this.grid?.filterRef?.collapsed;
    this.saveUsuarioConfig();
  }

  public static modalSelect(params?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(this.selectRoute) {
        const go = appInjector.get<NavigateService>(NavigateService);
        const route = {
          route: this.selectRoute!.route,
          params: Object.assign(this.selectRoute!.params || {}, { selectable: true, modal: true }, params)
        };
        go.navigate(route, {modalClose: resolve.bind(this)});
      } else {
        reject("Rota de seleção indefinida");
      }
    });
  }

  public modalRefreshId(entity: Base): RouteMetadata {
    return { modal: true, modalClose: async (modalResult?: string) => (this.grid?.query || this.query!).refreshId(entity.id) };
  }

  public modalRefresh() {
    return { modal: true, modalClose: async (modalResult?: string) => this.refresh() };
  }

  public get queryOptions() {
    return {
      where: this.filterWhere && this.filter ? this.filterWhere(this.filter) : [],
      orderBy: [...(this.groupBy || []).map(x => [x.field, "asc"] as QueryOrderBy), ...(this.orderBy || [])],
      join: this.join || [],
      limit: this.rowsLimit
    };
  }

  public onLoad() {
    this.grid?.queryInit();
    if(!this.grid) this.query = this.dao?.query(this.queryOptions, { after: () => this.cdRef.detectChanges() });
  }

  ngOnInit() {
    super.ngOnInit();
    this.selectable = !!this.queryParams?.selectable;
    if(this.selectable) {
      this.title = "Selecionar " + this.title;
    }
  }

  ngAfterViewInit() {
    if(this.usuarioConfig?.filter) {
      this.filter?.patchValue(this.usuarioConfig.filter, { emitEvent: true });
    }
    if(this.usuarioConfig?.filterCollapsed != undefined) {
      this.filterCollapsed = this.usuarioConfig?.filterCollapsed;
      this.cdRef.detectChanges();
    }
    if(this.queryParams?.filter) {
      if(this.loadFilterParams) {
        this.loadFilterParams(this.queryParams?.filter, this.filter);
      } else {
        this.filter?.patchValue(this.queryParams?.filter, { emitEvent: true });
      }
    }
    if(this.queryParams?.fixedFilter) {
      this.fixedFilter = this.queryParams?.fixedFilter;
    }
    this.onLoad();
  }

  public add = async () => {
    this.go.navigate({route: this.addRoute || [...this.go.currentOrDefault.route, "new"], params: this.addParams}, {
      filterSnapshot: undefined,
      querySnapshot: undefined,
      modalClose: (modalResult) => {
        if(modalResult) {
          this.refresh();
          this.dialog.topAlert("Registro incluído com sucesso!", 5000);
        }
      }
    });
  }

  public refresh(id?: string) {
    if(id) {
      return (this.grid!.query || this.query!).refreshId(id!);
    } else {
      return (this.grid!.query || this.query!).refresh();
    }
  }

  public consult = async (doc: M) => {
    this.go.navigate({route: [...this.go.currentOrDefault.route, doc.id, "consult"]});
  }

  public edit = async (doc: M) => {
    this.go.navigate({route: [...this.go.currentOrDefault.route, doc.id, "edit"]}, {
      filterSnapshot: undefined,
      querySnapshot: undefined,
      modalClose: (modalResult) => {
        if(modalResult) {
          this.refresh(doc.id);
          this.dialog.topAlert("Registro alterado com sucesso!", 5000);
        }
      }
    });
  }

  public delete = async (doc: M) => {
    const self = this;

    this.dialog.confirm("Exclui ?", "Deseja realmente excluir?").then(confirm => {
      if(confirm) {
        this.dao!.delete(doc).then(function () {
          (self.grid!.query || self.query!).removeId(doc.id);
          //self.grid!.query!.refresh();
          //self.dialog.alert("Sucesso", "Registro excluído com sucesso!");
          self.dialog.topAlert("Registro excluído com sucesso!", 5000);
        }).catch((error) => {
          self.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error));
        });
      }
    });
  }

  public error = (error: string) => {
    if(this.grid) this.grid.error = error;
  }

  public onSelect(selected: Base | IIndexable | null) {
    const routeId = this.modalRoute?.queryParams?.idroute;
    if(selected && routeId?.length) {
      this.go.setModalResult(routeId, selected);
      this.close();
    }
  }
}

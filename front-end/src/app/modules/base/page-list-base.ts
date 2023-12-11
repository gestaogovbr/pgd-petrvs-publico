import { OnInit, Injector, Injectable, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaoBaseService, QueryOrderBy } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { PageBase } from './page-base';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { GridComponent, GroupBy } from 'src/app/components/grid/grid.component';
import { QueryContext } from 'src/app/dao/query-context';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
//import { appInjector } from 'src/app/app.component';
import { QueryOptions } from 'src/app/dao/query-options';
import { TreeNode } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';


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
  public rowsLimit = QueryContext.DEFAULT_LIMIT;
  public selectable: boolean = false;
  public static selectRoute?: FullRoute;
  public afterAdd?: (modalResult: any) => void;
  public afterEdit?: (modalResult: any) => void;
  public storeFilter?: (filter?: FormGroup) => any;
  public loadFilterParams?: (params: any, filter?: FormGroup) => void;
  public selectButtons: ToolbarButton[] = [
    {
      color: "btn-outline-success",
      label: "Selecionar",
      icon: "bi-check-circle",
      disabled: () => !this.grid?.selected,
      onClick: () => this.onSelect(this.grid!.selected!)
    },
    {
      color: "btn-outline-danger",
      label: "Cancelar",
      icon: "bi bi-dash-circle",
      onClick: () => this.close()
    }
  ];

  constructor(public injector: Injector, mType: Type<M>, dType: Type<D>) {
    super(injector);
    this.dao = injector.get<D>(dType);
    this.OPTION_INFORMACOES.onClick = this.consult.bind(this);
    this.OPTION_EXCLUIR.onClick = this.delete.bind(this);
    this.OPTION_LOGS.onClick = this.showLogs.bind(this);
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
        const route = {
          route: this.selectRoute!.route,
          params: Object.assign(this.selectRoute!.params || {}, { selectable: true, modal: true }, params)
        };
        AppComponent.instance.go.navigate(route, {modalClose: resolve.bind(this)});
      } else {
        reject("Rota de seleção indefinida");
      }
    });
  }

  public modalRefreshId(entity: Base): RouteMetadata {
    return { modal: true, modalClose: (async (modalResult?: string) => this.refresh(entity.id)).bind(this) };
  }

  public modalRefresh() {
    return { modal: true, modalClose: (async (modalResult?: string) => this.refresh()).bind(this) };
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
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
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
    if(this.selectable && !this.title.startsWith("Selecionar ")) {
      this.title = "Selecionar " + this.title;
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
          if(this.afterAdd) this.afterAdd(modalResult);
          this.dialog.topAlert("Registro incluído com sucesso!", 5000);
        }
      }
    });
  }

  public refresh(id?: string) {
    if(id) {
      return (this.grid?.query || this.query!).refreshId(id!);
    } else {
      return (this.grid?.query || this.query!).refresh();
    }
  }

  public consult = async (doc: M) => {
    this.go.navigate({route: [...this.go.currentOrDefault.route, doc.id, "consult"]});
  }

  public showLogs = async (doc: M) => {
    this.go.navigate({route: ['logs', 'change', doc.id, "consult"]});
  }

  public edit = async (doc: M) => {
    this.go.navigate({route: [...this.go.currentOrDefault.route, doc.id, "edit"]}, {
      filterSnapshot: undefined,
      querySnapshot: undefined,
      modalClose: (modalResult) => {
        if(modalResult) {
          this.refresh(doc.id);
          if(this.afterEdit) this.afterEdit(modalResult);
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
    const routeId = (this.modalRoute || this.snapshot)?.queryParams?.idroute;
    /* Evento disparado automaticamente quando selecionava texto dentro de inputs, então é feito a checagem se o selected não é um Event */
    if(selected && !(selected instanceof Event) && routeId?.length) {
      this.go.setModalResult(routeId, selected);
      this.close();
    }
  }

  public cancel = async (doc: M) => {
    const self = this;

    this.dialog.confirm("Cancelar ?", "Deseja realmente cancelar o registro?").then(confirm => {
      if(confirm) {
        this.dao!.delete(doc).then(function () {
          (self.grid!.query || self.query!).removeId(doc.id);
          self.dialog.topAlert("Registro cancelado com sucesso!", 5000);
        }).catch((error) => {
          self.dialog.alert("Erro", "Erro ao cancelar: " + (error?.message ? error?.message : error));
        });
      }
    });
  }
}

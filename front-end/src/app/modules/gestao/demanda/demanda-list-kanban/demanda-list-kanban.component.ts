import { Component, Injector, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { FilterComponent } from 'src/app/components/grid/filter/filter.component';
import { CardItem, DockerComponent } from 'src/app/components/kanban/docker/docker.component';
import { KanbanComponent, KanbanDocker } from 'src/app/components/kanban/kanban.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { QueryOptions } from 'src/app/dao/query-options';
import { Demanda } from 'src/app/models/demanda.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { RouteMetadata } from 'src/app/services/navigate.service';
import { DemandaListBase, StatusDemanda } from '../demanda-list-base';

export type StatusDockerConfig = {
  naoIniciado: boolean, 
  pausado: boolean,
  iniciado: boolean,
  concluido: boolean,
  avaliado: boolean
}

@Component({
  selector: 'demanda-list-kanban',
  templateUrl: './demanda-list-kanban.component.html',
  styleUrls: ['./demanda-list-kanban.component.scss']
})
export class DemandaListKanbanComponent extends DemandaListBase {
  @ViewChild("filterRef", {static: false}) filterRef?: FilterComponent;
  @ViewChild("kanbanEtiquetas", {static: false}) kanbanEtiquetas?: KanbanComponent;
  @ViewChild("dockerNaoIniciado", {static: false}) dockerNaoIniciado?: DockerComponent;
  @ViewChild("dockerPausado", {static: false}) dockerPausado?: DockerComponent;
  @ViewChild("dockerIniciado", {static: false}) dockerIniciado?: DockerComponent;
  @ViewChild("dockerConcluido", {static: false}) dockerConcluido?: DockerComponent;
  @ViewChild("dockerAvaliado", {static: false}) dockerAvaliado?: DockerComponent;
  @Input() snapshot?: ActivatedRouteSnapshot;
  @Input() fixedFilter?: any[];

  public TITLE_OUTRAS = "Outras";
  public NAOINICIADO: number = 0;
  public PAUSADO: number = 1;
  public INICIADO: number = 2;
  public CONCLUIDO: number = 3;
  public AVALIADO: number = 4;
  public DOCKERS: string[] = ["NAOINICIADO", "PAUSADO", "INICIADO", "CONCLUIDO", "AVALIADO"];
  public cards: (CardItem[])[] = [[], [], [], [], []];
  public cardsConfig: StatusDockerConfig = {naoIniciado: false, pausado: false, iniciado: false, concluido: false, avaliado: false};
  public labels: KanbanDocker[] = [];
  public cardsVersion: number = 0;
  public dragDrop: any = {};
  public rowsLimit = 500;
  public kanbanQueryOptions: QueryOptions = {};
  public formEdit: FormGroup;
  public etiquetasEdit: LookupItem[] = [];
  public toolbarButtons: ToolbarButton[] = [
    {
      icon: "bi bi-search",
      label: "Filtrar",
      onClick: () => this.filterRef?.toggle()
    },
    {
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      label: "Incluir",
      onClick: async () => await this.add()
    }
  ];
  public outrasButtons: ToolbarButton[] = [
    {
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      hint: "Incluir nova lista a direita",
      onClick: this.incluirLista.bind(this)
    }
  ];
  public etiquetasButtons: ToolbarButton[] = [
    {
      icon: "bi bi-plus-circle",
      color: "btn-outline-success",
      hint: "Incluir nova lista a direita",
      onClick: this.incluirLista.bind(this)
    }
  ];
  public menuDockerNaoIniciado: ToolbarButton[] = [
    {
      icon: "bi bi-plus-circle",
      color: "btn-outline-primary",
      hint: "Incluir",
      onClick: async () => await this.add()
    }
  ];

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.code = "MOD_DMD";
    this.filter = this.fh.FormBuilder({
      atribuidas_para_mim: {default: false},
      usuario_id: {default: ""},
      somente_unidade_atual: {default: false},
      unidades_subordinadas: {default: false},
      unidade_id: {default: ""},
      numero_processo: {default: ""},
      status: {default: ""},
      usarEtiquetas: {default: !!this.usuarioConfig?.kanban_usar_etiquetas},
      resumido: {default: !!this.usuarioConfig?.kanban_resumido},
      etiquetas: {default: []}
    });
    this.formEdit = this.fh.FormBuilder({
      etiqueta: {default: null}
    });
    this.cardsConfig = Object.assign(this.cardsConfig, this.usuarioConfig?.kanban_status_dockers);
    this.groupBy = [];
    this.loadEtiquetas();
    this.loadLabel();
  }

  public defaultUsuarioConfig() {
    return Object.assign(super.defaultUsuarioConfig(), {
      active_tab: "TABELA",
      kanban_resumido: false,
      kanban_usar_etiquetas: false,
      kanban_status_dockers: {naoIniciado: false, pausado: false, iniciado: false, concluido: false, avaliado: false},
      kanban_etiquetas_dockers: []
    });   
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.query!.onLoadingChange = (loading) => {
      this.loading = loading;
      this.cdRef.detectChanges();
    }
    this.loading = this.query!.loading;
    this.query!.subject.asObservable().subscribe(this.onQueryLoad.bind(this));
    this.cdRef.detectChanges();
  }

  public isOutras(x: KanbanDocker): boolean {
    return x.title == this.TITLE_OUTRAS && !x.labels.length;
  } 

  public loadLabel() {
    const dockers: any[] = [...(this.usuarioConfig?.kanban_etiquetas_dockers || [])];
    if(!dockers.find(this.isOutras.bind(this))) dockers.splice(0, 0, {title: this.TITLE_OUTRAS, labels: [], collapse: false});
    this.labels = dockers.reduce((a, v) => {
      if(!a.find((x: any) => (x.title?.length && x.title == v.title) || (x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key))) {
        a.push({
          labels: this.isOutras(v) ? [] : v.labels,
          title: v.title,
          menu: this.isOutras(v) ? this.outrasButtons : this.etiquetasButtons,
          cards: [],
          editing: false,
          collapse: v.collapse
        });
      }
      return a;
    }, []); 
    /*this.labels = dockers.map(x => {
      return {
        labels: this.isOutras(x) ? [] : x.labels,
        title: x.title,
        menu: this.isOutras(x) ? this.outrasButtons : this.etiquetasButtons,
        cards: [],
        editing: false,
        collapse: x.collapse
      }        
    });*/
  }

  public get isEtiquetas(): boolean {
    return !!this.filter?.controls?.usarEtiquetas?.value;
  } 

  public onUsarEtiquetasChange(event: Event) {
    this.saveUsuarioConfig({kanban_usar_etiquetas: this.filter!.controls.usarEtiquetas.value});
    if(this.query) this.onQueryLoad(this.query!.rows);
  }

  public incluirLista(docker: DockerComponent) {
    this.labels.splice(docker.key + 1, 0, {
      labels: [],
      menu: this.etiquetasButtons,
      cards: [],
      editing: true,
      collapse: false
    });
    
    this.kanbanEtiquetas?.refreshDoubleScrollbar();
    this.cdRef.detectChanges();
  }

  public onResumidoChange(event: Event) {
    this.saveUsuarioConfig({kanban_resumido: this.filter!.controls.resumido.value});
    this.cdRef.detectChanges();
  }

  public loadEtiquetas() {
    //this.etiquetas = this.util.merge(row.atividade?.etiquetas_predefinidas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key); 
  }

  public getLabelStyle(label: KanbanDocker) {
    const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
    //const txtColor = this.util.contrastColor(bgColor);
    return `border-color: ${bgColor} !important;`;
  }

  public onDockerCollapse(docker: DockerComponent, collapse: boolean) {
    if(this.isEtiquetas) {
      this.labels[docker.key].collapse = collapse;
      this.saveEtiquetasUsuarioConfig();
    } else {
      this.cardsConfig = {
        naoIniciado: !!this.dockerNaoIniciado?.collapse,
        pausado: !!this.dockerPausado?.collapse,
        iniciado: !!this.dockerIniciado?.collapse,
        concluido: !!this.dockerConcluido?.collapse,
        avaliado: !!this.dockerAvaliado?.collapse
      };
      this.saveUsuarioConfig({kanban_status_dockers: this.cardsConfig});
    }
    this.kanbanEtiquetas?.refreshDoubleScrollbar();
  }

  public async editEtiquetas(docker: DockerComponent) {
    const label = this.labels[docker.key!];
    const allUsed = this.labels.reduce((a: string[], v: KanbanDocker, i: number) => {
      if(v.labels.length && i != docker.key) a.push(v.labels[0].key);
      return a;
    }, []);
    this.etiquetasEdit = this.etiquetas.filter(x => !allUsed.includes(x.key));
    this.formEdit.controls.etiqueta.setValue(label.labels.length ? label.labels[0].key : null);
  }

  public saveEtiquetasUsuarioConfig() {
    const dockers = this.labels.reduce((a: any[], v: any) => {
      if(!a.find((x: any) => (x.title?.length && x.title == v.title) || (x.labels?.length && v.labels?.length && x.labels[0].key == v.labels[0].key))) {
        a.push({
          title: v.title,
          labels: v.labels,
          collapse: v.collapse
        });
      }
      return a;
    }, []);
    /*const dockers = this.labels.map(x => {
      return {
        title: x.title,
        labels: x.labels,
        collapse: x.collapse
      }
    });*/
    this.saveUsuarioConfig({kanban_etiquetas_dockers: dockers});
  }

  public async saveEtiquetas(docker: DockerComponent) {
    const key = this.formEdit.controls.etiqueta.value;
    if(key?.length) {
      const label = this.labels[docker.key!];
      const etiqueta = this.etiquetasEdit.find(x => x.key == key);
      if(etiqueta) label.labels = [etiqueta];
      if(this.query) this.onQueryLoad(this.query!.rows);
      this.saveEtiquetasUsuarioConfig();
      return true;
    }
    return false;
  }

  public async cancelEtiquetas(docker: DockerComponent) {
    const label = this.labels[docker.key!];
    if(!label.labels?.length) {
      this.labels.splice(docker.key!, 1);
      this.kanbanEtiquetas?.refreshDoubleScrollbar();
    }
  }

  public async deleteEtiquetas(docker: DockerComponent) {
    this.labels.splice(docker.key!, 1);
    this.kanbanEtiquetas?.refreshDoubleScrollbar();
    if(this.query) this.onQueryLoad(this.query!.rows);
    this.saveEtiquetasUsuarioConfig();
  }

  public getNomes(context: any) {
    return Object.getOwnPropertyNames(context.filter.controls || {}).join(",");
  }

  public modalRefreshId(demanda: Demanda): RouteMetadata {
    return { 
      modal: true, 
      modalClose: (modalResult?: string) => {
        const destination = this.dragDrop.destination;
        const source = this.dragDrop.source;
        if(modalResult) {
          if(destination && source) {
            destination.list.splice(destination.index, 0, destination.card);
            source.list.splice(source.index, 1);
          }
          (this.grid?.query || this.query!).refreshId(demanda.id);
        }
        this.dragDrop = {};
      }
    };
  }

  public mergeEtiqueta(etiqueta: LookupItem) {
    if(!this.etiquetas.find(x => x.key == etiqueta.key)) {
      this.etiquetas.push(etiqueta);
    }
  }

  public filterSubmit(filter: FormGroup): QueryOptions {
    super.filterSubmit(filter);
    this.cards = [[], [], [], [], []];
    this.labels.forEach(x => x.cards = []);
    return this.queryOptions;
  }

  public onQueryLoad(rows?: any[]) {
    super.onGridLoad(rows);
    this.cardsVersion++;
    if(!this.filter?.controls?.usarEtiquetas?.value) {
      rows?.forEach(row => {
        const demanda: Demanda = row as Demanda;
        let status = demanda.metadados?.suspenso ? "SUSPENSO" : this.lookup.DEMANDA_STATUS.find(x => x.key == demanda.metadados?.status)?.key;
        switch(status || "LANCADO") {
          case "SUSPENSO": this.putCard(this.cards[this.PAUSADO], demanda); break;
          case "INICIADO": this.putCard(this.cards[this.INICIADO], demanda); break;
          case "CONCLUIDO": this.putCard(this.cards[this.CONCLUIDO], demanda); break;
          case "AVALIADO": this.putCard(this.cards[this.AVALIADO], demanda); break;
          default: this.putCard(this.cards[this.NAOINICIADO], demanda);
        }
      });
      for(let cards of this.cards) {
        for(let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++);
      }
    } else {
      const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
      rows?.forEach(row => {
        let demanda: Demanda = row as Demanda;
        let docker: KanbanDocker | undefined = undefined;
        demanda.etiquetas = demanda.etiquetas || [];
        for(let i = 0; i < demanda.etiquetas.length; i++) {
          for(let j = 1; j < this.labels.length && !docker; j++) {
            if(this.labels[j].labels[0].key == demanda.etiquetas[i].key) docker = this.labels[j];
          }
          if(!this.etiquetas.some(x => x.key == demanda.etiquetas[i].key)) this.etiquetas.push(demanda.etiquetas[i]);
        }
        this.putCard(docker?.cards || this.labels[outrasIndex]?.cards || [], demanda);
      });
      for(let cards of this.labels.map(x => x.cards || [])) {
        for(let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++);
      }
      /*this.labels[0].labels = [];
      this.etiquetas.forEach(x => {
        if(!this.labels.find(y => y.labels.find(z => z.key == x.key))) this.labels[0].labels.push(x)
      });*/
    }
    this.cdRef.detectChanges();
  }

  public putCard(list: CardItem[], demanda: Demanda) {
    const index = list.findIndex(x => x.id == demanda.id);
    const card = {
      id: demanda.id,
      title: demanda.atividade?.nome || "(Atividade não atribuída)",
      subTitle: demanda.assunto || "",
      data: demanda,
      version: this.cardsVersion,
      menu: undefined,
      dynamicMenu: this.dynamicCardMenu.bind(this)
    };
    if(index >= 0) {
      list[index] = Object.assign(list[index], card);
    } else {
      list.push(card);
    }
  }

  public dynamicCardMenu(card: CardItem): ToolbarButton[] | undefined {
    const menu: ToolbarButton[] | undefined = this.dynamicButtons(card.data);
    menu.push({
      icon: "bi bi-three-dots",
      hint: "Opções",
      dynamicItems: this.cardDynamicOptions.bind(this)
    });
    if(!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join()) card.menu = menu;
    return card.menu;
  }

  public cardDynamicOptions(card: CardItem): ToolbarButton[] | undefined {
    const olders = card.menu?.find(x => x.hint == "Opções");
    if(olders) {
      const options = this.dynamicOptions.bind(this)(card.data);
      if(!olders.items || olders?.items.map(x => x.label).join() != options.map(x => x.label).join()) olders.items = options;
    }
    return olders?.items;
  }

  public canDrop(status: string) {
    let self = this;
    return (drag: CardItem) => {
      if(self.isEtiquetas) {
        return true;
      } else {
        const buttons = self.dynamicOptions(drag.data);
        return !!buttons.find(x => x.id == status);
      }
    }
  }

  public updateEtiquetasDemanda(dragDrop: any) {
    const sourceLabel = this.labels.find(x => x.cards == dragDrop.source.list)?.labels[0];
    const destinationLabel = this.labels.find(x => x.cards == dragDrop.destination.list)?.labels[0];
    const demanda = dragDrop.destination.demanda as Demanda;
    if(sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key) return;
    if(sourceLabel) demanda.etiquetas.splice(demanda.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
    if(destinationLabel) demanda.etiquetas.unshift(destinationLabel);
    this.loading = true;
    this.dao!.update(demanda.id, {etiquetas: demanda.etiquetas}).then(demanda => this.modalRefreshId(demanda).modalClose!.bind(this)(demanda.id)).finally(() => this.loading = false);
  }

  public onDragged(item: any, list: any[], effect: DropEffect) {
    if(["copy", "move"].includes(effect)) {
      const index = list.indexOf(item);
      this.dragDrop.source = {list, index};
      if(this.isEtiquetas) this.updateEtiquetasDemanda(this.dragDrop);
    }
  }

  public onDrop(event: DndDropEvent, list?: any[]) {
    if(list && ["copy", "move"].includes(event.dropEffect)) {
      const demanda = event.data.data;
      const card = event.data;
      let index = typeof event.index === "undefined" ? list.length : event.index;
      this.dragDrop = {destination: {list, index, card, demanda}};
      if(!this.isEtiquetas) {
        const buttons = this.dynamicOptions(demanda);
        const docker = this.cards.indexOf(list);
        if(docker >= 0) {
          const action = buttons.find(x => x.id == this.DOCKERS[docker]);
          if(action?.onClick) action?.onClick(demanda);
        }
      }
    }
  }

  public onStatusClick(status: StatusDemanda) {
    this.filter?.controls.status.setValue(status.key);
    this.filterCollapsed = false;
    this.filterRef?.onButtonFilterClick();
    this.cdRef.detectChanges();
  }

  public onEtiquetaClick(etiqueta: LookupItem) {
    let etiquetas = this.filter!.controls.etiquetas.value;
    etiquetas.push(etiqueta);
    this.filter?.controls.etiquetas.setValue(etiquetas);
    this.filterCollapsed = false;
    this.filterRef?.onButtonFilterClick();
    this.cdRef.detectChanges();
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = this.fixedFilter || [];
    let form: any = filter.value;
 
    if(form.usuario_id?.length) {
      result.push(["usuario_id", "==", form.usuario_id]);
    } 
    if(form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }
    if(form.unidades_subordinadas) {
      result.push(["unidades_subordinadas", "==", true]);
    }
    if(form.etiquetas?.length) {
      result.push(["etiquetas", "in", form.etiquetas.map((x: LookupItem) => x.value)]);
    }
    if(form.numero_processo?.length) {
      result.push(["numero_processo", "==", form.numero_processo]);
    }
    if(form.status?.length && !result.find(x => x[0] == "status")) {
      result.push(["status", "==", form.status]);
    }
    result.push(["data_arquivamento", "==", null]); /* Não trazer as arquivadas */

    return result;
  }

  public filterClear(filter: FormGroup) {
    this.filter!.controls.atribuidas_para_mim.setValue(false);
    this.filter!.controls.usuario_id.setValue("");
    this.filter!.controls.somente_unidade_atual.setValue(false);
    this.filter!.controls.unidades_subordinadas.setValue(false);
    this.filter!.controls.unidade_id.setValue("");
    this.filter!.controls.numero_processo.setValue("");
    if(!this.fixedFilter?.length || !this.fixedFilter.find(x => x[0] == "status")) this.filter!.controls.status.setValue(null);
    this.filter!.controls.etiquetas.setValue([]);
    super.filterClear(filter);
  }

  public onSwimlaneDrop(event: DndDropEvent, fromIndex: number) {
    const element = this.labels[fromIndex];
    const toIndex = fromIndex < event.index! ? event.index!-1 : event.index!;
    this.labels.splice(fromIndex, 1);
    this.labels.splice(toIndex, 0, element);
    this.saveEtiquetasUsuarioConfig();
  }

}


import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CalendarOptions, EventInput, Identity } from '@fullcalendar/angular';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GanttTaskStatus, GanttResourceUnity, GanttResourceType, GanttProject, GanttAssignment, GanttTask, GanttResource, GanttRole } from 'src/app/components/gantt/gantt-models';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { MaterialServicoUnidade } from 'src/app/models/material-servico.model';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoRecurso, ProjetoRecursoTipo } from 'src/app/models/projeto-recurso.model';
import { ProjetoRegra } from 'src/app/models/projeto-regra.model';
import { ProjetoTarefa, ProjetoTarefaStatus } from 'src/app/models/projeto-tarefa.model';
import { HasAlocacoes, HasTarefas, Projeto, ProjetoStatus } from 'src/app/models/projeto.model';
import { Tarefa } from 'src/app/models/tarefa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import * as moment from 'moment';
import { LookupItem } from 'src/app/services/lookup.service';
import { KanbanComponent, KanbanDocker } from 'src/app/components/kanban/kanban.component';
import { CardItem, DockerComponent } from 'src/app/components/kanban/docker/docker.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { ProjetoService } from '../projeto.service';
import { ComponentColor } from 'src/app/components/component-base';

export type TarefaTotaisFilhos = {
  custo: number;
  progresso: number;
  duracao: number;
  inicio: Date | null,
  termino: Date | null
};

export type RecursoListItem = {
  url: string;
  hint: string;
};

@Component({
  selector: 'app-projeto-planejamento',
  templateUrl: './projeto-planejamento.component.html',
  styleUrls: ['./projeto-planejamento.component.scss']
})
export class ProjetoPlanejamentoComponent extends PageFormBase<Projeto, ProjetoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("planejamentoKanban", {static: false}) planejamentoKanban?: KanbanComponent;

  public TITLE_OUTRAS = "Outras";
  
  public project: GanttProject; 
  public projetoService: ProjetoService;
  public ganttHeight: number;
  public afterLoadData: boolean = false;
  public filter: FormGroup;
  public formEdit: FormGroup;
  public cardsVersion: number = 0;
  public dragDrop: any = {};
  public labels: KanbanDocker[] = [];
  public etiquetas: LookupItem[] = [];
  public etiquetasEdit: LookupItem[] = [];
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
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: []
  };

  constructor(public injector: Injector) {
    super(injector, Projeto, ProjetoDaoService);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.modalWidth = screen.availWidth - Math.round(screen.availWidth * 0.1); /* Variar de acordo com a resolução do usuário */
    this.ganttHeight = screen.availHeight - 350 - Math.round(screen.availHeight * 0.1); /* Variar de acordo com a resolução do usuário */
    console.log(this.ganttHeight, screen.availWidth, screen.availHeight);
    this.project = new GanttProject();
    this.form = this.fh.FormBuilder({}, this.cdRef, this.validate);
    this.filter = this.fh.FormBuilder({
      resumido: {default: false}
    }, this.cdRef, this.validate);
    this.formEdit = this.fh.FormBuilder({
      etiqueta: {default: null}
    });
    this.join = ["tarefas.alocacoes", "tipoProjeto", "usuario", "envolvidos", "regras", "recursos.usuario", "recursos.unidade", "recursos.materialServico", "alocacoes"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  ngOnInit() {
    super.ngOnInit();
    this.action = "edit";
  }

  public isOutras(x: KanbanDocker): boolean {
    return x.title == this.TITLE_OUTRAS && !x.labels.length;
  } 

  public incluirLista(docker: DockerComponent) {
    this.labels.splice(docker.key + 1, 0, {
      labels: [],
      menu: this.etiquetasButtons,
      cards: [],
      editing: true,
      collapse: false
    });
    this.planejamentoKanban?.refreshDoubleScrollbar();
    this.cdRef.detectChanges();
  }

  public loadKanbanDockers(projeto: Projeto) {
    const dockers: KanbanDocker[] = (projeto.kanban_dockers || []) as KanbanDocker[];
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
    }, [] as KanbanDocker[]); 
  }

  public loadKanbanCards(projeto: Projeto) {
    const outrasIndex = this.labels.findIndex(this.isOutras.bind(this));
    this.cardsVersion++;
    projeto.tarefas?.filter(row => !row.agrupador).forEach(row => {
      let tarefa: ProjetoTarefa = row as ProjetoTarefa;
      let docker: KanbanDocker | undefined = undefined;
      tarefa.etiquetas = tarefa.etiquetas || [];
      for(let i = 0; i < tarefa.etiquetas.length; i++) {
        for(let j = 1; j < this.labels.length && !docker; j++) {
          if(this.labels[j].labels[0].key == tarefa.etiquetas[i].key) docker = this.labels[j];
        }
        if(!this.etiquetas.some(x => x.key == tarefa.etiquetas[i].key)) this.etiquetas.push(tarefa.etiquetas[i]);
      }
      this.putCard(docker?.cards || this.labels[outrasIndex]?.cards || [], tarefa);
    });
    for(let cards of this.labels.map(x => x.cards || [])) {
      for(let i = 0; i < cards.length; cards[i].version != this.cardsVersion ? cards.splice(i, 1) : i++);
    }
  }

  public putCard(list: CardItem[], tarefa: ProjetoTarefa) {
    const index = list.findIndex(x => x.id == tarefa.id);
    const card = {
      id: tarefa.id,
      title: tarefa.nome || "DESCONHECIDO",
      subTitle: tarefa.descricao || "",
      data: tarefa,
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
    const menu: ToolbarButton[] | undefined = []; //this.dynamicButtons(card.data);
    menu.push({
      icon: "bi bi-three-dots",
      hint: "Opções",
      dynamicItems: this.cardDynamicOptions.bind(this)
    });
    if(!card.menu || card.menu.map(x => x.hint).join() != menu.map(x => x.hint).join()) card.menu = menu;
    return card.menu;
  }

  public cardDynamicOptions(card: CardItem): ToolbarButton[] | undefined {
    /*const olders = card.menu?.find(x => x.hint == "Opções");
    if(olders) {
      const options = this.dynamicOptions.bind(this)(card.data);
      if(!olders.items || olders?.items.map(x => x.label).join() != options.map(x => x.label).join()) olders.items = options;
    }
    return olders?.items;*/
    return [];
  }

  public saveEtiquetasProjeto() {
    /* Implementar */
  }

  public updateEtiquetasTarefa(dragDrop: any) {
    const sourceLabel = this.labels.find(x => x.cards == dragDrop.source.list)?.labels[0];
    const destinationLabel = this.labels.find(x => x.cards == dragDrop.destination.list)?.labels[0];
    const tarefa = dragDrop.destination.tarefa as ProjetoTarefa;
    if(sourceLabel && destinationLabel && sourceLabel.key == destinationLabel.key) return;
    if(sourceLabel) tarefa.etiquetas.splice(tarefa.etiquetas.findIndex(x => x.key == sourceLabel.key), 1);
    if(destinationLabel) tarefa.etiquetas.unshift(destinationLabel);
    //this.loading = true;
    //this.dao!.update(demanda.id, {etiquetas: demanda.etiquetas}).then(demanda => this.modalRefreshId(demanda).modalClose!.bind(this)(demanda.id)).finally(() => this.loading = false);
  }

  public onSwimlaneDrop(event: DndDropEvent, fromIndex: number) {
    const element = this.labels[fromIndex];
    const toIndex = fromIndex < event.index! ? event.index!-1 : event.index!;
    this.labels.splice(fromIndex, 1);
    this.labels.splice(toIndex, 0, element);
    this.saveEtiquetasProjeto();
  }

  public onDragged(item: any, list: any[], effect: DropEffect) {
    if(["copy", "move"].includes(effect)) {
      const index = list.indexOf(item);
      this.dragDrop.source = {list, index};
      this.updateEtiquetasTarefa(this.dragDrop);
    }
  }

  public onDrop(event: DndDropEvent, list?: any[]) {
    if(list && ["copy", "move"].includes(event.dropEffect)) {
      const demanda = event.data.data;
      const card = event.data;
      let index = typeof event.index === "undefined" ? list.length : event.index;
      this.dragDrop = {destination: {list, index, card, demanda}};
    }
  }

  public onDockerCollapse(docker: DockerComponent, collapse: boolean) {
    this.labels[docker.key].collapse = collapse;
    this.saveEtiquetasProjeto();
    this.planejamentoKanban?.refreshDoubleScrollbar();
  }

  public async saveEtiquetas(docker: DockerComponent) {
    const key = this.formEdit.controls.etiqueta.value;
    if(key?.length) {
      const label = this.labels[docker.key!];
      const etiqueta = this.etiquetasEdit.find(x => x.key == key);
      if(etiqueta) label.labels = [etiqueta];
      //if(this.query) this.onQueryLoad(this.query!.rows);
      this.loadKanbanCards(this.entity as Projeto);
      this.saveEtiquetasProjeto();
      return true;
    }
    return false;
  }

  public async deleteEtiquetas(docker: DockerComponent) {
    this.labels.splice(docker.key!, 1);
    this.planejamentoKanban?.refreshDoubleScrollbar();
    this.loadKanbanCards(this.entity as Projeto);
    this.saveEtiquetasProjeto();
  }

  public async cancelEtiquetas(docker: DockerComponent) {
    const label = this.labels[docker.key!];
    if(!label.labels?.length) {
      this.labels.splice(docker.key!, 1);
      this.planejamentoKanban?.refreshDoubleScrollbar();
    }
  }

  public getLabelStyle(label: KanbanDocker) {
    const bgColor = label.labels.length == 1 ? label.labels[0].color || "#000000" : "#000000";
    //const txtColor = this.util.contrastColor(bgColor);
    return `border-color: ${bgColor} !important;`;
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

  public loadEtiquetas() {
    //this.etiquetas = this.util.merge(row.atividade?.etiquetas_predefinidas, row.unidade?.etiquetas, (a, b) => a.key == b.key); 
    this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario!.config?.etiquetas, (a, b) => a.key == b.key); 
  }

  public async loadData(entity: Projeto, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.entity = entity;
    this.project = this.toGantt(entity);
    this.afterLoadData = true;
    this.calendarOptions.events = this.toCalendar(entity.tarefas || []);
    this.loadEtiquetas();
    this.loadKanbanDockers(entity);
    this.loadKanbanCards(entity);
    this.cdRef.detectChanges();
  }

  public onCalendarioFilterChange(tarefas: ProjetoTarefa[]) {
    this.calendarOptions.events = this.toCalendar(tarefas);
  }

  public getStatusColor(status: LookupItem): ComponentColor {
    return status.color as ComponentColor;
  }

  public getRecursos(tarefa: ProjetoTarefa, metadata: any): RecursoListItem[] {
    let result: RecursoListItem[] = [];
    for(let alocacao of tarefa.alocacoes || []) {
      const regra = this.projetoService.getNomesRegras(alocacao, "\n(", ")");
      const nome = alocacao.recurso?.nome?.length ? alocacao.recurso.nome + "\n" : "";
      switch(alocacao.recurso?.tipo) {
        case 'HUMANO': result.push({ url: alocacao.recurso.usuario?.url_foto || "assets/images/projetos/usuario.png", hint: nome + "Usuario: " + (alocacao.recurso.usuario?.nome || "(DESCONHECIDO)") + regra }); break;
        case 'MATERIAL': result.push({ url: "assets/images/projetos/material.png", hint: nome + "Material: " + (alocacao.recurso.material_servico?.descricao || "(DESCONHECIDO)") + regra }); break;
        case 'SERVICO': result.push({ url: "assets/images/projetos/servico.png", hint: nome + "Servico: " + (alocacao.recurso.material_servico?.descricao || "(DESCONHECIDO)") + regra }); break;
        case 'CUSTO': result.push({ url: "assets/images/projetos/custo.png", hint: nome + "Valor: " + this.util.formatDecimal(alocacao.recurso.valor) + regra }); break;
        case 'DEPARTAMENTO': result.push({ url: "assets/images/projetos/unidade.png", hint: nome + "Unidade: " + (alocacao.recurso.unidade?.nome || "(DESCONHECIDO)") + regra }); break;
      }
    }
    if(metadata) {
      const igual = JSON.stringify(result) == JSON.stringify(metadata.alocacoes);
      metadata.alocacoes = igual ? metadata.alocacoes : result;
      result = metadata.alocacoes;
    }
    return result;
  }

  public getStatus(tarefa: ProjetoTarefa, metadata: any): LookupItem[] {
    let result: LookupItem[] = [];
    result.push(this.lookup.PROJETO_TAREFA_STATUS.find(x => x.key == tarefa.status) || { key: "DESCONHECIDO", value: "Desconhecido", icon: "bi bi-question-octagon", color: "danger" });
    return result;
  }

  public async initializeData(form: FormGroup) {
    /* Nunca acontecerá pois sempre vai para a tela de planejamento editando (Já existindo registro no banco). O formulário do projeto é que é responsável por inserir um novo projeto 
    const usuario = this.auth.usuario!;
    let projeto = new Projeto();
    let recurso = new ProjetoRecurso({
      id: this.dao?.generateUuid(),
      usuario: usuario,
      usuario_id: usuario.id,
      nome: usuario.nome,
      tipo: "HUMANO",
      _status: "ADD"
    });
    let regra = new ProjetoRegra({
      id: this.dao?.generateUuid(),
      nome: "Criador"
    }); 
    let envolvido = new ProjetoEnvolvido({
      recurso_id: recurso.id,
      regra: regra
    });
    projeto.recursos = [recurso];
    projeto.regras = [regra];
    projeto.envolvidos = [envolvido];
    projeto.alocacoes = [];
    await this.loadData(projeto, this.form!);*/
  }

  public saveData(form: IIndexable): Promise<Projeto> {
    return new Promise<Projeto>((resolve, reject) => {
      const projeto = this.util.fill(new Projeto(), this.entity!);
      resolve(this.util.fillForm(projeto, this.form!.value));
    });
  }

  public toCalendar(tarefas: ProjetoTarefa[]): EventInput[] {
    let result: EventInput[] = [];
    (tarefas || []).forEach(tarefa => {
      if(!tarefa.agrupador) {
        result.push({
          start: tarefa.inicio,
          end: tarefa.termino,
          title: tarefa.nome
          //color?
        });
      }
    });
    return result;
  }

  public toGantt(projeto: Projeto): GanttProject {
    let index = 1; /* Indice utilizado globalmente para indexar as tarefas, a tarefa referente ao projeto já inicia com 0 */
    const tarefas = projeto.tarefas || [];
    const toGanttStatus = (status: ProjetoStatus | ProjetoTarefaStatus): GanttTaskStatus => {
      const castStatus: IIndexable = {
        PLANEJADO: "STATUS_ACTIVE",
        INICIADO: "STATUS_ACTIVE",
        CONCLUIDO: "STATUS_DONE",
        FALHO: "STATUS_FAILED",
        SUSPENSO: "STATUS_SUSPENDED",
        CANCELADO: "STATUS_FAILED",
        AGUARDANDO: "STATUS_WAITING"
      };
      return castStatus.hasOwnProperty(status) ? castStatus[status] : "STATUS_ACTIVE";
    }  
    const toGanttAssignments = (alocacoes: ProjetoAlocacao[]): GanttAssignment[] => {
      const toAssignmentDescription = (alocacao: ProjetoAlocacao): string => {
        let result = alocacao.descricao;
        if(!result?.length) {
          const recurso = (projeto.recursos || []).find(x => x.id == alocacao.recurso_id);
          result = recurso?.usuario?.nome || recurso?.unidade?.nome || "";
        }
        return result;
      }
      return (alocacoes || []).map(alocacao => new GanttAssignment({
        id: alocacao.id,
        extra: alocacao,
        resource_id: alocacao.recurso_id,
        roles_ids: alocacao.regras?.map(x => x.regra_id) || [],
        description: toAssignmentDescription(alocacao),
        quantity: (alocacao as any).quantidade || 1
      }));
    }
    const toGanttTask = (tarefa: ProjetoTarefa): GanttTask => {
      return new GanttTask({
        id: tarefa.id,
        index: index++,
        name: tarefa.nome,
        description: tarefa.descricao,
        extra: tarefa,
        progress: tarefa.progresso,
        start: tarefa.inicio,
        end: tarefa.termino,
        duration: tarefa.duracao,
        startIsMilestone: tarefa.inicio_marco,
        endIsMilestone: tarefa.termino_marco,
        hasChild: tarefa.tem_filhos,
        tasks: toTreeGanttTasks(tarefas.filter(x => x.tarefa_pai_id == tarefa.id).sort((a, b) => a.indice > b.indice ? 1 : (a.indice < b.indice ? -1 : 0))),
        status: toGanttStatus(tarefa.status),
        dependencies_ids: [], /* Implementar depois */
        assignments: toGanttAssignments(tarefa.alocacoes || []),
        collapsed: tarefa.contraido
      }); 
    }
    const toGanttResource = (recurso: ProjetoRecurso): GanttResource => {
      const toGanttResourceType = (tipo: ProjetoRecursoTipo): GanttResourceType => {
        const castTypes: IIndexable = {
          HUMANO: "HUMAN",
          MATERIAL: "MATERIAL",
          SERVICO: "SERVICE", 
          CUSTO: "COST",
          DEPARTAMENTO: "DEPARTMENT"
        };
        return castTypes.hasOwnProperty(tipo) ? castTypes[tipo] : "MATERIAL";
      };
      const toGanttPicture = (recurso: ProjetoRecurso): string => {
        return this.projetoService.getRecursoPicture(recurso);
      };
      const toGanttUnity = (unidade: MaterialServicoUnidade): GanttResourceUnity => {
        const castUnity: IIndexable = {
          UNIDADE: "UNITY",
          CAIXA: "BOX",
          METRO: "METER",
          KILO: "KILO",
          LITRO: "LITER",
          DUZIA: "DOZEN",
          MONETARIO: "CURRENCY",
          HORAS: "HOUR",
          DIAS: "DAY",
          PACOTE: "PACKAGE"
        };
        return castUnity.hasOwnProperty(unidade) ? castUnity[unidade] : "UNITY";
      };
      return new GanttResource({
        id: recurso.id,
        name: recurso.nome,
        picture: toGanttPicture(recurso),
        type: toGanttResourceType(recurso.tipo),
        unityCost: recurso.valor,
        unity: toGanttUnity(recurso.unidade_medida),
        extra: recurso
      });
    }
    const toGanttRole = (regra: ProjetoRegra): GanttRole => {
      return new GanttRole({
        id: regra.id,
        name: regra.nome,
        extra: regra
      });
    }
    const toTreeGanttTasks = (children: ProjetoTarefa[]): GanttTask[] => {
      return children.map(child => toGanttTask(child));
    }
    let gantt = new GanttProject({
      root: [new GanttTask({
        id: projeto.id,
        index: 0,
        level: 0,
        name: projeto.nome,
        description: projeto.descricao,
        extra: projeto,
        progress: projeto.progresso,
        start: projeto.inicio,
        end: projeto.termino,
        duration: projeto.duracao,
        startIsMilestone: false,
        endIsMilestone: false,
        hasChild: true,
        tasks: toTreeGanttTasks(tarefas.filter(x => !x.tarefa_pai_id).sort((a, b) => a.indice > b.indice ? 1 : (a.indice < b.indice ? -1 : 0))),
        status: toGanttStatus(projeto.status),
        dependencies_ids: [], /* Implementar depois */
        assignments: toGanttAssignments(projeto.alocacoes || []), /* Alocações */
        collapsed: false
      })],
      resources: (projeto.recursos || []).map(x => toGanttResource(x)),
      roles: (projeto.regras || []).map(x => toGanttRole(x))
    });
    /* Converte de arvore para lista de tasks */
    gantt.tasks = this.fromTaskTree(gantt.root, 0);
    return gantt;
  }

  public fromGantt(project: GanttProject, update: boolean = true): Projeto {
    let root = this.project.tasks[0];
    let origem = root.extra as Projeto;
    let index = 1;

    const fromGanttRules = (roles: GanttRole[]): ProjetoRegra[] => {
      let result = update ? origem.regras || [] : [];
      return this.util.mergeArrayOfObject(result, roles, "id", true, (src) => new ProjetoRegra({
        id: src.id,
        nome: src.name,
        projeto_id: projeto.id
      }), (dst, src) => dst.nome = src.name) as ProjetoRegra[];
    };
    const fromGanttResources = (resources: GanttResource[]): ProjetoRecurso[] => {
      const fromGanttResourceType = (resourceType: GanttResourceType): ProjetoRecursoTipo => {
        const castTypes: IIndexable = {
          HUMAN: "HUMANO",
          MATERIAL: "MATERIAL",
          SERVICE: "SERVICO", 
          COST: "CUSTO",
          DEPARTMENT: "DEPARTAMENTO"
        };
        return castTypes.hasOwnProperty(resourceType) ? castTypes[resourceType] : "MATERIAL";
      };
      const fromGanttUnity = (unity: GanttResourceUnity): MaterialServicoUnidade => {
        const castUnity: IIndexable = {
          UNITY: "UNIDADE",
          BOX: "CAIXA",
          METER: "METRO",
          KILO: "KILO",
          LITER: "LITRO",
          DOZEN: "DUZIA",
          CURRENCY: "MONETARIO",
          HOUR: "HORAS",
          DAY: "DIAS",
          PACKAGE: "PACOTE"
        };
        return castUnity.hasOwnProperty(unity) ? castUnity[unity] : "UNITY";
      };
      let result = update ? origem.recursos || [] : [];
      return this.util.mergeArrayOfObject(result, resources, "id", true, (src) => new ProjetoRecurso({
        nome: src.name,
        tipo: fromGanttResourceType(src.type),
        unidade_medida: fromGanttUnity(src.unity),
        valor: src.unityCost,
        projeto_id: projeto.id,
        usuario_id: (src.extra as ProjetoRecurso).usuario_id,
        unidade_id: (src.extra as ProjetoRecurso).unidade_id,
        material_servico_id: (src.extra as ProjetoRecurso).material_servico_id
      }), (dst, src) => Object.assign(dst, {
        nome: src.name,
        tipo: fromGanttResourceType(src.type),
        unidade_medida: fromGanttUnity(src.unity),
        valor: src.unityCost,
      })) as ProjetoRecurso[];
    };
    const fromGanttAssignment = (origem: HasAlocacoes, assignments: GanttAssignment[]): ProjetoAlocacao[] => {
      if(origem.aloca_proprios_recursos || origem.custos_proprios) {
        return this.util.mergeArrayOfObject(origem.alocacoes!, assignments, "id", true, (src) => {
          const recurso = (projeto.recursos || []).find(x => x.id == src.recurso_id);
          if(src.extra && recurso) {
            const isProjeto = origem.id == projeto.id;
            if(origem.custos_proprios) origem.custo += src.quantity * (recurso.valor || 0);
            return new ProjetoAlocacao({
              id: src.id,
              descricao: src.description,
              quantidade: src.quantity,
              recurso_id: src.resource_id,
              //regra_id: assign.role_id, /* TODO: Trazer de uma lista de regras */
              projeto_id: isProjeto ? origem.id : null,
              tarefa_id: !isProjeto ? origem.id : null
            });
          }
          return undefined;
        }, (dst, src) => {
          const recurso = (projeto.recursos || []).find(x => x.id == src.recurso_id);
          if(src.extra && recurso) {
            if(origem.custos_proprios) origem.custo += src.quantity * (recurso.valor || 0);
            Object.assign(dst, {
              descricao: src.description,
              quantidade: src.quantity,
              recurso_id: src.resource_id
            });
          }
        }) as ProjetoAlocacao[];
      }
      return [];
    };
    const updateTotals = (origem: HasAlocacoes & HasTarefas, totais: TarefaTotaisFilhos) => {
      if(origem.soma_progresso_filhos) origem.progresso = totais.progresso;
      if(origem.calcula_intervalo) {
        origem.inicio = totais.inicio || origem.inicio;
        origem.termino = totais.termino || origem.termino;
        origem.duracao = totais.duracao || origem.duracao;
      }
    }
    const fromGanttTasks = (pai: HasAlocacoes & HasTarefas, tasks: GanttTask[], path: string): TarefaTotaisFilhos => {
      let result: TarefaTotaisFilhos = {
        custo: 0,
        progresso: 0,
        duracao: 0,
        inicio: null,
        termino: null
      };
      /* Adiciona caso não exista, ou atualiza caso já exista (A exclusão de tarefas que não existem mais será feita utilizando tasksIds) */
      this.util.mergeArrayOfObject(projeto.tarefas!, tasks, "id", false, (action, dst, src) => {
        let origem = src.extra as ProjetoTarefa;
        let tarefa: ProjetoTarefa = dst;
        if(action == "ADD") {
          tarefa = new ProjetoTarefa({
            id: src.id,
            indice: index++,
            path: path,
            nome: src.name,
            descricao: src.description,
            id_processo: origem.id_processo,
            numero_processo: origem.numero_processo,
            id_documento: origem.id_documento,
            numero_documento: origem.numero_documento,
            inicio: src.start,
            termino: src.end,
            duracao: src.duration,
            progresso: src.progress,
            inicio_marco: src.startIsMilestone,
            termino_marco: src.endIsMilestone,
            tem_filhos: src.hasChild,
            agrupador: origem.agrupador, /* Implementar o isGroup */
            soma_progresso_filhos: origem.soma_progresso_filhos,
            status: origem.status,
            contraido: src.collapsed,
            custo: 0, //origem.custo,
            calcula_intervalo: src.hasChild && origem.calcula_intervalo,
            aloca_proprios_recursos: !src.hasChild || origem.aloca_proprios_recursos,
            soma_recusos_alocados_filhos: src.hasChild && origem.soma_recusos_alocados_filhos,
            custos_proprios: !src.hasChild || origem.custos_proprios,
            soma_custos_filhos: src.hasChild && origem.soma_custos_filhos
          });
        } else if(action == "EDIT") {
          Object.assign(tarefa, {
            indice: index++,
            path: path,
            nome: src.name,
            descricao: src.description,
            inicio: src.start,
            termino: src.end,
            duracao: src.duration,
            progresso: src.progress,
            inicio_marco: src.startIsMilestone,
            termino_marco: src.endIsMilestone,
            tem_filhos: src.hasChild,
            contraido: src.collapsed,
            custo: 0, //origem.custo,
            calcula_intervalo: src.hasChild && origem.calcula_intervalo,
            aloca_proprios_recursos: !src.hasChild || origem.aloca_proprios_recursos,
            soma_recusos_alocados_filhos: src.hasChild && origem.soma_recusos_alocados_filhos,
            custos_proprios: !src.hasChild || origem.custos_proprios,
            soma_custos_filhos: src.hasChild && origem.soma_custos_filhos
          });
        }
        /* Adiciona o ID */
        tasksIds.push(tarefa.id);
        /* custos e alocacoes */
        fromGanttAssignment(tarefa, src.assignments);
        /* Totais dos filhos (calculado recursivamente) e insere os filhos como tarefas (se tiver filhos) */
        if(src.hasChild) {
          let totaisFilhos = fromGanttTasks(tarefa, src.tasks || [], path + "/" + src.id);
          /* Atualiza valores pelo total dos filhos */
          updateTotals(tarefa, totaisFilhos);
        }
        /* Calculos feitos para serem retornados, que são utilizados logo aqui acima */
        if(pai.soma_progresso_filhos) result.progresso += src.progress || 0;
        if(pai.calcula_intervalo) {
          result.inicio = !result.inicio || src.start.getTime() < result.inicio.getTime() ? src.start : result.inicio;
          result.termino = !result.termino || src.end.getTime() > result.termino.getTime() ? src.end : result.termino;
        }
        //if(pai.soma_recusos_alocados_filhos)  /* Não precisa fazer nada, vai ser concatenado somente para exibição no toGantt */
        if(pai.soma_custos_filhos) result.custo += tarefa.custo;
        /* Adiciona a tarefa ao projeto */
        //projeto.tarefas!.push(tarefa); /* Não precisa adicionar, o mergeArrayOfObject já adiciona automaticamente */
        return tarefa;
      });
      /* progresso */
      if(pai.soma_progresso_filhos) result.progresso = result.progresso / (tasks.length || 1);
      return result;
    }
    /* Ids das tarefas, será utilizado ao fim para excluir as tarefas que foram excluídas */
    let tasksIds: string[] = [];
    /* Atualiza o objeto existente (origem) ou cria um novo objeto Projeto baseado no origem */
    let projeto = update ? origem : new Projeto(origem);
    Object.assign(projeto, {
      nome: root.name,
      descricao: root.description,
      inicio: root.start,
      termino: root.end,
      duracao: root.duration,
      progresso: root.progress,
      regras: fromGanttRules(project.roles),
      recursos: fromGanttResources(project.resources),
      alocacoes: [],
      tarefas: []
    });
    /* Refas a arvore root baseado nas tasks, para facilitar os calculos e totalizações */
    project.root = this.toTaskTree(project.tasks);
    /* Carrega as tarefas e alocações recursivamente */
    let totais = fromGanttTasks(projeto, project.root || [], "");
    /* Atualiza valores pelo total dos filhos */
    updateTotals(projeto, totais);
    return projeto;
  }

  public fromTaskTree(tasks: GanttTask[], level: number): GanttTask[] {
    let result: GanttTask[] = [];
    tasks.forEach(task => result.push(Object.assign(task, { level }), ...this.fromTaskTree(task.tasks || [], level + 1)));
    return result;
  }

  public toTaskTree(tasks: GanttTask[]): GanttTask[] {
    let levels: GanttTask[] = [tasks[0]]; /* Adiciona a raiz (que é o projeto) como sendo nível 0 */
    let last: number = 0;
    for(let task of tasks) {
      task.tasks = []; /* Limpa a lista de tasks */
      if(task.level) { /* Ignora o level 0, que o próprio projeto */
        task.level = Math.min(task.level, last + 1); /* Garante que os níveis crescem em uma unidade somente */
        levels[task.level-1].tasks?.push(task); /* Adiciona a task no pai */
        levels[task.level] = task;
      }
      last = task.level;
    }
    return [levels[0]];
  }

  public titleEdit = (entity: Projeto): string => {
    return "Editando: " + (entity?.nome || "");
  }
}


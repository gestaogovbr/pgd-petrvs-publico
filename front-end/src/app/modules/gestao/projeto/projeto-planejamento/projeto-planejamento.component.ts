import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CalendarOptions, EventInput, Identity } from '@fullcalendar/angular';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GanttTaskStatus, GanttResourceUnity, GanttResourceType, GanttProject, GanttAssignment, GanttTask, GanttResource, GanttRole } from 'src/app/components/gantt/gantt-models';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { MaterialServicoUnidade } from 'src/app/models/material-servico.model';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoEnvolvido } from 'src/app/models/projeto-envolvido.model';
import { ProjetoRecurso, ProjetoRecursoTipo } from 'src/app/models/projeto-recurso.model';
import { ProjetoRegra } from 'src/app/models/projeto-regra.model';
import { ProjetoTarefa, ProjetoTarefaStatus } from 'src/app/models/projeto-tarefa.model';
import { Projeto, ProjetoStatus } from 'src/app/models/projeto.model';
import { Tarefa } from 'src/app/models/tarefa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import * as moment from 'moment';
import { LookupItem } from 'src/app/services/lookup.service';
import { KanbanComponent, KanbanDocker } from 'src/app/components/kanban/kanban.component';
import { CardItem, DockerComponent } from 'src/app/components/kanban/docker/docker.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { BadgeColor } from 'src/app/components/badge/badge.component';

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
    this.project = this.toGantt(entity);
    this.afterLoadData = true;
    this.calendarOptions.events = this.toCalendar(entity);
    this.loadEtiquetas();
    this.loadKanbanDockers(entity);
    this.loadKanbanCards(entity);
    this.cdRef.detectChanges();
  }

  public getStatusColor(status: LookupItem): BadgeColor {
    return status.color as BadgeColor;
  }

  public getRecursos(tarefa: ProjetoTarefa, metadata: any): RecursoListItem[] {
    let result: RecursoListItem[] = [];
    for(let alocacao of tarefa.alocacoes || []) {
      const regra = alocacao.regra ? "\n(" + alocacao.regra.nome + ")" : "";
      const nome = alocacao.recurso?.nome?.length ? alocacao.recurso.nome + "\n" : "";
      switch(alocacao.recurso?.tipo) {
        case 'HUMANO': result.push({ url: alocacao.recurso.usuario?.url_foto || "./assets/images/projetos/usuario.png", hint: nome + "Usuario: " + (alocacao.recurso.usuario?.nome || "(DESCONHECIDO)") + regra }); break;
        case 'MATERIAL': result.push({ url: "./assets/images/projetos/material.png", hint: nome + "Material: " + (alocacao.recurso.material_servico?.descricao || "(DESCONHECIDO)") + regra }); break;
        case 'SERVICO': result.push({ url: "./assets/images/projetos/servico.png", hint: nome + "Servico: " + (alocacao.recurso.material_servico?.descricao || "(DESCONHECIDO)") + regra }); break;
        case 'CUSTO': result.push({ url: "./assets/images/projetos/custo.png", hint: nome + "Valor: " + this.util.formatDecimal(alocacao.recurso.valor) + regra }); break;
        case 'DEPARTAMENTO': result.push({ url: "./assets/images/projetos/unidade.png", hint: nome + "Unidade: " + (alocacao.recurso.unidade?.nome || "(DESCONHECIDO)") + regra }); break;
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

  public toCalendar(projeto: Projeto): EventInput[] {
    let result: EventInput[] = [];
    (projeto.tarefas || []).forEach(tarefa => {
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
    const toGanttAssignments = (alocacoes: (ProjetoAlocacao | ProjetoEnvolvido)[]): GanttAssignment[] => {
      const toAssignmentDescription = (alocacao: ProjetoAlocacao | ProjetoEnvolvido): string => {
        let result = (alocacao as any).descricao as string || "";
        if(!result.length) {
          const recurso = (projeto.recursos || []).find(x => x.id == alocacao.recurso_id);
          result = recurso?.usuario?.nome || recurso?.unidade?.nome || "";
        }
        return result;
      }
      return (alocacoes || []).map(alocacao => new GanttAssignment({
        id: alocacao.id,
        resource_id: alocacao.recurso_id,
        role_id: alocacao.regra_id,
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
        return (recurso.tipo == "HUMANO" ? recurso.usuario?.url_foto || "/assets/images/projetos/usuario.png" :
               (recurso.tipo == "CUSTO" ? "/assets/images/projetos/custo.png" :
               (recurso.tipo == "DEPARTAMENTO" ? "/assets/images/projetos/unidade.png" :
               (recurso.tipo == "SERVICO" ? "/assets/images/projetos/servico.png" : "/assets/images/projetos/material.png"))));
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
      tasks: [new GanttTask({
        id: projeto.id,
        index: 0,
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
        assignments: toGanttAssignments([...(projeto.envolvidos || []), ...(projeto.alocacoes || [])]), /* Envolvidos + Alocações */
        collapsed: false
      })],
      resources: (projeto.recursos || []).map(x => toGanttResource(x)),
      roles: (projeto.regras || []).map(x => toGanttRole(x))
    });

    return gantt;
  }

  public fromGantt(project: GanttProject): Projeto {
    let root = this.project.tasks[0];
    let origem = root.extra as Projeto;
    let index = 1;

    const fromGanttRules = (roles: GanttRole[]): ProjetoRegra[] => {
      return roles.map(role => new ProjetoRegra({
        id: role.id,
        nome: role.name,
        projeto_id: projeto.id
      }));
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
      return resources.map(resource => new ProjetoRecurso({
        nome: resource.name,
        tipo: fromGanttResourceType(resource.type),
        unidade_medida: fromGanttUnity(resource.unity),
        valor: resource.unityCost,
        projeto_id: projeto.id,
        usuario_id: (resource.extra as ProjetoRecurso).usuario_id,
        unidade_id: (resource.extra as ProjetoRecurso).unidade_id,
        material_servico_id: (resource.extra as ProjetoRecurso).material_servico_id
      }));
    };
    const fromGanttStakeholders = (assigns: GanttAssignment[]): ProjetoEnvolvido[] => {
      let result: ProjetoEnvolvido[] = [];
      for(let assign of assigns || []) {
        const envolvido = (origem.envolvidos || []).find(x => x.id == assign.id);
        if(envolvido) {
          result.push(new ProjetoEnvolvido({
            projeto_id: projeto.id,
            recurso_id: assign.resource_id,
            regra_id: assign.role_id
          }));
        }
      }
      return result;
    }
    const fromGanttTasks = (projeto: Projeto, pai: Projeto | ProjetoTarefa, tasks: GanttTask[], path: string): TarefaTotaisFilhos => {
      let result: TarefaTotaisFilhos = {
        custo: 0,
        progresso: 0,
        duracao: 0,
        inicio: null,
        termino: null
      };
      const fromGanttAssignment = (tarefa: ProjetoTarefa, origem: ProjetoAlocacao, assign: GanttAssignment): ProjetoAlocacao => {
        return new ProjetoAlocacao({
          id: assign.id,
          descricao: assign.description,
          quantidade: assign.quantity,
          recurso_id: assign.resource_id,
          regra_id: assign.role_id,
          projeto_id: origem.projeto_id,
          tarefa_id: origem.tarefa_id
        });
      };
      for(let task of root.tasks || []) {
        let origem = task.extra as ProjetoTarefa;
        let tarefa = new ProjetoTarefa({
          id: task.id,
          indice: index++,
          path: path,
          nome: task.name,
          descricao: task.description,
          id_processo: origem.id_processo,
          numero_processo: origem.numero_processo,
          id_documento: origem.id_documento,
          numero_documento: origem.numero_documento,
          inicio: task.start,
          termino: task.end,
          duracao: task.duration,
          progresso: task.progress,
          inicio_marco: task.startIsMilestone,
          termino_marco: task.endIsMilestone,
          tem_filhos: task.hasChild,
          agrupador: origem.agrupador, /* Implementar o isGroup */
          soma_progresso_filhos: origem.soma_progresso_filhos,
          status: origem.status,
          contraido: task.collapsed,
          custo: 0, //origem.custo,
          calcula_intervalo: task.hasChild && origem.calcula_intervalo,
          aloca_proprios_recursos: !task.hasChild || origem.aloca_proprios_recursos,
          soma_recusos_alocados_filhos: task.hasChild && origem.soma_recusos_alocados_filhos,
          custos_proprios: !task.hasChild || origem.custos_proprios,
          soma_custos_filhos: task.hasChild && origem.soma_custos_filhos
        });
        /* custos e alocacoes */
        if(tarefa.aloca_proprios_recursos || tarefa.custos_proprios) {
          for(let assign of task.assignments || []) {
            const alocacao = (origem.alocacoes || []).find(x => x.id == assign.id);
            if(alocacao) {
              if(tarefa.aloca_proprios_recursos) fromGanttAssignment(tarefa, alocacao, assign);
              if(tarefa.custos_proprios) {
                const recurso = (projeto.recursos || []).find(x => x.id == alocacao.recurso_id);
                tarefa.custo += alocacao.quantidade * (recurso?.valor || 0);
              } 
            } 
          }
        }
        /* Totais dos filhos (calculado recursivamente) e insere os filhos como tarefas (se tiver filhos) */
        if(task.hasChild) {
          let totaisFilhos = fromGanttTasks(projeto, tarefa, task.tasks || [], path + "/" + task.id);
          /* Atualiza valores pelo total dos filhos */
          if(tarefa.soma_progresso_filhos) tarefa.progresso = totaisFilhos.progresso;
          if(tarefa.calcula_intervalo) {
            tarefa.inicio = totaisFilhos.inicio || tarefa.inicio;
            tarefa.termino = totaisFilhos.termino || tarefa.termino;
            tarefa.duracao = totaisFilhos.duracao || tarefa.duracao;
          }
        }
        /* Calculos feitos para serem retornados, que são utilizados logo aqui acima */
        if(pai.soma_progresso_filhos) result.progresso += task.progress || 0;
        if(pai.calcula_intervalo) {
          result.inicio = !result.inicio || task.start.getTime() < result.inicio.getTime() ? task.start : result.inicio;
          result.termino = !result.termino || task.end.getTime() > result.termino.getTime() ? task.end : result.termino;
        }
        //if(pai.soma_recusos_alocados_filhos)  /* Não precisa fazer nada, vai ser concatenado somente para exibição no toGantt */
        if(pai.soma_custos_filhos) result.custo += tarefa.custo;
        /* Adiciona a tarefa ao projeto */
        projeto.tarefas!.push(tarefa);
      }
      /* progresso */
      if(pai.soma_progresso_filhos) result.progresso = result.progresso / (root.tasks?.length || 1);
      return result;
    }
    let projeto = new Projeto({
      numero: origem.numero,
      nome: root.name,
      descricao: root.description,
      finalidade: origem.finalidade,
      status: origem.status,  
      inicio: root.start,
      termino: root.end,
      calcula_custos: origem.calcula_custos,
      tempo_corrido: origem.tempo_corrido,
      usar_horas: origem.usar_horas,
      calcula_intervalo: origem.calcula_intervalo,
      agrupador: origem.agrupador,
      soma_progresso_filhos: origem.soma_progresso_filhos,
      aloca_proprios_recursos: origem.aloca_proprios_recursos,
      soma_recusos_alocados_filhos: origem.soma_recusos_alocados_filhos,
      custos_proprios: origem.custos_proprios,
      soma_custos_filhos: origem.soma_custos_filhos,
      duracao: root.duration,
      progresso: root.progress,
      usuario_id: origem.usuario_id,
      tipo_projeto_id: origem.tipo_projeto_id,
      regras: fromGanttRules(project.roles),
      recursos: fromGanttResources(project.resources),
      envolvidos: fromGanttStakeholders(root.assignments || []),
      alocacoes: [],
      tarefas: []
    });
    /* Carrega as tarefas e alocações recursivamente */
    fromGanttTasks(projeto, projeto, project.tasks || [], "");
    return projeto;
  }

  public titleEdit = (entity: Projeto): string => {
    return "Editando: " + (entity?.nome || "");
  }
}


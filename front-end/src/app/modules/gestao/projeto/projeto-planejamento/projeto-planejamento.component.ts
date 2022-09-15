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

export type TarefaTotaisFilhos = {
  custo: number;
  progresso: number;
  duracao: number;
  inicio: Date | null,
  termino: Date | null
};

@Component({
  selector: 'app-projeto-planejamento',
  templateUrl: './projeto-planejamento.component.html',
  styleUrls: ['./projeto-planejamento.component.scss']
})
export class ProjetoPlanejamentoComponent extends PageFormBase<Projeto, ProjetoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public project: GanttProject; 
  public ganttHeight: number;
  public afterLoadData: boolean = false;

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

  public async loadData(entity: Projeto, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.project = this.toGantt(entity);
    this.afterLoadData = true;
    this.calendarOptions.events = this.toCalendar(entity);
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    /* Nunca acontecerá pois sempre vai para a tela de planejamento editando (Já existindo registro no banco). O formulário do projeto é que é responsável por inserir um novo projeto */
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
    await this.loadData(projeto, this.form!);
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


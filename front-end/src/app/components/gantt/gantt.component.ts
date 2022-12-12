import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { UtilService } from 'src/app/services/util.service';
import { GanttAssignment, GanttProject, GanttResource, GanttRole, GanttTask } from './gantt-models';
import * as moment from 'moment';
import * as $ from 'jquery';
import { ToolbarButton } from '../toolbar/toolbar.component';

export type GanttPeriod = {
  start: Date,
  end: Date,
  duration: number
};

@Component({
  selector: 'gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  @Input() height: number = 500;
  /* Situações que devem ser previstas:
  - Apenas start: quando se deseja saber qual primeira data inicial útil a partir da data start informada
  - Apenas end: quando se deseja saber qual o ultimo dia útil igual ou inferior a data end informada
  - start e duration: calcula-se a data end
  - end e duration: calcula-se a data start
  - start e end: calcula-se a duration */
  @Input() period: (task: any, start?: Date, end?: Date, duration?: number) => GanttPeriod;
  @Input() ganttButtons: ToolbarButton[] = [];
  @Input() taskButtons: ToolbarButton[] = [];
  @Input() set project(value: GanttProject) {
    if(this._project != value) {
      this._project = value;
      if(this.initialized) this.reload();
    }
  }
  get project(): GanttProject {
    return this._project;
  }

  public defaultGanttButtons: ToolbarButton[] = [
    { onClick: this.triggerClick('undo.gantt'), class: "requireCanWrite", hint: "undo", icon: "teamworkIcon", iconChar: "'" },
    { onClick: this.triggerClick('redo.gantt'), class: "requireCanWrite", hint: "redo", icon: "teamworkIcon", iconChar: "·" },
    { divider: true },
    { onClick: this.triggerClick('expandAll.gantt'), class: "", hint: "Expandir todos", icon: "teamworkIcon", iconChar: "6" },
    { onClick: this.triggerClick('collapseAll.gantt'), class: "", hint: "Contrair todos", icon: "teamworkIcon", iconChar: "5" },
    { divider: true },
    { onClick: this.triggerClick('zoomMinus.gantt'), class: "", hint: "Almentar zoom", icon: "teamworkIcon", iconChar: ")" },
    { onClick: this.triggerClick('zoomPlus.gantt'), class: "", hint: "Diminuir zoom", icon: "teamworkIcon", iconChar: "(" },
    { divider: true },
    { onClick: this.triggerClick('print.gantt'), class: "", hint: "Imprimir", icon: "teamworkIcon", iconChar: "p" },
    { divider: true, class: "requireCanSeeCriticalPath" },
    { onClick: this.showCriticalPath.bind(this), class: "requireCanSeeCriticalPath", hint: "CRITICAL_PATH", icon: "teamworkIcon", iconChar: "£" },
    { divider: true },
    { onClick: this.triggerClick('splitter.gantt', [.1]), class: "", hint: "Only grid", icon: "teamworkIcon", iconChar: "F" },
    { onClick: this.triggerClick('splitter.gantt', [50]), class: "", hint: "Both", icon: "teamworkIcon", iconChar: "O" },
    { onClick: this.triggerClick('splitter.gantt', [100]), class: "", hint: "Only gantt", icon: "teamworkIcon", iconChar: "R" },
    { onClick: this.triggerClick('fullScreen.gantt'), class: "", hint: "FULLSCREEN", icon: "teamworkIcon", iconChar: "@" },
    { onClick: (() => this.ge.element.toggleClass('colorByStatus')).bind(this), class: "", hint: "Cores pelo status", icon: "teamworkIcon", iconChar: "§" }
  ];
  public defaultTaskButtons: ToolbarButton[] = [
    { divider: true, class: "requireCanWrite requireCanAdd"},
    { onClick: this.triggerClick('addAboveCurrentTask.gantt'), class: "requireCanWrite requireCanAdd", hint: "insert above", icon: "teamworkIcon", iconChar: "l" },
    { onClick: this.triggerClick('addBelowCurrentTask.gantt'), class: "requireCanWrite requireCanAdd", hint: "insert below", icon: "teamworkIcon", iconChar: "X" },
    { divider: true, class: "requireCanWrite requireCanInOutdent"},
    { onClick: this.triggerClick('outdentCurrentTask.gantt'), class: "requireCanWrite requireCanInOutdent", hint: "un-indent task", icon: "teamworkIcon", iconChar: "." },
    { onClick: this.triggerClick('indentCurrentTask.gantt'), class: "requireCanWrite requireCanInOutdent", hint: "indent task", icon: "teamworkIcon", iconChar: ":" },
    { divider: true, class: "requireCanWrite requireCanMoveUpDown"},
    { onClick: this.triggerClick('moveUpCurrentTask.gantt'), class: "requireCanWrite requireCanMoveUpDown", hint: "move up", icon: "teamworkIcon", iconChar: "k" },
    { onClick: this.triggerClick('moveDownCurrentTask.gantt'), class: "requireCanWrite requireCanMoveUpDown", hint: "move down", icon: "teamworkIcon", iconChar: "j" },
    { divider: true, class: "requireCanWrite requireCanDelete"},
    { onClick: this.triggerClick('deleteFocused.gantt'), class: "delete requireCanWrite", hint: "Elimina", icon: "teamworkIcon", iconChar: "d" },
  ];
  public loading: boolean = false;
  public ge: any = undefined;
  public id: string;
  public selected?: GanttTask;
  public set error(value: string) {
    if(this._error != value) {
      this._error = value;
      this.cdRef.detectChanges();
    }
  }
  public get dirty(): boolean {
    return !!this.project.dirty;
  }

  private _error: string = "";
  private _project: GanttProject = new GanttProject();
  private _buttons: ToolbarButton[] = [];
  private initialized: boolean = false;

  constructor(
    public bootstrap: BootstrapService,
    public util: UtilService,
    public gb: GlobalsService,
    public cdRef: ChangeDetectorRef
  ) {
    this.id = util.md5();
    this.period = this.defaultPeriod;
  }

  private defaultPeriod = (task: any, start?: Date, end?: Date, duration?: number): GanttPeriod => {
    return {
      start: start || moment(end).add((duration || 0) * (-1), this.project!.config.hasTime ? 'hours' : 'days').toDate(),
      end: end || moment(start).add((duration || 0), this.project!.config.hasTime ? 'hours' : 'days').toDate(),
      duration: duration || start && end ? moment(start).diff(moment(end), this.project!.config.hasTime ? 'hours' : 'days') : 0
    };
  }

  public calcPeriod(task: any, start?: Date | number, end?: Date | number, duration?: number): GanttPeriod {
    const startDate: Date | undefined = typeof start == "undefined" || start instanceof Date ? start : new Date(start);
    const endDate: Date | undefined = typeof end == "undefined" || end instanceof Date ? end : new Date(end);
    const result = this.period(task, startDate, endDate, duration);
    if(!this.project.config.hasTime) {
      result.start.setHours(0, 0, 0, 0);
      result.end.setHours(23, 59, 59, 999);
    }
    return result;
  }

  ngOnInit(): void {
    const baseGanttUrl = "assets/gantt/";
    let files = [
      "platform.css",
      "libs/jquery/dateField/jquery.dateField.css",
      "gantt.css",
      "libs/jquery/jquery.livequery.1.1.1.min.js",
      "libs/jquery/jquery.timers.js",
      "libs/utilities.js",
      "libs/forms.js",
      "libs/date.js",
      "libs/dialogs.js",
      "libs/layout.js",
      "libs/i18nJs.js",
      "libs/jquery/dateField/jquery.dateField.js",
      "libs/jquery/JST/jquery.JST.js",
      "libs/jquery/valueSlider/jquery.mb.slider.js",
      "libs/jquery/svg/jquery.svg.min.js",
      "libs/jquery/svg/jquery.svgdom.1.8.js",
      "ganttUtilities.js",
      "ganttTask.js",
      "ganttDrawerSVG.js",
      "ganttZoom.js",
      "ganttGridEditor.js",
      "ganttMaster.js"
    ];
    let print = [
      "ganttPrint.css",
      "libs/jquery/valueSlider/mb.slider.css"
    ];
    // "http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
    // "http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"
    this.loading = true;
    this.bootstrap.load(files.map(x => baseGanttUrl + x), print.map(x => baseGanttUrl + x)).then(() => {
      let canWrite = true; //this is the default for test purposes
      // here starts gantt initialization
      //@ts-ignore
      this.ge = new GanttMaster(this);
      this.ge.ganttHeight = this.height;
      this.ge.resourceUrl = "assets/gantt/res/";
      this.ge.set100OnClose = true;
      this.ge.shrinkParent = true;
      this.ge.permissions = {
        canWriteOnParent: true,
        canWrite: true,
        canAdd: true,
        canDelete: true,
        canInOutdent: true,
        canMoveUpDown: true,
        canSeePopEdit: false,
        canSeeFullEdit: false,
        canSeeDep: false,
        canSeeCriticalPath: true,
        canAddIssue: false,
        cannotCloseTaskIfIssueOpen: false
      };
      this.ge.init($("#workSpace" + this.id));
      this.loadI18n(); //overwrite with localized ones
      //in order to force compute the best-fitting zoom level
      delete this.ge.gantt.zoom;

      this.reload();
      this.initialized = true;
      //initializeHistoryManagement(ge.tasks[0].id);

      /* Native resource editors
      //@ts-ignore
      $.JST.loadDecorator("RESOURCE_ROW", function(resTr, res) {
        //@ts-ignore
        resTr.find(".delRes").click(function(){$(this).closest("tr").remove()});
      });
      //@ts-ignore
      $.JST.loadDecorator("ASSIGNMENT_ROW", function(assigTr, taskAssig){
        var resEl = assigTr.find("[name=resourceId]");
        var opt = $("<option>");
        resEl.append(opt);
        for(var i=0; i< taskAssig.task.master.resources.length;i++){
          var res = taskAssig.task.master.resources[i];
          opt = $("<option>");
          opt.val(res.id).html(res.name);
          if(taskAssig.assig.resourceId == res.id)
            opt.attr("selected", "true");
          resEl.append(opt);
        }
        var roleEl = assigTr.find("[name=roleId]");
        for(var i=0; i< taskAssig.task.master.roles.length;i++){
          var role = taskAssig.task.master.roles[i];
          var optr = $("<option>");
          optr.val(role.id).html(role.name);
          if(taskAssig.assig.roleId == role.id)
            optr.attr("selected", "true");
          roleEl.append(optr);
        }
        if(taskAssig.task.master.permissions.canWrite && taskAssig.task.canWrite){
          assigTr.find(".delAssig").click(function() {
            //@ts-ignore
            var tr = $(this).closest("[assId]").fadeOut(200, function(){$(this).remove()});
          });
        }
      });*/
    });
  }

  public getChar(char: number): string {
    return String.fromCharCode(char);
  }

  public reload() {
    //let project = this.getDemoProject();
    //let project: any = this.loadProject();
    if (!this.project.canWrite) $(".ganttButtonBar button.requireWrite").attr("disabled","true");
    /* configurações personalizadas criadas posteriormente */
    this.ge.useTime = this.project.config.hasTime;
    this.ge.hasCost = this.project.config.hasCost;
    this.project.selectedRow = Math.max(Math.min(this.project.selectedRow, this.project.tasks.length - 1), 0);
    this.ge.loadProject(this.project);
    this.ge.checkpoint(); //empty the undo stack
  }

  /*public getRecursiveGanttTasks(tasks: GanttTask[], level: number, project: any) {
    for(let task of tasks) {
      const assigs = (task.assignments || []).filter(assig => project.resources.find((x: any) => x.id == assig.resource_id)).map(assig => {
        return { id: assig.id, resourceId: assig.resource_id, roleId: assig.role_id, effort: "", description: assig.description, quantity: assig.quantity }
      });
      /*for(let assig of ) {
        if(assig.resource_id && project.resources.find((x: any) => x.id == assig.resource_id)) {
          assigs.push();
        } else if(assig.resource) {
          if(!project.resources.find((x: any) => x.id == assig.resource!.id)) {
            project.resources.push({ id: assig.resource!.id, name: assig.resource!.name, picture: assig.resource!.picture });
          }
          assigs.push({ id: assig.id, resourceId: assig.resource!.id, roleId: "", effort: "" });
        }
      }*
      project.tasks.push({
        id: task.id,
        name: task.name,
        progress: task.progress || 0,
        progressByWorklog: false,
        relevance: 0,
        type: "",
        typeId: "",
        description: task.description,
        code: "",
        level: level,
        status: task.status || "STATUS_ACTIVE",
        depends: "",
        canWrite: true,
        start: task.start.getTime(),
        duration: task.duration || 0,
        end: task.end.getTime(),
        startIsMilestone: !!task.startIsMilestone,
        endIsMilestone: !!task.endIsMilestone,
        collapsed: !!task.collapsed,
        assigs: assigs,
        hasChild: !!task.hasChild,
        dependencies_ids: task.dependencies_ids || []
      });
      if(task.hasChild) this.getRecursiveGanttTasks(task.tasks || [], level+1, project);
    }
  }*/

  /* Função não será mais necessário pois o gantt já irá trabalhar com o objeto GanttProject *
  public loadProject() {
    let project = {
      tasks: new Array<any>(),
      selectedRow: 2,
      deletedTaskIds: new Array<string>(),
      resources: new Array<any>(),
      roles: new Array<any>(),
      canWrite: true,
      canDelete: false,
      canWriteOnParent: true,
      canAdd: false
    };
    // Load roles list
    project.roles = this.project.roles.map(role => {
      return { id: role.id, name: role.name, extra: role.extra };
    });
    // Load resources list
    project.resources = this.project.resources.map(resource => {
      return { id: resource.id, name: resource.name, picture: resource.picture, extra: resource.extra };
    });
    // Load tasks, deps and assignments
    this.getRecursiveGanttTasks(this.project.tasks, 0, project);
    for(let task of project.tasks) task.depends = task.dependencies_ids.map((dep: string) => project.tasks.findIndex(x => x.id == dep) + 1).filter((x: any) => x).join(":");
    return project;
  }*/

  /*public getRecursiveProjectTasks(tasks: any[], index: number, level: number, parent: GanttProject | GanttTask) {
    let before = parent;
    for(; index < tasks.length && tasks[index].level >= level; index++) {
      if(tasks[index].level > level) {
        index = this.getRecursiveProjectTasks(tasks, index, tasks[index].level, before) - 1;
      } else {
        const task = tasks[index];
        const assigs = (task.assigs || []).map((assig: any) => {
          return Object.assign(new GanttAssignment(), { id: assig.id, resource_id: assig.resourceId, role_id: assig.roleId, description: assig.description, quantity: assig.quantity });
        });
        const deps = (task.depends || "").split(":").filter((x: string) => x.length).map((index: any) => tasks[index-1].id);
        parent.tasks!.push(Object.assign(new GanttTask(), {
          id: task.id,
          index: index,
          name: task.name,
          description: task.description,
          extra: undefined,
          progress: task.progress,
          start: new Date(task.start),
          end: new Date(task.end),
          duration: task.duration,
          startIsMilestone: task.startIsMilestone,
          endIsMilestone: task.endIsMilestone,
          hasChild: task.hasChild,
          tasks: [],
          status: task.status,
          dependencies_ids: deps,
          assignments: assigs,
          collapsed: task.collapsed,
        }));
      }
      before = tasks[index];
    }
    return index;
  }*/

  /*public storeProject() {
    let project = new GanttProject();
    let gantt = this.ge.saveGantt();
    // Store roles list
    project.roles = gantt.roles.map((role: any) => {
      return new GanttRole({ id: role.id, name: role.name, extra: role.extra });
    });
    // Store resources list
    project.resources = this.project.resources.map(resource => {
      return new GanttResource({ id: resource.id, name: resource.name, picture: resource.picture, type: resource.type, unityCost: resource.unityCost, unity: resource.unity, extra: resource.extra });
    });
    // Store tasks, deps and assignments
    this.getRecursiveProjectTasks(gantt.tasks, 0, 0, project);
    return project;
  }*/

  public get buttons(): ToolbarButton[] {
    let buttons = [
      ...this.defaultGanttButtons.filter(x => !x.hidden),
      ...this.ganttButtons.filter(x => !x.hidden),
      ...this.defaultTaskButtons.filter(x => !x.hidden),
      ...this.taskButtons.filter(x => !!this.selected && !x.hidden)
    ];
    if(JSON.stringify(this._buttons) != JSON.stringify(buttons)) this._buttons = buttons;
    return this._buttons;
  }

  public triggerClick(event: string, parameters: any = undefined) {
    return (() => $('#workSpace' + this.id).trigger(event, parameters)).bind(this);
  }

  public showCriticalPath() {
    this.ge.gantt.showCriticalPath = !this.ge.gantt.showCriticalPath;
    this.ge.redraw();
  }

  public loadI18n() {
    //@ts-ignore
    GanttMaster.messages = {
      "CANNOT_WRITE":"Sem premissões para alterar a seguinte tarefa:",
      "CHANGE_OUT_OF_SCOPE":"Atualização do projeto não é possível devido não possuir permissões para atualizar o projeto pai.",
      "START_IS_MILESTONE":"Data início é um marco (milestone).",
      "END_IS_MILESTONE":"Data fim é um marco (milestone).",
      "TASK_HAS_CONSTRAINTS":"Tarefa tem restrições.",
      "GANTT_ERROR_DEPENDS_ON_OPEN_TASK":"Erro: há uma dependência em uma tarefa aberta.",
      "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK":"Erro: devido a um descendente de uma tarefa fechada.",
      "TASK_HAS_EXTERNAL_DEPS":"Esta tarefa tem dependências externas.",
      //"GANNT_ERROR_LOADING_DATA_TASK_REMOVED":"GANNT_ERROR_LOADING_DATA_TASK_REMOVED",
      "CIRCULAR_REFERENCE":"Referência circular.",
      "CANNOT_DEPENDS_ON_ANCESTORS":"Não pode depender de ancestrais.",
      "INVALID_DATE_FORMAT":"O dado inserido é inválido para o formato do campo.",
      "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"Um erro ocorreu enquanto carregava os dados. A tarefa foi descartada.",
      "CANNOT_CLOSE_TASK_IF_OPEN_ISSUE":"Não é possível fechar uma tarefa que tenham questões pendentes",
      //"TASK_MOVE_INCONSISTENT_LEVEL":"Você não pode intercambiar tarefas de diferentes profundidades.",
      "CANNOT_MOVE_TASK":"CANNOT_MOVE_TASK",
      "PLEASE_SAVE_PROJECT":"PLEASE_SAVE_PROJECT",
      "GANTT_SEMESTER":"Semestre",
      "GANTT_SEMESTER_SHORT":"6m.",
      "GANTT_QUARTER":"Trimestre",
      "GANTT_QUARTER_SHORT":"3m.",
      "GANTT_WEEK":"Semana",
      "GANTT_WEEK_SHORT":"s."
    };
  }

  public clearGantt() {
    this.ge.reset();
  }

}

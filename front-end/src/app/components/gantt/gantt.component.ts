import { Component, Input, OnInit } from '@angular/core';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { UtilService } from 'src/app/services/util.service';
import { GanttResource, GanttTask } from './gantt-models';

@Component({
  selector: 'gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  @Input() tasks: GanttTask[] = [];
  @Input() resources: GanttResource[] = [];

  public loading: boolean = false;
  public ge: any = undefined;
  public id: string;

  constructor(public bootstrap: BootstrapService, public util: UtilService) {
    this.id = util.md5();
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
      this.ge = new GanttMaster();
      this.ge.resourceUrl = "assets/gantt/res/";
      this.ge.set100OnClose = true;
      this.ge.shrinkParent = true;
      this.ge.permissions = {
        canWriteOnParent: false,
        canWrite: false,
        canAdd: true,
        canDelete: true,
        canInOutdent: false,
        canMoveUpDown: true,
        canSeePopEdit: false,
        canSeeFullEdit: false,
        canSeeDep: false,
        canSeeCriticalPath: false,
        canAddIssue: false,
        cannotCloseTaskIfIssueOpen: false
      };
      this.ge.init($("#workSpace" + this.id));
      this.loadI18n(); //overwrite with localized ones
      //in order to force compute the best-fitting zoom level
      delete this.ge.gantt.zoom;

      this.reload();
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

  public reload() {
    //let project = this.getDemoProject();
    let project: any = this.getProject();
    if (!project.canWrite) $(".ganttButtonBar button.requireWrite").attr("disabled","true");
    this.ge.loadProject(project);
    this.ge.checkpoint(); //empty the undo stack
  }

  public getRecursiveTasks(tasks: GanttTask[], level: number, project: any) {
    for(let task of tasks) {
      let assigs: any[] = [];
      for(let assig of (task.assignments || [])) {
        if(assig.resource_id && project.resources.find((x: any) => x.id == assig.resource_id)) {
          assigs.push({ id: assig.id, resourceId: assig.resource_id, roleId: "", effort: "" });
        } else if(assig.resource) {
          if(!project.resources.find((x: any) => x.id == assig.resource!.id)) {
            project.resources.push({ id: assig.resource!.id, name: assig.resource!.name, picture: assig.resource!.picture });
          }
          assigs.push({ id: assig.id, resourceId: assig.resource!.id, roleId: "", effort: "" });
        }
      }
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
        collapsed: false,
        assigs: assigs,
        hasChild: !!task.hasChild
      });
      if(task.hasChild) this.getRecursiveTasks(task.tasks || [], level+1, project);
    }
  }

  public getProject() {
    let project: any = {
      tasks: [],
      selectedRow: 2,
      deletedTaskIds: [],
      resources: [],
      roles: [], 
      canWrite: true,
      canDelete: false,
      canWriteOnParent: true,
      canAdd: false 
    };
    // Load resources list
    project.resources = this.resources.map(resource => {
      return { id: resource.id, name: resource.name, picture: resource.picture };
    });
    // Load tasks and resources
    this.getRecursiveTasks(this.tasks, 0, project);
    return project;
  }

  public getDemoProject() {
    const ret = {"tasks": [
      {"id": -1, "name": "Gantt editor", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 0, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 20, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [{id: "tmp_1", resourceId: "tmp_1", roleId: "", effort: ""}], "hasChild": true},
      {"id": -2, "name": "coding", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 1, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 10, "end": 1398203999999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": true},
      {"id": -3, "name": "gantt part", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_ACTIVE", "depends": "", "canWrite": true, "start": 1396994400000, "duration": 2, "end": 1397167199999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -4, "name": "editor part", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "3", "canWrite": true, "start": 1397167200000, "duration": 4, "end": 1397685599999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -5, "name": "testing", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 1, "status": "STATUS_SUSPENDED", "depends": "2:5", "canWrite": true, "start": 1398981600000, "duration": 5, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": true},
      {"id": -6, "name": "test on safari", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "", "canWrite": true, "start": 1398981600000, "duration": 2, "end": 1399327199999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -7, "name": "test on ie", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "6", "canWrite": true, "start": 1399327200000, "duration": 3, "end": 1399586399999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false},
      {"id": -8, "name": "test on chrome", "progress": 0, "progressByWorklog": false, "relevance": 0, "type": "", "typeId": "", "description": "", "code": "", "level": 2, "status": "STATUS_SUSPENDED", "depends": "6", "canWrite": true, "start": 1399327200000, "duration": 2, "end": 1399499999999, "startIsMilestone": false, "endIsMilestone": false, "collapsed": false, "assigs": [], "hasChild": false}
    ], "selectedRow": 2, "deletedTaskIds": [],
    "resources": [
      {"id": "tmp_1", "name": "Resource 1", picture: "./assets/images/profile.png"},
      {"id": "tmp_2", "name": "Resource 2", picture: "./assets/images/profile.png"},
      {"id": "tmp_3", "name": "Resource 3", picture: "./assets/images/profile.png"},
      {"id": "tmp_4", "name": "Resource 4", picture: "./assets/images/profile.png"}
    ],
    "roles":       [
      {"id": "tmp_1", "name": "Project Manager"},
      {"id": "tmp_2", "name": "Worker"},
      {"id": "tmp_3", "name": "Stakeholder"},
      {"id": "tmp_4", "name": "Customer"}
    ], "canWrite":    true, "canDelete":true, "canWriteOnParent": true, canAdd:true};
    let offset=new Date().getTime()-ret.tasks[0].start;
    for (let i = 0; i < ret.tasks.length; i++) {
      ret.tasks[i].start = ret.tasks[i].start + offset;
    }
    return ret;
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
      "GANNT_ERROR_LOADING_DATA_TASK_REMOVED":"GANNT_ERROR_LOADING_DATA_TASK_REMOVED",
      "CIRCULAR_REFERENCE":"Referência circular.",
      "CANNOT_DEPENDS_ON_ANCESTORS":"Não pode depender de ancestrais.",
      "INVALID_DATE_FORMAT":"O dado inserido é inválido para o formato do campo.",
      "GANTT_ERROR_LOADING_DATA_TASK_REMOVED":"Um erro ocorreu enquanto carregava os dados. A tarefa foi descartada.",
      "CANNOT_CLOSE_TASK_IF_OPEN_ISSUE":"Não é possível fechar uma tarefa que tenham questões pendentes",
      "TASK_MOVE_INCONSISTENT_LEVEL":"Você não pode intercambiar tarefas de diferentes profundidades.",
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

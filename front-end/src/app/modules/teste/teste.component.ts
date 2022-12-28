import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { CardItem } from 'src/app/components/kanban/docker/docker.component';
import { GanttAssignment, GanttProject, GanttResource, GanttTask } from 'src/app/components/gantt/gantt-models';
import { CalendarOptions } from '@fullcalendar/angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Expediente } from 'src/app/models/expediente.model';
import { Feriado } from 'src/app/models/feriado.model';
import { Afastamento } from 'src/app/models/afastamento.model';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {
  public form: FormGroup;
  public items: LookupItem[] = [];
  public disabled: boolean = true;
  public Editor = ClassicEditor;
  public expediente = new Expediente({"domingo":[],"segunda":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"terca":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"quarta":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"quinta":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"sexta":[{"inicio":"08:00","fim":"12:00","data":null,"sem":false},{"inicio":"14:00","fim":"18:00","data":null,"sem":false}],"sabado":[],"especial":[]});

  public naoIniciadas: CardItem[] = [
    {id: "ni1", title: "Não iniciada 1", subTitle: "Texto não iniciado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"},
    {id: "ni2", title: "Não iniciada 2", subTitle: "Texto não iniciado 2", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"},
    {id: "ni3", title: "Não iniciada 3", subTitle: "Texto não iniciado 3", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];
  public pausadas: CardItem[] = [
    {id: "p1", title: "Pausada 1", subTitle: "Texto 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];
  public iniciadas: CardItem[] = [
    {id: "i1", title: "iniciada 1", subTitle: "Texto iniciado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"},
    {id: "i2", title: "iniciada 2", subTitle: "Texto iniciado 2", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];
  public concluidas: CardItem[] = [];
  public avaliadas: CardItem[] = [
    {id: "a1", title: "avaliada 1", subTitle: "avaliado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens"}
  ];

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', start: moment().add(-1, 'days').toDate(), end: moment().add(1, 'days').toDate() },
      { title: 'event 2', start: moment().add(1, 'days').toDate(), end: moment().add(5, 'days').toDate() }
    ]
  };

  public buttons: ToolbarButton[] = [
    {
      label: "Calcular data fim",
      onClick: () => {
        let form = this.form.value;
        this.efemerides = this.calendar.calculaDataTempo(form.inicio, form.tempo, form.forma, form.carga_horaria, this.expediente, form.feriados.map((x: LookupItem) => x.data), [], form.afastamentos.map((x: LookupItem) => x.data));
      }
    },
    {
      label: "Calcular tempo",
      onClick: () => {
        let form = this.form.value;
        this.efemerides = this.calendar.calculaDataTempo(form.inicio, form.fim, form.forma, form.carga_horaria, this.expediente, form.feriados.map((x: LookupItem) => x.data), [], form.afastamentos.map((x: LookupItem) => x.data));
      }
    }
  ];

  public project: GanttProject; 
  public efemerides?: Efemerides;
  public resources: GanttResource[] = [];

  constructor(
    public fh: FormHelperService, 
    public usuarioDao: UsuarioDaoService, 
    public lookup: LookupService,
    public util: UtilService,
    public calendar: CalendarService,
    @Inject('ID_GENERATOR_BASE') public ID_GENERATOR_BASE: any
  ) {
    this.form = fh.FormBuilder({
      id: {default: ""},
      campo1: {default: ""},
      campo2: {default: new Date()},
      campo3: {default: new Date()},
      campo4: {default: ""},
      campo5: {default: true},
      datetime: {default: new Date()},
      forma: {default: ""},
      tempo: {default: 0},
      feriados: {default: []},
      afastamentos: {default: []},
      inicio: {default: new Date()},
      fim: {default: new Date()},
      carga_horaria: {default: 24},
      dia: {default: 0},
      mes: {default: 0},
      ano: {default: 0},
      inicio_afastamento: {default: new Date()},
      fim_afastamento: {default: new Date()},
      observacao: {default: ""},
      nome: {default: ""},
      rate: {default: 2},
      horas: {default: 150.5},
      label: {default: ""},
      valor: {default: 15.5},
      icon: {default: null},
      color: {default: null},
      multiselect: {default: []}
      /*display: {default: "Mensagem de teste"},
      switch: {default: false},
      search: {default: ""},
      button: {default: ""},
      cor: {default: ""},
      text: {default: ""},
      textarea: {default: ""},
      datetime: {default: new Date()},
      radio: {default: "SIM"},
      select: {default: "PE"},
      label: {default: ""},
      icon: {default: null},
      color: {default: null}*/
    });
    this.project = new GanttProject();
    this.project.tasks =[new GanttTask({
      id: "a80b71cf-e112-11ec-a5bb-0050569c64a0",
      name: "Projeto 1",
      description: "Projeto de testes 1",
      progress: 50,
      start: this.incDate(-2),
      end: this.incDate(5),
      duration: 7,
      hasChild: true,
      tasks: [
        new GanttTask({
          id: "a80b71cf-e112-11ec-a5bb-0050569c64a1",
          name: "Tarefa de teste 1",
          description: "Tarefa de testes 1",
          progress: 50,
          start: this.incDate(-1),
          end: this.incDate(1),
          duration: 2,
          assignments: [new GanttAssignment({resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1"})]
        }),
        new GanttTask({
          id: "a80b71cf-e112-11ec-a5bb-0050569c64a2",
          name: "Tarefa de teste 2",
          description: "Tarefa de testes 2",
          progress: 50,
          start: this.incDate(1),
          end: this.incDate(3),
          duration: 2,
          assignments: [new GanttAssignment({resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a2"})]
        })
      ],
      assignments: [
        new GanttAssignment({resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1"}), 
        new GanttAssignment({resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a2"})
      ]
    }),
    new GanttTask({
      id: "a80b71cf-e112-11ec-a5bb-0050579c64a0",
      name: "Projeto 2",
      description: "Projeto de testes 2",
      progress: 50,
      start: this.incDate(3),
      end: this.incDate(9),
      duration: 7,
      hasChild: true,
      tasks: [
        {
          id: "a80b71cf-e112-11ec-a5bb-1050569c64a1",
          name: "Tarefa de teste 2-1",
          description: "Tarefa de testes 2-1",
          progress: 50,
          start: this.incDate(3),
          end: this.incDate(9),
          duration: 2,
          assignments: [new GanttAssignment({resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1"})]
        }        
      ],
      assignments: [
        new GanttAssignment({resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1"}), 
      ]
    })];
    this.project.resources = [
      new GanttResource({
        id: "a80b71ff-e112-11ec-a5bb-0050569c64a1",
        name: "Genisson",
        picture: "assets/images/profile.png",
        type: "HUMAN"
      }),
      new GanttResource({
        id: "a80b71ff-e112-11ec-a5bb-0050569c64a2",
        name: "Carlos",
        picture: "assets/images/profile.png",
        type: "HUMAN"
      })
    ];
  }

  public incDate(inc: number, date?: Date) {
    date = date || new Date();
    date.setDate(date.getDate() + inc);
    return date;
  }

  public isHoras(): boolean {
    return ["HORAS_CORRIDOS", "HORAS_UTEIS"].includes(this.form!.controls.forma.value);
  }

  public gridItems = [
    { id: this.util.md5(), campo1: "campo1-1", campo2: new Date(), campo3: new Date(), campo4: "campo4-1", campo5: false},
    { id: this.util.md5(), campo1: "campo1-2", campo2: new Date(), campo3: new Date(), campo4: "campo4-2", campo5: false},
    { id: this.util.md5(), campo1: "campo1-3", campo2: new Date(), campo3: new Date(), campo4: "campo4-3", campo5: false},
    { id: this.util.md5(), campo1: "campo1-4", campo2: new Date(), campo3: new Date(), campo4: "campo4-4", campo5: false},
    { id: this.util.md5(), campo1: "campo1-5", campo2: new Date(), campo3: new Date(), campo4: "campo4-5", campo5: false}
  ];


/*   public testeRetorno(form: IIndexable): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const usuario = this.util.fill(new Usuario(), this.entity!);
      resolve(this.util.fillForm(usuario, this.form!.value));
    });
  } */
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //this.form.controls.search.setValue("dfcb36c8-4784-4d3c-b4bb-d4e9c9b2e68c");
  }

  public addItemHandle(): LookupItem | undefined {
    let self = this;
    return {
      key: self.form.controls.label.value,
      value: self.form.controls.label.value,
      color: self.form.controls.color.value,
      icon: self.form.controls.icon.value
    };
  };

  public addFeriadoHandle(): LookupItem | undefined {
    let form = this.form.value;
    let feriado = new Feriado({
      id: this.util.md5(),
      nome: form.nome, //Descrição do feriado;
      dia: form.dia, //Dia do mês (1~31) ou dia da semana (1-7)");
      mes: form.mes, //Mês
      ano: form.ano || null, // Ano do feriado caso seja data não recorrente");
      recorrente: form.ano ? 0 : 1, // Se é uma data única ou repete todos os anos");
      abrangencia: "NACIONAL"
    });
    return {
      key: feriado.id,
      value: feriado.dia + "/" + feriado.mes + "/" + feriado.ano + " - " + feriado.nome,
      data: feriado
    };
  };

  public addAfastamentoHandle(): LookupItem | undefined {
    let form = this.form.value;
    let afastamento = new Afastamento({
      id: this.util.md5(),
      observacoes: form.observacao,
      inicio_afastamento: form.inicio_afastamento,
      fim_afastamento: form.fim_afastamento
    });
    return {
      key: afastamento.id,
      value: this.util.getDateTimeFormatted(afastamento.inicio_afastamento) + " até " + this.util.getDateTimeFormatted(afastamento.fim_afastamento) + " - " + afastamento.observacoes,
      data: afastamento
    };
  };

  public dataChange(event: Event) {
    console.log(moment(this.form.controls.datetime.value).format(UtilService.ISO8601_FORMAT));
  }

  public onAddItem(): IIndexable | undefined {
    return {
      id: this.util.md5(),
      campo1: "Qualquer " + (Math.random() * 1000),
      campo2: new Date(),
      campo3: new Date(),
      campo4: "Coisa Nova " + (Math.random() * 100000),
      campo5: false
    }
  }
}

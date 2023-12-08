import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { CardItem } from 'src/app/components/kanban/docker/docker.component';
import { GanttAssignment, GanttProject, GanttResource, GanttTask } from 'src/app/components/gantt/gantt-models';
import { CalendarOptions } from '@fullcalendar/core';
import { Expediente } from 'src/app/models/expediente.model';
import { Feriado } from 'src/app/models/feriado.model';
import { Afastamento } from 'src/app/models/afastamento.model';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { MapItem } from 'src/app/components/map/map.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { NavigateService } from 'src/app/services/navigate.service';
import { Documento, HasDocumentos } from 'src/app/models/documento.model';
import { InputLevelItem } from 'src/app/components/input/input-level/input-level.component';
import { TemplateDataset } from '../uteis/templates/template.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {
  public form: FormGroup;
  public items: LookupItem[] = [];
  public disabled: boolean = true;
  //public Editor = ClassicEditor;
  public planejamento?: Planejamento;
  public expediente = new Expediente({ "domingo": [], "segunda": [{ "inicio": "08:00", "fim": "12:00", "data": null, "sem": false }, { "inicio": "14:00", "fim": "18:00", "data": null, "sem": false }], "terca": [{ "inicio": "08:00", "fim": "12:00", "data": null, "sem": false }, { "inicio": "14:00", "fim": "18:00", "data": null, "sem": false }], "quarta": [{ "inicio": "08:00", "fim": "12:00", "data": null, "sem": false }, { "inicio": "14:00", "fim": "18:00", "data": null, "sem": false }], "quinta": [{ "inicio": "08:00", "fim": "12:00", "data": null, "sem": false }, { "inicio": "14:00", "fim": "18:00", "data": null, "sem": false }], "sexta": [{ "inicio": "08:00", "fim": "12:00", "data": null, "sem": false }, { "inicio": "14:00", "fim": "18:00", "data": null, "sem": false }], "sabado": [], "especial": [] });

  public naoIniciadas: CardItem[] = [
    { id: "ni1", title: "Não iniciada 1", subTitle: "Texto não iniciado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" },
    { id: "ni2", title: "Não iniciada 2", subTitle: "Texto não iniciado 2", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" },
    { id: "ni3", title: "Não iniciada 3", subTitle: "Texto não iniciado 3", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" }
  ];
  public pausadas: CardItem[] = [
    { id: "p1", title: "Pausada 1", subTitle: "Texto 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" }
  ];
  public iniciadas: CardItem[] = [
    { id: "i1", title: "iniciada 1", subTitle: "Texto iniciado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" },
    { id: "i2", title: "iniciada 2", subTitle: "Texto iniciado 2", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" }
  ];
  public concluidas: CardItem[] = [];
  public avaliadas: CardItem[] = [
    { id: "a1", title: "avaliada 1", subTitle: "avaliado 1", text: "Mensagem do ticke, muito texto, outras coisa, teste, mensagem, mais mensagens" }
  ];

  public button_items: LookupItem[] = [
    { key: '1', value: '1', icon: 'bi-heart-fill', color: '#107165', data: {label: 'Stretchable Button Hover Effect'} },
    { key: '1', value: '1', icon: 'bi-emoji-smile', color: '#2b1071', data: {label: 'Embedded', selected: true} },
    { key: '1', value: '1', icon: 'bi-hand-thumbs-down', color: '#713710', data: {label: 'Embed your icons within the HTML of your page'} },
    { key: '1', value: '1', icon: 'bi-heart-fill', color: '#107165', data: {label: 'Stretchable Button Hover Effect'} },
    { key: '1', value: '1', icon: 'bi-emoji-smile', color: '#2b1071', data: {label: 'Embedded', selected: true} },
    { key: '1', value: '1', icon: 'bi-hand-thumbs-down', color: '#713710', data: {label: 'Embed your icons within the HTML of your page'} },
    { key: '1', value: '1', icon: 'bi-heart-fill', color: '#107165', data: {label: 'Stretchable Button Hover Effect'} },
    { key: '1', value: '1', icon: 'bi-emoji-smile', color: '#2b1071', data: {label: 'Embedded', selected: true} },
    { key: '1', value: '1', icon: 'bi-hand-thumbs-down', color: '#713710', data: {label: 'Embed your icons within the HTML of your page'} },
  ]

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', start: moment().add(-1, 'days').toDate(), end: moment().add(1, 'days').toDate() },
      { title: 'event 2', start: moment().add(1, 'days').toDate(), end: moment().add(5, 'days').toDate() }
    ]
  };

  public dataset: TemplateDataset[] = [
    {
      field: "nome",
      label: "Usuário: Nome"
    },
    {
      field: "numero",
      label: "Numero"
    },
    {
      field: "texto",
      label: "Texto"
    },
    {
      field: "boo",
      label: "Boolean"
    },
    {
      field: "atividades",
      label: "Atividades",
      type: 'ARRAY',
      fields: [
        {
          field: "nome",
          label: "Nome"
        },
        {
          field: "valor",
          label: "Valor"
        }
      ]
    }
  ];

  public datasource: IIndexable = {
    nome: "Genisson Rodrigues Albuquerque",
    numero: 10,
    texto: "Teste",
    boo: true,
    atividades: [
      { nome: "atividade 1", valor: 100, opcoes: [{ nome: "opc 1" }, { nome: "opc 2" }] },
      { nome: "atividade 2", valor: 200, opcoes: [] },
      { nome: "atividade 3", valor: 300, opcoes: [{ nome: "opc 3" }] }
    ]
  }

  public textoEditor: string = ``;
  public template: string = `
<p>Este &eacute; o {{nome}}.</p>
<p>{{if:texto="Teste"}}Texto é teste{{end-if}}{{if:numero!=10}}Número não é 10{{end-if}}</p>
<table>
    <thead>
        <tr>
            <th scope="col">Items</th>
            <th scope="col">Expenditure</th>
            <th scope="col">Opções</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="3">{{for:atividades[0..x];drop=tr}}</td>
        </tr>
        <tr>
            <td>{{atividades[x].nome}}</td>
            <td>{{atividades[x].valor}}</td>
            <td>{{atividades[x].opcoes[0].nome}}{{for:atividades[x].opcoes[1..y]}}, {{atividades[x].opcoes[y].nome}}{{end-for}}</td>
        </tr>
        <tr>
            <td colspan="3">{{end-for;drop=tr}}</td>
        </tr>
    </tbody>
</table>
<br>
<br>
atividades: {{atividades[0].nome}}{{for:atividades[0..y]}}, {{atividades[y].nome}}{{end-for}}
  `;

  public buttons: ToolbarButton[] = [
    {
      label: "Calcular data fim",
      onClick: () => {
        let form = this.form.value;
        this.efemerides = this.calendar.calculaDataTempo(form.data_inicio, form.tempo, form.forma, form.carga_horaria, this.expediente, form.feriados.map((x: LookupItem) => x.data), [], form.afastamentos.map((x: LookupItem) => x.data));
      }
    },
    {
      label: "Calcular tempo",
      onClick: () => {
        let form = this.form.value;
        this.efemerides = this.calendar.calculaDataTempo(form.data_inicio, form.data_fim, form.forma, form.carga_horaria, this.expediente, form.feriados.map((x: LookupItem) => x.data), [], form.afastamentos.map((x: LookupItem) => x.data));
      }
    }
  ];

  public project: GanttProject;
  public efemerides?: Efemerides;
  public resources: GanttResource[] = [];

  public mapa: MapItem[] = [];/*
    {
      data: {title: "item 1"},
      children: [
        {
          data: {title: "item 1"},
          children: [
            {
              data: {title: "item 1"},
            },
            {
              data: {title: "item 2"}
            }
          ]
        },
        {
          data: {title: "item 2"},
          children: [
            {
              data: {title: "item 1"},
            },
            {
              data: {title: "item 2"}
            }
          ]
        },
        {
          data: {title: "item 3"}
        }
      ]
    },
    {
      data: {title: "item 2"}
    },
    {
      data: {title: "item 3"}
    }
  ];*/

  public JSON = JSON;

  constructor(
    public fh: FormHelperService,
    public planejamentoDao: PlanejamentoDaoService,
    public usuarioDao: UsuarioDaoService,
    public lookup: LookupService,
    public util: UtilService,
    public go: NavigateService,
    public server: ServerService,
    public calendar: CalendarService,
    @Inject('ID_GENERATOR_BASE') public ID_GENERATOR_BASE: any
  ) {
    this.form = fh.FormBuilder({
      editor: { default: this.textoEditor },
      template: { default: this.template },
      id: { default: "" },
      level: { default: "2.4.6.8"},
      campo1: { default: "" },
      campo2: { default: new Date() },
      campo3: { default: new Date() },
      campo4: { default: "" },
      campo5: { default: true },
      datetime: { default: new Date() },
      forma: { default: "" },
      tempo: { default: 0 },
      feriados: { default: [] },
      afastamentos: { default: [] },
      data_inicio: { default: new Date() },
      data_fim: { default: new Date() },
      carga_horaria: { default: 24 },
      dia: { default: 0 },
      mes: { default: 0 },
      ano: { default: 0 },
      data_inicio_afastamento: { default: new Date() },
      data_fim_afastamento: { default: new Date() },
      observacao: { default: "" },
      nome: { default: "" },
      rate: { default: 2 },
      horas: { default: 150.5 },
      label: { default: "" },
      valor: { default: 15.5 },
      icon: { default: null },
      color: { default: null },
      multiselect: { default: [] }
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
    this.project.tasks = [new GanttTask({
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
          assignments: [new GanttAssignment({ resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1" })]
        }),
        new GanttTask({
          id: "a80b71cf-e112-11ec-a5bb-0050569c64a2",
          name: "Tarefa de teste 2",
          description: "Tarefa de testes 2",
          progress: 50,
          start: this.incDate(1),
          end: this.incDate(3),
          duration: 2,
          assignments: [new GanttAssignment({ resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a2" })]
        })
      ],
      assignments: [
        new GanttAssignment({ resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1" }),
        new GanttAssignment({ resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a2" })
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
          assignments: [new GanttAssignment({ resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1" })]
        }
      ],
      assignments: [
        new GanttAssignment({ resource_id: "a80b71ff-e112-11ec-a5bb-0050569c64a1" }),
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

  public openDocumentos() {
    this.go.navigate({route: ['uteis', 'documentos']}, {metadata: {
      needSign: (documento: Documento) => true,
      extraTags: (entity: HasDocumentos, documento: Documento, metadata: any) => [],
      especie: "TCR",
      dataset: this.dataset,
      datasource: this.datasource,
      template: this.template,
      template_id: "ID"
    }});
  }

  public validateLevel = (parents: InputLevelItem[], item: InputLevelItem, children: InputLevelItem[]): Promise<boolean> | boolean => {
    return (item.value as number) % 2 == 0;
  };

  public gridItems = [
    { id: this.util.md5(), campo1: "campo1-1", campo2: new Date(), campo3: new Date(), campo4: "campo4-1", campo5: false },
    { id: this.util.md5(), campo1: "campo1-2", campo2: new Date(), campo3: new Date(), campo4: "campo4-2", campo5: false },
    { id: this.util.md5(), campo1: "campo1-3", campo2: new Date(), campo3: new Date(), campo4: "campo4-3", campo5: false },
    { id: this.util.md5(), campo1: "campo1-4", campo2: new Date(), campo3: new Date(), campo4: "campo4-4", campo5: false },
    { id: this.util.md5(), campo1: "campo1-5", campo2: new Date(), campo3: new Date(), campo4: "campo4-5", campo5: false }
  ];


  /*   public testeRetorno(form: IIndexable): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const usuario = this.util.fill(new Usuario(), this.entity!);
        resolve(this.util.fillForm(usuario, this.form!.value));
      });
    } */
  ngOnInit(): void {
    this.planejamentoDao.getById("867c7768-9690-11ed-b4ae-0242ac130002", ["objetivos.eixo_tematico", "unidade", "entidade"]).then(planejamento => {
      let mapa: MapItem[] = [];
      this.planejamento = planejamento || undefined;
      if (planejamento) {
        let eixos = planejamento.objetivos?.reduce((a, v) => {
          if (!a.find(x => x.id == v.eixo_tematico_id)) a.push(v.eixo_tematico!);
          return a;
        }, [] as EixoTematico[]) || [];
        mapa = eixos.map(x => {
          return {
            data: x,
            children: planejamento.objetivos?.filter(y => y.eixo_tematico_id == x.id).map(z => Object.assign({}, { data: z }) as MapItem)
          } as MapItem;
        });
      }
      this.mapa = mapa;
    });

    this.server.startBatch();
    let usuarios = this.usuarioDao.query({limit: 100}).asPromise();    
    let planejamentos = this.planejamentoDao.query({limit: 100}).asPromise();    
    this.server.endBatch();
    Promise.all([usuarios, planejamentos]).then(results => {
      console.log(results[0]);
      console.log(results[1]);
    });
  }

  ngAfterViewInit() {
    //this.form.controls.search.setValue("dfcb36c8-4784-4d3c-b4bb-d4e9c9b2e68c");
  }

  public renderTemplate() {
    this.server.post('api/Template/teste', {}).subscribe(response => {
      console.log(response);
    }, error => console.log(error));
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
      data_inicio: form.data_inicio_afastamento,
      data_fim: form.data_fim_afastamento
    });
    return {
      key: afastamento.id,
      value: this.util.getDateTimeFormatted(afastamento.data_inicio) + " até " + this.util.getDateTimeFormatted(afastamento.data_fim) + " - " + afastamento.observacoes,
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

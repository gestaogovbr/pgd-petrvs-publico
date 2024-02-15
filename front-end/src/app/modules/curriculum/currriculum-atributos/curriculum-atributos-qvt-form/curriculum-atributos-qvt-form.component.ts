import { Component, Injector, ViewChild } from '@angular/core';
import { PageFormBase } from '../../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { Questionario } from 'src/app/models/questionario.model';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioResposta } from 'src/app/models/questionario-resposta.model';
import { QuestionarioRespostaPergunta } from 'src/app/models/questionario-resposta-pergunta.model';
import { QuestionarioRespostaDaoService } from 'src/app/dao/questionario-resposta-dao.service';
import { v4 as uuid } from 'uuid';
import { LookupItem } from 'src/app/services/lookup.service';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';
import { InputRadioComponent } from 'src/app/components/input/input-radio/input-radio.component';
import { Chart, registerables } from 'chart.js';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';


@Component({
  selector: 'curriculum-atributos-qvt-form',
  templateUrl: './curriculum-atributos-qvt-form.component.html',
  styleUrls: ['./curriculum-atributos-qvt-form.component.scss']
})
export class CurriculumAtributosQvtFormComponent extends PageFormBase<QuestionarioResposta, QuestionarioRespostaDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  /*@ViewChild('chaveConcordancia', { static: false }) public chaveConcordancia?: InputSwitchComponent;
  @ViewChild('chaveSexo', { static: false }) public chaveSexo?: InputSwitchComponent;
  @ViewChild('chaveAtencao', { static: false }) public chaveAtencao?: InputSwitchComponent;
  @ViewChild('chaveCrianca', { static: false }) public chaveCrianca?: InputSwitchComponent;
  @ViewChild('chaveDeficiência', { static: false }) public chaveDeficiência?: InputSwitchComponent;
  @ViewChild('chaveEtarismo', { static: false }) public chaveEtarismo?: InputSwitchComponent;
  @ViewChild('chaveDiscriminacao', { static: false }) public chaveDiscriminacao?: InputSwitchComponent;
  @ViewChild('chaveAssedio', { static: false }) public chaveAssedio?: InputSwitchComponent;
  @ViewChild('chaveDiscriminacaoTrabalho', { static: false }) public chaveDiscriminacaoTrabalho?: InputSwitchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;*/

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public unidadeDao: UnidadeDaoService;
  public questionario?: Questionario;
  public perguntas: QuestionarioPergunta[] = [];
  public indice0a9: number[] = Array.from(new Array(10), (x, i) => i + 0);

  /*public questionario?: Questionario;
  public respostas: QuestionarioRespostaPergunta[] = [];
  public opcoesRichard: LookupItem[] = [{ 'key': 'Concordo Totalmente', 'value': 'Concordo Totalmente' }, { 'key': "Concordo", 'value': 'Concordo' }, { 'key': 'Neutro', 'value': 'Neutro' }, { 'key': 'Discordo', 'value': 'Discordo' }, { 'key': 'Discordo Totalmente', 'value': 'Discordo Totalmente' }];
  public opcoesDass: LookupItem[] = [{ 'key': 0, 'value': 'Não se aplicou de maneira alguma' }, { 'key': 1, 'value': 'Aplicou-se em algum grau, ou por pouco tempo' }, { 'key': 2, 'value': 'Aplicou-se em um grau considerável, ou por uma boa parte do tempo' }, { 'key': 3, 'value': 'Aplicou-se muito, ou na maioria do tempo.' }];
  public opcoesDiscriminacao: LookupItem[] = [{ 'key': 0, 'value': 'Das diferenças entre os salários percebidos pelos indivíduos. Quem ganha mais, vale mais.' }, { 'key': 1, 'value': 'Do fato de que algumas carreiras possuem mais prestígio do que outras diante da alta direção da instituição.' }, { 'key': 2, 'value': 'Da existência de uma estrutura hierárquica muito rígida, que pode permitir a existência   de um sentimento de superioridade intelectual entre os membros de algumas carreiras, ou entre os que exercem funções de liderança, em relação àqueles que não pertencem a esses grupos.' }, { 'key': 3, 'value': 'Do fato de que algumas atividades são vistas como sendo compostas por tarefas de   baixa complexidade, que não exigem esforço do ponto de vista intelectual, nem exigem conhecimentos específicos – escolaridade – para serem executadas..' }];
  public subopcoes: string[] = ['Social', 'Racial', 'Religiosa', 'Sexual', 'Politica']
  public checkItens: string[] = [];
  public chart: any;
  public min: string = '';
  public max: string = '';
  public valueTrack: string = '';*/

  constructor(public injector: Injector) {
    super(injector, QuestionarioResposta, QuestionarioRespostaDaoService);
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      concorda: { default: false },
      idade: { default: 0 },
      sexo: { default: '' },
      concordaSexo: { default: true },
      raca: { default: '' },
      estadoCivil: { default: '' },
      escolaridade: { default: '' },
      ufExercicio: { default: '' },
      situacaoFuncional: { default: '' },
      anosInstituicao: { default: 0 },
      unidade_id: { default: '' },
      necessitaAtencao: { default: false },
      cuidadoCrianca: { default: false },
      numeroCrianca: { default: 0 },
      deficiencia: { default: false },
      satisfeitoRemuneracao: { default: '' },
      satisfeitoBeneficio: { default: '' },
      comparaRemuneracao: { default: '' },
      satisfeitoMeios: { default: '' },
      satisfeitoCarga: { default: '' },
      satisfeitoTarefas: { default: '' },
      satisfeitoHabilidades: { default: '' },
      satisfeitoRelevancia: { default: '' },
      satisfeitoAutonomia: { default: '' },
      satisfetoAvaliacao: { default: '' },
      satisfeitoCrescimento: { default: '' },
      satisfeitoIncentivo: { default: '' },
      satisfeitoiniciativas: { default: '' },
      satisfeitoColegas: { default: '' },
      satisfeitoChefia: { default: '' },
      comunicacaoChefia: { default: '' },
      satisfeitoLeis: { default: '' },
      satisfeitoIndividualidade: { default: '' },
      satisfeitoExpressao: { default: '' },
      satisfeitoPreocupacao: { default: '' },
      satisfeitoInfluencia: { default: '' },
      satisfeitoLazer: { default: '' },
      satisfeitoEntrega: { default: '' },
      oportunidades: { default: '' },
      orgulho: { default: '' },
      etarismo: { default: false },
      discriminacao: { default: false },
      assedio: { default: false },
      discriminacaoTrabalho: { default: false },
      formasDiscriminacao: { default: [] },
      perecebeDiscriminacao: { default: '' },
      dass1: { default: '' },
      dass2: { default: '' },
      dass3: { default: '' },
      dass4: { default: '' },
      dass5: { default: '' },
      dass6: { default: '' },
      dass7: { default: '' },
      dass8: { default: '' },
      dass9: { default: '' },
      dass10: { default: '' },
      dass11: { default: '' },
      dass12: { default: '' },
      dass13: { default: '' },
      dass14: { default: '' },
      dass15: { default: '' },
      dass16: { default: '' },
      dass17: { default: '' },
      dass18: { default: '' },
      dass19: { default: '' },
      dass20: { default: '' },
      dass21: { default: '' },
      participaPGD: { default: '' },
      regimePGD: { default: '' },
      qualidadeVidaPGD: { default: '' },
      produtividadePGD: { default: '' },
      qualidadeTrabalhoPGD: { default: '' },
      entregaPGD: { default: false },
      chefia: { default: '' },
      colaboradoresPGD: { default: false },

    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: QuestionarioResposta, form: FormGroup) {
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'QVT']], join: ['perguntas.questionario_resposta_pergunta'] }).asPromise();
    this.questionario = questionario?.length ? questionario[0] : undefined;
    if (this.questionario) {
      /* Ordena as perguntas */
      this.questionario.perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.perguntas = this.questionario.perguntas || [];
      /* Adiona metadatas */
      for (let pergunta of this.perguntas) {
        pergunta._metadata = { control: this.form!.controls[pergunta.codigo || ""] }
      }
    } else {
      this.dialog.alert("Questionário QVT não localizado", "Questionário não localizado");
    }
  }

  public async initializeData(form: FormGroup) {
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<QuestionarioResposta | boolean> {
    if (!this.questionario) return false;
    /* if(this.respondido){
       this.dialog.alert("Gravação não efetuada", "Teste já respondido");
       return false;
     }*/
    let questionarioResposta = this.util.fill(new QuestionarioResposta(), this.entity || {});
    questionarioResposta.usuario_id = this.auth.usuario?.id;
    questionarioResposta.editavel = 0;
    questionarioResposta.questionario_id = this.questionario!.id;
    /*let respostas = this.entity?.questionario_resposta_pergunta || this.respostasB5.map((x, i) => new QuestionarioRespostaPergunta({
      questionario_pergunta_id: this.questionario!.perguntas[i].id,
      resposta: x,
      _status: "ADD"
    }));
    respostas.forEach((x, i) => {
      if (x._status != "ADD" && x.resposta != this.respostasB5[i]){
        x.resposta = this.respostasB5[i];
        x._status = "EDIT";
      }
    });*/
    //questionarioResposta.questionario_resposta_pergunta = respostas;
    return questionarioResposta;
  }

  /*public onChange(event: any) {
    console.log(event)
    //console.log(event.target.checked)
    //console.log(event.srcElement.value)
    const controlName = event.target.name;
    if (controlName == 'radioCheckDicriminacao') {
      if (event.target.checked) {
        this.checkItens.push(event.target.value);
      } else {
        this.checkItens.splice((this.checkItens.indexOf(event.target.value)), 1);
      }
      this.form?.controls[controlName].setValue(this.checkItens);
      console.log('FORM', this.form?.value)
    }
    if (!(controlName == '' || controlName == 'radioCheckDicriminacao')) {
      let eventValue = (event.target.value == 'on' ? true : event.target.value == 'off' ? false : event.target.value)
      this.form?.controls[controlName].setValue(eventValue)
      console.log('FORM', this.form?.value)
    }
    console.log('ITENS->', this.checkItens)
  }*/

  /*
  public chartb5(dados: number[] = []) {
    //(document.querySelector('.divgraficob5')?.hasAttribute('hidden')) ? document.querySelector('.divgraficob5')?.removeAttribute('hidden') : '';
    (document.querySelector('.resultado')?.hasAttribute('hidden')) ? document.querySelector('.resultado')?.removeAttribute('hidden') : '';
    document.querySelector('.cardb5')?.setAttribute('hidden', '');
    document.querySelector('.cardb52')?.setAttribute('hidden', '');
    /*
        this.chart ? this.chart.destroy() : '';
    
        this.chart = new Chart("MyChart", {
          type: "bar",
          data: {
            labels: ["Extroversão", "Agradabilidade", "Conciensciosidade", "Estabilidade", "Abertura"],
            datasets: [
              {
                label: "Pontuação",
                data: dados, 
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                 
                ],
                borderWidth: 1
              }
            ]
          },
          options : {
            scales: {
              
              },
          },
        });
    * /
    const sliders = document.querySelectorAll(".slider-ui");

    sliders.forEach((slider, index) => {
      console.log(index)
      this.min = '0';
      this.max = '40';
      const trackId = slider.querySelector(".value")!.id;
      let track = document.getElementById(trackId);
      track!.style.left = ((dados[index] / 40) * 100) + '%';
      track!.textContent = dados[index].toString();
    });
  }*/

  /**this.chart = new Chart("MyChart", {
        type: 'pie', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: ['Extroversão', 'Agradabilidade','Conscienciosidade','Estabilidade','Abertura'],
          datasets: [{
      label: 'Pontuação',
      data: dados,
      backgroundColor: [
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
      ],
      hoverOffset: 4
    }],
        },
        options: {
          aspectRatio:2.5,
          responsive:true,
        }

      });
}*/

  /*public onClickDivB5(div: string, lbl: string, icon: string) {
    (document.querySelector('.' + div)?.hasAttribute('hidden')) ? document.querySelector('.' + div)?.removeAttribute('hidden') : document.querySelector('.' + div)?.setAttribute('hidden', '');
    (document.querySelector('.' + lbl)?.hasAttribute('hidden')) ? document.querySelector('.' + lbl)?.removeAttribute('hidden') : document.querySelector('.' + lbl)?.setAttribute('hidden', '');
    if (document.getElementById(icon)?.classList.contains('fa-arrow-down')) {
      document.getElementById(icon)?.classList.remove('fa-arrow-down');
      document.getElementById(icon)?.classList.add('fa-arrow-up');
    } else {
      document.getElementById(icon)?.classList.remove('fa-arrow-up');
      document.getElementById(icon)?.classList.add('fa-arrow-down');
    }
  }*/

}


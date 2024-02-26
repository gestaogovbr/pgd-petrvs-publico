import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { PageFormBase } from '../../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { Questionario } from 'src/app/models/questionario.model';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioResposta } from 'src/app/models/questionario-resposta.model';
import { QuestionarioRespostaPergunta } from 'src/app/models/questionario-resposta-pergunta.model';
import { QuestionarioRespostaDaoService } from 'src/app/dao/questionario-resposta-dao.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'curriculum-atributossoft-form',
  templateUrl: './curriculum-atributossoft-form.component.html',
  styleUrls: ['./curriculum-atributossoft-form.component.scss']
})

export class CurriculumAtributossoftFormComponent extends PageFormBase<QuestionarioResposta, QuestionarioRespostaDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  bigicoIMG: string;
  bigicoAmareloIMG: string;

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public questionario?: Questionario;
  public respostas: QuestionarioRespostaPergunta[] = [];
  public restante: number;
  //public formSoftSkills: FormGroup;

  constructor(public injector: Injector) {
    super(injector, QuestionarioResposta, QuestionarioRespostaDaoService);
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);
    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";
    this.restante = 20;
    this.form = this.fh.FormBuilder({
      comunica: { default: 0 },
      lideranca: { default: 0 },
      resolucao: { default: 0 },
      criatividade: { default: 0 },
      pensamento: { default: 0 },
      habilidade: { default: 0 },
      adaptabilidade: { default: 0 },
      etica: { default: 0 }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: QuestionarioResposta, form: FormGroup) { }

  public async initializeData(form: FormGroup) {
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'SOFTSKILL']], join: ['perguntas'] }).asPromise();
    if (questionario?.length) {
      questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.questionario = questionario[0];
      const questionarioResposta = await this.dao?.query({ where: [['questionario_id', '==', this.questionario.id], ['usuario_id', '==', this.auth.usuario?.id]], join: ['questionario_resposta_pergunta'] }).asPromise();
      if (questionarioResposta?.length) {
        let questionarioRespostaOrdenado: QuestionarioRespostaPergunta[] = [];
        let respostas: any = [];
        let indice = 0;
        this.questionario!.perguntas.forEach(pergunta => {
          questionarioResposta![0].questionario_resposta_pergunta.forEach((resposta, i) => {
            if (pergunta.id == resposta.questionario_pergunta_id) {
              respostas.push(resposta.resposta);
              indice = i;
            }
          });
          questionarioRespostaOrdenado.push(questionarioResposta![0].questionario_resposta_pergunta[indice]);
        });
        questionarioResposta![0].questionario_resposta_pergunta = questionarioRespostaOrdenado;
        this.entity = questionarioResposta[0];
        this.form!.controls.comunica.setValue(respostas[0]);
        this.form!.controls.lideranca.setValue(respostas[1]);
        this.form!.controls.resolucao.setValue(respostas[2]);
        this.form!.controls.criatividade.setValue(respostas[3]);
        this.form!.controls.pensamento.setValue(respostas[4]);
        this.form!.controls.habilidade.setValue(respostas[5]);
        this.form!.controls.adaptabilidade.setValue(respostas[6]);
        this.form!.controls.etica.setValue(respostas[7]);
        this.restante = 20 - respostas.reduce((soma: any, a: any) => soma + a, 0);
      } else {
        this.entity = undefined;
      }
    }// else {
      //this.dialog.alert("Teste Soft-Skills deste usuário não localizado", "Teste não localizado");
    //}
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<QuestionarioResposta | boolean> {
    if (!this.questionario) return false;
    let questionarioResposta = this.util.fill(new QuestionarioResposta(), this.entity || {});
    questionarioResposta.usuario_id = this.auth.usuario?.id;
    questionarioResposta.editavel = 1;
    questionarioResposta.questionario_id = this.questionario!.id;
    //questionarioResposta.data_resposta = new Date();;
    const valores = [
      this.form!.controls.comunica.value,
      this.form!.controls.lideranca.value,
      this.form!.controls.resolucao.value,
      this.form!.controls.criatividade.value,
      this.form!.controls.pensamento.value,
      this.form!.controls.habilidade.value,
      this.form!.controls.adaptabilidade.value,
      this.form!.controls.etica.value
    ];
    /*let array : any=[];
    let respostas = this.entity?.questionario_resposta_pergunta;
    respostas?.forEach((x,i)=>{
      let arrayQRP = new QuestionarioRespostaPergunta();
      arrayQRP.questionario_pergunta_id = x.questionario_pergunta_id;
      arrayQRP.resposta = x.resposta;
      arrayQRP._status = "ADD";
      array.push(arrayQRP)
    })
    array?.forEach((x : any,i: number)=>{
      if ((x._status != "ADD") && (parseInt(x.resposta) != parseInt(valores[i]))){
        x.resposta = parseInt(valores[i]);
        x._status = "EDIT";
      }
    })*/
    let respostas = this.entity?.questionario_resposta_pergunta || valores.map((x, i) => new QuestionarioRespostaPergunta({
      questionario_pergunta_id: this.questionario!.perguntas[i].id,
      resposta: parseInt(x),
      _status: "ADD"
    }));
    respostas.forEach((x, i) => {
      if ((x._status != "ADD") && (parseInt(x.resposta) != parseInt(valores[i]))) {
        x.resposta = parseInt(valores[i]);
        x._status = "EDIT";
      }
    });
    questionarioResposta.questionario_resposta_pergunta = respostas;
    return questionarioResposta;

  }

  public valorSoftChange(control: any) {
    control.value == '' ? control.setValue(0) : '';
    const comunica = this.form?.controls.comunica.value;
    const lideranca = this.form?.controls.lideranca.value;
    const resolucao = this.form?.controls.resolucao.value;
    const criatividade = this.form?.controls.criatividade.value;
    const pensamento = this.form?.controls.pensamento.value;
    const habilidade = this.form?.controls.habilidade.value;
    const adaptabilidade = this.form?.controls.adaptabilidade.value;
    const etica = this.form?.controls.etica.value;
    const array = [comunica, lideranca, resolucao, criatividade, pensamento, habilidade, adaptabilidade, etica]
    let soma: number = 0;
    for (const val of array) {
      //console.log('SUM SEQUENCIA', sum)
      soma = soma + parseInt(val);
      this.restante = 20 - soma;
      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }
}

 /*
    let respostas = this.entity?.questionario_resposta_pergunta;
   
    if(respostas?.length){
      respostas!.forEach((x, i) => {
        if ((x._status != "ADD") && (parseInt(x.resposta) != parseInt(valores[i]))){
          x.resposta = parseInt(valores[i]);
          x._status = "EDIT";
        }
      });
      questionarioResposta.questionario_resposta_pergunta = respostas;

    }else{
    
       this.questionario!.perguntas.forEach((z,j)=>{
          this.respostas.push( new QuestionarioRespostaPergunta({
                  questionario_pergunta_id: z.id,
                  resposta: z.respostas,//valores[i],
                  _status : "ADD"
                }));
          })
     questionarioResposta.questionario_resposta_pergunta = this.respostas;
    }*/
    
   

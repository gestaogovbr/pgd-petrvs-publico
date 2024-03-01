import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
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
import { Chart,registerables } from 'chart.js';

@Component({
  selector: 'curriculum-atributos-big5-form',
  templateUrl: './curriculum-atributos-big5-form.component.html',
  styleUrls: ['./curriculum-atributos-big5-form.component.scss']
})
export class CurriculumAtributosBig5FormComponent extends PageFormBase<QuestionarioResposta, QuestionarioRespostaDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('divb5', { static: false }) public divb5?: HTMLDivElement;
  @ViewChild('divextroversao', { static: false }) public divextroversao?: HTMLDivElement;
  @ViewChild('lblextroversao', { static: false }) public lblextroversao?: HTMLLabelElement;
  @ViewChild('btnv', { static: false }) public btnv?: HTMLButtonElement;
  @ViewChild('btne', { static: false }) public btne?: HTMLButtonElement;
  @ViewChild('radio', { static: false }) public radio?: InputRadioComponent;

  bigicoIMG: string;
  bigicoAmareloIMG: string;
  

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public questionario?: Questionario;
  public perguntas: QuestionarioPergunta[]=[];
  public respostas: QuestionarioRespostaPergunta[] = [];
  public opcoesEscolha: LookupItem[] = [{ 'key': 1, 'value': 'Muito Inadequado.' }, { 'key': 2, 'value': 'Relativamente Inadequado' }, { 'key': 3, 'value': 'Nem Adequado, Nem Inadequado' }, { 'key': 4, 'value': 'Relativamente Adequado' }, { 'key': 5, 'value': 'Muito Adequado' }];
  public controleP : number = 0;
  public controleV : number = 0;
  public controle : number = 0;
  public showPergunta: string = '';
  public numeroPergunta: number = 1;
  public total : number = 0;
  public valorEscolhido: string = '';
  public respostasB5 : number[] =[] ;
  public arrayLabel: string = '';
  public extroversao : number = 0;
  public agradabilidade : number = 0;
  public conscienciosidade: number = 0;
  public estabilidade : number = 0;
  public abertura : number = 0;
  public chart: any;
  public respondido: boolean = false;
  public min : string = '';
  public max : string = '';
  public valueTrack : string = '';

  constructor(public injector: Injector) {
    super(injector, QuestionarioResposta, QuestionarioRespostaDaoService);
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);

    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";

    this.form = this.fh.FormBuilder({

      radiob5 : {default : false },
      lbl_extroversao : {default : '' },
      divextroversao : {default : '' },
    

    }, this.cdRef, this.validate);
    
          
    
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: QuestionarioResposta, form: FormGroup) {}

  public async initializeData(form: FormGroup) {
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'B5']], join: ['perguntas'] }).asPromise();
    if (questionario?.length) {
      questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.perguntas = questionario[0].perguntas;
      this.showPergunta = this.perguntas[this.controle].pergunta;
      this.questionario = questionario[0];
      const questionarioResposta = await this.dao?.query({ where: [['questionario_id', '==', this.questionario.id], ['usuario_id', '==', this.auth.usuario?.id]], join: ['questionario_resposta_pergunta'] }).asPromise();
      this.entity = questionarioResposta?.length ? questionarioResposta[0] : undefined;
      let respostas: number[] = [];
      if (this.entity) {
        this.questionario.perguntas.forEach((pergunta, index) => {
          this.entity!.questionario_resposta_pergunta.forEach((resposta, index) => {
            if (pergunta.id == resposta.questionario_pergunta_id) respostas.push(resposta.resposta);
          });
        });
        this.respondido = true;
        this.resposta(respostas);
       
      }
    }// else {
      //this.dialog.alert("Teste B5 deste usuário não localizado", "Teste não localizado");
    //}
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<QuestionarioResposta | boolean> {
    if (!this.questionario) return false;
    if(this.respondido){
      this.dialog.alert("Gravação não efetuada", "Teste já respondido");
      return false;
    }
    if(this.respostasB5.length < 50){
        this.dialog.alert("Gravação não efetuada", "Para gravação o teste deve ser respondido por completo");
        return false;
    }
   
    let questionarioResposta = this.util.fill(new QuestionarioResposta(), this.entity || {});
    questionarioResposta.usuario_id = this.auth.usuario?.id;
    questionarioResposta.editavel = 0;
    questionarioResposta.questionario_id = this.questionario!.id;
  
    let respostas = this.entity?.questionario_resposta_pergunta || this.respostasB5.map((x, i) => new QuestionarioRespostaPergunta({
      questionario_pergunta_id: this.questionario!.perguntas[i].id,
      resposta: x,
      _status: "ADD"
    }));
    respostas.forEach((x, i) => {
      if (x._status != "ADD" && x.resposta != this.respostasB5[i]){
        x.resposta = this.respostasB5[i];
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

      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }

  public onRadioChange(event : any){//console.log(event.srcElement.value)
    this.valorEscolhido = event.srcElement.value;
    this.proximo(event)

  }

  public voltar(event : any){
     // console.log(event)
     const btnEnviar = document.querySelector('.btnenviar');
     const btnVoltar = document.querySelector('.btnvoltar');
     const div = document.querySelector('.divb5');
     const radio = document.querySelector('.radio');
     radio?.removeAttribute('checked');

     if(this.respostasB5.length == 50){
        this.controle--;
        this.total = this.total - this.respostasB5[this.controle]
        this.respostasB5.splice(this.controle,1)
        this.arrayLabel = this.respostasB5.toString();
        btnEnviar?.setAttribute('disabled','');
        radio?.setAttribute('disabled','');
        $('input[name="radiob5"]').prop('disabled', false);
        //$('input[name="radioB"]').prop('disabled', false);
        
     }
       
     if(this.controle > 0){
      this.controle--;
      this.controle == 0 ? btnVoltar?.setAttribute('disabled','') : btnVoltar?.removeAttribute('disabled');
      if(this.controle >= 0){
        this.showPergunta = this.perguntas[this.controle].pergunta;
        this.numeroPergunta--;
        this.total = this.total - this.respostasB5[this.controle]
        this.respostasB5.splice(this.controle,1)
        this.arrayLabel = this.respostasB5.toString();
      }
      //console.log(this.respostasB5,' - ',this.total, ' - ', this.controle);
    }else{
      btnVoltar?.setAttribute('disabled','');
    }
    $('input[name="radiob5"]').prop('checked', false);
    //$('input[name="radioB"]').prop('checked', false);
  }
   
 
  public proximo(event : any){

      const btnEnviar = document.querySelector('.btnenviar');
      const btnVoltar = document.querySelector('.btnvoltar');
      const div = document.querySelector('.divb5');
      const radio = document.querySelector('.radio');
     
     
      if(this.controle < 50){
        
        this.valorEscolhido == '' ? this.valorEscolhido = '1' : ''; 
        this.respostasB5.push(parseInt(this.valorEscolhido));
        this.total = this.total + parseInt(this.valorEscolhido);
       
        this.controle >= 0 ? btnVoltar?.removeAttribute('disabled') : btnVoltar?.setAttribute('disabled','');
        
        this.controle++;

        if(this.controle <= 49 ){
          this.numeroPergunta++;
          this.showPergunta = this.perguntas[this.controle].pergunta;
          (document.querySelector('.cardb5')?.hasAttribute('hidden')) ? document.querySelector('.cardb5')?.removeAttribute('hidden') : '';

        }
        
        //console.log(this.respostasB5,' - ',this.total, ' - ', this.controle);
      }

      if(this.controle >= 50){
        //btnEnviar?.setAttribute('disabled',"");
        //btnEnviar?.setAttribute('value','Enviar');
        btnEnviar?.removeAttribute('disabled');
        radio?.setAttribute('disabled','');
        $('input[name="radiob5"]').prop('disabled', true);
       // $('input[name="radioB"]').prop('disabled', true);
        this.controle =50;
        //this.resposta(this.respostasB5);
      }/*else{
        btnEnviar?.removeAttribute('disabled');
      } 
    /* let radio1 = document.getElementsByName('flexRadioDefault');
     radio1?.forEach(x =>{ x.removeAttribute('checked')})*/
     $('input[name="radiob5"]').prop('checked', false);
    // $('input[name="radioB"]').prop('checked', false);
     
    }

  public enviar(){
    this.resposta(this.respostasB5)
  }

  public resposta(resp: number[]){

    //resp=[5,5,5,5,5,4,3,2,4,5,2,1,2,3,4,3,4,4,4,4,3,3,3,3,4,4,4,4,5,5,5,4,3,2,3,3,4,4,4,4,4,5,5,5,5,4,4,4,4,4]
    
        let eM=20+(resp[0])+(resp[10])+(resp[20])+(resp[30])+(resp[40]);
        let aM=14+(resp[6])+(resp[16])+(resp[26])+(resp[36])+(resp[41])+(resp[46]);
        let cM=14+(resp[2])+(resp[12])+(resp[22])+(resp[32])+(resp[42])+(resp[47]);
        let nM=38+(resp[8])+(resp[18]);
        let oM=8+(resp[4])+(resp[14])+(resp[24])+(resp[34])+(resp[39])+(resp[44])+(resp[49]);
                
        let extroversao=(resp[5])+(resp[15])+(resp[25])+(resp[35])+(resp[45]);
        let agradabilidade=(resp[1])+(resp[11])+(resp[21])+(resp[31]);
        let concienciosidade=(resp[7])+(resp[17])+(resp[27])+(resp[37]);
        let estabilidade=(resp[3])+(resp[13])+(resp[23])+(resp[28])+(resp[33])+(resp[38])+(resp[43])+(resp[48]);
        let abertura=(resp[9])+(resp[19])+(resp[29]);
        
        //console.log(nD)
      //console.log(oD)
      
        let e,a,c,n,o=0;
          
        this.extroversao = eM-extroversao;
        this.agradabilidade = aM-agradabilidade;
        this.conscienciosidade = cM - concienciosidade;
        this.estabilidade = nM - estabilidade;
        this.abertura = oM - abertura;

        //console.log('e ',this.extroversao,' - a ',this.agradabilidade, ' - c ',this.conscienciosidade, ' - n ',this.estabilidade ,' - o ', this.abertura )
        this.chartb5([this.extroversao,this.agradabilidade,this.conscienciosidade,this.estabilidade, this.abertura])

  }

  public chartb5(dados : number[] = []){

    //(document.querySelector('.divgraficob5')?.hasAttribute('hidden')) ? document.querySelector('.divgraficob5')?.removeAttribute('hidden') : '';
    (document.querySelector('.resultado')?.hasAttribute('hidden')) ? document.querySelector('.resultado')?.removeAttribute('hidden') : '';
    document.querySelector('.cardb5')?.setAttribute('hidden','');
    document.querySelector('.cardb52')?.setAttribute('hidden','');
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
*/
    const sliders = document.querySelectorAll(".slider-ui");

      sliders.forEach((slider,index) => {
        //console.log(index)
        this.min = '0';
        this.max = '40';
        const trackId = slider.querySelector(".value")!.id;
        let track = document.getElementById(trackId);
        track!.style.left= ((dados[index] / 40) * 100) +'%';
        track!.textContent = dados[index].toString();
        

      });
  
  }

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

  public onClickDivB5(div:string, lbl:string, icon:string){

    (document.querySelector('.' + div)?.hasAttribute('hidden')) ? document.querySelector('.' + div)?.removeAttribute('hidden') : document.querySelector('.' + div)?.setAttribute('hidden','');
    (document.querySelector('.' + lbl)?.hasAttribute('hidden')) ? document.querySelector('.' + lbl)?.removeAttribute('hidden') : document.querySelector('.' + lbl)?.setAttribute('hidden','');
    if(document.getElementById(icon)?.classList.contains('fa-arrow-down')){
      document.getElementById(icon)?.classList.remove('fa-arrow-down');
      document.getElementById(icon)?.classList.add('fa-arrow-up');
    }else{
      document.getElementById(icon)?.classList.remove('fa-arrow-up');
      document.getElementById(icon)?.classList.add('fa-arrow-down');
    }
  }
  
}

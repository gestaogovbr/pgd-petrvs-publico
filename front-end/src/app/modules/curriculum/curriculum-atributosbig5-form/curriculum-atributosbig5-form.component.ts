import { Component, Injector, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageFormBase } from '../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { Questionario } from 'src/app/models/questionario.model';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';

@Component({
  selector: 'curriculum-atributosbig5-form',
  templateUrl: './curriculum-atributosbig5-form.component.html',
  styleUrls: ['./curriculum-atributosbig5-form.component.scss']
})
export class CurriculumAtributosbig5FormComponent extends PageFormBase<Questionario, QuestionarioDaoService>{


  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("comunica", { static: false }) public comunicaV?: Input;
  @ViewChild("lideranca", { static: false }) public liderancaV?: Input;
  @ViewChild("resolucao", { static: false }) public resolucaoV?: Input;
  @ViewChild("pensamento", { static: false }) public pensamentoV?: Input;
  @ViewChild("criatividade", { static: false }) public criatividadeV?: Input;
  @ViewChild("habilidade", { static: false }) public habilidadeV?: Input;
  @ViewChild("adaptabilidade", { static: false }) public adaptabilidadeV?: Input;
  @ViewChild("etica", { static: false }) public eticaV?: Input;

  comunicaIMG! : string;
  liderancaIMG! : string;
  resolucaoIMG! :string;
  pensamentoIMG! :string;
  criatividadeIMG! : string;
  habilidadeIMG! :string;
  adaptabilidadeIMG! :string;
  eticaIMG! :string;
  bigicoIMG! :string;
  bigicoAmareloIMG! :string;


  constructor(public injector: Injector) {
    super(injector, Questionario, QuestionarioDaoService);

    this.comunicaIMG="/assets/icons/iconeComunicacao.png";//"../assets/icons/Comunica.jpg";
    this.liderancaIMG="/assets/icons/iconeLideranca.png";
    this.resolucaoIMG="/assets/icons/iconeResolucao.png";
    this.pensamentoIMG="/assets/icons/iconePensamento.png";
    this.criatividadeIMG="/assets/icons/iconeCriatividade.png";
    this.habilidadeIMG="/assets/icons/iconeHabilidades.png";
    this.adaptabilidadeIMG="/assets/icons/iconeAdaptabilidade.png";
    this.eticaIMG="/assets/icons/iconeEtica.png";
    this.bigicoAmareloIMG="/assets/images/iconBigAmarelo.png";
    this.bigicoIMG="/assets/images/iconBig.png";

    this.form = this.fh.FormBuilder({
      comunica: { default: 0 },
      lideranca: { default: 0 },
      resolucao: { default: 0 },
      pretensao: { default: 0 },
      criatividade: { default: 0 },
      pensamento: { default: 0 },
      habilidade: { default: 0 },
      adaptabilidade: { default: 0 },
      etica: { default: 0 },
         
      
    }, this.cdRef, this.validate);


    /*const range = document.getElementById('range') as HTMLInputElement;
    console.log('RANGE-->',range)
     const rangeV = document.getElementById('rangeV');
          
       const setValue = ()=>{
            console.log(range)
            const
              newValue = Number( (parseInt(range.value))  - (parseInt(range.min)) * 100 / (parseInt(range.max) - parseInt(range.min) )),
              newPosition = 10 - (newValue * 0.2);
            rangeV!.innerHTML = `<span>${range}</span>`;
            rangeV!.style.left = `calc(${newValue}% + (${newPosition}px))`;
          };
    document.addEventListener('DOMContentLoaded', setValue);
    console.log(range)
    //range.addEventListener('input', setValue);*/
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    return result;
  }

  public async loadData(entity: Questionario, form: FormGroup) {
    
  }

  public async initializeData(form: FormGroup) {
    return await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<Questionario> {
    return new Promise<Questionario>((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
      let questionario = this.util.fill(new Questionario(), this.entity!);
      //curriculum.usuario_id=this.auth.usuario?.id;
      questionario = this.util.fillForm(questionario, this.form!.value);
     
   
      //(this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element => questionario.idiomas.push(element.data));
      resolve(questionario);  
      //resolve(this.util.fillForm(curriculum, this.form!.value));
    });
  }

  ngOnInit(): void {
  }

  /*this.form = this.fh.FormBuilder({
    nome: { default: "" },
    perguntas: { default: [] },
    codigo: { default: "" },
    tipoQuestionario: { default: "" },
    switchExemplo: { default: false },
  }, this.cdRef, this.validate);

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }*/
  
  public valorSoftChange(control:any){
    
      control.value == '' ? control.setValue(0) : '';

      const comunica = this.form?.controls.comunica.value;
      const lideranca = this.form?.controls.lideranca.value;
      const resolucao = this.form?.controls.resolucao.value;
      const pretensao = this.form?.controls.pretensao.value;
      const criatividade = this.form?.controls.criatividade.value;
      const pensamento = this.form?.controls.pensamento.value;
      const habilidade = this.form?.controls.habilidade.value;
      const adaptabilidade = this.form?.controls.adaptabilidade.value;
      const etica = this.form?.controls.etica.value;

      const array = [comunica,lideranca,resolucao,pretensao,criatividade,pensamento,habilidade,adaptabilidade,etica]

      let soma:number = 0;

      for (const val of array) {
        //console.log('SUM SEQUENCIA', sum)
         soma = soma + parseInt(val);
         
         if(soma > 20){
          this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
          control.setValue( control.value - (soma - 20));
          break;
         }
      }
  }

  
}

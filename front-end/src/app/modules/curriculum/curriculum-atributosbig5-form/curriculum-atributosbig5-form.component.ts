import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageFormBase } from '../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';

@Component({
  selector: 'curriculum-atributosbig5-form',
  templateUrl: './curriculum-atributosbig5-form.component.html',
  styleUrls: ['./curriculum-atributosbig5-form.component.scss']
})
export class CurriculumAtributosbig5FormComponent{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild("comunica", { static: false }) public comunicaV?: Input;
  @ViewChild("lideranca", { static: false }) public liderancaV?: Input;
  @ViewChild("resolucao", { static: false }) public resolucaoV?: Input;
  @ViewChild("pensamento", { static: false }) public pensamentoV?: Input;
  @ViewChild("criatividade", { static: false }) public criatividadeV?: Input;
  @ViewChild("habilidade", { static: false }) public habilidadeV?: Input;
  @ViewChild("adaptabilidade", { static: false }) public adaptabilidadeV?: Input;
  @ViewChild("etica", { static: false }) public eticaV?: Input;

  comunica! : string;
  lideranca! : string;
  resolucao! :string;
  pensamento! :string;
  criatividade! : string;
  habilidade! :string;
  adaptabilidade! :string;
  etica! :string;
  bigico! :string;
  bigicoAmarelo! :string;


  constructor(private router:Router) { 

    this.comunica="/assets/icons/iconeComunicacao.png";//"../assets/icons/Comunica.jpg";
    this.lideranca="/assets/icons/iconeLideranca.png";
    this.resolucao="/assets/icons/iconeResolucao.png";
    this.pensamento="/assets/icons/iconePensamento.png";
    this.criatividade="/assets/icons/iconeCriatividade.png";
    this.habilidade="/assets/icons/iconeHabilidades.png";
    this.adaptabilidade="/assets/icons/iconeAdaptabilidade.png";
    this.etica="/assets/icons/iconeEtica.png";
    this.bigicoAmarelo="/assets/images/iconBigAmarelo.png";
    this.bigico="/assets/images/iconBig.png";

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
  
  public valorSoftChange(soft:string , name:string){
    

    const comunicaEL = document.getElementsByName('comunica');
    let comunica = comunicaEL
    let lideranca = (this.liderancaV as HTMLInputElement).value;
   
    console.log(parseInt(soft), name, comunica, lideranca)
    /**
     * let $inputsFunc2 = $('.skills');

    let soma2=0;

    $inputsFunc2.each(function() {
        if($(this).val()==''){
          $(this).val(0);
        }
                                                
        soma2 += parseInt($(this).val(), 0);
                                                      
    });
    let soma=a+b+c+d+e+f+g;

    if(soma2==20){
      $('#lbltotalskill').text(soma2);
      $('#lbltotalskill').css('color','red')
      $('#lbltotalSK').css('color','red')

    }else{
      $('#lbltotalskill').text(soma2);
      $('#lbltotalskill').css('color','black')
      $('#lbltotalSK').css('color','black')

    }
     */
  }

  public voltarb5(){}

  public resposta(){}

  public proxb5(){}


}

import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'curriculum-atributosbig5-form',
  templateUrl: './curriculum-atributosbig5-form.component.html',
  styleUrls: ['./curriculum-atributosbig5-form.component.scss']
})
export class CurriculumAtributosbig5FormComponent implements OnInit {

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

  
  public onChangeValorSoft(soft:any){
    console.log(soft)
  }

  public voltarb5(){}

  public resposta(){}

  public proxb5(){}


}

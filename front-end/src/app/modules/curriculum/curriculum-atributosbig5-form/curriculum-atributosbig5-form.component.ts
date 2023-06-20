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
  bigico! :string;
  bigicoAmarelo! :string;


  constructor(private router:Router) { 

    this.comunica="/assets/images/Comunica.jpeg"//"../assets/images/Comunica.jpg";
    this.lideranca="/assets/images/Lid.jpeg";
    this.resolucao="/assets/images/Resolucao.jpeg";
    this.bigicoAmarelo="/assets/images/iconBigAmarelo.png";
    this.bigico="/assets/images/iconBig.png";

    const range = document.getElementById('range') as HTMLInputElement;
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
    //range.addEventListener('input', setValue);

  }

  ngOnInit(): void {
  }

  public inicio(): void{
    if ($('#big5').is(":hidden")){
      $('#big5').show();
      $('#lblinicio').text('Voltar')
      $('#btnInicio').removeClass().addClass('btn btn-dark')

    }
    else{
      $('#big5').hide();
      $('#lblinicio').text('Iniciar')
      $('#btnInicio').removeClass().addClass('btn btn-success')
    }       
  }

  public onChangePerma(){
    console.log()
    let value = $('#rangePerma').val()
    $('#lblPerma').text(value!.toString())
  }

  public voltarb5(){}

  public resposta(){}

  public proxb5(){}


}

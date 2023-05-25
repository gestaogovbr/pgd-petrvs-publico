import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum-atributosbig5-form',
  templateUrl: './curriculum-atributosbig5-form.component.html',
  styleUrls: ['./curriculum-atributosbig5-form.component.scss']
})
export class CurriculumAtributosbig5FormComponent implements OnInit {

  constructor() { }

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

  public voltarb5(){}

  public resposta(){}

  public proxb5(){}

}

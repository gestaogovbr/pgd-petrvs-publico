import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raiox-pessoal',
  templateUrl: './raiox-pessoal.component.html',
  styleUrls: ['./raiox-pessoal.component.scss']
})
export class RaioxPessoalComponent implements OnInit {

  estados=["","Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul",
          "Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul",
          "Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins","Distrito Federal"]

  constructor() { }

  ngOnInit(): void {
  }

}

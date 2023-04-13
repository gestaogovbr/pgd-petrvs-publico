import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-raioxhome',
  templateUrl: './raioxhome.component.html',
  styleUrls: ['./raioxhome.component.scss']
})
export class RaioxhomeComponent implements OnInit {

  logoInicial:string;
  imgDadosPessoais:string;
  imgDadosProfissionais:string;
  imgAtributos:string;
  imgOportunidades:string;

  constructor(private router:Router, private auth:AuthService) { 
    this.logoInicial="../../../../assets/images/logo-raio-x-3.png";
    this.imgDadosPessoais="../../../../assets/images/Dados_pessoais.png";
    this.imgDadosProfissionais="../../../../assets/images/Dados_profissionais.png";
    this.imgAtributos="../../../../assets/images/Atributos_comportamentais.png";
    this.imgOportunidades="../../../../assets/images/Oportunidade.png";
  }

  ngOnInit(): void {
  }

  dadosPessoais(){

    this.router.navigate(['raioxhome/pessoal'])


  }

  public mensagemSaudacao() {
    const hora = parseInt(this.auth.unidadeHora.replace(":", ""));
    const apelido = this.auth.usuario?.apelido;
    const mail = this.auth.usuario?.email;
    return hora < 1200 ? "Bom dia, " + apelido : hora < 1800 ? "Boa tarde, " + apelido : "Boa noite, " + apelido;
  }

}

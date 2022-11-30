import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-retorno',
  templateUrl: './login-retorno.component.html',
  styleUrls: ['./login-retorno.component.scss']
})
export class LoginRetornoComponent implements OnInit {

  public bc?: BroadcastChannel;

  constructor() { }

  ngOnInit(): void {
    this.bc = new BroadcastChannel('petrvs_login_popup');
    this.bc?.postMessage("COMPLETAR_LOGIN");
    setTimeout(() => window.close(), 1000);
  }

}

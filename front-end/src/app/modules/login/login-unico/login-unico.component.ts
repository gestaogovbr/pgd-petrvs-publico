import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {FullRoute} from "../../../services/navigate.service";

@Component({
  selector: 'app-login-unico',
  templateUrl: './login-unico.component.html',
  styleUrls: ['./login-unico.component.scss']
})
export class LoginUnicoComponent implements OnInit {

  public redirectTo?: FullRoute;
  public code: string = "";
  public state: string = "";
  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code= params['code'];
      this.state = params['state'];
    });
    if (this.code) {
      this.auth.authLoginUnico(this.code,this.state,this.redirectTo);
    }
  }

}

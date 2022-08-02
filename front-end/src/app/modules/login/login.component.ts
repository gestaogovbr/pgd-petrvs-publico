import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { FullRoute, NavigateService } from 'src/app/services/navigate.service';
import { ModalPage } from '../base/modal-page';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, ModalPage {

  public buttonDprfSeguranca: boolean = true;
  public error: string = "";
  public login: FormGroup;
  public redirectTo?: FullRoute;

  /* ModalPage interface */
  public modalRoute?: ActivatedRouteSnapshot;
  public modalInterface: boolean = true;
  public modalWidth: number = 400;
  public titleSubscriber: Subject<string> = new Subject<string>();

  constructor(
    public globals: GlobalsService,
    public go: NavigateService,
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public googleApi: GoogleApiService
  ) {
    this.login = this.formBuilder.group({
      usuario: ["", Validators.required],
      senha: ["", Validators.required],
      token: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.titleSubscriber.next("Login Petrvs");
    this.route.queryParams.subscribe(params => {
      this.error = params['error'] ? params['error'] : "";
      if(params["redirectTo"]) {
        let routerTo = JSON.parse(params["redirectTo"]);
        this.redirectTo = routerTo.route[0] == "login" ? routerTo : undefined;
      }
    });
    if(this.globals.is("PRF")) {
      this.auth.gapiLoad.asObservable().subscribe(gAuth => {
        this.autoSignGoogle();
      });
      this.autoSignGoogle();
    }
  }

  public closeModalIfSuccess = (result: boolean) => {
    if(result && this.modalRoute) {
      this.go.clearRoutes();
    }
  };

  public autoSignGoogle() {
    /* Faz login automaticamente caso esteja logado com o Google */
    if(!this.auth.logging && !this.auth.logged && this.auth.googleAuth?.isSignedIn.get()) {
      this.auth.authGapi(this.auth.googleAuth.currentUser.get().getAuthResponse().id_token, this.redirectTo);
    }
  }

  public signInGoogle() {
    this.googleApi.signIn().then(user => {
      this.auth.authGapi(user.getAuthResponse().id_token, this.redirectTo).then(this.closeModalIfSuccess);
    }).catch(reason => {
      console.log(reason);
    });
  }

  public showDprfSeguranca() {
    this.buttonDprfSeguranca = !this.buttonDprfSeguranca;
  }

  public signInDprfSeguranca() {
    const form = this.login.controls;
    if(this.login.valid) {
      this.auth.authDprfSeguranca(form.usuario.value, form.senha.value, form.token.value, this.redirectTo).then(this.closeModalIfSuccess);
    } else {
      this.error = "Verifique se está correto:" + (form.cpf.invalid ? " CPF;" : "") + (form.password.invalid ? " Senha;" : "") + (form.password.invalid ? " Token;" : "");
    }
  }

  public signInMicrosoft() {
    const form = this.login.controls;
    if(this.login.valid) {
      this.auth.authDprfSeguranca(form.usuario.value, form.senha.value, form.token.value, this.redirectTo).then(this.closeModalIfSuccess);
    } else {
      this.error = "Verifique se está correto:" + (form.cpf.invalid ? " CPF;" : "") + (form.password.invalid ? " Senha;" : "") + (form.password.invalid ? " Token;" : "");
    }
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { FullRoute, NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { ModalPage } from '../base/modal-page';
import { DialogService } from 'src/app/services/dialog.service';

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
  public bc?: BroadcastChannel;

  /* ModalPage interface */
  public modalRoute?: ActivatedRouteSnapshot;
  public modalInterface: boolean = true;
  public modalWidth: number = 400;
  public titleSubscriber: Subject<string> = new Subject<string>();

  constructor(
    public globals: GlobalsService,
    public go: NavigateService,
    public router: Router,
    public cdRef: ChangeDetectorRef,
    public route: ActivatedRoute,
    public auth: AuthService,
    public util: UtilService,
    public fh: FormHelperService,
    public formBuilder: FormBuilder,
    public googleApi: GoogleApiService,
    public dialog: DialogService
  ) {
    this.login = this.fh.FormBuilder({
      usuario: {default: ""},
      senha: {default: ""},
      token: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['senha', 'token'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "usuario" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    }

    return result;
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
    this.auth.registerPopupLoginResultListener();
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
    this.login.markAllAsTouched();
    if(this.login.valid){
      this.auth.authDprfSeguranca(this.util.onlyNumbers(form.usuario.value), form.senha.value, this.util.onlyNumbers(form.token.value), this.redirectTo).then(this.closeModalIfSuccess);
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

  public signInAzure() {
    this.auth.authAzure();
  }

}

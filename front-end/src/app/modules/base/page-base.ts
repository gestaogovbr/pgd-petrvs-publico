import { ChangeDetectorRef, Injector, Injectable, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router, UrlSegment } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';
import { DialogService } from 'src/app/services/dialog.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { UtilService } from 'src/app/services/util.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { FullRoute, NavigateService } from 'src/app/services/navigate.service';
import { ModalPage } from './modal-page';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EntityService } from 'src/app/services/entity.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
declare var bootstrap: any;

@Injectable()
export abstract class PageBase implements OnInit, ModalPage {
  public action: string = "";
  public urlParams?: ParamMap;
  public queryParams?: any;
  public url?: UrlSegment[];
  public snapshot?: ActivatedRouteSnapshot;
  public modalRoute?: ActivatedRouteSnapshot;
  public modalInterface: boolean = true;
  public shown: boolean = false;
  public onShow?: () => void;
  public metadata?: any;
  public JSON = JSON;
  public code: string = "";
  public titleSubscriber: Subject<string> = new Subject<string>();
  private _loading: boolean = false;
  public set loading(value: boolean) {
    if(!value) {
      this.dialog.closeSppinerOverlay();
    } else if(!this._loading) {
      this.dialog.showSppinerOverlay(this.mensagemCarregando);
    }
    this._loading = value;
  }
  public get loading(): boolean {
    return this._loading;
  } 
  private _submitting: boolean = false;
  public set submitting(value: boolean) {
    if(!value) {
      this.dialog.closeSppinerOverlay();
    } else if(!this._submitting || !this.dialog.sppinerShowing) {
      this.dialog.showSppinerOverlay(this.mensagemSalvando);
    }
    this._submitting = value;
  }
  public get submitting(): boolean {
    return this._submitting;
  } 
  public get MAX_LENGTH_TEXT() { return 65500};
  public get MIN_LENGTH_TEXT() { return 10};

  /* Constantes */
  public OPTION_INFORMACOES: ToolbarButton =  {
    icon: "bi bi-info-circle",
    label: "Informações",
    hint: "Informações",
    color: "btn-outline-info",
  };
  public OPTION_ALTERAR: ToolbarButton = {
    icon: "bi bi-pencil-square",
    label: "Alterar",
    hint: "Alterar",
    color: "btn-outline-warning",
  };
  public OPTION_EXCLUIR: ToolbarButton = {
    icon: "bi bi-trash",
    label: "Excluir",
    hint: "Excluir",
    color: "btn-outline-danger",
  };
  public OPTION_LOGS: ToolbarButton = {
    icon: "bi bi-list-ul",
    label: "Logs",
    hint: "Alterar",
    color: "btn-outline-secondary",
  };

  /* Injections */
  public lookup: LookupService;
  public entityService: EntityService;
  public router: Router;
  public route: ActivatedRoute;
  public fb: FormBuilder;
  public fh: FormHelperService;
  public gb: GlobalsService;
  public lex: LexicalService;
  public cdRef: ChangeDetectorRef;
  public dialog: DialogService;
  public util: UtilService;
  public go: NavigateService;
  public auth: AuthService;

  /* Configurações */
  public mensagemCarregando = "Carregando...";
  public mensagemSalvando = "Salvando...";
  public breadcrumbs: FullRoute[] = [];
  public backRoute: FullRoute = { route: ['home'] };
  public modalWidth: number = 1000;
  public viewInit: boolean = false;
  public options: ToolbarButton[] = [];
  public storeExtra?: () => any;
  private _title: string = "";
  public set title(value: string) { if(this._title != value) { this._title = value; this.titleSubscriber.next(value); }};
  public get title(): string { return this._title };
  public set usuarioConfig(value: any) {
    if(this.code.length) this.auth.usuarioConfig = {[this.code]: value};
  }
  public get usuarioConfig(): any {
    return Object.assign(this.defaultUsuarioConfig(), this.auth.usuarioConfig[this.code] || {});
  }
  
  constructor(public injector: Injector){
    /* Injections */
    this.lookup = this.injector.get<LookupService>(LookupService);
    this.router = this.injector.get<Router>(Router);
    this.route = this.injector.get<ActivatedRoute>(ActivatedRoute);
    this.fb = this.injector.get<FormBuilder>(FormBuilder);
    this.fh = this.injector.get<FormHelperService>(FormHelperService);
    this.gb = this.injector.get<GlobalsService>(GlobalsService);
    this.cdRef = this.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dialog = this.injector.get<DialogService>(DialogService);
    this.util = this.injector.get<UtilService>(UtilService);
    this.go = this.injector.get<NavigateService>(NavigateService);
    this.lex = this.injector.get<LexicalService>(LexicalService);
    this.auth = this.injector.get<AuthService>(AuthService);
    this.entityService = injector.get<EntityService>(EntityService);
  }

  ngOnInit(){
    this.snapshot = this.snapshot || this.modalRoute || this.route.snapshot;
    this.urlParams = this.snapshot.paramMap;
    this.queryParams = this.go.decodeParam(this.snapshot.queryParams);
    this.metadata = this.go.getMetadata(this.snapshot.queryParams.idroute);
    this.url = this.snapshot.url;
    if(this.snapshot.queryParams?.idroute?.length) this.go.setDefaultBackRoute(this.snapshot.queryParams.idroute, this.backRoute);
  }

  public get isModal(): boolean {
    return !!this.modalRoute;
  }

  ngAfterViewInit() {
    if(!this.title?.length && this.snapshot?.data?.title?.length) this.title = this.snapshot.data?.title;
    if(!this.modalRoute) {
      this.shown = true;
      if(this.onShow) this.onShow();
    };

    
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    this.cdRef.detectChanges();
    this.viewInit = true;
  }

  public error = (error: string) => {
    this.dialog.topAlert(error);
  }

  public saveUsuarioConfig(config?: any) {
    const extra = this.storeExtra ? this.storeExtra() : undefined;
    this.usuarioConfig = Object.assign(this.usuarioConfig || {}, extra || {}, config || {});
  }

  public defaultUsuarioConfig(): any {
    return {};
  }

  public addOption(button: ToolbarButton, capacidade?: string) {
    if (!capacidade || this.auth.hasPermissionTo(capacidade)) this.options.push(button);
  }

  public isInvalid(control: AbstractControl): boolean {
    return !control ? true : control.invalid && (control.dirty || control.touched);
  }

  public hasError(control: AbstractControl): boolean {
    return !control ? false : !!control.errors;
  }

  public errorMessage(control: AbstractControl): string {
    return control.errors?.errorMessage;
  }

  public getBackRoute(): FullRoute {
    return this.backRoute ? this.backRoute : this.breadcrumbs.length ? this.breadcrumbs[this.breadcrumbs.length-1] : {route: []};
  }

  public close() {
    this.go.back(undefined, this.backRoute);
  }
}

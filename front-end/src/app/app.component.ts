import { ChangeDetectorRef, Component, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarButton } from './components/toolbar/toolbar.component';
import { ListenerAllPagesService } from './listeners/listener-all-pages.service';
import { Usuario } from './models/usuario.model';
import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';
import { DialogComponent } from './services/dialog/dialog.component';
import { GlobalsService } from './services/globals.service';
import { LexicalService } from './services/lexical.service';
import { FullRoute, NavigateService } from './services/navigate.service';
import { UtilService } from './services/util.service';

export let appInjector: Injector;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dialogs', { read: ViewContainerRef }) dialogs?: ViewContainerRef;

  public title: string = 'petrvs';
  public error: string = '';
  public unidadeHora: string = "";

  public globals: GlobalsService;
  public cdRef: ChangeDetectorRef;
  public auth: AuthService;
  public dialog: DialogService;
  public lex: LexicalService;
  public router: Router;
  public route: ActivatedRoute;
  public go: NavigateService;
  public allPages: ListenerAllPagesService;
  public utils: UtilService;

  constructor(public injector: Injector) {
    /* Injector */
    appInjector = injector;
    this.globals = injector.get<GlobalsService>(GlobalsService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.auth = injector.get<AuthService>(AuthService);
    this.dialog = injector.get<DialogService>(DialogService);
    this.lex = injector.get<LexicalService>(LexicalService);
    this.router = injector.get<Router>(Router);
    this.route = injector.get<ActivatedRoute>(ActivatedRoute);
    this.go = injector.get<NavigateService>(NavigateService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.utils = injector.get<UtilService>(UtilService);
    /* Inicializações */
    this.auth.success = (usuario: Usuario, redirectTo?: FullRoute) => {
      this.go.navigate(redirectTo || {route: this.globals.initialRoute});
    };
    this.auth.fail = (error: any) => {
      this.go.navigate({route: ['login'], params: {error: error?.error || error?.message || error}});
    };
    this.auth.leave = () => {
      this.go.navigate({route: ['login']});
    };
    this.globals.refresh = () => {
      this.cdRef.detectChanges();
    };
    if(this.globals.isExtension && this.globals.initialRoute?.length) {
      this.go.navigate({route: this.globals.initialRoute});
    }
    setInterval(() => {
      let hora = this.auth.unidade ? this.auth.unidadeHora : "--:--";
      if(this.unidadeHora != hora) {
        this.unidadeHora = hora;
        this.cdRef.detectChanges();
      }
    }, 1000);
    this.lex.cdRef = this.cdRef;
    this.auth.loadGapi();
  }

  public ngAfterViewInit() {
    /* Container para a criação de dialogs */
    this.dialog.container = this.dialogs;
    this.dialog.cdRef = this.cdRef;
  }

  public toolbarLogin() {
    this.go.navigate({route: ["login"]}, {modal: true});
  }

  public menuItemClass(baseClass: string, activeRoute: string[]) {
    return baseClass + (this.go.isActivePath(activeRoute) ? " fw-bold" : "");
  }

  public isButtonRunning(btn: ToolbarButton): boolean {
    return btn.running || !!btn.items?.find(x => x.running);
  }

  public buttonId(button: ToolbarButton) {
    return "button_" + this.utils.md5((button.icon || "") + (button.hint || "") + (button.label || "")); 
  }

  public get unidades(): any[] {
    return this.auth.unidades || [];
  }

  public get usuarioNome(): string {
    return this.utils.shortName(this.auth.usuario?.apelido.length ? this.auth.usuario?.apelido : this.auth.usuario?.nome || "");
  }

  public get usuarioFoto(): string {
    return this.auth.usuario?.url_foto || "./assets/images/profile.png";
  }

  public onCollapseContainerClick() {
    //this.auth.usuario!.config.ocultar_container_petrvs = !this.auth.usuario!.config.ocultar_container_petrvs;
    this.auth.usuarioConfig = {ocultar_container_petrvs: !this.auth.usuario!.config.ocultar_container_petrvs};
    this.cdRef.detectChanges();
  }

  public get collapseContainer(): boolean {
    return this.globals.isExtension && this.auth.logged && !!this.auth.usuario?.config.ocultar_container_petrvs;
  }

  public onRestoreClick(popup: DialogComponent) {
    popup.restore();
  }

  public selecionaUnidade(event: Event) {
    const key = (event.target as HTMLInputElement).value;
    this.auth.selecionaUnidade(key, this.cdRef);
  }

  public async onToolbarButtonClick(btn: ToolbarButton) {
    try {
      btn.running = true;
      this.cdRef.detectChanges();
      if(btn.onClick) await btn.onClick(btn);
    } finally {
      btn.running = false;
      this.cdRef.detectChanges();
    }
  }

  public get isMinimized(): boolean {
    return !!this.dialog.minimized?.length;
  }

  public logout() {
    this.auth.logOut();
  }

  public get isConfig(): boolean {
    return this.router.url.indexOf("/extension/options") >= 0;
  }
}

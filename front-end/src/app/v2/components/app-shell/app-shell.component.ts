import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { AuthService, UnidadeVinculada } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { NotificacaoService } from 'src/app/modules/uteis/notificacoes/notificacao.service';
import { UtilService } from 'src/app/services/util.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-shell-v2',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellV2Component implements OnInit {
  readonly auth = inject(AuthService);
  readonly gb = inject(GlobalsService);
  readonly go = inject(NavigateService);
  readonly notificacao = inject(NotificacaoService);
  readonly utils = inject(UtilService);
  readonly cdRef = inject(ChangeDetectorRef);

  @ViewChild('menuTrigger') menuTriggerRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuClose')   menuCloseRef?:   ElementRef<HTMLButtonElement>;

  readonly unidadeAberta = signal(false);
  readonly perfilAberto  = signal(false);
  readonly menuAberto    = signal(false);

  private readonly foldersAbertos = new Set<string>();

  isFolderAberto(name: string): boolean {
    return this.foldersAbertos.has(name);
  }

  toggleFolder(name: string): void {
    this.foldersAbertos.has(name)
      ? this.foldersAbertos.delete(name)
      : this.foldersAbertos.add(name);
  }

  ngOnInit(): void {
    if (!this.gb.contexto) {
      if (this.auth.hasPermissionTo('CTXT_GEST')) {
        this.gb.setContexto('GESTAO', false);
      } else if (this.auth.hasPermissionTo('CTXT_EXEC')) {
        this.gb.setContexto('EXECUCAO', false);
      }
    }
  }

  // Fecha o overlay mais externo ao pressionar Escape
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuAberto())    { this.fecharMenu(); return; }
    if (this.perfilAberto())  { this.perfilAberto.set(false); return; }
    if (this.unidadeAberta()) { this.unidadeAberta.set(false); }
  }

  toggleMenu(): void {
    if (this.menuAberto()) {
      this.fecharMenu();
    } else {
      this.menuAberto.set(true);
      // Move foco para o botão fechar após animação
      requestAnimationFrame(() => this.menuCloseRef?.nativeElement.focus());
    }
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
    // Devolve foco ao botão que abriu o menu
    requestAnimationFrame(() => this.menuTriggerRef?.nativeElement.focus());
  }

  toggleUnidade(): void {
    this.unidadeAberta.set(!this.unidadeAberta());
    this.perfilAberto.set(false);
  }

  togglePerfil(): void {
    this.perfilAberto.set(!this.perfilAberto());
    this.unidadeAberta.set(false);
  }

  // Trata Enter e Space em elementos <a> sem href, prevenindo scroll
  onKeyActivate(event: KeyboardEvent, fn: () => void): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      fn();
    }
  }

  get menuItems(): any[] {
    const app = AppComponent.instance;
    if (!app) return [];
    const hasGestao   = this.auth.hasPermissionTo('CTXT_GEST');
    const hasExecucao = this.auth.hasPermissionTo('CTXT_EXEC');
    let items: any[] = [];
    if (hasGestao)       items = [...(app.moduloGestao   || [])];
    else if (hasExecucao) items = [...(app.moduloExecucao || [])];
    if (this.auth.hasPermissionTo('CTXT_DEV')) items = [...items, ...(app.moduloDev || [])];
    return items;
  }

  hasPermission(permition: string | undefined): boolean {
    if (!permition) return true;
    return this.auth.hasPermissionTo(permition);
  }

  navigate(item: any): void {
    if (!item?.route) return;
    this.fecharMenu();
    this.go.navigate({ route: item.route, params: item.params }, item.metadata || { root: true });
  }

  goHome(): void {
    this.fecharMenu();
    this.gb.goHome();
  }

  irParaNotificacoes(): void {
    this.go.navigate({ route: ['uteis', 'notificacoes'] });
  }

  async selecionaUnidade(id: string, matricula: string | null): Promise<void> {
    if (!matricula) return;
    this.unidadeAberta.set(false);
    await this.auth.selecionaUnidade(id, matricula, this.cdRef);
    window.location.reload();
  }

  navigatePerfil(route: any[], metadata?: any): void {
    this.perfilAberto.set(false);
    this.go.navigate({ route }, metadata || { root: true, modal: true });
  }

  logout(): void {
    this.perfilAberto.set(false);
    this.auth.logOut();
  }

  get usuarioNome(): string {
    const u = this.auth.usuario;
    return this.utils.shortName(u?.apelido?.length ? u.apelido : u?.nome || '');
  }

  get usuarioFoto(): SafeUrl {
    return this.gb.getResourcePath(this.auth.usuario?.url_foto || 'assets/images/profile.png');
  }

  get unidadesVinculadas(): UnidadeVinculada[] {
    return this.auth.unidadesVinculadas || [];
  }

  get logoSrc(): string {
    return this.gb.getResourcePath('assets/images/icon_' + this.gb.theme + '.png');
  }

  get naoLidas(): number {
    return this.notificacao.naoLidas;
  }
}

import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, DestroyRef, inject, signal } from "@angular/core";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from "src/app/v2/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute } from "@angular/router";
import { catchError, filter, finalize, map, of, switchMap, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigateService } from "src/app/services/navigate.service";
import { PlanoTrabalhoApiClient } from "../infra/api-client";
import { PlanoTrabalho } from "../domain/types";
import { AuthService } from "src/app/services/auth.service";
import { PlanoTrabalhoPolicy } from "../application/plano-trabalho.policy";

@Component({
  selector: 'app-plano-trabalho-v2-tcr-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './tcr.page.html'
})
export class PlanoTrabalhoV2TcrPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlanoTrabalhoApiClient);
  private readonly go = inject(NavigateService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  readonly policy = inject(PlanoTrabalhoPolicy);

  readonly planoId = signal<string | null>(null);
  readonly plano = signal<PlanoTrabalho | null>(null);
  readonly documento = signal<any | null>(null);
  readonly loading = signal(true);
  readonly salvando = signal(false);
  readonly error = signal<string | null>(null);

  get usuarioAtualId(): string { return this.auth.usuario?.id ?? ''; }

  readonly jaAssinou = signal(false);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      take(1),
      switchMap(id => {
        this.planoId.set(id);
        return this.api.getById(id!).pipe(
          switchMap(plano => {
            this.plano.set(plano);
            return this.api.getDocumento(id!).pipe(
              catchError(() => of(null))
            );
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (doc) => {
        this.documento.set(doc);
        this.atualizarJaAssinou();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar o TCR.');
        this.loading.set(false);
      }
    });
  }

  gerarDocumento() {
    const id = this.planoId();
    if (!id || this.salvando()) return;
    this.salvando.set(true);
    this.api.createDocumento(id).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: (doc) => {
        this.documento.set(doc);
        this.atualizarJaAssinou();
      },
      error: () => this.error.set('Erro ao gerar o documento.')
    });
  }

  assinar() {
    const id = this.planoId();
    if (!id || this.salvando()) return;
    this.salvando.set(true);
    this.api.assinarDocumento(id).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: (assinatura) => {
        assinatura.usuario_nome = this.auth.usuario?.nome;
        this.documento.update(doc => doc
          ? { ...doc, assinaturas: [...(doc.assinaturas ?? []), assinatura] }
          : doc
        );
        this.jaAssinou.set(true);
      },
      error: () => this.error.set('Erro ao assinar o documento.')
    });
  }

  cancelarAssinatura() {
    const id = this.planoId();
    if (!id || this.salvando()) return;
    if (!confirm('Deseja realmente cancelar sua assinatura?')) return;
    this.salvando.set(true);
    this.api.cancelarAssinaturaDocumento(id).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: () => {
        this.documento.update(doc => doc
          ? { ...doc, assinaturas: (doc.assinaturas ?? []).filter((a: any) => a.usuario_id !== this.usuarioAtualId) }
          : doc
        );
        this.jaAssinou.set(false);
      },
      error: () => this.error.set('Erro ao cancelar a assinatura.')
    });
  }

  voltar() { this.go.back(); }

  private atualizarJaAssinou() {
    const assinaturas: any[] = this.documento()?.assinaturas ?? [];
    this.jaAssinou.set(assinaturas.some(a => a.usuario_id === this.usuarioAtualId));
  }
}

import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, DestroyRef, inject, signal } from "@angular/core";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from "src/app/v2/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute } from "@angular/router";
import { catchError, filter, finalize, map, of, switchMap, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PlanoApiClient } from "../infra/plano-api.client";
import { DocumentoApiClient } from "../infra/documento-api.client";
import { PlanoTrabalho } from "../domain/types";

@Component({
  selector: 'app-plano-trabalho-v2-tcr-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './tcr.page.html'
})
export class PlanoTrabalhoV2TcrPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly planoApi = inject(PlanoApiClient);
  private readonly documentoApi = inject(DocumentoApiClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly planoId = signal<string | null>(null);
  readonly plano = signal<PlanoTrabalho | null>(null);
  readonly documento = signal<any | null>(null);
  readonly loading = signal(true);
  readonly salvando = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      take(1),
      switchMap(id => {
        this.planoId.set(id);
        return this.planoApi.getById(id!).pipe(
          switchMap(plano => {
            this.plano.set(plano);
            return this.documentoApi.getDocumento(id!).pipe(
              catchError(() => of(null))
            );
          })
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (doc) => {
        this.documento.set(doc);
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
    this.documentoApi.createDocumento(id).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: (doc) => this.documento.set(doc),
      error: () => this.error.set('Erro ao gerar o documento.')
    });
  }

  voltar() { window.history.back(); }
}

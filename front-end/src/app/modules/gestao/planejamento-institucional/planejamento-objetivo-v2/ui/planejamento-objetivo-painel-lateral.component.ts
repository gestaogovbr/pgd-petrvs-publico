import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { firstValueFrom } from 'rxjs';
import {
  PlanejamentoObjetivoEsforcoApiClient,
  type ObjetivoPainelFiltroOpcaoApi,
  type ObjetivoPainelResumoApi
} from '../infra/planejamento-objetivo-esforco-api.client';
import { PlanejamentoObjetivoEntregasDetalhamentoModalComponent } from './planejamento-objetivo-entregas-detalhamento-modal.component';

@Component({
  selector: 'app-planejamento-objetivo-painel-lateral',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './planejamento-objetivo-painel-lateral.component.html',
  styleUrl: './planejamento-objetivo-painel-lateral.component.scss'
})
export class PlanejamentoObjetivoPainelLateralComponent implements OnDestroy {
  private readonly api = inject(PlanejamentoObjetivoEsforcoApiClient);
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  readonly objetivoId = input<string | null>(null);
  readonly consultadoId = input<string | null>(null);
  readonly centralizar = output<string>();

  readonly loading = signal(false);
  readonly atualizandoMetricas = signal(false);
  readonly error = signal<string | null>(null);
  readonly resumo = signal<ObjetivoPainelResumoApi | null>(null);
  readonly unidadesFiltro = signal<ObjetivoPainelFiltroOpcaoApi[]>([]);
  readonly filtroUnidadeId = signal('');

  private detalhamentoOverlayRef: OverlayRef | null = null;
  private detalhamentoBackdropSub: { unsubscribe: () => void } | null = null;
  private carregamentoId = 0;

  constructor() {
    effect(() => {
      const id = this.objetivoId();
      this.filtroUnidadeId.set('');
      void this.carregarResumo(id);
    });
  }

  onFiltroUnidadeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filtroUnidadeId.set(value);
    void this.carregarMetricas(this.objetivoId(), value || undefined);
  }

  ngOnDestroy(): void {
    this.fecharDetalhamento();
  }

  abrirDetalhamento(): void {
    const id = this.objetivoId();
    if (!id?.length) {
      return;
    }

    this.fecharDetalhamento();

    this.detalhamentoOverlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      width: '96vw',
      height: '92vh',
      maxWidth: '96vw',
      maxHeight: '92vh',
      panelClass: 'detalhamento-entregas-overlay-pane'
    });

    const portal = new ComponentPortal(
      PlanejamentoObjetivoEntregasDetalhamentoModalComponent,
      null,
      this.injector
    );
    const componentRef = this.detalhamentoOverlayRef.attach(portal);
    componentRef.setInput('objetivoId', id);
    componentRef.setInput('unidadeIdInicial', this.filtroUnidadeId());
    componentRef.instance.modalClosed.subscribe(() => this.fecharDetalhamento());
    this.detalhamentoBackdropSub = this.detalhamentoOverlayRef.backdropClick().subscribe(() => {
      this.fecharDetalhamento();
    });
  }

  fecharDetalhamento(): void {
    this.detalhamentoBackdropSub?.unsubscribe();
    this.detalhamentoBackdropSub = null;
    this.detalhamentoOverlayRef?.dispose();
    this.detalhamentoOverlayRef = null;
  }

  formatHoras(value: number): string {
    if (!Number.isFinite(value)) {
      return '0';
    }
    return (Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }

  formatPercent(value: number): string {
    if (!Number.isFinite(value)) {
      return '0%';
    }
    return `${(Math.round(value * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;
  }

  private async carregarResumo(id: string | null): Promise<void> {
    if (!id?.length) {
      this.resumo.set(null);
      this.unidadesFiltro.set([]);
      this.error.set(null);
      this.loading.set(false);
      return;
    }

    const reqId = ++this.carregamentoId;
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.api.getPainelResumo(id));
      if (this.objetivoId() !== id || reqId !== this.carregamentoId) {
        return;
      }
      this.resumo.set(data);
      this.unidadesFiltro.set(data.filtro_unidades ?? []);
    } catch (err: unknown) {
      if (this.objetivoId() !== id || reqId !== this.carregamentoId) {
        return;
      }
      this.resumo.set(null);
      this.unidadesFiltro.set([]);
      this.error.set(err instanceof Error ? err.message : 'Não foi possível carregar o painel.');
    } finally {
      if (this.objetivoId() === id && reqId === this.carregamentoId) {
        this.loading.set(false);
      }
    }
  }

  private async carregarMetricas(id: string | null, unidadeId?: string): Promise<void> {
    if (!id?.length || !this.resumo()) {
      return;
    }

    const reqId = ++this.carregamentoId;
    this.atualizandoMetricas.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.api.getPainelResumo(id, { unidade_id: unidadeId }));
      if (this.objetivoId() !== id || reqId !== this.carregamentoId) {
        return;
      }
      this.resumo.update(atual => atual
        ? {
            ...atual,
            esforco: data.esforco,
            pessoas: data.pessoas,
            entregas: data.entregas,
          }
        : atual,
      );
    } catch (err: unknown) {
      if (this.objetivoId() !== id || reqId !== this.carregamentoId) {
        return;
      }
      this.error.set(err instanceof Error ? err.message : 'Não foi possível filtrar as métricas.');
    } finally {
      if (this.objetivoId() === id && reqId === this.carregamentoId) {
        this.atualizandoMetricas.set(false);
      }
    }
  }
}

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
  CadeiaValorArvoreApiClient,
  type CadeiaValorResumoApi,
  type FiltroOpcaoApi
} from '../infra/cadeia-valor-arvore-api.client';
import { CadeiaValorEntregasDetalhamentoModalComponent } from './cadeia-valor-entregas-detalhamento-modal.component';

@Component({
  selector: 'app-cadeia-valor-painel-lateral',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './cadeia-valor-painel-lateral.component.html',
  styleUrl: './cadeia-valor-painel-lateral.component.scss'
})
export class CadeiaValorPainelLateralComponent implements OnDestroy {
  private readonly api = inject(CadeiaValorArvoreApiClient);
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  readonly processoId = input<string | null>(null);
  readonly cadeiaValorId = input<string | null>(null);
  readonly consultadoId = input<string | null>(null);
  readonly centralizar = output<string>();

  readonly loading = signal(false);
  readonly atualizandoMetricas = signal(false);
  readonly error = signal<string | null>(null);
  readonly resumo = signal<CadeiaValorResumoApi | null>(null);
  readonly unidadesFiltro = signal<FiltroOpcaoApi[]>([]);
  readonly filtroUnidadeId = signal('');

  private detalhamentoOverlayRef: OverlayRef | null = null;
  private detalhamentoBackdropSub: { unsubscribe: () => void } | null = null;
  private carregamentoId = 0;

  constructor() {
    effect(() => {
      const id = this.processoId();
      this.filtroUnidadeId.set('');
      void this.carregarResumo(id);
    });
  }

  onFiltroUnidadeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filtroUnidadeId.set(value);
    void this.carregarMetricas(this.processoId(), value || undefined);
  }

  ngOnDestroy(): void {
    this.fecharDetalhamento();
  }

  abrirDetalhamento(): void {
    const processoId = this.processoId();
    const cadeiaId = this.cadeiaValorId();
    if (!processoId?.length || !cadeiaId?.length) {
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
      CadeiaValorEntregasDetalhamentoModalComponent,
      null,
      this.injector
    );
    const componentRef = this.detalhamentoOverlayRef.attach(portal);
    componentRef.setInput('cadeiaValorId', cadeiaId);
    componentRef.setInput('processoId', processoId);
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

  private async carregarResumo(processoId: string | null): Promise<void> {
    const cadeiaId = this.cadeiaValorId();
    if (!processoId?.length || !cadeiaId?.length) {
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
      const data = await firstValueFrom(this.api.getResumo(cadeiaId, processoId));
      if (this.processoId() !== processoId || reqId !== this.carregamentoId) {
        return;
      }
      this.resumo.set(data);
      this.unidadesFiltro.set(data.filtro_unidades);
    } catch (err: unknown) {
      if (this.processoId() !== processoId || reqId !== this.carregamentoId) {
        return;
      }
      this.resumo.set(null);
      this.unidadesFiltro.set([]);
      this.error.set(err instanceof Error ? err.message : 'Não foi possível carregar o painel.');
    } finally {
      if (this.processoId() === processoId && reqId === this.carregamentoId) {
        this.loading.set(false);
      }
    }
  }

  private async carregarMetricas(processoId: string | null, unidadeId?: string): Promise<void> {
    const cadeiaId = this.cadeiaValorId();
    if (!processoId?.length || !cadeiaId?.length || !this.resumo()) {
      return;
    }

    const reqId = ++this.carregamentoId;
    this.atualizandoMetricas.set(true);
    this.error.set(null);
    try {
      const params = unidadeId ? { unidade_id: unidadeId } : undefined;
      const data = await firstValueFrom(this.api.getResumo(cadeiaId, processoId, params));
      if (this.processoId() !== processoId || reqId !== this.carregamentoId) {
        return;
      }
      this.resumo.set(data);
    } catch (err: unknown) {
      if (this.processoId() !== processoId || reqId !== this.carregamentoId) {
        return;
      }
      this.error.set(err instanceof Error ? err.message : 'Não foi possível filtrar as métricas.');
    } finally {
      if (this.processoId() === processoId && reqId === this.carregamentoId) {
        this.atualizandoMetricas.set(false);
      }
    }
  }
}

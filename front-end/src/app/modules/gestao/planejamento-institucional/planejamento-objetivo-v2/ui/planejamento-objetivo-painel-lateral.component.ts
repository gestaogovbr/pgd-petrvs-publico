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

/** Textos das informações adicionais (tooltips) de cada indicador de uma seção do painel. */
export type PainelSecaoTooltips = {
  esforcoDisponivel: string;
  esforcoPlanejado: string;
  esforcoExecutado: string;
  participantes: string;
  totalEntregas: string;
  entregasConcluidas: string;
};

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

  /** Informações adicionais dos indicadores — textos exatos das RN04/06/08/10/12/14 e RN17/19/21/23/25/27. */
  readonly tooltips: { item: PainelSecaoTooltips; consolidado: PainelSecaoTooltips } = {
    item: {
      esforcoDisponivel:
        'Soma da carga horária disponível de todos os participantes do PGD lotados ou vinculados às unidades ' +
        'consideradas, independentemente de contribuírem para a realização das entregas.',
      esforcoPlanejado:
        'Soma das horas de trabalho planejadas, calculadas com base no percentual de contribuição de cada ' +
        'participante para a realização das entregas. O percentual indica quanto o esforço planejado representa ' +
        'em relação ao esforço total disponível.',
      esforcoExecutado:
        'Soma das horas de trabalho efetivamente registradas na execução da contribuição de cada participante ' +
        'para a realização das entregas. O percentual indica quanto o esforço executado representa em relação ' +
        'ao esforço total planejado.',
      participantes:
        'Quantidade de participantes envolvidos na realização das entregas. Cada participante é contabilizado ' +
        'uma única vez, ainda que esteja envolvido em mais de um Plano de Trabalho.',
      totalEntregas:
        'Quantidade total de entregas cadastradas nas unidades para a realização do item do Planejamento ' +
        'Institucional selecionado.',
      entregasConcluidas:
        'Quantidade de entregas concluídas em Planos de Entregas avaliados. O percentual indica quanto as ' +
        'entregas concluídas representam em relação ao total de entregas desses planos.',
    },
    consolidado: {
      esforcoDisponivel:
        'Soma da carga horária disponível de todos os participantes do PGD lotados ou vinculados às unidades ' +
        'consideradas, abrangendo o item do Planejamento Institucional selecionado e todos os itens ' +
        'hierarquicamente subordinados, independentemente de contribuírem para a realização das entregas.',
      esforcoPlanejado:
        'Soma das horas de trabalho planejadas, calculadas com base no percentual de contribuição de cada ' +
        'participante para a realização das entregas do item do Planejamento Institucional selecionado e de ' +
        'todos os itens hierarquicamente subordinados. O percentual indica quanto o esforço planejado ' +
        'representa em relação ao esforço total disponível.',
      esforcoExecutado:
        'Soma das horas de trabalho efetivamente registradas na execução da contribuição de cada participante ' +
        'para a realização das entregas do item do Planejamento Institucional selecionado e de todos os itens ' +
        'hierarquicamente subordinados. O percentual indica quanto o esforço executado representa em relação ' +
        'ao esforço total planejado.',
      participantes:
        'Quantidade de participantes envolvidos na realização das entregas do item do Planejamento ' +
        'Institucional selecionado e de todos os itens hierarquicamente subordinados. Cada participante é ' +
        'contabilizado uma única vez, ainda que esteja envolvido em mais de um Plano de Trabalho.',
      totalEntregas:
        'Quantidade total de entregas cadastradas nas unidades para a realização do item do Planejamento ' +
        'Institucional selecionado e de todos os itens hierarquicamente subordinados.',
      entregasConcluidas:
        'Quantidade de entregas concluídas em Planos de Entregas avaliados, considerando o item do ' +
        'Planejamento Institucional selecionado e todos os itens hierarquicamente subordinados. O percentual ' +
        'indica quanto as entregas concluídas representam em relação ao total de entregas desses planos.',
    },
  };

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
            item: data.item,
            consolidado: data.consolidado,
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

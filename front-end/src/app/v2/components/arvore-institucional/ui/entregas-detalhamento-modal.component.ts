import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  untracked
} from '@angular/core';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { firstValueFrom } from 'rxjs';
import { LookupService } from 'src/app/services/lookup.service';
import type {
  Abrangencia,
  EntregaDetalheLinha,
  EntregasDetalhamentoData,
  EntregasDetalhamentoFiltros
} from '../domain/types';
import { ARVORE_CONFIG, ARVORE_DATA_PROVIDER } from '../tokens';
import { ArvoreLayoutService } from '../infra/arvore-layout.service';

type AbrangenciaOpcao = { value: Abrangencia; label: string };

@Component({
  selector: 'app-arvore-institucional-entregas-detalhamento-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './entregas-detalhamento-modal.component.html',
  styleUrl: './entregas-detalhamento-modal.component.scss',
  providers: [ArvoreLayoutService]
})
export class ArvoreInstitucionalEntregasDetalhamentoModalComponent {
  private readonly provider = inject(ARVORE_DATA_PROVIDER);
  readonly config = inject(ARVORE_CONFIG);
  readonly lookup = inject(LookupService);
  readonly fmt = inject(ArvoreLayoutService);

  readonly nodeId = input.required<string>();
  readonly unidadeIdInicial = input('');
  readonly modalClosed = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly dados = signal<EntregasDetalhamentoData | null>(null);
  readonly linhaExpandidaId = signal<string | null>(null);

  readonly filtroEntregaId = signal('');
  readonly filtroUnidadeId = signal('');
  readonly filtroDataInicio = signal('');
  readonly filtroDataFim = signal('');
  readonly filtroAbrangencia = signal<'' | Abrangencia>('');

  private readonly abrangenciaOpcoesBase: AbrangenciaOpcao[] = [
    { value: 'item_selecionado', label: 'Item selecionado' },
    { value: 'itens_subordinados', label: 'Itens subordinados' },
    { value: 'item_e_subordinados', label: 'Item selecionado e itens subordinados' },
  ];

  private readonly abrangenciaOpcoesUnidade: AbrangenciaOpcao[] = [
    { value: 'unidade_selecionada', label: 'Unidade selecionada' },
    { value: 'unidade_e_subordinadas', label: 'Unidade selecionada e unidades subordinadas' },
  ];

  /** Opções de unidade aparecem somente quando há unidade selecionada. */
  get abrangenciaOpcoes(): AbrangenciaOpcao[] {
    if (this.filtroUnidadeId()) {
      return [...this.abrangenciaOpcoesBase, ...this.abrangenciaOpcoesUnidade];
    }
    return this.abrangenciaOpcoesBase;
  }

  readonly abrangenciaTooltip =
    'Permite restringir a consulta de entregas conforme o escopo hierárquico ou da estrutura organizacional.';

  private carregamentoId = 0;

  constructor() {
    effect(() => {
      const id = this.nodeId();
      const unidadeInicial = this.unidadeIdInicial();
      if (id) {
        untracked(() => {
          this.filtroUnidadeId.set(unidadeInicial);
          if (!unidadeInicial) {
            const abr = this.filtroAbrangencia();
            if (abr === 'unidade_selecionada' || abr === 'unidade_e_subordinadas') {
              this.filtroAbrangencia.set('');
            }
          }
          void this.carregar();
        });
      }
    });
  }

  onFechar(): void {
    this.modalClosed.emit();
  }

  onFiltroEntregaChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filtroEntregaId.set(value);
    void this.carregar();
  }

  onFiltroUnidadeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filtroUnidadeId.set(value);
    const abr = this.filtroAbrangencia();
    if (!value && (abr === 'unidade_selecionada' || abr === 'unidade_e_subordinadas')) {
      this.filtroAbrangencia.set('');
    }
    void this.carregar();
  }

  onFiltroDataInicioChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filtroDataInicio.set(value);
    void this.carregar();
  }

  onFiltroDataFimChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filtroDataFim.set(value);
    void this.carregar();
  }

  onFiltroAbrangenciaChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as '' | Abrangencia;
    this.filtroAbrangencia.set(value);
    void this.carregar();
  }

  limparFiltros(): void {
    this.filtroEntregaId.set('');
    this.filtroUnidadeId.set('');
    this.filtroDataInicio.set('');
    this.filtroDataFim.set('');
    this.filtroAbrangencia.set('');
    void this.carregar();
  }

  toggleLinha(item: EntregaDetalheLinha): void {
    const key = this.linhaKey(item);
    this.linhaExpandidaId.update(current => (current === key ? null : key));
  }

  linhaExpandida(item: EntregaDetalheLinha): boolean {
    return this.linhaExpandidaId() === this.linhaKey(item);
  }

  linhaKey(item: EntregaDetalheLinha): string {
    return item.no_origem_id
      ? `${item.plano_entrega_entrega_id}:${item.no_origem_id}`
      : item.plano_entrega_entrega_id;
  }

  statusLabel(status: string): string {
    return this.lookup.getValue(this.lookup.PLANO_ENTREGA_STATUS, status) || status;
  }

  statusColor(status: string): string {
    return this.lookup.getColor(this.lookup.PLANO_ENTREGA_STATUS, status) || 'secondary';
  }

  statusIcon(status: string): string {
    return this.lookup.getIcon(this.lookup.PLANO_ENTREGA_STATUS, status) || '';
  }

  calcProgresso(item: EntregaDetalheLinha): number {
    if (item.progresso_esperado > 0) {
      return Math.min(100, (item.progresso_realizado / item.progresso_esperado) * 100);
    }
    return item.progresso_realizado;
  }

  formatVigencia(inicio: string, fim: string | null): string {
    const ini = this.formatData(inicio);
    const end = fim ? this.formatData(fim) : '—';
    return `${ini} a ${end}`;
  }

  formatMeta(item: EntregaDetalheLinha): string {
    return this.formatValorIndicador(item.meta, item.tipo_indicador, item.lista_qualitativos);
  }

  formatRealizado(item: EntregaDetalheLinha): string {
    return this.formatValorIndicador(item.realizado, item.tipo_indicador, item.lista_qualitativos);
  }

  formatData(value: string): string {
    if (!value) {
      return '—';
    }
    const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) {
      return value;
    }
    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString('pt-BR');
  }

  private formatValorIndicador(
    valor: Record<string, unknown> | null,
    tipoIndicador: string | null,
    listaQualitativos: Array<{ key: string; value: string }> | null
  ): string {
    if (!valor || !tipoIndicador) {
      return '—';
    }
    switch (tipoIndicador) {
      case 'PORCENTAGEM': return `${valor['porcentagem'] ?? 0}%`;
      case 'QUANTIDADE': return `${valor['quantitativo'] ?? 0}`;
      case 'VALOR': return `${valor['valor'] ?? 0}`;
      case 'QUALITATIVO': {
        const key = valor['qualitativo'] as string;
        const item = listaQualitativos?.find(q => q.key === key);
        return item?.value ?? key ?? '—';
      }
      default: return '—';
    }
  }

  private filtrosAtuais(): EntregasDetalhamentoFiltros {
    return {
      plano_entrega_entrega_id: this.filtroEntregaId() || undefined,
      unidade_id: this.filtroUnidadeId() || undefined,
      data_inicio: this.filtroDataInicio() || undefined,
      data_fim: this.filtroDataFim() || undefined,
      abrangencia: this.filtroAbrangencia() || undefined,
    };
  }

  private async carregar(): Promise<void> {
    const nodeId = this.nodeId();
    if (!nodeId?.length) {
      return;
    }

    const reqId = ++this.carregamentoId;
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(
        this.provider.carregarEntregasDetalhamento(nodeId, this.filtrosAtuais())
      );
      if (this.nodeId() !== nodeId || reqId !== this.carregamentoId) {
        return;
      }
      this.dados.set(data);
      this.linhaExpandidaId.set(null);
    } catch (err: unknown) {
      if (this.nodeId() !== nodeId || reqId !== this.carregamentoId) {
        return;
      }
      this.dados.set(null);
      this.error.set(err instanceof Error ? err.message : 'Não foi possível carregar o detalhamento.');
    } finally {
      if (this.nodeId() === nodeId && reqId === this.carregamentoId) {
        this.loading.set(false);
      }
    }
  }
}

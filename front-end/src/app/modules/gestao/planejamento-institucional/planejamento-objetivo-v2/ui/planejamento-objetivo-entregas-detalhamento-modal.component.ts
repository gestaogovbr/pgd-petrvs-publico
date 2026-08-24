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
import {
  PlanejamentoObjetivoEsforcoApiClient,
  type ObjetivoEntregasAbrangencia,
  type ObjetivoPainelEntregaDetalheLinhaApi,
  type ObjetivoPainelEntregasDetalhamentoApi,
  type ObjetivoEntregasDetalhamentoFiltros
} from '../infra/planejamento-objetivo-esforco-api.client';

type AbrangenciaOpcao = { value: ObjetivoEntregasAbrangencia; label: string };

@Component({
  selector: 'app-planejamento-objetivo-entregas-detalhamento-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './planejamento-objetivo-entregas-detalhamento-modal.component.html',
  styleUrl: './planejamento-objetivo-entregas-detalhamento-modal.component.scss'
})
export class PlanejamentoObjetivoEntregasDetalhamentoModalComponent {
  private readonly api = inject(PlanejamentoObjetivoEsforcoApiClient);
  readonly lookup = inject(LookupService);

  readonly objetivoId = input.required<string>();
  readonly unidadeIdInicial = input('');
  readonly modalClosed = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly dados = signal<ObjetivoPainelEntregasDetalhamentoApi | null>(null);
  readonly linhaExpandidaId = signal<string | null>(null);

  readonly filtroEntregaId = signal('');
  readonly filtroUnidadeId = signal('');
  readonly filtroDataInicio = signal('');
  readonly filtroDataFim = signal('');
  readonly filtroAbrangencia = signal<'' | ObjetivoEntregasAbrangencia>('');

  /** RN34 / RN38 — opções e tooltip do filtro Abrangência. */
  private readonly abrangenciaOpcoesBase: AbrangenciaOpcao[] = [
    { value: 'item_selecionado', label: 'Item selecionado' },
    { value: 'itens_subordinados', label: 'Itens subordinados' },
    { value: 'item_e_subordinados', label: 'Item selecionado e itens subordinados' },
  ];

  private readonly abrangenciaOpcoesUnidade: AbrangenciaOpcao[] = [
    { value: 'unidade_selecionada', label: 'Unidade selecionada' },
    { value: 'unidade_e_subordinadas', label: 'Unidade selecionada e unidades subordinadas' },
  ];

  /** RN37/RN39 — opções de unidade aparecem apenas quando há unidade selecionada no filtro do modal. */
  get abrangenciaOpcoes(): AbrangenciaOpcao[] {
    if (this.filtroUnidadeId()) {
      return [...this.abrangenciaOpcoesBase, ...this.abrangenciaOpcoesUnidade];
    }
    return this.abrangenciaOpcoesBase;
  }

  readonly abrangenciaTooltip =
    'Permite restringir a consulta de entregas conforme o escopo do Planejamento Institucional ou da estrutura organizacional.';

  private carregamentoId = 0;

  constructor() {
    effect(() => {
      const id = this.objetivoId();
      const unidadeInicial = this.unidadeIdInicial();
      if (id) {
        untracked(() => {
          this.filtroUnidadeId.set(unidadeInicial);
          // RN37/RN39: se modal abriu com unidade pré-selecionada, opções de unidade já ficam visíveis
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
    // RN37/RN39: ao desmarcar unidade, limpa abrangência de unidade se estava selecionada
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
    const value = (event.target as HTMLSelectElement).value as '' | ObjetivoEntregasAbrangencia;
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

  toggleLinha(item: ObjetivoPainelEntregaDetalheLinhaApi): void {
    const key = this.linhaKey(item);
    this.linhaExpandidaId.update(current => (current === key ? null : key));
  }

  linhaExpandida(item: ObjetivoPainelEntregaDetalheLinhaApi): boolean {
    return this.linhaExpandidaId() === this.linhaKey(item);
  }

  linhaKey(item: ObjetivoPainelEntregaDetalheLinhaApi): string {
    return `${item.plano_entrega_entrega_id}:${item.planejamento_objetivo_id}`;
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

  calcProgresso(item: ObjetivoPainelEntregaDetalheLinhaApi): number {
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

  private formatData(value: string): string {
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

  private filtrosAtuais(): ObjetivoEntregasDetalhamentoFiltros {
    return {
      plano_entrega_entrega_id: this.filtroEntregaId() || undefined,
      unidade_id: this.filtroUnidadeId() || undefined,
      data_inicio: this.filtroDataInicio() || undefined,
      data_fim: this.filtroDataFim() || undefined,
      abrangencia: this.filtroAbrangencia() || undefined
    };
  }

  private async carregar(): Promise<void> {
    const objetivoId = this.objetivoId();
    if (!objetivoId?.length) {
      return;
    }

    const reqId = ++this.carregamentoId;
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(
        this.api.getEntregasDetalhamento(objetivoId, this.filtrosAtuais())
      );
      if (this.objetivoId() !== objetivoId || reqId !== this.carregamentoId) {
        return;
      }
      this.dados.set(data);
      this.linhaExpandidaId.set(null);
    } catch (err: unknown) {
      if (this.objetivoId() !== objetivoId || reqId !== this.carregamentoId) {
        return;
      }
      this.dados.set(null);
      this.error.set(err instanceof Error ? err.message : 'Não foi possível carregar o detalhamento.');
    } finally {
      if (this.objetivoId() === objetivoId && reqId === this.carregamentoId) {
        this.loading.set(false);
      }
    }
  }
}

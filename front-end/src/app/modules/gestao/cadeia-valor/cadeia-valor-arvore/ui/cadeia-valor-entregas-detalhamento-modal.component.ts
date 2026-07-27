import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LookupService } from 'src/app/services/lookup.service';
import {
  CadeiaValorArvoreApiClient,
  type CadeiaValorPainelEntregaDetalheLinhaApi,
  type CadeiaValorPainelEntregasDetalhamentoApi
} from '../infra/cadeia-valor-arvore-api.client';

@Component({
  selector: 'app-cadeia-valor-entregas-detalhamento-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './cadeia-valor-entregas-detalhamento-modal.component.html',
  styleUrl: './cadeia-valor-entregas-detalhamento-modal.component.scss'
})
export class CadeiaValorEntregasDetalhamentoModalComponent {
  private readonly api = inject(CadeiaValorArvoreApiClient);
  readonly lookup = inject(LookupService);

  readonly cadeiaValorId = input.required<string>();
  readonly processoId = input.required<string>();
  readonly unidadeIdInicial = input('');
  readonly modalClosed = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly dados = signal<CadeiaValorPainelEntregasDetalhamentoApi | null>(null);
  readonly linhaExpandidaId = signal<string | null>(null);

  readonly filtroEntregaId = signal('');
  readonly filtroUnidadeId = signal('');
  readonly filtroDataInicio = signal('');
  readonly filtroDataFim = signal('');

  constructor() {
    effect(() => {
      const processoId = this.processoId();
      const unidadeInicial = this.unidadeIdInicial();
      if (processoId) {
        this.filtroUnidadeId.set(unidadeInicial);
        void this.carregar();
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

  limparFiltros(): void {
    this.filtroEntregaId.set('');
    this.filtroUnidadeId.set('');
    this.filtroDataInicio.set('');
    this.filtroDataFim.set('');
    void this.carregar();
  }

  toggleLinha(item: CadeiaValorPainelEntregaDetalheLinhaApi): void {
    const key = item.plano_entrega_entrega_id;
    if (this.linhaExpandidaId() === key) {
      this.linhaExpandidaId.set(null);
      return;
    }
    this.linhaExpandidaId.set(key);
  }

  linhaExpandida(item: CadeiaValorPainelEntregaDetalheLinhaApi): boolean {
    return this.linhaExpandidaId() === item.plano_entrega_entrega_id;
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

  calcProgresso(item: CadeiaValorPainelEntregaDetalheLinhaApi): number {
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

  private buildParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.filtroUnidadeId()) {
      params['unidade_id'] = this.filtroUnidadeId();
    }
    if (this.filtroDataInicio()) {
      params['data_inicio'] = this.filtroDataInicio();
    }
    if (this.filtroDataFim()) {
      params['data_fim'] = this.filtroDataFim();
    }
    if (this.filtroEntregaId()) {
      params['plano_entrega_entrega_id'] = this.filtroEntregaId();
    }
    return params;
  }

  private async carregar(): Promise<void> {
    const cadeiaId = this.cadeiaValorId();
    const processoId = this.processoId();
    if (!cadeiaId?.length || !processoId?.length) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(
        this.api.getEntregasDetalhamento(cadeiaId, processoId, this.buildParams())
      );
      if (this.processoId() !== processoId) {
        return;
      }
      this.dados.set(data);
      this.linhaExpandidaId.set(null);
    } catch (err: unknown) {
      if (this.processoId() !== processoId) {
        return;
      }
      this.dados.set(null);
      this.error.set(err instanceof Error ? err.message : 'Não foi possível carregar o detalhamento.');
    } finally {
      if (this.processoId() === processoId) {
        this.loading.set(false);
      }
    }
  }
}

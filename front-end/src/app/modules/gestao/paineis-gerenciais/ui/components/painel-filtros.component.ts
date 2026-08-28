import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  computed,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { UnidadeSelectComponent, UnidadeSelectEvent, UnidadeSearchFn } from 'src/app/v2/components/unidade-select/unidade-select.component';
import { FiltrosPainel, PainelApiClient } from '../../infra/painel-api.client';
import { MESES_ABREVIADOS } from '../../infra/painel.constants';

interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

export type ModoData = 'range' | 'referencia';

export interface UnidadeOption {
  id: string;
  sigla: string;
  nome: string;
}

@Component({
  selector: 'painel-filtros',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule, UnidadeSelectComponent],
  templateUrl: './painel-filtros.component.html',
  styles: [`
    .painel-filtros__info {
      color: var(--interactive);
      cursor: help;
    }
  `],
})
export class PainelFiltrosComponent implements OnChanges {
  private readonly api = inject(PainelApiClient);

  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';
  @Input() permitirHistorico = true;
  @Input() modoData: ModoData = 'range';
  @Input() unidadeSearchFn?: UnidadeSearchFn;

  @Output() filtrosChange = new EventEmitter<FiltrosPainel>();
  @Output() unidadeChange = new EventEmitter<{ sigla: string; nome: string }>();

  readonly tipoConsultaOptions: SelectOption[] = [
    { value: 'situacao_atual', label: 'Situação Atual', selected: true },
    { value: 'historico', label: 'Histórico' },
  ];

  readonly tipoConsulta = signal<'situacao_atual' | 'historico'>('situacao_atual');
  readonly unidadeSelecionada = signal<UnidadeOption | null>(null);
  readonly dataInicio = signal('');
  readonly dataFim = signal('');
  readonly periodos = signal<string[]>([]);
  readonly periodoSelecionado = signal('');
  readonly anoSelecionado = signal('');
  readonly mesSelecionado = signal('');

  readonly anoOptions = computed<SelectOption[]>(() => {
    const anos = new Set(this.periodos().map(p => p.split('-')[0]));
    const sel = this.anoSelecionado();
    return [...anos].sort().reverse().map(ano => ({
      value: ano,
      label: ano,
      selected: ano === sel,
    }));
  });

  readonly mesOptions = computed<SelectOption[]>(() => {
    const ano = this.anoSelecionado();
    if (!ano) return [];
    const sel = this.mesSelecionado();
    return this.periodos()
      .filter(p => p.startsWith(ano + '-'))
      .map(p => {
        const mes = p.split('-')[1];
        return { value: mes, label: MESES_ABREVIADOS[+mes - 1], selected: mes === sel };
      })
      .sort((a, b) => +a.value - +b.value);
  });

  readonly periodosOptions = computed<SelectOption[]>(() => {
    const sel = this.periodoSelecionado();
    return this.periodos().map(p => ({
      value: p,
      label: this.formatarPeriodo(p),
      selected: p === sel,
    }));
  });

  readonly mostrarPeriodo = computed(() =>
    this.modoData === 'referencia' && this.tipoConsulta() === 'historico' && !!this.unidadeSelecionada()
  );

  readonly activeSearchFn = computed<UnidadeSearchFn | undefined>(() => {
    if (this.modoData !== 'referencia') return this.unidadeSearchFn;
    return this.tipoConsulta() === 'historico' ? this.unidadeSearchFn : undefined;
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidadeInicialId'] && this.unidadeInicialId) {
      const unidade: UnidadeOption = {
        id: this.unidadeInicialId,
        sigla: this.unidadeInicialSigla,
        nome: this.unidadeInicialNome,
      };
      this.unidadeSelecionada.set(unidade);
      this.carregarPeriodosSeNecessario(unidade.id);
    }
  }

  onTipoConsultaChange(event: any): void {
    const value = event?.target?.value ?? event?.detail ?? event;
    if ((value === 'situacao_atual' || value === 'historico') && value !== this.tipoConsulta()) {
      this.tipoConsulta.set(value);
      this.periodoSelecionado.set('');
      this.anoSelecionado.set('');
      this.mesSelecionado.set('');
      this.periodos.set([]);

      if (this.modoData === 'referencia') {
        this.unidadeSelecionada.set(null);
      }

      this.emitirFiltros();
    }
  }

  selecionarUnidade(event: UnidadeSelectEvent): void {
    const unidade: UnidadeOption = { id: event.id, sigla: event.sigla, nome: event.nome };
    this.unidadeSelecionada.set(unidade);
    this.unidadeChange.emit({ sigla: event.sigla, nome: event.nome });
    this.periodoSelecionado.set('');
    this.anoSelecionado.set('');
    this.mesSelecionado.set('');
    this.carregarPeriodosSeNecessario(unidade.id);
    this.emitirFiltros();
  }

  onDataInicioChange(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataInicio.set(valor);
    this.emitirFiltros();
  }

  onDataFimChange(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataFim.set(valor);
    this.emitirFiltros();
  }

  onPeriodoChange(event: any): void {
    const value = event?.target?.value ?? event?.detail ?? event;
    if (!value) return;
    this.periodoSelecionado.set(value);
    this.emitirFiltros();
  }

  onAnoChange(event: any): void {
    const value = event?.target?.value ?? event?.detail ?? event;
    if (!value || value === this.anoSelecionado()) return;
    this.anoSelecionado.set(value);
    this.mesSelecionado.set('');
    this.periodoSelecionado.set('');
  }

  onMesChange(event: any): void {
    const value = event?.target?.value ?? event?.detail ?? event;
    if (!value) return;
    this.mesSelecionado.set(value);
    const ano = this.anoSelecionado();
    if (ano && value) {
      this.periodoSelecionado.set(`${ano}-${value}`);
      this.emitirFiltros();
    }
  }

  private carregarPeriodosSeNecessario(unidadeId: string | undefined): void {
    if (this.modoData !== 'referencia') return;
    if (this.tipoConsulta() !== 'historico') return;
    if (!unidadeId) return;

    this.api.getPeriodosDisponiveisPorUnidade(unidadeId).subscribe(periodos => {
      this.periodos.set(periodos);
    });
  }

  private emitirFiltros(): void {
    const unidade = this.unidadeSelecionada();
    if (!unidade) return;

    if (this.modoData === 'range') {
      if (this.tipoConsulta() === 'historico' && (!this.dataInicio() || !this.dataFim())) return;

      const filtros: FiltrosPainel = {
        tipo_consulta: this.tipoConsulta(),
        unidade_id: unidade.id,
      };

      if (this.tipoConsulta() === 'historico') {
        filtros.data_inicio = this.dataInicio();
        filtros.data_fim = this.dataFim();
      }

      this.filtrosChange.emit(filtros);
      return;
    }

    // modoData === 'referencia'
    if (this.tipoConsulta() === 'situacao_atual') {
      this.filtrosChange.emit({
        tipo_consulta: 'situacao_atual',
        unidade_id: unidade.id,
      });
      return;
    }

    if (!this.periodoSelecionado()) return;

    const [ano, mes] = this.periodoSelecionado().split('-').map(Number);
    const ultimoDiaMes = new Date(ano, mes, 0);

    this.filtrosChange.emit({
      tipo_consulta: 'historico',
      unidade_id: unidade.id,
      data_inicio: `${ano}-01-01`,
      data_fim: ultimoDiaMes.toISOString().split('T')[0],
    });
  }

  private formatarPeriodo(periodo: string): string {
    const [ano, mes] = periodo.split('-');
    return `${MESES_ABREVIADOS[+mes - 1]}/${ano}`;
  }
}

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
import { FiltrosPainel, IntervaloDatas, PainelApiClient } from '../../infra/painel-api.client';
import { MESES_ABREVIADOS } from '../../infra/painel.constants';
import { lerIntervaloDoPicker, ultimoDiaDoMes } from '../utils/datas';
import { BrDatetimePickerCustomEvent, BrSelectCustomEvent, DatetimePickerChangeDetail } from '@govbr-ds/webcomponents';

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
  @Input() tooltipDatas = 'Serão apresentados dados referentes a Planos de Entregas e Planos de Trabalho vigentes no intervalo selecionado para a consulta.';

  @Output() filtrosChange = new EventEmitter<FiltrosPainel>();
  @Output() unidadeChange = new EventEmitter<{ sigla: string; nome: string }>();

  readonly tipoConsultaOptions: SelectOption[] = [
    { value: 'situacao_atual', label: 'Situação Atual', selected: true },
    { value: 'historico', label: 'Histórico' },
  ];

  readonly tipoConsulta = signal<'situacao_atual' | 'historico'>('situacao_atual');
  readonly unidadeSelecionada = signal<UnidadeOption | null>(null);
  readonly intervalo = signal<IntervaloDatas | null>(null);
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

  onTipoConsultaChange(event: BrSelectCustomEvent<string>): void {
    const value = event.detail;
    if ((value === 'situacao_atual' || value === 'historico') && value !== this.tipoConsulta()) {
      this.tipoConsulta.set(value);
      this.periodoSelecionado.set('');
      this.anoSelecionado.set('');
      this.mesSelecionado.set('');
      this.periodos.set([]);
      this.intervalo.set(null);

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

  onIntervaloChange(event: BrDatetimePickerCustomEvent<DatetimePickerChangeDetail>): void {
    const intervalo = lerIntervaloDoPicker(event.detail);

    this.intervalo.set(intervalo);
    if (intervalo) {
      this.emitirFiltros();
    }
  }

  onAnoChange(event: BrSelectCustomEvent<string>): void {
    const value = event.detail;
    if (!value || value === this.anoSelecionado()) return;
    this.anoSelecionado.set(value);
    this.mesSelecionado.set('');
    this.periodoSelecionado.set('');
  }

  onMesChange(event: BrSelectCustomEvent<string>): void {
    const value = event.detail;
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

    const filtros: FiltrosPainel = {
      tipo_consulta: this.tipoConsulta(),
      unidade_id: unidade.id,
    };

    if (filtros.tipo_consulta === 'historico') {
      if (this.modoData === 'range') {
        filtros.intervalo = this.intervalo() ?? undefined;
      } else if (this.periodoSelecionado()) {
        const [ano, mes] = this.periodoSelecionado().split('-').map(Number);
        filtros.intervalo = {
          inicio: `${ano}-01-01`,
          fim: ultimoDiaDoMes(ano, mes),
        };
      }
      if (!filtros.intervalo) {
        return;
      }
    }

    this.filtrosChange.emit(filtros);
  }
}

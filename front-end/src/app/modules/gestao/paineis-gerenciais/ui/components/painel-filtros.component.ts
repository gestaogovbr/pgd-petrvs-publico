import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { UnidadeSelectComponent, UnidadeSelectEvent } from 'src/app/v2/components/unidade-select/unidade-select.component';
import { FiltrosPainel } from '../../infra/painel-api.client';

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
})
export class PainelFiltrosComponent implements OnChanges {
  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';
  @Input() permitirHistorico = true;

  @Output() filtrosChange = new EventEmitter<FiltrosPainel>();
  @Output() unidadeChange = new EventEmitter<{ sigla: string; nome: string }>();

  readonly tipoConsultaOptions = [
    { value: 'situacao_atual', label: 'Situação Atual', selected: true },
    { value: 'historico', label: 'Histórico' },
  ];

  readonly tipoConsulta = signal<'situacao_atual' | 'historico'>('situacao_atual');
  readonly unidadeSelecionada = signal<UnidadeOption | null>(null);
  readonly dataInicio = signal('');
  readonly dataFim = signal('');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidadeInicialId'] && this.unidadeInicialId) {
      this.unidadeSelecionada.set({
        id: this.unidadeInicialId,
        sigla: this.unidadeInicialSigla,
        nome: this.unidadeInicialNome,
      });
    }
  }

  onTipoConsultaChange(event: any): void {
    const value = event?.target?.value ?? event?.detail ?? event;
    if ((value === 'situacao_atual' || value === 'historico') && value !== this.tipoConsulta()) {
      this.tipoConsulta.set(value);
      this.emitirFiltros();
    }
  }

  selecionarUnidade(event: UnidadeSelectEvent): void {
    this.unidadeSelecionada.set(event);
    this.unidadeChange.emit({ sigla: event.sigla, nome: event.nome });
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

  private emitirFiltros(): void {
    const unidade = this.unidadeSelecionada();
    if (!unidade) return;

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
  }
}

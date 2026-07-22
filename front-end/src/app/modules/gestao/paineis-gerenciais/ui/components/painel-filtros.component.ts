import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Subject, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
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
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './painel-filtros.component.html',
})
export class PainelFiltrosComponent implements OnChanges {
  private readonly unidadeService = inject(UnidadeService);
  private readonly buscaSubject = new Subject<string>();

  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';

  @Output() filtrosChange = new EventEmitter<FiltrosPainel>();
  @Output() unidadeChange = new EventEmitter<{ sigla: string; nome: string }>();

  readonly tipoConsultaOptions = [
    { value: 'situacao_atual', label: 'Situação Atual', selected: true },
    { value: 'historico', label: 'Histórico' },
  ];

  readonly tipoConsulta = signal<'situacao_atual' | 'historico'>('situacao_atual');
  readonly unidadeSelecionada = signal<UnidadeOption | null>(null);
  readonly unidadeDisplay = signal('');
  readonly sugestoes = signal<UnidadeOption[]>([]);
  readonly dataInicio = signal('');
  readonly dataFim = signal('');

  constructor() {
    this.buscaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.length >= 3),
      switchMap(term => this.unidadeService.searchByNomeOuCodigo(term)),
    ).subscribe(unidades => {
      this.sugestoes.set(
        unidades.map(u => ({ id: u.id, sigla: u.sigla, nome: u.nome }))
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidadeInicialId'] && this.unidadeInicialId) {
      const unidade: UnidadeOption = {
        id: this.unidadeInicialId,
        sigla: this.unidadeInicialSigla,
        nome: this.unidadeInicialNome,
      };
      this.unidadeSelecionada.set(unidade);
      this.unidadeDisplay.set(`${unidade.sigla} - ${unidade.nome}`);
    }
  }

  onTipoConsultaChange(event: any): void {
    const value = event?.target?.value ?? event?.detail ?? event;
    if (value === 'situacao_atual' || value === 'historico') {
      this.tipoConsulta.set(value);
      this.emitirFiltros();
    }
  }

  onBuscaInput(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.unidadeDisplay.set(valor);
    if (valor.length < 3) {
      this.sugestoes.set([]);
      return;
    }
    this.buscaSubject.next(valor);
  }

  onBuscaFocus(): void {
    // placeholder para futura lógica se necessário
  }

  selecionarUnidade(unidade: UnidadeOption): void {
    this.unidadeSelecionada.set(unidade);
    this.unidadeDisplay.set(`${unidade.sigla} - ${unidade.nome}`);
    this.sugestoes.set([]);
    this.unidadeChange.emit({ sigla: unidade.sigla, nome: unidade.nome });
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

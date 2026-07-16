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
  template: `
    <div class="row g-3 mb-4">
      <!-- Tipo de Consulta -->
      <div class="col-12 col-md-3">
        <br-select
          label="Tipo de Consulta"
          [options]="tipoConsultaOptions"
          (valueChange)="onTipoConsultaChange($event)"
          class="w-100">
        </br-select>
      </div>

      <!-- Busca Unidade -->
      <div class="col-12 col-md-4 position-relative">
        <div class="br-input w-100">
          <label for="unidade-busca">Unidade</label>
          <input
            id="unidade-busca"
            type="text"
            [value]="unidadeDisplay()"
            (input)="onBuscaInput($event)"
            placeholder="Pesquise por nome ou sigla"
            autocomplete="off"
          />
        </div>
        @if (sugestoes().length > 0) {
          <div class="br-card position-absolute w-100" style="z-index: 1050; max-height: 200px; overflow-y: auto;">
            @for (u of sugestoes(); track u.id) {
              <div class="px-3 py-2 card-content" style="cursor: pointer;" (click)="selecionarUnidade(u)">
                <strong>{{ u.sigla }}</strong> - {{ u.nome }}
              </div>
            }
          </div>
        }
      </div>

      <!-- Datas (apenas no modo histórico) -->
      @if (tipoConsulta() === 'historico') {
        <div class="col-12 col-sm-6 col-md-2">
          <div class="br-input w-100">
            <label for="data-inicio">Data Inicial</label>
            <input id="data-inicio" type="date" [value]="dataInicio()" (change)="onDataInicioChange($event)" />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-2">
          <div class="br-input w-100">
            <label for="data-fim">Data Final</label>
            <input id="data-fim" type="date" [value]="dataFim()" (change)="onDataFimChange($event)" />
          </div>
        </div>
      }
    </div>
  `,
})
export class PainelFiltrosComponent implements OnChanges {
  private readonly unidadeService = inject(UnidadeService);
  private readonly buscaSubject = new Subject<string>();

  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';

  @Output() filtrosChange = new EventEmitter<FiltrosPainel>();

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

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, WebcomponentsAngularModule],
  template: `
    <div class="row align-items-end mb-4 g-3">
      <!-- Tipo de Consulta -->
      <div class="col-md-3">
        <div class="br-input">
          <label for="tipo-consulta">Tipo de Consulta</label>
          <select id="tipo-consulta" [ngModel]="tipoConsulta()" (ngModelChange)="onTipoConsultaChange($event)">
            <option value="situacao_atual">Situação Atual</option>
            <option value="historico">Histórico</option>
          </select>
        </div>
      </div>

      <!-- Busca Unidade -->
      <div class="col-md-4 position-relative">
        <div class="br-input">
          <label for="unidade-busca">Unidade</label>
          <input
            id="unidade-busca"
            type="text"
            [placeholder]="unidadeSelecionada() ? unidadeSelecionada()!.sigla + ' - ' + unidadeSelecionada()!.nome : 'Pesquise por nome ou sigla'"
            [ngModel]="buscaUnidade()"
            (ngModelChange)="onBuscaChange($event)"
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
        <div class="col-md-2">
          <div class="br-input">
            <label for="data-inicio">Data Inicial</label>
            <input id="data-inicio" type="date" [ngModel]="dataInicio()" (ngModelChange)="onDataInicioChange($event)" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="br-input">
            <label for="data-fim">Data Final</label>
            <input id="data-fim" type="date" [ngModel]="dataFim()" (ngModelChange)="onDataFimChange($event)" />
          </div>
        </div>
      }
    </div>
  `,
})
export class PainelFiltrosComponent implements OnInit {
  private readonly unidadeService = inject(UnidadeService);
  private readonly buscaSubject = new Subject<string>();

  @Input() unidadeInicialId?: string;
  @Input() unidadeInicialSigla?: string;
  @Input() unidadeInicialNome?: string;

  @Output() filtrosChange = new EventEmitter<FiltrosPainel>();

  readonly tipoConsulta = signal<'situacao_atual' | 'historico'>('situacao_atual');
  readonly unidadeSelecionada = signal<UnidadeOption | null>(null);
  readonly buscaUnidade = signal('');
  readonly sugestoes = signal<UnidadeOption[]>([]);
  readonly dataInicio = signal('');
  readonly dataFim = signal('');

  ngOnInit(): void {
    if (this.unidadeInicialId) {
      this.unidadeSelecionada.set({
        id: this.unidadeInicialId,
        sigla: this.unidadeInicialSigla ?? '',
        nome: this.unidadeInicialNome ?? '',
      });
    }

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

  onTipoConsultaChange(valor: 'situacao_atual' | 'historico'): void {
    this.tipoConsulta.set(valor);
    this.emitirFiltros();
  }

  onBuscaChange(valor: string): void {
    this.buscaUnidade.set(valor);
    if (valor.length < 3) {
      this.sugestoes.set([]);
      return;
    }
    this.buscaSubject.next(valor);
  }

  selecionarUnidade(unidade: UnidadeOption): void {
    this.unidadeSelecionada.set(unidade);
    this.buscaUnidade.set('');
    this.sugestoes.set([]);
    this.emitirFiltros();
  }

  onDataInicioChange(valor: string): void {
    this.dataInicio.set(valor);
    this.emitirFiltros();
  }

  onDataFimChange(valor: string): void {
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

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  computed,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Subject, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { PainelApiClient } from '../../infra/painel-api.client';

export interface FiltrosGestaoPgd {
  unidade_id: string;
  unidade_sigla: string;
  mes: number;
  ano: number;
}

interface UnidadeOption {
  id: string;
  sigla: string;
  nome: string;
}

@Component({
  selector: 'gestao-pgd-filtros',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  template: `
    <div class="row g-3 mb-4">
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

      <!-- Mês/Ano (período) -->
      <div class="col-12 col-md-3">
        <br-select
          label="Período"
          [options]="periodosOptions()"
          (valueChange)="onPeriodoChange($event)"
          class="w-100">
        </br-select>
      </div>
    </div>
  `,
})
export class GestaoPgdFiltrosComponent implements OnInit, OnChanges {
  private readonly unidadeService = inject(UnidadeService);
  private readonly api = inject(PainelApiClient);
  private readonly buscaSubject = new Subject<string>();

  @Input() unidadeInicialId = '';
  @Input() unidadeInicialSigla = '';
  @Input() unidadeInicialNome = '';

  @Output() filtrosChange = new EventEmitter<FiltrosGestaoPgd>();

  readonly unidadeSelecionada = signal<UnidadeOption | null>(null);
  readonly unidadeDisplay = signal('');
  readonly sugestoes = signal<UnidadeOption[]>([]);
  readonly periodos = signal<string[]>([]);
  readonly periodoSelecionado = signal('');

  readonly periodosOptions = computed(() => {
    const periodos = this.periodos();
    const mesAtual = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

    return periodos.map(p => ({
      value: p,
      label: this.formatarPeriodo(p),
      selected: p === mesAtual,
    }));
  });

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

  ngOnInit(): void {
    this.api.getPeriodosDisponiveis().subscribe(periodos => {
      this.periodos.set(periodos);
      if (periodos.length > 0) {
        const ultimo = periodos[periodos.length - 1];
        this.periodoSelecionado.set(ultimo);
      }
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

  onBuscaInput(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.unidadeDisplay.set(valor);
    if (valor.length < 3) {
      this.sugestoes.set([]);
      return;
    }
    this.buscaSubject.next(valor);
  }

  selecionarUnidade(unidade: UnidadeOption): void {
    this.unidadeSelecionada.set(unidade);
    this.unidadeDisplay.set(`${unidade.sigla} - ${unidade.nome}`);
    this.sugestoes.set([]);
    this.emitirFiltros();
  }

  onPeriodoChange(event: any): void {
    const value = event?.detail ?? event?.target?.value ?? event;
    this.periodoSelecionado.set(value);
    this.emitirFiltros();
  }

  private emitirFiltros(): void {
    const unidade = this.unidadeSelecionada();
    const periodo = this.periodoSelecionado();
    if (!unidade || !periodo) return;

    const [ano, mes] = periodo.split('-').map(Number);

    this.filtrosChange.emit({
      unidade_id: unidade.id,
      unidade_sigla: unidade.sigla,
      mes,
      ano,
    });
  }

  private formatarPeriodo(periodo: string): string {
    const [ano, mes] = periodo.split('-');
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${meses[+mes - 1]}/${ano}`;
  }
}

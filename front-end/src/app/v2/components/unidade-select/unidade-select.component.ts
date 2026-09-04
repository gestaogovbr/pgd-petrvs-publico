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
import { Observable } from 'rxjs';
import { UnidadeService, UnidadeIndexResponse } from 'src/app/v2/services/unidade.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PaginatedSearchFn, PaginatedSelectComponent } from '../paginated-select/paginated-select.component';

export interface UnidadeSelectEvent {
  id: string;
  sigla: string;
  nome: string;
}

export type UnidadeSearchFn = (termo: string | null, page: number, size: number) => Observable<UnidadeIndexResponse>;

/**
 * Wrapper de domínio sobre `paginated-select` para seleção de unidades.
 * Mantém a API pública consumida pelos componentes existentes.
 */
@Component({
  selector: 'unidade-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PaginatedSelectComponent],
  templateUrl: './unidade-select.component.html',
  styleUrls: ['./unidade-select.component.scss'],
})
export class UnidadeSelectComponent implements OnChanges {
  private readonly unidadeService = inject(UnidadeService);

  @Input() unidadeId = '';
  @Input() unidadeSigla = '';
  @Input() unidadeNome = '';
  @Input() perPage = 20;
  @Input() label = 'Unidade';
  @Input() searchFn?: UnidadeSearchFn;

  @Output() unidadeSelected = new EventEmitter<UnidadeSelectEvent>();

  readonly displayValue = signal('');

  /** Evita que reemissões dos inputs sobrescrevam o texto após uma seleção interna. */
  private selecionadoInternamente = false;

  readonly search: PaginatedSearchFn<Unidade> = (termo, page, size) => this.fetchData(termo, page, size);

  readonly displayFn = (unidade: Unidade): string => `${unidade.sigla} - ${unidade.nome}`;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidadeId'] || changes['unidadeSigla'] || changes['unidadeNome']) {
      if (this.unidadeId && this.unidadeSigla && this.unidadeNome) {
        if (!this.selecionadoInternamente) {
          this.displayValue.set(`${this.unidadeSigla} - ${this.unidadeNome}`);
        }
      } else {
        this.selecionadoInternamente = false;
        this.displayValue.set('');
      }
    }
  }

  onSelected(unidade: Unidade): void {
    this.selecionadoInternamente = true;
    this.unidadeSigla = unidade.sigla;
    this.unidadeNome = unidade.nome;
    this.displayValue.set(`${unidade.sigla} - ${unidade.nome}`);
    this.unidadeSelected.emit({ id: unidade.id, sigla: unidade.sigla, nome: unidade.nome });
  }

  private fetchData(termo: string | null, page: number, size: number): Observable<UnidadeIndexResponse> {
    if (this.searchFn) {
      return this.searchFn(termo, page, size);
    }
    return this.unidadeService.index(termo, page, size);
  }
}

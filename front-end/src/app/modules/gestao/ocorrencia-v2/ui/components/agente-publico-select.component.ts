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
import { Observable } from 'rxjs';
import {
  PaginatedResponse,
  PaginatedSearchFn,
  PaginatedSelectComponent,
} from 'src/app/v2/components/paginated-select/paginated-select.component';

export interface AgentePublicoSelectEvent {
  id: string;
  nome: string;
}

export type AgentePublicoSearchFn = (
  termo: string | null,
  page: number,
  size: number,
) => Observable<PaginatedResponse<AgentePublicoSelectEvent>>;

/**
 * Wrapper de domínio sobre `paginated-select` para seleção de agente público.
 * A fonte de dados é fornecida pelo consumidor via `searchFn`.
 */
@Component({
  selector: 'agente-publico-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PaginatedSelectComponent],
  templateUrl: './agente-publico-select.component.html',
})
export class AgentePublicoSelectComponent implements OnChanges {
  @Input({ required: true }) searchFn!: AgentePublicoSearchFn;
  @Input() label = 'Agente Público';
  @Input() perPage = 20;
  @Input() agenteId = '';
  @Input() agenteNome = '';

  @Output() agenteSelected = new EventEmitter<AgentePublicoSelectEvent>();

  readonly displayValue = signal('');

  readonly search: PaginatedSearchFn<AgentePublicoSelectEvent> = (termo, page, size) =>
    this.searchFn(termo, page, size);

  readonly displayFn = (agente: AgentePublicoSelectEvent): string => agente.nome;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agenteId'] || changes['agenteNome']) {
      this.displayValue.set(this.agenteId && this.agenteNome ? this.agenteNome : '');
    }
  }

  onSelected(agente: AgentePublicoSelectEvent): void {
    this.agenteNome = agente.nome;
    this.displayValue.set(agente.nome);
    this.agenteSelected.emit(agente);
  }
}

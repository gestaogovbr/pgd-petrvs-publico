import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UnidadeService, UnidadeIndexResponse } from 'src/app/v2/services/unidade.service';
import { Unidade } from 'src/app/models/unidade.model';

export interface UnidadeSelectEvent {
  id: string;
  sigla: string;
  nome: string;
}

export type UnidadeSearchFn = (termo: string | null, page: number, size: number) => Observable<UnidadeIndexResponse>;

interface FetchCommand {
  termo: string | null;
  page: number;
}

@Component({
  selector: 'unidade-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './unidade-select.component.html',
  styleUrls: ['./unidade-select.component.scss'],
})
export class UnidadeSelectComponent implements OnChanges, OnDestroy {
  private readonly unidadeService = inject(UnidadeService);
  private readonly elementRef = inject(ElementRef);

  private readonly searchSubject = new Subject<string>();
  private readonly fetchSubject = new Subject<FetchCommand>();
  private readonly subscription = new Subscription();

  @Input() unidadeId = '';
  @Input() unidadeSigla = '';
  @Input() unidadeNome = '';
  @Input() perPage = 20;
  @Input() label = 'Unidade';
  @Input() searchFn?: UnidadeSearchFn;

  @Output() unidadeSelected = new EventEmitter<UnidadeSelectEvent>();

  readonly items = signal<Unidade[]>([]);
  readonly loading = signal(false);
  readonly isOpen = signal(false);
  readonly displayValue = signal('');
  readonly selectedId = signal('');

  private page = 1;
  private hasMore = true;
  private currentTermo: string | null = null;

  constructor() {
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
      ).subscribe(termo => {
        this.currentTermo = termo || null;
        this.page = 1;
        this.hasMore = true;
        this.items.set([]);
        this.fetchSubject.next({ termo: this.currentTermo, page: 1 });
      })
    );

    this.subscription.add(
      this.fetchSubject.pipe(
        tap(() => this.loading.set(true)),
        switchMap(cmd => this.fetchData(cmd.termo, cmd.page, this.perPage)),
      ).subscribe({
        next: (response) => this.handleResponse(response),
        error: () => this.loading.set(false),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['unidadeId'] || changes['unidadeSigla'] || changes['unidadeNome']) && this.unidadeId) {
      if (!this.selectedId()) {
        this.displayValue.set(`${this.unidadeSigla} - ${this.unidadeNome}`);
        this.selectedId.set(this.unidadeId);
      }
    }
  }

  toggleDropdown(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      return;
    }

    this.isOpen.set(true);
    this.displayValue.set(this.currentTermo ?? '');

    if (this.items().length === 0 && !this.loading()) {
      this.loadPage(1, null);
    }
  }

  onBrInputChange(event: any): void {
    const valor = event?.detail ?? event?.target?.value ?? event ?? '';

    if (valor === this.displayValue()) return;

    this.displayValue.set(valor);

    if (!this.isOpen()) {
      this.isOpen.set(true);
    }

    this.searchSubject.next(valor);
  }

  onScroll(event: Event): void {
    if (!this.hasMore || this.loading()) return;

    const el = event.target as HTMLElement;
    const threshold = 50;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - threshold) {
      this.loadNextPage();
    }
  }

  onItemClick(item: Unidade): void {
    this.selectItem(item);
  }

  selectItem(item: Unidade): void {
    this.displayValue.set(`${item.sigla} - ${item.nome}`);
    this.selectedId.set(item.id);
    this.unidadeSigla = item.sigla;
    this.unidadeNome = item.nome;
    this.isOpen.set(false);
    this.unidadeSelected.emit({ id: item.id, sigla: item.sigla, nome: item.nome });

    if (this.currentTermo) {
      this.currentTermo = null;
      this.page = 1;
      this.hasMore = true;
      this.items.set([]);
      this.loadPage(1, null);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.displayValue.set(this.buildDisplay());
    }
  }

  private fetchData(termo: string | null, page: number, size: number): Observable<UnidadeIndexResponse> {
    if (this.searchFn) {
      return this.searchFn(termo, page, size);
    }
    return this.unidadeService.index(termo, page, size);
  }

  private loadPage(page: number, termo: string | null): void {
    this.page = page;
    this.currentTermo = termo;
    this.fetchSubject.next({ termo, page });
  }

  private loadNextPage(): void {
    this.loadPage(this.page + 1, this.currentTermo);
  }

  private handleResponse(response: UnidadeIndexResponse): void {
    const current = this.page === 1 ? [] : this.items();
    this.items.set([...current, ...response.data]);
    this.page = response.current_page;
    this.hasMore = response.current_page < response.last_page;
    this.loading.set(false);
  }

  private buildDisplay(): string {
    if (this.unidadeSigla && this.unidadeNome) {
      return `${this.unidadeSigla} - ${this.unidadeNome}`;
    }
    return '';
  }
}

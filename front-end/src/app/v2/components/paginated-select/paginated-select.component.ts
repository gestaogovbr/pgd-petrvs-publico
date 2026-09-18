import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
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
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { Observable, Subject, Subscription, debounceTime, exhaustMap, switchMap, tap } from 'rxjs';
import type { Page } from 'src/app/v2/domain/pagination';

export type PaginatedSearchFn<T> = (
  termo: string | null,
  page: number,
  size: number,
) => Observable<Page<T>>;

/**
 * Select paginado genérico com busca no servidor, debounce e scroll infinito.
 *
 * A mecânica (paginação, debounce, scroll infinito, abrir/fechar, estados de
 * carregamento/vazio) fica aqui. O contexto de domínio (formato de exibição,
 * template do item e fonte de dados) é fornecido pelo consumidor via inputs.
 */
@Component({
  selector: 'paginated-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './paginated-select.component.html',
  styleUrls: ['./paginated-select.component.scss'],
})
export class PaginatedSelectComponent<T> implements OnChanges, OnDestroy {
  private readonly elementRef = inject(ElementRef);

  /** Digitação de busca: cada termo cancela a busca anterior (switchMap). */
  private readonly searchSubject = new Subject<string>();
  /** Scroll infinito: novas páginas são ignoradas enquanto um fetch está em andamento (exhaustMap). */
  private readonly loadMoreSubject = new Subject<void>();
  private readonly subscription = new Subscription();

  /** searchFn é obrigatório: define a fonte de dados paginada. */
  @Input({ required: true }) searchFn!: PaginatedSearchFn<T>;
  /** Função que produz o texto exibido para um item selecionado. */
  @Input({ required: true }) displayFn!: (item: T) => string;

  @Input() label = '';
  @Input() placeholder = 'Pesquise por um termo';
  @Input() emptyText = 'Nenhum resultado encontrado';
  @Input() perPage = 20;
  /** Mínimo de caracteres para disparar a busca. 0 = busca sempre (inclusive vazio). */
  @Input() minChars = 0;
  /** Texto inicial exibido (ex.: item pré-selecionado). */
  @Input() value = '';

  @Output() selected = new EventEmitter<T>();

  @ContentChild('itemTemplate') itemTemplate?: TemplateRef<{ $implicit: T }>;

  readonly items = signal<T[]>([]);
  readonly loading = signal(false);
  readonly isOpen = signal(false);
  readonly displayValue = signal('');
  readonly hasSelection = signal(false);

  private page = 1;
  private hasMore = true;
  private currentTermo: string | null = null;

  constructor() {
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        tap(termo => {
          this.currentTermo = termo || null;
          this.page = 1;
          this.hasMore = true;
          this.items.set([]);
          this.loading.set(true);
        }),
        switchMap(() => this.searchFn(this.currentTermo, 1, this.perPage)),
      ).subscribe({
        next: (response) => this.handleResponse(response),
        error: () => this.loading.set(false),
      })
    );

    this.subscription.add(
      this.loadMoreSubject.pipe(
        tap(() => this.loading.set(true)),
        exhaustMap(() => this.searchFn(this.currentTermo, this.page + 1, this.perPage)),
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
    if (changes['value']) {
      this.displayValue.set(this.value ?? '');
      this.hasSelection.set(!!this.value);
    }

    if (changes['searchFn'] && !changes['searchFn'].firstChange && !this.isOpen()) {
      this.items.set([]);
      this.page = 1;
      this.hasMore = true;
      this.currentTermo = null;
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
      this.loadFirstPage();
    }
  }

  onInputChange(event: any): void {
    const valor = event?.detail ?? event?.target?.value ?? event ?? '';

    if (valor === this.displayValue()) return;

    this.displayValue.set(valor);

    if (!this.isOpen()) {
      this.isOpen.set(true);
    }

    const termo = String(valor).trim();
    if (termo.length < this.minChars) {
      this.items.set([]);
      return;
    }

    this.searchSubject.next(valor);
  }

  onScroll(event: Event): void {
    if (!this.hasMore || this.loading()) return;

    const el = event.target as HTMLElement;
    const threshold = 50;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - threshold) {
      this.loadMoreSubject.next();
    }
  }

  onItemClick(item: T): void {
    this.displayValue.set(this.displayFn(item));
    this.hasSelection.set(true);
    this.isOpen.set(false);
    this.selected.emit(item);

    if (this.currentTermo) {
      this.currentTermo = null;
      this.page = 1;
      this.hasMore = true;
      this.items.set([]);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.displayValue.set(this.value ?? '');
    }
  }

  private loadFirstPage(): void {
    this.page = 1;
    this.hasMore = true;
    this.items.set([]);
    this.loading.set(true);
    this.subscription.add(
      this.searchFn(this.currentTermo, 1, this.perPage).subscribe({
        next: (response) => this.handleResponse(response),
        error: () => this.loading.set(false),
      })
    );
  }

  private handleResponse(response: Page<T>): void {
    const current = response.page === 1 ? [] : this.items();
    this.items.set([...current, ...response.items]);
    this.page = response.page;
    this.hasMore = response.page < response.lastPage;
    this.loading.set(false);
  }
}

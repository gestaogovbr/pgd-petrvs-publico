import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

@Component({
  selector: 'app-v2-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  styles: [`
    .pagination-info {
      font-size: var(--font-size-scale-down-01);
      color: var(--color-secondary-06);
    }
  `],
  template: `
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <span class="pagination-info">
        {{ total() }} registro(s) &bull; Página {{ page() }} de {{ lastPage() }}
      </span>
      <div class="d-flex align-items-center gap-1">
        <br-button shape="circle" emphasis="secondary" type="button" (click)="emit(1)" [disabled]="page() <= 1" title="Primeira página" ariaLabel="Primeira página">
          <i class="fas fa-angle-double-left"></i>
        </br-button>
        <br-button shape="circle" emphasis="secondary" type="button" (click)="emit(page() - 1)" [disabled]="page() <= 1" title="Anterior" ariaLabel="Página anterior">
          <i class="fas fa-chevron-left"></i>
        </br-button>
        @for (p of pageNumbers(); track $index) {
          @if (p === null) {
            <span class="px-1 text-muted">...</span>
              } @else {
                <br-button shape="circle" [emphasis]="p === page() ? 'primary' : 'secondary'" type="button" (click)="emit(p)" title="Página {{ p }}" ariaLabel="Página {{ p }}">
              {{ p }}
            </br-button>
          }
        }
        <br-button shape="circle" emphasis="secondary" type="button" (click)="emit(page() + 1)" [disabled]="page() >= lastPage()" title="Próxima" ariaLabel="Próxima página">
          <i class="fas fa-chevron-right"></i>
        </br-button>
        <br-button shape="circle" emphasis="secondary" type="button" (click)="emit(lastPage())" [disabled]="page() >= lastPage()" title="Última página" ariaLabel="Última página">
          <i class="fas fa-angle-double-right"></i>
        </br-button>
      </div>
    </div>
  `
})
export class PaginationV2Component {
  readonly page = input.required<number>();
  readonly lastPage = input.required<number>();
  readonly total = input.required<number>();

  readonly pageChange = output<number>();

  readonly pageNumbers = computed(() => {
    const current = this.page();
    const last = this.lastPage();
    const pages: (number | null)[] = [];
    if (last <= 7) {
      for (let i = 1; i <= last; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (current > 3) pages.push(null);
    const start = Math.max(2, current - 1);
    const end = Math.min(last - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < last - 2) pages.push(null);
    pages.push(last);
    return pages;
  });

  emit(n: number) {
    if (n < 1 || n > this.lastPage() || n === this.page()) return;
    this.pageChange.emit(n);
  }
}

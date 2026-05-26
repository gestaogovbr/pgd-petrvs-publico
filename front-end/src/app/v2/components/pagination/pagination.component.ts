import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

@Component({
  selector: 'app-v2-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
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

import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  styles: [`
    .br-breadcrumb .breadcrumb-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0 0 var(--spacing-scale-2x) 0;
      gap: var(--spacing-scale-base);
    }
    .br-breadcrumb .crumb {
      display: flex;
      align-items: center;
      gap: var(--spacing-scale-base);
      font-size: var(--font-size-scale-down-01);
    }
    .br-breadcrumb .crumb a {
      color: var(--interactive);
      text-decoration: none;
    }
    .br-breadcrumb .crumb a:hover {
      text-decoration: underline;
    }
    .br-breadcrumb .crumb span {
      color: var(--color-secondary-07);
      font-weight: var(--font-weight-semi-bold);
    }
    .br-breadcrumb .crumb i {
      font-size: var(--font-size-scale-down-02);
      color: var(--color-secondary-04);
    }
  `],
  template: `
    <nav class="br-breadcrumb" aria-label="Você está em:">
      <ol class="breadcrumb-list">
        <li class="crumb">
          <a routerLink="/home" aria-label="Página inicial">
            <i class="fas fa-home"></i>
          </a>
        </li>
        @for (item of service.crumbs(); track item.label) {
          <li class="crumb">
            <i class="icon fas fa-chevron-right" aria-hidden="true"></i>
            @if (item.active) {
              <span>{{ item.label }}</span>
            } @else {
              <a [routerLink]="item.url">{{ item.label }}</a>
            }
          </li>
        }
      </ol>
    </nav>
  `
})
export class BreadcrumbComponent {
  readonly service = inject(BreadcrumbService);
}

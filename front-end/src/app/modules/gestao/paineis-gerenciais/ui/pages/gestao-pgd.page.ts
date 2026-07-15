import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'gestao-pgd-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <div class="container-fluid px-4 py-3">
      <h2>Gestão do PGD</h2>
      <!-- TODO: implementar painel de gestão do PGD -->
      <p class="text-muted">Painel em desenvolvimento.</p>
    </div>
  `,
})
export class GestaoPgdPage {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'modalidades-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <div class="container-fluid px-4 py-3">
      <h2>Modalidades</h2>
      <!-- TODO: implementar painel de modalidades -->
      <p class="text-muted">Painel em desenvolvimento.</p>
    </div>
  `,
})
export class ModalidadesPage {}

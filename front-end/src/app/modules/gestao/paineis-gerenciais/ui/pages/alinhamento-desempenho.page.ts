import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'alinhamento-desempenho-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent],
  template: `
    <app-breadcrumb></app-breadcrumb>
    <div class="container-fluid px-4 py-3">
      <h2>Alinhamento e Desempenho</h2>
      <!-- TODO: implementar painel de alinhamento e desempenho -->
      <p class="text-muted">Painel em desenvolvimento.</p>
    </div>
  `,
})
export class AlinhamentoDesempenhoPage {}

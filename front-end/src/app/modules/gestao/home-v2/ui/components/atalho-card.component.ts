import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'home-atalho-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../home.styles.scss'],
  template: `
    <div role="button" [attr.tabindex]="desabilitado() ? -1 : 0"
      class="card h-100 home-card--atalho"
      [class.home-card--atalho-disabled]="desabilitado()"
      [attr.aria-disabled]="desabilitado()"
      (click)="onClick()" (keydown.enter)="onClick()">
      <div class="card-body text-center d-flex flex-column justify-content-start pt-3">
        <i [class]="icone()" aria-hidden="true" style="font-size: 2rem; color: #1369f0;"></i>
        <span class="fw-semibold mt-2" style="font-size: 0.85rem;">{{ titulo() }}</span>
      </div>
    </div>
  `,
})
export class AtalhoCardComponent {
  readonly icone = input.required<string>();
  readonly titulo = input.required<string>();
  readonly desabilitado = input(false);
  readonly acao = output<void>();

  onClick(): void {
    if (!this.desabilitado()) {
      this.acao.emit();
    }
  }
}

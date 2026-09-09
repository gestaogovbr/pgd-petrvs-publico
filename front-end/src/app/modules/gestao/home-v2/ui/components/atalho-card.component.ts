import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'home-atalho-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../home.styles.scss'],
  templateUrl: './atalho-card.component.html',
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

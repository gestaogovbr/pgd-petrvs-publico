import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-texto-colapsavel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: block' },
  templateUrl: './texto-colapsavel.component.html',
  styleUrls: ['./texto-colapsavel.component.scss']
})
export class TextoColapsavelComponent {
  readonly texto = input.required<string>();
  readonly limite = input(200);

  readonly expandido = signal(false);

  get deveColapsar(): boolean {
    return this.texto().length > this.limite();
  }

  get textoExibido(): string {
    if (this.expandido() || !this.deveColapsar) return this.texto();
    return this.texto().substring(0, this.limite()) + '...';
  }

  toggle(): void {
    this.expandido.set(!this.expandido());
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

@Component({
  selector: 'app-recurso-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, WebcomponentsAngularModule],
  templateUrl: './recurso-form.component.html',
})
export class RecursoFormComponent {
  @Input({ required: true }) avaliacaoId!: string;
  @Input() ativo = false;
  @Input() emAndamento = false;
  @Input() justificativa = '';

  @Output() abrir = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() justificativaChange = new EventEmitter<string>();
  @Output() submeter = new EventEmitter<void>();
}

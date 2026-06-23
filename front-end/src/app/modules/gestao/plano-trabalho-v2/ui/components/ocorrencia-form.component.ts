import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { OcorrenciaFormValue, TipoMotivoAfastamento } from '../../domain/types';
import { SelectOption } from '../edit.page';

@Component({
  selector: 'app-ocorrencia-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule],
  templateUrl: './ocorrencia-form.component.html',
})
export class OcorrenciaFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() form!: OcorrenciaFormValue;
  @Input() tiposMotivo: TipoMotivoAfastamento[] = [];
  @Input() salvando = false;
  @Input() modoEdicao = false;
  @Output() formChange = new EventEmitter<Partial<OcorrenciaFormValue>>();
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  readonly fg = this.fb.nonNullable.group({
    tipo_motivo_afastamento_id: [''],
    data_inicio: [''],
    data_fim: [''],
    horas: [''],
    observacoes: [''],
  });

  get tipoSelecionadoUsaHoras(): boolean {
    const id = this.fg.value.tipo_motivo_afastamento_id;
    return !!this.tiposMotivo.find(t => t.id === id)?.horas;
  }

  get tiposOptions(): SelectOption[] {
    return [
      { value: '', label: 'Selecione...', selected: !this.fg.value.tipo_motivo_afastamento_id },
      ...this.tiposMotivo.map(t => ({
        value: t.id,
        label: t.nome,
        selected: t.id === this.fg.value.tipo_motivo_afastamento_id,
      })),
    ];
  }

  ngOnChanges(): void {
    if (this.form) {
      this.fg.patchValue(this.form, { emitEvent: false });
    }
  }

  onConfirmar(): void {
    const value = this.fg.getRawValue();
    this.formChange.emit(value);
    this.confirmar.emit();
  }
}

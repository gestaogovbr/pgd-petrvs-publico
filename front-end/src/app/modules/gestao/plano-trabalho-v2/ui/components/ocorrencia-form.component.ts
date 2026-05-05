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
  template: `
    <div class="br-card mb-2 p-2x" [formGroup]="fg">
      <div class="row g-2">
        <div class="col-md-5">
          <br-select label="Motivo *" formControlName="tipo_motivo_afastamento_id" [options]="tiposOptions" />
        </div>
        @if (!modoEdicao) {
          <div class="col-md-2">
            <div class="br-input">
              <label>Início <span class="text-danger">*</span></label>
              <input type="date" formControlName="data_inicio" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="br-input">
              <label>Fim <span class="text-danger">*</span></label>
              <input type="date" formControlName="data_fim" />
            </div>
          </div>
        }
        @if (tipoSelecionadoUsaHoras) {
          <div class="col-md-2">
            <div class="br-input">
              <label>Horas <span class="text-danger">*</span></label>
              <input type="number" min="1" formControlName="horas" />
            </div>
          </div>
        }
        <div class="col-md-12">
          <div class="br-textarea">
            <label>Observações <span class="text-danger">*</span></label>
            <textarea rows="2" formControlName="observacoes" placeholder="Descreva a ocorrência..."></textarea>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-2 mt-2">
        <br-button emphasis="secondary" density="small" [disabled]="salvando" (click)="cancelar.emit()">Cancelar</br-button>
        <br-button emphasis="primary" density="small" [disabled]="salvando || fg.invalid" (click)="onConfirmar()">
          {{ salvando ? 'Salvando...' : 'Confirmar' }}
        </br-button>
      </div>
    </div>
  `,
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

import { Component, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Entrega } from 'src/app/models/entrega.model';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'plano-entrega-valor-meta-input',
  templateUrl: './plano-entrega-valor-meta-input.component.html',
  styleUrls: ['./plano-entrega-valor-meta-input.component.scss']
})
export class PlanoEntregaValorMetaInputComponent {
  @HostBinding('class') class = 'form-group';
  @Input() entrega?: Entrega;
  @Input() icon: string = "";
  @Input() label?: string;
  @Input() labelInfo: string = "";
  @Input() disabled?: string;
  @Input() control?: AbstractControl;
  @Input() change?: (value: any, entrega?: Entrega) => void;
  @Input() set size(size: number) {
    if (size != this._size) {
      this._size = size;
      this.class = this.class.replace(/\scol\-md\-[0-9]+/g, "") + " col-md-" + size;
    }
  }
  public get size(): number {
    return this._size || 12;
  }

  private _size: number = 0;

  public checkTipoIndicador(tipos: string[]): boolean {
    return tipos.includes(this.entrega?.tipo_indicador || "");
  }

  public onValueChange(event: Event) {
    if (this.change) this.change(this.control?.value, this.entrega);
  }
}

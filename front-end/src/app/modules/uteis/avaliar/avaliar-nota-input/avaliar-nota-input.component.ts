import { Component, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TipoAvaliacaoNota } from 'src/app/models/tipo-avaliacao-nota';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'avaliar-nota-input',
  templateUrl: './avaliar-nota-input.component.html',
  styleUrls: ['./avaliar-nota-input.component.scss']
})
export class AvaliarNotaInputComponent {
  @HostBinding('class') class = 'form-group';
  @Input() label: string = 'Qual nota?';
  @Input() disabled?: string;
  @Input() change?: (value: any) => void;
  @Input() set tipoAvaliacao(value: TipoAvaliacao | undefined) {
    if(this._tipoAvaliacao != value) {
      this._tipoAvaliacao = value;
      let notasOrdenadas = this._tipoAvaliacao?.notas;
      notasOrdenadas!.sort((a, b) => b.sequencia - a.sequencia);
      this.items = (notasOrdenadas || []).map(x => Object.assign({}, {
        key: x.nota,
        value: x.nota,
        hint: x.descricao,
        icon: x.icone,
        color: x.cor
      }));
    }
  }
  get tipoAvaliacao(): TipoAvaliacao | undefined {
    return this._tipoAvaliacao;
  }
  @Input() set control(value: AbstractControl | undefined) {
    if(this._control != value) {
      this._control = value;
      if(value) {
        value.valueChanges.subscribe(this.updateNota.bind(this));
        this.updateNota();
      }
    }
  }
  get control(): AbstractControl | undefined {
    return this._control;
  }
  @Input() set size(size: number) {
    if (size != this._size) {
      this._size = size;
      this.class = this.class.replace(/\scol\-md\-[0-9]+/g, "") + " col-md-" + size;
    }
  }
  public get size(): number {
    return this._size || 12;
  }

  public nota?: TipoAvaliacaoNota;
  public items: LookupItem[] = [];

  private _size: number = 0;
  private _control?: AbstractControl = undefined;
  private _tipoAvaliacao?: TipoAvaliacao = undefined;
  
  public get isQuantitativo(): boolean {
    return this.tipoAvaliacao?.tipo == "QUANTITATIVO";
  }

  public get isQualitativo(): boolean {
    return this.tipoAvaliacao?.tipo == "QUALITATIVO";
  }

  public updateNota() {
    this.nota = this.tipoAvaliacao?.notas.find(x => x.nota == this.control?.value);
  }

  public onValueChange(event: Event) {
    this.control?.updateValueAndValidity();
    if (this.change) this.change(this.control?.value);
  }
}

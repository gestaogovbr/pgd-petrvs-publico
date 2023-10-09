import { Component, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { AlignRate } from 'src/app/components/input/input-rate/input-rate.component';
import { TipoAvaliacaoNota } from 'src/app/models/tipo-avaliacao-nota';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'avaliar-nota-badge',
  templateUrl: './avaliar-nota-badge.component.html',
  styleUrls: ['./avaliar-nota-badge.component.scss']
})
export class AvaliarNotaBadgeComponent {
  @Input() align: AlignRate = "center";
  @Input() set tipoAvaliacao(value: TipoAvaliacao | undefined) {
    if(this._tipoAvaliacao != value) {
      this._tipoAvaliacao = value;
      this.items = (this._tipoAvaliacao?.notas || []).map(x => Object.assign({}, {
        key: x.nota,
        value: x.nota,
        hint: x.descricao,
        icon: x.icone
      }));
      this.tipoAvaliacaoNota = (this._tipoAvaliacao?.notas || []).find(x => x.nota == this.nota);
    }
  }
  get tipoAvaliacao(): TipoAvaliacao | undefined {
    return this._tipoAvaliacao;
  }
  @Input() set nota(value: any) {
    if(value != this.fakeControl.value) {
      this.fakeControl.setValue(value);
      this.tipoAvaliacaoNota = (this._tipoAvaliacao?.notas || []).find(x => x.nota == this.nota);
    }
  }
  get nota(): any {
    return this.fakeControl.value;
  }

  public items: LookupItem[] = [];
  public fakeControl: FormControl = new FormControl();
  public tipoAvaliacaoNota?: TipoAvaliacaoNota;

  private _tipoAvaliacao?: TipoAvaliacao = undefined;

  public get isQuantitativo(): boolean {
    return this.tipoAvaliacao?.tipo == "QUANTITATIVO";
  }

  public get isQualitativo(): boolean {
    return this.tipoAvaliacao?.tipo == "QUALITATIVO";
  }
}

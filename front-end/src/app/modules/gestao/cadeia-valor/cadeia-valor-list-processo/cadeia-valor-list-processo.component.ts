import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';



@Component({
  selector: 'cadeia-valor-list-processo',
  templateUrl: './cadeia-valor-list-processo.component.html',
  styleUrls: ['./cadeia-valor-list-processo.component.scss']
})
export class CadeiaValorListProcessoComponent extends PageFrameBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: CadeiaValor | undefined) { super.entity = value; } get entity(): CadeiaValor | undefined { return super.entity; }

  public get items(): CadeiaValorProcesso[] {
    if (!this.gridControl.value) this.gridControl.setValue(new CadeiaValor());
    if (!this.gridControl.value.processos) this.gridControl.value.processos = [];

    return this.gridControl.value.processos;
  }

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get<CadeiaValorProcessoDaoService>(CadeiaValorProcessoDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      sequencia: { default: "" }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  
    
    return result;
  }

  public getSequencia(metadata: any, row: CadeiaValorProcesso) {
    if (!metadata.nivel) {
      let paiId: string | null = row.processo_pai_id;
      let niveis = "";
      let path = [];
      while (paiId) {
        path.push(paiId);
        let atual = this.items.find(x => x.id == paiId);
        niveis = (atual?.sequencia || "") + "." + niveis;
        paiId = atual?.processo_pai_id || null;
      }
      niveis += row.sequencia;
      if (metadata.nivel != niveis) {
        metadata.nivel = niveis;
        metadata.path = path;
      }
    }
    return metadata.nivel;
  }

  public getNivelSequencia(metadata: any): number {
    return 10 * (metadata.nivel.match(/\./g) || []).length;
  }

}

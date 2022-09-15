import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-alocacoes',
  templateUrl: './projeto-form-alocacoes.component.html',
  styleUrls: ['./projeto-form-alocacoes.component.scss']
})
export class ProjetoFormAlocacoesComponent extends PageFrameBase {

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

}

import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-recursos',
  templateUrl: './projeto-form-recursos.component.html',
  styleUrls: ['./projeto-form-recursos.component.scss']
})
export class ProjetoFormRecursosComponent extends PageFrameBase {

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({
      tipo_recurso: {default: ""},
      nome_recurso: {default: ""},
      und_recurso: {default: ""},
      vlr_recurso: {default: 0.00}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

}

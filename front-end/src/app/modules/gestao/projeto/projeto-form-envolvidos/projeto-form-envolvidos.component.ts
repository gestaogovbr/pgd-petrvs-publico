import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-envolvidos',
  templateUrl: './projeto-form-envolvidos.component.html',
  styleUrls: ['./projeto-form-envolvidos.component.scss']
})
export class ProjetoFormEnvolvidosComponent extends PageFrameBase {

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

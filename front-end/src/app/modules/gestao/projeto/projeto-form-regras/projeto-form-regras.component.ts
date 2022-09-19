import { Component, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ProjetoRegra } from 'src/app/models/projeto-regra.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'app-projeto-form-regras',
  templateUrl: './projeto-form-regras.component.html',
  styleUrls: ['./projeto-form-regras.component.scss']
})
export class ProjetoFormRegrasComponent extends PageFrameBase {
  @Input() projeto?: Projeto;

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public get items(): ProjetoRegra[] {
    return this.projeto?.regras || [];
  }

}

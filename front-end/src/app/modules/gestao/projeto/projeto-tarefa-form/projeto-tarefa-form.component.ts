import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'app-projeto-tarefa-form',
  templateUrl: './projeto-tarefa-form.component.html',
  styleUrls: ['./projeto-tarefa-form.component.scss']
})
export class ProjetoTarefaFormComponent extends PageFrameBase {

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


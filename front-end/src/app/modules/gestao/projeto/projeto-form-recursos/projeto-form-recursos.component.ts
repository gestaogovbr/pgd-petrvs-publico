import { Component, Injector, OnInit } from '@angular/core';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-recursos',
  templateUrl: './projeto-form-recursos.component.html',
  styleUrls: ['./projeto-form-recursos.component.scss']
})
export class ProjetoFormRecursosComponent extends PageFrameBase {

  constructor(public injector: Injector) {
    super(injector);
  }

}
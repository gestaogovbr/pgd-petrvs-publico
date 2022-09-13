import { Component, Injector, OnInit } from '@angular/core';
import { PageFrameBase } from '../../base/page-frame-base';

@Component({
  selector: 'comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent extends PageFrameBase {

  constructor(public injector: Injector) {
    super(injector);
  }

}

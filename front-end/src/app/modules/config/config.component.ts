import { Component, Injector, OnInit } from '@angular/core';
import { PageBase } from '../base/page-base';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent extends PageBase {

  constructor(public injector: Injector) {
    super(injector);
  }

}

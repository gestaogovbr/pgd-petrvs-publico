import { Component, Injector, OnInit } from '@angular/core';
import { ListenerBase } from '../listener-base';

@Component({
  selector: 'app-petrvs-listener',
  templateUrl: './petrvs-listener.component.html',
  styleUrls: ['./petrvs-listener.component.scss']
})
export class PetrvsListenerComponent extends ListenerBase implements OnInit {

  constructor(public injector: Injector) {
    super(injector, "petrvs-listener");
  }

  ngOnInit(): void {
  }

}

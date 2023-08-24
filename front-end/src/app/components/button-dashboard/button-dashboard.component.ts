import { Component, Injector, Input, OnInit } from '@angular/core';
import { ComponentBase } from '../component-base';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-button-dashboard',
  templateUrl: './button-dashboard.component.html',
  styleUrls: ['./button-dashboard.component.scss']
})
export class ButtonDashboardComponent  extends ComponentBase implements OnInit {
  public go: NavigateService;

  @Input() title: string = "";
  @Input() imgIcon: string = "";
  @Input() textColor: string = "#ddd";
  @Input() borderColor: string = "#000";
  @Input() route?: FullRoute;
  @Input() metadata?: RouteMetadata;

  
  constructor(public injector: Injector){    
    super(injector);
    this.go = injector.get<NavigateService>(NavigateService);
  }

  ngOnInit(): void {
    
  }

  onClick(){
    if(this.route)
      this.go.navigate(this.route, this.metadata);
  }
}

import { Component, Injector, Input, OnInit } from '@angular/core';
import { ComponentBase } from '../component-base';
import { FullRoute, NavigateService, RouteMetadata } from 'src/app/services/navigate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ServerService } from 'src/app/services/server.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-button-dashboard',
  templateUrl: './button-dashboard.component.html',
  styleUrls: ['./button-dashboard.component.scss']
})
export class ButtonDashboardComponent  extends ComponentBase implements OnInit {
  public go: NavigateService;
  private server: ServerService;

  @Input() title: string = "";
  @Input() textColor: string = "#ddd";
  @Input() borderColor: string = "#000";
  @Input() route?: FullRoute;
  @Input() metadata?: RouteMetadata;
  @Input() externalLink: boolean = false;

  @Input() set imgIcon(value: any) {
    if(this._imgIcon != value) {
      this._imgIcon = value;
      this.loadSvg();
    }
  }
  get imgIcon(): any {
    return this._imgIcon;
  }

  private _imgIcon: boolean = false;
  
  seuCodigoSvg$!: Observable<string>;
  
  constructor(public injector: Injector, public sanitizer: DomSanitizer){    
    super(injector);    
    this.go = injector.get<NavigateService>(NavigateService);
    this.server = injector.get<ServerService>(ServerService);
    
  }

  ngOnInit(): void {}

  async loadSvg(){
    this.seuCodigoSvg$ = await this.server.getSvg(this.imgIcon);
  }

  onClick(){
    if(this.route) {
      this.externalLink ? window.open(this.route.route.toString(), '_blank') : this.go.navigate(this.route, this.metadata);
    }
  }
}

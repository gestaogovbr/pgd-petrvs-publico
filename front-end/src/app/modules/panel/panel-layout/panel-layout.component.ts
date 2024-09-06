import { Component, Injector, OnInit } from "@angular/core";
import { PageBase } from "../../base/page-base";
import { AuthPanelService } from "src/app/services/auth-panel.service";
import { Tenant } from "src/app/models/tenant.model";
import { NavigationExtras } from "@angular/router";


@Component({
  selector: 'panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})

export class PanelLayoutComponent extends PageBase implements OnInit {
  public currentUser: any;
 
  constructor(public injector: Injector, private authService: AuthPanelService){
    super(injector);
    this.setTitleUser();
  }

  ngOnInit(): void {
    
  }

  private setTitleUser(){
    this.authService.detailUser()
        .then((user) => {
          this.currentUser = user;
          this.title = "Bem vindo "+user.nome+" - Voce está em Ambiente "+this.gb.ENV;
        })
  }
}
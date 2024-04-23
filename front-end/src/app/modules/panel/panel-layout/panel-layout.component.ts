import { Component, Injector, OnInit } from "@angular/core";
import { PageBase } from "../../base/page-base";
import { AuthPanelService } from "src/app/services/auth-panel.service";


@Component({
  selector: 'panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})

export class PanelLayoutComponent extends PageBase implements OnInit {
 
  constructor(public injector: Injector, private authService: AuthPanelService){
    super(injector);
    this.setTitleUser();
  }

  ngOnInit(): void {
    
  }

  private setTitleUser(){
    this.authService.detailUser()
        .then((user) => {
          this.title = "Bem vindo "+user.nome+" - Voce está em Ambiente "+this.gb.ENV;
        })
  }
}
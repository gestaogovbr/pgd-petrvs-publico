import { Component, Injector, OnInit } from '@angular/core';
import { PageBase } from 'src/app/modules/base/page-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-demanda-list',
  templateUrl: './demanda-list.component.html',
  styleUrls: ['./demanda-list.component.scss']
})
export class DemandaListComponent extends PageBase implements OnInit {

  public activeTab: string = "TABELA";

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.title = this.lex.noun("Demandas", true);
    this.code = "MOD_DMD";
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.activeTab = this.usuarioConfig.active_tab || "TABELA";
  }

  public onSelectTab(tab: LookupItem) {
    this.activeTab = tab.key;
    this.saveUsuarioConfig({active_tab: this.activeTab});
    //this.auth.updateUsuarioConfig({demanda_active_tab: tab.key});
  }

}

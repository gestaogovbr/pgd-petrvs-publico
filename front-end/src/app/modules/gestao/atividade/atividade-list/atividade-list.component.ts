import { Component, Injector, OnInit } from '@angular/core';
import { PageBase } from 'src/app/modules/base/page-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-atividade-list',
  templateUrl: './atividade-list.component.html',
  styleUrls: ['./atividade-list.component.scss']
})
export class AtividadeListComponent extends PageBase implements OnInit {
  public activeTab: string = "TABELA";

  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    this.title = this.lex.translate("Atividades");
    this.code = "MOD_DMD";
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.activeTab = this.usuarioConfig.active_tab || "TABELA";
  }

  public async onSelectTab(tab: LookupItem) {
    this.activeTab = tab.key;
    this.saveUsuarioConfig({active_tab: this.activeTab});
  }

}
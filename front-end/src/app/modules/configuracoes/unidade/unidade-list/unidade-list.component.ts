import { Component, Injector, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PageBase } from 'src/app/modules/base/page-base';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styleUrls: ['./unidade-list.component.scss']
})
export class UnidadeListComponent extends PageBase {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(TabsComponent, { static: false }) public tabs?: TabsComponent;
  @Input() selectable: boolean = false;

  constructor(public injector: Injector) {
    super(injector); //, Unidade, UnidadeDaoService);
    //this.title = this.lex.translate("Unidades");
    //this.code = "MOD_CFG_UND";
    //this.filter = this.fh.FormBuilder({});
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    //this.tabs!.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
  }

  public async onSelectTab(tab: LookupItem) {
    //if(this.viewInit) this.saveUsuarioConfig({active_tab: tab.key});
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    //super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    return result;
  }

}
import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
<<<<<<< 955a2fd673caea18c7e348fba524a8e48a29dbb6
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
=======
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
>>>>>>> 65d1ee1109dfab421991abf0d8ce81bf742a23dc
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styleUrls: ['./unidade-list.component.scss']
})
export class UnidadeListComponent extends PageListBase<Unidade, UnidadeDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
<<<<<<< 955a2fd673caea18c7e348fba524a8e48a29dbb6
  @ViewChild(TabsComponent, { static: false }) public tabs?: TabsComponent;
=======
  @ViewChild('instituidora', { static: false }) public instituidora?: InputSwitchComponent;

  public cidadeDao: CidadeDaoService;
  public entidadeDao: EntidadeDaoService;
  public buttons: ToolbarButton[] = [];
  public unidadesJaVinculadas: string[] = [];
>>>>>>> 65d1ee1109dfab421991abf0d8ce81bf742a23dc

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.title = this.lex.translate("Unidades");
    this.code = "MOD_CFG_UND";
    this.filter = this.fh.FormBuilder({});
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.tabs!.active = ["TABELA", "MAPA"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
  }

  public async onSelectTab(tab: LookupItem) {
    this.saveUsuarioConfig({active_tab: tab});
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    return result;
  }

}
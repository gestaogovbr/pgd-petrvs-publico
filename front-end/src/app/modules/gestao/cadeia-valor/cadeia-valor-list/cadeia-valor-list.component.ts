import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {PageListBase} from "../../../base/page-list-base";
import {GridComponent} from "../../../../components/grid/grid.component";
import {FormGroup} from "@angular/forms";
import {CadeiaValor} from "../../../../models/cadeia-valor.model";
import {CadeiaValorDaoService} from "../../../../dao/cadeia-valor-dao.service";
import { LookupItem } from 'src/app/services/lookup.service';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@Component({
  selector: 'app-cadeia-valor-list',
  templateUrl: './cadeia-valor-list.component.html',
  styleUrls: ['./cadeia-valor-list.component.scss']
})
export class CadeiaValorListComponent extends PageListBase<CadeiaValor, CadeiaValorDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(TabsComponent, { static: false }) public tabs?: TabsComponent;

  constructor(public injector: Injector) {
    super(injector, CadeiaValor, CadeiaValorDaoService);
    /* Inicializações */
    this.code = "MOD_CADV";
    this.title = this.lex.noun('Cadeia de Valor',true);
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

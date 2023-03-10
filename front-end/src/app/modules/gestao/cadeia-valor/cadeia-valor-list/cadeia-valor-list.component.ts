import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {PageListBase} from "../../../base/page-list-base";
import {GridComponent} from "../../../../components/grid/grid.component";
import {FormGroup} from "@angular/forms";
import {CadeiaValor} from "../../../../models/cadeia-valor.model";
import {CadeiaValorDaoService} from "../../../../dao/cadeia-valor-dao.service";
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-cadeia-valor-list',
  templateUrl: './cadeia-valor-list.component.html',
  styleUrls: ['./cadeia-valor-list.component.scss']
})
export class CadeiaValorListComponent extends PageListBase<CadeiaValor, CadeiaValorDaoService>{
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public activeTab: string = "TABELA";

  constructor(public injector: Injector) {
    super(injector, CadeiaValor, CadeiaValorDaoService);
    /* Inicializações */
    this.title = 'Cadeias de Valor';
    this.filter = this.fh.FormBuilder({
      nome: {default: ""}
    });

    if (this.auth.hasPermissionTo("MOD_EXTM_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }

    if (this.auth.hasPermissionTo("MOD_EXTM_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }

    return result;
  }

  public async onSelectTab(tab: LookupItem) {
    this.activeTab = tab.key;
    this.saveUsuarioConfig({active_tab: this.activeTab});
    // if (tab.key == "DASHBOARD") {
    //   this.programaDao.query({where: [
    //     ["normativa", "!=", null],
    //     ["unidade_id", "==",this.auth.unidade!.id],
    //     ["data_fim", "==", null],
    //     //["data_fim_vigencia", ">=", Date.now()]
    //   ]}).asPromise().then((programas) => {
    //     this.programaSelecionado = programas.sort((a, b) => b.data_inicio_vigencia.getMilliseconds() - a.data_inicio_vigencia.getMilliseconds())[0];
    //     this.programa?.loadSearch(this.programaSelecionado);
    //   });
    // }
  }


}

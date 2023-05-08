import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { CadeiaValor } from 'src/app/models/cadeia-valor.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'cadeia-valor-list-grid',
  templateUrl: './cadeia-valor-list-grid.component.html',
  styleUrls: ['./cadeia-valor-list-grid.component.scss']
})
export class CadeiaValorListGridComponent  extends PageListBase<CadeiaValor, CadeiaValorDaoService>{
  // @Input() snapshot?: ActivatedRouteSnapshot;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() snapshot?: ActivatedRouteSnapshot;
  @Input() fixedFilter?: any[];
  
  public entidadeDao: EntidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, CadeiaValor, CadeiaValorDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    /* Inicializações */
    this.filter = this.fh.FormBuilder({
      inicio: {default: null},
      fim: {default: null},
      nome: {default: ""},
      entidade_id: {default: null}
     });
     this.join = ['processos'];
    // Testa se o usuário possui permissão para exibir planos de gestão/entregas
    if (this.auth.hasPermissionTo("MOD_CADV_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir planos de gestão/entregas
    if (this.auth.hasPermissionTo("MOD_CADV_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.inicio.setValue(null);
    filter.controls.fim.setValue(null);
    filter.controls.entidade_id.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome + "%"]);
    }
    if(form.inicio) {
      result.push(["inicio", ">=", form.inicio]);
    }
    if(form.fim) {
      result.push(["fim", "<=", form.fim]);
    }

    return result;
  }

}

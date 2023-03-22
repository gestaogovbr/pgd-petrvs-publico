import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent} from 'src/app/components/input/input-search/input-search.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-planejamento-list',
  templateUrl: './planejamento-list.component.html',
  styleUrls: ['./planejamento-list.component.scss']
})
export class PlanejamentoListComponent extends PageListBase<Planejamento, PlanejamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  
  public unidadeDao: UnidadeDaoService;
  public unidade_disabled: string | undefined;

  constructor(public injector: Injector) {
    super(injector, Planejamento, PlanejamentoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    /* Inicializações */
    this.title = this.lex.noun('Planejamento Institucional',true);
    this.filter = this.fh.FormBuilder({
      inicio: {default: null},
      fim: {default: null},
      nome: {default: ""},
      unidade_id: {default: null},
      so_entidade: { default: false },
      agrupar: { default: true },
     });
     this.join = ['unidade:nome,sigla'];
    // Testa se o usuário possui permissão para exibir planejamentos institucionais
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir planejamentos institucionais
    if (this.auth.hasPermissionTo("MOD_PLAN_INST_EXCL")) {
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
    filter.controls.unidade_id.setValue(null);
    filter.controls.so_entidade.setValue(false);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.so_entidade) {
      filter.controls.unidade_id.setValue(null);
      result.push(["unidade_id", "==", null]);
    } else {
      if(form.unidade_id) result.push(["unidade_id", "==", form.unidade_id]);
    }
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

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if ((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
      this.grid!.reloadFilter();
    }
  }

  public onSoEntidadeChange(event: Event) {
    if (this.filter!.controls.so_entidade.value) {
      this.filter!.controls.unidade_id.setValue(null);
      this.unidade_disabled = 'disabled';
    } else {
      this.filter!.controls.unidade_id.setValue(undefined);
      this.unidade_disabled = undefined;
    }
  }

}

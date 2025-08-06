import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent} from 'src/app/components/input/input-search/input-search.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { EixoTematico } from 'src/app/models/eixo-tematico.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@Component({
  selector: 'app-planejamento-list',
  templateUrl: './planejamento-list.component.html',
  styleUrls: ['./planejamento-list.component.scss']
})
export class PlanejamentoListComponent extends PageListBase<Planejamento, PlanejamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild(TabsComponent, { static: false }) public tabs?: TabsComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  
  public unidadeDao: UnidadeDaoService;
  public unidade_disabled: string | undefined;

  constructor(public injector: Injector) {
    super(injector, Planejamento, PlanejamentoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    /* Inicializações */
    this.code = "MOD_PLAN_INST";
    this.title = this.lex.translate('Planejamentos Institucionais');
    this.filter = this.fh.FormBuilder({
      data_inicio: {default: null},
      data_fim: {default: null},
      nome: {default: ""},
      unidade_id: {default: null},
      so_entidade: { default: false },
      agrupar: { default: true },
     });
    this.join = [
      'unidade:id,nome,sigla',
      'objetivos',
      'objetivos.eixo_tematico:id,nome',
      'objetivos.objetivo_superior:id,nome',
      'planejamento_superior:id,nome',
      'planejamento_superior.objetivos'
    ];
    // Testa se o usuário possui permissão para exibir planejamentos institucionais
    if (this.auth.hasPermissionTo("MOD_PLAN_INST")) {
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
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
  }  

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.tabs!.active = ["TABELA", "MAPA", "OKR"].includes(this.usuarioConfig.active_tab) ? this.usuarioConfig.active_tab : "TABELA";
  }

  /* override */
  public onLoad() {}


 

  public initGrid(grid: GridComponent) {
    grid.queryInit();
  }

  public async onSelectTab(tab: LookupItem) {
    //if(tab.key == "TABELA") this.onLoad();
    if(this.viewInit) this.saveUsuarioConfig({active_tab: tab.key});
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.data_inicio.setValue(null);
    filter.controls.data_fim.setValue(null);
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
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }
    if(form.data_inicio) {
      result.push(["data_inicio", ">=", form.data_inicio]);
    }
    if(form.data_fim) {
      result.push(["data_fim", "<=", form.data_fim]);
    }
    return result;
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

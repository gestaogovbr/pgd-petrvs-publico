import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanejamentoObjetivo } from 'src/app/models/planejamento-objetivo.model';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { PlanoEntregaService } from '../plano-entrega.service';

@Component({
  selector: 'app-plano-entrega-list-entrega-list',
  templateUrl: './plano-entrega-list-entrega-list.component.html',
  styleUrls: ['./plano-entrega-list-entrega-list.component.scss']
})
export class PlanoEntregaListEntregaListComponent extends PageListBase<PlanoEntregaEntrega,PlanoEntregaEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public planoEntregaDao: PlanoEntregaEntregaDaoService;
  public unidadeDao: UnidadeDaoService;
  public buttons: ToolbarButton[] = [];
  public idsUnidadesAscendentes: string[] = [];
  public planoEntregaService: PlanoEntregaService;

  constructor(public injector: Injector) {
    super(injector, PlanoEntregaEntrega, PlanoEntregaEntregaDaoService);
    this.planoEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.title = this.lex.translate("Entregas");
    this.filter = this.fh.FormBuilder({
      descricao: { default: "" },
      descricao_entrega: { default: "" },
      unidade_id: { default: "" },
      destinatario: { default: "" },
    });
    this.join = ["entrega:id,nome","entrega_pai:id,descricao","unidade:id,sigla","plano_entrega:id,nome"];
    this.groupBy = [{ field: "plano_entrega.nome", label: "Unidade" }];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.idsUnidadesAscendentes = this.metadata?.idsUnidadesAscendentes || this.idsUnidadesAscendentes;
    this.filter?.controls.unidade_id.setValue(this.idsUnidadesAscendentes[0]);
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    result.push({ label: "Informações", icon: "bi bi-info-circle", onClick: (objetivo: PlanejamentoObjetivo) => this.go.navigate({ route: ['gestao', 'planejamento', 'objetivo', objetivo.id, 'consult'] }, { modal: true }) });
    return result;
  }

  public filterClear(filter: FormGroup) {
    super.filterClear(filter);
    filter.controls.descricao.setValue("");
    filter.controls.descricao_entrega.setValue("");
  }

  public filterWhere = (filter: FormGroup) => {
    let form: any = filter.value;
    let result: any[] = [];
    if(this.idsUnidadesAscendentes.length) result.push(["plano_entrega.unidade_id", "in", this.idsUnidadesAscendentes]);
    if (form.unidade_id?.length) {  // unidade demandante
      result.push(["unidade_id", "==", form.unidade_id]);
    }
    if (form.descricao?.length) {
      result.push(["descricao", "like", "%" + form.descricao.trim().replace(" ", "%") + "%"]);
    }
    if (form.descricao_entrega?.length) {
      result.push(["descricao_entrega", "like", "%" + form.descricao_entrega.trim().replace(" ", "%") + "%"]);
    }
    if (form.destinatario?.length) {
      result.push(["destinatario", "like", "%" + form.destinatario.trim().replace(" ", "%") + "%"]);
    }
    return result;
  }
}

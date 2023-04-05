import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent} from 'src/app/components/input/input-search/input-search.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { PlanoEntregaService } from '../../plano-entrega/plano-entrega.service';

@Component({
  selector: 'app-planejamento-mapa-entregas',
  templateUrl: './planejamento-mapa-entregas.component.html',
  styleUrls: ['./planejamento-mapa-entregas.component.scss']
})
export class PlanejamentoMapaEntregasComponent extends PageListBase<Planejamento, PlanejamentoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  
  public unidadeDao: UnidadeDaoService;
  public entregaDao: EntregaDaoService;
  public entregaService: PlanoEntregaService;
  public objetivoId?: string;

  constructor(public injector: Injector) {
    super(injector, Planejamento, PlanejamentoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.entregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    /* Inicializações */
    this.title = this.lex.noun('Planejamento Institucional',true);
    this.filter = this.fh.FormBuilder({
      unidade_id: {default: null},
      entrega_id: {default: null},
      inicio: {default: null},
      fim: {default: null}
    });
    this.join = ['plano_entrega.unidade:id,nome,sigla', 'plano_entrega.entrega:id,nome,tipo_indicador,lista_qualitativos'];
  }

  ngOnInit(){
    super.ngOnInit()
    this.objetivoId = this.urlParams!.get("objetivo_id") || undefined;
  }

  public filterClear(filter: FormGroup) {
    filter.controls.unidade_id.setValue(null);
    filter.controls.entrega_id.setValue(null);
    filter.controls.inicio.setValue(null);
    filter.controls.fim.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    result.push(["objetivos.objetivo_id", "==", this.objetivoId]);
    if(form.unidade_id) result.push(["plano_entrega.unidade_id", "==", form.unidade_id]);
    if(form.entrega_id) result.push(["entrega_id", "==", form.entrega_id]);
    if(form.inicio) result.push(["data_inicio", ">=", form.inicio]);
    if(form.fim) result.push(["data_fim", "<=", form.fim]);

    return result;
  }

}


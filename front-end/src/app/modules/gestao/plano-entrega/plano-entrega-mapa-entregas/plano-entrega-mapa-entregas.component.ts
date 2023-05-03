import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { InputSearchComponent} from 'src/app/components/input/input-search/input-search.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { PlanoEntregaService } from '../plano-entrega.service';

@Component({
  selector: 'plano-entrega-mapa-entregas',
  templateUrl: './plano-entrega-mapa-entregas.component.html',
  styleUrls: ['./plano-entrega-mapa-entregas.component.scss']
})
export class PlanoEntregaMapaEntregasComponent extends PageListBase<PlanoEntregaEntrega, PlanoEntregaEntregaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  
  public unidadeDao: UnidadeDaoService;
  public entregaDao: EntregaDaoService;
  public entregaService: PlanoEntregaService;
  public objetivoId?: string;
  public processoId?: string;

  constructor(public injector: Injector) {
    super(injector, PlanoEntregaEntrega, PlanoEntregaEntregaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entregaDao = injector.get<EntregaDaoService>(EntregaDaoService);
    this.entregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    /* Inicializações */
    this.title = this.lex.noun("Entrega", true);
    this.filter = this.fh.FormBuilder({
      unidade_id: {default: null},
      entrega_id: {default: null},
      inicio: {default: null},
      fim: {default: null}
    });
    this.join = [];
  }

  ngOnInit(){
    super.ngOnInit()
    this.objetivoId = this.urlParams!.get("objetivo_id") || undefined;
    this.processoId = this.urlParams!.get("processo_id") || undefined;
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

    if(this.objetivoId) result.push(["objetivos.objetivo_id", "==", this.objetivoId]);
    if(this.processoId) result.push(["processos.processo_id", "==", this.processoId]);
    if(form.unidade_id) result.push(["plano_entrega.unidade_id", "==", form.unidade_id]);
    if(form.entrega_id) result.push(["entrega_id", "==", form.entrega_id]);
    if(form.inicio) result.push(["data_inicio", ">=", form.inicio]);
    if(form.fim) result.push(["data_fim", "<=", form.fim]);

    return result;
  }

}


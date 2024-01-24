import { Component, Injector } from "@angular/core";
import { PlanoEntregaEntregaDaoService } from "src/app/dao/plano-entrega-entrega-dao.service";
import { PlanoEntregaEntrega } from "src/app/models/plano-entrega-entrega.model";
import { PlanoEntrega } from "src/app/models/plano-entrega.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";
import { PlanoEntregaService } from "../plano-entrega.service";

@Component({
  selector: 'plano-entrega-entrega-detalhes',
  templateUrl: './plano-entrega-entrega-detalhes.component.html',
  styleUrls: ['./plano-entrega-entrega-detalhes.component.scss']
})
export class PlanoEntregaEntregaDetalhesComponent extends PageFrameBase {
  public planoEntrega?: PlanoEntrega;
  public entrega?: PlanoEntregaEntrega;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public planoEntregaService: PlanoEntregaService;

  constructor(public injector: Injector) {
    super(injector);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
  }
  
  public ngOnInit() {
    super.ngOnInit();
    this.entrega = this.metadata?.entrega;
  }

  public async showPlanejamento(objetivo_id: string){
    this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo_id]}, { modal: true });
  }

  public async showCadeiaValor(processo_id: string){
    this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo_id]}, {modal: true});  
  }

}
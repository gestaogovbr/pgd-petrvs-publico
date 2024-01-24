import { Component, Injector, Input } from "@angular/core";
import { TreeNode } from "primeng/api";
import { PlanoEntregaEntregaDaoService } from "src/app/dao/plano-entrega-entrega-dao.service";
import { PlanoEntregaEntrega } from "src/app/models/plano-entrega-entrega.model";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'plano-entrega-entregas-vinculadas',
  templateUrl: './plano-entrega-entregas-vinculadas.component.html',
  styleUrls: ['./plano-entrega-entregas-vinculadas.component.scss']
})
export class PlanoEntregaEntregasVinculadasComponent extends PageFrameBase { 
  @Input() set entregaId(value: string) {
    if(this._entregaId != value) {
      this._entregaId = value;
    }
  }  
  get entregaId(): string {
    return this._entregaId;
  }

  public loader: boolean = false;
  private _entregaId!: string;
  public planoEntregaEntregaDao: PlanoEntregaEntregaDaoService;
  public entregasVinculadas: TreeNode[] = [];

  constructor(public injector: Injector){
    super(injector);
    this.planoEntregaEntregaDao = injector.get<PlanoEntregaEntregaDaoService>(PlanoEntregaEntregaDaoService);
    this.join = ["unidade"];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadData();
  }

  public async loadData() {
    this.loader = true;
    try {
      this.entregasVinculadas = await this.planoEntregaEntregaDao.hierarquia(this._entregaId)
      this.cdRef.detectChanges();
      this.loader = false;      
    } catch  (e){
      console.log("Erro")
    }
  }

  public async showDetalhes(entrega: PlanoEntregaEntrega){
    this.go.navigate({route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "detalhes"]}, {
      metadata: {
        entrega: entrega
      }
    });    
  }
}
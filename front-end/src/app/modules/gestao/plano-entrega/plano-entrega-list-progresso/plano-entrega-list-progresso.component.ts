import { Component, Injector, Input, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { PlanoEntregaEntregaProgressoDaoService } from "src/app/dao/plano-entrega-entrega-progresso-dao.service";
import { PlanoEntregaEntregaProgresso } from "src/app/models/plano-entrega-entrega-progresso.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { PlanoEntregaService } from "../plano-entrega.service";
import { Base } from "src/app/models/base.model";

@Component({
  selector: 'app-plano-entrega-list-progresso',
  templateUrl: './plano-entrega-list-progresso.component.html',
  styleUrls: ['./plano-entrega-list-progresso.component.scss']
})
export class PlanoEntregaListProgressoComponent extends PageListBase<PlanoEntregaEntregaProgresso,PlanoEntregaEntregaProgressoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
 
  public planoEntregaEntregaId: string = "";
  public planoEntregaService: PlanoEntregaService;

  constructor(public injector: Injector) {
    super(injector, PlanoEntregaEntregaProgresso, PlanoEntregaEntregaProgressoDaoService);
    this.planoEntregaService = injector.get<PlanoEntregaService>(PlanoEntregaService);
    this.title = this.lex.translate("Histórico de Execução");
    this.orderBy = [['data_progresso','desc']];
    this.join = ['plano_entrega_entrega.entrega'];
    this.filter = this.fh.FormBuilder({
      data_inicial_progresso: {default: null},
      data_final_progresso: {default: null},
    });
    this.addOption(Object.assign({ onClick: this.delete.bind(this) }, this.OPTION_EXCLUIR), "MOD_PENT_ENTR_PRO_EXCL");
  }

  public onGridLoad(rows?: Base[]) {
    (rows as PlanoEntregaEntregaProgresso[])?.forEach(x => x.entrega = x.plano_entrega_entrega?.entrega);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.planoEntregaEntregaId = this.urlParams!.get("entrega_id") || "";
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;   
    if(form.data_inicial_progresso) result.push(["data_progresso", ">=", form.data_inicial_progresso]);
    if(form.data_final_progresso) result.push(["data_progresso", "<=", form.data_final_progresso]);
    result.push(["plano_entrega_entrega_id", "==", this.planoEntregaEntregaId]);
    return result;
  }

}
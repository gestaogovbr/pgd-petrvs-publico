import { Component, Injector } from "@angular/core";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { Solucao } from "src/app/models/solucao.model";
import { PageBase } from "src/app/modules/base/page-base";
import { PageFrameBase } from "src/app/modules/base/page-frame-base";

@Component({
  selector: 'solucao-show',
  templateUrl: './solucao-show.component.html',
  styleUrls: ['./solucao-show.component.scss']
})
export class SolucaoShowComponent extends PageBase {
  public solucao?: Solucao | null;
  public solucaoDaoService: SolucaoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.solucaoDaoService = injector.get<SolucaoDaoService>(SolucaoDaoService);
    this.modalWidth = 1300;
    this.loading = true;
  } 

  public ngOnInit() {
    super.ngOnInit();
    this.carregaSolucaoDetalhado();
  }

  public async carregaSolucaoDetalhado(){
    this.solucao = await this.solucaoDaoService.getById(this.urlParams!.get("id") as string, ["unidade"]);
    this.loading = false;
  }
}
import { Component, Injector } from "@angular/core";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { Solucao } from "src/app/models/solucao.model";
import { Unidade } from "src/app/models/unidade.model";
import { PageBase } from "src/app/modules/base/page-base";

@Component({
  selector: 'solucao-show',
  templateUrl: './solucao-show.component.html',
  styleUrls: ['./solucao-show.component.scss'],
})
export class SolucaoShowComponent extends PageBase {
  public solucao?: Solucao | null;
  public unidades_ativas?: Unidade[];
  public solucaoDaoService: SolucaoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.solucaoDaoService = injector.get<SolucaoDaoService>(SolucaoDaoService);
    this.loading = true;
  } 

  public ngOnInit() {
    super.ngOnInit();
    this.carregaSolucaoDetalhado();
  }

  public async carregaSolucaoDetalhado(){
    this.solucao = await this.solucaoDaoService.getById(this.urlParams!.get("id") || '', 
      ["solucoesUnidades.unidade", "produtosSolucoes.produto", "produtosSolucoes.produto.unidade"]
    );
    this.loading = false;
  }

  public ativo(status :any) : boolean{
    return status == 1;
  }

  get unidadesAtivas(): any[] { 
    return this.solucao?.solucoes_unidades?.filter(x => x.status).map(y => y.unidade) || [];
  }

  public isProdutoAtivo(produto: any) : boolean{
    return produto.data_ativado && !produto.data_desativado;
  }
}
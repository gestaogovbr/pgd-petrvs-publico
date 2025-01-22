import { Component, Injector } from "@angular/core";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { Produto } from "src/app/models/produto.model";
import { PageBase } from "src/app/modules/base/page-base";

@Component({
  selector: 'produto-show',
  templateUrl: './produto-show.component.html',
  styleUrls: ['./produto-show.component.scss']
})
export class ProdutoShowComponent extends PageBase {
  public produto?: Produto | null;
  public produtoDaoService: ProdutoDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.produtoDaoService = injector.get<ProdutoDaoService>(ProdutoDaoService);
    this.loading = true;
  } 

  public ngOnInit() {
    super.ngOnInit();
    this.carregaProdutoDetalhado();
  }

  public async carregaProdutoDetalhado(){
    this.produto = await this.produtoDaoService.getById(this.metadata.produto.id, [
      "produtoProcessoCadeiaValor.cadeiaValorProcesso.cadeiaValor.unidade", 
      "produtoProduto.produtoRelacionado.unidade",
      "responsavel", 
      "unidade", 
      "produtoCliente.cliente.tipoCliente", 
      "produtoSolucoes.solucao"
    ]);
    this.loading = false;
  }

   public formatDate(date: Date|null): string {
    if(date == null) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


}
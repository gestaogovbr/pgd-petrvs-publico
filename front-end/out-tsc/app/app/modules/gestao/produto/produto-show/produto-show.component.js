import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { PageBase } from "src/app/modules/base/page-base";
let ProdutoShowComponent = class ProdutoShowComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.produtoDaoService = injector.get(ProdutoDaoService);
        this.loading = true;
    }
    ngOnInit() {
        super.ngOnInit();
        this.carregaProdutoDetalhado();
    }
    async carregaProdutoDetalhado() {
        this.produto = await this.produtoDaoService.getById(this.urlParams.get("id") || '', [
            "produtoProcessoCadeiaValor.cadeiaValorProcesso.cadeiaValor.unidade",
            "produtoInsumos.produtoRelacionado.unidade",
            "produtoInsumos.unidade",
            "produtoInsumos.cliente",
            "produtoInsumos.cliente.tipoCliente:nome",
            "responsavel",
            "unidade",
            "produtoCliente.cliente.tipoCliente",
            "produtoSolucoes.solucao"
        ]);
        this.loading = false;
    }
    formatDate(date) {
        if (date == null)
            return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
};
ProdutoShowComponent = __decorate([
    Component({
        selector: 'produto-show',
        templateUrl: './produto-show.component.html',
        styleUrls: ['./produto-show.component.scss'],
        standalone: false
    })
], ProdutoShowComponent);
export { ProdutoShowComponent };
//# sourceMappingURL=produto-show.component.js.map
import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { PageBase } from "src/app/modules/base/page-base";
let SolucaoShowComponent = class SolucaoShowComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.solucaoDaoService = injector.get(SolucaoDaoService);
        this.loading = true;
    }
    ngOnInit() {
        super.ngOnInit();
        this.carregaSolucaoDetalhado();
    }
    async carregaSolucaoDetalhado() {
        this.solucao = await this.solucaoDaoService.getById(this.urlParams.get("id") || '', ["solucoesUnidades.unidade", "produtosSolucoes.produto", "produtosSolucoes.produto.unidade"]);
        this.loading = false;
    }
    ativo(status) {
        return status == 1;
    }
    get unidadesAtivas() {
        return this.solucao?.solucoes_unidades?.filter(x => x.status).map(y => y.unidade) || [];
    }
    isProdutoAtivo(produto) {
        return produto.data_ativado && !produto.data_desativado;
    }
};
SolucaoShowComponent = __decorate([
    Component({
        selector: 'solucao-show',
        templateUrl: './solucao-show.component.html',
        styleUrls: ['./solucao-show.component.scss'],
        standalone: false
    })
], SolucaoShowComponent);
export { SolucaoShowComponent };
//# sourceMappingURL=solucao-show.component.js.map
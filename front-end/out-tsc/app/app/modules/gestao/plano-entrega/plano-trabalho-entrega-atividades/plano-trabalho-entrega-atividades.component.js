import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
let PlanoTrabalhoEntregaAtividadesComponent = class PlanoTrabalhoEntregaAtividadesComponent extends PageFrameBase {
    set entregaId(value) {
        if (this._entregaId != value) {
            this._entregaId = value;
        }
    }
    get entregaId() {
        return this._entregaId;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.loader = false;
        this.AtividadeDao = injector.get(AtividadeDaoService);
        this.join = ['unidade', 'usuario', 'demandante', 'reacoes.usuario:id,nome,apelido'];
    }
    ngOnInit() {
        super.ngOnInit();
        this.loadData();
    }
    loadData() {
        this.loader = true;
        this.AtividadeDao.query({ where: [["plano_trabalho_entrega_id", "==", this._entregaId], ["unidades_subordinadas", "==", true]], join: this.join }).asPromise().then(response => {
            this.items = response;
        }).finally(() => {
            this.loader = false;
        });
    }
};
__decorate([
    ViewChild('listaAtividades', { static: false })
], PlanoTrabalhoEntregaAtividadesComponent.prototype, "listaAtividades", void 0);
__decorate([
    Input()
], PlanoTrabalhoEntregaAtividadesComponent.prototype, "entregaId", null);
PlanoTrabalhoEntregaAtividadesComponent = __decorate([
    Component({
        selector: 'plano-trabalho-entrega-atividades',
        templateUrl: './plano-trabalho-entrega-atividades.component.html',
        styleUrls: ['./plano-trabalho-entrega-atividades.component.scss'],
        standalone: false
    })
], PlanoTrabalhoEntregaAtividadesComponent);
export { PlanoTrabalhoEntregaAtividadesComponent };
//# sourceMappingURL=plano-trabalho-entrega-atividades.component.js.map
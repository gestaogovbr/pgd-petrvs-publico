import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { ModalidadePgdService } from 'src/app/services/modalidade-pgd.service';
let PlanoTrabalhoListAccordeonComponent = class PlanoTrabalhoListAccordeonComponent extends PageFrameBase {
    set arquivados(value) {
        if (this._arquivados != value) {
            this._arquivados = value;
            if (this.viewInit)
                this.loadData(this.entity, this.form);
        }
    }
    get arquivados() {
        return this._arquivados;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.selectedIndex = -1;
        this.planos = [];
        this._arquivados = false;
        this.dao = injector.get(PlanoTrabalhoDaoService);
        this.modalidadePgd = injector.get(ModalidadePgdService);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        (async () => {
            await this.loadData(this.entity, this.form);
        })();
    }
    async loadData(entity, form) {
        this.accordion.loading = true;
        try {
            let dados = await this.dao.getByUsuario(this.usuarioId, this.arquivados);
            let agora = (new Date()).getTime();
            let self = this;
            this.planos = dados.planos;
            for (var i = 0; i < this.planos.length; i++) {
                if (this.util.asTimestamp(this.planos[i].data_inicio) <= agora && agora <= this.util.asTimestamp(this.planos[i].data_fim) && ["ATIVO", "CONCLUIDO"].includes(this.planos[i].status)) {
                    this.selectedIndex = i;
                }
                this.planos[i].accordionDisabled = ['AGUARDANDO_ASSINATURA', 'INCLUIDO'].includes(this.planos[i].status);
            }
        }
        finally {
            this.accordion.loading = false;
            this.cdRef.detectChanges();
        }
    }
    getPlanoBadges(plano) {
        let result = [];
        let concluidos = plano.consolidacoes.filter(x => x.status == "CONCLUIDO");
        let avaliados = plano.consolidacoes.filter(x => x.status == "AVALIADO");
        if (concluidos.length) {
            const concluido = this.lookup.getLookup(this.lookup.CONSOLIDACAO_STATUS, "CONCLUIDO");
            result.push({
                icon: concluido?.icon,
                label: concluido?.value,
                color: concluido?.color,
                textValue: concluidos.length.toString()
            });
        }
        if (avaliados.length) {
            const avaliado = this.lookup.getLookup(this.lookup.CONSOLIDACAO_STATUS, "AVALIADO");
            result.push({
                icon: avaliado?.icon,
                label: avaliado?.value,
                color: avaliado?.color,
                textValue: avaliados.length.toString()
            });
        }
        if (JSON.stringify(plano._metadata?.badges) != this.JSON.stringify(result)) {
            plano._metadata = Object.assign(plano._metadata || {}, { badges: result });
        }
        return plano._metadata.badges;
    }
    planoTrabalhoStatus(planoTrabalho) {
        if (planoTrabalho.status === "ATIVO" &&
            !planoTrabalho.consolidacoes.find((consolidacao) => consolidacao.status !== "CONCLUIDO")) {
            return "CONCLUIDO";
        }
        return planoTrabalho.status;
    }
};
__decorate([
    ViewChild('accordion', { static: false })
], PlanoTrabalhoListAccordeonComponent.prototype, "accordion", void 0);
__decorate([
    Input()
], PlanoTrabalhoListAccordeonComponent.prototype, "usuarioId", void 0);
__decorate([
    Input()
], PlanoTrabalhoListAccordeonComponent.prototype, "arquivados", null);
PlanoTrabalhoListAccordeonComponent = __decorate([
    Component({
        selector: 'plano-trabalho-list-accordeon',
        templateUrl: './plano-trabalho-list-accordeon.component.html',
        styleUrls: ['./plano-trabalho-list-accordeon.component.scss'],
        standalone: false
    })
], PlanoTrabalhoListAccordeonComponent);
export { PlanoTrabalhoListAccordeonComponent };
//# sourceMappingURL=plano-trabalho-list-accordeon.component.js.map
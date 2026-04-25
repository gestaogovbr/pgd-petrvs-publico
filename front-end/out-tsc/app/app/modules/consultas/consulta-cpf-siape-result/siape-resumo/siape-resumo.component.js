import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let SiapeResumoComponent = class SiapeResumoComponent {
    constructor() {
        this.resumo = [];
    }
    ngOnInit() {
    }
    getStatusClass(status) {
        switch (status) {
            case 'sucesso': return 'success';
            case 'parcial': return 'warning';
            case 'erro': return 'danger';
            default: return 'secondary';
        }
    }
    getStatusIcon(status) {
        switch (status) {
            case 'sucesso': return 'bi bi-check-circle-fill';
            case 'parcial': return 'bi bi-exclamation-triangle-fill';
            case 'erro': return 'bi bi-x-circle-fill';
            default: return 'bi bi-info-circle-fill';
        }
    }
    getStatusLabel(status) {
        switch (status) {
            case 'sucesso': return 'Sucesso';
            case 'parcial': return 'Parcial';
            case 'erro': return 'Erro';
            default: return 'Desconhecido';
        }
    }
    isResumoUnidade(item) {
        return 'unidade_codigo' in item || 'unidade_existia' in item;
    }
    isResumoServidor(item) {
        return !this.isResumoUnidade(item);
    }
    unidadePaiLabel(item) {
        if (item.unidade_raiz) {
            return 'Unidade raiz';
        }
        if (item.unidade_pai_codigo || item.unidade_pai_sigla) {
            return [item.unidade_pai_codigo, item.unidade_pai_sigla].filter(Boolean).join(' - ');
        }
        return 'Não informada';
    }
};
__decorate([
    Input()
], SiapeResumoComponent.prototype, "resumo", void 0);
__decorate([
    Input()
], SiapeResumoComponent.prototype, "relatorio", void 0);
SiapeResumoComponent = __decorate([
    Component({
        selector: 'app-siape-resumo',
        templateUrl: './siape-resumo.component.html',
        styleUrls: ['./siape-resumo.component.scss'],
        standalone: false
    })
], SiapeResumoComponent);
export { SiapeResumoComponent };
//# sourceMappingURL=siape-resumo.component.js.map
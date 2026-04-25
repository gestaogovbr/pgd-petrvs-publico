import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
let AvaliarNotaBadgeComponent = class AvaliarNotaBadgeComponent {
    constructor() {
        this.align = "center";
        this.items = [];
        this.fakeControl = new FormControl();
        this._tipoAvaliacao = undefined;
    }
    set tipoAvaliacao(value) {
        if (this._tipoAvaliacao != value) {
            this._tipoAvaliacao = value;
            this.items = (this._tipoAvaliacao?.notas || []).map(x => Object.assign({}, {
                key: x.nota,
                value: x.nota,
                hint: x.descricao,
                icon: x.icone
            }));
            this.tipoAvaliacaoNota = (this._tipoAvaliacao?.notas || []).find(x => x.nota == this.nota);
        }
    }
    get tipoAvaliacao() {
        return this._tipoAvaliacao;
    }
    set nota(value) {
        if (value != this.fakeControl.value) {
            this.fakeControl.setValue(value);
            this.tipoAvaliacaoNota = (this._tipoAvaliacao?.notas || []).find(x => x.nota == this.nota);
        }
    }
    get nota() {
        return this.fakeControl.value;
    }
    get isQuantitativo() {
        return this.tipoAvaliacao?.tipo == "QUANTITATIVO";
    }
    get isQualitativo() {
        return this.tipoAvaliacao?.tipo == "QUALITATIVO";
    }
};
__decorate([
    Input()
], AvaliarNotaBadgeComponent.prototype, "align", void 0);
__decorate([
    Input()
], AvaliarNotaBadgeComponent.prototype, "tipoAvaliacao", null);
__decorate([
    Input()
], AvaliarNotaBadgeComponent.prototype, "nota", null);
AvaliarNotaBadgeComponent = __decorate([
    Component({
        selector: 'avaliar-nota-badge',
        templateUrl: './avaliar-nota-badge.component.html',
        styleUrls: ['./avaliar-nota-badge.component.scss'],
        standalone: false
    })
], AvaliarNotaBadgeComponent);
export { AvaliarNotaBadgeComponent };
//# sourceMappingURL=avaliar-nota-badge.component.js.map
import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
let PlanoEntregaValorMetaInputComponent = class PlanoEntregaValorMetaInputComponent {
    constructor() {
        this.class = 'form-group';
        this.icon = "";
        this.labelInfo = "";
        this._size = 0;
    }
    set size(size) {
        if (size != this._size) {
            this._size = size;
            this.class = this.class.replace(/\scol\-md\-[0-9]+/g, "") + " col-md-" + size;
        }
    }
    get size() {
        return this._size || 12;
    }
    checkTipoIndicador(tipos) {
        return tipos.includes(this.entrega?.tipo_indicador || "");
    }
    onValueChange(event) {
        if (this.change)
            this.change(this.control?.value, this.entrega);
    }
};
__decorate([
    HostBinding('class')
], PlanoEntregaValorMetaInputComponent.prototype, "class", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "entrega", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "icon", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "label", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "control", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "change", void 0);
__decorate([
    Input()
], PlanoEntregaValorMetaInputComponent.prototype, "size", null);
PlanoEntregaValorMetaInputComponent = __decorate([
    Component({
        selector: 'plano-entrega-valor-meta-input',
        templateUrl: './plano-entrega-valor-meta-input.component.html',
        styleUrls: ['./plano-entrega-valor-meta-input.component.scss'],
        standalone: false
    })
], PlanoEntregaValorMetaInputComponent);
export { PlanoEntregaValorMetaInputComponent };
//# sourceMappingURL=plano-entrega-valor-meta-input.component.js.map
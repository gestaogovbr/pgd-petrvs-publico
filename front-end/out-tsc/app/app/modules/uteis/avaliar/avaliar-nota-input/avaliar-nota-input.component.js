import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
let AvaliarNotaInputComponent = class AvaliarNotaInputComponent {
    constructor() {
        this.class = 'form-group';
        this.label = 'Qual nota?';
        this.items = [];
        this._size = 0;
        this._control = undefined;
        this._tipoAvaliacao = undefined;
    }
    set tipoAvaliacao(value) {
        if (this._tipoAvaliacao != value) {
            this._tipoAvaliacao = value;
            let notasOrdenadas = this._tipoAvaliacao?.notas;
            notasOrdenadas.sort((a, b) => b.sequencia - a.sequencia);
            this.items = (notasOrdenadas || []).map(x => Object.assign({}, {
                key: x.nota,
                value: x.nota,
                hint: x.descricao,
                icon: x.icone,
                color: x.cor
            }));
        }
    }
    get tipoAvaliacao() {
        return this._tipoAvaliacao;
    }
    set control(value) {
        if (this._control != value) {
            this._control = value;
            if (value) {
                value.valueChanges.subscribe(this.updateNota.bind(this));
                this.updateNota();
            }
        }
    }
    get control() {
        return this._control;
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
    get isQuantitativo() {
        return this.tipoAvaliacao?.tipo == "QUANTITATIVO";
    }
    get isQualitativo() {
        return this.tipoAvaliacao?.tipo == "QUALITATIVO";
    }
    updateNota() {
        this.nota = this.tipoAvaliacao?.notas.find(x => x.nota == this.control?.value);
    }
    onValueChange(event) {
        this.control?.updateValueAndValidity();
        if (this.change)
            this.change(this.control?.value);
    }
};
__decorate([
    HostBinding('class')
], AvaliarNotaInputComponent.prototype, "class", void 0);
__decorate([
    Input()
], AvaliarNotaInputComponent.prototype, "label", void 0);
__decorate([
    Input()
], AvaliarNotaInputComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], AvaliarNotaInputComponent.prototype, "change", void 0);
__decorate([
    Input()
], AvaliarNotaInputComponent.prototype, "tipoAvaliacao", null);
__decorate([
    Input()
], AvaliarNotaInputComponent.prototype, "control", null);
__decorate([
    Input()
], AvaliarNotaInputComponent.prototype, "size", null);
AvaliarNotaInputComponent = __decorate([
    Component({
        selector: 'avaliar-nota-input',
        templateUrl: './avaliar-nota-input.component.html',
        styleUrls: ['./avaliar-nota-input.component.scss'],
        standalone: false
    })
], AvaliarNotaInputComponent);
export { AvaliarNotaInputComponent };
//# sourceMappingURL=avaliar-nota-input.component.js.map
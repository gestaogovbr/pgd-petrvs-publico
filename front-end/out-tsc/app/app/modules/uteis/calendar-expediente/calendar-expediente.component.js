import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Expediente } from 'src/app/models/expediente.model';
let CalendarExpedienteComponent = class CalendarExpedienteComponent {
    set disabled(value) {
        if (this._disabled != value) {
            this._disabled = value;
            this.loadExpediente();
        }
    }
    get disabled() {
        return this._disabled;
    }
    set control(value) {
        if (this._control != value) {
            this._control = value;
            this.expediente = this.control?.value;
            value?.valueChanges.subscribe(async (newValue) => {
                this.expediente = newValue;
            });
        }
    }
    get control() {
        return this._control;
    }
    set expediente(value) {
        if (this._expediente != value) {
            this._expediente = value;
            this.loadExpediente();
        }
    }
    get expediente() {
        return this._expediente;
    }
    constructor(fh, cdRef, util) {
        this.fh = fh;
        this.cdRef = cdRef;
        this.util = util;
        this.diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
        this.validate = (control, controlName) => {
            let result = null;
            for (let dia of this.diasSemana) {
                if (controlName.startsWith(dia) && controlName.endsWith("_fim") && control?.value?.length) {
                    let inicio = this.form?.controls[dia + "_inicio"]?.value;
                    if (!this.util.isTimeValid(inicio) || !this.util.isTimeValid(control.value) || (this.util.getStrTimeHours(inicio) > this.util.getStrTimeHours(control.value))) {
                        return "Inválido";
                    }
                }
            }
            return result;
        };
        this.form = fh.FormBuilder({
            domingo: { default: [] },
            segunda: { default: [] },
            terca: { default: [] },
            quarta: { default: [] },
            quinta: { default: [] },
            sexta: { default: [] },
            sabado: { default: [] },
            especial: { default: [] },
            domingo_inicio: { default: "" },
            domingo_fim: { default: "" },
            segunda_inicio: { default: "" },
            segunda_fim: { default: "" },
            terca_inicio: { default: "" },
            terca_fim: { default: "" },
            quarta_inicio: { default: "" },
            quarta_fim: { default: "" },
            quinta_inicio: { default: "" },
            quinta_fim: { default: "" },
            sexta_inicio: { default: "" },
            sexta_fim: { default: "" },
            sabado_inicio: { default: "" },
            sabado_fim: { default: "" },
            especial_inicio: { default: "" },
            especial_fim: { default: "" },
            especial_data: { default: null },
            especial_sem: { default: false }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
    }
    get isDisabled() {
        return this._disabled != undefined;
    }
    loadExpediente() {
        let expediente = (this.isDisabled ? this.expedienteDisabled : this._expediente) || new Expediente();
        const getLookupItems = (turnos, dia) => turnos.map(x => Object.assign({}, {
            key: this.util.textHash((dia == "especial" ? this.util.getDateFormatted(x.data) : "") + dia + x.inicio + x.fim),
            value: (dia == "especial" ? this.util.getDateFormatted(x.data) + " - " : "") + x.inicio + " até " + x.fim,
            data: {
                inicio: x.inicio,
                fim: x.fim,
                data: x.data,
                sem: x.sem
            }
        }));
        if (!this.isDisabled)
            this._expediente = expediente;
        this.form.controls.domingo.setValue(getLookupItems(expediente.domingo, "domingo"));
        this.form.controls.segunda.setValue(getLookupItems(expediente.segunda, "segunda"));
        this.form.controls.terca.setValue(getLookupItems(expediente.terca, "terca"));
        this.form.controls.quarta.setValue(getLookupItems(expediente.quarta, "quarta"));
        this.form.controls.quinta.setValue(getLookupItems(expediente.quinta, "quinta"));
        this.form.controls.sexta.setValue(getLookupItems(expediente.sexta, "sexta"));
        this.form.controls.sabado.setValue(getLookupItems(expediente.sabado, "sabado"));
        this.form.controls.especial.setValue(getLookupItems(expediente.especial, "especial"));
    }
    saveExpediente() {
        if (!this.isDisabled) {
            this._expediente = this._expediente || new Expediente();
            this._expediente.domingo = this.form.controls.domingo.value.map((x) => x.data);
            this._expediente.segunda = this.form.controls.segunda.value.map((x) => x.data);
            this._expediente.terca = this.form.controls.terca.value.map((x) => x.data);
            this._expediente.quarta = this.form.controls.quarta.value.map((x) => x.data);
            this._expediente.quinta = this.form.controls.quinta.value.map((x) => x.data);
            this._expediente.sexta = this.form.controls.sexta.value.map((x) => x.data);
            this._expediente.sabado = this.form.controls.sabado.value.map((x) => x.data);
            this._expediente.especial = this.form.controls.especial.value.map((x) => x.data);
            if (this.control) {
                this.control.setValue(this._expediente);
                this.cdRef.detectChanges();
            }
        }
    }
    isEmpty() {
        return false;
    }
    addItemHandleDomingo() {
        return this.addItemHandle("domingo");
    }
    addItemHandleSegunda() {
        return this.addItemHandle("segunda");
    }
    addItemHandleTerca() {
        return this.addItemHandle("terca");
    }
    addItemHandleQuarta() {
        return this.addItemHandle("quarta");
    }
    addItemHandleQuinta() {
        return this.addItemHandle("quinta");
    }
    addItemHandleSexta() {
        return this.addItemHandle("sexta");
    }
    addItemHandleSabado() {
        return this.addItemHandle("sabado");
    }
    addItemHandleEspecial() {
        return this.addItemHandle("especial");
    }
    onChange() {
        this.saveExpediente();
    }
    addItemHandle(dia) {
        let result = undefined;
        const inicio = this.form.controls[dia + "_inicio"].value;
        const fim = this.form.controls[dia + "_fim"].value;
        const data = this.form.controls.especial_data.value;
        const sem = this.form.controls.especial_sem.value;
        const key = this.util.textHash((dia == "especial" ? this.util.getDateFormatted(data) : "") + dia + inicio + fim);
        const array = this.form.controls[dia].value;
        if (this.util.isTimeValid(inicio) && this.util.isTimeValid(fim) && (this.util.getStrTimeHours(inicio) < this.util.getStrTimeHours(fim)) && (dia != "especial" || data) && this.util.validateLookupItem(this.form.controls[dia].value, key)) {
            result = {
                key: key,
                value: (dia == "especial" ? this.util.getDateFormatted(data) + " - " : "") + inicio + " até " + fim,
                data: {
                    inicio: inicio,
                    fim: fim,
                    data: data,
                    sem: sem
                }
            };
        }
        if (array.length > 0) {
            array.forEach((x) => {
                const inicioB = x.data.inicio;
                const fimB = x.data.fim;
                if ((inicio >= inicioB && fim <= inicioB) || (inicio <= inicioB && fim >= inicioB) || (inicio >= inicioB && fim <= inicioB) || (inicio <= inicioB && fim >= fimB) || (inicio >= inicioB && inicio <= fimB) || (fim >= inicioB && fim <= fimB) || (inicio == fimB) || (fim == inicioB)) {
                    console.log('Conflitante');
                    result = undefined;
                }
            });
        }
        this.form.controls[dia + "_inicio"].setValue("");
        this.form.controls[dia + "_fim"].setValue("");
        if (dia == "especial") {
            this.form.controls[dia + "_data"].setValue(null);
            this.form.controls[dia + "_sem"].setValue(false);
        }
        return result;
    }
    ;
};
__decorate([
    Input()
], CalendarExpedienteComponent.prototype, "expedienteDisabled", void 0);
__decorate([
    Input()
], CalendarExpedienteComponent.prototype, "disabled", null);
__decorate([
    Input()
], CalendarExpedienteComponent.prototype, "control", null);
__decorate([
    Input()
], CalendarExpedienteComponent.prototype, "expediente", null);
CalendarExpedienteComponent = __decorate([
    Component({
        selector: 'calendar-expediente',
        templateUrl: './calendar-expediente.component.html',
        styleUrls: ['./calendar-expediente.component.scss'],
        standalone: false
    })
], CalendarExpedienteComponent);
export { CalendarExpedienteComponent };
//# sourceMappingURL=calendar-expediente.component.js.map
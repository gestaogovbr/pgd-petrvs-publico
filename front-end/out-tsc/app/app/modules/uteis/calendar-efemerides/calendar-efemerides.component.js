import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let CalendarEfemeridesComponent = class CalendarEfemeridesComponent {
    constructor(util, lookup) {
        this.util = util;
        this.lookup = lookup;
        this.partial = true;
        this._expediente = [];
    }
    ngOnInit() {
    }
    get forma() {
        return this.efemerides ? this.lookup.getValue(this.lookup.DIA_HORA_CORRIDOS_OU_UTEIS, this.efemerides.forma) : "Desconhecido";
    }
    get expediente() {
        let a = this.efemerides?.expediente;
        let expediente = this.lookup.DIA_SEMANA.map(x => this.efemerides?.expediente[x.code]?.length ? x.value + ": " + this.efemerides.expediente[x.code].map((y) => y.inicio + " até " + y.fim).join(", ") : "").filter(x => x.length);
        if (this.efemerides?.expediente?.especial?.length)
            expediente.push("Especial: " + this.efemerides.expediente.especial.map((y) => this.util.getDateFormatted(y.data) + " - " + y.inicio + " até " + y.fim + (y.sem ? " (Sem expediente)" : "")).join(", "));
        if (JSON.stringify(this._expediente) != JSON.stringify(expediente))
            this._expediente = expediente;
        return this._expediente;
    }
    get useDias() {
        return ["DIAS_UTEIS", "DIAS_CORRIDOS"].includes(this.efemerides.forma);
    }
    get useCorridos() {
        return ["DIAS_CORRIDOS", "HORAS_CORRIDAS"].includes(this.efemerides.forma);
    }
    isoToFormatted(iso) {
        return iso.substr(8, 2) + "/" + iso.substr(5, 2) + "/" + iso.substr(0, 4);
    }
    get feriados() {
        return Object.entries(this.efemerides?.feriados || {}).map(x => [this.isoToFormatted(x[0]), x[1]]);
    }
    get diasNaoUteis() {
        return Object.entries(this.efemerides?.diasNaoUteis || {}).map(x => [this.isoToFormatted(x[0]), x[1]]);
    }
    data(timestamp) {
        return new Date(timestamp);
    }
    totalHoras(intervalos) {
        return +(intervalos.reduce((a, v) => a + this.util.getHoursBetween(v.start, v.end), 0)).toFixed(2);
    }
};
__decorate([
    Input()
], CalendarEfemeridesComponent.prototype, "efemerides", void 0);
__decorate([
    Input()
], CalendarEfemeridesComponent.prototype, "partial", void 0);
CalendarEfemeridesComponent = __decorate([
    Component({
        selector: 'calendar-efemerides',
        templateUrl: './calendar-efemerides.component.html',
        styleUrls: ['./calendar-efemerides.component.scss'],
        standalone: false
    })
], CalendarEfemeridesComponent);
export { CalendarEfemeridesComponent };
//# sourceMappingURL=calendar-efemerides.component.js.map
import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { CadeiaValorDaoService } from 'src/app/dao/cadeia-valor-dao.service';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
export class NeastedProcesso extends CadeiaValorProcesso {
    constructor(data) {
        super();
        this.children = [];
        this.cor = "#010101";
        this.level = "";
        this.initialization(data);
    }
}
let CadeiaValorMapaComponent = class CadeiaValorMapaComponent extends PageFrameBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.cadeiasValor = [];
        this.processos = [];
        this.validate = (control, controlName) => {
            return null;
        };
        this.dao = injector.get(CadeiaValorDaoService);
        this.join = ['processos'];
        this.title = this.lex.translate('Cadeias de Valores');
        this.form = this.fh.FormBuilder({
            cadeia_valor_id: { default: null },
            nome: { default: "" }
        }, this.cdRef, this.validate);
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.loadData(this.entity);
    }
    async loadData(entity, form) {
        this.query = this.dao.query({ where: [["data_arquivamento", "==", null]], orderBy: [["data_inicio", "desc"]], join: this.join });
        this.query.asPromise().then(cadeiasValor => {
            let cadeiaValorId = this.form.controls.cadeia_valor_id.value;
            this.form.controls.cadeia_valor_id.setValue(null);
            this.cadeiasValor = cadeiasValor.map(x => Object.assign({}, {
                key: x.id,
                value: x.nome,
                data: x
            }));
            this.cdRef.detectChanges();
            this.form.controls.cadeia_valor_id.setValue(cadeiaValorId || (this.cadeiasValor.length ? this.cadeiasValor[0].key : null));
        });
    }
    onCadeiaValorChange() {
        const recursiveProcesso = (level, processos) => processos.sort((a, b) => a.sequencia - b.sequencia).map(x => Object.assign(new NeastedProcesso({
            children: recursiveProcesso(level + x.sequencia + '.', this.cadeiaValor.processos.filter(y => y.processo_pai_id == x.id)),
            level: level + x.sequencia,
            cor: this.lookup.CORES_BACKGROUND[Math.floor(Math.random() * this.lookup.CORES_BACKGROUND.length)].color
        }), x));
        this.cadeiaValor = this.cadeiaValorInstitucional?.selectedItem?.data;
        if (this.cadeiaValor)
            this.processos = recursiveProcesso("", this.cadeiaValor.processos.filter(x => !x.processo_pai_id));
    }
    async refreshCadeiaValor() {
        await this.loadData(this.entity, this.form);
    }
};
__decorate([
    ViewChild('cadeiaValorInstitucional', { static: false })
], CadeiaValorMapaComponent.prototype, "cadeiaValorInstitucional", void 0);
CadeiaValorMapaComponent = __decorate([
    Component({
        selector: 'cadeia-valor-mapa',
        templateUrl: './cadeia-valor-mapa.component.html',
        styleUrls: ['./cadeia-valor-mapa.component.scss'],
        standalone: false
    })
], CadeiaValorMapaComponent);
export { CadeiaValorMapaComponent };
//# sourceMappingURL=cadeia-valor-mapa.component.js.map
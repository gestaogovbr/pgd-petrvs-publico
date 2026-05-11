import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { AtividadeListBase } from '../atividade-list-base';
import { GridComponent } from 'src/app/components/grid/grid.component';
let AtividadeDashboardComponent = class AtividadeDashboardComponent extends AtividadeListBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.validate = (control, controlName) => {
            let result = null;
            /*if(controlName == 'programa_id' && !control.value?.length) {
              result = "Obrigatório";
            }*/
            return result;
        };
        /* Inicializações */
        //this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
        this.title = this.lex.translate("Atividades");
        this.code = "MOD_DMD";
        this.fh = this.injector.get(FormHelperService);
        this.cdRef = injector.get(ChangeDetectorRef);
        this.filter = this.fh.FormBuilder({
            programa_id: { default: "" },
            unidadesSubordinadas: { default: false }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], AtividadeDashboardComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('programa', { static: false })
], AtividadeDashboardComponent.prototype, "programa", void 0);
__decorate([
    ViewChild('unidadesSubordinadas', { static: false })
], AtividadeDashboardComponent.prototype, "unidadesSubordinadas", void 0);
__decorate([
    Input()
], AtividadeDashboardComponent.prototype, "snapshot", void 0);
__decorate([
    Input()
], AtividadeDashboardComponent.prototype, "fixedFilter", void 0);
AtividadeDashboardComponent = __decorate([
    Component({
        selector: 'atividade-dashboard',
        templateUrl: './atividade-dashboard.component.html',
        styleUrls: ['./atividade-dashboard.component.scss'],
        standalone: false
    })
], AtividadeDashboardComponent);
export { AtividadeDashboardComponent };
//# sourceMappingURL=atividade-dashboard.component.js.map
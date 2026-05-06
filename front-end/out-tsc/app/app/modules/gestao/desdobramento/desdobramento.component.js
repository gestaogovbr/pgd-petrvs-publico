import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { PageBase } from '../../base/page-base';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
let DesdobramentoComponent = class DesdobramentoComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.typeObject = '';
        this.idObject = '';
        this.data = [
            {
                label: 'F.C Barcelona',
                expanded: true,
                children: [
                    {
                        label: 'Argentina',
                        expanded: true,
                        styleClass: 'bg-success text-white',
                        children: [
                            {
                                label: 'Argentina'
                            },
                            {
                                label: 'France'
                            }
                        ]
                    },
                    {
                        label: 'France',
                        expanded: true,
                        children: [
                            {
                                label: 'France'
                            },
                            {
                                label: 'Morocco'
                            }
                        ]
                    }
                ]
            }
        ];
        this.programaDao = injector.get(ProgramaDaoService);
    }
    ngOnInit() {
        super.ngOnInit();
        this.typeObject = this.urlParams?.get('type') || "";
        this.idObject = this.urlParams?.get('id') || "";
        switch (this.typeObject) {
            case 'programa':
                this.carregaPrograma();
                break;
            default:
                break;
        }
    }
    carregaPrograma() {
        this.programaDao.getById(this.idObject);
    }
};
DesdobramentoComponent = __decorate([
    Component({
        selector: 'app-desdobramento',
        templateUrl: './desdobramento.component.html',
        styleUrls: ['./desdobramento.component.scss'],
        standalone: false
    })
], DesdobramentoComponent);
export { DesdobramentoComponent };
//# sourceMappingURL=desdobramento.component.js.map
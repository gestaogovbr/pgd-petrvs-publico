import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UnidadeMergeComponent } from './unidade-merge/unidade-merge.component';
import { UteisModule } from '../../uteis/uteis.module';
import { UnidadeIntegranteComponent } from './unidade-integrante/unidade-integrante.component';
import { UnidadeListGridComponent } from './unidade-list-grid/unidade-list-grid.component';
import { UnidadeListMapComponent } from './unidade-list-map/unidade-list-map.component';
let UnidadeModule = class UnidadeModule {
};
UnidadeModule = __decorate([
    NgModule({
        declarations: [
            UnidadeFormComponent,
            UnidadeListComponent,
            UnidadeMergeComponent,
            UnidadeIntegranteComponent,
            UnidadeListGridComponent,
            UnidadeListMapComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            UteisModule,
            ReactiveFormsModule,
            UnidadeRoutingModule
        ]
    })
], UnidadeModule);
export { UnidadeModule };
//# sourceMappingURL=unidade.module.js.map
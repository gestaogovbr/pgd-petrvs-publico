import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RotinaRoutingModule } from './rotina-routing.module';
import { IntegracaoFormComponent } from './integracao/integracao-form/integracao-form.component';
import { IntegracaoListComponent } from './integracao/integracao-list/integracao-list.component';
let RotinaModule = class RotinaModule {
};
RotinaModule = __decorate([
    NgModule({
        declarations: [
            IntegracaoFormComponent,
            IntegracaoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            RotinaRoutingModule
        ]
    })
], RotinaModule);
export { RotinaModule };
//# sourceMappingURL=rotina.module.js.map
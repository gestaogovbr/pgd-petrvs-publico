import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntregaRoutingModule } from './entrega-routing.module';
import { EntregaFormComponent } from './entrega-form/entrega-form.component';
import { EntregaListComponent } from './entrega-list/entrega-list.component';
let EntregaModule = class EntregaModule {
};
EntregaModule = __decorate([
    NgModule({
        declarations: [
            EntregaFormComponent,
            EntregaListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            EntregaRoutingModule
        ]
    })
], EntregaModule);
export { EntregaModule };
//# sourceMappingURL=entrega.module.js.map
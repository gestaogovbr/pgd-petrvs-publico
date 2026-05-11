import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoProcessoRoutingModule } from './tipo-processo-routing.module';
import { TipoProcessoFormComponent } from './tipo-processo-form/tipo-processo-form.component';
import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let TipoProcessoModule = class TipoProcessoModule {
};
TipoProcessoModule = __decorate([
    NgModule({
        declarations: [
            TipoProcessoFormComponent,
            TipoProcessoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TipoProcessoRoutingModule
        ]
    })
], TipoProcessoModule);
export { TipoProcessoModule };
//# sourceMappingURL=tipo-processo.module.js.map
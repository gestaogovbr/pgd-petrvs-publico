import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfastamentoRoutingModule } from './afastamento-routing.module';
import { AfastamentoFormComponent } from './afastamento-form/afastamento-form.component';
import { AfastamentoListComponent } from './afastamento-list/afastamento-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let AfastamentoModule = class AfastamentoModule {
};
AfastamentoModule = __decorate([
    NgModule({
        declarations: [
            AfastamentoFormComponent,
            AfastamentoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            AfastamentoRoutingModule
        ]
    })
], AfastamentoModule);
export { AfastamentoModule };
//# sourceMappingURL=afastamento.module.js.map
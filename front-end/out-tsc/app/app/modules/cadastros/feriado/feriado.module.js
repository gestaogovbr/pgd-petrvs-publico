import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeriadoRoutingModule } from './feriado-routing.module';
import { FeriadoFormComponent } from './feriado-form/feriado-form.component';
import { FeriadoListComponent } from './feriado-list/feriado-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let FeriadoModule = class FeriadoModule {
};
FeriadoModule = __decorate([
    NgModule({
        declarations: [
            FeriadoFormComponent,
            FeriadoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            FeriadoRoutingModule
        ]
    })
], FeriadoModule);
export { FeriadoModule };
//# sourceMappingURL=feriado.module.js.map
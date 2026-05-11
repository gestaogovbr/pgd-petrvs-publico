import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../uteis/uteis.module';
import { EnvioReiniciarFormComponent } from './reiniciar/envio-reiniciar-form/envio-reiniciar-form.component';
import { EnvioRoutingModule } from './envio-routing.module';
import { EnvioForcarComponent } from './forcar/envio-forcar/envio-forcar.component';
let EnvioModule = class EnvioModule {
};
EnvioModule = __decorate([
    NgModule({
        declarations: [
            EnvioReiniciarFormComponent,
            EnvioForcarComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            EnvioRoutingModule,
            UteisModule
        ]
    })
], EnvioModule);
export { EnvioModule };
//# sourceMappingURL=envio.module.js.map
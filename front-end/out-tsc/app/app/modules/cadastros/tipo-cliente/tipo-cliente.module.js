import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoClienteFormComponent } from './tipo-cliente-form/tipo-cliente-form.component';
import { TipoClienteListComponent } from './tipo-cliente-list/tipo-cliente-list.component';
import { TipoClienteRoutingModule } from './tipo-cliente-routing.module';
let TipoClienteModule = class TipoClienteModule {
};
TipoClienteModule = __decorate([
    NgModule({
        declarations: [
            TipoClienteFormComponent,
            TipoClienteListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TipoClienteRoutingModule
        ]
    })
], TipoClienteModule);
export { TipoClienteModule };
//# sourceMappingURL=tipo-cliente.module.js.map
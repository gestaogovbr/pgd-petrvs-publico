import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { TipoDocumentoFormComponent } from './tipo-documento-form/tipo-documento-form.component';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let TipoDocumentoModule = class TipoDocumentoModule {
};
TipoDocumentoModule = __decorate([
    NgModule({
        declarations: [
            TipoDocumentoFormComponent,
            TipoDocumentoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TipoDocumentoRoutingModule
        ]
    })
], TipoDocumentoModule);
export { TipoDocumentoModule };
//# sourceMappingURL=tipo-documento.module.js.map
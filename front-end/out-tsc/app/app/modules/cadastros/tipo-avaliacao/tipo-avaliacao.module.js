import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoAvaliacaoRoutingModule } from './tipo-avaliacao-routing.module';
import { TipoAvaliacaoFormComponent } from './tipo-avaliacao-form/tipo-avaliacao-form.component';
import { TipoAvaliacaoListComponent } from './tipo-avaliacao-list/tipo-avaliacao-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let TipoAvaliacaoModule = class TipoAvaliacaoModule {
};
TipoAvaliacaoModule = __decorate([
    NgModule({
        declarations: [
            TipoAvaliacaoFormComponent,
            TipoAvaliacaoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TipoAvaliacaoRoutingModule
        ]
    })
], TipoAvaliacaoModule);
export { TipoAvaliacaoModule };
//# sourceMappingURL=tipo-avaliacao.module.js.map
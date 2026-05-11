import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoAtividadeRoutingModule } from './tipo-atividade-routing.module';
import { TipoAtividadeFormComponent } from './tipo-atividade-form/tipo-atividade-form.component';
import { TipoAtividadeListComponent } from './tipo-atividade-list/tipo-atividade-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let TipoAtividadeModule = class TipoAtividadeModule {
};
TipoAtividadeModule = __decorate([
    NgModule({
        declarations: [
            TipoAtividadeFormComponent,
            TipoAtividadeListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TipoAtividadeRoutingModule
        ]
    })
], TipoAtividadeModule);
export { TipoAtividadeModule };
//# sourceMappingURL=tipo-atividade.module.js.map
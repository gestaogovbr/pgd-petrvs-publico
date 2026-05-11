import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTarefaRoutingModule } from './tipo-tarefa-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoTarefaFormComponent } from './tipo-tarefa-form/tipo-tarefa-form.component';
import { TipoTarefaListComponent } from './tipo-tarefa-list/tipo-tarefa-list.component';
let TipoTarefaModule = class TipoTarefaModule {
};
TipoTarefaModule = __decorate([
    NgModule({
        declarations: [
            TipoTarefaFormComponent,
            TipoTarefaListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TipoTarefaRoutingModule
        ]
    })
], TipoTarefaModule);
export { TipoTarefaModule };
//# sourceMappingURL=tipo-tarefa.module.js.map
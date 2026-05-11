import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramaRoutingModule } from './programa-routing.module';
import { ProgramaFormComponent } from './programa-form/programa-form.component';
import { ProgramaListComponent } from './programa-list/programa-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramaParticipantesComponent } from './programa-participantes/programa-participantes.component';
import { PedagioFormComponent } from './pedagio-form/pedagio-form.component';
let ProgramaModule = class ProgramaModule {
};
ProgramaModule = __decorate([
    NgModule({
        declarations: [
            ProgramaFormComponent,
            ProgramaListComponent,
            ProgramaParticipantesComponent,
            PedagioFormComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            ProgramaRoutingModule
        ]
    })
], ProgramaModule);
export { ProgramaModule };
//# sourceMappingURL=programa.module.js.map
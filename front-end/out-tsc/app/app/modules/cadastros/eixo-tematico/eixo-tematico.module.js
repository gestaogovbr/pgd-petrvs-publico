import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EixoTematicoRoutingModule } from './eixo-tematico-routing.module';
import { EixoTematicoFormComponent } from './eixo-tematico-form/eixo-tematico-form.component';
import { EixoTematicoListComponent } from './eixo-tematico-list/eixo-tematico-list.component';
let EixoTematicoModule = class EixoTematicoModule {
};
EixoTematicoModule = __decorate([
    NgModule({
        declarations: [
            EixoTematicoFormComponent,
            EixoTematicoListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            EixoTematicoRoutingModule
        ]
    })
], EixoTematicoModule);
export { EixoTematicoModule };
//# sourceMappingURL=eixo-tematico.module.js.map
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioIntegranteComponent } from './usuario-integrante/usuario-integrante.component';
let UsuarioModule = class UsuarioModule {
};
UsuarioModule = __decorate([
    NgModule({
        declarations: [
            UsuarioListComponent,
            UsuarioFormComponent,
            UsuarioIntegranteComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            UsuarioRoutingModule
        ]
    })
], UsuarioModule);
export { UsuarioModule };
//# sourceMappingURL=usuario.module.js.map
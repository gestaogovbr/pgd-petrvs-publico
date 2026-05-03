import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiapeRoutingModule } from './siape-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
let SiapeModule = class SiapeModule {
};
SiapeModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            SiapeRoutingModule
        ]
    })
], SiapeModule);
export { SiapeModule };
//# sourceMappingURL=siape.module.js.map
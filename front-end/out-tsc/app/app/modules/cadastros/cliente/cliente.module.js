import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";
import { ClienteFormComponent } from "./cliente-form/cliente-form.component";
import { ClienteRoutingModule } from "./cliente-rounting.module";
let ClienteModule = class ClienteModule {
};
ClienteModule = __decorate([
    NgModule({
        declarations: [
            ClienteListComponent,
            ClienteFormComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            ClienteRoutingModule
        ]
    })
], ClienteModule);
export { ClienteModule };
//# sourceMappingURL=cliente.module.js.map
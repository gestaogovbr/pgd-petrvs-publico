import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlacklistUnidadeListComponent } from './blacklist-unidade-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
const routes = [
    {
        path: '',
        component: BlacklistUnidadeListComponent,
        canActivate: [AuthGuard],
        resolve: { config: ConfigResolver },
        runGuardsAndResolvers: 'always',
        data: {
            title: 'Blacklist de Unidades SIAPE',
            modal: false
        }
    }
];
let BlacklistUnidadeListModule = class BlacklistUnidadeListModule {
};
BlacklistUnidadeListModule = __decorate([
    NgModule({
        declarations: [
            BlacklistUnidadeListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ]
    })
], BlacklistUnidadeListModule);
export { BlacklistUnidadeListModule };
//# sourceMappingURL=blacklist-unidade-list.module.js.map
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlacklistServidorListComponent } from './blacklist-servidor-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
const routes = [
    {
        path: '',
        component: BlacklistServidorListComponent,
        canActivate: [AuthGuard],
        resolve: { config: ConfigResolver },
        runGuardsAndResolvers: 'always',
        data: {
            title: "Blacklist de Servidores SIAPE",
            modal: false
        }
    }
];
let BlacklistServidorListModule = class BlacklistServidorListModule {
};
BlacklistServidorListModule = __decorate([
    NgModule({
        declarations: [
            BlacklistServidorListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ]
    })
], BlacklistServidorListModule);
export { BlacklistServidorListModule };
//# sourceMappingURL=blacklist-servidor-list.module.js.map
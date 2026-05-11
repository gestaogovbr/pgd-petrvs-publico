import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
const routes = [
    {
        path: 'blacklist-servidor',
        loadChildren: () => import('./blacklist-servidor-list/blacklist-servidor-list.module').then(m => m.BlacklistServidorListModule)
    },
    {
        path: 'blacklist-unidade',
        loadChildren: () => import('./blacklist-unidade-list/blacklist-unidade-list.module').then(m => m.BlacklistUnidadeListModule)
    }
];
let SiapeRoutingModule = class SiapeRoutingModule {
};
SiapeRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], SiapeRoutingModule);
export { SiapeRoutingModule };
//# sourceMappingURL=siape-routing.module.js.map
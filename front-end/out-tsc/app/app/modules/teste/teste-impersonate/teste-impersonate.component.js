import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let TesteImpersonateComponent = class TesteImpersonateComponent extends PageListBase {
    constructor(injector) {
        super(injector, Usuario, UsuarioDaoService);
        this.injector = injector;
        this.filterWhere = (filter) => {
            let result = [];
            if (filter?.controls.usuario?.value?.length) {
                result.push(["nome", "like", "%" + filter?.controls.usuario?.value.trim().replace(" ", "%") + "%"]);
            }
            if (filter?.controls.unidade_id?.value?.length) {
                result.push(["lotacao", "==", filter?.controls.unidade_id.value]);
            }
            if (filter?.controls.perfil_id?.value?.length) {
                result.push(["perfil_id", "==", filter?.controls.perfil_id?.value]);
            }
            if (filter?.controls.atribuicoes?.value?.length) {
                result.push(["atribuicoes", "==", filter?.controls.atribuicoes?.value]);
            }
            return result;
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.perfilDao = injector.get(PerfilDaoService);
        /* Inicializações */
        this.title = this.lex.translate("Usuários");
        this.code = "MOD_CFG_USER";
        this.join = ["perfil:id,nome"];
        this.filter = this.fh.FormBuilder({
            usuario: { default: "" },
            unidade_id: { default: "" },
            perfil_id: { default: null },
            atribuicoes: { default: null }
        });
        this.addOption(this.OPTION_INFORMACOES, "MOD_USER");
        // this.addOption(this.OPTION_EXCLUIR, "MOD_USER_EXCL");       // Tratar de forma diferenciada a exclusão de usuário
    }
    dynamicOptions(row) {
        let result = [];
        // Testa se o usuário logado possui permissão para gerenciar as atribuições do usuário do grid
        if (this.auth.hasPermissionTo("MOD_USER_ATRIB"))
            result.push({ label: "Atribuições", icon: "bi bi-list-task", onClick: (usuario) => { this.go.navigate({ route: ['configuracoes', 'usuario', usuario.id, 'integrante'] }, { metadata: { entity: row } }); } });
        return result;
    }
    impersonate(user) {
        this.auth.impersonate(user);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], TesteImpersonateComponent.prototype, "grid", void 0);
TesteImpersonateComponent = __decorate([
    Component({
        selector: 'app-teste-impersonate',
        templateUrl: './teste-impersonate.component.html',
        styleUrls: ['./teste-impersonate.component.scss'],
        standalone: false
    })
], TesteImpersonateComponent);
export { TesteImpersonateComponent };
//# sourceMappingURL=teste-impersonate.component.js.map
import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Perfil } from 'src/app/models/perfil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
let UsuarioListComponent = class UsuarioListComponent extends PageListBase {
    constructor(injector) {
        super(injector, Usuario, UsuarioDaoService);
        this.injector = injector;
        this.onDeleteMessage = "Este usuário deixará de ter acesso ao sistema. Deseja confirmar a exclusão?";
        this.validateJustificativa = (control, controlName) => {
            let result = null;
            if (controlName == 'justificativa' && !control.value.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.filterWhere = (filter) => {
            let result = [];
            if (filter?.controls.usuario?.value?.length) {
                result.push(["nome", "like", "%" + filter?.controls.usuario?.value.trim().replace(" ", "%") + "%"]);
            }
            if (filter?.controls.unidade_id?.value?.length) {
                const operador = this.auth.hasPermissionTo("MOD_USER_LIST_ALL") ? "==" : "in";
                result.push(["lotacao", operador, filter?.controls.unidade_id.value]);
            }
            if (filter?.controls.perfil_id?.value?.length) {
                result.push(["perfil_id", "==", filter?.controls.perfil_id?.value]);
            }
            if (filter?.controls.atribuicoes?.value?.length) {
                result.push(["atribuicoes", "==", filter?.controls.atribuicoes?.value]);
            }
            if (filter?.controls.cpf?.value?.length) {
                result.push(["cpf", "==", filter?.controls.cpf?.value]);
            }
            return result;
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.perfilDao = injector.get(PerfilDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        /* Inicializações */
        this.title = this.lex.translate("Usuários");
        this.code = "MOD_CFG_USER";
        this.join = ["perfil:id,nome"];
        this.filter = this.fh.FormBuilder({
            usuario: { default: "" },
            cpf: { default: "" },
            unidade_id: { default: "" },
            perfil_id: { default: null },
            atribuicoes: { default: null }
        });
        this.justificativaForm = this.fh.FormBuilder({
            justificativa: { default: "" },
            usuario_id: { default: null }
        }, this.cdRef, this.validateJustificativa);
        this.addOption(this.OPTION_INFORMACOES, "MOD_USER");
        this.BOTAO_PEDAGIO = { label: "Tornar teletrabalho indisponível", icon: "bi bi-ban", color: "btn-outline-danger", onClick: (usuario) => {
                this.go.navigate({
                    route: ['gestao', 'programa', 'pedagio', usuario.id]
                }, {
                    metadata: { 'usuario': usuario },
                    modalClose: async (modalResult) => {
                        if (modalResult) {
                            this.refresh(modalResult.id);
                            this.cdRef.detectChanges();
                        }
                    }
                });
            } };
        this.BOTAO_REMOVE_PEDAGIO = { label: "Tornar teletrabalho disponível novamente", icon: "bi bi-check2-circle", color: "btn-outline-primary", onClick: this.removePedagio.bind(this) };
        this.addOption(this.OPTION_EXCLUIR, "MOD_USER_EXCL");
        if (!this.auth.hasPermissionTo("MOD_USER_LIST_ALL")) {
            this.filter.controls.unidade_id.setValue(this.auth.usuario?.areas_trabalho?.map(ui => ui.unidade_id));
        }
    }
    dynamicButtons(row) {
        let result = [];
        if (row.usuario_externo)
            return result;
        if (this.auth.hasPermissionTo('MOD_PART_PEDAGIO') && !row.pedagio)
            result.push(this.BOTAO_PEDAGIO);
        if (this.auth.hasPermissionTo('MOD_PART_PEDAGIO') && row.pedagio)
            result.push(this.BOTAO_REMOVE_PEDAGIO);
        return result;
    }
    dynamicOptions(row) {
        let result = [];
        if (row.situacao_siape == 'INATIVO' && this.auth.hasPermissionTo("MOD_USER_REATIVAR")) {
            result.push({ label: "Ativar temporariamente", icon: "bi bi-check2", onClick: (usuario) => { this.abrirFormAtivar(usuario); } });
        }
        if (row.perfil.nivel === Perfil.NIVEL.COLABORADOR && !!row.usuario_externo) {
            result.push(this.OPTION_EXCLUIR);
        }
        return result;
    }
    onCancel() {
        this.justificativaForm.reset();
    }
    abrirFormAtivar(usuario) {
        this.justificativaForm.controls.usuario_id.setValue(usuario.id);
        if (this.justificativaDialog) {
            this.dialog.template({ title: "Ativar temporariamente" }, this.justificativaDialog, [], null);
        }
    }
    onSubmit() {
        if (this.justificativaForm.valid) {
            this.dialog.confirm("Confirmação", "Ao confirmar, o usuário poderá realizar alterações no sistema durante 30 dias. Deseja continuar?").then((confirm) => {
                if (confirm) {
                    const ativo = this.usuarioDao.ativarTemporariamente(this.justificativaForm.controls.usuario_id.value, this.justificativaForm.controls.justificativa.value);
                    ativo.then(() => {
                        this.dialog.alert("Sucesso", "Usuário ativado temporariamente.");
                        this.justificativaForm.reset();
                        this.cdRef.detectChanges();
                    });
                    ativo.finally(() => {
                        this.dialog.closeAll();
                        this.refresh();
                    });
                }
            });
        }
    }
    async removePedagio(row) {
        this.dialog.confirm("Remover teletrabalho indisponível ?", "Deseja tornar a modalidade teletrabalho disponível para o participante " + row.nome.toUpperCase() + " ?").then(async (confirm) => {
            if (confirm) {
                await this.usuarioDao.removePedagio(row.id).then(resposta => {
                    (this.grid?.query || this.query).refreshId(row.id);
                    this.cdRef.detectChanges();
                }, error => {
                    this.dialog.alert("Erro", error);
                });
            }
        });
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], UsuarioListComponent.prototype, "grid", void 0);
__decorate([
    ViewChild("unidade", { static: false })
], UsuarioListComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild("justificativaDialog", { static: false })
], UsuarioListComponent.prototype, "justificativaDialog", void 0);
UsuarioListComponent = __decorate([
    Component({
        selector: 'app-usuario-list',
        templateUrl: './usuario-list.component.html',
        styleUrls: ['./usuario-list.component.scss'],
        standalone: false
    })
], UsuarioListComponent);
export { UsuarioListComponent };
//# sourceMappingURL=usuario-list.component.js.map
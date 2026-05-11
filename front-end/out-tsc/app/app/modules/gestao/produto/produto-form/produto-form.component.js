import { __decorate } from "tslib";
import { Component, ViewChild } from "@angular/core";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { Produto } from "src/app/models/produto.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
let ProdutoFormComponent = class ProdutoFormComponent extends PageFormBase {
    constructor(injector) {
        super(injector, Produto, ProdutoDaoService);
        this.injector = injector;
        this.campoDesabilitado = false;
        this.validate = (control, controlName) => {
            let result = null;
            return result;
        };
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.join = [
            "produtoProcessoCadeiaValor.cadeiaValorProcesso.cadeiaValor",
            "produtoInsumos.produtoRelacionado",
            "produtoInsumos.produtoRelacionado.unidade",
            "produtoInsumos.unidade",
            "produtoInsumos.cliente.tipoCliente:nome",
            "produtoCliente.cliente.tipoCliente:nome",
            "produtoSolucoes.solucao"
        ];
        this.form = this.fh.FormBuilder({
            nome: { default: "" },
            nome_fantasia: { default: "" },
            descricao: { default: "" },
            url: { default: "" },
            tipo: { default: "" },
            produto_processo_cadeia_valor: { default: [] },
            produto_insumos: { default: [] },
            produto_cliente: { default: [] },
            produto_solucoes: { default: [] },
            solucao: { default: [] },
        }, this.cdRef, this.validate);
    }
    async loadData(entity, form) {
        let formValue = Object.assign({}, form.value);
        await Promise.all([
            this.usuario?.loadSearch(entity.responsavel || entity.responsavel_id || this.auth.usuario.id)
        ]);
        this.campoDesabilitado = entity._metadata?.vinculoEntregas >= 1;
        form.patchValue(this.util.fillForm(formValue, entity));
    }
    async initializeData(form) {
        form.patchValue(new Produto());
        this.entity = new Produto();
        await this.loadData(this.entity, this.form);
    }
    saveData(form) {
        return new Promise((resolve, reject) => {
            const produto = this.util.fill(new Produto(), this.entity);
            resolve(this.util.fillForm(produto, this.form.value));
        });
    }
    onUsuarioSelect(selected) {
        let usuario = this.usuario?.selectedEntity;
        this.entity.responsavel_id = usuario.id;
        this.entity.responsavel = usuario;
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], ProdutoFormComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], ProdutoFormComponent.prototype, "unidade", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], ProdutoFormComponent.prototype, "usuario", void 0);
ProdutoFormComponent = __decorate([
    Component({
        selector: 'app-produto-form',
        templateUrl: './produto-form.component.html',
        styleUrls: ['./produto-form.component.scss'],
        standalone: false
    })
], ProdutoFormComponent);
export { ProdutoFormComponent };
//# sourceMappingURL=produto-form.component.js.map
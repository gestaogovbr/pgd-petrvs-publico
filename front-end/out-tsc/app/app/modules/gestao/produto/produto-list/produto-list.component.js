import { __decorate } from "tslib";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { Produto } from "src/app/models/produto.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { ProdutoService } from "src/app/services/produto.service";
let ProdutoListComponent = class ProdutoListComponent extends PageListBase {
    constructor(injector, dao) {
        super(injector, Produto, ProdutoDaoService);
        this.injector = injector;
        this.isUpdating = false;
        this.isChefe = false;
        this.isCurador = false;
        this.isSearching = false;
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            if (this.queryParams.excludeId) {
                result.push(["id", "!=", this.queryParams.excludeId]);
            }
            if (form.nome?.length) {
                result.push(["or", ["nome_fantasia", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
            }
            if (form.id?.length) {
                result.push(["identificador", "=", form.id]);
            }
            if (form.unidade_id?.length) {
                result.push(["unidade_id", "==", form.unidade_id]);
            }
            if (form.cliente_id?.length) {
                result.push(["produtos_do_cliente", "==", form.cliente_id]);
            }
            if (form.status && form.status == 'ativo') {
                result.push(["data_ativado", "!=", null]);
                result.push(["data_desativado", "==", null]);
            }
            if (form.status && form.status == 'inativo') {
                result.push(["data_ativado", "==", null]);
            }
            return result;
        };
        this.produtoService = injector.get(ProdutoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.title = this.lex.translate("Produtos e Serviços");
        this.filter = this.fh.FormBuilder({
            nome: { default: this.metadata?.nome ?? "" },
            unidade_id: { default: "" },
            cliente_id: { default: "" },
            id: { default: "" },
            status: { default: "" }
        });
        this.join = [
            "produtoProcessoCadeiaValor"
        ];
        this.orderBy = [['identificador', 'desc']];
        this.isChefe = this.auth.isUsuarioDeveloper() || this.auth.isGestorAlgumaAreaTrabalho(false);
        this.isCurador = this.auth.isUsuarioCurador();
        this.BOTAO_EXCLUIR = { label: "Excluir", icon: "bi bi-trash", onClick: this.delete.bind(this), color: 'btn-outline-danger' };
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.queryParams.unidade_id) {
            this.filter?.controls.unidade_id.setValue(this.queryParams.unidade_id);
            this.saveUsuarioConfig();
        }
        this.isSearching = (this.queryParams.mode == 'search') || (this.queryParams.mode == 'search-ativos');
        if (this.isSearching) {
            this.filter?.controls.status.setValue('ativo');
            this.saveUsuarioConfig();
        }
    }
    dynamicButtons(row) {
        let result = [];
        if (!row._status)
            result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });
        if (row._metadata?.vinculoEntregas == 0 && this.isChefe) {
            result.push(this.BOTAO_EXCLUIR);
        }
        return result;
    }
    dynamicOptions(row) {
        let result = [];
        return result;
    }
    async showDetalhes(produto) {
        this.go.navigate({ route: ['gestao', 'produto', produto.id, "show"] }, {
            metadata: {
                produto: produto
            }
        });
    }
    async ativarDesativar(produto) {
        if (this.isUpdating) {
            console.log("Aguarde o término do processo anterior");
            return;
        }
        this.isUpdating = true;
        let ativo = this.ativo(produto);
        produto.data_desativado = null;
        produto.data_ativado = null;
        ativo ? produto.data_desativado = new Date() : produto.data_ativado = new Date();
        let messageError = "";
        try {
            await this.dao?.update(produto.id, {
                id: produto.id,
                data_desativado: produto.data_desativado,
                data_ativado: produto.data_ativado
            });
        }
        catch (error) {
            if (error instanceof HttpErrorResponse) {
                messageError = error.error.message;
            }
            if (error.validationErrors) {
                let validationErrors = error.validationErrors;
                messageError = "";
                Object.keys(validationErrors).forEach((key) => {
                    const messages = validationErrors[key];
                    messages.forEach((message) => {
                        messageError += `${key}: ${message}\n`;
                    });
                });
            }
            messageError = messageError ? messageError : "Erro inesperado";
            this.dialog.alert("Erro ao ativar/inativar o produto", messageError, 'Fechar', 'fa fa-exclamation-triangle');
        }
        finally {
            this.isUpdating = false;
        }
    }
    onBuscaAvancada() {
        this.go.navigate({ route: ["gestao", "produto", "filter"] }, {
            metadata: {
                nome: this.filter?.controls.nome.value,
                id: this.filter?.controls.id.value,
                status: this.filter?.controls.status.value,
                unidade_id: this.filter?.controls.unidade_id.value,
                cliente_id: this.filter?.controls.cliente_id.value,
                enableStatus: (this.queryParams.mode != 'search-ativos')
            },
            modalClose: async (result) => {
                if (result && this.filter) {
                    this.filter?.controls.nome.setValue(result.nome);
                    this.filter?.controls.id.setValue(result.id);
                    this.filter?.controls.status.setValue(result.status);
                    this.filter?.controls.unidade_id.setValue(result.unidade_id);
                    this.filter?.controls.cliente_id.setValue(result.cliente_id);
                    this.grid.reloadFilter();
                }
            },
        });
    }
    onFilterClear() {
        this.filter?.reset();
        this.grid.reloadFilter();
        this.cdRef.markForCheck();
    }
    filtrosDefinidos() {
        return this.filter?.controls.nome.value?.length > 0 ||
            this.filter?.controls.id.value?.length > 0 ||
            this.filter?.controls.unidade_id.value?.length > 0 ||
            this.filter?.controls.cliente_id.value?.length > 0 ||
            this.filter?.controls.status.value?.length > 0;
    }
    ativo(produto) {
        return !produto.data_desativado && (produto.data_ativado != null);
    }
    confirm(title, message, onConfirm) {
        if (window.confirm(`${title}\n\n${message}`)) {
            onConfirm();
        }
    }
    async ativarTodos() {
        this.confirm("Ativar todos os Produtos e Serviços", "Deseja realmente ativar todos os Produtos e Serviços?", async () => {
            this.loading = true;
            try {
                await this.dao?.ativarTodos();
                this.grid.reloadFilter();
                this.cdRef.markForCheck();
            }
            catch (error) {
                console.error("Erro ao ativar Produtos/Serviços", error);
                this.error(error.error?.message || error.message || error);
            }
            finally {
                this.isUpdating = false;
                this.loading = false;
            }
        });
    }
    async desativarTodos() {
        this.confirm("Desativar todos os Produtos e Serviços", "Deseja realmente desativar todos os Produtos e Serviços?", async () => {
            this.loading = true;
            try {
                await this.dao?.desativarTodos();
                this.grid.reloadFilter();
                this.cdRef.markForCheck();
            }
            catch (error) {
                console.error("Erro ao desativar os Produtos/Serviços", error);
                this.error(error.error?.message || error.message || error);
            }
            finally {
                this.isUpdating = false;
                this.loading = false;
            }
        });
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], ProdutoListComponent.prototype, "grid", void 0);
ProdutoListComponent = __decorate([
    Component({
        selector: 'app-produto-list',
        templateUrl: './produto-list.component.html',
        styleUrls: ['./produto-list.component.scss'],
        standalone: false
    })
], ProdutoListComponent);
export { ProdutoListComponent };
//# sourceMappingURL=produto-list.component.js.map
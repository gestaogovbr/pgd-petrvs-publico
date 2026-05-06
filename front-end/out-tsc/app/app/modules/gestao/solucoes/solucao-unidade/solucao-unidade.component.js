import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { IntegranteService } from 'src/app/services/integrante.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
let SolucaoUnidadeComponent = class SolucaoUnidadeComponent extends PageFrameBase {
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.items = [];
        this.perfilUsuario = "";
        this.validate = (control, controlName) => {
            let result = null;
            if (["unidade_id", "perfil_id", "atribuicoes"].includes(controlName) && !control.value?.length) {
                result = "Obrigatório";
            }
            if (controlName == "unidade_id" && this.grid?.adding && this.items.map(i => i.id).includes(control.value))
                result = "O usuário já é integrante desta unidade. Edite-a, ao invés de incluí-la novamente!";
            return result;
        };
        this.formValidation = (form) => {
            let atribuicoes = form.controls.atribuicoes.value;
            if (this.util.array_diff(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], atribuicoes.map(na => na.key) || []).length < 2) {
                return "A um mesmo servidor só pode ser atribuída uma função de gestor (titular, substituto ou delegado), para uma mesma Unidade!";
            }
            return undefined;
        };
        this.integranteService = injector.get(IntegranteService);
        this.integranteDao = injector.get(UnidadeIntegranteDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.perfilDao = injector.get(PerfilDaoService);
        this.form = this.fh.FormBuilder({
            unidade_id: { default: "" },
            atribuicoes: { default: undefined },
            atribuicao: { default: "" },
        }, this.cdRef, this.validate);
        this.formPerfil = this.fh.FormBuilder({
            perfil_id: { default: "" }
        }, this.cdRef, this.validate);
        this.join = ["integracaoServidor"];
    }
    ngOnInit() {
        super.ngOnInit();
        this.entity = this.entity ?? this.metadata?.entity;
    }
    ngAfterViewInit() {
        (async () => {
            await this.loadData(this.entity || {}, this.form);
        })();
    }
    async loadData(entity, form) {
        if (entity.id) {
            let integrantes = [];
            try {
                await this.integranteDao.carregarIntegrantes("", entity.id).then(resposta => integrantes = resposta.integrantes.filter(x => x.atribuicoes?.length > 0));
            }
            finally {
                this.perfilUsuario = entity.perfil_id;
                this.formPerfil.controls.perfil_id.setValue(this.perfilUsuario);
                this.items = [];
                integrantes.forEach(i => this.items?.push(this.integranteService.completarIntegrante(i, i.id, entity.id, i.atribuicoes)));
                this.items = this.integranteService.ordenarIntegrantes(this.items);
                this.cdRef.detectChanges();
                this.grid.loading = false;
            }
        }
    }
    async salvarPerfil() {
        this.submitting = true;
        this.usuarioDao?.update(this.entity.id, { perfil_id: this.formPerfil.controls.perfil_id.value }, []).then(usuario => {
            this.perfilUsuario = usuario.perfil_id;
            this.submitting = false;
        });
    }
    addItemHandle() {
        let result = undefined;
        const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
        const key = this.form.controls.atribuicao.value;
        if (value?.length && this.util.validateLookupItem(this.form.controls.atribuicao.value, key)) {
            const icon = this.lookup.getIcon(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
            const color = this.lookup.getColor(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
            result = {
                key: key,
                value: value,
                icon: icon,
                color: color
            };
            this.form.controls.atribuicao.setValue("");
        }
        return result;
    }
    ;
    deleteItemHandle(row) {
        return row.key != "LOTADO";
    }
    ;
    /**
     * Método chamado na edição de uma atribuição do usuário
     * @param form
     * @param row
     */
    async carregarIntegrante(form, row) {
        form.controls.unidade_id.setValue(this.grid?.adding ? row.unidade_id : row.id);
        form.controls.atribuicoes.setValue(this.integranteService.converterAtribuicoes(row.atribuicoes));
        form.controls.atribuicao.setValue("");
    }
    /**
   * Método chamado para inserir uma atribuição no grid, seja este componente persistente ou não.
   * @returns
   */
    async adicionarIntegrante() {
        if (this.grid)
            this.grid.error = '';
        let novo = {
            id: this.integranteDao.generateUuid(),
            unidade_id: "",
            atribuicoes: []
        };
        return novo;
    }
    /**
     * Método chamado para a exclusão de uma atribuição do grid, seja este componente persistente ou não.
     * @param row
     * @returns
     */
    async removerIntegrante(row) {
        if (row.atribuicoes.includes("LOTADO")) {
            await this.dialog.alert("IMPOSSÍVEL EXCLUIR !", "O vínculo que inclui " + this.lex.translate('a lotação') + " " + this.lex.translate('do servidor') + " não pode ser excluído. Se deseja excluir as demais atribuições, edite o vínculo. Se deseja alterar " + this.lex.translate('a lotação') + ", lote-o em outra " + this.lex.translate('Unidade') + ".");
        }
        else {
            let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições de " + this.entity.nome.toUpperCase() + " " + this.lex.translate('na unidade') + " " + row.unidade_sigla?.toUpperCase() + " ?");
            if (confirm) {
                let msg;
                try {
                    if (!this.isNoPersist) { // se persistente
                        this.loading = true;
                        await this.integranteDao.salvarIntegrantes([this.integranteService.completarIntegrante(row, row.id, this.entity.id, [])]).then(resposta => {
                            if (msg = resposta.find(v => v._metadata.msg?.length)?._metadata.msg) {
                                if (this.grid)
                                    this.grid.error = msg;
                            }
                            ;
                        });
                        await this.loadData({ id: this.entity.id }, this.form);
                    }
                    else { // se não persistente
                        Object.assign(row, { '_status': "DELETE", 'atribuicoes': [] });
                        return false;
                    }
                }
                finally {
                    this.loading = false;
                }
            }
        }
        return false;
    }
    /**
     * Método chamado no salvamento de uma unidade-integrante (new/edit), seja este componente persistente ou não.
     * @param form
     * @param row
     * @returns
     */
    async salvarIntegrante(form, row) {
        let novasAtribuicoes = this.lookup.uniqueLookupItem(form.controls.atribuicoes.value);
        form.controls.atribuicoes.setValue(novasAtribuicoes);
        if (this.grid)
            this.grid.error = "";
        this.cdRef.detectChanges();
        let error = this.formValidation(form);
        if (!error) {
            let itensGrid = this.grid?.items || [];
            let confirm = true;
            let alteracaoGestor = this.integranteService.haAlteracaoGestor(novasAtribuicoes.map(x => x.key), Object.assign(row, { unidade_sigla: this.unidade?.selectedItem?.entity.sigla }), itensGrid, this.entity?.nome || this.parent?.form?.controls.nome.value || "");
            if (alteracaoGestor[0] != 'nenhuma') {
                confirm = await this.dialog.confirm("CONFIRMA A ALTERAÇÃO DA CHEFIA ?", alteracaoGestor[2]);
                if (confirm) {
                    switch (alteracaoGestor[0]) {
                        case 'ganho':
                            // Se for o caso, elimina a atribuição de LOTADO da antiga lotação
                            if (alteracaoGestor[3]) {
                                let indiceAntigaLotacao = this.grid?.items.findIndex(x => x.atribuicoes.includes('LOTADO'));
                                if (indiceAntigaLotacao)
                                    this.grid.items[indiceAntigaLotacao].atribuicoes = this.grid.items[indiceAntigaLotacao].atribuicoes.filter(x => x != 'LOTADO');
                            }
                            break;
                        case 'troca':
                            // Garante que a unidade da antiga gerência perderá as atribuições de GESTOR e LOTADO
                            this.grid.items[alteracaoGestor[1]].atribuicoes = this.grid.items[alteracaoGestor[1]].atribuicoes.filter(x => !['GESTOR', 'LOTADO'].includes(x));
                            break;
                    }
                    // Insere a atribuição de LOTADO na nova gerência, apenas para fins de atualização da tela do usuário, pois o back-end já faria isso automaticamente.
                    novasAtribuicoes = this.integranteService.inserirAtribuicao(novasAtribuicoes, 'LOTADO');
                    form.controls.atribuicoes.setValue(novasAtribuicoes);
                    this.loading = true;
                }
                else
                    return undefined;
            }
            else {
                let alteracaoLotacao = this.integranteService.haAlteracaoLotacao(form, Object.assign(row, { unidade_sigla: this.unidade?.selectedItem?.entity.sigla }), itensGrid, this.entity?.nome || "");
                if (alteracaoLotacao[0]) {
                    if (this.grid?.items[alteracaoLotacao[1]].atribuicoes.includes('GESTOR')) {
                        await this.dialog.alert("IMPOSSÍVEL ALTERAR A LOTAÇÃO !", alteracaoLotacao[3]);
                        return undefined;
                    }
                    else {
                        confirm = await this.dialog.confirm("CONFIRMA A ALTERAÇÃO DA LOTAÇÃO ?", alteracaoLotacao[2]);
                        if (confirm)
                            this.grid.items[alteracaoLotacao[1]].atribuicoes = this.grid.items[alteracaoLotacao[1]].atribuicoes.filter(x => x != 'LOTADO');
                        else
                            return undefined;
                    }
                }
            }
            try {
                if (!this.isNoPersist) { // se persistente
                    await this.integranteDao.salvarIntegrantes([this.integranteService.completarIntegrante(row, form.controls.unidade_id.value, this.entity.id, novasAtribuicoes.map(x => x.key))]).then(resposta => {
                        let msg;
                        if (msg = resposta?.find(v => v._metadata.msg?.length)?._metadata.msg)
                            this.dialog.alert('ATENÇÃO: ERRO!', msg);
                    });
                    await this.loadData({ id: this.entity.id }, this.form);
                    if (this.grid)
                        this.grid.error = "";
                }
                else { // se não persistente
                    row.id = this.unidade?.selectedEntity.id,
                        this.grid.items = this.integranteService.substituirItem({
                            id: row.id,
                            itens: this.grid?.items || [],
                            apelidoOuSigla: this.unidade?.selectedItem?.entity.sigla,
                            nome: this.unidade?.selectedItem?.entity.nome,
                            codigo: this.unidade?.selectedItem?.entity.codigo
                        }, novasAtribuicoes.map((x) => x.key), new Usuario(this.entity));
                    this.cdRef.detectChanges();
                }
            }
            catch (error) {
                if (this.grid)
                    this.grid.error = error;
                await this.loadData({ id: this.entity.id }, this.form);
            }
            finally {
                this.loading = false;
            }
        }
        else {
            await this.dialog.alert("IMPOSSÍVEL INCLUIR/ALTERAR A UNIDADE !", error);
        }
        return undefined;
    }
    isNoButtons() {
        return this.isNoPersist ? 'true' : (this.formPerfil.controls.perfil_id.value == this.perfilUsuario ? 'true' : undefined);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], SolucaoUnidadeComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('unidade', { static: false })
], SolucaoUnidadeComponent.prototype, "unidade", void 0);
__decorate([
    Input()
], SolucaoUnidadeComponent.prototype, "control", null);
__decorate([
    Input()
], SolucaoUnidadeComponent.prototype, "entity", null);
__decorate([
    Input()
], SolucaoUnidadeComponent.prototype, "noPersist", null);
__decorate([
    Input()
], SolucaoUnidadeComponent.prototype, "parent", void 0);
SolucaoUnidadeComponent = __decorate([
    Component({
        selector: 'solucao-unidade',
        templateUrl: './solucao-unidade.component.html',
        styleUrls: ['./solucao-unidade.component.scss'],
        standalone: false
    })
], SolucaoUnidadeComponent);
export { SolucaoUnidadeComponent };
//# sourceMappingURL=solucao-unidade.component.js.map
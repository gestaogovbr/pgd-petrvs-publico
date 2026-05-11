import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Unidade } from 'src/app/models/unidade.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { IntegranteService } from 'src/app/services/integrante.service';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
let UnidadeIntegranteComponent = class UnidadeIntegranteComponent extends PageFrameBase {
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
        this.perfis = []; //
        this.tiposAtribuicao = [];
        this.tiposAtribuicaoPermitidos = [];
        this.validate = (control, controlName) => {
            let result = null;
            if (["usuario_id", "atribuicoes"].includes(controlName) && !control.value?.length)
                result = "Obrigatório";
            if ((controlName == "usuario_id") && this.grid?.adding && this.items.map(i => i.id).includes(control.value))
                result = "O usuário já é integrante desta unidade. Edite-o, ao invés de incluí-lo novamente!";
            return result;
        };
        this.asyncFormValidation = async (form) => {
            let error = this.formValidation(form);
            if (error) {
                return error;
            }
            let atribuicoes = form.controls.atribuicoes.value;
            let usuario = await this.usuarioDao.getById(form.controls.usuario_id.value);
            let perfil = await this.perfilDao.getById(form.controls.perfil_id.value);
            let isUnidadeExecutora = this.entity?.executora;
            let perfilColaborador = perfil?.nivel == 6;
            if (usuario && !perfilColaborador && !isUnidadeExecutora
                && (atribuicoes.map(x => x.key) || []).includes('COLABORADOR')) {
                return "Não é possível atribuir Colaborador a um usuário com perfil diferente de Colaborador em unidade não executora.";
            }
            return undefined;
        };
        this.formValidation = (form) => {
            let atribuicoes = form.controls.atribuicoes.value;
            if (this.util.array_diff(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], atribuicoes.map(x => x.key) || []).length < 2) {
                return "A um mesmo servidor só pode ser atribuída uma função de gestor (titular, substituto ou delegado), para uma mesma Unidade!";
            }
            return undefined;
        };
        this.integranteService = injector.get(IntegranteService);
        this.integranteDao = injector.get(UnidadeIntegranteDaoService);
        this.usuarioDao = injector.get(UsuarioDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.perfilDao = injector.get(PerfilDaoService);
        this.form = this.fh.FormBuilder({
            usuario_id: { default: "" },
            atribuicoes: { default: undefined },
            atribuicao: { default: "" },
            perfil_id: { default: null }
        }, this.cdRef, this.validate);
    }
    ngOnInit() {
        super.ngOnInit();
        this.entity = this.metadata?.unidade;
        if (this.entity) {
            this.tiposAtribuicaoPermitidos = this.lookup.UNIDADE_INTEGRANTE_TIPO;
            if (!this.entity?.instituidora) {
                this.tiposAtribuicao = this.tiposAtribuicaoPermitidos.filter(atribuicao => atribuicao.key !== 'CURADOR');
            }
            this.tiposAtribuicao = this.lookup.ordenarLookupItem(this.tiposAtribuicao);
        }
    }
    ngAfterViewInit() {
        (async () => {
            await this.loadData(this.entity, this.form);
        })();
    }
    /**
     * Método chamado na inicialização do componente para carregar todos os integrantes da unidade.
     * @param entity
     * @param form
     */
    async loadData(entity, form) {
        if (entity.id) {
            let integrantes = [];
            let usuarioIds = [];
            this.loading = true;
            try {
                await this.integranteDao.carregarIntegrantes(entity.id, "").then(resposta => integrantes = resposta.integrantes.filter(x => x.atribuicoes?.length > 0));
                integrantes.forEach(integrante => usuarioIds.push(integrante.id));
                this.perfis = await this.usuarioDao.query({ where: [["id", "in", usuarioIds]] }).asPromise();
            }
            finally {
                this.loading = false;
                this.items = [];
                integrantes.forEach(i => this.items?.push(this.integranteService.completarIntegrante(i, entity.id, i.id, i.atribuicoes)));
                this.items = this.integranteService.ordenarIntegrantes(this.items);
                this.cdRef.detectChanges();
                this.grid.loading = false;
            }
        }
    }
    getPerfil(id) {
        let perfil = this.perfis.find(p => p.id == id);
        return perfil?.perfil?.nome;
    }
    disablePerfilItemUnidade(row, item) {
        const nivelLogado = this.auth.usuario?.perfil?.nivel ?? 6;
        const nivelItem = item?.data?.nivel ?? undefined;
        if (typeof nivelItem === 'number') {
            return nivelItem < nivelLogado;
        }
        return false;
    }
    desabilitaSelectPerfilUnidade(row) {
        const nivelLogado = this.auth.usuario?.perfil?.nivel ?? 6;
        const usuarioEditando = this.perfis.find(p => p.id === row.id);
        const nivelEditando = usuarioEditando?.perfil?.nivel;
        if (typeof nivelEditando === 'number') {
            return nivelEditando < nivelLogado;
        }
        return false;
    }
    addItemHandle() {
        let result = undefined;
        const value = this.lookup.getValue(this.lookup.UNIDADE_INTEGRANTE_TIPO, this.form.controls.atribuicao.value);
        const key = this.form.controls.atribuicao.value;
        if (value?.length && this.util.validateLookupItem(this.form.controls.atribuicoes.value, key)) {
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
    /**
     * Garante que não será possível excluir atribuições que possam gerar inconsistências
     * @param row Atribuição do servidor na unidade
     * @returns
     */
    deleteItemHandle(row) {
        return this.integranteService.ehPermitidoApagar(row.key);
    }
    ;
    /**
     * Método chamado na edição de um integrante da Unidade.
     * @param form
     * @param row
     */
    async carregarIntegrante(form, row) {
        let usuario = this.perfis.find(p => p.id == row.id);
        form.controls.usuario_id.setValue(this.grid?.adding ? row.usuario_id : row.id);
        form.controls.perfil_id.setValue(usuario?.perfil_id);
        this.tiposAtribuicao = this.tiposAtribuicaoPermitidos;
        if (usuario?.usuario_externo) {
            this.tiposAtribuicao = this.tiposAtribuicao.filter((x) => x.key != 'GESTOR_SUBSTITUTO');
        }
        let isUnidadeExecutora = this.entity?.executora;
        if (usuario && usuario?.perfil?.nivel !== 6 && !isUnidadeExecutora) {
            this.tiposAtribuicao = this.tiposAtribuicao.filter((x) => x.key != 'COLABORADOR');
        }
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
            usuario_id: "",
            atribuicoes: []
        };
        return novo;
    }
    /**
     * Método chamado para a exclusão de um integrante do grid, seja este componente persistente ou não.
     * @param row
     * @returns
     */
    async removerIntegrante(row) {
        if (row.atribuicoes[0].includes("LOTADO")) {
            await this.dialog.alert("IMPOSSÍVEL EXCLUIR !", "O vínculo que inclui " + this.lex.translate('a lotação') + " " + this.lex.translate('do servidor') + " não pode ser excluído. Se desejar excluir as demais atribuições, edite o vínculo. Se deseja alterar " + this.lex.translate('a lotação') + ", lote-o em outra " + this.lex.translate('Unidade') + ".");
        }
        else {
            let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir todas as atribuições " + this.lex.translate('do servidor') + row.usuario_nome?.toUpperCase() + " " + this.lex.translate('na unidade') + " " + this.entity.sigla.toUpperCase() + " ?");
            if (confirm) {
                let msg;
                try {
                    if (!this.isNoPersist) { // se persistente
                        this.loading = true;
                        await this.integranteDao.salvarIntegrantes([this.integranteService.completarIntegrante(row, this.entity.id, row.id, [])]).then(resposta => {
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
     * Método chamado no salvamento de um usuário-integrante (new/edit), seja este componente persistente ou não.
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
        let error = await this.asyncFormValidation(form);
        if (!error) {
            let confirm = true;
            let alteracaoGestor = this.integranteService.haAlteracaoGerencia(novasAtribuicoes.map(x => x.key), Object.assign(row, { usuario_nome: this.usuario?.selectedItem?.entity.nome }), this.grid?.items || [], this.entity?.sigla || "");
            if (alteracaoGestor[0] != 'nenhuma') {
                confirm = await this.dialog.confirm("CONFIRMA A ALTERAÇÃO DA CHEFIA ?", alteracaoGestor[2]);
                if (confirm) {
                    switch (alteracaoGestor[0]) {
                        case 'troca':
                            // Garante que o outro usuário, ex-chefe da unidade, perderá a atribuição de GESTOR
                            this.grid.items[alteracaoGestor[1]].atribuicoes = this.grid.items[alteracaoGestor[1]].atribuicoes.filter(x => !['GESTOR'].includes(x));
                            break;
                    }
                    // Insere a atribuição de LOTADO para o novo Gerente, apenas para fins de atualização da tela, pois o back-end já fará isso automaticamente.
                    novasAtribuicoes = this.integranteService.inserirAtribuicao(novasAtribuicoes, 'LOTADO');
                    form.controls.atribuicoes.setValue(novasAtribuicoes);
                    this.loading = true;
                }
                else
                    return undefined;
            }
            try {
                if (!this.isNoPersist) { // se persistente
                    await this.integranteDao.salvarIntegrantes([Object.assign({ _metadata: { perfil_id: form.controls.perfil_id.value } }, this.integranteService.completarIntegrante(row, this.entity.id, form.controls.usuario_id.value, novasAtribuicoes.map(x => x.key)))]).then(resposta => {
                        let msg;
                        if (msg = resposta?.find(v => v._metadata.msg?.length)?._metadata.msg)
                            this.dialog.alert('ATENÇÃO: ERRO!', msg);
                    });
                    await this.loadData({ id: this.entity.id }, this.form);
                    if (this.grid)
                        this.grid.error = "";
                }
                else { // se não persistente
                    row.id = this.usuario?.selectedEntity.id;
                    this.grid.items = this.integranteService.substituirItem({
                        id: row.id,
                        itens: this.grid?.items || [],
                        apelidoOuSigla: this.usuario?.selectedItem?.entity.apelido,
                        nome: this.usuario?.selectedItem?.entity.nome,
                        codigo: ""
                    }, novasAtribuicoes.map((x) => x.key), new Unidade(this.entity));
                }
                this.cdRef.detectChanges();
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
            await this.dialog.alert("Impossível incluir/alterar o servidor!", error);
        }
        return undefined;
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], UnidadeIntegranteComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('usuario', { static: false })
], UnidadeIntegranteComponent.prototype, "usuario", void 0);
__decorate([
    Input()
], UnidadeIntegranteComponent.prototype, "control", null);
__decorate([
    Input()
], UnidadeIntegranteComponent.prototype, "entity", null);
__decorate([
    Input()
], UnidadeIntegranteComponent.prototype, "noPersist", null);
UnidadeIntegranteComponent = __decorate([
    Component({
        selector: 'unidade-integrante',
        templateUrl: './unidade-integrante.component.html',
        styleUrls: ['./unidade-integrante.component.scss'],
        standalone: false
    })
], UnidadeIntegranteComponent);
export { UnidadeIntegranteComponent };
//# sourceMappingURL=unidade-integrante.component.js.map
import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { PlanoEntregaEntregaDaoService } from 'src/app/dao/plano-entrega-entrega-dao.service';
import { PlanoEntregaEntrega } from 'src/app/models/plano-entrega-entrega.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PlanoEntregaService } from '../plano-entrega.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
let PlanoEntregaListEntregaComponent = class PlanoEntregaListEntregaComponent extends PageFrameBase {
    set noPersist(value) { super.noPersist = value; }
    get noPersist() { return super.noPersist; }
    set control(value) { super.control = value; }
    get control() { return super.control; }
    set entity(value) { super.entity = value; }
    get entity() { return super.entity; }
    set planejamentoId(value) {
        if (this._planejamentoId != value) {
            this._planejamentoId = value;
            // TODO: verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
            // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
        }
    }
    get planejamentoId() {
        return this._planejamentoId;
    }
    set cadeiaValorId(value) {
        if (this._cadeiaValorId != value) {
            this._cadeiaValorId = value;
            // TODO: verificar nas entregas quais objetivos não são desse planejamento e remove-los
            // será removido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
        }
    }
    get cadeiaValorId() {
        return this._cadeiaValorId;
    }
    set unidadeId(value) {
        if (this._unidadeId != value) {
            this._unidadeId = value;
            // TODO: verificar nas entregas quais objetivos não são desse planjemaneot e remove-los
            // será remvido somente da lista de itens (em memória), independente de persistente ou não, MAS NO BACKEND HAVERÀ ESSA VALIDAÇÂO!
        }
    }
    get unidadeId() {
        return this._unidadeId;
    }
    set dataFim(value) {
        if (this._dataFim != value) {
            this._dataFim = value;
        }
    }
    get dataFim() {
        return this._dataFim;
    }
    get items() {
        if (!this.gridControl.value)
            this.gridControl.setValue([]);
        return this.gridControl.value;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.disabled = false;
        this.execucao = false;
        this.entityToControl = (value) => value.entregas || [];
        this.options = [];
        this.planoEntregaId = "";
        this.etiquetas = [];
        this.etiquetasAscendentes = [];
        this.selectable = false;
        this.validate = (control, controlName) => {
            let result = null;
            if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
                result = "Obrigatório";
            }
            return result;
        };
        this.filterWhere = (filter) => {
            let result = [];
            let form = filter.value;
            result.push(["plano_entrega_id", "==", this.planoEntregaId]);
            return result;
        };
        this.title = this.lex.translate("Entregas");
        this.join = ["unidade", "entrega", "reacoes.usuario:id,nome,apelido", 'produtos'];
        this.code = "MOD_PENT";
        this.cdRef = injector.get(ChangeDetectorRef);
        this.dao = injector.get(PlanoEntregaEntregaDaoService);
        this.unidadeDao = injector.get(UnidadeDaoService);
        this.planoEntregaService = injector.get(PlanoEntregaService);
        this.form = this.fh.FormBuilder({
            descricao: { default: "" },
            data_inicio: { default: new Date() },
            data_fim: { default: new Date() },
            meta: { default: "" },
            realizado: { default: null },
            entrega_id: { default: null },
            unidade_id: { default: null },
            progresso_esperado: { default: null },
            progresso_realizado: { default: null },
            destinatario: { default: null },
            etiquetas: { default: [] },
        }, this.cdRef, this.validate);
        this.formEdit = this.fh.FormBuilder({
            progresso_realizado: { default: 0 },
            etiquetas: { default: [] },
            etiqueta: { default: null },
            meta: { default: 0 },
            realizado: { default: 0 }
        });
        // Testa se o usuário possui permissão para exibir dados da entrega do plano de entregas
        this.addOption(Object.assign({ onClick: this.consult.bind(this) }, this.OPTION_INFORMACOES), "MOD_PENT");
        this.addOption(Object.assign({ onClick: this.delete.bind(this) }, this.OPTION_EXCLUIR), "MOD_PENT_ENTR_EXCL");
        this.addOption(Object.assign({ onClick: this.showLogs.bind(this) }, this.OPTION_LOGS), "MOD_AUDIT_LOG");
    }
    ngOnInit() {
        super.ngOnInit();
        this.planoEntregaId = this.urlParams.get("id") || "";
    }
    get isDisabled() {
        return this.formDisabled || this.disabled;
    }
    async add() {
        let entrega = new PlanoEntregaEntrega({
            _status: "ADD",
            id: this.dao.generateUuid(),
            plano_entrega_id: this.entity?.id
        });
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega'] }, {
            metadata: {
                plano_entrega: this.entity,
                planejamento_id: this.planejamentoId,
                cadeia_valor_id: this.cadeiaValorId,
                unidade_id: this.unidadeId,
                data_fim: this.dataFim,
                entrega: entrega,
            },
            modalClose: async (modalResult) => {
                if (modalResult) {
                    try {
                        this.isNoPersist ? this.items.push(modalResult) : this.items.push(await this.dao.save(modalResult, this.join));
                        this.cdRef.detectChanges();
                    }
                    catch (error) {
                        this.error(error?.error || error?.message || error);
                    }
                }
                ;
            }
        });
    }
    dynamicOptions(row) {
        return !this.execucao && !this.isDisabled ? this.options : [];
    }
    dynamicButtons(row) {
        const btns = [];
        if (this.isDisabled)
            btns.push(Object.assign({ onClick: this.consult.bind(this) }, this.OPTION_INFORMACOES));
        if (this.execucao && this.entity && this.entity.status == "ATIVO") {
            btns.push({ label: this.lex.translate("Históricos de Execução"), icon: "bi bi-activity", color: 'btn-outline-info', onClick: this.showProgresso.bind(this) });
        }
        if (!row._status)
            btns.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });
        return btns;
    }
    async edit(entrega) {
        if (this.execucao) {
            this.grid.edit(entrega);
        }
        else {
            entrega._status = entrega._status == "ADD" ? "ADD" : "EDIT";
            let index = this.items.indexOf(entrega);
            this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega'] }, {
                metadata: {
                    plano_entrega: this.entity,
                    planejamento_id: this.planejamentoId,
                    cadeia_valor_id: this.cadeiaValorId,
                    unidade_id: this.unidadeId,
                    entrega: entrega,
                },
                modalClose: async (modalResult) => {
                    if (modalResult) {
                        if (!this.isNoPersist)
                            await this.dao?.save({ ...modalResult });
                        this.items[index] = modalResult;
                    }
                    ;
                }
            });
        }
    }
    async load(form, row) {
        this.form.patchValue(row);
        this.form.controls.meta.setValue(this.planoEntregaService.getValor(row.meta));
        this.form.controls.realizado.setValue(this.planoEntregaService.getValor(row.realizado));
        this.cdRef.detectChanges();
    }
    async save(form, row) {
        let result = undefined;
        this.form.markAllAsTouched();
        if (form.valid) {
            this.submitting = true;
            try {
                result = await this.dao?.update(row.id, {
                    realizado: this.planoEntregaService.getEntregaValor(row.entrega, form.controls.realizado.value),
                    progresso_realizado: form.controls.progresso_realizado.value
                }, this.join);
            }
            finally {
                this.submitting = false;
            }
        }
        return result;
    }
    async delete(entrega) {
        let confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        if (confirm) {
            let index = this.items.indexOf(entrega);
            if (this.isNoPersist) {
                if (entrega._status == "ADD") {
                    this.items.splice(index, 1);
                    this.cdRef.detectChanges();
                }
                else {
                    this.dao.validateDestroy(entrega).then(() => {
                        entrega._status = "DELETE";
                    }).catch((error) => {
                        this.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error));
                    });
                }
            }
            else {
                this.dao.delete(entrega).then(() => {
                    //this.grid!.query!.removeId(entrega.id);
                    this.items.splice(index, 1);
                    this.cdRef.detectChanges();
                    this.dialog.topAlert("Registro excluído com sucesso!", 5000);
                }).catch((error) => {
                    this.dialog.alert("Erro", "Erro ao excluir: " + (error?.message ? error?.message : error));
                });
                ;
            }
            ;
        }
    }
    async consult(entrega) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "consult"] }, {
            metadata: {
                plano_entrega: this.entity,
                planejamento_id: this.planejamentoId,
                cadeia_valor_id: this.cadeiaValorId,
                unidade_id: this.unidadeId,
                entrega: entrega
            }
        });
    }
    async showLogs(entrega) {
        this.go.navigate({ route: ['logs', 'change', entrega.id, 'consult'] });
    }
    async showPlanejamento(objetivo_id) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'objetivos', objetivo_id] }, { modal: true });
    }
    async showCadeiaValor(processo_id) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'processos', processo_id] }, { modal: true });
    }
    async showProgresso(entrega) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', 'progresso', entrega.id] }, {
            modal: true,
            modalClose: (modalResult) => {
                this.parent?.refresh(this.entity?.id);
            }
        });
    }
    async showDetalhes(entrega) {
        this.go.navigate({ route: ['gestao', 'plano-entrega', 'entrega', entrega.id, "detalhes"] }, {
            metadata: {
                plano_entrega: this.entity,
                planejamento_id: this.planejamentoId,
                cadeia_valor_id: this.cadeiaValorId,
                unidade_id: this.unidadeId,
                entrega: entrega
            }
        });
    }
    refreshComentarios(modalResult) {
        /* Atualiza os comentários após ser salvo pela própria tela de comentarios (persistent) */
        let row = this.items.find(x => x.id == modalResult.id);
        if (row)
            row.comentarios = modalResult.comentarios || [];
    }
    addItemHandleEtiquetas() {
        let result = undefined;
        if (this.etiqueta && this.etiqueta.selectedItem) {
            const item = this.etiqueta.selectedItem;
            const key = item.key?.length ? item.key : this.util.textHash(item.value);
            if (this.util.validateLookupItem(this.formEdit.controls.etiqueta.value, key)) {
                result = {
                    key: key,
                    value: item.value,
                    color: item.color,
                    icon: item.icon
                };
                this.formEdit.controls.etiqueta.setValue(null);
            }
        }
        return result;
    }
    ;
    async onColumnEtiquetasEdit(row) {
        if (!this.etiquetasAscendentes.filter(e => e.data == row.unidade.id).length) {
            let ascendentes = await this.carregaEtiquetasUnidadesAscendentes(row.unidade);
            this.etiquetasAscendentes.push(...ascendentes);
        }
        this.formEdit.controls.etiquetas.setValue(row.etiquetas);
        this.formEdit.controls.etiqueta.setValue(null);
        this.etiquetas = this.util.merge(row.tipo_atividade?.etiquetas, row.unidade?.etiquetas, (a, b) => a.key == b.key);
        this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
        this.etiquetas = this.util.merge(this.etiquetas, this.etiquetasAscendentes.filter(x => x.data == row.unidade.id), (a, b) => a.key == b.key);
    }
    async carregaEtiquetasUnidadesAscendentes(unidadeAtual) {
        let etiquetasUnidades = [];
        let path = unidadeAtual.path.split("/");
        let unidades = await this.unidadeDao.query({ where: [["id", "in", path]] }).asPromise();
        unidades.forEach(un => {
            etiquetasUnidades = this.util.merge(etiquetasUnidades, un.etiquetas, (a, b) => a.key == b.key);
        });
        etiquetasUnidades.forEach(e => e.data = unidadeAtual.id);
        return etiquetasUnidades;
    }
    async onColumnEtiquetasSave(row) {
        try {
            const saved = await this.dao.update(row.id, {
                etiquetas: this.formEdit.controls.etiquetas.value
            });
            row.etiquetas = this.formEdit.controls.etiquetas.value;
            return !!saved;
        }
        catch (error) {
            return false;
        }
    }
    onEtiquetaConfigClick() {
        this.go.navigate({ route: ["configuracoes", "preferencia", "usuario", this.auth.usuario.id], params: { etiquetas: true } }, {
            modal: true, modalClose: (modalResult) => {
                this.etiquetas = this.util.merge(this.etiquetas, this.auth.usuario.config?.etiquetas, (a, b) => a.key == b.key);
                this.cdRef.detectChanges();
            }
        });
    }
    async onColumnMetaEdit(row) {
        this.formEdit.controls.meta.setValue(this.planoEntregaService.getValor(row.meta));
        this.formEdit.controls.realizado.setValue(this.planoEntregaService.getValor(row.realizado));
    }
    async onColumnMetaSave(row) {
        try {
            let realizado = this.planoEntregaService.getEntregaValor(row.entrega, this.formEdit.controls.realizado.value);
            const valorMeta = this.formEdit?.controls.meta.value;
            const valorRealizado = this.formEdit?.controls.realizado.value;
            let totalRealizado = row.progresso_realizado;
            if (valorRealizado) {
                totalRealizado = !isNaN(valorRealizado) ? Math.min(((valorRealizado / valorMeta) * 100), 100).toFixed(0) || 0 : 0;
            }
            const saved = await this.dao.update(row.id, {
                realizado: realizado,
                progresso_realizado: totalRealizado,
                _monitor: false
            });
            row.realizado = realizado;
            if (valorMeta && valorRealizado)
                row.progresso_realizado = totalRealizado;
            return !!saved;
        }
        catch (error) {
            return false;
        }
    }
    async onColumnChecklistEdit(row) {
        this.formEdit.controls.progresso_realizado.setValue(row.progresso_realizado);
        this.checklist = this.util.clone(row.checklist);
    }
    async onColumnChecklistSave(row) {
        let realizado = Math.round(parseInt(this.planoEntregaService.getValorMeta(row)) * this.formEdit.controls.progresso_realizado.value / 100);
        try {
            const saved = await this.dao.update(row.id, {
                progresso_realizado: this.formEdit.controls.progresso_realizado.value,
                realizado: this.planoEntregaService.getEntregaValor(row.entrega, realizado),
                checklist: this.checklist
            });
            row.progresso_realizado = this.formEdit.controls.progresso_realizado.value;
            row.checklist = this.checklist;
            if (typeof row.realizado.porcentagem != "undefined") {
                row.realizado.porcentagem = realizado;
            }
            else if (typeof row.realizado.quantitativo != "undefined") {
                row.realizado.quantitativo = realizado;
            }
            else if (typeof row.realizado.valor != "undefined") {
                row.realizado.valor = realizado;
            }
            ;
            return !!saved;
        }
        catch (error) {
            return false;
        }
    }
    getObjetivos(row) {
        return row.objetivos.filter((x) => x._status != 'DELETE');
    }
    isMetaEditavel() {
        return this.execucao && this.entity?.status !== "CONCLUIDO";
    }
};
__decorate([
    ViewChild(EditableFormComponent, { static: false })
], PlanoEntregaListEntregaComponent.prototype, "editableForm", void 0);
__decorate([
    ViewChild(GridComponent, { static: false })
], PlanoEntregaListEntregaComponent.prototype, "grid", void 0);
__decorate([
    ViewChild('etiqueta', { static: false })
], PlanoEntregaListEntregaComponent.prototype, "etiqueta", void 0);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "cdRef", void 0);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "parent", void 0);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "noPersist", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "control", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "entity", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "planejamentoId", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "cadeiaValorId", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "unidadeId", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "dataFim", null);
__decorate([
    Input()
], PlanoEntregaListEntregaComponent.prototype, "execucao", void 0);
PlanoEntregaListEntregaComponent = __decorate([
    Component({
        selector: 'plano-entrega-list-entrega',
        templateUrl: './plano-entrega-list-entrega.component.html',
        styleUrls: ['./plano-entrega-list-entrega.component.scss'],
        standalone: false
    })
], PlanoEntregaListEntregaComponent);
export { PlanoEntregaListEntregaComponent };
//# sourceMappingURL=plano-entrega-list-entrega.component.js.map
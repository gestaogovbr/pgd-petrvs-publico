import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { AtividadeTarefaDaoService } from 'src/app/dao/atividade-tarefa-dao.service';
import { AtividadeTarefa } from 'src/app/models/atividade-tarefa.model';
import { PageBase } from 'src/app/modules/base/page-base';
import { AtividadeService } from '../atividade.service';
let AtividadeListTarefaComponent = class AtividadeListTarefaComponent extends PageBase {
    set atividade(value) {
        if (this._atividade != value) {
            this._atividade = value;
            if (this.isPersist && value?.tarefas) {
                this.control.setValue(value?.tarefas);
            }
        }
    }
    get atividade() {
        return this._atividade;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.control = new FormControl();
        this.disabled = false;
        this.editable = true;
        this.selectable = false;
        this.id_processo = 0;
        this.consolidacao = true; //
        this.canAdd = false;
        this.addComentarioButton = {
            icon: "bi bi-plus-circle",
            hint: "Incluir comentário"
        };
        this.editTarefa = async (row) => {
            this.go.navigate({ route: ['gestao', 'atividade', 'tarefa'] }, {
                metadata: { tarefa: row, atividade: this.atividade }, modalClose: (modalResult) => {
                    if (modalResult) {
                        (async () => {
                            const tarefas = this.control.value;
                            const index = tarefas.findIndex(x => x.id == row.id);
                            if (index >= 0) {
                                modalResult._status = modalResult._status == "ADD" ? "ADD" : "EDIT";
                                if (this.isPersist && this.atividade?.tarefas) {
                                    this.grid.error = undefined;
                                    try {
                                        this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                        modalResult = await this.dao.save(modalResult, this.join);
                                    }
                                    catch (error) {
                                        this.grid.error = error.message ? error.message : error;
                                        modalResult = undefined;
                                    }
                                    finally {
                                        this.dialog.closeSppinerOverlay();
                                    }
                                }
                                if (modalResult) {
                                    tarefas[index] = modalResult;
                                    this.control.setValue(tarefas);
                                }
                            }
                            this.cdRef.detectChanges();
                        })();
                    }
                }
            });
            return undefined;
        };
        this.dao = injector.get(AtividadeTarefaDaoService);
        this.atividadeService = injector.get(AtividadeService);
        this.formEdit = this.fh.FormBuilder({
            concluido: { default: false }
        });
        this.join = ["tipo_tarefa", "comentarios.usuario"];
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.atividade?.descricao != '')
            this.canAdd = true;
        if (this.queryParams?.id_processo) {
            this.id_processo = this.queryParams?.id_processo;
        }
        if (this.isPersist && this.atividade?.tarefas) {
            this.control.setValue(this.atividade?.tarefas);
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.id_processo) {
            this.loading = true;
            this.dao.query({ where: [["id_processo", "==", this.id_processo]] }).asPromise().then(tarefas => {
                this.control.setValue(tarefas || []);
                this.cdRef.detectChanges();
            }).finally(() => {
                this.loading = false;
            });
        }
    }
    get isPersist() {
        return this.persist != undefined;
    }
    async addTarefa() {
        const tarefa = new AtividadeTarefa();
        tarefa.id = this.dao.generateUuid();
        tarefa.usuario = this.auth.usuario;
        tarefa.usuario_id = this.auth.usuario.id;
        tarefa.atividade_id = this.atividade?.id || "";
        tarefa.comentarios = [];
        tarefa._status = "ADD";
        this.go.navigate({ route: ['gestao', 'atividade', 'tarefa'] }, {
            metadata: { tarefa: tarefa, atividade: this.atividade }, modalClose: (modalResult) => {
                if (modalResult) {
                    (async () => {
                        const tarefas = (this.control.value || []);
                        if (this.isPersist && this.atividade?.tarefas) {
                            this.grid.error = undefined;
                            try {
                                this.dialog.showSppinerOverlay("Salvando dados do formulário");
                                modalResult = await this.dao.save(modalResult, this.join);
                            }
                            catch (error) {
                                this.grid.error = error.message ? error.message : error;
                                modalResult = undefined;
                            }
                            finally {
                                this.dialog.closeSppinerOverlay();
                            }
                        }
                        if (modalResult) {
                            tarefas.push(modalResult);
                            this.control.setValue(tarefas);
                        }
                        this.cdRef.detectChanges();
                    })();
                }
            }
        });
        return undefined;
    }
    async deleteTarefa(row) {
        const confirm = await this.dialog.confirm("Exclui ?", "Deseja realmente excluir?");
        this.grid.error = undefined;
        if (confirm) {
            try {
                if ((this.isPersist && this.atividade?.tarefas) || row._status == "ADD") {
                    const tarefas = this.control.value;
                    const index = tarefas.findIndex(x => x.id == row.id);
                    if (this.isPersist && this.atividade?.tarefas)
                        await this.dao.delete(row);
                    if (index >= 0) {
                        tarefas.splice(index, 1);
                        this.control.setValue(tarefas);
                    }
                }
                else {
                    row._status = "DELETE";
                }
                this.dialog.alert("Sucesso", "Registro excluído com sucesso!");
                this.cdRef.detectChanges();
            }
            catch (error) {
                this.grid.error = error?.message ? error?.message : error;
            }
        }
    }
    /*public comentarioClick(element: HTMLSpanElement) {
      const value = element.getAttribute("data-expanded");
      element.setAttribute("data-expanded", value == "true" ? "false" : "true");
    }*/
    /*public addComentarioClick(row: any) {
      this.go.navigate({route: ['gestao', 'atividade', 'entrega', row.id, 'comentar']}, {modal: true, metadata: {entrega: row, atividade: this.atividade}, modalClose: this.addComentarioResult.bind(this)});
    }*/
    async onColumnConcluidoEdit(row) {
        this.formEdit.controls.concluido.setValue(!!row.data_conclusao);
    }
    async onColumnConcluidoSave(row) {
        try {
            const data_conclusao = this.formEdit.controls.concluido.value ? this.auth.hora : null; //&& !!row.data_conclusao 
            const saved = await this.dao.update(row.id, {
                data_conclusao: data_conclusao,
            });
            row.concluido = this.formEdit.controls.concluido.value;
            row.data_conclusao = row.concluido ? data_conclusao : null;
            return !!saved;
        }
        catch (error) {
            return false;
        }
    }
    addComentarioResult(modalResult) {
        if (modalResult) {
            if (this.isPersist) {
                this.dao.getById(modalResult.id, this.join).then(tarefa => {
                    if (tarefa) {
                        const tarefas = this.control.value || [];
                        const index = tarefas.findIndex((x) => x.id = tarefa.id);
                        if (index >= 0) {
                            tarefas[index] = tarefa;
                            this.control.setValue(tarefas);
                            this.cdRef.detectChanges();
                        }
                    }
                });
            }
            else {
                const changed = modalResult.comentarios.filter((x) => ["ADD", "EDIT", "DELETE"].includes(x._status || "")).length > 0;
                modalResult._status = changed && !["ADD", "EDIT", "DELETE"].includes(modalResult._status || "") ? "EDIT" : modalResult._status;
            }
        }
    }
    dynamicButtons(row) {
        let result = [];
        let tarefa = row;
        let lastConsolidacao = this.atividadeService.lastConsolidacao(this.atividade.metadados.consolidacoes);
        /* (RN_CSLD_12) Tarefas concluidas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, nem Remover conclusão.
           (RN_CSLD_13) Tarefas de atividades em consolidação CONCLUIDO ou AVALIADO não poderão mais ser alteradas/excluidas, somente a opção de Concluir ficará disponível. */
        if (!lastConsolidacao || lastConsolidacao.status == "INCLUIDO" || this.util.asTimestamp(lastConsolidacao.data_conclusao) < this.util.asTimestamp(tarefa.created_at)) {
            //result.push(Object.assign(this.grid!.BUTTON_EDIT, { onClick: this.editTarefa.bind(this) }));
            //result.push(Object.assign(this.grid!.BUTTON_DELETE, { onClick: this.deleteTarefa.bind(this) }));
            result.push({ label: "Alterar", icon: "bi bi-pencil-square", hint: "Alterar", color: "btn-outline-info", onClick: this.editTarefa.bind(this) });
            result.push({ label: "Excluir", icon: "bi bi-trash", hint: "Excluir", color: "btn-outline-danger", onClick: this.deleteTarefa.bind(this) });
        }
        return result;
    }
    canConcluidoEdit(row) {
        let tarefa = row;
        let lastConsolidacao = this.atividadeService.lastConsolidacao(this.atividade.metadados.consolidacoes);
        /* (RN_CSLD_12) e (RN_CSLD_13) */
        return !lastConsolidacao || lastConsolidacao.status == "INCLUIDO" || this.util.asTimestamp(lastConsolidacao.data_conclusao) < this.util.asTimestamp(tarefa.data_conclusao);
    }
};
__decorate([
    ViewChild(GridComponent, { static: false })
], AtividadeListTarefaComponent.prototype, "grid", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "control", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "persist", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "editable", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "selectable", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "id_processo", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "consolidacao", void 0);
__decorate([
    Input()
], AtividadeListTarefaComponent.prototype, "atividade", null);
AtividadeListTarefaComponent = __decorate([
    Component({
        selector: 'atividade-list-tarefa',
        templateUrl: './atividade-list-tarefa.component.html',
        styleUrls: ['./atividade-list-tarefa.component.scss'],
        standalone: false
    })
], AtividadeListTarefaComponent);
export { AtividadeListTarefaComponent };
//# sourceMappingURL=atividade-list-tarefa.component.js.map
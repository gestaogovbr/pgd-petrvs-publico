import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageBase } from './page-base';
import { NavigateResult } from 'src/app/services/navigate.service';
//@Component({ template: '' })
let PageFrameBase = class PageFrameBase extends PageBase {
    /* Dever ser sobrescrito utilizando o @Input() */
    set control(value) {
        if (this._control != value) {
            this._control = value;
        }
    }
    get control() {
        return this._control;
    }
    set entity(value) {
        if (this._entity != value) {
            this._entity = value;
            this.fakeControl.setValue(this.entityToControl(value));
            if (this.viewInit)
                this.loadData(value, this.form);
        }
    }
    get entity() {
        return this._entity;
    }
    set noPersist(value) {
        if (this._noPersist != value)
            this._noPersist = value;
    }
    get noPersist() {
        return this._noPersist;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.action = "";
        this._entity = undefined;
        this._noPersist = undefined;
        this._control = undefined;
        this.fakeControl = new FormControl();
        /* Configurações */
        this.join = [];
        this.entityToControl = (value) => value;
        this.error = (error) => {
            if (this.editableForm) {
                this.editableForm.error = error;
            }
            else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.dialog.topAlert(error);
            }
        };
        this.clearErros = () => {
            if (this.editableForm)
                this.editableForm.error = "";
        };
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.urlParams?.has("id")) {
            this.entity_id = this.urlParams.get("id");
            if (this.isNoPersist)
                this.entity = this.metadata?.entity;
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.onInitializeData();
        this.cdRef.detectChanges();
    }
    get isNew() {
        return this.action == "new";
    }
    get isNoPersist() {
        return this._noPersist != undefined || this.entity_id == "NOPERSIST";
    }
    get gridControl() {
        return this._control || this.fakeControl;
    }
    get formDisabled() {
        return this.action == "consult";
    }
    loadData(entity, form) {
        return;
    }
    initializeData(form) {
        return;
    }
    async saveData(form) {
        return true;
    }
    onInitializeData() {
        if (this.entity_id?.length && !this.isNoPersist) { /* entity possui ID e o componente é persistente (Janela autocontida) */
            (async () => {
                this.loading = true;
                try {
                    if (this.entity_id == "new" || this.isNew) {
                        await this.initializeData(this.form);
                    }
                    else {
                        this.entity = await this.dao?.getById(this.entity_id, this.join);
                        await this.loadData(this.entity, this.form);
                    }
                }
                catch (erro) {
                    this.error("Erro ao carregar dados: " + erro);
                }
                finally {
                    this.loading = false;
                }
            })();
        }
    }
    async onSaveData() {
        this.submitting = true;
        try {
            //
            let entity = await this.saveData(this.form.value);
            if (entity) {
                const modalResult = this.isNoPersist ? this.entity :
                    typeof entity == "boolean" ? entity :
                        entity instanceof NavigateResult ? entity.modalResult :
                            await this.dao?.update(this.entity.id, entity, this.join);
                if (this.modalRoute?.queryParams?.idroute?.length)
                    this.go.setModalResult(this.modalRoute?.queryParams?.idroute, modalResult);
                this.close();
            }
        }
        catch (erro) {
            this.error("Erro ao carregar dados: " + erro);
        }
        finally {
            this.submitting = false;
        }
    }
    onCancel() {
        this.close();
    }
    getControlByName(controlName) {
        return this.form.controls[controlName];
    }
};
PageFrameBase = __decorate([
    Injectable()
], PageFrameBase);
export { PageFrameBase };
//# sourceMappingURL=page-frame-base.js.map
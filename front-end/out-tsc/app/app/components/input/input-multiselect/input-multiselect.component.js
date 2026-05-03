import { __decorate } from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
import { InputSearchComponent } from '../input-search/input-search.component';
import { InputSelectComponent } from '../input-select/input-select.component';
let InputMultiselectComponent = class InputMultiselectComponent extends InputBase {
    set items(value) {
        this._items = value;
        this.control?.setValue(value);
        this.detectChanges();
    }
    //@Output() change = new EventEmitter<Event>();
    get items() {
        return this.control?.value || this._items || [];
    }
    set control(value) {
        this._control = value;
    }
    get control() {
        return this.getControl();
    }
    set size(value) {
        this.setSize(value);
    }
    get size() {
        return this.getSize();
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = 'form-group my-2';
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.value = "";
        this.loading = false;
        this.maxItemWidth = 150;
        this.maxListHeight = 0;
        this.multiselectStyle = "rows";
        this.canEdit = false;
        // Propriedades privadas e motodos get e set
        this.selectedItem = undefined;
    }
    ngOnInit() {
        super.ngOnInit();
        this.class = this.isNoBox ? this.class.replace(' my-2', '') : this.class;
    }
    async onEdit(item) {
        this.editing = item;
        if (this.loadItemHandle)
            await this.loadItemHandle(item);
        this.cdRef.detectChanges();
    }
    onDelete(item) {
        let before = item.data?._status;
        let canDelete = !this.deleteItemHandle || this.deleteItemHandle(item);
        if (canDelete)
            this.items.splice(this.items.findIndex(x => x.key == item.key), 1);
        this.cdRef.detectChanges();
        if (this.change && (canDelete || before != item.data?._status))
            this.change();
    }
    get isNoForm() {
        return this.noForm != undefined;
    }
    get isNoBox() {
        return this.noBox != undefined;
    }
    async onSaveItemClick() {
        let result = undefined;
        if (this.saveItemHandle) {
            result = await this.saveItemHandle(this.editing);
        }
        if (this.addItemControl) {
            if (this.addItemControl instanceof InputSearchComponent && this.addItemControl.selectedItem?.value) {
                const search = this.addItemControl;
                this.editing.key = search.selectedItem.value;
                this.editing.value = search.selectedItem.text;
                this.editing.data = search.selectedEntity;
                result = this.editing;
            }
            else if (this.addItemControl instanceof InputSelectComponent && this.addItemControl.selectedItem?.key) {
                const select = this.addItemControl;
                this.editing.key = select.selectedItem?.key;
                this.editing.value = select.selectedItem?.value || "";
                this.editing.data = select.selectedItem?.data;
                result = this.editing;
            }
        }
        if (result)
            this.endEdit();
        return result;
    }
    onCancelItemClick() {
        this.endEdit();
    }
    endEdit() {
        this.editing = undefined;
        if (this.clearItemForm) {
            this.clearItemForm();
        }
        else if (this.addItemControl) {
            this.addItemControl?.setValue("");
            this.addItemControl?.control?.setValue("");
        }
        this.cdRef.detectChanges();
    }
    async onAddItemClick() {
        let newItem = undefined;
        if (this.addItemHandle) {
            newItem = this.addItemHandle();
        }
        else if (this.addItemAsyncHandle) {
            newItem = await this.addItemAsyncHandle();
        }
        else if (this.addItemControl) {
            if (this.addItemControl instanceof InputSearchComponent && this.addItemControl.selectedItem?.value) {
                const search = this.addItemControl;
                newItem = {
                    key: search.selectedItem.value,
                    value: search.selectedItem.text,
                    data: this.addItemControl.selectedEntity
                };
            }
            else if (this.addItemControl instanceof InputSelectComponent && this.addItemControl.selectedItem?.key) {
                const select = this.addItemControl;
                newItem = Object.assign({}, select.items.find(x => x.key == select.selectedItem?.key));
            }
        }
        if (newItem) {
            if (!this._items)
                this._items = [];
            this.items.push(newItem);
            this.items = this.items;
            if (this.clearItemForm)
                this.clearItemForm();
            this.cdRef.detectChanges();
            if (this.change)
                this.change();
        }
    }
};
__decorate([
    HostBinding('class')
], InputMultiselectComponent.prototype, "class", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "noForm", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "noBox", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "maxItemWidth", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "maxListHeight", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "deleteItemHandle", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "loadItemHandle", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "saveItemHandle", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "addItemHandle", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "addItemAsyncHandle", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "clearItemForm", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "addItemControl", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "multiselectStyle", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "canEdit", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "items", null);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "control", null);
__decorate([
    Input()
], InputMultiselectComponent.prototype, "size", null);
InputMultiselectComponent = __decorate([
    Component({
        selector: 'input-multiselect',
        templateUrl: './input-multiselect.component.html',
        styleUrls: ['./input-multiselect.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputMultiselectComponent);
export { InputMultiselectComponent };
//# sourceMappingURL=input-multiselect.component.js.map
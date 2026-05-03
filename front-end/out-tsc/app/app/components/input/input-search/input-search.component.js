import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild, } from "@angular/core";
import { ControlContainer, FormGroupDirective, } from "@angular/forms";
import { Dropdown } from "bootstrap";
import { NavigateService } from "src/app/services/navigate.service";
import { UtilService } from "src/app/services/util.service";
import { InputBase } from "../input-base";
import { EntityService } from "src/app/services/entity.service";
//import * as bootstrap from 'bootstrap';
export class SearchGroupSeparator {
    constructor(groups) {
        this.groups = groups;
    }
    get text() {
        return this.groups.map((x) => x.value).join(" - ");
    }
}
let InputSearchComponent = class InputSearchComponent extends InputBase {
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
    set disabled(value) {
        if (value != this._disabled) {
            this._disabled = value;
            this.detectChanges();
            this.dropdown?.toString(); /* Força atualização do dropdown */
            if (this.selectedValue)
                this.selectItem(this.selectedValue, false, false);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set icon(value) {
        if (value != this._icon) {
            this._icon = value;
        }
    }
    get icon() {
        return typeof this._icon != "undefined"
            ? this._icon
            : (this.dao ? this.entities.getIcon(this.dao.collection) : undefined) ||
                "";
    }
    set label(value) {
        if (value != this._label) {
            this._label = value;
        }
    }
    get label() {
        return typeof this._label != "undefined"
            ? this._label
            : (this.dao ? this.entities.getLabel(this.dao.collection) : undefined) ||
                "";
    }
    set selectRoute(value) {
        if (value != this._selectRoute) {
            this._selectRoute = value;
        }
    }
    get selectRoute() {
        return typeof this._selectRoute != "undefined"
            ? this._selectRoute
            : this.dao
                ? this.entities.getSelectRoute(this.dao.collection)
                : { route: [] };
    }
    get dropdown() {
        const elm = document.getElementById(this.generatedId(this.controlName) + "_search_dropdown");
        this._dropdown = this.isDisabled
            ? undefined
            : this._dropdown || (elm ? new Dropdown(elm) : undefined);
        return this._dropdown;
    }
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.class = "form-group";
        this.details = new EventEmitter();
        this.select = new EventEmitter();
        this.load = new EventEmitter();
        this.change = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.labelInfo = "";
        this.bold = false;
        this.loading = false;
        this.value = "";
        this.emptyValue = "";
        this.placeholder = "";
        this.dao = undefined;
        this.DEBOUNCE_TIMER = 1000;
        this.queryText = "";
        this.timer = undefined;
        this.dropdownWidth = 200;
        this.items = [];
        this.selectedItem = undefined;
        this.selectedValue = undefined;
        this.selectedEntity = undefined;
        this.searching = false;
        this.entities = this.injector.get(EntityService);
        this.util = this.injector.get(UtilService);
        this.go = injector.get(NavigateService);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.control?.valueChanges.subscribe(async (newValue) => {
            if (this.selectedValue != newValue) {
                this.selectedValue = newValue;
                await this.loadSearch();
            }
        });
        this.control?.setValue(this.control.value);
    }
    selectItem(value, loadEntity = true, emitEvent = true) {
        const selected = this.items.find((x) => !(x instanceof SearchGroupSeparator) && x.value == value);
        const setSelect = (entity) => {
            if (selected)
                selected.entity = entity;
            this.selectedEntity = entity;
            this.selectedItem = selected;
            if (this.select && emitEvent) {
                this.select.emit(selected);
            }
            if (this.change && emitEvent)
                this.change.emit(new Event("change"));
        };
        if (selected) {
            const element = document.getElementById(this.generatedId(this.controlName));
            if (element) {
                element.value = selected.text;
            }
            this.selectedValue = String(selected.value ?? "");
            this.control?.setValue(this.selectedValue, { emitEvent: false });
            this.selectedEntity = undefined;
            if (this.selectedValue.length) {
                if (loadEntity) {
                    const dao = this.dao;
                    if (!dao) {
                        setSelect(selected.entity);
                    }
                    else {
                        this.loading = true;
                        dao
                            .getById(this.selectedValue, this.join)
                            .then(setSelect)
                            .catch(() => undefined)
                            .finally(() => {
                            this.loading = false;
                            this.cdRef.detectChanges();
                        });
                    }
                }
                else {
                    setSelect(selected.entity);
                }
            }
        }
        this.cdRef.detectChanges();
    }
    get isTextValid() {
        let valid = !!this.selectedItem || !this.inputElement?.nativeElement.value?.length;
        if (this.control) {
            if (valid && this.control.errors?.incorrect) {
                let { incorrect, ...others } = this.control.errors;
                this.control.setErrors(Object.entries(this.control.errors).length == 1 ? null : others);
            }
            else if (!valid && !this.control.errors?.incorrect) {
                let incorrect = Object.assign(this.control.errors || {}, {
                    incorrect: true,
                });
                this.control.setErrors(incorrect);
            }
        }
        return valid;
    }
    onItemClick(item) {
        this.queryText = '';
        this.selectItem(item.value);
    }
    async onAddClick(event) {
        const modalRoute = this.addRoute;
        modalRoute.params = Object.assign(modalRoute.params || {}, { modal: true });
        this.go.navigate(modalRoute, {
            modalClose: async (result) => {
                if (result?.length) {
                    this.control?.setValue(result, { emitEvent: false });
                    await this.loadSearch();
                }
            },
        });
    }
    async onSelectClick(event) {
        return new Promise((resolve, reject) => {
            if (this.selectRoute) {
                const modalRoute = this.selectRoute;
                modalRoute.params = Object.assign(modalRoute.params || {}, this.selectParams || {}, { selectable: true, modal: true });
                this.go.navigate(modalRoute, {
                    metadata: this.metadata || {},
                    modalClose: async (result) => {
                        if (result?.id?.length) {
                            this.control?.setValue(result.id, { emitEvent: false });
                            await this.loadSearch();
                            resolve(result?.id);
                        }
                        else {
                            reject("Nada foi selecionado");
                        }
                    },
                });
            }
            else {
                reject("Rota de seleção inexistente");
            }
        });
    }
    onKeyDown(event) {
        if (event.key === "Enter") {
            const selectableItems = this.items.filter((x) => !(x instanceof SearchGroupSeparator));
            if (selectableItems.length === 1) {
                this.onItemClick(selectableItems[0]);
                this.dropdown?.hide();
            }
            else {
                this.onEnterKeyDown(event);
            }
            event.preventDefault();
            return;
        }
        if (["ArrowDown", "ArrowUp", "Escape"].includes(event.key)) {
            event.preventDefault();
        }
    }
    onKeyUp(event) {
        this.typed(event.target.value, event);
    }
    typed(newValue, event) {
        if (event.key != "Tab" && this.queryText != newValue) {
            this.queryText = newValue;
            if (this.timer)
                clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.search(this.queryText);
            }, this.DEBOUNCE_TIMER);
        }
    }
    getItemId(item) {
        return (this.generatedId(this.controlName) +
            (item.hasOwnProperty("value")
                ? "_item_" + item["value"]
                : "_sep_" +
                    this.util.onlyAlphanumeric(item["groups"].text)));
    }
    isSeparator(row) {
        return row instanceof SearchGroupSeparator;
    }
    get isOnlySelect() {
        return this.onlySelect != undefined;
    }
    isDisplayOnlySelected() {
        return this.displayOnlySelected != undefined;
    }
    group(items) {
        if (this.groupBy && items.length) {
            let buffer = "";
            items = items.filter((x) => !(x instanceof SearchGroupSeparator));
            for (let i = 0; i < items.length; i++) {
                let group = this.groupBy.map((x, j) => Object.assign({}, x, { value: items[i].order[j] }));
                if (buffer != JSON.stringify(group)) {
                    buffer = JSON.stringify(group);
                    items.splice(i, 0, new SearchGroupSeparator(group));
                }
            }
        }
        return items;
    }
    async search(text) {
        this.searching = true;
        if (this.control)
            this.control.setValue(this.emptyValue, { emitEvent: false });
        this.clear(false, true, false);
        const dao = this.dao;
        if (!dao) {
            this.searching = false;
            this.cdRef.detectChanges();
            return;
        }
        try {
            const result = await dao.searchText(text, this.fields, this.where, this.groupBy?.map((x) => [x.field, "asc"]));
            if (this.queryText == text) {
                this.items = this.group(result);
                const element = document.getElementById(this.generatedId(this.controlName));
                if (element) {
                    const computedStyle = getComputedStyle(element);
                    const width = element.offsetWidth +
                        parseInt(computedStyle.marginLeft) +
                        parseInt(computedStyle.marginRight);
                    this.dropdownWidth = width || 200;
                }
                else {
                    this.dropdownWidth = 200;
                }
                this.cdRef.detectChanges();
                if (this.items.length) {
                    this.dropdown?.show();
                }
                else {
                    this.dropdown?.hide();
                }
            }
        }
        finally {
            this.searching = false;
            this.cdRef.detectChanges();
        }
    }
    get isDetails() {
        return this.detailsButton !== undefined;
    }
    onDetailsClick(event) {
        if (this.details && this.selectedItem && this.selectedEntity)
            this.details.emit({ ...this.selectedItem, entity: this.selectedEntity });
    }
    clear(clearControl = true, emitEvent = true, clearText = true) {
        this.items = [];
        this.selectedItem = undefined;
        this.selectedValue = undefined;
        this.selectedEntity = undefined;
        if (clearText && this.inputElement)
            this.queryText = this.inputElement.nativeElement.value = "";
        if (clearControl && !this.isDisabled && this.control)
            this.control.setValue(this.emptyValue);
        if (this.change && emitEvent)
            this.change.emit(new Event("change"));
        this.cdRef.detectChanges();
    }
    isTypeSelectItem(toBeDetermined) {
        return (!!toBeDetermined.value &&
            !!toBeDetermined.text);
    }
    async loadSearch(keyOrSelectItem, emitEvent = true) {
        this.clear(false, emitEvent);
        let selectedItem = undefined;
        if (keyOrSelectItem) {
            const key = typeof keyOrSelectItem == "string"
                ? keyOrSelectItem
                : keyOrSelectItem.id || keyOrSelectItem.value;
            this.selectedValue = key;
            this.control?.setValue(key, { emitEvent: false });
            selectedItem =
                typeof keyOrSelectItem == "object"
                    ? !!keyOrSelectItem.id
                        ? this.dao?.entityToSelectItem(keyOrSelectItem, this.fields)
                        : keyOrSelectItem
                    : undefined;
        }
        if (this.control?.value?.length) {
            this.searching = true;
            this.cdRef.detectChanges();
            try {
                let result = selectedItem ||
                    (await this.dao?.searchKey(this.control?.value, this.fields, this.join));
                if (result) {
                    this.items = [result];
                    this.selectItem(this.control?.value, false, emitEvent);
                }
            }
            finally {
                this.searching = false;
            }
        }
    }
};
__decorate([
    HostBinding("class")
], InputSearchComponent.prototype, "class", void 0);
__decorate([
    ViewChild("inputElement")
], InputSearchComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputSearchComponent.prototype, "details", void 0);
__decorate([
    Output()
], InputSearchComponent.prototype, "select", void 0);
__decorate([
    Output()
], InputSearchComponent.prototype, "load", void 0);
__decorate([
    Output()
], InputSearchComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "relativeId", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "emptyValue", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "fields", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "join", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "groupBy", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "where", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "metadata", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "dao", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "detailsButton", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "addRoute", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "selectParams", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "onlySelect", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "displayOnlySelected", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "displayTemplate", void 0);
__decorate([
    Input()
], InputSearchComponent.prototype, "control", null);
__decorate([
    Input()
], InputSearchComponent.prototype, "size", null);
__decorate([
    Input()
], InputSearchComponent.prototype, "disabled", null);
__decorate([
    Input()
], InputSearchComponent.prototype, "icon", null);
__decorate([
    Input()
], InputSearchComponent.prototype, "label", null);
__decorate([
    Input()
], InputSearchComponent.prototype, "selectRoute", null);
InputSearchComponent = __decorate([
    Component({
        selector: "input-search",
        templateUrl: "./input-search.component.html",
        styleUrls: ["./input-search.component.scss"],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective,
            },
        ],
        standalone: false
    })
], InputSearchComponent);
export { InputSearchComponent };
//# sourceMappingURL=input-search.component.js.map
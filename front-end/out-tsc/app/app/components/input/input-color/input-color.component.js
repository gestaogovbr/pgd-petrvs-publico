import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild, } from "@angular/core";
import { ControlContainer, FormGroupDirective, } from "@angular/forms";
import { LookupService } from "src/app/services/lookup.service";
import { InputBase } from "../input-base";
let InputColorComponent = class InputColorComponent extends InputBase {
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
        this.class = "form-group";
        this.change = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "bi bi-palette";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.value = "";
        this.loading = false;
        this.lookup = injector.get(LookupService);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.control.valueChanges.subscribe((newValue) => {
                this.select(newValue);
            });
        }
        else {
            this.select(this.value);
        }
    }
    get isBackground() {
        return this.background != undefined;
    }
    get cores() {
        return (this.palette ||
            (this.isBackground ? this.lookup.CORES_BACKGROUND : this.lookup.CORES));
    }
    select(value) {
        if (this.value != value) {
            this.value = value;
            const element = document.getElementById(this.controlName);
            if (this.lookup.CORES.find((x) => x.key == this.value)) {
                if (element) {
                    element.value = this.value;
                }
            }
            else {
                if (element) {
                    element.value = "";
                }
            }
            this.control?.setValue(this.value);
        }
    }
    onChange(event) {
        let value = event.target.value || "#000000";
        this.select(value);
        if (this.change)
            this.change.emit(event);
    }
    getColor(value) {
        return this.isBackground ? "#000000" : value || "#000000";
    }
    getBackgroundColor(value) {
        return this.isBackground ? value || "#000000" : undefined;
    }
};
__decorate([
    HostBinding("class")
], InputColorComponent.prototype, "class", void 0);
__decorate([
    ViewChild("inputElement")
], InputColorComponent.prototype, "inputElement", void 0);
__decorate([
    Output()
], InputColorComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "palette", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "background", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputColorComponent.prototype, "control", null);
__decorate([
    Input()
], InputColorComponent.prototype, "size", null);
InputColorComponent = __decorate([
    Component({
        selector: "input-color",
        templateUrl: "./input-color.component.html",
        styleUrls: ["./input-color.component.scss"],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective,
            },
        ],
        standalone: false
    })
], InputColorComponent);
export { InputColorComponent };
//# sourceMappingURL=input-color.component.js.map
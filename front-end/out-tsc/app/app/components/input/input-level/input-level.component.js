import { __decorate } from "tslib";
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InputBase } from '../input-base';
let InputLevelComponent = class InputLevelComponent extends InputBase {
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
        this.class = 'form-group';
        this.change = new EventEmitter();
        this.hostClass = "";
        this.labelPosition = "top";
        this.controlName = null;
        this.icon = "";
        this.label = "";
        this.labelInfo = "";
        this.bold = false;
        this.value = "";
        this.inputWidth = 50;
        this.loading = false;
        this.type = "number";
        this.separator = ".";
        this.levels = [];
        this.newLevel = { valid: true };
    }
    controlChange(newValue) {
        this.levels = (newValue || "").split(this.separator).filter((x) => !this.isEmpty(x)).map((x) => Object.assign({}, {
            value: x,
            valid: true
        }));
        this.checkValidate();
    }
    isEmpty(value) {
        return [undefined, "0", "", 0].includes(value);
    }
    // public get isValid(): boolean {
    //   return !this.levels.find(x => !x.valid);
    // }
    updateControl() {
        if (this.control)
            this.control.setValue(this.levels.map(x => x.value).join(this.separator));
    }
    get hasNewLevel() {
        return true;
    }
    checkValidate() {
        (async () => {
            for (let i = 0; i < this.levels.length; i++) {
                let parents = this.levels.slice(0, i);
                let children = this.levels.slice(i + 1, this.levels.length);
                if (this.validate)
                    this.levels[i].valid = await this.validate(parents, this.levels[i], children);
                if (this.minValue)
                    this.levels[i].min = await this.minValue(parents, this.levels[i], children);
                if (this.maxValue)
                    this.levels[i].max = await this.maxValue(parents, this.levels[i], children);
                if (this.stepValue)
                    this.levels[i].step = await this.stepValue(parents, this.levels[i], children);
            }
            // if(this.control) this.control.setErrors(this.isValid ? null : {invalid: true});  
            this.cdRef.detectChanges();
        })();
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.control) {
            this.control.valueChanges.subscribe(this.controlChange.bind(this));
            this.controlChange(this.control.value);
        }
    }
    onChange(event, index) {
        this.levels[index].value = event.target.value;
        if (this.isEmpty(this.levels[index].value))
            this.levels = this.levels.slice(0, index);
        this.updateControl();
        //this.checkValidate();
    }
    onNewLevelChange(event) {
        this.newLevel.value = this.newInputLevel.nativeElement.value;
        if (!this.isEmpty(this.newLevel.value)) {
            this.levels.push({ value: this.newLevel.value, valid: true });
            this.newLevel.value = "";
            this.newInputLevel.nativeElement.value = "";
            this.updateControl();
            this.cdRef.detectChanges();
            const elementId = this.generatedId(this.controlName) + '_' + (this.levels.length - 1);
            const element = document.getElementById(elementId);
            if (element) {
                element.focus();
            }
        }
    }
};
__decorate([
    HostBinding('class')
], InputLevelComponent.prototype, "class", void 0);
__decorate([
    ViewChild('inputElement')
], InputLevelComponent.prototype, "inputElement", void 0);
__decorate([
    ViewChild('newInputLevel')
], InputLevelComponent.prototype, "newInputLevel", void 0);
__decorate([
    Output()
], InputLevelComponent.prototype, "change", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "hostClass", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "labelPosition", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "icon", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "label", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "labelInfo", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "labelClass", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "bold", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "value", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "inputWidth", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "loading", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "minValue", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "maxValue", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "stepValue", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "validate", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "prefix", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "sufix", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "form", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "source", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "path", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "type", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "separator", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "required", void 0);
__decorate([
    Input()
], InputLevelComponent.prototype, "control", null);
__decorate([
    Input()
], InputLevelComponent.prototype, "size", null);
InputLevelComponent = __decorate([
    Component({
        selector: 'input-level',
        templateUrl: './input-level.component.html',
        styleUrls: ['./input-level.component.scss'],
        viewProviders: [
            {
                provide: ControlContainer,
                useExisting: FormGroupDirective
            }
        ],
        standalone: false
    })
], InputLevelComponent);
export { InputLevelComponent };
//# sourceMappingURL=input-level.component.js.map
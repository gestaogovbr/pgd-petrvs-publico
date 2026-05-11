import { __decorate, __param } from "tslib";
import { NavigateService } from 'src/app/services/navigate.service';
import { Component, EventEmitter, Input, Output, ViewChild, ContentChildren, Inject } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { GridComponent } from '../grid/grid.component';
import { InputButtonComponent } from '../input/input-button/input-button.component';
import { InputColorComponent } from '../input/input-color/input-color.component';
import { InputContainerComponent } from '../input/input-container/input-container.component';
import { InputDatetimeComponent } from '../input/input-datetime/input-datetime.component';
import { InputDisplayComponent } from '../input/input-display/input-display.component';
import { InputMultiselectComponent } from '../input/input-multiselect/input-multiselect.component';
import { InputMultitoggleComponent } from '../input/input-multitoggle/input-multitoggle.component';
import { InputRadioComponent } from '../input/input-radio/input-radio.component';
import { InputRateComponent } from '../input/input-rate/input-rate.component';
import { InputSearchComponent } from '../input/input-search/input-search.component';
import { InputSelectComponent } from '../input/input-select/input-select.component';
import { InputSwitchComponent } from '../input/input-switch/input-switch.component';
import { InputTextComponent } from '../input/input-text/input-text.component';
import { InputTextareaComponent } from '../input/input-textarea/input-textarea.component';
import { InputTimerComponent } from '../input/input-timer/input-timer.component';
import { ComponentBase } from '../component-base';
import { InputEditorComponent } from '../input/input-editor/input-editor.component';
import { InputNumberComponent } from '../input/input-number/input-number.component';
import { DOCUMENT } from '@angular/common';
import { InputBase } from '../input/input-base';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { Subject, takeUntil } from 'rxjs';
let EditableFormComponent = class EditableFormComponent extends ComponentBase {
    set disabled(value) {
        if (this._disabled != value) {
            this._disabled = value;
            this.disableAll(value);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set error(error) {
        this._error = error;
        this.submitting = false;
    }
    get error() {
        return this._error;
    }
    get isNoButtons() {
        return this.noButtons !== undefined;
    }
    get isNoMargin() {
        return this.noMargin !== undefined;
    }
    constructor(injector, document, dialog) {
        super(injector);
        this.document = document;
        this.dialog = dialog;
        this.disable = new EventEmitter();
        this.submit = new EventEmitter();
        this.cancel = new EventEmitter();
        this.title = "";
        this.buttons = [];
        this.toolbarButtons = [];
        this.withScroll = true;
        this.forceInvalid = false;
        this._disabled = false;
        this.submitting = false;
        this.unsubscribe$ = new Subject();
        this.fb = injector.get(FormBuilder);
        this.go = injector.get(NavigateService);
        this.fh = injector.get(FormHelperService);
        this.dialog.modalClosed
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
            // Execute a lógica para remover os itens do formulário
            this.clearGridNoSaved();
        });
    }
    ngOnInit() {
    }
    get hasSubmit() {
        return !!this.submit.observers.length;
    }
    get hasCancel() {
        return !!this.cancel.observers.length;
    }
    ngAfterViewInit() {
        if (this.disabled)
            this.disableAll(true);
        this.setInititalFocus();
    }
    setInititalFocus() {
        if (this.initialFocus) {
            for (const [key, value] of Object.entries(this.form.controls)) {
                if (key == this.initialFocus) {
                    for (const element of this.components) {
                        if (element.control == value) {
                            element.focus();
                            break;
                        }
                    }
                }
            }
        }
        else {
            const control = Object.entries(this.form.controls)[0];
            if (control) {
                for (const element of this.components) {
                    if (element.control == control[1]) {
                        element.focus();
                        break;
                    }
                }
            }
        }
    }
    get components() {
        return [
            ...(this.grids?.toArray() || []),
            ...(this.inputContainers?.toArray() || []),
            ...(this.inputSwitchs?.toArray() || []),
            ...(this.inputDisplays?.toArray() || []),
            ...(this.inputSearchs?.toArray() || []),
            ...(this.inputButtons?.toArray() || []),
            ...(this.inputTexts?.toArray() || []),
            ...(this.inputNumbers?.toArray() || []),
            ...(this.inputTextareas?.toArray() || []),
            ...(this.inputDatetimes?.toArray() || []),
            ...(this.inputRadios?.toArray() || []),
            ...(this.inputSelects?.toArray() || []),
            ...(this.inputColors?.toArray() || []),
            ...(this.inputMultiselects?.toArray() || []),
            ...(this.inputTimers?.toArray() || []),
            ...(this.inputRates?.toArray() || []),
            ...(this.inputEditors?.toArray() || []),
            ...(this.inputMultitoggles?.toArray() || [])
        ];
    }
    disableAll(disabled) {
        this.components?.forEach(component => component.disabled = disabled ? "true" : undefined);
        this.forms?.toArray()?.forEach(form => form.disabled = disabled);
        if (this.disable)
            this.disable.emit(new Event("disabled"));
    }
    revalidate() {
        this.fh.revalidate(this.form);
    }
    onButtonClick(button) {
        if (button.route) {
            this.go.navigate(button.route, button.metadata);
        }
        else if (button.onClick) {
            button.onClick();
        }
    }
    onSubmit() {
        this.revalidate();
        if (this.form.valid) {
            this.submitting = true;
            this.submit.emit(this);
        }
        else {
            this.form.markAllAsTouched();
            Object.entries(this.form.controls).forEach(([key, value]) => {
                if (value.invalid)
                    console.log("Validate => " + key, value.value, value.errors);
            });
        }
    }
    onCancel() {
        this.cancel.emit();
    }
    get anyRequired() {
        for (const component of this.components) {
            if (component instanceof InputBase && component.isRequired) {
                return true;
            }
        }
        return false;
    }
    clearGridNoSaved(form = this.form) {
        this.removeAddStatusRecursively(form.value);
    }
    removeAddStatusRecursively(obj) {
        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                if (item && typeof item === 'object') {
                    this.removeAddStatusRecursively(item);
                }
            });
        }
        else if (obj !== null && typeof obj === 'object') {
            Object.keys(obj).forEach((key) => {
                if (key === '_status' && obj[key] === 'ADD') {
                    const keys = Object.keys(obj);
                    if (keys.length <= 2)
                        obj[key] = "DELETE";
                }
                else {
                    this.removeAddStatusRecursively(obj[key]);
                }
            });
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
};
__decorate([
    ViewChild(FormGroupDirective)
], EditableFormComponent.prototype, "formDirective", void 0);
__decorate([
    ContentChildren(GridComponent, { descendants: true })
], EditableFormComponent.prototype, "grids", void 0);
__decorate([
    ContentChildren(EditableFormComponent, { descendants: true })
], EditableFormComponent.prototype, "forms", void 0);
__decorate([
    ContentChildren(InputContainerComponent, { descendants: true })
], EditableFormComponent.prototype, "inputContainers", void 0);
__decorate([
    ContentChildren(InputSwitchComponent, { descendants: true })
], EditableFormComponent.prototype, "inputSwitchs", void 0);
__decorate([
    ContentChildren(InputDisplayComponent, { descendants: true })
], EditableFormComponent.prototype, "inputDisplays", void 0);
__decorate([
    ContentChildren(InputSearchComponent, { descendants: true })
], EditableFormComponent.prototype, "inputSearchs", void 0);
__decorate([
    ContentChildren(InputButtonComponent, { descendants: true })
], EditableFormComponent.prototype, "inputButtons", void 0);
__decorate([
    ContentChildren(InputTextComponent, { descendants: true })
], EditableFormComponent.prototype, "inputTexts", void 0);
__decorate([
    ContentChildren(InputNumberComponent, { descendants: true })
], EditableFormComponent.prototype, "inputNumbers", void 0);
__decorate([
    ContentChildren(InputTextareaComponent, { descendants: true })
], EditableFormComponent.prototype, "inputTextareas", void 0);
__decorate([
    ContentChildren(InputDatetimeComponent, { descendants: true })
], EditableFormComponent.prototype, "inputDatetimes", void 0);
__decorate([
    ContentChildren(InputRadioComponent, { descendants: true })
], EditableFormComponent.prototype, "inputRadios", void 0);
__decorate([
    ContentChildren(InputSelectComponent, { descendants: true })
], EditableFormComponent.prototype, "inputSelects", void 0);
__decorate([
    ContentChildren(InputColorComponent, { descendants: true })
], EditableFormComponent.prototype, "inputColors", void 0);
__decorate([
    ContentChildren(InputMultiselectComponent, { descendants: true })
], EditableFormComponent.prototype, "inputMultiselects", void 0);
__decorate([
    ContentChildren(InputTimerComponent, { descendants: true })
], EditableFormComponent.prototype, "inputTimers", void 0);
__decorate([
    ContentChildren(InputRateComponent, { descendants: true })
], EditableFormComponent.prototype, "inputRates", void 0);
__decorate([
    ContentChildren(InputEditorComponent, { descendants: true })
], EditableFormComponent.prototype, "inputEditors", void 0);
__decorate([
    ContentChildren(InputMultitoggleComponent, { descendants: true })
], EditableFormComponent.prototype, "inputMultitoggles", void 0);
__decorate([
    Output()
], EditableFormComponent.prototype, "disable", void 0);
__decorate([
    Output()
], EditableFormComponent.prototype, "submit", void 0);
__decorate([
    Output()
], EditableFormComponent.prototype, "cancel", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "form", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "title", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "buttons", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "toolbarButtons", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "confirmLabel", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "cancelLabel", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "noButtons", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "noMargin", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "initialFocus", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "withScroll", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "forceInvalid", void 0);
__decorate([
    Input()
], EditableFormComponent.prototype, "disabled", null);
EditableFormComponent = __decorate([
    Component({
        selector: 'editable-form',
        templateUrl: './editable-form.component.html',
        styleUrls: ['./editable-form.component.scss'],
        providers: [
            {
                provide: FormGroupDirective,
                useFactory: (self) => {
                    const fakeForm = new FormGroupDirective([], []);
                    fakeForm.form = self.form;
                    return self.formDirective || fakeForm;
                },
                deps: [EditableFormComponent]
            }
        ],
        standalone: false
    }),
    __param(1, Inject(DOCUMENT))
], EditableFormComponent);
export { EditableFormComponent };
//# sourceMappingURL=editable-form.component.js.map
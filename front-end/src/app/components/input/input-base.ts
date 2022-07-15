import { ChangeDetectorRef, ElementRef, Injectable, Injector } from "@angular/core";
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { UtilService } from "src/app/services/util.service";

export type LabelPosition = "top" | "right" | "left" | "none";
export type MultiselectStyle = "inline" | "rows";
export type InputScale = "small" | "medium" | "large";
export type SelectItem = {
  value: any,
  text: string,
  order?: any[],
  entity: any
};

@Injectable()
export abstract class InputBase {
    /* Public properties */
    public isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    public cdRef: ChangeDetectorRef;
    public selfElement: ElementRef;
    public fb: FormBuilder;
    public util: UtilService;
    public viewInit: boolean = false;
    public formDirective?: FormGroupDirective;
    /* Abstract properties */
    public abstract controlName: string | null;
    public abstract control?: AbstractControl; 
    public abstract form?: FormGroup;
    public abstract disabled?: string;
    public abstract size: number;
    public abstract loading: boolean;
    public abstract class: string;
    public abstract source?: any;
    public abstract path?: string;
    /* Protected get e set */
    protected _control?: AbstractControl;
    protected _generatedId?: string;
    protected _fakeControl: FormControl = new FormControl();
    protected _value: any;

    public getValue(): any {
        const value = this.source && this.path ? this.util.getNested(this.source, this.path) : this._value;
        return value;
    }

    public setValue(value: any) {
        if(this.source && this.path) {
            this.util.setNested(this.source, this.path, value);
        } else {
            this._value = value;
        }
    }

    public get generatedId(): string {
        this._generatedId = this._generatedId || "ID_" + this.util.md5();
        return this._generatedId;
    }

    constructor(public injector: Injector) {
        this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
        this.selfElement = injector.get<ElementRef>(ElementRef);
        this.fb = injector.get<FormBuilder>(FormBuilder);
        this.util = injector.get<UtilService>(UtilService);
        this.selfElement.nativeElement.component = this;
    }

    public ngOnInit() {
        if(this.size > 0) this.class += " col-md-"+this.size;
    }

    public ngAfterViewInit() {
        try { this.formDirective = this.injector.get<FormGroupDirective>(FormGroupDirective); } catch {}
        this.form = this.form || this.formDirective?.form;
        this.viewInit = true;
        this.cdRef.detectChanges();
    }

    public get isDisabled(): boolean {
        return this.disabled != undefined;
    }

    public get formControl(): FormControl {
        return this.getControl() as FormControl || this._fakeControl;
    }

    public getControl(): AbstractControl | undefined {
        return this._control || (this.controlName?.length && this.form ? this.form!.controls[this.controlName] : undefined);
    }

    public isInvalid(): boolean {
        return this.isDisabled ? false : !this.control ? true : this.control!.invalid && (this.control!.dirty || this.control!.touched);
    }

    public hasError(): boolean {
        return !this.control || this.isDisabled ? false : !!this.control?.errors;
    }

    public errorMessage() {
        return this.control!.errors?.errorMessage;
    }
}
import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IIndexable } from '../models/base.model';
import { LookupItem } from './lookup.service';

export interface IFormGroupHelper {
  initialState: any;
}

export type FormHelperField = {
  default: any,
  async?: boolean,
  values?: LookupItem[]
}
export type ValidateForm = (control: AbstractControl, controlName: string) => null | string;
export type AsyncValidateForm = (control: AbstractControl, controlName: string) => Promise<String | null>;

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  private _fb?: FormBuilder;
  public get fb(): FormBuilder { this._fb = this._fb || this.injector.get<FormBuilder>(FormBuilder); return this._fb };

  constructor(public injector: Injector) { }

  public FormBuilder(fields: {[key: string]: FormHelperField}, cdRef?: ChangeDetectorRef, validate?: ValidateForm, asyncValidate?: AsyncValidateForm): FormGroup & IFormGroupHelper {
    let result: {[key: string]: any} = {};
    let initialState: IIndexable = {};

    Object.entries(fields).forEach(([key, value]) => {
      const validation = value.async ? { asyncValidators: this.asyncValidate(key, cdRef, asyncValidate), updateOn: "blur" } : this.validate(key, cdRef, validate);
      result[key] = [value.default, validation];
      initialState[key] = value.default;
      if(value.values) {
        value.values.forEach(item => {
          const itemValidation = value.async ? { asyncValidators: this.asyncValidate(key + "$" + item.key, cdRef, asyncValidate), updateOn: "blur" } : this.validate(key + "$" + item.key, cdRef, validate);
          result[key + "$" + item.key] = [value.default.indexOf(item.key) >= 0, itemValidation];
        })
      }
    });

    return Object.assign(this.fb.group(result), {initialState} as IFormGroupHelper);
  }

  public validate(controlName: string, cdRef?: ChangeDetectorRef, validate?: ValidateForm): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null  => {
      let result = validate ? validate(control, controlName) : null;
      cdRef?.markForCheck();
      return !result ? null : { errorMessage: result };
    };
  } 

  public asyncValidate(controlName: string, cdRef?: ChangeDetectorRef, asyncValidate?: AsyncValidateForm): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null>  => {
      return new Promise<ValidationErrors | null>((resolve, reject) => {
        if(asyncValidate) {
          asyncValidate(control, controlName).then(result => {
            cdRef?.markForCheck();
            resolve(!result ? null : { errorMessage: result });
          });
        } else {
          resolve(null);
        }
      });
    };
  } 
}

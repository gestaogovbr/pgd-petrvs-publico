import { OnInit, Injector, Injectable, Type } from '@angular/core';
import { FormGroup,  FormControl, FormArray } from '@angular/forms';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { PageBase } from './page-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { NavigateResult } from 'src/app/services/navigate.service';

export type PageFormAction = "edit" | "consult" | "new" | string;

//@Component({ template: '' })
@Injectable()
export abstract class PageFormBase<M extends Base, D extends DaoBaseService<M>> extends PageBase implements OnInit {
  public abstract editableForm?: EditableFormComponent;

  public form?: FormGroup;
  public entity?: M;
  public dao?: D;
  public id?: string;
  public action: PageFormAction = "";
  public formValidation?: (form?: FormGroup) => string | undefined | null | Promise<string | undefined | null>;
  public titleEdit?: (entity: M) => string;

  /* Configurações */
  public join: string[] = [];
  public mensagemSalvarSucesso = "Registro salvo com sucesso!";
  public mensagemCarregando = "Carregando dados do formulário...";
  public mensagemSalvando = "Salvando dados do formulário...";
  
  constructor(public injector: Injector, mType: Type<M>, dType: Type<D>) {
    super(injector);
    this.dao = injector.get<D>(dType);
  }

  ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";  
    this.action = ["edit", "consult", "clone"].includes(segment) ? segment : "new";
    this.id = this.action != "new" ? this.urlParams!.get("id")! : undefined;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.onInitializeData();
    this.cdRef.detectChanges();
  }

  public get isNew(): boolean {
    return this.action == "new";
  }

  public get formDisabled(): boolean {
    return this.action == "consult";
  }

  public checkFilled(controls: string[]): boolean {
    return !controls.find(x => !this.form!.controls[x].value?.length);
  }

  public abstract loadData(entity: M, form: FormGroup, action?: string): Promise<void> | void;

  public abstract initializeData(form: FormGroup): Promise<void> | void;

  public abstract saveData(form: IIndexable): Promise<M | NavigateResult | boolean | undefined | null>;

  private onInitializeData() {
    (async () => {
      this.loading = true;
      try {
        if (["edit", "consult", "clone"].includes(this.action)) {
          const entity = await this.dao!.getById(this.id!, this.join);
          this.entity = entity!;
          await this.loadData(this.entity, this.form!, this.action);
        } else { /* if (this.action == "new") */
          await this.initializeData(this.form!);
        }
      } catch (erro) {
        this.error("Erro ao carregar dados: " + erro);
      } finally {
        this.loading = false;
      }
      if(this.action == "edit" && this.titleEdit) this.title = this.titleEdit(this.entity!);
    })();
  }

  public async onSaveData() {
    const self = this;
    let error: any = undefined;
    if(this.formValidation) {
      try {
        error = await this.formValidation(this.form!);
      } catch (e: any) {
        error = e; 
      }
    }
    if(this.form!.valid && !error){
      this.submitting = true;
      try {
        let entity = await this.saveData(this.form!.value);
        if(entity){
          const modalResult = typeof entity == "boolean" ? this.entity?.id : entity instanceof NavigateResult ? entity.modalResult : (await this.dao!.save(entity as M, this.join)).id;
          if(self.modalRoute?.queryParams?.idroute?.length) self.go.setModalResult(self.modalRoute?.queryParams?.idroute, modalResult);
          //self.dialog.alert("Sucesso", this.mensagemSalvarSucesso).then(() => self.go.back());
          self.close();
        }
      } catch (error: any) {
        self.error(error.error?.message || error.message || error);
      } finally {
        self.submitting = false;
      }
    } else {
      this.form!.markAllAsTouched();
      if(error) {
        this.error(error);
      }
      Object.entries(this.form!.controls).forEach(([key, value]) => {
        if(value.invalid) console.log("Validate => " + key, value.value, value.errors);
      });
    }
  }

  public onCancel() {
    this.close();
  }

  public getControlByName(controlName: string): FormControl {
    return this.form!.controls[controlName] as FormControl;
  }

  public error = (error: any) => {
    console.log(error);
    if (this.editableForm) {
      if (error.validationErrors) {
        this.editableForm.error = "";  
        Object.entries(error.validationErrors).forEach(([field, messages]) => {
          const control = this.form!.get(field);
          if (control) {
            control.setErrors({ errorMessage: messages });
          }
        });
      } else {
        this.editableForm.error = typeof error === 'string' ? error : 'Ocorreu um erro desconhecido';
      }
    }
  }

  public clearErros = () => {
    if(this.editableForm) this.editableForm.error = "";
  }

  resetForm(form: FormGroup){
    if(form){
      Object.keys(form.controls).forEach(key => {
          
        
        const control = this.form?.get(key);        
        console.log(typeof control);

        if (control instanceof FormGroup) {
          this.resetForm(control);
        } else if (control instanceof FormArray) {
          while (control.length !== 0) {
            control.removeAt(0);
          }
        } else {
          control?.reset();
        }
      });
    }
  }
}

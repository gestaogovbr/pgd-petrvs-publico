import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoMotivoAfastamentoDaoService } from 'src/app/dao/tipo-motivo-afastamento-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoMotivoAfastamento } from 'src/app/models/tipo-motivo-afastamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-tipo-motivo-afastamento-form',
  templateUrl: './tipo-motivo-afastamento-form.component.html',
  styleUrls: ['./tipo-motivo-afastamento-form.component.scss']
})
export class TipoMotivoAfastamentoFormComponent extends PageFormBase<TipoMotivoAfastamento, TipoMotivoAfastamentoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, TipoMotivoAfastamento, TipoMotivoAfastamentoDaoService);
    this.form = this.fh.FormBuilder({
      codigo: {default: null},
      nome: {default: ""}, 
      icone: {default: ""},
      cor: {default: ""}, 
      horas: {default: 1}, 
      integracao: {default: 0}
    }, this.cdRef, this.validate);
  }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }else if(['integracao'].indexOf(controlName) >= 0 && control.value==1) {
      result = "A integração é feita automaticamente.";
    }

    return result;
  }

  public checkIntegracao(): string | undefined {
    const enable = !this.form?.controls.integracao.value;
    if(enable && this.form?.controls.codigo.value != null) {
      this.form?.controls.codigo.setValue(null);
      this.cdRef.markForCheck();
    }
    return enable ? 'disable' : undefined;
  }

  public loadData(entity: TipoMotivoAfastamento, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new TipoMotivoAfastamento());
  }

  public saveData(form: IIndexable): Promise<TipoMotivoAfastamento> {
    return new Promise<TipoMotivoAfastamento>((resolve, reject) => {
      const tipoMotivoAfastamento = this.util.fill(new TipoMotivoAfastamento(), this.entity!);
      resolve(this.util.fillForm(tipoMotivoAfastamento, this.form!.value));
    });
  }

  public titleEdit = (entity: TipoMotivoAfastamento): string => {
    return "Editando " + (entity?.nome || "");
  }
}


import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PlanejamentoDaoService } from 'src/app/dao/planejamento-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Planejamento } from 'src/app/models/planejamento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-planejamento-form',
  templateUrl: './planejamento-form.component.html',
  styleUrls: ['./planejamento-form.component.scss']
})
export class PlanejamentoFormComponent extends PageFormBase<Planejamento, PlanejamentoDaoService> {
    @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

    public unidadeDao: UnidadeDaoService;
    
    constructor(public injector: Injector) {
      super(injector, Planejamento, PlanejamentoDaoService);
      this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
      this.form = this.fh.FormBuilder({
        nome: {default: ""},
        unidade_id: {default: ""},
        inicio: {default: new Date()},
        fim: {default: null}
      }, this.cdRef, this.validate);
    }
  
    public validate = (control: AbstractControl, controlName: string) => {
      let result = null;
      if(['nome','unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
        result = "Obrigatório";
      }
      if(['inicio'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
        result = "Inválido";
      }
      if(controlName == 'fim' && control.value && !this.dao?.validDateTime(control.value)){
        result = "Inválido";
      }
      return result;
    }
  
    public formValidation = (form?: FormGroup) =>{
      let result = null;
      if(this.form!.controls.fim.value && this.form!.controls.inicio.value > this.form!.controls.fim.value) {
        return "A data do início não pode ser maior que a data do fim!";
      }
      return result;
    }
  
    public loadData(entity: Planejamento, form: FormGroup) {
      let formValue = Object.assign({}, form.value);
      form.patchValue(this.util.fillForm(formValue, entity));
    }
  
    public initializeData(form: FormGroup) {
      form.patchValue(new Planejamento());
    }
  
    public async saveData(form: IIndexable): Promise<Planejamento> {
      return new Promise<Planejamento>((resolve, reject) => {
        const planejamento = this.util.fill(new Planejamento(), this.entity!);
        resolve(this.util.fillForm(planejamento, this.form!.value));
      });
    }
   
    public titleEdit = (entity: Planejamento): string => {
      return "Editando "+ (entity?.nome || "");
    }
  
}
  
  

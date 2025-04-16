import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AvaliacaoDaoService } from 'src/app/dao/avaliacao-dao.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NavigateResult } from 'src/app/services/navigate.service';
import { validate } from 'webpack';

@Component({
  selector: 'app-fazer-recurso',
  standalone: false,
  templateUrl: './fazer-recurso.component.html',
  styleUrl: './fazer-recurso.component.scss'
})
export class FazerRecursoComponent extends PageFormBase<Avaliacao, AvaliacaoDaoService> implements OnInit {
    @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
    public avaliacao?: Avaliacao;

    public form: FormGroup;
    constructor(public injector: Injector) {
        super(injector, Avaliacao, AvaliacaoDaoService);

        this.form = this.fh.FormBuilder({
          recurso: {default: ""},
        }, this.cdRef, this.validate);
      }
    
    

    public validate = (control: AbstractControl, controlName: string) => {
      let result = null;
      if(controlName == 'recurso' && !control.value?.length) {
        result = "Obrigatório";
      }
        
        return result;
    }

    public async loadData(entity: Avaliacao, form: FormGroup) {
      let formValue = Object.assign({}, form.value);
      console.log( this.metadata);
      
      await this.dao!.getById(entity.id)
      form.patchValue(this.util.fillForm(formValue, entity));
    }

    public async initializeData(form: FormGroup) {
      this.avaliacao = this.metadata?.avaliacao;
      if (!this.avaliacao) {
        this.go.back();
        return;
      }
      this.form.patchValue(this.util.fillForm(form.value, this.avaliacao));
    }

     public async saveData(form: IIndexable) {
        await this.dao!.recorrer(this.avaliacao!, form.recurso);
        return new NavigateResult(this.avaliacao);
     }

}

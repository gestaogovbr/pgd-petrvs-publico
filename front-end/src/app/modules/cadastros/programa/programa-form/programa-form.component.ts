import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Programa } from 'src/app/models/programa.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-programa-form',
  templateUrl: './programa-form.component.html',
  styleUrls: ['./programa-form.component.scss']
})

export class ProgramaFormComponent extends PageFormBase<Programa, ProgramaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Programa, ProgramaDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      unidade_id: {default: ""},
      nome: {default: ""},
      normativa: {default: ""},
      config: {default: null},
      data_inicio_vigencia: {default: new Date()},
      data_fim_vigencia: {default: new Date()}
    }, this.cdRef, this.validate);
    this.join = ["unidade"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }else if(['data_inicio_vigencia', 'data_fim_vigencia'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    }

    return result;
  }

  public async loadData(entity: Programa, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await Promise.all ([
      this.unidade!.loadSearch(entity.unidade || entity.unidade_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Programa());
  }


  public saveData(form: IIndexable): Promise<Programa> {
    return new Promise<Programa>((resolve, reject) => {
      const programa = this.util.fill(new Programa(), this.entity!);
      resolve(this.util.fillForm(programa, this.form!.value));
    });
  }

  public titleEdit = (entity: Programa): string => {
    return "Editando " + (entity?.nome || "");
  }
}


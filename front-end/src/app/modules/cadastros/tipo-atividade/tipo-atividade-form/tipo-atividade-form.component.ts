import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-tipo-atividade-form',
  templateUrl: './tipo-atividade-form.component.html',
  styleUrls: ['./tipo-atividade-form.component.scss']
})
export class TipoAtividadeFormComponent extends PageFormBase<TipoAtividade, TipoAtividadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public form: FormGroup;

  constructor(public injector: Injector) {
    super(injector, TipoAtividade, TipoAtividadeDaoService);
    this.title = this.lex.translate("Tipo de Atividade");
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      esforco: {default: 48},
      dias_planejado: {default: ""},
      etiquetas: {default: []},
      checklist: {default: []},
      comentario: {default: ""},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      checklist_texto: {default: ""},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) result = "Obrigatório";
    /*else if(['esforco'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    }*/
    return result;
  }

  public addItemHandleChecklist(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.checklist_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.checklist.value, key)) {
      result = {
        key: key,
        value: this.form.controls.checklist_texto.value
      };
      this.form.controls.checklist_texto.setValue("");
    }
    return result;
  };

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
      result = {
        key: key,
        value: this.form.controls.etiqueta_texto.value,
        color: this.form.controls.etiqueta_cor.value,
        icon: this.form.controls.etiqueta_icone.value
      };
      this.form.controls.etiqueta_texto.setValue("");
      this.form.controls.etiqueta_icone.setValue(null);
      this.form.controls.etiqueta_cor.setValue(null);
    }
    return result;
  };

  public async loadData(entity: TipoAtividade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new TipoAtividade();
    this.loadData(this.entity, form);
  }

  public async saveData(form: IIndexable) {
    let tipoAtividade = this.util.fill(new TipoAtividade(), this.entity!);
    return this.util.fillForm(tipoAtividade, this.form!.value) as TipoAtividade;
  }

  public titleEdit = (entity: TipoAtividade): string => {
    return "Editando " + this.lex.translate("Tipo de Atividade") + ': ' + (entity?.nome || "");
  }
}

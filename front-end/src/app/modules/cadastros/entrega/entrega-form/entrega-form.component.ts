import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Entrega } from 'src/app/models/entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import {LookupItem} from "../../../../services/lookup.service";

@Component({
  selector: 'app-entrega-form',
  templateUrl: './entrega-form.component.html',
  styleUrls: ['./entrega-form.component.scss']
})
export class EntregaFormComponent extends PageFormBase<Entrega, EntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('itemQualitativo', { static: false }) public itemQualitativo?: InputTextComponent;

  public listaQualitativos: string[] = [];

  constructor(public injector: Injector) {
    super(injector, Entrega, EntregaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tipo_indicador: {default: ""},
      qualitativo: {default: ""},
      lista_qualitativos: {default: []},
      itemQualitativo: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['nome','tipo_indicador'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) =>{
    let result = null;
    if(this.form?.controls.tipo_indicador.value == 'QUALITATIVO' && !this.listaQualitativos.length){
      result = "Quando o tipo da entrega for Qualitativo, é necessária a inclusão de ao menos um item de qualitativo!";
    }
    return result;
  }

  public loadData(entity: Entrega, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.loadListaQualitativos();
  }

  public initializeData(form: FormGroup) {
    form.patchValue(new Entrega());
  }

  public async saveData(form: IIndexable): Promise<Entrega> {
    return new Promise<Entrega>((resolve, reject) => {
      const entrega = this.util.fill(new Entrega(), this.entity!);
      resolve(this.util.fillForm(entrega, this.form!.value));
    });
  }

  public titleEdit = (entity: Entrega): string => {
    return "Editando "+ (entity?.nome || "");
  }

  public incluirQualitativo(qualitativo: string) {
    let item = qualitativo.trim();
    let listaQualitativos: string[] = this.form!.controls.lista_qualitativos.value;
    if(!listaQualitativos.find(x => x == item) && item.length){
      this.clearErros();
      listaQualitativos.push(item);
      this.form!.controls.lista_qualitativos.setValue(listaQualitativos);
      this.form?.controls.qualitativo.setValue('');
      this.loadListaQualitativos();
    }
  }

  public excluirQualitativo(qualitativo: string) {
    let listaQualitativos: string[] = this.form!.controls.lista_qualitativos.value;
    if(listaQualitativos.find(x => x == qualitativo)){
      this.form!.controls.lista_qualitativos.setValue(listaQualitativos.filter(x => x != qualitativo));
      this.loadListaQualitativos();
    }
  }

  public loadListaQualitativos() {
    this.listaQualitativos = this.form!.controls.lista_qualitativos.value || [];
  }

  public addItemHandleItemQualitativo(): LookupItem | undefined {
    let result = undefined;
    const value = this.form!.controls.itemQualitativo.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form!.controls.lista_qualitativos.value, key)) {
      result = {
        key: key,
        value: this.form!.controls.lista_qualitativos.value
      };
      this.form!.controls.lista_qualitativos.setValue("");
    }
    return result;
  };

}


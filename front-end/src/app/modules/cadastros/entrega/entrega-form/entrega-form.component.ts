import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { EntregaDaoService } from 'src/app/dao/entrega-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Entrega } from 'src/app/models/entrega.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-entrega-form',
  templateUrl: './entrega-form.component.html',
  styleUrls: ['./entrega-form.component.scss']
})
export class EntregaFormComponent extends PageFormBase<Entrega, EntregaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  //@ViewChild('itemQualitativo', { static: false }) public itemQualitativo?: InputTextComponent;

  constructor(public injector: Injector) {
    super(injector, Entrega, EntregaDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tipo_indicador: {default: ""},
      itemQualitativo: {default: ""},
      qualitativo: {default: []}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

/*     if(['codigo_ibge', 'nome', 'uf'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  else if(['timezone'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    } */
    return result;
  }

  public loadData(entity: Entrega, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Entrega());
  }

  public saveData(form: IIndexable): Promise<Entrega> {
    return new Promise<Entrega>((resolve, reject) => {
      const entrega = this.util.fill(new Entrega(), this.entity!);
      resolve(this.util.fillForm(entrega, this.form!.value));
    });
  }

  public onSelect(){

  }

  public titleEdit = (entity: Entrega): string => {
    return "Editando "+ (entity?.nome || "");
  }

  public incluirQualitativo() {
    let listaQualitativos: string[] = this.form!.controls.qualitativo.value;
    let item = this.form?.controls.itemQualitativo!.value;
    if(!listaQualitativos.find(x => x == item)){
      listaQualitativos.push(item);//melhorar, limpando as strings e camelcase
      this.form!.controls.qualitativo.setValue(listaQualitativos);
      this.form!.controls.itemQualitativo!.setValue('');
      //this.loadEquipe();
    }
  }

  public excluirQualitativo() {
    let listaQualitativos: string[] = this.form!.controls.qualitativo.value;
    let item = this.form!.controls.itemQualitativo!.value;
    if(listaQualitativos.find(x => x == item)){
      this.form!.controls.qualitativo.setValue(listaQualitativos.filter(x => x != item));
      //this.loadEquipe();
    }
  }
}


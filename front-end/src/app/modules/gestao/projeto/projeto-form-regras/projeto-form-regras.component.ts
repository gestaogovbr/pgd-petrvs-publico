import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoFase } from 'src/app/models/projeto-fase.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-regras',
  templateUrl: './projeto-form-regras.component.html',
  styleUrls: ['./projeto-form-regras.component.scss']
})
export class ProjetoFormRegrasComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }

  public get items(): ProjetoFase[] {
    if(!this.gridControl.value) this.gridControl.setValue(new Projeto());
    if(!this.gridControl.value.regras) this.gridControl.value.regras = [];
    return this.gridControl.value.regras;
  }

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tipo_recurso: {default: "MATERIAL"}
    }, this.cdRef, this.validate);
    this.groupBy = [{field: "tipo_recurso", label: "Tipo do recurso"}];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    if(controlName == "nome" && !control.value?.length) return "Obrigatório";
    return null;
  }

  public loadData(entity: IIndexable, form?: FormGroup) {
    super.loadData(entity, form);
  }

  public initializeData(form?: FormGroup) {
    this.entity = new Projeto();
    this.loadData(this.entity, this.form);
  }

  public async saveData(form?: IIndexable) {
    return new Promise<Projeto>((resolve, reject) => {
      resolve(this.entity!);
    });
  }

  public async addRegra() {
    return {
      id: "NEW",
      nome: "",
      tipo_recurso: "MATERIAL"
    } as IIndexable;
  }

  public async loadRegra(form: FormGroup, row: any) {
    form.controls.nome.setValue(row.nome);
    form.controls.tipo_recurso.setValue(row.tipo_recurso);
    this.cdRef.detectChanges();
  }

  public async removeRegra(row: any) {
    return true;
  }

  public async saveRegra(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.util.md5() : row.id;
      row.nome = form.controls.nome.value;
      row.tipo_recurso = form.controls.tipo_recurso.value;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}



import { ChangeDetectorRef, Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoFase } from 'src/app/models/projeto-fase.model';
import { Projeto } from 'src/app/models/projeto.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'projeto-form-fases',
  templateUrl: './projeto-form-fases.component.html',
  styleUrls: ['./projeto-form-fases.component.scss']
})
export class ProjetoFormFasesComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Projeto | undefined) { super.entity = value; } get entity(): Projeto | undefined { return super.entity; }

  public get items(): ProjetoFase[] {
    if(!this.gridControl.value) this.gridControl.setValue(new Projeto());
    if(!this.gridControl.value.fases) this.gridControl.value.fases = [];
    return this.gridControl.value.fases;
  }

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.dao = injector.get<ProjetoDaoService>(ProjetoDaoService);
    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      descricao: {default: ""},
      cor: {default: ""},
      inicio: {default: null},
      termino: {default: null}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
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

  public get randomColor(): string {
    return this.lookup.CORES[this.items.length % this.lookup.CORES.length].color;
  }

  public async addFase() {
    return {
      id: "NEW",
      nome: "",
      descricao: "",
      cor: this.randomColor,
      inicio: null,
      termino: null
    } as IIndexable;
  }

  public async loadFase(form: FormGroup, row: any) {
    form.controls.nome.setValue(row.nome);
    form.controls.descricao.setValue(row.descricao);
    form.controls.cor.setValue(row.cor);
    form.controls.inicio.setValue(row.inicio);
    form.controls.termino.setValue(row.termino);
    this.cdRef.detectChanges();
  }

  public async removeFase(row: any) {
    return true;
  }

  public async saveFase(form: FormGroup, row: any) {
    let result = undefined;
    this.form!.markAllAsTouched();
    if(this.form!.valid) {
      row.id = row.id == "NEW" ? this.dao!.generateUuid() : row.id;
      row.nome = form.controls.nome.value;
      row.descricao = form.controls.descricao.value;
      row.cor = form.controls.cor.value;
      row.inicio = form.controls.inicio.value;
      row.termino = form.controls.termino.value;
      result = row;
      this.cdRef.detectChanges();
    }
    return result;
  }

}


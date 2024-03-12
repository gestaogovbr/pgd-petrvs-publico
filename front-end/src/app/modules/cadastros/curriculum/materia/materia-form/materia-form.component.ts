import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { Materia } from 'src/app/models/materia.model';
import { MateriaDaoService } from 'src/app/dao/materia-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';

@Component({
  selector: 'materia-form',
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.scss']
})
export class MateriaFormComponent extends PageFormBase<Materia, MateriaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('curso', { static: false }) public curso?: InputSelectComponent;

  public areaDao?: AreaConhecimentoDaoService;
  public cursoDao?: CursoDaoService;
  public cursos: LookupItem[] = [];
  public titulo: LookupItem[] = [];
  public cursoWhere: any[] = [["id", "==", null]];

  constructor(public injector: Injector) {
    super(injector, Materia, MateriaDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService);
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService);
    this.join = ['curso:id,area_id,titulo'];
    this.form = this.fh.FormBuilder({
      area_id: { default: "" },
      curso_id: { default: "" },
      nome: { default: "" },
      titulo: { default: "" },
      horas_aula: { default: 0 },
      ativo: { default: true },
    }, this.cdRef, this.validate);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.curso!.disabled = 'true';
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (['area_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (['curso_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if (['horas_aula'].indexOf(controlName) >= 0 && control.value == 0) {
      result = "Obrigatório";
    }
    if (['titulo'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: Materia, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.form?.controls.area_id.setValue(entity.curso?.area_id);
    this.form?.controls.titulo.setValue(entity.curso?.titulo);
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Materia());
  }

  public saveData(form: IIndexable): Promise<Materia> {
    return new Promise<Materia>((resolve, reject) => {
      const materia = this.util.fill(new Materia(), this.entity!);
      resolve(this.util.fillForm(materia, this.form!.value));
    });
  }

  public titleEdit = (entity: Materia): string => {
    return "Editando " + (entity?.nome || "");
  }

  public onAreaGraducaoChange() {
  }

  public onAreaTituloChange() {
    if (this.form!.controls.area_id.value && this.form!.controls.titulo.value) {
      this.cursoWhere = [['area_id', '==', this.form!.controls.area_id.value], ['titulo', '==', this.form!.controls.titulo.value]];
      this.curso!.disabled = undefined;
      this.cdRef.detectChanges();
    } else {
      this.curso!.disabled = 'true';
    }
  }
}

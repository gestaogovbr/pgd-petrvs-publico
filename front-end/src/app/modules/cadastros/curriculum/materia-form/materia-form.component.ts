import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { Curso } from 'src/app/models/curso.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { TipoCursoDaoService } from 'src/app/dao/tipo-curso-dao.service';
import { Materia } from 'src/app/models/materia.model';
import { MateriaDaoService } from 'src/app/dao/materia-dao.service';

@Component({
  selector: 'materia-form',
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.scss']
})
export class MateriaFormComponent extends PageFormBase<Materia, MateriaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public areaDao ?: AreaConhecimentoDaoService;
  public cursoDao ?: CursoDaoService;

  public cursos: LookupItem[] = [];
  public titulo: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector, Materia, MateriaDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService);
    this.cursoDao = injector.get<CursoDaoService>(CursoDaoService);
    this.form = this.fh.FormBuilder({
      area_materia_id: {default: ""},
      curso_materia_id:{default: ""},
      nome: {default: ""},
      titulo: {default: ""},
      horas_aula: {default:0},
      ativo: {default: true},
           
    }, this.cdRef, this.validate);
  }
 
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    if(['area_materia_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    if(['curso_materia_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if(['horas_aula'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if(['titulo'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Materia, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
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
   /* this.cursoDao?.query({ where: [['area_curso_id', '==', this.form!.controls.area_materia_id.value], ['titulo', 'like', 'GRAD%']] }).getAll().then((cursos2) => {
      this.cursos = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
      this.cdRef.detectChanges();
    });*/
  }

  public onTituloChange(){
    //console.log(this.form!.controls.titulo.value)
    //const titulo = this.lookup.TITULOS_CURSOS_INST.find(x => x.key == this.form!.controls.titulo.value);
    if(this.form!.controls.area_materia_id.value && this.form!.controls.titulo.value){
        this.cursoDao?.query({ where: [['area_curso_id', '==', this.form!.controls.area_materia_id.value],['titulo', '==', this.form!.controls.titulo.value]] }).getAll().then((cursos2) => {
          this.cursos = cursos2.map(x => Object.assign({}, { key: x.id, value: x.nome }) as LookupItem);
          this.cdRef.detectChanges();
        });
    }
  }

}

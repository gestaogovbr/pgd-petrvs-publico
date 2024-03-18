import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { LookupItem } from 'src/app/services/lookup.service';
import { Curso } from 'src/app/models/curso.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { TipoCursoDaoService } from 'src/app/dao/tipo-curso-dao.service';

@Component({
  selector: 'curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent extends PageFormBase<Curso, CursoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public titulos: LookupItem[] = [];
  public areaDao?: AreaConhecimentoDaoService;
  public tipoCursoDao?: TipoCursoDaoService;

  constructor(public injector: Injector) {
    super(injector, Curso, CursoDaoService);
    this.areaDao = injector.get<AreaConhecimentoDaoService>(AreaConhecimentoDaoService);
    this.tipoCursoDao = injector.get<TipoCursoDaoService>(TipoCursoDaoService);
    this.form = this.fh.FormBuilder({
      area_id: { default: "" },
      tipo_curso_id: { default: "" },
      nome: { default: "" },
      titulo: { default: "" },
      ativo: { default: true },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (['nome'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public loadData(entity: Curso, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Curso());
  }

  public saveData(form: IIndexable): Promise<Curso> {
    return new Promise<Curso>((resolve, reject) => {
      const curso = this.util.fill(new Curso(), this.entity!);
      resolve(this.util.fillForm(curso, this.form!.value));
    });
  }

  public titleEdit = (entity: Curso): string => {
    return "Editando " + (entity?.nome || "");
  }
}
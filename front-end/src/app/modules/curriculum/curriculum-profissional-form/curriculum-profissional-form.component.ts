import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { CidadeDaoService } from 'src/app/dao/cidade-dao.service';
import { AreaConhecimentoDaoService } from 'src/app/dao/area-conhecimento-dao.service';
import { CursoDaoService } from 'src/app/dao/curso-dao.service';
import { Curriculum } from 'src/app/models/currriculum.model';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';

@Component({
  selector: 'curriculum-profissional-form',
  templateUrl: './curriculum-profissional-form.component.html',
  styleUrls: ['./curriculum-profissional-form.component.scss']
})
export class CurriculumProfissionalFormComponent extends PageFormBase<Curriculum, CurriculumDaoService> {
   @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

   public testeLookup :LookupItem[]=[{'key':'key 1','value':'value 1'}];

  constructor(public injector: Injector) {
    super(injector, Curriculum, CurriculumDaoService);
    this.form = this.fh.FormBuilder({
      radioDocenciaFora: { default: false },
      radioDocenciaPRF: { default: false },
      radioCursos: { default: false },
      radioPretendoCursos: { default: false },
      radioCursosFora: { default: false },
      radioPretendoCursosFora: { default: false },
      radioPG: { default: false },
      radioInteressePG: { default: false },
      
     
    /** apresentese: { default: "" },
      estados: { default: "" },
      municipios: { default: "" },
      telefone: { default: "" },
      estadoCivil: { default: "" },
      radioFilhos: { default: false },
      qtsFilhos: { default: 0 },
      radioFalaIdioma: { default: false },
      idioma: { default: "" },
      idiomaFala: { default: "" },
      idiomaEscrita: { default: "" },
      idiomaEntendimento: { default: "" },
      idiomasM: { default: [] },
      radioGraduacao: { default: false },
      radioPretendeGraduacao: { default: false },
      area: { default: "" },
      curso: { default: "" },
      graduacao: { default: [] },
      radioPosGraduacao: { default: false },
      radioPretendePosGraduacao: { default: false },
      areaPos: { default: "" },
      cursoPos: { default: "" },
      posgraduacao: { default: [] },
      radioMestrado: { default: false },
      radioPretendeMestrado: { default: false },
      areaMestrado: { default: "" },
      cursoMestrado: { default: "" },
      mestrado: { default: [] },
      radioDoutorado: { default: false },
      radioPretendeDoutorado: { default: false },
      areaDoutorado: { default: "" },
      cursoDoutorado: { default: "" },
      doutorado: { default: [] },
      radioPosDoutorado: { default: false },
      radioPretendePosDoutorado: { default: false },
      areaPosDoutorado: { default: "" },
      cursoPosDoutorado: { default: "" },
      posdoutorado: { default: [] },**/


    })//, this.cdRef, this.validate);

  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    return result;
  }

  public loadData(entity: Curriculum, form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }
  public initializeData(form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }

  public saveData(form: IIndexable): Promise<Curriculum> {
    return new Promise<Curriculum>((resolve, reject) => {
      // this.entity!.usuario_id=this.auth.usuario!.id;
       let curriculum = this.util.fill(new Curriculum(), this.entity!);
       //curriculum.usuario_id=this.auth.usuario?.id;
       curriculum=this.util.fillForm(curriculum, this.form!.value);
       curriculum.usuario_id=this.auth.usuario?.id;
       (this.form?.controls.idiomasM.value as Array<LookupItem>).forEach(element  => curriculum.idiomas.push(element.data));
       resolve(curriculum);
       //resolve(this.util.fillForm(curriculum, this.form!.value));
     });
    };

    public addItemFuncao() : LookupItem | undefined {
      return 
    }

    public onAddClick(){}

}

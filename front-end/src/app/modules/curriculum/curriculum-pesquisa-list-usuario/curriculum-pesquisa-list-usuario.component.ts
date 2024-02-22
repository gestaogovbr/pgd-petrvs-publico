import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CurriculumDaoService } from 'src/app/dao/curriculum-dao.service';
import { CurriculumProfissionalDaoService } from 'src/app/dao/curriculum-profissional-dao.service';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { CurriculumProfissional } from 'src/app/models/currriculum-profissional.model';
import { Curriculum } from 'src/app/models/currriculum.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';

@Component({
  selector: 'curriculum-pesquisa-list-usuario',
  templateUrl: './curriculum-pesquisa-list-usuario.component.html',
  styleUrls: ['./curriculum-pesquisa-list-usuario.component.scss']
})
export class CurriculumPesquisaListUsuarioComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  //@Input() cdRef: ChangeDetectorRef;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: CurriculumProfissional | undefined) { super.entity = value; } get entity(): CurriculumProfissional | undefined { return super.entity; }
 
  public get items(): CurriculumProfissional[] {
    console.log(this.gridControl.value)
    return [this.gridControl.value];
  }

}
/* @Input() set curriculumId(value: string | undefined) {
    if(this._curriculumId != value) {
      this._curriculumId = value;
      this.loadCurriculum();
    }
  }
  //public curriculum : Curriculum[] =[];
  get curriculumId(): string | undefined {
    return this._curriculumId;
  }

  private _curriculumId?: string;

  public set items(value: CurriculumProfissional[]) {
    console.log('VALUE',value)
    if(this.items != value) {
      this.gridControl.value.items = value;
      if(this.viewInit) this.cdRef.detectChanges();
    }    
  }
  
  constructor(public injector: Injector){
    super(injector);
    this.dao = injector.get<CurriculumProfissionalDaoService>(CurriculumProfissionalDaoService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.join = ['historico_atividade_interna.capacidade_tecnica.area_tematica', 'historico_atividade_externa.area_atividade_externa', 'historico_curso_interno.curso', 'historico_curso_externo.area_atividade_externa', 'historico_docencia_interna.curso',
      'historico_docencia_externa.area_atividade_externa', 'historico_funcao.funcao', 'historico_funcao.unidade', 'historico_lotacao.unidade', 'curriculum'];
    
  } 

  public loadCurriculum() {
    this.dao!.query({where: ["id", "==", this.curriculumId], join : this.join}).asPromise().then(row => {
     this.items= (row as CurriculumProfissional[]) || [];
     console.log('ROW PESQUISA', this.items)
    });
  }  */
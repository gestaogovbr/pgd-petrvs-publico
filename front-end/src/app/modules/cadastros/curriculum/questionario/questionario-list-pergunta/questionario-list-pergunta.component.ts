import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';
import { Questionario} from 'src/app/models/questionario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'questionario-list-pergunta',
  templateUrl: './questionario-list-pergunta.component.html',
  styleUrls: ['./questionario-list-pergunta.component.scss']
})
export class QuestionarioListPerguntaComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @Input() cdRef: ChangeDetectorRef;
  @Input() set noPersist(value: string | undefined) { super.noPersist = value; } get noPersist(): string | undefined { return super.noPersist; }
  @Input() set control(value: AbstractControl | undefined) { super.control = value; } get control(): AbstractControl | undefined { return super.control; }
  @Input() set entity(value: Questionario | undefined) { super.entity = value; } get entity(): Questionario | undefined { return super.entity; }

  public get items(): QuestionarioPergunta[] {
    if (!this.gridControl.value) this.gridControl.setValue(new Questionario());
    if (!this.gridControl.value.perguntas) this.gridControl.value.perguntas = [];
    return this.gridControl.value.perguntas;
  }

  constructor(public injector: Injector){
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  } 
}

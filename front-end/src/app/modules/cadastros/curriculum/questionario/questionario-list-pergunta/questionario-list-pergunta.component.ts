import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-questionario-list-pergunta',
  templateUrl: './questionario-list-pergunta.component.html',
  styleUrls: ['./questionario-list-pergunta.component.scss']
})
export class QuestionarioListPerguntaComponent extends PageListBase<QuestionarioPergunta, QuestionarioPerguntaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
  public items : any[] = [];
 
  constructor(public injector: Injector) {
    super(injector, QuestionarioPergunta, QuestionarioPerguntaDaoService);
    /* Inicializações */
   
  }
}

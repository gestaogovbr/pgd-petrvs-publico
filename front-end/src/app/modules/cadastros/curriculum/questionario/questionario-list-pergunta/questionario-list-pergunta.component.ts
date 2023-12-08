import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Questionario} from 'src/app/models/questionario.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'questionario-list-pergunta',
  templateUrl: './questionario-list-pergunta.component.html',
  styleUrls: ['./questionario-list-pergunta.component.scss']
})
export class QuestionarioListPerguntaComponent extends PageFrameBase {
  @ViewChild('listaAtividades', { static: false }) public listaAtividades?: GridComponent;

  @Input() set entregaId(value: string) {
    if(this._entregaId != value) {
      this._entregaId = value;
    }
  }  
  get entregaId(): string {
    return this._entregaId;
  }

  private _entregaId!: string;
  public questionarioDao: QuestionarioDaoService | undefined;
  public items: any[] = [];

  public loader: boolean = false;

  constructor(public injector: Injector){
    super(injector);
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    //this.join = ['unidade', 'usuario','demandante']
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.loadData();
  }
  
  public loadData() {
    this.loader = true;
   // this.questionarioDao.query({where: [["plano_trabalho_entrega_id", "==", this._entregaId]], join: this.join}).asPromise().then(response => {
    this.questionarioDao!.query({}).asPromise().then(response => {
      this.items = response
    }).finally(()=> {
      this.loader = false;
    })
  }
  
}

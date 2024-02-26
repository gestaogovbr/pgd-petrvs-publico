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
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  public curriculum? : any;

  public get items(): CurriculumProfissional[] {
    return [this.curriculum]
    //return [this.gridControl.value];
  }

  public getRow(row: any) {
    console.log('get row',row);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.curriculum = this.metadata?.curriculum;
    console.log('THIS CURRICULUM', this.curriculum)
  }

  public convetToPDF()
  {
      const data = document.getElementById('contentToConvert');
      html2canvas(data!).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      /*pdf.setProperties({
        title:'Dados do usuario',
        subject:'Curriculum - Petrvs',
        author:'Petrvs', 
      })*/
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      const blob = pdf.output('blob');
      window.open(URL.createObjectURL(blob));
      //pdf.output('dataurlnewwindow')
      pdf.save('curriciculum_'+ this.auth.usuario?.nome +'_.pdf'); // Generated PDF
      });
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
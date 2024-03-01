import { ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, SelectMultipleControlValueAccessor } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { CurriculumProfissional } from 'src/app/models/currriculum-profissional.model';
import { Curriculum } from 'src/app/models/currriculum.model';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http'; 
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { QuestionarioPergunta } from 'src/app/models/questionario-pergunta.model';

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

  public curriculum?: any;
  public imagem64 : string ='';
  public questionarios : any[]=[];

  public get items(): CurriculumProfissional[] {
    return [this.curriculum]
  }

  public getPerguntas(){
    this.curriculum = this.metadata?.curriculum;
    if(this.curriculum.usuario.questionarios_respostas.length){
      this.curriculum.usuario.questionarios_respostas.forEach((element: any) => {
         element.questionario.perguntas = element.questionario.perguntas.sort((a : any, b:any) => a.sequencia! < b.sequencia! ? -1 : 1);
         this.questionarios.push({'codigo' : element.questionario.codigo, 'perguntas': element.questionario.perguntas} );
         }
      );
    }
    console.log('questionarios',this.questionarios)
    console.log('dados',this.curriculum)
    //this.curriculum = this.metadata?.curriculum;
  }

  public getRow(row: any) {
    console.log('get row', row);
  }

  images: any[]=[]
  imgBase64 : any = '';

  constructor(public injector: Injector, private http:HttpClient) {
    super(injector);
    this.modalWidth = 1350;

       
  }

  public ngOnInit() {
    super.ngOnInit();
    this.getPerguntas();
    this.imageToBase64();
   
    
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    const btns = [];
    btns.push({ label: "Detalhes", icon: "bi bi-filetype-pdf", color: 'btn-outline-warning', onClick: this.convetToPDF3.bind(this) });
    return btns;
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
      //pdf.addImage(contentDataURL, 'PNG', 0, 0, 208, 295)
      const blob = pdf.output('blob');
      window.open(URL.createObjectURL(blob));
      //pdf.output('dataurlnewwindow')
      pdf.save('curriciculum_'+ this.auth.usuario?.nome +'_.pdf'); // Generated PDF
      });
  }
 

  public async convetToPDF3(img:any)
  {
      //console.log(row)
      const pages = document.getElementById('contentToConvert');
      const doc = new jspdf()//('p', 'mm','a4',true);
      //const image = this.imageToBase64();
      const image= this.imgBase64;
      console.log('IMAGE',image)
      autoTable(doc,{ 
        html: '#my-table',
        bodyStyles: {minCellHeight: 15},
        didDrawCell: (data:any) => {
          if (data.section === 'body' && data.column.index === 2) {
              doc.addImage(image, 'PNG', data.cell.x + 2, data.cell.y + 2, 10, 10)
          }
        },
    
      })
      doc.output("dataurlnewwindow")
      //doc.save('table.pdf')
     
     
      //doc.output("dataurlnewwindow");
      /*doc.html(pages!, {
        callback: (doc: jspdf) => {
            doc.save('pdf-export');
        }
      });*/
  }


  

  public imageToBase64() {
    //const img = row.curriculum.usuario.url_foto
    
    this.http.get(this.auth.usuario?.url_foto!, { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          this.images.push(base64data);
          this.imgBase64 = base64data;
        };

         reader.readAsDataURL(res);

      });
  }

  public async imageToCanvas() {
    let data = document.getElementById('imgProfile');
    let canvasIMG;
    html2canvas(data!).then(canvas => {
    // Few necessary setting options
    let imgWidth = 208;
    let pageHeight = 295;
    let imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
     
    const contentDataURL = canvas.toDataURL('image/png')
    canvasIMG = contentDataURL;
    })
    return canvasIMG;
  }

}


/* public imageToBase64() {
    //const img = row.curriculum.usuario.url_foto
    let imagemBase64;
    this.http.get(this.auth.usuario?.url_foto!,{responseType:"blob"}).subscribe(
      (res:Blob)=>{
        console.log('res',res)
        let reader = new FileReader();
        reader.readAsDataURL(res)
        let ref = this;
        reader.onloadend = function(){
          ref.imgBase64 = reader.result?.toString();
     
        };        
      });
    };*/
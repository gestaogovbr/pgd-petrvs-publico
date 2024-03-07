import { Component, Injector, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';

@Component({
  selector: 'app-curriculum-atributos',
  templateUrl: './curriculum-atributos.component.html',
  styleUrls: ['./curriculum-atributos.component.scss']
})
export class CurriculumAtributosComponent {
  @ViewChild(EditableFormComponent, { static: false })
  
  public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {}

}

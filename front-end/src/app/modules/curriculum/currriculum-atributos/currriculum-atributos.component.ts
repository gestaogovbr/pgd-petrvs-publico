import { Component, Injector, ViewChild } from '@angular/core';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';

@Component({
  selector: 'app-currriculum-atributos',
  templateUrl: './currriculum-atributos.component.html',
  styleUrls: ['./currriculum-atributos.component.scss']
})
export class CurrriculumAtributosComponent {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {}

}

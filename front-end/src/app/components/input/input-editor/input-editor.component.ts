import {Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective} from "@angular/forms";
import {InputBase, LabelPosition} from "../input-base";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
//import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/*class PetrvsEditor extends Plugin {
  init() {
      console.log( 'Petrvs was initialized.' );
  }
}*/

@Component({
  selector: 'input-editor',
  templateUrl: './input-editor.component.html',
  styleUrls: ['./input-editor.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputEditorComponent extends InputBase implements OnInit {
  @ViewChild('editor') editor?: CKEditorComponent;  
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Input() hostClass: string = "";
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() set value(value: string) {
    if(this._value != value) {
      this._value = value;
      this.valueChange.emit(value);
      if(this.control && this.control.value != value) {
        this.control.setValue(value);
      }
      this.cdRef.detectChanges();
    }
  };
  get value(): string {
    return this._value;
  }
  @Output() valueChange = new EventEmitter<string>();
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set size(value: number) {
    this.setSize(value);
  }
  get size(): number {
    return this.getSize();
  }

  public classicEditor = ClassicEditor;
  public configEditor = {
    // Add the Timestamp plugin to config.plugins array.
    /*plugins: [
        Essentials, Paragraph, Heading, List, Bold, Italic, Timestamp
    ],*/
    extraPlugins: [ ],
    toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList' ]
  };


  //public data: string = "";

  constructor(public injector: Injector) {
    super(injector);
    this._value = "";
  }

  public updateEditor() {

  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public onReady(editor: any) {
    //editor.ui.view.editable.editableElement.style.height = '300px';
    //editor.ui.getEditableElement().style.height = '300px';
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(newValue => {
        if(this.value != newValue) {
          this.value = newValue;
          this.updateEditor();
        }
      });
      this.value = this.control.value;
    }
    this.updateEditor();
  }


}

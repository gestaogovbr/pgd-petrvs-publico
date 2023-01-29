import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateListComponent } from './template-list/template-list.component';
import {ComponentsModule} from "../../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
//import { TemplateFormVinculaComponent } from './template-form-vincula/template-form-vincula.component';


@NgModule({
  declarations: [
    TemplateFormComponent,
    TemplateListComponent,
    //TemplateFormVinculaComponent,
  ],
    imports: [
        CommonModule,
        ComponentsModule,
        ReactiveFormsModule,
        TemplateRoutingModule,
        CKEditorModule
    ]
})
export class TemplateModule { }

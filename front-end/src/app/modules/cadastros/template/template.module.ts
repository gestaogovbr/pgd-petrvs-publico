import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateListComponent } from './template-list/template-list.component';
import {ComponentsModule} from "../../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    TemplateFormComponent,
    TemplateListComponent
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

import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { SharedModule } from "../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
//import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
let TemplateModule = class TemplateModule {
};
TemplateModule = __decorate([
    NgModule({
        declarations: [
            TemplateFormComponent,
            TemplateListComponent
        ],
        imports: [
            CommonModule,
            SharedModule,
            ReactiveFormsModule,
            TemplateRoutingModule
            //CKEditorModule
        ]
    })
], TemplateModule);
export { TemplateModule };
//# sourceMappingURL=template.module.js.map
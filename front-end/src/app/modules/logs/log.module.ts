import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogRoutingModule } from './log-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeListComponent } from './change/change-list/change-list.component';
import { ChangeFormComponent } from './change/change-form/change-form.component';
import { ErrorFormComponent } from './error/error-form/error-form.component';
import { ErrorListComponent } from './error/error-list/error-list.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';


@NgModule({
  declarations: [
    ChangeListComponent,
    ChangeFormComponent,
    ErrorListComponent,
    ErrorFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    LogRoutingModule,
    MarkdownModule.forRoot()
  ]
})
export class LogModule { }

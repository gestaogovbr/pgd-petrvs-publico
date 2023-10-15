import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurriculumRoutingModule } from 'src/app/modules/curriculum/curriculum-routing.module';
import { AreaAtividadeExternaFormComponent } from './area-atividade-externa-form/area-atividade-externa-form.component';
import { AreaAtividadeExternaListComponent } from './area-atividade-externa-list/area-atividade-externa-list.component';
import { AreaAtividadeExternaRoutingModule } from './area-atividade-externa-routing.module';



@NgModule({
  declarations: [
    AreaAtividadeExternaFormComponent,
    AreaAtividadeExternaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    AreaAtividadeExternaRoutingModule
    ]  
})
export class AreaAtividadeExternaModule { }

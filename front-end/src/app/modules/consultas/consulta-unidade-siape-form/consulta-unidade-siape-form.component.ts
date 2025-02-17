import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Usuario } from 'src/app/models/usuario.model';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PageFormBase } from '../../base/page-form-base';
import { Unidade } from 'src/app/models/unidade.model';

@Component({
  selector: 'consulta-unidade-siape-form',
  templateUrl: './consulta-unidade-siape-form.component.html',
  styleUrls: ['./consulta-unidade-siape-form.component.scss']
})
export class ConsultaUnidadeSiapeFormComponent extends PageFormBase<Unidade, UnidadeDaoService> {
 
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent

  public unidadeDao: UnidadeDaoService;
  
  public form: FormGroup;
  public erros: string = '';
  public toolbarButtons: ToolbarButton[] = [
    {
      label: "Pesquisar",
      icon: "bi bi-search",
      onClick: () => {
        let error: any = undefined;
          try {
            const unidadeControl = this.form.get('unidade') as FormControl;
            const unidadeValue: string = unidadeControl.value as string;
                    this.loading = false;
                    this.dao!.consultaUnidadeSIAPE(unidadeValue); 
          } catch (error: any) {
            this.erros = error;
          }
      
      }
    }
   ];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
   this.form = this.fh.FormBuilder({
      unidade: {default: ""}, 
    }, this.cdRef, this.validate);
  }


  public initializeData(form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }


  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public loadData(entity: Unidade, form: FormGroup, action?: string): Promise<void> | void {
    throw new Error('Method not implemented.');
  }
  public saveData(form: IIndexable): Promise<boolean | Unidade | NavigateResult | null | undefined> {
    throw new Error('Method not implemented.');
  }


  ngOnInit() {
    super.ngOnInit();
  }

}
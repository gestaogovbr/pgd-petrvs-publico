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

@Component({
  selector: 'consulta-cpf-siape-form',
  templateUrl: './consulta-cpf-siape-form.component.html',
  styleUrls: ['./consulta-cpf-siape-form.component.scss']
})
export class ConsultaCpfSiapeFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent

  public usuarioDao: UsuarioDaoService;
  public usuario?: Usuario;
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
            const cpfControl = this.form.get('cpf') as FormControl;
            const cpfValue: string = cpfControl.value as string;
                    this.loading = false;
                    this.dao!.consultaCPFSIAPE(cpfValue);
          } catch (error: any) {
            this.erros = error;
          }
      
      }
    }
   ];

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
   this.form = this.fh.FormBuilder({
      cpf: {default: ""}, 
    }, this.cdRef, this.validate);
  }

  public loadData(entity: Usuario, form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }

  public initializeData(form: FormGroup): void | Promise<void> {
    //throw new Error('Method not implemented.');
  }

  public saveData(form: IIndexable): Promise<boolean | Usuario | NavigateResult | null | undefined> {
    throw new Error('Method not implemented.');
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['unidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    };
    if(['inicio'].indexOf(controlName) >= 0 && !this.util.isDataValid(control.value)) {
      result = "Data inválida!";
    };
    if(['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero!";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    if(!this.util.isDataValid(this.form.controls.datafim_fimoutempo.value) && this.form!.controls.tipo_calculo.value == 1) {
      return "Para calcular o tempo, o campo DATA-FIM precisa ser válido!";
    };
    if(!this.form.controls.tempo_fimoutempo.value && this.form!.controls.tipo_calculo.value == 0) {
      return "Para calcular a data-fim, o campo TEMPO não pode ser nulo!";
    };
    if((this.form.controls.incluir_afastamentos.value || this.form.controls.incluir_pausas.value) && !this.form.controls.usuario_id.value?.length){
      return "É necessário escolher um Usuário!"
    };
    return undefined;
  }


  ngOnInit() {
    super.ngOnInit();
  }

}
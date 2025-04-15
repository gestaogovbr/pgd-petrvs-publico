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
      label: "Exportar",
      icon: "bi bi-search",
      onClick: () => {
        let error: any = undefined;
          try {
            if (this.form.valid) {
              const cpfControl = this.form.get('cpf') as FormControl;
              const cpfValue: string = cpfControl.value as string;
              this.loading = true;
              this.dao!.exportarCPFSIAPE(cpfValue);
            }
          } catch (error: any) {
            this.erros = error;
          } finally {
            this.loading = false;
          }
      
      }
    },
    {
      label: "Processar",
      icon: "bi bi-gear",
      onClick: async() => {
        let error: any = undefined;
        if (this.form.valid) {
          let confirm = await this.dialog.confirm("ATENÇÃO", "CONFIRMA A SINCRONIZAÇÃO DO REFERIDO CPF?");
          if (confirm) {
            this.loading = false;
            try {
              this.dao!.sincronizarSIAPE(this.form.get('cpf')?.value)
                .subscribe(
                  complete => {

                  },
                  error => {
                    console.log(error);
                    this.error("Erro ao sincronizar dados: " + error.error?.message);
                  }
              )
            } catch (error: any) {
              console.log(error);
              this.erros = error;
            } finally {
              this.loading = false;
            }
          }
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
    if(['cpf'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    };
    return result;
  }

  public async onClickCPF() {
    let error: any = undefined;
    if (this.form.valid) {
      this.loading = false;
      try {
        this.dao!.consultarSIAPE(this.form.get('cpf')?.value)
          .subscribe(
            complete => {
              console.log(complete);
            },
            error => {
              console.log(error);
              this.error("Erro ao sincronizar dados: " + error.error?.message);
            }
        )
      } catch (error: any) {
        console.log(error);
        this.erros = error;
      } finally {
        this.loading = false;
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
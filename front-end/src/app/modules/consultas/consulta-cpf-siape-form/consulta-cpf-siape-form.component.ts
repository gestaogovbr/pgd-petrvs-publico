import { Component, Inject, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Usuario } from 'src/app/models/usuario.model';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PageFormBase } from '../../base/page-form-base';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';

@Component({
  selector: 'consulta-cpf-siape-form',
  templateUrl: './consulta-cpf-siape-form.component.html',
  styleUrls: ['./consulta-cpf-siape-form.component.scss']
})
export class ConsultaCpfSiapeFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  public usuario?: Usuario|null;
  public integranteDao: UnidadeIntegranteDaoService;
  
  public form: FormGroup;
  public erros: string = '';
  public dadosPessoais: any;
  public dadosFuncionais: any;
  public integrantes: IntegranteConsolidado[] = [];

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
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
      this.loading = true;
      this.clearErros();
      try {
        const cpf = this.form.get('cpf')?.value.replace(/\D/g, '');
        const usuarios = await this.dao?.query({ where: [['cpf', '==', cpf]] })
          .asPromise();

        if (usuarios) {
          this.usuario = usuarios[0];
        }

        this.integrantes = [];

        if (this.usuario) {
          const integrantesList = await this.integranteDao!.carregarIntegrantes("", this.usuario.id);
          this.integrantes = integrantesList.integrantes.filter(integrante => integrante.atribuicoes?.length > 0);
        }

        this.dao!.consultarSIAPE(cpf)
          .subscribe(
            result => {
              if (result.success) {
                this.dadosPessoais = result.pessoais;
                this.dadosFuncionais = result.funcionais;

                this.loading = false;

                this.go.navigate(
                  {
                    route: ['consultas', 'cpf-siape-result']
                  },
                  {
                    metadata: {
                      cpf: this.form.get('cpf')?.value,
                      usuario: this.usuario,
                      dadosPessoais: result.pessoais,
                      dadosFuncionais: result.funcionais,
                      integrantes: this.integrantes
                    }
                  }
                );
              }
            },
            error => {
              this.loading = false;
              console.log(error);
              this.error("Erro ao consultar CPF no SIAPE: " + error.error?.message);
            }
        )
      } catch (error: any) {
        this.loading = false;
        console.log(error);
        this.erros = error;
      } finally {
        
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
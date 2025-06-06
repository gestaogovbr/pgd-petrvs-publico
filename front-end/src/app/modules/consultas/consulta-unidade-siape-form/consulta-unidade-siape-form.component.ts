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
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
  selector: 'consulta-cpf-siape-form',
  templateUrl: './consulta-unidade-siape-form.component.html',
  styleUrls: ['./consulta-unidade-siape-form.component.scss']
})
export class ConsultaUnidadeSiapeFormComponent extends PageFormBase<Unidade, UnidadeDaoService> {
  
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  public unidade?: Unidade|null;
  public integranteDao: UnidadeIntegranteDaoService;
  
  public form: FormGroup;
  public erros: string = '';
  public dados: any;
  public integrantes: IntegranteConsolidado[] = [];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.form = this.fh.FormBuilder({
      unidade: {default: ""}, 
    }, this.cdRef, this.validate);
  }


  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['unidade'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    };
    return result;
  }

  public async onClickUnidade() {
    let error: any = undefined;
    if (this.form.valid) {
      this.loading = true;
      this.clearErros();
      try {
        const codigoUnidade = this.form.get('unidade')?.value.replace(/\D/g, '');
        const unidades = await this.dao?.query({ where: [['codigo', '==', codigoUnidade]] })
          .asPromise();

        if (unidades) {
          this.unidade = unidades[0];
        }

        this.integrantes = [];

        if (this.unidade) {
          const integrantesList = await this.integranteDao!.carregarIntegrantes(this.unidade.id,"");
          this.integrantes = integrantesList.integrantes.filter(integrante => integrante.atribuicoes?.length > 0);
        }

        this.dao!.consultaUnidadeSIAPE(codigoUnidade)
          .subscribe(
            result => {
              if (result.success) {
                this.dados = result.dados;

                this.loading = false;

                this.go.navigate(
                  {
                    route: ['consultas', 'unidade-siape-result']
                  },
                  {
                    metadata: {
                      codigoUnidade: this.form.get('unidade')?.value,
                      unidade: this.unidade,
                      dados: result.dados,
                      integrantes: this.integrantes
                    }
                  }
                );
              }
            },
            error => {
              this.loading = false;
              console.log(error);
              this.error("Erro ao consultar Unidade no SIAPE: " + error.error?.message);
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

  public loadData(entity: Unidade, form: FormGroup, action?: string): Promise<void> | void {
    // throw new Error('Method not implemented.');
  }
  public initializeData(form: FormGroup): Promise<void> | void {
    // throw new Error('Method not implemented.');
  }
  public saveData(form: IIndexable): Promise<boolean | Unidade | NavigateResult | null | undefined> {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
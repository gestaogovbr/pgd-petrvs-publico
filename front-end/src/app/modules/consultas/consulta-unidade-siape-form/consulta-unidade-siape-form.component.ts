import { Component, Injector, ViewChild, ViewRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PageFormBase } from '../../base/page-form-base';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { Unidade } from 'src/app/models/unidade.model';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';

@Component({
    selector: 'consulta-unidade-siape-form',
    templateUrl: './consulta-unidade-siape-form.component.html',
    styleUrls: ['./consulta-unidade-siape-form.component.scss'],
    standalone: false
})
export class ConsultaUnidadeSiapeFormComponent extends PageFormBase<Unidade, UnidadeDaoService> {
  private readonly mensagemSiapeIndisponivel = 'Não foi possível consultar a unidade no SIAPE neste momento. Verifique se o ambiente possui configuração de acesso ao SIAPE ou tente novamente mais tarde.';

  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  public unidade?: Unidade|null;
  public integranteDao: UnidadeIntegranteDaoService;

  public form: FormGroup;
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

        const result = await firstValueFrom(this.dao!.consultaUnidadeSIAPE(codigoUnidade));
        const status = Number(result?.status);
        const hasResponseStatus = Number.isInteger(status);
        const isSuccessStatus = !hasResponseStatus || [200, 201].includes(status);

        if (isSuccessStatus && result?.success) {
          this.dados = result.dados;

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
          return;
        }

        this.showSiapeError(result);
      } catch (error: any) {
        console.log(error);
        this.showSiapeError(error);
      } finally {
        this.loading = false;
        this.detectChangesIfActive();
      }
    }
  }

  private showSiapeError(error: any): void {
    const message = this.getSiapeErrorMessage(error);
    this.error(message);
  }

  private detectChangesIfActive(): void {
    const viewRef = this.cdRef as ViewRef;

    if (!viewRef.destroyed) {
      this.cdRef.detectChanges();
    }
  }

  private getSiapeErrorMessage(error: any): string {
    const message = error?.error?.error
      || error?.error?.message
      || error?.message
      || error?.error
      || error;

    if (typeof message === 'string' && message.trim().length) {
      const trimmedMessage = message.trim();
      if (this.isSiapeConfigurationError(trimmedMessage)) {
        return this.mensagemSiapeIndisponivel;
      }

      return trimmedMessage;
    }

    const status = error?.status;
    if (typeof status === 'number' && status > 0) {
      return `Falha na consulta (status ${status}).`;
    }

    return 'Falha na consulta.';
  }

  private isSiapeConfigurationError(message: string): boolean {
    const normalizedMessage = message.toLowerCase();

    return normalizedMessage.includes('curl error')
      || normalizedMessage.includes('url rejected')
      || normalizedMessage.includes('no host part in the url')
      || normalizedMessage.includes('could not resolve host')
      || normalizedMessage.includes('failed to connect');
  }

  public loadData(_entity: Unidade, _form: FormGroup, _action?: string): Promise<void> | void {
    // throw new Error('Method not implemented.');
  }
  public initializeData(_form: FormGroup): Promise<void> | void {
    // throw new Error('Method not implemented.');
  }
  public saveData(_form: IIndexable): Promise<boolean | Unidade | NavigateResult | null | undefined> {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

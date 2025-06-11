import { Component, Inject, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PageFormBase } from '../../base/page-form-base';
import { firstValueFrom } from 'rxjs';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { DialogService } from 'src/app/services/dialog.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { Unidade } from 'src/app/models/unidade.model';

@Component({
  selector: 'consulta-unidade-siape-result',
  templateUrl: './consulta-unidade-siape-result.component.html',
  styleUrls: ['./consulta-unidade-siape-result.component.scss']
})
export class ConsultaUnidadeSiapeResultComponent extends PageFormBase<Unidade, UnidadeDaoService> {

  

  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  public unidade?: Unidade|null;
  public integranteDao: UnidadeIntegranteDaoService;
  public erros: string = '';
  public log: string = '';

  public codigoUnidade: string|null = null;
  public dados: any;
  public integrantes: IntegranteConsolidado[] = [];
  public dialog: DialogService;

  public toolbarButtons: ToolbarButton[] = [
    {
      label: "Baixar Dados",
      icon: "bi bi-download",
      onClick: async() => {
        let error: any = undefined;
        this.loading = true;
        try {
          const response = await firstValueFrom(this.dao!.exportarUnidadeSIAPE(this.codigoUnidade as string));

          const contentType = response.type; 
          const dataCriacao = new Date().toISOString().slice(0, 10);
      
          const extensoes: Record<string, string> = {
            'application/xml': 'xml',
            'text/plain': 'txt',
            'application/zip': 'zip',
          };
          
          const extensao = extensoes[contentType] ?? (console.warn('Tipo de conteúdo inesperado:', contentType), 'txt');
          
    
          const nomeArquivo = `dados_unidade_${this.codigoUnidade}_${dataCriacao}.${extensao}`;
    
          const blob = new Blob([response], { type: contentType });
          const url = window.URL.createObjectURL(blob);
    
          const link = document.createElement('a');
          link.href = url;
          link.download = nomeArquivo;
          link.click();
    
          window.URL.revokeObjectURL(url);

          this.loading = false;
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
        let confirm = await this.dialog.confirm("ATENÇÃO", "CONFIRMA A SINCRONIZAÇÃO DA UNIDADE?");
        if (confirm) {
          this.loading = true;
          this.log = 'Processando...';
          try {
            this.dao!.sincronizarSIAPE(this.codigoUnidade as string)
              .subscribe(
                async result => {
                  this.loading = false;
                  if (result?.success) {
                    await this.loadUnidade();
                    this.dialog.alert("Sucesso", result.message);
                    this.log = result.log;
                  } else {
                    this.dialog.alert("Erro", "Erro ao processar a Unidade: " + result?.message);
                  }
                  this.downloadSiape();
                },
                error => {
                  this.loading = false;
                  console.log(error);
                  this.log = error.error?.message;
                  this.error("Erro ao processar a Unidade: " + error.error?.message);
                  this.dialog.alert("Erro", "Erro ao processar a Unidade: " + (error.message ?? error.error?.message));
                }
            )
          } catch (error: any) {
            this.loading = false;
            console.log(error);
            this.erros = error;
          }
        }
      }
    }
   ];

  constructor(public injector: Injector) {
    super(injector, Unidade, UnidadeDaoService);
    this.dialog = this.injector.get<DialogService>(DialogService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
  }

  public loadData(entity: Unidade, form: FormGroup, action?: string): Promise<void> | void {
    throw new Error('Method not implemented.');
  }
  public saveData(form: IIndexable): Promise<boolean | Unidade | NavigateResult | null | undefined> {
    throw new Error('Method not implemented.');
  }


  public initializeData(form: FormGroup): void | Promise<void> {
  }


  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['cpf'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    };
    return result;
  }

  ngOnInit() {
    super.ngOnInit();

    if(this.metadata?.unidade) {
      this.codigoUnidade = this.metadata?.codigoUnidade;
      this.title = 'Dados da Unidade: ' + this.codigoUnidade;
    }

    if(this.metadata?.unidade) {
      this.unidade = this.metadata?.unidade;
    }

    if(this.metadata?.dados) {
      this.dados = this.metadata?.dados;
    }


    if(this.metadata?.integrantes) {
      this.integrantes = this.metadata?.integrantes;
    }
  }

  public async downloadSiape() {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.dao!.baixaLogSiape(this.codigoUnidade as string));
      const contentType = response.type; 
      const dataCriacao = new Date().toISOString().slice(0, 10);
  
      const extensoes: Record<string, string> = {
        'application/xml': 'xml',
        'text/plain': 'log',
        'application/zip': 'zip',
      };
      
      const extensao = extensoes[contentType] ?? (console.warn('Tipo de conteúdo inesperado:', contentType), 'txt');
  
      const nomeArquivo = `log_unidade_${this.codigoUnidade}_${dataCriacao}.${extensao}`;
  
      const blob = new Blob([response], { type: contentType });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = nomeArquivo;
      link.click();
  
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      this.erros = error;
    } finally {
      this.loading = false;
    }
  }

  public async loadUnidade() {
    this.loading = true;
    try {
      const codigo = this.codigoUnidade?.replace(/\D/g, '');
      const unidades = await this.dao?.query({ where: [['codigo', '==', codigo]] })
        .asPromise();

      if (unidades) {
        this.unidade = unidades[0];
      }

    } finally {
      this.loading = false;
    }
  }

}
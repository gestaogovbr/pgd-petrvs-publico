import { Component, Injector, ViewChild, TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar-types';
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
    styleUrls: ['./consulta-unidade-siape-result.component.scss'],
    standalone: false
})
export class ConsultaUnidadeSiapeResultComponent extends PageFormBase<Unidade, UnidadeDaoService> {

  

  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  @ViewChild('resumoTpl') resumoTpl?: TemplateRef<any>;
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
                    if (result?.resumo) {
                      const relatorio = await this.obterRelatorioProcessamentoSafely();
                      await this.mostrarResumo(result.resumo, result.message, relatorio);
                    } else {
                      this.dialog.alert("Sucesso", result.message);
                    }
                    this.log = result.log;
                  } else {
                    if (result?.resumo) {
                      const relatorio = await this.obterRelatorioProcessamentoSafely();
                      await this.mostrarResumo(result.resumo, "Erro ao processar a Unidade: " + result?.message, relatorio);
                    } else {
                      this.dialog.alert("Erro", "Erro ao processar a Unidade: " + result?.message);
                    }
                  }
                  this.downloadSiape();
                },
                async error => {
                  this.loading = false;
                  console.log(error);
                  const result = error.error;
                  if (result?.resumo) {
                    const relatorio = await this.obterRelatorioProcessamentoSafely();
                    await this.mostrarResumo(result.resumo, "Erro ao processar a Unidade: " + (result.message ?? error.message), relatorio);
                  } else {
                    this.dialog.alert("Erro", "Erro ao processar a Unidade: " + (error.message ?? error.error?.message));
                  }
                  this.log = result?.log ?? error.error?.message ?? error.message;
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

  public loadData(_entity: Unidade, _form: FormGroup, _action?: string): Promise<void> | void {
    throw new Error('Method not implemented.');
  }
  public saveData(_form: IIndexable): Promise<boolean | Unidade | NavigateResult | null | undefined> {
    throw new Error('Method not implemented.');
  }


  public initializeData(_form: FormGroup): void | Promise<void> {
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
      const unidades = await this.dao?.query({ where: [['codigo', '==', codigo]], join: ['gestor.usuario:cpf', 'unidadePai:codigo'] })
        .asPromise();

      if (unidades) {
        this.unidade = unidades[0];
      }

    } finally {
      this.loading = false;
    }
  }

  private async obterRelatorioProcessamentoSafely(): Promise<{ chefeCpf?: string | null; quantidadeServidoresLotados?: number | null } | undefined> {
    try {
      const response = await firstValueFrom(this.dao!.relatorioProcessamentoSIAPE(this.codigoUnidade as string));
      return {
        chefeCpf: response?.chefeCpf ?? response?.chefe_cpf ?? this.dados?.cpfTitularAutoridadeUorg ?? this.unidade?.gestor?.usuario?.cpf ?? null,
        quantidadeServidoresLotados: response?.quantidadeServidoresLotados ?? response?.quantidade_servidores_lotados ?? null
      };
    } catch {
      return {
        chefeCpf: this.dados?.cpfTitularAutoridadeUorg ?? this.unidade?.gestor?.usuario?.cpf ?? null,
        quantidadeServidoresLotados: null
      };
    }
  }

  private async mostrarResumo(resumo: any[], titulo: string, relatorio?: { chefeCpf?: string | null; quantidadeServidoresLotados?: number | null }) {
    if (!Array.isArray(resumo)) {
      this.dialog.alert(titulo, 'Resumo inválido');
      return;
    }
    
    if (this.resumoTpl) {
      const dialogResult = await this.dialog.template(
        { title: titulo, modalWidth: 700 },
        this.resumoTpl,
        [{ label: "Ok", color: "btn-primary", value: true }],
        { resumo: resumo, relatorio: relatorio }
      ).asPromise();
      
      if (dialogResult?.button?.label === "Ok" && dialogResult?.dialog) {
        dialogResult.dialog.close();
      }
    } else {
      let msg = '';
      resumo.forEach((item, index) => {
        msg += `Servidor ${index + 1}:\n`;
        msg += `Status: ${item.status}\n`;
        msg += `Mensagem: ${item.mensagem}\n`;
        msg += '\n';
      });
      await this.dialog.alert(titulo, msg);
    }
  }

}

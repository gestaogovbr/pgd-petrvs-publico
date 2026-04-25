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
import { SiapeRelatorioUnidade, SiapeResumoItem } from '../consulta-cpf-siape-result/siape-resumo/siape-resumo.component';

interface SiapeRelatorioProcessamentoResponse extends SiapeRelatorioUnidade {
  success?: boolean;
  message?: string;
}

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
  public ultimoRelatorioCargaId?: string;
  public override mensagemCarregando = "Carregando dados do formulário, aguarde...";

  public toolbarButtons: ToolbarButton[] = [
    {
      label: "Baixar Dados",
      icon: "bi bi-download",
      color: "btn-outline-secondary",
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
      label: "Ver relatório da carga",
      icon: "bi bi-clipboard-data",
      color: "btn-outline-primary",
      dynamicVisible: () => !!this.ultimoRelatorioCargaId,
      onClick: () => this.abrirRelatorioCarga()
    },
    {
      label: "Processar",
      icon: "bi bi-gear",
      color: "btn-success",
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
                  this.ultimoRelatorioCargaId = result?.relatorio_carga_id ?? result?.relatorio_carga?.id ?? this.ultimoRelatorioCargaId;
                  if (result?.success) {
                    await this.loadUnidade();
                    if (result?.resumo) {
                      const relatorio = await this.obterRelatorioProcessamentoSafely();
                      await this.mostrarResumo(result.resumo, result.message, relatorio, this.ultimoRelatorioCargaId);
                    } else {
                      this.dialog.alert("Sucesso", result.message);
                    }
                    this.log = result.log;
                  } else {
                    if (result?.resumo) {
                      const relatorio = await this.obterRelatorioProcessamentoSafely();
                      await this.mostrarResumo(result.resumo, "Erro ao processar a Unidade: " + result?.message, relatorio, this.ultimoRelatorioCargaId);
                    } else {
                      this.dialog.alert("Erro", "Erro ao processar a Unidade: " + result?.message);
                    }
                  }
                },
                async error => {
                  this.loading = false;
                  const result = error.error;
                  this.ultimoRelatorioCargaId = result?.relatorio_carga_id ?? result?.relatorio_carga?.id ?? this.ultimoRelatorioCargaId;
                  if (result?.resumo) {
                    const relatorio = await this.obterRelatorioProcessamentoSafely();
                    await this.mostrarResumo(result.resumo, "Erro ao processar a Unidade: " + (result.message ?? error.message), relatorio, this.ultimoRelatorioCargaId);
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

  private async obterRelatorioProcessamentoSafely(): Promise<SiapeRelatorioUnidade | undefined> {
    try {
      const response = await firstValueFrom(this.dao!.relatorioProcessamentoSIAPE(this.codigoUnidade as string)) as SiapeRelatorioProcessamentoResponse;
      return {
        chefeCpf: response?.chefeCpf ?? this.dados?.cpfTitularAutoridadeUorg ?? this.unidade?.gestor?.usuario?.cpf ?? null,
        quantidadeServidoresLotados: response?.quantidadeServidoresLotados ?? null,
        unidade: response?.unidade ?? this.unidadeRelatorioFallback()
      };
    } catch {
      return {
        chefeCpf: this.dados?.cpfTitularAutoridadeUorg ?? this.unidade?.gestor?.usuario?.cpf ?? null,
        quantidadeServidoresLotados: null,
        unidade: this.unidadeRelatorioFallback()
      };
    }
  }

  private async mostrarResumo(resumo: SiapeResumoItem[], titulo: string, relatorio?: SiapeRelatorioUnidade, relatorioCargaId?: string) {
    if (!Array.isArray(resumo)) {
      this.dialog.alert(titulo, 'Resumo inválido');
      return;
    }
    
    if (this.resumoTpl) {
      const buttons = relatorioCargaId
        ? [
            { label: "Baixar log", color: "btn-outline-secondary", value: "log" },
            { label: "Ver relatório da carga", color: "btn-outline-primary", value: "relatorio" },
            { label: "Ok", color: "btn-outline-secondary", value: true }
          ]
        : [
            { label: "Baixar log", color: "btn-outline-secondary", value: "log" },
            { label: "Ok", color: "btn-outline-secondary", value: true }
          ];
      const dialogResult = await this.dialog.template(
        { title: titulo, modalWidth: 700 },
        this.resumoTpl,
        buttons,
        { resumo: resumo, relatorio: relatorio }
      ).asPromise();

      if (dialogResult?.button?.value === "log") {
        dialogResult.dialog.close();
        await this.downloadSiape();
        return;
      }
      
      if (dialogResult?.button?.value === "relatorio" && relatorioCargaId) {
        dialogResult.dialog.close();
        this.abrirRelatorioCarga(relatorioCargaId);
        return;
      }

      if (dialogResult?.button?.label === "Ok" && dialogResult?.dialog) {
        dialogResult.dialog.close();
      }
    } else {
      let msg = '';
      resumo.forEach((item, index) => {
        msg += `Unidade ${index + 1}:\n`;
        msg += `Status: ${item.status}\n`;
        msg += `Mensagem: ${item.mensagem}\n`;
        if ('unidade_codigo' in item) {
          msg += `Código: ${item.unidade_codigo ?? 'Não informado'}\n`;
          msg += `Nome: ${item.unidade_nome ?? 'Não informado'}\n`;
          msg += `Unidade pai: ${item.unidade_raiz ? 'Unidade raiz' : (item.unidade_pai_codigo ?? 'Não informada')}\n`;
          msg += `Servidores lotados: ${item.quantidade_servidores_lotados ?? 'Não informado'}\n`;
        }
        msg += '\n';
      });
      await this.dialog.alert(titulo, msg);
    }
  }

  private unidadeRelatorioFallback(): SiapeRelatorioUnidade['unidade'] {
    if (!this.unidade) {
      return null;
    }

    return {
      id: this.unidade.id,
      codigo: this.unidade.codigo,
      sigla: this.unidade.sigla,
      nome: this.unidade.nome,
      unidade_pai_id: this.unidade.unidade_pai_id,
      unidade_pai_codigo: this.unidade.unidade_pai?.codigo ?? this.dados?.codUorgPai ?? null,
      unidade_pai_sigla: this.unidade.unidade_pai?.sigla ?? null,
      unidade_raiz: this.unidade.unidade_pai_id === null
    };
  }

  public abrirRelatorioCarga(relatorioCargaId: string = this.ultimoRelatorioCargaId ?? ''): void {
    if (!relatorioCargaId) return;

    this.go.navigate(
      { route: ['relatorios', 'carga-individual-siape'], params: { id: relatorioCargaId } },
      { metadata: { relatorioId: relatorioCargaId } }
    );
  }

}

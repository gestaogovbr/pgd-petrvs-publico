import { Component, Inject, Injector, ViewChild, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Usuario } from 'src/app/models/usuario.model';
import { NavigateResult } from 'src/app/services/navigate.service';
import { PageFormBase } from '../../base/page-form-base';
import { firstValueFrom } from 'rxjs';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';
import { DialogService } from 'src/app/services/dialog.service';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';

@Component({
  selector: 'consulta-cpf-siape-result',
  templateUrl: './consulta-cpf-siape-result.component.html',
  styleUrls: ['./consulta-cpf-siape-result.component.scss']
})
export class ConsultaCpfSiapeResultComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  @ViewChild('resumoTpl') resumoTpl?: TemplateRef<any>;
  public usuarios: Usuario[] = [];
  public integranteDao: UnidadeIntegranteDaoService;
  public erros: string = '';
  public log: string = '';

  public cpf: string|null = null;
  public dadosPessoais: any;
  public dadosFuncionais: any;
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
          const response = await firstValueFrom(this.dao!.exportarCPFSIAPE(this.cpf as string));

          const contentType = response.type; 
          const dataCriacao = new Date().toISOString().slice(0, 10);
      
          const extensoes: Record<string, string> = {
            'application/xml': 'xml',
            'text/plain': 'txt',
            'application/zip': 'zip',
          };
          
          const extensao = extensoes[contentType] ?? (console.warn('Tipo de conteúdo inesperado:', contentType), 'txt');
          
    
          const nomeArquivo = `dados_cpf_${this.cpf}_${dataCriacao}.${extensao}`;
    
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
        let confirm = await this.dialog.confirm("ATENÇÃO", "CONFIRMA A SINCRONIZAÇÃO DO USUÁRIO?");
        if (confirm) {
          this.loading = true;
          this.log = 'Processando...';
          try {
            this.dao!.sincronizarSIAPE(this.cpf as string)
              .subscribe(
                async result => {
                  this.loading = false;
                  if (result?.success) {
                    await this.loadUsuario();
                    if(result.resumo) {
                        this.mostrarResumo(result.resumo, result.message);
                    } else {
                        this.dialog.alert("Sucesso", result.message);
                    }
                    this.log = result.log;
                  } else {
                    if (result?.resumo) {
                        this.mostrarResumo(result.resumo, "Erro ao processar CPF: " + result?.message);
                    } else {
                        this.dialog.alert("Erro", "Erro ao processar CPF: " + result?.message);
                    }
                  }
                  this.downloadSiape();
                },
                error => {
                  this.loading = false;
                  console.log(error);
                  const result = error.error;
                  if (result?.resumo) {
                      this.mostrarResumo(result.resumo, "Erro ao processar CPF: " + (result.message ?? error.message));
                  } else {
                      this.dialog.alert("Erro", "Erro ao processar CPF: " + (result?.message ?? error.message));
                  }
                  this.log = result?.log ?? error.message;
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
    super(injector, Usuario, UsuarioDaoService);
    this.dialog = this.injector.get<DialogService>(DialogService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
  }

  public loadData(entity: Usuario, form: FormGroup): void | Promise<void>
  {
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

  ngOnInit() {
    super.ngOnInit();

    if(this.metadata?.cpf) {
      this.cpf = this.metadata?.cpf;
      this.title = 'Dados do CPF: ' + this.cpf;
    }

    if(this.metadata?.usuario) {
      this.usuarios = Array.isArray(this.metadata?.usuario) ? this.metadata?.usuario : [this.metadata?.usuario];
    }

    if(this.metadata?.dadosPessoais) {
      this.dadosPessoais = this.metadata?.dadosPessoais;
    }

    if(this.metadata?.dadosFuncionais) {
      this.dadosFuncionais = this.metadata?.dadosFuncionais;
    }

    if(this.metadata?.integrantes) {
      this.integrantes = this.metadata?.integrantes;
    }

    if (this.cpf) {
      this.loadUsuario();
    }
  }

  public async downloadSiape() {
    this.loading = true;
    try {
      const response = await firstValueFrom(this.dao!.baixaLogSiape(this.cpf as string));
      const contentType = response.type; 
      const dataCriacao = new Date().toISOString().slice(0, 10);
  
      const extensoes: Record<string, string> = {
        'application/xml': 'xml',
        'text/plain': 'txt',
        'application/zip': 'zip',
      };
      
      const extensao = extensoes[contentType] ?? (console.warn('Tipo de conteúdo inesperado:', contentType), 'txt');
  
      const nomeArquivo = `log_cpf_${this.cpf}_${dataCriacao}.${extensao}`;
  
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

  public getIntegrantesByUsuario(usuarioId: string): IntegranteConsolidado[] {
    return this.integrantes.filter(integrante => integrante.usuario_id === usuarioId);
  }

  public async loadUsuario() {
    this.loading = true;
    try {
      const cpf = this.cpf?.replace(/\D/g, '');
      const usuarios = await this.dao!.query({ where: [['cpf', '==', cpf]] }).getAll();

      this.usuarios = usuarios ?? [];

      this.integrantes = [];
      for (const usuario of this.usuarios) {
        const integrantesList = await this.integranteDao!.carregarIntegrantes("", usuario.id);
        const integrantesUsuario = integrantesList.integrantes.filter(integrante => integrante.atribuicoes?.length > 0);
        this.integrantes.push(...integrantesUsuario);
      }
    } finally {
      this.loading = false;
    }
  }

  private mostrarResumo(resumo: any[], titulo: string) {
    if (!Array.isArray(resumo)) {
        this.dialog.alert(titulo, 'Resumo inválido');
        return;
    }
    
    if (this.resumoTpl) {
      this.dialog.template({ title: titulo, modalWidth: 700 }, this.resumoTpl, [{ label: "Ok", color: "btn-primary" }], { resumo: resumo });
    } else {
      // Fallback in case template is not loaded for some reason
      let msg = '';
      resumo.forEach((item, index) => {
          msg += `Usuario ${index + 1}:\n`;
          msg += `Status: ${item.status}\n`;
          msg += `Mensagem: ${item.mensagem}\n`;
          msg += `Existia: ${item.usuario_existia ? 'Sim' : 'Não'}\n`;
          msg += `Inserido: ${item.usuario_inserido ? 'Sim' : 'Não'}\n`;
          msg += `Lotação Associada: ${item.lotacao_associada ? 'Sim' : 'Não'}\n`;
          if (item.alteracoes && item.alteracoes.length > 0) {
              msg += `Alterações: ${item.alteracoes.join(', ')}\n`;
          }
          msg += '\n';
      });
      this.dialog.alert(titulo, msg);
    }
  }

}
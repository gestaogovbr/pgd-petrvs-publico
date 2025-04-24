import { Component, Inject, Injector, ViewChild } from '@angular/core';
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

@Component({
  selector: 'consulta-cpf-siape-result',
  templateUrl: './consulta-cpf-siape-result.component.html',
  styleUrls: ['./consulta-cpf-siape-result.component.scss']
})
export class ConsultaCpfSiapeResultComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent
  public usuario?: Usuario|null;
  public unidadeDao: UnidadeDaoService;
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
        let confirm = await this.dialog.confirm("ATENÇÃO", "CONFIRMA A SINCRONIZAÇÃO DO REFERIDO CPF?");
        if (confirm) {
          this.loading = true;
          this.log = 'Processando...';
          try {
            this.dao!.sincronizarSIAPE(this.cpf as string)
              .subscribe(
                result => {
                  this.loading = false;
                  this.dialog.alert("Sucesso", "Processamento concluído! Verifique o log de processamento");
                  this.log = result;
                },
                error => {
                  this.loading = false;
                  console.log(error);
                  this.log = error.error?.message;
                  this.error("Erro ao processar CPF: " + error.error?.message);
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
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
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
      this.usuario = this.metadata?.usuario;
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
  }

}
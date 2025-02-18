import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { IntegracaoDaoService } from 'src/app/dao/integracao-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Integracao } from 'src/app/models/integracao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-integracao-form',
  templateUrl: './integracao-form.component.html',
  styleUrls: ['./integracao-form.component.scss']
})
export class IntegracaoFormComponent extends PageFormBase<Integracao, IntegracaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('entidade', { static: false }) public entidade?: InputTextComponent;
  @ViewChild('usuario', { static: false })  public usuario?: InputTextComponent;

  public form: FormGroup;
  public entidadeDao: EntidadeDaoService;
  public confirmLabel: string = "Executar";
  public production: boolean = false;
  public resultado_unidades: string = '';
  public obs_unidades: string[] = [];
  public falhas_unidades: string[] = [];
  public resultado_servidores: string = '';
  public obs_servidores: string[] = [];
  public falhas_servidores: string[] = [];
  public resultado_gestores: string = '';
  public obs_gestores: string[] = [];
  public falhas_gestores: string[] = [];
  public processamentos: any = {};
    
  constructor(public injector: Injector, dao: IntegracaoDaoService) {
    super(injector, Integracao, IntegracaoDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.form = this.fh.FormBuilder({
      atualizar_unidades: {default: false},
      atualizar_servidores: {default: false},
      atualizar_gestores: {default: true},
      usar_arquivos_locais: {default: false},
      gravar_arquivos_locais: {default: false},
      entidade_id: {default: ""},
      usuario_id: {default: ""},
      data_execucao: {default: ""},
      resultado: {default: ""}
    }, this.cdRef, this.validate);
    this.join = ["entidade", "usuario"];
  }

  public loadData(entity: Integracao, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.preparaFormulario(entity);
  }

  public preparaFormulario(entity: Integracao) {
    this.production = environment.production;
    this.form.controls.entidade_id.setValue(entity.id ? entity.entidade!.nome : this.auth.unidade?.entidade_id);
    this.form.controls.usuario_id.setValue(entity.id ? (entity.usuario_id ? entity.usuario!.nome : 'Sistema') : this.auth.usuario!.id);
    this.resultado_unidades = entity.id ? JSON.parse(entity.resultado!).unidades.Resultado : ''; 
    this.obs_unidades = entity.id ? JSON.parse(entity.resultado!).unidades.Observações : []; 
    this.falhas_unidades = entity.id ? JSON.parse(entity.resultado!).unidades.Falhas : []; 
    this.resultado_servidores = entity.id ? JSON.parse(entity.resultado!).servidores.Resultado : ''; 
    this.obs_servidores = entity.id ? JSON.parse(entity.resultado!).servidores.Observações : []; 
    this.falhas_servidores = entity.id ? JSON.parse(entity.resultado!).servidores.Falhas : [];     
    this.resultado_gestores = entity.id ? JSON.parse(entity.resultado!).gestores.Resultado : ''; 
    this.obs_gestores = entity.id ? JSON.parse(entity.resultado!).gestores.Observações : []; 
    this.falhas_gestores = entity.id ? JSON.parse(entity.resultado!).gestores.Falhas : []; 
  }

  public initializeData(form: FormGroup): void {    
    this.dao!.buscaProcessamentosPendentes().then((response) => {
      if(response && response.processamentos){
        this.processamentos = response.processamentos;
      }      
    });    
    this.loadData(new Integracao(), form);
  }

  public saveData(form: IIndexable): Promise<Integracao> {
    return new Promise<Integracao>((resolve, reject) => {
      const integracao = this.util.fill(new Integracao(), this.entity!);
      resolve(this.util.fillForm(integracao, this.form!.value));
    });
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['entidade_id', 'usuario_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    if((controlName == 'atualizar_unidades' && control.value) && !this.processamentos.siapeDadosUORG) {
      result = "Nada a ser processado!";
    }
    if((controlName == 'atualizar_servidores' && control.value) && (!this.processamentos.siapeDadosPessoais || !this.processamentos.siapeDadosFuncionais)) {
      result = "Nada a ser processado!";
    }
    return result;
  }
}

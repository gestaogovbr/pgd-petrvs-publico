import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PerfilDaoService } from 'src/app/dao/perfil-dao.service';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UsuarioIntegranteComponent } from '../usuario-integrante/usuario-integrante.component';
import { TemplateDataset } from 'src/app/modules/uteis/templates/template.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { IntegranteConsolidado } from 'src/app/models/unidade-integrante.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends PageFormBase<Usuario, UsuarioDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidadesIntegrantes', { static: false }) public unidadesIntegrantes?: UsuarioIntegranteComponent;
  @ViewChild('lotacao', { static: false }) public lotacao?: InputSearchComponent;

  public formLotacao: FormGroup;
  public perfilDao: PerfilDaoService;
  public unidadeDao: UnidadeDaoService;
  public integranteDao: UnidadeIntegranteDaoService;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public planoDataset: TemplateDataset[]; 
 
  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.perfilDao = injector.get<PerfilDaoService>(PerfilDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.integranteDao = injector.get<UnidadeIntegranteDaoService>(UnidadeIntegranteDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.form = this.fh.FormBuilder({
      email: {default: ""},
      nome: {default: ""},
      cpf: {default: ""},
      matricula: {default: ""},
      apelido: {default: ""},
      telefone: {default: ""},
      uf: {default: ""},
      sexo: {default: null},
      url_foto: {default: ""},
      texto_complementar_plano: {default: ""},
      perfil_id: {default: null},
      atribuicoes: { default: []}
    }, this.cdRef, this.validate);
    this.formLotacao = this.fh.FormBuilder({
      unidade_lotacao_id: {default: ""},
    }, this.cdRef);
    this.planoDataset = this.planoTrabalhoDao.dataset();
    this.join = ["lotacao.unidade:id"];
  }

  public validate = (control: AbstractControl, controlName: string) => {   
    let result = null;
    if(['cpf', 'matricula', 'email', 'nome', 'apelido', 'perfil_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    else if(controlName == "cpf" && !this.util.validarCPF(control.value)) {
      result = "Inválido";
    }
    return result;
  }
  
  public formValidation = (form?: FormGroup) => {
    if(!this.formLotacao?.controls.unidade_lotacao_id.value?.length) {
      return "É obrigatória a definição da unidade de lotação do servidor!";
    };
    const erros_atribuicoes = [];
    form?.controls.atribuicoes.value?.forEach((atribuicao: { nome: string; unidade_id: string }) => {
      if(atribuicao.unidade_id == '') erros_atribuicoes.push({ atribuicao: atribuicao, erro: 'Falta unidade_id'})
    });
    if(erros_atribuicoes.length) return "Salve a unidade antes de salvar o usuário"
    return undefined;
  } 

  public loadData(entity: Usuario, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.formLotacao.controls.unidade_lotacao_id.setValue(entity.lotacao?.unidade?.id);
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Usuario();
    this.loadData(this.entity, form); 
  }
  
  public saveData(form: IIndexable): Promise<boolean> {      
    return new Promise<boolean>((resolve, reject) => {
      this.unidadesIntegrantes!.grid!.confirm();
      let usuario = this.util.fill(new Usuario(), this.entity!);
      usuario = this.util.fillForm(usuario, this.form!.value);
      //usuario.unidades_integrante = usuario.atribuicoes.filter((x: { _status: any; unidade_id: string; nome: string; }) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.unidade_id?.length && x.nome?.length);
      usuario.unidades_integrante = this.unidadesIntegrantes?.grid?.items.filter((x: any) => ["ADD", "EDIT", "DELETE"].includes(x._status || "") && x.unidade_id?.length && x.nome?.length);
      this.dao?.save(usuario).then(async usuario => {
        //if(this.formLotacao.controls.unidade_lotacao_id.value != usuario.lotacao?.unidade_id) this.integranteDao.saveIntegrante([{'unidade_id': this.formLotacao!.controls.unidade_lotacao_id!.value, 'usuario_id': usuario.id, 'atribuicoes': ["LOTADO"]}]);
        resolve(true);
      });
    });
  }

  public titleEdit = (entity: Usuario): string => {
    return "Editando " + this.lex.translate("Usuário") + ': ' + (entity?.matricula || "") + ' - ' + (entity?.apelido || "");
  }

  public onLotacaoChange(){
    //this.unidadesIntegrantes?.items.splice(this.unidadesIntegrantes?.items.indexOf(),1);
  }

}

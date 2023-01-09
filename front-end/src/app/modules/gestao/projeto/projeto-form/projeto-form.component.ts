import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { ProjetoAlocacaoRegra } from 'src/app/models/projeto-alocacao-regra.model';
import { ProjetoAlocacao } from 'src/app/models/projeto-alocacao.model';
import { ProjetoRecurso } from 'src/app/models/projeto-recurso.model';
import { ProjetoRegra } from 'src/app/models/projeto-regra.model';
import { Projeto } from 'src/app/models/projeto.model';
import { Unidade } from 'src/app/models/unidade.model';
import { Usuario } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { ComentariosComponent } from 'src/app/modules/uteis/comentarios/comentarios.component';
import { LookupItem } from 'src/app/services/lookup.service';
import { ProjetoFormAlocacoesComponent } from '../projeto-form-alocacoes/projeto-form-alocacoes.component';
import { ProjetoFormFasesComponent } from '../projeto-form-fases/projeto-form-fases.component';
import { ProjetoFormPrincipalComponent } from '../projeto-form-principal/projeto-form-principal.component';
import { ProjetoFormRecursosComponent } from '../projeto-form-recursos/projeto-form-recursos.component';
import { ProjetoFormRegrasComponent } from '../projeto-form-regras/projeto-form-regras.component';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss']
})
export class ProjetoFormComponent extends PageFormBase<Projeto, ProjetoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('principal', { static: false }) public principal?: ProjetoFormPrincipalComponent;
  @ViewChild('fases', { static: false }) public fases?: ProjetoFormFasesComponent;
  @ViewChild('recursos', { static: false }) public recursos?: ProjetoFormRecursosComponent;
  @ViewChild('alocacoes', { static: false }) public alocacoes?: ProjetoFormAlocacoesComponent;
  @ViewChild('regras', { static: false }) public regras?: ProjetoFormRegrasComponent;
  @ViewChild('comentarios', { static: false }) public comentarios?: ComentariosComponent;

  constructor(public injector: Injector) {
    super(injector, Projeto, ProjetoDaoService);
    this.join = [];
    this.modalWidth = 1200;
    this.form = this.fh.FormBuilder({
    }, this.cdRef, this.validate);
  }
  
  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'pergunta'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }

    return result;
  }

  public loadData(entity: Projeto, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    const regra_escritorio_id = this.dao!.generateUuid();
    const regra_gerente_id = this.dao!.generateUuid();
    const regra_equipe_id = this.dao!.generateUuid();
    const recurso_gerente_id = this.dao!.generateUuid();
    const recurso_escritorio_id = this.dao!.generateUuid();
    const alocacao_gerente_id = this.dao!.generateUuid();
    const alocacao_escritorio_id = this.dao!.generateUuid();
    const alocacao_regra_escritorio_id = this.dao!.generateUuid();
    const alocacao_regra_gerente_id = this.dao!.generateUuid();
    let projeto = new Projeto();
    /* Usuario e Unidade */
    let usuario = new Usuario({
      id: this.auth.usuario!.id,
      nome: this.auth.usuario!.nome,
      email: this.auth.usuario!.email,
      url_foto: this.auth.usuario!.url_foto
    });
    let unidade = new Unidade({
      id: this.auth.unidade!.id,
      codigo: this.auth.unidade!.codigo,
      sigla: this.auth.unidade!.sigla,
      nome: this.auth.unidade!.nome
    });
    /* Carrega Regras, Recursos e Alocações padrões */
    projeto.regras = [new ProjetoRegra({
      id: regra_escritorio_id,
      nome: "Escritório",
      tipo_recurso: "DEPARTAMENTO",
      perfis: ["ESCRITORIO", "ACESSAR"]
    }), new ProjetoRegra({
      id: regra_gerente_id,
      nome: "Gerente",
      tipo_recurso: "HUMANO",
      perfis: ["GERENTE", "ACESSAR"]
    }), new ProjetoRegra({
      id: regra_equipe_id,
      nome: "Equipe",
      tipo_recurso: "HUMANO",
      perfis: ["ACESSAR"]
    })];
    projeto.recursos = [new ProjetoRecurso({
      id: recurso_gerente_id,
      nome: usuario.nome,
      tipo: "HUMANO",
      usuario_id: usuario.id,
      usuario: usuario
    }), new ProjetoRecurso({
      id: recurso_escritorio_id,
      nome: unidade.nome,
      tipo: "DEPARTAMENTO",
      unidade_id: unidade.id,
      unidade: unidade
    })];
    projeto.alocacoes = [new ProjetoAlocacao({
      id: alocacao_gerente_id,
      regras: [new ProjetoAlocacaoRegra({
        id: alocacao_regra_gerente_id,
        regra_id: regra_gerente_id,
        regra: projeto.regras.find(x => x.id == regra_gerente_id),
        projeto_alocacao_id: alocacao_gerente_id
      })],
      recurso_id: recurso_gerente_id,
      recurso: projeto.recursos.find(x => x.id == recurso_gerente_id)
    }), new ProjetoAlocacao({
      id: alocacao_escritorio_id,
      regras: [new ProjetoAlocacaoRegra({
        id: alocacao_regra_escritorio_id,
        regra_id: regra_escritorio_id,
        regra: projeto.regras.find(x => x.id == regra_escritorio_id),
        projeto_alocacao_id: alocacao_escritorio_id
      })],
      recurso_id: recurso_escritorio_id,
      recurso: projeto.recursos.find(x => x.id == recurso_escritorio_id)
    })];
    /* Carrega projeto */
    this.entity = projeto;
    this.cdRef.detectChanges();
    this.loadData(this.entity, form);    
  }

  public async saveData(form: IIndexable): Promise<Projeto> {
    await Promise.all([
      this.principal!.saveData(),
      this.fases!.saveData(),
      this.recursos!.saveData(),
      this.alocacoes!.saveData(),
      this.regras!.saveData(),
      this.comentarios!.saveData()
    ]);
    return this.entity! as Projeto;
  }

  public onTabsSelect() {
    console.log("Chamou");
    this.saveData(this.form!);
  }

  public titleEdit = (entity: Projeto): string => {
    return "Editando " + (entity?.nome || "");
  }

  public get titleProjeto(): string {
    return this.entity?.numero ? "#" + this.entity?.numero : "";
  }

}


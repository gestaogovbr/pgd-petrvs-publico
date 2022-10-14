import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ProjetoDaoService } from 'src/app/dao/projeto-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Projeto } from 'src/app/models/projeto.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ProjetoService } from '../projeto.service';

export type EnvolvidoListItem = {
  url: string;
  hint: string;
};

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.scss']
})
export class ProjetoListComponent extends PageListBase<Projeto, ProjetoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public projetoService: ProjetoService;

  constructor(public injector: Injector) {
    super(injector, Projeto, ProjetoDaoService);
    /* Inicializações */
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.projetoService = injector.get<ProjetoService>(ProjetoService);
    this.title = this.lex.noun("Projeto", true);
    this.code = "MOD_PROJ";
    this.join = ["alocacoes.recurso.usuario", "alocacoes.recurso.unidade", "alocacoes.regras.regra"];
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
      status: {default: null},
      inicio: {default: null},
      termino: {default: null}
    });
  }

  public filterClear(filter: FormGroup) {
    filter.controls.nome.setValue("");
    filter.controls.status.setValue(null);
    filter.controls.inicio.setValue(null);
    filter.controls.termino.setValue(null);
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.nome?.length) { 
      result.push(["nome", "like", "%" + form.nome + "%"]);
    } else if(form.status) {
      result.push(["status", "==", form.status]);
    } else if(form.inicio?.length) {
      result.push(["termino", ">=", form.inicio]);
    } else if(form.termino?.length) {
      result.push(["inicio", "=<", form.termino]);
    }

    return result;
  }

  public getEnvolvidos(projeto: Projeto, metadata: any): EnvolvidoListItem[] {
    let result: EnvolvidoListItem[] = [];
    
    for(let envolvido of projeto.alocacoes?.filter(x => x.envolvido) || []) {
      if(envolvido.recurso?.usuario) {
        result.push({
          url: envolvido.recurso.usuario.url_foto || "assets/images/projetos/usuario.png",
          hint: "Usuario: " + envolvido.recurso.usuario.nome + this.projetoService.getNomesRegras(envolvido, "\n(", ")")
        });
      } else if (envolvido.recurso?.unidade) {
        result.push({
          url: "assets/images/projetos/unidade.png",
          hint: "Usuario: " + envolvido.recurso.unidade.nome + this.projetoService.getNomesRegras(envolvido, "\n(", ")")
        });
      }
    }
    if(metadata) {
      const igual = JSON.stringify(result) == JSON.stringify(metadata.envolvidos);
      metadata.envolvidos = igual ? metadata.envolvidos : result;
      result = metadata.envolvidos;
    }
    return result;
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let projeto: Projeto = row as Projeto;
    const isEnvolvido = !!(projeto.alocacoes || []).find(x => x.envolvido && x.recurso!.usuario!.id == this.auth.usuario?.id);
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'consult'] }, { modal: true }) };
    const BOTAO_COMENTARIOS = { label: "Comentários", icon: "bi bi-chat-left-quote", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'comentar'] }, this.modalRefreshId(projeto)) };
    const BOTAO_CLONAR = { label: "Clonar", icon: "bi bi-stickies", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'demanda', projeto.id, 'clonar'] }, this.modalRefresh()) };
    const BOTAO_ALTERAR = { label: "Alterar demanda", icon: "bi bi-pencil-square", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'edit'] }, this.modalRefreshId(projeto)) };
    const BOTAO_PLANEJAR = { label: "Planejamento", icon: "bi bi-bar-chart-steps", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'planejamento'] }, this.modalRefreshId(projeto)) };
    const BOTAO_EXCLUIR = { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_RECURSOS = { label: "Recursos", icon: "bi bi-tools", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'recurso'] }, this.modalRefreshId(projeto)) };
    const BOTAO_REGRAS = { label: "Regras", icon: "bi bi-diagram-3", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'regra'] }, this.modalRefreshId(projeto)) };
    const BOTAO_ALOCACOES = { label: "Alocações", icon: "bi bi-cart-check", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'alocacao'] }, this.modalRefreshId(projeto)) };
    const BOTAO_ENVOLVIDOS = { label: "Envolvidos", id: "NAOINICIADO", icon: "bi bi-backspace", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'envolvido'] }, this.modalRefreshId(projeto)) };

    result.push(BOTAO_INFORMACOES);
    if (isEnvolvido) {
      result.push(BOTAO_PLANEJAR);
      result.push(BOTAO_COMENTARIOS);
      result.push(BOTAO_CLONAR);
      result.push(BOTAO_ALTERAR);
      result.push(BOTAO_EXCLUIR);
      result.push(BOTAO_RECURSOS);
      result.push(BOTAO_REGRAS);
      result.push(BOTAO_ALOCACOES);
      result.push(BOTAO_ENVOLVIDOS);
    }
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let projeto: Projeto = row as Projeto;
    const isEnvolvido = !!(projeto.alocacoes || []).find(x => x.envolvido && x.recurso!.usuario!.id == this.auth.usuario?.id);
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'consult'] }, { modal: true }) };
    const BOTAO_PLANEJAR = { label: "Planejamento", icon: "bi bi-bar-chart-steps", onClick: (projeto: Projeto) => this.go.navigate({ route: ['gestao', 'projeto', projeto.id, 'planejamento'] }, this.modalRefreshId(projeto)) };

    if (isEnvolvido) {
      result.push(BOTAO_PLANEJAR);
    } else {
      result.push(BOTAO_INFORMACOES);
    }
    return result;
  }

}
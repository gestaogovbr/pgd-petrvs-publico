import { LookupItem } from './../../../../services/lookup.service';
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { PlanoDaoService } from 'src/app/dao/plano-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { IIndexable } from 'src/app/models/base.model';
import { Documento } from 'src/app/models/documento.model';
import { Plano } from 'src/app/models/plano.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { FullRoute } from 'src/app/services/navigate.service';
import { PlanoService } from '../plano.service';
import { DocumentoService } from 'src/app/modules/uteis/documentos/documento.service';

@Component({
  selector: 'app-plano-list',
  templateUrl: './plano-list.component.html',
  styleUrls: ['./plano-list.component.scss'] 
})
export class PlanoListComponent extends PageListBase<Plano, PlanoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public static selectRoute?: FullRoute = {route: ["gestao", "plano"]};
  public unidadeDao: UnidadeDaoService;
  public documentoDao: DocumentoDaoService;
  public documentoService: DocumentoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public planoService: PlanoService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public multiselectAllFields: string[] = ["tipo_modalidade_id", "usuario_id", "unidade_id", "documento_id"];
  public DATAS_FILTRO: LookupItem[] = [
    {key: "VIGENTE", value: "Vigente"},
    {key: "NAOVIGENTE", value: "Não vigente"},
    {key: "INICIAM", value: "Iniciam"},
    {key: "FINALIZAM", value: "Finalizam"}
  ];

  constructor(public injector: Injector) {
    super(injector, Plano, PlanoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.documentoService = injector.get<DocumentoService>(DocumentoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.planoService = injector.get<PlanoService>(PlanoService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    /* Inicializações */
    this.title = this.lex.noun("Plano de trabalho",true);
    this.code = "MOD_PTR";
    this.filter = this.fh.FormBuilder({
      agrupar: {default: true},
      usuario: {default: ""},
      unidade_id: {default: null},
      tipo_modalidade_id: {default: null},
      data_filtro: {default: null},
      data_filtro_inicio: {default: new Date()},
      data_filtro_fim: {default: new Date()}
    }, this.cdRef, this.filterValidate);
    this.join = ["unidade.entidade", "usuario", "programa", "documento.assinaturas.usuario:id,nome,url_foto", "tipo_modalidade"];
    this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
  }

  public dynamicOptions(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let plano: Plano = row as Plano;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.edit.bind(this) };
    const BOTAO_EXCLUIR = { label: "Excluir demanda", icon: "bi bi-trash", onClick: this.delete.bind(this) };
    const BOTAO_ASSINAR = { label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) };
    const BOTAO_TERMOS = { label: "Termos", icon: "bi bi-file-earmark-check", onClick: ((row: Plano) => this.go.navigate({ route: ['uteis', 'documentos', 'TCR', row.id ] }, { modalClose: (modalResult) => console.log(modalResult?.conteudo), metadata: this.planoService.metadados(row) })).bind(this) };
    if(this.auth.hasPermissionTo("MOD_PTR_CONS")) result.push(BOTAO_INFORMACOES);
    if(this.auth.hasPermissionTo('MOD_PTR_EDT')) result.push(BOTAO_ALTERAR);
    if(this.auth.hasPermissionTo("MOD_PTR_EXCL")) result.push(BOTAO_EXCLUIR);
    if(this.planoService.needSign(plano)) result.push(BOTAO_ASSINAR);
    result.push(BOTAO_TERMOS);
    return result;
  }

  public dynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let plano: Plano = row as Plano;
    const BOTAO_INFORMACOES = { label: "Informações", icon: "bi bi-info-circle", onClick: this.consult.bind(this) };
    const BOTAO_ALTERAR = { label: "Alterar", icon: "bi bi-pencil-square", color: "btn-outline-info", onClick: this.edit.bind(this) };
    const BOTAO_ASSINAR = { hint: "Assinar", icon: "bi bi-pen", color: "btn-outline-dark", onClick: this.assinar.bind(this) };
    if(this.planoService.needSign(plano)) result.push(BOTAO_ASSINAR);
    else if(this.auth.hasPermissionTo('MOD_PTR_EDT')) result.push(BOTAO_ALTERAR);
    else if(this.auth.hasPermissionTo("MOD_PTR_CONS")) result.push(BOTAO_INFORMACOES);
    return result;
  }

  public filterValidate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(controlName == "data_filtro_inicio" && control.value > this.filter?.controls.data_filtro_fim.value) {
      result = "Maior que fim";
    } else if(controlName == "data_filtro_fim" && control.value < this.filter?.controls.data_filtro_inicio.value) {
      result = "Menor que início";
    }
    return result;
  }

  public filterClear(filter: FormGroup) {
    filter.controls.usuario.setValue("");
    filter.controls.unidade_id.setValue(null);
    filter.controls.tipo_modalidade_id.setValue(null);
    filter.controls.data_filtro.setValue(null);
    filter.controls.data_filtro_inicio.setValue(new Date());
    filter.controls.data_filtro_fim.setValue(new Date());
    super.filterClear(filter);
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if(form.tipo_modalidade_id?.length) {
      result.push(["tipo_modalidade_id", "==", form.tipo_modalidade_id]);
    }
    if(form.data_filtro) {
      result.push(["data_filtro", "==", form.data_filtro]);
      result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
      result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
    }
    if(form.usuario?.length) {
      result.push(["usuario.nome", "like", "%" + form.usuario + "%"]);
    }
    if(form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }

    return result;
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{field: "unidade.sigla", label: "Unidade"}] : [];
      this.grid!.reloadFilter();
    }
  }

  /*public needSign(plano: Plano): boolean {
    let ids: string[] = [];
    const documento = (plano.documentos || []).find(x => plano.documento_id?.length && x.id == plano.documento_id);
    if(documento && !documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id)) {
      const tipoModalidade = plano.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
      const usuario = plano.usuario!; // (this.usuario?.searchObj as Usuario);
      const unidade = plano.unidade!; // (this.unidade?.searchObj as Unidade);
      const entidade = unidade.entidade!;
      if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
      if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
      if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    }
    return !!documento && ids.includes(this.auth.usuario!.id);
  }*/

  public dynamicMultiselectMenu = (multiselected: IIndexable): ToolbarButton[] => {
    let assinar = !!Object.keys(multiselected).length;
    let menu = [];
    Object.entries(multiselected).forEach(([key, value]) => {
      if(!this.planoService.needSign(value)) assinar = false;
    });
    if(assinar) menu.push({label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
    return menu;
  }

  public assinar(row?: Plano) {
    const planosIds = row ? [row.id] : Object.keys(this.grid!.multiselected || {});
    const documentos = this.grid!.items.filter(x => planosIds.includes(x.id) && x.documento_id?.length).map(x => x.documento);
    if(!documentos.length) {
      this.dialog.alert("Selecione", "Nenhum plano seleciono");
    } else {
      this.documentoService.sign(documentos).then(() => this.grid!.reset());
      /*this.dialog.confirm("Assinar", "Deseja realmente assinar " + documentosIds.length + " documento" + (documentosIds.length > 1 ? "s" : "") + "?").then(response => {
        if(response) {
          this.loading = true;
          this.documentoDao.assinar(documentosIds).then(response => {
            if(response?.length) {
              this.dialog.alert("Assinados", response.length > 1 ? "Foram assinados " + response.length + " documentos!" : "Documento assinado com sucesso!");
              this.refresh();
            }
          }).catch((error) => this.error("Erro ao tentar assinar: " + error.toString())).finally(() => this.loading = false);
        }
      });*/
    }
  }

}


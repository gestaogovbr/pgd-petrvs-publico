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
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public allPages: ListenerAllPagesService;
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
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
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
    this.join = ["unidade.entidade", "usuario", "programa", "documento", "tipo_modalidade"];
    this.groupBy = [{field: "unidade.sigla", label: "Unidade"}];
    // Testa se o usuário possui permissão para exibir dados do plano de trabalho
    if (this.auth.hasPermissionTo("MOD_PTR_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o plano de trabalho
    if (this.auth.hasPermissionTo("MOD_PTR_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }
    this.options.push({
      label: "Termos de adesão",
      icon: "bi bi-file-earmark-check",
      onClick: ((row: Plano) => this.go.navigate({route: ['gestao', 'plano', row.id, 'termos']}, {modalClose: (modalResult) => console.log(modalResult?.conteudo)})).bind(this)
    });
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

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
  }

  public needSign(plano: Plano): boolean {
    let ids: string[] = [];
    if(plano.documento_id?.length) {
      const tipoModalidade = plano.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
      const usuario = plano.usuario!; // (this.usuario?.searchObj as Usuario);
      const unidade = plano.unidade!; // (this.unidade?.searchObj as Unidade);
      const entidade = unidade.entidade!;
      //const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
      if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
      if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
      if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    }
    return !!plano.documento_id?.length && ids.includes(this.auth.usuario!.id);
  }

  public dynamicMultiselectMenu = (multiselected: IIndexable): ToolbarButton[] => {
    let assinar = !!Object.keys(multiselected).length;
    let menu = [];
    Object.entries(multiselected).forEach(([key, value]) => {
      if(!this.needSign(value)) assinar = false;
    });
    if(assinar) menu.push({label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
    return menu;
  }

  public assinar() {
    if(!this.grid!.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum plano seleciono");
    } else {
      this.dialog.confirm("Assinar", "Deseja realmente assinar " + this.grid!.multiselectedCount + " documento" + (this.grid!.multiselectedCount > 1 ? "s" : "") + "?").then(response => {
        if(response) {
          this.loading = true;
          this.documentoDao.assinar(Object.keys(this.grid!.multiselected)).then(response => {
            if(response?.length) {
              this.dialog.alert("Assinados", response.length > 1 ? "Foram assinados " + response.length + " documentos!" : "Documento assinado com sucesso!");
              this.refresh();
            }
          }).finally(() => this.loading = false);
        }
      });
    }
  }

}


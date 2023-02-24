import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PageListBase } from "../../../base/page-list-base";
import { GridComponent } from "../../../../components/grid/grid.component";
import { FullRoute } from "../../../../services/navigate.service";
import { UnidadeDaoService } from "../../../../dao/unidade-dao.service";
import { DocumentoDaoService } from "../../../../dao/documento-dao-service";
import { ProgramaDaoService } from "../../../../dao/programa-dao.service";
import { UsuarioDaoService } from "../../../../dao/usuario-dao.service";
import { ListenerAllPagesService } from "../../../../listeners/listener-all-pages.service";
import { TipoModalidadeDaoService } from "../../../../dao/tipo-modalidade-dao.service";
import { LookupItem } from "../../../../services/lookup.service";
import { AbstractControl, FormGroup } from "@angular/forms";
import { IIndexable } from "../../../../models/base.model";
import { ToolbarButton } from "../../../../components/toolbar/toolbar.component";
import { Adesao } from "../../../../models/adesao.model";
import { AdesaoDaoService } from "../../../../dao/adesao-dao.service";
import { AdesaoService } from '../adesao.service';

@Component({
  selector: 'app-adesao-list',
  templateUrl: './adesao-list.component.html',
  styleUrls: ['./adesao-list.component.scss']
})
export class AdesaoListComponent extends PageListBase<Adesao, AdesaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public static selectRoute?: FullRoute = { route: ["gestao", "adesao"] };
  public unidadeDao: UnidadeDaoService;
  public documentoDao: DocumentoDaoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public adesaoService: AdesaoService;
  public allPages: ListenerAllPagesService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public multiselectAllFields: string[] = ["tipo_modalidade_id", "usuario_id", "unidade_id", "documento_id"];
  public SITUACAO_FILTRO: LookupItem[] = [
    { key: "SOLICITADO", value: "Solicitado" },
    { key: "HOMOLOGADO", value: "Homologado" },
    { key: "CANCELADO", value: "Cancelado" }
  ];
  constructor(public injector: Injector) {
    super(injector, Adesao, AdesaoDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.adesaoService = injector.get<AdesaoService>(AdesaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    /* Inicializações */
    this.title = this.lex.noun("adesao", true);
    this.code = "MOD_ADES";
    this.filter = this.fh.FormBuilder({
      usuario_id: { default: null },
      unidade_id: { default: null },
      tipo_modalidade_id: { default: null },
      data_filtro: { default: null },
      data_filtro_inicio: { default: new Date() },
      data_filtro_fim: { default: new Date() }
    }, this.cdRef, this.filterValidate);
    this.join = ["unidade.entidade", "usuarios.usuario:id,nome", "unidades.unidade:id,nome", "programa", "documento", "tipo_modalidade"];
    // Testa se o usuário possui permissão para exibir dados do plano de trabalho
    if (this.auth.hasPermissionTo("MOD_ADES_CONS")) {
      this.options.push({
        icon: "bi bi-info-circle",
        label: "Informações",
        onClick: this.consult.bind(this)
      });
    }
    // Testa se o usuário possui permissão para excluir o plano de trabalho
    if (this.auth.hasPermissionTo("MOD_ADES_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Cancelar",
        onClick: this.cancel.bind(this)
      });
    }
    this.options.push({
      label: "TCR",
      icon: "bi bi-file-earmark-check",
      onClick: ((row: Adesao) => this.go.navigate({ route: ['uteis', 'documentos', 'TCR', row.id ] }, { modalClose: (modalResult) => console.log(modalResult?.conteudo) })).bind(this)
    });
  }

  public filterValidate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if (controlName == "data_filtro_inicio" && control.value > this.filter?.controls.data_filtro_fim.value) {
      result = "Maior que fim";
    } else if (controlName == "data_filtro_fim" && control.value < this.filter?.controls.data_filtro_inicio.value) {
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
    if (form.tipo_modalidade_id?.length) {
      result.push(["tipo_modalidade_id", "==", form.tipo_modalidade_id]);
    }
    if (form.data_filtro) {
      result.push(["data_filtro", "==", form.data_filtro]);
      result.push(["data_filtro_inicio", "==", form.data_filtro_inicio]);
      result.push(["data_filtro_fim", "==", form.data_filtro_fim]);
    }
    if (form.usuario?.length) {
      result.push(["usuarios.usuario_id", "==", form.usuario_id]);
    }
    if (form.unidade_id?.length) {
      result.push(["unidades.unidade_id", "==", form.unidade_id]);
    }

    return result;
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if ((agrupar && !this.groupBy?.length) || (!agrupar && this.groupBy?.length)) {
      this.groupBy = agrupar ? [{ field: "unidade.sigla", label: "Unidade" }] : [];
      this.grid!.reloadFilter();
    }
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.documento.id_processo, row.documento.id_documento);
  }

  public needSign(adesao: Adesao): boolean {
    let ids: string[] = [];
    if (adesao.documento_id?.length) {
      const tipoModalidade = adesao.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
      //const usuario = adesao.usuario!; // (this.usuario?.searchObj as Usuario);
      //onst unidade = adesao.unidade!; // (this.unidade?.searchObj as Unidade);
      const entidade = adesao.entidade!;
      //const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
      //if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
      //if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
      if (tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    }
    return !!adesao.documento_id?.length && ids.includes(this.auth.usuario!.id);
  }

  public dynamicMultiselectMenu = (multiselected: IIndexable): ToolbarButton[] => {
    let assinar = !!Object.keys(multiselected).length;
    let menu = [];
    Object.entries(multiselected).forEach(([key, value]) => {
      if (!this.needSign(value)) assinar = false;
    });
    if (assinar) menu.push({ label: "Assinar", icon: "bi bi-pen", onClick: this.assinar.bind(this) });
    return menu;
  }

  public assinar() {
    if (!this.grid!.multiselectedCount) {
      this.dialog.alert("Selecione", "Nenhum plano seleciono");
    } else {
      this.dialog.confirm("Assinar", "Deseja realmente assinar " + this.grid!.multiselectedCount + " documento" + (this.grid!.multiselectedCount > 1 ? "s" : "") + "?").then(response => {
        if (response) {
          this.loading = true;
          this.documentoDao.assinar(Object.keys(this.grid!.multiselected)).then(response => {
            if (response?.length) {
              this.dialog.alert("Assinados", response.length > 1 ? "Foram assinados " + response.length + " documentos!" : "Documento assinado com sucesso!");
              this.refresh();
            }
          }).finally(() => this.loading = false);
        }
      });
    }
  }
}

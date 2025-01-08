import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { SolucaoUnidadeDaoService } from "src/app/dao/solucao-unidade-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { SolucaoUnidade } from "src/app/models/solucao-unidade.model";
import { Solucao } from "src/app/models/solucao.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { SolucaoService } from "src/app/services/solucao.service";

@Component({
  selector: 'app-solucao-list',
  templateUrl: './solucao-list.component.html',
  styleUrls: ['./solucao-list.component.scss']
})
export class SolucaoListComponent extends PageListBase<Solucao, SolucaoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public catalogoService: SolucaoService;
  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public solucaoUnidadeDao: SolucaoUnidadeDaoService;
  public botoes: ToolbarButton[] = [];
  public isCurador: boolean;
  public isUpdating: boolean = false;
  public isSearching: boolean = false;
  public solucoesUnidades: SolucaoUnidade[] = [];

  constructor(public injector: Injector, dao: SolucaoDaoService) {
    super(injector, Solucao, SolucaoDaoService);
    this.catalogoService = injector.get<SolucaoService>(SolucaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.solucaoUnidadeDao = injector.get<SolucaoUnidadeDaoService>(SolucaoUnidadeDaoService);
    this.title = this.lex.translate("Soluções");
    this.filter = this.fh.FormBuilder({
      agrupar: { default: true },
      nome: { default: this.metadata?.nome ?? "" },
      unidade_id: { default: "" },
      id: { default: "" },
      status: { default: "" }
    });
    
    this.botoes = [
    ]
    this.options.push({
      icon: "bi bi-info-circle",
      label: "Informações",
      onClick: this.consult.bind(this)
    });
    this.options.push({
      icon: "bi bi-clipboard-check",
      label: "Unidades",
      onClick: this.consult.bind(this)
    });

    // Testa se o usuário possui permissão para excluir o tipo de atividade
    if (this.auth.hasPermissionTo("MOD_SOLUCOES_EXCL")) {
      this.options.push({
        icon: "bi bi-trash",
        label: "Excluir",
        onClick: this.delete.bind(this)
      });
    }

    this.isCurador = this.auth.isUsuarioCurador()
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.isSearching = this.queryParams.mode == 'search';
    this.loadingSolucoesUnidades();
  }

  public async loadingSolucoesUnidades() {
    let unidadeId: string | undefined = this.auth.unidade?.id;
    this.solucoesUnidades = await this.solucaoUnidadeDao?.query({ where: [['id_unidade', '==', unidadeId]] }).asPromise();
  }

  public dynamicButtons(row: Solucao): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    return result;
  }

  public onAgruparChange(event: Event) {
    const agrupar = this.filter!.controls.agrupar.value;
    if (
      (agrupar && !this.groupBy?.length) ||
      (!agrupar && this.groupBy?.length)
    ) {
      this.groupBy = agrupar
        ? [{ field: "unidade.sigla", label: "Unidade" }]
        : [];
      this.grid!.reloadFilter();
    }
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if (form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    if (form.id?.length) {
      result.push(["id", "=", form.id]);

    }
    if (form.unidade_id?.length) {
      result.push(["unidade_id", "==", form.unidade_id]);
    }
    if (form.status) {
      result.push(["status", "==", form.status]);
    }
    
    return result;
  };

  public onBuscaAvancada() {
    this.go.navigate({ route: ["gestao", "solucao", "filter"] }, {
      metadata: {
        nome: this.filter?.controls.nome.value,
        id: this.filter?.controls.id.value,
      },
      modalClose: async (result) => {
        if (result && this.filter) {
          this.filter?.controls.nome.setValue(result.nome);
          this.filter?.controls.id.setValue(result.id);
          this.grid!.reloadFilter();
        }
      },
    });
  }

  public onFilterClear() {
    this.filter?.reset()
    this.grid!.reloadFilter();
  }

  public async ativarDesativar(solucao: Solucao) {
    if (this.isUpdating) {
      console.log("Aguarde o término do processo anterior");
      return;
    }
    this.isUpdating = true;

    try {

      let unidadeId: string | undefined = this.auth.unidade?.id;
      if (unidadeId == undefined) {
        return;
      }
      let solucaoUnidade = this.getSolucaoUnidade(solucao.id, unidadeId);
      if(solucaoUnidade !== null){
         let ativo = this.ativo(solucao);
         let solucaoUnidadeCarregada = await this.solucaoUnidadeDao.update(solucaoUnidade.id, {
          id: solucaoUnidade.id,
          status: !ativo
         });
         let solucaoUnidadeId = solucaoUnidade.id;
         this.solucoesUnidades = this.solucoesUnidades.filter(solucaoU => solucaoU.id != solucaoUnidadeId);
         this.solucoesUnidades.push(solucaoUnidadeCarregada);
         return;
      }
      
       solucaoUnidade = new SolucaoUnidade();
      solucaoUnidade.id_solucao = solucao.id;
      solucaoUnidade.id_unidade = unidadeId;
      let solucaoUnidadeCarregada = await this.solucaoUnidadeDao?.save(solucaoUnidade);
      this.solucoesUnidades.push(solucaoUnidadeCarregada);
      console.log(this.solucoesUnidades);
      console.log("Solucao atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o produto", error);
    } finally {
      this.isUpdating = false; 
    }
  }

  public ativo(solucao: Solucao): boolean {
    let unidadeId = this.auth.unidade?.id;
    let solucaoUnidade = this.getSolucaoUnidade(solucao.id, unidadeId);
    if (!solucaoUnidade) {
      return false;
    }
    console.log('status', solucaoUnidade.status);
    return solucaoUnidade.status;
  }

  private getSolucaoUnidade(solucaoId: string, unidadeId: string | undefined): SolucaoUnidade | null {
    const indice = this.solucoesUnidades.findIndex(solucaoUnidade =>
      solucaoUnidade.id_solucao === solucaoId && solucaoUnidade.id_unidade === unidadeId);
    if (indice == -1) {
      return null;
    }
    return this.solucoesUnidades[indice];
  }
}
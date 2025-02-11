import { ChangeDetectorRef, Component, Injector, ViewChild } from "@angular/core";
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
  public solucaoDao: SolucaoDaoService;
  public solucaoUnidadeDao: SolucaoUnidadeDaoService;
  public botoes: ToolbarButton[] = [];
  public isCurador: boolean;
  public isUpdating: boolean = false;
  public isSearching: boolean = false;
  public solucoesUnidades: SolucaoUnidade[] = [];
  public isActive: { [key: string]: boolean } = {};

  constructor(public injector: Injector, dao: SolucaoDaoService) {
    super(injector, Solucao, SolucaoDaoService);
    this.catalogoService = injector.get<SolucaoService>(SolucaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.solucaoUnidadeDao = injector.get<SolucaoUnidadeDaoService>(SolucaoUnidadeDaoService);
    this.solucaoDao = injector.get<SolucaoDaoService>(SolucaoDaoService);
    this.title = this.lex.translate("Soluções");
    this.filter = this.fh.FormBuilder({
      agrupar: { default: true },
      nome: { default: this.metadata?.nome ?? "" },
      unidade_id: { default: this.auth.unidade?.id },
      id: { default: "" },
      status: { default: "" }
    });
  
    this.orderBy = [['identificador', 'desc']];

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
    if (this.isSearching) {
      this.filter?.controls.status.setValue('ativo');
      this.saveUsuarioConfig();
    }
    this.filter?.controls?.unidade_id.setValue(this.auth.unidade?.id);
    this.loadingSolucoesUnidades();
  }

  public async loadingSolucoesUnidades() {
    let unidadeId: string | undefined = this.auth.unidade?.id;
    this.solucoesUnidades = await this.solucaoUnidadeDao?.query({ where: [['id_unidade', '==', unidadeId]] }).asPromise();
  
    Object.keys(this.isActive).forEach(key => delete this.isActive[key]);

    this.solucoesUnidades.forEach(row => {
      this.isActive[row.id_solucao] = this.ativo(row.id_solucao);
    });
  }

  public dynamicButtons(row: Solucao): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(!row._status) result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });  
    
    result.push({ label: "Excluir", icon: "bi bi-trash", color: 'btn-outline-danger', onClick: this.delete.bind(this) });   
    
    return result;
  }
    public async showDetalhes(solucao: Solucao){
      this.go.navigate({route: ['gestao', 'solucao', solucao.id, "consult"]}, {
        metadata: {
          solucao: solucao
        }
      });    
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
      result.push(["or", ["sigla", "like", "%" + form.nome.trim().replace(" ", "%") + "%"], ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
    }

    if (form.id?.length) {
      result.push(["identificador", "=", form.id]);

    }
    if (form.unidade_id?.length) {
      result.push(["unidade_ativa", "==", form.unidade_id]);
    }
    if (form.status == 'ativo') {
      result.push(["unidade_ativa", "==", form.unidade_id ?? this.auth.unidade?.id]);
    }

    if (form.status == 'inativo') {
      result.push(["unidade_inativa", "==", form.unidade_id ?? this.auth.unidade?.id]);
    }
    
    return result;
  };

  public onBuscaAvancada() {
    this.go.navigate({ route: ["gestao", "solucao", "filter"] }, {
      metadata: {
        nome: this.filter?.controls.nome.value,
        id: this.filter?.controls.id.value,
        status: this.filter?.controls.status.value,
      },
      modalClose: async (result) => {
        if (result && this.filter) {
          this.filter?.controls.nome.setValue(result.nome);
          this.filter?.controls.id.setValue(result.id);
          this.filter?.controls.status.setValue(result.status);
          this.grid!.reloadFilter();
        }
      },
    });
  }

  public onFilterClear() {
    this.filter?.reset()
    this.grid!.reloadFilter();
    this.cdRef.markForCheck();
  }

  public async ativarDesativar(solucao: Solucao, event: any) {
    
    if (this.loading) return;
    
    this.loading = true;

    try {
      let unidadeId: string | undefined = this.auth.unidade?.id;
      if (unidadeId == undefined) {
        return;
      }
      let solucaoUnidade = this.getSolucaoUnidade(solucao.id, unidadeId);
      if(solucaoUnidade !== null){
         let ativo = this.ativo(solucao.id);
         let solucaoUnidadeCarregada = await this.solucaoUnidadeDao.update(solucaoUnidade.id, {
          id: solucaoUnidade.id,
          status: !ativo
         });
         let solucaoUnidadeId = solucaoUnidade.id;
         this.solucoesUnidades = this.solucoesUnidades.filter(solucaoU => solucaoU.id != solucaoUnidadeId);
         this.solucoesUnidades.push(solucaoUnidadeCarregada);
         this.isActive[solucao.id] = !ativo;
      } else {
        solucaoUnidade = new SolucaoUnidade();
        solucaoUnidade.id_solucao = solucao.id;
        solucaoUnidade.id_unidade = unidadeId;
        let solucaoUnidadeCarregada = await this.solucaoUnidadeDao?.save(solucaoUnidade);
        this.solucoesUnidades.push(solucaoUnidadeCarregada);
        this.isActive[solucao.id] = true;
      }
    } catch (error: any) {
      console.error("Erro ao atualizar o produto", error);
      this.error(error.error?.message || error.message || error);
    } finally {
      this.isUpdating = false; 
      this.loading = false;
    }
  }


  public async ativarTodas() {

    this.confirm("Ativar todas as Soluções", "Deseja realmente ativar todas as Soluções?", async () => {

      this.loading = true;
      try {

        let unidadeId: string | undefined = this.auth.unidade?.id;
        if (unidadeId == undefined) {
          return;
        } 
        await this.solucaoDao.ativarTodas(unidadeId);
        this.loadingSolucoesUnidades();
      }catch (error: any) {
        console.error("Erro ao ativar as Soluções", error);
        this.error(error.error?.message || error.message || error);
      } finally {
        this.isUpdating = false; 
        this.loading = false;
      }
    })
  }

  public async desativarTodas() {
    this.confirm("Desativar todas as Soluções", "Deseja realmente desativar todas as Soluções?", async () => {
      
      this.loading = true;

      try {

        let unidadeId: string | undefined = this.auth.unidade?.id;
        if (unidadeId == undefined) {
          return;
        }
        await this.solucaoDao.desativarTodas(unidadeId);
        this.loadingSolucoesUnidades();
      }catch (error: any) {
        console.error("Erro ao desativar as Soluções", error);
        this.error(error.error?.message || error.message || error);
      } finally {
        this.isUpdating = false; 
        this.loading = false;
      }
    });
  }

  public ativo(solucaoId: string): boolean {
    let unidadeId = this.auth.unidade?.id;
    let solucaoUnidade = this.getSolucaoUnidade(solucaoId, unidadeId);
    if (!solucaoUnidade) {
      return false;
    }
    
    return solucaoUnidade.status ? true : false;
  }

  private getSolucaoUnidade(solucaoId: string, unidadeId: string | undefined): SolucaoUnidade | null {
    const indice = this.solucoesUnidades.findIndex(solucaoUnidade =>
      solucaoUnidade.id_solucao === solucaoId && solucaoUnidade.id_unidade === unidadeId);
    if (indice == -1) {
      return null;
    }
    return this.solucoesUnidades[indice];
  }

  private confirm(title: string, message: string, onConfirm: () => void): void {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
  }
}
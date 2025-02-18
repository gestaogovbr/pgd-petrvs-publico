import { HttpErrorResponse } from "@angular/common/http";
import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { ToolbarButton } from "src/app/components/toolbar/toolbar.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { Produto } from "src/app/models/produto.model";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { ProdutoService } from "src/app/services/produto.service";

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent extends PageListBase<Produto, ProdutoDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public produtoService: ProdutoService;
  public isUpdating: boolean = false;
  public isChefe: boolean = false;
  public isCurador: boolean = false;
  public isSearching: boolean = false;

  public BOTAO_EXCLUIR: ToolbarButton;

  constructor(public injector: Injector, dao: ProdutoDaoService) {
    super(injector, Produto, ProdutoDaoService);
    this.produtoService = injector.get<ProdutoService>(ProdutoService);
    this.title = this.lex.translate("Produtos");
    this.filter = this.fh.FormBuilder({
      nome: {default: this.metadata?.nome ?? ""},
      unidade_id: {default: ""},
      cliente_id: {default: ""},
      id: {default: ""},
      status: {default: ""}
    });
    this.join = [
      "produtoProcessoCadeiaValor"
    ];
    this.isChefe = this.auth.isUsuarioDeveloper() || this.auth.isGestorAlgumaAreaTrabalho(false);
    this.isCurador = this.auth.isUsuarioCurador();

    this.BOTAO_EXCLUIR = { label: "Excluir", icon: "bi bi-trash", onClick: this.delete.bind(this), color: 'btn-outline-danger' };
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.isSearching = (this.queryParams.mode == 'search') || (this.queryParams.mode == 'search-ativos');
    if (this.isSearching) {
      this.filter?.controls.status.setValue('ativo');
      this.saveUsuarioConfig();
    }
  }

  public dynamicButtons(row: Produto): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if(!row._status) result.push({ label: "Detalhes", icon: "bi bi-eye", color: 'btn-outline-success', onClick: this.showDetalhes.bind(this) });   

    if (row._metadata?.vinculoEntregas == 0 && this.isChefe) {
      result.push(this.BOTAO_EXCLUIR);
    }
    
    return result;
  }

  public dynamicOptions(row: Produto): ToolbarButton[] {
      let result: ToolbarButton[] = [];
      return result;
    }

  public async showDetalhes(produto: Produto){
    this.go.navigate({route: ['gestao', 'produto', produto.id, "show"]}, {
      metadata: {
        produto: produto
      }
    });    
  }
  
  public async ativarDesativar(produto: Produto){  
    if (this.isUpdating) {
      console.log("Aguarde o término do processo anterior");
      return; 
    }
    this.isUpdating = true;
    let ativo = this.ativo(produto)  
    produto.data_desativado = null;
    produto.data_ativado = null;
    ativo ? produto.data_desativado = new Date() : produto.data_ativado = new Date();
    let messageError = "";
    try {
      await this.dao?.update(produto.id, {
        id: produto.id,
        data_desativado: produto.data_desativado,
        data_ativado: produto.data_ativado
      });
    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        messageError = error.error.message;
        
      }
      if(error.validationErrors){
        let validationErrors  = error.validationErrors;
        messageError = "";
        Object.keys(validationErrors).forEach((key) => {
          const messages = validationErrors[key];
          messages.forEach((message: string) => {
            messageError += `${key}: ${message}\n`;

          });
      });
      
    }
    messageError = messageError ? messageError : "Erro inesperado";

    this.dialog.alert("Erro ao ativar/inativar o produto", messageError, 'Fechar', 'fa fa-exclamation-triangle');
    } finally {
      this.isUpdating = false; 
    }
  }

  public onBuscaAvancada() {
    this.go.navigate({ route: ["gestao", "produto", "filter"] }, {
      metadata: {
        nome: this.filter?.controls.nome.value,
        id: this.filter?.controls.id.value,
        status: this.filter?.controls.status.value,
        unidade_id: this.filter?.controls.unidade_id.value,
        cliente_id: this.filter?.controls.cliente_id.value,
        enableStatus: (this.queryParams.mode != 'search-ativos')
      },
      modalClose: async (result) => {
        if (result && this.filter) {
          this.filter?.controls.nome.setValue(result.nome);
          this.filter?.controls.id.setValue(result.id);
          this.filter?.controls.status.setValue(result.status);
          this.filter?.controls.unidade_id.setValue(result.unidade_id);
          this.filter?.controls.cliente_id.setValue(result.cliente_id);
          this.grid!.reloadFilter();
        }
      },
    });
  }

  public onFilterClear(){
    this.filter?.reset()
    this.grid!.reloadFilter();
    this.cdRef.markForCheck();
  }

  public filtrosDefinidos() {
    return this.filter?.controls.nome.value?.length > 0 || 
      this.filter?.controls.id.value?.length > 0 ||
      this.filter?.controls.unidade_id.value?.length > 0 ||
      this.filter?.controls.cliente_id.value?.length > 0 ||
      this.filter?.controls.status.value?.length > 0;
  }

  public filterWhere = (filter: FormGroup) => {
		let result: any[] = [];
		let form: any = filter.value;

    if (this.queryParams.excludeId) {
      result.push(["id", "!=", this.queryParams.excludeId]);
    }

    if(form.nome?.length) {
      result.push(["or", ["nome_fantasia", "like", "%" + form.nome.trim().replace(" ", "%") + "%" ], ["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]]);
    }
    if(form.id?.length) {
      result.push(["identificador", "=",form.id]);
    }
		if (form.unidade_id?.length) {
			result.push(["unidade_id", "==", form.unidade_id]);
    }
    if (form.cliente_id?.length) {
			result.push(["produtos_do_cliente", "==", form.cliente_id]);
    }
    if (form.status && form.status == 'ativo') {
      result.push(["data_ativado", "!=", null]);
      result.push(["data_desativado", "==", null]);
    }
    if (form.status && form.status == 'inativo') {
      result.push(["data_ativado", "==", null]);
    }
		return result;
	};

  public ativo(produto: Produto): boolean {
    return !produto.data_desativado && (produto.data_ativado != null);
  }

  private confirm(title: string, message: string, onConfirm: () => void): void {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
  }

  public async ativarTodos() {

    this.confirm("Ativar todos os Produtos e Serviços", "Deseja realmente ativar todos os Produtos e Serviços?", async () => {

      this.loading = true;
      try {
        await this.dao?.ativarTodos();
        this.grid!.reloadFilter();
        this.cdRef.markForCheck();
      }catch (error: any) {
        console.error("Erro ao ativar Produtos/Serviços", error);
        this.error(error.error?.message || error.message || error);
      } finally {
        this.isUpdating = false; 
        this.loading = false;
      }
    })
  }

  public async desativarTodos() {
    this.confirm("Desativar todos os Produtos e Serviços", "Deseja realmente desativar todos os Produtos e Serviços?", async () => {
      
      this.loading = true;

      try {
        await this.dao?.desativarTodos();
        this.grid!.reloadFilter();
        this.cdRef.markForCheck();
      }catch (error: any) {
        console.error("Erro ao desativar os Produtos/Serviços", error);
        this.error(error.error?.message || error.message || error);
      } finally {
        this.isUpdating = false; 
        this.loading = false;
      }
    });
  }
}

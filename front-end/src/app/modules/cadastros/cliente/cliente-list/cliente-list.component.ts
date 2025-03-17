import { HttpErrorResponse } from "@angular/common/http";
import {Component, Injector, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {GridComponent} from "src/app/components/grid/grid.component";
import {ToolbarButton} from "src/app/components/toolbar/toolbar.component";
import {ClienteDaoService} from "src/app/dao/cliente-dao.service";
import {TipoClienteDaoService} from "src/app/dao/tipo-cliente-dao.service";
import {Cliente} from "src/app/models/cliente.model";
import {PageListBase} from "src/app/modules/base/page-list-base";

@Component({
	selector: "app-cliente-list",
	templateUrl: "./cliente-list.component.html",
	styleUrls: ["./cliente-list.component.scss"],
})
export class ClienteListComponent extends PageListBase<
	Cliente,
	ClienteDaoService
> {
	@ViewChild(GridComponent, {static: false}) public grid?: GridComponent;
	public tipoClienteDao: TipoClienteDaoService;
  public isUpdating: boolean = false;

	constructor(public injector: Injector, dao: ClienteDaoService) {
		super(injector, Cliente, ClienteDaoService);
		this.tipoClienteDao = injector.get<TipoClienteDaoService>(
			TipoClienteDaoService
		);
		this.dao = dao;
		/* Inicializações */
		this.title = this.lex.translate("Clientes");
		this.filter = this.fh.FormBuilder({
			nome: {default: ""},
			tipo_cliente_id: {default: null},
		});

		this.options.push({
			icon: "bi bi-trash",
			label: "Excluir",
			onClick: this.delete.bind(this),
		});

		this.join = ["tipoCliente", "clienteProduto"];

		//this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");
	}

	public filterClear(filter: FormGroup) {
		filter.controls.nome.setValue("");
		super.filterClear(filter);
	}

	public filterWhere = (filter: FormGroup) => {
		let result: any[] = [];
		let form: any = filter.value;

		if (form.nome?.length) {
			result.push([
				"nome",
				"like",
				"%" + form.nome.trim().replace(" ", "%") + "%",
			]);
		}

		if (filter?.controls.tipo_cliente_id?.value?.length) {
			result.push([
				"tipo_cliente_id",
				"==",
				filter?.controls.tipo_cliente_id?.value,
			]);
		}

		return result;
	};

	public dynamicButtons(row: Cliente): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		if (row && row.cliente_produto?.length == 0) {
      if(this.auth.hasPermissionTo('MOD_CLI_EDT')) {
        result.push({
          icon: "bi bi-pencil",
          label: "Editar",
          onClick: () => this.edit(row),
        });
      }
      if(this.auth.hasPermissionTo('MOD_CLI_EXCL')) {
        result.push({
          icon: "bi bi-trash",
          label: "Excluir",
          color: 'btn-outline-danger',  
          onClick: () => this.delete(row),
        });
      }
		}
		return result;
	}

	public dynamicOptions(row: Cliente): ToolbarButton[] {
		let result: ToolbarButton[] = [];
		return result;
	}

  public async ativarDesativar(cliente: Cliente){  
      if (this.isUpdating) {
        console.log("Aguarde o término do processo anterior");
        return; 
      }
      this.isUpdating = true;

      cliente.data_desativado = cliente.data_desativado ? null : new Date();
      let messageError = "";
      try {
        await this.dao?.update(cliente.id, {
          id: cliente.id,
          tipo_cliente_id: cliente.tipo_cliente_id,
          nome: cliente.nome,
          data_desativado: cliente.data_desativado,
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
  
      this.dialog.alert("Erro ao ativar/inativar o cliente", messageError, 'Fechar', 'fa fa-exclamation-triangle');
      } finally {
        this.isUpdating = false; 
      }
    }
}

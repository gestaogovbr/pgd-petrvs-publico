import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { Base } from 'src/app/models/base.model';
import { Programa } from 'src/app/models/programa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';
import { ProgramaService } from 'src/app/services/programa.service';

@Component({
  selector: 'app-programa-list',
  templateUrl: './programa-list.component.html',
  styleUrls: ['./programa-list.component.scss']
})
export class ProgramaListComponent extends PageListBase<Programa, ProgramaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  public programaService: ProgramaService;

  public vigentesUnidadeExecutora: boolean = false;
  public todosUnidadeExecutora: boolean = false;

  public BOTAO_CONCLUIR: ToolbarButton;

  constructor(public injector: Injector, dao: ProgramaDaoService) {
    super(injector, Programa, ProgramaDaoService);
    this.programaService = injector.get<ProgramaService>(ProgramaService);
    /* Inicializações */
    this.title = this.lex.translate("Programas de Gestão");
    this.code = "MOD_PRGT";
    this.join = ["unidade:id, nome"];
    this.filter = this.fh.FormBuilder({
      nome: {default: ""},
    });

    this.addOption(this.OPTION_INFORMACOES);
    this.addOption(this.OPTION_EXCLUIR, "MOD_PRGT_EXCL");
    this.addOption(this.OPTION_LOGS, "MOD_AUDIT_LOG");

    this.BOTAO_CONCLUIR = { label: "Concluir", icon: "bi bi-journal-check", onClick:this.concluir.bind(this) };

  }

  public dynamicButtons(row: Programa): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    if (this.auth.hasPermissionTo("MOD_PRGT_CONCL") && this.programaService.programaVigente(row)) {
      //result.push(this.BOTAO_CONCLUIR);
    }
    return result;
  }


  public ngOnInit(): void {
    super.ngOnInit();
    this.vigentesUnidadeExecutora = this.metadata?.vigentesUnidadeExecutora; 
    this.todosUnidadeExecutora = this.metadata?.todosUnidadeExecutora; 
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;
    if(this.vigentesUnidadeExecutora) result.push(['vigentesUnidadeExecutora',"==",this.auth.unidade!.id]);
    if(this.todosUnidadeExecutora || !this.util.isDeveloper()) result.push(['todosUnidadeExecutora',"==",this.auth.unidade!.id]);
    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }

  public concluir = (programa: Programa) => {
    this.dialog.confirm("Concluir?", "Ao encerrar este regramento, todos os planos de entregas e planos de trabalho serão automaticamente concluídos. Além disso, todos os agentes públicos serão automaticamente desligados do PGD. Você confirma?").then(confirm => {
      if(confirm) {
        this.dao!.concluir(programa).then(() => {
          (this.grid?.query || this.query!).refreshId(programa.id);
          this.dialog.topAlert("Regramento concluído com sucesso!", 5000);
        }).catch((error) => this.dialog.alert("Erro", "Erro ao concluir: " + (error?.message ? error?.message : error)));
      }
    });
  }
}


import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { Programa } from 'src/app/models/programa.model';
import { PageListBase } from 'src/app/modules/base/page-list-base';

@Component({
  selector: 'app-programa-list',
  templateUrl: './programa-list.component.html',
  styleUrls: ['./programa-list.component.scss']
})
export class ProgramaListComponent extends PageListBase<Programa, ProgramaDaoService> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public buttons: ToolbarButton[] = [];

  constructor(public injector: Injector, dao: ProgramaDaoService) {
    super(injector, Programa, ProgramaDaoService);
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
    // Testa se o usuário possui permissão para excluir o programa de gestão
    if (this.auth.hasPermissionTo("MOD_PRGT_PART")) {
      this.options.push({
        icon: "bi bi-people",
        label: "Participantes",
        onClick: (programa: Programa) => this.go.navigate({route: ["gestao", "programa", programa.id, "participantes"]})
      });
    }

    if (this.auth.hasPermissionTo("MOD_PRGT_PART")) {
      this.options.push({
        icon: "bi bi-folder",
        label: "Desdobramentos",
        onClick: (programa: Programa) => this.go.navigate({route: ["gestao", "desdobramento", programa.id, "programa"]})
      });
    }
    
    this.buttons.push({
      icon: "bi bi-box-arrow-up-right",
      color: "btn-outline-secondary",
      label: "Norma PGD - IN 24",
      onClick: () => window.open("https://www.in.gov.br/en/web/dou/-/instrucao-normativa-conjunta-seges-sgprt-/mgi-n-24-de-28-de-julho-de-2023-499593248")
    });
  }

  public filterWhere = (filter: FormGroup) => {
    let result: any[] = [];
    let form: any = filter.value;

    if(form.nome?.length) {
      result.push(["nome", "like", "%" + form.nome.trim().replace(" ", "%") + "%"]);
    }

    return result;
  }
}


import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
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
    // Testa se o usuário possui permissão para excluir o programa de gestão
    if (this.auth.hasPermissionTo("MOD_PRGT_PART")) {
      this.options.push({
        icon: "bi bi-people",
        label: "Participantes",
        onClick: (programa: Programa) => this.go.navigate({route: ["gestao", "programa", programa.id, "participantes"]})
      });
    }
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


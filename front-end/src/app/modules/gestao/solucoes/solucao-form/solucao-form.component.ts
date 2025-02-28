import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { SolucaoDaoService } from "src/app/dao/solucao-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { Solucao } from "src/app/models/solucao.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";

@Component({
  selector: 'app-solucao-form',
  templateUrl: './solucao-form.component.html',
  styleUrls: ['./solucao-form.component.scss']
})

export class SolucaoFormComponent extends PageFormBase<Solucao, SolucaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;

  public usuarioDao: UsuarioDaoService;

  constructor(public injector: Injector) {
    super(injector, Solucao, SolucaoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.modalWidth = 1300;
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      sigla: { default: "" },
      unidade_id: { default: "" },
      descricao: { default: "" },
      url: { default: "" },
    });
  }

  public async loadData(entity: Solucao, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    form.patchValue(new Solucao());
    this.entity = new Solucao();
    await this.loadData(this.entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Solucao> {
    return new Promise<Solucao>((resolve, reject) => {
      const catalogo = this.util.fill(new Solucao(), this.entity!);
      resolve(this.util.fillForm(catalogo, this.form!.value));
    });
  }

}
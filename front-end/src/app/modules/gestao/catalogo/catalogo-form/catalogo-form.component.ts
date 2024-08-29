import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { CatalogoDaoService } from "src/app/dao/catalogo-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { Catalogo } from "src/app/models/catalogo.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { InputSearchComponent } from "src/app/components/input/input-search/input-search.component";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";

@Component({
  selector: 'app-catalogo-form',
  templateUrl: './catalogo-form.component.html',
  styleUrls: ['./catalogo-form.component.scss']
})

export class CatalogoFormComponent extends PageFormBase<Catalogo, CatalogoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;

  constructor(public injector: Injector) {
    super(injector, Catalogo, CatalogoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.join = [
      "unidade"
    ];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      unidade_id: { default: "" },
      curador_responsavel_id: { default: "" },
      data_inicio: { default: new Date()},
      data_fim: { default: new Date() },
    });
  }

  public async loadData(entity: Catalogo, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    form.patchValue(new Catalogo());
    this.entity = new Catalogo();

    await this.loadData(this.entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Catalogo> {
    return new Promise<Catalogo>((resolve, reject) => {
      const catalogo = this.util.fill(new Catalogo(), this.entity!);
      resolve(this.util.fillForm(catalogo, this.form!.value));
    });
  }

}
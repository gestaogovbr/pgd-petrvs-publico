import { Component, Injector, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { ProdutoDaoService } from "src/app/dao/produto-dao.service";
import { IIndexable } from "src/app/models/base.model";
import { Produto } from "src/app/models/produto.model";
import { PageFormBase } from "src/app/modules/base/page-form-base";

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})

export class ProdutoFormComponent extends PageFormBase<Produto, ProdutoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  constructor(public injector: Injector) {
    super(injector, Produto, ProdutoDaoService);
  }

  public async loadData(entity: Produto, form: FormGroup) {}

  public initializeData(form: FormGroup): void {}

  public saveData(form: IIndexable): Promise<Produto> {
    return new Promise<Produto>((resolve, reject) => {
      const produto = this.util.fill(new Produto(), this.entity!);
      resolve(this.util.fillForm(produto, this.form!.value));
    });
  }
}
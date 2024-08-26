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
    this.join = [
      "produtoProcessoCadeiaValor.cadeiaValorProcesso.cadeiaValor", "produtosRelacionados"
    ];
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      nome_fantasia: { default: "" },
      descricao: { default: "" },
      url: { default: "" },
      tipo: { default: "" },
      produto_processo_cadeia_valor: { default: [] },
      produtos_relacionados: { default: [] },
    });
  }

  public async loadData(entity: Produto, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public async initializeData(form: FormGroup) {
    form.patchValue(new Produto());
    this.entity = new Produto();

    await this.loadData(this.entity, this.form!);
  }

  public saveData(form: IIndexable): Promise<Produto> {
    return new Promise<Produto>((resolve, reject) => {
      const produto = this.util.fill(new Produto(), this.entity!);
      resolve(this.util.fillForm(produto, this.form!.value));
    });
  }
}
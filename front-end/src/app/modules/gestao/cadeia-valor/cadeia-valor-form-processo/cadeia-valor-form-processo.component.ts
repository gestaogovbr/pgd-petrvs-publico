import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { CadeiaValorProcessoDaoService } from 'src/app/dao/cadeia-valor-processo-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { CadeiaValorProcesso } from 'src/app/models/cadeia-valor-processo.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoObjetivoApiClient } from 'src/app/modules/cadastros/tipo-objetivo-v2/infra/tipo-objetivo-api.client';
import { TipoObjetivo } from 'src/app/modules/cadastros/tipo-objetivo-v2/domain/types';
import { LookupItem } from 'src/app/services/lookup.service';
import { NavigateResult } from 'src/app/services/navigate.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cadeia-valor-form-processo',
  templateUrl: './cadeia-valor-form-processo.component.html',
  styleUrls: ['./cadeia-valor-form-processo.component.scss'],
  standalone: false
})
export class CadeiaValorFormProcessoComponent extends PageFormBase<CadeiaValorProcesso, CadeiaValorProcessoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public tipoObjetivoApiClient: TipoObjetivoApiClient;
  public tiposElementos: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector, CadeiaValorProcesso, CadeiaValorProcessoDaoService);
    this.tipoObjetivoApiClient = injector.get<TipoObjetivoApiClient>(TipoObjetivoApiClient);
    this.form = this.fh.FormBuilder({
      nome: { default: "" },
      tipo_elemento_id: { default: null },
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if (controlName === 'nome' && !control.value?.trim()?.length) result = "Obrigatório";
    return result;
  }

  public async loadData(entity: CadeiaValorProcesso, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.title = entity._status == 'ADD' ? 'Adicionar Elemento' : 'Editar Elemento';

    const tipos = await firstValueFrom(this.tipoObjetivoApiClient.list('cadeia_de_valor'));

    this.tiposElementos = (tipos || []).map((t: TipoObjetivo) => ({
      key: t.id,
      value: t.nome,
      data: t
    }));
  }

  public async initializeData(form: FormGroup) {
    this.entity = new CadeiaValorProcesso(this.metadata?.processo);
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult> {
    return new Promise<NavigateResult>((resolve) => {
      const processo = Object.assign({}, this.entity!);
      const filled = this.util.fillForm(processo, this.form!.value) as CadeiaValorProcesso;
      resolve(new NavigateResult(filled));
    });
  }
}

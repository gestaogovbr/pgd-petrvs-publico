import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioItemDaoService } from 'src/app/dao/envio-item-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Envio } from 'src/app/models/envio.model';
import { EnvioItem } from 'src/app/models/envio-item.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'envio-item-consult-participante',
  templateUrl: './envio-item-consult-participante.component.html',
  styleUrls: ['./envio-item-consult-participante.component.scss']
})
export class EnvioItemConsultParticipanteComponent extends PageFormBase<EnvioItem, EnvioItemDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  constructor(public injector: Injector) {
    super(injector, EnvioItem, EnvioItemDaoService);
    this.form = this.fh.FormBuilder({
      cpf: { default: ""},
      nome: { default: ""},
      sucesso: { default: false },
      erros: {default: ""},
      created_at: {default: null},
    }, this.cdRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public loadData(entity: EnvioItem, form: FormGroup): void {
    let formValue = Object.assign({}, form.value);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new EnvioItem());
  }

  public saveData(form: IIndexable): Promise<EnvioItem> {
    return new Promise<EnvioItem>((resolve, reject) => {
      const envio = this.util.fill(new EnvioItem(), this.entity!);
      resolve(this.util.fillForm(envio, this.form!.value));
    });
  }

}
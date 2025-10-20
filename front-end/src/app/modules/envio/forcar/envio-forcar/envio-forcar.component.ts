import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { EnvioDaoService } from 'src/app/dao/envio-dao.service';;
import { PageBase } from 'src/app/modules/base/page-base';

@Component({
  selector: 'envio-forcar',
  templateUrl: './envio-forcar.component.html',
  styleUrls: ['./envio-forcar.component.scss']
})
export class EnvioForcarComponent extends PageBase implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public form: FormGroup;
  public envioDao: EnvioDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.envioDao = injector.get<EnvioDaoService>(EnvioDaoService);

    this.form = this.fh.FormBuilder({
    });
  }

  public async onSaveData() {
    this.envioDao.forcar(this.auth.entidade?.sigla as string).subscribe({
      next: async(result) => {
        await this.dialog.alert('Envio forçado', 'Envio forçado com sucesso')
        this.close();
      },
      error: error => {
        this.editableForm!.error = error.error.message ? error.error.message : error;
        console.error('Erro:', error.error)
      }
    })
  }

  public onCancel() {
    this.close();
  }
}

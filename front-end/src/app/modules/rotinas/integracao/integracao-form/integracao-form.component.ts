import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { IntegracaoDaoService } from 'src/app/dao/integracao-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Integracao } from 'src/app/models/integracao.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';

@Component({
  selector: 'app-integracao-form',
  templateUrl: './integracao-form.component.html',
  styleUrls: ['./integracao-form.component.scss']
})
export class IntegracaoFormComponent extends PageFormBase<Integracao, IntegracaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public form: FormGroup;
    
  constructor(public injector: Injector, dao: IntegracaoDaoService) {
    super(injector, Integracao, IntegracaoDaoService);
    this.form = this.fh.FormBuilder({
      dataExecucao: {default: ''},
      atualizarUnidades: {default: false},
      atualizarServidores: {default: false},
      atualizarGestores: {default: false},
      usarArquivosLocais: {default: false},
      salvarArquivosLocais: {default: false},
      entidade_id: {default: ""}
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public loadData(entity: Integracao, form: FormGroup): void {

  }

  public initializeData(form: FormGroup): void {
    form.patchValue(new Integracao());
  }

  public saveData(form: IIndexable): Promise<Integracao> {
    return new Promise<Integracao>((resolve, reject) => {
      const integracao = this.util.fill(new Integracao(), this.entity!);
      resolve(this.util.fillForm(integracao, this.form!.value));
    });
  }
}

import { FullRoute } from 'src/app/services/navigate.service';
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { SelectItem } from 'src/app/components/input/input-base';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageReportFilterBase } from 'src/app/modules/base/page-report-filter-base';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';

@Component({
  selector: 'app-forcadetrabalho-filter-servidor',
  templateUrl: './forcadetrabalho-filter-servidor.component.html',
  styleUrls: ['./forcadetrabalho-filter-servidor.component.scss']
})
export class ForcaDeTrabalhoFilterServidorComponent extends PageReportFilterBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario') usuario?: InputSearchComponent;
  //@ViewChild('unidade') unidade?: InputSelectComponent;

  public form: FormGroup;
  public usuarioDao: UsuarioDaoService;
  public reportRoute: FullRoute;
  public planos: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      plano_id: {default: null},
      usuario_id: {default: null},
    }, this.cdRef, this.validate);
    this.reportRoute = {route: ["relatorios", "forca-de-trabalho", "report-servidor"], params: {}};
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(!control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public initializeData(form: FormGroup): void {
    form.patchValue({});
  }

  public onUsuarioSelect(item: SelectItem) {
    const usuario: Usuario | undefined = item.entity as Usuario;
    const planos = usuario?.planos || [];
    this.planos = planos.map(x => {
      return {
        key: x.id,
        value: (x.tipo_modalidade?.nome || "") + " - " + this.usuarioDao!.getDateFormatted(x.data_inicio_vigencia) + " a " + this.usuarioDao!.getDateFormatted(x.data_fim_vigencia) + " (" + x.unidade!.sigla + ")",
        data: x
      };
    });
    this.cdRef.detectChanges();
    if(!this.form.controls.plano_id.value?.length && this.planos.length == 1) { //se o controle PLANO está em branco e o usuário só possui 1 plano, preenche o controle com este plano
      this.form.controls.plano_id.setValue(this.planos[0].key);
    } else { // caso contrário deixa o controle em branco para que o usuário selecione o valor desejado
      this.form.controls.plano_id.setValue(null);
    }
  }

}


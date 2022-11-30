import { FullRoute } from 'src/app/services/navigate.service';
import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { LookupItem } from 'src/app/services/lookup.service';
import { PageReportFilterBase } from 'src/app/modules/base/page-report-filter-base';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';

@Component({
  selector: 'app-forcadetrabalho-filter-area',
  templateUrl: './forcadetrabalho-filter-area.component.html',
  styleUrls: ['./forcadetrabalho-filter-area.component.scss']
})
export class ForcaDeTrabalhoFilterAreaComponent extends PageReportFilterBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('unidade') unidade?: InputSelectComponent;
  @ViewChild('programa') programa?: InputSelectComponent;

  public form: FormGroup;
  public unidades: LookupItem[] = [];
  public unidadeDao: UnidadeDaoService;
  public programaDao: ProgramaDaoService;
  public reportRoute: FullRoute;

  constructor(public injector: Injector) {
    super(injector);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.form = this.fh.FormBuilder({
      unidade_id: {default: null},
      programa_id: {default: null}
    }, this.cdRef, this.validate);
    this.reportRoute = {route: ["relatorios", "forca-de-trabalho", "report-area"], params: {}};
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

}


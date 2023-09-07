import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageFrameBase } from 'src/app/modules/base/page-frame-base';
import { StatusService } from './status.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-status',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent extends PageFrameBase {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public status: string = "";
  public tipo: string = "";
  public justificativa?: string;
  public lookup: LookupService;
  public statusService: StatusService;

  constructor(public injector: Injector) {
    super(injector);
    this.statusService = injector.get<StatusService>(StatusService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.modalWidth = 450;
    this.form = this.fh.FormBuilder({
      justificativa: {default: ""},
    }, this.cdRef, this.validate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.status = this.metadata?.status || this.status;
    this.tipo = this.metadata?.tipo || this.tipo;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(['justificativa'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public async onSubmitClick() {
      this.go.setModalResult(this.modalRoute?.queryParams?.idroute, this.form?.controls.justificativa.value);
      this.close();
  }

}


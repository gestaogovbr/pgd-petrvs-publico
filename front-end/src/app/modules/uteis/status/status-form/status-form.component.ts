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

  public novoStatus: string = "";
  public statusAtual: string = "";
  public tipo: string = "";
  public lookup: LookupService;
  public statusService: StatusService;

  constructor(public injector: Injector) {
    super(injector);
    this.statusService = injector.get<StatusService>(StatusService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.modalWidth = 450;
    this.form = this.fh.FormBuilder({
      justificativa: { default: null },
      novo_status: { default: null }
    }, this.cdRef, this.validate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.tipo = this.metadata?.tipo || this.tipo;
    this.entity = this.metadata?.entity || this.entity;
    this.novoStatus = this.metadata?.novoStatus || this.novoStatus;
    if (this.novoStatus.length) this.form?.controls.novo_status?.setValue(this.novoStatus);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    let valueLength = control.value?.trim().length;
    if (['justificativa'].indexOf(controlName) >= 0) {
      if(!valueLength) {
        if(this.exigeJustificativa()) result = "Obrigatório";
      } else {
        if(valueLength < this.MIN_LENGTH_TEXT) result = "Texto muito curto. Mínimo: " + this.MIN_LENGTH_TEXT + " caracteres.";
        if(valueLength > this.MAX_LENGTH_TEXT) result = "Conteúdo (" + valueLength + " caracteres) excede o comprimento máximo: " + this.MAX_LENGTH_TEXT + ".";
      }
    }
    return result;
  }

  public async onSubmitClick() {
    if (this.metadata.onClick) {
      this.loading = true;
      try {
        let response = await this.metadata.onClick(this.entity, this.form?.controls.justificativa.value);
        this.go.setModalResult(this.modalRoute?.queryParams?.idroute, response);
        this.close();
      } catch (error: any) {
        this.error(error?.message || error?.error || error || "Erro desconhecido");
      } finally {
        this.loading = false;
      }
    }
  }

  /**
   * Com base no novo status pretendido para a entidade, obtém um array com os status de origem que não exigem justificativa e por fim verifica
   * se o status atual é um deles.
   * @returns boolean 
   */
  public exigeJustificativa() {
    let result = this.lookup.getData(this.statusService.getItem(this.tipo), this.form?.controls.novo_status?.value);
    return !Array.from(result).includes(this.statusAtual);
  }

}


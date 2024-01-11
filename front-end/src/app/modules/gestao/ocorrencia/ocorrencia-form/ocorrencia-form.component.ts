import { Component, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { OcorrenciaDaoService } from 'src/app/dao/ocorrencia-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Ocorrencia } from 'src/app/models/ocorrencia.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { PlanoTrabalhoConsolidacao } from 'src/app/models/plano-trabalho-consolidacao.model';
import { PlanoTrabalhoDaoService } from 'src/app/dao/plano-trabalho-dao.service';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';

@Component({
  selector: 'app-ocorrencia-form',
  templateUrl: './ocorrencia-form.component.html',
  styleUrls: ['./ocorrencia-form.component.scss']
})
export class OcorrenciaFormComponent extends PageFormBase<Ocorrencia, OcorrenciaDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('plano', { static: false }) public plano?: InputSearchComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;

  public form: FormGroup;
  public planoTrabalhoDao: PlanoTrabalhoDaoService;
  public usuarioDao: UsuarioDaoService;
  public usuarioId?: string;
  public consolidacao?: PlanoTrabalhoConsolidacao;
  public planoTrabalho?: PlanoTrabalho;

  constructor(public injector: Injector) {
    super(injector, Ocorrencia, OcorrenciaDaoService);
    this.planoTrabalhoDao = injector.get<PlanoTrabalhoDaoService>(PlanoTrabalhoDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.modalWidth = 500;
    this.form = this.fh.FormBuilder({
      descricao: {default: ""},
      data_inicio: {default: new Date()},
      data_fim: {default: new Date()},
      usuario_id: {default: ""},
      plano_trabalho_id: {default: ""}
    }, this.cdRef, this.validate);
    this.join = ["usuario", "plano_trabalho.usuario:id,nome,apelido"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    /* RI_OCOR_1 */
    if(controlName == 'plano_trabalho_id' && !!control.value?.length && this.plano?.selectedEntity?.usuario_id != this.form?.controls.usuario_id.value) {
      result = "Obrigatório ser o mesmo " + this.lex.translate("usuário") + " do " + this.lex.translate("plano de trabalho");
    } else if(['data_inicio', 'data_fim'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } else if(controlName == "data_fim" && this.util.asTimestamp(this.form?.controls.data_inicio.value) > this.util.asTimestamp(control.value)) {
      result = "Menor que início";
    }

    return result;
  }

  public async loadData(entity: Ocorrencia, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    /* Caso venha pela chamada da consolidação do plano de trabalho */
    if(this.metadata?.consolidacao) {
      this.consolidacao = this.metadata?.consolidacao;
      this.planoTrabalho = this.metadata?.plano_trabalho || this.consolidacao!.plano_trabalho;
      entity.usuario_id = this.planoTrabalho!.usuario_id;
      entity.usuario = this.planoTrabalho!.usuario;
      entity.plano_trabalho_id = this.consolidacao!.plano_trabalho_id;
      entity.plano_trabalho = this.planoTrabalho;
    }
    await Promise.all([
      this.usuario!.loadSearch(entity.usuario || entity.usuario_id),
      this.plano!.loadSearch(entity.plano_trabalho || entity.plano_trabalho_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Ocorrencia();
    this.entity.usuario_id = this.auth.usuario!.id;
    this.loadData(this.entity, form); 
  }

  public saveData(form: IIndexable): Promise<Ocorrencia> {
    return new Promise<Ocorrencia>((resolve, reject) => {
      let ocorrencia = this.util.fill(new Ocorrencia(), this.entity!);
      ocorrencia = this.util.fillForm(ocorrencia, this.form!.value);
      resolve(ocorrencia);
    });
  }

  public get warning(): string | undefined {
    let result: string | undefined = undefined;
    let inicio = this.util.asDate(this.form!.controls.data_inicio.value);
    let fim = this.util.asDate(this.form!.controls.data_fim.value);
    if(this.consolidacao && inicio && fim && (this.util.daystamp(inicio) < this.util.daystamp(this.consolidacao.data_inicio) || 
      this.util.daystamp(fim) > this.util.daystamp(this.consolidacao.data_fim))) {
      result = "Atenção: Data da consolidação do plano é de " + this.util.getDateFormatted(this.consolidacao.data_inicio) + " a " + this.util.getDateFormatted(this.consolidacao.data_fim);
    }
    return result;
  }

  public titleEdit = (entity: Ocorrencia): string => {
    return "Editando " + this.lex.translate("ocorrência") + ': ' + (entity?.usuario?.nome || "");
  }
}


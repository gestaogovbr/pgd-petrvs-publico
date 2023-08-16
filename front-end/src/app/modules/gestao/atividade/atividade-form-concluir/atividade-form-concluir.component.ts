import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { InputButtonComponent } from 'src/app/components/input/input-button/input-button.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { Documento } from 'src/app/models/documento.model';

@Component({
  selector: 'app-atividade-form-concluir',
  templateUrl: './atividade-form-concluir.component.html',
  styleUrls: ['./atividade-form-concluir.component.scss']
})
export class AtividadeFormConcluirComponent extends PageFormBase<Atividade, AtividadeDaoService> implements OnInit {
  @ViewChild('tipoAtividade', { static: false }) public tipoAtividade?: InputSearchComponent;
  @ViewChild('docEntregue', { static: false }) public docEntregue?: InputButtonComponent;
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public tipoAtividadeDao: TipoAtividadeDaoService;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  public form: FormGroup;
  public efemerides?: Efemerides;
  public modalWidth: number = 800;
  public calendar: CalendarService;
  public entregas: LookupItem[] = [];

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.form = this.fh.FormBuilder({
      tipo_atividade_id: {default: null},
      data_distribuicao: {default: null},
      esforco: {default: 0},
      progresso: {default: 0},
      data_estipulada_entrega: {default: null},
      data_inicio: {default: null},
      tempo_despendido: {default: 0},
      data_entrega: {default: null},
      arquivar: {default: true},
      descricao_tecnica: {default: ""},
      documento_entrega: {default: new Documento()},
      documento_entrega_id: {default: null},
      plano_trabalho_entrega_id: {default: null}
    }, this.cdRef, this.validate);
    this.join = ["plano_trabalho.tipo_modalidade", "unidade", "plano_trabalho.entregas.entrega:id,nome"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if((controlName == "plano_trabalho_entrega_id" && !control.value?.length) || 
      (controlName == "data_entrega" && !this.util.isDataValid(control.value))) {
      result = "Obrigatório";
    }
    
    return result;
  }

  public async loadData(entity: Atividade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    formValue.data_entrega = this.auth.hora;
    formValue.progresso = 100;
    await this.tipoAtividade!.loadSearch(entity.tipo_atividade || formValue.tipo_atividade_id);
    if(entity.unidade_id != this.auth.unidade!.id) {
      await this.auth.selecionaUnidade(entity.unidade_id);
    }
    this.entregas = entity.plano_trabalho?.entregas?.map(x => Object.assign({}, {
      key: x.id,
      value: x.descricao + (x.entrega ? " (" + x.entrega!.nome + ")" : ""),
      data: x
    })) || [];
    formValue.arquivar = true;  
    form.patchValue(formValue);
    this.onDataEntregaChange();
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getAtividade(this.urlParams!.get("id")!))!;
    await this.loadData(this.entity, form);
  }

  public onDataEntregaChange(event?: Event) {
    const entrega = this.form.controls.data_entrega.value;
    const inicio = this.entity!.data_inicio!;
    const cargaHoraria = this.entity!.carga_horaria;
    const unidade = this.entity!.unidade!;
    const pausas = this.entity!.pausas || [];
    const afastamentos = this.entity!.usuario?.afastamentos || [];
    this.efemerides = this.util.isDataValid(entrega) ? this.calendar.calculaDataTempoUnidade(inicio, entrega, cargaHoraria, unidade, "ENTREGA", pausas, afastamentos) : undefined;
    if(this.efemerides) {
      this.form.controls.tempo_despendido.setValue(this.efemerides.tempoUtil);
      this.cdRef.detectChanges(); 
    } 
  }

  public onTipoAtividadeSelect(item: SelectItem) {
    const tipoAtividade: TipoAtividade | undefined = item.entity as TipoAtividade;
    this.form.controls.esforco.setValue(tipoAtividade?.esforco || 0);
    this.cdRef.detectChanges();
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let atividade = this.util.fill(new Atividade(), this.entity!);
      atividade = this.util.fillForm(atividade, this.form!.value);
      atividade.id = this.entity!.id;
      atividade.descricao_tecnica = this.form!.controls.descricao_tecnica.value;
      atividade.data_arquivamento = this.form!.controls.arquivar.value ? new Date() : null;
      atividade.progresso = this.form!.controls.progresso.value;
      atividade.produtividade = this.entity?.plano_trabalho?.tipo_modalidade?.atividade_tempo_despendido ? this.calendar.produtividade(atividade.esforco, atividade.tempo_despendido) : null;
      this.dao!.concluir(atividade).then(saved => resolve(saved)).catch(reject);
    });
  }

}
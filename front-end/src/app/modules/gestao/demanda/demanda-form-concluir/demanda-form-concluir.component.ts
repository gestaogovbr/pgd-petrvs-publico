import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Demanda } from 'src/app/models/demanda.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { InputButtonComponent } from 'src/app/components/input/input-button/input-button.component';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';

@Component({
  selector: 'app-demanda-form-concluir',
  templateUrl: './demanda-form-concluir.component.html',
  styleUrls: ['./demanda-form-concluir.component.scss']
})
export class DemandaFormConcluirComponent extends PageFormBase<Demanda, DemandaDaoService> implements OnInit {
  @ViewChild('atividade', { static: false }) public atividade?: InputSearchComponent;
  @ViewChild('docEntregue', { static: false }) public docEntregue?: InputButtonComponent;
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public atividadeDao: AtividadeDaoService;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public form: FormGroup;
  public efemerides?: Efemerides;
  public modalWidth: number = 800;
  public complexidades: LookupItem[] = [];
  public calendar: CalendarService;

  constructor(public injector: Injector) {
    super(injector, Demanda, DemandaDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.form = this.fh.FormBuilder({
      id_processo_entrega: {default: null},
      numero_processo_entrega: {default: null},
      id_documento_entrega: {default: null},
      tipo_documento_entrega_id: {default: null},
      numero_documento_entrega: {default: null},
      titulo_documento_entrega: {default: null},
      atividade_id: {default: null},
      fator_complexidade: {default: 1},
      data_distribuicao: {default: null},
      tempo_pactuado: {default: 0},
      prazo_entrega: {default: null},
      data_inicio: {default: null},
      tempo_despendido: {default: 0},
      data_entrega: {default: null},
      arquivar: {default: false},
      descricao_tecnica: {default: ""}
    }, this.cdRef, this.validate);
    this.join = ["plano.tipo_modalidade", "unidade"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if((controlName == "atividade_id" && !control.value?.length) || 
      (controlName == "fator_complexidade" && !(control.value > 0)) ||
      (controlName == "data_entrega" && !this.util.isDataValid(control.value))) {
      result = "Obrigatório";
    }
    
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    const values = form!.value;
    if(values.tempo_pactuado <= 0) {
      return "Tempo pactuado não pode ser zero";
    } 
    if(values.tempo_despendido <= 0 && this.entity?.plano?.tipo_modalidade?.calcula_tempo_despendido) {
      return "Tempo despendido não pode ser zero";
    }
    /* Validações pelo plano */
    if(!this.auth.hasPermissionTo('MOD_DMD_ATV_FORA_PL_TRB')) {
      const atividades_termo_adesao = this.entity?.plano?.documento?.metadados?.atividades_termo_adesao;
      const atividade = this.atividade!.searchObj as Atividade;
      if(atividades_termo_adesao && atividade && atividades_termo_adesao.indexOf(this.util.removeAcentos(atividade.nome.toLowerCase())) < 0){
        return this.lex.noun("Atividade") + " não consta na lista permitida pelo " + this.lex.noun("plano de trabalho") + " selecionado.";
      }
    }
    return undefined;
  }

  public async loadData(entity: Demanda, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    formValue.data_entrega = this.auth.hora;
    await this.atividade!.loadSearch(entity.atividade || formValue.atividade_id);
    if(entity.unidade_id != this.auth.unidade!.id) {
      await this.auth.selecionaUnidade(entity.unidade_id);
    }
    formValue.arquivar = !!this.entity?.plano?.tipo_modalidade?.dispensa_avaliacao; 
    form.patchValue(formValue);
    this.onDataEntregaChange();
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getDemanda(this.urlParams!.get("id")!))!;
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

  public async onNumeroDocumentoEntregaClick(event: Event) {
    const numeroDocumentoEntregue = this.form?.controls.numero_documento_entrega?.value;
    if(numeroDocumentoEntregue?.length) {
      this.docEntregue!.loading = true;
      try {
        let dados = await this.allPages.getDadosDocumento(numeroDocumentoEntregue); 
        if(dados) {
          let tipo_documento_id = null;
          if(dados.documento?.tipo_documento) {
            const tipo_documento = await this.tipoDocumentoDao.query({where: [["nome", "=", dados.documento?.tipo_documento]]}).asPromise();
            if(tipo_documento[0]) tipo_documento_id = tipo_documento[0].id;
          }
          this.form.controls.id_processo_entrega.setValue(dados?.processo?.id_processo); 
          this.form.controls.numero_processo_entrega.setValue(dados?.processo?.numero_processo);
          this.form.controls.id_documento_entrega.setValue(dados?.documento?.id_documento); 
          this.form.controls.tipo_documento_entrega_id.setValue(tipo_documento_id);
          this.form.controls.numero_documento_entrega.setValue(dados?.documento?.numero_documento);
          this.form.controls.titulo_documento_entrega.setValue(dados?.documento?.titulo_documento);
        } else {
          throw new Error("Documento não encontrado");
        }
      } catch(error) {
        this.dialog.alert("Error", "Impossível encontrar o documento informado. Tente concluir diretamente pelo botão 'Concluir' acessando o documento no Sei!")
      } finally {
        this.docEntregue!.loading = false;
      }
    }
  }

  public onComplexidadeChange(event: Event) {
    if(this.atividade?.searchObj) {
      const atividade = this.atividade?.searchObj as Atividade;
      /* Carrega tempo pactuado */
      const fator = this.form.controls.fator_complexidade.value || 1;
      //const cargaHoraria = this.entity!.plano!.carga_horaria || this.calendar.expediente(this.entity!.unidade!);
      const fator_ganho_produtivade = 1 - ((this.entity?.plano?.ganho_produtividade || 0) / 100);
      this.form.controls.tempo_pactuado.setValue((atividade?.tempo_pactuado || 0) * fator * fator_ganho_produtivade || 0);
      //this.form.controls.tempo_planejado.setValue(atividade.dias_planejado * cargaHoraria * fator || 0);
      //const entrega = this.calendar.prazo(this.form.controls.data_distribuicao.value, this.form.controls.tempo_planejado.value, cargaHoraria, this.entity!.unidade!, "DISTRIBUICAO");
      //this.form.controls.prazo_entrega.setValue(entrega);
    }
  }

  public onAtividadeSelect(item: SelectItem) {
    const atividade: Atividade | undefined = item.entity as Atividade;
    if(atividade) {
      /* Carrega complexidades */
      this.complexidades = atividade.complexidade?.map(x => {
        return {
          key: x.fator,
          value: x.grau + ' (Fator: ' + x.fator + ')'
        };
      }) || [];
      /* Carrega tempo pactuado */
      this.onComplexidadeChange(new Event('change'));
    } else {
      this.form.controls.tempo_pactuado.setValue(0);
      this.complexidades = [];
    }
    this.cdRef.detectChanges();
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let demanda = this.util.fill(new Demanda(), this.entity!);
      demanda = this.util.fillForm(demanda, this.form!.value);
      demanda.id = this.entity!.id;
      demanda.descricao_tecnica = this.form!.controls.descricao_tecnica.value;
      demanda.data_arquivamento = this.form!.controls.arquivar.value ? new Date() : null;
      demanda.produtividade = this.entity?.plano?.tipo_modalidade?.calcula_tempo_despendido ? this.calendar.produtividade(demanda.tempo_pactuado, demanda.tempo_despendido) : null;
      this.dao!.concluir(demanda).then(saved => resolve(saved)).catch(reject);
    });
  }

}
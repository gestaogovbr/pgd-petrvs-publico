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
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { InputButtonComponent } from 'src/app/components/input/input-button/input-button.component';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { InputMultitoggleComponent } from 'src/app/components/input/input-multitoggle/input-multitoggle.component';

@Component({
  selector: 'app-demanda-form-avaliar',
  templateUrl: './demanda-form-avaliar.component.html',
  styleUrls: ['./demanda-form-avaliar.component.scss']
})
export class DemandaFormAvaliarComponent extends PageFormBase<Demanda, DemandaDaoService> implements OnInit {
  @ViewChild('atividade', { static: false }) public atividade?: InputSearchComponent;
  @ViewChild('docEntregue', { static: false }) public docEntregue?: InputButtonComponent;
  @ViewChild('justificativas', { static: false }) public justificativas?: InputMultitoggleComponent;
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  public atividadeDao: AtividadeDaoService;
  public tipoAvaliacaoDao: TipoAvaliacaoDaoService;
  public tiposAvaliacoes: TipoAvaliacao[] = [];
  public tiposJustificativas: LookupItem[] = [];
  public tipoAvaliacao?: LookupItem; 
  public allPages: ListenerAllPagesService;
  public form: FormGroup;
  public efemerides?: Efemerides;
  public modalWidth: number = 900;
  public complexidades: LookupItem[] = [];
  public calendar: CalendarService;
  public atrasado: boolean = false;
  public despendidoMinimo: number = 0;

  constructor(public injector: Injector) {
    super(injector, Demanda, DemandaDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.tipoAvaliacaoDao = injector.get<TipoAvaliacaoDaoService>(TipoAvaliacaoDaoService); 
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.form = this.fh.FormBuilder({
      tipo_documento_entrega_id: {default: null},
      numero_documento_entrega: {default: null},
      titulo_documento_entrega: {default: null},
      atividade_id: {default: null},
      fator_complexidade: {default: 1},
      data_distribuicao: {default: null},
      tempo_pactuado: {default: 0},
      prazo_entrega: {default: null},
      diferenca_prazo_entrega: {default: 0},
      data_inicio: {default: null},
      tempo_despendido: {default: 0},
      data_entrega: {default: null},
      produtividade: {default: 0},
      nota_atribuida: {default: null},
      arquivar: {default: true},
      justificativas: {default: []},
      tipo_avaliacao_id: {default: null},
      comentario_avaliacao: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if((controlName == "atividade_id" && !control.value?.length) || 
      (controlName == "fator_complexidade" && !(control.value > 0))) {
      result = "Obrigatório";
    } else if(controlName == "nota_atribuida" && !(control.value >= 0)) {
      result = "Obrigatório selecionar. Caso queira selecionar ZERO, clique 2x em qualquer estrela!"
    }

    return result;
  }

  public async loadData(entity: Demanda, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    this.atrasado = !!entity.metadados?.atrasado;
    formValue.diferenca_prazo_entrega = this.atrasado ? 
      this.calendar.horasAtraso(formValue.prazo_entrega, entity.unidade!) :
      this.calendar.horasAdiantado(formValue.data_entrega, formValue.prazo_entrega, entity.plano!.carga_horaria, entity.unidade!);
    await this.atividade!.loadSearch(entity.atividade || formValue.atividade_id);
    if(entity.unidade_id != this.auth.unidade!.id) {
      await this.auth.selecionaUnidade(entity.unidade_id);
    }
    if(entity.avaliacao) {
      formValue.nota_atribuida = entity.avaliacao.nota_atribuida;
      formValue.justificativas = entity.avaliacao.justificativas;
      formValue.tipo_avaliacao_id = entity.avaliacao.tipo_avaliacao_id;
    }
    formValue.comentario_avaliacao = (entity.comentarios || []).find(x => x.tipo == "AVALIACAO")?.texto || "";
    this.form.controls.nota_atribuida.setValue(formValue.nota_atribuida);
    this.onNotaChange(new Event('change'));
    form.patchValue(formValue);
  }

  public async initializeData(form: FormGroup) {
    const results = await Promise.all([
      this.dao!.getDemanda(this.urlParams!.get("id")!),
      this.tipoAvaliacaoDao.query({join: ["tipos_avaliacoes_justificativas.tipo_justificativa"]}).asPromise()
    ]);
    this.entity = results[0]!;
    this.tiposAvaliacoes = results[1];
    await this.loadData(this.entity, form);
  }

  public get styleButtonTipoAvaliacao(): string {
    const rgb = this.util.colorHexToRGB(this.tipoAvaliacao?.color || "#000000");
    return "background-color: rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.2);";
  }

  public onNotaChange(event: Event) {
    const nota = this.form.controls.nota_atribuida.value;
    const tipoAvaliacao = this.tiposAvaliacoes.find(x => x.nota_atribuida == nota);
    if(tipoAvaliacao) {
      this.tipoAvaliacao = {
        key: tipoAvaliacao.id,
        value: tipoAvaliacao.nome,
        icon: tipoAvaliacao.icone,
        color: tipoAvaliacao.cor,
        data: {
          nota: nota,
          pergunta: tipoAvaliacao.pergunta
        }
      };
      this.form.controls.tipo_avaliacao_id.setValue(tipoAvaliacao.id);
      this.tiposJustificativas = tipoAvaliacao.tipos_avaliacoes_justificativas.map(x => {
        return {
          key: x.tipo_justificativa_id,
          value: x.tipo_justificativa!.nome || ""
        }
      })
    }
    this.cdRef.detectChanges();  
  }

  public onComplexidadeChange(event: Event) {
    if(this.atividade?.searchObj) {
      const form = this.form.value;
      const atividade = this.atividade?.searchObj as Atividade;
      /* Carrega tempo pactuado */
      const fator = form.fator_complexidade || 1;
      const fator_ganho_produtivade = 1 - ((this.entity?.plano?.ganho_produtividade || 0) / 100);
      this.form.controls.tempo_pactuado.setValue((atividade?.tempo_pactuado || 0) * fator * fator_ganho_produtivade || 0);
      this.form.controls.produtividade.setValue(this.calendar.produtividade(this.form.controls.tempo_pactuado.value, form.tempo_despendido));
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
      /* Atualiza fator de complexidade */
      if(!atividade.complexidade?.find(x => x.fator == this.form.controls.fator_complexidade.value)) this.form.controls.fator_complexidade.setValue(1);
      this.onComplexidadeChange(new Event("change")); 
      /* Calcula o tempo despendido mínimo */
      this.despendidoMinimo = (atividade.tempo_minimo / 100) * (this.entity?.tempo_despendido || 0);
    } else {
      this.form.controls.tempo_pactuado.setValue(0);
      this.complexidades = [];
    }
    this.cdRef.detectChanges();
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const form = this.form!.value;
      const avaliacao = {
        demanda_id: this.entity?.id,
        atividade_id: form.atividade_id,
        tipo_avaliacao_id: this.tipoAvaliacao!.key,
        fator_complexidade: form.fator_complexidade,
        tempo_pactuado: form.tempo_pactuado,
        produtividade: form.produtividade,
        nota_atribuida: form.nota_atribuida,
        arquivar: form.arquivar,
        comentario_avaliacao: form.comentario_avaliacao, 
        justificativas: form.justificativas || [] //this.justificativas?.items?.map(x => x.key) || []
      };
      this.dao!.avaliar(avaliacao).then(saved => resolve(saved)).catch(reject);
    });
  }
}
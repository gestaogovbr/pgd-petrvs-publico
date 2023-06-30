import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { DemandaDaoService } from 'src/app/dao/demanda-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Demanda } from 'src/app/models/demanda.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { Usuario } from 'src/app/models/usuario.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { Plano } from 'src/app/models/plano.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { InputTimerComponent } from 'src/app/components/input/input-timer/input-timer.component';

@Component({
  selector: 'app-demanda-form-iniciar',
  templateUrl: './demanda-form-iniciar.component.html',
  styleUrls: ['./demanda-form-iniciar.component.scss']
})
export class DemandaFormIniciarComponent extends PageFormBase<Demanda, DemandaDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('plano', { static: false }) public plano?: InputSelectComponent;
  @ViewChild('planejado', { static: false }) public planejado?: InputTimerComponent;
  
  public usuarioDao: UsuarioDaoService;
  public calendar: CalendarService;
  public form: FormGroup;
  public modalWidth: number = 600;
  public iniciadas: string[] = []; 
  public planos: LookupItem[] = [];
  public entregas: LookupItem[] = [];
  public get labelInfoSuspender(): string {
    const n = this.lex.noun("tarefa", this.iniciadas.length > 1);
    const s = this.iniciadas.length == 1 ? "" : "s";
    const q = this.iniciadas.length == 1 ? "" : " " + this.iniciadas.length.toString();
    return this.iniciadas.length ? `Suspender a${s}${q} ${n} já iniciada${s}?` : "Não há outras demandas iniciadas pelo usuário!";
  }

  constructor(public injector: Injector) {
    super(injector, Demanda, DemandaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.form = this.fh.FormBuilder({
      usuario_id: {default: undefined},
      plano_id: {default: undefined},
      entrega_id: {default: undefined},
      data_distribuicao: {default: new Date()},
      prazo_entrega: {default: new Date()},
      carga_horaria: {default: 0},
      tempo_planejado: {default: 0},
      fator_complexidade: {default: 1},
      tempo_pactuado: {default: 0},
      data_inicio: {default: null},
      suspender: {default: false}
    }, this.cdRef, this.validate);
    this.join = ["unidade", "atividade", "usuario.planos.tipo_modalidade", "usuario.planos.entregas.entrega:id,nome"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(["usuario_id", "plano_id"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "data_inicio" && !control.value){
      result = "Obrigatório";
    }

    return result;
  }

  public get prazoEmDias(): string | undefined {
    return this.entity?.unidade && ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(this.entity!.unidade!.distribuicao_forma_contagem_prazos) ? "true" : undefined;
  }

  public get prazoEmHoras(): string | undefined {
    return this.entity?.unidade && ["DIAS_CORRIDOS", "DIAS_UTEIS"].includes(this.entity!.unidade!.distribuicao_forma_contagem_prazos) ? undefined : "true";
  }

  public loadIniciadas(usuario_id?: string) {
    this.iniciadas = [];
    if(usuario_id?.length) {
      this.dao!.iniciadas(usuario_id).then(idsIniciadas => {
        this.iniciadas = idsIniciadas;
        this.cdRef.detectChanges();
      });
    }
  }

  public onUsuarioSelect(item: SelectItem) {
    const usuario: Usuario | undefined = item.entity as Usuario;
    const planos = usuario?.planos || [];
    this.planos = planos.filter(x => x.unidade_id == this.entity!.unidade_id).map(x => {
      return {
        key: x.id,
        value: (x.tipo_modalidade?.nome || "") + " - " + this.dao!.getDateFormatted(x.data_inicio_vigencia)+ " à " + this.dao!.getDateFormatted(x.data_fim_vigencia),
        data: x
      };
    });
    this.cdRef.detectChanges();
    if(!this.form.controls.plano_id.value?.length && this.planos.length == 1) {
      this.form.controls.plano_id.setValue(this.planos[0].key);
    }
    this.cdRef.detectChanges();
  }

  public onPlanoChange(event: Event) {
    (async () => {
      if(this.entity) {
        const plano = this.plano?.selectedItem?.data as Plano;
        const entrega_id = this.form.controls.entrega_id.value;
        /*if(plano && this.form!.controls.unidade_id.value != plano.unidade_id) {
          const unidade = await this.unidadeDao.getById(plano.unidade_id);
          if(unidade) {
            await this.unidade?.loadSearch(unidade);
            await this.auth.selecionaUnidade(unidade.id);
          }
        }*/
        const cargaHoraria = plano?.carga_horaria || this.calendar.expedienteMedio(this.entity!.unidade);
        const tempo_planejado = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.prazo_entrega.value, cargaHoraria, this.entity!.unidade!, "DISTRIBUICAO");
        const fator = this.form.controls.fator_complexidade.value || 1;
        const fator_ganho_produtivade = 1 - ((plano?.ganho_produtividade || 0) / 100);
        if(this.planejado) this.planejado!.hoursPerDay = cargaHoraria;
        this.form.controls.carga_horaria.setValue(cargaHoraria);
        this.form.controls.tempo_planejado.setValue(tempo_planejado);
        this.form.controls.tempo_pactuado.setValue((this.entity?.atividade?.tempo_pactuado || 0) * fator * fator_ganho_produtivade || 0);
        /* Carrega entregas */
        this.entregas = plano.entregas?.map(x => Object.assign({}, {
          key: x.id,
          value: x.entrega?.nome || "DESCONHECIDO",
          data: x
        })) || [];
        this.cdRef.detectChanges();
        this.form.controls.entrega_id.setValue(!entrega_id?.length && this.planos.length > 0 ? this.planos[0].key : entrega_id);
      }
    })();
  }

  public async loadData(entity: Demanda, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    if(!formValue.usuario_id?.length) {
      formValue.usuario_id = this.auth.usuario?.id;
    }
    formValue.data_inicio = formValue.data_inicio || this.util.setStrTime(new Date(), this.auth.unidadeHora);
    await this.usuario!.loadSearch(entity.usuario || formValue.usuario_id);
    this.loadIniciadas(formValue.usuario_id);
    if(entity.unidade_id != this.auth.unidade!.id) {
      await this.auth.selecionaUnidade(entity.unidade_id);
    }
    form.patchValue(formValue);
    this.onPlanoChange(new Event('change'));
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    await this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let demanda = this.util.fill(new Demanda(), this.entity!);
      demanda = this.util.fillForm(demanda, this.form!.value);
      demanda.id = this.entity!.id;
      demanda.suspender = this.form!.controls.suspender.value;
      this.dao!.iniciar(demanda).then(saved => resolve(saved)).catch(reject);
    });
  }

}



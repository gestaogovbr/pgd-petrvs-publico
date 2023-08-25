import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { Usuario } from 'src/app/models/usuario.model';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSelectComponent } from 'src/app/components/input/input-select/input-select.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { InputTimerComponent } from 'src/app/components/input/input-timer/input-timer.component';
import { PlanoTrabalho } from 'src/app/models/plano-trabalho.model';

@Component({
  selector: 'app-atividade-form-iniciar',
  templateUrl: './atividade-form-iniciar.component.html',
  styleUrls: ['./atividade-form-iniciar.component.scss']
})
export class AtividadeFormIniciarComponent extends PageFormBase<Atividade, AtividadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('planoTrabalho', { static: false }) public planoTrabalho?: InputSelectComponent;
  @ViewChild('planejado', { static: false }) public planejado?: InputTimerComponent;
  
  public usuarioDao: UsuarioDaoService;
  public calendar: CalendarService;
  public form: FormGroup;
  public modalWidth: number = 600;
  public iniciadas: string[] = []; 
  public planosTrabalhos: LookupItem[] = [];
  public planosTrabalhosEntregas: LookupItem[] = [];
  public get labelInfoSuspender(): string {
    const n = this.iniciadas.length > 1 ? this.lex.translate("tarefas"): this.lex.translate("tarefa");
    const s = this.iniciadas.length == 1 ? "" : "s";
    const q = this.iniciadas.length == 1 ? "" : " " + this.iniciadas.length.toString();
    return this.iniciadas.length ? `Suspender a${s}${q} ${n} já iniciada${s}?` : "Não há outras atividades iniciadas pelo usuário!";
  }

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.form = this.fh.FormBuilder({
      usuario_id: {default: undefined},
      plano_trabalho_id: {default: undefined},
      plano_trabalho_entrega_id: {default: undefined},
      data_distribuicao: {default: new Date()},
      data_estipulada_entrega: {default: new Date()},
      carga_horaria: {default: 0},
      tempo_planejado: {default: 0},
      esforco: {default: 0},
      data_inicio: {default: null},
      suspender: {default: false}
    }, this.cdRef, this.validate);
    this.join = ["unidade", "atividade", "usuario.planos_trabalho.tipo_modalidade", "usuario.planos_trabalho.entregas.plano_entrega_entrega:id,descricao"];
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(["usuario_id", "plano_trabalho_id"].includes(controlName) && !control.value?.length) {
      result = "Obrigatório";
    } else if(controlName == "data_inicio" && !control.value){
      result = "Obrigatório";
    }

    return result;
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
    const planosTrabalhos = usuario?.planos_trabalho || [];
    this.planosTrabalhos = planosTrabalhos.filter(x => x.unidade_id == this.entity!.unidade_id).map(x => {
      return {
        key: x.id,
        value: (x.tipo_modalidade?.nome || "") + " - " + this.dao!.getDateFormatted(x.data_inicio)+ " à " + this.dao!.getDateFormatted(x.data_fim),
        data: x
      };
    });
    this.cdRef.detectChanges();
    if(!this.form.controls.plano_trabalho_id.value?.length && this.planosTrabalhos.length == 1) {
      this.form.controls.plano_trabalho_id.setValue(this.planosTrabalhos[0].key);
    }
    this.cdRef.detectChanges();
  }

  public onPlanoChange(event: Event) {
    (async () => {
      if(this.entity) {
        const planoTrabalho = this.planoTrabalho?.selectedItem?.data as PlanoTrabalho;
        const planoTrabalhoEntregaId = this.form.controls.plano_trabalho_entrega_id.value;
        const cargaHoraria = planoTrabalho?.carga_horaria || this.calendar.expedienteMedio(this.entity!.unidade);
        const tempo_planejado = this.calendar.horasUteis(this.form.controls.data_distribuicao.value, this.form.controls.data_estipulada_entrega.value, cargaHoraria, this.entity!.unidade!, "DISTRIBUICAO");
        this.form.controls.carga_horaria.setValue(cargaHoraria);
        this.form.controls.tempo_planejado.setValue(tempo_planejado);
        this.form.controls.esforco.setValue(this.form.controls.esforco.value || this.entity?.tipo_atividade?.esforco || 0);
        /* Carrega entregas */
        this.planosTrabalhosEntregas = planoTrabalho.entregas?.map(x => Object.assign({}, {
          key: x.id,
          value: x.descricao + (x.plano_entrega_entrega ? " (" + x.plano_entrega_entrega?.descricao + ")" : ""),
          data: x
        })) || [];
        this.cdRef.detectChanges();
        this.form.controls.plano_trabalho_entrega_id.setValue(!planoTrabalhoEntregaId?.length && this.planosTrabalhos.length > 0 ? this.planosTrabalhos[0].key : planoTrabalhoEntregaId);
      }
    })();
  }

  public async loadData(entity: Atividade, form: FormGroup) {
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
      let atividade = this.util.fill(new Atividade(), this.entity!);
      atividade = this.util.fillForm(atividade, this.form!.value);
      atividade.id = this.entity!.id;
      atividade.suspender = this.form!.controls.suspender.value;
      this.dao!.iniciar(atividade).then(saved => resolve(saved)).catch(reject);
    });
  }

}



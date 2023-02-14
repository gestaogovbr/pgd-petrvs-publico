import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Atividade } from 'src/app/models/atividade.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { TipoAtividadeDaoService } from 'src/app/dao/tipo-atividade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { LookupItem, LookupService } from 'src/app/services/lookup.service';
import { TipoProcessoDaoService } from 'src/app/dao/tipo-processo-dao.service';
import { UtilService } from 'src/app/services/util.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';

@Component({
  selector: 'app-a tividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.scss']
})
export class AtividadeFormComponent extends PageFormBase<Atividade, AtividadeDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('tipoAtividade', { static: false }) public tipoAtividade?: InputSearchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;

  public form: FormGroup;
  public formComplexidade: FormGroup;
  public tipoAtividadeDao: TipoAtividadeDaoService;
  public unidadeDao: UnidadeDaoService;
  public tipoProcessoDao: TipoProcessoDaoService;

  constructor(public injector: Injector) {
    super(injector, Atividade, AtividadeDaoService);
    this.tipoAtividadeDao = injector.get<TipoAtividadeDaoService>(TipoAtividadeDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.tipoProcessoDao = injector.get<TipoProcessoDaoService>(TipoProcessoDaoService);

    this.form = this.fh.FormBuilder({
      nome: {default: ""},
      tempo_pactuado: {default: 48},
      dias_planejado: {default: ""},
      tempo_minimo: {default: ""},
      recalcula_prazo: {default: ""},
      desativa_produtividade: {default: ""},
      complexidade: {default: []},
      tipo_processo_id: {default: ""},
      etiquetas_predefinidas: {default: []},
      checklist_predefinidos: {default: []},
      comentario_predefinido: {default: ""},
      parametros_adotados: {default: []},
      entregas_esperadas: {default: []},
      homologado: {default: ""},
      data_homologacao: {default: new Date()},
      data_inicio: {default: new Date()},
      data_fim: {default: new Date()},
      unidade_id: {default: ""},
      tipo_atividade_id: {default: ""},
      parametro_texto: {default: ""},
      entrega_texto: {default: ""},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      checklist_texto: {default: ""},
      tipos_processo: {default: []},
      tipos_processo_texto: {default: ""}
    }, this.cdRef, this.validate);
    this.formComplexidade = this.fh.FormBuilder({
      id: {default: ""},
      grau: {default: ""},
      fator: {default: 0},
      tempo: {default: 24},
      padrao: {default: true}
    }, this.cdRef, this.validateComplexidade);
    this.join = ["tipo_atividade","unidade"];
  }

  public validateComplexidade = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if(['nome', 'unidade_id', 'tipo_atividade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
      result = "Obrigatório";
    }  else if(['tempo_pactuado', 'tempo_minimo'].indexOf(controlName) >= 0 && !control.value) {
      result = "Valor não pode ser zero.";
    } else if(['data_homologacao'].indexOf(controlName) >= 0 && !this.dao?.validDateTime(control.value)) {
      result = "Inválido";
    } else if(controlName == 'complexidade' && !(control.value || []).find((x: any) => x.padrao)) {
      result = "Obrigatório ao menos um como padrão";
    }

    return result;
  }

  public addItemHandleChecklist(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.checklist_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.checklist_predefinidos.value, key)) {
      result = {
        key: key,
        value: this.form.controls.checklist_texto.value
      };
      this.form.controls.checklist_texto.setValue("");
    }
    return result;
  };

  public addItemHandleTiposProcesso(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.tipos_processo_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.tipos_processo.value, key)) {
      result = {
        key: key,
        value: this.form.controls.tipos_processo_texto.value
      };
      this.form.controls.tipos_processo_texto.setValue("");
    }
    return result;
  };

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.etiquetas_predefinidas.value, key)) {
      result = {
        key: key,
        value: this.form.controls.etiqueta_texto.value,
        color: this.form.controls.etiqueta_cor.value,
        icon: this.form.controls.etiqueta_icone.value
      };
      this.form.controls.etiqueta_texto.setValue("");
      this.form.controls.etiqueta_icone.setValue(null);
      this.form.controls.etiqueta_cor.setValue(null);
    }
    return result;
  };

  public addItemHandleParametros(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.parametro_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.parametros_adotados.value, key)) {
      result = {
        key: key,
        value: this.form.controls.parametro_texto.value
      };
      this.form.controls.parametro_texto.setValue("");
    }
    return result;
  };

  public addItemHandleEntregas(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.entrega_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.entregas_esperadas.value, key)) {
      result = {
        key: key,
        value: this.form.controls.entrega_texto.value
      };
      this.form.controls.entrega_texto.setValue("");
    }
    return result;
  };

  public saveComplexidade(form: FormGroup, item: any) {
    const entity = form.value;
    if(entity.padrao) this.form.controls.complexidade.value.map((x: any) => x.padrao = 0);
    return entity;
  }

  public onPactuadoChange(event: Event) {
    let complexidades = this.form?.controls.complexidade?.value || [];
    for(let complexidade of complexidades) {
      complexidade.tempo = this.form?.controls.tempo_pactuado.value * complexidade.fator;
    }
    this.form?.controls.complexidade?.setValue(complexidades);
    this.cdRef.detectChanges();
  }

  public onFatorChange(row: any, form: FormGroup) {
    const tempo = Math.round(this.form!.controls.tempo_pactuado.value * form.controls.fator.value * 100) / 100;
    form.controls.tempo.setValue(tempo);
    this.cdRef.detectChanges();
  }

  public onTempoChange(row: any, form: FormGroup) {
    const pactuado = this.form!.controls.tempo_pactuado.value;
    const fator = Math.round(pactuado > 0 ? form.controls.tempo.value / pactuado * 100 : 0) / 100;
    form.controls.fator.setValue(fator, {emitEvent: false});
    this.cdRef.detectChanges();
  }

  public async loadData(entity: Atividade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await Promise.all ([
      this.tipoAtividade!.loadSearch(entity.tipoAtividade || entity.tipo_atividade_id),
      this.unidade!.loadSearch(entity.unidade || entity.unidade_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
  }

  public initializeData(form: FormGroup): void {
    this.entity = new Atividade();
    this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<Atividade> {
    return new Promise<Atividade>((resolve, reject) => {
      let atividade = this.util.fill(new Atividade(), this.entity!);
      resolve(this.util.fillForm(atividade, this.form!.value));
    });
  }

  public titleEdit = (entity: Atividade): string => {
    return "Editando ";// + (entity?.unidade_id || "");
  }
}

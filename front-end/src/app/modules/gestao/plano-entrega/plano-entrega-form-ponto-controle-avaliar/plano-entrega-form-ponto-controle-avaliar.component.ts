import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { Demanda } from 'src/app/models/demanda.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';
import { SelectItem } from 'src/app/components/input/input-base';
import { AtividadeDaoService } from 'src/app/dao/atividade-dao.service';
import { TipoAvaliacaoDaoService } from 'src/app/dao/tipo-avaliacao-dao.service';
import { Atividade } from 'src/app/models/atividade.model';
import { CalendarService, Efemerides } from 'src/app/services/calendar.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { TipoAvaliacao } from 'src/app/models/tipo-avaliacao.model';
import { PlanoEntregaPontoControle } from 'src/app/models/plano-entrega-ponto-controle.model';
import { PlanoEntregaPontoControleDaoService } from 'src/app/dao/plano-entrega-ponto-controle-dao.service';
import { InputDatetimeComponent } from 'src/app/components/input/input-datetime/input-datetime.component';
import { InputTextComponent } from 'src/app/components/input/input-text/input-text.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PlanoEntregaPontoControleEntrega } from 'src/app/models/plano-entrega-ponto-controle-entrega.model';

@Component({
  selector: 'app-plano-entrega-form-ponto-controle-avaliar',
  templateUrl: './plano-entrega-form-ponto-controle-avaliar.component.html',
  styleUrls: ['./plano-entrega-form-ponto-controle-avaliar.component.scss']
})
export class PlanoEntregaFormPontoControleAvaliarComponent extends PageFormBase<PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  
  public usuarioDao: UsuarioDaoService;
  public tipoAvaliacaoDao: TipoAvaliacaoDaoService;
  public items: PlanoEntregaPontoControleEntrega[] = [];
  public tiposAvaliacoes: TipoAvaliacao[] = [];
  public tiposJustificativas: LookupItem[] = [];
  public tipoAvaliacao?: LookupItem; 
  //public allPages: ListenerAllPagesService;
  public form: FormGroup;
  public modalWidth: number = 900;

  constructor(public injector: Injector) {
    super(injector, PlanoEntregaPontoControle, PlanoEntregaPontoControleDaoService);
    this.tipoAvaliacaoDao = injector.get<TipoAvaliacaoDaoService>(TipoAvaliacaoDaoService); 
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService); 
    //this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.form = this.fh.FormBuilder({
      inicio: {default: null},
      fim: {default: null},
      plano_entrega_id: {default: null},        
      gestor_id: {default: null},
      nota_atribuida: {default: null},
      justificativas: {default: null},
      tipo_avaliacao_id: {default: null},
      avaliador_id: {default: this.auth.usuario!.id},
      comentarios: {default: ""}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "nota_atribuida" && !(control.value >= 0)) {
      result = "Obrigatório selecionar. Caso queira selecionar ZERO, clique 2x em qualquer estrela!"
    }
    return result;
  }

  public async loadData(entity: PlanoEntregaPontoControle, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
  }

  public async initializeData(form: FormGroup) {
    const results = await Promise.all([
      this.dao!.getPontoControle(this.urlParams!.get("id")!),
      this.tipoAvaliacaoDao.query({join: ["tipos_avaliacoes_justificativas.tipo_justificativa"]}).asPromise()
    ]);
    this.entity = results[0]!;
    this.tiposAvaliacoes = results[1];
    this.entity.avaliador_id = this.auth.usuario!.id;
    this.items = this.entity.entregas;
    this.form.controls.inicio.setValue(this.entity.inicio);
    this.form.controls.fim.setValue(this.entity.fim);
    this.form.controls.gestor_id.setValue(this.entity.gestor_id);
    await this.loadData(this.entity!, form);
    this.cdRef.detectChanges();
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

/*   public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const form = this.form!.value;
      const avaliacao = {
        tipo_avaliacao_id: this.tipoAvaliacao!.key,
        nota_atribuida: form.nota_atribuida,
        arquivar: form.arquivar,
        //comentario_avaliacao: form.comentario_avaliacao, 
        justificativas: form.justificativas || []          //this.justificativas?.items?.map(x => x.key) || []
      };
      this.dao!.avaliar(avaliacao).then(saved => resolve(saved)).catch(reject);
    });
  } */

  public async saveData(form: IIndexable): Promise<PlanoEntregaPontoControle> {
    return new Promise<PlanoEntregaPontoControle>((resolve, reject) => {
      let pontoControle = this.util.fill(new PlanoEntregaPontoControle(), this.entity!);
      pontoControle = this.util.fillForm(pontoControle, this.form!.value);
      resolve(pontoControle);
    });
  }
}
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { UnitWorkload } from 'src/app/components/input/input-workload/input-workload.component';
import { AdesaoDaoService } from 'src/app/dao/adesao-dao.service';
import { DocumentoDaoService } from 'src/app/dao/documento-dao-service';
import { EntidadeDaoService } from 'src/app/dao/entidade-dao.service';
import { ProgramaDaoService } from 'src/app/dao/programa-dao.service';
import { TipoDocumentoDaoService } from 'src/app/dao/tipo-documento-dao.service';
import { TipoModalidadeDaoService } from 'src/app/dao/tipo-modalidade-dao.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { ListenerAllPagesService } from 'src/app/listeners/listener-all-pages.service';
import { Adesao } from 'src/app/models/adesao.model';
import { IIndexable } from 'src/app/models/base.model';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { NavigateResult } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-adesao-form-termo',
  templateUrl: './adesao-form-termo.component.html',
  styleUrls: ['./adesao-form-termo.component.scss']
})

export class AdesaoFormTermoComponent  extends PageFormBase<Adesao, AdesaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('tipoDocumento', { static: false }) public tipoDocumento?: InputSearchComponent;
  @ViewChild('tipo_modalidade', { static: false }) public tipoModalidade?: InputSearchComponent;
  @ViewChild('termo', { static: false }) public termo?: AdesaoFormTermoComponent;
  @ViewChild('entidade', { static: false }) public entidade?: InputSearchComponent;
  processo: any;


  public unidadeDao: UnidadeDaoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public documentoDao: DocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
  public tipoDocumentoDao: TipoDocumentoDaoService;
  
  constructor(public injector: Injector) {
    super(injector, Adesao, AdesaoDaoService);
    this.join = ["unidade", "usuario", "programa", "tipo_modalidade", "documento", "documentos"];
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.tipoDocumentoDao = injector.get<TipoDocumentoDaoService>(TipoDocumentoDaoService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);

    this.form = this.fh.FormBuilder({
      data_inicio_vigencia: {default: new Date()},
      data_fim_vigencia: {default: new Date()},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      programa_id: {default: ""},
      usuario_id: {default: ""},
      unidade_id: {default: ""},
      documento_id: {default: ""},
      documentos: {default: []},
      tipo_documento_id: {default: ""},
      numero_processo: {default: ""},
      tipo_modalidade_id: {default: ""},
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == "tipo_documento_id" && !control?.value?.length && this.form?.controls?.numero_processo?.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public formValidation = (form?: FormGroup) => {
    if(!this.tipoDocumento?.searchObj && form?.controls.tipo_documento_id.value?.length) {
      return "Aguarde o carregamento do tipo de documento";
    }
    return undefined;
  } 

  public onVinculadasChange(event: Event) {
    this.cdRef.detectChanges();
  }

  public async loadData(entity: Adesao, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity);
    await Promise.all ([
      this.unidade!.loadSearch(entity.unidade || entity.unidade_id),
      this.usuario!.loadSearch(entity.usuario || entity.usuario_id),
      this.programa!.loadSearch(entity.programa || entity.programa_id),
      this.tipoModalidade!.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
    ]);
    if(this.processo) {
      formValue.id_processo = this.processo.id_processo;
      formValue.numero_processo = this.processo.numero_processo;
    }
    formValue.data_inicio = this.auth.hora;
    form.patchValue(formValue);
  }

  public async initializeData(form: FormGroup) {
    this.entity = (await this.dao!.getById(this.metadata.adesao.id, this.join))!;
    this.processo = this.metadata?.processo;
    await this.loadData(this.entity!, form);
  }

  public saveData(form: IIndexable): Promise<NavigateResult | undefined> {
    return new Promise<NavigateResult | undefined>((resolve, reject) => {
      //if(this.processo) {
      resolve(new NavigateResult(Object.assign(this.form!.value, {
        // termo: this.termo,
        // atividades_termo_adesao: this.termo!.atividades.map(x => this.util.removeAcentos(x.nome.toLowerCase())),
        // codigo_tipo_documento: (this.tipoDocumento?.searchObj as TipoDocumento)?.codigo
      })));
      /*} else {
        const documento = Object.assign(new Documento(), {
          especie: "TERMO_ADESAO",
          conteudo: this.termo!.conteudo,
          plano_id: this.entity!.id,
          status: "GERADO"
        });
        this.documentoDao.save(documento).then(doc => resolve(undefined)).catch(reject);
      }*/
    });
  }

  public get formaContagemCargaHoraria(): UnitWorkload {
    const forma = this.form?.controls.forma_contagem_carga_horaria?.value || "DIA";
    return forma == "DIA" ? "day" : forma == "SEMANA" ? "week" : "mouth";
  }

  public titleEdit = (entity: Adesao): string => {
    return "Editando " ;//+ (entity?.nome || "");
  }

}

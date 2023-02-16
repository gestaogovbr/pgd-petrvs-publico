import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {PageFormBase} from "../../../base/page-form-base";
import {Plano} from "../../../../models/plano.model";
import {PlanoDaoService} from "../../../../dao/plano-dao.service";
import {EditableFormComponent} from "../../../../components/editable-form/editable-form.component";
import {GridComponent} from "../../../../components/grid/grid.component";
import {TabsComponent} from "../../../../components/tabs/tabs.component";
import {InputSearchComponent} from "../../../../components/input/input-search/input-search.component";
import {AbstractControl, FormGroup} from "@angular/forms";
import {UnidadeDaoService} from "../../../../dao/unidade-dao.service";
import {ProgramaDaoService} from "../../../../dao/programa-dao.service";
import {UsuarioDaoService} from "../../../../dao/usuario-dao.service";
import {AtividadeDaoService} from "../../../../dao/atividade-dao.service";
import {DocumentoDaoService} from "../../../../dao/documento-dao-service";
import {ListenerAllPagesService} from "../../../../listeners/listener-all-pages.service";
import {CalendarService, Efemerides} from "../../../../services/calendar.service";
import {TipoModalidadeDaoService} from "../../../../dao/tipo-modalidade-dao.service";
import {Programa} from "../../../../models/programa.model";
import {SelectItem} from "../../../../components/input/input-base";
import {TipoModalidade} from "../../../../models/tipo-modalidade.model";
import {Unidade} from "../../../../models/unidade.model";
import {Usuario} from "../../../../models/usuario.model";
import {PlanoAtividade} from "../../../../models/plano-atividade.model";
import {IIndexable} from "../../../../models/base.model";
import {ToolbarButton} from "../../../../components/toolbar/toolbar.component";
import {Documento} from "../../../../models/documento.model";
import {UnitWorkload} from "../../../../components/input/input-workload/input-workload.component";
import {AdesaoDaoService} from "../../../../dao/adesao-dao.service";
import {Adesao} from "../../../../models/adesao.model";
import {EntidadeDaoService} from "../../../../dao/entidade-dao.service";
import {LookupItem} from "../../../../services/lookup.service";

@Component({
  selector: 'app-adesao-form',
  templateUrl: './adesao-form.component.html',
  styleUrls: ['./adesao-form.component.scss']
})
export class AdesaoFormComponent extends PageFormBase<Adesao, AdesaoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild('gridDocumentos', { static: false }) public gridDocumentos?: GridComponent;
  @ViewChild('tabs', { static: false }) public tabs?: TabsComponent;
  @ViewChild('usuario', { static: false }) public usuario?: InputSearchComponent;
  @ViewChild('unidade', { static: false }) public unidade?: InputSearchComponent;
  @ViewChild('entidade', { static: false }) public entidade?: InputSearchComponent;
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('tipo_modalidade', { static: false }) public tipoModalidade?: InputSearchComponent;

  public unidadeDao: UnidadeDaoService;
  public entidadeDao: EntidadeDaoService;
  public programaDao: ProgramaDaoService;
  public usuarioDao: UsuarioDaoService;
  public atividadeDao: AtividadeDaoService;
  public documentoDao: DocumentoDaoService;
  public allPages: ListenerAllPagesService;
  public calendar: CalendarService;
  public tipoModalidadeDao: TipoModalidadeDaoService;
public listaUsuarios: LookupItem[] = [];


  constructor(public injector: Injector) {
    super(injector, Adesao, AdesaoDaoService);
    this.join = ["unidade.entidade", "usuario", "programa", "tipo_modalidade", "documento", "documentos.assinaturas.usuario:id,nome,apelido", "entidade"];
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
    this.entidadeDao = injector.get<EntidadeDaoService>(EntidadeDaoService);
    this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.atividadeDao = injector.get<AtividadeDaoService>(AtividadeDaoService);
    this.calendar = injector.get<CalendarService>(CalendarService);
    this.allPages = injector.get<ListenerAllPagesService>(ListenerAllPagesService);
    this.tipoModalidadeDao = injector.get<TipoModalidadeDaoService>(TipoModalidadeDaoService);
    this.documentoDao = injector.get<DocumentoDaoService>(DocumentoDaoService);

    this.form = this.fh.FormBuilder({
      data_inicio_vigencia: {default: new Date()},
      data_fim_vigencia: {default: new Date()},
      data_inicio: {default: ""},
      data_fim: {default: ""},
      status: {default: "SOLICITADO"},
      programa_id: {default: ""},
      usuario_id: {default: ""},
      unidade_id: {default: ""},
      entidade_id: {default: ""},
      tipo_modalidade_id: {default: ""},
      documentos: {default: []},
      usuarios: {default: ""},
      unidades: {default: ""},
    }, this.cdRef, this.validate);
  }

  public ngOnInit() {
    super.ngOnInit();
    const segment = (this.url ? this.url[this.url.length-1]?.path : "") || "";
    this.action = ["termos"].includes(segment) ? segment : this.action;
  }

  public get isTermos(): boolean {
    return this.action == "termos";
  }

  public validateAtividades = (control: AbstractControl, controlName: string) => {
    let result = null;
    if(controlName == 'atividade_id' && !control.value?.length) {
      result = "Obrigatório";
    }
    return result;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    // if(['usuario_id', 'unidade_id', 'programa_id', 'tipo_modalidade_id'].indexOf(controlName) >= 0 && !control.value?.length) {
    //   result = "Obrigatório";
    // } else if(['carga_horaria'].indexOf(controlName) >= 0 && !control.value) {
    //   result = "Valor não pode ser zero.";
    // } else if(['data_inicio_vigencia', 'data_fim_vigencia'].includes(controlName)) {
    //   if(!this.util.isDataValid(control.value)) {
    //     result = "Inválido";
    //   } else if(!this.programa?.searchObj) {
    //     result = "Selecionar programa";
    //   } else if(controlName == 'data_inicio_vigencia' && (control.value as Date).getTime() < (this.programa!.searchObj! as Programa).data_inicio_vigencia.getTime()) {
    //     result = "Menor que programa";
    //   } else if(controlName == 'data_fim_vigencia' && (control.value as Date).getTime() > (this.programa!.searchObj! as Programa).data_fim_vigencia.getTime()) {
    //     result = "Maior que programa";
    //   }
    // }

    return result;
  }

  // public formValidation = (form?: FormGroup) => {
  //     return undefined;
  // };

  public onProgramaSelect(selected: SelectItem) {
    this.form?.controls.data_inicio_vigencia.updateValueAndValidity();
    this.form?.controls.data_fim_vigencia.updateValueAndValidity();
  }

  public onTipoModalidadeSelect(selected: SelectItem) {
    const tipoModalidade = this.tipoModalidade?.searchObj as TipoModalidade;
    if(tipoModalidade) this.form?.controls.ganho_produtividade.setValue(tipoModalidade.ganho_produtividade);
  }

  public onUsuarioSelect(selected: SelectItem) {
    this.cdRef.detectChanges();
  }

  public onDataInicioChange(event: Event) {
    this.cdRef.detectChanges();
  }

  public onDataFimChange(event: Event) {
    this.cdRef.detectChanges();
  }

  public onUnidadeSelect(selected: SelectItem) {
    this.cdRef.detectChanges();
  }

  public onEntidadeSelect(selected: SelectItem) {
    this.cdRef.detectChanges();
  }

  public async loadData(entity: Adesao, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    await Promise.all ([
      this.unidade?.loadSearch(entity.unidade || entity.unidade_id),
      this.usuario?.loadSearch(entity.usuario || entity.usuario_id),
      this.programa?.loadSearch(entity.programa || entity.programa_id),
      this.tipoModalidade?.loadSearch(entity.tipo_modalidade || entity.tipo_modalidade_id)
    ]);
    form.patchValue(this.util.fillForm(formValue, entity));
    this.cdRef.detectChanges();
  }

  public async initializeData(form: FormGroup) {
    if(this.isTermos) {
      this.entity = (await this.dao!.getById(this.urlParams!.get("id")!, this.join))!;
    } else {
      this.entity = new Adesao();

console.log(this.auth.usuario?.perfil?.nivel);

      if (this.auth.usuario?.perfil?.nivel !== 0) {
        this.entity.entidade = this.auth.unidade!.entidade;
        this.entity.unidade = this.auth.unidade;
        this.entity.unidade_id = this.auth.unidade!.id;
        this.entity.entidade_id = this.auth.unidade!.entidade_id!;
      }
    }
    this.loadData(this.entity, this.form!);
  }


  public saveData(form: IIndexable): Promise<Adesao> {
    return new Promise<Adesao>((resolve, reject) => {
      let adesao = this.util.fill(new Adesao(), this.entity!);
      adesao = this.util.fillForm(adesao, this.form!.value);
      resolve(adesao);
    });
  }

  public titleEdit = (entity: Adesao): string => {
    return "Editando " ;//+ (entity?.nome || "");
  }

  public documentoDynamicButtons(row: any): ToolbarButton[] {
    let result: ToolbarButton[] = [];
    let documento: Documento = row as Documento;

    if(this.isTermos && this.needSign(documento)) {
      result.push({hint: "Assinar", icon: "bi bi-pen", onClick: this.signDocumento.bind(this) });
    }
    result.push({hint: "Preview", icon: "bi bi-zoom-in", onClick: ((documento: Documento) => { this.dialog.html({title: "Termo de ciência e responsabilidade", modalWidth: 1000}, documento.conteudo || ""); }).bind(this) });

    return result;
  }

  public needSign(documento: Documento): boolean {
    const tipoModalidade = this.entity!.tipo_modalidade!; //(this.tipoModalidade?.searchObj as TipoModalidade);
    const usuario = this.entity!.usuario!; // (this.usuario?.searchObj as Usuario);
    const unidade = this.entity!.unidade!; // (this.unidade?.searchObj as Unidade);
    const entidade = unidade?.entidade;
    const alredySigned = !!documento.assinaturas.find(x => x.usuario_id == this.auth.usuario!.id);
    let ids: string[] = [];
    if(tipoModalidade?.exige_assinatura && usuario) ids.push(usuario.id);
    if(tipoModalidade?.exige_assinatura_gestor_unidade && unidade) ids.push(unidade.gestor_id || "", unidade.gestor_substituto_id || "");
    if(tipoModalidade?.exige_assinatura_gestor_entidade && entidade) ids.push(entidade.gestor_id || "", entidade.gestor_substituto_id || "");
    return !alredySigned && tipoModalidade && ids.includes(this.auth.usuario!.id);
  }

  public signDocumento(documento: Documento) {
    this.dialog.confirm("Assinar", "Deseja realmente assinar o documento?").then(response => {
      if(response) {
        this.loading = true;
        this.documentoDao.assinar([documento.id]).then(response => {
          if(response?.length) {
            let documentos = (this.form!.controls.documentos.value || []) as Documento[];
            let found = documentos.find(x => x.id == documento?.id);
            if(found) found.assinaturas = response[0].assinaturas;
            this.form!.controls.documentos.setValue(documentos);
            this.gridDocumentos?.reset();
          }
        }).finally(() => this.loading = false);
      }
    });
  }


  public async addDocumento() {
    const documento = new Documento();
    documento.id = this.dao!.generateUuid();
    documento.plano_id = this.entity!.id;
    documento._status = "ADD";
    this.go.navigate({route: ['gestao', 'adesao', 'termo']}, {metadata: {documento: documento, adesao: this.entity}, modalClose: (modalResult) => {
        if(modalResult) {
          (async () => {
            let documentos = (this.form!.controls.documentos.value || []) as Documento[];
            if(this.isTermos) {
              this.clearErros();
              this.dialog.showSppinerOverlay("Salvando dados do formulário");
              try {
                modalResult = await this.documentoDao.save(Object.assign(new Documento(), {
                  especie: "TCR",
                  conteudo: modalResult?.termo,
                  metadados: {atividades_termo_adesao: modalResult.atividades_termo_adesao},
                  programa_adesao_id: this.entity!.id,
                  status: "GERADO"
                }), ["assinaturas.usuario:id,nome,apelido"]);
              } catch (error: any) {
                this.error(error.message ? error.message : error);
                modalResult = undefined;
              } finally {
                this.dialog.closeSppinerOverlay();
              }
            }
            if(modalResult) {
              documentos.push(modalResult);
              this.form!.controls.documentos.setValue(documentos);
              this.dialog.showSppinerOverlay("Recarregando dados do plano");
              await this.initializeData(this.form!);
              this.dialog.closeSppinerOverlay();
            }
            this.cdRef.detectChanges();
          })();
        }
      }});
    return undefined;
  }

  public isVigente(documento: Documento): boolean {
    return this.form!.controls.documento_id.value == documento.id;
  }

  public onProcessoClick(row: any) {
    this.allPages.openDocumentoSei(row.id_processo, row.id_documento);
  }

  public addUsuarioHandle(): LookupItem | undefined {
    /*let result = undefined;
    if (this.util.validateLookupItem(this.listaUsuarios, this.form?.controls.usuario_id.value)) {
      this.usuarioDao.getById(this.form?.controls.usuario_id.value).then(user =>{
        result =  {
          key: user?.id,
          value: user?.apelido,
        }
        this.form.controls.entrega_texto.setValue("");
      })
    }
    reurn result; */
    let result = undefined;
      const value = this.form!.controls.usuarios.value;
      const key = this.util.textHash(value);
      if(value?.length && this.util.validateLookupItem(this.form!.controls.usuario_id.value, key)) {
        result = {
          key: key,
          value: this.form!.controls.usuario_id.value
        };
        this.form!.controls.usuarios.setValue("");
      }
      return result;

  };

  public addUnidadeHandle(): LookupItem | undefined {
    let form = this.form!.value;
    let unidade = new Unidade({
      id: this.util.md5(),
      nome: form.nome, //Descrição do usuário
    });
    return {
      key: unidade.id,
      value: unidade.id,
    };
  }
}

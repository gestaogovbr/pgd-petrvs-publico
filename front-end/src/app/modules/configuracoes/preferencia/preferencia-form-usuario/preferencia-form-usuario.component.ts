import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { IIndexable } from 'src/app/models/base.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { Usuario, UsuarioConfig, UsuarioNotificacoes } from 'src/app/models/usuario.model';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { LookupItem } from 'src/app/services/lookup.service';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'preferencia-form-usuario',
  templateUrl: './preferencia-form-usuario.component.html',
  styleUrls: ['./preferencia-form-usuario.component.scss']
})
export class PreferenciaFormUsuarioComponent extends PageFormBase<Usuario, UsuarioDaoService> implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @Input() panel?: string;
  @Input() usuarioId?: string;
  
  public etiquetas: boolean = false;
  public form: FormGroup;
  public carregando: boolean = false;
  public toolbarButtons: ToolbarButton[] = [
    {
      label: "Resetar",
      icon: "bi bi-backspace",
      onClick: () => {
        this.loading = true;
        this.dao!.update(this.usuarioId!, {config: new UsuarioConfig()}).then(usuario => {
          this.initializeData(this.form);
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  ];

  constructor(public injector: Injector) {
    super(injector, Usuario, UsuarioDaoService);
    this.form = this.fh.FormBuilder({
      etiquetas: {default: []},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      ocutar_menu_sei: {default: true},
      ocutar_container_petrvs: {default: false},
      notifica_demanda_distribuicao: {default: true},
      notifica_demanda_conclusao: {default: true},
      notifica_demanda_avaliacao: {default: true},
      notifica_demanda_modificacao: {default: true},
      notifica_demanda_comentario: {default: true},
      enviar_email: {default: true},
      enviar_whatsapp: {default: true}
    }, this.cdRef, this.validate);
  }

  public get isPanel(): boolean {
    return this.panel != undefined;
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if(this.urlParams!.get("id")) {
      this.usuarioId = this.urlParams!.get("id")!;
    }
    this.etiquetas = !!this.queryParams.etiquetas;
  }

  public async loadData(entity: Usuario, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    formValue = this.util.fillForm(formValue, entity.config || {});
    formValue = this.util.fillForm(formValue, entity.notificacoes || {});
    form.patchValue(formValue);
  }

  public async initializeData(form: FormGroup) {
    this.carregando = true;
    try {
      this.entity = (await this.dao!.getById(this.usuarioId!))!;
      await this.loadData(this.entity, form);
    } finally {
      this.carregando = false;
    }
  }

  public saveData(form: IIndexable): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      /*let config = this.util.fill(new UsuarioConfig(), this.entity!.config || {});
      config = this.util.fillForm(config, this.form!.value);
      this.usuario!.config = Object.assign(this.usuario!.config, value);
      this.usuarioDaoService.updateJson(this.usuario!.id, 'config', value);*/
      //this.dao!.update(this.usuarioId!, {config: config})
      let config = this.util.fill(new UsuarioConfig(), this.form!.value);
      let notificacoes = this.util.fill(new UsuarioNotificacoes(), this.form!.value);
      Promise.all([
        this.auth.updateUsuarioConfig(this.usuarioId!, config),
        this.auth.updateUsuarioNotificacoes(this.usuarioId!, notificacoes)
      ]).then(results => {
        if(this.usuarioId == this.auth.usuario!.id) {
          this.auth.authSession().then(result => resolve(!this.isPanel)).catch(reject);
        } else {
          resolve(!this.isPanel);
        }
      }).catch(reject);
    });
  }

  public addItemHandleEtiquetas(): LookupItem | undefined {
    let result = undefined;
    const value = this.form.controls.etiqueta_texto.value;
    const key = this.util.textHash(value);
    if(value?.length && this.util.validateLookupItem(this.form.controls.etiquetas.value, key)) {
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

  public titleEdit = (entity: Usuario): string => {
    return "Editando ";// + (entity?.unidade_id || "");
  }
}

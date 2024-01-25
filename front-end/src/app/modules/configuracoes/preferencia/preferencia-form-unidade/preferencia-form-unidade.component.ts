import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { IIndexable } from 'src/app/models/base.model';
import { Unidade } from 'src/app/models/unidade.model';
import { UsuarioConfig } from 'src/app/models/usuario.model';
import { PageFormBase } from 'src/app/modules/base/page-form-base';
import { LookupItem } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-preferencia-form-unidade',
  templateUrl: './preferencia-form-unidade.component.html',
  styleUrls: ['./preferencia-form-unidade.component.scss']
})
export class PreferenciaFormUnidadeComponent extends PageFormBase<Unidade, UnidadeDaoService> implements OnInit{
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
    super(injector, Unidade, UnidadeDaoService);
    this.form = this.fh.FormBuilder({
      etiquetas: {default: []},
      etiqueta_texto: {default: ""},
      etiqueta_icone: {default: null},
      etiqueta_cor: {default: null},
      theme: {default: null},
      ocultar_menu_sei: {default: true},
      ocultar_container_petrvs: {default: false},
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

  public async loadData(entity: Unidade, form: FormGroup) {
    let formValue = Object.assign({}, form.value);
    //formValue = this.util.fillForm(formValue, entity.config || {});
    //formValue = this.util.fillForm(formValue, entity.notificacoes || {});
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
      let config = this.util.fill(new UsuarioConfig(), this.form!.value);
      Promise.all([
        this.auth.updateUsuarioConfig(this.usuarioId!, config),
        this.auth.updateUsuarioNotificacoes(this.usuarioId!, this.entity!.notificacoes)
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
}

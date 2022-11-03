import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { PageBase } from 'src/app/modules/base/page-base';
import { PreferenciaFormPetrvsComponent } from '../preferencia-form-petrvs/preferencia-form-petrvs.component';
import { PreferenciaFormUsuarioComponent } from '../preferencia-form-usuario/preferencia-form-usuario.component';

@Component({
  selector: 'app-preferencia-form',
  templateUrl: './preferencia-form.component.html',
  styleUrls: ['./preferencia-form.component.scss']
})
export class PreferenciaFormComponent extends PageBase implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;
  @ViewChild(PreferenciaFormPetrvsComponent, { static: false }) public petrvs?: PreferenciaFormPetrvsComponent;
  @ViewChild(PreferenciaFormUsuarioComponent, { static: false }) public usuario?: PreferenciaFormUsuarioComponent;

  public form: FormGroup;
  public mensagemCarregando = "Carregando dados do formulário...";
  public mensagemSalvando = "Salvando dados do formulário...";

  /*private _submitting: boolean = false;
  public set submitting(value: boolean) {
    if(!value) {
      this.dialog.closeSppinerOverlay();
    } else if(!this._submitting) {
      this.dialog.showSppinerOverlay("Salvando dados do formulário");
    }
    this._submitting = value;
  }
  public get submitting(): boolean {
    return this._submitting;
  } 
  private _loading: boolean = false;
  public set loading(value: boolean) {
    if(!value) {
      this.dialog.closeSppinerOverlay();
    } else if(!this._loading) {
      this.dialog.showSppinerOverlay("Carregando dados do formulário");
    }
    this._loading = value;
  }
  public get loading(): boolean {
    return this._loading;
  }*/
  

  constructor(public injector: Injector) {
    super(injector);
    this.form = this.fh.FormBuilder({});
  }

  public get forceInvalid(): boolean {
    return !!this.petrvs?.form?.invalid || !!this.usuario?.form?.invalid;
  }

  public async onSaveData() {
    if(!this.forceInvalid) {
      this.submitting = true;
      try {
        await Promise.all([
          this.petrvs?.onSaveData(),
          this.usuario?.onSaveData()
        ]);
        this.dialog.alert("Atenção", "Algumas modificações só surtirão efeito após atualizar a página.\nPor motivos de segurança esse procedimento, de atualizar a pagina, deverá ser executado pelo usuário.");
        this.go.back();
      } catch (error: any) {
        this.editableForm!.error = error.message ? error.message : error;
      } finally {
        this.submitting = false;
      }
    } else {
      if(!this.petrvs?.form?.invalid) this.editableForm!.error = "Forme Petrvs com erro";
      if(!this.usuario?.form?.invalid) this.editableForm!.error = "Forme do usuário com erro";
    }
  }

  public onCancel() {
    this.close();
  }
}

import { OnInit, Injector, Injectable, Type } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { DaoBaseService, QueryOrderBy } from 'src/app/dao/dao-base.service';
import { Base, IIndexable } from 'src/app/models/base.model';
import { PageBase } from './page-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { NavigateResult } from 'src/app/services/navigate.service';
import { GroupBy } from 'src/app/components/grid/grid.component';

//@Component({ template: '' })
@Injectable()
export abstract class PageFrameBase extends PageBase implements OnInit {
  public editableForm?: EditableFormComponent;

  public form?: FormGroup;
  public action: string = "";
  public formValidation?: (form?: FormGroup) => string | undefined | null;
  public dao?: DaoBaseService<Base>;
  public entity_id?: string; /* Se estiver preenchido, então veio por uma rota e é uma janela autocontida, com salvar e cancelar */
  /* Dever ser sobrescrito utilizando o @Input() */
  public set control(value: AbstractControl | undefined) {
    if (this._control != value) {
      this._control = value;
    }
  }
  public get control(): AbstractControl | undefined {
    return this._control;
  }
  public set entity(value: any) {
    if (this._entity != value) {
      this._entity = value;
      this.fakeControl.setValue(this.entityToControl(value));
      if(this.viewInit) this.loadData(value, this.form!);
    }
  }
  public get entity(): any {
    return this._entity;
  }
  public set noPersist(value: string | undefined) {
    if(this._noPersist != value) this._noPersist = value;
  }
  public get noPersist(): string | undefined {
    return this._noPersist;
  }

  protected _entity: any = undefined;
  protected _noPersist?: string = undefined;
  protected _control: AbstractControl | undefined = undefined;
  protected fakeControl: FormControl = new FormControl();

  /* Configurações */
  public join: string[] = [];
  public orderBy?: QueryOrderBy[];
  public groupBy?: GroupBy[];
  public entityToControl = (value: any) => value;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.urlParams?.has("id")) {
      this.entity_id = this.urlParams!.get("id") as string;
      if (this.isNoPersist) this.entity = this.metadata?.entity;
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.onInitializeData();
    this.cdRef.detectChanges();
  }

  public get isNew(): boolean {
    return this.action == "new";
  }

  public get isNoPersist(): boolean {
    return this._noPersist != undefined || this.entity_id == "NOPERSIST";
  }

  public get gridControl(): AbstractControl {
    return this._control || this.fakeControl;
  }

  public get formDisabled(): boolean {
    return this.action == "consult";
  }

  public loadData(entity: IIndexable, form?: FormGroup): Promise<void> | void {
    return;
  }

  public initializeData(form?: FormGroup): Promise<void> | void {
    return;
  }

  public async saveData(form?: IIndexable): Promise<IIndexable | NavigateResult | boolean | undefined | null> {
    return true;
  }

  private onInitializeData() {
    if (this.entity_id?.length && !this.isNoPersist) { /* entity possui ID e o componente é persistente (Janela autocontida) */
      (async () => {
        this.loading = true;
        try {
          if (this.entity_id == "new" || this.isNew) {
            await this.initializeData(this.form);
          } else {
            this.entity = await this.dao?.getById(this.entity_id!, this.join);
            await this.loadData(this.entity, this.form!);
          }
        } catch (erro) {
          this.error("Erro ao carregar dados: " + erro);
        } finally {
          this.loading = false;
        }
      })();
    }
  }

  public async onSaveData() {
    this.submitting = true;
    try {
      //
      let entity = await this.saveData(this.form!.value);
      if (entity) {
        const modalResult = this.isNoPersist ? this.entity :
          typeof entity == "boolean" ? entity :
            entity instanceof NavigateResult ? entity.modalResult :
              await this.dao?.update(this.entity!.id, entity, this.join);
        if (this.modalRoute?.queryParams?.idroute?.length) this.go.setModalResult(this.modalRoute?.queryParams?.idroute, modalResult);
        this.close();
      }
    } catch (erro) {
      this.error("Erro ao carregar dados: " + erro);
    } finally {
      this.submitting = false;
    }
  }

  public onCancel() {
    this.close();
  }

  public getControlByName(controlName: string): FormControl {
    return this.form!.controls[controlName] as FormControl;
  }

  public error = (error: string) => {
    if (this.editableForm) {
      this.editableForm.error = error;
    } else {
      this.dialog.topAlert(error);
    }
  }

  public clearErros = () => {
    if (this.editableForm) this.editableForm.error = "";
  }
}

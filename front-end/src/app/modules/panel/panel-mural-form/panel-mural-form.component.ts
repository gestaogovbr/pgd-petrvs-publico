import { Component, Injector, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { EditableFormComponent } from "src/app/components/editable-form/editable-form.component";
import { IIndexable } from "src/app/models/base.model";
import { MuralAviso } from "src/app/models/mural-aviso.model";
import { MuralAvisoDaoService } from "src/app/dao/mural-aviso-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { PageFormBase } from "src/app/modules/base/page-form-base";
import { LookupItem } from "src/app/services/lookup.service";
import { AuthPanelService } from "src/app/services/auth-panel.service";

@Component({
  selector: 'panel-mural-form',
  templateUrl: './panel-mural-form.component.html',
  standalone: false
})
export class PanelMuralFormComponent extends PageFormBase<MuralAviso, MuralAvisoDaoService> {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public static readonly MAX_CONTEUDO = 2500;
  public readonly maxConteudo = PanelMuralFormComponent.MAX_CONTEUDO;

  public tenantsDao: TenantDaoService;
  public authPanel: AuthPanelService;
  public tenantItems: LookupItem[] = [];
  public destinatarioItems: LookupItem[] = [
    { key: 'TODOS', value: 'Todos os tenants' },
    { key: 'TENANT_ESPECIFICO', value: 'Tenant específico' }
  ];
  public currentUser: any;
  public criadoPor: string = "";

  constructor(public injector: Injector) {
    super(injector, MuralAviso, MuralAvisoDaoService);
    this.tenantsDao = injector.get<TenantDaoService>(TenantDaoService);
    this.authPanel = injector.get<AuthPanelService>(AuthPanelService);

    this.form = this.fh.FormBuilder({
      titulo: { default: "" },
      conteudo: { default: "" },
      destinatario: { default: "TODOS" },
      tenant_id: { default: null },
      data_publicacao: { default: new Date() },
      data_expiracao: { default: null },
    }, this.cdRef, this.validate);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.currentUser = await this.authPanel.detailUser();
    await this.loadTenants();

    if (this.currentUser?.nivel != 1) {
      this.form!.controls['destinatario'].setValue('TENANT_ESPECIFICO');
      this.form!.controls['destinatario'].disable();
    }

    this.form!.controls['destinatario'].valueChanges.subscribe(() => {
      this.form!.controls['tenant_id'].updateValueAndValidity();
    });
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;

    if (controlName === 'titulo' && !control.value?.trim()?.length) {
      result = "O título é obrigatório";
    }

    if (controlName === 'conteudo' && !control.value?.trim()?.length) {
      result = "O conteúdo é obrigatório";
    }

    if (controlName === 'conteudo' && control.value?.length > PanelMuralFormComponent.MAX_CONTEUDO) {
      result = `O conteúdo deve ter no máximo ${PanelMuralFormComponent.MAX_CONTEUDO.toLocaleString('pt-BR')} caracteres`;
    }

    if (controlName === 'data_publicacao' && !control.value) {
      result = "A data de publicação é obrigatória";
    }

    if (controlName === 'data_expiracao' && !control.value) {
      result = "A data de expiração é obrigatória";
    }

    if (controlName === 'tenant_id') {
      const destinatario = control.parent?.get('destinatario')?.value;
      if (destinatario === 'TENANT_ESPECIFICO' && !control.value) {
        result = "Selecione o tenant destinatário";
      }
    }

    return result;
  }

  public async loadData(entity: MuralAviso, form: FormGroup) {
    form.patchValue(this.util.fillForm(form.value, entity));
    this.criadoPor = entity.publicado_por?.nome || entity.publicado_por?.email || '';
  }

  public initializeData(form: FormGroup): void {
    this.entity = new MuralAviso();
    this.loadData(this.entity, form);
  }

  public saveData(form: IIndexable): Promise<MuralAviso> {
    return new Promise<MuralAviso>((resolve) => {
      const aviso = this.util.fill(new MuralAviso(), this.entity!);
      resolve(this.util.fillForm(aviso, this.form!.getRawValue()));
    });
  }

  public get isDestinatarioTenant(): boolean {
    return this.form?.controls['destinatario']?.value === 'TENANT_ESPECIFICO';
  }

  private async loadTenants(): Promise<void> {
    try {
      const tenants = await this.tenantsDao.query().asPromise();
      this.tenantItems = tenants.map((t: any) => ({ key: t.id, value: t.nome_entidade || t.id }));
    } catch (error) {
      console.error("Erro ao carregar tenants:", error);
    }
  }
}

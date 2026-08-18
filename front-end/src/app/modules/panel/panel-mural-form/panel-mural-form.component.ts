import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MuralAvisoApiClient } from "src/app/dao/mural-aviso-dao.service";
import { TenantDaoService } from "src/app/dao/tenant-dao.service";
import { AuthPanelService } from "src/app/services/auth-panel.service";
import { DialogService } from "src/app/services/dialog.service";

interface TenantOption {
  id: string;
  nome?: string;
}

@Component({
    selector: 'panel-mural-form',
    templateUrl: './panel-mural-form.component.html',
    standalone: false
})
export class PanelMuralFormComponent implements OnInit {
  public form: FormGroup;
  public tenants: TenantOption[] = [];
  public currentUser: any;
  public loading = false;
  public isEdicao = false;
  private avisoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: MuralAvisoApiClient,
    private authPanel: AuthPanelService,
    private tenantsDao: TenantDaoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: DialogService
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      conteudo: ['', Validators.required],
      destinatario: ['TODOS', Validators.required],
      tenant_id: [null],
    });
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.authPanel.detailUser();
    this.carregarTenants();

    this.avisoId = this.route.snapshot.params['id'] || null;
    if (this.avisoId) {
      this.isEdicao = true;
      this.carregarAviso(this.avisoId);
    }

    // Configuradores só podem escolher TENANT_ESPECIFICO
    if (this.currentUser.nivel != 1) {
      this.form.controls['destinatario'].setValue('TENANT_ESPECIFICO');
      this.form.controls['destinatario'].disable();
    }
  }

  carregarTenants(): void {
    this.tenantsDao.query().asPromise().then((tenants: any[]) => {
      const allTenants: TenantOption[] = tenants.map((t: any) => ({ id: t.id, nome: t.id }));
      if (this.currentUser.nivel != 1) {
        this.tenants = allTenants.filter(t => this.currentUser.tenants?.includes(t.id));
      } else {
        this.tenants = allTenants;
      }
    });
  }

  carregarAviso(id: string): void {
    this.loading = true;
    this.api.buscarPorId(id).subscribe({
      next: (aviso) => {
        this.form.patchValue({
          titulo: aviso.titulo,
          conteudo: aviso.conteudo,
          destinatario: aviso.destinatario,
          tenant_id: aviso.tenant_id,
        });
        this.loading = false;
      },
      error: () => {
        this.dialog.alert('Erro', 'Não foi possível carregar o aviso.');
        this.loading = false;
      }
    });
  }

  get isDestinatarioTenant(): boolean {
    return this.form.controls['destinatario'].value === 'TENANT_ESPECIFICO';
  }

  salvar(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.getRawValue(),
      tenant_id: this.form.controls['destinatario'].value === 'TODOS' ? null : this.form.controls['tenant_id'].value,
    };

    const request$ = this.isEdicao
      ? this.api.atualizar(this.avisoId!, payload)
      : this.api.criar(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/panel/mural']),
      error: (err) => this.dialog.alert('Erro', err?.error?.error || 'Erro ao salvar aviso.')
    });
  }

  cancelar(): void {
    this.router.navigate(['/panel/mural']);
  }
}

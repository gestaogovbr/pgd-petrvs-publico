import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MuralAvisoApiClient } from "src/app/dao/mural-aviso-dao.service";
import { MuralAviso } from "src/app/v2/domain/mural-aviso.types";
import { DialogService } from "src/app/services/dialog.service";
import { finalize } from "rxjs";

@Component({
    selector: 'panel-mural-list',
    templateUrl: './panel-mural-list.component.html',
    standalone: false
})
export class PanelMuralListComponent implements OnInit {
  public avisos: MuralAviso[] = [];
  public loading = false;

  constructor(
    private api: MuralAvisoApiClient,
    private router: Router,
    private dialog: DialogService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarAvisos();
  }

  carregarAvisos(): void {
    this.loading = true;
    this.api.listar().pipe(
      finalize(() => {
        this.loading = false;
        this.cdRef.detectChanges();
      })
    ).subscribe({
      next: (response: any) => {
        this.avisos = response?.data?.data || [];
        this.loading = false;
        this.cdRef.detectChanges();
      },
      error: () => {
        this.avisos = [];
        this.loading = false;
        this.cdRef.detectChanges();
      }
    });
  }

  novo(): void {
    this.router.navigate(['/panel/mural/new']);
  }

  editar(aviso: MuralAviso): void {
    this.router.navigate(['/panel/mural', aviso.id, 'edit']);
  }

  async excluir(aviso: MuralAviso): Promise<void> {
    const confirmado = await this.dialog.confirm('Excluir aviso', 'Deseja realmente excluir este aviso?');
    if (confirmado) {
      this.api.excluir(aviso.id).subscribe({
        next: () => this.carregarAvisos(),
        error: (err) => this.dialog.alert('Erro', err?.error?.error || 'Erro ao excluir aviso.')
      });
    }
  }

  getDestinatarioLabel(destinatario: string): string {
    return destinatario === 'TODOS' ? 'Todos os tenants' : 'Tenant específico';
  }

  formatarData(data: string | Date): string {
    return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}

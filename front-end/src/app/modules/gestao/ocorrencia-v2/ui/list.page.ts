import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { OcorrenciaApiClient } from '../infra/ocorrencia-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { Ocorrencia, TipoMotivoAfastamento } from '../domain/types';

export interface SelectOption { value: string; label: string; selected?: boolean; }

@Component({
  selector: 'app-ocorrencia-v2-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent, PaginationV2Component],
  templateUrl: './list.page.html',
})
export class OcorrenciaV2ListPage implements OnInit {
  private readonly api = inject(OcorrenciaApiClient);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly ocorrencias = signal<Ocorrencia[]>([]);
  readonly tipos = signal<TipoMotivoAfastamento[]>([]);
  readonly agentes = signal<{ id: string; nome: string }[]>([]);
  readonly carregando = signal(true);
  readonly page = signal(1);
  readonly lastPage = signal(1);
  readonly total = signal(0);

  readonly tiposOptions = computed<SelectOption[]>(() => [
    { value: '', label: 'Todos' },
    ...this.tipos().map(t => ({ value: t.id, label: t.nome })),
  ]);

  readonly agentesOptions = computed<SelectOption[]>(() => [
    { value: '', label: 'Todos' },
    ...this.agentes().map(a => ({ value: a.id, label: a.nome })),
  ]);

  readonly filtros = this.fb.nonNullable.group({
    usuario_id: [''],
    tipo_motivo_afastamento_id: [''],
    data_inicio: [''],
    data_fim: [''],
  });

  ngOnInit(): void {
    this.api.tipos().subscribe(t => this.tipos.set(t));
    this.api.agentes().subscribe(a => this.agentes.set(a));
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    const filtros = this.filtros.getRawValue();
    const params: Record<string, any> = {
      page: this.page(),
      size: 15,
    };

    if (filtros.usuario_id) params['usuario_id'] = filtros.usuario_id;
    if (filtros.tipo_motivo_afastamento_id) params['tipo_motivo_afastamento_id'] = filtros.tipo_motivo_afastamento_id;
    if (filtros.data_inicio) params['data_inicio'] = filtros.data_inicio;
    if (filtros.data_fim) params['data_fim'] = filtros.data_fim;

    this.api.listar(params).subscribe({
      next: (result: any) => {
        this.ocorrencias.set(result?.data ?? []);
        this.page.set(result?.current_page ?? 1);
        this.lastPage.set(result?.last_page ?? 1);
        this.total.set(result?.total ?? 0);
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false),
    });
  }

  aplicarFiltros(): void {
    this.page.set(1);
    this.carregar();
  }

  limparFiltros(): void {
    this.filtros.reset();
    this.page.set(1);
    this.carregar();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.carregar();
  }

  nova(): void {
    this.router.navigate(['/gestao/ocorrencia-v2/nova']);
  }

  editar(id: string): void {
    this.router.navigate(['/gestao/ocorrencia-v2/editar', id]);
  }

  excluir(ocorrencia: Ocorrencia): void {
    if (!confirm('Deseja excluir esta ocorrência?')) return;

    this.api.excluir(ocorrencia.id, ocorrencia.usuario_id).subscribe({
      next: () => this.carregar(),
    });
  }

  formatarData(data: string): string {
    return new Date(data.replace(' ', 'T')).toLocaleDateString('pt-BR');
  }
}

import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { OcorrenciaApiClient } from '../infra/ocorrencia-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { Ocorrencia, TipoMotivoAfastamento } from '../domain/types';

export interface SelectOption { value: string; label: string; selected?: boolean; }

@Component({
  selector: 'app-ocorrencia-v2-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
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

  readonly tiposOptions = computed<SelectOption[]>(() => [
    { value: '', label: 'Todos' },
    ...this.tipos().map(t => ({ value: t.id, label: t.nome })),
  ]);

  readonly agentesOptions = computed<SelectOption[]>(() => [
    { value: '', label: 'Todos' },
    ...this.agentes().map(a => ({ value: a.id, label: a.nome })),
  ]);

  readonly filtros = this.fb.nonNullable.group({
    agente: [''],
    tipo_motivo_afastamento_id: [''],
    data_inicio: [''],
    data_fim: [''],
  });

  private todasOcorrencias: Ocorrencia[] = [];

  ngOnInit(): void {
    this.api.tipos().subscribe(t => this.tipos.set(t));
    this.api.agentes().subscribe(a => this.agentes.set(a));
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.api.listar().subscribe({
      next: (data) => {
        this.todasOcorrencias = data;
        this.aplicarFiltros();
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false),
    });
  }

  aplicarFiltros(): void {
    const { agente, tipo_motivo_afastamento_id, data_inicio, data_fim } = this.filtros.getRawValue();
    let resultado = this.todasOcorrencias;

    if (agente) {
      resultado = resultado.filter(oc => oc.usuario_id === agente);
    }
    if (tipo_motivo_afastamento_id) {
      resultado = resultado.filter(oc => oc.tipo_motivo_afastamento_id === tipo_motivo_afastamento_id);
    }
    if (data_inicio) {
      resultado = resultado.filter(oc => oc.data_inicio >= data_inicio);
    }
    if (data_fim) {
      resultado = resultado.filter(oc => oc.data_fim <= data_fim);
    }

    this.ocorrencias.set(resultado);
  }

  limparFiltros(): void {
    this.filtros.reset();
    this.ocorrencias.set(this.todasOcorrencias);
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

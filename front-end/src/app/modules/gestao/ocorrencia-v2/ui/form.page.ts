import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { OcorrenciaApiClient, AgenteOption } from '../infra/ocorrencia-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { TipoMotivoAfastamento } from '../domain/types';
import { MessageService } from 'src/app/v2/services/message.service';
import { forkJoin, Observable } from 'rxjs';
import { AgentePublicoSearchFn, AgentePublicoSelectComponent } from './components/agente-publico-select.component';
import type { Page } from 'src/app/v2/domain/pagination';

@Component({
  selector: 'app-ocorrencia-v2-form-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent, AgentePublicoSelectComponent],
  templateUrl: './form.page.html',
})
export class OcorrenciaV2FormPage implements OnInit {
  private readonly api = inject(OcorrenciaApiClient);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);

  readonly tipos = signal<TipoMotivoAfastamento[]>([]);
  readonly agenteSelecionado = signal<AgenteOption | null>(null);
  /** Indica se há mais de um agente disponível (exibe o seletor). */
  readonly permiteSelecionarAgente = signal(false);
  readonly salvando = signal(false);
  readonly carregando = signal(false);

  readonly tiposOptions = computed(() => this.tipos().map(t => ({ value: t.id, label: t.nome })));

  readonly agentesSearchFn: AgentePublicoSearchFn = (termo, page, size): Observable<Page<AgenteOption>> =>
    this.api.agentes(termo, page, size);

  readonly fg = this.fb.nonNullable.group({
    usuario_id: ['', Validators.required],
    tipo_motivo_afastamento_id: ['', Validators.required],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    horas: [''],
    observacoes: [''],
  });

  get tipoSelecionadoUsaHoras(): boolean {
    const tipoId = this.fg.controls.tipo_motivo_afastamento_id.value;
    const tipo = this.tipos().find(t => t.id === tipoId);
    return (tipo?.horas ?? 0) > 0;
  }

  ngOnInit(): void {
    this.carregando.set(true);

    forkJoin({
      tipos: this.api.tipos(),
      // size 1: só precisamos do `total` para saber se há mais de um agente disponível
      agentes: this.api.agentes(null, 1, 1),
    }).subscribe({
      next: ({ tipos, agentes }) => {
        this.tipos.set(tipos);
        this.permiteSelecionarAgente.set((agentes.total ?? agentes.items.length) > 1);

        setTimeout(() => {
          this.fg.controls.usuario_id.setValue(this.auth.usuario?.id ?? '');
        });

        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
        this.message.error('Erro ao carregar dados do formulário.');
      },
    });
  }

  selecionarAgente(agente: AgenteOption): void {
    this.agenteSelecionado.set(agente);
    this.fg.controls.usuario_id.setValue(agente.id);
  }

  readonly modal = signal<{ titulo: string; mensagem: string } | null>(null);
  private pendingPayload: any = null;

  salvar(): void {
    if (this.fg.invalid) return;

    const payload = {
      ...this.fg.getRawValue(),
      horas: this.fg.controls.horas.value ? Number(this.fg.controls.horas.value) : null,
    };

    this.api.impactoConsolidacoes({
      usuario_id: payload.usuario_id,
      data_inicio: payload.data_inicio,
      data_fim: payload.data_fim,
      operacao: 'criar',
      tipo_motivo_afastamento_id: payload.tipo_motivo_afastamento_id,
    }).subscribe({
      next: (impacto) => {
        if (impacto.gera_dispensa) {
          this.pendingPayload = payload;
          this.modal.set({
            titulo: 'Confirmar Inclusão',
            mensagem: 'Esta ocorrência poderá resultar na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos de plano de trabalho. <u><strong>Esta ocorrência não poderá ser editada, somente excluída</strong></u>. Deseja confirmar?'
          });
          return;
        }

        this.pendingPayload = payload;
        this.modal.set({
          titulo: 'Confirmar Inclusão',
          mensagem: 'Deseja cadastrar esta ocorrência?',
        });
      },
      error: (e) => {
        this.message.error(e.error?.error || 'Erro ao verificar impacto. Prosseguindo com confirmação padrão.');
        this.pendingPayload = payload;
        this.modal.set({
          titulo: 'Confirmar Inclusão',
          mensagem: 'Deseja cadastrar esta ocorrência?',
        });
      },
    });
  }

  confirmarModal(): void {
    this.modal.set(null);
    if (this.pendingPayload) {
      this.executarSalvamento(this.pendingPayload);
      this.pendingPayload = null;
    }
  }

  fecharModal(): void {
    this.modal.set(null);
    this.pendingPayload = null;
  }

  private executarSalvamento(payload: any): void {
    this.salvando.set(true);

    this.api.criar(payload).subscribe({
      next: () => this.router.navigate(['/gestao/ocorrencia-v2']),
      error: (e) => {
        this.salvando.set(false);
        this.message.error(e.error?.error || 'Erro ao salvar ocorrência.');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/gestao/ocorrencia-v2']);
  }
}

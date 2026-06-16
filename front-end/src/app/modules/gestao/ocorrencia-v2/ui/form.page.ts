import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { OcorrenciaApiClient } from '../infra/ocorrencia-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { ImpactoConsolidacoes, TipoMotivoAfastamento } from '../domain/types';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-ocorrencia-v2-form-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './form.page.html',
})
export class OcorrenciaV2FormPage implements OnInit {
  private readonly api = inject(OcorrenciaApiClient);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly tipos = signal<TipoMotivoAfastamento[]>([]);
  readonly agentes = signal<{ id: string; nome: string }[]>([]);
  readonly salvando = signal(false);
  readonly carregando = signal(false);

  readonly tiposOptions = computed(() => this.tipos().map(t => ({ value: t.id, label: t.nome })));
  readonly agentesOptions = computed(() => this.agentes().map(a => ({ value: a.id, label: a.nome })));

  ocorrenciaId: string | null = null;

  readonly fg = this.fb.nonNullable.group({
    usuario_id: ['', Validators.required],
    tipo_motivo_afastamento_id: ['', Validators.required],
    data_inicio: ['', Validators.required],
    data_fim: ['', Validators.required],
    horas: [''],
    observacoes: ['', Validators.required],
  });

  get modoEdicao(): boolean {
    return this.ocorrenciaId !== null;
  }

  get tipoSelecionadoUsaHoras(): boolean {
    const tipoId = this.fg.controls.tipo_motivo_afastamento_id.value;
    const tipo = this.tipos().find(t => t.id === tipoId);
    return (tipo?.horas ?? 0) > 0;
  }

  ngOnInit(): void {
    this.ocorrenciaId = this.route.snapshot.paramMap.get('id');
    this.carregando.set(true);

    forkJoin({
      tipos: this.api.tipos(),
      agentes: this.api.agentes(),
      ocorrencias: this.modoEdicao ? this.api.listar({ size: 999 }) : of([]),
    }).subscribe({
      next: ({ tipos, agentes, ocorrencias }) => {
        this.tipos.set(tipos);
        this.agentes.set(agentes);

        setTimeout(() => {
          if (this.modoEdicao) {
            const oc = (ocorrencias as any)?.data?.find((o: any) => o.id === this.ocorrenciaId)
            ?? (ocorrencias as any[])?.find?.((o: any) => o.id === this.ocorrenciaId);
            if (oc) {
              this.fg.patchValue({
                usuario_id: oc.usuario_id,
                tipo_motivo_afastamento_id: oc.tipo_motivo_afastamento_id,
                data_inicio: oc.data_inicio?.substring(0, 10),
                data_fim: oc.data_fim?.substring(0, 10),
                horas: oc.horas?.toString() ?? '',
                observacoes: oc.observacoes ?? '',
              });
            }
          } else {
            this.fg.controls.usuario_id.setValue(this.auth.usuario?.id ?? '');
          }
        });

        this.carregando.set(false);
      },
      error: () => this.carregando.set(false),
    });
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
      operacao: this.modoEdicao ? 'editar' : 'criar',
      ocorrencia_id: this.ocorrenciaId ?? undefined,
    }).subscribe({
      next: (impacto) => {
        if (impacto.operacao_bloqueada) {
          this.modal.set({
            titulo: 'Operação bloqueada',
            mensagem: this.getMensagemBloqueio(impacto),
          });
          return;
        }

        if (impacto.gera_dispensa || impacto.remove_dispensa) {
          this.pendingPayload = payload;
          this.modal.set({
            titulo: 'Confirmação',
            mensagem: this.getMensagemConfirmacao(impacto),
          });
          return;
        }

        this.pendingPayload = payload;
        this.modal.set({
          titulo: 'Confirmar',
          mensagem: this.modoEdicao ? 'Deseja salvar as alterações?' : 'Deseja cadastrar esta ocorrência?',
        });
      },
      error: () => {
        this.pendingPayload = payload;
        this.modal.set({
          titulo: 'Confirmar',
          mensagem: this.modoEdicao ? 'Deseja salvar as alterações?' : 'Deseja cadastrar esta ocorrência?',
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

    const op$ = this.modoEdicao
      ? this.api.atualizar(this.ocorrenciaId!, payload)
      : this.api.criar(payload);

    op$.subscribe({
      next: () => this.router.navigate(['/gestao/ocorrencia-v2']),
      error: () => this.salvando.set(false),
    });
  }

  private getMensagemConfirmacao(impacto: ImpactoConsolidacoes): string {
    if (impacto.gera_dispensa && impacto.pt_concluido) {
      return 'A inclusão ou alteração desta ocorrência resultará na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados passarão para o status "Dispensado", e as avaliações já realizadas serão canceladas. Em decorrência dessa alteração, o Plano de Trabalho poderá retornar ao status "Em execução". Deseja confirmar?';
    }
    if (impacto.gera_dispensa) {
      return 'Esta ocorrência resultará na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos, em razão da cobertura integral do período. Deseja confirmar?';
    }
    if (impacto.remove_dispensa && impacto.pt_concluido) {
      return 'A alteração desta ocorrência removerá a dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados retornarão ao status anterior e o Plano de Trabalho retornará ao status "Em execução". Deseja confirmar?';
    }
    return 'A alteração desta ocorrência removerá a dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados retornarão ao status anterior. Deseja confirmar?';
  }

  private getMensagemBloqueio(impacto: ImpactoConsolidacoes): string {
    if (impacto.gera_dispensa) {
      return 'Não é possível incluir ou alterar esta ocorrência, pois ela resultaria na dispensa de registro de execução e avaliação de período avaliativo cuja avaliação não pode mais ser cancelada.';
    }
    return 'Esta ocorrência não pode ser alterada ou excluída, pois impacta período avaliativo dispensado pertencente a Plano de Trabalho concluído com prazo recursal encerrado.';
  }

  cancelar(): void {
    this.router.navigate(['/gestao/ocorrencia-v2']);
  }
}

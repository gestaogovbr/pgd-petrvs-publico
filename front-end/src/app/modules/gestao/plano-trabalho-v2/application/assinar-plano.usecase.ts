import { inject, Injectable, signal, computed } from '@angular/core';
import { finalize } from 'rxjs';
import { DocumentoApiClient } from '../infra/documento-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/v2/services/unidade.service';
import { MessageService } from 'src/app/v2/services/message.service';
import { PlanoTrabalho } from '../domain/types';
import { mensagemConfirmacaoAssinaturaPlano, assinaturaConcluiCiclo } from './plano-trabalho-assinatura.messages';

@Injectable()
export class AssinarPlanoUseCase {
  private readonly documentoApi = inject(DocumentoApiClient);
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);
  private readonly message = inject(MessageService);

  readonly documento = signal<any | null>(null);
  readonly jaAssinou = signal(false);
  readonly confirmandoAssinatura = signal(false);
  readonly confirmandoCancelamento = signal(false);
  readonly confirmandoGeracaoTCR = signal(false);
  readonly salvando = signal(false);
  readonly justificativaCHD = signal('');

  readonly plano = signal<PlanoTrabalho | null>(null);
  private entregas = signal<any[]>([]);
  private onDocumentoCriado: (() => void) | null = null;

  readonly totalCHD = computed(() =>
    this.entregas().reduce((sum: number, e: any) => sum + (Number(e.forca_trabalho) || 0), 0)
  );

  readonly podeCancelarAssinatura = computed(() =>
    this.jaAssinou() && this.plano()?.status === 'AGUARDANDO_ASSINATURA'
  );

  get mensagemConfirmacao(): string {
    const p = this.plano();
    return mensagemConfirmacaoAssinaturaPlano(
      this.documento()?.assinaturas ?? [],
      this.auth.usuario?.id ?? '',
      {
        plano: p,
        usuarioLogadoEhGestorUnidadeSuperiorAoPlano: this.unidadeService.isGestorUnidade(
          p?.unidade?.unidade_pai_id ?? null,
        ),
      },
    );
  }

  init(plano: PlanoTrabalho, entregas?: any[]) {
    this.plano.set(plano);
    this.entregas.set(entregas ?? plano.entregas ?? []);
    if (plano.documento_id) {
      this.documentoApi.getDocumento(plano.id).subscribe(doc => {
        this.documento.set(doc);
        const assinaturas: any[] = doc?.assinaturas ?? [];
        this.jaAssinou.set(assinaturas.some(a => a.usuario_id === (this.auth.usuario?.id ?? '')));
      });
    }
  }

  abrirConfirmacaoAssinatura() {
    if (this.salvando()) return;
    this.justificativaCHD.set('');
    this.confirmandoAssinatura.set(true);
  }

  confirmarAssinatura() {
    const id = this.plano()?.id;
    if (!id) return;
    this.confirmandoAssinatura.set(false);
    this.salvando.set(true);
    this.documentoApi.assinarDocumento(id).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: (assinatura) => {
        assinatura.usuario_nome = this.auth.usuario?.nome;
        this.documento.update(doc => doc
          ? { ...doc, assinaturas: [...(doc.assinaturas ?? []), assinatura] }
          : doc
        );
        this.jaAssinou.set(true);
        const p = this.plano();
        const novoStatus = assinaturaConcluiCiclo(
          this.documento()?.assinaturas ?? [],
          this.auth.usuario?.id ?? '',
          {
            plano: p,
            usuarioLogadoEhGestorUnidadeSuperiorAoPlano: this.unidadeService.isGestorUnidade(p?.unidade?.unidade_pai_id ?? null),
          }
        ) ? 'ATIVO' : 'AGUARDANDO_ASSINATURA';
        this.plano.update(pl => pl ? { ...pl, status: novoStatus } as any : pl);
      },
      error: (err: any) => this.message.error(err?.error?.error || err?.error?.message || 'Erro ao assinar o documento.')
    });
  }

  abrirConfirmacaoCancelamento() {
    if (this.salvando()) return;
    this.confirmandoCancelamento.set(true);
  }

  confirmarCancelamentoAssinatura() {
    const id = this.plano()?.id;
    if (!id) return;
    this.confirmandoCancelamento.set(false);
    this.salvando.set(true);
    this.documentoApi.cancelarAssinaturaDocumento(id).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: () => {
        this.documento.update(doc => doc
          ? { ...doc, assinaturas: (doc.assinaturas ?? []).filter((a: any) => a.usuario_id !== (this.auth.usuario?.id ?? '')) }
          : doc
        );
        this.jaAssinou.set(false);
        const remaining = (this.documento()?.assinaturas ?? []).length;
        this.plano.update(p => p ? { ...p, status: remaining > 0 ? 'AGUARDANDO_ASSINATURA' : 'INCLUIDO' } as any : p);
      },
      error: (err: any) => this.message.error(err?.error?.error || err?.error?.message || 'Erro ao cancelar a assinatura.')
    });
  }

  /** Gera o TCR. Se CHD ≠ 100%, pede justificativa primeiro via modal. */
  gerarDocumento(onSuccess: () => void) {
    const id = this.plano()?.id;
    if (!id || this.salvando()) return;
    this.onDocumentoCriado = onSuccess;
    if (this.totalCHD() !== 100) {
      this.justificativaCHD.set('');
      this.confirmandoGeracaoTCR.set(true);
    } else {
      this.executarGeracaoDocumento();
    }
  }

  confirmarGeracaoTCR() {
    this.confirmandoGeracaoTCR.set(false);
    this.executarGeracaoDocumento();
  }

  private executarGeracaoDocumento() {
    const id = this.plano()?.id;
    if (!id) return;
    this.salvando.set(true);
    const justificativa = this.totalCHD() !== 100 ? this.justificativaCHD().trim() : undefined;
    this.documentoApi.createDocumento(id, justificativa).pipe(
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: (doc) => {
        this.documento.set(doc);
        this.onDocumentoCriado?.();
      },
      error: (err: any) => this.message.error(err?.error?.error || err?.error?.message || 'Erro ao gerar o documento TCR.')
    });
  }
}

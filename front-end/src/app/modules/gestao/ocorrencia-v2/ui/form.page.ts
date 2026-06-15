import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { OcorrenciaApiClient } from '../infra/ocorrencia-api.client';
import { AuthService } from 'src/app/services/auth.service';
import { TipoMotivoAfastamento } from '../domain/types';
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
      ocorrencias: this.modoEdicao ? this.api.listar() : of([]),
    }).subscribe({
      next: ({ tipos, agentes, ocorrencias }) => {
        this.tipos.set(tipos);
        this.agentes.set(agentes);

        setTimeout(() => {
          if (this.modoEdicao) {
            const oc = (ocorrencias as any[]).find((o: any) => o.id === this.ocorrenciaId);
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

  salvar(): void {
    if (this.fg.invalid) return;

    this.salvando.set(true);
    const payload = {
      ...this.fg.getRawValue(),
      horas: this.fg.controls.horas.value ? Number(this.fg.controls.horas.value) : null,
    };

    const op$ = this.modoEdicao
      ? this.api.atualizar(this.ocorrenciaId!, payload)
      : this.api.criar(payload);

    op$.subscribe({
      next: () => this.router.navigate(['/gestao/ocorrencia-v2']),
      error: () => this.salvando.set(false),
    });
  }

  cancelar(): void {
    this.router.navigate(['/gestao/ocorrencia-v2']);
  }
}

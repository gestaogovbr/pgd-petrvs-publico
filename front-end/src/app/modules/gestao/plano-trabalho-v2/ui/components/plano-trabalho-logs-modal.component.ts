import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationV2Component } from 'src/app/v2/components/pagination/pagination.component';
import { UsuarioService, UsuarioSearchItem } from 'src/app/v2/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';
import { PlanoApiClient } from '../../infra/plano-api.client';
import { PlanoTrabalho, PlanoTrabalhoAuditLog, PlanoTrabalhoLogModelOption } from '../../domain/types';
import { Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

type SelectOption = { value: string; label: string; selected?: boolean };

const EVENTO_OPCOES: SelectOption[] = [
  { value: '', label: 'Todos' },
  { value: 'created', label: 'CRIADO' },
  { value: 'updated', label: 'ALTERADO' },
  { value: 'deleted', label: 'EXCLUÍDO' },
];

@Component({
  selector: 'app-plano-trabalho-logs-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WebcomponentsAngularModule,
    SharedModule,
    PaginationV2Component,
  ],
  templateUrl: './plano-trabalho-logs-modal.component.html',
  styleUrl: './plano-trabalho-logs-modal.component.scss',
})
export class PlanoTrabalhoLogsModalComponent implements OnDestroy {
  readonly plano = input.required<PlanoTrabalho>();
  readonly modalClosed = output<void>();

  private readonly api = inject(PlanoApiClient);
  private readonly usuarioApi = inject(UsuarioService);
  private readonly util = inject(UtilService);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly consultaFinalizada = signal(false);
  readonly logs = signal<PlanoTrabalhoAuditLog[]>([]);
  readonly modelos = signal<PlanoTrabalhoLogModelOption[]>([]);
  readonly modeloSelectOptions = signal<SelectOption[]>([{ value: '', label: '(Todos)' }]);
  readonly page = signal(1);
  readonly lastPage = signal(1);
  readonly total = signal(0);
  readonly expandedIds = signal<Set<string>>(new Set());

  readonly usuarioSugestoes = signal<UsuarioSearchItem[]>([]);
  readonly usuarioSelecionado = signal<UsuarioSearchItem | null>(null);
  readonly usuarioBusca = signal('');

  readonly filters = this.fb.nonNullable.group({
    data_inicio: '',
    data_fim: '',
    event: '',
    search: '',
    modelo: '',
  });

  readonly acaoSelectOptions = EVENTO_OPCOES;
  readonly acaoSelectAberto = signal(false);
  readonly modeloSelectAberto = signal(false);

  private ultimoPlanoIdCarregado: string | null = null;
  private readonly usuarioBusca$ = new Subject<string>();
  private readonly subscriptions: Subscription[] = [];

  constructor() {
    effect(() => {
      const p = this.plano();
      if (p.id === this.ultimoPlanoIdCarregado) return;
      this.ultimoPlanoIdCarregado = p.id;
      this.abrirParaPlano(p);
    });

    this.subscriptions.push(
      this.usuarioBusca$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          const t = term.trim();
          if (t.length < 2) {
            return of<UsuarioSearchItem[]>([]);
          }
          return this.usuarioApi.searchByNomeMatricula(t);
        }),
      ).subscribe(items => this.usuarioSugestoes.set(items ?? [])),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.usuarioBusca$.complete();
  }

  bloquearPropagacao(event: Event): void {
    event.stopPropagation();
  }

  onAcaoSelectAberto(): void {
    this.modeloSelectAberto.set(false);
    this.acaoSelectAberto.set(true);
  }

  onAcaoSelectFechado(event: Event): void {
    event.stopPropagation();
    this.acaoSelectAberto.set(false);
  }

  onModeloSelectAberto(): void {
    this.acaoSelectAberto.set(false);
    this.modeloSelectAberto.set(true);
  }

  onModeloSelectFechado(event: Event): void {
    event.stopPropagation();
    this.modeloSelectAberto.set(false);
  }

  fechar(): void {
    this.modalClosed.emit();
  }

  onUsuarioBuscaInput(value: string): void {
    this.usuarioBusca.set(value);
    this.usuarioBusca$.next(value);
    if (!value.trim()) {
      this.usuarioSelecionado.set(null);
    }
  }

  selecionarUsuario(usuario: UsuarioSearchItem): void {
    this.usuarioSelecionado.set(usuario);
    this.usuarioBusca.set(usuario.nome);
    this.usuarioSugestoes.set([]);
  }

  limparUsuario(): void {
    this.usuarioSelecionado.set(null);
    this.usuarioBusca.set('');
    this.usuarioSugestoes.set([]);
  }

  filtrar(): void {
    this.page.set(1);
    this.carregar();
  }

  limparFiltros(): void {
    this.filters.reset({
      data_inicio: '',
      data_fim: '',
      event: '',
      search: '',
      modelo: '',
    });
    this.limparUsuario();
    this.page.set(1);
    this.carregar();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.carregar();
  }

  toggleExpandido(id: string): void {
    const atual = new Set(this.expandedIds());
    if (atual.has(id)) {
      atual.delete(id);
    } else {
      atual.add(id);
    }
    this.expandedIds.set(atual);
  }

  isExpandido(id: string): boolean {
    return this.expandedIds().has(id);
  }

  eventoCor(event: string): string {
    const tipo = event.toLowerCase();
    if (tipo === 'deleted') return '#dc3545';
    if (tipo === 'created') return '#198754';
    return '#b58900';
  }

  eventoLabel(event: string): string {
    const tipo = event.toLowerCase();
    if (tipo === 'created') return 'CRIADO';
    if (tipo === 'updated') return 'ALTERADO';
    if (tipo === 'deleted') return 'EXCLUÍDO';
    return event.toUpperCase();
  }

  formatDataHora(createdAt: string | null | undefined): string {
    if (!createdAt) return '';
    if (/^\d{2}\/\d{2}\/\d{4}/.test(createdAt)) {
      return createdAt;
    }
    return this.util.getDateTimeFormatted(createdAt, ' - ');
  }

  formatLogValues(values: Record<string, unknown> | null | undefined): Record<string, unknown> {
    if (!values || typeof values !== 'object' || Array.isArray(values)) {
      return {};
    }

    return this.formatLogValuesDeep({ ...values });
  }

  private formatLogValuesDeep(values: Record<string, unknown>): Record<string, unknown> {
    const formatted: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(values)) {
      if ((key === 'data_inicio' || key === 'data_fim') && this.isDateFieldValue(value)) {
        formatted[key] = this.util.getDateFormatted(value);
        continue;
      }

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        formatted[key] = this.formatLogValuesDeep(value as Record<string, unknown>);
        continue;
      }

      formatted[key] = value;
    }

    return formatted;
  }

  private isDateFieldValue(value: unknown): boolean {
    if (value == null || value === '') return false;
    if (typeof value === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
    return typeof value === 'string' || value instanceof Date;
  }

  private abrirParaPlano(plano: PlanoTrabalho): void {
    this.resetar();
    this.api.listLogModelos(plano.id).subscribe(modelos => {
      this.modelos.set(modelos);
      this.modeloSelectOptions.set([
        { value: '', label: '(Todos)' },
        ...modelos.map(m => ({ value: m.key, label: m.value })),
      ]);
    });
    this.carregar();
  }

  private resetar(): void {
    this.filters.reset({
      data_inicio: '',
      data_fim: '',
      event: '',
      search: '',
      modelo: '',
    });
    this.limparUsuario();
    this.logs.set([]);
    this.page.set(1);
    this.lastPage.set(1);
    this.total.set(0);
    this.consultaFinalizada.set(false);
    this.expandedIds.set(new Set());
    this.modeloSelectOptions.set([{ value: '', label: '(Todos)' }]);
    this.acaoSelectAberto.set(false);
    this.modeloSelectAberto.set(false);
  }

  private carregar(): void {
    const plano = this.plano();

    this.loading.set(true);
    this.consultaFinalizada.set(false);

    const raw = this.filters.getRawValue();
    const usuario = this.usuarioSelecionado();
    const buscaUsuario = this.usuarioBusca().trim();

    this.api.listLogs(plano.id, {
      page: this.page(),
      size: 20,
      filters: {
        ...(usuario?.id
          ? { usuario_id: usuario.id }
          : buscaUsuario.length >= 2
            ? { usuario_nome: buscaUsuario }
            : {}),
        ...(raw.data_inicio ? { data_inicio: raw.data_inicio } : {}),
        ...(raw.data_fim ? { data_fim: raw.data_fim } : {}),
        ...(raw.event ? { event: raw.event } : {}),
        ...(raw.search.trim() ? { search: raw.search.trim() } : {}),
        ...(raw.modelo ? { modelo: raw.modelo } : {}),
      },
    }).subscribe({
      next: result => {
        this.logs.set(result.items);
        this.total.set(result.total);
        this.lastPage.set(result.lastPage);
        this.page.set(result.page);
        this.loading.set(false);
        this.consultaFinalizada.set(true);
      },
      error: () => {
        this.logs.set([]);
        this.loading.set(false);
        this.consultaFinalizada.set(true);
      },
    });
  }
}

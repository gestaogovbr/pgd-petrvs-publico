import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeDaoService } from 'src/app/dao/unidade-dao.service';
import { PendenciasUsuarioComponent } from './components/pendencias-usuario.component';
import { PlanosVigentesComponent } from './components/planos-vigentes.component';
import { AcoesGerenciaisComponent } from './components/acoes-gerenciais.component';
import { ResumoEquipeComponent } from './components/resumo-equipe.component';
import { ContribuicoesComponent } from './components/contribuicoes.component';
import { EmFeriasComponent } from './components/em-ferias.component';
import { AniversariantesComponent } from './components/aniversariantes.component';

export interface SelectOption {
  value: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'home-v2-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    WebcomponentsAngularModule,
    BreadcrumbComponent,
    PendenciasUsuarioComponent,
    PlanosVigentesComponent,
    AcoesGerenciaisComponent,
    ResumoEquipeComponent,
    ContribuicoesComponent,
    EmFeriasComponent,
    AniversariantesComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.styles.scss'],
})
export class HomeV2Page implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly unidadeDao = inject(UnidadeDaoService);

  readonly unidadeOptions = signal<SelectOption[]>([]);
  readonly selectedUnidadeId = signal<string>('');
  readonly subordinadas = signal(false);
  readonly exibeToggleSubordinadas = computed(() => {
    return !this.auth.isUsuarioParticipante() && !this.auth.isUsuarioConsulta();
  });

  readonly saudacao = computed(() => {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
  });

  readonly nomeUsuario = computed(() => {
    const usuario = this.auth.usuario;
    const nome = usuario?.apelido || usuario?.nome_exibicao || usuario?.nome || '';
    return nome.split(' ')[0];
  });

  ngOnInit(): void {
    this.carregarUnidades();
  }

  onUnidadeChange(event: any): void {
    const value = event?.target?.value;
    if (!value) return;
    this.selectedUnidadeId.set(value);
  }

  onSubordinadasChange(value: boolean): void {
    this.subordinadas.set(value);
  }

  private carregarUnidades(): void {
    if (this.auth.isUsuarioParticipante()) {
      this.carregarUnidadesParticipante();
      return;
    }

    this.carregarUnidadesComSubordinadas();
  }

  /**
   * #2360 RN10/RN10.1: Participante — apenas unidades de lotação/vinculação;
   * unidade padrão é a de lotação.
   */
  private carregarUnidadesParticipante(): void {
    const areas = this.auth.usuario?.areas_trabalho ?? [];

    const unidades = areas
      .filter(a => a.unidade)
      .map(a => ({
        id: a.unidade_id,
        sigla: a.unidade!.sigla,
        nome: a.unidade!.nome,
        isLotado: a.atribuicoes?.some(attr => attr.atribuicao === 'LOTADO') ?? false,
      }));

    const unique = [...new Map(unidades.map(u => [u.id, u])).values()];

    const defaultId = (unique.find(u => u.isLotado) ?? unique[0])?.id ?? '';

    this.aplicarOpcoes(unique, defaultId);
  }

  /**
   * #2360 RN12/RN12.1: Demais perfis — unidades com atribuição ativa + todas as
   * subordinadas na cadeia hierárquica; unidade padrão é a mais alta na
   * hierarquia onde o usuário possua qualquer atribuição.
   */
  private async carregarUnidadesComSubordinadas(): Promise<void> {
    const areas = this.auth.usuario?.areas_trabalho ?? [];
    const unidadesComAtribuicao = areas
      .filter(a => a.unidade)
      .map(a => a.unidade!);

    if (unidadesComAtribuicao.length === 0) return;

    // #2360 RN12.1: unidade padrão = mais alta na hierarquia (menor profundidade de path)
    const defaultId = this.unidadeMaisAlta(unidadesComAtribuicao)?.id ?? '';

    const unidadesMap = new Map<string, { id: string; sigla: string; nome: string }>();
    for (const unidade of unidadesComAtribuicao) {
      unidadesMap.set(unidade.id, { id: unidade.id, sigla: unidade.sigla, nome: unidade.nome });

      const subordinadas = await this.unidadeDao.subordinadas(unidade.id);
      for (const sub of subordinadas) {
        unidadesMap.set(sub.id, { id: sub.id, sigla: sub.sigla, nome: sub.nome });
      }
    }

    this.aplicarOpcoes([...unidadesMap.values()], defaultId);
  }

  /**
   * Retorna a unidade mais alta na hierarquia (menor número de níveis no path).
   */
  private unidadeMaisAlta<T extends { path?: string }>(unidades: T[]): T | undefined {
    return [...unidades].sort((a, b) => this.profundidade(a.path) - this.profundidade(b.path))[0];
  }

  private profundidade(path?: string): number {
    if (!path) return Number.MAX_SAFE_INTEGER;
    return path.split('/').filter(Boolean).length;
  }

  private aplicarOpcoes(
    unidades: { id: string; sigla: string; nome: string }[],
    defaultId: string,
  ): void {
    this.unidadeOptions.set(
      unidades.map(u => ({ value: u.id, label: `${u.sigla} - ${u.nome}`, selected: u.id === defaultId }))
    );

    if (defaultId) {
      this.selectedUnidadeId.set(defaultId);
    }
  }
}

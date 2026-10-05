import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { HomeApiClient, ResumoEquipe, Contribuicoes } from '../../infra/home-api.client';
import { HOME_ERRO_RECUPERAR_DADOS } from '../../home.constants';

@Component({
  selector: 'home-resumo-equipe',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styleUrls: ['../home.styles.scss'],
  styles: [':host { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }'],
  templateUrl: './resumo-equipe.component.html',
})
export class ResumoEquipeComponent {
  private readonly homeApi = inject(HomeApiClient);

  readonly unidadeId = input.required<string>();
  readonly subordinadas = input.required<boolean>();

  readonly data = signal<ResumoEquipe | null>(null);
  readonly contribuicoes = signal<Contribuicoes | null>(null);
  readonly loading = signal(false);
  readonly erro = signal<string | null>(null);

  constructor() {
    effect(() => {
      const unidadeId = this.unidadeId();
      const subordinadas = this.subordinadas();
      if (unidadeId) this.fetch(unidadeId, subordinadas);
    });
  }

  private fetch(unidadeId: string, subordinadas: boolean): void {
    this.loading.set(true);
    this.erro.set(null);
    forkJoin({
      resumo: this.homeApi.getResumoEquipe(unidadeId, subordinadas),
      contribuicoes: this.homeApi.getContribuicoes(unidadeId, subordinadas),
    }).subscribe({
      next: ({ resumo, contribuicoes }) => {
        this.data.set(resumo);
        this.contribuicoes.set(contribuicoes);
        this.loading.set(false);
      },
      error: () => {
        this.data.set(null);
        this.contribuicoes.set(null);
        this.erro.set(HOME_ERRO_RECUPERAR_DADOS);
        this.loading.set(false);
      },
    });
  }
}

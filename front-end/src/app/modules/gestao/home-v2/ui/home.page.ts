import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth.service';
import { UnidadeService } from 'src/app/services/unidade.service';
import { PendenciasUsuarioComponent } from './components/pendencias-usuario.component';
import { PlanosVigentesComponent } from './components/planos-vigentes.component';
import { AcoesGerenciaisComponent } from './components/acoes-gerenciais.component';
import { ResumoEquipeComponent } from './components/resumo-equipe.component';
import { ContribuicoesComponent } from './components/contribuicoes.component';
import { EmFeriasComponent } from './components/em-ferias.component';

// TODO: Reativar AniversariantesComponent quando o campo data_nascimento for adicionado ao retorno da api SIAPE.
//       Se não for implementado até Jan/2027, considerar remover o componente e o endpoint.

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
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.styles.scss'],
})
export class HomeV2Page implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly unidadeService = inject(UnidadeService);

  readonly unidadeOptions = signal<SelectOption[]>([]);
  readonly selectedUnidadeId = signal<string>('');
  readonly subordinadas = signal(false);
  readonly isGestorUnidade = computed(() => {
    const unidadeId = this.selectedUnidadeId();
    return unidadeId ? this.unidadeService.isGestorUnidade(unidadeId) : false;
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
    this.loadUnidadesGerenciadas();
  }

  onUnidadeChange(event: any): void {
    const value = event?.target?.value;
    if (!value) return;
    this.selectedUnidadeId.set(value);
  }

  onSubordinadasChange(value: boolean): void {
    this.subordinadas.set(value);
  }

  private loadUnidadesGerenciadas(): void {
    const cpf = this.auth.usuario?.cpf;
    if (!cpf) return;

    // TODO: usar endpoint de unidades gerenciadas quando disponível
    const areas = this.auth.usuario?.areas_trabalho ?? [];
    const unidades = areas
      .filter(a => a.unidade)
      .map(a => ({ id: a.unidade_id, sigla: a.unidade!.sigla, nome: a.unidade!.nome }));

    const unique = [...new Map(unidades.map(u => [u.id, u])).values()];

    this.unidadeOptions.set(
      unique.map((u, i) => ({ value: u.id, label: `${u.sigla} - ${u.nome}`, selected: i === 0 }))
    );

    if (unique.length > 0) {
      this.selectedUnidadeId.set(unique[0].id);
    }
  }
}

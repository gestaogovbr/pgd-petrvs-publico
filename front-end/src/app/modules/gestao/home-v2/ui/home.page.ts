import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth.service';
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
      .map(a => ({
        id: a.unidade_id,
        sigla: a.unidade!.sigla,
        nome: a.unidade!.nome,
        isGestorTitular: a.atribuicoes?.some(attr => attr.atribuicao === 'GESTOR') ?? false,
        isGestorSubstituto: a.atribuicoes?.some(attr => attr.atribuicao === 'GESTOR_SUBSTITUTO') ?? false,
        isLotado: a.atribuicoes?.some(attr => attr.atribuicao === 'LOTADO') ?? false,
      }));

    const unique = [...new Map(unidades.map(u => [u.id, u])).values()];

    const defaultUnidade =
      unique.find(u => u.isGestorTitular && u.isLotado) ??
      unique.find(u => u.isGestorTitular) ??
      unique.find(u => u.isGestorSubstituto && u.isLotado) ??
      unique.find(u => u.isGestorSubstituto) ??
      unique.find(u => u.isLotado) ??
      [...unique].sort((a, b) => a.sigla.localeCompare(b.sigla))[0];

    const defaultId = defaultUnidade?.id ?? '';

    this.unidadeOptions.set(
      unique.map(u => ({ value: u.id, label: `${u.sigla} - ${u.nome}`, selected: u.id === defaultId }))
    );

    if (defaultId) {
      this.selectedUnidadeId.set(defaultId);
    }
  }
}

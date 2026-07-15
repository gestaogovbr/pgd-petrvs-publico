import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
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
import { AniversariantesComponent } from './components/aniversariantes.component';
import { EmFeriasComponent } from './components/em-ferias.component';

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
    AniversariantesComponent,
    EmFeriasComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.styles.scss'],
})
export class HomeV2Page implements OnInit {
  private readonly auth = inject(AuthService);

  readonly unidadeOptions = signal<SelectOption[]>([]);
  readonly selectedUnidadeId = signal<string>('');
  readonly subordinadas = signal(false);

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

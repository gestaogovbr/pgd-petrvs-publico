import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AtalhoCardComponent } from './atalho-card.component';

@Component({
  selector: 'home-acoes-gerenciais',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AtalhoCardComponent],
  styleUrls: ['../home.styles.scss'],
  templateUrl: './acoes-gerenciais.component.html',
})
export class AcoesGerenciaisComponent {
  private readonly router = inject(Router);

  irParaPainelGerencial(): void {
    // this.router.navigate(['panel']); // não se trata do panel login, mas sim  da feature do card #2359
  }

  irParaPlanoEntregas(): void {
    this.router.navigate(['gestao', 'plano-entrega'], {
      queryParams: { planejamento: true, vigentes: true }, // TODO: parâmetros ainda não fazem diferença nas routes de front-end
    });
  }

  irParaPlanoTrabalho(): void {
    this.router.navigate(['gestao', 'plano-trabalho-v2'], {
      queryParams: { vigentes: true, meus_planos: true }, // TODO: parâmetros ainda não fazem diferença nas routes de front-end
    });
  }
}

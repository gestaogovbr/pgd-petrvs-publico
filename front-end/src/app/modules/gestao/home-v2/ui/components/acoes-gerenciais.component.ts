import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

@Component({
  selector: 'home-acoes-gerenciais',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WebcomponentsAngularModule],
  styleUrls: ['../home.styles.scss'],
  template: `
    <div class="d-flex gap-3 justify-content-center">
      <br-button class="home-btn-atalho" emphasis="secondary" (click)="irParaPainelGerencial()">
        Painel Gerencial
      </br-button>
      <br-button class="home-btn-atalho" emphasis="secondary" (click)="irParaPlanoEntregas()">
        Meu Plano de Entregas Vigente
      </br-button>
      <br-button class="home-btn-atalho" emphasis="secondary" (click)="irParaPlanoTrabalho()">
        Meu Plano de Trabalho Vigente
      </br-button>
    </div>
  `,
})
export class AcoesGerenciaisComponent {
  private readonly router = inject(Router);

  irParaPainelGerencial(): void {
    this.router.navigate(['panel']);
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

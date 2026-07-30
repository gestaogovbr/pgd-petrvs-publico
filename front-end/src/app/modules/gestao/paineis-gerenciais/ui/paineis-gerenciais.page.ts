import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

interface PainelItem {
  titulo: string;
  rota: string;
  icon: string;
}

@Component({
  selector: 'paineis-gerenciais-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './paineis-gerenciais.page.html',
  styleUrls: ['./paineis-gerenciais.page.scss'],
})
export class PaineisGerenciaisPage {
  private readonly router = inject(Router);

  readonly paineis: PainelItem[] = [
    { titulo: 'Alinhamento e Desempenho', rota: 'alinhamento-desempenho', icon: 'bi bi-graph-up-arrow' },
    { titulo: 'Conformidade', rota: 'conformidade', icon: 'bi bi-clipboard2-check' },
    { titulo: 'Modalidades', rota: 'modalidades', icon: 'bi bi-diagram-3' },
    { titulo: 'Gestão do PGD', rota: 'gestao-pgd', icon: 'bi bi-gear' },
  ];

  navegarPara(rota: string): void {
    this.router.navigate(['gestao', 'paineis-gerenciais', rota]);
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';

interface PainelItem {
  titulo: string;
  rota: string;
}

@Component({
  selector: 'paineis-gerenciais-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WebcomponentsAngularModule, BreadcrumbComponent],
  templateUrl: './paineis-gerenciais.page.html',
})
export class PaineisGerenciaisPage {
  private readonly router = inject(Router);

  readonly paineis: PainelItem[] = [
    { titulo: 'Alinhamento e Desempenho', rota: 'alinhamento-desempenho' },
    { titulo: 'Conformidade', rota: 'conformidade' },
    { titulo: 'Modalidades', rota: 'modalidades' },
    { titulo: 'Gestão do PGD', rota: 'gestao-pgd' },
  ];

  navegarPara(rota: string): void {
    this.router.navigate(['gestao', 'paineis-gerenciais', rota]);
  }
}

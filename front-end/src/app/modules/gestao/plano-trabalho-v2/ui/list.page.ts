import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoTrabalhoListFacade } from '../application/list.facade';

@Component({
  selector: 'app-plano-trabalho-v2-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './list.page.html'
})
export class PlanoTrabalhoV2ListPage implements OnInit {
  readonly facade = inject(PlanoTrabalhoListFacade);
  ngOnInit(): void {
    this.facade.load();
  }
  prev() {
    const p = this.facade.page();
    if (p > 1) {
      this.facade.page.set(p - 1);
      this.facade.load();
    }
  }
  next() {
    this.facade.page.set(this.facade.page() + 1);
    this.facade.load();
  }
}

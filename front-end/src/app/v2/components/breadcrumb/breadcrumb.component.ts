import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  readonly service = inject(BreadcrumbService);
  private readonly gb = inject(GlobalsService);

  goHome(): void {
    this.gb.goHome();
  }
}

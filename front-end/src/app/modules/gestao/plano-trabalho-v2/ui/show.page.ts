import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

@Component({
  selector: 'app-plano-trabalho-v2-show-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule],
  templateUrl: './show.page.html'
})
export class PlanoTrabalhoV2ShowPage implements OnInit {


   ngOnInit(): void {
   }
}
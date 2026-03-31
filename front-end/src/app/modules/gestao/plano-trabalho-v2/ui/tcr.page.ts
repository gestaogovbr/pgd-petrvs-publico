import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { WebcomponentsAngularModule } from '@govbr-ds/webcomponents-angular';

@Component({
  selector: 'app-plano-trabalho-v2-tcr-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, WebcomponentsAngularModule],
  templateUrl: './tcr.page.html'
})
export class PlanoTrabalhoV2TcrPage implements OnInit {


   ngOnInit(): void {
   }
}
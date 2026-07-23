import { Component, Input, OnInit } from '@angular/core';

export type ProgressColor = "success" | "info" | "warning" | "danger";

@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    standalone: false
})
export class ProgressBarComponent implements OnInit {
  @Input() max: number = 100;
  @Input() min: number = 0;
  @Input() value: number = 0;
  @Input() goal: number = 0;
  @Input() height: number = 12;
  @Input() noPercentage?: string;
  @Input() minWidth?: number;
  @Input() color?: ProgressColor;

  constructor() { }

  ngOnInit(): void {
  }

  public get isGoal(): boolean {
    return !!this.goal && this.goal != this.max;  
  }

  public get percentage(): number {
    return Math.round((this.value - this.min) * 100 / (this.max - this.min));
  }

  private get goalPct(): number {
    return Math.round((this.goal - this.min) * 100 / (this.max - this.min));
  }

  /** Parcela do valor limitada à meta (evita que o excedente seja contado duas vezes no modo empilhado) */
  public get basePercentage(): number {
    return Math.min(this.percentage, this.goalPct);
  }

  public get goalPercentage(): number {
    return Math.max(this.percentage - this.goalPct, 0);
  }

  public get goalValue(): number {
    return Math.max(this.value - this.goal, 0);
  }

  public get isNoPercentage(): boolean {
    return this.noPercentage != undefined;
  }

  public get progressClass(): string {
    return "progress-bar progress-bar-striped" + (this.color ? " bg-" + this.color : "");
  }

}

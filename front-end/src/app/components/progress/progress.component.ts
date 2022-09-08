import { Component, Input, OnInit } from '@angular/core';

export type ProgressColor = "success" | "info" | "warning" | "danger";

@Component({
  selector: 'progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() max: number = 100;
  @Input() min: number = 0;
  @Input() value: number = 0;
  @Input() height: number = 20;
  @Input() noPercentage?: string;
  @Input() minWidth?: number;
  @Input() color?: ProgressColor;

  constructor() { }

  ngOnInit(): void {
  }

  public get percentage(): number {
    return Math.round((this.value - this.min) * 100 / (this.max - this.min));
  }

  public get isNoPercentage(): boolean {
    return this.noPercentage != undefined;
  }

  public get progressClass(): string {
    return "progress-bar progress-bar-striped" + (this.color ? " bg-" + this.color : "");
  }

}

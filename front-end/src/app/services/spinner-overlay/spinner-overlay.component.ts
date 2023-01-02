import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {
  @Input() message: any = "";
  @Input() show: boolean = false;

  private _cdRef?: ChangeDetectorRef;
  public get cdRef(): ChangeDetectorRef { this._cdRef = this._cdRef || this.injector.get<ChangeDetectorRef>(ChangeDetectorRef); return this._cdRef }

  constructor(public injector: Injector) { }

  ngOnInit(): void {
  }

}

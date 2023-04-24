import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @Input() template?: TemplateRef<unknown>;
  @Input() editTemplate?: TemplateRef<unknown>;
  @Input() fullSizeOnEdit?: string;
  @Input() noToolbar?: string;
  @Input() title: string = "";
  @Input() size: number = 6;

  constructor() { }

  ngOnInit(): void {
  }

  public get isFullSizeOnEdit(): boolean {
    return this.fullSizeOnEdit != undefined;
  }

  public get isNoToolbar(): boolean {
    return this.noToolbar != undefined;
  }

}

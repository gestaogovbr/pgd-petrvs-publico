import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() template?: TemplateRef<unknown>;
  @Input() key: any;
  @Input() label: string = "";
  @Input() icon?: string;

  public tabs?: TabsComponent;

  constructor() { }

  public get isActive(): boolean {
    return this.tabs?.active == this.key;
  }

  ngOnInit(): void {
  }

}

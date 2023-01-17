import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { MapComponent, MapItem } from '../map.component';

@Component({
  selector: 'map-item, [map-item]',
  templateUrl: './map-item.component.html',
  styleUrls: ['./map-item.component.scss']
})
export class MapItemComponent implements OnInit {
  @Input() template?: TemplateRef<any>;
  @Input() public set item(value: MapItem | undefined) {
    if(this._item != value) {
      this._item = value;
      this.cdRef.detectChanges();
    }
  }
  public get item(): MapItem | undefined {
    if(this._item && this.map.hash(this._item) != this._item.hash) {
      this._item.hash = this.map.hash(this._item);
      this.cdRef.markForCheck();
    } 
    return this._item;
  }

  private _item?: MapItem;
  
  constructor(
    public viewContainerRef: ViewContainerRef,
    public cdRef: ChangeDetectorRef,
    public map: MapComponent
  ) { }

  ngOnInit(): void {
    if(this.template) this.viewContainerRef.createEmbeddedView(this.template, {
      item: this.item,
      data: this.item?.data,
      parent: this.item?.parent,
      children: this.item?.children
    });
  }

}

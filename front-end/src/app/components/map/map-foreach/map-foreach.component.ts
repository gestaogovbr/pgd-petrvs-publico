import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MapComponent, MapItem } from '../map.component';

@Component({
  selector: 'map-foreach, [map-foreach]',
  templateUrl: './map-foreach.component.html',
  styleUrls: ['./map-foreach.component.scss']
})
export class MapForeachComponent implements OnInit {
  @ViewChild('foreach', { static: true }) foreach?: TemplateRef<any>;  
  @Input() template?: TemplateRef<any>;
  @Input() level: any = 0;
  @Input() public set items(value: MapItem[]) {
    if(this._items != value) {
      this._items = value;
      this.cdRef.detectChanges();
    }
  }
  public get items(): MapItem[] {
    let items: MapItem[] = this._items || this.map.items || [];
    if(this.map.updateHash(items)) this.cdRef.markForCheck();
    return items;
  }

  public JSON = JSON;

  private _items?: MapItem[] = undefined;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public map: MapComponent, 
    public cdRef: ChangeDetectorRef
  ) { }

  public context = {
    self: this,
    get items(): MapItem[] { return this.self.items }
  }

  ngOnInit(): void {
    if(this.foreach) this.viewContainerRef.createEmbeddedView(this.foreach, this.context);
  }



}

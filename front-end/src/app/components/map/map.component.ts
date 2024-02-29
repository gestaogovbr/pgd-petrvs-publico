import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

export type MapItem = {
  data: any,
  metadata?: any,
  parent?: MapItem,
  hash?: string,
  children?: MapItem[]
}

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() public set items(value: MapItem[]) {
    if(this._items != value) {
      this._items = value;
      this.cdRef.detectChanges();
    }
  }
  public get items(): MapItem[] {
    let items: MapItem[] = this._items || [];
    if(this.updateHash(items)) this.cdRef.markForCheck();
    return items;
  }

  private _items?: MapItem[];

  constructor(public cdRef: ChangeDetectorRef, public util: UtilService) { }

  ngOnInit(): void { }

  public updateHash(items: MapItem[]): boolean {
    let result: boolean = false;
    for(let item of items) {
      let hash = this.hash(item);
      if(item.hash != hash) {
        item.hash = hash;
        result = true;
      }
    }
    return result;
  }

  public hash(item: MapItem): string {
    return this.util.md5(JSON.stringify({
      data: item.data,
      metadata: item.metadata
    }));
  }
}

import { ChangeDetectorRef, Component, ContentChildren, EventEmitter, Injector, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { LookupItem } from 'src/app/services/lookup.service';
import { ComponentBase } from '../component-base';
import { SectionComponent } from './section/section.component';

export type AccordionLoad = ((item: any) => any | Promise<any>) | undefined;

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent extends ComponentBase implements OnInit {
  @ContentChildren(SectionComponent, { descendants: true }) sectionsRef?: QueryList<SectionComponent>;
  @Input() load?: AccordionLoad;
  @Input() items: any[] = [];
  @Input() template?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() set active(value: any) {
    if(this._active != value && (!value || this.items.find(x => (x.id || x.key) == value))) {
      this._active = value;
      this.cdRef.detectChanges();
    }
  }
  get active(): any {
    return this._active;
  }
  @Input() set loading(value: any) {
    if(this._loading != value) {
      this._loading = value;
      this.cdRef.detectChanges();
    }
  }
  get loading(): any {
    return this._loading;
  }

  private _active: any = undefined;
  private _loading: boolean = false;

  constructor(public injector: Injector) {
    super(injector);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.loadSections();
    this.sectionsRef?.changes.subscribe((changes: any) => this.loadSections());
    if(this.active == undefined && this.items.length) {
      this.active = this.items[0]!.id || this.items[0]!.key;
    }
  }

  public loadSections() {
    this.sectionsRef?.forEach(sec => {
      // DO THINGS
    });
  }
}

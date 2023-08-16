import { Component, Injector, Input, OnInit, TemplateRef } from '@angular/core';
import { ComponentBase } from '../../component-base';
import { AccordionComponent, AccordionLoad } from '../accordion.component';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent extends ComponentBase implements OnInit {
  @Input() item: any = undefined;
  @Input() load: AccordionLoad;
  @Input() template?: TemplateRef<unknown>;
  @Input() titleTemplate?: TemplateRef<unknown>;
  @Input() accordion?: AccordionComponent;

  public loading: boolean = false;
  public loaded: boolean = false;
  public data: any;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  public async onClick() {
    if(this.load) {
      this.loading = true;
      try {
        this.cdRef.detectChanges();
        this.data = await this.load(this.item);
      } finally {
        this.loading = false;
        this.cdRef.detectChanges();
      }
    }
  }

}

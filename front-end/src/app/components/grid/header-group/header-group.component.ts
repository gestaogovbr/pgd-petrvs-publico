import { Component, Input } from "@angular/core";

@Component({
  selector: 'header-group',
  templateUrl: './header-group.component.html'
})
export class HeaderGroupComponent {
  @Input() title: string = "";
  @Input() colspan?: string = "1";
  @Input() align?: string;
  @Input() style: { [key: string]: string } = {};
}

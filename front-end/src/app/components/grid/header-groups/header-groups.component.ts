import { Component, ContentChildren, QueryList } from "@angular/core";
import { HeaderGroupComponent } from "../header-group/header-group.component";

@Component({
  selector: 'header-groups',
  templateUrl: './header-groups.component.html'
})
export class HeaderGroupsComponent {
  @ContentChildren(HeaderGroupComponent, { descendants: true }) headersRef?: QueryList<HeaderGroupComponent>;
}

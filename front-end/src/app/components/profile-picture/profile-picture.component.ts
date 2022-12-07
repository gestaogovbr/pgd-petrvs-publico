import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  @Input() url?: string | null;
  @Input() urlError: string;
  @Input() size: number = 25;
  @Input() hint?: string;
  @Input() thumbnail?: string;
  @Input() class?: string;
  @Input() click?: () => void;

  constructor(public gb: GlobalsService) {
    this.url = this.gb.servidorURL + "/assets/images/profile.png";
    this.urlError = this.gb.servidorURL + "/assets/images/profile.png";
  }

  ngOnInit(): void {
  }

  public get profileClass(): string {
    return (this.isThumbnail ? 'img-thumbnail ' : 'rounded-circle profile-photo ') + (this.class || "");
  }

  public get isThumbnail(): boolean {
    return this.thumbnail != undefined;
  }

  public onError(event: ErrorEvent) {
    (event.target as any).src = this.urlError;
  }

  public get resourceUrl() {
    return this.url?.startsWith("http") ? this.url : this.gb.getResourcePath(this.url || "assets/images/profile.png");
  }
    
  public onClick(event: Event) {
    if(this.click) this.click();
  }

}
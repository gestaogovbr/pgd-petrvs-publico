import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() get contents(): string {
    return this.contentsValue;
  }
  set contents(value: string) {
    this.contentsValue = value;
    if(this.viewInitialized) setTimeout(() => this.createComment());
  }

  private contentsValue: string = "";
  private commentCreated = false;
  private viewInitialized = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const htmlElement = this.elementRef.nativeElement as HTMLElement;
    if(!this.contentsValue) this.contentsValue = htmlElement.innerHTML || "";
    //setTimeout(() => this.createComment(), 0);
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.createComment();
  }

  private createComment() {
    const htmlElement = this.elementRef.nativeElement as HTMLElement;
    if (this.commentCreated) {
      htmlElement.parentNode?.removeChild(htmlElement.previousSibling!);
    }
    htmlElement.parentNode?.insertBefore(document.createComment(this.contentsValue), htmlElement);
    this.commentCreated = true;
  }

}

import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let CommentComponent = class CommentComponent {
    get contents() {
        return this.contentsValue;
    }
    set contents(value) {
        this.contentsValue = value;
        if (this.viewInitialized)
            setTimeout(() => this.createComment());
    }
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.contentsValue = "";
        this.commentCreated = false;
        this.viewInitialized = false;
    }
    ngOnInit() {
        const htmlElement = this.elementRef.nativeElement;
        if (!this.contentsValue)
            this.contentsValue = htmlElement.innerHTML || "";
        //setTimeout(() => this.createComment(), 0);
    }
    ngAfterViewInit() {
        this.viewInitialized = true;
        this.createComment();
    }
    createComment() {
        const htmlElement = this.elementRef.nativeElement;
        if (this.commentCreated) {
            htmlElement.parentNode?.removeChild(htmlElement.previousSibling);
        }
        htmlElement.parentNode?.insertBefore(document.createComment(this.contentsValue), htmlElement);
        this.commentCreated = true;
    }
};
__decorate([
    Input()
], CommentComponent.prototype, "contents", null);
CommentComponent = __decorate([
    Component({
        selector: 'comment',
        templateUrl: './comment.component.html',
        styleUrls: ['./comment.component.scss'],
        standalone: false
    })
], CommentComponent);
export { CommentComponent };
//# sourceMappingURL=comment.component.js.map
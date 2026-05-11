import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ProfilePictureComponent = class ProfilePictureComponent {
    constructor(gb) {
        this.gb = gb;
        this.size = 25;
        this.url = this.gb.servidorURL + "/assets/images/profile.png";
        this.urlError = this.gb.servidorURL + "/assets/images/profile.png";
    }
    ngOnInit() {
    }
    get profileClass() {
        return (this.isThumbnail ? 'img-thumbnail ' : 'rounded-circle profile-photo ') + (this.class || "");
    }
    get isThumbnail() {
        return this.thumbnail != undefined;
    }
    onError(event) {
        event.target.src = this.urlError;
    }
    get resourceUrl() {
        return typeof this.url == "string" ? (this.url?.startsWith("http") ? this.url : this.gb.getResourcePath(this.url || "assets/images/profile.png")) : this.url;
    }
    onClick(event) {
        if (this.click)
            this.click();
    }
};
__decorate([
    Input()
], ProfilePictureComponent.prototype, "url", void 0);
__decorate([
    Input()
], ProfilePictureComponent.prototype, "urlError", void 0);
__decorate([
    Input()
], ProfilePictureComponent.prototype, "size", void 0);
__decorate([
    Input()
], ProfilePictureComponent.prototype, "hint", void 0);
__decorate([
    Input()
], ProfilePictureComponent.prototype, "thumbnail", void 0);
__decorate([
    Input()
], ProfilePictureComponent.prototype, "class", void 0);
__decorate([
    Input()
], ProfilePictureComponent.prototype, "click", void 0);
ProfilePictureComponent = __decorate([
    Component({
        selector: 'profile-picture',
        templateUrl: './profile-picture.component.html',
        styleUrls: ['./profile-picture.component.scss'],
        standalone: false
    })
], ProfilePictureComponent);
export { ProfilePictureComponent };
//# sourceMappingURL=profile-picture.component.js.map
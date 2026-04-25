import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ProgressBarComponent = class ProgressBarComponent {
    constructor() {
        this.max = 100;
        this.min = 0;
        this.value = 0;
        this.goal = 0;
        this.height = 12;
    }
    ngOnInit() {
    }
    get isGoal() {
        return !!this.goal && this.goal != this.max;
    }
    get percentage() {
        return Math.round((this.value - this.min) * 100 / (this.max - this.min));
    }
    get goalPercentage() {
        return Math.max(this.percentage - Math.round((this.goal - this.min) * 100 / (this.max - this.min)), 0);
    }
    get goalValue() {
        return Math.max(this.value - this.goal, 0);
    }
    get isNoPercentage() {
        return this.noPercentage != undefined;
    }
    get progressClass() {
        return "progress-bar progress-bar-striped" + (this.color ? " bg-" + this.color : "");
    }
};
__decorate([
    Input()
], ProgressBarComponent.prototype, "max", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "min", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "value", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "goal", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "height", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "noPercentage", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "minWidth", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "color", void 0);
ProgressBarComponent = __decorate([
    Component({
        selector: 'progress-bar',
        templateUrl: './progress-bar.component.html',
        styleUrls: ['./progress-bar.component.scss'],
        standalone: false
    })
], ProgressBarComponent);
export { ProgressBarComponent };
//# sourceMappingURL=progress-bar.component.js.map
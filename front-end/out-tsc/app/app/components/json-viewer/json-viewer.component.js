import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ComponentBase } from '../component-base';
let JsonViewerComponent = class JsonViewerComponent extends ComponentBase {
    constructor() {
        super(...arguments);
        this.expanded = false;
        this.depth = -1;
        this._currentDepth = 0;
        this.segments = [];
    }
    ngOnChanges() {
        this.segments = [];
        console.log(this.segments);
        // remove cycles
        this.json = this.decycle(this.json);
        if (typeof this.json === 'object') {
            Object.keys(this.json).forEach(key => {
                this.segments.push(this.parseKeyValue(key, this.json[key]));
            });
        }
        else {
            this.segments.push(this.parseKeyValue(`(${typeof this.json})`, this.json));
        }
    }
    isExpandable(segment) {
        return segment.type === 'object' || segment.type === 'array';
    }
    toggle(segment) {
        if (this.isExpandable(segment)) {
            segment.expanded = !segment.expanded;
        }
    }
    parseKeyValue(key, value) {
        const segment = {
            key: key,
            value: value,
            type: undefined,
            description: '' + value,
            expanded: this.isExpanded()
        };
        switch (typeof segment.value) {
            case 'number': {
                segment.type = 'number';
                break;
            }
            case 'boolean': {
                segment.type = 'boolean';
                break;
            }
            case 'function': {
                segment.type = 'function';
                break;
            }
            case 'string': {
                segment.type = 'string';
                segment.description = '"' + segment.value + '"';
                break;
            }
            case 'undefined': {
                segment.type = 'undefined';
                segment.description = 'undefined';
                break;
            }
            case 'object': {
                // yea, null is object
                if (segment.value === null) {
                    segment.type = 'null';
                    segment.description = 'null';
                }
                else if (Array.isArray(segment.value)) {
                    segment.type = 'array';
                    segment.description = 'Array[' + segment.value.length + '] ' + JSON.stringify(segment.value);
                }
                else if (segment.value instanceof Date) {
                    segment.type = 'date';
                    segment.description = this.util.getDateTimeFormatted(segment.value, ' - ');
                }
                else {
                    segment.type = 'object';
                    segment.description = 'Object ' + JSON.stringify(segment.value);
                }
                break;
            }
        }
        return segment;
    }
    isExpanded() {
        return (this.expanded &&
            !(this.depth > -1 && this._currentDepth >= this.depth));
    }
    // https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
    decycle(object) {
        const objects = new WeakMap();
        return (function derez(value, path) {
            let old_path;
            let nu;
            if (typeof value === 'object'
                && value !== null
                && !(value instanceof Boolean)
                && !(value instanceof Date)
                && !(value instanceof Number)
                && !(value instanceof RegExp)
                && !(value instanceof String)) {
                old_path = objects.get(value);
                if (old_path !== undefined) {
                    return { $ref: old_path };
                }
                objects.set(value, path);
                if (Array.isArray(value)) {
                    nu = [];
                    value.forEach(function (element, i) {
                        nu[i] = derez(element, path + '[' + i + ']');
                    });
                }
                else {
                    nu = {};
                    Object.keys(value).forEach(function (name) {
                        nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
                    });
                }
                return nu;
            }
            return value;
        }(object, '$'));
    }
};
__decorate([
    Input()
], JsonViewerComponent.prototype, "json", void 0);
__decorate([
    Input()
], JsonViewerComponent.prototype, "expanded", void 0);
__decorate([
    Input()
], JsonViewerComponent.prototype, "depth", void 0);
__decorate([
    Input()
], JsonViewerComponent.prototype, "_currentDepth", void 0);
JsonViewerComponent = __decorate([
    Component({
        selector: 'json-viewer',
        templateUrl: './json-viewer.component.html',
        styleUrls: ['./json-viewer.component.scss'],
        standalone: false
    })
], JsonViewerComponent);
export { JsonViewerComponent };
//# sourceMappingURL=json-viewer.component.js.map
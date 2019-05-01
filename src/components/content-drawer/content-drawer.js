var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
/**
 * Generated class for the ContentDrawerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ContentDrawerComponent = /** @class */ (function () {
    function ContentDrawerComponent() {
        console.log('Hello ContentDrawerComponent Component');
        this.text = 'Hello World';
    }
    ContentDrawerComponent = __decorate([
        Component({
            selector: 'content-drawer',
            templateUrl: 'content-drawer.html'
        }),
        __metadata("design:paramtypes", [])
    ], ContentDrawerComponent);
    return ContentDrawerComponent;
}());
export { ContentDrawerComponent };
//# sourceMappingURL=content-drawer.js.map
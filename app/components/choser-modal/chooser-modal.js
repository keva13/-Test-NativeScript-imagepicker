"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform");
var ChooserComponent = /** @class */ (function () {
    function ChooserComponent(_iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.itemWidth = (platform_1.screen.mainScreen.widthDIPs - 10) / 3;
        this.screenHeight = platform_1.screen.mainScreen.heightDIPs;
        this.screenWidth = platform_1.screen.mainScreen.widthDIPs;
        this.chooserItems = [];
        this.onSelectItem = new core_1.EventEmitter();
        this.onCloseChooser = new core_1.EventEmitter();
        this.topForBottom = platform_1.screen.mainScreen.heightDIPs - 69 - 100;
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        // application.android.on(AndroidApplication.activityBackPressedEvent, (data: any) => {
        //     if (this.isVisible) {
        //         data.cancel = true;
        //     }
        // });
    }
    ChooserComponent.prototype.ngDoCheck = function () {
        var changes = this.iterableDiffer.diff(this.chooserItems);
        if (changes) {
            this.topForBottom = platform_1.screen.mainScreen.heightDIPs - 69 - 100 * Math.ceil(this.chooserItems.length / 3);
        }
    };
    ChooserComponent.prototype.onItemTap = function (item) {
        this.onSelectItem.emit(item);
        this.CloseChooser();
    };
    ChooserComponent.prototype.CloseChooser = function () {
        this.onCloseChooser.emit();
    };
    ChooserComponent.prototype.onTap = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChooserComponent.prototype, "chooserItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChooserComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChooserComponent.prototype, "onSelectItem", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChooserComponent.prototype, "onCloseChooser", void 0);
    ChooserComponent = __decorate([
        core_1.Component({
            selector: "app-chooser-modal",
            moduleId: module.id,
            templateUrl: "./chooser-modal.html",
        }),
        __metadata("design:paramtypes", [core_1.IterableDiffers])
    ], ChooserComponent);
    return ChooserComponent;
}());
exports.ChooserComponent = ChooserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNob29zZXItbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0g7QUFFeEgsc0RBQW1EO0FBV25EO0lBVUksMEJBQW9CLGdCQUFpQztRQUFqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBVHJELGNBQVMsR0FBRyxDQUFDLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDL0MsaUJBQVksR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUE7UUFDM0MsZ0JBQVcsR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDakMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFakIsaUJBQVksR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDckQsbUJBQWMsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDakUsaUJBQVksR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUduRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLHVGQUF1RjtRQUN2Riw0QkFBNEI7UUFDNUIsOEJBQThCO1FBQzlCLFFBQVE7UUFDUixNQUFNO0lBQ1YsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsaUJBQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxRyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0NBQUssR0FBTDtJQUVBLENBQUM7SUFsQ1E7UUFBUixZQUFLLEVBQUU7OzBEQUFtQjtJQUNsQjtRQUFSLFlBQUssRUFBRTs7dURBQVc7SUFDVDtRQUFULGFBQU0sRUFBRTtrQ0FBZSxtQkFBWTswREFBMkI7SUFDckQ7UUFBVCxhQUFNLEVBQUU7a0NBQWlCLG1CQUFZOzREQUEyQjtJQVB4RCxnQkFBZ0I7UUFMNUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7U0FDbkMsQ0FBQzt5Q0FXd0Msc0JBQWU7T0FWNUMsZ0JBQWdCLENBdUM1QjtJQUFELHVCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUF2Q1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBJdGVyYWJsZURpZmZlcnMsIE9uQ2hhbmdlc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzb2x1dGVMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCI7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0IHtTdGFja0xheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJhcHAtY2hvb3Nlci1tb2RhbFwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2Nob29zZXItbW9kYWwuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBDaG9vc2VyQ29tcG9uZW50IHtcbiAgICBpdGVtV2lkdGggPSAoc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzLTEwKS8zO1xuICAgIHNjcmVlbkhlaWdodCA9IHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHNcbiAgICBzY3JlZW5XaWR0aCA9IHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcbiAgICBASW5wdXQoKSBjaG9vc2VySXRlbXMgPSBbXTtcbiAgICBASW5wdXQoKSBpc1Zpc2libGU7XG4gICAgQE91dHB1dCgpIG9uU2VsZWN0SXRlbTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uQ2xvc2VDaG9vc2VyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB0b3BGb3JCb3R0b20gPSBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzIC0gNjkgLSAxMDA7XG4gICAgaXRlcmFibGVEaWZmZXI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICAgICAgdGhpcy5pdGVyYWJsZURpZmZlciA9IHRoaXMuX2l0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gICAgICAgIC8vIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgIC8vICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMuY2hvb3Nlckl0ZW1zKTtcbiAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMudG9wRm9yQm90dG9tID0gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcyAtIDY5IC0gMTAwICogTWF0aC5jZWlsKHRoaXMuY2hvb3Nlckl0ZW1zLmxlbmd0aCAvIDMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1UYXAoaXRlbSkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0SXRlbS5lbWl0KGl0ZW0pO1xuICAgICAgICB0aGlzLkNsb3NlQ2hvb3NlcigpXG4gICAgfVxuXG4gICAgQ2xvc2VDaG9vc2VyKCkge1xuICAgICAgICB0aGlzLm9uQ2xvc2VDaG9vc2VyLmVtaXQoKTtcbiAgICB9XG5cbiAgICBvblRhcCgpIHtcblxuICAgIH1cbn0iXX0=
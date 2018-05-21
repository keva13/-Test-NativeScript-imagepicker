"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform");
var application = require("application");
var application_1 = require("application");
var ChooserComponent = /** @class */ (function () {
    function ChooserComponent(_iterableDiffers) {
        var _this = this;
        this._iterableDiffers = _iterableDiffers;
        this.itemWidth = (platform_1.screen.mainScreen.widthDIPs - 10) / 3;
        this.screenHeight = platform_1.screen.mainScreen.heightDIPs;
        this.screenWidth = platform_1.screen.mainScreen.widthDIPs;
        this.chooserItems = [];
        this.onSelectItem = new core_1.EventEmitter();
        this.onCloseChooser = new core_1.EventEmitter();
        this.topForBottom = platform_1.screen.mainScreen.heightDIPs - 69 - 100;
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            if (_this.isVisible) {
                data.cancel = true;
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNob29zZXItbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0g7QUFFeEgsc0RBQW1EO0FBRW5ELHlDQUEyQztBQUMzQywyQ0FBc0Y7QUFRdEY7SUFVSSwwQkFBb0IsZ0JBQWlDO1FBQXJELGlCQU9DO1FBUG1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFUckQsY0FBUyxHQUFHLENBQUMsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUMzQyxnQkFBVyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVqQixpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqRSxpQkFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBR25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUFTO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTFHLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLElBQUk7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQWxDUTtRQUFSLFlBQUssRUFBRTs7MERBQW1CO0lBQ2xCO1FBQVIsWUFBSyxFQUFFOzt1REFBVztJQUNUO1FBQVQsYUFBTSxFQUFFO2tDQUFlLG1CQUFZOzBEQUEyQjtJQUNyRDtRQUFULGFBQU0sRUFBRTtrQ0FBaUIsbUJBQVk7NERBQTJCO0lBUHhELGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHNCQUFzQjtTQUNuQyxDQUFDO3lDQVd3QyxzQkFBZTtPQVY1QyxnQkFBZ0IsQ0F1QzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXZDRCxJQXVDQztBQXZDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEl0ZXJhYmxlRGlmZmVycywgT25DaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnNvbHV0ZUxheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcImFwcC1jaG9vc2VyLW1vZGFsXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hvb3Nlci1tb2RhbC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIENob29zZXJDb21wb25lbnQge1xuICAgIGl0ZW1XaWR0aCA9IChzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMtMTApLzM7XG4gICAgc2NyZWVuSGVpZ2h0ID0gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQc1xuICAgIHNjcmVlbldpZHRoID0gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgIEBJbnB1dCgpIGNob29zZXJJdGVtcyA9IFtdO1xuICAgIEBJbnB1dCgpIGlzVmlzaWJsZTtcbiAgICBAT3V0cHV0KCkgb25TZWxlY3RJdGVtOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25DbG9zZUNob29zZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRvcEZvckJvdHRvbSA9IHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHMgLSA2OSAtIDEwMDtcbiAgICBpdGVyYWJsZURpZmZlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgICAgICB0aGlzLml0ZXJhYmxlRGlmZmVyID0gdGhpcy5faXRlcmFibGVEaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLml0ZXJhYmxlRGlmZmVyLmRpZmYodGhpcy5jaG9vc2VySXRlbXMpO1xuICAgICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy50b3BGb3JCb3R0b20gPSBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzIC0gNjkgLSAxMDAgKiBNYXRoLmNlaWwodGhpcy5jaG9vc2VySXRlbXMubGVuZ3RoIC8gMyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRhcChpdGVtKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RJdGVtLmVtaXQoaXRlbSk7XG4gICAgICAgIHRoaXMuQ2xvc2VDaG9vc2VyKClcbiAgICB9XG5cbiAgICBDbG9zZUNob29zZXIoKSB7XG4gICAgICAgIHRoaXMub25DbG9zZUNob29zZXIuZW1pdCgpO1xuICAgIH1cblxuICAgIG9uVGFwKCkge1xuXG4gICAgfVxufSJdfQ==
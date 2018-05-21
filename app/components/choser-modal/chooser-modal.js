"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform");
var application = require("application");
var application_1 = require("application");
var ChooserComponent = /** @class */ (function () {
    function ChooserComponent(_iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.itemWidth = (platform_1.screen.mainScreen.widthDIPs - 10) / 3;
        this.screenHeight = platform_1.screen.mainScreen.heightDIPs;
        this.screenWidth = platform_1.screen.mainScreen.widthDIPs;
        this.chooserItems = [];
        this.onSelectItem = new core_1.EventEmitter();
        this.topForBottom = platform_1.screen.mainScreen.heightDIPs - 69 - 100;
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            console.log("CloseChooser");
            data.cancel = true;
            application.android.off(application_1.AndroidApplication.activityBackPressedEvent);
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
    };
    ChooserComponent.prototype.CloseChooser = function () {
        console.log("CloseChooser");
    };
    ChooserComponent.prototype.onTap = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ChooserComponent.prototype, "chooserItems", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChooserComponent.prototype, "onSelectItem", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNob29zZXItbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0c7QUFFL0csc0RBQW1EO0FBRW5ELHlDQUEyQztBQUMzQywyQ0FBc0Y7QUFRdEY7SUFRSSwwQkFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFQckQsY0FBUyxHQUFHLENBQUMsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUMzQyxnQkFBVyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNqQixpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMvRCxpQkFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBR25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztZQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFrQixDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTFHLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLElBQUk7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUVELGdDQUFLLEdBQUw7SUFFQSxDQUFDO0lBL0JRO1FBQVIsWUFBSyxFQUFFOzswREFBbUI7SUFDakI7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7MERBQTJCO0lBTHRELGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHNCQUFzQjtTQUNuQyxDQUFDO3lDQVN3QyxzQkFBZTtPQVI1QyxnQkFBZ0IsQ0FvQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXBDRCxJQW9DQztBQXBDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBJdGVyYWJsZURpZmZlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnNvbHV0ZUxheW91dH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIjtcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcImFwcC1jaG9vc2VyLW1vZGFsXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hvb3Nlci1tb2RhbC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIENob29zZXJDb21wb25lbnQge1xuICAgIGl0ZW1XaWR0aCA9IChzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMtMTApLzM7XG4gICAgc2NyZWVuSGVpZ2h0ID0gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQc1xuICAgIHNjcmVlbldpZHRoID0gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgIEBJbnB1dCgpIGNob29zZXJJdGVtcyA9IFtdO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdEl0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRvcEZvckJvdHRvbSA9IHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHMgLSA2OSAtIDEwMDtcbiAgICBpdGVyYWJsZURpZmZlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgICAgICB0aGlzLml0ZXJhYmxlRGlmZmVyID0gdGhpcy5faXRlcmFibGVEaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoZGF0YTogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2xvc2VDaG9vc2VyXCIpXG4gICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9mZihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMuY2hvb3Nlckl0ZW1zKTtcbiAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMudG9wRm9yQm90dG9tID0gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcyAtIDY5IC0gMTAwICogTWF0aC5jZWlsKHRoaXMuY2hvb3Nlckl0ZW1zLmxlbmd0aCAvIDMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1UYXAoaXRlbSkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0SXRlbS5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIENsb3NlQ2hvb3NlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDbG9zZUNob29zZXJcIilcbiAgICB9XG5cbiAgICBvblRhcCgpIHtcblxuICAgIH1cbn0iXX0=
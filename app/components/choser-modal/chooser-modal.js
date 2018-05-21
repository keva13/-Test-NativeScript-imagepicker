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
        setInterval(function () { console.log(_this.isVisible); }, 1000);
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            if (_this.isVisible) {
                data.cancel = true;
            }
            console.log(_this.isVisible);
            _this.CloseChooser();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNob29zZXItbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0c7QUFFL0csc0RBQW1EO0FBRW5ELHlDQUEyQztBQUMzQywyQ0FBc0Y7QUFRdEY7SUFVSSwwQkFBb0IsZ0JBQWlDO1FBQXJELGlCQVVDO1FBVm1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFUckQsY0FBUyxHQUFHLENBQUMsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUMzQyxnQkFBVyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVqQixpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNyRCxtQkFBYyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNqRSxpQkFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBR25ELFdBQVcsQ0FBQyxjQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztZQUMxRyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFMUcsQ0FBQztJQUNMLENBQUM7SUFFRCxvQ0FBUyxHQUFULFVBQVUsSUFBSTtRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFLLEdBQUw7SUFFQSxDQUFDO0lBckNRO1FBQVIsWUFBSyxFQUFFOzswREFBbUI7SUFDbEI7UUFBUixZQUFLLEVBQUU7O3VEQUFXO0lBQ1Q7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7MERBQTJCO0lBQ3JEO1FBQVQsYUFBTSxFQUFFO2tDQUFpQixtQkFBWTs0REFBMkI7SUFQeEQsZ0JBQWdCO1FBTDVCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1NBQ25DLENBQUM7eUNBV3dDLHNCQUFlO09BVjVDLGdCQUFnQixDQTBDNUI7SUFBRCx1QkFBQztDQUFBLEFBMUNELElBMENDO0FBMUNZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEl0ZXJhYmxlRGlmZmVycyB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic29sdXRlTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2Fic29sdXRlLWxheW91dFwiO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiYXBwLWNob29zZXItbW9kYWxcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9jaG9vc2VyLW1vZGFsLmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQ2hvb3NlckNvbXBvbmVudCB7XG4gICAgaXRlbVdpZHRoID0gKHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcy0xMCkvMztcbiAgICBzY3JlZW5IZWlnaHQgPSBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzXG4gICAgc2NyZWVuV2lkdGggPSBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHM7XG4gICAgQElucHV0KCkgY2hvb3Nlckl0ZW1zID0gW107XG4gICAgQElucHV0KCkgaXNWaXNpYmxlO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdEl0ZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlQ2hvb3NlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdG9wRm9yQm90dG9tID0gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcyAtIDY5IC0gMTAwO1xuICAgIGl0ZXJhYmxlRGlmZmVyO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2l0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtjb25zb2xlLmxvZyh0aGlzLmlzVmlzaWJsZSl9LDEwMDApXG4gICAgICAgIHRoaXMuaXRlcmFibGVEaWZmZXIgPSB0aGlzLl9pdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLkNsb3NlQ2hvb3NlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMuY2hvb3Nlckl0ZW1zKTtcbiAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMudG9wRm9yQm90dG9tID0gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcyAtIDY5IC0gMTAwICogTWF0aC5jZWlsKHRoaXMuY2hvb3Nlckl0ZW1zLmxlbmd0aCAvIDMpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1UYXAoaXRlbSkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0SXRlbS5lbWl0KGl0ZW0pO1xuICAgICAgICB0aGlzLkNsb3NlQ2hvb3NlcigpXG4gICAgfVxuXG4gICAgQ2xvc2VDaG9vc2VyKCkge1xuICAgICAgICB0aGlzLm9uQ2xvc2VDaG9vc2VyLmVtaXQoKTtcbiAgICB9XG5cbiAgICBvblRhcCgpIHtcblxuICAgIH1cbn0iXX0=
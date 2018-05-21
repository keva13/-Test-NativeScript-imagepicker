"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var chooser_service_1 = require("../services/chooser.service");
var observable_1 = require("tns-core-modules/data/observable");
var imageSourceModule = require("tns-core-modules/image-source");
var fileSystemModule = require("tns-core-modules/file-system");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(_page, _chooserService) {
        this._page = _page;
        this._chooserService = _chooserService;
        this.myImageSource = { icon: '', name: '' };
        this.chooserItems = [];
        this.showChooser = false;
        this.viewModel = new observable_1.Observable();
        _page.bindingContext = this.viewModel;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () { console.log(_this.showChooser); }, 1000);
        this._page.actionBarHidden = true;
    };
    ItemsComponent.prototype.ngAfterViewInit = function () {
        var folder = fileSystemModule.knownFolders.currentApp();
        var path = fileSystemModule.path.join(folder.path, "images/avatar-user.png");
        var imageFromLocalFile = imageSourceModule.fromFile(path).toBase64String("png");
        this.viewModel.set("imageSource", 'data:image/png;base64,' + imageFromLocalFile);
        this.userImage.nativeElement.src = this.viewModel.get("imageSource");
    };
    ItemsComponent.prototype.openChooser = function () {
        this.chooserItems = [];
        this._chooserService.getChooserItems(this.chooserItems);
        this.showChooser = true;
    };
    ItemsComponent.prototype.onSelectChooserItem = function (item) {
        var _this = this;
        this._chooserService.getImageFromIntent(item, 500, 500).then(function (data) {
            _this.viewModel.set("imageSource", 'data:image/jpeg;base64,' + data);
            _this.userImage.nativeElement.src = 'data:image/jpeg;base64,' + data;
            _this.closeChooser();
        });
    };
    ItemsComponent.prototype.closeChooser = function () {
        this.showChooser = false;
    };
    __decorate([
        core_1.ViewChild('userImage'),
        __metadata("design:type", core_1.ElementRef)
    ], ItemsComponent.prototype, "userImage", void 0);
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [page_1.Page, chooser_service_1.ChooserService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXNGO0FBQ3RGLGlEQUE4QztBQUM5QywrREFBNkQ7QUFDN0QsK0RBQThEO0FBQzlELGlFQUFtRTtBQUNuRSwrREFBaUU7QUFRakU7SUFPSSx3QkFBb0IsS0FBVyxFQUFVLGVBQStCO1FBQXBELFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFOeEUsa0JBQWEsR0FBRyxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBUSxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUk5QixLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLFdBQVcsQ0FBQyxjQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUV0QyxDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUNJLElBQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxRCxJQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUMvRSxJQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCw0Q0FBbUIsR0FBbkIsVUFBb0IsSUFBSTtRQUF4QixpQkFNQztRQUxHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQzdELEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNwRSxLQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1lBQ3BFLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQXBDdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7cURBQUM7SUFMckMsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FRNkIsV0FBSSxFQUEyQixnQ0FBYztPQVAvRCxjQUFjLENBMEMxQjtJQUFELHFCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7QUExQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgQ2hvb3NlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvY2hvb3Nlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGZpbGVTeXN0ZW1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgbXlJbWFnZVNvdXJjZSA9IHtpY29uOicnLCBuYW1lOiAnJ307XG4gICAgY2hvb3Nlckl0ZW1zID0gW107XG4gICAgc2hvd0Nob29zZXIgPSBmYWxzZTtcbiAgICB2aWV3TW9kZWw6IGFueSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgQFZpZXdDaGlsZCgndXNlckltYWdlJykgdXNlckltYWdlOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfY2hvb3NlclNlcnZpY2U6IENob29zZXJTZXJ2aWNlKSB7XG4gICAgICAgIF9wYWdlLmJpbmRpbmdDb250ZXh0ID0gdGhpcy52aWV3TW9kZWw7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtjb25zb2xlLmxvZyh0aGlzLnNob3dDaG9vc2VyKX0sMTAwMClcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBmaWxlU3lzdGVtTW9kdWxlLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCk7XG4gICAgICAgIGNvbnN0IHBhdGggPSBmaWxlU3lzdGVtTW9kdWxlLnBhdGguam9pbihmb2xkZXIucGF0aCwgXCJpbWFnZXMvYXZhdGFyLXVzZXIucG5nXCIpO1xuICAgICAgICBjb25zdCBpbWFnZUZyb21Mb2NhbEZpbGUgPSBpbWFnZVNvdXJjZU1vZHVsZS5mcm9tRmlsZShwYXRoKS50b0Jhc2U2NFN0cmluZyhcInBuZ1wiKTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwuc2V0KFwiaW1hZ2VTb3VyY2VcIiwgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICsgaW1hZ2VGcm9tTG9jYWxGaWxlKTtcbiAgICAgICAgdGhpcy51c2VySW1hZ2UubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLnZpZXdNb2RlbC5nZXQoXCJpbWFnZVNvdXJjZVwiKTtcbiAgICB9XG5cbiAgICBvcGVuQ2hvb3NlcigpIHtcbiAgICAgICAgdGhpcy5jaG9vc2VySXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY2hvb3NlclNlcnZpY2UuZ2V0Q2hvb3Nlckl0ZW1zKHRoaXMuY2hvb3Nlckl0ZW1zKTtcbiAgICAgICAgdGhpcy5zaG93Q2hvb3NlciA9IHRydWU7XG4gICAgfVxuXG4gICAgb25TZWxlY3RDaG9vc2VySXRlbShpdGVtKSB7XG4gICAgICAgIHRoaXMuX2Nob29zZXJTZXJ2aWNlLmdldEltYWdlRnJvbUludGVudChpdGVtLCA1MDAsNTAwKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC5zZXQoXCJpbWFnZVNvdXJjZVwiLCAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnVzZXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9ICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBkYXRhO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUNob29zZXIoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbG9zZUNob29zZXIoKSB7XG4gICAgICAgIHRoaXMuc2hvd0Nob29zZXIgPSBmYWxzZTtcbiAgICB9XG59Il19
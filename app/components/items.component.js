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
        this._chooserService.getChooserItems(this.chooserItems);
        this.showChooser = true;
    };
    ItemsComponent.prototype.onSelectChooserItem = function (item) {
        var _this = this;
        this._chooserService.getImageFromIntent(item, 500, 500).then(function (data) {
            _this.viewModel.set("imageSource", 'data:image/jpeg;base64,' + data);
            _this.userImage.nativeElement.src = 'data:image/jpeg;base64,' + data;
            _this.showChooser = false;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXNGO0FBQ3RGLGlEQUE4QztBQUM5QywrREFBNkQ7QUFDN0QsK0RBQThEO0FBQzlELGlFQUFtRTtBQUNuRSwrREFBaUU7QUFRakU7SUFPSSx3QkFBb0IsS0FBVyxFQUFVLGVBQStCO1FBQXBELFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFOeEUsa0JBQWEsR0FBRyxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBUSxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUk5QixLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFFdEMsQ0FBQztJQUVELHdDQUFlLEdBQWY7UUFDSSxJQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUQsSUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDL0UsSUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsNENBQW1CLEdBQW5CLFVBQW9CLElBQUk7UUFBeEIsaUJBTUM7UUFMRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtZQUM3RCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUseUJBQXlCLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDcEUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLHlCQUF5QixHQUFHLElBQUksQ0FBQztZQUNwRSxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUE5QnVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3FEQUFDO0lBTHJDLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBUTZCLFdBQUksRUFBMkIsZ0NBQWM7T0FQL0QsY0FBYyxDQW9DMUI7SUFBRCxxQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IENob29zZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2Nob29zZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBmaWxlU3lzdGVtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIG15SW1hZ2VTb3VyY2UgPSB7aWNvbjonJywgbmFtZTogJyd9O1xuICAgIGNob29zZXJJdGVtcyA9IFtdO1xuICAgIHNob3dDaG9vc2VyID0gZmFsc2U7XG4gICAgdmlld01vZGVsOiBhbnkgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgIEBWaWV3Q2hpbGQoJ3VzZXJJbWFnZScpIHVzZXJJbWFnZTogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX2Nob29zZXJTZXJ2aWNlOiBDaG9vc2VyU2VydmljZSkge1xuICAgICAgICBfcGFnZS5iaW5kaW5nQ29udGV4dCA9IHRoaXMudmlld01vZGVsO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGZpbGVTeXN0ZW1Nb2R1bGUua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKTtcbiAgICAgICAgY29uc3QgcGF0aCA9IGZpbGVTeXN0ZW1Nb2R1bGUucGF0aC5qb2luKGZvbGRlci5wYXRoLCBcImltYWdlcy9hdmF0YXItdXNlci5wbmdcIik7XG4gICAgICAgIGNvbnN0IGltYWdlRnJvbUxvY2FsRmlsZSA9IGltYWdlU291cmNlTW9kdWxlLmZyb21GaWxlKHBhdGgpLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIpO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbC5zZXQoXCJpbWFnZVNvdXJjZVwiLCAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBpbWFnZUZyb21Mb2NhbEZpbGUpO1xuICAgICAgICB0aGlzLnVzZXJJbWFnZS5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMudmlld01vZGVsLmdldChcImltYWdlU291cmNlXCIpO1xuICAgIH1cblxuICAgIG9wZW5DaG9vc2VyKCkge1xuICAgICAgICB0aGlzLl9jaG9vc2VyU2VydmljZS5nZXRDaG9vc2VySXRlbXModGhpcy5jaG9vc2VySXRlbXMpO1xuICAgICAgICB0aGlzLnNob3dDaG9vc2VyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblNlbGVjdENob29zZXJJdGVtKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5fY2hvb3NlclNlcnZpY2UuZ2V0SW1hZ2VGcm9tSW50ZW50KGl0ZW0sIDUwMCw1MDApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnNldChcImltYWdlU291cmNlXCIsICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMudXNlckltYWdlLm5hdGl2ZUVsZW1lbnQuc3JjID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGRhdGE7XG4gICAgICAgICAgICB0aGlzLnNob3dDaG9vc2VyID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgfVxufSJdfQ==
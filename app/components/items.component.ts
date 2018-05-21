
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Page} from "tns-core-modules/ui/page";
import { ChooserService } from "../services/chooser.service";
import { Observable } from "tns-core-modules/data/observable";
import * as imageSourceModule from "tns-core-modules/image-source";
import * as fileSystemModule from "tns-core-modules/file-system";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit, AfterViewInit {
    myImageSource = {icon:'', name: ''};
    chooserItems = [];
    showChooser = false;
    viewModel: any = new Observable();
    @ViewChild('userImage') userImage: ElementRef;

    constructor(private _page: Page, private _chooserService: ChooserService) {
        _page.bindingContext = this.viewModel;
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;

    }

    ngAfterViewInit() {
        const folder = fileSystemModule.knownFolders.currentApp();
        const path = fileSystemModule.path.join(folder.path, "images/avatar-user.png");
        const imageFromLocalFile = imageSourceModule.fromFile(path).toBase64String("png");
        this.viewModel.set("imageSource", 'data:image/png;base64,' + imageFromLocalFile);
        this.userImage.nativeElement.src = this.viewModel.get("imageSource");
    }

    openChooser() {
        this.chooserItems = [];
        this._chooserService.getChooserItems(this.chooserItems);
        this.showChooser = true;
    }

    onSelectChooserItem(item) {
        this._chooserService.getImageFromIntent(item, 500,500).then((data) => {
            this.viewModel.set("imageSource", 'data:image/jpeg;base64,' + data);
            this.userImage.nativeElement.src = 'data:image/jpeg;base64,' + data;
            this.closeChooser();
        })
    }

    closeChooser() {
        this.showChooser = false;
    }
}
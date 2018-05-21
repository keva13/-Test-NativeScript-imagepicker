import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, IterableDiffers } from "@angular/core";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import { screen } from "tns-core-modules/platform";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";


@Component({
	selector: "app-chooser-modal",
	moduleId: module.id,
	templateUrl: "./chooser-modal.html",
})
export class ChooserComponent {
    itemWidth = (screen.mainScreen.widthDIPs-10)/3;
    screenHeight = screen.mainScreen.heightDIPs
    screenWidth = screen.mainScreen.widthDIPs;
    @Input() chooserItems = [];
    @Output() onSelectItem: EventEmitter<any> = new EventEmitter();
    topForBottom = screen.mainScreen.heightDIPs - 69 - 100;
    iterableDiffer;
    constructor(private _iterableDiffers: IterableDiffers) {
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            console.log("CloseChooser")
            data.cancel = true;
            application.android.off(AndroidApplication.activityBackPressedEvent)
        });
    }

    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.chooserItems);
        if (changes) {
            this.topForBottom = screen.mainScreen.heightDIPs - 69 - 100 * Math.ceil(this.chooserItems.length / 3);

        }
    }

    onItemTap(item) {
        this.onSelectItem.emit(item);
    }

    CloseChooser() {
        console.log("CloseChooser")
    }

    onTap() {

    }
}
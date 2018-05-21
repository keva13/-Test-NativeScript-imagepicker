"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application = require("tns-core-modules/application");
var imageSourceModule = require("tns-core-modules/image-source");
var fileSystemModule = require("tns-core-modules/file-system");
var utils_1 = require("tns-core-modules/utils/utils");
var RESULT_CODE_PICKER_IMAGES = 9192;
var context = utils_1.ad.getApplicationContext();
var documents = fileSystemModule.knownFolders.documents();
var folder = documents.getFolder(fileSystemModule.knownFolders.temp().path);
var file = folder.getFile('test.jpg');
var ChooserService = /** @class */ (function () {
    function ChooserService() {
        this.width = 500;
        this.height = 500;
    }
    ChooserService.prototype.getChooserItems = function (intentList) {
        // let gallery = new android.content.Intent(android.content.Intent.ACTION_PICK,
        //     android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        // gallery.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        // gallery.putExtra("return-data", true);
        var gallery = new android.content.Intent(android.content.Intent.ACTION_PICK);
        gallery.setType("image/*");
        // gallery.putExtra("crop", "true");
        // gallery.putExtra("scale", false);
        // gallery.putExtra("outputX", 256);
        // gallery.putExtra("outputY", 256);
        // gallery.putExtra("aspectX", 1);
        // gallery.putExtra("aspectY", 1);
        gallery.putExtra("return-data", true);
        var camera = new android.content.Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
        camera.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, android.net.Uri.fromFile(new java.io.File(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).getAbsolutePath().toString() + "/Test.jpg")));
        camera.putExtra("return-data", true);
        intentList = this.addIntentsToList(context, intentList, gallery);
        intentList = this.addIntentsToList(context, intentList, camera);
        console.log(intentList.length);
        console.log(intentList[0].icon);
    };
    ChooserService.prototype.addIntentsToList = function (context, list, intent) {
        var resInfo = context.getPackageManager().queryIntentActivities(intent, 0);
        var size = resInfo.size();
        for (var i = 0; i < size; i++) {
            var packageName = resInfo.get(i).activityInfo.packageName;
            var targetedIntent = new android.content.Intent(intent);
            targetedIntent.packageName = packageName;
            targetedIntent.icon = context.getPackageManager().getApplicationIcon(packageName).getBitmap();
            targetedIntent.label = context.getPackageManager().getApplicationLabel(context.getPackageManager().getApplicationInfo(packageName, 0));
            targetedIntent.setPackage(packageName);
            list.push(targetedIntent);
        }
        return list;
    };
    ChooserService.prototype.getImageFromIntent = function (intent, width, height) {
        var _this = this;
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 500; }
        this.width = width;
        this.height = height;
        this.currentIntent = intent.packageName;
        return new Promise(function (resolve, reject) {
            application.android.on(application.AndroidApplication.activityResultEvent, function (args) {
                _this.onResult(args).then(function (data) {
                    resolve(data);
                });
            });
            application.android.foregroundActivity.startActivityForResult(intent, RESULT_CODE_PICKER_IMAGES);
        });
    };
    ChooserService.prototype.onResult = function (args) {
        var _this = this;
        console.log('point0');
        return new Promise(function (resolve, reject) {
            var requestCode = args.requestCode;
            var resultCode = args.resultCode;
            var data = args.intent;
            if (requestCode === RESULT_CODE_PICKER_IMAGES) {
                console.log('point1');
                if (resultCode === android.app.Activity.RESULT_OK) {
                    console.log('point2');
                    console.log(args.intent);
                    var path = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).getAbsolutePath().toString() + "/Test.jpg";
                    console.log(_this.currentIntent);
                    if (_this.currentIntent.length && _this.currentIntent.indexOf('camera') === -1) {
                        imageSourceModule.fromFile(_this._calculateFileUri(data.getData())).saveToFile(path, "jpg", 100);
                    }
                    if (_this.currentIntent.length) {
                        _this.currentIntent = '';
                        _this.takePicture(path);
                        return;
                    }
                    var uri = data.getExtras().getParcelable("data");
                    console.log('getExtras');
                    // let selectedAsset = new imageAssetModule.ImageAsset(this._calculateFileUri(uri));
                    // application.android.off(application.AndroidApplication.activityResultEvent, this.onResult);
                    resolve(imageSourceModule.fromNativeSource(uri).toBase64String("jpg"));
                    // console.log();
                    // console.log(imageSourceModule.fromFile(this._calculateFileUri(uri)).toBase64String("jpg"));
                    application.android.off(application.AndroidApplication.activityResultEvent);
                }
            }
        });
    };
    ChooserService.prototype.takePicture = function (uri) {
        console.log(imageSourceModule.fromFile(new java.io.File(uri)));
        var takePictureIntent = new android.content.Intent("com.android.camera.action.CROP");
        takePictureIntent.setDataAndType(android.net.Uri.fromFile(new java.io.File(uri)), "image/*");
        takePictureIntent.putExtra("crop", "true");
        takePictureIntent.putExtra("aspectX", 1);
        takePictureIntent.putExtra("aspectY", 1);
        takePictureIntent.putExtra("outputX", this.width);
        takePictureIntent.putExtra("outputY", this.height);
        takePictureIntent.putExtra("return-data", true);
        application.android.foregroundActivity.startActivityForResult(this.addIntentsToList(context, [], takePictureIntent)[0], RESULT_CODE_PICKER_IMAGES);
    };
    ChooserService.prototype._calculateFileUri = function (uri) {
        var DocumentsContract = android.provider.DocumentsContract;
        var isKitKat = android.os.Build.VERSION.SDK_INT >= 19;
        if (isKitKat && DocumentsContract.isDocumentUri(application.android.context, uri)) {
            var docId = void 0, id = void 0, type = void 0;
            var contentUri = null;
            // ExternalStorageProvider
            if (this.isExternalStorageDocument(uri)) {
                docId = DocumentsContract.getDocumentId(uri);
                id = docId.split(":")[1];
                type = docId.split(":")[0];
                if ("primary" === type.toLowerCase()) {
                    return android.os.Environment.getExternalStorageDirectory() + "/" + id;
                }
                // TODO handle non-primary volumes
            }
        }
        else {
            // MediaStore (and general)
            if ("content" === uri.getScheme()) {
                return this.getDataColumn(uri, null, null);
            }
            else if ("file" === uri.getScheme()) {
                return uri.getPath();
            }
        }
        return undefined;
    };
    ChooserService.prototype.getDataColumn = function (uri, selection, selectionArgs) {
        var cursor = null;
        var columns = [android.provider.MediaStore.MediaColumns.DATA];
        var filePath;
        try {
            cursor = this.getContentResolver().query(uri, columns, selection, selectionArgs, null);
            if (cursor != null && cursor.moveToFirst()) {
                var column_index = cursor.getColumnIndexOrThrow(columns[0]);
                filePath = cursor.getString(column_index);
                if (filePath) {
                    return filePath;
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            if (cursor) {
                cursor.close();
            }
        }
        return undefined;
    };
    ChooserService.prototype.isExternalStorageDocument = function (uri) {
        return "com.android.externalstorage.documents" === uri.getAuthority();
    };
    ChooserService.prototype.isDownloadsDocument = function (uri) {
        return "com.android.providers.downloads.documents" === uri.getAuthority();
    };
    ChooserService.prototype.isMediaDocument = function (uri) {
        return "com.android.providers.media.documents" === uri.getAuthority();
    };
    ChooserService.prototype.getContentResolver = function () {
        return application.android.nativeApp.getContentResolver();
    };
    ChooserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ChooserService);
    return ChooserService;
}());
exports.ChooserService = ChooserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hvb3Nlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBEQUE0RDtBQUM1RCxpRUFBbUU7QUFDbkUsK0RBQWlFO0FBQ2pFLHNEQUFnRDtBQUdoRCxJQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQztBQUN2QyxJQUFNLE9BQU8sR0FBRyxVQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUMzQyxJQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDNUQsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUUsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUd4QztJQUtJO1FBSEEsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUNaLFdBQU0sR0FBRyxHQUFHLENBQUM7SUFHYixDQUFDO0lBRUQsd0NBQWUsR0FBZixVQUFnQixVQUFVO1FBRXRCLCtFQUErRTtRQUMvRSxzRUFBc0U7UUFDdEUsbUVBQW1FO1FBQ25FLHlDQUF5QztRQUN6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0Isb0NBQW9DO1FBQ3BDLG9DQUFvQztRQUNwQyxvQ0FBb0M7UUFDcEMsb0NBQW9DO1FBQ3BDLGtDQUFrQztRQUNsQyxrQ0FBa0M7UUFDbEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFHdEMsSUFBSSxN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QyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDO2dCQUNPLENBQUM7WUFDTCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELGtEQUF5QixHQUF6QixVQUEwQixHQUFHO1FBQ3pCLE1BQU0sQ0FBQyx1Q0FBdUMsS0FBSyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUUsQ0FBQztJQUVELDRDQUFtQixHQUFuQixVQUFvQixHQUFHO1FBQ25CLE1BQU0sQ0FBQywyQ0FBMkMsS0FBSyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUUsQ0FBQztJQUVELHdDQUFlLEdBQWYsVUFBZ0IsR0FBRztRQUNmLE1BQU0sQ0FBQyx1Q0FBdUMsS0FBSyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUUsQ0FBQztJQUVELDJDQUFrQixHQUFsQjtRQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlELENBQUM7SUFsTVEsY0FBYztRQUQxQixpQkFBVSxFQUFFOztPQUNBLGNBQWMsQ0FtTTFCO0lBQUQscUJBQUM7Q0FBQSxBQW5NRCxJQW1NQztBQW5NWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGZpbGVTeXN0ZW1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCB7YWR9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCI7XG5kZWNsYXJlIHZhciBhbmRyb2lkOiBhbnlcbmRlY2xhcmUgdmFyIGphdmE6IGFueVxuY29uc3QgUkVTVUxUX0NPREVfUElDS0VSX0lNQUdFUyA9IDkxOTI7XG5jb25zdCBjb250ZXh0ID0gYWQuZ2V0QXBwbGljYXRpb25Db250ZXh0KCk7XG5jb25zdCBkb2N1bWVudHMgPSBmaWxlU3lzdGVtTW9kdWxlLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcbmNvbnN0IGZvbGRlciA9IGRvY3VtZW50cy5nZXRGb2xkZXIoZmlsZVN5c3RlbU1vZHVsZS5rbm93bkZvbGRlcnMudGVtcCgpLnBhdGgpO1xuY29uc3QgZmlsZSA9IGZvbGRlci5nZXRGaWxlKCd0ZXN0LmpwZycpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hvb3NlclNlcnZpY2V7XG4gICAgY3VycmVudEludGVudDtcbiAgICB3aWR0aCA9IDUwMDtcbiAgICBoZWlnaHQgPSA1MDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDaG9vc2VySXRlbXMoaW50ZW50TGlzdCkge1xuXG4gICAgICAgIC8vIGxldCBnYWxsZXJ5ID0gbmV3IGFuZHJvaWQuY29udGVudC5JbnRlbnQoYW5kcm9pZC5jb250ZW50LkludGVudC5BQ1RJT05fUElDSyxcbiAgICAgICAgLy8gICAgIGFuZHJvaWQucHJvdmlkZXIuTWVkaWFTdG9yZS5JbWFnZXMuTWVkaWEuRVhURVJOQUxfQ09OVEVOVF9VUkkpO1xuICAgICAgICAvLyBnYWxsZXJ5LmFkZEZsYWdzKGFuZHJvaWQuY29udGVudC5JbnRlbnQuRkxBR19BQ1RJVklUWV9ORVdfVEFTSyk7XG4gICAgICAgIC8vIGdhbGxlcnkucHV0RXh0cmEoXCJyZXR1cm4tZGF0YVwiLCB0cnVlKTtcbiAgICAgICAgbGV0IGdhbGxlcnkgPSBuZXcgYW5kcm9pZC5jb250ZW50LkludGVudChhbmRyb2lkLmNvbnRlbnQuSW50ZW50LkFDVElPTl9QSUNLKTtcbiAgICAgICAgZ2FsbGVyeS5zZXRUeXBlKFwiaW1hZ2UvKlwiKTtcbiAgICAgICAgLy8gZ2FsbGVyeS5wdXRFeHRyYShcImNyb3BcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAvLyBnYWxsZXJ5LnB1dEV4dHJhKFwic2NhbGVcIiwgZmFsc2UpO1xuICAgICAgICAvLyBnYWxsZXJ5LnB1dEV4dHJhKFwib3V0cHV0WFwiLCAyNTYpO1xuICAgICAgICAvLyBnYWxsZXJ5LnB1dEV4dHJhKFwib3V0cHV0WVwiLCAyNTYpO1xuICAgICAgICAvLyBnYWxsZXJ5LnB1dEV4dHJhKFwiYXNwZWN0WFwiLCAxKTtcbiAgICAgICAgLy8gZ2FsbGVyeS5wdXRFeHRyYShcImFzcGVjdFlcIiwgMSk7XG4gICAgICAgIGdhbGxlcnkucHV0RXh0cmEoXCJyZXR1cm4tZGF0YVwiLCB0cnVlKTtcblxuXG4gICAgICAgIGxldCBjYW1lcmEgPSBuZXcgYW5kcm9pZC5jb250ZW50LkludGVudChhbmRyb2lkLnByb3ZpZGVyLk1lZGlhU3RvcmUuQUNUSU9OX0lNQUdFX0NBUFRVUkUpO1xuICAgICAgICBjYW1lcmEucHV0RXh0cmEoYW5kcm9pZC5wcm92aWRlci5NZWRpYVN0b3JlLkVYVFJBX09VVFBVVCwgYW5kcm9pZC5uZXQuVXJpLmZyb21GaWxlKG5ldyBqYXZhLmlvLkZpbGUoYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5nZXRFeHRlcm5hbFN0b3JhZ2VQdWJsaWNEaXJlY3RvcnkoYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5ESVJFQ1RPUllfUElDVFVSRVMpLmdldEFic29sdXRlUGF0aCgpLnRvU3RyaW5nKCkgKyBcIi9UZXN0LmpwZ1wiKSkpO1xuICAgICAgICBjYW1lcmEucHV0RXh0cmEoXCJyZXR1cm4tZGF0YVwiLCB0cnVlKTtcblxuICAgICAgICBpbnRlbnRMaXN0ID0gdGhpcy5hZGRJbnRlbnRzVG9MaXN0KGNvbnRleHQsIGludGVudExpc3QsIGdhbGxlcnkpO1xuICAgICAgICBpbnRlbnRMaXN0ID0gdGhpcy5hZGRJbnRlbnRzVG9MaXN0KGNvbnRleHQsIGludGVudExpc3QsIGNhbWVyYSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGludGVudExpc3QubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2coaW50ZW50TGlzdFswXS5pY29uKTtcblxuXG4gICAgfVxuXG4gICAgYWRkSW50ZW50c1RvTGlzdChjb250ZXh0LCBsaXN0LCBpbnRlbnQpIHtcblxuICAgICAgICBsZXQgcmVzSW5mbyA9IGNvbnRleHQuZ2V0UGFja2FnZU1hbmFnZXIoKS5xdWVyeUludGVudEFjdGl2aXRpZXMoaW50ZW50LCAwKVxuICAgICAgICB2YXIgc2l6ZSA9IHJlc0luZm8uc2l6ZSgpO1xuICAgICAgICBmb3IgKHZhciBpPTA7aTxzaXplO2krKykge1xuICAgICAgICAgICAgbGV0IHBhY2thZ2VOYW1lID0gcmVzSW5mby5nZXQoaSkuYWN0aXZpdHlJbmZvLnBhY2thZ2VOYW1lO1xuICAgICAgICAgICAgbGV0IHRhcmdldGVkSW50ZW50ID0gbmV3IGFuZHJvaWQuY29udGVudC5JbnRlbnQoaW50ZW50KTtcbiAgICAgICAgICAgIHRhcmdldGVkSW50ZW50LnBhY2thZ2VOYW1lID0gcGFja2FnZU5hbWU7XG4gICAgICAgICAgICB0YXJnZXRlZEludGVudC5pY29uID0gY29udGV4dC5nZXRQYWNrYWdlTWFuYWdlcigpLmdldEFwcGxpY2F0aW9uSWNvbihwYWNrYWdlTmFtZSkuZ2V0Qml0bWFwKCk7XG4gICAgICAgICAgICB0YXJnZXRlZEludGVudC5sYWJlbCA9IGNvbnRleHQuZ2V0UGFja2FnZU1hbmFnZXIoKS5nZXRBcHBsaWNhdGlvbkxhYmVsKGNvbnRleHQuZ2V0UGFja2FnZU1hbmFnZXIoKS5nZXRBcHBsaWNhdGlvbkluZm8ocGFja2FnZU5hbWUsIDApKTtcbiAgICAgICAgICAgIHRhcmdldGVkSW50ZW50LnNldFBhY2thZ2UocGFja2FnZU5hbWUpO1xuICAgICAgICAgICAgbGlzdC5wdXNoKHRhcmdldGVkSW50ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICBnZXRJbWFnZUZyb21JbnRlbnQoaW50ZW50LCB3aWR0aCA9IDUwMCwgaGVpZ2h0ID0gNTAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jdXJyZW50SW50ZW50ID0gaW50ZW50LnBhY2thZ2VOYW1lO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlSZXN1bHRFdmVudCwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVzdWx0KGFyZ3MpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5LnN0YXJ0QWN0aXZpdHlGb3JSZXN1bHQoaW50ZW50LCBSRVNVTFRfQ09ERV9QSUNLRVJfSU1BR0VTKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblJlc3VsdChhcmdzKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BvaW50MCcpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgcmVxdWVzdENvZGUgPSBhcmdzLnJlcXVlc3RDb2RlO1xuICAgICAgICAgICAgbGV0IHJlc3VsdENvZGUgPSBhcmdzLnJlc3VsdENvZGU7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGFyZ3MuaW50ZW50O1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RDb2RlID09PSBSRVNVTFRfQ09ERV9QSUNLRVJfSU1BR0VTKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BvaW50MScpXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdENvZGUgPT09IGFuZHJvaWQuYXBwLkFjdGl2aXR5LlJFU1VMVF9PSykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncG9pbnQyJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJncy5pbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5nZXRFeHRlcm5hbFN0b3JhZ2VQdWJsaWNEaXJlY3RvcnkoYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5ESVJFQ1RPUllfUElDVFVSRVMpLmdldEFic29sdXRlUGF0aCgpLnRvU3RyaW5nKCkgKyBcIi9UZXN0LmpwZ1wiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRJbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbnRlbnQubGVuZ3RoICYmIHRoaXMuY3VycmVudEludGVudC5pbmRleE9mKCdjYW1lcmEnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlU291cmNlTW9kdWxlLmZyb21GaWxlKHRoaXMuX2NhbGN1bGF0ZUZpbGVVcmkoZGF0YS5nZXREYXRhKCkpKS5zYXZlVG9GaWxlKHBhdGgsIFwianBnXCIsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SW50ZW50Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbnRlbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFrZVBpY3R1cmUocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHVyaSA9IGRhdGEuZ2V0RXh0cmFzKCkuZ2V0UGFyY2VsYWJsZShcImRhdGFcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEV4dHJhcycpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHNlbGVjdGVkQXNzZXQgPSBuZXcgaW1hZ2VBc3NldE1vZHVsZS5JbWFnZUFzc2V0KHRoaXMuX2NhbGN1bGF0ZUZpbGVVcmkodXJpKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFwcGxpY2F0aW9uLmFuZHJvaWQub2ZmKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eVJlc3VsdEV2ZW50LCB0aGlzLm9uUmVzdWx0KTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGltYWdlU291cmNlTW9kdWxlLmZyb21OYXRpdmVTb3VyY2UodXJpKS50b0Jhc2U2NFN0cmluZyhcImpwZ1wiKSlcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW1hZ2VTb3VyY2VNb2R1bGUuZnJvbUZpbGUodGhpcy5fY2FsY3VsYXRlRmlsZVVyaSh1cmkpKS50b0Jhc2U2NFN0cmluZyhcImpwZ1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub2ZmKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eVJlc3VsdEV2ZW50KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICB0YWtlUGljdHVyZSh1cmkpe1xuICAgICAgICBjb25zb2xlLmxvZyhpbWFnZVNvdXJjZU1vZHVsZS5mcm9tRmlsZShuZXcgamF2YS5pby5GaWxlKHVyaSkpKVxuICAgICAgICBsZXQgdGFrZVBpY3R1cmVJbnRlbnQgPSBuZXcgYW5kcm9pZC5jb250ZW50LkludGVudChcImNvbS5hbmRyb2lkLmNhbWVyYS5hY3Rpb24uQ1JPUFwiKTtcbiAgICAgICAgICAgIHRha2VQaWN0dXJlSW50ZW50LnNldERhdGFBbmRUeXBlKGFuZHJvaWQubmV0LlVyaS5mcm9tRmlsZShuZXcgamF2YS5pby5GaWxlKHVyaSkpLCBcImltYWdlLypcIik7XG4gICAgICAgICAgICB0YWtlUGljdHVyZUludGVudC5wdXRFeHRyYShcImNyb3BcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgdGFrZVBpY3R1cmVJbnRlbnQucHV0RXh0cmEoXCJhc3BlY3RYXCIsIDEpO1xuICAgICAgICAgICAgdGFrZVBpY3R1cmVJbnRlbnQucHV0RXh0cmEoXCJhc3BlY3RZXCIsIDEpO1xuICAgICAgICAgICAgdGFrZVBpY3R1cmVJbnRlbnQucHV0RXh0cmEoXCJvdXRwdXRYXCIsIHRoaXMud2lkdGgpO1xuICAgICAgICAgICAgdGFrZVBpY3R1cmVJbnRlbnQucHV0RXh0cmEoXCJvdXRwdXRZXCIsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRha2VQaWN0dXJlSW50ZW50LnB1dEV4dHJhKFwicmV0dXJuLWRhdGFcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eS5zdGFydEFjdGl2aXR5Rm9yUmVzdWx0KHRoaXMuYWRkSW50ZW50c1RvTGlzdChjb250ZXh0LCBbXSwgdGFrZVBpY3R1cmVJbnRlbnQpWzBdLCBSRVNVTFRfQ09ERV9QSUNLRVJfSU1BR0VTKTtcblxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVGaWxlVXJpKHVyaSkge1xuICAgICAgICBsZXQgRG9jdW1lbnRzQ29udHJhY3QgPSAoPGFueT5hbmRyb2lkLnByb3ZpZGVyKS5Eb2N1bWVudHNDb250cmFjdDtcbiAgICAgICAgbGV0IGlzS2l0S2F0ID0gYW5kcm9pZC5vcy5CdWlsZC5WRVJTSU9OLlNES19JTlQgPj0gMTk7XG4gICAgICAgIGlmIChpc0tpdEthdCAmJiBEb2N1bWVudHNDb250cmFjdC5pc0RvY3VtZW50VXJpKGFwcGxpY2F0aW9uLmFuZHJvaWQuY29udGV4dCwgdXJpKSkge1xuICAgICAgICAgICAgbGV0IGRvY0lkLCBpZCwgdHlwZTtcbiAgICAgICAgICAgIGxldCBjb250ZW50VXJpID0gbnVsbDtcbiAgICAgICAgICAgIC8vIEV4dGVybmFsU3RvcmFnZVByb3ZpZGVyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0V4dGVybmFsU3RvcmFnZURvY3VtZW50KHVyaSkpIHtcbiAgICAgICAgICAgICAgICBkb2NJZCA9IERvY3VtZW50c0NvbnRyYWN0LmdldERvY3VtZW50SWQodXJpKTtcbiAgICAgICAgICAgICAgICBpZCA9IGRvY0lkLnNwbGl0KFwiOlwiKVsxXTtcbiAgICAgICAgICAgICAgICB0eXBlID0gZG9jSWQuc3BsaXQoXCI6XCIpWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKFwicHJpbWFyeVwiID09PSB0eXBlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlRGlyZWN0b3J5KCkgKyBcIi9cIiArIGlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRPRE8gaGFuZGxlIG5vbi1wcmltYXJ5IHZvbHVtZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE1lZGlhU3RvcmUgKGFuZCBnZW5lcmFsKVxuICAgICAgICAgICAgaWYgKFwiY29udGVudFwiID09PSB1cmkuZ2V0U2NoZW1lKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhQ29sdW1uKHVyaSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGSUxFXG4gICAgICAgICAgICBlbHNlIGlmIChcImZpbGVcIiA9PT0gdXJpLmdldFNjaGVtZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVyaS5nZXRQYXRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldERhdGFDb2x1bW4odXJpLCBzZWxlY3Rpb24sIHNlbGVjdGlvbkFyZ3MpIHtcbiAgICAgICAgbGV0IGN1cnNvciA9IG51bGw7XG4gICAgICAgIGxldCBjb2x1bW5zID0gW2FuZHJvaWQucHJvdmlkZXIuTWVkaWFTdG9yZS5NZWRpYUNvbHVtbnMuREFUQV07XG4gICAgICAgIGxldCBmaWxlUGF0aDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY3Vyc29yID0gdGhpcy5nZXRDb250ZW50UmVzb2x2ZXIoKS5xdWVyeSh1cmksIGNvbHVtbnMsIHNlbGVjdGlvbiwgc2VsZWN0aW9uQXJncywgbnVsbCk7XG4gICAgICAgICAgICBpZiAoY3Vyc29yICE9IG51bGwgJiYgY3Vyc29yLm1vdmVUb0ZpcnN0KCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uX2luZGV4ID0gY3Vyc29yLmdldENvbHVtbkluZGV4T3JUaHJvdyhjb2x1bW5zWzBdKTtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IGN1cnNvci5nZXRTdHJpbmcoY29sdW1uX2luZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlzRXh0ZXJuYWxTdG9yYWdlRG9jdW1lbnQodXJpKSB7XG4gICAgICAgIHJldHVybiBcImNvbS5hbmRyb2lkLmV4dGVybmFsc3RvcmFnZS5kb2N1bWVudHNcIiA9PT0gdXJpLmdldEF1dGhvcml0eSgpO1xuICAgIH1cblxuICAgIGlzRG93bmxvYWRzRG9jdW1lbnQodXJpKSB7XG4gICAgICAgIHJldHVybiBcImNvbS5hbmRyb2lkLnByb3ZpZGVycy5kb3dubG9hZHMuZG9jdW1lbnRzXCIgPT09IHVyaS5nZXRBdXRob3JpdHkoKTtcbiAgICB9XG5cbiAgICBpc01lZGlhRG9jdW1lbnQodXJpKSB7XG4gICAgICAgIHJldHVybiBcImNvbS5hbmRyb2lkLnByb3ZpZGVycy5tZWRpYS5kb2N1bWVudHNcIiA9PT0gdXJpLmdldEF1dGhvcml0eSgpO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRSZXNvbHZlcigpIHtcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLmFuZHJvaWQubmF0aXZlQXBwLmdldENvbnRlbnRSZXNvbHZlcigpO1xuICAgIH1cbn0iXX0=
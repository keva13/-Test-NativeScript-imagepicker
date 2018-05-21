import { Injectable } from '@angular/core';
import * as application from "tns-core-modules/application";
import * as imageSourceModule from "tns-core-modules/image-source";
import * as fileSystemModule from "tns-core-modules/file-system";
import {ad} from "tns-core-modules/utils/utils";
declare var android: any
declare var java: any
const RESULT_CODE_PICKER_IMAGES = 9192;
const context = ad.getApplicationContext();
const documents = fileSystemModule.knownFolders.documents();
const folder = documents.getFolder(fileSystemModule.knownFolders.temp().path);
const file = folder.getFile('test.jpg');

@Injectable()
export class ChooserService{
    currentIntent;
    width = 500;
    height = 500;

    constructor() {
    }

    getChooserItems(intentList) {

        // let gallery = new android.content.Intent(android.content.Intent.ACTION_PICK,
        //     android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        // gallery.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        // gallery.putExtra("return-data", true);
        let gallery = new android.content.Intent(android.content.Intent.ACTION_PICK);
        gallery.setType("image/*");
        // gallery.putExtra("crop", "true");
        // gallery.putExtra("scale", false);
        // gallery.putExtra("outputX", 256);
        // gallery.putExtra("outputY", 256);
        // gallery.putExtra("aspectX", 1);
        // gallery.putExtra("aspectY", 1);
        gallery.putExtra("return-data", true);


        let camera = new android.content.Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
        camera.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, android.net.Uri.fromFile(new java.io.File(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).getAbsolutePath().toString() + "/Test.jpg")));
        camera.putExtra("return-data", true);

        intentList = this.addIntentsToList(context, intentList, gallery);
        intentList = this.addIntentsToList(context, intentList, camera);
        console.log(intentList.length);
        console.log(intentList[0].icon);


    }

    addIntentsToList(context, list, intent) {

        let resInfo = context.getPackageManager().queryIntentActivities(intent, 0)
        var size = resInfo.size();
        for (var i=0;i<size;i++) {
            let packageName = resInfo.get(i).activityInfo.packageName;
            let targetedIntent = new android.content.Intent(intent);
            targetedIntent.packageName = packageName;
            targetedIntent.icon = context.getPackageManager().getApplicationIcon(packageName).getBitmap();
            targetedIntent.label = context.getPackageManager().getApplicationLabel(context.getPackageManager().getApplicationInfo(packageName, 0));
            targetedIntent.setPackage(packageName);
            list.push(targetedIntent);
        }
        return list;
    }

    getImageFromIntent(intent, width = 500, height = 500): Promise<any> {
        this.width = width;
        this.height = height;
        this.currentIntent = intent.packageName;
        return new Promise((resolve, reject) => {
            application.android.on(application.AndroidApplication.activityResultEvent, (args) => {
                this.onResult(args).then((data) => {
                    resolve(data)
                })
            });
            application.android.foregroundActivity.startActivityForResult(intent, RESULT_CODE_PICKER_IMAGES);
        })
    }

    onResult(args): Promise<any> {
        console.log('point0');
        return new Promise((resolve, reject) => {

            let requestCode = args.requestCode;
            let resultCode = args.resultCode;
            let data = args.intent;
            if (requestCode === RESULT_CODE_PICKER_IMAGES) {
                console.log('point1')
                if (resultCode === android.app.Activity.RESULT_OK) {
                    console.log('point2')
                    console.log(args.intent)
                    let path = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).getAbsolutePath().toString() + "/Test.jpg";
                    console.log(this.currentIntent)
                    if (this.currentIntent.length && this.currentIntent.indexOf('camera') === -1) {
                        imageSourceModule.fromFile(this._calculateFileUri(data.getData())).saveToFile(path, "jpg", 100);
                    }

                    if (this.currentIntent.length){
                        this.currentIntent = '';
                        this.takePicture(path);
                        return;
                    }
                    let uri = data.getExtras().getParcelable("data")
                    console.log('getExtras')

                    // let selectedAsset = new imageAssetModule.ImageAsset(this._calculateFileUri(uri));
                    // application.android.off(application.AndroidApplication.activityResultEvent, this.onResult);

                    resolve(imageSourceModule.fromNativeSource(uri).toBase64String("jpg"))
                    // console.log();
                    // console.log(imageSourceModule.fromFile(this._calculateFileUri(uri)).toBase64String("jpg"));

                    }
            }
        })

    }

    takePicture(uri){
        console.log(imageSourceModule.fromFile(new java.io.File(uri)))
        let takePictureIntent = new android.content.Intent("com.android.camera.action.CROP");
            takePictureIntent.setDataAndType(android.net.Uri.fromFile(new java.io.File(uri)), "image/*");
            takePictureIntent.putExtra("crop", "true");
            takePictureIntent.putExtra("aspectX", 1);
            takePictureIntent.putExtra("aspectY", 1);
            takePictureIntent.putExtra("outputX", this.width);
            takePictureIntent.putExtra("outputY", this.height);
            takePictureIntent.putExtra("return-data", true);
            application.android.foregroundActivity.startActivityForResult(this.addIntentsToList(context, [], takePictureIntent)[0], RESULT_CODE_PICKER_IMAGES);

    }

    _calculateFileUri(uri) {
        let DocumentsContract = (<any>android.provider).DocumentsContract;
        let isKitKat = android.os.Build.VERSION.SDK_INT >= 19;
        if (isKitKat && DocumentsContract.isDocumentUri(application.android.context, uri)) {
            let docId, id, type;
            let contentUri = null;
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
            // FILE
            else if ("file" === uri.getScheme()) {
                return uri.getPath();
            }
        }

        return undefined;
    }

    getDataColumn(uri, selection, selectionArgs) {
        let cursor = null;
        let columns = [android.provider.MediaStore.MediaColumns.DATA];
        let filePath;

        try {
            cursor = this.getContentResolver().query(uri, columns, selection, selectionArgs, null);
            if (cursor != null && cursor.moveToFirst()) {
                let column_index = cursor.getColumnIndexOrThrow(columns[0]);
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
    }

    isExternalStorageDocument(uri) {
        return "com.android.externalstorage.documents" === uri.getAuthority();
    }

    isDownloadsDocument(uri) {
        return "com.android.providers.downloads.documents" === uri.getAuthority();
    }

    isMediaDocument(uri) {
        return "com.android.providers.media.documents" === uri.getAuthority();
    }

    getContentResolver() {
        return application.android.nativeApp.getContentResolver();
    }
}
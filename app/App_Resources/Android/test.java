public static Intent getPickImageIntent(Context context) {
    Intent chooserIntent = null;

    List<Intent> intentList = new ArrayList<>();

    Intent pickIntent = new Intent(Intent.ACTION_PICK,
            android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
    Intent takePhotoIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    takePhotoIntent.putExtra("return-data", true);
    takePhotoIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(getTempFile(context)));
    intentList = addIntentsToList(context, intentList, pickIntent);
    intentList = addIntentsToList(context, intentList, takePhotoIntent);

    if (intentList.size() > 0) {
        chooserIntent = Intent.createChooser(intentList.remove(intentList.size() - 1),
                context.getString(R.string.pick_image_intent_text));
        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentList.toArray(new Parcelable[]{}));
    }

    return chooserIntent;
}

private static List<Intent> addIntentsToList(Context context, List<Intent> list, Intent intent) {
    List<ResolveInfo> resInfo = context.getPackageManager().queryIntentActivities(intent, 0);
    for (ResolveInfo resolveInfo : resInfo) {
        String packageName = resolveInfo.activityInfo.packageName;
        Intent targetedIntent = new Intent(intent);
        targetedIntent.setPackage(packageName);
        list.add(targetedIntent);
    }
    return list;
}
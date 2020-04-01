<?php


Route::name('profile.')->prefix('me')->group(function () {
    Route::get('get-perms', 'ProfileController@getRolesAndPermissions')->name('permission.get');
    Route::get('profile', 'ProfileController@profile')->name('profile');
    Route::put('{user}','ProfileController@updateData')->name('update');
    Route::patch('update_password','ProfileController@updatePassword')->name('password.update');
});
Route::put('pages/{page}/translate', 'PagesController@translate');
Route::apiResource('pages', 'PagesController');
Route::apiResource('roles', 'RolesController');
Route::apiResource('admins', 'AdminsController');
Route::get('activities', 'ActivitiesController')->name('activities');

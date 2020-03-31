<?php


Route::group(['prefix' => 'me'], function () {
    Route::get('get-perms', 'ProfileController@getRolesAndPermissions');
    Route::get('', 'ProfileController@profile');
});
Route::put('pages/{page}/translate', 'PagesController@translate');
Route::apiResource('pages', 'PagesController');
Route::apiResource('roles', 'RolesController');
Route::apiResource('admins', 'AdminsController');
Route::get('activities', 'ActivitiesController')->name('activities');

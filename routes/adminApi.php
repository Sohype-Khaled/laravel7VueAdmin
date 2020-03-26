<?php



Route::group(['prefix' => 'me'], function() {
    Route::get('get-perms', 'ProfileController@getRolesAndPermissions');
    Route::get('', 'ProfileController@profile');
});

Route::apiResource('roles', 'RolesController');
Route::apiResource('admins', 'AdminsController');

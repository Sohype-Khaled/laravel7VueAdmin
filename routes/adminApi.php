<?php

Route::get('get-perms', 'ProfileController@getRolesAndPermissions');

Route::apiResource('roles', 'RolesController');
Route::apiResource('admins', 'AdminsController');

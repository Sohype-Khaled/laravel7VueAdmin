<?php

Route::get('get-perms', 'ProfileController@getRolesAndPermissions');

Route::apiResource('admins', 'AdminsController');
